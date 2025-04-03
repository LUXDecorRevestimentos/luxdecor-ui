import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-shiping-card',
  imports: [CommonModule],
  templateUrl: './method-shipping-card.component.html',
  styleUrl: './method-shipping-card.component.css'
})
export class MethodShippingCardComponent {

  selectedMethod: string | null = null;

  selectMethod(method: string) {
    this.selectedMethod = method;
  }
}
