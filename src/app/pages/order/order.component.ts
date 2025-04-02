import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderService } from '../../service/order.service';
import { CardOrderComponent } from './card-order/card-order.component'
import { OrderCardData, OrderStatus} from "../../data/card.data";
import { MatIcon } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-order-page',
  imports: [
    MatTabsModule,
    CommonModule,
    CardOrderComponent,
    MatIcon,
    MatStepperModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: OrderCardData[] = [];
  orderUnderway: OrderCardData[] = [];
  orderFinished: OrderCardData[] = [];
  selectedOrder: OrderCardData | null = null;

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
    }
  }

  isMobileView(): boolean {
    return window.innerWidth < 1000;
  }

  isDesktopView(): boolean {
    return window.innerWidth >= 1000;
  }

  // Atualiza a visualização quando a janela é redimensionada
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.isDesktopView()) {
      this.selectedOrder = null;
    }
  }
}
