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

    showTitle() {
      G.showScreen('title');
      document.title = 'Sharlock Holmes — A Detective Anthology';
      const root = document.getElementById('screen-title');
      const rank = G.rank();
      const solved = G.solvedCount();
      const total = G.cases.length;
      const last = G.save.last ? G.caseById(G.save.last) : null;
      const lastP = last ? G.progress(last.id) : null;
      const continueLabel = last ? (lastP && lastP.solved ? 'Review case ' + String(last.num).padStart(2, '0') : 'Continue case ' + String(last.num).padStart(2, '0')) : 'Open the case files';

      root.innerHTML = `
      <div class="hero">
        <div class="hero-art">${A.hero()}</div>
        <div class="hero-fade"></div>
        <div class="hero-top"><div class="wrap">
          <div class="brand">${A.logoMark()} Sharlock Holmes <span style="opacity:.4">/</span> Casebook</div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="chip amber">${A.icon('star')} ${G.totalStars()} stars</span>
            <span class="chip">${solved}/${total} closed</span>
          </div>
        </div></div>

        <div class="hero-inner">
          <div class="hero-content">
            <div class="hero-kicker"><span class="dash"></span><span class="eyebrow">An interactive detective anthology</span></div>
            <h1 class="title-xl hero-title"><span>Sharlock</span><span class="l2">Holmes</span></h1>
            <p class="hero-sub">Twenty-five case files. Broken alibis, locked rooms, bad chemistry and one impossible identity.
              Read the scene, collect the evidence, crack the codes, and name the killer. The city is not going to solve itself.</p>
            <div class="hero-actions">
              <button class="btn btn-primary" data-go="continue">${A.icon('magnify')} ${continueLabel}</button>
              <button class="btn" data-go="cases">${A.icon('folder')} All case files</button>
              <button class="btn btn-ghost" data-go="help">${A.icon('book')} How to play</button>
              <button class="btn icon-btn" data-go="settings" title="Settings" aria-label="Settings">${A.icon('spark')}</button>
            </div>
            <div class="hero-meta">
              <div class="m"><b>25</b><span>Cases</span></div>
              <div class="m"><b>13</b><span>Puzzle types</span></div>
              <div class="m"><b>${solved}</b><span>Closed</span></div>
              <div class="m"><b>${rank.title}</b><span>Current rank</span></div>
              <div class="m"><b>~12h</b><span>Of deduction</span></div>
            </div>
          </div>
        </div>
        <div class="hero-credit">Original fictional cases · inspired by real forensic method<br><b>For stress relief &amp; stream nights</b></div>
      </div>

      <div class="home-body"><div class="wrap">
        <div class="home-grid">
          <div class="panel">
            <div class="eyebrow">The work</div>
            <h3>Every scene is a puzzle. Every witness is a door.</h3>
            <p>This is a text-first investigation game. You will search scenes, bag evidence, repair broken cameras,
              crack phone PINs, decode notes, read CCTV timestamps, mix reagents and pick apart alibis. No timers. No fail state.
              Take all night if you want.</p>
            <ul class="steps">
              <li><span class="n">1</span><span><b style="color:#eee6fb">Read the scene.</b> Click the pulsing markers or use the action list. Everything you find lands in your Evidence tab.</span></li>
              <li><span class="n">2</span><span><b style="color:#eee6fb">Work the puzzles.</b> Codes, wires, film, audio, chemistry. Each case has its own tools.</span></li>
              <li><span class="n">3</span><span><b style="color:#eee6fb">Build the case.</b> Interview suspects, confront them with evidence, then file your accusation.</span></li>
              <li><span class="n">4</span><span><b style="color:#eee6fb">Close it.</b> A clean file earns three stars. Hints and bad warrants cost you.</span></li>
            </ul>
            <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
              <button class="btn btn-primary" data-go="continue">${A.icon('chevron')} ${continueLabel}</button>
              <button class="btn btn-sm" data-go="cases">Browse all 25</button>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:14px">
            <div class="panel">
              <div class="eyebrow">From the desk</div>
              <div class="quote">“A case is not solved by the loudest clue. It is solved by the quiet one everyone walked past.”<small>— Sharlock Holmes, casebook introduction</small></div>
            </div>
            <div class="panel" style="padding:18px">
              <div class="eyebrow">Stream mode</div>
              <p style="margin-bottom:12px">Built for late-night streams: large readable text, spoiler-safe case cards, and a big
                <b style="color:#f5d0fe">CASE CLOSED</b> reveal for the camera. Toggle it in settings.</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn btn-sm" data-go="settings">${A.icon('spark')} Settings</button>
                <button class="btn btn-sm" data-go="help">${A.icon('book')} Controls</button>
              </div>
            </div>
          </div>
        </div>
        <p class="about-note" style="max-width:900px">Content note: all twenty-five cases are original fictional stories. They draw on real investigative
          techniques — forensic accounting, phone extraction, CCTV reconstruction, toxicology, wire and camera repair — but no case depicts a real victim
          or exploits a real crime. Treat the dead with respect, even the invented ones.</p>
      </div></div>`;

      root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
        const go = b.dataset.go;
        if (go === 'cases') UI.showCases();
        else if (go === 'continue') {
          if (last) G.openCase(last.id);
          else UI.showCases();
        } else if (go === 'help') UI.help();
        else if (go === 'settings') UI.settings();
      });
    },

    showCases() {
      G.showScreen('cases');
      document.title = 'Case Files — Sharlock Holmes';
      const root = document.getElementById('screen-cases');
      const rank = G.rank();
      const solved = G.solvedCount();
      const pct = Math.round((solved / Math.max(1, G.cases.length)) * 100);
      const list = G.cases.slice().sort((a, b) => a.num - b.num).filter(c => {
        const p = G.progress(c.id);
        if (UI.filter === 'open') return !p.solved;
        if (UI.filter === 'closed') return p.solved;
        return true;
      });
      const cards = list.map(c => {
        const p = G.progress(c.id);
        const cover = Object.assign({}, c.cover || { kind: 'street' });
        return `<button class="case-card ${p.solved ? 'closed' : ''} ${c.id === 'c25' ? 'finale' : ''}" data-case="${esc(c.id)}">
          <div class="cover">${A.scene(cover.kind || 'street', cover)}
            <span class="num">CASE ${String(c.num).padStart(2, '0')}</span>
            ${p.solved ? `<span class="stamp-mini">Closed</span>` : ''}
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
            <button class="btn icon-btn" id="toTitle" title="Title screen">${A.icon('back')}</button>
            <div><div class="kicker">The casebook · ${solved} of ${G.cases.length} closed</div><h1>Case Files</h1></div>
          </div>
          <div class="right">
            <button class="btn btn-sm" id="helpBtn">${A.icon('book')} How to play</button>
            <button class="btn icon-btn" id="setBtn" title="Settings">${A.icon('spark')}</button>
          </div>
        </div>
        <div class="sub-body">
          <div class="rank-bar">
            <div class="rk"><b>${rank.title}</b><span>Rank</span></div>
            <div class="prog"><i style="width:${pct}%"></i></div>
            <div class="stat">${solved} / ${G.cases.length} · ${G.totalStars()} ★</div>
            <div style="font-size:11px;color:var(--dim);width:100%">${rank.next ? `Close ${rank.next - solved} more case${rank.next - solved === 1 ? '' : 's'} to reach <b style="color:var(--violet-soft)">${rank.nextTitle}</b>.` : 'Every file is closed. The city sleeps. For now.'}</div>
          </div>
          <div class="case-filter">
            ${[['all', 'All files'], ['open', 'Open'], ['closed', 'Closed']].map(f => `<button class="filter-btn ${UI.filter === f[0] ? 'is-active' : ''}" data-filter="${f[0]}">${f[1]}</button>`).join('')}
            <span style="margin-left:auto;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);align-self:center">All cases are unlocked</span>
          </div>
          <div class="case-grid">${cards}</div>
        </div>
      </div>`;
      root.querySelector('#toTitle').onclick = () => UI.showTitle();
      root.querySelector('#setBtn').onclick = () => UI.settings();
      root.querySelector('#helpBtn').onclick = () => UI.help();
      root.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { UI.filter = b.dataset.filter; UI.showCases(); });
      root.querySelectorAll('[data-case]').forEach(b => b.onclick = () => G.openCase(b.dataset.case));
    },

    /* --------------------------------------------------------- */
    settings() {
      const st = G.save.settings;
      const m = G.modal({
        title: 'Settings', sub: 'Play your way', icon: 'spark', slim: true,
        body: `
          <div class="set-row">
            <div class="lbl"><b>Text size</b><span>Large is easier to read on stream.</span></div>
            <div class="seg" id="textSeg">
              <button data-v="normal" class="${st.text === 'normal' ? 'on' : ''}">Normal</button>
              <button data-v="large" class="${st.text === 'large' ? 'on' : ''}">Large</button>
            </div>
          </div>
          <div class="set-row">
            <div class="lbl"><b>Sound effects</b><span>Subtle clicks and confirmations.</span></div>
            <div class="switch ${st.sound ? 'on' : ''}" id="soundSw" role="switch" aria-checked="${st.sound}"></div>
          </div>
          <div class="set-row">
            <div class="lbl"><b>Hints</b><span>When off, the hint button will not help you.</span></div>
            <div class="switch ${st.hints ? 'on' : ''}" id="hintSw" role="switch" aria-checked="${st.hints}"></div>
          </div>
          <div class="set-row">
            <div class="lbl"><b>Streamer mode</b><span>Larger type, spoiler-safe case cards, stream framing.</span></div>
            <div class="switch ${st.stream ? 'on' : ''}" id="streamSw" role="switch" aria-checked="${st.stream}"></div>
          </div>
          <div class="set-row">
            <div class="lbl"><b>Progress</b><span>${G.solvedCount()} of ${G.cases.length} cases closed · ${G.totalStars()} stars</span></div>
            <button class="btn btn-sm" id="resetBtn">Reset</button>
          </div>`,
        footer: `<button class="btn btn-primary" id="doneSet">Done</button>`
      });
      const paint = () => {
        m.modal.querySelectorAll('#textSeg button').forEach(b => b.classList.toggle('on', b.dataset.v === G.save.settings.text));
        m.modal.querySelector('#soundSw').classList.toggle('on', !!G.save.settings.sound);
        m.modal.querySelector('#hintSw').classList.toggle('on', !!G.save.settings.hints);
        m.modal.querySelector('#streamSw').classList.toggle('on', !!G.save.settings.stream);
      };
      m.modal.querySelectorAll('#textSeg button').forEach(b => b.onclick = () => {
        G.saveSettings({ text: b.dataset.v }); paint(); G.sound('click');
      });
      m.modal.querySelector('#soundSw').onclick = () => {
        const v = !G.save.settings.sound; G.saveSettings({ sound: v }); paint();
        if (v) setTimeout(() => G.sound('good'), 60);
      };
      m.modal.querySelector('#hintSw').onclick = () => { G.saveSettings({ hints: !G.save.settings.hints }); paint(); G.sound('click'); };
      m.modal.querySelector('#streamSw').onclick = () => { G.saveSettings({ stream: !G.save.settings.stream }); paint(); G.sound('click'); };
      m.modal.querySelector('#doneSet').onclick = m.close;
      m.modal.querySelector('#resetBtn').onclick = () => {
        const body = m.modal.querySelector('.modal-body');
        if (m.modal.querySelector('#confirmReset')) return;
        const warn = document.createElement('div');
        warn.className = 'verdict-note';
        warn.id = 'confirmReset';
        warn.innerHTML = `This erases every closed case, star, and note. There is no undo.
          <div style="display:flex;gap:8px;margin-top:10px"><button class="btn btn-sm" id="yesReset" style="background:#7f1d1d;border-color:#f43f5e">Yes, erase everything</button>
          <button class="btn btn-sm" id="noReset">Keep my files</button></div>`;
        body.appendChild(warn);
        warn.querySelector('#noReset').onclick = () => warn.remove();
        warn.querySelector('#yesReset').onclick = () => { G.reset(); UI.showTitle(); };
      };
      if (window.innerWidth < 520) m.modal.querySelector('.modal-foot .btn').style.width = '100%';
    },

    help() {
      const m = G.modal({
        title: 'How to play', sub: 'A field manual for the newly appointed investigator', icon: 'book', wide: true,
        body: `
          <div class="help-grid">
            <div class="help-card"><b>1. Search the scene</b><p>Each location shows a cartoon scene with pulsing markers. Click them, or use the action list. Locked actions tell you exactly what evidence you still need.</p></div>
            <div class="help-card"><b>2. Log everything</b><p>Every find becomes an evidence card. Open it in the Evidence tab for a closer look, a forensic note, and sometimes an <i>Analyse</i> button.</p></div>
            <div class="help-card"><b>3. Solve the tools</b><p>Cases use different interactions: phone PINs, safe dials, Caesar ciphers, terminals, wire repair, photo enhancement, audio patterns, timelines, chemical mixing, hotspot searches and logic grids.</p></div>
            <div class="help-card"><b>4. Interview suspects</b><p>Questions unlock as you find evidence. Some require you to present a specific clue. Read what they say — and what they avoid saying.</p></div>
            <div class="help-card"><b>5. Accuse</b><p>The final report asks who, how, why and which evidence broke the case. A wrong report is rejected; you can revise it, but it costs a star.</p></div>
            <div class="help-card"><b>6. Hints &amp; stars</b><p>A clean solve is three stars. Hints and rejected accusations reduce it. There is no fail state, no timer, and no penalty for exploring.</p></div>
            <div class="help-card"><b>Streaming</b><p>Turn on Streamer mode for larger text and spoiler-safe case cards. The finale's reveal is formatted for a big, satisfying on-camera moment.</p></div>
            <div class="help-card"><b>Shortcuts</b><p>Press <span class="mono">Esc</span> to close any puzzle. Phone keypads accept a physical keyboard. Your progress saves automatically in this browser.</p></div>
          </div>
          <div class="about-note">Tip: if you feel stuck, re-read the investigator's log and open every evidence card. The answer is usually a detail you already have, looked at from a different angle.<br><br>
          All cases are fictional. Real investigative techniques, invented victims. Made to be solved slowly.</div>`,
        footer: `<button class="btn btn-primary" id="helpDone">Back to the casebook</button>`
      });
      m.modal.querySelector('#helpDone').onclick = m.close;
    }
  };

  /* keyboard shortcuts on title/cases */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (document.querySelector('#modal-root .modal-back')) return;
  });
})();
