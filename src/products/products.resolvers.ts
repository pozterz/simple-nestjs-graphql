import { Query, Mutation, Resolver, DelegateProperty, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { Products } from './products.model'
import { ProductsService } from './products.service'

const pubSub = new PubSub()

@Resolver('Product')
export class ProductResolvers {
  constructor(
    private readonly productService: ProductsService
  ) {}

  @Query('allProducts')
  async getProducts(obj, args, context, info): Promise<Products[]> {
    const { first, skip } = args
    return await this.productService.findAll({ first, skip })
  }

  @Query('_allProductsMeta')
  async getProductsCount(obj, args, context, info){
    return { count: await this.productService.countProducts() }
  }

  @Query('product')
  async getProduct(obj, args, context, info): Promise<Products> {
    const { id } = args
    return await this.productService.findProduct(+id)
  }

  @Mutation('createProduct')
  async createProduct(obj, args: Products, context, info): Promise<Products> {
    const product = await this.productService.createProduct(args)
    pubSub.publish('newProduct', { product })
    return product
  }

  @Subscription('newProduct')
  newProduct() {
    return {
      subscribe: () => pubSub.asyncIterator('newProduct')
    }
  }
}