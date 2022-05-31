import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PictureModule } from './picture/picture.module';
import { AppConfigService } from './app.config.service';
import { validateEnviroment } from './config/env.validation';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      expandVariables: true,
      isGlobal: true,
      cache: true,
      validate: validateEnviroment,
    }),
    UserModule,
    PictureModule,
    AuthModule,
    DatabaseModule,
  ],
  providers: [AppConfigService],
})
export class AppModule {}
