import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CartCardItemData } from '../../data/card.data';

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
  priceLabel: string = "0,00 x (1)";

  ngOnInit(): void {
    if (this.cart) {
      this.count = parseInt(this.cart.amount) || 1;
      this.priceLabel = this.getPriceLabel(this.cart.price, parseInt(this.cart.amount))
   }
  }

  onCheckboxChange(event: any): void {
    this.checkChange.emit(event.checked);
  }

  getPriceLabel(totalPrice: string, amount: number): string {
    if (this.config){
      return ` R$${totalPrice}`; 
    }
    const numericTotal = this.parseCurrency(totalPrice);
    const unitPrice = amount > 0 ? numericTotal / amount : 0;
    const formattedUnitPrice = this.formatCurrency(unitPrice);
    return `${formattedUnitPrice} x (${amount})`;
  }

  private parseCurrency(value: string): number {
    return parseFloat(
      value.replace(/\./g, '')
          .replace(',', '.')
    );
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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
    }
    this.emitOrderUpdate();
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