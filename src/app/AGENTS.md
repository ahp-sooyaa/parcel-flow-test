# app/AGENTS.md

## App Router guidance
- Prefer server components by default.
- Use client components only for interactive UI state, browser APIs, or event-heavy forms.
- Keep pages and layouts thin; move business logic to reusable server-side modules.
- Prefer Server Actions for internal create/update/delete workflows.
- After mutations, revalidate the minimum necessary data.

## UI guidance
- Optimize for office staff usability: clear forms, obvious status labels, low cognitive load.
- Prefer simple dashboards and filters over fancy UI.
- Use explicit labels for money, parcel counts, township, rider, and status.
- Make destructive or money-related actions hard to misread.
- Show empty states and loading states clearly.

## Form guidance
- Validate required fields on both client and server when applicable.
- Surface actionable error messages.
- Preserve user input on failed submissions.
- Don't use react-hook-form, use zod + server action.