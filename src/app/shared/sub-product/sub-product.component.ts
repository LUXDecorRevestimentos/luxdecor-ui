import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCard } from '../../data/card.data';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sub-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './sub-product.component.html',
  styleUrl: './sub-product.component.css'
})
export class SubProductComponent {
  @Input() cardsCategory: GenericCard [] = [];
  @Output() subProductClick = new EventEmitter<string>();

  onSubProductClick(subCategoryId: string ) {
    this.subProductClick.emit(subCategoryId);
  }

}