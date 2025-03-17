import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCard } from '../../data/card.data';


@Component({
  selector: 'app-sub-product',
  imports: [CommonModule],
  templateUrl: './sub-product.component.html',
  styleUrl: './sub-product.component.css'
})
export class SubProductComponent {
  @Input() cardsCategory: GenericCard [] = [];

}