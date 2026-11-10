/* ============================================================
   Art core — helpers, icon set, hero backdrop
   All art is procedural SVG. No external assets.
   ============================================================ */
(function () {
  'use strict';

  const C = {
    ink: '#07040d',
    ink2: '#0b0614',
    coat: '#0d0817',
    purple: '#a855f7',
    violet: '#7c3aed',
    deep: '#3b1d5c',
    line: '#150b24',
    lilac: '#e9d5ff',
    soft: '#c9a4ff',
    magenta: '#e879f9',
    amber: '#fbbf24',
    acid: '#a3e635',
    cyan: '#67e8f9',
    blood: '#f43f5e',
    ok: '#34d399',
    skin: ['#f2c9a7', '#e0ac82', '#c68863', '#9b5f43', '#6f4230', '#f7d9bf'],
    hair: ['#1b1220', '#2b1a12', '#5b3a22', '#8a5a33', '#c9a24a', '#8d8d99', '#3c2a4d']
  };

  let _uid = 0;
  function uid(p) { return (p || 'a') + (++_uid); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function rng(seed) {
    let s = 0; const str = String(seed || 'x');
    for (let i = 0; i < str.length; i++) s = (s * 31 + str.charCodeAt(i)) >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function star(x, y, r, fill, op) {
    return `<path d="M${x} ${y - r}L${x + r * .28} ${y - r * .28}L${x + r} ${y}L${x + r * .28} ${y + r * .28}L${x} ${y + r}L${x - r * .28} ${y + r * .28}L${x - r} ${y}L${x - r * .28} ${y - r * .28}Z" fill="${fill}" opacity="${op == null ? 1 : op}"/>`;
  }

  /* shared gradient helpers --------------------------------- */
  function lg(id, stops, x1, y1, x2, y2) {
    return `<linearGradient id="${id}" x1="${x1 == null ? 0 : x1}" y1="${y1 == null ? 0 : y1}" x2="${x2 == null ? 0 : x2}" y2="${y2 == null ? 1 : y2}">${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}"${s[2] != null ? ` stop-opacity="${s[2]}"` : ''}/>`).join('')}</linearGradient>`;
  }
  function rg(id, stops, cx, cy, r) {
    return `<radialGradient id="${id}" cx="${cx == null ? .5 : cx}" cy="${cy == null ? .5 : cy}" r="${r == null ? .6 : r}">${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}"${s[2] != null ? ` stop-opacity="${s[2]}"` : ''}/>`).join('')}</radialGradient>`;
  }

  /* UI icons (24px, stroke) --------------------------------- */
  const ICONS = {
    back: '<path d="M15 19l-7-7 7-7"/>',
    chevron: '<path d="M9 18l6-6-6-6"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    magnify: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M8 10.5h5M10.5 8v5"/>',
    folder: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
    key: '<circle cx="8" cy="8" r="4"/><path d="M11 11l9 9M16 16l2-2M18.5 18.5l2-2"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3M12 14v3"/>',
    unlock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 017.5-2M12 14v3"/>',
    note: '<path d="M5 3h11l3 3v15H5z"/><path d="M16 3v4h4M8.5 11h7M8.5 15h7M8.5 7h3"/>',
    id: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8" cy="11" r="2.2"/><path d="M4.8 16.2c.5-1.6 1.7-2.4 3.2-2.4s2.7.8 3.2 2.4M14.5 10h4M14.5 13.5h4"/>',
    camera: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.4"/>',
    cctv: '<path d="M3 7l14-3 2 7-14 3z"/><path d="M5 14l-1 5M18 11l3 .8M9 7.5l2 5"/>',
    fingerprint: '<path d="M12 3a8 8 0 018 8M4 11a8 8 0 018-8M6.5 19a12 12 0 0011-8M9 20a20 20 0 007-9M9 15a10 10 0 015-6M12 16a6 6 0 003-5M12 12a2 2 0 012 2"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7.5 15h9"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
    users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c.7-3.4 3.2-5 6.5-5s5.8 1.6 6.5 5"/><path d="M16 5.2a3.4 3.4 0 010 6.4M18 15c2.2.4 3.4 2 3.8 4.4"/>',
    star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z"/>',
    play: '<path d="M7 4l13 8-13 8z"/>',
    volume: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M17 9a5 5 0 010 6M19.5 6.5a9 9 0 010 11"/>',
    check: '<path d="M5 13l4 4L19 7"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 9v5M12 17.5v.5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    book: '<path d="M4 4h7a3 3 0 013 3v14a3 3 0 00-3-3H4z"/><path d="M20 4h-7a3 3 0 00-3 3v14a3 3 0 013-3h7z"/>',
    gavel: '<path d="M14 3l7 7-3 3-7-7zM11 8l5 5M3 21l8-8M4 15l5 5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    wire: '<path d="M3 12h4c2 0 2-5 4-5s2 10 4 10 2-5 4-5h2"/><circle cx="3" cy="12" r="1.5"/><circle cx="21" cy="12" r="1.5"/>',
    sound: '<path d="M4 10v4h3l4 4V6l-4 4z"/><path d="M15 8.5a5 5 0 010 7M18 6a9 9 0 010 12"/>',
    photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.6"/><path d="M4 17l5-5 4 4 3-3 4 4"/>',
    chemical: '<path d="M10 3h4v6l4 7a2 2 0 01-2 3H8a2 2 0 01-2-3l4-7z"/><path d="M8 15h8"/>',
    ledger: '<path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h5M5 3v18"/>',
    blood: '<path d="M12 3s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z"/><path d="M9 14a3 3 0 003 3"/>',
    footprint: '<path d="M8 4c2 0 3 2 3 4s-1 4-3 4-3-1-3-3 1-5 3-5z"/><path d="M16 12c1.6 0 2.5 1.6 2.5 3.2S17.6 18 16 18s-2.5-1.2-2.5-2.8S14.4 12 16 12z"/><path d="M6 14v3M9 15v2M14 20v2M18 20v2"/>',
    pill: '<path d="M8 3h8a3 3 0 013 3v12a3 3 0 01-3 3H8a3 3 0 01-3-3V6a3 3 0 013-3z"/><path d="M5 12h14"/>',
    gun: '<path d="M3 9h13l3 3h2v4h-6l-2-2H7l-1 5H3z"/><path d="M9 9V7h5v2"/>',
    jewelry: '<circle cx="12" cy="14" r="6"/><path d="M8 5l4-2 4 2-2 4h-4z"/>',
    laptop: '<rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M2 20h20"/>',
    letter: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 7l9 6 9-6M7 17l4-4M17 17l-4-4"/>',
    watch: '<circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 1M9 4h6M9 20h6"/>',
    mask: '<path d="M3 8c3-2 6-2 9 0 3-2 6-2 9 0 0 6-3 10-9 10S3 14 3 8z"/><path d="M8 10c1 1 2 1 3 0M13 10c1 1 2 1 3 0"/>',
    news: '<path d="M4 4h13v16H4z"/><path d="M17 8h3v10a2 2 0 01-2 2H4"/><path d="M7 8h7M7 12h7M7 16h4"/>',
    badge: '<path d="M12 2l3 2 3.5.5L20 8l2 3-2 3-1 4-4 .5-3 2-3-2-4-.5-1-4-2-3 2-3 1.5-3.5L10 4z"/><path d="M9 11l2 2 4-4"/>',
    fiber: '<path d="M3 18c4-1 5-9 9-9s5 8 9 7"/><path d="M3 13c3-1 5-6 8-6M9 21c2-3 3-9 6-9"/>',
    car: '<path d="M3 15l2-6h14l2 6v4h-3M6 19H3v-4M6 19a2 2 0 104 0M16 19a2 2 0 104 0M10 19h6"/><path d="M5 9h14"/>',
    money: '<rect x="2" y="6" width="20" height="12" rx="1.5"/><circle cx="12" cy="12" r="3"/><path d="M5 9v6M19 9v6"/>',
    ticket: '<path d="M3 8h18v3a2 2 0 000 4v3H3v-3a2 2 0 000-4z"/><path d="M9 8v10" stroke-dasharray="2 2"/>',
    rope: '<path d="M5 4c6 2 8 6 8 10s-2 6-8 6"/><path d="M19 4c-6 2-8 6-8 10s2 6 8 6"/>',
    match: '<path d="M7 21L17 5"/><path d="M17 5c0-1.5 1-2.5 2.5-2.5S22 3.5 22 5s-1 2.5-2.5 2.5S17 6.5 17 5z"/>',
    sketch: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 5l3 3M4 20l3-3"/>',
    lockbox: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2M12 12v3M9 3h6"/>',
    cipher: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h3v3H8zM13 8h3v3h-3zM8 13h3v3H8zM13 13h3v3h-3z"/>',
    keypad: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="9" cy="8" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="15" cy="8" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="16" r="1"/><circle cx="12" cy="16" r="1"/><circle cx="15" cy="16" r="1"/>',
    ear: '<path d="M9 9a4 4 0 118 0c0 3-2 4-3 6s-1 4-4 4a4 4 0 01-4-4"/><path d="M10 9a2.5 2.5 0 015 0c0 2-1.5 2.5-2 4"/>',
    math: '<path d="M5 8h6M8 5v6M14 8h5M14 16h5M16.5 13.5v5"/><path d="M4 18l6-6"/>',
    archive: '<path d="M3 7h18v13H3z"/><path d="M2 3h20v4H2zM9 11h6"/>',
    coat: '<path d="M9 4l3 2 3-2 4 3-2 3-1-1v11H8V9L7 10 5 7z"/><path d="M12 6v3"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="9" width="3" height="8"/><rect x="17" y="6" width="3" height="11"/>',
    usb: '<path d="M9 3h6v5H9zM12 8v12"/><path d="M8 13h8v5H8z"/>'
  };

  function icon(name, cls) {
    const p = ICONS[name] || ICONS.note;
    return `<svg class="${cls || 'ic'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }

  /* logo mark ------------------------------------------------ */
  function logoMark() {
    return `<svg class="mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>${lg('lgmark', [[0, '#c9a4ff'], [1, '#7c3aed']])}</defs>
      <path d="M32 3l26 14v30L32 61 6 47V17z" stroke="url(#lgmark)" stroke-width="2" fill="rgba(20,10,38,.6)"/>
      <circle cx="28" cy="29" r="10" stroke="url(#lgmark)" stroke-width="2.2"/>
      <path d="M35.5 36.5L44 45" stroke="#e879f9" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 29c2-5 9-6 11-1" stroke="#e9d5ff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
      <circle cx="45" cy="19" r="2" fill="#e9d5ff"/>
    </svg>`;
  }

  /* hero — detective in the dark ----------------------------- */
  function hero() {
    const id = uid('hero');
    const sky = id + 'sky', moon = id + 'moon', lamp = id + 'lamp', coat = id + 'coat',
      floor = id + 'floor', fog = id + 'fog', rim = id + 'rim', glow = id + 'glow', sign = id + 'sign';
    let rain = '';
    const R = rng('rain-42');
    for (let i = 0; i < 110; i++) {
      const x = R() * 1600, y = R() * 780, l = 8 + R() * 26, o = .1 + R() * .4;
      rain += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - l * .28).toFixed(0)}" y2="${(y + l).toFixed(0)}" stroke="#c9a4ff" stroke-opacity="${o.toFixed(2)}" stroke-width="${R() > .8 ? 1.4 : .8}"/>`;
    }
    let stars = '';
    for (let i = 0; i < 60; i++) stars += `<circle cx="${(R() * 1600).toFixed(0)}" cy="${(R() * 420).toFixed(0)}" r="${(R() * 1.4 + .3).toFixed(1)}" fill="#c9a4ff" opacity="${(R() * .5 + .1).toFixed(2)}"/>`;
    const skyline = (x, w, h) => `<path d="M${x} ${780}V${420 - h}h${w * .3}v${30 + h * .2}h${w * .25}v-${18}H${x + w * .75}v${18}H${x + w}V780z" fill="#0a0614" stroke="#2a1642" stroke-width="1.2"/>`;

    return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A detective standing alone in the rain under a streetlamp, shrouded in darkness">
      <defs>
        ${lg(sky, [[0, '#0a0513'], [.45, '#140a26'], [.72, '#241040'], [1, '#0a0513']], 0, 0, 0, 1)}
        ${rg(moon, [[0, '#e9d5ff', .5], [.35, '#a855f7', .16], [1, '#a855f7', 0]])}
        ${rg(lamp, [[0, '#f5d0fe', .5], [.4, '#a855f7', .14], [1, '#7c3aed', 0]])}
        ${lg(coat, [[0, '#1a0f2b'], [.5, '#0d0817'], [1, '#07040d']], 0, 0, 0, 1)}
        ${lg(floor, [[0, '#150b24'], [1, '#07040d']], 0, 0, 0, 1)}
        ${rg(fog, [[0, '#a855f7', .18], [1, '#a855f7', 0]])}
        ${lg(rim, [[0, '#e9d5ff'], [.5, '#a855f7'], [1, '#7c3aed']], 0, 0, 1, 1)}
        ${lg(glow, [[0, '#e879f9'], [1, '#6d28d9']], 0, 0, 1, 0)}
        ${lg(sign, [[0, '#e9d5ff'], [1, '#7c3aed']], 0, 0, 0, 1)}
      </defs>
      <rect width="1600" height="900" fill="url(#${sky})"/>
      <circle cx="1180" cy="200" r="260" fill="url(#${moon})"/>
      <circle cx="1180" cy="200" r="88" fill="#e9d5ff" opacity=".12"/>
      <circle cx="1180" cy="200" r="58" fill="#f5e8ff" opacity=".2"/>
      ${stars}
      <g opacity=".9">
        ${skyline(20, 300, 150)}
        ${skyline(260, 260, 90)}
        ${skyline(1220, 320, 180)}
        ${skyline(1460, 200, 110)}
        <g fill="#0c0716" stroke="#2a1642" stroke-width="1">
          <rect x="80" y="330" width="180" height="450"/>
          <rect x="96" y="300" width="40" height="30"/>
          <rect x="150" y="286" width="22" height="44"/>
          <rect x="1330" y="300" width="210" height="480"/>
        </g>
        <g opacity=".5">
          ${[[110, 370], [160, 370], [210, 370], [110, 420], [160, 420], [210, 420], [110, 470], [210, 470], [1360, 350], [1410, 350], [1460, 350], [1360, 400], [1460, 400], [1410, 450], [1360, 500], [1460, 500]].map(p => `<rect x="${p[0]}" y="${p[1]}" width="16" height="24" fill="#a855f7" opacity="${.08 + Math.random() * .2}"/>`).join('')}
        </g>
      </g>

      <!-- fog banks -->
      <elipse cx="400" cy="700" rx="520" ry="110" fill="url(#${fog})"/>
      <ellipse cx="1200" cy="720" rx="560" ry="120" fill="url(#${fog})"/>

      <!-- street lamp -->
      <g>
        <circle cx="1332" cy="330" r="180" fill="url(#${lamp})" opacity=".8"/>
        <path d="M1332 770V330" stroke="#0b0614" stroke-width="12"/>
        <path d="M1332 770V330" stroke="#3a2159" stroke-width="3"/>
        <path d="M1332 338c0-40 42-52 62-30" stroke="#0b0614" stroke-width="10" fill="none"/>
        <path d="M1394 308l22 10-8 26-26-10z" fill="#0b0614" stroke="#4a2a74" stroke-width="2"/>
        <circle cx="1396" cy="330" r="7" fill="#f5d0fe"/>
      </g>
      <path d="M1290 340L1070 900h500L1440 340z" fill="url(#${lamp})" opacity=".22"/>
      <path d="M1306 350L1150 900h330L1400 350z" fill="#e9d5ff" opacity=".035"/>

      <!-- wet street -->
      <rect y="720" width="1600" height="180" fill="url(#${floor})"/>
      <path d="M0 780h1600" stroke="#2a1642" stroke-width="1.4" opacity=".8"/>
      <g stroke="#a855f7" opacity=".16">
        <path d="M1332 782v88M1348 790v66M1364 800v42" stroke-width="2"/>
      </g>
      <g fill="#0d0817" stroke="#2a1642" stroke-width="1.2">
        <path d="M0 790l260-10 40 120H0z"/>
        <path d="M1600 786l-300-8-26 122h326z"/>
      </g>

      <!-- detective silhouette -->
      <g transform="translate(960,150)">
        <ellipse cx="120" cy="755" rx="150" ry="20" fill="#000" opacity=".55"/>
        <!-- reflection -->
        <path d="M40 750c10 60 60 80 160 72 0 0-60 22-120 8-40-9-52-46-40-80z" fill="#7c3aed" opacity=".10"/>
        <!-- legs -->
        <path d="M72 540l-14 200h54l22-160 14 160h54l-18-204z" fill="url(#${coat})" stroke="#1c1030" stroke-width="2"/>
        <path d="M54 742l-6 16h70l-6-18zM148 742l-4 16h72l-8-18z" fill="#07040d" stroke="#241238" stroke-width="2"/>
        <!-- coat -->
        <path d="M64 250c0-26 22-42 58-42s60 16 60 44l14 160-20 132c-18 12-86 12-106 0l-20-136z" fill="url(#${coat})" stroke="#1c1030" stroke-width="2.5"/>
        <!-- coat opening + belt -->
        <path d="M122 212v330" stroke="#2a1642" stroke-width="2.5" opacity=".9"/>
        <path d="M60 470c38 12 84 12 128 0" stroke="#2a1642" stroke-width="9" opacity=".9"/>
        <rect x="114" y="464" width="20" height="18" rx="3" fill="#07040d" stroke="#4a2a74" stroke-width="1.5"/>
        <!-- shoulders / arms -->
        <path d="M66 250c-18 10-30 34-34 76l-10 122 26 6 22-118z" fill="#0b0614" stroke="#1c1030" stroke-width="2"/>
        <path d="M186 250c18 10 30 34 34 76l10 122-26 6-22-118z" fill="#0b0614" stroke="#1c1030" stroke-width="2"/>
        <path d="M28 448c-8 6-8 22 2 26l22 3 4-24z" fill="#07040d"/>
        <path d="M216 448c8 6 8 22-2 26l-22 3-4-24z" fill="#07040d"/>
        <!-- collar -->
        <path d="M88 220l34 34 34-34-16-22-18 12-18-12z" fill="#120a20" stroke="#3a2159" stroke-width="1.6"/>
        <!-- head -->
        <ellipse cx="122" cy="164" rx="40" ry="46" fill="#0b0614"/>
        <path d="M84 162c2-30 20-44 40-44 22 0 36 14 38 42-10-12-24-18-40-18-14 0-28 6-38 20z" fill="#07040d"/>
        <!-- fedora -->
        <ellipse cx="122" cy="128" rx="64" ry="14" fill="#0a0612" stroke="#2a1642" stroke-width="1.5"/>
        <path d="M76 128c2-26 10-40 46-40s44 14 46 40c-14 6-78 6-92 0z" fill="#0d0817" stroke="#2a1642" stroke-width="1.6"/>
        <path d="M82 121c24 6 60 6 82 0" stroke="#a855f7" stroke-width="2" opacity=".55"/>
        <!-- rim light -->
        <path d="M62 258c-4 60-4 140 6 200" stroke="url(#${rim})" stroke-width="3" opacity=".8" fill="none"/>
        <path d="M84 160c0-22 12-36 28-40" stroke="#e9d5ff" stroke-width="2.4" opacity=".65" fill="none"/>
        <path d="M82 126c4-22 14-32 34-33" stroke="#c9a4ff" stroke-width="2" opacity=".5" fill="none"/>
        <!-- glowing eyes hint -->
        <circle cx="110" cy="166" r="2.4" fill="#e9d5ff" opacity=".65"/>
        <circle cx="134" cy="166" r="2.4" fill="#e9d5ff" opacity=".65"/>
      </g>

      <!-- neon sign -->
      <g transform="translate(120,470)" opacity=".9">
        <rect x="0" y="0" width="54" height="196" rx="4" fill="#0a0612" stroke="#6d28d9" stroke-width="1.2"/>
        <path d="M0 26h54M0 170h54" stroke="#3b1d5c"/>
        <text x="27" y="62" fill="#e9d5ff" font-family="Georgia,serif" font-size="24" text-anchor="middle" letter-spacing="2">S</text>
        <text x="27" y="92" fill="#e9d5ff" font-family="Georgia,serif" font-size="24" text-anchor="middle" letter-spacing="2">H</text>
        <text x="27" y="122" fill="#e9d5ff" font-family="Georgia,serif" font-size="24" text-anchor="middle" letter-spacing="2">A</text>
        <text x="27" y="152" fill="#e9d5ff" font-family="Georgia,serif" font-size="24" text-anchor="middle" letter-spacing="2">R</text>
        <rect x="8" y="178" width="38" height="2" fill="#e879f9" opacity=".8"/>
      </g>

      <!-- rain foreground -->
      <g>${rain}</g>
      <rect width="1600" height="900" fill="url(#${fog})" opacity=".12"/>
    </svg>`;
  }

  window.Art = {
    C, uid, esc, rng, star, lg, rg, icon, logoMark, hero,
    get icons() { return ICONS; }
  };
})();
