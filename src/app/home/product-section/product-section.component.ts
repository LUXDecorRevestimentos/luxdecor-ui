import { Component, Input } from '@angular/core';
import { GenericCard } from '../../data/card.data'
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { FeaturedPromotionsComponent } from '../../featured-promotions/featured-promotions.component'

@Component({
  selector: 'app-product-section',
  imports: [CarouselCardsComponent, FeaturedPromotionsComponent],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {
  @Input() title: string = '';
  @Input() cardsCategorySection: GenericCard[] = [];
}
