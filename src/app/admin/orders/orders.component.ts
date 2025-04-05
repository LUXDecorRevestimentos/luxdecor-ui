import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';

@Component({
  selector: 'app-orders',
  imports: [MatIcon, CardDataComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

}
