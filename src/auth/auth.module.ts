import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';
import { AuthConfigService } from './providers/auth.config.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthConfigService,
    AuthService,
    LocalAuthGuard,
    GoogleOAuthGuard,
    LocalStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
