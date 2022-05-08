import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthConfigService } from './auth.config.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({ useExisting: AuthConfigService }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthConfigService],
})
export class AuthModule {}
