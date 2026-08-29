# Editing the website

You do not need to know how to code, and you should not need to install
anything. Everything on this page is done in a browser.

## Where to go

**[embsucf.org/admin](https://embsucf.org/admin)**

Sign in with GitHub. Your GitHub account needs to be a member of the
[EMBS-UCF organisation](https://github.com/EMBS-UCF) — the current president
can add you.

Any modern browser works, Firefox and Safari included. You do not need a
particular one.

## How saving works

When you press **Publish**, three things happen, in order:

1. Your change is saved to the project's GitHub repository.
2. Cloudflare notices the change and rebuilds the site. This takes about a
   minute.
3. The new version goes live.

Nothing you do in the editor touches the live site directly. If something is
wrong with your edit, the rebuild fails and **the site stays exactly as it
was**. You cannot break the public website by making a mistake here.

If a change has not appeared after two or three minutes, see
[When something goes wrong](#when-something-goes-wrong).

---

## Common jobs

### Add a new officer

1. Open **Officers** in the left sidebar.
2. Click **New Officer**.
3. Fill in name, position, and major.
4. Set **Display order** — this controls where they appear. President is 1,
   Vice President is 2, and so on. Two people can share a number; they will
   just sort alphabetically.
5. Drag their headshot into **Photo**. Portrait orientation works best.
   If you skip the photo, the site shows their initials rather than a broken
   image, so it is fine to add it later.
6. Publish.

### Remove an officer who has graduated

Open **Officers**, click their entry, and choose **Delete**. They disappear
from the site on the next build.

### Add a project

1. Open **Projects** → **New Project**.
2. **Status** decides which part of the page it lands on. `Active` shows under
   "Running this semester"; `Past` moves it to the archive.
3. **One-line summary** is what people see on the card, and what appears when
   somebody shares the link in Discord. Keep it concrete.
4. **Full description** is the project's own page. Write a few paragraphs
   about what the team is actually doing and what a new member would end up
   working on. Specific beats impressive.
5. Publish.

### Mark a project as finished

Open the project, change **Status** to `Past`, and fill in **Completed**
(for example, `Spring 2026`). Clear the **When it meets** field so the card
stops advertising a meeting that no longer happens.

### Add a photograph

Three places take a wide photo of the chapter: the top of the **Home page**,
the membership section on the **Join page**, and the **Events page**. Each one
is under **Page text** in the sidebar, in a collapsed box called
*Photograph*.

Two things to know:

- **A description is required.** If you upload an image and leave the
  description blank, the build fails and tells you so. It is what screen
  readers announce, and what shows if the image ever fails to load. One
  sentence about what is happening in the photo is enough.
- **Leaving it empty is a real option.** With no photo, the site falls back to
  its own graphic. That looks better than a dark, blurry photo of a lecture
  theatre, so only add one when you have a good one.

Photos of people working — hands on equipment, a workshop mid-session, a
speaker with an audience — do far more than a posed group shot.

Project cards take a photo too, under **Projects → Cover photo**.

### Change the wording on a page

**Page text** in the sidebar holds the writing on the Home, Join, Events, and
Contact pages. Each field is labelled with where it appears.

The four figures under the headline on the home page are under
**Home page → Number strip**. Update them when they stop being true — a wrong
number reads worse than no number.

### Change the email address or social links

**Settings → Chapter details**. Emptying a social link removes it from the
site everywhere, including the footer.

### Connect or change the calendar

**Settings → Chapter details → Google Calendar**.

The calendar must be **public** for the site to read it:

1. In Google Calendar, open **Settings** and pick the chapter calendar.
2. Under **Access permissions**, tick *Make available to public*.
3. Scroll to **Integrate calendar** and copy the **Calendar ID**.
4. Paste it into the Calendar ID field in the admin panel and publish.

Events whose title contains `GBM` are treated as general body meetings and
drive the countdown on the Events page. You can change that keyword in the
same place.

---

## Writing that fits the site

The site's voice is plain and specific. It works because it says real things.
Some guidance, since this is the part that decays fastest:

- Prefer the concrete detail to the impressive adjective. "Scalp EEG sits
  around 10–100 µV, so most of this project is a fight against noise" tells a
  reader more than "students gain hands-on signal processing experience".
- Say what somebody would actually do. "Plumb the pressure-swing loop" is
  useful; "gain hands-on experience" is not.
- It is fine to admit what is unfinished or undecided. "Meeting time still
  being set" reads as honest. Inventing one reads as noise.
- Avoid words that could describe any club: *passionate*, *innovative*,
  *cutting-edge*, *empowering*, *bridging the gap*.

---

## When something goes wrong

### My change has not appeared

Check the build. Go to the [Cloudflare dashboard](https://dash.cloudflare.com)
→ **Workers & Pages** → the site → **Deployments**. The most recent one will be
green (deployed) or red (failed).

If it failed, click it and scroll to the bottom of the log. The site checks
your content before building and explains what it did not like, naming the
file and the field — for example:

```
Content check failed — 1 problem found.

Nothing was deployed. The live site is unchanged.

  • content/projects/new-project.md
      `summary` is required — it is the one-line description shown on project cards.
```

Go back to the admin panel, fix that field, and publish again.

### I cannot log in

Your GitHub account has to be a member of the EMBS-UCF organisation with write
access. Ask the current president. If you are a member and it still fails, the
login service may need attention — see [`CMS-SETUP.md`](./CMS-SETUP.md).

### I deleted something by accident

Nothing is ever really lost. Every change is a commit in the GitHub
repository, and any of them can be restored. Ask whoever is technical this
year, or open the repository's commit history yourself and revert the change.
