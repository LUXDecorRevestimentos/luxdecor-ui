import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesTable, OrderDetailsTable } from '../../../data/table.data';
import { SalesTableComponent } from '../sales-table/sales-table.component';
import { ClientData } from '../../data/client.data';
import { OrderClientComponent } from '../../orders/order-client/order-client.component';
import { OrderTableResumeComponent } from '../../orders/order-table-resume/order-table-resume.component';
import { ClientAuthService } from '../../service/client.auth.service';
import { OrderAuthService } from '../../service/order.auth.service';

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
export class SalesInfoComponent {

  @Input() salesTable!: SalesTable[];
  @Input() client!: ClientData;
  @Input() detailTable: OrderDetailsTable[]  = [];


  constructor (private clientService: ClientAuthService,
              private orderService: OrderAuthService){}

  onRowSelectedSale(row: SalesTable) {
    this.clientService.getClientData().subscribe((client) => {
      this.client = client;
    });    
    this.orderService.getOrderData().subscribe((data) => {
      this.detailTable = data;
    });
    console.log(this.client, this.detailTable);
  }
}
