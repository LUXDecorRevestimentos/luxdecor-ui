import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductTable, OrderStatus, OrderStatusLabels } from '../../../data/table.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-product-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './order-product-table.component.html',
  styleUrl: './order-product-table.component.css'
})
export class OrderProductTableComponent {
 
  @Input() detailProducts!: ProductTable[];
  @Output() rowSelected: EventEmitter<ProductTable> = new EventEmitter();

  displayedColumns: string[] = ['productId', 'productName', 'price', 'amount', 'status', 'category'];
  dataSource = new MatTableDataSource<ProductTable>();
  selectedRow: ProductTable | null = null;


  ngOnInit(): void {
    this.dataSource.data = this.detailProducts;
  }

  onRowClicked(row: ProductTable): void {
    this.selectedRow = row;
    this.rowSelected.emit(row);
  }

  getLabelStatus(orderStatus: OrderStatus): string {
    let orderStatusLabel: string = "";
    if ( orderStatus && orderStatus !== undefined) {
      orderStatusLabel = OrderStatusLabels[orderStatus] || 'Unknown Status';
    }
    return orderStatusLabel;
  }


}
