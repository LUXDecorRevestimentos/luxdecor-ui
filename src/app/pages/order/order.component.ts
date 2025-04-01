import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderService } from '../../service/order.service';
import { CardOrderComponent } from './card-order/card-order.component';
import { OrderCardData, OrderStatus} from "../../data/card.data";
import { CardComponent } from "../../shared/card/default/card-default.component";

@Component({
  selector: 'app-order-page',
  imports: [
    MatTabsModule,
    CommonModule,
    CardOrderComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  orders: OrderCardData[] = [];

  orderUnderway: OrderCardData[] = [];
  orderFinished: OrderCardData[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.orderService.getOrderData().subscribe(
      (data: OrderCardData[]) => {
        this.orders = data;
      }
    );

    this.orderUnderway = this.orders.filter(item => item.status === OrderStatus.UNDERWAY);
    this.orderFinished = this.orders.filter(item => item.status === OrderStatus.FINISHED);    
  }

}
