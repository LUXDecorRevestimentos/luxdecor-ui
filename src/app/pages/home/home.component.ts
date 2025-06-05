import { Component,OnInit  } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { ProductService } from '../../service/product.service';
import { GenericCard } from '../../data/card.data';
import { TopicComponent } from './topic/topic.component';
import { BarComponent } from '../../shared/bar/bar.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    CarouselCardsComponent,
    TopicComponent,
    BarComponent,
    MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  carouselData: any[] = [];
  cardsCategory: GenericCard[] = [];
  cardsProduct: GenericCard[] = [];
  cardsSection: any[] = [];
  isLoading = true;

  constructor(private productService: ProductService) {}

  
  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData(): void {
    forkJoin([
      this.productService.getProductPromotionMainList(),
      this.productService.getProductsCategories()
    ]).subscribe(([promotions, categories]) => {
      this.cardsProduct = promotions;
      this.cardsCategory = categories;
      this.isLoading = true;
    });
  }

}

