import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './config/env.validation';

type AppVariables = Pick<EnvironmentVariables, 'APP_HOST' | 'APP_PORT'>;

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
}
