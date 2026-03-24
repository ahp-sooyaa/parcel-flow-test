## Context

The application currently lacks a formal authentication boundary, which prevents safe production use of internal operations. The stack already standardizes on Next.js App Router, Supabase, and Server Actions, so authentication should be implemented within the monolith without adding a separate API service.

This change must support both sign-in and sign-up because onboarding flows are needed now, but the business also requires a runtime control to disable self-service registration for internal-only periods. The policy must be enforced at both UI and server layers so disabled sign-up cannot be bypassed by direct requests.

## Goals / Non-Goals

**Goals:**
- Integrate Supabase Auth for dashboard user sessions.
- Provide first-class sign-in and sign-up pages/workflows.
- Protect internal application routes so only authenticated users can access them.
- Add an admin-managed setting to enable/disable self-service sign-up.
- Persist signup policy in durable storage and enforce it in server actions.
- Enforce feature-slice implementation contract: `src/features/<feature>/components` and `src/features/<feature>/server/{actions,dal,dto}.ts`.

**Non-Goals:**
- Role-based access control beyond basic authenticated access.
- Merchant/customer self-service portal design.
- Multi-tenant auth architecture or external identity providers.
- Realtime auth sync beyond standard Supabase session handling.

## Decisions

1. Use Supabase Auth as the single authentication provider.
- Rationale: Supabase is already part of the approved stack and minimizes integration overhead.
- Alternative considered: custom credential table and password hashing in app DB; rejected due to security burden and duplication of proven auth primitives.

2. Implement auth mutations using Next.js Server Actions.
- Rationale: aligns with repo rule to prefer Server Actions for trusted internal dashboard workflows and keeps validation/business checks server-side.
- Alternative considered: dedicated route handlers for all auth actions; rejected because no external API boundary is required for this internal app.

3. Store signup policy in application settings table/config and expose it on the Settings page.
- Rationale: admin needs runtime control without redeploy, and durable storage ensures consistent behavior across instances/environments.
- Alternative considered: environment variable only; rejected because it requires deployment changes and cannot be toggled by admin users in-app.

4. Enforce signup policy in both UI rendering and server-side signup action.
- Rationale: UI-only checks are bypassable; server enforcement guarantees policy correctness and auditability.
- Alternative considered: hide signup page only; rejected due to direct request bypass risk.

5. Protect internal routes with central auth guard middleware or equivalent shared server-side gate.
- Rationale: centralized guard avoids missed page-level checks and keeps route protection consistent.
- Alternative considered: checking auth inside each page component; rejected due to duplication and higher regression risk.

6. Use DAL/DTO separation per feature for all auth and signup-policy business logic.
- Rationale: keeps route/page layers thin, centralizes persistence logic, and makes validation payload contracts explicit and testable.
- Alternative considered: putting business logic directly in Server Actions or route/page files; rejected because it breaks the source structure contract and increases coupling.

## Risks / Trade-offs

- [Risk] Misconfigured Supabase environment variables can break authentication flows. -> Mitigation: fail-fast env validation and setup documentation for required keys/URLs.
- [Risk] Signup toggle changes may race with users already on signup form. -> Mitigation: enforce policy at server action time and return deterministic error state when disabled.
- [Risk] Central route protection may accidentally block public/auth pages. -> Mitigation: explicit allowlist for auth routes and static/public assets with integration checks.
- [Trade-off] Initial auth scope is intentionally simple (authenticated vs unauthenticated only). -> Mitigation: keep domain boundaries clean so RBAC can be layered later.

## Migration Plan

1. Add Supabase auth client/server helpers and required environment configuration.
2. Create `auth` and `settings` feature slices with required folders/files (`components`, `server/actions.ts`, `server/dal.ts`, `server/dto.ts`).
3. Create auth pages and Server Actions for sign-in/sign-up/sign-out that orchestrate DAL and DTO modules.
4. Add route protection to internal app surfaces with explicit public route exceptions.
5. Introduce durable signup policy storage and settings UI toggle for admins.
6. Deploy with signup enabled by default for initial onboarding.
7. Validate operationally by toggling signup off in settings and confirming server-side rejection and disabled-signup 404 behavior.

Rollback strategy:
- Disable route guard and signup-policy enforcement via reverting this change.
- If signup gating causes issues, keep sign-in active and set signup policy to enabled until fix is released.

## Open Questions

- Which existing settings authorization model determines who can toggle signup policy (all authenticated staff vs admin-only flag)? Answer: admin only
- Should turning signup off also hide link entry points completely or show a disabled explanation page? Answer: show 404 page if signup is disabled
- Do we need an audit trail entry each time signup policy is toggled in MVP, or is durable current-state storage sufficient? Answer: no audit trail needed for now
