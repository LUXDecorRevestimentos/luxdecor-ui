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

  @Input() deliveryMethod: boolean | null = null; 

  @Output() selectedMethod: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deliveryMethod'] || changes['deliveryPrice']) {
      this.initializeSelection();
    }
  }

  private initializeSelection(): void {
    if (this.deliveryMethod !== null && this.deliveryMethod !== undefined) {
      if (this.deliveryMethod === true) {
        this.activeIdentifier = 'entrega';

        this.selectedMethod.emit(this.deliveryPrice);
      } else {
        this.activeIdentifier = 'retirada';
        this.selectedMethod.emit(undefined);
      }
    }
  }

  isActive(identifier: string): boolean {
    return this.activeIdentifier === identifier;
  }

  selectMethod(method: string) {
    if (this.deliveryMethod !== null && this.deliveryMethod !== undefined) {
      return;
    }

    if (method === 'entrega') {
      this.selectedMethod.emit(this.deliveryPrice);
    } else if (method === 'retirada') {
      this.selectedMethod.emit(undefined);
    }
    this.activeIdentifier = method;
  }

  isForcedMode(): boolean {
    return this.deliveryMethod !== null && this.deliveryMethod !== undefined;
  }

  shouldShowInForcedMode(method: string): boolean {
    if (!this.isForcedMode()) return true;
    
    return (this.deliveryMethod && method === 'entrega') || 
           (!this.deliveryMethod && method === 'retirada');
  }
}
