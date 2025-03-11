import { Component, OnInit, Input } from '@angular/core';
import { CardPriceComponent } from '../card/price/card-price.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, CardPriceComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  @Input() cardsContent: any[] = [];
  cardsProduct: any[] = [];

  ngOnInit(): void {
    this.getSectionProduct(this.cardsContent)
  }

  getSectionProduct(section: any) {
    this.cardsProduct = this.cardsContent.filter(item => item.type === 'card-product')[0].data;
  }


}
