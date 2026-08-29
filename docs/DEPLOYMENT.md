# Deployment

The site is a static build served by Cloudflare Pages. Pushing to `master`
deploys it; there is no manual deploy step.

---

## First deploy: moving the live site onto this build

`embsucf.org` already resolves to Cloudflare and its response headers look like
an existing Pages project, so this is most likely an update to something that
exists rather than a fresh setup. Check first.

### 1. Find out what is serving the domain today

Cloudflare dashboard → **Workers & Pages**. Look for a project with
`embsucf.org` under its custom domains.

- **It exists and is connected to the GitHub repo** — you only need step 2 and
  step 4. Merging to `master` will deploy.
- **It exists but has no Git connection** (deployments say "Direct Upload") —
  you cannot add Git to an existing direct-upload project. Create a new one as
  in step 3, then move the custom domain across.
- **Nothing there** — go to step 3.

### 2. Fix the environment variables

**This is the step most likely to bite.** The previous site read
`VITE_APP_GOOGLE_API_KEY`. This one reads `VITE_GOOGLE_API_KEY` — no `APP_`.
If the old name is left in place the site deploys fine and the Events page
says the calendar is not connected.

Under **Settings → Variables and secrets**, for both Production and Preview:

| Name | Value |
| --- | --- |
| `VITE_GOOGLE_API_KEY` | Your Google Calendar API key |

Delete `VITE_APP_GOOGLE_API_KEY` and `VITE_APP_GOOGLE_CALENDAR_ID` once the new
one works. The calendar ID is no longer an environment variable — it is set in
the admin panel under **Settings → Google Calendar**, so officers can change it
without a developer.

`.node-version` in the repo pins Node 22, so no `NODE_VERSION` variable is
needed. Vite 8 requires Node 20.19+ or 22.12+, so if you ever pin a specific
patch there, keep it at or above 22.12.

### 3. Create the Pages project, if you need one

**Workers & Pages → Create → Pages → Connect to Git**, then:

| Setting | Value |
| --- | --- |
| Repository | `EMBS-UCF/EMBS-UCF` |
| Production branch | `master` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |

### 4. Push the branch and look at the preview first

```bash
git push -u origin redesign
```

Cloudflare builds every branch and gives it its own URL, something like
`redesign.embs-ucf.pages.dev`. **Look at that before merging.** It is the real
build on real infrastructure, and nothing about the live site changes.

Check on the preview URL:

- The home page, and that the Events page shows real calendar data rather than
  "not connected" — that is your environment variable check.
- `/nonexistent` returns the 404 page.
- A link preview: paste the preview URL into a Discord channel and confirm the
  card shows a title and description.

When it looks right, merge to `master`:

```bash
git checkout master && git merge redesign && git push
```

### 5. Point the domain at it

Only needed if you created a new project. Pages project → **Custom domains** →
**Set up a domain** → `embsucf.org`.

The DNS is already in this Cloudflare account, so the record is rewritten for
you. Add `www.embsucf.org` too if you want it to resolve — it currently does
not.

### 6. Turn on the editor

`/admin/` will load after the first deploy but nobody can sign in until the
GitHub OAuth worker exists. Follow [`CMS-SETUP.md`](./CMS-SETUP.md), then check
`base_url` in `public/admin/config.yml` matches the worker you deployed.

Until then, `/admin/preview/` works and shows the real content.

---

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (set `NODE_VERSION=22` under environment variables) |

### Environment variables

Set these under **Settings → Environment variables**, for both Production and
Preview:

| Name | Purpose |
| --- | --- |
| `VITE_GOOGLE_API_KEY` | Google Calendar API key. Restrict it by HTTP referrer to `embsucf.org/*` in the Google Cloud console. |
| `NODE_VERSION` | `22` |

`VITE_`-prefixed variables are compiled into the public JavaScript bundle.
The calendar key is readable by anyone who views source — that is unavoidable
for a browser-side calendar read, which is why it must be referrer-restricted
and scoped to the Calendar API only. It grants read access to a calendar that
is already public.

## What `npm run build` does

```
check:content   Validates every content file. Fails the build with a readable
                message if an edit is missing a required field.
typecheck       Runs the TypeScript compiler.
build:client    Vite builds the browser bundle into dist/.
build:server    Vite builds a server bundle used only for prerendering.
prerender       Renders every route to static HTML, writes sitemap.xml and
                robots.txt, then deletes the server bundle.
```

The content check runs first deliberately. A bad edit from the CMS should fail
in under a second with an explanation, not three steps later with a stack
trace.

## Routing

Every route is prerendered to its own `index.html`, so Cloudflare serves real
files and no SPA redirect rule is needed. Unmatched paths fall through to
`404.html`, which Cloudflare serves with a genuine 404 status rather than a
soft 200.

## Custom domain

`embsucf.org` points at the Pages project. `assets.embsucf.org` is a separate
R2 bucket holding photographs, and is referenced by absolute URL from the
content files.

Images uploaded through the CMS go into `public/uploads/` in the repository
instead, and are served from the Pages deployment. Both work. R2 is better for
large photo sets; the repository is simpler and needs no extra credentials.

## Security headers

`public/_headers` sets `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, and cache policy.

There is deliberately **no `Content-Security-Policy`** yet. A correct policy
here has to allow the CMS to reach GitHub and the auth worker, the calendar
embed to frame `calendar.google.com`, and the inline theme script to run. It
is worth adding, but it should be added by someone who can watch the browser
console while testing the `/admin` login, because a policy that is subtly
wrong breaks editing without any visible error on the public site.

A reasonable starting point, to be verified before shipping:

```
Content-Security-Policy: default-src 'self';
  img-src 'self' data: blob: https:;
  style-src 'self' 'unsafe-inline';
  script-src 'self' 'unsafe-inline' https://unpkg.com;
  font-src 'self' data:;
  connect-src 'self' https://www.googleapis.com https://api.github.com https://*.workers.dev;
  frame-src https://calendar.google.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self'
```
