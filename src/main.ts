import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import { PrismaService } from './database/prisma.service';

import { AppModule } from './app.module';
import { AppConfigService } from './app.config.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const appConfig = app.get(AppConfigService);
  const prismaClient = app.get(PrismaService);

  const origin = appConfig.clientUrl;
  const secret = appConfig.secret;

  app.set('trust proxy');
  app.enableCors({ credentials: true, origin });

  app.use(
    session({
      secret,
      saveUninitialized: false,
      resave: false,
      rolling: true,
      unset: 'destroy',
      proxy: true,
      cookie: {
        maxAge: 20 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      },
      store: new PrismaSessionStore(prismaClient, {
        checkPeriod: 5 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        ttl: 2 * 60 * 60 * 1000,
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
