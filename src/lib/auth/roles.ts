import type { AppUserRole } from "@/db/schema";

export function isPrivilegedAppUserRole(role: AppUserRole | null | undefined) {
  return role === "admin" || role === "super_admin";
}
