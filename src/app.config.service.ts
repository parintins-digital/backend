import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './config/env.validation';

type AppVariables = Pick<
  EnvironmentVariables,
  'APP_HOST' | 'APP_PORT' | 'APP_API_DOMAIN' | 'APP_CLIENT_URL' | 'APP_SESSION_SECRET'
>;

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<AppVariables, true>) {}

  get host(): string {
    const env = this.configService.get('APP_HOST', { infer: true });
    return env;
  }

  get port(): number {
    const env = this.configService.get('APP_PORT', { infer: true });
    return env;
  }

  get apiDomain(): string {
    const env = this.configService.get('APP_API_DOMAIN', { infer: true });
    return env;
  }

  get clientUrl(): string {
    const env = this.configService.get('APP_CLIENT_URL', { infer: true });
    return env;
  }

  get secret(): string {
    const env = this.configService.get('APP_SESSION_SECRET', {infer: true});
    return env;
  }
}
