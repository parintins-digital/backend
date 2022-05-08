import { Injectable } from '@nestjs/common';

import type { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateWithoutPicturesInput): Promise<User> {
    const user = this.prisma.user.create({ data });

    return user;
  }

  async findAll(): Promise<User[]> {
    const user = this.prisma.user.findMany();

    return user;
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const user = this.prisma.user.findFirst({ where });

    return user;
  }

  async findOrCreate(
    create: Prisma.UserCreateWithoutPicturesInput,
  ): Promise<User> {
    const where = { email: create.email };
    const user = this.prisma.user.upsert({
      create,
      where,
      update: {},
    });

    return user;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateWithoutPicturesInput,
  ): Promise<User> {
    const user = this.prisma.user.update({ where, data });

    return user;
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = this.prisma.user.delete({ where });

    return user;
  }
}
