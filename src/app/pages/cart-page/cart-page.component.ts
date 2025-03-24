import { Component, Input, OnInit} from '@angular/core';
import { BarComponent } from '../../shared/bar/bar.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { CartCardData } from '../../data/card.data'
import { CartCardComponent } from '../cart-page/cart-card/cart-card.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cart-page',
  imports: [BarComponent, CommonModule, CartCardComponent, MatIcon],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  @Input()  cartItems: CartCardData[] = [];

  constructor (private productService: ProductService){}

  ngOnInit(): void {
    this.populateCart();
  }

  populateCart() {
    this.productService.getCartData().subscribe(categories => {
      this.cartItems = this.cartItems.concat(categories);
    });
  }
}
