import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

export const generateClient = async () => {
  // Using lambda's cache to use previous connection
  if (!prismaClient) prismaClient = new PrismaClient();

  return prismaClient;
};
