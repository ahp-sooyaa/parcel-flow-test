"use server";

import { revalidatePath } from "next/cache";
import {
  getSettingsPageAccess,
  type UpdateSignupEnabledPolicyResult,
  updateSignupEnabledPolicy,
} from "@/features/settings/server/dal";
import { parseSignupPolicyInput, type SignupPolicyState } from "@/features/settings/server/dto";

const initialState: SignupPolicyState = {
  success: false,
};

function mapSignupPolicyErrorMessage(result: UpdateSignupEnabledPolicyResult) {
  if (result.ok) {
    return null;
  }

  if (result.code === "missing_management_token") {
    return "Missing Supabase management access token for signup sync.";
  }

  if (result.code === "missing_project_ref") {
    return "Missing Supabase project reference for signup sync.";
  }

  if (result.code === "platform_sync_failed") {
    return `Failed to sync Supabase platform signup policy${result.details ? ` (${result.details})` : "."}`;
  }

  return `Failed to persist signup policy${result.details ? ` (${result.details})` : "."}`;
}

export async function updateSignupPolicyAction(
  _previousState: SignupPolicyState = initialState,
  formData: FormData,
) {
  const access = await getSettingsPageAccess();

  if (!access.isAuthenticated || !access.isAdmin) {
    return {
      success: false,
      message: "Only admin users can update signup policy.",
    } satisfies SignupPolicyState;
  }

  const parsed = parseSignupPolicyInput(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid signup policy payload.",
    } satisfies SignupPolicyState;
  }

  const result = await updateSignupEnabledPolicy(parsed.data.signupEnabled);

  const errorMessage = mapSignupPolicyErrorMessage(result);

  if (errorMessage) {
    return {
      success: false,
      message: errorMessage,
    } satisfies SignupPolicyState;
  }

  revalidatePath("/sign-up");
  revalidatePath("/settings");

  return {
    success: true,
    message: `Signup is now ${parsed.data.signupEnabled ? "enabled" : "disabled"}.`,
  } satisfies SignupPolicyState;
}
