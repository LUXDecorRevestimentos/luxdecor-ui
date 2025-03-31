import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-method-payment-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './method-payment-card.component.html',
  styleUrls: ['./method-payment-card.component.css']
})
export class MethodPaymentCardComponent {
  selectedMethod: string | null = null;

  selectMethod(method: string) {
    this.selectedMethod = method;
  }
}