import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';

import { User } from 'src/auth/decorators/user.decorator';
import { UserService } from '../providers/user.service';
import { CreateUserDTO } from '../dto/user/create-user.dto';
import { UpdateUserDTO } from '../dto/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  findCurrentUser(@User('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Patch()
  update(@User('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update({ id }, body);
  }

  @Delete()
  remove(@User('id') id: string) {
    return this.userService.remove({ id });
  }
}
