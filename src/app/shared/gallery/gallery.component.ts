import { Component, OnInit, Input } from '@angular/core';
import { CardPriceComponent } from '../card/price/card-price.component';
import { CommonModule } from '@angular/common';
import { GenericCard } from '../../data/card.data';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, CardPriceComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  @Input() cardsContent: any[] = [];
  @Input() productsContent: GenericCard[] = [];
  cardsProduct: any[] = [];

  ngOnInit(): void {
    if (this.cardsContent.length > 0 && typeof this.cardsContent[0] === 'object'){
      this.getSectionProduct(this.cardsContent)
    }

    if (this.productsContent.length > 0 && typeof this.productsContent[0] === 'object'){
      this.getGenericCards(this.productsContent)
    }
  }

  getSectionProduct(section: any) {
    this.cardsProduct = this.cardsContent.filter(item => item.type === 'card-product')[0].data;
    console.log(this.cardsProduct)
  }

  getGenericCards(section: any) {
    this.cardsProduct = section;
  }

}
