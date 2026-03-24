import { describe, expect, it } from "vitest";
import {
  mapAuthErrorMessage,
  parseSignInInput,
  parseSignUpInput,
} from "@/features/auth/server/dto";

describe("auth dto", () => {
  it("parses valid sign in input", () => {
    const formData = new FormData();
    formData.set("email", "admin@example.com");
    formData.set("password", "password123");

    const parsed = parseSignInInput(formData);

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid sign up input", () => {
    const formData = new FormData();
    formData.set("email", "bad-email");
    formData.set("password", "123");

    const parsed = parseSignUpInput(formData);

    expect(parsed.success).toBe(false);
  });

  it("maps common supabase auth errors", () => {
    expect(mapAuthErrorMessage("Invalid login credentials")).toBe(
      "Email or password is incorrect.",
    );
    expect(mapAuthErrorMessage("User already registered")).toBe(
      "This email is already registered. Please sign in.",
    );
  });
});
