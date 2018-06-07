import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UsersProviders } from './users.providers'
import { DatabaseModule } from 'database/database.module';
import { AuthMiddleware } from '../auth/auth.middleware'

@Module({
  imports: [ DatabaseModule ],
  controllers: [ UsersController ],
  providers: [ UsersService, ...UsersProviders ],
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/users')
  }
}