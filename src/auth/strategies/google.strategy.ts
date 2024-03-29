import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Profile } from 'passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';

import { AuthConfigService } from '../providers/auth.config.service';
import { AuthService } from '../providers/auth.service';
import { UserAccount } from '../model/user-account';
import { GOOGLE_SCOPES, GOOGLE_STRATEGY } from '../auth.constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  GOOGLE_STRATEGY,
) {
  constructor(private authService: AuthService, authConfig: AuthConfigService) {
    super({
      clientID: authConfig.googleId,
      clientSecret: authConfig.googleSecret,
      callbackURL: authConfig.googleRedirectUrl,
      scope: GOOGLE_SCOPES,
    } as StrategyOptions);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<UserAccount> {
    const userAccount = await this.authService.oauthLogin(profile);

    return userAccount;
  }
}
