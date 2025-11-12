import { Component, OnInit, computed, signal } from '@angular/core';
import { BarComponent } from '../../shared/bar/bar.component';
import { CommonModule } from '@angular/common';
import { CartCardItemData, Cart, CartData } from '../../data/card.data';
import { CartCardComponent } from '../../shared/cart-card/cart-card.component'
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BtnNextComponent } from '../../shared/btn/btn-next/btn-next.component';
import { BtnCleanComponent } from '../../shared/btn/btn-clean/btn-clean.component';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { switchMap, tap } from 'rxjs';
import { WhatsappComponent } from '../../shared/whatsapp/whatsapp.component';

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
    WhatsappComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartId: string | null = null;

  cartData: any;
  cartItems: CartCardItemData[] = [];

  product_total!: number;
  installation_total: string = "0,00";
  delivery_total!: string;

  error: string | null = null;
  isLoading = false;

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
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const navigation = this.router.getCurrentNavigation();
    this.cartId = navigation?.extras.state?.['cartId'] || history.state?.['cartId'];

    const cartObservable = this.cartId
      ? this.cartService.getCartId(this.cartId)
      : this.cartService.getCart();

    cartObservable.pipe(
      tap(cartData => this.cartData = cartData),
      switchMap(cartData => this.cartService.transformToCardItems(cartData))
    ).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.cart.set({
          ...this.cart(),
          items: this.cartItems
        });
        this.product_total = this.cartData.product_total;
        this.installation_total = this.cartData.installation_total;
        this.delivery_total = this.cartData.delivery_total;
      },
      error: (err) => console.error('Error loading cart:', err)
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
  
      if (index === undefined) {
        updatedItems.forEach(item => {
          this.cartService.updateOrder(item.id, item.product_id, parseInt(item.amount))
            .subscribe({
              next: () => this.loadCart(),
              error: (err) => console.error('Bulk update failed:', err)
            });
        });
      } else {
        const item = updatedItems[index];
        if (!completed) {
          this.cartService.removeOrder(item.id)
            .subscribe({
              next: () => this.loadCart(),
              error: (err) => console.error('Remove failed:', err)
            });
        } else {
          this.cartService.updateOrder(item.id, item.product_id, parseInt(item.amount))
            .subscribe({
              next: () => this.loadCart(),
              error: (err) => console.error('Update failed:', err)
            });
        }
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

  onOrderUpdate($event: [string, string, number]) {
    this.cartService.updateOrder($event[0], $event[1], $event[2]).subscribe((response) => {
      this.loadCart();
    })
  }

  onOrderRemove($event: string) {
    this.cartService.removeOrder($event).subscribe((response) => {
      this.loadCart();
    })
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