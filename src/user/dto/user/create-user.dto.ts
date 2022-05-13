import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName?: string = '';

  @IsEmail()
  email: string;

  constructor(firstName: string, email: string, lastName?: string) {
    this.firstName = firstName;
    this.email = email;

    if (lastName) this.lastName = lastName;
  }
}
