import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PictureModule } from './picture/picture.module';
import { PrismaService } from './prisma.service';
import { validate } from './config/env.validation';
import { AppConfigService } from './app.config.service';

@Module({
  imports: [
    UserModule,
    PictureModule,
    AuthModule,
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      cache: true,
      validate,
    }),
  ],
  providers: [AppConfigService, PrismaService],
})
export class AppModule {}
