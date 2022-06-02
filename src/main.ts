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

  const origin = appConfig.clientUrl;
  app.enableCors({ credentials: true, origin });

  app.use(
    session({
      secret: 'secret',
      saveUninitialized: false,
      resave: false,
      unset: 'destroy',
      proxy: true,
      cookie: {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      },
      store: new PrismaSessionStore(prismaClient, {
        checkPeriod: 5 * 60 * 1000,
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
