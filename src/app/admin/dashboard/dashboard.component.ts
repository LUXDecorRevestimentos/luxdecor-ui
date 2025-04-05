import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { OrderChartComponent } from '../components/order-chart/order-chart.component';
import { OrderTableResumeComponent } from '../components/order-table-resume/order-table-resume.component';
import { OrderAuthService } from '../service/order.auth.service';
import { OrderDetailsTable } from '../../data/table.data';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    BarChartComponent,
    MatIcon,
    CardDataComponent,
    OrderChartComponent,
    OrderTableResumeComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  detailTable: OrderDetailsTable[]  = [];

  constructor(private orderService: OrderAuthService) {}

  ngOnInit(): void {
    console.log('Dashboard component initialized');
    this.populateDashboardData();
  }

  populateDashboardData() {
    this.orderService.getOrderData().subscribe((data) => {
      this.detailTable = data;
    });
    console.log(this.detailTable);
  }
  
}
