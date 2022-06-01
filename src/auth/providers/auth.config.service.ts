import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '../../config/env.validation';
import { GOOGLE_REDIRECT } from '../auth.constants';

type AuthVariables = Pick<
  EnvironmentVariables,
  | 'APP_DOMAIN'
  | 'APP_LOGIN_REDIRECT'
  | 'GOOGLE_CLIENT'
  | 'GOOGLE_SECRET'
>;

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService<AuthVariables, true>) {}

  get googleId(): string {
    const env = this.configService.get('GOOGLE_CLIENT', { infer: true });
    return env;
  }

  get googleSecret(): string {
    const env = this.configService.get('GOOGLE_SECRET', { infer: true });
    return env;
  }

  get googleRedirectUrl(): string {
    const domain = this.configService.get('APP_DOMAIN', { infer: true });

    const redirect = `http://${domain}/${GOOGLE_REDIRECT}`;
    return redirect;
  }

  get loginRedirectUrl(): string {
    const redirect = this.configService.get('APP_LOGIN_REDIRECT', {
      infer: true,
    });
    return redirect;
  }
}
