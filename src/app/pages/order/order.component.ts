import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderService } from '../../service/order.service';
import { CardOrderComponent } from './card-order/card-order.component'
import { OrderCardData, OrderStatus} from "../../data/card.data";
import { MatIcon } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';

@Component({
  selector: 'app-order-page',
  imports: [
    MatTabsModule,
    CommonModule,
    CardOrderComponent,
    MatIcon,
    MatStepperModule,
    BtnContinueComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: OrderCardData[] = [];
  orderUnderway: OrderCardData[] = [];
  orderFinished: OrderCardData[] = [];
  selectedOrder: OrderCardData | null = null;
  openItem: boolean = false;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.orderService.getOrderData().subscribe(
      (data: OrderCardData[]) => {
        this.orders = data;
        this.orderUnderway = this.orders.filter(item => item.status === OrderStatus.UNDERWAY);
        this.orderFinished = this.orders.filter(item => item.status === OrderStatus.FINISHED);
      }
    );
  }

  selectOrder(order: OrderCardData) {
    if (this.isMobileView()) {
      this.selectedOrder = order;
      this.openItem = true;
    }
  }

  isMobileView(): boolean {
    return window.innerWidth < 1000;
  }

  isDesktopView(): boolean {
    return window.innerWidth >= 1000;
  }

}
