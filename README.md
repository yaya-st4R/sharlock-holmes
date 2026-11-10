# Sharlock Holmes

A 25-case detective game set in a black-and-purple noir city. Every case is a hand-built mystery: read the scene, question suspects, crack codes, repair machines, hack terminals, and name the culprit. Case 25 closes the Meridian Heritage arc that runs through the back half of the game.

## Play

- **Single file:** open [`Sharlock-Holmes.html`](Sharlock-Holmes.html) in any modern browser. No install, no server, no network needed.
- **Source version:** open [`index.html`](index.html), or serve the folder locally:

  ```sh
  python -m http.server 8000
  ```

  then visit <http://localhost:8000/>.

## What's inside

- 25 cases, all unlocked from the start
- 13 puzzle types: keypad, dial, cipher, terminal, math, logic grid, choice, sequence, hotspot, repair, photo, audio, mix
- Cartoon SVG art generated per scene, no external images
- Progress, stars, and hints saved in `localStorage` (`sharlock_holmes_save_v1`)
- Terminal puzzles accept a bare password (`stella`) as well as `unlock stella`

## Layout

```
index.html                 source entry point
Sharlock-Holmes.html       self-contained build (all CSS/JS inlined)
Sharlock-Holmes.zip        source package download
css/                       theme, case view, UI styles
js/engine.js               save state, case progression
js/caseview.js             scene rendering, hotspots, suspect rail
js/puzzles-a.js           keypad, dial, cipher, terminal, math, logic, choice
js/puzzles-b.js           sequence, hotspot, repair, photo, audio, mix
js/art-*.js                procedural SVG art
js/cases-*.js              case data, 25 cases
```

## Rebuild the single file

The single-file build is assembled by inlining `css/` and `js/` into `Sharlock-Holmes.html`. If you edit the source, regenerate it before committing.
