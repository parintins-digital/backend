import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName?: string = '';

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(
    firstName: string,
    email: string,
    password: string,
    lastName?: string,
  ) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;

    if (lastName) this.lastName = lastName;
  }
}
