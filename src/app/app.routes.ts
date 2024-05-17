import { Routes } from '@angular/router';
import { ProductRegisterComponent } from './features/products/components/product-register/product-register.component';
import { ProductsListComponent } from './features/products/components/products-list/products-list.component';

export const routes: Routes = [
  {
    path: 'register-product',
    component: ProductRegisterComponent,
  },
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  },
];
