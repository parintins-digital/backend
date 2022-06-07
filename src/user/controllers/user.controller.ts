import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Session,
} from '@nestjs/common';

import { hash } from 'bcrypt';

import { UserService } from '../providers/user.service';
import { CreateUserDTO } from '../dto/user/create-user.dto';
import { UpdateUserDTO } from '../dto/user/update-user.dto';
import { RequestSession } from 'src/auth/model/request-session';
import { Authenticated } from 'src/auth/decorators/authenticated.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() { firstName, lastName, email, password }: CreateUserDTO,
  ) {
    const hashedPassword = Buffer.from(await hash(password, 10), 'utf-8');

    return this.userService.create({
      firstName,
      lastName,
      localAccount: { create: { email, password: hashedPassword } },
    });
  }

  @Get()
  @Authenticated()
  findCurrentUser(@Session() session: RequestSession) {
    const id = session.user;

    return this.userService.findOne({ id });
  }

  @Get('admin')
  @Authenticated()
  isCurrentUserAdmin(@Session() session: RequestSession) {
    return session.admin;
  }

  @Patch()
  @Authenticated()
  update(@Session() session: RequestSession, @Body() body: UpdateUserDTO) {
    const id = session.user;

    return this.userService.update({ id }, body);
  }

  @Delete()
  @Authenticated()
  remove(@Session() session: RequestSession) {
    const id = session.user;

    return this.userService.remove({ id });
  }
}
