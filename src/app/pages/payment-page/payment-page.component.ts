import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarComponent } from '../../shared/bar/bar.component';
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { ClientCardComponent } from '../../shared/client-card/client-card.component';
import { CartCardComponent } from '../../shared/cart-card/cart-card.component';
import { MethodPaymentCardComponent } from './method-payment-card/method-payment-card.component'; 
import { MethodShippingCardComponent } from './method-shipping-card/method-shipping-card.component';
import { BtnConfirmComponent } from '../../shared/btn/btn-confirm/btn-confirm.component';
import { SalesAuthService } from '../../admin/service/sales.auth.service';
import { ClientService } from '../../service/client.service';
import { CartService } from '../../service/cart.service';
import { Cart, CartCardItemData, CartData, InstallOption, PaymentMethodType } from '../../data/card.data';
import { ClientInfoResponse } from '../../data/client.data';
import { colorSets } from '@swimlane/ngx-charts';
import { WhatsappComponent } from '../../shared/whatsapp/whatsapp.component';
import { switchMap, tap } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-payment-page',
  imports: [
    BarComponent,
    BtnContinueComponent,
    CartCardComponent,
    ClientCardComponent,
    MethodPaymentCardComponent,
    MethodShippingCardComponent,
    BtnConfirmComponent,
    CommonModule,
    WhatsappComponent
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {

  cartId: string | undefined;
  cartStatus: number | undefined;

  cartData: Cart = { id: 'Selecionar Tudo', completed: false, items: [] };
  cartInfo?: CartData;
  opInstallations: InstallOption[] = [];
  selectedInstallations: InstallOption[] = [];
  deliveryPrice?: string;
  clientData?: ClientInfoResponse;
  amount: string = "0";
  deliveryBool: boolean = false;

  totalPrice: string | undefined;

  selectedDelivery: string | undefined;
  selectedMethod: PaymentMethodType | undefined;

  constructor(
    private saleService: SalesAuthService,
    private clientService: ClientService,
    private cartService: CartService,
    private router: Router
  ) {
    this.initializeCartData();

  }

  ngOnInit(): void {
    this.amount = this.cartData.items?.length.toString() || '0';
    this.fetchClient();
    this.fetchCartItems();
    this.totalPrice = this.cartInfo?.product_total
  }

  private initializeCartData(): void {
    const navigation = this.router.getCurrentNavigation();
    const stateCart = navigation?.extras.state?.['cart'] || history.state?.['cart'];
    this.cartId = stateCart.cartId;
    this.cartStatus = stateCart.cartStatus;
    if (stateCart?.items) {
      this.cartData = { ...this.cartData, ...stateCart };
    }
    
  }

  fetchClient(): void {
    this.clientService.getClient().subscribe({
      next: (response) => this.clientData = response,
      error: () => this.router.navigate(['/client'])
    });
  }

  fetchCartItems(): void {
    if (this.cartId == undefined) {
      this.cartService.getCart().subscribe({
        next: (response) => {
          this.cartInfo = response;
          this.deliveryPrice = response.delivery_total === "0,00" ? undefined : response.delivery_total;
          this.opInstallations = [...response.install_list];
        },
        error: () => {}
      });
    } else {
      this.cartService.getCartId(this.cartId).pipe(
        tap(response =>  this.cartInfo = response),
        switchMap(response => this.cartService.transformToCardItems(response))
      ).subscribe({
        next: (items) => {
          this.cartData.items =[...items]
          this.deliveryPrice = this.cartInfo?.delivery_total
          this.opInstallations = this.cartInfo!.install_list
          if(this.cartId)
          this.goFinally(this.cartId); 
        }
      });
    }
  }

  goFinally(cart_id: string){
    if (this.cartStatus && this.cartStatus > 0) {
      this.saleService.getPayment(cart_id).subscribe({
        next: (response) => {
          this.router.navigate(['/finally'], {
            state: {
              cartId: this.cartInfo?.cart_id,
              paymentData: this.cartData.items,
              paymentMethod: this.selectedMethod,
              deliveryMethod: this.deliveryBool,
              cartStatus: this.cartStatus,
              orderData: response
            }
          });
        }
      });
    }
  }

  onCheckboxChange(installation: InstallOption): void {
    this.selectedInstallations = installation 
      ? [...this.selectedInstallations, installation] 
      : this.selectedInstallations.filter(v => v !== installation);
  }

  onDeliveryMethod(event: any): void {
    this.selectedDelivery = event
    if (this.selectedDelivery && this.cartInfo){
      this.totalPrice = this.sumValues(this.cartInfo.delivery_total, this.cartInfo.product_total)
      this.deliveryBool = true
    } else {
      this.totalPrice = this.cartInfo?.product_total
      this.deliveryBool = false
    }
  }

  onPaymentMethodSelected(event: any) {    
    this.selectedMethod = event
  }

  sumValues(...valores: string[]): string {
    const numeros = valores.map(valor => {
      const valorLimpo = valor.replace(/\./g, '').replace(',', '.');
      return parseFloat(valorLimpo) || 0;
    });
  
    const soma = numeros.reduce((total, num) => total + num, 0);
  
    return soma.toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  onConfirmCart(): void {
    if (this.cartInfo?.cart_id && this.selectedMethod) {
      this.saleService.postPayment(this.cartInfo.cart_id, this.selectedInstallations, this.deliveryBool, this.selectedMethod).subscribe({
        next: (response) => {
          this.router.navigate(['/finally'], {
            state: {
              cartId: this.cartInfo?.cart_id,
              paymentData: this.cartData.items,
              paymentMethod: this.selectedMethod,
              deliveryMethod: this.deliveryBool,
              cartStatus: this.cartStatus
            }
          });
        }
      });  
    }
  }

  clearCart(): void {
    this.cartData = { id: 'Selecionar Tudo', completed: false, items: [] };
    this.fetchCartItems();
  }
}