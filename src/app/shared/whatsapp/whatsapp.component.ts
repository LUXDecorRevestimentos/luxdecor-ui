import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  imports: [],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.css'
})
export class WhatsappComponent {

  @Input() whatsappNumber: string = '551143858177';

  @Input() defaultMessage: string =
    'Olá, gostaria de mais informações!';

  openWhatsApp(message?: string): void {

    const finalMessage = message || this.defaultMessage;

    const encodedMessage = encodeURIComponent(finalMessage);

    const url =
      `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

    window.open(url, '_blank');
  }
}