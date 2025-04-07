import { Component, Input } from '@angular/core';
import { ClientData } from '../../data/client.data';
import { BarComponent } from '../../../shared/bar/bar.component';

@Component({
  selector: 'app-order-client',
  imports: [BarComponent],
  templateUrl: './order-client.component.html',
  styleUrl: './order-client.component.css'
})
export class OrderClientComponent {
  @Input() client!: ClientData;
}
