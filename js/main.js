/* ============================================================
   Boot
   ============================================================ */
(function () {
  'use strict';
  function boot() {
    const G = window.Game;
    if (!G) { document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif;color:#fff">Engine failed to load.</p>'; return; }
    window.SH.cases.sort((a, b) => (a.num || 0) - (b.num || 0));
    G.cases = window.SH.cases;
    document.body.classList.toggle('stream-mode', !!G.save.settings.stream);
    document.body.classList.toggle('big-text', G.save.settings.text === 'large');
    window.UI.showTitle();
    // resume audio on first gesture
    document.addEventListener('pointerdown', function once() {
      document.removeEventListener('pointerdown', once);
      if (G.save.settings.sound) G.sound('click');
    }, { once: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
