import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { IStrategyOptions, Strategy } from 'passport-local';

import { AuthService } from '../providers/auth.service';
import { UserAccount } from '../model/user-account';
import { ADMIN_STRATEGY } from '../auth.constants';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, ADMIN_STRATEGY) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', session: true } as IStrategyOptions);
  }

  async validate(email: string, password: string): Promise<UserAccount> {
    const userAccount = await this.authService.adminLogin(email, password);

    return userAccount;
  }
}
