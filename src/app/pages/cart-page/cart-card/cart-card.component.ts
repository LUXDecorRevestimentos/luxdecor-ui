import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartCardData } from '../../../data/card.data'
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-cart-card',
  imports: [MatIcon, MatCheckboxModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
  @Input() cart: CartCardData | null = null;
  @Input() checked: boolean = false;
  @Output() checkChange = new EventEmitter<boolean>();

  onCheckboxChange(event: any) {
    this.checkChange.emit(event.checked);
  }
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
