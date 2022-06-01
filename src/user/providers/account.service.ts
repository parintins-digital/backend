import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AccountService {
  constructor(private database: PrismaService) {}

  async createOAuthAccount(
    { provider, subject, admin }: Prisma.OAuthAccountCreateWithoutUserInput,
    connect: Prisma.UserWhereUniqueInput,
  ) {
    const data: Prisma.OAuthAccountCreateInput = {
      provider,
      subject,
      admin,
      user: { connect },
    };

    const account = this.database.oAuthAccount.create({ data });

    return account;
  }

  async findOAuthAccount(where: Prisma.OAuthAccountWhereUniqueInput) {
    const account = this.database.oAuthAccount.findFirst({
      where: { ...where, admin: false },
    });

    return account;
  }

  async createLocalAccount(
    { email, password, admin }: Prisma.LocalAccountCreateWithoutUserInput,
    connect: Prisma.UserWhereUniqueInput,
  ) {
    const data: Prisma.LocalAccountCreateInput = {
      email,
      password,
      admin,
      user: { connect },
    };

    const account = this.database.localAccount.create({ data });

    return account;
  }

  async findLocalAccount(where: Prisma.LocalAccountWhereUniqueInput) {
    const account = this.database.localAccount.findFirst({
      where: { ...where, admin: false },
    });

    return account;
  }

  async findAdminAccount(where: Prisma.LocalAccountWhereUniqueInput) {
    const account = this.database.localAccount.findFirst({
      where: { ...where, admin: true },
    });

    return account;
  }
}
