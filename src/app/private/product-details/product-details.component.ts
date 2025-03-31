import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {IProduct} from '../../infrastructure/interfaces/product.interface';
import {MatButton} from '@angular/material/button';
import {ProductService} from '../product.service';
import {TruncatePipe} from '../../infrastructure/pipes/truncate.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatButton,
    TruncatePipe,
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
