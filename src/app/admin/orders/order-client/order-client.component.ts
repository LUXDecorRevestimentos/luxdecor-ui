import { Component, Input } from '@angular/core';
import { ClientData } from '../../data/client.data';
import { BarComponent } from '../../../shared/bar/bar.component';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-order-client',
  imports: [BarComponent],
  templateUrl: './order-client.component.html',
  styleUrl: './order-client.component.css'
})
export class OrderClientComponent {
  @Input() client!: ClientData;

  formatPhoneNumber(): string {
    const cleaned = this.client.phoneNumber.replace(/\D/g, '');
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  
}
