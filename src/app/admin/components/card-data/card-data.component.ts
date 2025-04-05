import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card-data',
  imports: [MatIcon],
  templateUrl: './card-data.component.html',
  styleUrl: './card-data.component.css'
})
export class CardDataComponent {
  @Input() icon: string = "";
  @Input() title: string = "";
  @Input() data: string = "";
  @Input() update: string = "";
}
