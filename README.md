# AR Draw Prompt Generator

A lightweight prompt generator for a draw/graffiti AR experience. Picks a
random subject by difficulty, runs a 5-second "get ready" countdown, then a
selectable timer, and sounds an alarm when time's up.

## Features

- Three difficulty tiers with color coding
  - **Easy** (green) — single bare objects (`Fish`, `Tree`, `House`)
  - **Medium** (orange) — an object in a small context (`A fish in a bowl`)
  - **Hard** (red) — an evocative scene with mood (`A whale tail at sunset`)
- Timer presets: 30 / 60 / 90 / 120 seconds, or no timer
- 5-second get-ready countdown with beeps before each round
- Pause / resume, and Restart (re-run the timer on the same prompt)
- Alarm when the timer ends; turns red in the final 5 seconds
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

All prompt lists live in `src/prompts.js`. Add, remove, or reword freely —
they're read at runtime, no rebuild needed. Keep everything drawable by
amateurs with no artistic ability.

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
    ├── prompts.js    # the three prompt pools (edit these)
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
