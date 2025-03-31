import { Component, OnInit, computed, signal } from '@angular/core';
import { BarComponent } from '../../shared/bar/bar.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { CartCardData, Cart } from '../../data/card.data';
import { CartCardComponent } from '../../shared/cart-card/cart-card.component'
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BtnNextComponent } from '../../shared/btn/btn-next/btn-next.component';
import { BtnCleanComponent } from '../../shared/btn/btn-clean/btn-clean.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    BarComponent,
    CommonModule,
    CartCardComponent,
    BtnContinueComponent,
    MatCheckboxModule,
    BtnNextComponent,
    BtnCleanComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: CartCardData[] = [];
  
  readonly cart = signal<Cart>({
    id: 'Selecionar Tudo',
    completed: false,
    items: []
  });

  readonly partiallyComplete = computed(() => {
    const cart = this.cart();
    return cart.items?.some(item => item.select) && !cart.items?.every(item => item.select);
  });

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.populateCart();
  }

  populateCart() {
    this.productService.getCartData().subscribe({
      next: (categories) => {
        this.cartItems = [...categories];
        this.cart.set({
          ...this.cart(),
          items: [...this.cartItems]
        });
      },
      error: (err) => console.error('Error loading cart data:', err)
    });
  }

  update(completed: boolean, index?: number) {
    this.cart.update(cart => {
      const updatedItems = [...(cart.items || [])];
      
      if (index === undefined) {
        updatedItems.forEach(item => item.select = completed);
      } else {
        updatedItems[index].select = completed;
      }

      return {
        ...cart,
        items: updatedItems,
        completed: index === undefined ? completed : updatedItems.every(item => item.select)
      };
    });
  }

  navigateToPayment() {
    const selectedItems = this.cart().items?.filter(item => item.select) || [];
    if (selectedItems.length === 0) {
      alert('Por favor, selecione pelo menos um item para prosseguir ao pagamento');
      return;
    }

    this.router.navigate(['/payment'], {
      state: { 
        cart: {
          ...this.cart(),
          items: selectedItems
        }
      }
    });
  }

  clearCart() {
    this.cart.set({
      id: 'Selecionar Tudo',
      completed: false,
      items: []
    });
    this.cartItems = [];
  }
}