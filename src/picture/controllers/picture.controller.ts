import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Admin } from 'src/auth/decorators/admin.decorator';
import { Authenticated } from 'src/auth/decorators/authenticated.decorator';

import { PictureService } from '../providers/picture.service';
import { CreatePictureDto } from '../dto/create-picture.dto';
import { UpdatePictureDto } from '../dto/update-picture.dto';

import { join } from 'path';
import { PictureCategory } from '@prisma/client';

@Controller('picture')
@Authenticated()
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @Admin()
  async create(
    @Body() dto: CreatePictureDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const picture = await this.pictureService.create(dto);

    image.destination = join(image.destination, picture.category);
    image.fieldname = picture.id;

    return picture;
  }

  @Get()
  findMany(
    @Query('category') category?: PictureCategory,
    @Query('visitedOn') date?: Date,
    @Query('title') title?: string,
  ) {
    let createdAt;
    if (date instanceof Date && !isNaN(date.getTime())) {
      createdAt = {
        gte: new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        ),
        lte: new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        ),
      };
    }

    return this.pictureService.findMany({ category, createdAt, title });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pictureService.findOne({ id });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @Admin()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePictureDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const picture = await this.pictureService.update({ id }, dto);

    image.destination = join(image.destination, picture.category);
    image.fieldname = picture.id;

    return picture;
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.pictureService.remove({ id });
  }
}
