import {Component, computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../product.service';
import {ICartItem} from '../../infrastructure/interfaces/product-in-cart.interface';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent {
  private router = inject(Router);
  private productService = inject(ProductService);
  public selectedItems = this.productService.cart;
  public count = computed(() => {
    return this.selectedItems().reduce((acc: number, currentValue: ICartItem) => {
      return acc + currentValue.count
    }, 0)
  });

  public navToProducts() {
    this.router.navigate(['products']);
  }

  public navToHome() {
    this.router.navigate(['home']);
  }

  public navToCarts() {
    this.router.navigate(['cart']);
  }
}
