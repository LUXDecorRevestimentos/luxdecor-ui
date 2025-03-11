import { Component,OnInit  } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselCardsComponent } from '../shared/carousel-cards/carousel-cards.component';
import { ProductService } from '../service/product.service';
import { GenericCard } from '../data/card.data';
// import { ProductSectionComponent } from './product-section/product-section.component';
import { TopicComponent } from './topic/topic.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, CarouselCardsComponent, TopicComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  carouselData: any[] = [];
  cardsCategory: GenericCard[] = [];
  cardsProduct: GenericCard[] = [];
  cardsSection: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {    
      this.productService.getProductsCategories().subscribe(categories => {
        this.cardsCategory = this.cardsCategory.concat(categories);
      })

      this.productService.getProductPromotionMainList().subscribe(promotions => {
        this.cardsProduct = this.cardsProduct.concat(promotions);
      })
  }
}
