import {Component, computed, DestroyRef, effect, inject, signal} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ProductService} from '../product.service';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {IProduct} from '../../infrastructure/interfaces/product.interface';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs';
import {JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatPaginator,
    MatButton,
    NgIf,
    JsonPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private productService = inject(ProductService)
  private destroyRef = inject(DestroyRef)
  private router = inject(Router);
  public pageSize = signal(25);
  public pageIndex = signal(0);
  private offset = computed(() => this.pageIndex() * this.pageSize());
  public searchTerm= signal<string>('');
  public products = toSignal(
    this.productService.getProducts(this.offset(), this.pageSize()));
  public filtredProducts = computed(() =>
    this.products()?.filter(item => item.title.toLowerCase().includes(this.searchTerm().toLowerCase())));

  public search(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  public handlePageEvent(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  public productDetails(id: number) {
    this.router.navigate(['product-details', id]);
  }
}
