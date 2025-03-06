// Drizzle example with the Neon serverless driver
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema/schema";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);
const db = drizzle({ client: sql, schema: schema });

export default db;
