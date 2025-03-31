import { Component, Input, OnInit, Inject, signal, computed} from '@angular/core';
import { BarComponent } from '../../shared/bar/bar.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { CartCardData, Cart } from '../../data/card.data'
import { CartCardComponent } from '../cart-page/cart-card/cart-card.component';
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BtnNextComponent } from '../../shared/btn/btn-next/btn-next.component';
import { BtnCleanComponent } from '../../shared/btn/btn-clean/btn-clean.component';

@Component({
  selector: 'app-cart-page',
  imports: [
    BarComponent,
    CommonModule,
    CartCardComponent,
    BtnContinueComponent,
    MatCheckboxModule,
    BtnNextComponent,
    BtnCleanComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  @Input() cartItems: CartCardData[] = [];
  
  // Inicializa o cart com valores padrão
  readonly cart = signal<Cart>({
    id: 'Selecionar Tudo',
    completed: false,
    items: []
  });

  readonly partiallyComplete = computed(() => {
    const cart = this.cart();
    if (!cart.items || cart.items.length === 0) {
      return false;
    }
    return cart.items.some(item => item.select) && !cart.items.every(item => item.select);
  });

  ngOnInit(): void {
    this.populateCart();
  }

  constructor(private productService: ProductService) {}

  populateCart() {
    this.productService.getCartData().subscribe(categories => {
      this.cartItems = this.cartItems.concat(categories);
      this.cart.set({
        ...this.cart(),
        items: [...this.cartItems]
      });
    });
  }

  update(completed: boolean, index?: number) {
    this.cart.update(cart => {
      if (index === undefined) {
        cart.completed = completed;
        cart.items?.forEach(item => (item.select = completed));
      } else {
        cart.items![index].select = completed;
        cart.completed = cart.items?.every(item => item.select) ?? true;
      }
      return {...cart};
    });
  }
}