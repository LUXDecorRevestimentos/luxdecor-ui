import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  imports: [CommonModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  @Input() title = "";
  @Input() displayOp = "";
  @Input() type = "";
  @Input() titleType = "";
  @Input() color = "";

  @Input() subTitle = "";
  @Input() value = "";
}
