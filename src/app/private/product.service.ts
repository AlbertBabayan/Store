import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../infrastructure/interfaces/product.interface';

@Injectable()

export class ProductService {

  private http = inject(HttpClient);

  public getProducts(offset: number, limit: number): Observable<IProduct[]> {
    const url = 'https://api.escuelajs.co/api/v1/products'
    return this.http.get<IProduct[]>(`${url}?offset=${offset}&limit=${limit}`);
  }

  public getProduct(id: number): Observable<IProduct> {
    const url = 'https://api.escuelajs.co/api/v1/products'
    return this.http.get<IProduct>(`${url}/${id}`);
  }
}
