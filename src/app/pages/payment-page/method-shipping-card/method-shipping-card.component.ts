import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-shiping-card',
  imports: [CommonModule],
  templateUrl: './method-shipping-card.component.html',
  styleUrl: './method-shipping-card.component.css'
})
export class MethodShippingCardComponent {

  @Input() deliveryPrice: string | undefined;
  @Output() selectedMethod: EventEmitter<string> = new EventEmitter();

  selectMethod(method: string) {
    this.selectedMethod.emit(method)
  }
}
