import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductTable } from '../../../data/table.data';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-table',
  imports: [ MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIcon,
    CommonModule ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {
  @Input() detailTable!: ProductTable[];
  @Output() rowSelected: EventEmitter<ProductTable> = new EventEmitter();
  displayedColumns: string[] = ['productId', 'name', 'price', 'stock'];
  dataSource = new MatTableDataSource<ProductTable>();
  selectedRow: ProductTable | null = null;
  ngOnInit(): void {
    this.dataSource.data = this.detailTable as ProductTable[];
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
