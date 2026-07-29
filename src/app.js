// AR draw/graffiti prompt generator.
// Depends on PROMPTS from prompts.js.

(function () {
  "use strict";

  const COLORS = {
    item:  { bg: "#EAF3DE", fg: "#3B6D11", dot: "#639922" },
    tag:   { bg: "#FAEEDA", fg: "#854F0B", dot: "#EF9F27" },
    mural: { bg: "#FCEBEB", fg: "#A32D2D", dot: "#E24B4A" },
    today: { bg: "#F3E8FF", fg: "#6B21A8", dot: "#A855F7" }
  };

  const COUNTDOWN_FROM = 5; // "get ready" seconds before the timer starts

  let diff = "item";
  let sec = 30;
  let remaining = 0;
  let tId = null;   // main timer interval
  let cId = null;   // countdown interval
  let running = false;
  let hasPrompt = false;
  let last = "";
  let lastToday = null;

  const el = (id) => document.getElementById(id);
  const badge = el("badge");
  const badgeText = el("badge-text");
  const badgeDot = badge.querySelector("i");
  const promptEl = el("prompt");
  const contextEl = el("context");
  const readyEl = el("ready");
  const timerEl = el("timer");
  const doneEl = el("done");
  const stopBtn = el("stop");
  const timerSlider = el("timer-slider");
  const timerValueEl = el("timer-value");

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

  function updateTimerLabel() {
    timerValueEl.textContent = sec === 0 ? "No timer" : sec + "s";
  }

  timerSlider.addEventListener("input", () => {
    sec = parseInt(timerSlider.value, 10);
    updateTimerLabel();
  });

  updateTimerLabel();

  // ---- audio ---------------------------------------------------------------

  let audioCtx = null;
  let alarmNodes = [];

  function ensureAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { /* audio unsupported */ }
    }
    if (audioCtx && audioCtx.state !== "running") audioCtx.resume();
    return audioCtx;
  }

  function beep(freq, start, dur, track, type) {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type || "square";
    o.frequency.value = freq;
    o.connect(g);
    g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.4, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.start(start);
    o.stop(start + dur);
    if (track) alarmNodes.push(o);
  }

  function stopAlarm() {
    alarmNodes.forEach((o) => { try { o.stop(); } catch (e) {} });
    alarmNodes = [];
  }

  // Sounds when the "get ready" countdown begins.
  function startChime() {
    if (!ensureAudio()) return;
    const t = audioCtx.currentTime;
    beep(440, t, 0.09, false);
    beep(660, t + 0.1, 0.14, false);
  }

  // Per-second tick during the 5s "get ready" countdown.
  function readyBeep() {
    if (!ensureAudio()) return;
    beep(600, audioCtx.currentTime, 0.1, false);
  }

  // Per-second tick during the final 5s of the running timer.
  function warnBeep() {
    if (!ensureAudio()) return;
    beep(740, audioCtx.currentTime, 0.09, false);
  }

  // Sound when the timer reaches zero.
  function alarm() {
    if (!ensureAudio()) return;
    stopAlarm();
    const t = audioCtx.currentTime;
    for (let i = 0; i < 5; i++) {
      beep(880, t + i * 0.32, 0.18, true);
      beep(660, t + i * 0.32 + 0.16, 0.18, true);
    }
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
    if (remaining > 0 && remaining <= 5) {
      warnBeep();
    }
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
    startChime();

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

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Today's date as fixed keys, for looking up src/holidays.js entries.
  function todayKeys() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return { mm, key: mm + "-" + dd };
  }

  function todayCandidates() {
    const { mm, key } = todayKeys();
    const pool = [];
    const daily = HOLIDAYS.daily[key];
    if (daily) pool.push(daily, daily); // weight today's specific date higher
    pool.push(...(HOLIDAYS.monthly[mm] || []));
    if (pool.length === 0) pool.push(...HOLIDAYS.fallback);
    return pool;
  }

  function pickToday() {
    const pool = todayCandidates();
    let item;
    do {
      item = pool[Math.floor(Math.random() * pool.length)];
    } while (item === lastToday && pool.length > 1);
    lastToday = item;
    return {
      context: item.title ? "It's " + item.title : "",
      main: capitalize(item.idea)
    };
  }

  function pickPrompt() {
    if (diff === "today") return pickToday();
    const pool = PROMPTS[diff];
    let item;
    do {
      item = pool[Math.floor(Math.random() * pool.length)];
    } while (item === last && pool.length > 1);
    last = item;
    return { context: "", main: capitalize(item) };
  }

  el("go").addEventListener("click", () => {
    ensureAudio();
    const result = pickPrompt();
    promptEl.textContent = result.main;
    contextEl.textContent = result.context;
    contextEl.classList.toggle("show", !!result.context);
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
