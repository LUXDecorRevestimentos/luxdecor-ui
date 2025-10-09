import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { ProductComponent } from '../../pages/product/product.component';
import { ProductPageComponent } from '../../pages/product-page/product-page.component';
import { CartPageComponent } from '../../pages/cart-page/cart-page.component';
import { PaymentPageComponent } from '../../pages/payment-page/payment-page.component';
import { OrderComponent } from '../../pages/order/order.component';
import { adminGuard } from '../guards/admin.guard';
import { ProductService } from '../../service/product.service';
import { ClientComponent } from '../../pages/client/client.component';
import { LoginComponent } from '../../pages/client/login/login.component';
import { RegisterComponent } from '../../pages/client/register/register.component';
import { InfoComponent } from '../../pages/client/info/info.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from '../../admin/admin.component';
import { FinallyPageComponent } from '../../pages/payment-page/finally-page/finally-page.component';
import { PaymentGuard } from '../guards/payment.guard';
import { CreditComponent } from '../../pages/payment-page/finally-page/credit-component/credit.component';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../../pages/home/home.component').then(m => m.HomeComponent),
    providers: [ProductService]
  },
  { path: 'category', component: ProductComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard] },
  { path: 'finally', component: FinallyPageComponent, canActivate: [AuthGuard]},
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'info', component: InfoComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'bankslip', component: CreditComponent },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('../routes/admin.routes').then(m => m.ADMIN_ROUTES),
  //   providers: [AdminComponent],
  //   canMatch: [adminGuard]
  // },
  {
    path: "admin",
    component: AdminComponent
  },
  {
    path: "**",
    redirectTo: '/'
  }
];