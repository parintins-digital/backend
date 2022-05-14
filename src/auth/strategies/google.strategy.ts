import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Profile } from 'passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';

import { AuthConfigService } from '../auth.config.service';
import { AuthService } from '../auth.service';
import { GOOGLE_SCOPES, GOOGLE_STRATEGY } from '../auth.constants';
import { User } from '@prisma/client';

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
  ): Promise<User> {
    const name = profile.displayName;
    const email = profile.emails?.[0]?.value!;

    const user = await this.authService.login(name, email);

    return user;
  }
}
