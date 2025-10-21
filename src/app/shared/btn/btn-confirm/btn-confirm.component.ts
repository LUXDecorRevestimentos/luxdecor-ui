import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-confirm',
  imports: [],
  templateUrl: './btn-confirm.component.html',
  styleUrl: './btn-confirm.component.css'
})
export class BtnConfirmComponent {
  @Input() btn_label: string = "Confirmar";
}
