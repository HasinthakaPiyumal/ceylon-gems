import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteAllUsers(_req: Request, res: Response) {
  await prisma.user.deleteMany({});
  res.status(204).send();
}
