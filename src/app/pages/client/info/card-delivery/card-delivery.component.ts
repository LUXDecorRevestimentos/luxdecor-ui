import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientInfoResponse } from '../../../../data/client.data';
import { CommonModule } from '@angular/common';
import { ModalEditAddressComponent } from '../modal-edit-address/modal-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { CepFormatPipe } from "../../../../shared/pipe/cep-format.pipe";

@Component({
  selector: 'app-card-delivery',
  imports: [CommonModule, CepFormatPipe],
  templateUrl: './card-delivery.component.html',
  styleUrl: './card-delivery.component.css'
})
export class CardDeliveryComponent implements OnInit {

  @Input() clientData: ClientInfoResponse | undefined;

  @Output() clientAddressUpdate = new EventEmitter();

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    if(this.clientData){}
  }

  openModal(){
      const dialogRef = this.dialog.open(ModalEditAddressComponent, {
        width: '400px',
        data: {
          clientInfo: this.clientData
        }
      })
      dialogRef.componentInstance.clientAddressUpdate.subscribe(event => {
        this.clientAddressUpdate.emit(event)
      })
    }
  

}
