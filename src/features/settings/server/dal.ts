import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { findAppUserRoleByUserId } from "@/db/queries/app-user";
import { appSettings, type AppUserRole } from "@/db/schema";
import { isPrivilegedAppUserRole } from "@/lib/auth/roles";
import { getServerEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const SIGNUP_SETTING_KEY = "signup_enabled";

type SyncSignupPolicyOptions = {
  accessToken?: string;
  projectRef?: string;
  fetchImpl?: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
};

type SignupPolicyErrorCode =
  | "missing_management_token"
  | "missing_project_ref"
  | "platform_sync_failed"
  | "persist_failed";

type SignupPolicySuccessResult = {
  ok: true;
};

type SignupPolicyErrorResult = {
  ok: false;
  code: SignupPolicyErrorCode;
  details?: string;
};

export type UpdateSignupEnabledPolicyResult = SignupPolicySuccessResult | SignupPolicyErrorResult;

type UpdateSignupEnabledPolicyDeps = {
  persistPolicy?: (signupEnabled: boolean) => Promise<UpdateSignupEnabledPolicyResult>;
  syncPolicy?: (signupEnabled: boolean) => Promise<UpdateSignupEnabledPolicyResult>;
};

export async function getSignupEnabledPolicy() {
  try {
    const [row] = await db
      .select({ booleanValue: appSettings.booleanValue })
      .from(appSettings)
      .where(eq(appSettings.key, SIGNUP_SETTING_KEY))
      .limit(1);

    return row?.booleanValue ?? true;
  } catch {
    return false;
  }
}

export async function syncSupabaseSignupPolicy(
  signupEnabled: boolean,
  options: SyncSignupPolicyOptions = {},
): Promise<UpdateSignupEnabledPolicyResult> {
  const hasAccessTokenOverride = options.accessToken !== undefined;
  const hasProjectRefOverride = options.projectRef !== undefined;
  const env = hasAccessTokenOverride && hasProjectRefOverride ? null : getServerEnv();
  const accessToken = options.accessToken ?? env?.SUPABASE_MANAGEMENT_ACCESS_TOKEN;
  const projectRef = options.projectRef ?? env?.SUPABASE_PROJECT_REF;
  const fetchImpl = options.fetchImpl ?? fetch;

  if (!accessToken) {
    return {
      ok: false,
      code: "missing_management_token",
    };
  }

  if (!projectRef) {
    return {
      ok: false,
      code: "missing_project_ref",
    };
  }

  const response = await fetchImpl(
    `https://api.supabase.com/v1/projects/${projectRef}/config/auth`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        disable_signup: !signupEnabled,
      }),
      cache: "no-store",
    },
  );

  if (response.ok) {
    return {
      ok: true,
    };
  }

  const responseBody = await response.text();
  return {
    ok: false,
    code: "platform_sync_failed",
    details: `HTTP ${response.status}: ${responseBody || "Unknown error"}`,
  };
}

async function persistSignupPolicy(
  signupEnabled: boolean,
): Promise<UpdateSignupEnabledPolicyResult> {
  try {
    await db
      .insert(appSettings)
      .values({
        key: SIGNUP_SETTING_KEY,
        booleanValue: signupEnabled,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: appSettings.key,
        set: {
          booleanValue: signupEnabled,
          updatedAt: new Date(),
        },
      });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      code: "persist_failed",
      details:
        error instanceof Error ? error.message : "Failed to persist signup policy in app_settings.",
    };
  }
}

export async function updateSignupEnabledPolicy(
  signupEnabled: boolean,
  deps: UpdateSignupEnabledPolicyDeps = {},
): Promise<UpdateSignupEnabledPolicyResult> {
  const syncPolicy = deps.syncPolicy ?? syncSupabaseSignupPolicy;
  const persistPolicy = deps.persistPolicy ?? persistSignupPolicy;

  const syncResult = await syncPolicy(signupEnabled);

  if (!syncResult.ok) {
    return syncResult;
  }

  return persistPolicy(signupEnabled);
}

export async function getSettingsPageAccess() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return {
      isAuthenticated: false,
      isAdmin: false,
    };
  }

  const role: AppUserRole | null = await findAppUserRoleByUserId(data.user.id).catch(() => null);

  return {
    isAuthenticated: true,
    isAdmin: isPrivilegedAppUserRole(role),
  };
}
