import { Component, Input, OnInit } from '@angular/core';
import { ProductDetailsTable} from '../../../data/table.data';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {

  @Input() detailTable: ProductDetailsTable[]  = [];
  @Input() title: string = "";
  
  detailsData: ProductDetailsTable[] = []; 

  detailsColumns: string[] = ['label', 'value'];

  ngOnInit(): void {
    this.detailsData = this.detailTable

    console.log(this.detailsData)
  }

}
