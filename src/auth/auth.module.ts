import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { AuthService } from './providers/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthConfigService } from './providers/auth.config.service';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthConfigService, AuthService, GoogleStrategy, GoogleOAuthGuard],
})
export class AuthModule {}
