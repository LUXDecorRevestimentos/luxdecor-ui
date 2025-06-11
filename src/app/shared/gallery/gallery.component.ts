import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CardPriceComponent } from '../card/price/card-price.component';
import { CommonModule } from '@angular/common';
import { GenericCard } from '../../data/card.data';
import { BarComponent } from '../bar/bar.component';
import { colorSets } from '@swimlane/ngx-charts';
import { format } from 'path';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, CardPriceComponent, BarComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  @Input() cardsContent: any[] = [];
  @Input() optinalTitle!: string;
  @Input() productsContent: GenericCard[] = [];
  cardsProduct: any[] = [];

  ngOnInit(): void {
    this.updateContent();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardsContent'] || changes['productsContent']) {
      this.updateContent();
    }
  }

  private updateContent(): void {
    this.cardsContent = this.cardsContent.filter(
      content => content.type === 'card-product' && content.format === 1
    );    
    if (this.hasValidCardsContent()) {
      this.getSectionProduct(this.cardsContent);
    } else if (this.hasValidProductsContent()) {
      this.getGenericCards(this.productsContent);
    } else {
      this.cardsProduct = [];
    }
  }

  private hasValidCardsContent(): boolean {
   
    return this.cardsContent?.length > 0 && 
           typeof this.cardsContent === 'object' &&
           this.cardsContent.some(item => item.type === 'card-product');
  }

  private hasValidProductsContent(): boolean {
    return this.productsContent?.length > 0 && 
           typeof this.productsContent === 'object';
  }

  private getSectionProduct(section: any[]): void {
    const cardProduct = section.find(item => item.type == 'card-product');
    this.optinalTitle = cardProduct?.title;
    this.cardsProduct = cardProduct?.data || [];
  }

  private getGenericCards(section: GenericCard[]): void {
    if (!section || section.length === 0) return;
    const content: GenericCard = {
      id: 'grouped-products',
      title: "",
      type: 'card-product',
      imageUrl: '',
      data: section
    };

    this.cardsProduct = section;
    this.cardsContent.push(content);
  }
}
