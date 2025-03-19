import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-category-page',
  imports: [],
  templateUrl: './sub-category-page.component.html',
  styleUrl: './sub-category-page.component.css'
})
export class SubCategoryPageComponent {
  cardsCategory = [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
    { id: 3, title: 'Product 3' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]); // Navega para a rota com o ID do produto
  }
}
