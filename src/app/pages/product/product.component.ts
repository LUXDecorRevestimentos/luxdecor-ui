import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CarouselCardsComponent } from '../../shared/carousel-cards/carousel-cards.component';
import { GenericCard } from '../../data/card.data';

@Component({
  selector: 'app-product',
  imports: [CarouselCardsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  category: string | null = null;
  cardsCategory: GenericCard[] = [];
  cardsProduct: GenericCard[] = [];

  constructor (private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryParam = params.get('category');
      this.category = categoryParam ? categoryParam.toUpperCase() : null;
      console.log('Categoria atualizada:', this.category);
    });
    this.populateCategory();
  }

  populateCategory(){
    this.productService.getProductsCategories().subscribe(categories => {
      this.cardsCategory = this.cardsCategory.concat(categories);
    })

    this.productService.getProductPromotionMainList().subscribe(promotions => {
      this.cardsProduct = this.cardsProduct.concat(promotions);
    })
  }

}
