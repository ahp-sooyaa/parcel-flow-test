import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getSignupEnabledPolicy } from "@/features/settings/server/dal";

export default async function SignInPage() {
  const signupEnabled = await getSignupEnabledPolicy();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-8">
      <SignInForm signupEnabled={signupEnabled} />
    </main>
  );
}
