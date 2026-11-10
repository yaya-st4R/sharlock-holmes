/* ============================================================
   Art figures — cartoon portraits + evidence photographs
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  const C = A.C, uid = A.uid, lg = A.lg, rg = A.rg, esc = A.esc, rng = A.rng, star = A.star;

  /* ---------- portraits ---------- */
  function portrait(o) {
    o = o || {};
    const R = rng(o.seed != null ? o.seed : 'face');
    const id = uid('p');
    const skinIdx = o.skin != null ? o.skin : Math.floor(R() * C.skin.length);
    const skin = C.skin[skinIdx];
    const skinShade = C.skin[(skinIdx + 3) % C.skin.length];
    const hair = o.hairColor || C.hair[Math.floor(R() * C.hair.length)];
    const hairStyle = o.hair || ['short', 'bob', 'long', 'bun', 'curly', 'buzz', 'wavy', 'ponytail'][Math.floor(R() * 8)];
    const expr = o.expression || 'neutral';
    const glasses = o.glasses || null;
    const hat = o.hat || null;
    const beard = o.beard || null;
    const collar = o.collar || 'shirt';
    const bgTint = o.tint || (R() > .5 ? '#3b1d5c' : '#4a1f5f');
    const age = o.age || 'adult';
    const child = age === 'child';
    const old = age === 'old';
    const headY = child ? 118 : 108;
    const headRx = child ? 38 : 44;
    const headRy = child ? 44 : 50;

    const eyeY = headY + (child ? 2 : 3);
    const eyeDX = child ? 15 : 17;
    const eyeR = 3.4;

    const hairBack = {
      long: `<path d="M${120 - 54} ${headY - 18}c0-52 108-52 108 0v${child ? 70 : 100}h-24V${headY - 10}c-8 20-60 20-60 0v${child ? 70 : 100}h-24z" fill="${hair}" stroke="#150b24" stroke-width="2"/>`,
      bob: `<path d="M${120 - 50} ${headY - 14}c0-48 100-48 100 0v28c0 34-18 42-50 42s-50-8-50-42z" fill="${hair}" stroke="#150b24" stroke-width="2"/>`,
      curly: `<g fill="${hair}" stroke="#150b24" stroke-width="2">${Array.from({ length: 12 }, (_, i) => `<circle cx="${72 + (i % 6) * 20 + (i > 5 ? 10 : 0)}" cy="${headY - 36 + Math.floor(i / 6) * 16}" r="16"/>`).join('')}</g>`,
      bun: `<circle cx="120" cy="${headY - 58}" r="20" fill="${hair}" stroke="#150b24" stroke-width="2"/>`,
      ponytail: `<path d="M150 ${headY - 30}c34 10 40 50 26 86 18-44 4-82-26-92z" fill="${hair}" stroke="#150b24" stroke-width="2"/>`,
      wavy: `<path d="M${120 - 48} ${headY - 16}c0-46 96-46 96 0v22c-10 10-20-10-30 2s-20-8-30 4-22-6-36 4z" fill="${hair}"/>`,
      buzz: '',
      short: ''
    }[hairStyle] || '';

    const hairFront = {
      short: `<path d="M${120 - 46} ${headY - 20}c2-34 22-46 46-46s44 12 46 46c-14-18-30-26-46-26s-32 8-46 26z" fill="${hair}"/>`,
      buzz: `<path d="M${120 - 44} ${headY - 22}c4-30 22-42 44-42s40 12 44 42c-16-14-30-18-44-18s-28 4-44 18z" fill="${hair}" opacity=".85"/>`,
      bob: `<path d="M${120 - 48} ${headY - 22}c4-34 24-46 48-46s44 12 48 46c-14-16-30-24-48-24s-34 8-48 24z" fill="${hair}"/>`,
      long: `<path d="M${120 - 50} ${headY - 22}c2-36 24-48 50-48s48 12 50 48c-16-16-32-24-50-24s-34 8-50 24z" fill="${hair}"/>`,
      bun: `<path d="M${120 - 45} ${headY - 22}c2-34 22-46 45-46s43 12 45 46c-14-16-28-24-45-24s-31 8-45 24z" fill="${hair}"/>`,
      curly: `<path d="M${120 - 46} ${headY - 24}c2-30 20-44 46-44s44 14 46 44c-14-14-30-20-46-20s-32 6-46 20z" fill="${hair}"/>`,
      ponytail: `<path d="M${120 - 46} ${headY - 22}c2-34 22-46 46-46s44 12 46 46c-14-16-30-24-46-24s-32 8-46 24z" fill="${hair}"/>`,
      wavy: `<path d="M${120 - 47} ${headY - 22}c2-32 23-44 47-44s45 12 47 44c-12-14-28-22-47-22s-35 8-47 22z" fill="${hair}"/>`
    }[hairStyle] || '';

    const browY = eyeY - 12;
    const brow = expr === 'angry'
      ? `<path d="M${120 - eyeDX - 9} ${browY + 2}l18-6M${120 + eyeDX + 9} ${browY + 2}l-18-6" stroke="${hair}" stroke-width="3.6" stroke-linecap="round"/>`
      : expr === 'sad'
        ? `<path d="M${120 - eyeDX - 9} ${browY - 2}l18 4M${120 + eyeDX + 9} ${browY - 2}l-18 4" stroke="${hair}" stroke-width="3.2" stroke-linecap="round"/>`
        : `<path d="M${120 - eyeDX - 9} ${browY}q9-4 18 0M${120 + eyeDX + 9} ${browY}q-9-4-18 0" stroke="${hair}" stroke-width="3" stroke-linecap="round" fill="none"/>`;

    const mouth = {
      neutral: `<path d="M${120 - 11} ${headY + 31}q11 4 22 0" stroke="#7a3b39" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      smile: `<path d="M${120 - 14} ${headY + 28}q14 13 28 0" stroke="#7a3b39" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      sad: `<path d="M${120 - 12} ${headY + 34}q12-10 24 0" stroke="#7a3b39" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      wary: `<path d="M${120 - 12} ${headY + 32}q12-2 24 0" stroke="#7a3b39" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      angry: `<path d="M${120 - 13} ${headY + 33}q13-7 26 0" stroke="#7a3b39" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      shock: `<ellipse cx="120" cy="${headY + 32}" rx="8" ry="10" fill="#5c2b2b" stroke="#7a3b39" stroke-width="2"/>`,
      smug: `<path d="M${120 - 13} ${headY + 30}q14 8 26-2" stroke="#7a3b39" stroke-width="3" fill="none" stroke-linecap="round"/>`
    }[expr] || `<path d="M${120 - 11} ${headY + 31}q11 4 22 0" stroke="#7a3b39" stroke-width="3" fill="none"/>`;

    const glassMap = {
      round: `<g fill="none" stroke="#e9d5ff" stroke-width="2.2" opacity=".9"><circle cx="${120 - eyeDX}" cy="${eyeY}" r="11"/><circle cx="${120 + eyeDX}" cy="${eyeY}" r="11"/><path d="M${120 - 6} ${eyeY}h12M${120 - eyeDX - 11} ${eyeY - 2}l-10-4M${120 + eyeDX + 11} ${eyeY - 2}l10-4"/></g>`,
      square: `<g fill="none" stroke="#c9a4ff" stroke-width="2.4" opacity=".9"><rect x="${120 - eyeDX - 12}" y="${eyeY - 9}" width="23" height="18" rx="2"/><rect x="${120 + eyeDX - 11}" y="${eyeY - 9}" width="23" height="18" rx="2"/><path d="M${120 - 8} ${eyeY}h16"/></g>`,
      shades: `<g><rect x="${120 - eyeDX - 13}" y="${eyeY - 9}" width="25" height="17" rx="4" fill="#0a0612" stroke="#4a2a74"/><rect x="${120 + eyeDX - 12}" y="${eyeY - 9}" width="25" height="17" rx="4" fill="#0a0612" stroke="#4a2a74"/><path d="M${120 - 8} ${eyeY - 1}h16" stroke="#4a2a74" stroke-width="3"/></g>`
    };

    const hatMap = {
      fedora: `<g><ellipse cx="120" cy="${headY - 39}" rx="62" ry="12" fill="#0d0817" stroke="#3a2159" stroke-width="2"/><path d="M${120 - 38} ${headY - 40}c2-28 12-40 38-40s36 12 38 40c-16 6-62 6-76 0z" fill="#170d27" stroke="#3a2159" stroke-width="2"/><path d="M${120 - 32} ${headY - 44}c20 5 44 5 64 0" stroke="#6d28d9" stroke-width="3"/></g>`,
      cap: `<g><path d="M${120 - 42} ${headY - 32}c0-28 20-40 42-40s42 12 42 40z" fill="#241338" stroke="#3a2159" stroke-width="2"/><path d="M${120 + 30} ${headY - 32}h36c6 0 8 8 2 10h-38z" fill="#170d27" stroke="#3a2159" stroke-width="2"/></g>`,
      beanie: `<g><path d="M${120 - 42} ${headY - 30}c0-32 20-44 42-44s42 12 42 44z" fill="#3a2159" stroke="#150b24" stroke-width="2"/><rect x="${120 - 44}" y="${headY - 36}" width="88" height="16" rx="7" fill="#4a2a74" stroke="#150b24"/></g>`,
      hood: `<g><path d="M${120 - 54} ${headY + 40}c0-70 22-94 54-94s54 24 54 94c-12-12-24-18-54-18s-42 6-54 18z" fill="#1b1029" stroke="#3a2159" stroke-width="2"/></g>`,
      veil: `<g><path d="M${120 - 54} ${headY - 40}c0-30 24-46 54-46s54 16 54 46v70c-16-20-30-30-54-30s-38 10-54 30z" fill="#e9d5ff" opacity=".18" stroke="#e9d5ff" stroke-width="1"/></g>`
    };

    const beardMap = {
      stubble: `<path d="M${120 - 34} ${headY + 18}c4 26 18 36 34 36s30-10 34-36c-10 14-22 20-34 20s-24-6-34-20z" fill="${hair}" opacity=".35"/>`,
      beard: `<path d="M${120 - 38} ${headY + 8}c0 34 16 52 38 52s38-18 38-52c-10 20-22 26-38 26s-28-6-38-26z" fill="${hair}" stroke="#150b24" stroke-width="2"/><path d="M${120 - 12} ${headY + 30}q12 6 24 0" stroke="#7a3b39" stroke-width="2.6" fill="none"/>`,
      goatee: `<path d="M${120 - 13} ${headY + 30}c2 18 8 24 13 24s11-6 13-24c-6 6-20 6-26 0z" fill="${hair}"/>`,
      mustache: `<path d="M${120 - 17} ${headY + 26}c8-6 26-6 34 0-4 6-10 8-17 8s-13-2-17-8z" fill="${hair}"/>`
    };

    const collarMap = {
      shirt: `<path d="M74 190l46-26 46 26-8 34H82z" fill="#241338" stroke="#3a2159" stroke-width="2"/><path d="M120 164l-12 30 12 12 12-12z" fill="#3a2159"/>`,
      suit: `<path d="M70 196l50-32 50 32-10 44H80z" fill="#0d0817" stroke="#3a2159" stroke-width="2"/><path d="M120 164l-18 40 18 22 18-22z" fill="#f5f0ff" opacity=".9"/><path d="M120 172l-8 20 8 16 8-16z" fill="#6d28d9"/>`,
      labcoat: `<path d="M68 198l52-34 52 34-12 42H80z" fill="#e9e2f5" opacity=".92" stroke="#8a78a6" stroke-width="2"/><path d="M120 168l-10 34 10 22 10-22z" fill="#c9a4ff"/>`,
      scrubs: `<path d="M72 196l48-32 48 32-8 44H80z" fill="#1e4a52" stroke="#2a6a72" stroke-width="2"/><path d="M120 168l-12 30 12 14 12-14z" fill="#2a7a82"/>`,
      apron: `<path d="M76 194l44-28 44 28-6 46H82z" fill="#2a1745" stroke="#4a2a74" stroke-width="2"/><path d="M96 220h48v30H96z" fill="#1b1029"/>`,
      police: `<path d="M66 198l54-34 54 34-8 42H74z" fill="#111a2a" stroke="#2a3a5a" stroke-width="2"/><path d="M120 168l-16 36 16 20 16-20z" fill="#1d2c3a"/><path d="M104 178l16 14 16-14" stroke="#e9d5ff" stroke-width="2" fill="none"/><circle cx="160" cy="212" r="9" fill="#fbbf24" opacity=".8"/>`,
      chef: `<path d="M70 200l50-34 50 34-10 42H80z" fill="#e9e2f5" opacity=".9"/><path d="M120 168l-10 40 10 26 10-26z" fill="#c9a4ff"/>`,
      priest: `<path d="M72 196l48-32 48 32-8 44H80z" fill="#0d0817" stroke="#3a2159" stroke-width="2"/><path d="M112 186h16v54h-16z" fill="#e9d5ff"/><path d="M102 204h36v12h-36z" fill="#e9d5ff"/>`,
      hoodie: `<path d="M64 200l56-36 56 36-8 40H72z" fill="#241338" stroke="#3a2159" stroke-width="2"/><path d="M100 220h40v26h-40z" fill="#1b1029"/><path d="M104 186v30M136 186v30" stroke="#e9d5ff" stroke-width="2" opacity=".5"/>`
    };

    const earrings = (R() > .6 && !child && o.earrings !== false)
      ? `<circle cx="${120 - headRx - 1}" cy="${eyeY + 16}" r="3" fill="#fbbf24"/><circle cx="${120 + headRx + 1}" cy="${eyeY + 16}" r="3" fill="#fbbf24"/>` : '';

    const freckles = (R() > .7) ? `<g fill="${skinShade}" opacity=".55">${[[-22, 14], [-18, 18], [-26, 19], [22, 14], [18, 18], [26, 19]].map(p => `<circle cx="${120 + p[0]}" cy="${eyeY + p[1]}" r="1.5"/>`).join('')}</g>` : '';

    const wrinkles = old ? `<g stroke="${skinShade}" stroke-width="1.2" fill="none" opacity=".55"><path d="M${120 - 30} ${eyeY - 8}q8-5 16 0M${120 + 14} ${eyeY - 8}q8-5 16 0"/><path d="M${120 - 16} ${headY + 20}q16 3 32 0"/><path d="M${120 - 36} ${headY + 26}q3 8 0 14M${120 + 36} ${headY + 26}q-3 8 0 14"/></g>` : '';

    return `<svg viewBox="0 0 240 240" role="img" aria-label="Portrait">
      <defs>
        ${rg(id + 'bg', [[0, bgTint, .85], [1, '#0b0614', .98]], .5, .4, .75)}
        ${lg(id + 'rim', [[0, '#e9d5ff', .9], [1, '#7c3aed', 0]], 0, 0, 1, 1)}
        ${rg(id + 'halo', [[0, '#a855f7', .22], [1, '#a855f7', 0]])}
      </defs>
      <rect width="240" height="240" fill="#0b0614"/>
      <rect width="240" height="240" fill="url(#${id}bg)"/>
      <circle cx="120" cy="112" r="96" fill="url(#${id}halo)"/>
      <g opacity=".35">${[[28, 40, 2], [210, 60, 1.5], [36, 190, 1.4], [200, 180, 2.2], [170, 32, 1.2]].map(p => star(p[0], p[1], p[2], '#c9a4ff', .6)).join('')}</g>
      ${hairBack}
      <path d="M96 158c0 18 10 30 24 30s24-12 24-30v-26H96z" fill="${skin}"/>
      <path d="M96 158c0 18 10 30 24 30s24-12 24-30v-26H96z" fill="${skinShade}" opacity=".35"/>
      <path d="M${120 - 50} 196l50-36 50 36v44H${120 - 50}z" fill="#1b1029"/>
      ${collarMap[collar] || collarMap.shirt}
      ${headY && `<ellipse cx="120" cy="${headY}" rx="${headRx}" ry="${headRy}" fill="${skin}"/>`}
      <ellipse cx="${120 - headRx + 2}" cy="${headY + 4}" rx="7" ry="10" fill="${skin}"/>
      <ellipse cx="${120 + headRx - 2}" cy="${headY + 4}" rx="7" ry="10" fill="${skin}"/>
      <path d="M${120 + headRx - 4} ${headY - 20}a${headRx} ${headRy} 0 01-4 44c10-12 12-32 4-44z" fill="${skinShade}" opacity=".3"/>
      ${earrings}
      <g>
        <ellipse cx="${120 - eyeDX}" cy="${eyeY}" rx="${eyeR + 1.4}" ry="${eyeR + 2}" fill="#fff" opacity=".9"/>
        <ellipse cx="${120 + eyeDX}" cy="${eyeY}" rx="${eyeR + 1.4}" ry="${eyeR + 2}" fill="#fff" opacity=".9"/>
        <circle cx="${120 - eyeDX}" cy="${eyeY + .5}" r="${eyeR - .2}" fill="${o.eyes || '#3a2159'}"/>
        <circle cx="${120 + eyeDX}" cy="${eyeY + .5}" r="${eyeR - .2}" fill="${o.eyes || '#3a2159'}"/>
        <circle cx="${120 - eyeDX + 1}" cy="${eyeY - 1}" r="1.1" fill="#fff"/>
        <circle cx="${120 + eyeDX + 1}" cy="${eyeY - 1}" r="1.1" fill="#fff"/>
      </g>
      <path d="M${120 - 4} ${headY + 8}q-3 7 2 9" stroke="${skinShade}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
      ${freckles}
      ${wrinkles}
      ${mouth}
      ${beardMap[beard] || ''}
      ${brow}
      ${hairFront}
      ${hatMap[hat] || ''}
      ${glassMap[glasses] || ''}
      <path d="M60 200c0-34 26-52 60-52" stroke="url(#${id}rim)" stroke-width="2.5" fill="none" opacity=".55"/>
    </svg>`;
  }

  /* ---------- evidence photo ---------- */
  function glyph(name, x, y, scale, color, sw) {
    const p = (A.icons[name] || A.icons.note);
    return `<g transform="translate(${x},${y}) scale(${scale})" fill="none" stroke="${color || '#e9d5ff'}" stroke-width="${sw == null ? 1.5 : sw}" stroke-linecap="round" stroke-linejoin="round">${p}</g>`;
  }

  const SPECIAL = {
    phone: (id) => `
      <g transform="translate(105,26) rotate(-4)">
        <rect x="0" y="0" width="110" height="176" rx="14" fill="#0d0817" stroke="#4a2a74" stroke-width="3"/>
        <rect x="8" y="12" width="94" height="148" rx="8" fill="#150b24"/>
        <g>
          <rect x="16" y="24" width="58" height="22" rx="7" fill="#3a2159"/>
          <rect x="42" y="52" width="58" height="18" rx="7" fill="#6d28d9" opacity=".8"/>
          <rect x="16" y="76" width="46" height="16" rx="6" fill="#3a2159"/>
          <rect x="24" y="104" width="70" height="24" rx="5" fill="#241338" stroke="#a855f7"/>
          <path d="M32 112h52M32 120h34" stroke="#c9a4ff" stroke-width="2" opacity=".6"/>
          <rect x="46" y="136" width="48" height="14" rx="6" fill="#a855f7" opacity=".7"/>
        </g>
        <circle cx="55" cy="168" r="2.5" fill="#6d28d9"/>
      </g>
      <path d="M60 190h180" stroke="#3a2159" stroke-width="2" stroke-dasharray="4 5"/>
      ${glyph('lock', 206, 148, 1.6, '#e879f9', 1.6)}
    `,
    id: () => `
      <g transform="translate(42,52) rotate(-3)">
        <rect x="0" y="0" width="216" height="122" rx="8" fill="#241338" stroke="#4a2a74" stroke-width="2.5"/>
        <rect x="0" y="0" width="216" height="26" rx="8" fill="#3a1f5c"/>
        <text x="12" y="18" font-family="monospace" font-size="9" letter-spacing="1.6" fill="#c9a4ff">CITY IDENTIFICATION</text>
        <rect x="14" y="38" width="62" height="70" rx="4" fill="#120a20" stroke="#6d28d9"/>
        ${glyph('user', 31, 48, 1.9, '#c9a4ff', 1.4)}
        <path d="M24 92h42" stroke="#6d28d9" stroke-width="2"/>
        <path d="M92 42h100M92 56h78M92 70h92M92 84h66M92 98h88" stroke="#a894c4" stroke-width="3" opacity=".55" stroke-linecap="round"/>
        <circle cx="192" cy="92" r="14" fill="none" stroke="#e879f9" opacity=".3"/>
      </g>
    `,
    cctv: () => `
      <g transform="translate(34,34)">
        <rect x="0" y="0" width="240" height="152" rx="6" fill="#080510" stroke="#3a2159" stroke-width="3"/>
        <g stroke="#1b1029" stroke-width="2">
          <path d="M80 0v152M160 0v152M0 76h240"/>
        </g>
        ${[0, 1, 2, 3].map(i => {
          const x = (i % 2) * 80 + 4, y = Math.floor(i / 2) * 76 + 4;
          return `<g><rect x="${x}" y="${y}" width="72" height="68" fill="#0f0a1c" stroke="#241338"/>
            <path d="M${x + 8} ${y + 52}l20-22 14 12 16-20 12 30" stroke="#3a2159" fill="none"/>
            <circle cx="${x + 36}" cy="${y + 30}" r="6" fill="#a855f7" opacity=".35"/>
            <rect x="${x + 4}" y="${y + 4}" width="26" height="5" fill="#e879f9" opacity=".25"/>
            <circle cx="${x + 64}" cy="${y + 9}" r="2" fill="#f43f5e"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
          </g>`;
        }).join('')}
        <text x="196" y="72" font-family="monospace" font-size="8" fill="#67e8f9" opacity=".6">02:14:09</text>
      </g>
      <rect x="30" y="28" width="250" height="166" fill="none" stroke="#4a2a74" stroke-width="1" opacity=".6"/>
    `,
    camera: () => `
      <g transform="translate(86,52)">
        <rect x="0" y="26" width="150" height="92" rx="10" fill="#1b1029" stroke="#4a2a74" stroke-width="3"/>
        <rect x="18" y="0" width="58" height="34" rx="4" fill="#241338" stroke="#4a2a74"/>
        <circle cx="75" cy="72" r="32" fill="#0a0612" stroke="#6d28d9" stroke-width="3"/>
        <circle cx="75" cy="72" r="20" fill="#120a20" stroke="#a855f7" stroke-width="2"/>
        <circle cx="75" cy="72" r="9" fill="#67e8f9" opacity=".2"/>
        <rect x="108" y="40" width="30" height="12" rx="3" fill="#3a2159"/>
        <circle cx="28" cy="46" r="6" fill="#f43f5e" opacity=".7"/>
        <path d="M-10 130h176" stroke="#3a2159" stroke-width="2" stroke-dasharray="3 5"/>
        <text x="6" y="146" font-family="monospace" font-size="9" fill="#8a78a6" letter-spacing="1">EVIDENCE / 8MM</text>
      </g>
    `,
    note: () => `
      <g transform="translate(66,32) rotate(2)">
        <rect x="0" y="0" width="168" height="156" fill="#efe6fb" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M20 26h128M20 44h104M20 62h120M20 80h88M20 98h112M20 116h64" stroke="#3b2a55" stroke-width="3" opacity=".45" stroke-linecap="round"/>
        <path d="M20 134h50" stroke="#6d28d9" stroke-width="2"/>
        <text x="118" y="144" font-family="monospace" font-size="8" fill="#6d28d9">X</text>
        <path d="M-14 20l14-14M154 140l14 14" stroke="#e879f9" stroke-width="2" opacity=".4"/>
      </g>
      <g transform="translate(212,154) rotate(-14)">${glyph('search', 0, 0, 2.2, '#e879f9', 1.2)}</g>
    `,
    audio: () => `
      <g transform="translate(38,64)">
        <rect x="0" y="0" width="224" height="96" rx="8" fill="#080510" stroke="#3a2159"/>
        ${Array.from({ length: 34 }, (_, i) => {
          const h = 8 + Math.abs(Math.sin(i * 1.7)) * 62;
          return `<rect x="${10 + i * 6}" y="${48 - h / 2}" width="3" height="${h}" rx="1.5" fill="#a855f7" opacity="${.35 + (i % 5) * .1}"/>`;
        }).join('')}
        <path d="M0 48h224" stroke="#3a2159" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="9" fill="#c9a4ff" letter-spacing="1">REC 04:12</text>
        <circle cx="206" cy="14" r="4" fill="#f43f5e"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle>
      </g>
    `,
    fingerprint: () => `
      <g transform="translate(120,110)" stroke="#c9a4ff" fill="none" stroke-linecap="round">
        ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="0" rx="${10 + i * 7}" ry="${14 + i * 9}" stroke-width="${1.6 - i * .08}" opacity="${.85 - i * .07}" transform="rotate(${-8 + i * 2})"/>`).join('')}
        <path d="M-30 56c10-18 8-46 30-56M20 60c4-24-2-40 14-52" stroke-width="1.4" opacity=".5"/>
      </g>
    `,
    ledger: () => `
      <g transform="translate(56,46) rotate(-2)">
        <path d="M0 8c34-14 64-14 104 0v128c-40-14-70-14-104 0z" fill="#efe6fb" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M104 8c40-14 70-14 104 0v128c-34-14-64-14-104 0z" fill="#e2d5f3" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M104 8v128" stroke="#b9a3d6" stroke-width="2"/>
        ${Array.from({ length: 7 }, (_, i) => `<path d="M14 ${30 + i * 14}h72M118 ${30 + i * 14}h72" stroke="#3b2a55" stroke-width="2" opacity=".4"/>`).join('')}
        <path d="M118 92h44" stroke="#e879f9" stroke-width="4" opacity=".6"/>
      </g>
    `,
    map: () => `
      <g transform="translate(44,34)">
        <rect x="0" y="0" width="216" height="164" fill="#e2d5f3" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M0 40c40-20 80 10 120-4s70-8 96 4M30 0v164M150 0v164M0 110c50-10 90 8 140 0s60 0 76 4" stroke="#b9a3d6" stroke-width="2" fill="none"/>
        <path d="M10 26l50 40 30-20 40 30" stroke="#6d28d9" stroke-width="2" fill="none" stroke-dasharray="5 4"/>
        <circle cx="150" cy="96" r="13" fill="none" stroke="#e879f9" stroke-width="3"/>
        <path d="M144 90l12 12M156 90l-12 12" stroke="#e879f9" stroke-width="2"/>
        <text x="162" y="120" font-family="monospace" font-size="8" fill="#3b2a55">X</text>
      </g>
    `,
    photo: () => `
      <g transform="translate(74,26) rotate(-3)">
        <rect x="0" y="0" width="152" height="170" fill="#efe6fb" stroke="#b9a3d6"/>
        <rect x="8" y="8" width="136" height="128" fill="#150b24"/>
        <circle cx="76" cy="52" r="26" fill="#241338"/>
        <circle cx="76" cy="46" r="12" fill="#3a2159"/>
        <path d="M46 128c0-30 16-44 30-44s30 14 30 44" fill="#241338"/>
        <path d="M0 136h152" stroke="#b9a3d6"/>
      </g>
    `,
    glass: () => `
      <g transform="translate(112,52)">
        <path d="M-26 0h52l-6 20v88c0 8-8 12-20 12s-20-4-20-12V20z" fill="rgba(255,255,255,.06)" stroke="#4a2a74" stroke-width="2"/>
        <path d="M-21 66h42l-2 40c0 6-8 9-19 9s-19-3-19-9z" fill="#a3e635" opacity=".35"/>
        <path d="M-21 66h42" stroke="#a3e635" stroke-width="2" opacity=".6"/>
        <path d="M-8 -14h16M-6 -4h12" stroke="#4a2a74" stroke-width="3"/>
        <text x="-24" y="140" font-family="monospace" font-size="9" fill="#8a78a6">SAMPLE A</text>
      </g>
      <g transform="translate(196,136)">${glyph('chemical', 0, 0, 2.4, '#a3e635', 1.2)}</g>
    `,
    tool: () => `
      <g transform="translate(110,74) rotate(-24)">
        <path d="M-70 0h140" stroke="#8a78a6" stroke-width="18" stroke-linecap="round"/>
        <path d="M-70 0h140" stroke="#c9a4ff" stroke-width="4" stroke-linecap="round" opacity=".3"/>
        <path d="M-78 -10c-14 0-22 8-22 18s8 18 22 18l14-8V-2z" fill="#4a2a74" stroke="#e9d5ff" stroke-width="1.5"/>
        <path d="M70 -18l30-10 10 28-30 10z" fill="#4a2a74" stroke="#e9d5ff" stroke-width="1.5"/>
      </g>
      <rect x="40" y="164" width="220" height="2" fill="#3a2159"/>
      <text x="42" y="184" font-family="monospace" font-size="9" fill="#8a78a6" letter-spacing="1">TOOL MARK / CAST</text>
    `,
    blood: () => `
      <g transform="translate(116,96)">
        <path d="M0-56s40 46 40 76a40 40 0 11-80 0c0-30 40-76 40-76z" fill="#8b1538" stroke="#f43f5e" stroke-width="2" opacity=".85"/>
        <path d="M-16 24c0-10 6-22 14-30" stroke="#fda4af" stroke-width="3" fill="none" opacity=".6"/>
        <circle cx="58" cy="46" r="10" fill="#8b1538" opacity=".7"/>
        <circle cx="42" cy="62" r="5" fill="#8b1538" opacity=".5"/>
      </g>
    `,
    car: () => `
      <g transform="translate(72,110)">
        <path d="M0 20l20-44h96l26 44v40H0z" fill="#241338" stroke="#a855f7" stroke-width="2"/>
        <path d="M30-18h30v30H20zM72-18h28l12 30H72z" fill="#0a0612" stroke="#4a2a74"/>
        <circle cx="30" cy="62" r="16" fill="#0a0612" stroke="#6d28d9" stroke-width="2"/>
        <circle cx="116" cy="62" r="16" fill="#0a0612" stroke="#6d28d9" stroke-width="2"/>
        <rect x="140" y="6" width="22" height="10" fill="#fbbf24" opacity=".8"/>
      </g>
    `,
    letter: () => `
      <g transform="translate(74,40) rotate(-2)">
        <rect x="0" y="0" width="152" height="150" fill="#efe6fb" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M0 0l76 58L152 0" fill="#e2d5f3" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M0 150l58-55M152 150l-58-55" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M22 112h86M22 126h58" stroke="#3b2a55" stroke-width="3" opacity=".35"/>
        <circle cx="118" cy="108" r="14" fill="#8b1538" opacity=".5"/>
      </g>
    `,
    receipt: () => `
      <g transform="translate(102,22) rotate(2)">
        <path d="M0 0h96v196l-12-8-12 8-12-8-12 8-12-8-12 8-12-8z" fill="#efe6fb" stroke="#b9a3d6" stroke-width="2"/>
        ${Array.from({ length: 9 }, (_, i) => `<path d="M12 ${18 + i * 16}h${60 + (i % 3) * 10}" stroke="#3b2a55" stroke-width="2" opacity=".35"/>`).join('')}
        <path d="M12 176h70" stroke="#6d28d9" stroke-width="3"/>
        <text x="12" y="190" font-family="monospace" font-size="8" fill="#6d28d9">TOTAL</text>
      </g>
    `,
    pill: () => `
      <g transform="translate(108,44)">
        <rect x="0" y="18" width="86" height="120" rx="14" fill="#241338" stroke="#4a2a74" stroke-width="3"/>
        <rect x="12" y="0" width="62" height="30" rx="4" fill="#3a2159" stroke="#4a2a74"/>
        <rect x="14" y="44" width="58" height="62" rx="4" fill="#e2d5f3" opacity=".9"/>
        <path d="M22 56h42M22 68h42M22 80h24" stroke="#3b2a55" stroke-width="2" opacity=".5"/>
        <path d="M28 126h30" stroke="#e879f9" stroke-width="2"/>
        <g transform="translate(104,86) rotate(-18)"><rect x="0" y="0" width="46" height="20" rx="10" fill="#f5d0fe" stroke="#a855f7" stroke-width="2"/><path d="M23 0v20" stroke="#a855f7" stroke-width="2"/></g>
      </g>
    `,
    jewelry: () => `
      <g transform="translate(120,110)">
        <circle cx="0" cy="0" r="46" fill="none" stroke="#fbbf24" stroke-width="8"/>
        <circle cx="0" cy="0" r="46" fill="none" stroke="#fff7d6" stroke-width="2" opacity=".6"/>
        <path d="M-14-46l14-24 14 24" fill="#fbbf24" opacity=".55"/>
        <path d="M0-70l10 18-10 12-10-12z" fill="#f5e8ff"/>
        <circle cx="38" cy="26" r="6" fill="#fff7d6" opacity=".7"/>
      </g>
    `,
    laptop: () => `
      <g transform="translate(92,52)">
        <rect x="0" y="0" width="136" height="90" rx="6" fill="#1b1029" stroke="#4a2a74" stroke-width="3"/>
        <rect x="8" y="8" width="120" height="70" fill="#080510"/>
        <path d="M18 20h50M18 30h34M18 40h58M18 50h30M18 60h42" stroke="#34d399" stroke-width="2" opacity=".55"/>
        <path d="M52 98h32l14 24H38z" fill="#241338" stroke="#4a2a74"/>
        <path d="M30 122h76" stroke="#6d28d9" stroke-width="3"/>
        <circle cx="116" cy="76" r="4" fill="#f43f5e">
          <animate attributeName="opacity" values="1;.2;1" dur="1.3s" repeatCount="indefinite"/>
        </circle>
      </g>
    `,
    watch: () => `
      <g transform="translate(120,110)">
        <circle cx="0" cy="0" r="54" fill="#1b1029" stroke="#c9a4ff" stroke-width="5"/>
        <circle cx="0" cy="0" r="44" fill="#0a0612" stroke="#4a2a74" stroke-width="2"/>
        <path d="M0-34v8M0 34v-8M-34 0h8M34 0h-8" stroke="#8a78a6" stroke-width="2"/>
        <path d="M0 0v-24M0 0l18 12" stroke="#e9d5ff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="4" fill="#e879f9"/>
        <path d="M-14 54v22M14 54v22" stroke="#c9a4ff" stroke-width="14" stroke-linecap="round" opacity=".5"/>
      </g>
    `,
    mask: () => `
      <g transform="translate(120,108)">
        <path d="M-70-30c26-18 50-18 70 0 20-18 44-18 70 0 0 46-30 72-70 72S-70 16-70-30z" fill="#e2d5f3" stroke="#b9a3d6" stroke-width="2" opacity=".85"/>
        <path d="M-34-10c8 8 18 8 26 0M8-10c8 8 18 8 26 0" stroke="#3b2a55" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M-16 22q16 10 32 0" stroke="#8b1538" stroke-width="3" fill="none"/>
      </g>
    `,
    wire: () => `
      <g transform="translate(40,92)">
        <path d="M0 0c40-34 80 34 120 0s80 34 120 0" stroke="#a855f7" stroke-width="10" fill="none"/>
        <path d="M0 14c40-34 80 34 120 0s80 34 120 0" stroke="#67e8f9" stroke-width="8" fill="none" opacity=".7"/>
        <path d="M0 28c40-34 80 34 120 0s80 34 120 0" stroke="#f43f5e" stroke-width="6" fill="none" opacity=".6"/>
        <g fill="#0a0612" stroke="#4a2a74"><circle cx="0" cy="0" r="9"/><circle cx="120" cy="14" r="9"/><circle cx="240" cy="0" r="9"/></g>
        <path d="M212 40l26 26M238 40l-26 26" stroke="#fbbf24" stroke-width="3"/>
      </g>
    `,
    news: () => `
      <g transform="translate(62,34) rotate(-2)">
        <rect x="0" y="0" width="190" height="160" fill="#e2d5f3" stroke="#b9a3d6"/>
        <text x="12" y="22" font-family="Georgia,serif" font-size="16" fill="#1b1024">THE HERALD</text>
        <path d="M12 30h166" stroke="#1b1024" stroke-width="2"/>
        <rect x="12" y="40" width="76" height="56" fill="#3a2159"/>
        <path d="M12 96h166M12 108h142M12 120h158M12 132h100" stroke="#3b2a55" stroke-width="5" opacity=".3"/>
        <path d="M100 40h78M100 52h66M100 64h72M100 76h50" stroke="#3b2a55" stroke-width="3" opacity=".35"/>
      </g>
    `,
    badge: () => `
      <g transform="translate(120,108)">
        <path d="M0-62l16 12 20-2 8 18 16 10-4 20 10 16-14 14-2 20-20 2-12 16-18-10-18 10-12-16-20-2-2-20-14-14 10-16-4-20 16-10 8-18 20 2z" fill="#241338" stroke="#fbbf24" stroke-width="3"/>
        <circle cx="0" cy="0" r="30" fill="#0d0817" stroke="#fbbf24" stroke-width="2"/>
        ${glyph('star', -15, -15, 1.25, '#fbbf24', 1.2)}
      </g>
    `,
    money: () => `
      <g transform="translate(96,80) rotate(-6)">
        <rect x="0" y="0" width="120" height="60" rx="4" fill="#2f6b4f" stroke="#a7f3d0" stroke-width="2" opacity=".8"/>
        <rect x="20" y="-16" width="120" height="60" rx="4" fill="#3d8a63" stroke="#a7f3d0" stroke-width="2" opacity=".8"/>
        <rect x="40" y="-32" width="120" height="60" rx="4" fill="#4aa878" stroke="#d1fae5" stroke-width="2"/>
        <circle cx="100" cy="-2" r="14" fill="none" stroke="#d1fae5" stroke-width="2" opacity=".6"/>
        <text x="52" y="6" font-family="monospace" font-size="14" fill="#d1fae5" opacity=".8">100</text>
      </g>
    `,
    ticket: () => `
      <g transform="translate(86,86) rotate(-4)">
        <path d="M0 0h150v20a14 14 0 000 28v20H0V48a14 14 0 000-28z" fill="#e2d5f3" stroke="#b9a3d6" stroke-width="2"/>
        <path d="M50 0v68" stroke="#b9a3d6" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="12" y="26" font-family="monospace" font-size="10" fill="#3b2a55">ADMIT ONE</text>
        <text x="12" y="44" font-family="monospace" font-size="8" fill="#6d28d9">ROW 7 / SEAT 12</text>
        <circle cx="118" cy="34" r="14" fill="none" stroke="#6d28d9" opacity=".3"/>
      </g>
    `,
    footprint: () => `
      <g transform="translate(120,110)" fill="#c9a4ff" opacity=".55" stroke="#e9d5ff" stroke-width="1.5">
        <path d="M-26-54c14-10 28 4 26 22-2 16-12 30-24 30s-18-14-16-28c1-10 6-19 14-24z"/>
        <path d="M18 8c12-8 24 2 22 18-2 14-10 24-20 24s-16-12-14-24c1-8 5-14 12-18z"/>
        <path d="M-30-54c-8 4-10 14-6 22M-6-58c8 2 12 12 10 22M12 10c-6 4-8 12-6 18M34 12c6 2 10 10 8 18" fill="none" opacity=".6"/>
      </g>
    `,
    fiber: () => `
      <g transform="translate(120,110)" stroke-linecap="round" fill="none">
        ${[0, 1, 2, 3, 4].map(i => `<path d="M-80 ${-40 + i * 20}c40-30 80 30 120 0s80 30 120 0" stroke="${['#a855f7', '#e879f9', '#67e8f9', '#c9a4ff', '#fbbf24'][i]}" stroke-width="${6 - i * .6}" opacity=".55"/>`).join('')}
        <rect x="-70" y="-54" width="140" height="112" fill="none" stroke="#4a2a74" stroke-width="2" stroke-dasharray="5 4"/>
      </g>
      <text x="46" y="200" font-family="monospace" font-size="9" fill="#8a78a6" letter-spacing="1">FIBRE / MICROSCOPE</text>
    `,
    default: (id) => `
      <rect x="48" y="52" width="204" height="118" rx="8" fill="#150b24" stroke="#3a2159" stroke-width="2"/>
      ${glyph('note', 116, 84, 2.6, '#c9a4ff', 1.2)}
      <path d="M48 132h204" stroke="#241338" stroke-width="2"/>
      <text x="58" y="156" font-family="monospace" font-size="9" fill="#8a78a6" letter-spacing="1">EVIDENCE ITEM</text>
    `
  };

  function cluePhoto(iconName, o) {
    o = o || {};
    const id = uid('ev');
    const draw = SPECIAL[iconName] || SPECIAL[o.kind] || SPECIAL.default;
    return `<svg viewBox="0 0 300 220" role="img" aria-label="Evidence photograph">
      <defs>
        ${lg(id + 'bg', [[0, '#221238'], [.55, '#160c26'], [1, '#0b0614']], 0, 0, .6, 1)}
        ${rg(id + 'spot', [[0, '#a855f7', .3], [1, '#a855f7', 0]])}
      </defs>
      <rect width="300" height="220" fill="url(#${id}bg)"/>
      <rect width="300" height="220" fill="url(#${id}spot)"/>
      <g opacity=".3">${[[16, 20, 1.5], [280, 30, 1], [22, 190, 1.2], [272, 196, 1.8], [250, 90, .9]].map(p => star(p[0], p[1], p[2], '#c9a4ff', .5)).join('')}</g>
      <path d="M0 196h300" stroke="#3a2159" stroke-width="1" opacity=".5"/>
      ${draw(id)}
      <rect width="300" height="220" fill="none" stroke="#a855f7" stroke-opacity=".15" stroke-width="6"/>
    </svg>`;
  }

  window.Art.portrait = portrait;
  window.Art.cluePhoto = cluePhoto;
})();
