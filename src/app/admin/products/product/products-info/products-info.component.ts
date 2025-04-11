import { Component, Input, OnInit } from '@angular/core';
import { ProductInfo } from '../../../data/category.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ProductsImgComponent } from '../products-img/products-img.component';
import { ProductsPriceComponent } from '../products-price/products-price.component';
import { DetailsTableComponent } from '../../details-table/details-table.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products-info',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    ProductsImgComponent,
    ProductsPriceComponent,
    DetailsTableComponent,
    MatIcon,
],
  templateUrl: './products-info.component.html',
  styleUrl: './products-info.component.css'
})
export class ProductsInfoComponent implements OnInit {

  @Input() productInfo!: ProductInfo;

  selectedOption: string = 'Produtos';

  ngOnInit(): void {}

}
