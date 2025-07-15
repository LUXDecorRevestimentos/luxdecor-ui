import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-shiping-card',
  imports: [CommonModule],
  templateUrl: './method-shipping-card.component.html',
  styleUrl: './method-shipping-card.component.css'
})
export class MethodShippingCardComponent  implements OnInit, OnChanges{

  activeIdentifier: string | null = null;

  @Input() deliveryPrice: string | undefined;
  @Output() selectedMethod: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  isActive(identifier: string): boolean {
    return this.activeIdentifier === identifier;
  }
  selectMethod(method: string) {
    if (method === 'entrega') {
      this.selectedMethod.emit(this.deliveryPrice);
    } else if (method === 'retirada'){
      this.selectedMethod.emit(undefined);
    }
    this.activeIdentifier = method;
  }
}
