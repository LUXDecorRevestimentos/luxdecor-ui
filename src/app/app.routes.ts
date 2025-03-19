import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { SubCategoryPageComponent } from './pages/sub-category-page/sub-category-page.component';

export const routes: Routes = [
    {   
        path: '', component: HomeComponent
    },
    {
        path: 'category/:category', component: ProductComponent
    },
    {
        path: 'subCategory/:subCategory', component: SubCategoryPageComponent
    }
];