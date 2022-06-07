import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EnvironmentVariables } from '../../config/env.validation';
import { GOOGLE_REDIRECT } from '../auth.constants';
import { Options } from 'ejs';

type AuthVariables = Pick<
  EnvironmentVariables,
  | 'APP_API_DOMAIN'
  | 'APP_LOGIN_REDIRECT'
  | 'APP_CLIENT_URL'
  | 'APP_JWT_SECRET'
  | 'EMAIL_HOST'
  | 'EMAIL_ALIAS'
  | 'EMAIL_USER'
  | 'EMAIL_PASS'
  | 'EMAIL_TRANSPORT'
  | 'GOOGLE_CLIENT'
  | 'GOOGLE_SECRET'
>;

@Injectable()
export class AuthConfigService
  implements JwtOptionsFactory, MailerOptionsFactory
{
  constructor(private configService: ConfigService<AuthVariables, true>) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const secret = this.jwtSecret;

    return {
      secret,
      signOptions: {
        expiresIn: 15 * 60 * 1000,
      },
    };
  }

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: this.emailTransport,
      defaults: {
        from: `${this.emailAlias} <${this.emailUser}>`,
      },
      template: {
        dir: './templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        } as Options,
      },
      preview: false,
    };
  }

  get googleId(): string {
    const client = this.configService.get('GOOGLE_CLIENT', { infer: true });
    return client;
  }

  get googleSecret(): string {
    const secret = this.configService.get('GOOGLE_SECRET', { infer: true });
    return secret;
  }

  get googleRedirectUrl(): string {
    const domain = this.configService.get('APP_API_DOMAIN', { infer: true });

    const redirect = `http://${domain}/${GOOGLE_REDIRECT}`;
    return redirect;
  }

  get loginRedirectUrl(): string {
    const redirect = this.configService.get('APP_LOGIN_REDIRECT', {
      infer: true,
    });
    return redirect;
  }

  get clientUrl(): string {
    const url = this.configService.get('APP_CLIENT_URL', { infer: true });
    return url;
  }

  get jwtSecret(): string {
    const secret = this.configService.get('APP_JWT_SECRET', { infer: true });
    return secret;
  }

  get emailHost(): string {
    const host = this.configService.get('EMAIL_HOST', { infer: true });
    return host;
  }
  get emailAlias(): string {
    const alias = this.configService.get('EMAIL_ALIAS', { infer: true });
    return alias;
  }
  get emailUser(): string {
    const user = this.configService.get('EMAIL_USER', { infer: true });
    return user;
  }
  get emailPass(): string {
    const password = this.configService.get('EMAIL_PASS', { infer: true });
    return password;
  }
  get emailTransport(): string {
    const transport = this.configService.get('EMAIL_TRANSPORT', {
      infer: true,
    });
    return transport;
  }
}
