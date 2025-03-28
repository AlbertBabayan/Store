import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, Subject} from 'rxjs';
import {IProduct} from '../../infrastructure/interfaces/product.interface';
import {MatButton} from '@angular/material/button';
import {JsonPipe} from '@angular/common';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatButton,
    JsonPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  private productService = inject(ProductService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  public product = toSignal(
    this.activeRoute.data.pipe(
      map(res => res['product'] as IProduct),
    ), {requireSync: true});

  public products() {
    this.router.navigate(['products']);
  }

  public addToCart() {
    this.productService.addToCartList(this.product());
  }
}
