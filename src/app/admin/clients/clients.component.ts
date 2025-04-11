import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { OrderTableResumeComponent } from '../orders/order-table-resume/order-table-resume.component';
import { OrderDetailsTable, ClientTable } from '../../data/table.data';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { ClientAuthService } from '../service/client.auth.service';
import { OrderAuthService } from '../service/order.auth.service';
import { CommonModule } from '@angular/common';
import { ClientData } from '../data/client.data';
import { OrderClientComponent } from '../orders/order-client/order-client.component';
import { ClientInfoComponent } from "./client-info/client-info.component";

@Component({
  selector: 'app-clients',
  imports: [
    MatSidenavModule,
    BarChartComponent,
    MatIcon,
    CardDataComponent,
    CommonModule,
    ClientInfoComponent
],  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit  {

    detailTable: OrderDetailsTable[]  = [];
    clientTable: ClientTable[] = [];
    client!: ClientData;
      
    constructor(private clientService: ClientAuthService,
      private orderService: OrderAuthService) {}
  
    ngOnInit(): void {
      this.populateData();
    }
  
    populateData() {
      this.orderService.getOrderTable().subscribe((data) => {
        this.detailTable = data;
      });
      this.clientService.getClientTable().subscribe((data) => {
        this.clientTable = data;
      });
    }

 
}
