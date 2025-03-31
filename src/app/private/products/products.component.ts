import {Component, computed, inject, signal} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ProductService} from '../product.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {IProduct} from '../../infrastructure/interfaces/product.interface';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatPaginator,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private productService = inject(ProductService)
  private router = inject(Router);
  public pageSize = signal(25);
  public pageIndex = signal(0);
  private offset = computed(() => this.pageIndex() * this.pageSize());
  public searchTerm = signal<string>('');
  public viewValue = signal<string>('');
  public products = toSignal(
    this.productService.getProducts(this.offset(), this.pageSize()), {initialValue: []});
  public filtredProducts = computed(() => {
    const products = this.products().filter(item => item.title.toLowerCase().includes(this.searchTerm().toLowerCase()))
    return this.selectionSort(products, this.viewValue());
  });

  public priceOption = [
    {value: 'default', viewValue: 'Default'},
    {value: 'highest', viewValue: 'Highest Price'},
    {value: 'lowest', viewValue: 'Lowest Price'},
  ];

  public selectedPrice(event: MatSelectChange) {
    this.viewValue.set(event.value);
  }


  public selectionSort(arr: IProduct[], viewValue: string) {
    switch (viewValue) {
      case 'highest': {
        let max, i, j;
        for (i = 0; i < arr.length - 1; ++i) {
          max = i;
          for (j = i + 1; j < arr.length; j++) {
            if (arr[j].price > arr[max].price) max = j;
          }
          if (max != i)
            [arr[max], arr[i]] = [arr[i], arr[max]]
        }
        break;
      }
      case 'lowest': {
        let min, i, j;
        for (i = 0; i < arr.length - 1; ++i) {
          min = i;
          for (j = i + 1; j < arr.length; j++) {
            if (arr[j].price < arr[min].price) min = j;
          }
          if (min != i)
            [arr[min], arr[i]] = [arr[i], arr[min]]
        }
        break;
      }
        case 'default': {
        break;
      }
    }
    return arr;
  }


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

  public addToCart(product: IProduct) {
    this.productService.addToCartList(product);
  }
}
