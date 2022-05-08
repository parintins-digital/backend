import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import type { UserService } from '../user/user.service';
import type { JwtPayload } from './strategies/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(cred: any): Promise<User> {
    const user = await this.userService.findOrCreate({
      email: cred.email,
      firstName: cred.name
    });

    return user;
  }

  async generateJwt(user: User) {
    const payload: JwtPayload = {
      name: user.firstName + user.lastName,
      sub: user.id,
      iat: Date.now() / 1000,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
