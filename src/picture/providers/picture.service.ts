import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PictureService {
  constructor(private database: PrismaService) {}

  async create(data: Prisma.PictureCreateWithoutVisitInput) {
    const picture = this.database.picture.create({ data });

    return picture;
  }

  async findAll() {
    const picture = this.database.picture.findMany();

    return picture;
  }

  async findOne(where: Prisma.PictureWhereUniqueInput) {
    const picture = this.database.picture.findFirst({ where });

    return picture;
  }

  async update(
    where: Prisma.PictureWhereUniqueInput,
    data: Prisma.PictureUpdateWithoutVisitInput,
  ) {
    const picture = this.database.picture.update({
      where,
      data,
    });

    return picture;
  }

  async remove(where: Prisma.PictureWhereUniqueInput) {
    const picture = this.database.picture.delete({ where });

    return picture;
  }
}
