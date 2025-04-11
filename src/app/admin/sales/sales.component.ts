import { Component, OnInit} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { SalesInfoComponent } from './sales-info/sales-info.component';
import { SalesTable } from '../../data/table.data';
import { SalesAuthService } from '../service/sales.auth.service';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { SalesChartComponent } from '../sales/sales-chart/sales-chart.component';


@Component({
  selector: 'app-sales',
  imports: [
    MatIcon,
    CardDataComponent,
    SalesInfoComponent,
    BarChartComponent,
    PieChartComponent,
    SalesChartComponent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{

  salesTable: SalesTable[] = [];
  
  constructor(private salesService: SalesAuthService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.salesService.getSalesTable().subscribe((data: any) => {
      this.salesTable = data;
    });
  }

}
