import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ModalEditClientComponent } from '../modal-edit-client/modal-edit-client.component';
import { ClientInfoResponse } from '../../../../data/client.data';
import { PhoneFormatPipe } from '../../../../shared/pipe/phone-format.pipe';
import { CpfFormatPipe } from "../../../../shared/pipe/cpf-format.pipe";
import { RgFormatPipe } from "../../../../shared/pipe/rg-format.pipe";

@Component({
  selector: 'app-card-info',
  imports: [MatCheckboxModule, CommonModule, PhoneFormatPipe, CpfFormatPipe, RgFormatPipe],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent implements OnInit{

  @Input() clientData: ClientInfoResponse | undefined;

  @Output() clientDataUpdate = new EventEmitter();

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    if (this.clientData){}
  }

  openModal(){
    const dialogRef = this.dialog.open(ModalEditClientComponent, {
      width: '400px',
      data: {
        clientInfo: this.clientData
      }
    })
    dialogRef.componentInstance.clientInfoUpdate.subscribe(event => {
      this.clientDataUpdate.emit(event)
    })
  }

  

  signOut(){
    location.reload();
  }
}
