import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../../components/btn/btn.component';

@Component({
  selector: 'app-sales-chart',
  imports: [ CommonModule, NgxChartsModule, BtnComponent ],
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.css'
})
export class SalesChartComponent {
  @Input() color: string | null = "#3e74e0";
  @Input() title: string | null = "Pedidos";
  @Output() buttonClick = new EventEmitter<string>();

  view: [number, number] = [350, 200];
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
        return this.getSalesData();
    } 
  }

  getSalesData(): any[] {
    return [
      { name: 'Piso (Laminado)', value: Math.random() * 2000},
      { name: 'Piso (Vinilico)', value: Math.random() * 2000 },
      { name: 'Rodape (MDF)', value: Math.random() * 2000 },
      { name: 'Colchoes (Castor)', value: Math.random() * 2000 },
      { name: 'Outros (Cola)', value: Math.random() * 2000 }
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
