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
} from '@nestjs/common';

import { PictureService } from '../providers/picture.service';
import { CreatePictureDto } from '../dto/create-picture.dto';
import { UpdatePictureDto } from '../dto/update-picture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Administrator } from 'src/auth/decorators/admin.decorator';
import { Authenticated } from 'src/auth/decorators/authenticated.decorator';

@Controller('picture')
@Authenticated()
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @Administrator()
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CreatePictureDto,
  ) {
    image.filename = dto.title;
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
  @Administrator()
  update(@Param('id') id: string, @Body() dto: UpdatePictureDto) {
    return this.pictureService.update({ id }, dto);
  }

  @Delete(':id')
  @Administrator()
  remove(@Param('id') id: string) {
    return this.pictureService.remove({ id });
  }
}
