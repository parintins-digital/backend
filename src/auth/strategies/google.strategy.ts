import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy } from 'passport-google-oauth20';

import type { AuthConfigService } from '../auth.config.service';
import type { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authConfig: AuthConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: authConfig.googleId,
      clientSecret: authConfig.googleSecret,
      callbackURL: authConfig.googleRedirect,
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    console.log(_accessToken);
    console.log(_refreshToken);
    console.log(profile);
      
    const user = this.authService.login(profile);
    return user;
  }
}
