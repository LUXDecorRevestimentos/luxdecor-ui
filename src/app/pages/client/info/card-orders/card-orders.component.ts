import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-orders',
  imports: [MatIcon],
  templateUrl: './card-orders.component.html',
  styleUrl: './card-orders.component.css'
})
export class CardOrdersComponent {

  constructor(private router: Router){}

  onSubmit(){
    this.router.navigate(['/order']);
  }

}
