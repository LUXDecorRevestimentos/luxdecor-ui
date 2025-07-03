import { Component, OnInit} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { SalesInfoComponent } from './sales-info/sales-info.component';
import { SalesTable } from '../../data/table.data';
import { SalesAuthService } from '../service/sales.auth.service';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { SalesChartComponent } from '../sales/sales-chart/sales-chart.component';
import { CommonModule, formatDate } from '@angular/common';
import { OrderChartComponent } from '../components/order-chart/order-chart.component';
import { OrderAuthService } from '../service/order.auth.service';


@Component({
  selector: 'app-sales',
  imports: [
    MatIcon,
    CardDataComponent,
    SalesInfoComponent,
    BarChartComponent,
    PieChartComponent,
    OrderChartComponent,
    CommonModule
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{

  salesTable: SalesTable[] = [];
  chartData!: any;
  pieChartData!: any[];
  orderChart: any;
  timeUpdate: string = "";

  constructor(private salesService: SalesAuthService,
    private orderService: OrderAuthService) {}

  ngOnInit(): void {
    this.loadSales();
    this.salesService.getSalesChart("dia").subscribe((chart) => {
      this.chartData = chart
    })
    this.salesService.getPieChart("category").subscribe((data) => {
      this.pieChartData = data;
    })
    this.orderService.getOrderChart("mes").subscribe((chart) => {
      this.orderChart = chart;
      const now = new Date();
      this.timeUpdate = formatDate(now, 'HH:mm dd/MM/yyyy', 'pt-BR');
    })
  }

  loadSales() {
    this.salesService.getSalesTable().subscribe((data: any) => {
      this.salesTable = data;
    });
  }

  updateChart(time: string){
    this.salesService.getSalesChart(time).subscribe((data) => {
      this.chartData = data;
    })
  }

  onChangeOrderChart($event: string){
    console.log($event)
    this.orderService.getOrderChart($event).subscribe((chart) => {
      this.orderChart = chart;
      const now = new Date();
      this.timeUpdate = formatDate(now, 'HH:mm dd/MM/yyyy', 'pt-BR');
    })
  }

  updatePieChart(select: string) {
    this.salesService.getPieChart(select).subscribe((data) => {
      console.log(data)
      this.pieChartData = data;
    })
  }

}
