# Testing the site locally

Everything the live site does can be exercised on a laptop with no
credentials, no Cloudflare account, and no GitHub login. This page says how.

```bash
npm install
npm run dev          # http://localhost:5173
```

## The three ways to run it

| Command | Serves | Use it for |
| --- | --- | --- |
| `npm run dev` | Vite dev server, hot reload | Day-to-day work |
| `npm run preview` | The real build from `dist/` | Checking prerendered HTML and meta tags |
| `npm run preview:cf` | The build **through Cloudflare's own runtime** | Anything routing-, header-, or 404-related |

`npm run preview:cf` runs `wrangler pages dev`, which is the same code
Cloudflare Pages runs in production. It is the only one of the three that
applies `public/_headers`, performs the trailing-slash redirects, and serves
`404.html` with a real 404 status. If you are debugging why something behaves
differently once deployed, use this one.

```
GET /join            308  ->  /join/
GET /admin           308  ->  /admin/
GET /nonexistent     404      (404.html, correct status)
GET /                200      + security headers from _headers
```

## Checking everything at once

```bash
npm run verify
```

Runs the content check, the type checker, the linter, and a full production
build including prerendering. This is what should pass before you push.

## The calendar, without a Google API key

The calendar drives the countdown, the next-meeting block, the GBM filter, and
four separate empty/failure states. None of that would be reachable locally
without credentials, so **development serves fixture data by default** whenever
no API key is configured.

You will see a dashed amber strip above the event list saying so. It exists
only in a development build.

To force a specific state, add a query parameter to any page with a calendar
on it:

| URL | State |
| --- | --- |
| `localhost:5173/events` | Fixture events (default) |
| `localhost:5173/events?calendar=loading` | The loading skeleton, held open |
| `localhost:5173/events?calendar=empty` | Feed works, returns nothing |
| `localhost:5173/events?calendar=error` | Google request failed |

To test against the **real** calendar instead, copy `.env.example` to
`.env.local` and fill in `VITE_GOOGLE_API_KEY`. Fixtures switch off
automatically once a key is present. Set `VITE_CALENDAR_MOCK=on` to force them
back on.

The embedded month-view iframe is Google's own and cannot be faked; without a
calendar ID it renders its "not connected" placeholder.

None of this reaches production. `import.meta.env.DEV` compiles to `false` and
the fixture module is dropped from the bundle.

## The editing panel

| Browser | URL |
| --- | --- |
| Chrome, Edge, Brave | <http://localhost:5173/admin/> |
| Firefox, Safari, anything else | <http://localhost:5173/admin/preview/> |

`/admin/` uses the local-repository workflow: it reads and writes the real
files in `content/`, so you can make an edit and then look at `git diff`. It
needs the File System Access API, which only Chromium browsers implement.

`/admin/preview/` loads the same `config.yml` and swaps only the backend for
one that stores data in the browser. Every field, label, and hint is identical.

That storage starts empty, so on first load the page copies the real `content/`
directory into it — all the projects, officers, resource sections, and page
copy come up populated. A note in the bottom-left says how many files were
loaded. Edits are kept in your browser and are never committed.

Because the content lives in browser storage, it does not follow later changes
to the files. Add `?reseed` to reload it:

```
localhost:5173/admin/preview/?reseed
```

That wipes what is in the browser and copies the current files in again.

Both URLs work with or without the trailing slash, in dev and in preview.

## Testing a bad content edit

The build refuses to ship malformed content. To see it work, break something on
purpose:

```bash
# Remove a required field from a project, then:
npm run check:content
```

It exits non-zero and names the file and the field. This is what an officer
sees in the Cloudflare build log when a CMS edit is wrong, so it is worth
reading once.

## What still cannot be tested locally

- **GitHub login for the CMS.** Needs the OAuth worker from
  [`CMS-SETUP.md`](./CMS-SETUP.md). The `/admin/preview/` page covers the
  interface and the content; only the sign-in and the commit are missing. To
  test a real commit before the worker exists, use **Sign In with GitHub Using
  PAT** on `/admin/` — it works in any browser, but it writes real commits, so
  do it on a branch.
- **The real Google Calendar embed.** Needs a public calendar ID.
- **Link unfurling.** Discord and LinkedIn cannot reach `localhost`. The tags
  they read are in the prerendered HTML — check them with
  `curl -s localhost:4173/join/ | grep 'og:'` after `npm run preview`.
