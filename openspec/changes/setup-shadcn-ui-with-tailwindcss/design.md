## Context

The codebase is a Next.js App Router monolith intended for internal delivery operations, and UI work will accelerate across admin workflows. Tailwind CSS is part of the stack, but without a formalized component system and conventions, teams risk inconsistent styling, duplicated markup, and slow feature delivery.

This change introduces a standardized UI foundation by integrating shadcn/ui on top of Tailwind CSS with project-level conventions for reusable primitives. The setup must stay simple, align with existing Next.js patterns, and avoid architecture changes outside frontend foundations.

## Goals / Non-Goals

**Goals:**
- Establish a working Tailwind CSS foundation with shared tokens and predictable utility usage.
- Initialize shadcn/ui and add baseline primitives required for internal dashboard development.
- Define where reusable UI components and utility helpers live so new features follow a consistent pattern.
- Verify integration by rendering shadcn-based UI in the app to ensure build/runtime compatibility.

**Non-Goals:**
- Building complete business modules (merchant, rider, parcel, settlement) in this change.
- Introducing a new backend/API architecture or changing data models.
- Creating a custom design system beyond shadcn defaults and minimal project tokens.

## Decisions

### Decision: Use shadcn/ui CLI as the source of baseline primitives
- Rationale: shadcn/ui provides copy-in components with Tailwind styles that are easy to own and customize in-repo, which matches the monolith and maintainability goals.
- Alternatives considered:
  - Keep only raw Tailwind utilities without component primitives: rejected because it increases inconsistency and slows page implementation.
  - Introduce another external component library with runtime styling system: rejected to avoid extra abstraction and mismatch with stack preference.

### Decision: Keep reusable primitives under `src/components/ui`
- Rationale: the default shadcn pattern is well-known, reduces cognitive load, and keeps imports consistent.
- Alternatives considered:
  - Place components near pages/features only: rejected for base primitives because it fragments shared UI building blocks.
  - Create multiple UI roots by module now: rejected as premature for current project size.

### Decision: Centralize class merging and utility helpers for shadcn compatibility
- Rationale: a shared `cn` helper pattern reduces duplicated className logic and keeps component code readable.
- Alternatives considered:
  - Inline class merging in each component: rejected due to duplication and error risk.

### Decision: Validate setup by updating root page with representative components
- Rationale: rendering real shadcn primitives in the app confirms Tailwind content scanning, component imports, and runtime styling are correctly wired.
- Alternatives considered:
  - Rely only on generated files without rendering checks: rejected because configuration mistakes may go unnoticed.

## Risks / Trade-offs

- [Risk] shadcn CLI output may vary by version and create unexpected file changes.
  - Mitigation: constrain this change to foundational primitives, review generated files, and avoid broad refactors.
- [Risk] Tailwind config/content paths may miss newly added component locations, causing missing styles.
  - Mitigation: explicitly verify content globs include app and component directories, then validate in rendered page.
- [Trade-off] Copy-in component ownership increases local code volume.
  - Mitigation: accept this for auditability and straightforward customization; only install components needed now.

## Migration Plan

1. Initialize shadcn/ui configuration and required utility dependencies.
2. Ensure Tailwind config/theme variables and global styles are aligned with shadcn expectations.
3. Add a minimal set of baseline primitives under `src/components/ui`.
4. Update root page/layout to render representative primitives as smoke test.
5. Run lint/typecheck and fix integration issues.

Rollback strategy:
- Remove generated shadcn configuration and added UI primitive files.
- Restore previous Tailwind/global styling files and root page usage.

## Open Questions

- Which baseline primitive set should be installed immediately (minimum viable set vs. a broader starter pack)?
- Should we introduce a dedicated internal theme token naming convention now, or defer until the first dashboard module is implemented?
