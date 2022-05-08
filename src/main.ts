import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppConfigService } from './app.config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  const appConfig = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      skipUndefinedProperties: true,
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
