import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: "../../.env" });
export const prisma = new PrismaClient();