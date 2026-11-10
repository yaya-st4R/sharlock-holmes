/* ============================================================
   Case view — locations, actions, evidence, suspects,
   accusations, case-closed reveals
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  const G = window.Game;
  const esc = A.esc;

  const CaseView = window.CaseView = {
    open(id) {
      const c = G.caseById(id);
      if (!c) { G.toast('Case file missing.', 'alert'); return; }
      G.active = c;
      G.state = G.progress(id);
      G.railTab = 'evidence';
      if (!G.state.loc) G.state.loc = (c.locations[0] || {}).id;
      G.save.last = id;
      G.persist();
      G.showScreen('case');
      document.title = `${c.title} — Sharlock Holmes`;
      if (!G.state.opened) {
        this.briefing(true);
        G.state.opened = true;
        G.persist();
      } else {
        if (!G.state.visited) G.state.visited = [];
        if (!G.state.visited.includes(G.state.loc)) {
          G.state.visited.push(G.state.loc);
          const loc = c.locations.find(l => l.id === G.state.loc);
          if (loc && loc.intro) G.log('narr', loc.intro);
          G.persist();
        }
        this.render();
      }
    },

    currentLoc() {
      const c = G.active;
      if (!c) return null;
      return c.locations.find(l => l.id === G.state.loc) || c.locations[0];
    },

    requirement(c, clues, flags) {
      for (const f of (flags || [])) if (!G.hasFlag(f)) return 'More investigation';
      for (const id of (clues || [])) if (!G.hasClue(id)) return G.clueName(c, id);
      return null;
    },

    locLocked(loc) {
      const miss = this.requirement(G.active, loc.requires, loc.requiresFlags);
      return miss;
    },

    locDone(loc) {
      const acts = (loc.actions || []).filter(a => !a.optional);
      if (!acts.length) return false;
      return acts.every(a => G.state.done.includes(a.id));
    },

    availableActions(loc) {
      const c = G.active;
      return (loc.actions || []).map(a => {
        const miss = this.requirement(c, a.requires, a.requiresFlags);
        return { ...a, _miss: miss, _done: G.state.done.includes(a.id) };
      });
    },

    suspectsHere(loc) {
      return (G.active.suspects || []).filter(s => s.location === loc.id);
    },

    /* --------------------------------------------------------- */
    render() {
      const c = G.active, s = G.state, root = document.getElementById('screen-case');
      if (!c) return;
      const loc = this.currentLoc();
      if (!loc) { root.innerHTML = '<p style="padding:40px">This case has no locations.</p>'; return; }
      if (!s.visited) s.visited = [];
      const clues = c.clues || {};
      const totalClues = Object.keys(clues).length;
      const found = s.found.length;
      const pct = totalClues ? Math.round((found / totalClues) * 100) : 0;

      /* location chips */
      const locChips = c.locations.map(l => {
        const lock = this.locLocked(l);
        const done = this.locDone(l);
        return `<button class="loc-chip ${l.id === loc.id ? 'is-active' : ''} ${done ? 'is-done' : ''} ${lock ? 'is-locked' : ''}"
          data-loc="${esc(l.id)}" title="${lock ? 'Locked: ' + esc(lock) : esc(l.name)}">
          <span class="dot"></span>${esc(l.short || l.name)}${lock ? ` <span class="lock">${A.icon('lock')}</span>` : ''}
        </button>`;
      }).join('');

      /* scene */
      const artOpts = Object.assign({}, loc.art || { kind: 'street' });
      const sceneArt = A.scene(artOpts.kind || 'street', artOpts);
      const hotspotActs = this.availableActions(loc).filter(a => a.hotspot && !a._done && !a._miss);
      const hotspots = hotspotActs.map(a => `<button class="hotspot" style="left:${a.hotspot.x}%;top:${a.hotspot.y}%"
        data-aid="${esc(a.id)}" title="${esc(a.label)}" aria-label="${esc(a.label)}"></button>`).join('');

      /* log */
      const logHTML = s.log.length
        ? s.log.map((e, i) => `<div class="log-entry ${esc(e.k)}" style="${i === s.log.length - 1 ? '' : 'animation:none'}">${e.t}</div>`).join('')
        : `<div class="log-entry narr" style="animation:none;color:var(--dim);font-style:italic">The case file is open. Start with the scene in front of you.</div>`;

      /* actions */
      const acts = this.availableActions(loc);
      const here = this.suspectsHere(loc);
      const actionCards = acts.map(a => {
        if (a._done && !a.repeat) {
          return `<button class="act is-done" disabled><span class="ai">${A.icon('check')}</span>
            <span class="txt"><b>${esc(a.label)}</b><span>Examined</span></span></button>`;
        }
        const locked = !!a._miss;
        return `<button class="act ${locked ? 'is-locked' : ''} ${a.puzzle ? 'puzzle' : ''} ${a.suspect ? 'talk' : ''}"
          data-aid="${esc(a.id)}" ${locked ? 'aria-disabled="true"' : ''}>
          <span class="ai">${A.icon(a.icon || (a.puzzle ? 'lock' : a.suspect ? 'user' : 'search'))}</span>
          <span class="txt"><b>${esc(a.label)}</b><span>${locked ? 'Locked — needs: ' + esc(a._miss) : esc(a.desc || (a.puzzle ? 'Interactive analysis' : 'Examine'))}</span></span>
          <span class="go">${locked ? A.icon('lock') : A.icon('chevron')}</span>
        </button>`;
      }).join('');

      const talkCards = here.map(sp => {
        const asked = (s.asked[sp.id] || []).length;
        const total = (sp.questions || []).length;
        const done = total > 0 && asked >= total;
        return `<button class="act talk" data-suspect="${esc(sp.id)}">
          <span class="ai">${A.icon('user')}</span>
          <span class="txt"><b>Question ${esc(sp.name)}</b><span>${esc(sp.role || '')} · ${done ? 'interview complete' : asked + '/' + total + ' questions asked'}</span></span>
          <span class="go">${A.icon('chevron')}</span></button>`;
      }).join('');

      const actionHTML = (actionCards + talkCards) || `<div class="action-empty">Nothing left to examine here. Check your case file, or try another location.</div>`;

      /* rail */
      const eviHTML = s.found.length ? s.found.slice().reverse().map(id => {
        const cl = clues[id];
        if (!cl) return '';
        return `<button class="evi" data-clue="${esc(id)}">
          <span class="thumb">${A.cluePhoto(cl.icon || 'note', cl)}</span>
          <span class="nm"><b>${esc(cl.name)}</b><span>${esc(cl.caption || cl.short || 'Evidence')}</span></span></button>`;
      }).join('') : `<div class="empty-rail">No evidence logged yet.<br>Search the scene.</div>`;

      const susHTML = (c.suspects || []).map(sp => {
        const asked = (s.asked[sp.id] || []).length;
        return `<button class="sus-item ${asked ? 'talked' : ''}" data-suspect="${esc(sp.id)}">
          <span class="face">${A.portrait(sp.portrait || { seed: sp.id })}</span>
          <span><b>${esc(sp.name)}</b><span>${esc(sp.role || '')}</span></span>
          <span class="stat"></span></button>`;
      }).join('') || `<div class="empty-rail">No known suspects.</div>`;

      const briefHTML = `
        <div class="brief-body">
          ${(c.briefing || []).map(p => `<p>${p}</p>`).join('')}
          ${(c.objectives || []).length ? `<div class="rail-sec-title" style="margin-top:14px"><span class="t">Lines of enquiry</span></div>
            ${c.objectives.map(o => `<div class="fact"><b>Task</b><span>${esc(o)}</span></div>`).join('')}` : ''}
          <button class="btn btn-sm btn-wide" data-act="brief" style="margin-top:14px">${A.icon('book')} Reopen briefing</button>
        </div>`;

      const railBody = G.railTab === 'evidence' ? eviHTML : G.railTab === 'suspects' ? susHTML : briefHTML;

      root.innerHTML = `
      <div class="case-shell">
        <header class="case-top"><div class="case-top-in">
          <button class="btn icon-btn back" data-act="back" title="Case files">${A.icon('back')}</button>
          <div class="case-heading">
            <div class="kicker">Case ${String(c.num).padStart(2, '0')} · ${'★'.repeat(c.difficulty || 1)}${'☆'.repeat(Math.max(0, 5 - (c.difficulty || 1)))} · ${esc(c.est || 'open investigation')}</div>
            <h1>${esc(c.title)} <small>${esc(c.subtitle || '')}</small></h1>
          </div>
          <div class="top-tools">
            <div class="case-progress">Evidence <span class="bar"><i style="width:${pct}%"></i></span> <b style="color:#c9a4ff">${found}/${totalClues}</b></div>
            <button class="btn btn-sm hint-pill" data-act="hint">${A.icon('spark')} Hint</button>
            <button class="btn btn-sm" data-act="brief">${A.icon('book')} Brief</button>
            <button class="btn icon-btn" data-act="back" title="Case files">${A.icon('folder')}</button>
          </div>
        </div></header>

        <div class="case-layout">
          <div class="stage">
            <div class="loc-nav">${locChips}</div>
            <div class="scene">
              ${sceneArt}
              ${hotspots}
              <div class="scene-tag">${A.icon('pin')} <b>${esc(loc.name)}</b> · ${esc(loc.time || 'now')}</div>
              ${s.solved ? `<div class="mood"><span class="chip ok">${A.icon('check')} Solved</span></div>` : ''}
              <div class="frame"></div>
            </div>

            <div class="workbench">
              <div class="log-card">
                <div class="log-head"><span class="t">Investigator's log</span><span class="live"><i></i> recording</span></div>
                <div class="log-scroll">${logHTML}</div>
              </div>
              <div class="actions-card">
                <div class="actions-head"><span class="t">At this location</span><span class="chip">${acts.length + here.length} leads</span></div>
                <div class="actions-list">${actionHTML}</div>
              </div>
            </div>
          </div>

          <aside class="rail">
            <div class="rail-card">
              <div class="rail-tabs">
                <button class="rail-tab ${G.railTab === 'evidence' ? 'is-active' : ''}" data-tab="evidence">Evidence</button>
                <button class="rail-tab ${G.railTab === 'suspects' ? 'is-active' : ''}" data-tab="suspects">Suspects</button>
                <button class="rail-tab ${G.railTab === 'brief' ? 'is-active' : ''}" data-tab="brief">Case notes</button>
              </div>
              <div class="rail-body">${railBody}</div>
            </div>
            <button class="btn accuse-btn" data-act="accuse">${A.icon('gavel')} ${s.solved ? 'Review the verdict' : 'Accuse someone'}</button>
            ${s.solved ? `<button class="btn btn-sm" data-act="verdict">${A.icon('book')} Read the closing report</button>` : ''}
            <div style="font-size:10.5px;color:var(--dim);line-height:1.6;padding:0 4px">
              ${s.hints ? `Hints used: <b style="color:#c9a4ff">${s.hints}</b> · ` : ''}${s.wrong ? `Wrong accusations: <b style="color:#fda4af">${s.wrong}</b>` : 'No wrong accusations yet.'}
            </div>
          </aside>
        </div>
      </div>`;

      /* wire */
      root.querySelectorAll('[data-act="back"]').forEach(b => b.onclick = () => { if (window.UI) UI.showCases(); });
      root.querySelectorAll('[data-act="hint"]').forEach(b => b.onclick = () => this.hint());
      root.querySelectorAll('[data-act="brief"]').forEach(b => b.onclick = () => this.briefing(false));
      root.querySelectorAll('[data-act="accuse"]').forEach(b => b.onclick = () => this.accuse());
      root.querySelectorAll('[data-act="verdict"]').forEach(b => b.onclick = () => this.showVerdict());
      root.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { G.railTab = b.dataset.tab; this.render(); });
      root.querySelectorAll('[data-loc]').forEach(b => b.onclick = () => this.goLoc(b.dataset.loc));
      root.querySelectorAll('[data-aid]').forEach(b => b.onclick = (e) => { e.stopPropagation(); this.action(b.dataset.aid); });
      root.querySelectorAll('[data-suspect]').forEach(b => b.onclick = () => this.suspect(b.dataset.suspect));
      root.querySelectorAll('[data-clue]').forEach(b => b.onclick = () => this.clue(b.dataset.clue));

      const log = root.querySelector('.log-scroll');
      if (log) log.scrollTop = log.scrollHeight;
      if (s.solved && !G.state.flags['_verdictSeen']) {
        // don't auto open; player can review
      }
    },

    /* --------------------------------------------------------- */
    goLoc(id) {
      const c = G.active;
      const loc = c.locations.find(l => l.id === id);
      if (!loc) return;
      const lock = this.locLocked(loc);
      if (lock) { G.toast(`That location is not open to you yet. Find: <b>${esc(lock)}</b>`, 'lock'); G.sound('bad'); return; }
      G.state.loc = id;
      if (!G.state.visited) G.state.visited = [];
      if (!G.state.visited.includes(id)) {
        G.state.visited.push(id);
        if (loc.intro) G.log('narr', loc.intro);
        if (loc.onEnter) {
          if (loc.onEnter.gives) G.granted(loc.onEnter.gives);
          if (loc.onEnter.flags) [].concat(loc.onEnter.flags).forEach(f => G.state.flags[f] = true);
        }
      }
      G.persist();
      this.render();
    },

    action(aid) {
      const c = G.active, s = G.state, loc = this.currentLoc();
      const all = [...(loc.actions || [])];
      const a = all.find(x => x.id === aid);
      if (!a) return;
      const miss = this.requirement(c, a.requires, a.requiresFlags);
      if (miss) { G.toast(`You need to establish <b>${esc(miss)}</b> first.`, 'lock'); G.sound('bad'); return; }
      if (a.puzzle) { this.puzzle(a.puzzle, a); return; }
      if (a.suspect) { this.suspect(a.suspect); return; }
      if (!a.repeat && s.done.includes(a.id)) return;
      if (!a.repeat) s.done.push(a.id);
      if (a.text) G.log('narr', a.text);
      if (a.sys) G.log('sys', a.sys);
      if (a.gives) G.granted(a.gives);
      if (a.givesFlag) [].concat(a.givesFlag).forEach(f => s.flags[f] = true);
      if (a.flags) {
        if (Array.isArray(a.flags)) a.flags.forEach(f => s.flags[f] = true);
        else Object.assign(s.flags, a.flags);
      }
      if (a.move) { G.state.loc = a.move; }
      G.sound('click');
      G.persist();
      this.render();
    },

    puzzle(pid, action) {
      const c = G.active, pz = (c.puzzles || {})[pid];
      if (!pz) { G.toast('That analysis is not available.', 'alert'); return; }
      G.sound('click');
      Puzzles.open(pz, {
        onSolve: () => this.puzzleSolved(pid, pz),
        onHint: () => { G.state.hints++; G.persist(); }
      });
    },

    puzzleSolved(pid, pz) {
      const c = G.active, s = G.state;
      c.locations.forEach(loc => (loc.actions || []).forEach(a => {
        if (a.puzzle === pid && !s.done.includes(a.id)) s.done.push(a.id);
      }));
      if (pz.gives) G.granted(pz.gives);
      if (pz.flags) [].concat(pz.flags).forEach(f => s.flags[f] = true);
      if (pz.log) G.log('narr', pz.log);
      if (pz.bonusClue) G.addClue(pz.bonusClue);
      G.persist();
      this.render();
      G.toast('<b>Analysis complete.</b> ' + (pz.short || 'New evidence has been logged.'), 'check');
    },

    clue(id) {
      const c = G.active, cl = (c.clues || {})[id];
      if (!cl) return;
      const photo = A.cluePhoto(cl.icon || 'note', cl);
      const linked = cl.puzzle && (c.puzzles || {})[cl.puzzle];
      const m = G.modal({
        title: esc(cl.name), sub: esc(cl.caption || 'Physical evidence'), icon: 'search', wide: true,
        body: `<div class="evi-detail" style="display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:24px;align-items:start">
          <div>
            <div class="photo-frame"><div>${photo}</div><div class="cap">${esc(cl.caption || 'EVIDENCE')} · ${esc(c.id.toUpperCase())}</div></div>
          </div>
          <div>
            <h4>${esc(cl.name)}</h4>
            <div class="sub">${esc(cl.type || 'Evidence')}</div>
            <p>${cl.desc || ''}</p>
            ${cl.tells ? `<div class="evi-tell"><b>What it tells us</b>${cl.tells}</div>` : ''}
            ${cl.detail ? `<p style="margin-top:12px">${cl.detail}</p>` : ''}
            ${linked ? `<button class="btn btn-primary" style="margin-top:14px" id="analyse">${A.icon('lock')} Analyse this evidence</button>` : ''}
          </div>
        </div>`,
        footer: `<button class="btn" id="closeEv">Close</button>`
      });
      m.modal.querySelector('#closeEv').onclick = m.close;
      if (linked) {
        m.modal.querySelector('#analyse').onclick = () => { m.close(); setTimeout(() => this.puzzle(cl.puzzle), 120); };
      }
      if (window.innerWidth < 760) {
        const grid = m.body.querySelector('.evi-detail');
        if (grid) grid.style.gridTemplateColumns = '1fr';
      }
    },

    /* --------------------------------------------------------- */
    suspect(sid) {
      const c = G.active, s = G.state;
      const sp = (c.suspects || []).find(x => x.id === sid);
      if (!sp) return;
      if (!s.asked[sp.id]) s.asked[sp.id] = [];
      const self = this;
      const m = G.modal({
        title: esc(sp.name), sub: (sp.role || 'Person of interest') + (sp.locationName ? ' · ' + sp.locationName : ''), icon: 'user', wide: true,
        body: `<div class="int-row">
            <div><div class="int-face">${A.portrait(sp.portrait || { seed: sp.name })}</div>
              <div class="int-role">${esc(sp.tag || 'Interview')}</div></div>
            <div class="int-main">
              <div class="int-name">${esc(sp.name)}</div>
              <p style="margin-bottom:10px">${sp.intro || ''}</p>
              <div class="qlist"></div>
              <div class="answers"></div>
            </div>
          </div>`,
        footer: `<button class="btn" id="endInt">End interview</button>`
      });
      const qlist = m.body.querySelector('.qlist');
      const answers = m.body.querySelector('.answers');
      m.modal.querySelector('#endInt').onclick = m.close;
      function paint() {
        const asked = s.asked[sp.id];
        const qs = sp.questions || [];
        answers.innerHTML = asked.map(i => {
          const q = qs[i]; if (!q) return '';
          return `<div class="answer"><span class="who">${esc(sp.name)} · on “${esc(q.q)}”</span>${q.a}</div>`;
        }).join('');
        const remaining = qs.map((q, i) => ({ ...q, i })).filter(q => !asked.includes(q.i));
        qlist.innerHTML = remaining.length ? remaining.map(q => {
          const miss = self.requirement(c, q.requires, q.requiresFlags);
          if (miss) return `<div class="locked-q">${A.icon('lock')} <span>“${esc(q.q)}” — establish <b style="color:var(--violet-soft)">${esc(miss)}</b> first.</span></div>`;
          return `<button class="qbtn" data-q="${q.i}"><span class="qi">ASK</span><span>${esc(q.q)}</span>${q.present ? `<span style="margin-left:auto;font-size:10px;color:var(--magenta)">present evidence</span>` : ''}</button>`;
        }).join('') : `<div class="pz-note" style="padding:8px 0">You have asked everything useful for now.${(sp.after || '') ? ' ' + sp.after : ''}</div>`;
        qlist.querySelectorAll('[data-q]').forEach(b => b.onclick = () => {
          const q = qs[+b.dataset.q];
          if (!q) return;
          asked.push(+b.dataset.q);
          if (q.gives) G.granted(q.gives);
          if (q.flags) [].concat(q.flags).forEach(f => s.flags[f] = true);
          if (q.flag) s.flags[q.flag] = true;
          if (q.log) G.log('narr', q.log);
          G.log('narr', `<b>${esc(sp.name)}:</b> ${q.a}`);
          G.sound('click');
          G.persist();
          paint();
          if (q.follow) {
            // optional chained remark
            G.log('narr', `<b>${esc(sp.name)}:</b> ${q.follow}`);
          }
          setTimeout(() => { answers.scrollTop = answers.scrollHeight; }, 30);
          self.render();
        });
      }
      paint();
      if (window.innerWidth < 700) {
        const row = m.body.querySelector('.int-row');
        if (row) row.style.gridTemplateColumns = '1fr';
      }
    },

    /* --------------------------------------------------------- */
    briefing(first) {
      const c = G.active, s = G.state;
      const artOpts = Object.assign({}, c.cover || { kind: 'street' });
      const facts = c.facts || [];
      const m = G.modal({
        title: 'Case ' + String(c.num).padStart(2, '0'), sub: esc(c.title), icon: 'folder', wide: true,
        body: `<div class="brief-hero">${A.scene(artOpts.kind || 'street', artOpts)}
            <div class="ov"></div>
            <div class="cap"><div class="k">${esc(c.est || 'Investigation')} · ${'★'.repeat(c.difficulty || 1)}</div><h3>${esc(c.title)}</h3></div>
          </div>
          ${facts.length ? `<div class="brief-facts">${facts.map(f => `<div class="f"><span>${esc(f.k)}</span><b>${esc(f.v)}</b></div>`).join('')}</div>` : ''}
          <div class="brief-copy">${(c.briefing || []).map(p => `<p>${p}</p>`).join('')}</div>
          ${(c.objectives || []).length ? `<div class="divider"></div><div class="eyebrow" style="margin-bottom:8px">Your brief</div>
            <ul class="steps">${c.objectives.map((o, i) => `<li><span class="n">${i + 1}</span><span>${esc(o)}</span></li>`).join('')}</ul>` : ''}`,
        footer: `<button class="btn btn-sm" id="briefClose">Close</button><button class="btn btn-primary" id="briefGo">${first ? 'Begin investigation' : 'Return to the case'} ${A.icon('chevron')}</button>`
      });
      const begin = () => {
        m.close();
        if (first) {
          if (!s.visited) s.visited = [];
          if (!s.visited.includes(G.state.loc)) {
            s.visited.push(G.state.loc);
            const loc = c.locations.find(l => l.id === G.state.loc);
            if (loc && loc.intro) G.log('narr', loc.intro);
          }
          G.log('sys', `Case ${String(c.num).padStart(2, '0')} — ${c.title}`);
          if (c.opening) G.log('narr', c.opening);
          G.persist();
          this.render();
        } else this.render();
      };
      m.modal.querySelector('#briefClose').onclick = () => { m.close(); if (first) { this.render(); } };
      m.modal.querySelector('#briefGo').onclick = begin;
    },

    /* --------------------------------------------------------- */
    hint() {
      const c = G.active, s = G.state;
      if (!G.save.settings.hints) { G.toast('Hints are switched off in Settings.', 'alert'); return; }
      if (s.solved) { G.toast('This case is closed. Open another file, detective.', 'folder'); return; }
      const loc = this.currentLoc();
      let hint = null;
      const acts = this.availableActions(loc);
      const next = acts.find(a => !a._done && !a._miss);
      if (next) {
        hint = next.hint || `You have not yet: “${next.label}”.`;
      } else {
        const locked = acts.find(a => a._miss);
        if (locked) hint = `“${locked.label}” is still locked. You need to establish: ${locked._miss}.`;
        else {
          const unvisited = c.locations.filter(l => !s.visited.includes(l.id) && !this.locLocked(l));
          if (unvisited.length) hint = `Try ${unvisited[0].name}. You have not searched there yet.`;
          else {
            const clueGaps = Object.keys(c.clues || {}).filter(id => !s.found.includes(id));
            if (clueGaps.length) hint = `Evidence is still missing. Check every location and every interview — start with what you already have in the Evidence tab.`;
            else hint = `You have everything you need. Time to accuse someone.`;
          }
        }
      }
      s.hints++;
      G.persist();
      G.log('sys', 'HINT — ' + hint);
      G.toast('<b>Hint</b> — ' + esc(hint), 'spark', 8000);
      G.sound('click');
      this.render();
    },

    /* --------------------------------------------------------- */
    accuse() {
      const c = G.active, s = G.state;
      if (s.solved) { this.showVerdict(); return; }
      const qs = (c.solution && c.solution.questions) || [];
      if (!qs.length) { G.toast('This case has no accusation configured.', 'alert'); return; }
      const picked = {};
      const body = `
        <p style="margin-bottom:14px">Your report will go to the magistrate. One wrong conclusion and the case is torn up in open court. Choose carefully.</p>
        ${qs.map((q, qi) => `<div class="acc-q" data-q="${qi}">
          <div class="qh"><span>${String(qi + 1).padStart(2, '0')}</span>${q.q}</div>
          <div class="acc-opts">${(q.options || []).map((o, oi) => `<button class="acc-opt" data-q="${qi}" data-v="${esc(o.v)}">
            <span class="k">${String.fromCharCode(65 + oi)}</span><span>${o.t}</span></button>`).join('')}</div>
        </div>`).join('')}
        <div class="verdict-note" id="accWarning" style="${s.found.length < (c.solution.minEvidence || 0) ? '' : 'display:none'}">
          ${A.icon('alert')} You have <b>${s.found.length}</b> pieces of evidence. The magistrate recommends at least <b>${c.solution.minEvidence}</b>. You may proceed, but a thin file breaks easily.
        </div>`;
      const m = G.modal({
        title: 'Accuse', sub: 'Case ' + String(c.num).padStart(2, '0') + ' · ' + esc(c.title), icon: 'gavel', wide: true,
        body, footer: `<button class="btn" id="accCancel">Cancel</button><button class="btn btn-primary" id="accGo">${A.icon('gavel')} Submit findings</button>`
      });
      m.modal.querySelectorAll('.acc-opt').forEach(b => b.onclick = () => {
        const qi = b.dataset.q;
        m.modal.querySelectorAll(`.acc-opt[data-q="${qi}"]`).forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        picked[qi] = b.dataset.v;
        G.sound('click');
      });
      m.modal.querySelector('#accCancel').onclick = m.close;
      const go = m.modal.querySelector('#accGo');
      go.onclick = () => {
        if (Object.keys(picked).length < qs.length) { G.toast('Answer every question in the report before submitting.', 'alert'); return; }
        const wrongs = qs.filter((q, i) => String(picked[i]) !== String(q.answer));
        if (wrongs.length === 0) {
          m.close();
          this.solve();
        } else {
          s.wrong++;
          G.persist();
          G.sound('bad');
          const note = m.body.querySelector('#accWarning') || m.body.querySelector('.verdict-note');
          const warn = m.body.querySelector('#accWarning') || document.createElement('div');
          warn.className = 'verdict-note';
          warn.style.display = '';
          warn.innerHTML = `<b>The magistrate sets your report down.</b> “This is not it, detective. ${qs.length - wrongs.length === 0 ? 'Not one of these conclusions holds.' : 'At least one of these conclusions collapses under its own weight.'} Go back to the evidence before you ruin your name.”`;
          if (!warn.parentNode) m.body.appendChild(warn);
          go.textContent = 'Revise findings';
          go.onclick = () => { m.close(); this.render(); };
          warn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          G.log('bad', 'Your accusation was rejected. The magistrate sent you back to the evidence.');
          this.render();
        }
      };
    },

    solve() {
      const c = G.active, s = G.state;
      if (!s.solved) {
        let stars = 3;
        if (s.hints >= 3) stars--;
        if (s.hints >= 7) stars--;
        if (s.wrong >= 1) stars--;
        if (s.wrong >= 2) stars = 1;
        s.stars = Math.max(1, stars);
        s.solved = true;
        s.solvedAt = Date.now();
        G.save.last = c.id;
        G.log('good', 'CASE CLOSED — ' + c.title);
        G.persist();
        if (window.UI) UI.showCases; // noop guard
      }
      this.render();
      this.showVerdict(true);
    },

    showVerdict(fresh) {
      const c = G.active, s = G.state, sol = c.solution || {};
      const v = sol.verdict || {};
      const stars = s.stars || 1;
      const m = G.modal({
        title: 'Case Closed', sub: 'Case ' + String(c.num).padStart(2, '0') + ' · ' + esc(c.title), icon: 'check', wide: true,
        body: `<div class="closed-overlay">
            <div class="stamp">Case Closed</div>
            <div class="eyebrow" style="margin-bottom:6px">${esc(c.title)}</div>
            <div class="reveal-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
            <div class="reveal-rank">${s.wrong ? s.wrong + ' rejected accusation' + (s.wrong > 1 ? 's' : '') : 'Clean collar'} · ${s.hints} hint${s.hints === 1 ? '' : 's'} used</div>
            ${v.who ? `<div class="verdict-line"><div class="ic">${A.icon('user')}</div><div class="txt"><b>${esc(v.who)}</b>${v.whoDesc || 'was arrested and charged.'}</div></div>` : ''}
            ${v.how ? `<div class="verdict-line"><div class="ic">${A.icon('tool')}</div><div class="txt"><b>How it was done</b>${v.how}</div></div>` : ''}
            ${v.why ? `<div class="verdict-line"><div class="ic">${A.icon('spark')}</div><div class="txt"><b>Motive</b>${v.why}</div></div>` : ''}
            ${v.key ? `<div class="verdict-line"><div class="ic">${A.icon('search')}</div><div class="txt"><b>The evidence that broke it</b>${v.key}</div></div>` : ''}
            <div class="reveal-copy" style="margin-top:18px">${(sol.reveal || []).map(p => `<p>${p}</p>`).join('')}</div>
            ${sol.quote ? `<div class="quote" style="margin-top:18px;text-align:left">“${sol.quote}”<small>— case file closing note</small></div>` : ''}
            ${sol.twist ? `<div class="verdict-note good" style="margin-top:16px;text-align:left"><b>Final detail.</b> ${sol.twist}</div>` : ''}
          </div>`,
        footer: `<button class="btn" id="toFiles">Case files</button>${this.nextCase() ? `<button class="btn btn-primary" id="nextCase">Next case ${A.icon('chevron')}</button>` : `<button class="btn btn-primary" id="toFiles2">Back to the files</button>`}`
      });
      const goFiles = () => { m.close(); if (window.UI) UI.showCases(); };
      const b1 = m.modal.querySelector('#toFiles'); if (b1) b1.onclick = goFiles;
      const b2 = m.modal.querySelector('#toFiles2'); if (b2) b2.onclick = goFiles;
      const nx = m.modal.querySelector('#nextCase');
      if (nx) nx.onclick = () => { const id = this.nextCase(); m.close(); setTimeout(() => this.open(id), 180); };
      G.sound('stamp');
      if (fresh) {
        const rank = G.rank();
        setTimeout(() => G.toast(`<b>Case closed.</b> Rank: ${rank.title} · ${G.solvedCount()}/25 cases solved.`, 'badge', 6200), 700);
      }
    },

    nextCase() {
      const c = G.active;
      const open = G.cases.slice().sort((a, b) => a.num - b.num).find(x => x.num > c.num);
      return open ? open.id : null;
    }
  };
})();
