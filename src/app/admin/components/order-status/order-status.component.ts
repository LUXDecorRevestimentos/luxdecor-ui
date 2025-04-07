import { Component, Input } from '@angular/core';
import { OrderStatus, OrderStatusLabels } from '../../../data/table.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-status',
  imports: [CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent {

  @Input() orderStatus!: OrderStatus;
  @Input() ostatus!: OrderStatus;


  getLabelStatus(orderStatus: OrderStatus): string {
    let orderStatusLabel: string = "";
    if ( orderStatus && orderStatus !== undefined) {
      orderStatusLabel = OrderStatusLabels[orderStatus] || 'Unknown Status';
    }
    return orderStatusLabel;
  }

  getBackgroundColor(orderStatus: OrderStatus): string {
    switch (orderStatus) {
      case OrderStatus.PENDING:
        return '#ffcc00'; // Amarelo claro
      case OrderStatus.SENT:
        return '#00cc44'; // Verde escuro com transparência
      case OrderStatus.UNDERWAY:
        return 'rgba(255, 51, 0, 0.7)'; // Vermelho com 70% de transparência
      case OrderStatus.FINISHED:
        return 'rgba(30, 214, 68, 0.7)'; // Verde lima com 70% de transparência
      case OrderStatus.CANCELLED:
        return '#ff3300'; // Vermelho sem transparência
      default:
        return 'white';
    }
  }
        
}
