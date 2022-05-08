import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';

import type { PrismaService } from '../prisma.service';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async create(
    connect: Prisma.UserWhereUniqueInput,
    pictureInput: Prisma.PictureCreateWithoutUserInput,
  ) {
    const data = { user: { connect }, ...pictureInput };
    const picture = this.prisma.picture.create({ data });

    return picture;
  }

  async findAll() {
    const picture = this.prisma.picture.findMany();

    return picture;
  }

  async findOne(id_userId: Prisma.PictureIdUserIdCompoundUniqueInput) {
    const picture = this.prisma.picture.findFirst({ where: id_userId });

    return picture;
  }

  async update(
    id_userId: Prisma.PictureIdUserIdCompoundUniqueInput,
    data: Prisma.PictureUpdateWithoutUserInput,
  ) {
    const picture = this.prisma.picture.update({ where: { id_userId }, data });

    return picture;
  }

  async remove(id_userId: Prisma.PictureIdUserIdCompoundUniqueInput) {
    const picture = this.prisma.picture.delete({ where: { id_userId } });

    return picture;
  }
}
