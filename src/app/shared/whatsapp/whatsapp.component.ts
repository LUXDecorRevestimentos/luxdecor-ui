import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  imports: [],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.css'
})
export class WhatsappComponent {

  @Input() whatsappNumber: string = '551143858177'; // Número padrão
  @Input() defaultMessage: string = 'Olá, gostaria de mais informações!'; // Mensagem padrão

}
