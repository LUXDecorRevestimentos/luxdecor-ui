import { Component, OnInit, Input, computed, LOCALE_ID, Inject } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { InstallOption, ProductData } from '../../data/card.data';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailsTable } from '../../data/table.data';
import { BarComponent } from '../../shared/bar/bar.component';
import { BtnAddComponent } from '../../shared/btn/btn-add/btn-add.component';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { GenericCard } from '../../data/card.data';
import { BtnCallComponent } from '../../shared/btn/btn-call/btn-call.component';
import { ProductTableComponent } from '../../shared/product-table/product-table.component';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, min, switchMap, tap } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { NotificationService } from '../../service/notification.service';
import { WhatsappComponent } from '../../shared/whatsapp/whatsapp.component';
import { DateDelivery } from '../../admin/data/category.data';

@Component({
  selector: 'app-product-page',
  imports: [
    CommonModule,
    MatTableModule,
    BarComponent,
    BtnAddComponent,
    CarouselCardsComponent,
    ProductTableComponent,
    WhatsappComponent],

  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class ProductPageComponent implements OnInit{

  detailTable: ProductDetailsTable | any;
  dimensionsTable: ProductDetailsTable | any;
  productContent: ProductData | any;
  productId!: string;
  productImgs!: any[];
  brandImg: string = "";
  measureLabel: string = "";
  detailsLabel: string = "Sobre";
  specLabel: string = "Especificações";
  otherProductsLabel: string = "Outros Produtos"
  selectedInstallations: string | undefined;
  opInstall: InstallOption | undefined;
  date_delivery!: DateDelivery;
  install_label!: string;
  avaliable: boolean = false;

  selectedImageIndex: number = 0;
  cardsProduct: GenericCard[] = [];

  measureUnits = [
    { value: 0, label: '/ m' },
    { value: 1, label: '/ m²' },
    { value: 2, label: '' },
    { value: 3, label: '' }
  ];
  

  constructor (private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) public locale: string) {}
  

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap(() => {
        window.scrollTo(0, 0); 
        this.selectedImageIndex = 0;
      }),
      switchMap(params => {
        const productParam = params['product'];
        if (!productParam) return []; 
        
        this.productId = productParam.startsWith('#') 
          ? productParam 
          : productParam;
        return this.loadProductData(this.productId);
      })
    ).subscribe({
      next: () => {},
      error: (err) => console.error("Erro:", err),
    });
  }

  loadProductData(productId: string) {
    return this.productService.getProductId(productId).pipe(
      tap(product => {
        this.productContent = product;
        this.measureLabel = this.getMeasureUnitLabel(product.measure);
        this.opInstall = this.productContent.installations[0]
        this.avaliable = product.available;
        this.date_delivery = product.date_delivery;
      }),
      switchMap(product => 
        forkJoin({
          imgs: this.productService.getImgs(productId),
          promotions: this.productService.getProductPromotionMainList(),
          details: this.productService.getDetails(product.category_data.category_id, productId),
          dimensions: this.productService.getDimensions(product.category_data.category_id, productId),
          banner: this.productService.getBrandAndThenBanner(product.category_data.brand_id)
        })
      ),
      tap(({ imgs, promotions, details, dimensions, banner }) => {
        this.install_label = this.productContent?.installation[0]?.title;
        this.productImgs = imgs;
        this.cardsProduct = [];
        this.cardsProduct = [...this.cardsProduct, ...promotions];
        this.brandImg = banner;
        this.detailTable = details.map(item => ({
          label: item.key,
          value: item.value
        }));
  
        this.dimensionsTable = dimensions.map(item => ({
          label: item.key,
          value: item.value
        }));
      })
    );
  }

  getMeasureUnitLabel(value: number): string {
    const unit = this.measureUnits.find(item => item.value === value);
    return unit ? unit.label : 'Desconhecido';
  }

  selectImage(index: number){
    this.selectedImageIndex = index
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedInstallations = value;
    } else {
      this.selectedInstallations = undefined;
    }
  }

  addOrder(newOrder: [string, number]){
    this.cartService.addOrder(newOrder[0], newOrder[1]).subscribe({
      next: () => {
        this.notificationService.show("Adicinado ao carrinho!", "success")
      },
      error: (err) => this.notificationService.show("Erro ao adicionar no carrinho", "error")
    });
  }

  deliveryMessage = computed(() => {
    const minD = this.date_delivery.min;
    const maxD = this.date_delivery.max;

    const baseDate = new Date();
    const minDate = new Date(baseDate);
    const maxDate = new Date(baseDate);
    minDate.setDate(baseDate.getDate() + minD);
    maxDate.setDate(baseDate.getDate() + maxD);

    const formattedMin = this.datePipe.transform(minDate, 'dd/MM', undefined, this.locale);
    const formattedMax = this.datePipe.transform(maxDate, 'dd/MM', undefined, this.locale);
    
    if (!formattedMin || !formattedMax) {
      return 'Erro interno ao formatar datas!'
    }
    return `Receba entre ${formattedMin} e ${formattedMax}`;
  });
}
