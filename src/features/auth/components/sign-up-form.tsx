"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signUpAction } from "@/features/auth/server/actions";

import type { AuthActionState } from "@/features/auth/server/dto";

const initialState: AuthActionState = {
  success: false,
};

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, initialState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
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
            {isPending ? "Signing up..." : "Sign up"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
