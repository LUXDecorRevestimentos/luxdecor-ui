import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { InstallOption, ProductData } from '../../data/card.data';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailsTable } from '../../data/table.data';
import { BarComponent } from '../../shared/bar/bar.component';
import { BtnAddComponent } from '../../shared/btn/btn-add/btn-add.component';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { GenericCard } from '../../data/card.data';
import { BtnCallComponent } from '../../shared/btn/btn-call/btn-call.component';
import { ProductTableComponent } from '../../shared/product-table/product-table.component';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap, tap } from 'rxjs';
import { ClientService } from '../../service/client.service';
import { CartService } from '../../service/cart.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-product-page',
  imports: [
    CommonModule,
    MatTableModule,
    BarComponent,
    BtnAddComponent,
    CarouselCardsComponent,
    BtnCallComponent,
    ProductTableComponent],

  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
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
    private notificationService: NotificationService) {}
  

  ngOnInit(): void {
    this.route.queryParams.pipe(
      switchMap(params => {
        const productParam = params['product'];
         this.productId = productParam.startsWith('#') 
          ? productParam.substring(0) 
          : productParam;
        return this.loadProductData(this.productId);
      })
    ).subscribe({
      next: () => console.log("Tudo carregado!"),
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
    console.log(newOrder)
    this.cartService.addOrder(newOrder[0], newOrder[1]).subscribe({
      next: () => {
        this.notificationService.show("Adicinado ao carrinho!", "success")
      },
      error: (err) => this.notificationService.show("Erro ao adicionar no carrinho", "error")
    });
  }
}
