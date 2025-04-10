import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ProductTable, ProductInfo } from '../../../data/category.data';
import { CategoryAuthService } from '../../../service/category.auth.service';
import { ProductAuthService } from '../../../service/product.auth.service';

@Component({
  selector: 'app-products-content',
  imports: [ProductTableComponent],
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

  constructor(private categoryService: CategoryAuthService) {}
  
   ngOnInit(): void {
      // this.populateData()
    }
  
    // populateData() {
    //   this.categoryService.getCategoryData().subscribe((data) => {
    //     this.categorys = data;
    //   });
    // }
  
    handleButtonClick(identifier: string) {
      if(identifier === 'add') {
        this.addOp = !this.addOp;
      } else if(identifier === 'edit') {
        this.editOp = !this.editOp;
      }
    }
  
    onRowSelectedProduct(row: ProductTable) {
      // this.categoryService.getCategoryData().subscribe((category) => {
      //   this.products = category;
      // });
      // this.details = true;
      // this.categoryService.getCategoryInfo().subscribe((data) => {
      //   this.products = data;
      // });
    }
  
}
