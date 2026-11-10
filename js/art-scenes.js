/* ============================================================
   Art scenes — cartoon-flat locations, 800x450
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  const C = A.C, uid = A.uid, lg = A.lg, rg = A.rg, esc = A.esc, rng = A.rng;

  function wrap(id, inner, extraDefs, label) {
    return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(label || 'Crime scene')}">
      <defs>
        ${lg(id + 'sky', [[0, '#0b0616'], [.55, '#1a0d2d'], [1, '#0a0513']], 0, 0, 0, 1)}
        ${rg(id + 'glow', [[0, '#a855f7', .4], [1, '#a855f7', 0]])}
        ${rg(id + 'vig', [[0, 'rgba(0,0,0,0)', .5], [1, 'rgba(4,2,8,.72)', 1]], .5, .45, .78)}
        ${extraDefs || ''}
      </defs>
      <rect width="800" height="450" fill="url(#${id}sky)"/>
      ${inner}
      <rect width="800" height="450" fill="url(#${id}vig)" pointer-events="none"/>
    </svg>`;
  }
  function moon(x, y, r) {
    return `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="url(#__glow)" opacity=".14"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="#e9d5ff" opacity=".22"/>
      <circle cx="${x}" cy="${y}" r="${r * .66}" fill="#f5e8ff" opacity=".30"/>`;
  }
  function fogBank(x, y, rx, ry, op) {
    return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#c9a4ff" opacity="${op == null ? .06 : op}"/>`;
  }
  function rain(n, seed) {
    const R = rng(seed || 'r');
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = R() * 800, y = R() * 450, l = 7 + R() * 16;
      s += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - l * .3).toFixed(0)}" y2="${(y + l).toFixed(0)}" stroke="#c9a4ff" stroke-opacity="${(.07 + R() * .22).toFixed(2)}" stroke-width="1"/>`;
    }
    return s;
  }
  function city(skyY, color, seed) {
    const R = rng(seed || 'city');
    let s = `<g>`;
    let x = -10;
    while (x < 820) {
      const w = 40 + R() * 70, h = 60 + R() * 160;
      s += `<rect x="${x.toFixed(0)}" y="${(skyY - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${color}" stroke="#221037" stroke-width="1"/>`;
      for (let wy = skyY - h + 12; wy < skyY - 10; wy += 20) {
        for (let wx = x + 8; wx < x + w - 8; wx += 16) {
          if (R() > .68) s += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="5" height="7" fill="#a855f7" opacity="${(.12 + R() * .35).toFixed(2)}"/>`;
        }
      }
      x += w + 6 + R() * 10;
    }
    return s + `</g>`;
  }
  function windowView(x, y, w, h, id, o) {
    o = o || {};
    return `<g>
      <rect x="${x - 7}" y="${y - 7}" width="${w + 14}" height="${h + 14}" fill="#0a0612" stroke="#4a2a74" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#140a26"/>
      <circle cx="${x + w * .72}" cy="${y + h * .3}" r="${o.moon || 12}" fill="#e9d5ff" opacity=".35"/>
      <path d="M${x} ${y + h * .78}l${w * .2} -${h * .18} ${w * .18} ${h * .1} ${w * .16} -${h * .22} ${w * .46} ${h * .3}v${h * .22}H${x}z" fill="#07040d"/>
      <path d="M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}" stroke="#2a1642" stroke-width="3"/>
      ${o.rain ? rain(14, 'wv' + x) : ''}
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#a855f7" opacity=".04"/>
    </g>`;
  }
  function crate(x, y, s, col) {
    return `<g stroke="#1b1029" stroke-width="1.5">
      <rect x="${x}" y="${y}" width="${s}" height="${s * .8}" fill="${col || '#241338'}"/>
      <path d="M${x} ${y + s * .2}h${s}M${x} ${y + s * .6}h${s}M${x + s * .25} ${y}v${s * .8}M${x + s * .72} ${y}v${s * .8}" stroke="#3a2159" stroke-width="1.2"/>
    </g>`;
  }
  function barrel(x, y, w, h, col) {
    return `<g stroke="#150b24" stroke-width="1.5">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * .35}" fill="${col || '#2a1745'}"/>
      <path d="M${x + w * .1} ${y + h * .25}h${w * .8}M${x + w * .08} ${y + h * .7}h${w * .84}" stroke="#4a2a74" stroke-width="2"/>
    </g>`;
  }
  function plant(x, y, s, col) {
    return `<g transform="translate(${x},${y}) scale(${s || 1})" stroke="#150b24" stroke-width="1.4">
      <path d="M0 0c-3-18-14-26-24-30 12 0 22 8 26 20 2-16 10-26 22-30-8 12-10 24-8 36z" fill="${col || '#2f6b4f'}"/>
      <path d="M0 2c6-14 16-18 26-18-8 8-12 16-12 26z" fill="${col || '#3d8a63'}" opacity=".8"/>
      <path d="M-16 0h34l-5 26h-24z" fill="#5b3a22" stroke="#2a1745"/>
    </g>`;
  }
  function chair(x, y, col) {
    return `<g stroke="#150b24" stroke-width="1.5" fill="${col || '#241338'}">
      <rect x="${x}" y="${y}" width="30" height="6" rx="2"/>
      <rect x="${x + 24}" y="${y - 34}" width="6" height="36" rx="2"/>
      <path d="M${x + 2} ${y + 4}v20M${x + 27} ${y + 4}v20" stroke-width="3"/></g>`;
  }
  function lampCone(x, y, col) {
    return `<path d="M${x} ${y}L${x - 120} 450h240L${x} ${y}z" fill="${col || '#a855f7'}" opacity=".10"/>
      <path d="M${x} ${y}L${x - 60} 450h120L${x} ${y}z" fill="${col || '#c9a4ff'}" opacity=".05"/>`;
  }
  function bulletBoard(x, y, w, h) {
    const R = rng('bb' + x);
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a1c38" stroke="#0a0612" stroke-width="3"/>`;
    for (let i = 0; i < 5; i++) {
      const px = x + 14 + (i % 3) * (w / 3.4), py = y + 16 + Math.floor(i / 3) * (h / 2.2);
      s += `<rect x="${px}" y="${py}" width="${w / 4.6}" height="${h / 3.2}" fill="#e9d5ff" opacity=".82" transform="rotate(${(R() * 8 - 4).toFixed(1)} ${px} ${py})"/>`;
      s += `<path d="M${px + 4} ${py + 6}h${w / 6}M${px + 4} ${py + 12}h${w / 8}" stroke="#7a6a94" stroke-width="1"/>`;
    }
    return s;
  }

  /* ============ SCENES ============ */
  const builders = {
    factory(o) {
      const id = o.id, acid = (o.mood === 'acid');
      const inner = `
        ${moon(670, 90, 34)}
        ${city(330, '#0a0614', 'fac')}
        <g>
          <rect x="0" y="300" width="800" height="150" fill="#0a0612"/>
          <path d="M0 330h800" stroke="#241338" stroke-width="2"/>
          <rect x="80" y="196" width="230" height="140" fill="#150b24" stroke="#2a1745" stroke-width="2"/>
          <path d="M80 220h230M80 260h230" stroke="#241338" stroke-width="1.5"/>
          <path d="M110 196v-24h20v24M150 196v-38h16v38M205 196v-18h26v18" fill="#150b24" stroke="#2a1745" stroke-width="2"/>
          <rect x="580" y="170" width="180" height="170" fill="#120a20" stroke="#2a1745" stroke-width="2"/>
          <rect x="600" y="196" width="140" height="70" fill="#0a0612" stroke="#3a2159"/>
          ${[0, 1, 2].map(r => `<g stroke="#3a2159" stroke-width="2"><path d="M610 ${r * 16 + 206}h120"/><path d="M610 ${r * 16 + 206}h20" stroke="#a855f7"/></g>`).join('')}
        </g>
        <!-- tanks -->
        <g>
          <path d="M250 160v150a40 20 0 0080 0V160z" fill="#1b1029" stroke="#3a2159" stroke-width="2.5"/>
          <ellipse cx="290" cy="160" rx="40" ry="15" fill="#241338" stroke="#4a2a74" stroke-width="2"/>
          <path d="M250 220h80M250 265h80" stroke="#3a2159" stroke-width="1.5"/>
          <path d="M290 300v50h-70" stroke="#4a2a74" stroke-width="7" fill="none"/>
          <path d="M330 240h120v40" stroke="#3a2159" stroke-width="8" fill="none"/>
          <circle cx="290" cy="245" r="5" fill="#fbbf24" opacity=".8"/>
        </g>
        <g>
          <path d="M470 130v190a50 24 0 00100 0V130z" fill="#170d27" stroke="#3a2159" stroke-width="2.5"/>
          <ellipse cx="520" cy="130" rx="50" ry="18" fill="#241338" stroke="#4a2a74" stroke-width="2"/>
          <path d="M470 190h100M470 250h100" stroke="#3a2159" stroke-width="1.5"/>
          <path d="M520 320v40h140" stroke="#4a2a74" stroke-width="8" fill="none"/>
          <rect x="486" y="150" width="66" height="16" rx="2" fill="#0a0612" stroke="#6d28d9"/>
        </g>
        <!-- catwalk -->
        <g stroke="#3a2159" stroke-width="2" fill="#140a26">
          <rect x="90" y="240" width="500" height="8"/>
          <path d="M110 248v60M210 248v60M310 248v60M410 248v60M510 248v60M580 248v60"/>
          <path d="M100 236v-30M590 236v-30" stroke-width="3"/>
          <path d="M90 210h500" stroke-width="1.5" opacity=".6"/>
        </g>
        <!-- acid vat foreground -->
        <g>
          <path d="M120 348h330l-24 92H146z" fill="#0d0817" stroke="#3a2159" stroke-width="3"/>
          <ellipse cx="285" cy="348" rx="165" ry="26" fill="#0a0612" stroke="#3a2159" stroke-width="2"/>
          <ellipse cx="285" cy="350" rx="145" ry="19" fill="${acid ? '#6d8a1f' : '#2a1745'}"/>
          <ellipse cx="285" cy="350" rx="145" ry="19" fill="url(#${id}glow)" opacity=".5"/>
          ${acid ? `<ellipse cx="285" cy="350" rx="110" ry="13" fill="#a3e635" opacity=".35"/>
          <g fill="#d9f99d" opacity=".5">${[[230, 345], [300, 352], [262, 356], [330, 348]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2.5"><animate attributeName="opacity" values=".2;.8;.2" dur="${2 + Math.random() * 2}s" repeatCount="indefinite"/></circle>`).join('')}</g>` : ''}
          <path d="M150 338l14-16M210 334l8-14M330 336l12-16" stroke="#a3e635" stroke-width="2" opacity=".4"/>
          <g transform="translate(400,356)"><rect x="0" y="0" width="118" height="34" fill="#fbbf24" opacity=".85"/><path d="M0 0l118 34M118 0L0 34" stroke="#0a0612" stroke-width="9"/><text x="59" y="23" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#0a0612">ACID</text></g>
        </g>
        <!-- pipes left -->
        <g stroke="#2a1745" stroke-width="10" fill="none">
          <path d="M0 210h40v90h80"/>
          <path d="M0 240h24v120"/>
          <path d="M700 150h40v110h60"/>
        </g>
        <g stroke="#4a2a74" stroke-width="3" fill="none">
          <path d="M0 210h40v90h80"/><path d="M0 240h24v120"/>
        </g>
        ${fogBank(400, 410, 420, 60, .1)}
        ${rain(28, 'facrain')}
      `;
      return wrap(id, inner, '', 'Industrial acid works at night');
    },

    street(o) {
      const id = o.id;
      const inner = `
        ${moon(660, 90, 36)}
        ${city(330, '#0a0614', 'st')}
        <g>
          <rect x="0" y="320" width="800" height="130" fill="#0d0817"/>
          <path d="M0 350h800" stroke="#3a2159" stroke-width="2"/>
          <path d="M0 400h800" stroke="#241338" stroke-width="2" stroke-dasharray="30 24"/>
          <g fill="#0b0614" stroke="#2a1745" stroke-width="2">
            <rect x="40" y="180" width="190" height="160"/>
            <rect x="60" y="200" width="70" height="40" fill="#170d27"/>
            <rect x="150" y="200" width="60" height="40" fill="#241338"/>
            <rect x="250" y="230" width="130" height="110"/>
            <rect x="560" y="200" width="200" height="140"/>
            <rect x="600" y="220" width="120" height="60" fill="#170d27"/>
          </g>
          <g font-family="monospace" font-size="10" letter-spacing="2" opacity=".9">
            <rect x="58" y="252" width="150" height="26" fill="#2a0f45" stroke="#6d28d9"/>
            <text x="133" y="269" text-anchor="middle" fill="#e9d5ff">DINER</text>
            <rect x="600" y="290" width="118" height="24" fill="#2a0f45" stroke="#6d28d9"/>
            <text x="659" y="306" text-anchor="middle" fill="#f0abfc">MOTEL</text>
          </g>
          <path d="M300 450l50-100h36l-20 100z" fill="#120a20"/>
          <g>
            <path d="M540 450V286" stroke="#0a0612" stroke-width="8"/>
            <path d="M540 286c0-20 22-28 34-16" stroke="#0a0612" stroke-width="6" fill="none"/>
            <circle cx="576" cy="276" r="8" fill="#f5d0fe"/>
          </g>
          ${lampCone(576, 280)}
          <path d="M0 420c90-8 140 6 230 0s150-10 240-2 170 0 330-8" stroke="#a855f7" stroke-width="1.4" fill="none" opacity=".25"/>
          <g opacity=".2" stroke="#e9d5ff">
            <path d="M560 452v-100M572 452v-80M590 440v-60" stroke-width="2"/>
          </g>
          <g>
            <rect x="640" y="360" width="112" height="40" rx="10" fill="#1b1029" stroke="#3a2159"/>
            <path d="M652 360l12-20h54l14 20" fill="#120a20" stroke="#3a2159"/>
            <circle cx="662" cy="402" r="10" fill="#07040d" stroke="#4a2a74"/>
            <circle cx="724" cy="402" r="10" fill="#07040d" stroke="#4a2a74"/>
          </g>
        </g>
        ${fogBank(400, 430, 460, 60, .1)}
        ${rain(70, 'strain')}
      `;
      return wrap(id, inner, '', 'Rain-soaked city street at night');
    },

    interior(o) {
      const id = o.id, v = o.variant || 'living';
      let extra = '';
      if (v === 'living') {
        extra = `
          <rect x="70" y="300" width="260" height="80" rx="12" fill="#241338" stroke="#3a2159" stroke-width="2"/>
          <path d="M80 310h240v36H80z" fill="#2f1c4a"/>
          <rect x="100" y="280" width="60" height="40" rx="8" fill="#2f1c4a" stroke="#3a2159"/>
          <rect x="250" y="280" width="60" height="40" rx="8" fill="#2f1c4a" stroke="#3a2159"/>
          <rect x="300" y="380" width="150" height="8" fill="#1b1029"/>
          ${plant(430, 320, 1.3)}
          <rect x="490" y="250" width="150" height="120" fill="#1b1029" stroke="#3a2159" stroke-width="2"/>
          <rect x="505" y="265" width="120" height="70" fill="#0a0612"/>
          <path d="M540 335h60M540 345h40" stroke="#4a2a74"/>
        `;
      } else if (v === 'bedroom') {
        extra = `
          <rect x="80" y="280" width="240" height="120" rx="10" fill="#241338" stroke="#3a2159" stroke-width="2"/>
          <rect x="80" y="280" width="240" height="34" fill="#3a2159"/>
          <rect x="100" y="256" width="70" height="30" rx="8" fill="#e9d5ff" opacity=".8"/>
          <rect x="180" y="262" width="50" height="24" rx="7" fill="#c9a4ff" opacity=".55"/>
          <rect x="350" y="300" width="90" height="70" fill="#1b1029" stroke="#3a2159"/>
          <circle cx="395" cy="288" r="16" fill="#fbbf24" opacity=".35"/>
          <path d="M395 304v40" stroke="#4a2a74"/>
          <rect x="520" y="220" width="120" height="140" fill="#221238" stroke="#3a2159"/>
          <path d="M540 250h80M540 280h80M540 310h50" stroke="#4a2a74"/>
        `;
      } else if (v === 'office') {
        extra = `
          <rect x="70" y="300" width="250" height="20" fill="#2a1745" stroke="#3a2159"/>
          <path d="M90 320v60M300 320v60" stroke="#3a2159" stroke-width="6"/>
          <rect x="120" y="276" width="80" height="24" fill="#0d0817" stroke="#4a2a74"/>
          <rect x="215" y="270" width="50" height="30" fill="#0d0817" stroke="#4a2a74"/>
          ${chair(360, 340, '#2a1745')}
          <rect x="470" y="130" width="230" height="210" fill="#1b1029" stroke="#3a2159" stroke-width="2"/>
          <path d="M480 180h210M480 230h210M480 280h210" stroke="#3a2159" stroke-width="1.5"/>
          <g fill="#3a2159">${[0, 1, 2, 3, 4].map(i => `<rect x="${490 + (i % 3) * 64}" y="${145 + Math.floor(i / 3) * 48}" width="40" height="30"/>`).join('')}</g>
          <path d="M470 140l30-30M700 340l-20-20" stroke="#6d28d9" opacity=".4"/>
        `;
      } else if (v === 'kitchen') {
        extra = `
          <rect x="70" y="250" width="300" height="20" fill="#2a1745" stroke="#3a2159"/>
          <rect x="70" y="270" width="300" height="90" fill="#1b1029" stroke="#3a2159"/>
          <path d="M120 270v90M190 270v90M260 270v90" stroke="#3a2159"/>
          <circle cx="155" cy="250" r="14" fill="#0d0817" stroke="#4a2a74"/>
          <rect x="450" y="200" width="70" height="130" fill="#241338" stroke="#3a2159"/>
          <path d="M460 220h50M460 250h50M460 280h50" stroke="#4a2a74"/>
          <path d="M380 270h40v70h-40z" fill="#3a2159" stroke="#150b24"/>
        `;
      } else {
        extra = `
          <rect x="100" y="280" width="220" height="100" fill="#1b1029" stroke="#3a2159"/>
          ${chair(360, 350)}${chair(410, 350)}
          <rect x="500" y="240" width="140" height="140" fill="#221238" stroke="#3a2159"/>
          ${plant(600, 320, 1)}
        `;
      }
      const inner = `
        <rect width="800" height="450" fill="none"/>
        <g>
          <rect x="0" y="0" width="800" height="330" fill="#170d27"/>
          <rect x="0" y="330" width="800" height="120" fill="#0d0817"/>
          <path d="M0 330h800" stroke="#3a2159" stroke-width="4"/>
          ${Array.from({ length: 17 }, (_, i) => `<path d="M${i * 48} 0v330" stroke="#1f1130" stroke-width="2"/>`).join('')}
          <path d="M0 300h800" stroke="#2a1745" stroke-width="2"/>
          ${windowView(480, 60, 240, 150, id, { rain: true })}
          <rect x="0" y="420" width="800" height="30" fill="#120a20"/>
          <path d="M60 330h320v60H60z" fill="#3a2159" opacity=".28"/>
        </g>
        ${extra}
        <g>
          <path d="M40 120h50M40 140h30" stroke="#4a2a74" stroke-width="2"/>
          <rect x="42" y="160" width="70" height="90" fill="#241338" stroke="#3a2159"/>
          <path d="M52 170h50M52 190h50M52 210h30" stroke="#4a2a74" stroke-width="2"/>
          <circle cx="680" cy="80" r="60" fill="url(#${id}glow)" opacity=".35"/>
          <path d="M665 120h30l8 40h-46z" fill="#fbbf24" opacity=".25"/>
          <path d="M680 60v-24" stroke="#4a2a74" stroke-width="2"/>
        </g>
      `;
      return wrap(id, inner, '', 'Interior room');
    },

    diner(o) {
      const id = o.id;
      const inner = `
        ${windowView(40, 80, 250, 170, id, { rain: true, moon: 16 })}
        <g>
          <rect x="0" y="0" width="800" height="330" fill="#1a0d2d"/>
          <rect x="0" y="330" width="800" height="120" fill="#0b0614"/>
          ${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 80}" y="330" width="40" height="40" fill="#241338"/><rect x="${i * 80 + 40}" y="370" width="40" height="40" fill="#241338"/>`).join('')}
          <rect x="0" y="322" width="800" height="10" fill="#3a2159"/>
          <rect x="0" y="120" width="800" height="8" fill="#3a2159"/>
          <g>
            <rect x="300" y="250" width="500" height="26" fill="#3a2159" stroke="#150b24"/>
            <rect x="300" y="276" width="500" height="110" fill="#221238" stroke="#150b24"/>
            <path d="M320 286v90M420 286v90M520 286v90M620 286v90M720 286v90" stroke="#3a2159"/>
            ${[360, 470, 580, 690].map((x, i) => `<g><rect x="${x}" y="192" width="34" height="10" rx="5" fill="#4a2a74"/><path d="M${x + 17} 202v48M${x + 2} 250h30" stroke="#3a2159" stroke-width="4"/><path d="M${x + 8} 250v28M${x + 26} 250v28" stroke="#3a2159"/></g>`).join('')}
            <g transform="translate(330,150)">
              <rect x="0" y="0" width="120" height="70" rx="8" fill="#2a1745" stroke="#4a2a74"/>
              <ellipse cx="60" cy="36" rx="42" ry="20" fill="#e9d5ff" opacity=".14"/>
              <rect x="30" y="20" width="26" height="34" rx="3" fill="#a855f7" opacity=".45"/>
              <rect x="64" y="16" width="22" height="38" rx="3" fill="#e879f9" opacity=".3"/>
            </g>
          </g>
          <g>
            <rect x="20" y="250" width="230" height="26" fill="#3a2159"/>
            <rect x="20" y="276" width="230" height="110" fill="#221238"/>
            <path d="M50 276v110M110 276v110M170 276v110" stroke="#3a2159"/>
            <ellipse cx="135" cy="240" rx="70" ry="14" fill="#2f1c4a" stroke="#4a2a74"/>
          </g>
          <g transform="translate(480,30)">
            <rect x="0" y="0" width="290" height="60" rx="6" fill="#0d0817" stroke="#e879f9" stroke-width="2"/>
            <text x="145" y="40" text-anchor="middle" font-family="Georgia,serif" font-size="30" letter-spacing="6" fill="#f5d0fe" opacity=".9">MO'S 24H</text>
          </g>
          <g>
            <rect x="700" y="60" width="60" height="150" fill="#221238" stroke="#3a2159"/>
            <path d="M710 80h40M710 100h40M710 120h40" stroke="#4a2a74"/>
            <circle cx="730" cy="160" r="10" fill="#fbbf24" opacity=".4"/>
          </g>
          ${fogBank(500, 430, 300, 40, .05)}
          ${rain(24, 'din')}
        </g>
      `;
      return wrap(id, inner, '', 'Late night diner');
    },

    office(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#150b24"/>
        <rect x="0" y="0" width="800" height="330" fill="#1b1029"/>
        <rect x="0" y="330" width="800" height="120" fill="#0d0817"/>
        <g>
          <rect x="420" y="30" width="340" height="260" fill="#0f081a" stroke="#3a2159" stroke-width="3"/>
          ${Array.from({ length: 11 }, (_, i) => `<rect x="428" y="${40 + i * 22}" width="324" height="11" fill="#241338"/><rect x="428" y="${40 + i * 22}" width="324" height="5" fill="#3a2159" opacity=".6"/>`).join('')}
          <path d="M590 30v260M720 30v260" stroke="#150b24" stroke-width="4"/>
        </g>
        ${bulletBoard(50, 40, 300, 170)}
        <g>
          <rect x="60" y="270" width="300" height="149" fill="#1b1029"/>
          <rect x="50" y="264" width="320" height="14" fill="#3a2159"/>
          <path d="M70 290h280" stroke="#6d28d9" stroke-width="2" opacity=".5"/>
          <rect x="90" y="230" width="80" height="34" fill="#0b0614" stroke="#4a2a74"/>
          <path d="M100 240h60M100 250h40" stroke="#3a2159"/>
          <rect x="210" y="220" width="34" height="44" fill="#0d0817" stroke="#4a2a74"/>
          <circle cx="227" cy="235" r="4" fill="#e879f9"/>
          ${chair(370, 330, '#2a1745')}
          ${chair(390, 320, '#221238')}
        </g>
        <g>
          <rect x="620" y="300" width="120" height="80" fill="#221238" stroke="#3a2159"/>
          <rect x="630" y="312" width="100" height="8" fill="#3a2159"/>
          <rect x="630" y="330" width="100" height="8" fill="#3a2159"/>
        </g>
        <circle cx="700" cy="360" r="90" fill="url(#${id}glow)" opacity=".25"/>
        ${lampCone(400, 40, '#c9a4ff')}
        <path d="M240 0v40M400 0v30M560 0v36" stroke="#4a2a74" stroke-width="2"/>
        <g fill="#f5e8ff" opacity=".5"><circle cx="240" cy="44" r="5"/><circle cx="400" cy="34" r="4"/><circle cx="560" cy="40" r="4"/></g>
      `;
      return wrap(id, inner, '', 'Detective office');
    },

    lab(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0e0a18"/>
        <rect x="0" y="300" width="800" height="150" fill="#0a0612"/>
        <path d="M0 300h800" stroke="#3a2159" stroke-width="3"/>
        <g>
          <rect x="40" y="200" width="700" height="18" fill="#3a2159" stroke="#150b24"/>
          <rect x="60" y="218" width="660" height="90" fill="#1b1029" stroke="#3a2159"/>
          <path d="M160 218v90M260 218v90M360 218v90M460 218v90M560 218v90M660 218v90" stroke="#241338"/>
        </g>
        <g>
          <rect x="100" y="120" width="210" height="80" fill="#120a20" stroke="#3a2159" stroke-width="2"/>
          <path d="M110 140h190M110 160h190M110 180h190" stroke="#241338"/>
          <rect x="130" y="98" width="150" height="22" fill="#241338" stroke="#4a2a74"/>
        </g>
        <g>
          <rect x="500" y="80" width="230" height="120" fill="#120a20" stroke="#3a2159" stroke-width="2"/>
          <path d="M510 100h210M510 120h210M510 140h210M510 160h210" stroke="#241338"/>
          <circle cx="615" cy="170" r="18" fill="none" stroke="#a855f7" stroke-width="3" opacity=".6"/>
          <path d="M600 170h30M615 155v30" stroke="#a855f7" opacity=".4"/>
        </g>
        <g>
          ${[[110, 260, '#a3e635'], [160, 250, '#67e8f9'], [210, 264, '#e879f9'], [420, 256, '#fbbf24'], [470, 250, '#a855f7']].map(p => `<g><path d="M${p[0]} ${p[1] - 10}h22l-4 22h-14z" fill="rgba(255,255,255,.06)" stroke="#4a2a74"/><path d="M${p[0] + 2} ${p[1] + 4}h18l-2 8h-14z" fill="${p[2]}" opacity=".6"/></g>`).join('')}
          <rect x="640" y="240" width="60" height="40" rx="4" fill="#0d0817" stroke="#4a2a74"/>
          <path d="M650 250h40M650 260h26" stroke="#a855f7" opacity=".5"/>
        </g>
        <g>
          <rect x="0" y="50" width="800" height="10" fill="#241338"/>
          <path d="M120 60v30M320 60v20M520 60v34M700 60v24" stroke="#4a2a74" stroke-width="2"/>
          <g fill="#e9d5ff" opacity=".5"><rect x="100" y="90" width="40" height="6" rx="3"/><rect x="300" y="80" width="40" height="6" rx="3"/><rect x="500" y="94" width="40" height="6" rx="3"/><rect x="680" y="84" width="40" height="6" rx="3"/></g>
        </g>
        <g transform="translate(300,330)">
          <rect x="0" y="0" width="220" height="90" fill="#241338" stroke="#3a2159"/>
          <rect x="14" y="14" width="90" height="62" fill="#0a0612" stroke="#4a2a74"/>
          <circle cx="59" cy="45" r="24" fill="#120a20" stroke="#6d28d9" stroke-width="2"/>
          <path d="M59 21v48M35 45h48" stroke="#a855f7" opacity=".3"/>
        </g>
        ${lampCone(260, 20, '#a855f7')}
      `;
      return wrap(id, inner, '', 'Forensics laboratory');
    },

    docks(o) {
      const id = o.id;
      const inner = `
        ${moon(140, 100, 40)}
        ${city(260, '#080510', 'dk')}
        <rect x="0" y="300" width="800" height="150" fill="#0a0612"/>
        <path d="M0 330h800" stroke="#241338" stroke-width="2"/>
        <g>
          <path d="M0 340c120-12 220 8 340 0s260-14 460-2v112H0z" fill="#0f1a2e"/>
          <path d="M0 380c120-10 200 6 300 0s260-10 500-4" stroke="#2a3f66" stroke-width="2" fill="none" opacity=".5"/>
          <path d="M620 300h180v-40H640v-26h120v-24H660" stroke="#2a1745" stroke-width="18" fill="none"/>
          <path d="M640 300V180M700 300V186M760 300V176" stroke="#3a2159" stroke-width="4"/>
        </g>
        <g>
          ${[[20, 240, '#2a1745'], [150, 270, '#3a2159'], [60, 300, '#241338'], [560, 250, '#2a1745']].map(p => `<rect x="${p[0]}" y="${p[1]}" width="120" height="60" rx="3" fill="${p[2]}" stroke="#150b24" stroke-width="2"/><path d="M${p[0] + 8} ${p[1] + 12}h104M${p[0] + 8} ${p[1] + 30}h104" stroke="#4a2a74" stroke-width="2"/>`).join('')}
        </g>
        <g>
          <path d="M350 320V180h30v140" stroke="#3a2159" stroke-width="3" fill="#1b1029"/>
          <path d="M365 180V90l100 40-100 50z" fill="#120a20" stroke="#4a2a74" stroke-width="2"/>
          <path d="M365 90v-24h22v24" fill="#2a1745" stroke="#3a2159"/>
          <path d="M380 420V320" stroke="#3a2159" stroke-width="4"/>
          <rect x="330" y="360" width="100" height="50" fill="#1b1029" stroke="#3a2159"/>
          <path d="M340 370h80M340 385h50" stroke="#4a2a74"/>
        </g>
        <g>
          <path d="M600 450l90-90 30 90" fill="#0d0817"/>
          <path d="M700 450l60-70 40 70" fill="#0b0614"/>
        </g>
        ${fogBank(400, 300, 500, 80, .07)}
        ${rain(50, 'dkrain')}
      `;
      return wrap(id, inner, '', 'Container docks at night');
    },

    forest(o) {
      const id = o.id;
      const R = rng('forest');
      let trees = '';
      for (let i = 0; i < 26; i++) {
        const x = R() * 820 - 10, y = 110 + R() * 220, s = .5 + R() * 1.1, op = .3 + R() * .6;
        trees += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${s.toFixed(2)})" opacity="${op.toFixed(2)}">
          <path d="M0 0l26 90h-52zM-6 40l30 100h-60z" fill="#0d1a18" stroke="#1f3a32" stroke-width="1.5"/>
          <rect x="-5" y="86" width="10" height="40" fill="#1b1029"/>
        </g>`;
      }
      const inner = `
        ${moon(560, 80, 42)}
        <rect width="800" height="450" fill="#0a1210"/>
        <path d="M0 300c100-30 200 10 300-14s220 12 500-20v184H0z" fill="#101d19"/>
        ${trees}
        <path d="M350 450c-20-70 10-120 34-170 20-42 12-80 6-110" stroke="#3a2a1c" stroke-width="26" fill="none" opacity=".6"/>
        <path d="M330 450c-40-60-10-110 20-150" stroke="#1b1029" stroke-width="35" fill="none"/>
        <g>
          <path d="M0 400c120-16 240 12 380 4s260-18 420-4v50H0z" fill="#0b1512"/>
          <path d="M260 450c40-30 100-40 150-60" stroke="#3a2a1c" stroke-width="3" opacity=".5"/>
        </g>
        <g transform="translate(180,330)">
          <rect x="0" y="0" width="44" height="14" fill="#fbbf24" opacity=".25"/>
          <path d="M12 0v-24M32 0v-18" stroke="#e9d5ff" stroke-width="2" opacity=".4"/>
          <path d="M0 0v20M44 0v20" stroke="#150b24" stroke-width="3"/>
        </g>
        ${fogBank(400, 380, 520, 70, .1)}
        ${fogBank(300, 300, 300, 50, .06)}
      `;
      return wrap(id, inner, '', 'Dark forest');
    },

    lighthouse(o) {
      const id = o.id;
      const inner = `
        ${moon(620, 90, 40)}
        <rect width="800" height="450" fill="#080d18"/>
        <path d="M0 340c120-18 240 10 380 0s280-16 420-2v112H0z" fill="#0a1524"/>
        <path d="M0 380c120-12 220 8 320 0s280-10 480-6" stroke="#1e3a5c" stroke-width="2" fill="none" opacity=".6"/>
        <g>
          <path d="M90 450l40-70 80-10 70 30 40 50z" fill="#0d1420" stroke="#20304a" stroke-width="2"/>
          <path d="M150 370l10-160h52l10 160z" fill="#1b1029" stroke="#3a2159" stroke-width="2"/>
          <path d="M156 350h58M160 320h50M163 290h44M166 260h38" fill="none" stroke="#4a2a74" stroke-width="2"/>
          <rect x="150" y="196" width="64" height="18" fill="#2a1745" stroke="#3a2159"/>
          <rect x="158" y="170" width="48" height="30" fill="#120a20" stroke="#6d28d9" stroke-width="2"/>
          <path d="M182 170v-16" stroke="#4a2a74"/>
          <circle cx="182" cy="184" r="9" fill="#fbbf24" opacity=".8"/>
          <path d="M190 184l260-90v40L190 200z" fill="#fbbf24" opacity=".07"/>
          <path d="M150 450l18-40h30l-6 40z" fill="#0b0614"/>
        </g>
        <g>
          <rect x="600" y="330" width="140" height="80" fill="#120a20" stroke="#3a2159"/>
          <path d="M620 410v-50h34v50" fill="#1b1029" stroke="#4a2a74"/>
          <path d="M660 340h60v30h-60z" fill="#fbbf24" opacity=".2"/>
          <path d="M560 450l40-60 60 10 20 50z" fill="#0d1420"/>
        </g>
        ${fogBank(400, 410, 420, 50, .12)}
        ${rain(36, 'lhr')}
      `;
      return wrap(id, inner, '', 'Lighthouse on the coast');
    },

    train(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#120a20"/>
        <rect x="0" y="0" width="800" height="330" fill="#1a0f2b"/>
        <rect x="0" y="330" width="800" height="120" fill="#0b0614"/>
        <path d="M0 330h800" stroke="#3a2159" stroke-width="2"/>
        <g>
          ${[40, 280, 520].map((x, i) => `<g>
            <rect x="${x}" y="70" width="220" height="120" fill="#0a0612" stroke="#3a2159" stroke-width="3"/>
            <rect x="${x + 8}" y="78" width="204" height="104" fill="#150b24"/>
            <path d="M${x + 8} 120h204M${x + 8} 160h204" stroke="#0a0612" stroke-width="2" opacity=".6"/>
            <circle cx="${x + 150}" cy="105" r="10" fill="#fbbf24" opacity=".18"/>
            <path d="M${x} 70l-14-20h248l10 20" fill="#120a20" stroke="#3a2159"/>
          </g>`).join('')}
        </g>
        <g>
          <rect x="0" y="250" width="800" height="18" fill="#3a2159"/>
          <path d="M0 268h800v14H0z" fill="#221238"/>
          <g fill="#241338" stroke="#3a2159" stroke-width="2">
            <rect x="40" y="284" width="170" height="80" rx="10"/>
            <rect x="250" y="284" width="150" height="80" rx="10"/>
            <rect x="440" y="284" width="150" height="80" rx="10"/>
            <rect x="630" y="284" width="140" height="80" rx="10"/>
          </g>
          <path d="M100 340h600" stroke="#4a2a74" stroke-width="3" stroke-dasharray="20 16" opacity=".5"/>
        </g>
        <g>
          <rect x="560" y="210" width="90" height="40" rx="4" fill="#221238" stroke="#4a2a74"/>
          <path d="M575 222h60M575 234h36" stroke="#a855f7" opacity=".5"/>
        </g>
        <g>
          <path d="M0 30h800v10H0z" stroke="#3a2159" fill="#221238"/>
          <path d="M60 40v40M200 40v40M340 40v40M480 40v40M620 40v40M760 40v40" stroke="#4a2a74" stroke-width="2"/>
          <rect x="0" y="380" width="800" height="70" fill="#0d0817"/>
        </g>
        ${lampCone(400, 20, '#fbbf24')}
        <g opacity=".8">
          <rect x="700" y="60" width="6" height="150" fill="#4a2a74"/>
          <path d="M706 70h30M706 100h30" stroke="#a855f7" opacity=".4"/>
        </g>
      `;
      return wrap(id, inner, '', 'Night train carriage');
    },

    hotel(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#160c26"/>
        <rect x="0" y="340" width="800" height="110" fill="#0b0614"/>
        <g>
          <rect x="0" y="0" width="800" height="340" fill="#1d1030"/>
          ${[40, 260, 480, 700].map((x, i) => `<g>
            <rect x="${x - 20}" y="70" width="140" height="260" fill="#2a1745" stroke="#0a0612" stroke-width="3"/>
            <rect x="${x}" y="90" width="100" height="220" fill="#3a1f5c" stroke="#150b24" stroke-width="2"/>
            <circle cx="${x + 84}" cy="200" r="4" fill="#fbbf24"/>
            <rect x="${x + 10}" y="108" width="80" height="14" fill="#241338"/>
            <text x="${x + 50}" y="120" font-family="monospace" font-size="9" fill="#c9a4ff" text-anchor="middle" opacity=".7">${['204', '206', '208', '210'][i]}</text>
            <path d="M${x + 10} 150h80M${x + 10} 170h80" stroke="#241338" stroke-width="2"/>
          </g>`).join('')}
          <rect x="0" y="0" width="800" height="14" fill="#0d0817"/>
          <g>
            <rect x="150" y="140" width="22" height="44" fill="#fbbf24" opacity=".18"/>
            <rect x="370" y="140" width="22" height="44" fill="#fbbf24" opacity=".18"/>
            <rect x="590" y="140" width="22" height="44" fill="#fbbf24" opacity=".18"/>
          </g>
          <path d="M0 330h800" stroke="#3a2159" stroke-width="2"/>
        </g>
        <g>
          <rect x="80" y="330" width="640" height="20" fill="#8b1e4a" opacity=".35"/>
          <path d="M80 330h640" stroke="#e879f9" stroke-width="1.5" opacity=".4"/>
        </g>
        <g>
          <rect x="600" y="280" width="120" height="60" rx="5" fill="#221238" stroke="#3a2159"/>
          <circle cx="630" cy="340" r="10" fill="#0a0612" stroke="#4a2a74"/>
          <circle cx="690" cy="340" r="10" fill="#0a0612" stroke="#4a2a74"/>
          <path d="M620 300h80M620 312h60" stroke="#4a2a74"/>
        </g>
        <g>
          <path d="M280 70v60" stroke="#4a2a74" stroke-width="2"/>
          <path d="M300 150l40 60H380l30-40 60 70" stroke="#6d28d9" stroke-width="3" fill="none" opacity=".5"/>
        </g>
        ${lampCone(160, 130, '#fbbf24')}
        ${lampCone(380, 130, '#fbbf24')}
        ${lampCone(600, 130, '#fbbf24')}
      `;
      return wrap(id, inner, '', 'Hotel corridor');
    },

    hospital(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0d1420"/>
        <rect x="0" y="0" width="800" height="330" fill="#16202c"/>
        <rect x="0" y="330" width="800" height="120" fill="#0a1018"/>
        <path d="M0 330h800" stroke="#2a4a5a" stroke-width="2"/>
        <g>
          <rect x="60" y="90" width="160" height="240" fill="#0f1a24" stroke="#2a4a5a" stroke-width="3"/>
          <rect x="80" y="110" width="120" height="200" fill="#1d2c3a" stroke="#2a4a5a"/>
          <rect x="94" y="126" width="92" height="60" fill="#a3e635" opacity=".13"/>
          <path d="M94 280h92M94 260h92" stroke="#2a4a5a" stroke-width="2"/>
          <g transform="translate(350,120)">
            <rect x="0" y="0" width="170" height="210" fill="#0f1a24" stroke="#2a4a5a" stroke-width="3"/>
            <rect x="18" y="18" width="134" height="174" fill="#1d2c3a" stroke="#2a4a5a"/>
            <path d="M18 60h134M18 120h134M18 150h134" stroke="#2a4a5a" stroke-width="1.5" opacity=".7"/>
            <circle cx="85" cy="80" r="14" fill="#67e8f9" opacity=".2"/>
            <path d="M70 84h30M85 70v28" stroke="#67e8f9" opacity=".6" stroke-width="3"/>
          </g>
          <rect x="600" y="100" width="140" height="230" fill="#0f1a24" stroke="#2a4a5a" stroke-width="3"/>
          <path d="M610 130h120M610 170h120M610 210h120M610 250h120" stroke="#2a4a5a" stroke-width="2"/>
          <g transform="translate(560,250)">
            <circle cx="0" cy="40" r="34" fill="none" stroke="#4a5a6a" stroke-width="3"/>
            <circle cx="0" cy="40" r="20" fill="none" stroke="#4a5a6a" stroke-width="3"/>
            <path d="M-34 40h-40M0 74v16M0 6v-16" stroke="#4a5a6a" stroke-width="3"/>
          </g>
        </g>
        <g stroke="#2a4a5a" stroke-width="2">
          <path d="M260 0v40M520 0v40M660 0v30"/>
          <rect x="250" y="34" width="30" height="6" fill="#67e8f9" opacity=".4"/>
          <rect x="510" y="34" width="30" height="6" fill="#67e8f9" opacity=".4"/>
          <rect x="650" y="24" width="24" height="6" fill="#67e8f9" opacity=".4"/>
        </g>
        <g>
          <rect x="0" y="230" width="800" height="8" fill="#1d2c3a"/>
          <rect x="0" y="238" width="800" height="3" fill="#67e8f9" opacity=".25"/>
        </g>
        <path d="M720 450c0-40 20-60 60-60" stroke="#2a4a5a" stroke-width="2" fill="none" opacity=".5"/>
        ${lampCone(260, 0, '#67e8f9')}
      `;
      return wrap(id, inner, '', 'Hospital corridor');
    },

    shop(o) {
      const id = o.id, pawn = o.mood !== 'book';
      const inner = `
        <rect width="800" height="450" fill="#150b24"/>
        <rect x="0" y="0" width="800" height="320" fill="#1d1030"/>
        <rect x="0" y="320" width="800" height="130" fill="#0d0817"/>
        <g>
          <rect x="40" y="40" width="720" height="280" fill="#120a20" stroke="#3a2159" stroke-width="2"/>
          ${[0, 1, 2, 3].map(r => `<path d="M60 ${90 + r * 60}h680" stroke="#3a2159" stroke-width="3"/>
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<g><rect x="${76 + i * 74}" y="${56 + r * 60}" width="44" height="30" rx="2" fill="${['#3a2159', '#2a1745', '#4a2a74'][(i + r) % 3]}" stroke="#150b24"/><path d="M${82 + i * 74} ${64 + r * 60}h30" stroke="#a855f7" opacity=".3"/></g>`).join('')}`).join('')}
        </g>
        <g>
          <rect x="60" y="340" width="680" height="100" fill="#221238" stroke="#3a2159" stroke-width="2"/>
          <rect x="60" y="334" width="680" height="12" fill="#3a2159"/>
          <g transform="translate(120,290)">
            <rect x="0" y="0" width="90" height="50" fill="#0d0817" stroke="#4a2a74"/>
            <circle cx="40" cy="25" r="14" fill="#120a20" stroke="#a855f7" opacity=".5"/>
            <path d="M40 6v38M21 25h38" stroke="#a855f7" opacity=".3"/>
          </g>
          <g transform="translate(560,270)">
            <rect x="0" y="0" width="120" height="70" fill="#120a20" stroke="#4a2a74"/>
            <path d="M10 20h100M10 36h70M10 52h84" stroke="#6d28d9" opacity=".3"/>
          </g>
          <g transform="translate(320,240)">
            <circle cx="0" cy="0" r="40" fill="#0d0817" stroke="#4a2a74"/>
            <circle cx="0" cy="0" r="28" fill="none" stroke="#a855f7" opacity=".5"/>
            <path d="M0-28V28M-28 0H28M-20-20L20 20M20-20L-20 20" stroke="#a855f7" opacity=".3"/>
            <path d="M-40 0h-24M40 0h24" stroke="#4a2a74" stroke-width="2"/>
          </g>
        </g>
        <g transform="translate(250,20)">
          <rect x="0" y="0" width="300" height="44" rx="4" fill="#0d0817" stroke="${pawn ? '#e879f9' : '#a855f7'}" stroke-width="2"/>
          <text x="150" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="22" letter-spacing="6" fill="#f5d0fe">${pawn ? 'PAWN & GOLD' : 'BOOKS'}</text>
        </g>
        <g>
          <path d="M0 330h800" stroke="#4a2a74" stroke-width="2"/>
          <path d="M0 350h800" stroke="#2a1745" stroke-width="1" opacity=".5"/>
        </g>
        <circle cx="400" cy="180" r="140" fill="url(#${id}glow)" opacity=".25"/>
      `;
      return wrap(id, inner, '', 'Pawn shop interior');
    },

    bridge(o) {
      const id = o.id;
      const inner = `
        ${moon(620, 80, 42)}
        ${city(300, '#080510', 'br')}
        <rect width="800" height="450" fill="#0b0a16"/>
        <path d="M0 320c160-10 300 8 420 0s240-12 380-4v134H0z" fill="#0b1220"/>
        <g>
          <path d="M-20 330h840v30H-20z" fill="#221238" stroke="#3a2159" stroke-width="2"/>
          <path d="M-20 360v20h840v-20" fill="#150b24"/>
          <path d="M0 300c140-80 260-80 400-10s280 30 420-40" stroke="#2a1745" stroke-width="14" fill="none"/>
          <path d="M0 300c140-80 260-80 400-10s280 30 420-40" stroke="#4a2a74" stroke-width="3" fill="none"/>
          <path d="M90 310V180M300 312V210M510 318V220M700 300V190" stroke="#241338" stroke-width="4"/>
          <g stroke="#3a2159" stroke-width="3" fill="none">
            <path d="M90 190c40-30 90-30 130 0M300 220c30-24 70-24 100 0M510 230c30-22 64-22 94 0"/>
          </g>
          <g fill="#0a0612" stroke="#2a1745" stroke-width="2">
            <rect x="60" y="300" width="50" height="30"/><rect x="280" y="300" width="50" height="30"/><rect x="500" y="300" width="50" height="30"/><rect x="680" y="300" width="50" height="30"/>
          </g>
        </g>
        <g>
          <path d="M-10 390c120-10 240 8 380 0s280-8 440 0" stroke="#1e3a5c" stroke-width="2" fill="none" opacity=".5"/>
          <path d="M0 420c160-8 300 10 450 0s250-8 350 0" stroke="#1e3a5c" stroke-width="1.5" fill="none" opacity=".3"/>
        </g>
        <g>
          <path d="M390 330V210" stroke="#0a0612" stroke-width="6"/>
          <circle cx="390" cy="202" r="10" fill="#fbbf24" opacity=".55"/>
        </g>
        ${lampCone(390, 210, '#fbbf24')}
        ${fogBank(400, 300, 460, 60, .12)}
        ${rain(42, 'brr')}
      `;
      return wrap(id, inner, '', 'Stone bridge over the river at night');
    },

    barn(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#1a120c"/>
        <rect x="0" y="300" width="800" height="150" fill="#120c08"/>
        <g stroke="#2a1c12" stroke-width="3" fill="none">
          <path d="M0 60h800M0 160h800M0 260h800"/>
          <path d="M100 60v340M260 60v340M420 60v340M580 60v340M740 60v340"/>
          <path d="M0 60l100 100M800 60l-100 100M0 260l100 100M800 260l-100 100"/>
        </g>
        <g>
          <path d="M0 340h800v110H0z" fill="#0d0817"/>
          <path d="M0 340h800" stroke="#3a2a1c" stroke-width="4"/>
          ${[120, 220, 500, 620].map((x, i) => `<g>${crate(x, 330 - (i % 2) * 40, 80, '#241a12')}</g>`).join('')}
          <g>
            <path d="M340 410V300h120v110" fill="#2a1c12" stroke="#3a2a1c"/>
            <path d="M340 300l60-40 60 40" fill="#241a12" stroke="#3a2a1c"/>
            <path d="M355 320h30v30h-30zM415 320h30v30h-30z" fill="#0a0612" stroke="#4a3a2a"/>
          </g>
          <g>
            <path d="M680 340V220" stroke="#4a3a2a" stroke-width="3"/>
            <path d="M660 240l40-20 10 40-40 10z" fill="#4a3a2a" stroke="#2a1c12"/>
            <path d="M680 260v40" stroke="#6b5a3a" stroke-width="2"/>
          </g>
          <g>
            <rect x="60" y="260" width="18" height="80" fill="#3a2a1c"/>
            <path d="M40 270h60M50 250l20-20 20 20" stroke="#4a3a2a" stroke-width="4" fill="none"/>
          </g>
        </g>
        <g>
          <path d="M0 0h800v60H0z" fill="#0a0612"/>
          <path d="M0 60l800 0" stroke="#2a1c12" stroke-width="3"/>
          <rect x="350" y="60" width="100" height="70" fill="#0a0612" stroke="#3a2a1c"/>
          <path d="M370 130v-50h60v50" fill="#120c08" stroke="#3a2a1c"/>
        </g>
        <path d="M80 0l160 450h120L200 0z" fill="#fbbf24" opacity=".03"/>
        ${lampCone(420, 0, '#fbbf24')}
      `;
      return wrap(id, inner, '', 'Old barn interior');
    },

    basement(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0d0812"/>
        <rect x="0" y="0" width="800" height="310" fill="#150b1e"/>
        <rect x="0" y="310" width="800" height="140" fill="#0a0610"/>
        <g>
          <rect x="60" y="80" width="120" height="230" fill="#1b1024" stroke="#3a2159" stroke-width="2"/>
          <rect x="70" y="90" width="100" height="60" fill="#0a0612" stroke="#4a2a74"/>
          <circle cx="120" cy="120" r="20" fill="#fbbf24" opacity=".15"/>
          <rect x="70" y="170" width="100" height="130" fill="#241338" stroke="#3a2159"/>
          <path d="M80 190h80M80 220h80M80 250h50" stroke="#4a2a74" stroke-width="2"/>
        </g>
        <g>
          <path d="M640 0v150c0 40-40 40-40 80v80" stroke="#3a2159" stroke-width="14" fill="none"/>
          <path d="M720 0v190c0 30 30 30 30 70v60" stroke="#3a2159" stroke-width="10" fill="none"/>
          <rect x="600" y="90" width="70" height="30" fill="#2a1745" stroke="#4a2a74"/>
          <path d="M610 100h50M610 112h30" stroke="#a855f7" opacity=".4"/>
        </g>
        <g>
          <path d="M540 440V260h60v180" fill="#0b0612" stroke="#3a2159" stroke-width="2"/>
          <path d="M540 300h60M540 340h60M540 380h60" stroke="#4a2a74"/>
          <rect x="420" y="280" width="90" height="80" fill="#1b1029" stroke="#3a2159"/>
          <path d="M430 290h70v60h-70z" fill="#0a0612"/>
        </g>
        <g>
          <path d="M0 100h160v240H0z" fill="#120a20" stroke="#3a2159" stroke-width="2"/>
          <path d="M10 120h140M10 150h140M10 180h140M10 210h100" stroke="#241338"/>
          ${crate(180, 340, 70, '#1b1029')}
          ${crate(260, 360, 60, '#221238')}
          ${barrel(340, 330, 60, 90, '#241338')}
        </g>
        <g>
          <path d="M400 0v60" stroke="#4a2a74" stroke-width="2"/>
          <circle cx="400" cy="70" r="14" fill="#fbbf24" opacity=".6"/>
          <path d="M400 84v16" stroke="#4a2a74"/>
        </g>
        <circle cx="400" cy="80" r="160" fill="url(#${id}glow)" opacity=".22"/>
        ${fogBank(400, 400, 380, 40, .05)}
      `;
      return wrap(id, inner, '', 'Cellar');
    },

    car(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0b0614"/>
        <path d="M0 210l220-60h360l220 60v240H0z" fill="#150b24" stroke="#3a2159" stroke-width="3"/>
        <g>
          <path d="M60 210l180-80h320l180 80v40H60z" fill="#1b1029" stroke="#4a2a74" stroke-width="2"/>
          <rect x="80" y="120" width="220" height="90" rx="12" fill="#0a0612" stroke="#4a2a74" stroke-width="2"/>
          <rect x="500" y="120" width="220" height="90" rx="12" fill="#0a0612" stroke="#4a2a74" stroke-width="2"/>
          <path d="M190 120v90M610 120v90" stroke="#241338" stroke-width="2"/>
          <path d="M80 250h640" stroke="#3a2159" stroke-width="3"/>
          <g>
            <path d="M60 300c120-30 220-20 340 0s260 20 340 0" stroke="#2a1745" stroke-width="2" fill="none"/>
            <path d="M80 330h640v60H80z" fill="#120a20" stroke="#3a2159"/>
            <path d="M120 330v60M280 330v60M520 330v60M680 330v60" stroke="#4a2a74" stroke-width="2"/>
          </g>
          <g>
            <circle cx="330" cy="290" r="80" fill="none" stroke="#221238" stroke-width="20"/>
            <circle cx="330" cy="290" r="80" fill="none" stroke="#4a2a74" stroke-width="3"/>
            <circle cx="330" cy="290" r="26" fill="#0d0817" stroke="#6d28d9" stroke-width="2"/>
            <path d="M330 210v22M330 348v22M250 290h22M388 290h22" stroke="#4a2a74" stroke-width="10"/>
          </g>
          <g>
            <rect x="470" y="250" width="180" height="80" rx="6" fill="#0a0612" stroke="#4a2a74" stroke-width="2"/>
            <circle cx="530" cy="290" r="16" fill="#1b1029" stroke="#6d28d9"/>
            <circle cx="590" cy="290" r="16" fill="#1b1029" stroke="#6d28d9"/>
            <rect x="620" y="268" width="18" height="46" fill="#3a2159"/>
          </g>
          <g>
            <rect x="140" y="240" width="40" height="14" fill="#e879f9" opacity=".6"/>
            <rect x="240" y="240" width="80" height="14" fill="#a855f7" opacity=".4"/>
          </g>
        </g>
        <g opacity=".3">
          <path d="M0 400c120-10 240 12 400 4s260-14 400-4" stroke="#a855f7" stroke-width="1" fill="none"/>
          <path d="M0 430c120-10 240 12 400 4s260-14 400-4" stroke="#a855f7" stroke-width="1" fill="none"/>
        </g>
      `;
      return wrap(id, inner, '', 'Interior of a car');
    },

    theatre(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0d0714"/>
        <rect x="0" y="0" width="800" height="330" fill="#160a1e"/>
        <path d="M0 0h800v40c-230 0-330 90-400 90S230 40 0 40z" fill="#2a0f24"/>
        <path d="M60 0c20 130 20 240 0 330M740 0c-20 130-20 240 0 330" stroke="#8b1e4a" stroke-width="60" opacity=".45"/>
        <g>
          <rect x="140" y="80" width="520" height="240" fill="#0a0612" stroke="#3a2159" stroke-width="3"/>
          <path d="M180 280c80-50 110-110 180-120s110 60 180 80 80 20 100 40" stroke="#241338" stroke-width="2" fill="none"/>
          <rect x="280" y="140" width="240" height="120" fill="#120a20" stroke="#4a2a74"/>
          <path d="M300 160h200M300 180h200M300 200h140" stroke="#3a2159" stroke-width="2"/>
        </g>
        <g>
          <path d="M0 330h800v120H0z" fill="#0a0612"/>
          ${[0, 1, 2, 3, 4, 5].map(r => `<path d="M0 ${350 + r * 18}h800" stroke="#1b1029" stroke-width="8"/>`).join('')}
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(c => `<path d="M${c * 112} 330l-40 120" stroke="#120a20" stroke-width="2"/>`).join('')}
        </g>
        <g>
          <circle cx="720" cy="60" r="20" fill="#fbbf24" opacity=".4"/>
          <path d="M700 80L480 330h200L740 100z" fill="#fbbf24" opacity=".06"/>
          <path d="M620 30l-30 300" stroke="#fbbf24" opacity=".1" stroke-width="30"/>
        </g>
        <g>
          <path d="M60 330V200" stroke="#3a2159" stroke-width="4"/>
          <circle cx="60" cy="194" r="10" fill="#fbbf24" opacity=".6"/>
        </g>
        ${fogBank(400, 340, 400, 40, .06)}
      `;
      return wrap(id, inner, '', 'Theatre stage');
    },

    greenhouse(o) {
      const id = o.id;
      const inner = `
        ${moon(180, 80, 40)}
        <rect width="800" height="450" fill="#081210"/>
        <g stroke="#2a4a3a" stroke-width="3" fill="none">
          <path d="M60 380V120L400 20l340 100v260"/>
          <path d="M60 200h680M60 290h680M200 120v260M400 20v360M600 120v260"/>
          <path d="M60 120L400 200l340-80M60 200l340 80 340-80"/>
        </g>
        <rect x="60" y="380" width="680" height="60" fill="#0d1a16" stroke="#2a4a3a" stroke-width="2"/>
        <g>
          <path d="M0 450V280c80-20 140 10 200-10v180z" fill="#12231c"/>
          <path d="M800 450V250c-100-20-160 10-220-10v210z" fill="#12231c"/>
        </g>
        <g>
          ${[[120, 340, 1.6], [210, 300, 1.1], [620, 330, 1.4], [700, 290, 1], [480, 360, 1.2]].map(p => plant(p[0], p[1], p[2], '#2f6b4f')).join('')}
          ${[[160, 250, '#e879f9'], [250, 230, '#a3e635'], [540, 240, '#c9a4ff'], [660, 210, '#e879f9']].map(p => `<g><path d="M${p[0]} ${p[1]}v-30" stroke="#2f6b4f" stroke-width="2"/><circle cx="${p[0]}" cy="${p[1] - 34}" r="12" fill="${p[2]}" opacity=".55"/><circle cx="${p[0]}" cy="${p[1] - 34}" r="6" fill="#f5d0fe" opacity=".4"/></g>`).join('')}
        </g>
        <g>
          <rect x="300" y="300" width="200" height="80" fill="#1b1029" stroke="#3a2159"/>
          <rect x="318" y="272" width="164" height="28" fill="#120a20" stroke="#4a2a74"/>
          ${[[330, 260], [380, 255], [430, 262], [470, 256]].map(p => `<path d="M${p[0]} ${p[1]}h22l-3 18h-16z" fill="#241338" stroke="#4a2a74"/>`).join('')}
        </g>
        <g>
          <path d="M60 380l340-100 340 100" stroke="#4a2a74" stroke-width="2" opacity=".4"/>
        </g>
        ${lampCone(400, 0, '#a3e635')}
        ${fogBank(400, 380, 340, 40, .1)}
      `;
      return wrap(id, inner, '', 'Glass greenhouse at night');
    },

    archive(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#120a18"/>
        <rect x="0" y="0" width="800" height="320" fill="#1b1024"/>
        <rect x="0" y="320" width="800" height="130" fill="#0b0610"/>
        <g>
          ${[0, 1, 2].map(c => `<g>
            <rect x="${40 + c * 240}" y="40" width="200" height="280" fill="#150b1e" stroke="#3a2159" stroke-width="2"/>
            ${[0, 1, 2, 3, 4, 5].map(r => `<rect x="${52 + c * 240}" y="${54 + r * 44}" width="176" height="34" fill="${['#241338', '#2a1745', '#1b1029'][(r + c) % 3]}" stroke="#4a2a74"/>
              <rect x="${60 + c * 240}" y="${60 + r * 44}" width="60" height="6" fill="#a855f7" opacity=".3"/>`).join('')}
          </g>`).join('')}
        </g>
        <g>
          <rect x="300" y="300" width="220" height="100" fill="#221238" stroke="#3a2159"/>
          <rect x="320" y="280" width="80" height="24" fill="#0d0817" stroke="#4a2a74"/>
          <path d="M330 290h60M330 298h30" stroke="#a855f7" opacity=".4"/>
          <circle cx="440" cy="292" r="10" fill="#fbbf24" opacity=".4"/>
          <path d="M440 302v30" stroke="#4a2a74"/>
          <rect x="560" y="330" width="150" height="20" fill="#3a2159"/>
          <path d="M590 350v40M680 350v40" stroke="#3a2159" stroke-width="4"/>
        </g>
        <g>
          <path d="M680 40v280" stroke="#3a2159" stroke-width="3"/>
          <path d="M680 60h40M680 160h40M680 260h40" stroke="#4a2a74" stroke-width="3"/>
          <rect x="700" y="80" width="30" height="60" fill="#241338" stroke="#4a2a74"/>
        </g>
        <g>
          <rect x="80" y="330" width="120" height="90" fill="#1b1029" stroke="#3a2159"/>
          <path d="M90 340h100M90 360h100M90 380h60" stroke="#3a2159" stroke-width="2"/>
        </g>
        ${lampCone(440, 280, '#fbbf24')}
      `;
      return wrap(id, inner, '', 'Records archive');
    },

    cabin(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0a1018"/>
        <rect x="0" y="0" width="800" height="320" fill="#16202c"/>
        <rect x="0" y="320" width="800" height="130" fill="#0b0812"/>
        <g>
          <path d="M0 320h800" stroke="#3a2159" stroke-width="3"/>
          <path d="M0 60h800M0 160h800M0 260h800" stroke="#2a1c22" stroke-width="8"/>
          <path d="M120 60v260M260 60v260M540 60v260M680 60v260" stroke="#2a1c22" stroke-width="6"/>
        </g>
        ${windowView(80, 90, 180, 140, id, { moon: 20, snow: true })}
        <g>
          <rect x="520" y="100" width="180" height="150" fill="#0a0612" stroke="#3a2159" stroke-width="3"/>
          <path d="M520 250h180l-20-40H540z" fill="#221238" stroke="#3a2159"/>
          <g fill="#fbbf24" opacity=".35"><path d="M560 100c0 30-12 40-12 60s12 20 12 40h30c0-20 12-20 12-40s-12-30-12-60z"/></g>
          <path d="M520 280h180" stroke="#3a2159" stroke-width="3"/>
        </g>
        <g>
          <rect x="330" y="260" width="150" height="80" fill="#1b1029" stroke="#3a2159"/>
          <path d="M350 280h110M350 300h70" stroke="#3a2159"/>
          ${chair(300, 340, '#241338')}
          <rect x="300" y="180" width="230" height="70" rx="8" fill="#241338" stroke="#3a2159" stroke-width="2"/>
          <path d="M310 190h210v26H310z" fill="#3a2159"/>
          <rect x="500" y="260" width="60" height="80" fill="#221238" stroke="#3a2159"/>
          <circle cx="530" cy="300" r="10" fill="#fbbf24" opacity=".4"/>
        </g>
        <g>
          <path d="M60 340h180" stroke="#2a1c22" stroke-width="30"/>
          <path d="M80 330v-20M220 330v-20" stroke="#2a1c22" stroke-width="6"/>
          <path d="M60 380h180" stroke="#2a1c22" stroke-width="8"/>
        </g>
        <path d="M0 300h800" stroke="#3a2159" stroke-width="1" opacity=".4"/>
        ${lampCone(600, 120, '#fbbf24')}
      `;
      return wrap(id, inner, '', 'Snowbound cabin interior');
    },

    church(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0b0714"/>
        <rect x="0" y="0" width="800" height="330" fill="#150c22"/>
        <rect x="0" y="330" width="800" height="120" fill="#0a0610"/>
        <g>
          <path d="M0 330h800" stroke="#3a2159" stroke-width="3"/>
          <path d="M120 0v330M680 0v330" stroke="#2a1745" stroke-width="30"/>
          <path d="M200 0v330M600 0v330" stroke="#221238" stroke-width="14"/>
          <path d="M400 0v40" stroke="#4a2a74" stroke-width="4"/>
          <path d="M370 60h60M400 30v100" stroke="#4a2a74" stroke-width="4"/>
        </g>
        <g>
          <rect x="300" y="60" width="200" height="200" fill="#0a0612" stroke="#4a2a74" stroke-width="3"/>
          <path d="M400 60v200M300 160h200" stroke="#4a2a74" stroke-width="4"/>
          <path d="M320 100c20-20 40-10 50 10s-20 30-30 50" stroke="#a855f7" stroke-width="3" fill="none" opacity=".5"/>
          <circle cx="410" cy="110" r="20" fill="#e879f9" opacity=".2"/>
          <path d="M440 180c20 20 20 50 0 70" stroke="#67e8f9" stroke-width="3" fill="none" opacity=".4"/>
        </g>
        <g>
          ${[0, 1, 2, 3].map(r => `<g>
            <path d="M${80 + r * 10} ${360 + r * 16}h${120 - r * 8}v${20}h${-(120 - r * 8)}z" fill="#221238" stroke="#3a2159"/>
            <path d="M${560 - r * 10} ${360 + r * 16}h${120 - r * 8}v${20}h${-(120 - r * 8)}z" fill="#221238" stroke="#3a2159"/>
          </g>`).join('')}
        </g>
        <g>
          <rect x="340" y="280" width="120" height="50" fill="#241338" stroke="#3a2159"/>
          <path d="M340 280h120M360 300h80" stroke="#4a2a74"/>
          <circle cx="400" cy="270" r="8" fill="#fbbf24" opacity=".5"/>
        </g>
        ${lampCone(400, 80, '#e879f9')}
        ${fogBank(400, 400, 400, 40, .06)}
      `;
      return wrap(id, inner, '', 'Church interior');
    },

    courtroom(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#120a18"/>
        <rect x="0" y="0" width="800" height="320" fill="#1b1024"/>
        <rect x="0" y="320" width="800" height="130" fill="#0b0610"/>
        <g>
          <path d="M0 30h800v20H0z" fill="#3a2159"/>
          <path d="M100 50v270M260 50v270M540 50v270M700 50v270" stroke="#2a1745" stroke-width="20"/>
          <path d="M100 50l160 0M540 50l160 0" stroke="#4a2a74" stroke-width="4"/>
        </g>
        <g>
          <rect x="240" y="130" width="320" height="140" fill="#0f0818" stroke="#4a2a74" stroke-width="4"/>
          <rect x="270" y="100" width="260" height="40" fill="#221238" stroke="#4a2a74"/>
          <circle cx="400" cy="80" r="18" fill="#0d0817" stroke="#a855f7" opacity=".5"/>
          <path d="M382 90h36M400 62v28" stroke="#a855f7" opacity=".4"/>
          <rect x="290" y="180" width="220" height="20" fill="#1b1029" stroke="#3a2159"/>
          <rect x="300" y="210" width="200" height="60" fill="#1b1029" stroke="#3a2159"/>
        </g>
        <g>
          <rect x="80" y="300" width="180" height="30" fill="#241338" stroke="#3a2159"/>
          <path d="M100 330v40M240 330v40" stroke="#3a2159" stroke-width="6"/>
          <rect x="540" y="300" width="180" height="30" fill="#241338" stroke="#3a2159"/>
          <path d="M560 330v40M700 330v40" stroke="#3a2159" stroke-width="6"/>
        </g>
        <g>
          ${[0, 1, 2, 3].map(r => `<path d="M60 ${380 + r * 14}h680" stroke="#2a1745" stroke-width="2"/>`).join('')}
          <path d="M120 370v70M680 370v70" stroke="#3a2159" stroke-width="2"/>
        </g>
        ${lampCone(400, 40, '#c9a4ff')}
      `;
      return wrap(id, inner, '', 'Courtroom');
    },

    attic(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0d0912"/>
        <rect x="0" y="0" width="800" height="320" fill="#170e1e"/>
        <rect x="0" y="320" width="800" height="130" fill="#0a0610"/>
        <g stroke="#2a1c22" stroke-width="6" fill="none">
          <path d="M40 320L400 40l360 280"/>
          <path d="M160 320V190M640 320V190"/>
          <path d="M80 250h640M120 200h560M180 150h440"/>
          <path d="M0 320h800"/>
        </g>
        <g>
          <path d="M320 100L400 60l80 40v80H320z" fill="#0a0612" stroke="#4a2a74" stroke-width="3"/>
          <path d="M320 180h160" stroke="#4a2a74" stroke-width="2"/>
          <circle cx="400" cy="120" r="18" fill="#0a0612" stroke="#6d28d9"/>
          <circle cx="400" cy="120" r="8" fill="#a855f7" opacity=".6"/>
        </g>
        <g>
          ${crate(80, 350, 100, '#241a12')}
          ${crate(190, 380, 70, '#2a1c12')}
          <rect x="580" y="330" width="140" height="80" rx="6" fill="#1b1029" stroke="#3a2159"/>
          <path d="M580 350h140" stroke="#4a2a74"/>
          <path d="M600 330v-20c0-10 100-10 100 0v20" stroke="#3a2159" stroke-width="3" fill="none"/>
          <circle cx="650" cy="390" r="6" fill="#fbbf24" opacity=".5"/>
          <path d="M300 400l40-90h80l-20 90z" fill="#221238" stroke="#3a2159"/>
          <path d="M360 310v-30" stroke="#4a2a74" stroke-width="2"/>
        </g>
        <g>
          <path d="M400 0v74" stroke="#4a2a74" stroke-width="2"/>
          <path d="M380 84h40l-6 30h-28z" fill="#fbbf24" opacity=".3"/>
          <circle cx="400" cy="90" r="24" fill="#fbbf24" opacity=".12"/>
        </g>
        <path d="M220 0l120 200" stroke="#c9a4ff" stroke-width="1" opacity=".08"/>
      `;
      return wrap(id, inner, '', 'Attic');
    },

    house(o) {
      const id = o.id, mansion = o.mood === 'mansion';
      const inner = `
        ${moon(640, 90, 36)}
        ${city(300, '#0a0614', 'house')}
        <rect width="800" height="450" fill="#0b0714"/>
        <path d="M0 330h800v120H0z" fill="#0d0817"/>
        <g>
          <path d="M${mansion ? 180 : 240} 330V${mansion ? 150 : 190}h${mansion ? 440 : 320}v180" fill="#150b24" stroke="#3a2159" stroke-width="3"/>
          <path d="M${mansion ? 150 : 210} ${mansion ? 160 : 200}L${mansion ? 400 : 400} ${mansion ? 40 : 80}l${mansion ? 250 : 190} ${mansion ? 120 : 120}v10z" fill="#120a20" stroke="#4a2a74" stroke-width="3"/>
          <rect x="${mansion ? 340 : 320}" y="240" width="60" height="90" fill="#0a0612" stroke="#4a2a74"/>
          <circle cx="${mansion ? 390 : 350}" cy="288" r="3" fill="#fbbf24"/>
          <g fill="#fbbf24" opacity=".25">
            <rect x="${mansion ? 220 : 270}" y="220" width="50" height="40"/>
            <rect x="${mansion ? 500 : 440}" y="220" width="50" height="40"/>
            ${mansion ? `<rect x="400" y="120" width="50" height="40"/><rect x="240" y="270" width="40" height="60"/><rect x="480" y="270" width="40" height="60"/>` : `<rect x="320" y="120" width="50" height="40"/>`}
          </g>
          <rect x="${mansion ? 220 : 270}" y="220" width="50" height="40" fill="none" stroke="#4a2a74"/>
          <rect x="${mansion ? 500 : 440}" y="220" width="50" height="40" fill="none" stroke="#4a2a74"/>
          <path d="M${mansion ? 350 : 330} 330v-30h40v30" fill="#1b1029" stroke="#4a2a74"/>
        </g>
        <g>
          <path d="M60 330v-80h160v80" fill="#120a20" stroke="#3a2159"/>
          <path d="M50 250l90-50 90 50" fill="#150b24" stroke="#4a2a74"/>
          <rect x="110" y="280" width="50" height="50" fill="#fbbf24" opacity=".15"/>
          <path d="M0 330h800" stroke="#3a2159" stroke-width="2"/>
          <g stroke="#2a1745" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${40 + i * 110} 350v40"/>`).join('')}<path d="M0 360h800"/></g>
        </g>
        <g>
          <path d="M620 330V250" stroke="#0a0612" stroke-width="6"/>
          <circle cx="620" cy="244" r="9" fill="#fbbf24" opacity=".6"/>
        </g>
        ${lampCone(620, 248, '#fbbf24')}
        <g>
          <path d="M690 330c20-60 80-70 110-40" stroke="#0a0612" stroke-width="3" fill="none"/>
          <circle cx="710" cy="310" r="20" fill="#0d1a18" stroke="#1f3a32"/>
        </g>
        ${fogBank(400, 420, 420, 40, .08)}
      `;
      return wrap(id, inner, '', mansion ? 'Grand mansion at night' : 'Suburban house at night');
    },

    morgue(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0a0e16"/>
        <rect x="0" y="0" width="800" height="310" fill="#111822"/>
        <rect x="0" y="310" width="800" height="140" fill="#080a10"/>
        <g>
          ${[0, 1, 2].map(c => `<g>
            <rect x="${60 + c * 240}" y="60" width="200" height="240" fill="#0a0f16" stroke="#2a3a4a" stroke-width="3"/>
            ${[0, 1, 2, 3].map(r => `<g><rect x="${72 + c * 240}" y="${74 + r * 56}" width="176" height="46" fill="#141c26" stroke="#2a3a4a" stroke-width="2"/>
              <rect x="${140 + c * 240}" y="${92 + r * 56}" width="40" height="8" rx="4" fill="#3a4a5a"/>
              <circle cx="${110 + c * 240}" cy="${97 + r * 56}" r="6" fill="#67e8f9" opacity=".2"/></g>`).join('')}
          </g>`).join('')}
        </g>
        <g>
          <rect x="420" y="300" width="330" height="50" fill="#1b2530" stroke="#2a3a4a" stroke-width="2"/>
          <path d="M430 350v50M740 350v50" stroke="#2a3a4a" stroke-width="4"/>
          <path d="M460 320h220" stroke="#2a3a4a" stroke-width="8"/>
          <path d="M520 300c0-40 30-40 60-30s40 10 50 30" fill="#d8c6f3" opacity=".2"/>
        </g>
        <g>
          <path d="M0 40h800v10H0z" fill="#2a3a4a"/>
          <path d="M120 50v20M320 50v20M520 50v20M720 50v20" stroke="#2a3a4a" stroke-width="2"/>
          <g fill="#e9d5ff" opacity=".22"><rect x="100" y="70" width="40" height="5"/><rect x="300" y="70" width="40" height="5"/><rect x="500" y="70" width="40" height="5"/><rect x="700" y="70" width="40" height="5"/></g>
        </g>
        <g>
          <rect x="60" y="370" width="160" height="80" fill="#141c26" stroke="#2a3a4a"/>
          <rect x="80" y="390" width="120" height="8" fill="#2a3a4a"/>
          <rect x="80" y="410" width="80" height="6" fill="#2a3a4a"/>
          <path d="M100 430h60" stroke="#67e8f9" stroke-width="2" opacity=".4"/>
        </g>
        ${lampCone(600, 0, '#67e8f9')}
      `;
      return wrap(id, inner, '', 'Morgue');
    },

    parking(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#0a0a12"/>
        <rect x="0" y="0" width="800" height="340" fill="#131320"/>
        <rect x="0" y="340" width="800" height="110" fill="#080810"/>
        <g>
          <path d="M0 40h800M0 120h800M0 200h800" stroke="#1c1c2c" stroke-width="2"/>
          <path d="M120 0v340M320 0v340M520 0v340M700 0v340" stroke="#1c1c2c" stroke-width="20"/>
          <g fill="#fbbf24" opacity=".35">
            <rect x="200" y="30" width="40" height="6"/><rect x="420" y="110" width="40" height="6"/><rect x="640" y="30" width="40" height="6"/>
          </g>
          <g>
            <rect x="160" y="250" width="150" height="60" rx="8" fill="#1b1029" stroke="#3a2159"/>
            <path d="M180 250l12-24h80l18 24" fill="#150b24" stroke="#3a2159"/>
            <circle cx="190" cy="312" r="10" fill="#0a0612"/><circle cx="280" cy="312" r="10" fill="#0a0612"/>
          </g>
          <g>
            <rect x="520" y="260" width="160" height="56" rx="8" fill="#150b24" stroke="#2a1745"/>
            <path d="M540 260l14-20h80l16 20" fill="#120a20" stroke="#2a1745"/>
            <circle cx="550" cy="318" r="10" fill="#0a0612"/><circle cx="650" cy="318" r="10" fill="#0a0612"/>
          </g>
          <path d="M0 340h800" stroke="#2a1745" stroke-width="3"/>
          <path d="M120 340l30 110M320 340l20 110M520 340l-20 110M700 340l-30 110" stroke="#1c1c2c" stroke-width="2"/>
        </g>
        ${lampCone(220, 0, '#c9a4ff')}
        ${lampCone(620, 0, '#c9a4ff')}
        ${fogBank(400, 400, 400, 40, .05)}
      `;
      return wrap(id, inner, '', 'Underground parking garage');
    },

    server(o) {
      const id = o.id;
      const inner = `
        <rect width="800" height="450" fill="#070a12"/>
        <rect x="0" y="0" width="800" height="320" fill="#0b1220"/>
        <rect x="0" y="320" width="800" height="130" fill="#060810"/>
        <g>
          ${[0, 1, 2, 3].map(c => `<g>
            <rect x="${50 + c * 190}" y="50" width="150" height="270" fill="#0d1626" stroke="#2a3a5a" stroke-width="2"/>
            ${Array.from({ length: 9 }, (_, r) => `<g><rect x="${62 + c * 190}" y="${62 + r * 28}" width="126" height="20" fill="#111c30" stroke="#1e2e4a"/>
              <circle cx="${74 + c * 190}" cy="${72 + r * 28}" r="3" fill="${['#67e8f9', '#a855f7', '#34d399'][(r + c) % 3]}" opacity=".7"><animate attributeName="opacity" values=".2;.9;.2" dur="${1.4 + r * .3}s" repeatCount="indefinite"/></circle>
              <path d="M${86 + c * 190} ${72 + r * 28}h80" stroke="#2a3a5a" stroke-width="2"/></g>`).join('')}
          </g>`).join('')}
        </g>
        <g>
          <path d="M0 320h800" stroke="#2a3a5a" stroke-width="3"/>
          <path d="M100 320v-20h600v20" fill="#0d1626" stroke="#2a3a5a"/>
        </g>
        <g>
          <rect x="320" y="340" width="160" height="90" fill="#0d1626" stroke="#2a3a5a"/>
          <path d="M340 360h120M340 380h120M340 400h60" stroke="#1e2e4a" stroke-width="2"/>
          <circle cx="450" cy="400" r="6" fill="#a855f7" opacity=".7"/>
        </g>
        <rect width="800" height="450" fill="#67e8f9" opacity=".025"/>
        ${fogBank(400, 400, 300, 40, .06)}
      `;
      return wrap(id, inner, '', 'Server room');
    },

    quarry(o) {
      const id = o.id;
      const inner = `
        ${moon(650, 80, 40)}
        <rect width="800" height="450" fill="#0b0a12"/>
        <path d="M0 300l120-140 120 60 160-120 140 90 120-50 140 140v170H0z" fill="#171326" stroke="#2a2140" stroke-width="2"/>
        <path d="M0 340l140-60 120 40 140-30 160 30 140-40 100 50v120H0z" fill="#120e1e" stroke="#241a36" stroke-width="2"/>
        <g>
          <path d="M0 400c100-20 200 10 300-10s200 0 300-10 200 0 200 0v80H0z" fill="#0a1a1e"/>
          <path d="M200 390c80-10 160 10 240 0" stroke="#3a6a6a" stroke-width="2" fill="none" opacity=".4"/>
          <path d="M420 450l40-70h10l30 70" fill="#1b1029" stroke="#3a2159"/>
          <path d="M440 390l20-60 20 60" fill="#0d0817" stroke="#3a2159"/>
          <circle cx="460" cy="320" r="8" fill="#fbbf24" opacity=".5"/>
        </g>
        <g>
          <path d="M620 330V240h120v90" fill="#150b24" stroke="#3a2159"/>
          <path d="M630 250h100M630 270h100" stroke="#2a1745"/>
          <path d="M620 300h-60v30h60" fill="#1b1029" stroke="#3a2159"/>
          <circle cx="580" cy="315" r="14" fill="#0a0612" stroke="#4a2a74"/>
        </g>
        <g>
          <path d="M60 260l40-60 40 60z" fill="#1b1029" stroke="#3a2159"/>
          <path d="M110 260v80M90 340h40" stroke="#3a2159" stroke-width="4"/>
        </g>
        ${fogBank(400, 360, 500, 50, .06)}
      `;
      return wrap(id, inner, '', 'Flooded quarry');
    }
  };

  function scene(kind, opts) {
    opts = opts || {};
    const id = uid('sc');
    const fn = builders[kind] || builders.street;
    let inner;
    try { inner = fn(Object.assign({}, opts, { id: id })); }
    catch (e) { console.error('scene error', kind, e); inner = builders.room({ id: id }); }
    // moon helper uses a shared glow id; inject it
    return inner.replace(/url\(#__glow\)/g, `url(#${id}glow)`);
  }

  function cover(kind, opts) { return scene(kind, opts); }

  window.Art.scene = scene;
  window.Art.cover = cover;
  window.Art.sceneKinds = Object.keys(builders);
})();
