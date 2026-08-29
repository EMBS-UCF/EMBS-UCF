# Deployment

The site is a static build served by Cloudflare Pages. Pushing to `master`
deploys it; there is no manual deploy step.

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
