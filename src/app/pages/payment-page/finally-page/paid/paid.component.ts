import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaymentResponse } from '../../../../data/payment.data';
import { InstallmentTableComponent } from '../installment-table/installment-table.component';

@Component({
  selector: 'app-paid',
  imports: [
    CommonModule,
    InstallmentTableComponent
  ],
  templateUrl: './paid.component.html',
  styleUrl: './paid.component.css'
})
export class PaidComponent {

  @Input() paidData!: PaymentResponse;
  @Input() error: boolean = true;

}
