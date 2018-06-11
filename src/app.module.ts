import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from 'config/config.module'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { SubscriptionsModule } from './subscriptions/subscriptions.module'
import { SubscriptionsService } from './subscriptions/subscriptions.service'
import GraphQLJSON from 'graphql-type-json'

@Module({
  imports: [ SubscriptionsModule.forRoot(), ConfigModule, GraphQLModule, UsersModule, ProductsModule ],
  controllers: [AppController],
  providers: [ AppService ]
})
export class AppModule implements NestModule {

  constructor(
    private readonly subscriptionService: SubscriptionsService,
    private readonly graphQLFactory: GraphQLFactory
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const schema = this.createSchema()
    const resolvers = { JSON: GraphQLJSON };

    consumer.apply(graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:3002/subscriptions`
    }))
    .forRoutes('/graphiql')
    .apply(graphqlExpress( req => ({ schema, rootValue: req})))
    .forRoutes('/graphql')
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql')
    return this.graphQLFactory.createSchema({ typeDefs })
  }
}
