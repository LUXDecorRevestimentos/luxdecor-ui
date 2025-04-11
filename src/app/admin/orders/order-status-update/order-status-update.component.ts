import { Component, Input } from '@angular/core';
import { OrderDetailsTable } from '../../../data/table.data';
import { OrderStatusComponent } from '../order-status/order-status.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { OrderStatusLabels, OrderStatus } from '../../../data/table.data';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-order-status-update',
  imports: [
    OrderStatusComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIcon],
  templateUrl: './order-status-update.component.html',
  styleUrl: './order-status-update.component.css'
})
export class OrderStatusUpdateComponent {
  
  @Input() order!: OrderDetailsTable;  

  OrderStatusLabels = OrderStatusLabels;


  getOrderStatusOptions(): number[] {
    return Object.keys(OrderStatus).map(key => +key);
  }

  getLabelStatus(orderStatus: OrderStatus): string {
    let orderStatusLabel: string = "";
    if ( orderStatus && orderStatus !== undefined) {
      orderStatusLabel = OrderStatusLabels[orderStatus] || 'Unknown Status';
    }
    return orderStatusLabel;
  }

}
