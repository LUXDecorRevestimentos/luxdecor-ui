import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderTable, OrderStatus, OrderStatusLabels } from '../../../data/table.data';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIcon, CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent implements OnInit{

  @Input() detailTable!: OrderTable[];
  @Output() rowSelected: EventEmitter<OrderTable> = new EventEmitter();

  displayedColumns: string[] = ['orderId', 'customerName', 'totalAmount', 'status', 'date'];
  dataSource = new MatTableDataSource<OrderTable>();
  selectedRow: OrderTable | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.detailTable;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row: OrderTable): void {
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
