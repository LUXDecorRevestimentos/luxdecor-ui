import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'category', component: ProductComponent },
    { path: 'product', component: ProductPageComponent },
    { path: 'cart', component: CartPageComponent },
    { path: 'payment', component: PaymentPageComponent },
    { path: 'order', component: OrderComponent }
];