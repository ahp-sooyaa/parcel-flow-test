import { notFound } from "next/navigation";
import { SignupPolicyForm } from "@/features/settings/components/signup-policy-form";
import { getSettingsPageAccess, getSignupEnabledPolicy } from "@/features/settings/server/dal";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [access, signupEnabled] = await Promise.all([
    getSettingsPageAccess(),
    getSignupEnabledPolicy(),
  ]);

  if (!access.isAuthenticated || !access.isAdmin) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <SignupPolicyForm signupEnabled={signupEnabled} />
    </main>
  );
}
