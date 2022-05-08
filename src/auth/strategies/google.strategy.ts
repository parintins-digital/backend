import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy, StrategyOptions } from 'passport-google-oauth20';

import { AuthConfigService } from '../auth.config.service';
import { AuthService } from '../auth.service';
import { GOOGLE_SCOPES } from '../auth.constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService, authConfig: AuthConfigService) {
    super({
      clientID: authConfig.googleId,
      clientSecret: authConfig.googleSecret,
      callbackURL: authConfig.googleRedirectUrl,
      scope: GOOGLE_SCOPES,
    } as StrategyOptions);
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    console.log(_accessToken);
    console.log(_refreshToken);
    console.log(profile);

    const user = this.authService.login(profile);
    return user;
  }
}
