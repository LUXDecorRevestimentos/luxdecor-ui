import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ProductTable, ProductInfo } from '../../../data/category.data';
import { ProductAuthService } from '../../../service/product.auth.service';
import { ProductsInfoComponent } from '../products-info/products-info.component';

@Component({
  selector: 'app-products-content',
  imports: [ProductTableComponent, MatIcon, CommonModule, ProductsInfoComponent],
  templateUrl: './products-content.component.html',
  styleUrl: './products-content.component.css'
})
export class ProductsContentComponent {

  @Input() products: ProductTable[]  = [];
  @Output() rowSelected: EventEmitter<ProductTable> = new EventEmitter();

  details: boolean = false;
  addOp: boolean = false;
  editOp: boolean = false;

  productInfo!: ProductInfo;

  constructor(private productService: ProductAuthService) {}

  ngOnInit(): void {
    this.populateData()
  }

  populateData() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.productService.getProductInfo().subscribe((data) => {
      this.productInfo = data;
    });
  }

  handleButtonClick(identifier: string) {
    if(identifier === 'add') {
      this.addOp = !this.addOp;
    } else if(identifier === 'edit') {
      this.editOp = !this.editOp;
    }
  }

  onRowSelectedProduct(row: ProductTable) {
    console.log('Row selected:', row); 
    this.details = true;
  }
  
}
