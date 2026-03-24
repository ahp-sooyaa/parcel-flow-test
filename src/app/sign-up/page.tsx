import { notFound } from "next/navigation";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { getSignupEnabledPolicy } from "@/features/settings/server/dal";

export default async function SignUpPage() {
  const signupEnabled = await getSignupEnabledPolicy();

  if (!signupEnabled) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-8">
      <SignUpForm />
    </main>
  );
}
