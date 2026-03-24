import { describe, expect, it } from "vitest";
import { parseSignupPolicyInput } from "@/features/settings/server/dto";

describe("settings dto", () => {
  it("treats checked checkbox as enabled", () => {
    const formData = new FormData();
    formData.set("signupEnabled", "on");

    const parsed = parseSignupPolicyInput(formData);

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.signupEnabled).toBe(true);
    }
  });

  it("treats missing checkbox as disabled", () => {
    const formData = new FormData();

    const parsed = parseSignupPolicyInput(formData);

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.signupEnabled).toBe(false);
    }
  });
});
