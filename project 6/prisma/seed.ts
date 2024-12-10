import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default admin account
  const hashedPassword = await bcrypt.hash('admin1', 10);
  await prisma.admin.upsert({
    where: { username: 'admin1' },
    update: {},
    create: {
      username: 'admin1',
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });