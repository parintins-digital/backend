import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateWithoutPicturesInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findFirst({ where });
  }

  update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateWithoutPicturesInput,
  ): Promise<User> {
    return this.prisma.user.update({ where, data });
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
