import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.production" });

if (!process.env.SUPABASE_DB_URL) {
  throw new Error("SUPABASE_DB_URL is required for Drizzle commands.");
}

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations/production",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL,
  },
  strict: true,
  verbose: true,
});
