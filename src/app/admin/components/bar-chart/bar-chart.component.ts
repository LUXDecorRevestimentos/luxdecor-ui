import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, BtnComponent],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges{
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
    this.view[0] = this.width;
    this.view[1] = this.height;
    this.widthContainer = this.widthContainer;
  }
    
  ngOnChanges(changes: SimpleChanges): void {}

  onSelect(event: any) {
    console.log(event)
    this.customColors = [
      {
        name: event.name,
        value: ''
      }
    ];
  }

  updateChartData(timePeriod: string) {
    this.buttonClick.emit(timePeriod);
    this.activeIdentifier = timePeriod;
    let newData = this.data;
    this.data = newData;
  }

  isActive(identifier: string): boolean {
    return this.activeIdentifier === identifier;
  }
}