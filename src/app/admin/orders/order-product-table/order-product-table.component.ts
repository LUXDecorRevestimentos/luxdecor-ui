import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductTable, OrderStatus, OrderStatusLabels } from '../../../data/table.data';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from '../order-status/order-status.component';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-order-product-table',
  imports: [
    MatTableModule,
    CommonModule,
    OrderStatusComponent,
    MatIcon,
    MatFormFieldModule
  ],
  templateUrl: './order-product-table.component.html',
  styleUrl: './order-product-table.component.css'
})
export class OrderProductTableComponent implements OnInit {
  @Input() detailProducts!: ProductTable[];
  @Output() rowSelected: EventEmitter<ProductTable> = new EventEmitter();

  displayedColumns: string[] = ['orderId', 'productName', 'price', 'amount', 'status'];
  dataSource = new MatTableDataSource<ProductTable>();
  selectedRow: ProductTable | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.detailProducts;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
