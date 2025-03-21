import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar',
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  @Input() title = "";
  @Input() displayOp = "";
  @Input() type = "";
  @Input() titleType = "";
}
