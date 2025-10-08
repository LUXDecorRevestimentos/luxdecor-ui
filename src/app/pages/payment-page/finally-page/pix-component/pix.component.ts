import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaymentPixResponse } from '../../../../data/payment.data';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../../service/payment.service';
import { BarComponent } from '../../../../shared/bar/bar.component';
import { BtnConfirmComponent } from '../../../../shared/btn/btn-confirm/btn-confirm.component';

@Component({
  selector: 'app-pix',
  imports: [
    CommonModule,
    BarComponent,
    BtnConfirmComponent
  ],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.css'
})
export class PixComponent implements OnInit {

  @Input() cartId: string | null = "";

  pixData: PaymentPixResponse | undefined;

  isLoading: boolean = true;

  constructor(
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {}

  onConfirmFinally(){
    if(this.cartId){
      this.paymentService.generatePaymentPix(this.cartId).subscribe({
      next: (response: PaymentPixResponse) => {
        this.isLoading = false;
        this.pixData = response;
        console.log(response)
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
    }
  }

  copyPixCode() {
    if (this.pixData?.qr_code?.links?.text) {
      navigator.clipboard.writeText(this.pixData.qr_code.links.text);
      alert('Código PIX copiado!');
    }
  }

}
