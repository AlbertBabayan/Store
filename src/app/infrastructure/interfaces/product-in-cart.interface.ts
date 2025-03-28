import {IProduct} from './product.interface';

export interface ICartItem<T = IProduct> {
  item: T;
  count: number;
}
