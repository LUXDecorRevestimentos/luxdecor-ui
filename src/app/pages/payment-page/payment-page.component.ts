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
import { Cart, CartCardItemData, CartData, InstallOption } from '../../data/card.data';
import { ClientInfoResponse } from '../../data/client.data';

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
    CommonModule
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  cartData: Cart = { id: 'Selecionar Tudo', completed: false, items: [] };
  cartInfo?: CartData;
  opInstallations: InstallOption[] = [];
  selectedInstallations: InstallOption[] = [];
  deliveryPrice?: string;
  clientData?: ClientInfoResponse;
  amount: string = "0";

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
  }

  private initializeCartData(): void {
    const navigation = this.router.getCurrentNavigation();
    const stateCart = navigation?.extras.state?.['cart'] || history.state?.['cart'];
    
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
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartInfo = response;
        this.deliveryPrice = response.delivery_total === "0" ? undefined : response.delivery_total;
        this.opInstallations = [...response.install_list];
        console.log(response)
      },
      error: () => {}
    });
  }

  onCheckboxChange(installation: InstallOption): void {
    this.selectedInstallations = installation 
      ? [...this.selectedInstallations, installation] 
      : this.selectedInstallations.filter(v => v !== installation);
  }

  onDeliveryMethod(event: any): void {
    console.log(event);
  }

  onConfirmCart(): void {
    if (this.cartInfo?.cart_id) {
      this.saleService.postPayment(this.cartInfo.cart_id, this.selectedInstallations).subscribe({});
    }
  }

  clearCart(): void {
    this.cartData = { id: 'Selecionar Tudo', completed: false, items: [] };
    this.fetchCartItems();
  }
}