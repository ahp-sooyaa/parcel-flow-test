# AGENTS.md

## Repository mission
Build a practical internal delivery-management web app for a Myanmar delivery business.
Prioritize fast delivery, operational clarity, and accounting correctness over abstraction.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Drizzle ORM
- Supabase
- Cloudflare Pages

## Core rules
- Keep the project as a Next.js full-stack monolith for now.
- Do not introduce NestJS, Express, microservices, queues, or websocket infrastructure unless explicitly requested.
- Prefer simple, maintainable solutions over abstract patterns.
- Keep business logic out of React page components.
- Keep money-related calculations explicit and easy to audit.
- Never mix COD with company revenue.
- Prefer strong typing and domain-first naming.

## Workflow rules
- Make small, reviewable changes.
- Avoid editing many unrelated files in one step.
- Explain assumptions when business rules are unclear.
- When implementing a feature, update or create the minimal supporting types, validation, and data-access code.
- Preserve existing code style and naming conventions.

## Data and domain rules
- merchant = sender/shop/client using our delivery service
- receiver = end customer receiving the parcel
- rider = delivery staff
- settlement = amount owed back to merchant after deducting applicable fees
- COD must be stored separately from delivery fees and other charges

## Next.js rules
- Prefer Server Actions for internal dashboard mutations.
- Use Route Handlers only when a real API boundary is needed.
- Prefer server components by default.
- Use client components only when interactivity requires them.

## Validation rules
Before finishing work, run or verify relevant checks when available:
- typecheck
- lint
- targeted tests for changed logic

If commands are not available yet, say so clearly instead of inventing results.