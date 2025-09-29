import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-generic',
  imports: [],
  templateUrl: './btn-generic.component.html',
  styleUrl: './btn-generic.component.css'
})
export class BtnGenericComponent {
  
  @Input() label = "" 
  @Input() icon = ""

}
