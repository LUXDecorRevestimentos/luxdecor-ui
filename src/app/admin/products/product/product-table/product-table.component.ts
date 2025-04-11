import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductTable } from '../../../data/category.data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-table',
  imports: [ 
    MatIcon, 
    CommonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatTableModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit{
  @Input() products!: ProductTable[];
  @Output() rowSelected: EventEmitter<ProductTable> = new EventEmitter();

  displayedColumns: string[] = ['productId', 'productName', 'categoryName', 'subCategoryName'];
  dataSource = new MatTableDataSource<ProductTable>();
  selectedRow: ProductTable | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.products;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: ProductTable): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }
}
