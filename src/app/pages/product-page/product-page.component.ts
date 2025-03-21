import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ProductData } from '../../data/card.data';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductDetailsTable } from '../../data/table.data';
import { BarComponent } from '../../shared/bar/bar.component';
import { BtnAddComponent } from '../../shared/btn/btn-add/btn-add.component';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { GenericCard } from '../../data/card.data';
import { BtnCallComponent } from '../../shared/btn/btn-call/btn-call.component';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, MatTableModule, ProductTableComponent, BarComponent, BtnAddComponent, CarouselCardsComponent, BtnCallComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{

  detailTable: ProductDetailsTable | any; 
  productContent: ProductData | any;

  detailsLabel: string = "Sobre";
  specLabel: string = "Especificações";
  otherProductsLabel: string = "Outros Produtos"

  selectedImageIndex: number = 0;
  cardsProduct: GenericCard[] = [];

  constructor (private productService: ProductService) {}
  
  ngOnInit(): void {
    this.populateData()
  }

  populateData() {
    this.productContent = this.productService.getProductId();

    this.detailTable = this.productContent.productDetailsTable;

    this.productService.getProductPromotionMainList().subscribe(promotions => {
      this.cardsProduct = this.cardsProduct.concat(promotions);
    })
  }

  selectImage(index: number){
    this.selectedImageIndex = index
  }
}
