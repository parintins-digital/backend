import { Injectable } from '@nestjs/common';

import { Prisma, Visit } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class VisitService {
  constructor(private database: PrismaService) {}

  async create(
    { userId, pictureId }: Prisma.VisitUserIdPictureIdCompoundUniqueInput,
    visitedOn?: Date,
  ) {
    let data: Prisma.VisitCreateInput = {
      picture: { connect: { id: pictureId } },
      user: { connect: { id: userId } },
    };

    if (visitedOn !== undefined) {
      data = { visitedOn, ...data };
    }

    const visit = this.database.visit.create({ data });

    return visit;
  }

  async findMany(where: Prisma.VisitScalarWhereInput): Promise<Visit[]> {
    const visit = this.database.visit.findMany({ where });

    return visit;
  }

  async update(
    userId_pictureId: Prisma.VisitUserIdPictureIdCompoundUniqueInput,
    data: Prisma.VisitUpdateInput,
  ): Promise<Visit> {
    const where: Prisma.VisitWhereUniqueInput = { userId_pictureId };
    const visit = this.database.visit.update({ data, where });

    return visit;
  }

  async remove(
    userId_pictureId: Prisma.VisitUserIdPictureIdCompoundUniqueInput,
  ): Promise<Visit> {
    const where: Prisma.VisitWhereUniqueInput = { userId_pictureId };
    const user = this.database.visit.delete({ where });

    return user;
  }
}
