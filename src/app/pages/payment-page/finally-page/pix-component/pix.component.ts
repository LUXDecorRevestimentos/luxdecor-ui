import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaymentPixResponse, PaymentResponse } from '../../../../data/payment.data';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../../service/payment.service';
import { BarComponent } from '../../../../shared/bar/bar.component';
import { BtnConfirmComponent } from '../../../../shared/btn/btn-confirm/btn-confirm.component';
import { ProgressBarComponent } from '../../../../shared/progress-bar/progress-bar.component';
import { PaidComponent } from '../paid/paid.component';

@Component({
  selector: 'app-pix',
  imports: [
    CommonModule,
    BarComponent,
    BtnConfirmComponent,
    ProgressBarComponent,
    PaidComponent
  ],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.css'
})
export class PixComponent implements OnInit {

  @Input() cartId: string | null = "";
  @Input() cartStatus: number = 0;

  @Input() pixData: PaymentPixResponse | undefined;

  paidData!: PaymentResponse;
  error: boolean = false;

  isLoading: boolean = true;

  paid: boolean = false;

  constructor(
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {}

  onConfirmFinally(){
    if (this.cartId) {
      this.isLoading = true;
      this.paymentService.generatePaymentPix(this.cartId).subscribe({
        next: (response: PaymentPixResponse) => {
          this.isLoading = false;
          this.pixData = response;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = true;
        }
      });
    }
  }

  handleTimerCompletion(): void {
    if(this.pixData){
      this.paidData = {
        cart_id:  this.pixData.reference_id,
        address: "",
        status: "PAID",
        timestamp: "2025-10-26 15:18:47",
        installations: [],
        installments: undefined,
        shipping: "",
        value: "1000,00"
      }
      this.paid = true;
    }
  }
  copyPixCode() {
    if (this.pixData?.qr_code?.links?.text) {
      navigator.clipboard.writeText(this.pixData.qr_code.links.text);
      alert('Código PIX copiado!');
    }
  }

}
