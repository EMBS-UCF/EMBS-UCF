# One-time setup: GitHub login for the admin panel

The editor at `/admin` commits directly to this repository, so it needs
permission to act as the person using it. GitHub only issues that permission
through an OAuth flow, and an OAuth flow needs a small server-side component
to hold the client secret. That component is a Cloudflare Worker.

This is set up **once**. After that, officers just click "Sign in with GitHub".

> If the login is already working, you do not need this file. It exists so
> that whoever inherits the site can repair or move the setup.

---

## Browser support

**The live editor works in every modern browser, Firefox included.** Once the
worker below is deployed, `embsucf.org/admin/` is ordinary OAuth plus the
GitHub API — nothing browser-specific about it. No officer will be told to
switch browsers.

The only Chromium-only thing is the *local folder* workflow used during
development, which needs the File System Access API. Sveltia ships no
proxy-server fallback for it, so Firefox gets the preview page below instead.

## Previewing the editor locally

Run the site:

```bash
npm run dev
```

Then, depending on your browser:

| Browser | Open | What you get |
| --- | --- | --- |
| Firefox, Safari, or any browser | <http://localhost:5173/admin/preview/index.html> | The full editor, storing data in this browser only |
| Chrome, Edge, Brave | <http://localhost:5173/admin/index.html> | The full editor, reading and writing the real files in `content/` |

If you open `/admin/` in Firefox by mistake, Sveltia greys out the local
option and tells you to use Chrome. A yellow bar at the top of that page links
across to the preview editor — it only appears on localhost.

There is also a **Sign In with GitHub Using PAT** button on that screen. It
works in any browser and talks to the real repository using a
[personal access token](https://github.com/settings/tokens). Useful for
checking the genuine commit path, but remember it writes real commits — do it
on a branch, not `master`.

**The preview page** (`/admin/preview/`) loads the same `config.yml` as the
real editor and layers a two-line override on top that swaps the backend for
`test-repo`. Every collection, field, and help text is therefore exactly what
officers see — there is no second copy of the config to drift out of sync. Its
collections start empty, and anything you create stays in your browser's
storage. Nothing is committed.

Use it to check that fields, labels, and hints read well. Use the Chromium
route when you want to make real edits to `content/` and inspect them with
`git diff`.

**One development-only trap:** Vite's dev server hands `/admin` and `/admin/`
to the site's own router, which renders the 404 page. During development you
need the full path ending in `/index.html`. On the built site the plain
`/admin/` works — check with `npm run build && npm run preview`.

---

## 1. Register a GitHub OAuth app

1. Go to the EMBS-UCF organisation → **Settings** → **Developer settings** →
   **OAuth Apps** → **New OAuth App**.

   Register it under the *organisation*, not a personal account. A personal
   app stops working when that person graduates.

2. Fill in:

   | Field | Value |
   | --- | --- |
   | Application name | `EMBS UCF Site Editor` |
   | Homepage URL | `https://embsucf.org` |
   | Authorization callback URL | `https://embs-cms-auth.embsucf.workers.dev/callback` |

3. Generate a client secret. Copy both the **Client ID** and the
   **Client Secret** now — GitHub will not show the secret again.

## 2. Deploy the auth worker

Sveltia publishes a ready-made worker for exactly this. From a terminal:

```bash
git clone https://github.com/sveltia/sveltia-cms-auth.git
cd sveltia-cms-auth
npx wrangler deploy
```

Name the worker `embs-cms-auth` when prompted, so the URL matches the callback
above.

## 3. Give the worker its secrets

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put ALLOWED_DOMAINS
```

For `ALLOWED_DOMAINS`, enter:

```
embsucf.org,*.embs-ucf.pages.dev
```

This restricts which sites may use the worker to log people in. Without it,
anyone could point their own site at your worker.

## 4. Point the admin panel at the worker

In [`public/admin/config.yml`](../public/admin/config.yml), the `base_url`
under `backend` must match the deployed worker:

```yaml
backend:
  name: github
  repo: EMBS-UCF/EMBS-UCF
  branch: master
  base_url: https://embs-cms-auth.embsucf.workers.dev
```

If you deployed the worker under a different name, change it here.

## 5. Grant officers access

Anyone who should be able to edit the site needs **write** access to the
`EMBS-UCF/EMBS-UCF` repository. Add them as an organisation member with the
Write role.

This is the only access control on the editor. Removing someone from the
GitHub organisation removes their ability to edit the site, which is what you
want to do at the end of every academic year.

---

## Handing this over

The next board needs, at minimum:

- **Owner access** to the `EMBS-UCF` GitHub organisation.
- **Access to the Cloudflare account** holding `embsucf.org`, the Pages
  project, the R2 bucket behind `assets.embsucf.org`, and this worker.
- **The Google account** that owns the chapter calendar and the API key.

Put these in whatever the chapter uses for shared credentials, and check they
work *before* the outgoing president loses interest. The single most common
way a student org site dies is that it still works fine but nobody can log in
to change it.
