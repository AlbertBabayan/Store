import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {ProductService} from '../../private/product.service';
import {IProduct} from '../interfaces/product.interface';

export const productResolver: ResolveFn<IProduct | null> = (route) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id');
  if(!id || !+id) { // for falsy value and NaN
    return null;
  }
  return productService.getProduct(+id);
};
