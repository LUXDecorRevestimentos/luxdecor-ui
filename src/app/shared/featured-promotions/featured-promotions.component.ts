import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselCardsComponent } from '../carousel-cards/carousel-cards.component';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-featured-promotions',
  imports: [CommonModule, CarouselCardsComponent, BarComponent],
  templateUrl: './featured-promotions.component.html',
  styleUrl: './featured-promotions.component.css'
})
export class FeaturedPromotionsComponent {
  title: string = '';
  type: string = '';
  countComponents: string = '';
  @Input() cardsContent: any[] = [];
  cardsCategory: any[] = [];
  cardsProduct: any[] = [];
  @Input() typeContainer: string = '';

  ngOnInit(): void {
    this.getSectionCategory()
    this.getSectionProduct()
  }

  getSectionCategory() {
    const cardsCategory = this.cardsContent.filter(item => item.type === 'card-category' && item.format == 3);
    this.cardsCategory = [...this.cardsCategory, ...cardsCategory.flatMap(category => category.data)];
  }
  
  getSectionProduct(){
    this.cardsProduct = this.cardsContent.filter(item => item.type === 'card-product' && item.format == 2);
  }

}
