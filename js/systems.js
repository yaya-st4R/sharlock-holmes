/* ============================================================
   Systems — audio, haptics, investigation points, achievements,
   mission cooldown, detective's examination, text helpers
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  const G = window.Game;
  const S = window.SH = window.SH || { cases: [] };

  /* ============================================================
     TEXT — keep every clue, show less of it
     ============================================================ */
  function splitSentences(input) {
    const str = String(input == null ? '' : input);
    if (!str) return [];
    const out = str.match(/[^.!?]+[.!?]+["'”’)\]]*\s*|[^.!?]+$/g);
    return out && out.length ? out : [str];
  }
  G.short = function (html, n) {
    if (!html) return '';
    const parts = splitSentences(html);
    const keep = n == null ? 2 : n;
    return parts.length <= keep ? String(html) : parts.slice(0, keep).join('').trim();
  };
  G.more = function (html, n) {
    if (!html) return '';
    const parts = splitSentences(html);
    const keep = n == null ? 2 : n;
    if (parts.length <= keep + 1) return String(html);
    return parts.slice(0, keep).join('').trim() +
      '<details class="more"><summary>Read more</summary><span>' + parts.slice(keep).join('') + '</span></details>';
  };
  G.collapse = function (paras, keep) {
    const arr = [].concat(paras || []);
    const k = keep == null ? 2 : keep;
    if (arr.length <= k + 1) return arr.map(p => `<p>${p}</p>`).join('');
    return arr.slice(0, k).map(p => `<p>${p}</p>`).join('') +
      '<details class="more"><summary>Read more</summary>' + arr.slice(k).map(p => `<p>${p}</p>`).join('') + '</details>';
  };

  /* ============================================================
     HAPTICS
     ============================================================ */
  const HAP = {
    tick: [8], clue: [14, 40, 22], good: [18, 46, 18], bad: [40, 60, 40],
    warn: [26, 34, 26, 34, 26], achieve: [12, 30, 12, 30, 26], case: [22, 48, 22, 48, 60]
  };
  S.haptic = function (kind) {
    try {
      if (!G.save.settings.haptics) return;
      if (!navigator.vibrate) return;
      navigator.vibrate(HAP[kind] || HAP.tick);
    } catch (e) { /* unsupported */ }
  };

  /* ============================================================
     AUDIO — generated music beds + effects (no external files)
     ============================================================ */
  const Audio = S.Audio = (function () {
    let ctx = null, musicGain = null, sfxGain = null, timer = null;
    let current = '', step = 0, nextTime = 0;

    const MOODS = {
      title:       { root: 82.41, scale: [0, 3, 7, 10, 12], tempo: 0.62, pad: true },
      workshop:    { root: 110.0, scale: [0, 3, 5, 7, 10], tempo: 0.54, pad: true },
      case:        { root: 98.0, scale: [0, 2, 3, 7, 10], tempo: 0.50, pad: true },
      suspense:    { root: 73.42, scale: [0, 1, 5, 6, 8], tempo: 0.38, pad: true },
      interrogation:{ root: 87.31, scale: [0, 3, 6, 10], tempo: 0.46, pad: false },
      puzzle:      { root: 130.8, scale: [0, 2, 7, 9], tempo: 0.44, pad: false },
      victory:     { root: 146.8, scale: [0, 4, 7, 11, 14], tempo: 0.52, pad: true }
    };

    function ensure() {
      try {
        if (!ctx) {
          const C = window.AudioContext || window.webkitAudioContext;
          if (!C) return null;
          ctx = new C();
          musicGain = ctx.createGain();
          sfxGain = ctx.createGain();
          musicGain.connect(ctx.destination);
          sfxGain.connect(ctx.destination);
          applyVolumes();
        }
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
      } catch (e) { return null; }
    }

    function applyVolumes() {
      if (!ctx) return;
      const st = G.save.settings;
      musicGain.gain.value = st.music ? Math.max(0, Math.min(1, st.musicVol)) * 0.20 : 0;
      sfxGain.gain.value = st.sfx ? Math.max(0, Math.min(1, st.sfxVol)) * 0.55 : 0;
    }

    function freq(root, semis) { return root * Math.pow(2, semis / 12); }

    function tone(f, t, dur, opts) {
      if (!ctx) return;
      opts = opts || {};
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = opts.type || 'sine';
      o.frequency.setValueAtTime(f, t);
      if (opts.slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, opts.slide), t + dur);
      const peak = opts.gain == null ? 0.16 : opts.gain;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + Math.min(0.03, dur * 0.3));
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(opts.bus || sfxGain);
      o.start(t);
      o.stop(t + dur + 0.03);
    }

    function noise(t, dur, opts) {
      if (!ctx) return;
      opts = opts || {};
      const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const f = ctx.createBiquadFilter();
      f.type = opts.filter || 'bandpass';
      f.frequency.value = opts.freq || 1600;
      f.Q.value = opts.q || 0.8;
      const g = ctx.createGain();
      g.gain.value = opts.gain == null ? 0.14 : opts.gain;
      src.connect(f); f.connect(g); g.connect(opts.bus || sfxGain);
      src.start(t);
    }

    function schedule() {
      if (!ctx || !current) return;
      const m = MOODS[current];
      if (!m) return;
      const now = ctx.currentTime;
      if (nextTime < now) nextTime = now + 0.05;
      while (nextTime < now + 0.6) {
        const bar = step % 16;
        const t = nextTime;
        // low pad
        if (bar === 0 || bar === 8) {
          tone(freq(m.root, m.pad ? 0 : 7), t, m.tempo * 3.2, { type: 'triangle', gain: 0.05, bus: musicGain });
          tone(freq(m.root, 7), t, m.tempo * 2.6, { type: 'sine', gain: 0.028, bus: musicGain });
        }
        // sparse motif
        if ([2, 6, 10, 14].indexOf(bar) >= 0) {
          const deg = m.scale[(step * 3 + Math.floor(step / 5)) % m.scale.length];
          tone(freq(m.root * 2, deg), t, m.tempo * 1.1, {
            type: current === 'suspense' ? 'triangle' : 'sine',
            gain: 0.034, bus: musicGain
          });
        }
        if (current === 'interrogation' && bar % 4 === 3) {
          noise(t, 0.05, { freq: 2600, gain: 0.02, bus: musicGain });
        }
        step++;
        nextTime += m.tempo / 2;
      }
    }

    function music(name) {
      if (!G.save.settings.music) { stop(); current = name; return; }
      if (!ensure()) return;
      applyVolumes();
      if (current === name && timer) return;
      current = name;
      step = 0;
      nextTime = ctx.currentTime + 0.06;
      if (!timer) timer = setInterval(schedule, 180);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      current = '';
    }

    const SFX = {
      click:  () => beep([[520, 0.05, 'square', 0.05]]),
      tick:   () => beep([[880, 0.035, 'sine', 0.04]]),
      good:   () => beep([[660, 0.13, 'sine', 0.10], [990, 0.15, 'sine', 0.09, 0.09]]),
      bad:    () => beep([[150, 0.20, 'sawtooth', 0.09]]),
      stamp:  () => { beep([[88, 0.28, 'triangle', 0.16]]); if (ctx) noise(ctx.currentTime, 0.12, { freq: 220, gain: 0.10 }); },
      paper:  () => { if (ensure()) noise(ctx.currentTime, 0.18, { freq: 2400, q: 0.6, gain: 0.09 }); },
      step:   () => beep([[70, 0.10, 'triangle', 0.10], [62, 0.10, 'triangle', 0.08, 0.16]]),
      electric: () => beep([[420, 0.16, 'square', 0.06, 0, 880], [120, 0.10, 'sawtooth', 0.04, 0.12]]),
      warn:   () => beep([[330, 0.14, 'square', 0.08], [262, 0.18, 'square', 0.08, 0.16]]),
      achieve:() => beep([[523, 0.12, 'sine', 0.10], [659, 0.12, 'sine', 0.10, 0.1], [784, 0.12, 'sine', 0.10, 0.2], [1046, 0.22, 'sine', 0.10, 0.3]]),
      case:   () => beep([[392, 0.16, 'triangle', 0.12], [523, 0.16, 'triangle', 0.12, 0.14], [659, 0.16, 'triangle', 0.12, 0.28], [784, 0.34, 'sine', 0.12, 0.42]]),
      alarm:  () => beep([[520, 0.18, 'square', 0.10], [390, 0.18, 'square', 0.10, 0.2], [520, 0.18, 'square', 0.10, 0.4]])
    };
    function beep(list) {
      if (!ensure()) return;
      const t0 = ctx.currentTime + 0.01;
      list.forEach(function (b) {
        tone(b[0], t0 + (b[4] || 0), b[1], { type: b[2], gain: b[3], slide: b[5] || 0 });
      });
    }
    function sfx(kind) {
      if (!G.save.settings.sfx) return;
      if (!ensure()) return;
      const fn = SFX[kind] || SFX.click;
      try { fn(); } catch (e) { /* no audio */ }
    }

    return {
      unlock: ensure, music: music, stop: stop, sfx: sfx,
      apply: applyVolumes,
      get running() { return !!timer; }
    };
  })();

  /* ============================================================
     INVESTIGATION POINTS
     ============================================================ */
  const COSTS = S.COSTS = { hint: 5, inspect: 10, examine: 5, intel: 10, retry: 0 };

  G.ipAdd = function (n, reason) {
    n = Math.round(Number(n) || 0);
    if (!n) return 0;
    if (n > 0) {
      this.save.ip += n;
      this.save.ipEarned = (this.save.ipEarned || 0) + n;
      if (this.save.ipEarned >= 200) this.ach('points-earned');
    }
    this.persist();
    if (window.SH.Workshop) SH.Workshop.paintPoints();
    return this.save.ip;
  };

  G.ipSpend = function (n, reason) {
    n = Math.round(Number(n) || 0);
    if (this.save.ip >= n) {
      this.save.ip -= n;
      this.save.ipSpent = (this.save.ipSpent || 0) + n;
      this.persist();
      if (window.SH.Workshop) SH.Workshop.paintPoints();
      return true;
    }
    this.sound('bad');
    SH.Exam.open({
      broke: true,
      need: n,
      reason: reason || 'That examination costs investigation points.'
    });
    return false;
  };

  /* ============================================================
     ACHIEVEMENTS
     ============================================================ */
  const ACH = S.ACHIEVEMENTS = [
    { id: 'first-clue',  name: 'First Discovery',      desc: 'Log your first clue.',                       icon: 'search' },
    { id: 'sharp-eyes',  name: 'Sharp Eyes',           desc: 'Find every clue in a single case.',          icon: 'eye' },
    { id: 'codebreaker', name: 'Codebreaker',          desc: 'Crack a cipher or encrypted terminal.',      icon: 'cipher' },
    { id: 'interrogator',name: 'Master Interrogator',  desc: 'Expose a suspect contradiction.',            icon: 'users' },
    { id: 'forensic',    name: 'Forensic Expert',      desc: 'Complete a lab comparison.',                 icon: 'fingerprint' },
    { id: 'undercover',  name: 'Undercover Specialist',desc: 'Complete an undercover mission.',            icon: 'mask' },
    { id: 'first-case',  name: 'Case Closed',          desc: 'Close your first investigation.',            icon: 'gavel' },
    { id: 'master',      name: 'Master Detective',     desc: 'Close all 30 cases.',                        icon: 'badge' },
    { id: 'no-hints',    name: 'Unassisted',           desc: 'Close a case without spending a hint.',      icon: 'star' },
    { id: 'red-herring', name: 'Not So Fast',          desc: 'Clear a red herring with later evidence.',   icon: 'alert' },
    { id: 'points-earned', name: 'Self-Funded',        desc: 'Earn 200 investigation points.',             icon: 'chart' },
    { id: 'exam-perfect',name: 'Top of the Class',     desc: 'Ace the detective\'s examination.',          icon: 'book' }
  ];

  G.ach = function (id) {
    if (!id || this.save.achievements[id]) return false;
    const def = ACH.find(function (a) { return a.id === id; });
    if (!def) return false;
    this.save.achievements[id] = Date.now();
    this.persist();
    this.sound('achieve');
    S.haptic('achieve');
    this.toast('<b>Achievement — ' + def.name + '</b><br><span style="color:#a894c4;font-size:11px">' + def.desc + '</span>', 'badge', 6000);
    return true;
  };

  /* clue side-effects */
  G.onClue = function (id) {
    const c = this.active, s = this.state;
    if (!c || !s) return;
    this.ach('first-clue');
    const total = Object.keys(c.clues || {}).length;
    if (total && s.found.length >= total) this.ach('sharp-eyes');
    (c.redHerrings || []).forEach(function (r) {
      if (s.found.indexOf(r.clue) < 0) return;
      if (s.flags['rh_' + r.clue]) return;
      const cleared = (r.clearedBy || []).every(function (x) { return s.found.indexOf(x) >= 0; });
      if (!cleared) return;
      s.flags['rh_' + r.clue] = true;
      G.log('sys', 'RED HERRING CLEARED — ' + (r.note || 'the innocent explanation holds.'));
      G.toast('<b>Cleared:</b> ' + A.esc(r.label || 'a false lead') + '<br><span style="color:#a894c4;font-size:11px">' + (r.note || 'Innocent after all.') + '</span>', 'alert', 6000);
      G.ipAdd(6, 'deduction');
      G.ach('red-herring');
    });
  };

  /* ============================================================
     MISSION COOLDOWN — survives reload
     ============================================================ */
  const COOLDOWN_MS = 10 * 60 * 1000;
  S.COOLDOWN_MS = COOLDOWN_MS;

  G.coolLeft = function (key) {
    const until = (this.save.cooldowns || {})[key];
    if (!until) return 0;
    const left = until - Date.now();
    if (left <= 0) { delete this.save.cooldowns[key]; this.persist(); return 0; }
    return left;
  };
  G.coolText = function (ms) {
    const t = Math.max(0, Math.ceil(ms / 1000));
    return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
  };
  G.startCooldown = function (key) {
    this.save.cooldowns = this.save.cooldowns || {};
    this.save.cooldowns[key] = Date.now() + COOLDOWN_MS;
    if (this.cases.some(function (c) { return c.id === key; })) delete this.save.progress[key];
    this.persist();
  };

  /* ============================================================
     DAILY CHALLENGE
     ============================================================ */
  function dayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  S.dayKey = dayKey;
  G.dailyReady = function () { return this.save.daily.day !== dayKey(); };
  S.claimDaily = function () {
    const day = dayKey();
    if (G.save.daily.day === day) { G.toast('Today\'s challenge is already filed.', 'clock'); return; }
    G.save.daily.day = day;
    G.save.daily.done = true;
    const y = new Date(Date.now() - 864e5);
    const yk = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
    G.save.daily.streak = (G.save.daily.lastDay === yk ? (G.save.daily.streak || 0) + 1 : 1);
    G.save.daily.lastDay = day;
    G.ipAdd(15, 'daily');
    G.persist();
    G.toast('<b>Daily challenge complete.</b> +15 investigation points.', 'badge', 5000);
  };

  /* ============================================================
     DETECTIVE'S EXAMINATION — the zero-points quiz
     ============================================================ */
  const BANK = [
    { k: 'Logic', q: 'All crows in the yard are black. You see a white bird in the yard. What must be true?', o: ['It is not a crow', 'It is a painted crow', 'All white birds are crows', 'Nothing can be concluded'], c: 0 },
    { k: 'Logic', q: 'A is taller than B. B is taller than C. Who is shortest?', o: ['A', 'B', 'C', 'Cannot tell'], c: 2 },
    { k: 'Logic', q: 'If the lamp is on, the door is locked. The door is not locked. What follows?', o: ['The lamp is off', 'The lamp is on', 'The door is broken', 'Nothing'], c: 0 },
    { k: 'Pattern', q: 'What comes next: 2, 6, 12, 20, 30, ?', o: ['36', '40', '42', '44'], c: 2 },
    { k: 'Pattern', q: 'What comes next: 1, 1, 2, 3, 5, 8, ?', o: ['11', '12', '13', '15'], c: 2 },
    { k: 'Pattern', q: 'Odd one out: fork, spoon, knife, plate.', o: ['Fork', 'Spoon', 'Knife', 'Plate'], c: 3 },
    { k: 'Pattern', q: 'Letters: A, C, E, G, ?', o: ['H', 'I', 'J', 'K'], c: 1 },
    { k: 'Observation', q: 'A room has four corners. A chair sits in each corner. A cat sits on each chair. How many cats?', o: ['One', 'Two', 'Four', 'Eight'], c: 2 },
    { k: 'Observation', q: 'A man walks into a bar and asks for water. The bartender points a gun at him. The man says thanks and leaves. Why?', o: ['He was thirsty', 'He had hiccups', 'He was robbed', 'He wanted a refund'], c: 1 },
    { k: 'Observation', q: 'Which detail is least useful when dating a photograph?', o: ['A car model', 'The weather', 'The photographer\'s opinion', 'A shop sign'], c: 2 },
    { k: 'Memory', q: 'Remember: 4-7-1-9. Which sequence did you just read?', o: ['4-7-1-9', '4-1-7-9', '7-4-9-1', '9-1-7-4'], c: 0 },
    { k: 'Memory', q: 'Remember the words: lantern, copper, ribbon. Which appeared?', o: ['Lantern', 'Anchor', 'Ribbon', 'Both A and C'], c: 3 },
    { k: 'Reasoning', q: 'A footprint is deeper at the heel than the toe. What does that suggest?', o: ['Running forward', 'Standing still', 'Walking backward', 'Barefoot only'], c: 2 },
    { k: 'Reasoning', q: 'A window is broken outward. What is most likely?', o: ['Someone broke in', 'Something was thrown out', 'The wind did it', 'The glass was old'], c: 1 },
    { k: 'Reasoning', q: 'A suspect\'s alibi is confirmed by three friends. What should you still check?', o: ['Their friendship', 'The time and place', 'Their shoes', 'Their handwriting'], c: 1 },
    { k: 'Forensics', q: 'What does a blood-spatter pattern mainly help establish?', o: ['Motive', 'Direction and force', 'The victim\'s name', 'The weather'], c: 1 },
    { k: 'Forensics', q: 'Which is the best control sample in a handwriting comparison?', o: ['A typed letter', 'A known sample written at the time', 'A signature from memory', 'A photocopy'], c: 1 },
    { k: 'Forensics', q: 'A body is colder than the room. What does that usually mean?', o: ['It was moved from a warmer place', 'It has been there longer than expected', 'It was frozen first', 'Nothing at all'], c: 0 },
    { k: 'Codes', q: 'If A=1, B=2, C=3, what is CAB?', o: ['312', '123', '231', '321'], c: 0 },
    { k: 'Codes', q: 'ROT13 turns A into N. What does URN turn into?', o: ['HEA', 'HEN', 'SHE', 'HER'], c: 0 },
    { k: 'Codes', q: 'A four-digit code uses each of 1-2-3-4 once. How many arrangements exist?', o: ['12', '16', '24', '256'], c: 2 },
    { k: 'General', q: 'What does a barometer measure?', o: ['Humidity', 'Air pressure', 'Wind speed', 'Temperature'], c: 1 },
    { k: 'General', q: 'In a criminal trial, who presents the case against the accused?', o: ['The judge', 'The defence', 'The prosecution', 'The clerk'], c: 2 },
    { k: 'General', q: 'What is the term for evidence that merely suggests rather than proves?', o: ['Circumstantial', 'Hearsay', 'Direct', 'Forensic'], c: 0 },
    { k: 'General', q: 'Which unit is used for sound frequency?', o: ['Decibel', 'Hertz', 'Watt', 'Lumen'], c: 1 },
    { k: 'Deduction', q: 'A door is locked from the inside, the window is latched, and the key is on the table. What is the simplest explanation?', o: ['A secret passage', 'The victim locked it themselves', 'A duplicate key', 'The lock is fake'], c: 1 }
  ];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  const Exam = S.Exam = {
    open(opts) {
      opts = opts || {};
      const state = G.save.exam = G.save.exam || { last: 0, seen: [] };
      const quiz = [];
      const pool = BANK.filter(function (q) { return state.seen.indexOf(q.q) < 0; });
      const src = pool.length >= 5 ? pool : BANK;
      shuffle(src).slice(0, 5).forEach(function (q) {
        const order = shuffle([0, 1, 2, 3]);
        quiz.push({
          k: q.k, q: q.q,
          o: order.map(function (i) { return q.o[i]; }),
          c: order.indexOf(q.c)
        });
      });
      state.seen = (state.seen || []).concat(quiz.map(function (q) { return q.q; })).slice(-40);
      let idx = 0, score = 0, answered = 0;
      const m = G.modal({
        title: opts.daily ? 'Daily Challenge' : 'Detective\'s Examination',
        sub: opts.daily ? 'Five questions · +15 points' : 'Mixed reasoning · earn investigation points',
        icon: 'book', wide: false,
        body: '<div class="exam-intro">' +
          (opts.broke ? '<div class="verdict-note" style="margin:0 0 14px">' + A.icon('alert') + ' You need <b>' + (opts.need || 5) + ' IP</b> for that. ' + (opts.reason || '') + '</div>' : '') +
          '<p style="margin-bottom:12px">Answer five questions. Each correct answer earns <b style="color:#a7f3d0">+8 IP</b>. Wrong answers cost nothing. The file stays open until you close it.</p>' +
          '<div class="exam-progress"><span id="exCount">Question 1 of 5</span><span id="exScore">0 correct</span></div>' +
          '<div id="exBody"></div></div>',
        footer: '<button class="btn" id="exQuit">Leave the examination</button>'
      });
      const body = m.modal.querySelector('#exBody');
      const countEl = m.modal.querySelector('#exCount');
      const scoreEl = m.modal.querySelector('#exScore');
      m.modal.querySelector('#exQuit').onclick = function () { finish(true); };

      function finish(early) {
        if (m.modal.querySelector('#exDone')) return;
        const earn = score * 8;
        if (earn > 0) G.ipAdd(earn, 'exam');
        if (opts.daily && !early && G.save.daily.day !== S.dayKey()) {
          G.save.daily.day = S.dayKey();
          G.save.daily.done = true;
          G.ipAdd(15, 'daily');
        }
        if (!early && score === 5) G.ach('exam-perfect');
        body.innerHTML = '<div class="exam-done">' +
          '<div class="score">' + score + ' / 5</div>' +
          '<h3>' + (score === 5 ? 'Perfect file.' : score >= 3 ? 'Solid deduction.' : 'Keep sharpening the lens.') + '</h3>' +
          '<p>' + (earn > 0 ? 'Earned <b style="color:#a7f3d0">+' + earn + ' IP</b>.' : 'No points this time. Nothing lost.') +
          (opts.daily && !early ? ' Daily challenge filed: <b style="color:#a7f3d0">+15 IP</b>.' : '') + '</p>' +
          '<p style="font-size:12px;color:var(--dim)">Practice any time from the workshop — results feed your investigation fund.</p>' +
          '</div>';
        m.modal.querySelector('#exQuit').textContent = 'Close';
        m.modal.querySelector('#exQuit').onclick = m.close;
        m.modal.querySelector('#exQuit').className = 'btn btn-primary';
        G.sound(score >= 3 ? 'good' : 'click');
        if (G.save.daily.day !== S.dayKey() && opts.daily) G.persist();
      }

      function paint() {
        if (idx >= quiz.length) { finish(false); return; }
        const q = quiz[idx];
        countEl.textContent = 'Question ' + (idx + 1) + ' of 5';
        scoreEl.textContent = score + ' correct';
        body.innerHTML = '<div class="exam-kicker">' + A.esc(q.k) + '</div>' +
          '<div class="exam-q">' + A.esc(q.q) + '</div>' +
          '<div class="choice-list">' + q.o.map(function (t, i) {
            return '<button class="choice" data-i="' + i + '"><span class="k">' + String.fromCharCode(65 + i) + '</span><span>' + A.esc(t) + '</span></button>';
          }).join('') + '</div>';
        body.querySelectorAll('.choice').forEach(function (b) {
          b.onclick = function () {
            if (answered) return;
            answered = 1;
            const i = +b.dataset.i;
            body.querySelectorAll('.choice').forEach(function (x) { x.disabled = true; });
            if (i === q.c) { b.classList.add('sel'); score++; G.sound('good'); S.haptic('good'); }
            else {
              b.classList.add('bad');
              body.querySelectorAll('.choice')[q.c].classList.add('sel');
              G.sound('bad'); S.haptic('bad');
            }
            scoreEl.textContent = score + ' correct';
            setTimeout(function () { idx++; answered = 0; paint(); }, 750);
          };
        });
      }
      paint();
      G.sound('paper');
    }
  };

  /* ============================================================
     SETTINGS APPLICATION
     ============================================================ */
  S.applySettings = function () {
    const st = G.save.settings;
    document.body.classList.toggle('stream-mode', !!st.stream);
    document.body.classList.toggle('big-text', st.text === 'large');
    Audio.apply();
    if (!st.music) Audio.stop();
  };

  /* keyboard: Esc handling for exam is handled by modal */
  G.ready = true;
})();
