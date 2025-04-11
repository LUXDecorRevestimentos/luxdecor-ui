import { Component, Input, Output, EventEmitter, HostBinding, OnInit  } from '@angular/core';
import { NgxChartsModule, Color } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, BtnComponent],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  @Input() title: string | null = "";
  @Input() color: string | null = "#3941e093";
  @Input() data: any[] = [];

  @Input() width: number = 440;
  @Input() widthContainer: string = '';
  @Input() height: number = 300;
  
  @Output() buttonClick = new EventEmitter<string>();

  view: [number, number] = [this.width, this.height];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Meses';
  showYAxisLabel = false;
  yAxisLabel = 'Clientes';

  activeIdentifier: string | null = null;

  colorScheme: any = {
    domain: [this.color]
  };

  customColors: any;

  ngOnInit(): void {
    this.colorScheme = { domain: [this.color] };

    this.data = [
      { "name": "1/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "2/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "3/25", "value": Math.floor(Math.random() * 100000) }, 
      { "name": "4/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "5/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "6/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "7/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "8/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "9/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "10/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "11/25", "value": Math.floor(Math.random() * 100000) },
      { "name": "12/25", "value": Math.floor(Math.random() * 100000) }
    ];
    this.view[0] = this.width;
    this.view[1] = this.height;
    this.widthContainer = this.widthContainer;
  }
    

  onSelect(event: any) {

    this.customColors = [
      {
        name: event.name,
        value: ''
      }
    ];
  }

  updateChartData(timePeriod: string) {
    this.buttonClick.emit(timePeriod);

    let newData;

    switch (timePeriod) {
      case 'dia':
        newData = this.getRandomDataForPeriod('dia');
        break;
      case 'semana':
        newData = this.getRandomDataForPeriod('semana');
        break;
      case 'mes':
        newData = this.getRandomDataForPeriod('mes');
        break;
      case 'ano':
        newData = this.getRandomDataForPeriod('ano');
        break;
      default:
        newData = this.data;
    } 
    this.activeIdentifier = timePeriod;
    this.buttonClick.emit(timePeriod);

    this.data = newData;
  }

  getRandomDataForPeriod(period: string): any[] {
    switch (period) {
      case 'dia':
        const now = new Date();
        const dataPoints = [];
        for (let i = 0; i < 24; i++) {
          const hourValue = Math.floor(Math.random() * 1000);
          const date = new Date(now);
          date.setHours(i, 0, 0, 0);
          dataPoints.push({ name: `${date.getHours()}:00`, value: hourValue });
        }
        return dataPoints;
      case 'semana':
        const start = new Date();
        start.setDate(start.getDate() - start.getDay());
        const end = new Date(start);
        end.setDate(end.getDate() + 7);
        return Array.from({ length: 7 }, (_, i) => ({
          name: `${start.getDate() + i}/${start.getMonth() + 1}`,
          value: Math.floor(Math.random() * 100000)
        }));
      case 'mes':
        const monthNow = new Date();
        return Array.from({ length: 30 }, (_, i) => ({
          name: `${i + 1}/${monthNow.getMonth() + 1}`,
          value: Math.floor(Math.random() * 100000)
        }));
      case 'ano':
        return Array.from({ length: 12 }, (_, i) => ({
          name: `${i + 1}/25`,
          value: Math.floor(Math.random() * 100000)
        }));
      default:
        return this.data;
    }
  }

  isActive(identifier: string): boolean {
    return this.activeIdentifier === identifier;
  }
}