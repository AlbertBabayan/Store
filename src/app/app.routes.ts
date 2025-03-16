import { Routes } from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {PublicComponent} from './public/public.component';
import {RegistrationComponent} from './public/registration/registration.component';
import {PrivateComponent} from './private/private.component';
import {ProductsComponent} from './private/products/products.component';
import {HomeComponent} from './public/home/home.component';

export const appRoutes: Routes = [
  { path: '',
    component: PublicComponent,
    // canActivate: [publicGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegistrationComponent}
    ]
  },
  { path: '',
    component: PrivateComponent,
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
      { path: 'product', component: ProductsComponent},
    ]
  },
  // { path: '**', component: HomeComponent },

];
