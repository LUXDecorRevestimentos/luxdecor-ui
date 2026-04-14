import { Component,OnInit  } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { ProductService } from '../../service/product.service';
import { GenericCard } from '../../data/card.data';
import { TopicComponent } from './topic/topic.component';
import { BarComponent } from '../../shared/bar/bar.component';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { WhatsappComponent } from '../../shared/whatsapp/whatsapp.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    CarouselCardsComponent,
    TopicComponent,
    BarComponent,
    MatProgressSpinnerModule,
    WhatsappComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  carouselData: any[] = [];
  cardsCategory: GenericCard[] = [];
  cardsProduct: GenericCard[] = [];
  cardsSection: any[] = [];

  loadingCategories = true;
  loadingProducts = true;

  isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData(): void {
    // Busca Categorias
    this.productService.getProductsCategories().subscribe({
      next: (res) => {
        this.cardsCategory = res;
        this.loadingCategories = false;
      },
      error: () => (this.loadingCategories = false)
    });

    // Busca Produtos
    this.productService.getProductPromotionMainList().subscribe({
      next: (res) => {
        this.cardsProduct = res;
        this.loadingProducts = false;
      },
      error: () => (this.loadingProducts = false)
    });
  }

}

