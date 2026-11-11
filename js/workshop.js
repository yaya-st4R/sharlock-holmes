/* ============================================================
   Workshop — the detective's hub and its nine stations
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art, C = A.C;
  const G = window.Game, S = window.SH;
  const esc = A.esc;
  const P = window.Puzzles;

  /* ---------- shared helpers ---------- */
  function empty(title, text, action) {
    return '<div class="st-empty"><b>' + esc(title) + '</b><p>' + esc(text) + '</p>' +
      (action || '') + '</div>';
  }
  function casePuzzles(c, types) {
    if (!c || !c.puzzles) return [];
    return Object.keys(c.puzzles).map(function (id) {
      return { id: id, pz: c.puzzles[id] };
    }).filter(function (x) { return types.indexOf(x.pz.type) >= 0; });
  }
  function activeCase() { return G.active && G.state ? G.active : null; }
  function solvedPuzzle(c, pid) {
    if (!G.state) return false;
    return (G.state.done || []).some(function (a) { return a.indexOf(pid) >= 0; }) ||
      !!(c.puzzles[pid] && c.puzzles[pid]._solved);
  }
  function drillOk(key) {
    G.save.drills = G.save.drills || {};
    return G.save.drills[key] !== S.dayKey();
  }
  function drillDone(key, ip) {
    G.save.drills = G.save.drills || {};
    G.save.drills[key] = S.dayKey();
    G.ipAdd(ip || 3, 'drill');
    G.persist();
    S.haptic('good');
    G.toast('<b>Training drill clear.</b> +' + (ip || 3) + ' IP', 'badge', 3600);
  }
  function drillLocked() {
    return '<div class="verdict-note good" style="margin-top:14px">' + A.icon('check') +
      ' Today\'s drill is already filed. Come back tomorrow for a fresh one.</div>';
  }

  /* ============================================================
     HUB
     ============================================================ */
  const STATIONS = [
    { id: 'desk',   name: 'Case desk',           icon: 'folder',      x: 21, y: 62, desc: 'Open files and review objectives' },
    { id: 'board',  name: 'Evidence board',      icon: 'pin',         x: 50, y: 34, desc: 'Connect evidence to people' },
    { id: 'lab',    name: 'Forensics lab',       icon: 'flask',       x: 79, y: 45, desc: 'Prints, profiles, comparisons' },
    { id: 'bench',  name: 'Electronics bench',   icon: 'wire',        x: 80, y: 71, desc: 'Repair and restore equipment' },
    { id: 'audio',  name: 'Audio deck',          icon: 'ear',         x: 62, y: 78, desc: 'Calls, tape, signal analysis' },
    { id: 'codes',  name: 'Code-breaking desk',  icon: 'cipher',      x: 36, y: 78, desc: 'Ciphers, passwords, terminals' },
    { id: 'docs',   name: 'Document archive',    icon: 'archive',     x: 14, y: 39, desc: 'Letters, records, handwriting' },
    { id: 'map',    name: 'Map table',           icon: 'map',         x: 50, y: 58, desc: 'Locations, routes, timelines' },
    { id: 'room',   name: 'Interrogation room',  icon: 'users',       x: 88, y: 22, desc: 'Question suspects, break alibis' }
  ];

  function roomArt() {
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="An illustrated detective workshop at night">' +
      '<defs>' +
      A.lg('wsWall', [[0, '#0c0718'], [.55, '#140a26'], [1, '#08040e']], 0, 0, 0, 1) +
      A.rg('wsLamp', [[0, '#f5d0fe', .55], [.45, '#a855f7', .18], [1, '#7c3aed', 0]]) +
      A.rg('wsGlow', [[0, '#e879f9', .35], [1, '#7c3aed', 0]]) +
      A.lg('wsFloor', [[0, '#160c26'], [1, '#07040d']], 0, 0, 0, 1) +
      A.lg('wsDesk', [[0, '#3a2159'], [1, '#180d2a']], 0, 0, 0, 1) +
      '</defs>' +
      '<rect width="1600" height="900" fill="url(#wsWall)"/>' +
      /* back wall panels */
      '<g opacity=".5" stroke="#2a1642" stroke-width="2" fill="none">' +
      '<rect x="60" y="60" width="1480" height="720"/>' +
      '<path d="M60 320h1480M60 620h1480M420 60v720M1180 60v720"/>' +
      '</g>' +
      /* window with city glow */
      '<g transform="translate(690,90)">' +
      '<rect width="240" height="220" rx="6" fill="#080510" stroke="#3a2159" stroke-width="3"/>' +
      '<rect x="10" y="10" width="220" height="200" fill="#120a22"/>' +
      '<circle cx="170" cy="58" r="30" fill="#e9d5ff" opacity=".16"/>' +
      '<g fill="#1b0f2e" stroke="#2d1847" stroke-width="1">' +
      '<rect x="18" y="120" width="44" height="90"/><rect x="66" y="96" width="36" height="114"/>' +
      '<rect x="106" y="134" width="52" height="76"/><rect x="162" y="110" width="58" height="100"/>' +
      '</g>' +
      '<g fill="#c9a4ff" opacity=".5">' +
      '<rect x="26" y="132" width="6" height="8"/><rect x="42" y="150" width="6" height="8"/>' +
      '<rect x="76" y="110" width="6" height="8"/><rect x="118" y="150" width="6" height="8"/>' +
      '<rect x="180" y="126" width="6" height="8"/><rect x="200" y="160" width="6" height="8"/>' +
      '</g>' +
      '<path d="M120 10v200M10 110h220" stroke="#3a2159" stroke-width="4"/>' +
      '</g>' +
      /* evidence board */
      '<g transform="translate(120,88)">' +
      '<rect width="400" height="250" rx="4" fill="#241238" stroke="#5b3a86" stroke-width="4"/>' +
      '<rect x="10" y="10" width="380" height="230" fill="#1b0e2c"/>' +
      '<g fill="#e9dff7" opacity=".9">' +
      '<rect x="28" y="30" width="92" height="66" transform="rotate(-4 28 30)"/>' +
      '<rect x="150" y="24" width="104" height="58" transform="rotate(3 150 24)"/>' +
      '<rect x="284" y="40" width="84" height="70" transform="rotate(-2 284 40)"/>' +
      '<rect x="44" y="132" width="88" height="72" transform="rotate(2 44 132)"/>' +
      '<rect x="176" y="128" width="100" height="78" transform="rotate(-3 176 128)"/>' +
      '<rect x="300" y="146" width="66" height="52" transform="rotate(4 300 146)"/>' +
      '</g>' +
      '<g stroke="#e879f9" stroke-width="2.4" opacity=".8" fill="none">' +
      '<path d="M120 62L200 54M200 54l92 6M204 56l-60 90M204 56l58 84M200 54l40 100"/>' +
      '</g>' +
      '<g fill="#f43f5e"><circle cx="120" cy="62" r="4"/><circle cx="292" cy="60" r="4"/><circle cx="144" cy="146" r="4"/>' +
      '<circle cx="262" cy="140" r="4"/><circle cx="240" cy="154" r="4"/></g>' +
      '<g fill="#fbbf24"><circle cx="200" cy="54" r="4"/></g>' +
      '</g>' +
      /* shelves left */
      '<g transform="translate(80,430)">' +
      '<rect width="230" height="300" fill="#1b0f2e" stroke="#3a2159" stroke-width="3"/>' +
      '<g stroke="#3a2159" stroke-width="3"><path d="M0 100h230M0 200h230"/></g>' +
      '<g fill="#2d1847">' +
      '<rect x="14" y="34" width="18" height="62"/><rect x="38" y="24" width="16" height="72"/>' +
      '<rect x="60" y="40" width="22" height="56"/><rect x="90" y="30" width="14" height="66"/>' +
      '<rect x="112" y="44" width="26" height="52"/>' +
      '<rect x="152" y="120" width="60" height="76" fill="#241238"/>' +
      '<rect x="22" y="220" width="80" height="70" fill="#241238"/>' +
      '</g>' +
      '<g fill="#a855f7" opacity=".5"><rect x="18" y="88" width="18" height="8"/><rect x="94" y="80" width="14" height="6"/>' +
      '<rect x="26" y="238" width="70" height="4"/><rect x="160" y="140" width="46" height="4"/></g>' +
      '</g>' +
      /* big desk */
      '<g transform="translate(380,640)">' +
      '<path d="M0 40h620l40 200H-40z" fill="url(#wsDesk)" stroke="#4a2a74" stroke-width="3"/>' +
      '<path d="M0 40h620l10 34H-10z" fill="#4a2a74" opacity=".5"/>' +
      '<g fill="#e9dff7" opacity=".85">' +
      '<rect x="90" y="6" width="120" height="52" transform="rotate(-3 90 6)"/>' +
      '<rect x="230" y="0" width="110" height="58" transform="rotate(2 230 0)"/>' +
      '</g>' +
      '<g fill="#7c3aed" opacity=".7"><rect x="104" y="20" width="70" height="3"/><rect x="104" y="30" width="54" height="3"/>' +
      '<rect x="244" y="16" width="60" height="3"/><rect x="244" y="26" width="44" height="3"/></g>' +
      '<g transform="translate(430,4)">' +
      '<rect width="120" height="80" rx="6" fill="#0b0612" stroke="#4a2a74" stroke-width="3"/>' +
      '<rect x="10" y="10" width="100" height="50" fill="#160c26"/>' +
      '<g fill="#67e8f9" opacity=".65"><rect x="18" y="18" width="40" height="3"/><rect x="18" y="26" width="60" height="3"/>' +
      '<rect x="18" y="34" width="30" height="3"/></g>' +
      '</g>' +
      '<g transform="translate(560,2)"><path d="M0 0h80l-8 12H8z" fill="#0b0612" stroke="#3a2159"/>' +
      '<rect x="14" y="12" width="52" height="42" rx="4" fill="#0f0819" stroke="#3a2159"/>' +
      '<circle cx="40" cy="54" r="16" fill="#1b0f2e" stroke="#3a2159"/><circle cx="40" cy="54" r="5" fill="#c9a4ff" opacity=".5"/></g>' +
      '</g>' +
      /* map table */
      '<g transform="translate(620,690)">' +
      '<ellipse cx="180" cy="70" rx="230" ry="70" fill="#120a20" stroke="#4a2a74" stroke-width="3"/>' +
      '<g transform="translate(60,28) rotate(-4)">' +
      '<rect width="240" height="120" rx="3" fill="#e9dff7" opacity=".9"/>' +
      '<g stroke="#7c3aed" stroke-width="1.4" opacity=".55" fill="none">' +
      '<path d="M12 24c30 20 70-8 96 12s58 4 100 22"/>' +
      '<path d="M20 70c40-20 60 10 90-6s70 0 110 18"/>' +
      '</g>' +
      '<g fill="#e879f9"><circle cx="40" cy="40" r="4"/><circle cx="120" cy="52" r="4"/><circle cx="206" cy="58" r="4"/></g>' +
      '</g></g>' +
      /* right bench */
      '<g transform="translate(1160,520)">' +
      '<rect width="360" height="300" fill="#1b0f2e" stroke="#3a2159" stroke-width="3"/>' +
      '<rect x="0" y="0" width="360" height="40" fill="#2d1847"/>' +
      '<g transform="translate(24,70)"><rect width="120" height="90" rx="6" fill="#0b0612" stroke="#4a2a74" stroke-width="3"/>' +
      '<circle cx="34" cy="40" r="18" fill="none" stroke="#67e8f9" stroke-width="2"/>' +
      '<circle cx="86" cy="40" r="18" fill="none" stroke="#a855f7" stroke-width="2"/>' +
      '<path d="M52 40h16M24 70h72" stroke="#c9a4ff" stroke-width="2"/></g>' +
      '<g transform="translate(180,60)"><rect width="150" height="110" fill="#0b0612" stroke="#4a2a74" stroke-width="2"/>' +
      '<g fill="#160c26"><rect x="10" y="12" width="130" height="30"/><rect x="10" y="50" width="130" height="22"/></g>' +
      '<g stroke="#34d399" stroke-width="1.6" fill="none" opacity=".7"><path d="M14 26h30l10-10 14 22 14-12h50"/></g></g>' +
      '<g transform="translate(24,190)"><circle cx="20" cy="20" r="16" fill="#241238" stroke="#a855f7"/>' +
      '<rect x="42" y="6" width="120" height="28" rx="4" fill="#241238" stroke="#3a2159"/></g>' +
      '</g>' +
      /* interrogation door */
      '<g transform="translate(1330,120)">' +
      '<rect width="180" height="380" fill="#1b0f2e" stroke="#4a2a74" stroke-width="4"/>' +
      '<rect x="14" y="14" width="152" height="352" fill="#120a20" stroke="#3a2159" stroke-width="2"/>' +
      '<rect x="30" y="30" width="120" height="150" fill="#080510" stroke="#4a2a74" stroke-width="2"/>' +
      '<g fill="#1b0f2e" stroke="#3a2159"><rect x="44" y="44" width="40" height="122"/><rect x="96" y="58" width="40" height="108"/></g>' +
      '<circle cx="146" cy="196" r="6" fill="#fbbf24"/>' +
      '<rect x="30" y="212" width="120" height="6" fill="#4a2a74"/>' +
      '<text x="90" y="248" fill="#c9a4ff" font-family="Georgia,serif" font-size="13" text-anchor="middle" letter-spacing="2">INTERVIEW</text>' +
      '</g>' +
      /* lamp + light pools */
      '<g><circle cx="800" cy="300" r="330" fill="url(#wsLamp)" opacity=".5"/>' +
      '<path d="M800 0v150" stroke="#0b0614" stroke-width="6"/>' +
      '<path d="M756 150h88l-18 44h-52z" fill="#1b0f2e" stroke="#4a2a74" stroke-width="2"/>' +
      '<circle cx="800" cy="200" r="10" fill="#f5d0fe"/></g>' +
      '<path d="M700 210L500 900h600L900 210z" fill="url(#wsLamp)" opacity=".12"/>' +
      /* floor */
      '<rect y="820" width="1600" height="80" fill="url(#wsFloor)"/>' +
      '<path d="M0 822h1600" stroke="#3a2159" stroke-width="2" opacity=".7"/>' +
      '<g stroke="#a855f7" opacity=".12"><path d="M200 830l60 70M500 830l40 70M1100 830l-50 70M1400 830l-40 70"/></g>' +
      /* foreground chair */
      '<g transform="translate(1100,760)" opacity=".9">' +
      '<path d="M0 40h90l-8 90H8z" fill="#100a1c" stroke="#3a2159" stroke-width="2"/>' +
      '<path d="M-6 0h102v44H-6z" rx="6" fill="#160c26" stroke="#3a2159" stroke-width="2"/>' +
      '<path d="M10 130v30M76 130v30" stroke="#3a2159" stroke-width="5"/>' +
      '</g>' +
      '<rect width="1600" height="900" fill="url(#wsGlow)" opacity=".06"/>' +
      '</svg>';
  }

  const Workshop = S.Workshop = {
    show() {
      G.showScreen('workshop');
      document.title = 'The Workshop — Sharlock Holmes';
      document.body.classList.add('ws-mode');
      if (window.SH.Audio) SH.Audio.music('workshop');
      this.render();
    },

    paintPoints() {
      document.querySelectorAll('[data-ippill]').forEach(function (n) {
        n.textContent = G.save.ip;
        n.classList.add('bump');
        setTimeout(function () { n.classList.remove('bump'); }, 400);
      });
      document.querySelectorAll('[data-achcount]').forEach(function (n) {
        n.textContent = Object.keys(G.save.achievements || {}).length;
      });
    },

    render() {
      const root = document.getElementById('screen-workshop');
      if (!root) return;
      const c = G.active, st = G.state;
      const solved = G.solvedCount();
      const total = G.cases.length;
      const achCount = Object.keys(G.save.achievements || {}).length;
      const active = c && st ? `
        <div class="ws-active-file">
          <div class="k">Active file · case ${String(c.num).padStart(2, '0')}</div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.subtitle || '')}</p>
          <div class="prog"><i style="width:${Math.min(100, Math.round(st.found.length / Math.max(1, Object.keys(c.clues || {}).length) * 100))}%"></i></div>
          <div class="row">
            <span>${st.found.length} clues · ${st.hints} hints</span>
            <button class="btn btn-sm btn-primary" data-resume="${esc(c.id)}">Resume ${A.icon('chevron')}</button>
          </div>
        </div>` : `
        <div class="ws-active-file quiet">
          <div class="k">No file on the desk</div>
          <h3>The city is quiet. For now.</h3>
          <p>Open a case from the desk to begin. Every station below works whether or not a file is active.</p>
          <div class="row"><button class="btn btn-sm btn-primary" data-st="desk">${A.icon('folder')} Open the case desk</button></div>
        </div>`;

      const stations = STATIONS.map(function (s) {
        return `<button class="wstation" style="left:${s.x}%;top:${s.y}%" data-st="${s.id}" aria-label="${esc(s.name)}">
            <span class="wi">${A.icon(s.icon)}</span><span class="wl">${esc(s.name)}</span>
          </button>`;
      }).join('');

      const cards = STATIONS.map(function (s) {
        return `<button class="ws-card" data-st="${s.id}">
          <span class="wi">${A.icon(s.icon)}</span>
          <span class="tx"><b>${esc(s.name)}</b><span>${esc(s.desc)}</span></span>
          <span class="go">${A.icon('chevron')}</span>
        </button>`;
      }).join('');

      root.innerHTML = `
      <div class="ws-shell">
        <header class="ws-top">
          <div class="ws-brand">
            <button class="btn icon-btn" data-go="title" title="Home">${A.icon('back')}</button>
            <div><div class="k">Sharlock Holmes</div><div class="b">The Workshop</div></div>
          </div>
          <div class="ws-tools">
            <span class="ip-pill" title="Investigation points">${A.icon('chart')} <b data-ippill>${G.save.ip}</b> IP</span>
            <button class="btn btn-sm" data-go="missions">${A.icon('mask')} Operations</button>
            <button class="btn btn-sm" data-go="ach">${A.icon('badge')} <span data-achcount>${achCount}</span>/${S.ACHIEVEMENTS.length}</button>
            <button class="btn btn-sm" data-go="cases">${A.icon('folder')} Files</button>
            <button class="btn icon-btn" data-go="settings" title="Settings">${A.icon('spark')}</button>
          </div>
        </header>

        <div class="ws-hero">
          <div class="ws-art">${roomArt()}</div>
          <div class="ws-hit">${stations}</div>
          <div class="ws-title">
            <div class="k">${solved} of ${total} files closed · ${G.totalStars()} stars</div>
            <h1>Where the case gets solved</h1>
            <p>Nine stations. One investigation. Pick a bench.</p>
          </div>
        </div>

        <div class="ws-lower">
          <div class="ws-side">${active}
            <div class="ws-daily">
              <div class="k">Daily challenge</div>
              <p>${G.dailyReady() ? 'Five questions. Fifteen points. One per day.' : 'Today\'s challenge is filed. Return tomorrow.'}</p>
              <button class="btn btn-sm ${G.dailyReady() ? 'btn-primary' : ''}" data-go="daily" ${G.dailyReady() ? '' : 'disabled'}>
                ${A.icon('clock')} ${G.dailyReady() ? 'Take the challenge' : 'Already claimed'}</button>
            </div>
          </div>
          <div class="ws-grid">${cards}</div>
        </div>

        <footer class="ws-foot">
          <span>All 30 cases unlocked · progress saved in this browser</span>
          <span>Points: <b>${G.save.ip}</b> · Earned <b>${G.save.ipEarned || 0}</b> · Spent <b>${G.save.ipSpent || 0}</b></span>
        </footer>
      </div>`;

      root.querySelectorAll('[data-st]').forEach(function (b) {
        b.onclick = function () { Workshop.station(b.dataset.st); };
      });
      root.querySelectorAll('[data-resume]').forEach(function (b) {
        b.onclick = function () { G.openCase(b.dataset.resume); };
      });
      root.querySelectorAll('[data-go]').forEach(function (b) {
        const go = b.dataset.go;
        b.onclick = function () {
          if (go === 'title') { if (window.UI) UI.showTitle(); }
          else if (go === 'cases') { if (window.UI) UI.showCases(); }
          else if (go === 'settings') { if (window.UI) UI.settings(); }
          else if (go === 'ach') { Workshop.achievements(); }
          else if (go === 'missions') { S.Mission.dossier({ all: true }); }
          else if (go === 'daily') { S.Exam.open({ daily: true }); }
        };
      });
      this.paintPoints();
    },

    achievements() {
      const got = G.save.achievements || {};
      const body = '<div class="ach-grid">' + S.ACHIEVEMENTS.map(function (a) {
        const on = !!got[a.id];
        return '<div class="ach-card ' + (on ? 'on' : '') + '">' +
          '<div class="ai">' + A.icon(a.icon) + '</div>' +
          '<div><b>' + esc(a.name) + '</b><span>' + esc(a.desc) + '</span></div>' +
          '<div class="st">' + (on ? 'UNLOCKED' : 'LOCKED') + '</div></div>';
      }).join('') + '</div>';
      const m = G.modal({
        title: 'Achievements', sub: Object.keys(got).length + ' of ' + S.ACHIEVEMENTS.length + ' unlocked',
        icon: 'badge', wide: true, body: body,
        footer: '<button class="btn btn-primary" id="achDone">Close</button>'
      });
      m.modal.querySelector('#achDone').onclick = m.close;
    },

    /* ============================================================
       STATION ROUTER
       ============================================================ */
    station(id) {
      G.sound('click');
      S.haptic('tick');
      const fn = this['st_' + id];
      if (fn) fn.call(this);
    },

    /* ---------------- case desk ---------------- */
    st_desk() {
      if (window.UI) UI.showCases();
    },

    /* ---------------- evidence board ---------------- */
    st_board() {
      const c = activeCase();
      if (!c) { G.toast('Open a case first — the board only holds live files.', 'folder'); if (window.UI) UI.showCases(); return; }
      const s = G.state;
      const closures = (c.clues && Object.keys(c.clues)) ? Object.keys(c.clues).filter(function (id) { return s.found.indexOf(id) >= 0; }) : [];
      const links = c.links || [];
      s.links = s.links || [];
      const done = links.filter(function (l) { return s.links.indexOf(l.a + '>' + l.b) >= 0; });

      const evi = closures.map(function (id) {
        const cl = c.clues[id];
        return '<button class="board-chip" data-clue="' + esc(id) + '"><span class="dot"></span>' + esc(cl.name) + '</button>';
      }).join('') || '<div class="st-empty small">No evidence logged yet. Search the scene.</div>';
      const people = (c.suspects || []).map(function (sp) {
        return '<button class="board-chip sus" data-sus="' + esc(sp.id) + '"><span class="face">' + A.portrait(sp.portrait || { seed: sp.id }) + '</span>' + esc(sp.name) + '</button>';
      }).join('') || '<div class="st-empty small">No suspects identified.</div>';

      const deductions = links.map(function (l) {
        const ok = s.links.indexOf(l.a + '>' + l.b) >= 0;
        return '<div class="deduction ' + (ok ? 'on' : '') + '">' +
          '<b>' + (ok ? 'Confirmed link' : 'Unlinked') + '</b>' +
          '<span>' + (ok ? l.note : esc((c.clues[l.a] && c.clues[l.a].name) || l.a) + ' → ' + esc(((c.suspects || []).find(function (x) { return x.id === l.b; }) || {}).name || l.b)) + '</span></div>';
      }).join('');

      const timeline = (c.timeline || []).map(function (t) {
        return '<div class="tl-row"><span class="t">' + esc(t.time) + '</span><span>' + esc(t.text) + '</span></div>';
      }).join('');

      const body = `
        <p class="board-help">Select a piece of evidence, then the person or thing it points to. Only real connections stick.</p>
        <div class="board-grid">
          <div><div class="board-h">Evidence</div><div class="board-col" id="bdEvi">${evi}</div></div>
          <div><div class="board-h">People</div><div class="board-col" id="bdPeople">${people}</div></div>
          <div><div class="board-h">Deductions</div><div class="board-col" id="bdDed">${deductions || '<div class="st-empty small">No links established yet.</div>'}</div></div>
        </div>
        ${timeline ? '<div class="board-h" style="margin-top:18px">Timeline</div><div class="tl">' + timeline + '</div>' : ''}
        <div class="board-status" id="bdStatus">${done.length} of ${links.length} links established.</div>`;
      const m = G.modal({
        title: 'Evidence Board', sub: c.title + ' · connect what you have', icon: 'pin', wide: true,
        body: body, footer: '<button class="btn" id="bdClose">Step back</button>'
      });
      m.modal.querySelector('#bdClose').onclick = m.close;
      let picked = null;
      const status = m.modal.querySelector('#bdStatus');
      m.modal.querySelectorAll('[data-clue]').forEach(function (b) {
        b.onclick = function () {
          m.modal.querySelectorAll('[data-clue]').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel');
          picked = { type: 'clue', id: b.dataset.clue };
          G.sound('tick');
        };
      });
      m.modal.querySelectorAll('[data-sus]').forEach(function (b) {
        b.onclick = function () {
          if (!picked) { status.textContent = 'Choose a piece of evidence first.'; G.sound('bad'); return; }
          const key = picked.id + '>' + b.dataset.sus;
          if (s.links.indexOf(key) >= 0) { status.textContent = 'That link is already on the board.'; return; }
          const rule = links.find(function (l) { return l.a === picked.id && l.b === b.dataset.sus; });
          if (rule) {
            s.links.push(key);
            G.persist();
            G.ipAdd(3, 'link');
            G.sound('good');
            S.haptic('good');
            G.log('sys', 'BOARD LINK — ' + rule.note);
            G.toast('<b>Link established.</b><br><span style="font-size:11px;color:#a894c4">' + esc(rule.note) + '</span>', 'pin', 5200);
            m.close();
            this.st_board();
          } else {
            status.textContent = 'The thread goes nowhere. That evidence does not touch them.';
            G.sound('bad');
            S.haptic('bad');
          }
          picked = null;
          m.modal.querySelectorAll('[data-clue]').forEach(function (x) { x.classList.remove('sel'); });
        };
      });
      if (!links.length) {
        status.innerHTML = 'This file has no board links scripted. Use it as a working wall: compare portraits and evidence names.';
      }
    },

    /* ---------------- forensics lab ---------------- */
    st_lab() {
      const c = activeCase();
      const f = c && c.forensics;
      const m = G.modal({
        title: 'Forensics Laboratory', sub: 'Prints, profiles and comparison', icon: 'flask', wide: true,
        body: f ? this.labBody(c, f) : this.labDrill(),
        footer: '<button class="btn" id="labClose">Leave the lab</button>'
      });
      m.modal.querySelector('#labClose').onclick = m.close;
      if (f) this.labWire(m, c, f); else this.labDrillWire(m);
    },

    labBody(c, f) {
      const s = G.state;
      const solved = s.flags['lab_' + c.id];
      const rows = (f.samples || []).map(function (sm) {
        return '<div class="lab-row"><div class="lab-sample"><span class="tag">' + esc(sm.type || 'SAMPLE') + '</span>' +
          '<b>' + esc(sm.label) + '</b><span class="mark">' + esc(sm.mark || '') + '</span></div>' +
          '<select data-sample="' + esc(sm.id) + '"><option value="">— compare against —</option>' +
          (f.candidates || []).map(function (cd) {
            return '<option value="' + esc(cd.id) + '">' + esc(cd.label) + '</option>';
          }).join('') + '</select></div>';
      }).join('');
      return '<p>' + (f.prompt || 'Match each sample to its owner.') + '</p>' +
        '<div class="lab-rows">' + rows + '</div>' +
        '<div class="lab-status" id="labStatus">' + (solved ? '<span class="ok">' + A.icon('check') + ' Analysis filed. ' + esc(f.success || '') + '</span>' : '') + '</div>' +
        (solved ? '' : '<button class="btn btn-primary" id="labRun" style="margin-top:12px">' + A.icon('flask') + ' Run comparison</button>');
    },

    labWire(m, c, f) {
      const run = m.modal.querySelector('#labRun');
      if (!run) return;
      const status = m.modal.querySelector('#labStatus');
      run.onclick = () => {
        const sels = [].slice.call(m.modal.querySelectorAll('select[data-sample]'));
        if (sels.some(function (x) { return !x.value; })) { status.textContent = 'Compare every sample first.'; return; }
        const wrong = sels.filter(function (x) {
          const key = f.answer[x.dataset.sample];
          return String(key) !== String(x.value);
        });
        if (wrong.length) {
          status.innerHTML = '<span class="bad">' + A.icon('alert') + ' ' + wrong.length + ' comparison' + (wrong.length > 1 ? 's' : '') + ' do not hold. Re-read the markers.</span>';
          G.sound('bad'); S.haptic('bad');
          return;
        }
        G.state.flags['lab_' + c.id] = true;
        G.state.flags['forensic_done'] = true;
        G.ipAdd(8, 'forensics');
        G.ach('forensic');
        G.log('sys', 'FORENSICS — ' + (f.success || 'samples matched.'));
        G.persist();
        G.sound('good'); S.haptic('good');
        m.close();
        this.st_lab();
      };
    },

    labDrill() {
      const prints = [
        { id: 'p1', type: 'PRINT', label: 'Sample A — whorl, double loop', mark: 'ridge count 14', who: 'Mara Voss' },
        { id: 'p2', type: 'PRINT', label: 'Sample B — arch, worn centre', mark: 'ridge count 9', who: 'Elias Ward' },
        { id: 'p3', type: 'FIBRE', label: 'Sample C — blue wool blend', mark: 'dye batch 44-B', who: 'Nadia Pell' }
      ];
      const locked = !drillOk('lab');
      return '<p class="board-help">No live forensic samples on the desk right now. The lab keeps a training set: match each sample to the reference card.</p>' +
        '<div class="lab-rows">' + prints.map(function (p) {
          return '<div class="lab-row"><div class="lab-sample"><span class="tag">' + p.type + '</span><b>' + p.label + '</b><span class="mark">' + p.mark + '</span></div>' +
            '<select data-drill="' + p.id + '" ' + (locked ? 'disabled' : '') + '><option value="">— reference —</option>' +
            ['Mara Voss', 'Elias Ward', 'Nadia Pell'].map(function (n) { return '<option>' + n + '</option>'; }).join('') +
            '</select></div>';
        }).join('') + '</div>' +
        (locked ? drillLocked() : '<button class="btn btn-primary" id="drillRun" style="margin-top:12px">' + A.icon('flask') + ' Confirm matches</button>') +
        '<div class="lab-status" id="labStatus"></div>';
    },

    labDrillWire(m) {
      const btn = m.modal.querySelector('#drillRun');
      if (!btn) return;
      const answer = { p1: 'Mara Voss', p2: 'Elias Ward', p3: 'Nadia Pell' };
      const status = m.modal.querySelector('#labStatus');
      btn.onclick = () => {
        const sels = [].slice.call(m.modal.querySelectorAll('select[data-drill]'));
        if (sels.some(function (x) { return !x.value; })) { status.textContent = 'Fill every row.'; return; }
        const bad = sels.filter(function (x) { return x.value !== answer[x.dataset.drill]; });
        if (bad.length) { status.innerHTML = '<span class="bad">' + A.icon('alert') + ' Not a match. Check the ridge counts and dye batch.</span>'; G.sound('bad'); return; }
        drillDone('lab', 4);
        G.ach('forensic');
        m.close();
        G.toast('<b>Lab drill clear.</b> +4 IP', 'badge', 3200);
      };
    },

    /* ---------------- electronics bench ---------------- */
    st_bench() {
      const c = activeCase();
      const list = casePuzzles(c, ['repair', 'mix']);
      const m = G.modal({
        title: 'Electronics Bench', sub: 'Repair, restore, reconnect', icon: 'wire', wide: true,
        body: this.benchBody(c, list),
        footer: '<button class="btn" id="beClose">Leave the bench</button>'
      });
      m.modal.querySelector('#beClose').onclick = m.close;
      m.modal.querySelectorAll('[data-pz]').forEach(function (b) {
        b.onclick = function () {
          m.close();
          const pid = b.dataset.pz;
          const pz = c.puzzles[pid];
          setTimeout(function () {
            P.open(pz, { onSolve: function () { S.solveStationPuzzle(pid, pz); } });
          }, 120);
        };
      });
      const drill = m.modal.querySelector('#benchDrill');
      if (drill) drill.onclick = () => { m.close(); setTimeout(() => this.benchDrill(), 120); };
    },

    benchBody(c, list) {
      if (!c) {
        return empty('No live equipment', 'Open a case with a repair job, or run today\'s bench drill.', '<button class="btn btn-primary" id="benchDrill">' + A.icon('wire') + ' Start drill</button>');
      }
      if (!list.length) {
        return empty('Nothing to repair on this file', 'The bench drill keeps your hands sharp and pays a few points.',
          '<button class="btn btn-primary" id="benchDrill">' + A.icon('wire') + ' Start drill</button>');
      }
      return '<p class="board-help">Equipment logged on this case. Each repair unlocks what the machine was holding.</p><div class="st-list">' +
        list.map(function (x) {
          const done = (G.state.done || []).indexOf(x.id) >= 0;
          return '<button class="st-item" data-pz="' + esc(x.id) + '" ' + (done ? 'disabled' : '') + '>' +
            '<span class="si">' + A.icon(x.pz.icon || 'wire') + '</span>' +
            '<span class="stx"><b>' + esc(x.pz.title) + '</b><span>' + esc(x.pz.subtitle || '') + '</span></span>' +
            '<span class="tag ' + (done ? 'ok' : '') + '">' + (done ? 'REPAIRED' : 'OPEN') + '</span></button>';
        }).join('') + '</div>' +
        '<div class="board-status">A solved repair also counts toward the case file.</div>';
    },

    benchDrill() {
      const pairs = [
        { l: 'RED', r: 'POWER', color: '#f43f5e' },
        { l: 'BLUE', r: 'SIGNAL', color: '#67e8f9' },
        { l: 'YELLOW', r: 'GROUND', color: '#fbbf24' },
        { l: 'GREEN', r: 'DATA', color: '#34d399' }
      ];
      const pz = {
        type: 'repair', title: 'Bench Drill — Dead Recorder', subtitle: 'Training board',
        prompt: 'Reconnect the recorder. Match each output to the correct lead.',
        pairs: pairs, hintText: 'Colour first, label second. RED carries power; GREEN carries data.',
        success: 'The recorder powers up and plays a test tone. Bench drill clear.'
      };
      if (!drillOk('bench')) { G.toast('Today\'s bench drill is already filed.', 'clock'); return; }
      P.open(pz, { onSolve: function () { drillDone('bench', 4); } });
      G.state = G.state || null;
    },

    /* ---------------- audio deck ---------------- */
    st_audio() {
      const c = activeCase();
      const list = casePuzzles(c, ['audio']);
      const calls = (c && c.audioCalls) || [];
      const m = G.modal({
        title: 'Audio Deck', sub: 'Recordings, calls, signals', icon: 'ear', wide: true,
        body: this.audioBody(c, list, calls),
        footer: '<button class="btn" id="auClose">Stop the tape</button>'
      });
      m.modal.querySelector('#auClose').onclick = m.close;
      m.modal.querySelectorAll('[data-pz]').forEach(function (b) {
        b.onclick = function () {
          m.close();
          const pid = b.dataset.pz, pz = c.puzzles[pid];
          setTimeout(function () { P.open(pz, { onSolve: function () { S.solveStationPuzzle(pid, pz); } }); }, 120);
        };
      });
      m.modal.querySelectorAll('[data-call]').forEach(function (b) {
        b.onclick = function () { m.close(); setTimeout(function () { Workshop.call(c, b.dataset.call); }, 120); };
      });
      const drill = m.modal.querySelector('#audioDrill');
      if (drill) drill.onclick = () => { m.close(); setTimeout(() => this.audioDrill(), 120); };
    },

    audioBody(c, list, calls) {
      let html = '';
      if (c && list.length) {
        html += '<div class="board-h">Recordings on this file</div><div class="st-list">' + list.map(function (x) {
          return '<button class="st-item" data-pz="' + esc(x.id) + '"><span class="si">' + A.icon('volume') + '</span>' +
            '<span class="stx"><b>' + esc(x.pz.title) + '</b><span>' + esc(x.pz.subtitle || '') + '</span></span><span class="tag">PLAY</span></button>';
        }).join('') + '</div>';
      }
      if (c && calls.length) {
        html += '<div class="board-h" style="margin-top:16px">Emergency calls</div><div class="st-list">' + calls.map(function (call) {
          const heard = G.state && G.state.flags['call_' + call.id];
          return '<button class="st-item" data-call="' + esc(call.id) + '"><span class="si">' + A.icon('phone') + '</span>' +
            '<span class="stx"><b>' + esc(call.title) + '</b><span>' + esc(call.sub || 'Recorded call') + '</span></span>' +
            '<span class="tag ' + (heard ? 'ok' : '') + '">' + (heard ? 'LOGGED' : 'LISTEN') + '</span></button>';
        }).join('') + '</div>';
      }
      if (!html) {
        html = empty('No tape on the deck', 'Run the daily signal drill: identify the pattern in a short transmission.',
          '<button class="btn btn-primary" id="audioDrill">' + A.icon('ear') + ' Start drill</button>');
      }
      return html + '<div class="board-status">Sound is generated live — headphones reveal more than speakers.</div>';
    },

    call(c, id) {
      const call = (c.audioCalls || []).find(function (x) { return x.id === id; });
      if (!call) return;
      const pattern = call.pattern || [540, 540, 0, 380, 620];
      let picked = null;
      const m = G.modal({
        title: call.title, sub: call.sub || 'Emergency call · fictional', icon: 'phone', wide: true,
        body: '<div class="audio-vis" id="callVis">' + Array.from({ length: 28 }).map(function (_, i) {
          return '<i style="animation-delay:' + (i * 0.04).toFixed(2) + 's"></i>';
        }).join('') + '</div>' +
          '<div class="audio-ctl"><button class="btn btn-primary" id="callPlay">' + A.icon('play') + ' Play call</button>' +
          '<button class="btn btn-sm" id="callWave">Show transcript cues</button></div>' +
          '<div class="pz-note" id="callText" style="min-height:34px"></div>' +
          '<div class="board-h" style="margin-top:14px">What does the background tell you?</div>' +
          '<div class="choice-list">' + (call.options || []).map(function (o, i) {
            return '<button class="choice" data-c="' + i + '"><span class="k">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.t) + '</span></button>';
          }).join('') + '</div>' +
          '<div class="pz-feedback" id="callFb" style="min-height:18px;color:#fda4af;font-size:12px;margin-top:10px"></div>',
        footer: '<button class="btn" id="callClose">Close</button><button class="btn btn-primary" id="callConfirm">Log analysis</button>'
      });
      m.modal.querySelector('#callClose').onclick = m.close;
      m.modal.querySelectorAll('[data-c]').forEach(function (b) {
        b.onclick = function () {
          m.modal.querySelectorAll('[data-c]').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel'); picked = +b.dataset.c; G.sound('click');
        };
      });
      m.modal.querySelector('#callPlay').onclick = function () {
        const vis = m.modal.querySelector('#callVis');
        vis.classList.add('playing');
        S.Audio.playPattern(pattern, call.tone || 'sine', 0.3);
        setTimeout(function () { vis.classList.remove('playing'); }, pattern.length * 300 + 200);
      };
      m.modal.querySelector('#callWave').onclick = function () {
        m.modal.querySelector('#callText').innerHTML = esc(call.cue || 'The line is thin. Something rhythmic sits under the voice.');
        m.modal.querySelector('#callText').style.color = '#c9a4ff';
      };
      const fb = m.modal.querySelector('#callFb');
      m.modal.querySelector('#callConfirm').onclick = function () {
        if (picked == null) { fb.textContent = 'Choose what you heard first.'; return; }
        if (picked === Number(call.answer)) {
          G.state.flags['call_' + call.id] = true;
          if (call.gives) G.granted(call.gives);
          if (call.flag) G.state.flags[call.flag] = true;
          G.ipAdd(5, 'audio');
          G.log('narr', call.log || ('The call reveals: ' + (call.options[picked].t || '')));
          G.persist(); G.sound('good'); S.haptic('good');
          G.toast('<b>Call logged.</b> New detail added to the file.', 'ear', 4200);
          m.close();
        } else {
          fb.innerHTML = A.esc(call.wrong || 'Not what the tape holds. Listen to the background, not the voice.');
          G.sound('bad'); S.haptic('bad');
        }
      };
    },

    audioDrill() {
      if (!drillOk('audio')) { G.toast('Today\'s signal drill is already filed.', 'clock'); return; }
      const pz = {
        type: 'audio', title: 'Signal Drill', subtitle: 'Three-tone transmission',
        prompt: 'A short training signal. Listen for the repeated tone, then identify the message shape.',
        pattern: [660, 660, 0, 440, 440, 0, 330],
        waveform: 'Two matching high tones, pause, two matching mid tones, pause, one low tone. Long-short-short in rhythm.',
        options: [
          { t: 'A repeating call sign, then a single low note', v: 'a' },
          { t: 'A rising siren with no pauses', v: 'b' },
          { t: 'Three different voices talking', v: 'c' }
        ],
        answer: 'a', success: 'Signal drill clear. You heard the call sign and the closing tone.'
      };
      P.open(pz, { onSolve: function () { drillDone('audio', 4); } });
    },

    /* ---------------- code-breaking ---------------- */
    st_codes() {
      const c = activeCase();
      const list = casePuzzles(c, ['cipher', 'terminal', 'keypad', 'math', 'logicgrid']);
      const m = G.modal({
        title: 'Code-Breaking Desk', sub: 'Ciphers, passwords, patterns', icon: 'cipher', wide: true,
        body: this.codeBody(c, list),
        footer: '<button class="btn" id="coClose">Push back from the desk</button>'
      });
      m.modal.querySelector('#coClose').onclick = m.close;
      m.modal.querySelectorAll('[data-pz]').forEach(function (b) {
        b.onclick = function () {
          m.close();
          const pid = b.dataset.pz, pz = c.puzzles[pid];
          setTimeout(function () { P.open(pz, { onSolve: function () { S.solveStationPuzzle(pid, pz); } }); }, 120);
        };
      });
      const drill = m.modal.querySelector('#codeDrill');
      if (drill) drill.onclick = () => { m.close(); setTimeout(() => this.codeDrill(), 120); };
    },

    codeBody(c, list) {
      let html = '';
      if (c && list.length) {
        html += '<div class="board-h">Locks and codes on this file</div><div class="st-list">' + list.map(function (x) {
          return '<button class="st-item" data-pz="' + esc(x.id) + '"><span class="si">' + A.icon(x.pz.icon || 'cipher') + '</span>' +
            '<span class="stx"><b>' + esc(x.pz.title) + '</b><span>' + esc(x.pz.subtitle || '') + '</span></span><span class="tag">SOLVE</span></button>';
        }).join('') + '</div>';
      }
      if (!html) {
        html = empty('No lock on the desk', 'Run the daily cipher drill: three lines, one shift.',
          '<button class="btn btn-primary" id="codeDrill">' + A.icon('cipher') + ' Start drill</button>');
      }
      return html + '<div class="board-status">The desk keeps a record of every cipher you break.</div>';
    },

    codeDrill() {
      if (!drillOk('codes')) { G.toast('Today\'s cipher drill is already filed.', 'clock'); return; }
      const phrases = ['THE CROW FLIES AT MIDNIGHT', 'A LOCKED ROOM STILL BREATHES', 'TRUST THE SECOND WITNESS', 'NOTHING BURNS TWICE'];
      const plain = phrases[Math.floor(Math.random() * phrases.length)];
      const shift = 3 + Math.floor(Math.random() * 6);
      const pz = {
        type: 'cipher', title: 'Cipher Drill', subtitle: 'Training wheel',
        prompt: 'A short training cipher. Turn the wheel until the words make sense.',
        plain: plain, shift: shift,
        hintText: 'The shift is between three and eight. Look for a common three-letter word first.',
        success: 'Cipher drill clear. The message resolves.'
      };
      P.open(pz, { onSolve: function () { drillDone('codes', 5); G.ach('codebreaker'); } });
    },

    /* ---------------- document archive ---------------- */
    st_docs() {
      const c = activeCase();
      const list = casePuzzles(c, ['sequence', 'photo', 'hotspot']);
      const docs = (c && c.documents) || [];
      const m = G.modal({
        title: 'Document Archive', sub: 'Paper remembers what people forget', icon: 'archive', wide: true,
        body: this.docsBody(c, list, docs),
        footer: '<button class="btn" id="docClose">Close the drawer</button>'
      });
      m.modal.querySelector('#docClose').onclick = m.close;
      m.modal.querySelectorAll('[data-pz]').forEach(function (b) {
        b.onclick = function () {
          m.close();
          const pid = b.dataset.pz, pz = c.puzzles[pid];
          setTimeout(function () { P.open(pz, { onSolve: function () { S.solveStationPuzzle(pid, pz); } }); }, 120);
        };
      });
      m.modal.querySelectorAll('[data-doc]').forEach(function (b) {
        b.onclick = function () { m.close(); setTimeout(function () { Workshop.doc(c, b.dataset.doc); }, 120); };
      });
      const drill = m.modal.querySelector('#docDrill');
      if (drill) drill.onclick = () => { m.close(); setTimeout(() => this.docDrill(), 120); };
    },

    docsBody(c, list, docs) {
      let html = '';
      if (c && list.length) {
        html += '<div class="board-h">Documents on this file</div><div class="st-list">' + list.map(function (x) {
          return '<button class="st-item" data-pz="' + esc(x.id) + '"><span class="si">' + A.icon('archive') + '</span>' +
            '<span class="stx"><b>' + esc(x.pz.title) + '</b><span>' + esc(x.pz.subtitle || '') + '</span></span><span class="tag">OPEN</span></button>';
        }).join('') + '</div>';
      }
      if (c && docs.length) {
        html += '<div class="board-h" style="margin-top:16px">Archive records</div><div class="st-list">' + docs.map(function (d) {
          const read = G.state.flags['doc_' + d.id];
          return '<button class="st-item" data-doc="' + esc(d.id) + '"><span class="si">' + A.icon('news') + '</span>' +
            '<span class="stx"><b>' + esc(d.title) + '</b><span>' + esc(d.sub || 'Archived record') + '</span></span>' +
            '<span class="tag ' + (read ? 'ok' : '') + '">' + (read ? 'READ' : 'READ') + '</span></button>';
        }).join('') + '</div>';
      }
      if (!html) {
        html = empty('Empty drawer', 'Run the daily archive drill: put four clippings back in order.',
          '<button class="btn btn-primary" id="docDrill">' + A.icon('archive') + ' Start drill</button>');
      }
      return html + '<div class="board-status">Cross-check dates and handwriting. Paper lies more carefully than people.</div>';
    },

    doc(c, id) {
      const d = (c.documents || []).find(function (x) { return x.id === id; });
      if (!d) return;
      const m = G.modal({
        title: d.title, sub: d.sub || 'Archived record', icon: 'news', wide: true,
        body: '<div class="doc-sheet">' + d.body + '</div>' +
          (d.question ? '<div class="board-h" style="margin-top:16px">' + esc(d.question) + '</div><div class="choice-list" id="docOpts">' +
            d.options.map(function (o, i) { return '<button class="choice" data-i="' + i + '"><span class="k">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.t) + '</span></button>'; }).join('') +
            '</div><div class="pz-feedback" id="docFb" style="min-height:16px;font-size:12px;color:#fda4af;margin-top:8px"></div>' : ''),
        footer: d.question ? '<button class="btn" id="docX">Close</button><button class="btn btn-primary" id="docGo">File the reading</button>' : '<button class="btn btn-primary" id="docX">Close</button>'
      });
      m.modal.querySelector('#docX').onclick = m.close;
      if (!d.question) { G.state.flags['doc_' + d.id] = true; G.persist(); return; }
      let picked = null;
      m.modal.querySelectorAll('#docOpts .choice').forEach(function (b) {
        b.onclick = function () {
          m.modal.querySelectorAll('#docOpts .choice').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel'); picked = +b.dataset.i;
        };
      });
      m.modal.querySelector('#docGo').onclick = function () {
        const fb = m.modal.querySelector('#docFb');
        if (picked == null) { fb.textContent = 'Choose a reading first.'; return; }
        if (picked === d.answer) {
          G.state.flags['doc_' + d.id] = true;
          if (d.gives) G.granted(d.gives);
          if (d.flag) G.state.flags[d.flag] = true;
          if (d.log) G.log('narr', d.log);
          G.ipAdd(4, 'document');
          G.persist(); G.sound('good'); S.haptic('good');
          m.close();
          G.toast('<b>Reading filed.</b> The archive gives up another detail.', 'archive', 3800);
        } else {
          fb.innerHTML = A.esc(d.wrong || 'Read it again. The detail is on the page.');
          G.sound('bad');
        }
      };
    },

    docDrill() {
      if (!drillOk('docs')) { G.toast('Today\'s archive drill is already filed.', 'clock'); return; }
      const pz = {
        type: 'sequence', title: 'Archive Drill', subtitle: 'Four clippings, one order',
        prompt: 'Put the clippings in chronological order. Dates are printed on every strip.',
        variant: 'strips',
        items: [
          { t: 'The harbour fire', sub: '12 March 1911' },
          { t: 'The inquest opens', sub: '2 April 1911' },
          { t: 'A witness withdraws', sub: '19 April 1911' },
          { t: 'The verdict: accidental', sub: '30 April 1911' }
        ],
        success: 'Archive drill clear. Dates never argue.'
      };
      P.open(pz, { onSolve: function () { drillDone('docs', 4); } });
    },

    /* ---------------- map table ---------------- */
    st_map() {
      const c = activeCase();
      const m = G.modal({
        title: 'Map Table', sub: c ? c.title : 'City grid', icon: 'map', wide: true,
        body: c ? this.mapBody(c) : this.mapDrill(),
        footer: '<button class="btn" id="mapClose">Leave the table</button>'
      });
      m.modal.querySelector('#mapClose').onclick = m.close;
      const task = m.modal.querySelector('#mapTask');
      if (task && c && c.mapTask) this.mapTaskWire(m, c);
      const drill = m.modal.querySelector('#mapDrill');
      if (drill) drill.onclick = () => { m.close(); setTimeout(() => this.mapDrillGo(), 120); };
    },

    mapBody(c) {
      const s = G.state;
      const locs = c.locations || [];
      const W = 900, H = 420;
      const pts = locs.map(function (l, i) {
        const a = (i / Math.max(1, locs.length)) * Math.PI * 2 - Math.PI / 2;
        const rx = 330 + (i % 2) * 60, ry = 150 + (i % 3) * 34;
        return { id: l.id, name: l.short || l.name, time: l.time, x: W / 2 + Math.cos(a) * rx, y: H / 2 + Math.sin(a) * ry, visited: (s.visited || []).indexOf(l.id) >= 0, lock: false };
      });
      const paths = pts.map(function (p, i) {
        const q = pts[(i + 1) % pts.length];
        return '<path d="M' + p.x.toFixed(0) + ' ' + p.y.toFixed(0) + 'Q' + ((p.x + q.x) / 2).toFixed(0) + ' ' + ((p.y + q.y) / 2 - 40).toFixed(0) + ' ' + q.x.toFixed(0) + ' ' + q.y.toFixed(0) + '" fill="none" stroke="#7c3aed" stroke-width="1.4" stroke-dasharray="5 6" opacity=".5"/>';
      }).join('');
      const nodes = pts.map(function (p) {
        return '<g class="map-node" data-loc="' + esc(p.id) + '" transform="translate(' + p.x.toFixed(0) + ',' + p.y.toFixed(0) + ')" tabindex="0" role="button" aria-label="' + esc(p.name) + '">' +
          '<circle r="13" fill="' + (p.visited ? '#34d399' : '#241238') + '" stroke="#a855f7" stroke-width="2"/>' +
          '<circle r="4" fill="' + (p.visited ? '#052e22' : '#e9d5ff') + '"/>' +
          '<text y="-22" text-anchor="middle" fill="#e9d5ff" font-size="13" font-family="Georgia,serif">' + esc(p.name) + '</text>' +
          '<text y="34" text-anchor="middle" fill="#8a78a6" font-size="11" font-family="monospace">' + esc(p.time || '') + '</text>' +
          '</g>';
      }).join('');
      return '<div class="map-wrap"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Case map">' +
        '<defs><radialGradient id="mapg"><stop offset="0" stop-color="#1b0f2e"/><stop offset="1" stop-color="#08040e"/></radialGradient></defs>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#mapg)"/>' +
        '<g stroke="#2a1642" stroke-width="1" opacity=".7">' + Array.from({ length: 9 }).map(function (_, i) { return '<path d="M0 ' + (i * 50) + 'h' + W + 'M' + (i * 110) + ' 0v' + H + '"/>'; }).join('') + '</g>' +
        paths + nodes + '</svg></div>' +
        '<div class="map-legend"><span><i class="dot ok"></i> visited</span><span><i class="dot"></i> unvisited</span><span>' + pts.length + ' locations on file</span></div>' +
        (c.mapTask ? '<div class="board-h" style="margin-top:16px">' + esc(c.mapTask.q) + '</div><div class="choice-list" id="mapTask">' +
          c.mapTask.options.map(function (o, i) { return '<button class="choice" data-i="' + i + '"><span class="k">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.t) + '</span></button>'; }).join('') +
          '</div><div class="pz-feedback" id="mapFb" style="min-height:16px;font-size:12px;color:#fda4af;margin-top:8px"></div>' +
          '<button class="btn btn-sm" id="mapGo" style="margin-top:10px">Confirm route</button>' : '');
    },

    mapTaskWire(m, c) {
      let picked = null;
      m.modal.querySelectorAll('#mapTask .choice').forEach(function (b) {
        b.onclick = function () {
          m.modal.querySelectorAll('#mapTask .choice').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel'); picked = +b.dataset.i;
        };
      });
      m.modal.querySelector('#mapGo').onclick = function () {
        const fb = m.modal.querySelector('#mapFb');
        if (picked == null) { fb.textContent = 'Pick a route first.'; return; }
        if (picked === c.mapTask.answer) {
          G.state.flags['mapTask_' + c.id] = true;
          if (c.mapTask.gives) G.granted(c.mapTask.gives);
          if (c.mapTask.log) G.log('narr', c.mapTask.log);
          G.ipAdd(6, 'map');
          G.persist(); G.sound('good'); S.haptic('good');
          m.close();
          G.toast('<b>Route confirmed.</b> The movements fit — or one of them does not.', 'map', 4200);
        } else {
          fb.innerHTML = A.esc(c.mapTask.wrong || 'That route puts someone in two places at once.');
          G.sound('bad');
        }
      };
    },

    mapDrill() {
      return empty('No map on the table', 'Open a case to plot its locations, or run the daily route drill.',
        '<button class="btn btn-primary" id="mapDrill">' + A.icon('map') + ' Start drill</button>');
    },

    mapDrillGo() {
      if (!drillOk('map')) { G.toast('Today\'s route drill is already filed.', 'clock'); return; }
      const pz = {
        type: 'sequence', title: 'Route Drill', subtitle: 'Four stops, one timeline',
        prompt: 'A courier made four stops. Put them in the order the timestamps support.',
        items: [
          { t: 'Dock gate', sub: '21:10' },
          { t: 'Arcade Lane', sub: '21:26' },
          { t: 'North bridge', sub: '21:48' },
          { t: 'Lock-up garage', sub: '22:05' }
        ],
        success: 'Route drill clear. The courier had forty minutes to spare.'
      };
      P.open(pz, { onSolve: function () { drillDone('map', 4); } });
    },

    /* ---------------- interrogation room ---------------- */
    st_room() {
      const c = activeCase();
      const m = G.modal({
        title: 'Interrogation Room', sub: c ? c.title : 'No suspect in the chair', icon: 'users', wide: true,
        body: this.roomBody(c),
        footer: '<button class="btn" id="irClose">End session</button>'
      });
      m.modal.querySelector('#irClose').onclick = m.close;
      if (!c) return;
      m.modal.querySelectorAll('[data-sus]').forEach(function (b) {
        b.onclick = function () { m.close(); setTimeout(function () { Workshop.interrogate(c, b.dataset.sus); }, 100); };
      });
      m.modal.querySelectorAll('[data-pz]').forEach(function (b) {
        b.onclick = function () {
          m.close(); const pid = b.dataset.pz, pz = c.puzzles[pid];
          setTimeout(function () { P.open(pz, { onSolve: function () { S.solveStationPuzzle(pid, pz); } }); }, 120);
        };
      });
    },

    roomBody(c) {
      if (!c) return empty('Empty chair', 'Open a case to bring suspects in. Interviews and contradictions need a live file.', '');
      const s = G.state;
      const people = (c.suspects || []).map(function (sp) {
        const asked = (s.asked[sp.id] || []).length;
        const total = (sp.questions || []).length;
        const exposed = (sp.questions || []).some(function (q, i) { return s.flags['contra_' + sp.id + '_' + i]; });
        return '<button class="st-item" data-sus="' + esc(sp.id) + '">' +
          '<span class="si face">' + A.portrait(sp.portrait || { seed: sp.id }) + '</span>' +
          '<span class="stx"><b>' + esc(sp.name) + '</b><span>' + esc(sp.role || '') + ' · ' + asked + '/' + total + ' asked</span></span>' +
          '<span class="tag ' + (exposed ? 'ok' : '') + '">' + (exposed ? 'BROKEN' : 'QUESTION') + '</span></button>';
      }).join('') || '<div class="st-empty small">No suspects on file.</div>';
      const conf = (c.contradictions || []).length;
      return '<p class="board-help">Bring a suspect in, then challenge one of their statements with the evidence that contradicts it.' +
        (conf ? ' This file carries <b>' + conf + '</b> scripted contradiction' + (conf > 1 ? 's' : '') + '.' : '') + '</p>' +
        '<div class="st-list">' + people + '</div>' +
        '<div class="board-status">' + (Object.keys(s.asked || {}).length ? 'Interviews already logged: ' + Object.keys(s.asked).length + '.' : 'No interviews logged yet.') + '</div>';
    },

    interrogate(c, sid) {
      const sp = (c.suspects || []).find(function (x) { return x.id === sid; });
      if (!sp) return;
      const s = G.state;
      s.asked[sp.id] = s.asked[sp.id] || [];
      const asked = s.asked[sp.id];
      const qs = sp.questions || [];
      const statements = asked.map(function (i) { return { q: qs[i], i: i }; }).filter(function (x) { return x.q; });
      const evidence = s.found.map(function (id) { return { id: id, cl: c.clues[id] }; }).filter(function (x) { return x.cl; });

      const body = '<div class="int-row"><div><div class="int-face">' + A.portrait(sp.portrait || { seed: sp.name }) + '</div>' +
        '<div class="int-role">' + esc(sp.tag || 'Interview') + '</div></div>' +
        '<div class="int-main"><div class="int-name">' + esc(sp.name) + '</div><p>' + (sp.intro || '') + '</p>' +
        '<div class="board-h">Statements on record</div>' +
        (statements.length ? '<div class="st-list tight">' + statements.map(function (st) {
          const done = s.flags['contra_' + sp.id + '_' + st.i];
          return '<button class="st-item ' + (done ? 'done' : '') + '" data-stmt="' + st.i + '"><span class="si">' + A.icon('letter') + '</span>' +
            '<span class="stx"><b>' + esc(st.q.q) + '</b><span>Challenge this statement with evidence</span></span>' +
            '<span class="tag ' + (done ? 'ok' : '') + '">' + (done ? 'BROKEN' : 'CHALLENGE') + '</span></button>';
        }).join('') + '</div>' : '<div class="st-empty small">Ask questions in the case view first. Statements to challenge appear here.</div>') +
        '<div class="board-h" style="margin-top:14px">Present evidence</div>' +
        '<div class="evi-pick">' + (evidence.length ? evidence.map(function (e) {
          return '<button class="evi-chip" data-ev="' + esc(e.id) + '"><span class="th">' + A.cluePhoto(e.cl.icon || 'note', e.cl) + '</span><span>' + esc(e.cl.name) + '</span></button>';
        }).join('') : '<div class="st-empty small">No evidence logged.</div>') + '</div>' +
        '<div class="pz-feedback" id="irFb" style="min-height:18px;font-size:12px;color:#fda4af;margin-top:10px"></div>' +
        '</div></div>';

      const m = G.modal({
        title: sp.name, sub: 'Interrogation · ' + (sp.role || ''), icon: 'users', wide: true,
        body: body, footer: '<button class="btn" id="irEnd">End interview</button>'
      });
      m.modal.querySelector('#irEnd').onclick = m.close;
      let stmt = null, ev = null;
      const fb = m.modal.querySelector('#irFb');
      m.modal.querySelectorAll('[data-stmt]').forEach(function (b) {
        b.onclick = function () {
          m.modal.querySelectorAll('[data-stmt]').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel'); stmt = +b.dataset.stmt;
          G.sound('tick');
        };
      });
      m.modal.querySelectorAll('[data-ev]').forEach(function (b) {
        b.onclick = function () {
          m.modal.querySelectorAll('[data-ev]').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel'); ev = b.dataset.ev;
          G.sound('tick');
          if (stmt == null) { fb.textContent = 'Pick the statement you want to break first.'; return; }
          const q = qs[stmt];
          const scripted = (c.contradictions || []).find(function (x) { return x.suspect === sp.id && (x.statement === stmt || x.q === q.q); });
          const need = scripted ? [].concat(scripted.evidence) : [].concat(q.requires || []);
          if (need.indexOf(ev) >= 0) {
            s.flags['contra_' + sp.id + '_' + stmt] = true;
            G.ipAdd(6, 'contradiction');
            G.save.stats.contradictions = (G.save.stats.contradictions || 0) + 1;
            G.ach('interrogator');
            const text = scripted ? scripted.expose : (q.follow || 'The statement collapses. They stop meeting your eyes.');
            G.log('narr', '<b>CONTRADICTION — ' + esc(sp.name) + '.</b> ' + text);
            G.persist(); G.sound('good'); S.haptic('good');
            G.toast('<b>Contradiction exposed.</b><br><span style="font-size:11px;color:#a894c4">' + esc(G.short(text, 2)) + '</span>', 'users', 6000);
            m.close();
            setTimeout(function () { Workshop.interrogate(c, sp.id); }, 220);
          } else {
            fb.innerHTML = esc(scripted ? (scripted.wrong || 'That evidence does not break this statement.') : 'That evidence does not touch this statement. Look for the detail that puts them somewhere else.');
            G.sound('bad'); S.haptic('bad');
          }
        };
      });
    }
  };

  /* station puzzle completion is shared with the case view */
  S.solveStationPuzzle = function (pid, pz) {
    const c = G.active;
    if (c && c.puzzles && c.puzzles[pid]) {
      if (window.CaseView) { window.CaseView.puzzleSolved(pid, pz); return; }
    }
    G.ipAdd(pz.reward || 4, 'puzzle');
    G.sound('good');
    if (pz.type === 'cipher' || pz.type === 'terminal') G.ach('codebreaker');
  };
})();
