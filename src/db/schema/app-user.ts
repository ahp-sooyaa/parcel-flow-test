import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const appUserRoleEnum = pgEnum("app_user_role", ["rider", "staff", "admin", "super_admin"]);

export const appUser = pgTable("app_user", {
  userId: uuid("user_id").primaryKey(),
  role: appUserRoleEnum("role").notNull().default("staff"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AppUserRole = (typeof appUserRoleEnum.enumValues)[number];
