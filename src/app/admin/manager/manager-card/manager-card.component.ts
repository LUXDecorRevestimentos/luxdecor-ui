import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-manager-card',
  imports: [ FormsModule, MatSelectModule ],
  templateUrl: './manager-card.component.html',
  styleUrl: './manager-card.component.css'
})
export class ManagerCardComponent {


  selectedOption: string = 'Gerente';

}
