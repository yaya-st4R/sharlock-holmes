/* ============================================================
   Puzzles B — sequence, hotspot search, wire repair,
   photo enhancement, audio, chemical mix
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  const P = window.Puzzles;
  const { el, norm } = P.util;

  function hash(s) {
    let h = 0; s = String(s);
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }

  /* ---------- ordered sequence / timeline ---------- */
  P.types.sequence = function (pz, api) {
    const items = (pz.items || []).map((it, i) => ({ ...it, _i: i }));
    const correct = [...items].sort((a, b) => (a.order == null ? a._i : a.order) - (b.order == null ? b._i : b.order));
    const shuffled = [...items].sort((a, b) => hash(String(a.t) + a._i) - hash(String(b.t) + b._i));
    let chosen = [];
    const wrap = el('div', pz.variant === 'strips' ? 'strips' : '');
    wrap.innerHTML = `<div class="seq-board"></div><div class="seq-pool"></div><div class="seq-foot">
      <button class="btn btn-sm clear">Reset</button><button class="btn btn-primary check">Confirm order</button></div>`;
    api.stage.appendChild(wrap);
    const board = wrap.querySelector('.seq-board');
    const pool = wrap.querySelector('.seq-pool');
    function paint() {
      board.innerHTML = correct.map((_, i) => {
        const it = chosen[i];
        return `<div class="seq-slot ${it ? 'filled' : ''}" data-slot="${i}">
          <span class="idx">${String(i + 1).padStart(2, '0')}</span>
          ${it ? `<span>${it.t}${it.sub ? ` <span style="color:var(--dim);font-size:10px">— ${it.sub}</span>` : ''}</span>` : '<span style="opacity:.5">—</span>'}
        </div>`;
      }).join('');
      pool.innerHTML = shuffled.map(it => {
        const used = chosen.includes(it);
        return `<button class="seq-item ${used ? 'used' : ''}" data-i="${it._i}">
          ${it.t}<span class="t">${it.sub || ''}</span></button>`;
      }).join('');
      pool.querySelectorAll('.seq-item').forEach(b => b.onclick = () => {
        const it = items.find(x => x._i === +b.dataset.i);
        if (!chosen.includes(it) && chosen.length < correct.length) { chosen.push(it); sound('tick'); paint(); }
      });
      board.querySelectorAll('.seq-slot').forEach(s => s.onclick = () => {
        const i = +s.dataset.slot;
        if (chosen[i]) { chosen.splice(i, 1); sound('click'); paint(); }
      });
    }
    function sound(k) { if (window.Game && Game.sound) Game.sound(k); }
    wrap.querySelector('.clear').onclick = () => { chosen = []; paint(); };
    wrap.querySelector('.check').onclick = () => {
      if (chosen.length < correct.length) { api.note('Place every card before confirming.'); return; }
      const ok = chosen.every((it, i) => it === correct[i]);
      if (ok) api.solve(pz.success);
      else { api.note(pz.wrong || 'The order is wrong. Someone could not have been in two places at once.'); api.shake(); chosen = []; paint(); }
    };
    paint();
  };

  /* ---------- click-to-find hotspots ---------- */
  P.types.hotspot = function (pz, api) {
    const sceneOpts = Object.assign({}, typeof pz.scene === 'object' ? pz.scene : { kind: pz.scene });
    const art = A.scene(sceneOpts.kind || 'interior', sceneOpts);
    const targets = (pz.targets || []).map((t, i) => ({ ...t, _i: i, found: false }));
    const wrap = el('div');
    wrap.innerHTML = `<div class="hotspot-stage">${art}<div class="scan"></div></div>
      <div class="hs-list">${targets.map(t => `<span class="hs-tag" data-t="${t._i}">${A.esc(t.label)}</span>`).join('')}</div>
      <div class="pz-note">${A.esc(pz.note || 'Click directly on the detail. A magnifier helps: look for things that do not belong.')}</div>`;
    api.stage.appendChild(wrap);
    const stage = wrap.querySelector('.hotspot-stage');
    stage.style.cursor = 'crosshair';
    stage.onclick = (e) => {
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      let hit = null;
      targets.forEach(t => {
        if (t.found) return;
        const d = Math.hypot(x - t.x, y * 0.5625 - t.y * 0.5625);
        if (d < (t.r || 5.5)) hit = t;
      });
      if (hit) {
        hit.found = true;
        const mark = el('div', 'mark');
        mark.style.left = hit.x + '%'; mark.style.top = hit.y + '%';
        stage.appendChild(mark);
        wrap.querySelector(`.hs-tag[data-t="${hit._i}"]`).classList.add('found');
        sound('tick');
        api.note(hit.text || ('Found: ' + hit.label), true);
        if (targets.every(t => t.found)) api.solve(pz.success || 'You have found everything hidden in this scene.');
      } else {
        const m = el('div', 'miss');
        m.style.left = x + '%'; m.style.top = y + '%';
        stage.appendChild(m);
        setTimeout(() => m.remove(), 700);
        sound('bad');
      }
    };
  };

  /* ---------- wire repair ---------- */
  P.types.repair = function (pz, api) {
    const pairs = (pz.pairs || []).map((p, i) => ({ ...p, _i: i, done: false }));
    const left = pairs;
    const right = [...pairs].sort((a, b) => hash(a.r) - hash(b.r));
    let sel = null;
    const wrap = el('div', '');
    const board = el('div', 'wire-board');
    wrap.appendChild(board);
    const note = el('div', 'pz-note', A.esc(pz.note || 'Click a socket on the left, then its matching socket on the right.'));
    wrap.appendChild(note);
    const legend = el('div', 'hs-list', pairs.map(p => `<span class="hs-tag" style="color:${p.color};border-color:${p.color}66">${A.esc(p.l)} → ${A.esc(p.r)}</span>`).join(''));
    wrap.appendChild(legend);
    api.stage.appendChild(wrap);
    const rows = pairs.length;
    function yPct(i) { return 18 + (i * (64 / Math.max(1, rows - 1))); }
    function paint() {
      const lines = pairs.filter(p => p.done).map(p => {
        const li = left.findIndex(x => x._i === p._i), ri = right.findIndex(x => x._i === p._i);
        return `<path d="M14 ${yPct(li)} C 40 ${yPct(li)}, 60 ${yPct(ri)}, 86 ${yPct(ri)}" fill="none" stroke="${p.color}" stroke-width="2.2" opacity=".8"/>`;
      }).join('');
      board.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:100%">
        <rect width="100" height="100" fill="none"/>
        <g opacity=".15" stroke="#a855f7">${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${i * 12.5}h100M${i * 12.5} 0v100"/>`).join('')}</g>
        ${lines}</svg>`;
      // sockets
      left.forEach((p, i) => {
        const b = el('button', 'wire-socket');
        b.style.cssText = `left:14%;top:${yPct(i)}%;background:${p.color};border-color:#0a0612`;
        b.title = p.l;
        if (sel === p._i) b.classList.add('sel');
        if (p.done) b.classList.add('done');
        b.onclick = (e) => { e.stopPropagation(); if (p.done) return; sel = (sel === p._i ? null : p._i); sound('click'); paint(); };
        board.appendChild(b);
        const lab = el('div', 'wire-label', A.esc(p.l));
        lab.style.cssText = `left:17%;top:${yPct(i)}%;transform:translateY(-50%)`;
        board.appendChild(lab);
      });
      right.forEach((p, i) => {
        const b = el('button', 'wire-socket');
        b.style.cssText = `left:86%;top:${yPct(i)}%;background:${p.color};border-color:#0a0612`;
        b.title = p.r;
        if (p.done) b.classList.add('done');
        b.onclick = (e) => {
          e.stopPropagation();
          if (p.done) return;
          if (sel == null) { api.note('Pick a socket on the left first.'); return; }
          const lp = pairs.find(x => x._i === sel);
          if (lp._i === p._i) {
            p.done = true; lp.done = true; sel = null; sound('good');
            api.note('Connection made: ' + lp.l + ' → ' + lp.r, true);
            paint();
            if (pairs.every(x => x.done)) api.solve(pz.success || 'The last connection clicks home. Power hums through the board.');
          } else {
            sound('bad');
            api.note('Wrong socket. That would short the whole panel.');
            const old = sel; sel = null; paint();
            setTimeout(() => { if (!document.body.contains(board)) return; }, 50);
            if (old != null) { /* leave deselected */ }
          }
        };
        board.appendChild(b);
        const lab = el('div', 'wire-label', A.esc(p.r));
        lab.style.cssText = `right:17%;top:${yPct(i)}%;transform:translateY(-50%);text-align:right`;
        board.appendChild(lab);
      });
    }
    function sound(k) { if (window.Game && Game.sound) Game.sound(k); }
    paint();
  };

  /* ---------- photo enhancement ---------- */
  P.types.photo = function (pz, api) {
    const sc = Object.assign({}, typeof pz.scene === 'object' ? pz.scene : { kind: pz.scene || 'street' });
    const art = A.scene(sc.kind || 'street', sc);
    const target = pz.target || { x: 50, y: 50, w: 12, h: 16 };
    const range = pz.range || [55, 75];
    const wrap = el('div', '');
    wrap.innerHTML = `
      <div class="photo-enh">
        ${art}
        <div class="target-glow" style="left:${target.x - (target.w || 10) / 2}%;top:${target.y - (target.h || 12) / 2}%;width:${target.w || 10}%;height:${target.h || 12}%"></div>
        <div class="veil" style="opacity:.94;backdrop-filter:blur(10px)"></div>
        <div class="zoom-lbl">ENHANCE 0%</div>
      </div>
      <div class="slider-row"><label>Enhance</label>
        <input type="range" min="0" max="100" value="0" aria-label="Enhance image">
        <span class="v">0%</span></div>
      <div class="reveal-text pz-note" style="min-height:38px"></div>
      <div class="photo-choices" style="display:none">
        <div style="font-family:var(--display);font-size:17px;margin:12px 0 2px">${A.esc(pz.question || 'What do you see?')}</div>
        <div class="choice-list"></div>
        <button class="btn btn-primary confirm" style="margin-top:10px">Confirm</button>
      </div>`;
    api.stage.appendChild(wrap);
    const rangeEl = wrap.querySelector('input[type=range]');
    const veil = wrap.querySelector('.veil');
    const glow = wrap.querySelector('.target-glow');
    const lbl = wrap.querySelector('.zoom-lbl');
    const v = wrap.querySelector('.v');
    const rev = wrap.querySelector('.reveal-text');
    const choices = wrap.querySelector('.photo-choices');
    let picked = null;
    (pz.options || []).forEach((o, i) => {
      const b = el('button', 'choice', `<span class="k">${String.fromCharCode(65 + i)}</span><span>${A.esc(o.t)}</span>`);
      b.onclick = () => { choices.querySelectorAll('.choice').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); picked = o.v; };
      choices.querySelector('.choice-list').appendChild(b);
    });
    let revealed = false;
    rangeEl.oninput = () => {
      const n = Number(rangeEl.value);
      v.textContent = n + '%';
      lbl.textContent = 'ENHANCE ' + n + '%';
      const inRange = n >= range[0] && n <= range[1];
      veil.style.opacity = inRange ? '.05' : String(Math.max(.1, .95 - n * .008));
      veil.style.backdropFilter = inRange ? 'blur(0px)' : `blur(${Math.max(0, 10 - n * .1)}px)`;
      glow.style.opacity = inRange ? '1' : '0';
      if (inRange && !revealed) {
        revealed = true;
        rev.style.color = '#a7f3d0';
        rev.innerHTML = A.esc(pz.reveal || 'The image resolves. There it is.');
        choices.style.display = 'block';
        sound('good');
      } else if (!inRange) {
        revealed = false;
        rev.style.color = '';
        rev.innerHTML = '';
        choices.style.display = 'none';
      }
    };
    choices.querySelector('.confirm').onclick = () => {
      if (picked == null) { api.note('Look closely, then choose what you found.'); return; }
      if (String(picked) === String(pz.answer)) api.solve(pz.success);
      else { api.note(pz.wrong || 'That is not what the enhanced image shows. Slide again.'); api.shake(); }
    };
    function sound(k) { if (window.Game && Game.sound) Game.sound(k); }
  };

  /* ---------- audio analysis ---------- */
  P.types.audio = function (pz, api) {
    let picked = null;
    const wrap = el('div', '');
    wrap.innerHTML = `<div class="audio-vis">${Array.from({ length: 28 }, (_, i) => `<i style="animation-delay:${(i * .04).toFixed(2)}s"></i>`).join('')}</div>
      <div class="audio-ctl">
        <button class="btn btn-primary play">${A.icon('play')} Play recording</button>
        <button class="btn btn-sm waveform">Describe waveform</button>
      </div>
      <div class="pz-note wftext" style="min-height:30px"></div>
      <div class="choice-list"></div>
      <button class="btn btn-primary confirm" style="margin-top:12px">Confirm analysis</button>`;
    api.stage.appendChild(wrap);
    const vis = wrap.querySelector('.audio-vis');
    (pz.options || []).forEach((o, i) => {
      const b = el('button', 'choice', `<span class="k">${String.fromCharCode(65 + i)}</span><span>${A.esc(o.t)}</span>`);
      b.onclick = () => { wrap.querySelectorAll('.choice').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); picked = o.v; sound('click'); };
      wrap.querySelector('.choice-list').appendChild(b);
    });
    const pattern = pz.pattern || [660, 660, 0, 440];
    let AC = null;
    function play() {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!AC) AC = new Ctx();
        if (AC.state === 'suspended') AC.resume();
        vis.classList.add('playing');
        const beat = pz.tempo || .32;
        pattern.forEach((f, i) => {
          if (!f) return;
          const t = AC.currentTime + i * beat;
          const osc = AC.createOscillator(), g = AC.createGain();
          osc.type = pz.tone || 'sine';
          osc.frequency.value = f;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(.18, t + .015);
          g.gain.exponentialRampToValueAtTime(.0001, t + beat * .8);
          osc.connect(g); g.connect(AC.destination);
          osc.start(t); osc.stop(t + beat * .85);
        });
        setTimeout(() => vis.classList.remove('playing'), pattern.length * beat * 1000 + 200);
      } catch (e) { /* ignore */ }
    }
    wrap.querySelector('.play').onclick = play;
    wrap.querySelector('.waveform').onclick = () => {
      wrap.querySelector('.wftext').innerHTML = A.esc(pz.waveform || 'The waveform shows a pattern of tones and pauses.');
      wrap.querySelector('.wftext').style.color = '#c9a4ff';
    };
    wrap.querySelector('.confirm').onclick = () => {
      if (picked == null) { api.note('Choose an analysis first.'); return; }
      if (String(picked) === String(pz.answer)) api.solve(pz.success);
      else { api.note(pz.wrong || 'That does not match the recording. Listen again.'); api.shake(); }
    };
    function sound(k) { if (window.Game && Game.sound) Game.sound(k); }
  };

  /* ---------- chemical mix ---------- */
  P.types.mix = function (pz, api) {
    const reagents = pz.reagents || [];
    const order = pz.order || [];
    let picked = [];
    const wrap = el('div', '');
    wrap.innerHTML = `<div class="mix-scene">
        <div class="mix-shelf"></div>
        <div class="beaker"><div class="glass"><div class="liquid" style="height:0"></div></div><div class="rim"></div></div>
      </div>
      <div class="mix-order"></div>
      <div class="pz-note" style="margin-top:8px">${A.esc(pz.note || 'Add the reagents in the correct order. One wrong drop and the sample is ruined.')}</div>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-sm reset">Empty beaker</button>
        <button class="btn btn-primary test">Run test</button>
      </div>`;
    api.stage.appendChild(wrap);
    const shelf = wrap.querySelector('.mix-shelf');
    const liquid = wrap.querySelector('.liquid');
    const orderEl = wrap.querySelector('.mix-order');
    function paint() {
      shelf.innerHTML = reagents.map((r, i) => `<button class="reagent" data-i="${i}" ${picked.includes(i) ? 'disabled' : ''}>
        <span class="sw" style="background:${r.color};color:${r.color}"></span>${A.esc(r.name)}</button>`).join('');
      orderEl.innerHTML = picked.map(i => `<span style="color:${reagents[i].color}">${A.esc(reagents[i].name)}</span>`).join('');
      const pct = Math.min(92, picked.length * 26);
      liquid.style.height = pct + '%';
      liquid.style.background = picked.length ? reagents[picked[picked.length - 1]].color : 'transparent';
      shelf.querySelectorAll('.reagent').forEach(b => b.onclick = () => {
        const i = +b.dataset.i;
        if (picked.includes(i)) return;
        picked.push(i); sound('tick'); paint();
      });
    }
    function sound(k) { if (window.Game && Game.sound) Game.sound(k); }
    wrap.querySelector('.reset').onclick = () => { picked = []; paint(); api.note(''); };
    wrap.querySelector('.test').onclick = () => {
      if (picked.length < order.length) { api.note('The mixture is incomplete. Add every reagent.'); return; }
      const ok = picked.every((v, i) => v === order[i]);
      if (ok) api.solve(pz.success);
      else {
        api.note(pz.wrong || 'The liquid turns black and hisses. Wrong order — start again.');
        liquid.style.background = '#0a0a0a';
        api.shake();
        setTimeout(() => { picked = []; paint(); }, 700);
      }
    };
    paint();
  };
})();
