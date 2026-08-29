# IEEE EMBS at UCF

The chapter website. Live at **[embsucf.org](https://embsucf.org)**.

---

## If you are an officer and want to change the site

Go to **[embsucf.org/admin](https://embsucf.org/admin)** and sign in with
GitHub. You do not need to install anything or read any further than
**[docs/EDITING.md](./docs/EDITING.md)**, which covers adding officers and
projects, changing page wording, and what to do when something looks wrong.

Everything below is for whoever is maintaining the code.

---

## Running it locally

```bash
npm install
npm run dev
```

No credentials are needed. Without a Google API key the calendar serves
fixture data in development, clearly marked, so the countdown and the event
list are still testable — see
[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md).

```bash
npm run verify      # content check + typecheck + lint + full build
npm run build       # content check, typecheck, build, prerender
npm run preview     # serve the real build, including prerendered HTML
npm run preview:cf  # serve it through Cloudflare's own runtime
```

**[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** covers testing everything
locally — the calendar without a Google key, the editing panel in any browser,
and the routing and header behaviour that only shows up under Cloudflare.

## How it is put together

| | |
| --- | --- |
| Framework | React 19 + React Router 7 |
| Build | Vite 7, TypeScript |
| Styling | Tailwind CSS v4, configured in CSS via `@theme`. Dark only. |
| Content | Markdown and JSON in `content/`, edited through Sveltia CMS |
| Hosting | Cloudflare Pages |

```
content/            Everything an officer can edit. The CMS writes here.
  settings/         Chapter email, socials, calendar connection
  pages/            Page wording (JSON, one file per page)
  officers/         One Markdown file per officer
  advisors/
  projects/         One Markdown file per project; body becomes the project page

build/
  markdown.ts       Vite plugin: Markdown -> HTML at build time
  validate-content.mjs   Content gate; fails the build on a bad edit
  prerender.mjs     Renders every route to static HTML, emits sitemap/robots

src/
  content/          Typed loaders over the content directory
  components/ui/    Design-system primitives
  components/layout/
  hooks/            useReveal, useNow, useScrolled, useCalendarEvents
  lib/              calendar, seo, formatting
  pages/            One component per route
  styles/           theme.css (tokens), prose.css (CMS-authored HTML)

public/admin/       The CMS. config.yml defines every editable field.
docs/               Editing guide, CMS setup, deployment
```

### A few decisions worth knowing about

**Content lives in the repository, not in a service.** The CMS is a thin
editing layer over Markdown files that are committed to Git. If Sveltia
disappears tomorrow, the content is still here in plain text and the site
still builds. This mattered more than editor polish, because student
organisations lose access to third-party accounts constantly.

**A bad edit fails the build instead of breaking the site.**
`build/validate-content.mjs` runs before anything else and rejects missing
required fields, malformed URLs, and past projects with no completion date —
naming the file and the field in language aimed at a non-programmer. A failed
build leaves the previous deployment untouched.

**Every route is prerendered.** The site is still a React app once it loads,
but the server hands over real HTML. This is mostly for link previews: Discord,
LinkedIn, and iMessage do not run JavaScript, and a chapter link that unfurls
as a blank card is a link nobody clicks.

**No Markdown parser ships to the browser.** `build/markdown.ts` transforms
`.md` files into modules containing finished HTML during the build.

**The site is dark only.** There is no light mode and no toggle, so the
palette in `src/styles/theme.css` is a single set of values rather than a
swappable pair, and nothing has to be resolved before first paint.

### Adding a new page

1. Create the component in `src/pages/`.
2. Add the route in `src/App.tsx`.
3. Add a `metaForPath` branch and the path in `ALL_STATIC_ROUTES` in
   `src/lib/seo.ts` — this is what gets it prerendered and into the sitemap.
4. If officers should be able to edit its wording, add a JSON file under
   `content/pages/` and a matching entry in `public/admin/config.yml`.

## Deployment

Pushing to `master` deploys. See **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)**
for build settings and environment variables, and
**[docs/CMS-SETUP.md](./docs/CMS-SETUP.md)** for the GitHub login worker behind
`/admin` — including what the next board needs to be handed.
