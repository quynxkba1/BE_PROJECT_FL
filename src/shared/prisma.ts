import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const logQueryFlag = process.env.LOG_QUERY;

const log: Prisma.LogLevel[] = ["error", "warn", "info"];

if (logQueryFlag) {
  log.push("query");
}

const prismaClient = new PrismaClient<Prisma.PrismaClientOptions, "query">({
  log,
  errorFormat: "pretty"
});

if (logQueryFlag) {
  prismaClient.$on("query", e => {
    console.log("Params: " + e.params);
  });
}

prismaClient
  .$connect()
  .then(() => {
    console.log("connected to database");
  })
  .catch(error => {
    console.error(error);
  });

export const prisma = prismaClient;
