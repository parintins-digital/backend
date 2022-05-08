import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PictureService {
  constructor(private database: PrismaService) {}

  async create(
    connect: Prisma.UserWhereUniqueInput,
    pictureInput: Prisma.PictureCreateWithoutUserInput,
  ) {
    const data = { user: { connect }, ...pictureInput };
    const picture = this.database.picture.create({ data });

    return picture;
  }

  async findAll() {
    const picture = this.database.picture.findMany();

    return picture;
  }

  async findOne(id_userId: Prisma.PictureIdUserIdCompoundUniqueInput) {
    const picture = this.database.picture.findFirst({ where: id_userId });

    return picture;
  }

  async update(
    id_userId: Prisma.PictureIdUserIdCompoundUniqueInput,
    data: Prisma.PictureUpdateWithoutUserInput,
  ) {
    const picture = this.database.picture.update({
      where: { id_userId },
      data,
    });

    return picture;
  }

  async remove(id_userId: Prisma.PictureIdUserIdCompoundUniqueInput) {
    const picture = this.database.picture.delete({ where: { id_userId } });

    return picture;
  }
}
