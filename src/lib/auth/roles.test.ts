import { describe, expect, it } from "vitest";
import { isPrivilegedAppUserRole } from "@/lib/auth/roles";

describe("isPrivilegedAppUserRole", () => {
  it("returns true for admin and super_admin", () => {
    expect(isPrivilegedAppUserRole("admin")).toBe(true);
    expect(isPrivilegedAppUserRole("super_admin")).toBe(true);
  });

  it("returns false for staff or missing role", () => {
    expect(isPrivilegedAppUserRole("staff")).toBe(false);
    expect(isPrivilegedAppUserRole(null)).toBe(false);
    expect(isPrivilegedAppUserRole(undefined)).toBe(false);
  });
});
