import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {   
        path: '', component: HomeComponent
    },
    {
        path: 'category/:category', component: ProductComponent
    }
];