import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { UserService } from '../../user/providers/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(email: string, name: string): Promise<User> {
    const [first, lastName] = this.splitName(name);
    const firstName = first ?? name;

    const user = this.userService.findOrCreate(
      { email },
      {
        email,
        firstName,
        lastName,
      },
    );

    return user;
  }

  private splitName(name: string): string[] {
    const [head, ...tail] = name.split(' ').filter((name) => name.trim());
    const firstName = head ?? name;
    const lastName = tail.join(' ');

    return [firstName, lastName];
  }
}
