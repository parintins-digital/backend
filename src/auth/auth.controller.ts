import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller(' ')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticateToken(@Body('token') token: string) {
    const user = await this.authService.verifyAuthToken(token);
    return this.authService.generateJwt(user);
  }
}
