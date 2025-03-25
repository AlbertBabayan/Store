import { Routes } from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {PublicComponent} from './public/public.component';
import {RegistrationComponent} from './public/registration/registration.component';
import {PrivateComponent} from './private/private.component';
import {ProductsComponent} from './private/products/products.component';
import {HomeComponent} from './private/home/home.component';
import {productResolver} from './infrastructure/resolvers/product.resolver';
import {authGuard} from './infrastructure/guards/auth.guard';
import {ProductDetailsComponent} from './private/product-details/product-details.component';
import {ProductService} from './private/product.service';

export const appRoutes: Routes = [
  { path: '',
    component: PublicComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegistrationComponent}
    ]
  },
  { path: '',
    component: PrivateComponent,
    providers: [ProductService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'products', component: ProductsComponent},
      { path: 'product-details/:id', component: ProductDetailsComponent, resolve: {product: productResolver}},
    ]
  },
  // { path: '**', component: HomeComponent },

];
