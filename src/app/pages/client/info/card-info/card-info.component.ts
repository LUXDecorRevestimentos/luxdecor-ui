import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ModalEditClientComponent } from '../modal-edit-client/modal-edit-client.component';
import { ClientInfoResponse } from '../../../../data/client.data';

@Component({
  selector: 'app-card-info',
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent implements OnInit{

  @Input() clientData: ClientInfoResponse | undefined;

  @Output() buttonClick = new EventEmitter();

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    if (this.clientData){}
  }

  openModal(){
    this.dialog.open(ModalEditClientComponent, {
      width: '400px',
      data: {
        clientInfo: this.clientData
      }
    })
  }

  signOut(){
    this.buttonClick.emit();
    location.reload();
  }
}
