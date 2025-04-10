import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ProductAuthService } from '../service/product.auth.service';
import { CategoryTable } from '../data/category.data';
import { CategorysContentComponent } from './category/categorys-content/categorys-content.component';
import { CommonModule } from '@angular/common';
import { ProductsContentComponent } from './produtct/products-content/products-content.component';

@Component({
  selector: 'app-products',
  imports: [MatIcon, CategorysContentComponent,ProductsContentComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  @Output() rowSelected: EventEmitter<CategoryTable> = new EventEmitter();

  categorys: CategoryTable[]  = [];
  selected!: CategoryTable;

  categoryOp: boolean = false;
  productOp: boolean = false;

  constructor( private productService: ProductAuthService) { }

  ngOnInit(): void {}

  handleButtonClick(identifier: string) {
    if(identifier === 'category') {
      this.categoryOp = !this.categoryOp;
    } else if(identifier === 'product') {
      this.productOp = !this.productOp;
    }
  }

}
