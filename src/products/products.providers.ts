import { Products } from './products.model';
import { Constant } from '../config/Constant'

export const ProductsProviders = [
  {
    provide: Constant.productRepo,
    useValue: Products,
  },
];