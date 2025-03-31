import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { OrderService } from '../../service/order.service';
import { OrderCardData, OrderStatus} from "../../data/card.data";

@Component({
  selector: 'app-order-page',
  imports: [MatTabsModule],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit {

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
