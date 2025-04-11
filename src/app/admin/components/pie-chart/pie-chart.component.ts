import { Component, OnInit } from '@angular/core';
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
  data: any[] = [];
  view: [number, number] = [570, 400];  // Made consistent with template
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Countries';
  showYAxisLabel = false;
  yAxisLabel = 'Value';

  // Custom color scheme
  colorScheme: any = {
    // domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // Original colors
    // Alternative color schemes:
    // domain: ['#3366cc', '#dc3912', '#ff9900', '#109618'] // Google Analytics colors
    domain: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'] // Modern colors
  };
  
  selectedOption: string = 'Mais Vendidos';

  ngOnInit() {
    this.data = [
      { "name": "Piso", "value": Math.floor(Math.random() * 100000) },
      { "name": "Rodape", "value": Math.floor(Math.random() * 100000) },
      { "name": "Servicos", "value": Math.floor(Math.random() * 100000) }, 
      { "name": "Outros", "value": Math.floor(Math.random() * 100000) },
    ];
  }

  onSelectChange(event: any) {
    this.selectedOption = event;
    this.data = [
      { "name": "Piso", "value": Math.floor(Math.random() * 100000) },
      { "name": "Rodape", "value": Math.floor(Math.random() * 100000) },
      { "name": "Servicos", "value": Math.floor(Math.random() * 100000) }, 
      { "name": "Outros", "value": Math.floor(Math.random() * 100000) },
    ];
  }
}