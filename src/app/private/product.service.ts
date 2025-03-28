import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../infrastructure/interfaces/product.interface';
import {ICartItem} from '../infrastructure/interfaces/product-in-cart.interface';

@Injectable()
export class ProductService {

  private http = inject(HttpClient);
  private cartList = signal<ICartItem[]>([]);
  public cart = this.cartList.asReadonly();

  public getProducts(offset: number, limit: number): Observable<IProduct[]> {
    const url = 'https://api.escuelajs.co/api/v1/products'
    return this.http.get<IProduct[]>(`${url}?offset=${offset}&limit=${limit}`);
  }

  public getProduct(id: number): Observable<IProduct> {
    const url = 'https://api.escuelajs.co/api/v1/products'
    return this.http.get<IProduct>(`${url}/${id}`);
  }

  public addToCartList(product: IProduct): void {
    this.cartList.update(items => {
      const foundProduct = items.find(item => item.item.id === product.id);
      if (!foundProduct) {
        items.push({item: product, count: 0})
      }
      return items.map(cartItem => {
        if (cartItem.item.id === product.id) {
          return {...cartItem, count: cartItem.count + 1}
        }
        return cartItem;
      })
    })
  }

  public addProduct(product: IProduct): void {
    this.cartList.update(items => {
      return items.map(cartItem => {
        if (cartItem.item.id === product.id) {
          return {...cartItem, count: cartItem.count + 1}
        }
        return cartItem;
      })
    })
  }

  public removeProduct(product: IProduct): void {
    this.cartList.update(items => {
      const changedItems = items.map((cartItem) => {
        if (cartItem.item.id === product.id) {
          return {...cartItem, count: cartItem.count - 1};
        }
        return cartItem;
      });
      return changedItems.filter(item => item.count)
    })
  }

  public deleteFromList (product: IProduct): void {
    this.cartList.update(items => {
      return items.filter(item => item.item.id !== product.id);
    })
  }
}
