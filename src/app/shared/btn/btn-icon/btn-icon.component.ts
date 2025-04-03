import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-btn-icon',
  imports: [MatIconModule, CommonModule],
  templateUrl: './btn-icon.component.html',
  styleUrl: './btn-icon.component.css'
})
export class BtnIconComponent {

  @Input() iconType: string = "";
  @Input() notificationOp: boolean = false;

}
