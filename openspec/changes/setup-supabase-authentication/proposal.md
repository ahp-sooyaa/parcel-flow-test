## Why

The app needs reliable authentication before internal operations can be used safely in production. We also need to support both sign-in and sign-up now, while preserving the option to disable public sign-up later when operating as an internal-only system.

## What Changes

- Add Supabase authentication for dashboard users, including sign-in and sign-up flows.
- Add protected app access so unauthenticated users cannot use internal delivery-management pages.
- Add a settings-controlled signup policy that allows admins to enable or disable self-service sign-up without redeploying.
- Ensure signup behavior follows the configured policy consistently in both UI and server-side auth actions.
- Implement auth and signup-policy logic using feature-slice structure under `src/features/*` with explicit `server/actions.ts`, `server/dal.ts`, and `server/dto.ts` separation.

## Capabilities

### New Capabilities
- `user-authentication`: Supabase-based sign-in and sign-up flows with session handling for dashboard users.
- `signup-policy-management`: Admin-configurable setting to enable or disable user self-registration and enforce that policy.

### Modified Capabilities
- None.

## Impact

- Affected code: auth utilities, login/register pages, route protection layer, settings page and related server actions.
- Data/storage: add persistent app setting for signup availability (DB-backed or equivalent durable configuration).
- Dependencies/systems: Supabase Auth integration and required environment configuration.
- Operations: admins gain runtime control over whether external users can register.
- Architecture: new work must follow `src/app` thin-route composition and feature-local DAL/DTO pattern from `src/AGENTS.md`.
