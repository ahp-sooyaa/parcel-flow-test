"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSignupPolicyAction } from "@/features/settings/server/actions";

import type { SignupPolicyState } from "@/features/settings/server/dto";

const initialState: SignupPolicyState = {
  success: false,
};

type SignupPolicyFormProps = {
  signupEnabled: boolean;
};

export function SignupPolicyForm({ signupEnabled }: SignupPolicyFormProps) {
  const [state, formAction, isPending] = useActionState(updateSignupPolicyAction, initialState);

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Signup policy</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              className="h-4 w-4"
              defaultChecked={signupEnabled}
              name="signupEnabled"
              type="checkbox"
            />
            <span className="text-sm">Allow new users to create accounts with sign-up form</span>
          </label>

          {state.message ? (
            <p className={`text-sm ${state.success ? "text-green-700" : "text-red-600"}`}>
              {state.message}
            </p>
          ) : null}

          <Button disabled={isPending} type="submit">
            {isPending ? "Saving..." : "Save policy"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
