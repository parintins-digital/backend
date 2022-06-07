import { BadRequestException, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { unlink } from 'fs/promises';
import { join } from 'path';

import { PrismaService } from '../../database/prisma.service';
import { PictureConfigService } from './picture.config.service';

@Injectable()
export class PictureService {
  constructor(
    private database: PrismaService,
    private readonly configService: PictureConfigService,
  ) {}

  async create(data: Prisma.PictureCreateWithoutVisitInput) {
    const picture = this.database.picture.create({ data });

    return picture;
  }

  async findMany(where: Prisma.PictureWhereInput) {
    const pictures = this.database.picture.findMany({ where });

    return pictures;
  }

  async findManyWithVisit(
    where: Prisma.PictureWhereInput,
    user: Prisma.UserWhereUniqueInput,
  ) {
    const pictures = this.database.picture.findMany({
      where,
      include: { Visit: { where: { user } } },
    });

    return pictures;
  }

  async findOne(where: Prisma.PictureWhereUniqueInput) {
    const picture = this.database.picture.findUnique({ where });

    return picture;
  }

  async update(
    where: Prisma.PictureWhereUniqueInput,
    data: Prisma.PictureUpdateWithoutVisitInput,
  ) {
    if (data.filename != null) {
      const oldPicture = await this.database.picture.findFirst({ where });

      if (oldPicture == null) {
        return oldPicture;
      }

      await this.removeImage(oldPicture.filename);
    }

    const picture = this.database.picture.update({
      where,
      data,
    });

    return picture;
  }

  async remove(where: Prisma.PictureWhereUniqueInput) {
    const picture = await this.database.picture.delete({ where });

    await this.removeImage(picture.filename);

    return picture;
  }

  async removeImage(filename: string) {
    try {
      await unlink(join(this.configService.pictureUploadDestination, filename));
    } catch {
      throw new BadRequestException();
    }
  }
}
