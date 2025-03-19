import {Component, computed, DestroyRef, effect, inject, signal} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ProductService} from './product.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {IProduct} from '../../infrastructure/interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatPaginator,
    JsonPipe
  ],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private productService = inject(ProductService)
  private destroyRef = inject(DestroyRef)
  public pageSize = signal(20);
  public pageIndex = signal(0);
  private offset = computed(() => this.pageIndex() * this.pageSize());
  public products: IProduct[] = [];

  constructor() {
    effect(() => {
      this.getProduct();
    });
  }

  private getProduct() {
    this.productService.getProducts(this.offset(), this.pageSize()).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(res => this.products = res);
  }

  public handlePageEvent(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }
}
