"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/features/auth/server/actions";

import type { AuthActionState } from "@/features/auth/server/dto";

const initialState: AuthActionState = {
  success: false,
};

type SignInFormProps = {
  signupEnabled: boolean;
};

export function SignInForm({ signupEnabled }: SignInFormProps) {
  const [state, formAction, isPending] = useActionState(signInAction, initialState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input id="email" name="email" placeholder="staff@company.com" type="email" required />
            {state.fieldErrors?.email && (
              <p className="text-sm text-red-600">{state.fieldErrors.email.join(", ")}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input id="password" name="password" type="password" required />
            {state.fieldErrors?.password && (
              <p className="text-sm text-red-600">{state.fieldErrors.password.join(", ")}</p>
            )}
          </div>

          {state.message && <p className="text-sm text-red-600">{state.message}</p>}

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {signupEnabled ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Need an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
