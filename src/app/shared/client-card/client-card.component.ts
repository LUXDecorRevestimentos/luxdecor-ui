import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClientInfoResponse } from '../../data/client.data';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from '../pipe/phone-format.pipe';
import { CepFormatPipe } from "../pipe/cep-format.pipe";

@Component({
  selector: 'app-client-card',
  imports: [CommonModule, PhoneFormatPipe, CepFormatPipe],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent implements OnInit, OnChanges{

  @Input() clientData!: ClientInfoResponse;

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
}
