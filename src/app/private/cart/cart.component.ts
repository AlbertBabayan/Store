import {Component, computed, inject} from '@angular/core';
import {ProductService} from '../product.service';
import {TruncatePipe} from '../../infrastructure/pipes/truncate.pipe';
import {IProduct} from '../../infrastructure/interfaces/product.interface';
import {ICartItem} from '../../infrastructure/interfaces/product-in-cart.interface';
import {MatButton} from '@angular/material/button';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [
    TruncatePipe,
    MatButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private productService = inject(ProductService);
  private toastrService = inject(ToastrService);
  public selectedItems = this.productService.cart;
  public countOfPrices = computed(() => {
    return this.selectedItems().reduce((acc: number, current: ICartItem) => {
      return acc + (current.item.price * current.count);
    }, 0);
  })


  public addProduct(item: IProduct): void {
    this.productService.addProduct(item)
    this.toastrService.success('Product Added');
  }

  public removeProduct(item: IProduct): void {
    this.productService.removeProduct(item)
    this.toastrService.info('Product Removed');
  }

  public deleteFromList(item: IProduct): void {
    this.productService.deleteFromList(item)
    this.toastrService.info('Product Deleted');
  }
}
