# Letter image spec

The Letters tab composites real letter images side by side as you type —
it does not use a font. To make it work, generate 26 image files per style
(A–Z) and drop them in:

```
src/letters/bubble/A.png ... Z.png
src/letters/block/A.png  ... Z.png
```

No code changes needed after that — just refresh the page. Until a letter's
file exists, it shows a dashed placeholder box instead of breaking the word.

## Requirements

- **Transparent background (PNG).** This is the single most important
  requirement — letters overlap each other with negative spacing to read as
  one connected tag, so an opaque background on any letter will cover its
  neighbor.
- **Square-ish canvas, same size for every letter in a set** (e.g.
  1024×1024). Consistent canvas size is what makes 26 independently
  generated images line up decently when placed in a row.
- **Consistent visual weight across the whole set**: same outline
  thickness, same color palette, same highlight/light direction, same
  general scale within the canvas (similar padding around each letter).
  Mismatched letters are the fastest way for a typed word to look like a
  grab-bag instead of one alphabet.
- **Letter roughly centered**, filling most of the canvas with a bit of
  even margin — not touching the edges, not tiny in the middle.
- Uppercase only, filenames exactly `A.png` through `Z.png`.

## Suggested generation prompt

Using whatever AI image tool you have — generate each letter separately
(one image per letter reads far more consistently than trying to get a
model to output a whole alphabet sheet in one shot), swapping in the
letter each time:

**Bubble style:**
> A single graffiti bubble/balloon-style capital letter "X", thick
> rounded inflated shape, glossy round highlight, dark purple outline,
> small paint drip hanging off the bottom, centered on a plain white
> background, no other elements, digital illustration

**Block style:**
> A single graffiti block-style capital letter "X", flat chunky rounded
> block shape, thick black outline, hard offset drop shadow, centered on
> a plain white background, no other elements, digital illustration

Generate on a plain white (or solid color) background if your tool can't
output transparency directly, then run each image through a background
remover (many free ones online) before saving as a transparent PNG.

## Where things are wired up

- `src/letters.js` — builds the image path per typed character
  (`src/letters/{style}/{LETTER}.png`), lays them out with overlap, and
  falls back to a dashed box if a file is missing
- `src/styles.css` — `.letter-display`, `.gl-img`, `.gl-fallback` rules
