import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { GenericCard } from '../../data/card.data';
import { FilterPriceComponent } from '../../shared/card/filter-price/filter-price.component';
import { SubProductComponent } from '../../shared/sub-product/sub-product.component';
import { BtnCallComponent } from '../../shared/btn/btn-call/btn-call.component';
import { BrandsComponent } from '../../shared/brands/brands.component';
import { BarComponent } from "../../shared/bar/bar.component";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GalleryComponent } from '../../shared/gallery/gallery.component';
import { CommonModule } from '@angular/common';

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
    GalleryComponent,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {

  category: GenericCard | undefined;
  categoryTitle: string | null = null;
  subCategory: string | null = null;
  currentSubCategory: GenericCard[] = [];
  cardsCategory: GenericCard[] = [];
  cardsProduct: GenericCard[] = [];
  cardsInstall: GenericCard[] = [];
  productsContent: GenericCard[] = [];

  typeInstall = "Tipo de Instalação";
  moreLabel = "Mais Vistos";
  productsLabel = "Nossos Produtos";
  
  selectedSubCategory: string | null = null;

  imageList = [
    'brands/eucaflor.png',
    'brands/duraflor.png',
    'brands/quick.png'
  ];

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryTitle = params['category']?.charAt(0).toUpperCase() + params['category']?.slice(1);
      this.categoryTitle = categoryTitle; 
      if (categoryTitle) {
        this.category = {
          id: 1,
          title: categoryTitle,
          type: 'category',
          imageUrl: ""
        };
      }
    });
    this.selectedSubCategory = this.categoryTitle
    this.populateCategory();
    this.productsGallery();
  }

  populateCategory() {
    this.productService.getProdutctsCategoryId().subscribe(categories => {
      this.cardsCategory = this.cardsCategory.concat(categories);
    });

    this.productService.getProductPromotionMainList().subscribe(promotions => {
      this.cardsProduct = this.cardsProduct.concat(promotions);
    });

    this.productService.getProdutctsCategoryIdInstallType().subscribe(promotions => {
      this.cardsInstall = this.cardsInstall.concat(promotions);
    });
    this.currentSubCategory = this.cardsCategory;
  }

  onSubProductClick(subCategoryId: string) {
    if (this.category) {
      this.currentSubCategory.push(this.category);
      this.categoryTitle = subCategoryId
    }
    this.currentSubCategory = this.currentSubCategory.filter(item => item.title !== subCategoryId);
    this.category = this.cardsCategory.find(item => item.title == subCategoryId)
    
    this.selectedSubCategory = subCategoryId;

  }

  productsGallery() {
    this.productService.getAllProducts().subscribe(products => {
      this.productsContent = this.productsContent.concat(products);
    });
  }
}