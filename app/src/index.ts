import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/auth-schema";
import "dotenv/config"

const client = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(client, { schema });