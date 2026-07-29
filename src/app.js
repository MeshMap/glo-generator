// AR draw/graffiti prompt generator.
// Depends on PROMPTS from prompts.js.

(function () {
  "use strict";

  const COLORS = {
    easy:   { bg: "#EAF3DE", fg: "#3B6D11", dot: "#639922" },
    medium: { bg: "#FAEEDA", fg: "#854F0B", dot: "#EF9F27" },
    hard:   { bg: "#FCEBEB", fg: "#A32D2D", dot: "#E24B4A" }
  };

  const COUNTDOWN_FROM = 5; // "get ready" seconds before the timer starts

  let diff = "easy";
  let sec = 30;
  let remaining = 0;
  let tId = null;   // main timer interval
  let cId = null;   // countdown interval
  let running = false;
  let hasPrompt = false;
  let last = "";

  const el = (id) => document.getElementById(id);
  const badge = el("badge");
  const badgeText = el("badge-text");
  const badgeDot = badge.querySelector("i");
  const promptEl = el("prompt");
  const readyEl = el("ready");
  const timerEl = el("timer");
  const doneEl = el("done");
  const stopBtn = el("stop");

  // ---- difficulty + timer selection ----------------------------------------

  function paintBadge() {
    const c = COLORS[diff];
    badge.style.background = c.bg;
    badge.style.color = c.fg;
    badgeDot.style.color = c.dot;
    badgeText.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
  }

  document.querySelectorAll(".diff").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".diff").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      diff = b.dataset.diff;
      paintBadge();
    })
  );

  document.querySelectorAll(".time").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".time").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      sec = parseInt(b.dataset.sec, 10);
    })
  );

  // ---- audio ---------------------------------------------------------------

  let audioCtx = null;
  let alarmNodes = [];

  function ensureAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { /* audio unsupported */ }
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }

  function beep(freq, start, dur, track) {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "square";
    o.frequency.value = freq;
    o.connect(g);
    g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.35, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.start(start);
    o.stop(start + dur);
    if (track) alarmNodes.push(o);
  }

  function stopAlarm() {
    alarmNodes.forEach((o) => { try { o.stop(); } catch (e) {} });
    alarmNodes = [];
  }

  function alarm() {
    if (!audioCtx) return;
    stopAlarm();
    const t = audioCtx.currentTime;
    for (let i = 0; i < 4; i++) {
      beep(880, t + i * 0.32, 0.16, true);
      beep(660, t + i * 0.32 + 0.16, 0.16, true);
    }
  }

  function readyBeep() {
    beep(600, audioCtx ? audioCtx.currentTime : 0, 0.1, false);
  }

  // ---- timer ---------------------------------------------------------------

  function fmt(s) {
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  function render() {
    timerEl.textContent = fmt(remaining);
    timerEl.style.color = remaining <= 5 ? "var(--danger)" : "var(--accent)";
  }

  function clearAll() {
    if (tId) { clearInterval(tId); tId = null; }
    if (cId) { clearInterval(cId); cId = null; }
    stopAlarm();
  }

  function tick() {
    remaining--;
    render();
    if (remaining <= 0) {
      clearAll();
      running = false;
      stopBtn.classList.add("hidden");
      timerEl.classList.add("hidden");
      doneEl.classList.add("show");
      alarm();
    }
  }

  function beginTimer() {
    if (sec === 0) {
      timerEl.classList.add("hidden");
      stopBtn.classList.add("hidden");
      return;
    }
    remaining = sec;
    render();
    timerEl.classList.remove("hidden");
    stopBtn.classList.remove("hidden");
    stopBtn.innerHTML = '<i class="ti ti-player-pause"></i>Pause';
    running = true;
    tId = setInterval(tick, 1000);
  }

  function startCountdown() {
    clearAll();
    running = false;
    stopBtn.classList.add("hidden");
    doneEl.classList.remove("show");

    if (sec === 0) {
      readyEl.classList.remove("show");
      timerEl.classList.add("hidden");
      return;
    }

    let n = COUNTDOWN_FROM;
    readyEl.classList.add("show");
    timerEl.classList.add("hidden");
    readyEl.textContent = "Get ready… " + n;
    readyBeep();

    cId = setInterval(() => {
      n--;
      if (n > 0) {
        readyEl.textContent = "Get ready… " + n;
        readyBeep();
      } else if (n === 0) {
        readyEl.textContent = "Go!";
        readyBeep();
      } else {
        clearInterval(cId);
        cId = null;
        readyEl.classList.remove("show");
        beginTimer();
      }
    }, 1000);
  }

  // ---- generation ----------------------------------------------------------

  function pickPrompt() {
    const pool = PROMPTS[diff];
    let item;
    do {
      item = pool[Math.floor(Math.random() * pool.length)];
    } while (item === last && pool.length > 1);
    last = item;
    return item.charAt(0).toUpperCase() + item.slice(1);
  }

  el("go").addEventListener("click", () => {
    ensureAudio();
    promptEl.textContent = pickPrompt();
    hasPrompt = true;
    promptEl.animate(
      [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }],
      { duration: 220, easing: "ease-out" }
    );
    startCountdown();
  });

  el("restart").addEventListener("click", () => {
    ensureAudio();
    if (!hasPrompt) return;
    startCountdown();
  });

  stopBtn.addEventListener("click", () => {
    if (running) {
      if (tId) { clearInterval(tId); tId = null; }
      running = false;
      stopBtn.innerHTML = '<i class="ti ti-player-play"></i>Resume';
    } else {
      running = true;
      tId = setInterval(tick, 1000);
      stopBtn.innerHTML = '<i class="ti ti-player-pause"></i>Pause';
    }
  });

  paintBadge();
})();
