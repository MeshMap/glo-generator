# AR Draw Prompt Generator

A lightweight prompt generator for a draw/graffiti AR experience. Picks a
random subject by type, runs a 5-second "get ready" countdown, then a
selectable timer, and sounds an alarm when time's up.

## Features

- Four prompt types with color coding, mixing in some NYC flavor
  - **Item** (green) — animals, plants, fruit, veggies, everyday objects,
    bare or with light context (`Pigeon`, `A hot dog cart on the corner`)
  - **Tag** (orange) — short, punchy words or names for graffiti lettering
    (`Nova`, `Bronx`, `Hustle`)
  - **Mural** (red) — a bigger scene with mood and light
    (`A subway car covered in graffiti`, `A whale tail at sunset`)
  - **Events** (purple) — a drawable idea tied to today's date, pulled from
    a curated list of fun/notable holidays and monthly observances (e.g.
    "It's Pride Month — a rainbow-striped heart"). Regenerating rotates the
    drawable idea while staying tied to the same event. Offline and static,
    in the spirit of timeanddate.com/holidays/fun, not a live feed
- Timer: 0–120 second slider (0 = no timer)
- 5-second get-ready countdown with beeps before each round
- Pause / resume, and Restart (re-run the timer on the same prompt)
- Start chime, final-5-second warning beeps, and an alarm when the timer
  ends; turns red in the final 5 seconds
- No exact-repeat prompts within a ~7 minute window per type, so rapid
  regenerating doesn't loop the same few prompts
- No build step, no framework, no bundler — plain HTML/CSS/JS
- Light and dark mode via `prefers-color-scheme`
- Installable on phones (web app manifest + Apple home-screen meta tags) so it
  can be added to the home screen and launched full-screen like a native app

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

> Audio only unlocks after the first tap on **Generate** (browser autoplay
> policy). On a kiosk or projected display, make that first tap count.

## Editing prompts

Item/Tag/Mural prompt lists live in `src/prompts.js`. The Events mode's fun
holidays and monthly observances live in `src/holidays.js`, keyed by fixed
`MM-DD` dates (no "3rd Thursday of..." style holidays, since those can't be
looked up by a plain date key) plus a `monthly` list and a generic
`fallback` list for undated days — each entry has a `title` and an `ideas`
array of a few drawable variants. Add, remove, or reword any of it freely —
everything is read at runtime, no rebuild needed. Keep everything drawable
by amateurs with no artistic ability.

## Project structure

```
glo-generator/
├── index.html               # markup
├── manifest.webmanifest     # PWA manifest (installable on phones)
├── apple-touch-icon.png
├── favicon-32.png
├── icons/                   # manifest icons (192 / 512)
├── README.md
└── src/
    ├── prompts.js    # Item / Tag / Mural prompt pools (edit these)
    ├── holidays.js   # Events mode's fun-holiday dataset (edit these)
    ├── app.js        # generation, countdown, timer, alarm
    └── styles.css    # styling + light/dark mode
```

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, S3) — there's no build
step, so no framework preset is needed.

**Vercel:** push this repo to GitHub, then on [vercel.com](https://vercel.com)
choose **Add New → Project**, import the repo, and deploy with the default
"Other" framework preset (root directory, no build command). Every push to
the default branch redeploys automatically.

**On your phone:** open the deployed URL in Safari or Chrome, then use
"Add to Home Screen" — it installs with its own icon and launches full-screen
without browser chrome.
