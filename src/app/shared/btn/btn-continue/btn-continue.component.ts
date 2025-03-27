import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { BarComponent } from '../../bar/bar.component';

@Component({
  selector: 'app-btn-continue',
  imports: [MatIcon, BarComponent],
  templateUrl: './btn-continue.component.html',
  styleUrl: './btn-continue.component.css'
})
export class BtnContinueComponent {

}
