/* ============================================================
   Game core — state, save, audio, toasts, modals
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  window.SH = window.SH || { cases: [] };

  const KEY = 'sharlock_holmes_save_v1';
  const DEFAULT_SETTINGS = { text: 'normal', sound: false, hints: true, stream: false };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        s.settings = Object.assign({}, DEFAULT_SETTINGS, s.settings || {});
        s.progress = s.progress || {};
        return s;
      }
    } catch (e) { /* ignore */ }
    return { v: 1, progress: {}, settings: Object.assign({}, DEFAULT_SETTINGS), last: null };
  }

  const Game = window.Game = {
    cases: SH.cases,
    save: load(),
    active: null,
    state: null,
    railTab: 'evidence',
    audioCtx: null,

    /* ---- persistence ---- */
    persist() {
      try { localStorage.setItem(KEY, JSON.stringify(this.save)); } catch (e) { /* storage blocked */ }
    },
    reset() {
      this.save = { v: 1, progress: {}, settings: Object.assign({}, DEFAULT_SETTINGS), last: null };
      this.persist();
    },
    progress(id) {
      let p = this.save.progress[id];
      if (!p) {
        p = this.save.progress[id] = {
          found: [], done: [], flags: {}, asked: {}, log: [],
          hints: 0, wrong: 0, solved: false, stars: 0, opened: false, loc: null
        };
      }
      p.found = p.found || []; p.done = p.done || []; p.flags = p.flags || {}; p.asked = p.asked || {};
      p.log = p.log || []; p.hints = p.hints || 0; p.wrong = p.wrong || 0;
      return p;
    },
    caseById(id) { return this.cases.find(c => c.id === id); },
    solvedCount() { return Object.values(this.save.progress).filter(p => p.solved).length; },
    totalStars() { return Object.values(this.save.progress).reduce((a, p) => a + (p.stars || 0), 0); },

    rank() {
      const n = this.solvedCount();
      const tiers = [
        [0, 'Rookie'], [2, 'Constable'], [5, 'Investigator'], [9, 'Detective'],
        [14, 'Inspector'], [19, 'Chief Inspector'], [23, 'Master Sleuth'], [25, 'The Sharlock']
      ];
      let r = tiers[0][1], next = null;
      for (let i = 0; i < tiers.length; i++) {
        if (n >= tiers[i][0]) r = tiers[i][1];
        if (n < tiers[i][0] && !next) next = tiers[i];
      }
      return { title: r, solved: n, next: next ? next[0] : null, nextTitle: next ? next[1] : null };
    },

    /* ---- navigation ---- */
    showScreen(name) {
      ['title', 'cases', 'case'].forEach(n => {
        const el = document.getElementById('screen-' + n);
        if (el) el.classList.toggle('is-active', n === name);
      });
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      document.body.classList.toggle('stream-mode', !!this.save.settings.stream);
      document.body.classList.toggle('big-text', this.save.settings.text === 'large');
    },

    /* ---- modal ---- */
    modal(opts) {
      opts = opts || {};
      const back = document.createElement('div');
      back.className = 'modal-back';
      const m = document.createElement('div');
      m.className = 'modal' + (opts.wide ? ' wide' : '') + (opts.slim ? ' slim' : '');
      m.innerHTML = `<div class="modal-head">
          <div class="ih">${A.icon(opts.icon || 'folder')}</div>
          <div style="flex:1;min-width:0"><h2>${opts.title || ''}</h2>${opts.sub ? `<div class="sub">${opts.sub}</div>` : ''}</div>
          <button class="btn icon-btn x" aria-label="Close">${A.icon('x')}</button>
        </div>
        <div class="modal-body">${opts.body || ''}</div>
        ${opts.footer ? `<div class="modal-foot">${opts.footer}</div>` : ''}`;
      back.appendChild(m);
      document.getElementById('modal-root').appendChild(back);
      const close = () => { back.style.animation = 'fadein .16s ease reverse both'; setTimeout(() => back.remove(), 140); if (opts.onClose) opts.onClose(); };
      m.querySelector('.x').onclick = close;
      back.addEventListener('mousedown', e => { if (e.target === back) close(); });
      setTimeout(() => {
        const f = m.querySelector('.modal-foot .btn-primary, .modal-foot .btn, .modal-body input');
        if (f) f.focus();
      }, 80);
      return { back, modal: m, close, body: m.querySelector('.modal-body') };
    },

    closeAllModals() {
      document.querySelectorAll('#modal-root .modal-back').forEach(n => n.remove());
    },

    /* ---- toasts ---- */
    toast(html, icon, ms) {
      const root = document.getElementById('toasts');
      if (!root) return;
      const t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML = `<div class="ti">${A.icon(icon || 'spark')}</div><div>${html}</div>`;
      root.appendChild(t);
      setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, ms || 4200);
    },

    /* ---- sound ---- */
    sound(kind) {
      if (!this.save.settings.sound) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!this.audioCtx) this.audioCtx = new Ctx();
        const ctx = this.audioCtx;
        if (ctx.state === 'suspended') ctx.resume();
        const map = {
          click: [520, .04, 'square', .03],
          tick: [880, .035, 'sine', .025],
          good: [660, .16, 'sine', .07],
          bad: [150, .18, 'sawtooth', .05],
          stamp: [90, .3, 'triangle', .12]
        };
        const cfg = map[kind] || map.click;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = cfg[2]; o.frequency.value = cfg[0];
        g.gain.setValueAtTime(cfg[3], ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + cfg[1]);
        o.connect(g); g.connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + cfg[1] + .02);
        if (kind === 'good') {
          const o2 = ctx.createOscillator(), g2 = ctx.createGain();
          o2.type = 'sine'; o2.frequency.value = 990;
          g2.gain.setValueAtTime(.0001, ctx.currentTime);
          g2.gain.exponentialRampToValueAtTime(.05, ctx.currentTime + .09);
          g2.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .3);
          o2.connect(g2); g2.connect(ctx.destination);
          o2.start(ctx.currentTime + .08); o2.stop(ctx.currentTime + .32);
        }
      } catch (e) { /* no audio */ }
    },

    /* ---- case state helpers ---- */
    log(kind, text) {
      if (!this.state || text == null) return;
      const arr = [].concat(text);
      arr.forEach(t => {
        if (!t) return;
        this.state.log.push({ k: kind || 'narr', t: String(t) });
      });
      if (this.state.log.length > 80) this.state.log.splice(0, this.state.log.length - 80);
      this.persist();
    },
    hasClue(id) { return this.state && this.state.found.includes(id); },
    hasFlag(id) { return !!(this.state && this.state.flags[id]); },
    cluesFor(c) { return (c && c.clues) || {}; },
    clueName(c, id) { const cl = c.clues && c.clues[id]; return cl ? cl.name : id; },
    missingRequirement(c, req) {
      if (!req) return null;
      const flags = req.flags || [];
      const clues = req.clues || req.requires || [];
      for (const f of flags) if (!this.hasFlag(f)) return req.flagLabel || 'more investigation';
      for (const id of clues) if (!this.hasClue(id)) return this.clueName(c, id);
      return null;
    },
    addClue(id, silent) {
      if (!this.state || !id) return false;
      if (this.state.found.includes(id)) return false;
      this.state.found.push(id);
      if (!silent) {
        const c = this.active;
        this.toast('<b>New evidence:</b> ' + A.esc(this.clueName(c, id)), 'search', 3600);
        this.sound('good');
      }
      this.persist();
      return true;
    },
    granted(ids) {
      if (!ids) return;
      [].concat(ids).forEach(id => this.addClue(id));
    },
    addLogAndRender() { if (window.CaseView) CaseView.render(); }
  };

  Game.openCase = function (id) { if (window.CaseView) CaseView.open(id); };
  Game.saveSettings = function (patch) {
    Object.assign(this.save.settings, patch);
    this.persist();
    document.body.classList.toggle('stream-mode', !!this.save.settings.stream);
    document.body.classList.toggle('big-text', this.save.settings.text === 'large');
  };
})();
