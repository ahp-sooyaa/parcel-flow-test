import { config } from "dotenv";
import { findAuthUserIdByEmail, upsertAppUserRole } from "@/db/queries/app-user";
import { getServerEnv } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type SeedEnvironment = "development" | "production";

function resolveSeedEnvironment(argv: string[]): SeedEnvironment {
  const target = argv[2];

  if (target === "development" || target === "production") {
    return target;
  }

  throw new Error(
    'Missing or invalid seed environment. Use "development" or "production". Example: pnpm run dev:db:seed',
  );
}

function resolveEnvFile(target: SeedEnvironment) {
  return target === "development" ? ".env.development" : ".env.production";
}

async function ensureSuperAdmin() {
  const env = getServerEnv();

  const email = env.SEED_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const password = env.SEED_SUPER_ADMIN_PASSWORD;

  if (!email) {
    throw new Error("SEED_SUPER_ADMIN_EMAIL is required.");
  }

  if (!password) {
    throw new Error("SEED_SUPER_ADMIN_PASSWORD is required.");
  }

  const adminClient = createSupabaseAdminClient();

  if (!adminClient) {
    throw new Error("SUPABASE_SECRET_KEY is required to seed super admin user.");
  }

  let userId = await findAuthUserIdByEmail(email);

  if (!userId) {
    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error || !data.user) {
      throw new Error(error?.message ?? "Failed to create auth user for super admin seed.");
    }

    userId = data.user.id;
  }

  await upsertAppUserRole(userId, "super_admin");
}

async function main() {
  let exitCode = 0;

  try {
    const target = resolveSeedEnvironment(process.argv);
    config({ path: resolveEnvFile(target) });
    await ensureSuperAdmin();
    console.log(`Super admin seed completed for ${target}.`);
  } catch (error: unknown) {
    exitCode = 1;
    console.error(error);
  } finally {
    process.exit(exitCode);
  }
}

void main();
