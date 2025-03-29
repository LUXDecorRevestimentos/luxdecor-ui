import { Component, OnInit } from '@angular/core';
import { BarComponent } from '../../shared/bar/bar.component';
import { Cart } from '../../data/card.data'
import { Router } from '@angular/router';
import { BtnContinueComponent } from '../../shared/btn/btn-continue/btn-continue.component';
import { ClientCardComponent } from '../../shared/client-card/client-card.component';
import { CartCardComponent } from '../../shared/cart-card/cart-card.component'
import { MethodPaymentCardComponent } from './method-payment-card/method-payment-card.component'; 

@Component({
  selector: 'app-payment-page',
  imports: [
    BarComponent,
    BtnContinueComponent,
    CartCardComponent,
    ClientCardComponent,
    MethodPaymentCardComponent
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  cartData: Cart;

  amount: string = "0";

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.cartData = navigation?.extras.state?.['cart'] || { items: [] };
    
    console.log(this.cartData)

    if (!this.cartData.items) {
      this.cartData = history.state?.['cart'] || { items: [] };
    }
  }

  ngOnInit(): void {
    this.amount = this.cartData.items?.length.toString() || '0';
  }
}
