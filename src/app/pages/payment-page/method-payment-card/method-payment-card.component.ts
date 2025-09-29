import { Component, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PaymentMethodType } from '../../../data/card.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-payment-card',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule],
  templateUrl: './method-payment-card.component.html',
  styleUrls: ['./method-payment-card.component.css']
})
export class MethodPaymentCardComponent implements OnInit, OnChanges{
  selectedMethod: PaymentMethodType | null = null;

  @Input() setMethod: PaymentMethodType | null = null;

  @Output() selectedPayment: EventEmitter<PaymentMethodType> = new EventEmitter();

  PaymentMethod = PaymentMethodType;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  selectMethod(method: PaymentMethodType) {
    this.selectedPayment.emit(method);
    this.selectedMethod = method;
  }

  shouldShowCard(method: PaymentMethodType): boolean {
    if (!this.setMethod) {
      return true;
    }
    return method === this.setMethod;
  }
}