import { Component, Input, OnInit } from '@angular/core';
import { PaymentCard, PaymentDebit } from '../../../../data/payment.data';
import { PaymentService } from '../../../../service/payment.service';
import { CardComponent } from '../card/card.component';
import { BarComponent } from '../../../../shared/bar/bar.component';
import { BtnConfirmComponent } from '../../../../shared/btn/btn-confirm/btn-confirm.component';

@Component({
  selector: 'app-debit',
  imports: [
    CardComponent,
    BarComponent,
    BtnConfirmComponent
  ],
  templateUrl: './debit.component.html',
  styleUrl: './debit.component.css'
})
export class DebitComponent implements OnInit {

  @Input() cartId!: string | null;
  @Input() totalValue!: number;

  installments!: number;
  cardData: PaymentCard | undefined;

  isLoading: boolean = true;

  constructor (private paymentService: PaymentService) {}

  ngOnInit(): void {}

  onConfirmFinally() {
    if (this.cardData && this.cartId) {
      let debitCard: PaymentDebit = {
        card: this.cardData,
        encrypted: ""
      };
      this.paymentService.processDebitCardPaymentWith3DS(debitCard, this.cartId, this.totalValue).subscribe({
        next: () => console.log('Ambiente PagBank inicializado e pronto!'),
        error: (err) => {
          console.error('Erro ao iniciar o PagBank. O formulário não deve ser usado.', err);
        }
      })
    }
  }

  onUpdateInfo($event: PaymentCard) {
    this.cardData = $event
  }

}
