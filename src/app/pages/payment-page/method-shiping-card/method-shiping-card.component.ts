import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-shiping-card',
  imports: [CommonModule],
  templateUrl: './method-shiping-card.component.html',
  styleUrl: './method-shiping-card.component.css'
})
export class MethodShipingCardComponent {

  selectedMethod: string | null = null;

  selectMethod(method: string) {
    this.selectedMethod = method;
  }
}
