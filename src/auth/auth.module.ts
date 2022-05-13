import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthConfigService } from './auth.config.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthConfigService, AuthService, GoogleStrategy, GoogleAuthGuard],
})
export class AuthModule {}
