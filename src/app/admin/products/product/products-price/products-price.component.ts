import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-products-price',
  imports: [ CommonModule, FormsModule, MatSelectModule ],
  templateUrl: './products-price.component.html',
  styleUrl: './products-price.component.css'
})
export class ProductsPriceComponent {

  selectedOption: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSelectChange(event: any) {
    this.selectedOption = event;
    console.log(event);
  }
}
