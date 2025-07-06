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
import { CommonModule, formatDate } from '@angular/common';
import { SalesAuthService } from '../service/sales.auth.service';

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
  clientCardData: any;
  orderChartData: any;
  saleChartData: any;
  saleCardData: any;
  timeUpdate: string = "";

  constructor(private orderService: OrderAuthService,
    private clientService: ClientAuthService,
    private salesService: SalesAuthService) {}

  ngOnInit(): void {
    this.populateDashboardData();
  }

  updateClientChart(time: string){
    this.clientService.getClientChart(time).subscribe((data) => {
      this.clientChartData = data;
    })
  }

  updateOrderChart(time: string){
    this.orderService.getOrderChart(time).subscribe((data) => {
      this.orderChartData = data;
    })
  }

  updateSaleChart(time: string){
    this.salesService.getSalesChart(time).subscribe((data) =>{
      this.saleChartData = data;
    })
  }

  populateDashboardData() {
    this.orderService.getOrderData().subscribe((data) => {
      this.detailTable = data;
    });
    this.clientService.getClientChart("mes").subscribe((chart) => {
      this.clientChartData = chart;
      console.log(this.clientChartData)
    })
    this.orderService.getOrderChart("mes").subscribe((data) => {
      this.orderChartData = data;
      console.log(this.orderChartData)
    })
    this.salesService.getSalesChart("mes").subscribe((data) =>{
      this.saleChartData = data;
      console.log(this.saleChartData)
    })
    
    this.clientService.getClientChart("resume").subscribe((chart) => {
      this.clientCardData = chart;
      console.log(this.clientChartData)
    })
    this.salesService.getSalesChart("resume").subscribe((data) =>{
      this.saleCardData = data;
      console.log(this.saleCardData)
    })

    const now = new Date();
    this.timeUpdate = formatDate(now, 'HH:mm dd/MM/yyyy', 'pt-BR');
  }
  
}
