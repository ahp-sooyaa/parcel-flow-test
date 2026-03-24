"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  signInWithPassword,
  signOutCurrentUser,
  signUpWithPassword,
} from "@/features/auth/server/dal";
import {
  mapAuthErrorMessage,
  parseSignInInput,
  parseSignUpInput,
  type AuthActionState,
} from "@/features/auth/server/dto";
import { getSignupEnabledPolicy } from "@/features/settings/server/dal";

const defaultAuthState: AuthActionState = {
  success: false,
};

export async function signInAction(
  _previousState: AuthActionState = defaultAuthState,
  formData: FormData,
) {
  const parsed = parseSignInInput(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    } satisfies AuthActionState;
  }

  const { error } = await signInWithPassword(parsed.data);

  if (error) {
    return {
      success: false,
      message: mapAuthErrorMessage(error.message),
    } satisfies AuthActionState;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpAction(
  _previousState: AuthActionState = defaultAuthState,
  formData: FormData,
) {
  const signupEnabled = await getSignupEnabledPolicy();

  if (!signupEnabled) {
    return {
      success: false,
      message: "Signup is currently unavailable.",
    } satisfies AuthActionState;
  }

  const parsed = parseSignUpInput(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    } satisfies AuthActionState;
  }

  const { error } = await signUpWithPassword(parsed.data);

  if (error) {
    return {
      success: false,
      message: mapAuthErrorMessage(error.message),
    } satisfies AuthActionState;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOutAction() {
  await signOutCurrentUser();
  revalidatePath("/", "layout");
  redirect("/sign-in");
}
