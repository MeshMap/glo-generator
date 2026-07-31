// Graffiti letter generator: mode switching (Prompts / Letters) plus the
// Bubble/Block letter display.
//
// Letters are rendered as IMAGES, not a font — drop A.png-Z.png files into
// src/letters/bubble/ and src/letters/block/ (transparent background) and
// they'll be picked up automatically. A letter with no image yet falls back
// to a dashed placeholder box so a typed word never silently breaks.

(function () {
  "use strict";

  const el = (id) => document.getElementById(id);

  // ---- mode switch -----------------------------------------------------

  const promptSection = el("prompt-mode");
  const letterSection = el("letter-mode");

  document.querySelectorAll("#mode-row .mode").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll("#mode-row .mode").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      const mode = b.dataset.mode;
      promptSection.classList.toggle("hidden", mode !== "prompt");
      letterSection.classList.toggle("hidden", mode !== "letters");
    })
  );

  // ---- letter generator --------------------------------------------------

  const input = el("letter-input");
  const display = el("letter-display");
  const grid = el("letter-grid");

  let style = "bubble";
  const PLACEHOLDER = "G";

  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  ALPHABET.forEach((letter) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "letter-key";
    b.textContent = letter;
    b.addEventListener("click", () => {
      input.value = letter;
      render();
    });
    grid.appendChild(b);
  });

  function heightFor(text) {
    const len = text.length || 1;
    if (len <= 2) return 130;
    if (len <= 4) return 100;
    if (len <= 6) return 80;
    if (len <= 9) return 60;
    return 44;
  }

  function render() {
    const text = input.value.trim().toUpperCase() || PLACEHOLDER;
    const height = heightFor(text);
    display.innerHTML = "";

    let glyphCount = 0;
    text.split("").forEach((ch) => {
      if (ch === " ") {
        const sp = document.createElement("span");
        sp.className = "gl-sp";
        sp.style.height = height + "px";
        display.appendChild(sp);
        return;
      }

      const isFirst = glyphCount === 0;
      const overlap = isFirst ? 0 : -0.14 * height;

      if (/[A-Z]/.test(ch)) {
        const img = document.createElement("img");
        img.className = "gl-img";
        img.alt = ch;
        img.src = "src/letters/" + style + "/" + ch + ".png";
        img.style.height = height + "px";
        img.style.marginLeft = overlap + "px";
        img.onerror = () => {
          img.replaceWith(fallbackSpan(ch, height, overlap));
        };
        display.appendChild(img);
      } else {
        display.appendChild(fallbackSpan(ch, height, overlap));
      }
      glyphCount++;
    });
  }

  function fallbackSpan(ch, height, overlap) {
    const span = document.createElement("span");
    span.className = "gl-fallback";
    span.textContent = ch;
    span.style.height = height + "px";
    span.style.fontSize = height * 0.55 + "px";
    span.style.marginLeft = Math.max(overlap, 0) + "px";
    return span;
  }

  document.querySelectorAll("#style-row .style-btn").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll("#style-row .style-btn").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      style = b.dataset.style;
      render();
    })
  );

  input.addEventListener("input", render);

  render();
})();
