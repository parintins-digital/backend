import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const firstName = 'Parintins.dev';
  const email = 'dev.noreply@parintinsdigital.com.br';
  const password = Buffer.from(await hash('mydevpassword', 10), 'utf-8');

  const admin = await prisma.user.create({
    data: {
      firstName,
      localAccount: {
        connectOrCreate: {
          create: {
            email,
            admin: true,
            password,
          },
          where: {
            email,
          },
        },
      },
    },
  });
  console.log(admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
