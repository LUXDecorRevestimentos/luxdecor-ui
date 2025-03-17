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

@Component({
  selector: 'app-product',
  imports: [SubProductComponent, BtnCallComponent, FilterPriceComponent, BrandsComponent, BarComponent, SideMenuComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  category: string | null = null;
  cardsCategory: GenericCard[] = [];
  cardsProduct: GenericCard[] = [];
  
  cardsInstall: GenericCard[] = [];
  typeInstall = "Tipo de Instalação";

  imageList = [
    'brands/eucaflor.png',
    'brands/duraflor.png',
    'brands/quick.png'
  ];

  constructor (private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryParam = params.get('category');
      this.category = "Piso";
      console.log('Categoria atualizada:', this.category);
    });
    this.populateCategory();
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

}
