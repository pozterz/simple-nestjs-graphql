import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './logger.config'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), {
    logger: new Logger(),
  });
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
