import { Component, Input, OnInit } from '@angular/core';
import { OrderCardData } from '../../../data/card.data';
import { BarComponent } from '../../../shared/bar/bar.component';
import { OrderStatusLabels } from '../../../data/card.data';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-order',
  imports: [
    BarComponent, 
    CommonModule],
  templateUrl: './card-order.component.html',
  styleUrl: './card-order.component.css'
})
export class CardOrderComponent {

  @Input() order: OrderCardData | null = null;
  @Input() cartItems: any[] | null = null;
  @Input() isList: boolean = true;

  status: string = "";

  constructor( private router: Router ) {}

  get statusLabel(): string {
    const orderStatus = this.order?.status;
    if (orderStatus) {
      return OrderStatusLabels[orderStatus] || 'Status Desconhecido';
    } 
    return 'Nenhum Status';
  }
}
