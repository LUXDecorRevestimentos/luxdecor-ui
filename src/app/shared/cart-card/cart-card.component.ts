import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CartCardItemData } from '../../data/card.data'
import { mergeWith } from 'rxjs';

@Component({
  selector: 'app-cart-card',
  imports: [MatIcon, MatCheckboxModule, CommonModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent implements OnInit{
  @Input() display: boolean = true;
  @Input() cart: CartCardItemData | null = null;
  @Input() checked: boolean = false;
  @Output() checkChange = new EventEmitter<boolean>();
  @Output() orderUpdate:  EventEmitter<[string, string, number]> = new EventEmitter();
  @Output() orderRemove = new EventEmitter<string>();

  count: number = 1;


  ngOnInit(): void {
    if (this.cart){
      this.count = parseInt(this.cart.amount)
    }
  }

  onCheckboxChange(event: any) {
    this.checkChange.emit(event.checked);
  }

  increment() {
    this.count++;
    if(this.cart)
      this.orderUpdate.emit([this.cart.id, this.cart.product_id, this.count])

  }

  decrement() {
    this.count--;
    if (this.cart)
    if (this.count <= 0) {
      this.orderRemove.emit(this.cart.id)
    } else {
      this.orderUpdate.emit([this.cart.id, this.cart.product_id, this.count])
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
