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
import { catchError, forkJoin, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { BannerService } from '../../admin/service/banner.auth.service';
import { CardComponent } from "../../shared/card/default/card-default.component";
import { SideMenuModalComponent } from './side-menu-modal/side-menu-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  imports: [
    SubProductComponent,
    BtnCallComponent,
    BrandsComponent,
    BarComponent,
    SideMenuComponent,
    CarouselCardsComponent,
    GalleryComponent,
    CommonModule,
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
  selectedInstallation: string | null = null;
  selectedBranding: string | null = null
  categories: GenericCard[] = [];
  brands: GenericCard[] = [];
  imageList: string[] = [];
  priceRange: any;

  // Loading states
  isLoadingCategory: boolean = true;
  isLoadingProduct: boolean = true;
  isLoadingInstallations: boolean = true;
  isLoadingBrands: boolean = true;
  isLoadingProductsContent: boolean = true;

  // Fitler
  subCategoryListString: string[] = [];
  brandListString: string[] = [];
  installTypes: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private bannerService: BannerService,
    private dialog: MatDialog,
  ) {}

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
          this.isLoadingCategory = false;
        }
        
        this.productsGallery();
        if (this.brands.length > 0)
          this.imageList = this.brands.map(item => item.imageUrl)
      })
    ).subscribe();
  }
  
  private loadAllData(): Observable<any> {
    this.isLoadingCategory = true;
    return this.productService.getProductsCategories().pipe(
      tap(categories => {
        this.categories = categories;
        this.isLoadingCategory = false;
      }),
      catchError(() => {
        this.isLoadingCategory = false;
        return of(null);
      })
    );
  }

  openFiltersModal() {
    const dialogRef = this.dialog.open(SideMenuModalComponent, {
      width: '450px',
      data: {
        modalInfo: {
          subCategorys: this.subCategoryListString,
          installTypes: this.installTypes,
          brands: this.brandListString,
          priceRange: this.priceRange,
          selectedSubCategories: this.selectedSubCategory,
          selectedInstallTypes: this.selectedInstallation,
          selectedBrands: this.selectedBranding
        }
      }
    });
    
    dialogRef.componentInstance.filtersChanged.subscribe(event => {
      this.onFiltersChanged(event);
    });

    dialogRef.componentInstance.subCategoriesChanged.subscribe(event => {
      this.onSubCategoriesChanged(event);
    })

    dialogRef.componentInstance.installTypesChanged.subscribe(event => {
      this.onInstallTypesChanged(event);
    })
    
    dialogRef.componentInstance.brandsChanged.subscribe(event => {
      this.onBrandsChanged(event);
    })

    dialogRef.componentInstance.priceRangeChanged.subscribe((event: { start: number; end: number; }) => {
      this.onPriceRangeChanged(event)
    })

  }

  populateCategory(categoryData: GenericCard): void {
    this.isLoadingCategory = true;
    this.isLoadingProduct = true;
    this.isLoadingInstallations = true;
    this.isLoadingBrands = true;

    this.cardsCategory = this.cardsCategory.concat(categoryData.data);
    
    if (!this.category?.id) {
      this.currentSubCategory = this.cardsCategory;
      this.isLoadingCategory = false;
      return;
    }

    forkJoin([
      this.productService.getProductPromotionMainList(),
      this.productService.getBrandsByCategory(this.category.id),
      this.productService.getInstallationsByCategory(this.category.id)
    ]).pipe(
      takeUntil(this.destroy$),
      switchMap(([promotions, brands, installations]) => {
        this.cardsProduct = promotions;
        this.brands = brands;
        this.cardsInstall = installations;

        this.isLoadingProduct = false;
        this.isLoadingInstallations = false;
        this.isLoadingBrands = false;

        this.priceRange = this.getMinMaxPrices(this.cardsProduct)

        this.subCategoryListString = this.cardsCategory.map(item => item.title)
        this.installTypes = installations.map(item => item.title);
        this.brandListString = brands.map(item => item.title)
        const brandImageRequests = this.brands.map(brand => 
          this.bannerService.getImgs(brand.imageUrl).pipe(
            tap(url => brand.imageUrl = url),
            catchError(() => of(null))
          )
        );

        const installImageRequests = this.cardsInstall.map(install => 
          this.bannerService.getImgs(install.imageUrl).pipe(
            tap(url => install.imageUrl = url),
            catchError(() => of(null))
          )
        );
        
        return forkJoin([...brandImageRequests, ...installImageRequests]);
      })
    ).subscribe({
      complete: () => {
        this.currentSubCategory = this.cardsCategory;
        this.isLoadingCategory = false;
      },
      error: (err) => {
        console.error('Error loading category data:', err);
        this.isLoadingCategory = false;
        this.isLoadingProduct = false;
        this.isLoadingInstallations = false;
        this.isLoadingBrands = false;
      }
    });
  }


  productsGallery(filters: {
    category_id?: string;
    brand_id?: string;
    subcategory_id?: string;
    product_id?: string;
    installation_id?: string;
    price_min?: number;
    price_max?: number;
  } = {}) {
    const params = {
      ...filters,
      ...(filters.subcategory_id ? {} : { category_id: this.category?.id })
    };

    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => 
        value !== undefined && value !== null && value !== ''
      )
    );

    if (Object.keys(cleanParams).length === 0) {
      return;
    }

    this.isLoadingProductsContent = true;
    this.productService.getProductsFiltered(cleanParams).subscribe({
      next: (products) => {
        this.productsContent = products;
        this.isLoadingProductsContent = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoadingProductsContent = false;
      }
    });
  }

  getMinMaxPrices(products: GenericCard[]): any{
    const prices = products.map(product => {
      const numericString = product.data.price
        .replace(/\./g, '')
        .replace(',', '.');
      
      return parseFloat(numericString);
    });
  
    const minValue = Math.min(...prices);
    const maxValue = Math.max(...prices);
    return { start: minValue, end: maxValue};
  }


  onSubProductClick(subCategoryTitle: string) {    
    if (this.category) {
      this.currentSubCategory.push(this.category);    
      this.categoryTitle = subCategoryTitle;
    }
    if( this.currentSubCategory.length > 0)
      this.subCategoryId = this.currentSubCategory.filter(item => item.title === subCategoryTitle)[0].id;

      this.currentSubCategory = this.currentSubCategory.filter(item => item.title !== subCategoryTitle);
      this.category = this.cardsCategory.find(item => item.title == subCategoryTitle);

      this.selectedSubCategory = subCategoryTitle;
      if(this.category?.type == "category")
        this.productsGallery();
      if(this.category?.type == "sub-category")
        this.productsGallery({'subcategory_id': this.category.id});
    } 

  onFiltersChanged(filters: any) {}

  onSubCategoriesChanged(subCategories: string[]) {
    this.isLoadingProductsContent = true;
    try {
      if (!subCategories || subCategories.length === 0 || subCategories[0] === undefined) {
        const categoryItems = this.currentSubCategory.filter(item => item.type === "category");
        
        if (categoryItems.length > 0) {
          this.onSubProductClick(categoryItems[0].title);
        } else {
          console.warn('No category items available to fall back to');
          this.isLoadingProductsContent = false;
        }
        return;
      }
      const selectedCategory = subCategories[0];
      this.onSubProductClick(selectedCategory);
      
    } catch (error) {
      console.error('Error in onSubCategoriesChanged:', error);
      this.isLoadingProductsContent = false;
    }
  }

  onInstallTypesChanged(installTypes: string[]) {
    this.isLoadingProductsContent = true;
    if (installTypes && installTypes.length > 0) {
      if (!this.cardsInstall || !Array.isArray(this.cardsInstall)) {
        console.error('cardsInstall is not properly initialized');
        this.isLoadingProductsContent = false;
        return;
      }
      const selectedInstall = this.cardsInstall.find(item => item.title === installTypes[0]);
      if (selectedInstall) {
        this.selectedInstallation = installTypes[0];
        this.category!.type = "filter";
        this.productsGallery({ installation_id: selectedInstall.id });
      } else {
        console.warn('No matching installation found for:', installTypes[0]);
        this.isLoadingProductsContent = false;
      }
    } else {
      this.selectedInstallation = null;
      this.productsGallery({ installation_id: undefined });
      this.category!.type = "category"
      this.isLoadingProductsContent = false;
    }
  }

  onBrandsChanged(brands: string[]) {
    this.isLoadingProductsContent = true;
    
    if (brands && brands.length > 0) {
        
        if (!this.brands || !Array.isArray(this.brands)) {
            console.error('Brands list is not properly initialized');
            this.isLoadingProductsContent = false;
            return;
        }

        const availableBrands = this.selectedInstallation 
            ? this.brands.filter(brand => 
                brand.data.installationTypes?.includes(this.selectedInstallation!))
            : this.brands;

        const selectedBrand = availableBrands.find(item => 
            item.title === brands[0] || item.imageUrl === brands[0]
        );

        if (selectedBrand) {
            this.selectedBranding = brands[0];
            this.category!.type = "filter";
            this.productsGallery({ 
                brand_id: selectedBrand.data.brand_id,
                installation_id: this.selectedInstallation || undefined
            });
        } else {
            console.warn('No matching brand found for:', brands[0]);
            this.isLoadingProductsContent = false;
        }
    } else {
        this.selectedBranding = null;
        this.productsGallery({ 
            brand_id: undefined,
            installation_id: this.selectedInstallation || undefined
        });
        
        if (!this.selectedInstallation) {
            this.category!.type = "category";
        }
        
        this.isLoadingProductsContent = false;
    }
  }

  onPriceRangeChanged(priceRangeChange: {start: number, end: number}) {
    this.isLoadingProductsContent = true;
    
    if (priceRangeChange && priceRangeChange.start !== undefined && priceRangeChange.end !== undefined) {      
      try {
        if (isNaN(priceRangeChange.start) || isNaN(priceRangeChange.end)) {
          console.error('Invalid price range values');
          this.isLoadingProductsContent = false;
          return;
        }
        this.category!.type = "filter";
        this.productsGallery({
          price_min: priceRangeChange.start,
          price_max: priceRangeChange.end + 10
        });
        
      } catch (error) {
        console.error('Error processing price range:', error);
        this.isLoadingProductsContent = false;
      }
      
    } else {
      console.warn('No price range provided or incomplete range');
      this.productsGallery({ installation_id: undefined });
      this.isLoadingProductsContent = false;
      this.category!.type = "category"
    }
  }
  formatToBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

