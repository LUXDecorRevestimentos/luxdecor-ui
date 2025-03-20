import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ProductData } from '../../data/card.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{

  productContent: ProductData | any;


  constructor (private productService: ProductService) {}
  
  ngOnInit(): void {
    this.populateData()
  }

  populateData() {
    this.productContent = this.productService.getProductId();
    console.log(this.productContent)
  }

}
