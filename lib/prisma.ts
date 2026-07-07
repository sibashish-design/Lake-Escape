import type { PrismaClient } from "@prisma/client";

// Conditional require to prevent module load failures in locked environments
let prisma: PrismaClient | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient: LocalClient } = require("@prisma/client");
  
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };
  
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new LocalClient();
  }
  prisma = globalForPrisma.prisma || null;
} catch (error) {
  console.warn("Prisma Client failed to load or is ungenerated. Graceful static fallback will be active.", error);
}

export { prisma };
export default prisma;
