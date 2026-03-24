import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import { getServerEnv } from "@/lib/env";

const globalForDb = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>;
  db?: ReturnType<typeof drizzle>;
};

function getDbInstance() {
  if (globalForDb.db) {
    return globalForDb.db;
  }

  const postgresClient =
    globalForDb.postgresClient ??
    postgres(getServerEnv().SUPABASE_DB_URL, {
      prepare: false,
      max: 1,
    });

  const instance = drizzle(postgresClient, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.postgresClient = postgresClient;
    globalForDb.db = instance;
  }

  return instance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, property, receiver) {
    return Reflect.get(getDbInstance() as object, property, receiver);
  },
});
