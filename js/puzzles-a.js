/* ============================================================
   Puzzles A — framework, keypad, dial, cipher, terminal,
   math, logic grid, multiple choice
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art, C = A.C;
  const Puzzles = window.Puzzles = {};

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function closeModal(back) {
    if (!back) return;
    back.style.animation = 'fadein .18s ease reverse both';
    setTimeout(() => back.remove(), 150);
  }
  function sound(kind) {
    if (window.Game && Game.sound) Game.sound(kind);
  }

  Puzzles.open = function (pz, ctx) {
    if (!pz) return;
    ctx = ctx || {};
    const back = el('div', 'modal-back');
    const modal = el('div', 'modal');
    const iconName = pz.icon || 'search';
    modal.innerHTML = `
      <div class="modal-head">
        <div class="ih">${A.icon(iconName)}</div>
        <div><h2>${A.esc(pz.title || 'Investigation')}</h2><div class="sub">${A.esc(pz.subtitle || 'Interactive deduction')}</div></div>
        <button class="btn icon-btn x" title="Close" aria-label="Close">${A.icon('x')}</button>
      </div>
      <div class="modal-body pz">
        <div class="pz-prompt">${pz.prompt || ''}</div>
        <div class="pz-stage"></div>
        <div class="pz-hintbox"></div>
        <div class="pz-feedback" style="min-height:18px;font-size:12.5px;margin-top:10px;color:#fda4af"></div>
      </div>
      <div class="modal-foot">
        ${pz.hintText ? `<button class="btn btn-sm hintbtn">${A.icon('spark')} Hint</button>` : ''}
        <button class="btn btn-sm closebtn">Close</button>
      </div>`;
    back.appendChild(modal);
    document.getElementById('modal-root').appendChild(back);

    const stage = modal.querySelector('.pz-stage');
    const hintbox = modal.querySelector('.pz-hintbox');
    const feedback = modal.querySelector('.pz-feedback');
    const hintbtn = modal.querySelector('.hintbtn');
    let solved = false;

    const api = {
      pz, ctx, modal, stage, feedback,
      note(msg, good) {
        feedback.style.color = good ? '#a7f3d0' : '#fda4af';
        feedback.innerHTML = msg || '';
      },
      shake() {
        const d = stage.querySelector('.device') || stage.firstElementChild;
        if (d) { d.classList.remove('shake'); void d.offsetWidth; d.classList.add('shake'); }
        sound('bad');
      },
      hint() {
        if (!pz.hintText) return;
        hintbox.classList.add('show');
        hintbox.innerHTML = A.icon('spark') + ' ' + pz.hintText;
        if (ctx.onHint) ctx.onHint(pz);
        sound('click');
      },
      solve(msg) {
        if (solved) return;
        solved = true;
        sound('good');
        stage.innerHTML = `<div style="text-align:center;padding:30px 10px 16px">
          <div style="width:74px;height:74px;margin:0 auto 16px;border-radius:50%;display:grid;place-items:center;
            border:2px solid rgba(52,211,153,.6);background:rgba(6,78,59,.25);color:#6ee7b7;box-shadow:0 0 40px rgba(52,211,153,.25)">
            ${A.icon('check')}
          </div>
          <div class="eyebrow" style="margin-bottom:6px">Breakthrough</div>
          <h3 style="font-size:24px;margin:0 0 8px">${A.esc(pz.successTitle || 'Cracked it.')}</h3>
          <p style="max-width:44ch;margin:0 auto;color:var(--muted);font-size:13.5px">${msg || pz.success || ''}</p>
        </div>`;
        hintbox.classList.remove('show');
        if (hintbtn) hintbtn.remove();
        const foot = modal.querySelector('.modal-foot');
        foot.innerHTML = '';
        const cont = el('button', 'btn btn-primary', 'Continue ' + A.icon('chevron'));
        cont.onclick = () => closeModal(back);
        foot.appendChild(cont);
        if (ctx.onSolve) ctx.onSolve(pz);
      },
      close() { closeModal(back); }
    };

    modal.querySelector('.closebtn').onclick = () => closeModal(back);
    modal.querySelector('.x').onclick = () => closeModal(back);
    if (hintbtn) hintbtn.onclick = () => api.hint();
    back.addEventListener('mousedown', e => { if (e.target === back) closeModal(back); });
    document.addEventListener('keydown', function esc(e) {
      if (!document.body.contains(back)) return document.removeEventListener('keydown', esc);
      if (e.key === 'Escape') closeModal(back);
    });

    const renderer = Puzzles.types[pz.type] || Puzzles.types.choice;
    try { renderer(pz, api); }
    catch (err) { console.error('Puzzle error', pz.type, err); stage.innerHTML = `<p>This puzzle failed to render. (${A.esc(pz.type)})</p>`; }
    return api;
  };

  Puzzles.types = {};

  /* ---------- keypad ---------- */
  Puzzles.types.keypad = function (pz, api) {
    const len = pz.length || String(pz.code || '0000').length;
    let value = '';
    const wrap = el('div', 'device');
    wrap.innerHTML = `<div class="device-screen">
        <div class="lbl">${A.esc(pz.deviceLabel || 'SECURE DEVICE')}</div>
        <div class="val"></div>
        <div class="dots">${Array.from({ length: len }, () => '<span class="dot"></span>').join('')}</div>
      </div>
      <div class="keypad">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button class="key" data-k="${n}">${n}</button>`).join('')}
        <button class="key" data-k="del">⌫</button><button class="key" data-k="0">0</button>
        <button class="key warn" data-k="clr">C</button>
        <button class="key wide" data-k="ok" style="grid-column:span 3">UNLOCK</button>
      </div>`;
    api.stage.appendChild(wrap);
    const valEl = wrap.querySelector('.val');
    const dots = [...wrap.querySelectorAll('.dot')];
    let tries = 0;
    function paint() {
      valEl.textContent = pz.masked ? '•'.repeat(value.length) : (value || '·'.repeat(len));
      dots.forEach((d, i) => d.classList.toggle('on', i < value.length));
    }
    paint();
    function press(k) {
      if (k >= '0' && k <= '9') { if (value.length < len) { value += k; sound('tick'); } }
      else if (k === 'del') value = value.slice(0, -1);
      else if (k === 'clr') value = '';
      else if (k === 'ok') return submit();
      paint();
    }
    wrap.querySelectorAll('.key').forEach(b => b.onclick = () => press(b.dataset.k));
    api.currentKeys = press;
    function submit() {
      if (value.length < len) { api.note('The code is ' + len + ' digits.'); api.shake(); return; }
      if (value === String(pz.code)) {
        api.note('');
        api.solve(pz.success || 'The lock clicks open.');
      } else {
        tries++;
        api.note(tries >= 2 ? 'Wrong again. Check the case notes — the code is in there somewhere.' : 'Incorrect. The screen flashes red.');
        api.shake();
        value = '';
        paint();
        if (tries >= 3 && pz.hintText) api.hint();
      }
    }
    // physical keyboard
    const kh = e => {
      if (!document.body.contains(wrap)) { document.removeEventListener('keydown', kh); return; }
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') { e.preventDefault(); press('del'); }
      else if (e.key === 'Enter') press('ok');
    };
    document.addEventListener('keydown', kh);
  };

  /* ---------- safe dial ---------- */
  Puzzles.types.dial = function (pz, api) {
    const code = pz.code || [12, 24, 36];
    const labels = pz.labels || code.map((_, i) => 'WHEEL ' + (i + 1));
    const vals = code.map(() => 0);
    const wrap = el('div', 'device', `<div class="dial-wrap"></div>
      <div style="text-align:center;margin-top:16px"><button class="btn btn-primary dial-ok">OPEN SAFE</button></div>`);
    const dw = wrap.querySelector('.dial-wrap');
    vals.forEach((v, i) => {
      const d = el('div', 'dial', `<div class="n">0</div>
        <button class="ar up" aria-label="increase">▲</button>
        <button class="ar down" aria-label="decrease">▼</button>
        <div class="cap">${A.esc(labels[i] || '')}</div>`);
      const n = d.querySelector('.n');
      const step = (delta) => {
        vals[i] = (vals[i] + delta + 100) % 100;
        n.textContent = String(vals[i]).padStart(2, '0');
        sound('tick');
      };
      d.querySelector('.up').onclick = () => step(1);
      d.querySelector('.down').onclick = () => step(-1);
      step(0);
      dw.appendChild(d);
    });
    wrap.querySelector('.dial-ok').onclick = () => {
      if (vals.every((v, i) => v === Number(code[i]))) api.solve(pz.success || 'The bolts retract with a heavy thunk.');
      else { api.note('The dials spin freely. Wrong combination.'); api.shake(); }
    };
    api.stage.appendChild(wrap);
  };

  /* ---------- cipher ---------- */
  function caesar(text, n) {
    return String(text).replace(/[a-z]/gi, c => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + ((n % 26) + 26) % 26) % 26 + base);
    });
  }
  Puzzles.types.cipher = function (pz, api) {
    const shift = Number(pz.shift == null ? 3 : pz.shift);
    const cipherText = pz.cipher || caesar(pz.plain || '', shift);
    let current = 0;
    const wrap = el('div', '', `
      <div class="cipher-box"><span class="ct">${A.esc(cipherText)}</span></div>
      <div class="shift-row">
        <span style="font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)">Decode</span>
        <input type="range" min="0" max="25" value="0" aria-label="Cipher shift">
        <span class="sv">SHIFT 0</span>
      </div>
      <div class="pz-note">${A.esc(pz.note || 'Turn the wheel until the text resolves. Watch the words, not the letters.')}</div>
      <div class="answer-entry">
        <input class="ans" type="text" placeholder="${A.esc(pz.placeholder || 'Type what it says…')}" autocomplete="off">
        <button class="btn btn-primary submit">Submit</button>
      </div>`);
    api.stage.appendChild(wrap);
    const range = wrap.querySelector('input[type=range]');
    const ct = wrap.querySelector('.ct');
    const sv = wrap.querySelector('.sv');
    const input = wrap.querySelector('.ans');
    function paint() {
      const n = Number(range.value);
      current = n;
      sv.textContent = 'SHIFT ' + n;
      ct.textContent = caesar(cipherText, -n);
      ct.style.color = (n === shift) ? '#a7f3d0' : '#d8b4fe';
    }
    range.oninput = paint; paint();
    const submit = () => {
      const ans = norm(input.value);
      const accept = [].concat(pz.answer || []).map(norm);
      if (!ans) { api.note('Write the decoded message first.'); return; }
      if (accept.includes(ans)) { api.note(''); api.solve(pz.success); }
      else { api.note('That is not it. Adjust the wheel and read it again.'); sound('bad'); }
    };
    wrap.querySelector('.submit').onclick = submit;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  };

  /* ---------- terminal ---------- */
  Puzzles.types.terminal = function (pz, api) {
    const files = pz.files || [];
    const user = pz.user || 'investigator';
    const host = pz.host || 'evidence-node';
    const password = String(pz.password || '');
    const wrap = el('div', 'term');
    wrap.innerHTML = `<div class="term-bar"><i></i><i></i><i></i><span>${A.esc(user)}@${A.esc(host)}: ~</span></div>
      <div class="term-out"></div>
      <div class="term-in"><span class="ps">$</span><input type="text" autocomplete="off" spellcheck="false" aria-label="Terminal input"></div>`;
    api.stage.appendChild(wrap);
    const out = wrap.querySelector('.term-out');
    const input = wrap.querySelector('input');
    let unlocked = false;
    function print(html, cls) {
      const line = el('div', cls || '', html);
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    }
    print(`<span class="d">${A.esc(pz.intro || 'Connection established. Type "help" for commands.')}</span>`);
    print(`<span class="d">${A.esc(pz.banner || 'ROOT ACCESS: RESTRICTED')}</span>`);
    setTimeout(() => input.focus(), 60);
    function run(raw) {
      const cmd = raw.trim();
      if (!cmd) return;
      print(`<span class="g">${A.esc(user)}@${A.esc(host)}</span>:~$ ${A.esc(cmd)}`);
      let [c, ...rest] = cmd.split(/\s+/);
      let arg = rest.join(' ');
      // A bare password is accepted as a shortcut for "unlock <password>".
      if (password && cmd.toLowerCase() === password.toLowerCase()) { c = 'unlock'; arg = cmd; }
      switch (c.toLowerCase()) {
        case 'help':
          print('Commands: <span class="g">ls</span>  <span class="g">cat &lt;file&gt;</span>  <span class="g">unlock &lt;password&gt;</span>  <span class="g">clear</span>');
          break;
        case 'ls': case 'dir':
          print(files.map(f => `<span class="${f.locked ? 'y' : 'g'}">${A.esc(f.name)}</span>${f.locked ? ' <span class="d">[ENCRYPTED]</span>' : ''}`).join('<br>') || '<span class="d">No files.</span>');
          break;
        case 'cat': case 'open': case 'read': {
          const f = files.find(f => f.name.toLowerCase() === arg.toLowerCase());
          if (!f) { print(`<span class="r">File not found: ${A.esc(arg)}</span>`); break; }
          if (f.locked && !unlocked) { print(`<span class="r">ACCESS DENIED.</span> ${A.esc(f.hint || 'This file is encrypted. Administrator password required.')}`); break; }
          print(`<span class="y">── ${A.esc(f.name)} ──</span>`);
          print(f.body);
          if (f.unlocks) api.solve(pz.success || 'The encrypted file opens. This is what you needed.');
          break;
        }
        case 'unlock': case 'sudo': case 'login':
          if (!arg) { print('<span class="d">Usage: unlock &lt;password&gt;</span>'); break; }
          if (arg.toLowerCase() === password.toLowerCase()) {
            unlocked = true;
            print('<span class="g">✓ PASSWORD ACCEPTED. Decrypting secure volume…</span>');
            const secret = files.find(f => f.secret) || files.find(f => f.locked);
            if (secret) {
              print(`<span class="y">── ${A.esc(secret.name)} ──</span>`);
              print(secret.body);
            }
            api.solve(pz.success || 'The secured file spills open across the screen.');
          } else {
            print('<span class="r">✗ PASSWORD REJECTED. Intrusion logged.</span>');
            sound('bad');
          }
          break;
        case 'clear': case 'cls':
          out.innerHTML = '';
          break;
        default:
          print(`<span class="r">command not found: ${A.esc(c)}</span> <span class="d">(try "help")</span>`);
      }
    }
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { const v = input.value; input.value = ''; run(v); }
    });
    wrap.addEventListener('click', e => { if (!e.target.closest('input')) input.focus(); });
  };

  /* ---------- numeric answer ---------- */
  Puzzles.types.math = function (pz, api) {
    const wrap = el('div', '', `
      <div class="pz-note" style="margin-bottom:10px">${pz.info || ''}</div>
      <div class="num-entry">
        <input type="text" inputmode="decimal" placeholder="${A.esc(pz.placeholder || '0')}" autocomplete="off">
        <span class="unit">${A.esc(pz.unit || '')}</span>
        <button class="btn btn-primary submit">Check</button>
      </div>
      ${pz.working ? `<div class="pz-note" style="margin-top:12px;font-family:var(--mono)">${pz.working}</div>` : ''}`);
    api.stage.appendChild(wrap);
    const input = wrap.querySelector('input');
    const submit = () => {
      const v = parseFloat(String(input.value).replace(/[^0-9.\-]/g, ''));
      const target = Number(pz.answer);
      const tol = pz.tolerance == null ? 0.01 : Number(pz.tolerance);
      if (isNaN(v)) { api.note('Enter a number.'); return; }
      if (Math.abs(v - target) <= tol) api.solve(pz.success);
      else { api.note(pz.wrong || 'That does not fit the measurements. Recheck your arithmetic.'); api.shake(); }
    };
    wrap.querySelector('.submit').onclick = submit;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    setTimeout(() => input.focus(), 80);
  };

  /* ---------- logic grid ---------- */
  Puzzles.types.logicgrid = function (pz, api) {
    const rows = pz.rows || [];
    const wrap = el('div', 'logic-rows');
    rows.forEach((r, ri) => {
      const row = el('div', 'logic-row');
      row.innerHTML = `<div class="lab">${A.esc(r.label)}</div>
        ${(r.selects || []).map((sel, si) => `<select data-r="${ri}" data-s="${si}">
          <option value="">— ${A.esc(sel.label || 'select')} —</option>
          ${(sel.options || []).map(o => `<option value="${A.esc(o.v)}">${A.esc(o.t)}</option>`).join('')}
        </select>`).join('')}`;
      wrap.appendChild(row);
    });
    const btn = el('button', 'btn btn-primary', 'Confirm deduction');
    btn.style.marginTop = '14px';
    api.stage.appendChild(wrap);
    api.stage.appendChild(btn);
    btn.onclick = () => {
      const sels = [...wrap.querySelectorAll('select')];
      if (sels.some(s => !s.value)) { api.note('Fill every field before you commit.'); return; }
      const ok = rows.every((r, ri) => (r.selects || []).every((sel, si) => {
        const s = sels.find(x => +x.dataset.r === ri && +x.dataset.s === si);
        return s && s.value === String(sel.answer);
      }));
      if (ok) api.solve(pz.success);
      else { api.note(pz.wrong || 'The pieces do not line up yet. Cross-check the evidence.'); api.shake(); }
    };
  };

  /* ---------- multiple choice deduction ---------- */
  Puzzles.types.choice = function (pz, api) {
    let picked = null;
    const wrap = el('div', 'choice-list');
    (pz.options || []).forEach((o, i) => {
      const b = el('button', 'choice', `<span class="k">${String.fromCharCode(65 + i)}</span><span>${A.esc(o.t)}</span>`);
      b.onclick = () => {
        wrap.querySelectorAll('.choice').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel'); picked = o.v; sound('click');
      };
      wrap.appendChild(b);
    });
    const submit = el('button', 'btn btn-primary', 'Confirm');
    submit.style.marginTop = '12px';
    submit.onclick = () => {
      if (picked == null) { api.note('Choose an answer first.'); return; }
      if (String(picked) === String(pz.answer)) api.solve(pz.success);
      else { api.note(pz.wrong || 'No. The evidence does not support that.'); api.shake(); }
    };
    const box = el('div');
    box.appendChild(wrap); box.appendChild(submit);
    api.stage.appendChild(box);
  };

  Puzzles.util = { el, norm, caesar, closeModal, sound };
})();
