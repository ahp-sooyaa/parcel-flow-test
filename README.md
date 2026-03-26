## What I learned testing Next.js + Cloudflare Workers + Supabase

This repo was used to test a **Next.js + OpenNext + Cloudflare Workers + Supabase** stack for a Parcel Flow project. During the process, I learned a lot about deployment, staging environments, environment variables, and database migration setup. I’m keeping these notes here as a record of what I learned.

### Cloudflare staging is not automatic

At first, I thought creating a `develop` branch would give me a permanent staging environment like Vercel. It does not.

With Cloudflare Workers:

* one branch is selected as the production branch
* other branches can get preview builds (non-production branch build option)
* but a real shared staging environment needs a separate **Wrangler environment** such as `staging`

So I ended up with:

* `main` → production
* `develop` → integration branch
* feature branches → PR preview builds
* `wrangler --env staging` → actual shared staging deploy

### Wrangler environments are config-based

I learned that:

* root `vars` are the default environment values
* `env.staging.vars` are staging-specific values
* secrets should not go into `wrangler.jsonc`
* secrets must be added separately with `wrangler secret put`

I also ran into a Cloudflare detail that was easy to miss: some config like `services` and `images` is **not inherited** by environments, so I had to define them again under `env.staging`.

### OpenNext build is different from normal Next.js build

A normal `next build` was not enough for my setup.

Since the project uses **OpenNext for Cloudflare**, I had to use:

* `opennextjs-cloudflare build`
* `opennextjs-cloudflare deploy`

That was an important lesson because `.open-next` is generated build output, not source code. If I deployed without rebuilding it, staging could end up running old code.

### Next.js middleware / proxy compatibility

I also hit an issue with Next.js 16 naming.

Next.js says `middleware` is deprecated in favor of `proxy`, but in my setup OpenNext build failed when I used `proxy.ts`. Renaming the file back to `middleware.ts` fixed the issue.

So for now, practical compatibility mattered more than following the newest naming convention.

### Database and migration workflow needs explicit separation

Since Parcel Flow uses separate staging and production databases, I had to separate more than just Cloudflare env vars.

I split:

* `.env.development`
* `.env.production`
* separate Drizzle config files
* separate migration scripts
* separate seed scripts

That made it clear which database I was targeting and reduced the risk of running migrations or seeds against the wrong environment.

### Seed scripts do not magically know the environment

Another thing I learned: a seed script using `process.env` only reads whatever environment variables are already loaded.

So a command like:

```bash
pnpm exec tsx src/db/seeds/seed-super-admin.ts
```

does not automatically know whether it should use development, staging, or production credentials.

That means env loading must be explicit, either through:

* separate scripts
* or loading the correct env file before running the seed

### Supabase Auth can work even without app tables

One confusing moment was seeing sign-in work on a fresh staging Supabase project.

That made me realize:

* Supabase Auth users live in `auth.users`
* app tables are separate

So authentication can still behave differently from the rest of the app database state. That was a useful reminder not to assume "no tables" means "nothing works."

### Biggest takeaway

The biggest lesson from this project was that deployment is not only about pushing code.

For this stack, I had to think carefully about:

* preview vs staging vs production
* build-time vs runtime variables
* Wrangler vars vs secrets
* OpenNext build output
* database migration targets
* seed script environment control

This project gave me much more real-world understanding of environment management than a normal local-only app.
