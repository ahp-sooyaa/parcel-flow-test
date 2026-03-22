## Why

The project needs a consistent, production-ready UI foundation so internal dashboard screens can be built quickly with predictable styling and reusable components. Setting up shadcn/ui with Tailwind CSS now avoids ad-hoc UI patterns and reduces rework as feature development accelerates.

## What Changes

- Configure Tailwind CSS as the styling foundation for the App Router codebase, including shared design tokens and utility usage conventions.
- Initialize shadcn/ui in the project and add baseline UI primitives needed for internal admin workflows (for example: button, input, card, table-related primitives).
- Establish project-level conventions for where reusable UI components live and how they are imported.
- Update the root page/layout styling to validate the setup and ensure components render correctly in the current app environment.

## Capabilities

### New Capabilities
- `ui-foundation-shadcn`: Standardized internal UI foundation using Tailwind CSS + shadcn/ui components, tokens, and component organization patterns.

### Modified Capabilities
- None.

## Impact

- Affected code: `src/app` styling entry points, shared UI component directories (such as `src/components/ui`), Tailwind configuration, and utility helpers used by shadcn/ui.
- Dependencies: Adds/adjusts frontend UI dependencies required by shadcn/ui and Tailwind tooling.
- Developer workflow: Provides a clear default path for building internal dashboard UI with reusable primitives.
