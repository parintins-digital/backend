import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { PictureService } from '../providers/picture.service';
import { CreatePictureDto } from '../dto/create-picture.dto';
import { UpdatePictureDto } from '../dto/update-picture.dto';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  create(@Body() dto: CreatePictureDto) {
    return this.pictureService.create(dto);
  }

  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pictureService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePictureDto) {
    return this.pictureService.update({ id }, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pictureService.remove({ id });
  }
}
