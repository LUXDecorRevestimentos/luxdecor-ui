import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OrderDetailsTable, OrderUpdateStatus } from '../../../data/table.data';
import { OrderStatusLabels, OrderStatus } from '../../../data/table.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { OrderStatusComponent } from '../order-status/order-status.component';

@Component({
  selector: 'app-order-status-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    OrderStatusComponent
  ],
  templateUrl: './order-status-update.component.html',
  styleUrls: ['./order-status-update.component.css']
})
export class OrderStatusUpdateComponent implements OnChanges, OnInit {
  
  @Input() order!: OrderUpdateStatus;
  
  @Output() savedOrder = new EventEmitter<OrderUpdateStatus>();

  protected lastOrder!: OrderUpdateStatus;
  protected currentOrder: OrderUpdateStatus | undefined;
  protected nextStatus!: OrderStatus;
  readonly OrderStatusLabels = OrderStatusLabels;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.currentOrder = undefined;
    if (changes['order'] && this.order) {
      setTimeout(() => this.currentOrder = { ...this.order }, 0);
      this.lastOrder = { ...this.order };
      this.nextStatus = this.getNextStatus(this.order.status);      
    }
  }

  onStatusChange(selected: MatSelectChange){
    if(this.currentOrder)
      this.currentOrder.status = selected.value
  }

  protected getOrderStatusOptions(): OrderStatus[] {
    return Object.values(OrderStatus)
      .filter((value): value is OrderStatus => typeof value === 'number');
  }

  protected getNextStatus(currentStatus: OrderStatus): OrderStatus {
    const next = currentStatus + 1;
    return next in OrderStatus ? next : currentStatus;
  }

  protected onSaveOrder(): void {
    if (this.currentOrder)
      this.savedOrder.emit({...this.currentOrder});
  }
}