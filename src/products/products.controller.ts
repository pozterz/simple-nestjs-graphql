import { Controller, UseGuards, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.model'
// import { AuthGuard } from 'auth/auth.guard';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getproducts() {
    return await this.productsService.findAll()
  }

}
