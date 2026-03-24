# src/AGENTS.md

## Source Structure Rules

Use this folder structure for all new code and refactors:

- `src/app`
- `src/features/<feature-name>`
- `src/components/shared`
- `src/db/schema`
- `src/lib`

## Feature Folder Contract

Every feature folder MUST have these two top-level folders:

- `components`
- `server`

Inside `server`, use these files:

- `actions.ts`: Server Actions and mutation orchestration.
- `dal.ts`: Data-access logic and persistence-facing functions.
- `dto.ts`: Feature-level types, DTOs, and validation-related payload types.

Example:

- `src/features/auth/components/login-form.tsx`
- `src/features/auth/server/actions.ts`
- `src/features/auth/server/dal.ts`
- `src/features/auth/server/dto.ts`

## Database Placement

- Keep schema files under `src/db/schema`.
- Domain tables should be grouped by concern, then exported via `src/db/schema/index.ts`.

## Shared Components

- Put reusable/shared UI pieces in `src/components/shared`.
- Feature-specific UI stays in each feature's `components` folder.

## Lib Placement

- Put cross-feature infrastructure and utilities in `src/lib`.
- Examples: auth guards, env parsing, Supabase client setup, generic utilities.

## App Layer Guidance

- Keep route files in `src/app` thin.
- Compose feature components and call feature server actions.
- Do not place business/data access logic directly in page components.
