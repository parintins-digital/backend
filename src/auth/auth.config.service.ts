import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '../config/env.validation';
import { GOOGLE_REDIRECT } from './auth.constants';

type AuthVariables = Pick<
  EnvironmentVariables,
  'APP_HOST' | 'APP_PORT' | 'GOOGLE_CLIENT' | 'GOOGLE_SECRET'
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
    const port = this.configService.get('APP_PORT', { infer: true });
    const host = this.configService.get('APP_HOST', { infer: true });

    const redirect = `http://${host}:${port}/${GOOGLE_REDIRECT}`;
    return redirect;
  }
}
