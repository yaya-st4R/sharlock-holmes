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
    if (window.SH && SH.applySettings) SH.applySettings();
    document.body.classList.toggle('stream-mode', !!G.save.settings.stream);
    document.body.classList.toggle('big-text', G.save.settings.text === 'large');
    if (window.UI) UI.showTitle();
    // resume audio on first gesture (browser autoplay policy)
    document.addEventListener('pointerdown', function once() {
      document.removeEventListener('pointerdown', once);
      if (window.SH && SH.Audio) {
        SH.Audio.unlock();
        if (G.save.settings.music) SH.Audio.music(document.body.classList.contains('ws-mode') ? 'workshop' : 'title');
      }
      if (G.save.settings.sfx) G.sound('click');
    }, { once: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
