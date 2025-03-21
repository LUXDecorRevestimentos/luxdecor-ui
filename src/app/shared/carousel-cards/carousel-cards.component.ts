import { Component, HostListener, Input, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('categoryContainer', { static: false }) categoryContainer!: ElementRef;
  @ViewChild('productContainer', { static: false }) productContainer!: ElementRef;

  touchStartX: number = 0;
  currentIndex: number = 0;

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

    if (deltaX > 100) {
      this.scrollLeft();
    } else if (deltaX < -100) {
      this.scrollRight();
    }
  }

  scrollLeft(): void {
    if (this.cardsCategory.length > 0 && this.categoryContainer) {
      const container = this.categoryContainer.nativeElement;
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
    if (this.cardsProduct.length > 0 && this.productContainer) {
      const container = this.productContainer.nativeElement;
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.cardsCategory.length > 0 && this.categoryContainer) {
      const container = this.categoryContainer.nativeElement;
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
    if (this.cardsProduct.length > 0 && this.productContainer) {
      const container = this.productContainer.nativeElement;
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }

  next(): void {
    this.scrollRight();
  }

  prev(): void {
    this.scrollLeft();
  }
}
