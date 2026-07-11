import { PrismaClient } from "@prisma/client";

// Safe instantiation using standard ES imports to ensure Webpack compatibility in Server Actions
let prisma: PrismaClient | null = null;

try {
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };
  
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
} catch (error) {
  console.warn("Prisma Client failed to instantiate. Database queries will fall back to static registry.", error);
}

export { prisma };
export default prisma;
