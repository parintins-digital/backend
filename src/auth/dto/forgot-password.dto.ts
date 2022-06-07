import { IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @IsString()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
