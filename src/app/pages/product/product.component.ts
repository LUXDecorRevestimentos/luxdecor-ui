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
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { BannerService } from '../../admin/service/banner.auth.service';
import { CartCardComponent } from '../../shared/cart-card/cart-card.component';

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
  subCategoryId: string = "";

  typeInstall = "Tipo de Instalação";
  moreLabel = "Mais Vistos";
  productsLabel = "Nossos Produtos";
  
  selectedSubCategory: string | null = null;

  categories: GenericCard[] = [];

  brands: GenericCard[] = []

  imageList: string[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.loadAllData().pipe(
      switchMap(() => this.route.queryParams),
      tap(params => {
        const categoryTitle = params['category']?.charAt(0).toUpperCase() + params['category']?.slice(1);
        this.categoryTitle = categoryTitle;
        
        if (categoryTitle && this.categories.length > 0) {
          const foundCategory = this.categories.find(cat => 
            cat.title.toLowerCase() === categoryTitle.toLowerCase()
          );
          
          if (foundCategory) {
            this.category = {
              id: foundCategory.id,
              title: foundCategory.title,
              type: 'category',
              imageUrl: foundCategory.imageUrl,
              data: foundCategory.data
            };
          }
        }
        
        this.selectedSubCategory = this.categoryTitle;
        
        if (this.category?.data) {
          this.populateCategory(this.category.data);
        } else {
          console.error('No category data available');
        }
        
        this.productsGallery();
      })
    ).subscribe();
  }
  
  private loadAllData(): Observable<any> {
    return this.productService.getProductsCategories().pipe(
      tap(categories => {
        this.categories = categories;
      })
    );
  }

  populateCategory(categoryData: GenericCard) {
    this.cardsCategory = this.cardsCategory.concat(categoryData.data);
    if (this.category?.id){
      this.productService.getProductPromotionMainList().subscribe(promotions => {
        this.cardsProduct = this.cardsProduct.concat(promotions);
      });
      
      this.productService.getBrandsByCategory(this.category.id).subscribe(brands => {
        this.brands = this.brands.concat(brands)
      })
      this.brands.forEach(card => {
        this.bannerService.getImgs(card.imageUrl).subscribe(url => {
          this.imageList.push(url)
          card.imageUrl = url;
        });
      });
      
      this.productService.getInstallationsByCategory(this.category?.id).subscribe(promotions => {
        this.cardsInstall = this.cardsInstall.concat(promotions);
      });
      this.cardsInstall.forEach(card => {
        this.bannerService.getImgs(card.imageUrl).subscribe(url => {
          card.imageUrl = url;
        });
      });
    }
    this.currentSubCategory = this.cardsCategory;
  }

  onSubProductClick(subCategoryId: string) {
    if (this.category) {
      this.currentSubCategory.push(this.category);
      this.categoryTitle = subCategoryId
    }

    this.subCategoryId = this.currentSubCategory.filter(item => item.title === subCategoryId)[0].id

    this.currentSubCategory = this.currentSubCategory.filter(item => item.title !== subCategoryId);
    this.category = this.cardsCategory.find(item => item.title == subCategoryId)
    
    this.selectedSubCategory = subCategoryId;
    this.productsGallery()
  } 

  productsGallery() {
    if (this.subCategoryId)
    this.productService.getProductsFiltered({
      subcategory_id: this.subCategoryId
    }).subscribe(products => {
      this.productsContent = products;
    });
  }
}