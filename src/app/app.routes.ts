import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
    {   
        path: '', component: HomeComponent
    },
    {
        path: 'category', component: ProductComponent
    },
    {
        path: 'product', component: ProductPageComponent
    }
]