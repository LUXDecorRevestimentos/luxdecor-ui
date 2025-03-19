import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { GenericCard } from '../../data/card.data';
import { FilterPriceComponent } from '../../shared/card/filter-price/filter-price.component';
import { SubProductComponent } from '../../shared/sub-product/sub-product.component';
import { BtnCallComponent } from '../../shared/btn-call/btn-call.component';
import { BrandsComponent } from '../../shared/brands/brands.component';
import { BarComponent } from "../../shared/bar/bar.component";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GalleryComponent } from '../../shared/gallery/gallery.component';

@Component({
  selector: 'app-product',
  imports: [
    SubProductComponent,
    BtnCallComponent,
    FilterPriceComponent,
    BrandsComponent,
    BarComponent,
    SideMenuComponent,
    CarouselCardsComponent,
    GalleryComponent
  ],
 
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  category: string | null = null;
  cardsCategory: GenericCard[] = [];
  cardsProduct: GenericCard[] = [];
  
  cardsInstall: GenericCard[] = [];

  productsContent: GenericCard[] = [];

  typeInstall = "Tipo de Instalação";
  moreLabel = "Mais Vistos";
  
  imageList = [
    'brands/eucaflor.png',
    'brands/duraflor.png',
    'brands/quick.png'
  ];

  constructor (private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = "Piso"
      // this.subCategory = params['subCategory'];
      console.log('Categoria:', this.category);
      // console.log('Subcategoria:', this.subCategory);

    });
    this.populateCategory();
    this.productsGallery();
  }

  populateCategory(){
    this.productService.getProdutctsCategoryId().subscribe(categories => {
      this.cardsCategory = this.cardsCategory.concat(categories);
    })

    this.productService.getProductPromotionMainList().subscribe(promotions => {
      this.cardsProduct = this.cardsProduct.concat(promotions);
    })
    
    this.productService.getProdutctsCategoryIdInstallType().subscribe(promotions => {
      this.cardsInstall = this.cardsInstall.concat(promotions);
    })
  }

  productsGallery() {
    this.productService.getAllProducts().subscribe(produtcs => {
      this.productsContent = this.productsContent.concat(produtcs)
    })
  }
}