import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxChartsModule], // Importe o módulo necessário
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  // Opções do gráfico
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Países';
  showYAxisLabel = true;
  yAxisLabel = 'População';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Dados do gráfico
  data = [
    {
      "name": "Alemanha",
      "value": 40632
    },
    {
      "name": "Estados Unidos",
      "value": 49737
    },
    {
      "name": "França",
      "value": 36745
    },
    {
      "name": "Reino Unido",
      "value": 36240
    },
    {
      "name": "Brasil",
      "value": 33000
    }
  ];

  // Método para evento de seleção
  onSelect(event: any) {
    console.log('Item selecionado:', event);
  }
}