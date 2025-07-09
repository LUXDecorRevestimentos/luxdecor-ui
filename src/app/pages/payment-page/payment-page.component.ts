import { Component, OnInit } from '@angular/core';
import { BarComponent } from '../../shared/bar/bar.component';
import { Cart } from '../../data/card.data'
import { Router } from '@angular/router';
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { ClientCardComponent } from '../../shared/client-card/client-card.component';
import { CartCardComponent } from '../../shared/cart-card/cart-card.component'
import { MethodPaymentCardComponent } from './method-payment-card/method-payment-card.component'; 
import { MethodShippingCardComponent } from './method-shipping-card/method-shipping-card.component';
import { BtnConfirmComponent } from '../../shared/btn/btn-confirm/btn-confirm.component';
import { SalesAuthService } from '../../admin/service/sales.auth.service';
import { ClientService } from '../../service/client.service';
import { ClientInfoResponse } from '../../data/client.data';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-payment-page',
  imports: [
    BarComponent,
    BtnContinueComponent,
    CartCardComponent,
    ClientCardComponent,
    MethodPaymentCardComponent,
    MethodShippingCardComponent,
    BtnConfirmComponent
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  cartData: Cart;

  cartInfo: any;

  clientData!: ClientInfoResponse;
  amount: string = "0";

  constructor(
    private saleService: SalesAuthService,
    private clientService: ClientService,
    private cartService: CartService,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation?.extras)
    this.cartData = navigation?.extras.state?.['cart'] || { items: [] };
    if (!this.cartData.items) {
      this.cartData = history.state?.['cart'] || { items: [] };
    }
  }

  ngOnInit(): void {
    this.amount = this.cartData.items?.length.toString() || '0';
    this.fetchClient()
    this.fetchCartItems()
  }

  fetchClient() {
    this.clientService.getClient().subscribe(
      (response) => {
        this.clientData = response;
      },
      (error) => {
        this.router.navigate(['/client']);
      }
    );
  }

  fetchCartItems(){
    this.cartService.getCart().subscribe(
      (response) => {
        this.cartInfo = response;
        console.log(this.cartInfo)
      },
      (error) => {}
    )
  }

  onConfirmCart(){
    console.log("Cofirmar")
    this.saleService.postPayment("#lP70TIV65PXk").subscribe({})
  }
}
