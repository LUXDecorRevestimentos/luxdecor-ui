import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BarComponent } from '../../../../shared/bar/bar.component';
import { BtnConfirmComponent } from '../../../../shared/btn/btn-confirm/btn-confirm.component';
import { PaymentService } from '../../../../service/payment.service';
import { PaymentBankSlip } from '../../../../data/payment.data';

@Component({
  selector: 'app-split',
  imports: [
    CommonModule,
    BarComponent,
    BtnConfirmComponent
  ],
  templateUrl: './bankslip.component.html',
  styleUrl: './bankslip.component.css'
})
export class BankSlipComponent implements OnInit {

  @Input() cartId: string | null = "";
  @Input() totalValue!: number;

  bankSlipData: PaymentBankSlip | undefined;

  isLoading!: boolean;

  constructor(private paymentService: PaymentService){}

  ngOnInit(): void {
    console.log("Open Split")
  }

  onConfirmFinally(){
    if(this.cartId){
      this.paymentService.generatePaymentBankSlip(this.cartId).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.bankSlipData = response;
        console.log(response)
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
    }
  }

}
