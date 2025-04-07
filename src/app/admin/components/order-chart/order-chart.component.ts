import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-order-chart',
  imports: [NgxChartsModule, CommonModule, BtnComponent],
  templateUrl: './order-chart.component.html',
  styleUrl: './order-chart.component.css'
})
export class OrderChartComponent {
  @Input() color: string | null = "#E0AD3E";
  @Input() title: string | null = "Pedidos";
  @Output() buttonClick = new EventEmitter<string>();

  view: [number, number] = [500, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Meses';
  showYAxisLabel = false;
  yAxisLabel = 'Clientes';

  activeIdentifier: string | null = null;

  data = [
    { name: 'Pendentes', value: 862 },
    { name: 'Processando', value: 789 },
    { name: 'Entregues', value: 450 },
    { name: 'Cancelados', value: 380 }
  ];

  colorScheme: any = {
    domain: [this.color]
  };

  constructor() {}

  ngOnInit(): void {
    this.colorScheme = { domain: [this.color] };
  }

  getRandomDataForPeriod(period: string): any[] {
    switch (period) {
      default:
        return this.getOrderData();
    } 
  }


  getOrderData(): any[] {
    return [
      { name: 'Pendentes', value: Math.random() * 2000},
      { name: 'Processando', value: Math.random() * 2000 },
      { name: 'Entregues', value: Math.random() * 2000 },
      { name: 'Cancelados', value: Math.random() * 2000 }
    ];
  }

  updateChartData(timePeriod: string) {
    const newData = this.getRandomDataForPeriod(timePeriod);
    this.buttonClick.emit(timePeriod);
    this.activeIdentifier = timePeriod;
    this.data = newData;
  }

  isActive(identifier: string): boolean {
    return this.activeIdentifier === identifier;
  }
}