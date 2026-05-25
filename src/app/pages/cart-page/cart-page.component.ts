import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
  tap
} from 'rxjs';

import { BarComponent } from '../../shared/bar/bar.component';
import { CartCardComponent } from '../../shared/cart-card/cart-card.component';
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { BtnNextComponent } from '../../shared/btn/btn-next/btn-next.component';
import { BtnCleanComponent } from '../../shared/btn/btn-clean/btn-clean.component';
import { WhatsappComponent } from '../../shared/whatsapp/whatsapp.component';

import {
  CartCardItemData,
  Cart,
  CartData,
  CartResponseItem
} from '../../data/card.data';

import { CartService } from '../../service/cart.service';

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

  cartData!: CartData;

  cartItems: CartCardItemData[] = [];

  product_total = '0,00';
  installation_total = '0,00';
  delivery_total = '0,00';

  error: string | null = null;

  isLoading = false;

  readonly cart = signal<Cart>({
    id: 'Selecionar Tudo',
    completed: false,
    items: []
  });

  readonly partiallyComplete = computed(() => {

    const cart = this.cart();

    return (
      cart.items?.some(item => item.select) &&
      !cart.items?.every(item => item.select)
    );
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

    this.cartId =
      navigation?.extras.state?.['cartId'] ||
      history.state?.['cartId'] ||
      null;

    const cartObservable = this.cartId
      ? this.cartService.getCartId(this.cartId)
      : this.cartService.getCart();

    cartObservable.pipe(

      catchError(err => {
        console.error('API falhou, carregando carrinho local', err);

        let tempCart: any[] = [];

        try {
          tempCart = JSON.parse(localStorage.getItem('temp_cart') || '[]');
        } catch (e) {
          console.error('temp_cart inválido no localStorage', e);
          tempCart = [];
        }

        if (!Array.isArray(tempCart) || tempCart.length === 0) {
          return of({
            cart_id: 'local_cart',
            delivery_total: '0,00',
            install_list: [],
            orders: [],
            product_total: '0,00'
          } as CartData);
        }

        return this.cartService.transformLocalCartItems(tempCart).pipe(

          map((items: any[]) => {

            const safeItems = Array.isArray(items) ? items : [];

            const total = safeItems.reduce(
              (sum, item) => sum + (Number(item?.total_price) || 0),
              0
            );

            const orders: CartResponseItem[] = safeItems.map((item, index) => ({
              cart_id: 'local_cart',
              date: new Date().toISOString(),
              delivery: '0,00',
              installation_id: '',
              installation_title: '',
              installation_total: '0,00',
              order_id: `local_${index}`,
              product_id: item?.product_id ?? '',
              product_price: String(item?.price ?? 0),
              product_title: item?.title ?? '',
              amount: String(item?.quantity ?? 0),
              status: 'local'
            }));

            return {
              cart_id: 'local_cart',
              delivery_total: '0,00',
              install_list: [],
              orders,
              product_total: total.toFixed(2)
            } as CartData;
          }),

          catchError(err => {
            console.error('Erro ao transformar carrinho local', err);

            return of({
              cart_id: 'local_cart',
              delivery_total: '0,00',
              install_list: [],
              orders: [],
              product_total: '0,00'
            } as CartData);
          })

        );
      }),

      tap(cartData => {
        this.cartData = cartData ?? {
          cart_id: 'empty',
          delivery_total: '0,00',
          install_list: [],
          orders: [],
          product_total: '0,00'
        };
      }),

      switchMap(cartData => {
        if (!cartData) {
          return of([]);
        }
        return this.cartService.transformToCardItems(cartData);
      }),

      catchError(err => {
        console.error('Erro geral no loadCart pipeline:', err);
        return of([]);
      })

    ).subscribe({

      next: (items) => {

        const safeItems = Array.isArray(items) ? items : [];

        this.cartItems = safeItems.map(item => ({
          ...item,
          select: item.select ?? false
        }));

        this.cart.set({
          ...this.cart(),
          items: this.cartItems,
          completed: this.cartItems.length > 0 &&
                      this.cartItems.every(i => i.select)
        });

        this.product_total = this.cartData?.product_total ?? '0,00';

        this.installation_total =
          this.cartData?.orders?.[0]?.installation_total ?? '0,00';

        this.delivery_total = this.cartData?.delivery_total ?? '0,00';
      },

      error: (err) => {
        console.error('Erro final ao carregar carrinho:', err);
      }

    });
  }

  update(completed: boolean, index?: number): void {

    this.cart.update(cart => {

      const updatedItems = [...(cart.items || [])];

      if (index === undefined) {

        updatedItems.forEach(item => {
          item.select = completed;
        });

      } else {

        updatedItems[index].select = completed;
      }

      return {
        ...cart,
        items: updatedItems,
        completed:
          index === undefined
            ? completed
            : updatedItems.every(item => item.select)
      };
    });

    const items = this.cart().items;

    if (index === undefined) {

      forkJoin(
        items!.map(item =>
          this.cartService.updateOrder(
            item.id,
            item.product_id,
            Number(item.amount)
          )
        )
      ).subscribe({
        next: () => this.loadCart(),
        error: err => console.error('Bulk update failed:', err)
      });

      return;
    }

    const item = items![index];

    if (!completed) {

      this.cartService.removeOrder(item.id)
        .subscribe({
          next: () => this.loadCart(),
          error: err => console.error('Remove failed:', err)
        });

      return;
    }

    this.cartService.updateOrder(
      item.id,
      item.product_id,
      Number(item.amount)
    ).subscribe({
      next: () => this.loadCart(),
      error: err => console.error('Update failed:', err)
    });
  }

  navigateToWpp(): void {

    const selectedItems =
      this.cart().items?.filter(item => item.select) || [];

    if (selectedItems.length === 0) {

      alert('Por favor, selecione pelo menos um item');

      return;
    }

    const productsText = selectedItems.map(item => {

      return `
        Produto: ${item.title}
        Quantidade: ${item.amount}
        Valor: R$ ${item.price}
        `;

            }).join('\n');

            const message = `
        Olá! Gostaria de solicitar um orçamento:

        ${productsText}

        Total de itens: ${selectedItems.length}
        `;

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/551143858177?text=${encodedMessage}`,
      '_blank'
    );
  }

  navigateToPayment(): void {

    const selectedItems =
      this.cart().items?.filter(item => item.select) || [];

    if (selectedItems.length === 0) {

      alert(
        'Por favor, selecione pelo menos um item para prosseguir ao pagamento'
      );

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

  onOrderUpdate($event: [string, string, number]): void {

    this.cartService.updateOrder(
      $event[0],
      $event[1],
      $event[2]
    ).subscribe({
      next: () => this.loadCart(),
      error: err => console.error(err)
    });
  }

  onOrderRemove($event: string): void {

    this.cartService.removeOrder($event)
      .subscribe({
        next: () => this.loadCart(),
        error: err => console.error(err)
      });
  }

  clearCart(): void {

    localStorage.removeItem('temp_cart');

    this.cart.set({
      id: 'Selecionar Tudo',
      completed: false,
      items: []
    });

    this.cartItems = [];

    this.product_total = '0,00';
    this.installation_total = '0,00';
    this.delivery_total = '0,00';
  }
}