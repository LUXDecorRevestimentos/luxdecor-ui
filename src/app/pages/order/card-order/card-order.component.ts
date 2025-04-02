import { Component, Input, OnInit } from '@angular/core';
import { OrderCardData } from '../../../data/card.data';
import { BarComponent } from '../../../shared/bar/bar.component';
import { OrderStatusLabels } from '../../../data/card.data';

@Component({
  selector: 'app-card-order',
  imports: [BarComponent],
  templateUrl: './card-order.component.html',
  styleUrl: './card-order.component.css'
})
export class CardOrderComponent implements OnInit {

  @Input() order: OrderCardData | null = null;
  status: string = "";

  ngOnInit(): void {
    console.log(this.order);
    console.log("data: " + this.order?.date);
    this.getLabelStatus();
  }

  getLabelStatus(): void {
    if (this.order && this.order.status !== undefined) {
      this.status = OrderStatusLabels[this.order.status] || 'Unknown Status';
    } else {
      this.status = 'No Status';
    }
  }
}
