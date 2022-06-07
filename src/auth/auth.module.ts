import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';
import { AuthConfigService } from './providers/auth.config.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AdminStrategy } from './strategies/admin.strategy';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useClass: AuthConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: AuthConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthConfigService,
    LocalAuthGuard,
    GoogleOAuthGuard,
    LocalStrategy,
    GoogleStrategy,
    AdminStrategy,
  ],
})
export class AuthModule {}
