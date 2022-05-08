import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async create(data: Prisma.UserCreateWithoutPicturesInput): Promise<User> {
    const user = this.database.user.create({ data });

    return user;
  }

  async findAll(): Promise<User[]> {
    const user = this.database.user.findMany();

    return user;
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const user = this.database.user.findFirst({ where });

    return user;
  }

  async findOrCreate(
    where: Prisma.UserWhereUniqueInput,
    create: Prisma.UserCreateWithoutPicturesInput,
  ): Promise<User> {
    const user = this.database.user.upsert({
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
    const user = this.database.user.update({ where, data });

    return user;
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = this.database.user.delete({ where });

    return user;
  }
}
