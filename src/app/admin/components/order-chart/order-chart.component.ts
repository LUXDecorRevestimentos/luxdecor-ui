import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';
import { AnyTxtRecord } from 'node:dns';

@Component({
  selector: 'app-order-chart',
  imports: [NgxChartsModule, CommonModule, BtnComponent],
  templateUrl: './order-chart.component.html',
  styleUrl: './order-chart.component.css'
})
export class OrderChartComponent implements OnInit, OnChanges{
  @Input() color: string | null = "#E0AD3E";
  @Input() title: string | null = "Pedidos";
  @Input() width!: number | 500;
  @Input() height!: number | 400;
  @Input() chartData: any;
  @Output() buttonClick = new EventEmitter<string>();

  view: [number, number] = [this.width, this.height];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Meses';
  showYAxisLabel = false;
  yAxisLabel = 'Pedidos';

  activeIdentifier: string | null = null;

  data = [
    { name: 'Pendentes', value: 0 },
    { name: 'Processando', value: 0 },
    { name: 'Entregues', value: 0 },
    { name: 'Cancelados', value: 0 }
  ];

  colorScheme: any = {
    domain: [this.color]
  };

  constructor() {}

  ngOnInit(): void {
    this.colorScheme = { domain: [this.color] };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.chartData)
      this.data = this.chartData
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