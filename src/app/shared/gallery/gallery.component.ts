import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CardPriceComponent } from '../card/price/card-price.component';
import { CommonModule } from '@angular/common';
import { GenericCard } from '../../data/card.data';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, CardPriceComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  @Input() cardsContent: any[] = [];
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
           typeof this.cardsContent[0] === 'object' &&
           this.cardsContent.some(item => item.type === 'card-product');
  }

  private hasValidProductsContent(): boolean {
    return this.productsContent?.length > 0 && 
           typeof this.productsContent[0] === 'object';
  }

  private getSectionProduct(section: any[]): void {
    const cardProduct = section.find(item => item.type === 'card-product');
    this.cardsProduct = cardProduct?.data || [];
  }

  private getGenericCards(section: GenericCard[]): void {
    this.cardsProduct = section;
  }
}
