import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesTable, OrderDetailsTable } from '../../../data/table.data';
import { SalesTableComponent } from '../sales-table/sales-table.component';
import { ClientData } from '../../data/client.data';
import { OrderClientComponent } from '../../orders/order-client/order-client.component';
import { OrderTableResumeComponent } from '../../orders/order-table-resume/order-table-resume.component';
import { ClientAuthService } from '../../service/client.auth.service';
import { OrderAuthService } from '../../service/order.auth.service';
import { ProductTable } from '../../data/category.data';
import { SalesAuthService } from '../../service/sales.auth.service';

@Component({
  selector: 'app-sales-info',
  imports: [ 
    CommonModule, 
    SalesTableComponent, 
    OrderClientComponent, 
    OrderTableResumeComponent ],
  templateUrl: './sales-info.component.html',
  styleUrl: './sales-info.component.css'
})
export class SalesInfoComponent implements OnInit{

  @Input() salesTable!: SalesTable[];
  @Input() client!: ClientData;
  @Input() detailTable: OrderDetailsTable[]  = [];
  historyTable: OrderDetailsTable[]  = [];

  @Output() rowSelected: EventEmitter<ProductTable> = new EventEmitter();

  constructor(private orderService: OrderAuthService){}

  ngOnInit(): void {}

  onRowSelectedSale(row: SalesTable) {
    this.orderService.getCartHistory(row.cartId).subscribe((orderHistory) => {
      this.historyTable = orderHistory;
    })
    this.orderService.getClientData(row.cartId).subscribe((client) => {
      this.client = client;
    })
  }
}
