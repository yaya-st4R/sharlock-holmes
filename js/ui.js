/* ============================================================
   UI — title screen, case files, settings, how to play
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  const G = window.Game;
  const esc = A.esc;

  const UI = window.UI = {
    filter: 'all',

    /* ============================================================
       HOMEPAGE — minimal, centred, atmospheric
       ============================================================ */
    showTitle() {
      G.showScreen('title');
      document.title = 'Sharlock Holmes — Think Deeper';
      document.body.classList.remove('ws-mode');
      const root = document.getElementById('screen-title');
      const solved = G.solvedCount();
      const total = G.cases.length;
      const rank = G.rank();

      root.innerHTML = `
      <div class="home-min">
        <div class="hm-art" aria-hidden="true">${A.hero()}</div>
        <div class="hm-veil" aria-hidden="true"></div>
        <div class="hm-inner">
          <div class="hm-mark">${A.logoMark()}</div>
          <div class="hm-kicker">A detective investigation game</div>
          <h1 class="hm-title">Think deeper.<br>Look closer.<br><span>Solve the mystery.</span></h1>
          <p class="hm-sub">Thirty case files. One workshop. Nothing is quite what it seems.</p>
          <button class="hm-start" data-go="start">Start investigating</button>
          <div class="hm-meta">
            <span><b>${total}</b> cases</span>
            <span><b>${solved}</b> closed</span>
            <span><b>${G.save.ip}</b> IP</span>
            <span><b>${esc(rank.title)}</b></span>
          </div>
          <div class="hm-links">
            <button data-go="settings">Settings</button>
            <button data-go="help">How to play</button>
            ${solved ? '<button data-go="cases">Case files</button>' : ''}
          </div>
        </div>
        <div class="hm-credit">An original fictional anthology · inspired by real forensic method</div>
      </div>`;

      root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
        const go = b.dataset.go;
        if (go === 'start') {
          if (window.SH && SH.Audio) SH.Audio.unlock();
          if (window.SH && SH.Workshop) SH.Workshop.show();
        } else if (go === 'cases') UI.showCases();
        else if (go === 'help') UI.help();
        else if (go === 'settings') UI.settings();
      });
      if (window.SH && SH.Audio) SH.Audio.music('title');
    },

    /* ============================================================
       CASE FILES
       ============================================================ */
    showCases() {
      G.showScreen('cases');
      document.body.classList.remove('ws-mode');
      document.title = 'Case Files — Sharlock Holmes';
      if (window.SH && SH.Audio) SH.Audio.music('workshop');
      const root = document.getElementById('screen-cases');
      const rank = G.rank();
      const solved = G.solvedCount();
      const total = G.cases.length;
      const pct = Math.round((solved / Math.max(1, total)) * 100);
      const maxNum = G.cases.reduce((m, c) => Math.max(m, c.num || 0), 0);
      const list = G.cases.slice().sort((a, b) => a.num - b.num).filter(c => {
        const p = G.progress(c.id);
        if (UI.filter === 'open') return !p.solved;
        if (UI.filter === 'closed') return p.solved;
        return true;
      });
      const cards = list.map(c => {
        const p = G.progress(c.id);
        const cover = Object.assign({}, c.cover || { kind: 'street' });
        const cool = G.coolLeft ? G.coolLeft(c.id) : 0;
        return `<button class="case-card ${p.solved ? 'closed' : ''} ${c.num === maxNum ? 'finale' : ''} ${cool ? 'in-cooldown' : ''}" data-case="${esc(c.id)}">
          <div class="cover">${A.scene(cover.kind || 'street', cover)}
            <span class="num">CASE ${String(c.num).padStart(2, '0')}</span>
            ${p.solved ? `<span class="stamp-mini">Closed</span>` : ''}
            ${cool ? `<span class="stamp-mini" style="background:#3b0d18;border-color:#f43f5e;color:#fda4af">Locked ${G.coolText(cool)}</span>` : ''}
            <span class="stars">${p.solved ? '★'.repeat(p.stars) : ''}</span>
          </div>
          <div class="body">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.subtitle || '')}</p>
            <div class="meta">
              <span class="diff">${Array.from({ length: 5 }, (_, i) => `<i class="${i < (c.difficulty || 1) ? 'on' : ''}"></i>`).join('')}</span>
              <span>${esc(c.est || '')}</span>
              ${p.solved ? '' : `<span style="margin-left:auto;color:#c9a4ff">${p.found.length ? 'in progress' : 'unopened'}</span>`}
            </div>
          </div>
        </button>`;
      }).join('') || `<div style="padding:50px;text-align:center;color:var(--dim);grid-column:1/-1">No cases match that filter.</div>`;

      root.innerHTML = `<div class="subpage">
        <div class="sub-top">
          <div class="left">
            <button class="btn icon-btn" id="toWs" title="Workshop">${A.icon('back')}</button>
            <div><div class="kicker">The casebook · ${solved} of ${total} closed</div><h1>Case Files</h1></div>
          </div>
          <div class="right">
            <button class="btn btn-sm" id="toWs2">${A.icon('folder')} Workshop</button>
            <button class="btn btn-sm" id="helpBtn">${A.icon('book')} How to play</button>
            <button class="btn icon-btn" id="setBtn" title="Settings">${A.icon('spark')}</button>
          </div>
        </div>
        <div class="sub-body">
          <div class="rank-bar">
            <div class="rk"><b>${rank.title}</b><span>Rank</span></div>
            <div class="prog"><i style="width:${pct}%"></i></div>
            <div class="stat">${solved} / ${total} · ${G.totalStars()} ★ · ${G.save.ip} IP</div>
            <div style="font-size:11px;color:var(--dim);width:100%">${rank.next ? `Close ${rank.next - solved} more case${rank.next - solved === 1 ? '' : 's'} to reach <b style="color:var(--violet-soft)">${rank.nextTitle}</b>.` : 'Every file is closed. The city sleeps. For now.'}</div>
          </div>
          <div class="case-filter">
            ${[['all', 'All files'], ['open', 'Open'], ['closed', 'Closed']].map(f => `<button class="filter-btn ${UI.filter === f[0] ? 'is-active' : ''}" data-filter="${f[0]}">${f[1]}</button>`).join('')}
            <span style="margin-left:auto;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);align-self:center">All cases are unlocked</span>
          </div>
          <div class="case-grid">${cards}</div>
        </div>
      </div>`;
      const toWs = () => { if (window.SH && SH.Workshop) SH.Workshop.show(); };
      root.querySelector('#toWs').onclick = toWs;
      root.querySelector('#toWs2').onclick = toWs;
      root.querySelector('#setBtn').onclick = () => UI.settings();
      root.querySelector('#helpBtn').onclick = () => UI.help();
      root.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { UI.filter = b.dataset.filter; UI.showCases(); });
      root.querySelectorAll('[data-case]').forEach(b => b.onclick = () => {
        const id = b.dataset.case;
        const left = G.coolLeft ? G.coolLeft(id) : 0;
        if (left) {
          G.sound('bad');
          G.toast('<b>File sealed.</b> Mission compromised. Available again in <b>' + G.coolText(left) + '</b>.', 'lock', 6000);
          return;
        }
        G.openCase(id);
      });
    },

    /* ============================================================
       SETTINGS — audio, haptics, reading, progress
       ============================================================ */
    settings() {
      const st = G.save.settings;
      const m = G.modal({
        title: 'Settings', sub: 'Sound, feedback and reading', icon: 'spark', slim: true,
        body: `
          <div class="set-group">
            <div class="set-group-h">Audio</div>
            <div class="set-row">
              <div class="lbl"><b>Background music</b><span>Investigation score, generated live.</span></div>
              <div class="switch ${st.music ? 'on' : ''}" id="musicSw" role="switch" aria-checked="${!!st.music}"></div>
            </div>
            <div class="set-row sub-row">
              <div class="lbl"><span>Music volume</span></div>
              <input type="range" id="musicVol" min="0" max="100" value="${Math.round((st.musicVol || 0) * 100)}" ${st.music ? '' : 'disabled'}>
            </div>
            <div class="set-row">
              <div class="lbl"><b>Sound effects</b><span>Clicks, evidence finds, puzzle feedback.</span></div>
              <div class="switch ${st.sfx ? 'on' : ''}" id="sfxSw" role="switch" aria-checked="${!!st.sfx}"></div>
            </div>
            <div class="set-row sub-row">
              <div class="lbl"><span>Effects volume</span></div>
              <input type="range" id="sfxVol" min="0" max="100" value="${Math.round((st.sfxVol || 0) * 100)}" ${st.sfx ? '' : 'disabled'}>
            </div>
            <div class="set-row">
              <div class="lbl"><b>Haptic feedback</b><span>Short vibrations on supported phones only.</span></div>
              <div class="switch ${st.haptics ? 'on' : ''}" id="hapSw" role="switch" aria-checked="${!!st.haptics}"></div>
            </div>
          </div>

          <div class="set-group">
            <div class="set-group-h">Reading</div>
            <div class="set-row">
              <div class="lbl"><b>Text size</b><span>Large is easier to read on stream.</span></div>
              <div class="seg" id="textSeg">
                <button data-v="normal" class="${st.text === 'normal' ? 'on' : ''}">Normal</button>
                <button data-v="large" class="${st.text === 'large' ? 'on' : ''}">Large</button>
              </div>
            </div>
            <div class="set-row">
              <div class="lbl"><b>Hints</b><span>When off, the hint button will not help you.</span></div>
              <div class="switch ${st.hints ? 'on' : ''}" id="hintSw" role="switch" aria-checked="${!!st.hints}"></div>
            </div>
            <div class="set-row">
              <div class="lbl"><b>Streamer mode</b><span>Larger type and spoiler-safe case cards.</span></div>
              <div class="switch ${st.stream ? 'on' : ''}" id="streamSw" role="switch" aria-checked="${!!st.stream}"></div>
            </div>
          </div>

          <div class="set-group">
            <div class="set-group-h">Progress</div>
            <div class="set-row">
              <div class="lbl"><b>${G.solvedCount()} of ${G.cases.length} cases closed</b><span>${G.totalStars()} stars · ${G.save.ip} IP · ${Object.keys(G.save.achievements || {}).length} achievements</span></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn btn-sm" id="resetSet">Reset settings</button>
                <button class="btn btn-sm" id="resetBtn">Erase progress</button>
              </div>
            </div>
          </div>`,
        footer: `<button class="btn btn-primary" id="doneSet">Done</button>`
      });
      const paint = () => {
        const s = G.save.settings;
        m.modal.querySelectorAll('#textSeg button').forEach(b => b.classList.toggle('on', b.dataset.v === s.text));
        m.modal.querySelector('#musicSw').classList.toggle('on', !!s.music);
        m.modal.querySelector('#sfxSw').classList.toggle('on', !!s.sfx);
        m.modal.querySelector('#hapSw').classList.toggle('on', !!s.haptics);
        m.modal.querySelector('#hintSw').classList.toggle('on', !!s.hints);
        m.modal.querySelector('#streamSw').classList.toggle('on', !!s.stream);
        m.modal.querySelector('#musicVol').disabled = !s.music;
        m.modal.querySelector('#sfxVol').disabled = !s.sfx;
        m.modal.querySelector('#musicVol').value = Math.round((s.musicVol || 0) * 100);
        m.modal.querySelector('#sfxVol').value = Math.round((s.sfxVol || 0) * 100);
      };
      const apply = () => { if (window.SH && SH.applySettings) SH.applySettings(); paint(); };
      m.modal.querySelectorAll('#textSeg button').forEach(b => b.onclick = () => {
        G.saveSettings({ text: b.dataset.v }); apply(); G.sound('click');
      });
      m.modal.querySelector('#musicSw').onclick = () => {
        const v = !G.save.settings.music;
        G.saveSettings({ music: v });
        if (window.SH && SH.Audio) { if (v) SH.Audio.music(G.active ? 'case' : 'workshop'); else SH.Audio.stop(); }
        apply();
      };
      m.modal.querySelector('#sfxSw').onclick = () => {
        const v = !G.save.settings.sfx;
        G.saveSettings({ sfx: v });
        if (v) setTimeout(() => G.sound('good'), 60);
        apply();
      };
      m.modal.querySelector('#hapSw').onclick = () => {
        G.saveSettings({ haptics: !G.save.settings.haptics });
        if (G.save.settings.haptics && window.SH) SH.haptic('tick');
        apply();
      };
      const wireVol = (id, key) => {
        const el = m.modal.querySelector('#' + id);
        el.oninput = () => {
          const v = Number(el.value) / 100;
          const patch = {}; patch[key] = v;
          G.saveSettings(patch);
          if (window.SH && SH.Audio) SH.Audio.apply();
        };
      };
      wireVol('musicVol', 'musicVol');
      wireVol('sfxVol', 'sfxVol');
      m.modal.querySelector('#hintSw').onclick = () => { G.saveSettings({ hints: !G.save.settings.hints }); apply(); G.sound('click'); };
      m.modal.querySelector('#streamSw').onclick = () => { G.saveSettings({ stream: !G.save.settings.stream }); apply(); G.sound('click'); };
      m.modal.querySelector('#doneSet').onclick = m.close;

      m.modal.querySelector('#resetSet').onclick = () => {
        const keep = { progress: G.save.progress, ip: G.save.ip, achievements: G.save.achievements };
        G.save.settings = { text: 'normal', hints: true, stream: false, music: true, musicVol: 0.35, sfx: true, sfxVol: 0.65, haptics: true };
        G.persist();
        apply();
        G.toast('Settings restored to defaults. Your case files are untouched.', 'check', 4200);
      };

      m.modal.querySelector('#resetBtn').onclick = () => {
        const body = m.modal.querySelector('.modal-body');
        if (m.modal.querySelector('#confirmReset')) return;
        const warn = document.createElement('div');
        warn.className = 'verdict-note';
        warn.id = 'confirmReset';
        warn.innerHTML = `This erases every closed case, star, achievement and note. There is no undo.
          <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn btn-sm" id="yesReset" style="background:#7f1d1d;border-color:#f43f5e">Yes, erase everything</button>
          <button class="btn btn-sm" id="noReset">Keep my files</button></div>`;
        body.appendChild(warn);
        warn.querySelector('#noReset').onclick = () => warn.remove();
        warn.querySelector('#yesReset').onclick = () => { G.reset(); m.close(); UI.showTitle(); };
        warn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };
      if (window.innerWidth < 520) m.modal.querySelector('.modal-foot .btn').style.width = '100%';
    },

    /* ============================================================
       HELP
       ============================================================ */
    help() {
      const m = G.modal({
        title: 'How to play', sub: 'A field manual for the newly appointed investigator', icon: 'book', wide: true,
        body: `
          <div class="help-grid">
            <div class="help-card"><b>1. Start in the workshop</b><p>Nine stations surround the room. The case desk opens files; every other bench is a working tool, not decoration.</p></div>
            <div class="help-card"><b>2. Search the scene</b><p>Click the pulsing markers or use the action list. Locked actions tell you what evidence you still need. Special examinations cost investigation points.</p></div>
            <div class="help-card"><b>3. Work the stations</b><p>The evidence board links clues to people. The lab compares samples. The bench repairs electronics. The audio deck replays calls. The archive, map and interrogation room all hold real deductions.</p></div>
            <div class="help-card"><b>4. Watch your IP</b><p>You begin with 100 investigation points. Hints cost 5, special examinations 10. Earn more from evidence, puzzles, links, daily drills and the detective's examination.</p></div>
            <div class="help-card"><b>5. Undercover work</b><p>Some files withhold essential evidence. Go undercover, make careful dialogue choices, and return with the missing piece. Fail, and the mission is <b style="color:#fda4af">compromised</b>: a real 10-minute lockout, saved even if you close the page.</p></div>
            <div class="help-card"><b>6. Accuse with evidence</b><p>A report needs a suspect, a motive, supporting evidence and a deduction. A wrong accusation costs investigation points. You can always review the file before you submit.</p></div>
            <div class="help-card"><b>7. Red herrings</b><p>Some clues look damning until a later find explains them. Clear a red herring and you earn points — and avoid a wrong collar.</p></div>
            <div class="help-card"><b>8. Shortcuts</b><p>Press <span class="mono">Esc</span> to close any puzzle. Keypads accept a physical keyboard. Progress, settings and cooldowns save automatically in this browser.</p></div>
          </div>
          <div class="about-note">Tip: if you feel stuck, re-read the investigator's log and open every evidence card. The answer is usually a detail you already have, looked at from a different angle.<br><br>
          All cases and undercover operations are fictional. Real investigative techniques, invented victims.</div>`,
        footer: `<button class="btn btn-primary" id="helpDone">Back to the casebook</button>`
      });
      m.modal.querySelector('#helpDone').onclick = m.close;
    }
  };
})();
