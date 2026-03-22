# lib/AGENTS.md

## Domain modeling rules
- Keep domain terms consistent: merchant, receiver, rider, parcel, settlement, COD.
- Do not use vague names like customer when the exact role matters.
- Prefer explicit enums and typed constants for parcel and settlement statuses.
- Centralize business rules for fee and settlement calculations.

## Database rules
- Use Drizzle for schema and queries.
- Favor normalized schema and explicit relations.
- Add created_at and updated_at where useful.
- Money-related fields must be clearly named and documented.
- Avoid hiding calculations inside SQL unless it improves clarity.

## Accounting rules
- COD is collected on behalf of the merchant.
- Delivery fee is company revenue.
- Settlement must be reproducible from stored data.
- Status changes affecting money must be traceable.

## Auth and permissions
- Start with simple internal staff auth.
- Design roles clearly: admin, dispatcher, rider.
- Do not overbuild merchant-facing auth in MVP unless explicitly requested.