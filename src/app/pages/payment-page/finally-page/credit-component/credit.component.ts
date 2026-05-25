import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentsTable, PaymentCard, PaymentCredit, PaymentResponse, ThreeDSSession } from '../../../../data/payment.data';
import { PaymentService } from '../../../../service/payment.service';
import { InstallmentTableComponent } from "../installment-table/installment-table.component";
import { CardComponent } from '../card/card.component';
import { BtnConfirmComponent } from '../../../../shared/btn/btn-confirm/btn-confirm.component';
import { BarComponent } from '../../../../shared/bar/bar.component';
import { PaidComponent } from '../paid/paid.component';

@Component({
  selector: 'app-credit',
  imports: [
    CommonModule,
    InstallmentTableComponent,
    CardComponent,
    BarComponent,
    BtnConfirmComponent,
    PaidComponent
],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css'
})
export class CreditComponent implements OnInit {

  @Input() cartId!: string | null;
  @Input() totalValue!: number;
  @Input() creditData: PaymentCredit | undefined;
  @Input() installment: InstallmentsTable | undefined;

  @Input() taxValue: number = 0;
  @Input() criteriaValue: number = 0;
  @Input() minValue: number = 0;
  @Input() maxValue: number = 0;

  paidData!: PaymentResponse;
  error: boolean = false;

  installments!: number;
  cardData: PaymentCard | undefined;

  isLoading: boolean = true;

  constructor (private paymentService: PaymentService){}

  ngOnInit(): void {
    console.log(this.creditData)
  }

  onConfirmFinally() {
    if (this.cardData && this.cartId) {
      let creditCard: PaymentCredit = {
        card: this.cardData,
        installments: this.installments,
        encrypted: ""
      };
      // this.paymentService.processCreditCardPayment(creditCard, this.cartId).subscribe({
      //   next: (response) => {
      //     this.paidData = response;
      //   },
      //   error: (err) => {
      //     this.error = true;
      //   }
      // });
    } 
  }

  statusPayment(status: string) {
    if (status == "PAID") {
      
    }
  }

  onUpdateInfo($event: PaymentCard) {
    this.cardData = $event
  }

  selectedInstallment(installment: InstallmentsTable) {
    this.installments = installment.number;
  }

}
