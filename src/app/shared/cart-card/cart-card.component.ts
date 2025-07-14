import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CartCardItemData } from '../../data/card.data';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-cart-card',
  imports: [MatIcon, MatCheckboxModule, CommonModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
  @Input() display: boolean = true;
  @Input() cart: CartCardItemData | null = null;
  @Input() checked: boolean = false;
  @Input() config: boolean = true;
  @Output() checkChange = new EventEmitter<boolean>();
  @Output() orderUpdate = new EventEmitter<[string, string, number]>();
  @Output() orderRemove = new EventEmitter<string>();
  @Output() countChange = new EventEmitter<number>();

  count: number = 1;
  priceLabel: string = "";

  ngOnInit(): void {
    if (this.cart) {
      this.count = parseInt(this.cart.amount) || 1;
    }
    console.log(this.cart)
  }

  onCheckboxChange(event: any): void {
    this.checkChange.emit(event.checked);
  }

  increment(): void {
    this.count++;
    this.countChange.emit(this.count);
    this.emitOrderUpdate();
  }

  decrement(): void {
    this.count--;
    if (this.count <= 0) {
      this.orderRemove.emit(this.cart?.id);
    } else {
      this.countChange.emit(this.count);
      this.emitOrderUpdate();
    }
  }

  updateCount(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value, 10);
    this.count = isNaN(newValue) ? 1 : newValue;
    this.countChange.emit(this.count);
    this.emitOrderUpdate();
  }

  productPrice(): string{
    this.cart?.price 
    return ""
  }

  private emitOrderUpdate(): void {
    if (this.cart) {
      this.orderUpdate.emit([this.cart.id, this.cart.product_id, this.count]);
    }
  }
}