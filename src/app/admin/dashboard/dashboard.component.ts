import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { OrderChartComponent } from '../components/order-chart/order-chart.component';
import { OrderTableResumeComponent } from '../orders/order-table-resume/order-table-resume.component';
import { OrderAuthService } from '../service/order.auth.service';
import { OrderDetailsTable } from '../../data/table.data';
import { ClientService } from '../../service/client.service';
import { ClientAuthService } from '../service/client.auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    BarChartComponent,
    MatIcon,
    CardDataComponent,
    OrderChartComponent,
    OrderTableResumeComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  detailTable: OrderDetailsTable[]  = [];
  clientChartData: any;

  constructor(private orderService: OrderAuthService,
    private clientService: ClientAuthService) {}

  ngOnInit(): void {
    this.populateDashboardData();
  }

  updateClientChart(time: string){
    this.clientService.getClientChart(time).subscribe((data) => {
      this.clientChartData = data;
    })
  }

  populateDashboardData() {
    this.orderService.getOrderData().subscribe((data) => {
      this.detailTable = data;
    });
    this.clientService.getClientChart("dia").subscribe((chart) => {
      this.clientChartData = chart;
      console.log(this.clientChartData)
    })
  }
  
}
