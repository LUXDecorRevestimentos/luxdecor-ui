import { Component, Input, OnInit } from '@angular/core';
import { OrderCardData } from '../../../data/card.data';
import { BarComponent } from '../../../shared/bar/bar.component';

@Component({
  selector: 'app-card-order',
  imports: [BarComponent],
  templateUrl: './card-order.component.html',
  styleUrl: './card-order.component.css'
})
export class CardOrderComponent implements OnInit {

  @Input() order: OrderCardData | null = null;
  
  ngOnInit(): void {
    console.log(this.order)
    console.log("data: " + this.order?.date)
  }

}
