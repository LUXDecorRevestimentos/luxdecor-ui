import { ChangeDetectorRef, Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { OrderStatus, OrderStatusLabels } from '../../../data/table.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-status',
  imports: [CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent implements OnInit {

  @Input() orderStatus!: OrderStatus | number;

  orderStatusLabel: string = 'Unknown Status';
  orderColor: string = 'white';


  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderStatus']) {}
  }
  ngOnInit(): void {
    this.updateStatusDisplay();
  }

  private updateStatusDisplay(): void {
    const statusCode = typeof this.orderStatus === 'number' 
      ? this.orderStatus 
      : this.orderStatus as number;
    
    this.orderStatusLabel = OrderStatusLabels[statusCode] || 'Unknown Status';
    this.orderColor = this.getBackgroundColor(statusCode);
  }

  private getBackgroundColor(statusCode: number): string {
    switch (statusCode) {
      case OrderStatus.PAYMENT: // 0
        return '#ffcc00';
      case OrderStatus.PENDING: // 1
        return '#ffcc00';
      case OrderStatus.INSTALLATION: // 2
        return '#00cc44';
      case OrderStatus.UNDERWAY: // 3
        return 'rgba(255, 51, 0, 0.7)';
      case OrderStatus.FINISHED: // 4
        return 'rgba(30, 214, 68, 0.7)';
      case OrderStatus.CANCELLED: // 5
        return '#ff3300';
      default:
        return 'white';
    }
  }
}