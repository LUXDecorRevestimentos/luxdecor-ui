import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentsTable, PaymentCard, PaymentCredit, ThreeDSSession } from '../../../../data/payment.data';
import { PaymentService } from '../../../../service/payment.service';
import { InstallmentTableComponent } from "../installment-table/installment-table.component";
import { CardComponent } from '../card/card.component';
import { BtnConfirmComponent } from '../../../../shared/btn/btn-confirm/btn-confirm.component';
import { BarComponent } from '../../../../shared/bar/bar.component';
import { PagBankService } from '../../../../service/pagbank.service';

@Component({
  selector: 'app-credit',
  imports: [
    CommonModule,
    InstallmentTableComponent,
    CardComponent,
    BarComponent,
    BtnConfirmComponent
],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css'
})
export class CreditComponent implements OnInit {

  @Input() cartId!: string | null;
  @Input() totalValue!: number;

  installments!: number;
  cardData: PaymentCard | undefined;

  isLoading: boolean = true;

  constructor (private paymentService: PaymentService){}

  ngOnInit(): void {}

  onConfirmFinally() {
    console.log(this.cardData)
    if (this.cardData && this.cartId) {
      let creditCard: PaymentCredit = {
        card: this.cardData,
        installments: this.installments,
        encrypted: ""
      };
      console.log(creditCard)
      this.paymentService.processCreditCardPayment(creditCard, this.cartId).subscribe({
        next: () => console.log('Ambiente PagBank inicializado e pronto!'),
        error: (err) => {
          console.error('Erro ao iniciar o PagBank. O formulário não deve ser usado.', err);
        }
      });
    }
  }

  onUpdateInfo($event: PaymentCard) {
    this.cardData = $event
  }

  selectedInstallment(installment: InstallmentsTable) {
    this.installments = installment.number;
  }

}
