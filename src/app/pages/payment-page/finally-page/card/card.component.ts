import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardNumberFormatPipe } from '../../../../shared/pipe/card-number-pipe';
import { CommonModule } from '@angular/common';
import { PaymentCard } from '../../../../data/payment.data';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../../../../service/payment.service';
import { ModalCardComponent } from '../modal-card-component/modal-card.component';

@Component({
  selector: 'app-card',
  imports: [
    CardNumberFormatPipe,
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() cardData: PaymentCard | undefined;
  @Input() cartId!: string | null;
  @Input() totalValue!: number;

  @Output() cardDataUpdate = new EventEmitter<PaymentCard>();

  constructor ( public dialog: MatDialog ){}

  isLoading: boolean = true;
  onUpdateInfo($event: PaymentCard) {
    this.cardData = $event
    this.cardDataUpdate.emit($event)
  }

  ngOnInit(): void {
    console.log(this.cardData);
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalCardComponent, {
      width: '400px',
      data: {
        cardData: this.cardData
      }
    })
    dialogRef.componentInstance.cardDataUpdate.subscribe(event => {
      this.onUpdateInfo(event)
    })
  }

  clearCardData(){
    this.cardData = undefined;
  }
  

}
