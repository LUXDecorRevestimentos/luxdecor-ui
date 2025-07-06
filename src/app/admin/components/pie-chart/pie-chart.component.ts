import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pie-chart',
  imports: [NgxChartsModule, CommonModule, FormsModule, MatSelectModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  @Input() data: any[]= [];
  @Output() select: EventEmitter<string> = new EventEmitter();

  view: [number, number] = [570, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = 'Value';

  colorScheme: any = {
    domain: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  };
  
  selectedOption: string = 'product';

  ngOnInit() {}

  onSelectChange(event: any) {
    this.selectedOption = event;
    this.select.emit(event)
  }
}