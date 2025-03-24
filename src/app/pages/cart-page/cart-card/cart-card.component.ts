import { Component, Input } from '@angular/core';
import { CartCardData } from '../../../data/card.data'
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-cart-card',
  imports: [MatIcon],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
  @Input() cart: CartCardData | null = null;

  count: number = 1;

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  updateCount(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value, 10);

    if (!isNaN(newValue)){
      this.count = newValue;
    } else {
      this.count = 1;
    }
  }
}
