import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-method-payment-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './method-payment-card.component.html',
  styleUrls: ['./method-payment-card.component.css']
})
export class MethodPaymentCardComponent {
  selectedMethod: string | null = null;

  @ViewChild('inkPix') inkPix!: ElementRef;
  @ViewChild('inkCredit') inkCredit!: ElementRef;

  constructor(private renderer: Renderer2) {}

  selectMethod(method: string, event?: MouseEvent) {
    this.selectedMethod = method;
    
    const inkElement = method === 'pix' ? this.inkPix.nativeElement : this.inkCredit.nativeElement;
    
    this.renderer.removeClass(inkElement, 'animate');
    
    if (event) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      this.renderer.setStyle(inkElement, 'left', `${x}px`);
      this.renderer.setStyle(inkElement, 'top', `${y}px`);
    } else {
      this.renderer.setStyle(inkElement, 'left', '50%');
      this.renderer.setStyle(inkElement, 'top', '50%');
    }
    
    this.renderer.setStyle(inkElement, 'width', '0');
    this.renderer.setStyle(inkElement, 'height', '0');
    this.renderer.addClass(inkElement, 'animate');
  }
}