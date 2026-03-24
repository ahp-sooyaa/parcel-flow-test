import { eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { appUser, type AppUserRole } from "@/db/schema";

export async function findAppUserRoleByUserId(userId: string) {
  const [row] = await db
    .select({ role: appUser.role })
    .from(appUser)
    .where(eq(appUser.userId, userId))
    .limit(1);

  return row?.role ?? null;
}

export async function findAuthUserIdByEmail(email: string): Promise<string | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const [row] = await db.execute(
    sql<{ id: string }>`select id from auth.users where lower(email) = ${normalizedEmail} limit 1`,
  );

  if (!row || typeof row !== "object") {
    return null;
  }

  const id = row["id"];
  return typeof id === "string" ? id : null;
}

export async function upsertAppUserRole(userId: string, role: AppUserRole) {
  await db
    .insert(appUser)
    .values({
      userId,
      role,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: appUser.userId,
      set: {
        role,
        updatedAt: new Date(),
      },
    });
}
