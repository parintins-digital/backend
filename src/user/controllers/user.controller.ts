import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Session,
} from '@nestjs/common';

import { UserService } from '../providers/user.service';
import { CreateUserDTO } from '../dto/user/create-user.dto';
import { UpdateUserDTO } from '../dto/user/update-user.dto';
import { RequestSession } from 'src/auth/model/user-session';
import { Authenticated } from 'src/auth/decorators/authenticated.decorator';
import { Administrator } from 'src/auth/decorators/admin.decorator';

@Controller('user')
@Authenticated()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Administrator()
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  findCurrentUser(@Session() session: RequestSession) {
    const { user: id } = session;

    return this.userService.findOne({ id });
  }

  @Patch()
  update(
    @Session() session: RequestSession, @Body() body: UpdateUserDTO) {
    const id = session.user;
    return this.userService.update({ id }, body);
  }

  @Delete()
  remove(
    @Session() session: RequestSession) {
      const id = session.user;
    return this.userService.remove({ id });
  }
}
