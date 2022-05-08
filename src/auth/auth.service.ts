import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login({ email, name }: { email: string; name: string }): Promise<User> {
    const user = this.userService.findOrCreate(
      { email },
      {
        email,
        firstName: name,
      },
    );

    return user;
  }
}
