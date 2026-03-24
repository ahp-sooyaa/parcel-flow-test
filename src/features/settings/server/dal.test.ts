import { describe, expect, it } from "vitest";
import {
  syncSupabaseSignupPolicy,
  updateSignupEnabledPolicy,
} from "@/features/settings/server/dal";

describe("settings dal", () => {
  it("returns error when management token is missing", async () => {
    const result = await syncSupabaseSignupPolicy(true, {
      accessToken: "",
      projectRef: "project-ref",
      fetchImpl: async () => new Response(null, { status: 200 }),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("missing_management_token");
    }
  });

  it("returns error when sync fails", async () => {
    const result = await syncSupabaseSignupPolicy(false, {
      accessToken: "test-token",
      projectRef: "project-ref",
      fetchImpl: async () => new Response("Bad request", { status: 400 }),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("platform_sync_failed");
      expect(result.details).toContain("HTTP 400");
    }
  });

  it("does not persist local policy when platform sync fails", async () => {
    let persistWasCalled = false;

    const result = await updateSignupEnabledPolicy(false, {
      syncPolicy: async () => ({
        ok: false,
        code: "platform_sync_failed",
        details: "sync failed",
      }),
      persistPolicy: async () => {
        persistWasCalled = true;
        return { ok: true };
      },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("platform_sync_failed");
    }
    expect(persistWasCalled).toBe(false);
  });
});
