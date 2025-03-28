import {Component, computed, inject, signal} from '@angular/core';
import {ProductService} from '../product.service';
import {TruncatePipe} from '../../infrastructure/pipes/truncate.pipe';
import {IProduct} from '../../infrastructure/interfaces/product.interface';
import {ICartItem} from '../../infrastructure/interfaces/product-in-cart.interface';


@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [
    TruncatePipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private productService = inject(ProductService);
  public selectedItems = this.productService.cart;
  public countOfPrices = computed(() => {
    return this.selectedItems().reduce((acc: number, current: ICartItem<IProduct>) => {
      return acc + (current.item.price * current.count);
    }, 0);
  })


  public addProduct(item: IProduct): void {
    this.productService.addProduct(item)
  }

  public removeProduct(item: IProduct): void {
    this.productService.removeProduct(item)
  }

  public deleteFromList(item: IProduct): void {
    this.productService.deleteFromList(item)
  }
}
