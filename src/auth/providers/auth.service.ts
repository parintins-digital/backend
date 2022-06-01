import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LocalAccount, OAuthAccount } from '@prisma/client';
import { compare } from 'bcrypt';
import { Profile } from 'passport';

import { AccountService } from 'src/user/providers/account.service';
import { UserService } from 'src/user/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
  ) {}

  async oauthLogin(profile: Profile): Promise<OAuthAccount> {
    let account = await this.accountService.findOAuthAccount({
      subject: profile.id,
    });

    if (account == null) {
      const firstName = profile.name?.givenName ?? profile.displayName;
      const lastName = profile.name?.familyName;

      const { id } = await this.userService.create({ firstName, lastName });
      account = await this.accountService.createOAuthAccount(
        {
          provider: profile.provider,
          subject: profile.id,
        },
        { id },
      );
    }

    return account;
  }

  async localLogin(email: string, password: string): Promise<LocalAccount> {
    let account = await this.accountService.findLocalAccount({
      email,
    });

    // Email não registrado
    if (account == null) {
      throw new UnauthorizedException();
    }

    const match = await compare(password, account.password.toString());

    if (!match) {
      throw new UnauthorizedException();
    }

    return account;
  }

  async adminLogin(email: string, password: string): Promise<LocalAccount> {
    let account = await this.accountService.findAdminAccount({
      email,
    })
    
    // Email não registrado
    if (account == null) {
      throw new UnauthorizedException();
    }

    const match = await compare(password, account.password.toString());

    if (!match) {
      throw new UnauthorizedException();
    }

    return account;
  }
}
