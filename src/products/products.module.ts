import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ProductsProviders } from './products.providers'
import { DatabaseModule } from 'database/database.module';
import { ProductResolvers } from './products.resolvers'

@Module({
  imports: [ DatabaseModule ],
  controllers: [ ProductsController ],
  providers: [ ProductsService, ...ProductsProviders, ProductResolvers ],
})
export class ProductsModule {}
