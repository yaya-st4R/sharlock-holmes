/* ============================================================
   CASES 02–04
   ============================================================ */
(function () {
  'use strict';
  const C = window.SH.cases;

  /* ------------------------------------------------------------
     CASE 02 — THE LIGHTHOUSE SIGNAL
     ------------------------------------------------------------ */
  C.push({
    id: 'c02', num: 2,
    title: 'The Lighthouse Signal',
    subtitle: 'A keeper vanishes, his boat comes back empty, and the lamp keeps spelling a name.',
    difficulty: 3, est: '30–40 min',
    cover: { kind: 'lighthouse', mood: 'storm' },
    facts: [
      { k: 'Victim', v: 'Elias Vane, 54 — keeper of Cape Mercy light' },
      { k: 'Scene', v: 'Cape Mercy lighthouse and the cove below' },
      { k: 'Found', v: 'His boat, empty, at first light' },
      { k: 'Weather', v: 'Fog, force 6, visibility 200 metres' }
    ],
    briefing: [
      'Cape Mercy stands on a black rock eleven miles out, and for thirty years Elias Vane has kept its lamp burning. Last night the light went dark for seventeen minutes. The coastguard log records a burst of Morse from the lamp before it failed: five letters, repeated three times, then silence.',
      'At dawn his boat drifted into the cove with the throttle open and nobody aboard. There is no body. There is no blood. There is, however, a fresh dent in the lamp-room rail and a cup of tea still warm on the watch desk.',
      'The harbourmaster says the fog was too thick for anyone to reach the rock. The keeper’s nephew says his uncle could not swim. The reporter who has been sleeping in her car at the harbour says the light has been flashing the same five letters for a week.',
      'Five letters. A dead man. A boat that came home alone. The sea keeps its secrets badly, but it does keep them.'
    ],
    opening: 'The lamp room smells of hot brass and cold coffee. Below you, the sea is a grey wall moving in slow motion. The lamp is still warm. Somewhere out in the fog, a gull screams like a woman.',
    objectives: [
      'Establish what Elias Vane was signalling before the light failed.',
      'Open the keeper’s strongbox and reconstruct the night’s tide record.',
      'Trace the boat that came alongside the rock after dark.',
      'Confront the person whose name the lamp was spelling.'
    ],
    locations: [
      {
        id: 'light', name: 'Cape Mercy Light', short: 'The light', time: '06:40',
        art: { kind: 'lighthouse', mood: 'storm' },
        intro: 'A spiral of wet iron stairs, a lamp the size of a small car, and a watch desk with two cups on it. One cup is clean. The other has a tide of cold tea and a lipstick mark on the rim.',
        actions: [
          {
            id: 'lamp', label: 'Examine the lamp room', icon: 'search', hotspot: { x: 46, y: 38 },
            desc: 'Brass, glass, and a fresh dent in the rail', gives: ['lamp-wrench'],
            text: [
              'The lens is intact. The drive mechanism is not. Someone has jammed a steel lamp-wrench into the gear housing, and the wrench is still there, wiped down but not clean. There is a dark smear in the teeth.',
              'The rail below the lamp has a fresh dent the size of a man’s shoulder. A length of rope hangs from it, cut at the end with a knife rather than untied. The rope is new. The knot is a fisherman’s hitch — the kind Elias used on his boat.',
              'On the wall beside the door, a brass plate reads: <b>CAPE MERCY LIGHT — FIRST LIT 1887.</b> Below it, four small hooks. Three hold keys. The fourth holds nothing.'
            ]
          },
          {
            id: 'log', label: 'Read the keeper’s log', icon: 'book', gives: ['morse-note'],
            desc: 'The last page is written in dashes', requires: ['lamp-wrench'],
            text: [
              'The log is ruled and tidy until the final page. The last entry is not a weather report. It is a strip of dashes and dots, written in pencil so hard that it has torn the paper: <b>·–· ··– – ···· ·–·· ·–··</b>.',
              'Underneath, in the same hard hand: <i>“If the light goes out, read the plate. Read the log. Ask who signs for the diesel.”</i>',
              'The page before is ordinary: wind, visibility, a note about a loose shutter. But the diesel page at the back has been torn out. A corner of it remains, showing the edge of a signature and the letters <b>R. P.</b>'
            ]
          },
          {
            id: 'stairs', label: 'Search the spiral stairs', icon: 'footprint', hotspot: { x: 30, y: 68 },
            desc: 'Wet prints going up — and coming down heavy', gives: ['boot-print'],
            text: [
              'The stairs are wet from the fog. Halfway up, two sets of prints overlap: the keeper’s small, narrow boots, and a larger boot with a lattice sole. The larger prints go up empty and come down with a deeper heel.',
              'On the landing there is a smear of rust-brown on the whitewash at shoulder height. It could be rust. It could be something that dried in a hurry.',
              'Tucked behind a coil of cable is a disposable lighter with a harbour-office logo. It is warm. It has been used recently.'
            ]
          },
          {
            id: 'box', label: 'Crack the keeper’s strongbox', icon: 'lock', kind: 'puzzle', puzzle: 'strongbox',
            desc: 'A brass four-digit lock, worn smooth', requires: ['morse-note'],
            hint: 'Elias wrote: read the plate. The lighthouse was first lit in a year with four digits.'
          }
        ]
      },
      {
        id: 'cottage', name: 'The keeper’s cottage', short: 'Cottage', time: '08:10',
        art: { kind: 'cabin', mood: 'storm' }, requires: ['tide-ledger'],
        intro: 'A low stone cottage built into the lee of the rock. The door was unlocked. Inside, everything is in its place except the chair by the window, which has been knocked over and not picked up.',
        actions: [
          {
            id: 'kitchen', label: 'Search the kitchen', icon: 'search',
            desc: 'Two cups. One plate. A knife missing.', gives: ['two-cups'],
            text: [
              'Two cups on the draining board, both washed. Two plates in the rack. Elias lived alone. The visitor did not stay for breakfast, but they stayed long enough to wash up.',
              'The knife block has six slots and five knives. The missing one is the small, sharp one. In the bin, under a layer of tea leaves, there is a cut length of the same new rope that hangs from the lamp rail.',
              'A calendar by the phone has one date circled: <b>THURSDAY — R.P. — 22:00.</b> The ink is Elias’s. The date is the night he vanished.'
            ]
          },
          {
            id: 'desk', label: 'Search the desk', icon: 'note', requires: ['morse-note'],
            desc: 'Tide tables, diesel receipts, an old photograph', gives: ['diesel-receipts'],
            text: [
              'The desk is a museum of a careful life. Tide tables going back nine years. A photograph of a younger Elias with a boy on his shoulders. And a folder of diesel receipts, each one signed for by the harbour office.',
              'The last six receipts are for twice the fuel the light could possibly burn. The signature on every one is <b>R. PELL</b>. Beside them, in Elias’s hand: <i>“Where does it go? Ask the launch.”</i>',
              'In the drawer, a tide ledger with three columns: time, height, and a third column marked <b>SIGNAL</b>. The last entry reads: <b>03:10 — LOW — “RUTH”</b>.'
            ]
          }
        ]
      },
      {
        id: 'harbour', name: 'Harbourmaster’s office', short: 'Harbour', time: '09:30',
        art: { kind: 'docks', mood: 'fog' }, requires: ['diesel-receipts'],
        intro: 'A portacabin that smells of diesel and instant coffee. Ruth Pell has been harbourmaster for eleven years. She does not stand up when you come in. On her desk is a model of the Cape Mercy launch, the one that runs the diesel out to the rock.',
        actions: [
          {
            id: 'ruth', label: 'Interview Ruth Pell', icon: 'user', suspect: 'ruth',
            desc: 'Harbourmaster · eleven years on the Cape', hint: 'Ruth signed for every diesel delivery to the light. Ask her about the extra fuel.'
          },
          {
            id: 'manifest', label: 'Pull the harbour manifests', icon: 'ledger',
            desc: 'Every launch movement for the last month', gives: ['manifest'],
            text: [
              'The launch log is a list of small, unremarkable trips. Except for the nights when there was no delivery scheduled and the launch still went out.',
              'Six nights. Always after midnight. Always logged as <b>“lamp maintenance — R. Pell”</b>. The return times are written in a different pen, later, as though someone filled them in from memory.',
              'On the wall, a framed chart of the cape has three pencil crosses on it, out past the shipping lane. Someone has rubbed them out and drawn them again. The crosses are not on any charted reef.'
            ]
          },
          {
            id: 'radio', label: 'Play the coastguard radio log', icon: 'audio', kind: 'puzzle', puzzle: 'radio',
            desc: 'A distress call, half drowned in static', optional: true,
            hint: 'The coastguard kept the recording. Listen to what repeats underneath the static.'
          }
        ]
      },
      {
        id: 'cove', name: 'Mercy cove', short: 'The cove', time: '11:05',
        art: { kind: 'docks', mood: 'storm' }, requires: ['manifest'],
        intro: 'The boat is tied to a ring in the rock, riding the swell. It is called <i>Maud</i>, after Elias’s mother. There is a coil of new rope in the bow and a smell in the cabin that the sea has not washed out.',
        actions: [
          {
            id: 'boat', label: 'Search the keeper’s boat', icon: 'search', hotspot: { x: 58, y: 66 },
            desc: 'Throttle open, cabin locked, rope cut', gives: ['boat-evidence'],
            text: [
              'The throttle is jammed open with a wedge of driftwood. The ignition is on. The fuel tank is almost full. Whoever set the boat adrift wanted it to run until it hit something.',
              'In the cabin, a canvas bag holds a spool of new rope, a pair of bolt cutters, and a shipping docket with the harbour-office stamp. The docket is for twenty crates of <b>“machine parts”</b>, landed six nights ago, destination blank.',
              'The cabin floor has been scrubbed, but the wood under the bunk is still dark. A single button caught in the seam is stamped with the harbour-office crest.'
            ]
          },
          {
            id: 'rocks', label: 'Search the rocks below the light', icon: 'footprint', requires: ['boat-evidence'],
            desc: 'A cut rope and a set of lattice boot prints', gives: ['rope-fiber'],
            text: [
              'The rope from the lamp rail runs down the rock face to a rusted iron ring. It was cut, not untied. At the ring, the lattice boot prints are clear in the weed, pointing back toward the harbour path.',
              'A scrap of paper is caught in the ring: a receipt for a late-night taxi, collected at the harbour at 03:40. The name on the docket is smudged, but the fare is nineteen pounds and the destination is the <b>Mercy launch berth</b>.',
              'Below the ring, in a crevice the tide has not reached, you find a brass button and a length of dark wool. Elias’s coat had brass buttons. His coat is not in the cottage.'
            ]
          },
          {
            id: 'movements', label: 'Reconstruct the night’s movements', icon: 'clock', kind: 'puzzle', puzzle: 'ships',
            desc: 'Five times, one boat, too many witnesses', optional: true,
            hint: 'The launch cannot be in two places at once. Put the sightings in the order the tide supports.'
          }
        ]
      },
      {
        id: 'coast', name: 'Coastguard station', short: 'Coastguard', time: '13:20',
        art: { kind: 'office', mood: 'storm' }, requires: ['boat-evidence'],
        intro: 'A white room full of screens, each showing a different shade of grey. A young officer is logging the morning’s search. On the wall, a printed transcript of the lamp’s last signal is pinned with a red magnet.',
        actions: [
          {
            id: 'mara', label: 'Question Mara Quinn', icon: 'user', suspect: 'mara',
            desc: 'Reporter · has been sleeping in her car', hint: 'Mara has been watching the light for a week. Ask what she saw.'
          },
          {
            id: 'signal', label: 'Decode the lamp’s last signal', icon: 'cipher', kind: 'puzzle', puzzle: 'morse-log',
            desc: 'Five letters, repeated three times', requires: ['radio-log'],
            hint: 'The dashes are a simple shift away from words. Turn the wheel until the name appears.'
          },
          {
            id: 'transcript', label: 'Read the coastguard transcript', icon: 'note',
            desc: 'What the officer wrote down at 03:14', requires: ['radio-log'], gives: ['radio-transcript'],
            text: [
              'The transcript reads: <b>“Unidentified launch alongside light. Two voices. One raised. Signal from lamp: five letters, repeating. No distress procedure followed. Light extinguished 03:14.”</b>',
              'The officer on duty taps the glass. “We called the harbour. Ruth Pell answered. She said it was a routine maintenance run and she would handle it. She did not send anyone.”',
              '“The launch went back in at 03:50. We saw it on the harbour camera. It was riding low. There was something heavy in the stern.”'
            ]
          }
        ]
      }
    ],
    puzzles: {
      strongbox: {
        type: 'keypad', title: 'The Keeper’s Strongbox', subtitle: 'A four-digit brass lock', icon: 'lock',
        deviceLabel: 'VANE STRONGBOX', length: 4, code: '1887',
        prompt: 'A heavy brass box under the watch desk. The lock is worn smooth by a thumb. Elias left you a hint, if you read it properly.',
        hintText: '“Read the plate.” The brass plate in the lamp room gives the year the light was first lit: 1887.',
        success: 'The lock opens. Inside: a tide ledger, a bundle of diesel receipts, and a photograph of a boy on Elias’s shoulders.',
        successTitle: 'The box opens.',
        gives: ['tide-ledger'], flags: ['boxOpen'],
        short: 'The keeper’s tide ledger is open.',
        log: 'The strongbox holds a tide ledger. The final entry reads: “03:10 — LOW — RUTH”.'
      },
      radio: {
        type: 'audio', title: 'The Coastguard Recording', subtitle: '03:12 · channel 16', icon: 'audio',
        prompt: 'A distress call half drowned in static. The coastguard kept the tape because the voice on it did not sound like a man asking for help. It sounded like a man naming someone.',
        pattern: [520, 520, 520, 0, 380, 380, 0, 300, 300],
        tempo: 0.3,
        waveform: 'Three even tones, a pause, two lower tones, a pause, two falling tones. A name repeated in a flat, deliberate rhythm.',
        options: [
          { t: 'A foghorn automated by the tide', v: 'fog' },
          { t: 'Elias Vane repeating a name over the radio', v: 'elias' },
          { t: 'An engine misfiring on the launch', v: 'engine' },
          { t: 'A gull trapped in the lamp room', v: 'gull' }
        ],
        answer: 'elias',
        wrong: 'Listen to the rhythm. Fog and engines do not pause to breathe. That is a man spacing out a name.',
        hintText: 'The tones are grouped like syllables. The last two drop away, as if he is running out of air.',
        success: 'Under the static, the voice resolves: <i>“Ruth Pell. Ruth Pell. Launch alongside. Ruth—”</i> Then the tape runs out.',
        successTitle: 'A name, over and over.',
        gives: ['radio-log'],
        short: 'Elias named Ruth Pell on the radio.',
        log: 'The coastguard tape captures Elias repeating “Ruth Pell” and “launch alongside” before the signal dies.'
      },
      'morse-log': {
        type: 'cipher', title: 'Five Letters in the Lamp', subtitle: 'A shift cipher in the keeper’s log', icon: 'cipher',
        plain: 'RUTH PELL', shift: 6, answer: ['ruth pell', 'ruthpell'],
        prompt: 'The last page of the log is written in dashes and dots. The coastguard transcribed them as letters. Read the letters, then turn the wheel.',
        note: 'The keeper was not a spy. He used the simplest cipher he knew: move every letter back by six.',
        hintText: 'The first word has four letters. The second has four. A name, and a surname.',
        success: 'The letters resolve into a name: <b>RUTH PELL</b>. The lamp was not signalling the coastguard. It was naming the person who came alongside.',
        successTitle: 'The lamp spelled a name.',
        gives: ['morse-decoded'], flags: ['knowsRuth'],
        short: 'The lamp spelled RUTH PELL.',
        log: 'The lamp’s final message decodes to RUTH PELL — the harbourmaster who signed for every delivery to the light.'
      },
      ships: {
        type: 'sequence', title: 'Too Many Sightings', subtitle: 'One launch, one night', icon: 'clock',
        prompt: 'Five sightings of the harbour launch. Put them in the only order the tide and the radio log allow.',
        items: [
          { t: '22:00 — launch leaves harbour', sub: 'Ruth signs the night log', order: 0 },
          { t: '23:40 — launch passes the outer buoy', sub: 'seen by a fishing boat', order: 1 },
          { t: '03:10 — lamp signal begins', sub: 'RUTH, repeated', order: 2 },
          { t: '03:14 — light goes out', sub: 'coastguard log', order: 3 },
          { t: '03:50 — launch returns, riding low', sub: 'harbour camera', order: 4 }
        ],
        hintText: 'The launch left before midnight and came back after the light failed. Everything else fits between.',
        success: 'One launch. One night. It left at ten and came back low in the water after the lamp went dark. Nothing about that is maintenance.',
        wrong: 'That order puts the launch at sea before it left. Start with the signed departure and end with the low return.',
        gives: ['movement-log'],
        short: 'The launch’s night is reconstructed.',
        log: 'The launch left at 22:00, was off the cape by 23:40, and returned at 03:50 riding low — after the light failed.'
      }
    },
    suspects: [
      {
        id: 'ruth', name: 'Ruth Pell', role: 'Harbourmaster · signed for every delivery', location: 'harbour', locationName: 'Harbour office', tag: 'Prime suspect',
        portrait: { seed: 'ruth-pell', hair: 'bun', hairColor: '#4a3b33', skin: 2, expression: 'wary', collar: 'coat', eyes: '#2b1a12' },
        intro: 'Ruth Pell is fifty-one, broad through the shoulders, with the calm of someone who has been the only authority on a small coast for a long time. She does not offer you tea. There is a fresh scrape on her knuckles.',
        questions: [
          {
            q: 'Where were you between two and four this morning?', gives: ['ruth-alibi'],
            a: '“Here. Doing the accounts.” She gestures at a desk with no papers on it. “The launch was on a maintenance run. I signed it out myself. I was back in bed by four.”',
            follow: 'The harbour camera shows the office light going off at 23:30 and not coming back on until 04:20.'
          },
          {
            q: 'Why did the light take twice the diesel it needs?', requires: ['diesel-receipts'],
            a: '“Lighthouses are inefficient. Ask anyone.” She holds your eye. “If you are suggesting I was running something out to that rock, I want to know what you think it was.”',
            gives: ['ruth-argument'], flags: ['ruthHostile'],
            follow: 'She does not ask what you found on the boat. She already knows.'
          },
          {
            q: 'The lamp was spelling your name, Ruth.', requires: ['morse-decoded'], present: true,
            a: 'For a moment her face does something complicated. Then she smiles. “Elias was confused. He was old. He wrote my name in the log a hundred times — I sign for the fuel.”<br><br>“If he was signalling anything, it was a cry for help. And I was not there to hear it. That is the tragedy.”',
            gives: ['ruth-denial'], flags: ['ruthBroke']
          },
          {
            q: 'What was in the crates you landed six nights ago?', requires: ['manifest'],
            a: '“Machine parts.” A beat. “For the winch.”<br><br>You tell her the docket was blank and the harbour camera shows the launch low in the water. She looks at the model of the launch on her desk, and then out of the window at the real one.<br><br>“Elias should have left it alone,” she says quietly. “It was only ever money. He had to make it a principle.”',
            gives: ['ruth-admission']
          }
        ],
        after: 'She gives you the name of a solicitor before you have asked. She has been ready for this conversation for a long time.'
      },
      {
        id: 'cal', name: 'Cal Vane', role: 'Elias’s nephew · deckhand', location: 'cove', locationName: 'Mercy cove', tag: 'Witness',
        portrait: { seed: 'cal-vane', hair: 'wavy', hairColor: '#6b4a2b', skin: 1, expression: 'worried', collar: 'fisher', eyes: '#3a5a40', beard: 'stubble' },
        intro: 'Cal is twenty-six and has been crying in a way that looks practised. He keeps looking at the boat. He is wearing one boot. The other is in his hand, and the sole is smooth, not latticed.',
        questions: [
          {
            q: 'When did you last see your uncle?', gives: ['cal-debt'],
            a: '“Sunday. He lent me forty pounds. He was in a mood — said he was going to make things right, whatever it cost.” He turns the boot over. “He asked me to stay away from the harbour for a few days. I thought he was embarrassed about the money.”',
            follow: 'He does not mention the bruise on his forearm, or the fact that his other boots are in the boat.'
          },
          {
            q: 'Who else used the launch?', requires: ['manifest'],
            a: '“Ruth. Only Ruth. She signs it out.” He stops. “But she never takes it out at night. Not unless there is a delivery. Everyone knows that.”<br><br>He looks at you. “My uncle hated her. He said she was turning the light into a shop.”',
            gives: ['cal-statement']
          },
          {
            q: 'Your boots were on the boat, Cal.', requires: ['rope-fiber'], present: true,
            a: '“I go out there all the time.” His voice rises. “He was my uncle. I was on that boat yesterday afternoon. That does not mean I was on it last night.”<br><br>He puts the boot down. “She asked me to keep my mouth shut. She said if I did, she would cover the mortgage on the cottage. I have a kid.”',
            gives: ['cal-pressure'], flags: ['calBroke']
          }
        ],
        after: 'He is not a killer. He is a man who has been paid to be confused, and he is not very good at it.'
      },
      {
        id: 'mara', name: 'Mara Quinn', role: 'Reporter · sleeps in her car', location: 'coast', locationName: 'Coastguard station', tag: 'Witness / press',
        portrait: { seed: 'mara-quinn', hair: 'ponytail', hairColor: '#1b1b1b', skin: 3, expression: 'sharp', collar: 'jacket', eyes: '#4a1f5f' },
        intro: 'Mara has been on the cape for nine days. Her notebook is full of tide times and one repeated phrase: “the light lies.” She does not ask you for a quote. She asks you what you have found.',
        questions: [
          {
            q: 'Why were you watching the lighthouse?', gives: ['reporter-note'],
            a: '“Because the light has been wrong for a month. It flashes the same five letters every night at three. I checked the almanac. It is not a navigation code.”<br><br>She tears a page out and gives it to you. The letters are written in her careful hand: <b>RUTH.</b>',
            follow: '“I tried to tell the harbour office. Ruth Pell laughed at me and said I should get a hobby.”'
          },
          {
            q: 'What did you see on the water last night?', requires: ['radio-log'],
            a: '“A launch. No lights. It came in from the west, not the harbour. It stayed alongside the rock for maybe twenty minutes.” She taps her notebook. “I heard two voices. One was Elias. One was a woman.”<br><br>“Then the light went out, and the launch went back east. It was lower in the water when it came back. I wrote that down because it mattered. I did not know it would matter like this.”',
            gives: ['mara-witness'], flags: ['knowsRuth']
          }
        ],
        after: 'She files her story before you leave the car park. By morning, the whole coast will know the light was spelling a name.'
      }
    ],
    clues: {
      'lamp-wrench': {
        name: 'The lamp wrench', caption: 'Gear housing · dark smear', icon: 'tool', type: 'Weapon',
        desc: 'A steel wrench jammed into the lamp’s drive gear. Wiped, not cleaned. A dark smear in the teeth and a fresh dent in the rail.',
        tells: 'The lamp did not fail. It was stopped — by someone strong enough to reach the gear housing and calm enough to wipe the tool.'
      },
      'morse-note': {
        name: 'The keeper’s last log', caption: 'Five letters, torn paper', icon: 'note', type: 'Written evidence',
        desc: 'The final log entry is dashes and dots, pressed hard enough to tear the page: “If the light goes out, read the plate. Read the log. Ask who signs for the diesel.”',
        tells: 'Elias knew something was coming. He left instructions in the one place a searcher would look.'
      },
      'boot-print': {
        name: 'Lattice boot print', caption: 'Stairs · rust-brown smear', icon: 'footprint', type: 'Forensic evidence',
        desc: 'A large boot with a lattice sole went up the stairs empty and came down with a deeper heel. A harbour-office lighter lies behind the cable coil.',
        tells: 'Elias had a visitor who works at the harbour. The visitor carried something heavy on the way down.'
      },
      'tide-ledger': {
        name: 'The tide ledger', caption: 'Strongbox · last entry 03:10', icon: 'ledger', type: 'Records',
        desc: 'Nine years of tides in three columns. The final entry: “03:10 — LOW — RUTH.” Two pages have been torn out.',
        tells: 'Elias recorded the signal before it happened. He knew the name he was going to spell.'
      },
      'two-cups': {
        name: 'Two washed cups', caption: 'Cottage kitchen · one knife missing', icon: 'glass', type: 'Trace evidence',
        desc: 'Two cups washed and left to dry. Two plates. A knife missing from the block. A cut length of new rope in the bin.',
        tells: 'The visitor was comfortable enough to wash up. This was not a stranger in the night; it was someone Elias expected.'
      },
      'diesel-receipts': {
        name: 'The diesel receipts', caption: 'Six deliveries · double the fuel', icon: 'receipt', type: 'Records',
        desc: 'Every delivery to the light signed for by R. Pell. Six recent runs carried twice the fuel the lamp could burn.',
        tells: 'The lighthouse was being used as a waypoint. Ruth Pell was moving something out to the cape under cover of maintenance.'
      },
      'manifest': {
        name: 'The launch log', caption: 'Six unscheduled night runs', icon: 'ledger', type: 'Records',
        desc: 'Six nighttime launch movements logged as “lamp maintenance — R. Pell”. Return times added later, in a different pen. Three pencil crosses beyond the shipping lane.',
        tells: 'Ruth had a route. The crosses are where the crates went — or where they came from.'
      },
      'boat-evidence': {
        name: 'The Maud', caption: 'Throttle wedged open · cabin scrubbed', icon: 'car', type: 'Physical evidence',
        desc: 'Elias’s boat, set adrift with the throttle jammed. A shipping docket for twenty crates of “machine parts”, a harbour-office button, and a scrubbed cabin floor.',
        tells: 'The boat was meant to run until it sank. Someone wanted a drowning, not a disappearance.'
      },
      'rope-fiber': {
        name: 'The cut rope', caption: 'Lamp rail to iron ring', icon: 'rope', type: 'Physical evidence',
        desc: 'New rope from the lamp rail to the cove ring, cut with a knife. Lattice boot prints point back to the harbour path. A taxi docket from 03:40.',
        tells: 'The route from the lamp to the boat is physical and recent. The killer walked back to the harbour in the same boots.'
      },
      'radio-log': {
        name: 'Coastguard channel 16', caption: '03:12 · a name, repeated', icon: 'audio', type: 'Audio evidence',
        desc: 'Under the static, Elias Vane repeats “Ruth Pell” and “launch alongside” before the signal dies.',
        tells: 'Elias’s last act was not a cry for help. It was a statement of who came alongside.'
      },
      'morse-decoded': {
        name: 'RUTH PELL', caption: 'The lamp’s five letters', icon: 'cipher', type: 'Coded evidence',
        desc: 'The lamp’s final message decodes to the harbourmaster’s name. The signal ran for three minutes before the light was extinguished.',
        tells: 'The lamp was naming the killer while she was still on the rock. Ruth had to stop the light to stop the message.'
      },
      'radio-transcript': {
        name: 'The 03:14 transcript', caption: 'Two voices · one raised', icon: 'note', type: 'Records',
        desc: '“Unidentified launch alongside light. Two voices. One raised. Lamp signal five letters. Light extinguished 03:14.” The harbour said it would handle it.',
        tells: 'Ruth took the call and sent no one. She was not responding to an emergency; she was closing one.'
      },
      'movement-log': {
        name: 'One launch, one night', caption: '22:00 → 03:50', icon: 'clock', type: 'Timeline',
        desc: 'The launch left at ten, was off the cape before midnight, and returned at 03:50 riding low — ten minutes after the light died.',
        tells: 'There is no maintenance run that fits this pattern. There is only a delivery and a cleanup.'
      },
      'ruth-alibi': {
        name: 'Ruth’s alibi', caption: '“Doing the accounts”', icon: 'note', type: 'Alibi',
        desc: 'Ruth claims she was in the office until four. The harbour camera shows the office dark from 23:30 to 04:20.',
        tells: 'The alibi is not merely weak. It is contradicted by her own building.'
      },
      'ruth-argument': {
        name: 'The maintenance excuse', caption: '“Lighthouses are inefficient”', icon: 'note', type: 'Interview',
        desc: 'Ruth dismisses the doubled diesel as inefficiency and refuses to speculate about the crates.',
        tells: 'She is not curious about what was on the boat. That is the reaction of someone who already knows.'
      },
      'ruth-denial': {
        name: '“He was confused”', caption: 'Ruth on the lamp signal', icon: 'note', type: 'Interview',
        desc: 'Ruth says Elias was old and confused, and that seeing her name in the log is meaningless because she signs for the fuel.',
        tells: 'She has an answer for the name, but not for why he would spell it into the dark for three minutes.'
      },
      'ruth-admission': {
        name: '“Only ever money”', caption: 'Ruth Pell · harbour office', icon: 'audio', type: 'Statement',
        desc: 'Ruth admits Elias “should have left it alone” and calls the smuggling “only ever money” before asking for her solicitor.',
        tells: 'She has admitted knowledge of a crime and a motive for silence. What she has not admitted is the wrench.'
      },
      'cal-debt': {
        name: 'Cal’s debt', caption: 'Forty pounds and a warning', icon: 'note', type: 'Witness statement',
        desc: 'Elias lent Cal money and told him to stay away from the harbour. Cal’s other boots are on the boat; the pair he is wearing has smooth soles.',
        tells: 'Cal was warned to stay clear. He is hiding something, but his boots do not match the prints on the stairs.'
      },
      'cal-statement': {
        name: '“Only Ruth”', caption: 'Cal on the launch', icon: 'note', type: 'Witness statement',
        desc: 'Cal says only Ruth takes the launch out, and that Elias believed she was “turning the light into a shop”.',
        tells: 'Confirms the smuggling route without knowing what was being moved.'
      },
      'cal-pressure': {
        name: 'The mortgage offer', caption: 'Ruth paid Cal to stay quiet', icon: 'money', type: 'Witness statement',
        desc: 'Ruth offered to cover Cal’s mortgage if he kept his mouth shut about the night runs. He took the offer and immediately spent some of it.',
        tells: 'Ruth was buying silence before the murder — which means she knew the runs were dangerous to her.'
      },
      'reporter-note': {
        name: 'Mara’s notebook', caption: '“The light lies”', icon: 'note', type: 'Witness evidence',
        desc: 'Nine days of tide times and one repeated observation: the light flashes RUTH at three in the morning. The harbour office laughed at her.',
        tells: 'The signal was not a one-night distress call. Elias had been building a case in public for a week.'
      },
      'mara-witness': {
        name: 'The launch with no lights', caption: 'Mara Quinn · 03:00', icon: 'eye', type: 'Witness statement',
        desc: 'Mara saw an unlit launch come in from the west, stay alongside the rock for twenty minutes, and leave lower in the water. She heard a man and a woman.',
        tells: 'An independent witness places a woman on the rock with Elias in the last minutes of his life.'
      }
    },
    solution: {
      minEvidence: 9,
      questions: [
        {
          q: 'Who killed Elias Vane?',
          options: [
            { t: 'Cal Vane — his nephew, who owed him money', v: 'cal' },
            { t: 'Ruth Pell — the harbourmaster', v: 'ruth' },
            { t: 'Mara Quinn — the reporter watching the light', v: 'mara' },
            { t: 'Elias took his own life rather than face the investigation', v: 'suicide' }
          ],
          answer: 'ruth'
        },
        {
          q: 'How did Elias die?',
          options: [
            { t: 'He fell from the lamp rail while repairing the light', v: 'fall' },
            { t: 'He was struck in the lamp room, then put in his boat and set adrift', v: 'struck' },
            { t: 'He drowned in the cove while trying to reach the launch', v: 'drown' },
            { t: 'He was poisoned in the cottage and his body taken out to sea', v: 'poison' }
          ],
          answer: 'struck'
        },
        {
          q: 'What was Ruth protecting?',
          options: [
            { t: 'A smuggling route run through the lighthouse', v: 'smuggle' },
            { t: 'An affair with Elias that she wanted kept quiet', v: 'affair' },
            { t: 'A forged will leaving her the cape', v: 'will' },
            { t: 'A drug habit she had been hiding for years', v: 'drugs' }
          ],
          answer: 'smuggle'
        },
        {
          q: 'Which evidence breaks the case?',
          options: [
            { t: 'The dent in the lamp-room rail and the wiped wrench', v: 'wrench' },
            { t: 'The lamp’s final signal decoded to RUTH PELL', v: 'morse' },
            { t: 'The two washed cups in the keeper’s cottage', v: 'cups' },
            { t: 'Cal’s missing boots and his forty-pound debt', v: 'boots' }
          ],
          answer: 'morse'
        }
      ],
      verdict: {
        who: 'Ruth Pell, 51 — harbourmaster of Cape Mercy',
        whoDesc: 'was arrested on the quay with a cut length of new rope in her launch locker.',
        how: 'She came to the light on the maintenance launch, struck Elias Vane in the lamp room with his own lamp wrench, and lowered him into his boat. Then she set the boat adrift with the throttle open and cut the rope. The sea was meant to do the rest.',
        why: 'Elias had worked out that the six unscheduled night runs were not maintenance. He started signalling her name from the lamp. Ruth needed the light — and the man who kept it — to go out.',
        key: 'The lamp itself. Elias pressed his last message into the log and flashed RUTH PELL into the fog for three minutes. Ruth had to climb the tower to stop the light, and in doing so left the wrench, the rope, and her name in the one place the whole coast could see.'
      },
      reveal: [
        'Cape Mercy is not a place where things happen quietly. It is a black rock with a light on it, and every ship for eleven miles watches that light. Ruth Pell had been using the six dark hours of the tide to run crates out past the shipping lane, logging every trip as “lamp maintenance” in her own hand.',
        'Elias Vane had been watching her for a month. He was not a policeman and he had no evidence a court would take, so he did the only thing a lighthouse keeper can do: he turned the lamp into a witness. Every night at three, he flashed the same five letters across the water. RUTH. RUTH. RUTH.',
        'On Thursday night he telephoned her and asked her to come out to the rock. He said he wanted to settle it privately. She came on the maintenance launch at ten, and at three in the morning the light began to spell her name again. She followed the sound up the spiral stairs with a lamp wrench in her coat.',
        'The first blow dented the rail. Elias went down. Ruth stopped the gear, wiped the wrench, and used the new rope to lower him into his own boat. The plan was simple: a man alone on a rock, a boat found empty, a sea that never gives anything back. What she had not counted on was the coastguard tape, the reporter in the car park, or the fact that Elias had already written her name in the log.',
        'The boat came back without him because she set it adrift. The light stayed dark for seventeen minutes because she could not turn it off any other way. The dent in the rail is the shape of a man’s shoulder hitting iron, and the smear in the wrench is the only blood on the cape that the sea did not get.',
        'Ruth Pell told the coastguard she would handle it. She was right. She handled it with a wrench, a rope, and a launch running low in the stern.'
      ],
      quote: 'The light does not lie. The woman who kept it did.',
      twist: 'Elias was not trying to reach the coastguard. He knew the coastguard answered to the harbour, and the harbour answered to Ruth. He was signalling the one audience she could not buy: every boat on the water, and the reporter parked at the harbour with a notebook.'
    }
  });

  /* ------------------------------------------------------------
     CASE 03 — THE LAST TRAIN
     ------------------------------------------------------------ */
  C.push({
    id: 'c03', num: 3,
    title: 'The Last Train',
    subtitle: 'A businessman dies in a locked sleeper, and every station says he was still alive when the train left it.',
    difficulty: 3, est: '30–40 min',
    cover: { kind: 'train', mood: 'night' },
    facts: [
      { k: 'Victim', v: 'Harold Finch, 58 — financier' },
      { k: 'Scene', v: 'Sleeper 4, the 23:40 to Edinburgh' },
      { k: 'Found', v: '05:55 — by the attendant, door locked' },
      { k: 'Cause', v: 'Suspected cyanide in a nightcap' }
    ],
    briefing: [
      'The 23:40 sleeper leaves Euston with nine passengers and arrives in Edinburgh with eight. Harold Finch, a financier with a talent for making money out of other people’s disasters, is found in Sleeper 4 at dawn with his throat closed and his brandy glass empty.',
      'The door was locked from the inside. The window was sealed. The sleeper car’s corridor camera shows nobody entering after midnight. The attendant swears he heard Finch snoring at three.',
      'The train stopped four times. At each stop, the platform staff say the same thing: the man in Sleeper 4 was alive when the train pulled out. By Edinburgh, he had been dead for three hours.',
      'Four stops. One locked door. A glass with no fingerprints on it at all. The train did not kill Harold Finch. Someone on it did — and then made sure the timetable took the blame.'
    ],
    opening: 'Sleeper 4 is a narrow green box that smells of upholstery and orange peel. Harold Finch is still in the lower bunk, one hand under the pillow, his face turned to the wall. The train is moving again. Somewhere behind you, a door clicks shut.',
    objectives: [
      'Establish the real time of death against the train’s timetable.',
      'Open Finch’s briefcase and recover his personal ledger.',
      'Access his laptop and identify the person he was meeting.',
      'Prove which passenger could have entered a locked compartment.'
    ],
    locations: [
      {
        id: 'sleeper', name: 'Sleeper 4', short: 'Sleeper', time: '06:05',
        art: { kind: 'train', mood: 'night' },
        intro: 'A first-class compartment with pretensions: a fold-down basin, a curtain the colour of old wine, and a bunk that is too short for the man in it. The air is cold and faintly bitter, like almonds left in a drawer.',
        actions: [
          {
            id: 'body', label: 'Examine the body', icon: 'blood', hotspot: { x: 44, y: 58 },
            desc: 'Bitter smell, empty glass, locked door', gives: ['autopsy-note'],
            text: [
              'Finch’s lips are faintly blue. The smell is unmistakable once you name it: bitter almonds. Cyanide. There is no wound, no struggle, no sign that he tried to sit up. He drank it and died in his sleep within minutes.',
              'The brandy glass is on the fold-down table, empty and wiped clean of every print. The bottle beside it is half full and prints nothing either. A man who drinks alone leaves prints. Someone polished the glass after he was dead.',
              'The compartment door was locked from the inside. The window is painted shut and the emergency exit is still sealed. On the floor, half under the bunk, is a white paper doily, the kind served under a glass in a hotel bar.'
            ]
          },
          {
            id: 'ticket', label: 'Search the pockets', icon: 'ticket',
            desc: 'A ticket, a dining-car stub, a brass key', gives: ['ticket-stub'],
            text: [
              'A first-class ticket, punched at Euston. A dining-car stub for a glass of whisky at 22:50. A brass key stamped 4. And a folded page torn from a notebook, on which someone has written in pencil: <b>“CREWE — 12 MINUTES. MAKE IT LOOK LIKE INVERNESS.”</b>',
              'The writing is not Finch’s. His signature on the ticket is broad and slanted; this is small and tight, the hand of someone used to fitting words into narrow spaces.',
              'In the ticket pocket, a photograph: Finch on a yacht, raising a glass with a woman whose face has been carefully cut out.'
            ]
          },
          {
            id: 'case', label: 'Examine the briefcase', icon: 'lockbox',
            desc: 'A three-dial lock and a lot of paper', gives: ['briefcase'],
            text: [
              'A black leather briefcase, handcuffed to the bunk rail, with a three-dial combination lock. The case is heavier than paperwork should be. Something inside shifts when you lift it.',
              'On the underside, scratched into the leather: <b>“H.F. — C. — 07 23 40.”</b> The numbers could be a date, a combination, or a train time. Knowing Finch, probably all three.'
            ]
          },
          {
            id: 'safe', label: 'Open the briefcase lock', icon: 'lock', kind: 'puzzle', puzzle: 'briefcase-pin',
            desc: 'Three dials, no keyhole', requires: ['briefcase'],
            hint: 'The scratch on the leather reads 07 23 40. Three dials, two digits each.'
          }
        ]
      },
      {
        id: 'dining', name: 'Dining car', short: 'Dining car', time: '07:10',
        art: { kind: 'train', mood: 'diner' }, requires: ['ticket-stub'],
        intro: 'The dining car smells of bacon and burnt coffee. The tables have been reset for breakfast, but the bar still holds the evidence of last night: one glass on the counter, one bottle of brandy, and a waiter who has not slept.',
        actions: [
          {
            id: 'waiter', label: 'Interview the dining-car waiter', icon: 'user',
            desc: 'He served Finch at 22:50', gives: ['dining-receipt'],
            text: [
              '“Mr Finch had one whisky at ten to eleven. He was meeting someone. A woman — dark coat, big scarf. She came in after him and left before him.” The waiter wipes the same spot on the counter three times. “She paid cash. No name.”',
              'He checks the till roll. The receipt is timestamped <b>22:51</b>. The next item on the roll is a glass of brandy, charged to Sleeper 4, at <b>23:12</b>. But the bar closed at eleven.',
              '“That second one wasn’t me,” he says. “I was in the kitchen. When I came back, the bottle had moved.”'
            ]
          },
          {
            id: 'receipt', label: 'Check the till and the seating plan', icon: 'ledger', requires: ['dining-receipt'],
            desc: 'Who sat where before the train left', gives: ['dining-plan'],
            text: [
              'The seating plan for the 23:40 is a small work of fiction. Every table is booked under a company name. Table 6 — beside the bar — is booked to “H. Finch”. Table 7 is booked to “C. Finch”.',
              'Celia Finch is the victim’s wife. She boarded at Euston and took a seat two feet from her husband. The waiter remembers her because she sent back her coffee and did not touch her food.',
              'At the bottom of the plan, in the guard’s hand: <b>“Mrs Finch requested the adjoining compartment. Moved to Sleeper 5.”</b>'
            ]
          },
          {
            id: 'glass', label: 'Send the brandy bottle for analysis', icon: 'flask',
            desc: 'The bottle that moved by itself', requires: ['dining-receipt'], gives: ['bottle-test'],
            text: [
              'The bottle is clean, but the sediment in the bottom is not. The lab calls back within the hour: potassium cyanide, dissolved in brandy, enough in one measure to stop a heart in under a minute.',
              'The bottle neck has been wiped, but the cork has not. Trapped under the rim is a tiny trace of face powder — pale, expensive, and scented with lily of the valley.',
              'The glass from Sleeper 4 carries the same powder on the outside. Whoever poured the drink held it by the base and wiped it afterwards.'
            ]
          }
        ]
      },
      {
        id: 'office', name: 'Finch’s office', short: 'Office', time: '09:25',
        art: { kind: 'office' }, requires: ['dining-plan'],
        intro: 'A glass box above the city with a desk the size of a bed and a view of everything Finch owned. His assistant lets you in and then leaves very quickly. The computer is still logged on.',
        actions: [
          {
            id: 'desk', label: 'Search the desk', icon: 'search',
            desc: 'Ledger, divorce papers, a single ticket', gives: ['ledger'],
            text: [
              'The desk drawers are locked, but the assistant has the key and no loyalty left. Inside: a private ledger in Finch’s slanted hand, a set of divorce papers dated last week, and a train ticket for the 23:40 — purchased in Celia Finch’s name.',
              'The ledger shows a series of transfers to an account in the Cayman Islands. The latest entry is circled in red: <b>“C.F. — 2.4M — IF SHE SIGNS.”</b>',
              'Under the ledger, a note in the same small, tight hand you saw on the train: <i>“Harold. The Will is changed. You will not make a fool of me twice.”</i>'
            ]
          },
          {
            id: 'laptop', label: 'Access Finch’s laptop', icon: 'terminal', kind: 'puzzle', puzzle: 'finch-pc',
            desc: 'Encrypted files and an unsent email', requires: ['ledger'],
            hint: 'Finch wrote “CREWE — 12 MINUTES. MAKE IT LOOK LIKE INVERNESS.” His passwords are destinations, not names.'
          },
          {
            id: 'assistant', label: 'Question the assistant', icon: 'user',
            desc: 'She knows about the divorce', requires: ['ledger'], gives: ['assistant-statement'],
            text: [
              '“He changed the will on Tuesday. Everything to his brother, nothing to her unless she signed the divorce. She came here on Monday and they shouted at each other for an hour.”',
              'She looks at the closed door. “On Wednesday he told me he was taking the night train. He said he wanted to give her one last chance to sign. He was almost looking forward to it.”',
              '“He also said something odd. He said, ‘If I am asleep when we pass Crewe, wake me.’ I thought he was joking.”'
            ]
          }
        ]
      },
      {
        id: 'station', name: 'Euston station', short: 'Station', time: '11:40',
        art: { kind: 'train', mood: 'station' }, requires: ['ledger'],
        intro: 'The station at midday is all announcements and pigeons. The guard who worked the 23:40 is on a break, sitting on a plastic chair with his cap in his hands. The platform camera footage is in a small room behind the ticket office.',
        actions: [
          {
            id: 'guard', label: 'Interview the guard', icon: 'user',
            desc: 'He checked the sleeper at Crewe', gives: ['guard-statement'],
            text: [
              '“At Crewe I walked the sleeper car. Twelve minutes on the platform. I checked every door. Sleeper 4 was locked, and I heard Mr Finch snoring. I would swear to it.”',
              'He rubs his eyes. “But here’s the thing. The snoring had a rhythm. Too regular. Like a recording. I thought he was a heavy sleeper, so I left it.”',
              '“Mrs Finch was in Sleeper 5. She asked me for a spare blanket. She was wide awake. She had her coat on.”'
            ]
          },
          {
            id: 'platform', label: 'Enhance the platform camera still', icon: 'camera', kind: 'puzzle', puzzle: 'crewe-photo',
            desc: 'A figure at the sleeper door at Crewe', requires: ['guard-statement'],
            hint: 'The camera caught the sleeper corridor at Crewe. Slide the enhancement until the reflection sharpens.'
          },
          {
            id: 'records', label: 'Pull the ticketing records', icon: 'ledger',
            desc: 'Two tickets bought with one card', requires: ['guard-statement'], gives: ['ticket-record'],
            text: [
              'Two first-class sleeper tickets were bought with Harold Finch’s own credit card on Monday afternoon. Sleeper 4, and the adjoining Sleeper 5.',
              'The card also paid for a single taxi from the Finch house to Euston at 22:20. The taxi company confirms one passenger: a woman in a dark coat with a large scarf.',
              'The carriage camera shows her boarding with a small overnight bag. It shows her leaving the train at Edinburgh with the same bag, which is now noticeably heavier.'
            ]
          }
        ]
      },
      {
        id: 'luggage', name: 'Luggage van', short: 'Luggage van', time: '13:15',
        art: { kind: 'train', mood: 'storage' }, requires: ['ticket-record'],
        intro: 'A steel cave on wheels, full of suitcases with labels to places their owners never reached. The guard’s van is warm and smells of oil. In the corner, a black overnight bag sits apart from the rest.',
        actions: [
          {
            id: 'bag', label: 'Search the black overnight bag', icon: 'search', hotspot: { x: 62, y: 60 },
            desc: 'An unclaimed bag with a familiar scent', gives: ['vial-case'],
            text: [
              'The bag is unlocked. Inside: a silk scarf, a makeup case, a pair of gloves, and a small leather pouch containing a glass vial and a folded paper funnel.',
              'The vial is half full of white powder. The funnel is the kind used to pour liquid into a narrow bottle neck without spilling. The gloves are pale kid, expensive, and smell of lily of the valley.',
              'Tucked into the lining is a printed email. It is from Harold Finch to his solicitor, dated Tuesday: <b>“She will not sign. Proceed with the divorce and the transfer. I am done being blackmailed.”</b>'
            ]
          },
          {
            id: 'manifest', label: 'Check the luggage manifest', icon: 'note',
            desc: 'Who checked a bag and who did not', requires: ['vial-case'], gives: ['luggage-manifest'],
            text: [
              'The manifest lists every item loaded at Euston. Sleeper 4: one briefcase, handcuffed. Sleeper 5: one black overnight bag, checked through to Edinburgh.',
              'The bag in the corner is not on the manifest. It was carried aboard by hand and left in the van somewhere between Crewe and Inverness, when the train slowed for the points.',
              'The label loop is still attached: <b>C. FINCH — SLEEPER 5.</b>'
            ]
          },
          {
            id: 'stops', label: 'Reconstruct the night’s stops', icon: 'clock', kind: 'puzzle', puzzle: 'night-stops',
            desc: 'Crewe, Inverness, and a twelve-minute window', optional: true,
            hint: 'The note in Finch’s pocket says Crewe — 12 minutes. Build the night around that window.'
          }
        ]
      }
    ],
    puzzles: {
      'briefcase-pin': {
        type: 'dial', title: 'Finch’s Briefcase', subtitle: 'Three dials, six digits', icon: 'lockbox',
        code: [7, 23, 40], labels: ['DAY', 'HOUR', 'MINUTE'],
        prompt: 'A handcuffed briefcase with three brass dials. The leather is scratched with: “H.F. — C. — 07 23 40.” Finch was not subtle about numbers.',
        hintText: 'The scratch is a date and a train time. Day 07, hour 23, minute 40. Set each dial to two digits.',
        success: 'The case opens. Inside: a private ledger, a set of divorce papers, and a train ticket bought in Celia Finch’s name.',
        successTitle: 'The case clicks open.',
        gives: ['ledger'], flags: ['caseOpen'],
        short: 'Finch’s ledger and divorce papers are out.',
        log: 'The briefcase holds a ledger of transfers to a Cayman account, divorce papers, and a ticket bought in Celia’s name.'
      },
      'finch-pc': {
        type: 'terminal', title: 'Finch’s Laptop', subtitle: 'Encrypted correspondence', icon: 'terminal',
        user: 'hfinch', host: 'finch-office-01', password: 'crewe',
        intro: 'The laptop is still logged on. A single encrypted folder sits on the desktop: DIVORCE. Type "help" for commands.',
        banner: 'FINCH HOLDINGS — CONFIDENTIAL. 3 FILES. 1 ENCRYPTED VOLUME.',
        files: [
          { name: 'readme.txt', body: 'If you are reading this, I did not sign. Good. I never intended to.<br><br>— H.F.' },
          { name: 'transfers.csv', body: '<span class="d">ACCOUNT: CF-8841 (CAYMAN)</span><br>12/04 — 240,000<br>12/05 — 600,000<br>12/06 — 1,560,000<br><span class="y">STATUS: PENDING DIVORCE SIGNATURE</span>' },
          { name: 'will_draft.txt', body: 'I, Harold Finch, being of sound mind, leave the entirety of my estate to my brother, Peter Finch, and nothing to my wife, Celia Finch, save the house at—<br><span class="r">[DRAFT — NOT EXECUTED]</span>' },
          { name: 'divorce_archive.zip', locked: true, hint: 'Encrypted. The password is the station where he planned to wake.', secret: true, body: '<span class="g">ARCHIVE CONTENTS:</span><br><br>1. <b>email_to_solicitor.txt</b><br><span class="d">“She will not sign. Proceed with the divorce and the transfer. I am done being blackmailed.”</span><br><br>2. <b>last_message_to_celia.txt</b> — unsent<br><span class="y">“I am on the 23:40. Sleeper 4. If you want to talk, come and talk. If you want to fight, do it before Crewe. After Crewe, I am done.”</span><br><br>3. <b>insurance_note.pdf</b><br><span class="r">POLICY: 2.4M — BENEFICIARY: CELIA FINCH — EXECUTED 3 YEARS AGO</span>' }
        ],
        hintText: 'The note in Finch’s pocket reads “CREWE — 12 MINUTES. MAKE IT LOOK LIKE INVERNESS.” The password is the station, not the destination.',
        success: 'The archive opens. The last unsent message is a challenge, not an apology: come and talk before Crewe. Celia came. She did not talk.',
        successTitle: 'Archive decrypted.',
        gives: ['finch-emails', 'insurance-policy'], flags: ['pcOpen'],
        short: 'Finch’s encrypted correspondence is open.',
        log: 'Finch’s laptop contains the unsent message inviting Celia to Sleeper 4 before Crewe, and a 2.4 million insurance policy naming her as beneficiary.'
      },
      'crewe-photo': {
        type: 'photo', title: 'Platform Camera, Crewe', subtitle: 'Enhance the sleeper corridor', icon: 'camera',
        scene: { kind: 'train', mood: 'station' }, target: { x: 52, y: 46, w: 16, h: 22 }, range: [60, 78],
        prompt: 'The platform camera caught the sleeper corridor during the twelve-minute stop at Crewe. The image is dark and badly compressed. Enhance the reflection in the window.',
        reveal: 'In the window glass: a woman in a dark coat, standing outside Sleeper 4 with a small paper funnel in her hand. The door is open. The bunk behind her is empty.',
        question: 'What does the reflection show?',
        options: [
          { t: 'A cleaner polishing the corridor rail', v: 'cleaner' },
          { t: 'Celia Finch outside Sleeper 4 with a funnel', v: 'celia' },
          { t: 'The guard checking the compartment door', v: 'guard' },
          { t: 'Harold Finch standing in the corridor', v: 'harold' }
        ],
        answer: 'celia',
        wrong: 'Look at the coat and the scarf. The figure is outside the compartment, not inside it, and the door is open.',
        hintText: 'The figure is short, in a dark coat, and holding something pale. The guard was wearing a cap.',
        success: 'The reflection resolves: Celia Finch, outside Sleeper 4 at Crewe, with a funnel in her hand and the door open behind her.',
        successTitle: 'There she is.',
        gives: ['cctv-celia'], flags: ['sawCelia'],
        short: 'Celia was at the sleeper door at Crewe.',
        log: 'Enhanced platform footage shows Celia Finch outside Sleeper 4 during the Crewe stop, holding a paper funnel.'
      },
      'night-stops': {
        type: 'sequence', title: 'The Night in Order', subtitle: 'Four stops, one lie', icon: 'clock',
        prompt: 'Put the night’s stops in the only order that fits the guard, the waiter, and the platform camera.',
        items: [
          { t: '22:50 — Finch drinks alone in the dining car', sub: 'one whisky, paid cash', order: 0 },
          { t: '23:12 — brandy charged to Sleeper 4', sub: 'bar closed at 23:00', order: 1 },
          { t: '00:40 — Crewe. Twelve minutes.', sub: 'sleeper door unlocked', order: 2 },
          { t: '01:10 — snoring heard in Sleeper 4', sub: 'suspiciously regular', order: 3 },
          { t: '05:55 — Finch found dead', sub: 'door locked from inside', order: 4 }
        ],
        hintText: 'The drink was charged after the bar closed. That is the hinge. Everything else follows.',
        success: 'The night has a shape now: a drink after closing, twelve minutes at Crewe, and a recording of snoring doing the work of a living man.',
        wrong: 'The snoring cannot come before the door was opened. Start with the drink and the closed bar.',
        gives: ['night-order'],
        short: 'The night’s stops are reconstructed.',
        log: 'The brandy was charged at 23:12, after the bar closed. At Crewe, the sleeper door was opened. The snoring began after that.'
      }
    },
    suspects: [
      {
        id: 'celia', name: 'Celia Finch', role: 'The victim’s wife · Sleeper 5', location: 'dining', locationName: 'Dining car', tag: 'Prime suspect',
        portrait: { seed: 'celia-finch', hair: 'bob', hairColor: '#4a2b1b', skin: 2, expression: 'cold', collar: 'coat', eyes: '#2b1a12' },
        intro: 'Celia Finch is dressed for a funeral she has not been invited to yet. She has a soft voice and a way of looking at you as though you are a piece of furniture that has been moved. Her gloves are pale kid and smell of lily of the valley.',
        questions: [
          {
            q: 'Why were you on the same train as your husband?', gives: ['celia-alibi'],
            a: '“He asked me to come.” She opens her handbag and takes out a printed email. “He said if I wanted to talk, I should talk before Crewe. So I talked. We argued. I went back to my compartment. That is all.”',
            follow: 'The email is real. The last line is not an invitation. It is a dare.'
          },
          {
            q: 'The brandy in his compartment was poured after the bar closed.', requires: ['bottle-test'],
            a: '“I would not know. I do not drink brandy.” She adjusts her glove. “And if you are about to suggest I went into his compartment, I would remind you that the door was locked from the inside. Harold was dramatic. He probably locked himself in to make a point.”',
            gives: ['celia-doubt'], flags: ['celiaHostile']
          },
          {
            q: 'Your reflection is in the Crewe platform camera.', requires: ['cctv-celia'], present: true,
            a: 'She looks at the still for a long time. “That could be anyone. A dark coat and a scarf is not a face.”<br><br>Then she says, quietly: “He was asleep. I only went in to talk. He was already asleep when I opened the door. I left the brandy on the table and I left.”<br><br>It is the first thing she has said that does not fit the story she prepared.',
            gives: ['celia-slip'], flags: ['celiaBroke']
          },
          {
            q: 'He changed the will and cut you out. Two point four million was about to disappear.', requires: ['insurance-policy'], present: true,
            a: '“Two point four million is not a motive. It is a rounding error.” Her voice is flat. “You want to know what the motive was? He was going to tell everyone what I did to get that money in the first place. The divorce was not the punishment. The story was.”<br><br>She takes off her gloves, one finger at a time. “I did not plan to kill him. I planned to make him sign. He laughed at me. He actually laughed.”',
            gives: ['celia-admission']
          }
        ],
        after: 'She asks whether the train will be delayed. It is the only question she asks about anyone but herself.'
      },
      {
        id: 'owen', name: 'Owen Marsh', role: 'Finch’s business partner', location: 'office', locationName: 'Finch’s office', tag: 'Person of interest',
        portrait: { seed: 'owen-marsh', hair: 'short', hairColor: '#7a6a5a', skin: 0, expression: 'worried', collar: 'suit', eyes: '#2b1a12', glasses: 'round' },
        intro: 'Owen Marsh has the look of a man who has been running to stand still. He arrives at the office with two phones and an apology. He says he was in Manchester on the night of the murder and produces a hotel receipt before you ask.',
        questions: [
          {
            q: 'What was Finch doing on the night train?', gives: ['owen-statement'],
            a: '“Meeting his wife. She has been bleeding him for years. He wanted one last conversation before the divorce was filed.” He shakes his head. “Harold was not afraid of her. That was the problem. He thought he could out-argue anyone.”',
            follow: 'He says “out-argue” the way another man might say “outrun”.'
          },
          {
            q: 'You benefit from his death. The partnership reverts to you.', requires: ['ledger'],
            a: '“The partnership was already mine in all but name. Harold was the face. I was the work.” He puts the hotel receipt on the desk. “I was in Manchester. Ask the bartender. Ask the room-service kid. I ordered a club sandwich at one in the morning and complained about it.”',
            gives: ['owen-alibi']
          }
        ],
        after: 'His alibi is dull, documented, and entirely true. In a case like this, dull is a kind of relief.'
      },
      {
        id: 'tom', name: 'Tom Rigg', role: 'Sleeper attendant', location: 'luggage', locationName: 'Luggage van', tag: 'Witness',
        portrait: { seed: 'tom-rigg', hair: 'buzz', hairColor: '#2b1a12', skin: 4, expression: 'tired', collar: 'uniform', eyes: '#3a2159' },
        intro: 'Tom Rigg has worked the sleepers for nineteen years. He is careful with his words in the way of a man who has been blamed for things before. He keeps his keys on a chain and his eyes on the floor.',
        questions: [
          {
            q: 'Who had a key to Sleeper 4?', gives: ['tom-keys'],
            a: '“I do. The guard does. And there is a master in the luggage van for emergencies.” He hesitates. “Mrs Finch asked me for a spare blanket at Crewe. She was in the corridor when I came back. I did not think anything of it.”',
            follow: 'He says he did not think anything of it twice, which means he has thought about it since.'
          },
          {
            q: 'Was Finch alive when you checked at Crewe?', requires: ['night-order'],
            a: '“I heard him snoring. I would have sworn it was him.” He stops. “But the door was locked, and I did not open it. I put my ear to the panel. It sounded like him. It sounded like a man sleeping very deeply.”<br><br>“When I found him in the morning, the window was cold and the glass was clean. I have never seen a glass that clean on a train.”',
            gives: ['tom-doubt']
          }
        ],
        after: 'He gives you the master key without being asked. It is still warm from his pocket.'
      }
    ],
    clues: {
      'autopsy-note': {
        name: 'Bitter almonds', caption: 'Sleeper 4 · no struggle', icon: 'blood', type: 'Forensic evidence',
        desc: 'Cyanide poisoning. Finch died in his sleep within minutes. The brandy glass was wiped clean, inside and out.',
        tells: 'This was not a scuffle. Someone he trusted handed him a drink and then erased the glass.'
      },
      'ticket-stub': {
        name: 'The pencilled note', caption: '“CREWE — 12 MINUTES…”', icon: 'ticket', type: 'Written evidence',
        desc: 'A note in a small, tight hand: “CREWE — 12 MINUTES. MAKE IT LOOK LIKE INVERNESS.” A dining-car stub from 22:50 and a brass key stamped 4.',
        tells: 'The killer planned the timing around the Crewe stop. The note is not in Finch’s handwriting.'
      },
      briefcase: {
        name: 'The handcuffed briefcase', caption: 'Three dials · scratched leather', icon: 'lockbox', type: 'Physical evidence',
        desc: 'A heavy briefcase locked to the bunk rail. The leather is scratched: “H.F. — C. — 07 23 40.”',
        tells: 'Finch kept his private papers close even in death. The numbers are a date and a train time.'
      },
      ledger: {
        name: 'Finch’s private ledger', caption: 'Transfers to C.F. · 2.4M', icon: 'ledger', type: 'Financial evidence',
        desc: 'A record of transfers to a Cayman account, circled in red: “C.F. — 2.4M — IF SHE SIGNS.” Divorce papers dated last week. A train ticket in Celia’s name.',
        tells: 'Celia stood to lose everything if the divorce went through. The train ticket proves she was expected.'
      },
      'dining-receipt': {
        name: 'The till roll', caption: 'Brandy charged after closing', icon: 'receipt', type: 'Records',
        desc: 'Finch’s whisky at 22:51. A brandy charged to Sleeper 4 at 23:12 — after the bar closed. The waiter was in the kitchen.',
        tells: 'Somebody poured the brandy without the waiter. The drink that killed Finch was not ordered by him.'
      },
      'dining-plan': {
        name: 'The seating plan', caption: 'Table 6 · Table 7', icon: 'note', type: 'Records',
        desc: 'Finch booked Table 6. Celia booked Table 7, two feet away. She later requested the adjoining Sleeper 5.',
        tells: 'Celia arranged to be close to her husband on the train, then closer still. This was not a chance encounter.'
      },
      'bottle-test': {
        name: 'The brandy bottle', caption: 'Cyanide · lily-of-the-valley powder', icon: 'flask', type: 'Forensic evidence',
        desc: 'Potassium cyanide in the sediment. Face powder trapped under the cork. The same powder on the outside of the glass in Sleeper 4.',
        tells: 'A woman poured the drink, held the glass by the base, and wiped it. The powder is a physical trace she could not see.'
      },
      'assistant-statement': {
        name: 'The assistant’s account', caption: 'The will was changed Tuesday', icon: 'note', type: 'Witness statement',
        desc: 'Finch changed his will, cutting Celia out. He told his assistant he was taking the night train to give her one last chance to sign.',
        tells: 'Finch was not afraid of Celia. He was inviting a confrontation — and he thought he would win it.'
      },
      'guard-statement': {
        name: 'The guard at Crewe', caption: '“Snoring. Too regular.”', icon: 'note', type: 'Witness statement',
        desc: 'The guard checked every sleeper door at Crewe, heard Finch snoring, and saw Celia awake in Sleeper 5 with her coat on.',
        tells: 'The snoring was a recording. The guard was meant to hear it, and Celia was meant to be seen awake.'
      },
      'cctv-celia': {
        name: 'Crewe platform still', caption: 'Celia outside Sleeper 4', icon: 'cctv', type: 'Surveillance',
        desc: 'Enhanced footage shows Celia Finch outside Sleeper 4 during the twelve-minute stop, holding a paper funnel. The door is open.',
        tells: 'She entered the compartment at Crewe. The locked door at dawn was not a locked room; it was a door locked afterwards.'
      },
      'ticket-record': {
        name: 'The ticketing record', caption: 'Two sleepers, one card', icon: 'ledger', type: 'Records',
        desc: 'Two first-class sleeper tickets bought with Finch’s card: Sleeper 4 and the adjoining Sleeper 5. A taxi from the Finch house to Euston at 22:20.',
        tells: 'Finch paid for his wife to be on the train. He wanted the conversation. She came with a different plan.'
      },
      'vial-case': {
        name: 'The black overnight bag', caption: 'Vial, funnel, kid gloves', icon: 'pill', type: 'Physical evidence',
        desc: 'An unclaimed bag in the luggage van: a half-full vial of white powder, a paper funnel, pale kid gloves smelling of lily of the valley, and a printed email.',
        tells: 'The murder kit travelled in the same bag Celia carried aboard. The email gives her the motive in Finch’s own words.'
      },
      'luggage-manifest': {
        name: 'The luggage manifest', caption: 'Not on the list', icon: 'note', type: 'Records',
        desc: 'The black bag was not checked through. It was carried aboard by hand and left in the van between Crewe and Inverness. Label: C. FINCH — SLEEPER 5.',
        tells: 'Celia disposed of the murder kit while the train slowed. She never expected anyone to search the luggage van.'
      },
      'night-order': {
        name: 'The night reconstructed', caption: '22:50 → 05:55', icon: 'clock', type: 'Timeline',
        desc: 'A drink at 22:50, a brandy after closing, the Crewe stop at 00:40, regular snoring at 01:10, and a body at 05:55.',
        tells: 'The snoring began after the door was opened at Crewe. It was not a sleeping man; it was a recording.'
      },
      'finch-emails': {
        name: 'The unsent message', caption: '“Talk before Crewe.”', icon: 'note', type: 'Digital evidence',
        desc: 'Finch’s last unsent message to Celia: “I am on the 23:40. Sleeper 4. If you want to talk, come and talk. If you want to fight, do it before Crewe. After Crewe, I am done.”',
        tells: 'Finch invited her to the compartment and set a deadline. She came before the deadline and made sure he never reached the “after”.'
      },
      'insurance-policy': {
        name: 'The insurance policy', caption: '2.4 million · Celia Finch', icon: 'money', type: 'Financial evidence',
        desc: 'A policy executed three years earlier naming Celia Finch as sole beneficiary. The divorce would have voided it.',
        tells: 'The divorce would have cost her the marriage, the money, and the story. She had more to lose than Finch knew.'
      },
      'owen-statement': {
        name: 'Owen’s account', caption: '“He wanted one last conversation”', icon: 'note', type: 'Witness statement',
        desc: 'Owen Marsh confirms Finch was meeting Celia on the train and was not afraid of her.',
        tells: 'Finch walked into the meeting confident. That confidence is why he drank the brandy without smelling it.'
      },
      'owen-alibi': {
        name: 'Owen’s alibi', caption: 'Manchester · club sandwich', icon: 'receipt', type: 'Alibi',
        desc: 'A hotel receipt, a bartender, and a room-service order at one in the morning. Owen Marsh was in Manchester.',
        tells: 'The business partner had no opportunity. The case narrows to the woman in Sleeper 5.'
      },
      'tom-keys': {
        name: 'The master key', caption: 'Luggage van · emergency set', icon: 'key', type: 'Physical evidence',
        desc: 'The attendant’s key, the guard’s key, and a master key kept in the luggage van. Celia asked for a blanket and was in the corridor at Crewe.',
        tells: 'A master key existed, and Celia had a reason to be in the corridor when the train stopped.'
      },
      'tom-doubt': {
        name: 'The snoring', caption: '“Too regular”', icon: 'audio', type: 'Witness statement',
        desc: 'Tom Rigg heard Finch snoring at Crewe but never opened the door. By morning the glass was the cleanest he had ever seen on a train.',
        tells: 'The sound was a recording played through the compartment wall. The clean glass was the mistake.'
      },
      'celia-alibi': {
        name: 'Celia’s invitation', caption: '“He asked me to come.”', icon: 'mail', type: 'Alibi',
        desc: 'Celia produces Finch’s email inviting her to talk before Crewe. She says they argued and she returned to her compartment.',
        tells: 'The invitation is real. It places her at the scene by the victim’s own request.'
      },
      'celia-doubt': {
        name: '“Harold was dramatic”', caption: 'Celia on the locked door', icon: 'note', type: 'Interview',
        desc: 'Celia dismisses the locked door as Finch being dramatic and denies any knowledge of the brandy.',
        tells: 'She knows the door was locked from the inside. Only the killer needed that detail to be true.'
      },
      'celia-slip': {
        name: '“He was already asleep”', caption: 'The first crack', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the Crewe footage, Celia says she opened the door, found Finch asleep, left the brandy, and left.',
        tells: 'She has placed herself inside the compartment with the drink. Everything after that is arithmetic.'
      },
      'celia-admission': {
        name: '“He laughed at me”', caption: 'Celia Finch · motive', icon: 'audio', type: 'Statement',
        desc: 'Celia admits the divorce would expose what she did for the money and that Finch laughed at her when she asked him to sign.',
        tells: 'Motive and opportunity are now on the record. The only question left is method.'
      }
    },
    solution: {
      minEvidence: 9,
      questions: [
        {
          q: 'Who killed Harold Finch?',
          options: [
            { t: 'Celia Finch — his wife, in Sleeper 5', v: 'celia' },
            { t: 'Owen Marsh — his business partner', v: 'owen' },
            { t: 'Tom Rigg — the sleeper attendant', v: 'tom' },
            { t: 'A stranger who boarded at Crewe', v: 'stranger' }
          ],
          answer: 'celia'
        },
        {
          q: 'How did she get into a compartment locked from the inside?',
          options: [
            { t: 'She never entered; the poison was in the bottle before boarding', v: 'bottle' },
            { t: 'She used a master key at Crewe, killed him, then locked the door behind her', v: 'master' },
            { t: 'Finch opened the door himself and she handed him the drink', v: 'handed' },
            { t: 'She climbed in through the emergency window', v: 'window' }
          ],
          answer: 'master'
        },
        {
          q: 'What was the motive?',
          options: [
            { t: 'The divorce would cut her out of the will and expose a financial crime', v: 'divorce' },
            { t: 'Finch was having an affair with the dining-car waiter', v: 'affair' },
            { t: 'She wanted the train company to pay compensation', v: 'insurance' },
            { t: 'A dispute over the family house', v: 'house' }
          ],
          answer: 'divorce'
        },
        {
          q: 'Which evidence breaks the locked-room illusion?',
          options: [
            { t: 'The bitter-almond smell and the wiped glass', v: 'glass' },
            { t: 'The enhanced Crewe footage of Celia at the open door', v: 'crewe' },
            { t: 'The waiter’s memory of the dining car', v: 'waiter' },
            { t: 'Owen Marsh’s Manchester hotel receipt', v: 'owen' }
          ],
          answer: 'crewe'
        }
      ],
      verdict: {
        who: 'Celia Finch, 46 — the victim’s wife',
        whoDesc: 'was arrested at Edinburgh Waverley with a half-empty vial in her overnight bag.',
        how: 'She used the master key during the twelve-minute stop at Crewe, entered Sleeper 4 while her husband slept, poured cyanide into the brandy, wiped the glass, left a recording of snoring to cover the silence, and locked the door from the inside on her way out.',
        why: 'The divorce would have taken the money, the house, and the story she had built her life around. Finch invited her to talk before Crewe. She came to make sure there was nothing left to talk about.',
        key: 'The Crewe platform camera. It caught her reflection in the sleeper window with a funnel in her hand and the door open behind her — the exact twelve minutes she claimed to have spent in her own compartment.'
      },
      reveal: [
        'The locked-room problem was never a locked room. It was a timetable. At Crewe the train stopped for twelve minutes, the guard walked the corridor, and every passenger who wanted to be seen was seen. Celia Finch used those twelve minutes to open Sleeper 4 with a master key, pour cyanide into her husband’s brandy, and leave a small speaker under the bunk playing a recording of his snoring.',
        'She had planned it for weeks. The note in Finch’s pocket — “CREWE — 12 MINUTES. MAKE IT LOOK LIKE INVERNESS” — was not his. It was hers, a reminder to herself of the window and the story she would tell afterwards. She bought the adjoining compartment with his card, wore the coat he had bought her, and let the waiter see her send back her coffee.',
        'Harold Finch was not a fool. He had changed his will, moved the money, and invited his wife onto the train to force a conversation. He thought he could out-argue her. He thought the worst thing she could do was refuse to sign. He was asleep when she came in, and he never woke up.',
        'The snoring was the detail that nearly worked. The guard heard it at Crewe and swore Finch was alive. But the sound was too regular, and the glass in the morning was too clean, and the platform camera caught a reflection that no amount of wiping could remove. A woman in a dark coat, a paper funnel, and an open door.',
        'By the time the train reached Edinburgh, Celia had disposed of the murder kit in the luggage van and changed her gloves. She walked onto the platform with a heavier bag and a story about a marriage she had been trying to save. The story lasted until the guard mentioned the snoring.',
        'The 23:40 arrived with eight passengers and one body. The timetable did not kill Harold Finch. It gave his wife twelve minutes and a place to hide them.'
      ],
      quote: 'A locked door is only a mystery until you ask who has the key.',
      twist: 'Finch had already won. The divorce papers were signed, the money was moved, and the will was changed before he boarded. Celia killed him for an inheritance she had already lost — and the only thing she carried off the train was a murder she could not spend.'
    }
  });

  /* ------------------------------------------------------------
     CASE 04 — ROOM 703
     ------------------------------------------------------------ */
  C.push({
    id: 'c04', num: 4,
    title: 'Room 703',
    subtitle: 'A journalist checks into a grand hotel and checks out in a laundry cart.',
    difficulty: 3, est: '30–40 min',
    cover: { kind: 'hotel', mood: 'night' },
    facts: [
      { k: 'Missing', v: 'Mara Voss, 31 — investigative journalist' },
      { k: 'Scene', v: 'Room 703, the Meridian Hotel' },
      { k: 'Found', v: 'Blood in the room. No body. No struggle.' },
      { k: 'Checked in', v: 'Monday, 18:20 — checked out: never' }
    ],
    briefing: [
      'The Meridian is the kind of hotel that charges extra for the view and does not mention the cameras in the corridors. Mara Voss checked into Room 703 on Monday evening with one suitcase and a laptop. On Tuesday morning the room was clean, the bed was made, and the carpet had been shampooed in one corner.',
      'Mara did not check out. Her keycard was last used at 23:41. Her phone is off. Her editor says she was working on a story about the hotel — something to do with the guests who never appear on the register.',
      'The hotel manager, Desmond Rook, is very sorry and very helpful. He has already comped the room and offered the police his full cooperation. He has not offered them the laundry manifest.',
      'A journalist vanishes from a locked room on the seventh floor. The lobby camera shows everyone who came in. It does not show anyone who went out. That is not because nobody left. It is because somebody found a better door.'
    ],
    opening: 'Room 703 is immaculate. That is the first wrong thing. Hotels are never immaculate after a guest has lived in them. The second wrong thing is the faint smell of bleach under the air freshener, and the third is the corner of carpet that is a slightly different shade of grey.',
    objectives: [
      'Search Room 703 and open the guest safe.',
      'Identify the figure on the lobby camera at 23:41.',
      'Trace what left the hotel through the service corridor.',
      'Find the story Mara Voss was killed to stop.'
    ],
    locations: [
      {
        id: 'room', name: 'Room 703', short: 'Room 703', time: '10:15',
        art: { kind: 'hotel', mood: 'room' },
        intro: 'A king bed, a desk with a lamp, and a window looking down at the city. The bin is empty. The towels are folded. On the desk, a complimentary bottle of water has been opened and not drunk.',
        actions: [
          {
            id: 'search', label: 'Search the room', icon: 'search', hotspot: { x: 68, y: 72 },
            desc: 'Carpet, bin, bathroom, bedside drawer', gives: ['room-blood', 'hotel-keycard'],
            text: [
              'The carpet in the corner nearest the bathroom has been shampooed recently; the fibres stand up differently and the shade is a half-tone lighter. Under ultraviolet light, the patch glows blue-white. Blood, diluted and scrubbed.',
              'The bin is empty, but the liner is new and the plastic still has a crease where something heavy was pressed into it. In the bathroom, one towel is missing and the shower drain has been unscrewed and replaced badly.',
              'Under the bed, a hotel keycard. The name printed on it is not Mara Voss. It is <b>D. ROOK — MASTER</b>.'
            ]
          },
          {
            id: 'safe', label: 'Open the guest safe', icon: 'lockbox', kind: 'puzzle', puzzle: 'room-safe',
            desc: 'A four-digit safe, set by the guest', requires: ['room-blood'],
            hint: 'Mara was the kind of person who would use the room number. Four digits.'
          },
          {
            id: 'desk', label: 'Read the desk notepad', icon: 'note',
            desc: 'An indentation where a page was torn off', requires: ['room-blood'], gives: ['desk-note'],
            text: [
              'The notepad is blank, but the top page has been torn away. The sheet underneath carries the ghost of the missing page, pressed into the paper: <b>“R — 23:30 — CHAMPAGNE — ROOM 703.”</b>',
              'The hotel pen beside it is dry. Mara wrote with her own pen, then took the page with her. Or someone did.',
              'A room-service menu has been folded into a triangle and used as a bookmark in a hotel magazine. The page it marks is an article about the Meridian’s centenary. In the margin, in pencil: <i>“Ask about the 7th floor. Ask who pays cash.”</i>'
            ]
          }
        ]
      },
      {
        id: 'lobby', name: 'Hotel lobby', short: 'Lobby', time: '11:20',
        art: { kind: 'hotel', mood: 'lobby' }, requires: ['hotel-keycard'],
        intro: 'Marble, brass, and a chandelier that has been photographed more than most film stars. Desmond Rook is behind the reception desk in a suit that costs more than the desk. The security office is a door marked STAFF ONLY.',
        actions: [
          {
            id: 'rook', label: 'Interview Desmond Rook', icon: 'user', suspect: 'rook',
            desc: 'The manager · helpful to a fault', hint: 'Rook has already comped the room. Ask him what he is compensating for.'
          },
          {
            id: 'cctv', label: 'Pull the lobby camera footage', icon: 'cctv',
            desc: '23:30 to midnight, four angles', gives: ['cctv-grainy'],
            text: [
              'The lobby camera is a good one, mounted above the revolving door. At 23:32 a man in a hotel uniform crosses the lobby pushing a laundry cart. The cart is empty going toward the lifts. It is not empty coming back.',
              'At 23:41 the lift opens on the ground floor. The same man wheels the cart out through the service door. He is not tall. He walks with his shoulders back, like a man who owns the building.',
              'The security guard fast-forwards. At 00:15 the cart is returned to the laundry room. At 00:40 the manager’s office light goes off. The guard shrugs. “Mr Rook works late. He is very dedicated.”'
            ]
          },
          {
            id: 'photo', label: 'Enhance the corridor still', icon: 'camera', kind: 'puzzle', puzzle: 'lobby-photo',
            desc: 'A face in the service-door reflection', requires: ['cctv-grainy'],
            hint: 'The service door has a brass push-plate. Polish the reflection in the still.'
          },
          {
            id: 'register', label: 'Check the guest register', icon: 'ledger',
            desc: 'Who is on the seventh floor — and who is not', gives: ['guest-list'],
            text: [
              'The register for Monday night lists four guests on the seventh floor. Three names are ordinary. The fourth is <b>“MR A. GREY — CASH — ROOM 705”</b>.',
              'Room 705 was booked for one night and paid in cash. The passport number is a placeholder. The signature is a loop with no letters in it.',
              'The housekeeping log shows Room 705 was serviced twice on Tuesday morning. The second time was at 07:10, before any guest could have checked out. The cleaner’s initials are D.R.'
            ]
          }
        ]
      },
      {
        id: 'service', name: 'Service corridor', short: 'Service', time: '13:05',
        art: { kind: 'hotel', mood: 'service' }, requires: ['cctv-rook'],
        intro: 'A narrow grey corridor that smells of linen and floor polish. The laundry chute is a metal mouth in the wall. At the far end, a woman in a housekeeping uniform is folding sheets with the careful movements of someone who has been waiting to be asked a question.',
        actions: [
          {
            id: 'ines', label: 'Interview Ines Bard', icon: 'user', suspect: 'ines',
            desc: 'Housekeeper · seventh floor', hint: 'Ines cleans the seventh floor. She saw the cart.'
          },
          {
            id: 'chute', label: 'Search the laundry room', icon: 'search', hotspot: { x: 40, y: 62 },
            desc: 'The cart, the chute, the sheets', gives: ['laundry-manifest'],
            text: [
              'The laundry cart is empty now, but the canvas liner has been changed. Under the rim, caught in the stitching, is a single dark hair and a smear of the same blue-white blood.',
              'The laundry manifest lists every item sent down from the seventh floor on Tuesday morning. One entry is circled: <b>“7th floor — 1 x duvet, stained — DISPOSED.”</b> The word DISPOSED is in a different pen from the rest.',
              'In the bottom of the chute, wedged behind the flap, is a woman’s watch. The strap is broken. The hands stopped at 23:47.'
            ]
          },
          {
            id: 'sheet', label: 'Examine the stained sheet', icon: 'blood',
            desc: 'Bleach, blood, and a printed logo', requires: ['laundry-manifest'], gives: ['blood-sheet'],
            text: [
              'The sheet has been bleached twice, but the stain has a shape: a hand, pressed flat. Under the bleach, in the seam, a small hotel laundry tag is still attached. The tag is numbered 703.',
              'On the corner of the sheet, printed in indigo, is the Meridian crest. The same crest is on the laundry cart. The same cart was on the lobby camera at 23:32.',
              'A laundry worker tells you the sheet was brought down by Mr Rook himself. “He never does that. He said it was a personal matter.”'
            ]
          }
        ]
      },
      {
        id: 'roof', name: 'Seventh-floor roof', short: 'Roof', time: '14:30',
        art: { kind: 'hotel', mood: 'roof' }, requires: ['laundry-manifest'],
        intro: 'The roof is a flat grey plateau of air-conditioning units and pigeon spikes. The door from the stairwell has a keypad lock. Beyond the parapet, the city is a grid of windows, each one a small yellow lie about what happens inside.',
        actions: [
          {
            id: 'roofsearch', label: 'Search the roof', icon: 'search',
            desc: 'A phone, a cigarette, a service door log', gives: ['mara-phone'],
            text: [
              'Behind an air-conditioning unit, a phone lies face down on the gravel. The screen is cracked. The case is monogrammed M.V. It still has 12% battery and a locked screen.',
              'The roof door log records a code entry at 23:36 and an exit at 00:02. The code belongs to the manager’s master card. The log also records a second entry at 06:10, under the same code.',
              'A cigarette butt lies by the door, smoked down to the filter. Hotel staff are not allowed to smoke on the roof. The brand is the same one Desmond Rook keeps in his desk.'
            ]
          },
          {
            id: 'voicemail', label: 'Play Mara’s last voicemail', icon: 'audio', kind: 'puzzle', puzzle: 'mara-audio',
            desc: 'A message saved at 23:38', requires: ['mara-phone'],
            hint: 'The phone is locked, but the emergency voicemail is accessible. Listen to what she says under the wind.'
          },
          {
            id: 'view', label: 'Check the roof access keypad', icon: 'keypad',
            desc: 'Who has been coming up here at night', requires: ['mara-phone'], gives: ['roof-log'],
            text: [
              'The keypad keeps a thirty-day log. The manager’s master code appears eleven times, always between midnight and two in the morning. The rooftop camera has been disconnected since the 3rd.',
              'The maintenance sheet says the camera was “damaged in a storm”. There has been no storm. The camera cable has been cut with wire cutters and taped back into the housing.',
              'On the ledge, a hotel ashtray has been used as a makeshift dish. In it: three cigarette ends, all the same brand, all smoked by someone who stands with their back to the door.'
            ]
          }
        ]
      },
      {
        id: 'editor', name: 'The editor’s office', short: 'Editor', time: '16:00',
        art: { kind: 'office' }, requires: ['safe-notebook'],
        intro: 'A newspaper office on the fourth floor of a building that smells of ink and old coffee. Lionel Frost has Mara’s desk in a corner, untouched, as though she might come back for it. He has not slept.',
        actions: [
          {
            id: 'frost', label: 'Interview Lionel Frost', icon: 'user', suspect: 'frost',
            desc: 'Her editor · knows what she was working on', hint: 'Frost has Mara’s notes. Ask what she was about to publish.'
          },
          {
            id: 'laptop', label: 'Open Mara’s laptop', icon: 'terminal', kind: 'puzzle', puzzle: 'mara-pc',
            desc: 'A password prompt and a scheduled upload', requires: ['safe-notebook'],
            hint: 'Mara’s notebook says the source is “Grey”. Try the name the source used at the hotel.'
          },
          {
            id: 'print', label: 'Check the print queue', icon: 'note',
            desc: 'A story scheduled for 09:00', requires: ['safe-notebook'], gives: ['article-draft'],
            text: [
              'The print queue shows a document called MERIDIAN_FINAL.pdf, sent at 23:44 on Monday night. It is 9,000 words long and due to publish at 09:00 on Wednesday.',
              'The first page is a list of names: guests who paid cash, rooms that were never registered, and a column headed <b>“COMP”</b> — rooms given away free by the manager. Every name in that column is a public figure.',
              'The last page is a single sentence: <b>“The Meridian does not sell rooms. It sells the people in them.”</b>'
            ]
          }
        ]
      }
    ],
    puzzles: {
      'room-safe': {
        type: 'keypad', title: 'Room 703 Safe', subtitle: 'Four digits, guest-set', icon: 'lockbox',
        deviceLabel: 'IN-ROOM SAFE — 703', length: 4, code: '0703',
        prompt: 'A standard hotel safe with a four-digit guest code. Mara Voss was not a woman who worried about forgetting a random number.',
        hintText: 'The room number is four digits if you include the floor. 703 becomes 0703.',
        success: 'The safe opens. Inside: a slim notebook, a USB stick, and a hotel keycard that does not belong to Mara.',
        successTitle: 'The safe opens.',
        gives: ['safe-notebook', 'usb-stick'], flags: ['safeOpen'],
        short: 'Mara’s notebook and USB are out.',
        log: 'Room 703’s safe contains Mara’s notebook, a USB stick, and a keycard marked D. ROOK — MASTER.'
      },
      'lobby-photo': {
        type: 'photo', title: 'Service Door Reflection', subtitle: 'Enhance the 23:41 still', icon: 'camera',
        scene: { kind: 'hotel', mood: 'lobby' }, target: { x: 58, y: 50, w: 15, h: 20 }, range: [58, 76],
        prompt: 'A man in uniform pushes a laundry cart through the service door. The brass push-plate catches his reflection. Sharpen it.',
        reveal: 'In the brass plate: Desmond Rook’s face, lit from below, with a stain on his cuff and a master keycard in his free hand.',
        question: 'Whose reflection is in the service door?',
        options: [
          { t: 'A hotel porter doing his rounds', v: 'porter' },
          { t: 'Desmond Rook, the manager, with a master keycard', v: 'rook' },
          { t: 'Lionel Frost, the editor', v: 'frost' },
          { t: 'Ines Bard, the housekeeper', v: 'ines' }
        ],
        answer: 'rook',
        wrong: 'Look at the suit and the keycard. The cart pusher is not a porter; he is the man who signs the rota.',
        hintText: 'The face is older, heavier, and wearing a suit under the uniform coat. The cuff has a dark stain.',
        success: 'The reflection sharpens: Desmond Rook, in a hotel uniform over his own suit, pushing an empty cart at 23:32 and a heavy one at 23:41.',
        successTitle: 'The manager.',
        gives: ['cctv-rook'], flags: ['sawRook'],
        short: 'Rook was pushing the laundry cart.',
        log: 'Enhanced footage shows Desmond Rook in a hotel uniform pushing the laundry cart into the service corridor at 23:41.'
      },
      'mara-pc': {
        type: 'terminal', title: 'Mara’s Laptop', subtitle: 'The Meridian file', icon: 'terminal',
        user: 'mvoss', host: 'press-laptop-7', password: 'grey',
        intro: 'The laptop opens on a locked folder called MERIDIAN. A sticky note on the screen reads: “Source: Grey. Do not name him.” Type "help" for commands.',
        banner: 'PRESS LAPTOP — 4 FILES. 1 ENCRYPTED VOLUME.',
        files: [
          { name: 'notes.txt', body: 'Source says the hotel runs a side business. Rooms 701-705 are not all rooms. Some are stages.<br><br>He is scared of Rook. Not the police. Rook.' },
          { name: 'guestlist.csv', body: '<span class="d">ROOM 701 — booked / occupied / billed</span><br>ROOM 703 — booked / occupied / <span class="r">not billed</span><br>ROOM 705 — booked / <span class="r">no guest</span> / cash<br><span class="y">HOUSEKEEPING: 705 serviced twice, both by D.R.</span>' },
          { name: 'meridian_final.pdf', body: '<span class="g">MERIDIAN_FINAL.pdf — SCHEDULED 09:00 WEDNESDAY</span><br><br>“The Meridian does not sell rooms. It sells the people in them.”<br><br><span class="d">9,012 words. 14 named guests. 1 unnamed source.</span>' },
          { name: 'source_archive.zip', locked: true, hint: 'Encrypted. Password hint: the source’s hotel name.', secret: true, body: '<span class="g">ARCHIVE CONTENTS:</span><br><br>1. <b>grey_interview.txt</b> — 4 hours of transcript. “Rook films them. He keeps the tapes in the manager’s office. He calls it insurance.”<br><br>2. <b>room705.jpg</b> — a photograph of Room 705: a camera behind the mirror, a bottle of champagne on the table, and a man asleep on the bed.<br><br>3. <b>last_edit.txt</b> — <span class="y">“If this publishes and I do not answer, it means Rook found out. Do not stop the story.”</span><br><br><span class="r">SCHEDULED: 09:00 WEDNESDAY. CANNOT BE CANCELLED FROM THIS DEVICE.</span>' }
        ],
        hintText: 'Mara’s source used the name A. Grey on the hotel register. One word, no capitals.',
        success: 'The archive opens. Four hours of testimony, a hidden camera behind a mirror, and a story already scheduled to publish whether Mara comes back or not.',
        successTitle: 'MERIDIAN archive decrypted.',
        gives: ['source-grey', 'grey-interview', 'scheduled-story'], flags: ['storyFound'],
        short: 'Mara’s source file and scheduled story are open.',
        log: 'Mara’s laptop contains the Grey interview, a photograph of a camera behind Room 705’s mirror, and a story scheduled for 09:00 Wednesday that cannot be cancelled.'
      },
      'mara-audio': {
        type: 'audio', title: 'Mara’s Last Voicemail', subtitle: '23:38 · eleven seconds', icon: 'audio',
        prompt: 'A voicemail saved to her own number, recorded on the roof. The wind is loud. Under it, a man is speaking.',
        pattern: [610, 610, 0, 300, 300, 300, 0, 220],
        tempo: 0.26,
        waveform: 'Two sharp tones, a pause, three flat tones, a pause, one low tone. The rhythm of a man giving an instruction, not a warning.',
        options: [
          { t: 'Rook telling her to bring the notebook to the roof', v: 'rook' },
          { t: 'A taxi driver giving directions', v: 'taxi' },
          { t: 'Mara reading her own article aloud', v: 'mara' },
          { t: 'Wind through the air-conditioning units', v: 'wind' }
        ],
        answer: 'rook',
        wrong: 'Listen to the spacing. The voice pauses after the first two words and then gives three instructions. That is not wind.',
        hintText: 'The last low tone is a surname. The first two sharp tones are a room number.',
        success: 'The voice resolves under the wind: <i>“Seven-oh-three. Bring the notebook. Come alone, or I publish the tape first.”</i>',
        successTitle: 'An invitation to the roof.',
        gives: ['roof-voicemail'], flags: ['heardVoicemail'],
        short: 'Rook summoned Mara to the roof.',
        log: 'Mara’s voicemail captures Rook ordering her to bring the notebook to the roof of Room 703 — alone.'
      }
    },
    suspects: [
      {
        id: 'rook', name: 'Desmond Rook', role: 'Hotel manager · master keycard', location: 'lobby', locationName: 'Hotel lobby', tag: 'Prime suspect',
        portrait: { seed: 'desmond-rook', hair: 'short', hairColor: '#2b1a12', skin: 4, expression: 'smile', collar: 'suit', eyes: '#2b1a12', beard: 'goatee' },
        intro: 'Desmond Rook has the smile of a man who has never been told no by a guest. He is immaculate, apologetic, and entirely in control of the conversation. He calls Mara “the poor woman” three times before you ask a question.',
        questions: [
          {
            q: 'When did you last see Mara Voss?', gives: ['rook-alibi'],
            a: '“Monday evening. I welcomed her personally. She asked for a quiet room and I gave her 703, which has the best view in the house.” He spreads his hands. “I did not see her after that. I was in my office until midnight, doing the accounts.”',
            follow: 'The lobby camera shows his office light going off at 00:40. The service door shows him at 23:41.'
          },
          {
            q: 'Why is your master keycard in her room?', requires: ['hotel-keycard'],
            a: '“A spare. Housekeeping keeps one on every floor.” He does not blink. “If you found a master card in a guest room, I would be asking my staff some very serious questions. Not me.”',
            gives: ['rook-deflect'], flags: ['rookHostile']
          },
          {
            q: 'You were pushing the laundry cart at 23:41.', requires: ['cctv-rook'], present: true,
            a: '“I help out when we are short-staffed. It is a hotel, detective. We all carry linen.” A bead of sweat moves down his temple. He does not wipe it.<br><br>“If you are suggesting that I harmed a guest, I would like to speak to your superior. And then I would like to speak to my lawyer.”',
            gives: ['rook-panic'], flags: ['rookBroke']
          },
          {
            q: 'The story was already scheduled. Killing her did not stop it.', requires: ['scheduled-story'], present: true,
            a: 'He looks at the laptop screen for a long moment. “She told me she had copies. I did not believe her. They always say that.”<br><br>“The tapes are not what you think. They are insurance. Important people do foolish things in hotel rooms. I kept the rooms safe.”<br><br>“She was going to ruin all of it. For a story. For nine thousand words.”',
            gives: ['rook-admission']
          }
        ],
        after: 'He straightens his tie before the handcuffs go on. Even now, he is thinking about the hotel’s reputation.'
      },
      {
        id: 'ines', name: 'Ines Bard', role: 'Housekeeper · seventh floor', location: 'service', locationName: 'Service corridor', tag: 'Witness / suspect',
        portrait: { seed: 'ines-bard', hair: 'bun', hairColor: '#1b1b1b', skin: 3, expression: 'worried', collar: 'uniform', eyes: '#2b1a12' },
        intro: 'Ines has worked at the Meridian for six years and has the flat, careful voice of someone who needs the job. She keeps her hands folded. She answers every question before you finish it.',
        questions: [
          {
            q: 'What did you see on Tuesday morning?', gives: ['ines-statement'],
            a: '“Mr Rook told me not to clean 703. He said the guest had checked out early.” She looks at the floor. “But the guest did not check out. Her keycard was still active. I saw the light on the door.”<br><br>“When I went in, the carpet was wet. Mr Rook said there was a leak. There is no leak on the seventh floor.”',
            follow: 'She has been carrying that wet carpet around in her head for two days.'
          },
          {
            q: 'Why did you change the duvet and not log it?', requires: ['laundry-manifest'],
            a: '“Mr Rook brought the sheet down himself. He said it was a personal matter and I should not write it in the book.” She bites her lip. “I wrote it anyway. I always write it. If something happens, I want it written.”<br><br>“He found out. He said he would have to let me go. I have a daughter.”',
            gives: ['ines-fear']
          },
          {
            q: 'Did you see Mara after Monday night?', requires: ['roof-voicemail'],
            a: '“I heard her voice on the roof. I was on the seventh floor at half past eleven. She was arguing with a man. She said, ‘You cannot keep me in a room.’ He said, ‘I am not keeping you in a room.’”<br><br>“Then it went quiet. I did not go up. I am sorry. I should have gone up.”',
            gives: ['ines-roof'], flags: ['inesTruth']
          }
        ],
        after: 'She asks whether she will lose her job. You tell her the truth: probably not, but not because the hotel deserves her.'
      },
      {
        id: 'frost', name: 'Lionel Frost', role: 'Editor · Mara’s boss', location: 'editor', locationName: 'The editor’s office', tag: 'Witness',
        portrait: { seed: 'lionel-frost', hair: 'wavy', hairColor: '#7a6a5a', skin: 0, expression: 'angry', collar: 'shirt', eyes: '#2b1a12', glasses: 'rect' },
        intro: 'Lionel Frost has been an editor for thirty years and has the air of a man who has seen every way a story can fall apart. He is furious in a controlled, professional way. He has already called the paper’s lawyer twice.',
        questions: [
          {
            q: 'What was Mara working on?', gives: ['frost-statement'],
            a: '“The Meridian. She had a source inside who claimed the manager was running a blackmail operation. Cameras in rooms, tapes, important guests. The usual filth.” He rubs his face. “She would not name the source. She said he was more afraid of Rook than of prison.”',
            follow: 'He opens a drawer and takes out a printed page. It is the first page of her story, stamped with tomorrow’s date.'
          },
          {
            q: 'Who knew she was at the hotel?', requires: ['safe-notebook'],
            a: '“Her source. Me. And anyone the source told.” He stops. “She filed the story at 23:44. I got the email at 23:46. The last line said, ‘If I go quiet, publish anyway.’”<br><br>“I thought she was being dramatic. Journalists are always being dramatic.”',
            gives: ['frost-email']
          }
        ],
        after: 'He asks you to find her body, not just her story. It is the only time his voice breaks.'
      }
    ],
    clues: {
      'room-blood': {
        name: 'The shampooed carpet', caption: 'Room 703 · blue-white under UV', icon: 'blood', type: 'Forensic evidence',
        desc: 'A patch of carpet has been scrubbed and shampooed. Under ultraviolet light it glows blue-white. The bathroom drain has been removed and replaced badly.',
        tells: 'Someone cleaned a violent scene in a hurry. The missing towel and the drain suggest blood was washed away rather than removed.'
      },
      'hotel-keycard': {
        name: 'The master keycard', caption: 'D. ROOK — MASTER', icon: 'key', type: 'Physical evidence',
        desc: 'A hotel master keycard found under the bed in Room 703. It opens every room on the seventh floor.',
        tells: 'The manager had access to the room and left his card behind. This was not a stranger in the corridor; it was the man with the keys.'
      },
      'safe-notebook': {
        name: 'Mara’s notebook', caption: 'Names, rooms, cash', icon: 'note', type: 'Written evidence',
        desc: 'A slim notebook filled with names, room numbers, and payments. The source is referred to only as “Grey”. The last page: “R — 23:30 — CHAMPAGNE.”',
        tells: 'Mara was building a case against the hotel. The source knew the operation well enough to name rooms.'
      },
      'usb-stick': {
        name: 'The USB stick', caption: 'A folder called MERIDIAN', icon: 'usb', type: 'Digital evidence',
        desc: 'A black USB stick in the safe. It contains a folder called MERIDIAN: guest lists, room records, and a subfolder of video files.',
        tells: 'The story was not only in her head or her laptop. Mara kept a copy where a hotel manager with a master key could not find it.'
      },
      'desk-note': {
        name: 'The torn notepad', caption: '“R — 23:30 — CHAMPAGNE”', icon: 'note', type: 'Written evidence',
        desc: 'The indentation of a torn page: “R — 23:30 — CHAMPAGNE — ROOM 703.” A room-service menu is folded as a bookmark at the hotel’s centenary article.',
        tells: 'Mara expected Rook at half past eleven. She was not ambushed; she was waiting for a meeting she thought she controlled.'
      },
      'cctv-grainy': {
        name: 'The lobby camera', caption: '23:32 and 23:41', icon: 'cctv', type: 'Surveillance',
        desc: 'A man in hotel uniform pushes an empty laundry cart toward the lifts at 23:32, then a heavy one through the service door at 23:41.',
        tells: 'The cart is the exit. Whatever left Room 703 did not use the lobby door.'
      },
      'cctv-rook': {
        name: 'Rook in the reflection', caption: 'Service door · brass plate', icon: 'cctv', type: 'Surveillance',
        desc: 'Enhanced footage shows Desmond Rook in a hotel uniform over his suit, pushing the cart, with a master keycard in his hand.',
        tells: 'The manager was not doing accounts. He was moving a body through his own hotel in a laundry cart.'
      },
      'guest-list': {
        name: 'The guest register', caption: 'Room 705 · Mr A. Grey, cash', icon: 'ledger', type: 'Records',
        desc: 'Room 705 was booked for one night, paid in cash, with a placeholder passport number and an unreadable signature. It was serviced twice on Tuesday, both times by D.R.',
        tells: 'Room 705 is a stage, not a room. The manager was servicing it himself, before and after the murder.'
      },
      'laundry-manifest': {
        name: 'The laundry manifest', caption: '“1 x duvet, stained — DISPOSED”', icon: 'note', type: 'Records',
        desc: 'The seventh-floor manifest records a stained duvet marked DISPOSED in a different pen. A woman’s watch is wedged in the chute, stopped at 23:47.',
        tells: 'The body and the bedding left by the service route. The watch fixes the time of the attack within six minutes of the cart’s departure.'
      },
      'blood-sheet': {
        name: 'The stained sheet', caption: 'Laundry tag 703 · hand-shaped stain', icon: 'blood', type: 'Physical evidence',
        desc: 'A bleached sheet with a hand-shaped stain and a laundry tag numbered 703. Rook brought it down himself and called it a personal matter.',
        tells: 'The sheet ties Room 703 to the laundry cart and to the manager’s own hands.'
      },
      'mara-phone': {
        name: 'Mara’s phone', caption: 'Cracked case · 12% battery', icon: 'phone', type: 'Device',
        desc: 'A phone found face down behind a roof air-conditioning unit. The screen is cracked, the case is monogrammed M.V., and the emergency voicemail is still accessible.',
        tells: 'Mara went to the roof alive, with her phone. She did not leave it there by accident.'
      },
      'roof-log': {
        name: 'The roof keypad log', caption: '23:36 in · 00:02 out', icon: 'keypad', type: 'Records',
        desc: 'The roof door log shows the manager’s master code entering at 23:36 and leaving at 00:02. The rooftop camera was disabled with wire cutters.',
        tells: 'Rook went to the roof before Mara’s watch stopped and left after. The camera was disabled by someone who knew exactly where it pointed.'
      },
      'roof-voicemail': {
        name: 'The 23:38 voicemail', caption: '“Seven-oh-three. Bring the notebook.”', icon: 'audio', type: 'Audio evidence',
        desc: 'Under the wind: Rook ordering Mara to bring the notebook to the roof, alone, or he would publish a tape.',
        tells: 'The meeting was Rook’s idea, on Rook’s roof, using Rook’s leverage. Mara went because she thought the story protected her.'
      },
      'article-draft': {
        name: 'MERIDIAN_FINAL', caption: '9,012 words · scheduled 09:00', icon: 'news', type: 'Document',
        desc: 'Mara’s finished story, queued to publish on Wednesday morning. It names fourteen guests, describes the hidden cameras, and ends: “The Meridian does not sell rooms. It sells the people in them.”',
        tells: 'The motive was not to kill a story. The story was already out of Rook’s reach. The murder was about a person, not a file.'
      },
      'source-grey': {
        name: 'The Grey interview', caption: 'Four hours of testimony', icon: 'audio', type: 'Digital evidence',
        desc: 'Mara’s source describes cameras behind mirrors, tapes kept in the manager’s office, and guests who paid in cash and never appeared on the register.',
        tells: 'The blackmail operation is real and run from the manager’s office. The source is close enough to know where the tapes are kept.'
      },
      'grey-interview': {
        name: 'Room 705 photograph', caption: 'Camera behind the mirror', icon: 'photo', type: 'Photograph',
        desc: 'A photograph of Room 705: a camera lens set into the mirror frame, a champagne bottle on the table, and a man asleep on the bed.',
        tells: 'The “Mr Grey” who booked 705 was not a guest. The room was fitted for filming, and the manager serviced it himself.'
      },
      'scheduled-story': {
        name: 'The scheduled upload', caption: 'Cannot be cancelled', icon: 'news', type: 'Digital evidence',
        desc: 'The story is queued to publish at 09:00 Wednesday and cannot be cancelled from Mara’s laptop. Her last note: “Do not stop the story.”',
        tells: 'Rook killed Mara to stop the publication. He was already too late, and he did not know it.'
      },
      'rook-alibi': {
        name: 'Rook’s account', caption: '“Doing the accounts”', icon: 'note', type: 'Alibi',
        desc: 'Rook claims he was in his office until midnight. The office light went off at 00:40; the service door camera places him with the cart at 23:41.',
        tells: 'The alibi is a sentence, not a fact. The hotel’s own cameras contradict it.'
      },
      'rook-deflect': {
        name: '“Ask my staff”', caption: 'Rook on the master keycard', icon: 'note', type: 'Interview',
        desc: 'Rook dismisses the master keycard as a housekeeping spare and suggests the fault lies with his staff.',
        tells: 'He is willing to sacrifice an employee to explain his own card. That is not innocence; it is management.'
      },
      'rook-panic': {
        name: 'The bead of sweat', caption: 'Rook on the laundry cart', icon: 'eye', type: 'Interview',
        desc: 'Confronted with the footage, Rook claims he helps with linen and threatens to call his lawyer. He does not deny pushing the cart.',
        tells: 'He has placed himself in the service corridor at the exact time the cart left with the body.'
      },
      'rook-admission': {
        name: '“Insurance”', caption: 'Rook on the tapes', icon: 'audio', type: 'Statement',
        desc: 'Rook admits keeping tapes of guests as “insurance” and says Mara was going to ruin all of it for nine thousand words.',
        tells: 'Motive and operation are both on the record. The only thing left is the method, and the method is in the laundry chute.'
      },
      'ines-statement': {
        name: 'Ines’s account', caption: 'The wet carpet', icon: 'note', type: 'Witness statement',
        desc: 'Ines was told not to clean 703. She found the carpet wet and the guest’s keycard still active. Rook called it a leak.',
        tells: 'The cleaning was ordered before the room was reported missing. Rook knew what was on the carpet.'
      },
      'ines-fear': {
        name: 'The threat to Ines', caption: '“I have a daughter.”', icon: 'note', type: 'Witness statement',
        desc: 'Rook threatened to fire Ines for logging the stained duvet. She logged it anyway.',
        tells: 'Rook was managing the paper trail, not the crime. He missed the one record a housekeeper kept out of habit.'
      },
      'ines-roof': {
        name: 'The argument on the roof', caption: '23:30 · two voices', icon: 'ear', type: 'Witness statement',
        desc: 'Ines heard Mara argue with a man on the roof: “You cannot keep me in a room.” He replied: “I am not keeping you in a room.”',
        tells: 'Mara was alive on the roof at 23:30 and was not planning to stay. Rook’s reply is the sound of a man who has already chosen another way to keep her quiet.'
      },
      'frost-statement': {
        name: 'Frost on the story', caption: 'Blackmail · cameras · tapes', icon: 'note', type: 'Witness statement',
        desc: 'Mara’s editor describes a source inside the Meridian, hidden cameras, and a manager running a blackmail operation on important guests.',
        tells: 'The story is big enough to justify murder. The source is close enough to be dangerous.'
      },
      'frost-email': {
        name: 'The 23:46 email', caption: '“If I go quiet, publish anyway.”', icon: 'mail', type: 'Digital evidence',
        desc: 'Mara filed the story at 23:44 and told Frost to publish if she went quiet. He thought she was being dramatic.',
        tells: 'Mara knew the risk and took it. The story was already finished before she went to the roof.'
      }
    },
    solution: {
      minEvidence: 9,
      questions: [
        {
          q: 'Who is responsible for Mara Voss’s disappearance?',
          options: [
            { t: 'Desmond Rook — the hotel manager', v: 'rook' },
            { t: 'Ines Bard — the housekeeper who cleaned the room', v: 'ines' },
            { t: 'Lionel Frost — her editor, who knew where she was', v: 'frost' },
            { t: 'Mara staged her own disappearance to protect her source', v: 'staged' }
          ],
          answer: 'rook'
        },
        {
          q: 'How was the body removed from a locked room?',
          options: [
            { t: 'Through the window on a maintenance rope', v: 'window' },
            { t: 'In the laundry cart, down the service lift', v: 'cart' },
            { t: 'In a suitcase carried out by an unknown guest', v: 'suitcase' },
            { t: 'The body is still hidden inside Room 703', v: 'hidden' }
          ],
          answer: 'cart'
        },
        {
          q: 'What was Rook trying to protect?',
          options: [
            { t: 'A blackmail operation using hidden cameras in guest rooms', v: 'blackmail' },
            { t: 'A gambling ring in the hotel basement', v: 'gambling' },
            { t: 'An affair with a guest', v: 'affair' },
            { t: 'The hotel’s insurance claim for a fire', v: 'insurance' }
          ],
          answer: 'blackmail'
        },
        {
          q: 'Which evidence breaks the case?',
          options: [
            { t: 'Mara’s notebook and the room safe', v: 'notebook' },
            { t: 'The laundry manifest and the enhanced cart footage', v: 'laundry' },
            { t: 'The guest register and the cash booking', v: 'register' },
            { t: 'The editor’s memory of the email', v: 'email' }
          ],
          answer: 'laundry'
        }
      ],
      verdict: {
        who: 'Desmond Rook, 54 — manager of the Meridian Hotel',
        whoDesc: 'was arrested in the hotel laundry with a bloodstained cuff and a master keycard in his pocket.',
        how: 'He met Mara Voss on the roof, struck her during an argument, and moved her body down the service lift in a laundry cart. He then returned to Room 703, shampooed the carpet, changed the bedding, and logged the duvet as “disposed”.',
        why: 'Mara had four hours of testimony from a source inside the hotel and a story ready to publish about the hidden cameras and the guests Rook used as leverage. He killed her to keep the operation alive.',
        key: 'The laundry manifest. Rook controlled the guest register, the room records, and the story he told the police — but he could not control a housekeeper who wrote everything down, or the watch stopped at 23:47 in the bottom of the chute.'
      },
      reveal: [
        'The Meridian sold more than rooms. Behind the mirrors in Rooms 701 to 705, Desmond Rook had installed cameras. Important guests were filmed, catalogued, and reminded, gently, that the hotel valued their privacy — and would be happy to keep valuing it, for a fee. The rooms that appeared on the register were not always the rooms that existed. Room 705 had no guest at all. It had a set.',
        'Mara Voss checked in on Monday with a suitcase, a laptop, and four hours of testimony from a source Rook had not yet identified. She filed her story at 23:44 and went to the roof at Rook’s invitation. He asked for the notebook. She refused. He asked again, with his hand already raised.',
        'The attack was not planned, but the cleanup was. Rook had spent years moving things through the Meridian without being seen: cash, guests, tapes, people. He put Mara in the laundry cart at 23:41, took her down the service lift, and logged the stained duvet himself. He shampooed the carpet. He changed the sheets. He told the housekeeper the guest had checked out early.',
        'He made one mistake, and it was the one he could not manage: the housekeeper wrote everything down. The duvet. The wet carpet. The master keycard. The watch in the chute, stopped at 23:47. Rook had built a hotel where nobody saw anything, and he had forgotten that the people who clean it see everything.',
        'Mara’s story published at nine o’clock on Wednesday morning, exactly as scheduled. The Meridian’s phones rang for three hours. By noon, the hotel was surrounded. By evening, the tapes in Rook’s office had been catalogued, and the guests on them had begun, very quietly, to make their own arrangements.',
        'Desmond Rook is currently awaiting trial. He has asked, twice, whether the hotel will be able to keep his suite available. The Meridian has declined.'
      ],
      quote: 'The Meridian does not sell rooms. It sells the people in them.',
      twist: 'Rook did not need to kill Mara to stop the story. She had already scheduled it, and the schedule could not be cancelled. He killed her for a file that was already beyond his reach — and in doing so gave the story the one thing it had been missing: a body.'
    }
  });

})();
