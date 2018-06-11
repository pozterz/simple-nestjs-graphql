import { Injectable, Inject } from '@nestjs/common';
import { Products } from './products.model'
import { Constant } from '../config/Constant'

@Injectable()
export class ProductsService {
  constructor(
    @Inject(Constant.productRepo) private readonly products: typeof Products,
  ) {}

  async findAll(filter): Promise<Products[]> {
    return await this.products.findAll({
      limit: filter.first,
      offset: filter.skip
    });
  }

  async countProducts():  Promise<Number> {
    return await this.products.count()
  }

  async findProduct(id): Promise<Products> {
    return await this.products.findById(id)
  }

  async createProduct(product: Products): Promise<Products> {
    return await this.products.create(product)
  }
}