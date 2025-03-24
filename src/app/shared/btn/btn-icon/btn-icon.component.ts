import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-btn-icon',
  imports: [MatIconModule],
  templateUrl: './btn-icon.component.html',
  styleUrl: './btn-icon.component.css'
})
export class BtnIconComponent {

  @Input() iconType: string = "";
  @Input() notificationOp: boolean = true;

}
