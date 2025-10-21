import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderService } from '../../service/order.service';
import { CardOrderComponent } from './card-order/card-order.component'
import { OrderCardData, OrderCardInfo, OrderStatus, OrderStatusLabels} from "../../data/card.data";
import { MatIcon } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { WhatsappComponent } from '../../shared/whatsapp/whatsapp.component';
import { BtnConfirmComponent } from '../../shared/btn/btn-confirm/btn-confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  imports: [
    MatTabsModule,
    CommonModule,
    CardOrderComponent,
    MatIcon,
    MatStepperModule,
    BtnContinueComponent,
    WhatsappComponent,
    BtnConfirmComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: OrderCardData[] = [];
  orderUnderway: OrderCardData[] = [];
  orderFinished: OrderCardData[] = [];
  selectedOrder: OrderCardData | null = null;
  orderInfoRespone: OrderCardInfo | null = null;
  openItem: boolean = false;

  cartItems: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.orderService.loadOrder().subscribe(
      (data: OrderCardData[]) => {
        this.orders = data;
        this.orderUnderway = this.orders;
        this.orderFinished = this.orders.filter(item => item.status === OrderStatus.FINISHED);
      }
    );
  }

  selectOrder(order: OrderCardData) {
    if (this.isMobileView()) {
      this.selectedOrder = order;
      this.openItem = true;
    }
    this.selectedOrder = this.orders.filter(item => item.id === order.id)[0];
    this.orderService.findOrder(order.id).subscribe({
      next: order => {
        this.orderInfoRespone = order
      },
      error: err => {}
    });
    this.cartItems = this.orders.filter(item => item.cartId === order.cartId);
  }

  navigateToCart(cartId: string, orderStatus: number) {
    console.log(orderStatus)
    if (orderStatus == 0) {
      this.router.navigate(['/cart'], {
        state: { 
          cart: {
            cartId: cartId
          }
        }
      });
    } else {
      this.router.navigate(['/payment'], {
        state: { 
          cart: {
            cartId: cartId,
            cartStatus: orderStatus
          }
        }
      });
    }

  }

  isMobileView(): boolean {
    return window.innerWidth < 1000;
  }

  isDesktopView(): boolean {
    return window.innerWidth >= 1000;
  }

  isStatusActive(status: string): boolean {
    if (!this.orderInfoRespone?.status_list) return false;
    
    const statusList = this.orderInfoRespone.status_list;
    const currentStatus = this.orderInfoRespone.current_status;
    
    return statusList.some(s => s.status === status) || currentStatus === status;
  }
}
