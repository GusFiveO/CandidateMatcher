import {config} from 'dotenv'
import { defineConfig } from 'drizzle-kit';

config({ path: "../../.env" });

export default defineConfig({
	dialect: 'postgresql',
	schema: './schema.ts',
	dbCredentials: {
		url: process.env.NEXT_PUBLIC_DATABASE_URL as string,
	}
});