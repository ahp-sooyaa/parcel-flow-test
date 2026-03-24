## 1. Supabase auth foundation

- [x] 1.1 Add Supabase auth environment configuration and shared server/client helpers for App Router usage.
- [x] 1.2 Create `src/features/auth/components` and `src/features/auth/server/{actions.ts,dal.ts,dto.ts}` as the auth feature slice baseline.
- [x] 1.3 Implement typed auth DAL functions in `src/features/auth/server/dal.ts` for sign-in, sign-up, sign-out, and session retrieval.
- [x] 1.4 Define DTOs/validation payload types in `src/features/auth/server/dto.ts` and map auth errors for action responses.

## 2. Authentication flows and route protection

- [x] 2.1 Create sign-in and sign-up pages that compose feature components and keep `src/app` route files thin.
- [x] 2.2 Add authenticated route guard logic (middleware or shared server guard) with explicit allowlist for auth/public routes.
- [x] 2.3 Implement `src/features/auth/server/actions.ts` to orchestrate DTO validation and DAL calls for sign-in/sign-up/sign-out.
- [x] 2.4 Add sign-out entry point in the authenticated UI and verify redirect/session termination behavior.

## 3. Signup policy setting and enforcement

- [x] 3.1 Create `src/features/settings/components` and `src/features/settings/server/{actions.ts,dal.ts,dto.ts}` for signup-policy management.
- [x] 3.2 Add durable app setting for `signup_enabled` with typed data access in settings DAL and default value.
- [x] 3.3 Add settings-page control for admin-only users to toggle signup availability via settings Server Action.
- [x] 3.4 Enforce signup policy server-side in sign-up action and show 404 when users access signup while disabled.

## 4. Verification and rollout checks

- [x] 4.1 Add targeted tests for auth actions and signup-policy enforcement scenarios.
- [x] 4.2 Run project lint and typecheck, and fix issues introduced by this change.
- [ ] 4.3 Validate end-to-end behavior manually: sign-in success/failure, protected route redirect, signup enabled/disabled toggle behavior, and disabled-signup 404.
