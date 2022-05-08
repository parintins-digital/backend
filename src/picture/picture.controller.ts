import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { User as UserEntity } from '@prisma/client';

import { User } from '../auth/decorators/user.decorator';

import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('picture')
@ApiTags('Picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  create(@User() user: UserEntity, @Body() dto: CreatePictureDto) {
    return this.pictureService.create(user, dto);
  }

  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @User('id') userId: number) {
    return this.pictureService.findOne({ id, userId });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @User('id') userId: number,
    @Body() dto: UpdatePictureDto,
  ) {
    return this.pictureService.update({ id, userId }, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User('id') userId: number) {
    return this.pictureService.remove({ id, userId });
  }
}
