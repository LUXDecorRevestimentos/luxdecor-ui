import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/default/card-default.component';
import { GenericCard } from '../../data/card.data'
import { CardPriceComponent } from '../card/price/card-price.component';

@Component({
  selector: 'app-carousel-cards',
  imports: [CommonModule, CardComponent, CardPriceComponent],
  templateUrl: './carousel-cards.component.html',
  styleUrl: './carousel-cards.component.css'
})
export class CarouselCardsComponent {
  @Input() cardsCategory: GenericCard[] = [];
  @Input() cardsProduct: GenericCard[] = [];

  touchStartX: number = 0;
  constructor() { }

  ngOnInit(): void { }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;

    if (deltaX > 50) {
      this.scrollLeft();
    } else if (deltaX < -50) {
      this.scrollRight();
    }
  }

  scrollLeft(): void {
    console.log(this.cardsProduct)
    if (this.cardsCategory.length > 0){
      const container = document.querySelector('.cards-container-category') as HTMLElement;
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
    if (this.cardsProduct.length > 0){
      const container = document.querySelector('.cards-container-product') as HTMLElement;
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.cardsCategory.length > 0){
      const container = document.querySelector('.cards-container-category') as HTMLElement;
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
    console.log(this.cardsProduct)
    if (this.cardsProduct.length > 0){
      const containerProduct = document.querySelector('.cards-container-product') as HTMLElement;
      containerProduct.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
}
