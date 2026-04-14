import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCard } from '../../data/card.data';
import { RouterModule } from '@angular/router';
import { ImgUrlPipe } from '../pipe/img-url.pipe';

@Component({
  selector: 'app-sub-product',
  imports: [CommonModule, RouterModule, ImgUrlPipe], 
  templateUrl: './sub-product.component.html',
  styleUrl: './sub-product.component.css'
})
export class SubProductComponent implements OnInit, OnChanges {
  @Input() cardsCategory: GenericCard[] = [];
  @Output() subProductClick = new EventEmitter<string>();

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {}
  
  onSubProductClick(subCategoryId: string) {
    this.subProductClick.emit(subCategoryId);
  }
}