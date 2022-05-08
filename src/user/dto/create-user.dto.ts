import { IsEmail, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @NotEquals(null)
  lastName?: string = '';

  @IsEmail()
  email: string;

  constructor(firstName: string, email: string, lastName?: string) {
    this.firstName = firstName;
    this.email = email;

    if (lastName) this.lastName = lastName;
  }
}
