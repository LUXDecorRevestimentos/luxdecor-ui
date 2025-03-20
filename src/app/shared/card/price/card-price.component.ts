import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCard } from '../../../data/card.data';
import { Product } from '../../../data/product.data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-price',
  imports: [CommonModule, RouterModule],
  templateUrl: './card-price.component.html',
  styleUrl: './card-price.component.css'
})
export class CardPriceComponent {
  @Input() card: GenericCard | null = null;

  product: Product | null = null;

  ngOnInit(): void {
    if (this.card){
      this.product = this.generateProduct(this.card);
    }
  }

  generateProduct(card: GenericCard){
    const price = card.data && card.data.price ? card.data.price : 'Error'; 
    return {
      id: card.id,
      title: card.title,
      type: card.type,
      imageUrl: card.imageUrl,
      data: {
        price: price
      }
    }
  }

}


