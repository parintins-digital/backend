import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { IStrategyOptions, Strategy } from 'passport-local';

import { AuthService } from '../providers/auth.service';
import { UserAccount } from '../model/user-account';
import { LOCAL_STRATEGY } from '../auth.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', session: true } as IStrategyOptions);
  }

  async validate(email: string, password: string): Promise<UserAccount> {
    const userAccount = await this.authService.localLogin(email, password);

    return userAccount;
  }
}
