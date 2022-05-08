import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import type { EnvironmentVariables } from '../config/env.validation';

type AuthVariables = Pick<
  EnvironmentVariables,
  | 'JWT_SECRET'
  | 'JWT_ISSUER'
  | 'GOOGLE_CLIENT'
  | 'GOOGLE_SECRET'
  | 'GOOGLE_REDIRECT'
>;

@Injectable()
export class AuthConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService<AuthVariables, true>) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.jwtSecret,
    };
  }

  get jwtSecret(): string {
    const env = this.configService.get('JWT_SECRET', { infer: true });
    return env;
  }

  get jwtIssuer(): string {
    const env = this.configService.get('JWT_ISSUER', { infer: true });
    return env;
  }

  get googleId(): string {
    const env = this.configService.get('GOOGLE_CLIENT', { infer: true });
    return env;
  }

  get googleSecret(): string {
    const env = this.configService.get('GOOGLE_SECRET', { infer: true });
    return env;
  }

  get googleRedirect(): string {
    const env = this.configService.get('GOOGLE_REDIRECT', { infer: true });
    return env;
  }
}
