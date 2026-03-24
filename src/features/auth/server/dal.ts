import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import type { SignInInput, SignUpInput } from "@/features/auth/server/dto";

export const getCurrentUser = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user;
});

export async function signInWithPassword(input: SignInInput) {
  const supabase = await createServerSupabaseClient();

  return supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
}

export async function signUpWithPassword(input: SignUpInput) {
  const supabase = await createServerSupabaseClient();

  return supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });
}

export async function signOutCurrentUser() {
  const supabase = await createServerSupabaseClient();

  return supabase.auth.signOut();
}
