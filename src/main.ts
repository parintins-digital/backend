import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import { PrismaService } from './database/prisma.service';

import { AppModule } from './app.module';
import { AppConfigService } from './app.config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(AppConfigService);
  const prismaClient = app.get(PrismaService);

  app.use(
    session({
      secret: 'secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
        path: '/',
      },
      store: new PrismaSessionStore(prismaClient, {
        checkPeriod: 30 * 60 * 1000,
        dbRecordIdIsSessionId: true,
      }),
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(appConfig.port, appConfig.host);
}

bootstrap();
