/* ============================================================
   CASE 26 - LAST TRANSMISSION
   Undercover-gated case. Deploy the relay operation first.
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c26', num: 26,
    title: 'Last Transmission',
    subtitle: 'The relay went dead at 02:14. Elsa Vane went with it.',
    difficulty: 4, est: '35-45 min',
    cover: { kind: 'lighthouse', mood: 'storm' },
    missionId: 'm-relay',
    facts: [
      { k: 'Victim', v: 'Elsa Vane, 38 - relief radio operator, North Cliff relay' },
      { k: 'Scene', v: 'North Cliff relay station and the causeway channel' },
      { k: 'Found', v: 'Saturday, 06:12 - by a lobster boat' },
      { k: 'Official cause', v: 'Drowning after a fall from the causeway' }
    ],
    briefing: [
      "The North Cliff relay is supposed to be decommissioned. It still has power, still has an aerial, and at 02:14 on Saturday it transmitted for eleven seconds on a frequency nobody uses any more. The operator on duty was Elsa Vane.",
      "At 06:12 a lobster boat found her on the causeway stones, still in her radio jacket. The tide had been over the road for three hours. The post-mortem says drowning, but there is no seawater in her lungs and no water in her stomach.",
      "The relay log says the final transmission carried an origin bearing of 312 degrees. That is not the relay. That is a mooring in the harbour. Somebody has been using a dead station to guide live cargo."
    ],
    opening: 'The relay room is cold enough to see your breath. A red carrier lamp blinks over a console furred with salt, and the spare handset cradle is empty.',
    objectives: [
      'Establish how Elsa died and why her body was on the causeway.',
      'Recover the final eleven-second transmission.',
      'Decode the tide cipher and fix the origin bearing.',
      'Prove who used the relay to guide the Morrow.'
    ],
    locations: [
      {
        id: 'relay', name: 'North Cliff Relay', short: 'Relay', time: '07:20',
        art: { kind: 'lighthouse', mood: 'storm' },
        intro: 'A concrete box bolted to the cliff, smelling of ozone and old coffee. The console is alive. The chair is tipped back. A spare handset cradle on the wall is empty.',
        actions: [
          { id: 'body', label: 'Examine the relay room', icon: 'blood', hotspot: { x: 50, y: 56 },
            desc: 'The tipped chair, the salt, the empty cradle',
            text: [
              "The chair is tipped away from the console, not toward it. A coffee mug has fallen and dried in a long brown streak that points at the door.",
              "There is a small dark stain on the floor by the threshold, wiped once and missed at the edge. The salt around it has been disturbed.",
              "The spare handset cradle is empty. Its cable has been cut clean, not unplugged."
            ],
            gives: ['c26_body', 'c26_cradle'],
            hint: 'She was facing the door when the chair went over. The missing handset matters more than the coffee.'
          },
          { id: 'console', label: 'Open the relay console', icon: 'terminal', puzzle: 'relay-term',
            desc: 'Archive, transmit log, staff list',
            gives: ['c26_log'],
            hint: 'The tide code is painted on the wall: MORROW. Elsa used it for everything.'
          },
          { id: 'cipher', label: 'Read the paper taped under the desk', icon: 'cipher', puzzle: 'bearing-cipher',
            desc: 'A five-letter group and a channel number',
            gives: ['c26_cipher'],
            hint: 'Try a shift of seven. The first word is a boat.'
          }
        ]
      },
      {
        id: 'causeway', name: 'The Causeway', short: 'Causeway', time: '08:10',
        art: { kind: 'docks', mood: 'storm' },
        requires: ['c26_body'],
        intro: 'A narrow road of wet stone with the sea on both sides. Elsa was found against the third marker, one boot missing. The tide is already coming back over the lower slabs.',
        actions: [
          { id: 'tide', label: 'Work the tide timing', icon: 'clock', puzzle: 'tide-math',
            desc: 'When could a body have been placed here?',
            gives: ['c26_tide'],
            hint: 'The causeway is impassable from 40 minutes after high water. Count forward, then compare with 06:12.'
          },
          { id: 'fisher', label: 'Question the lobster boat skipper', icon: 'user',
            desc: 'He saw a launch with no lights',
            text: [
              "The skipper, Tam Rennie, was setting pots at half two when a grey harbour launch came out of the channel without running lights. It turned north, toward the old relay.",
              "He knows every boat in the harbour. He says this one sat low, as if it carried more than ballast, and its name was painted over.",
              "At six he found Elsa. He did not move her. He called the harbour office first, and the harbour master told him to wait for the tide."
            ],
            gives: ['c26_fisher'],
            hint: 'A low grey launch, no lights, at half two. Who owns a harbour launch?'
          },
          { id: 'boot', label: 'Recover the missing boot', icon: 'footprint',
            desc: 'Caught between the stones',
            text: [
              "The boot is wedged under the third marker, sole up. There is harbour mud in the tread, dark and oily, not the clean sand of the causeway.",
              "The laces are still tied. Nobody loses a tied boot by falling.",
              "A strand of grey rope is caught in the heel, the kind used for mooring small launches."
            ],
            gives: ['c26_boot'],
            hint: 'The mud is harbour mud. She was in the water on the other side of the harbour first.'
          }
        ]
      },
      {
        id: 'harbour', name: 'Harbour Office', short: 'Harbour', time: '09:00',
        art: { kind: 'docks', mood: 'cold' },
        requires: ['c26_log'],
        intro: 'A portacabin above the fish quay, full of tide charts and the smell of diesel. Colm Tarn, the harbour master, is making tea for two before you have knocked.',
        actions: [
          { id: 'colm', label: 'Question Colm Tarn', icon: 'user', suspect: 'colm',
            desc: 'Harbour master - controls the moorings' },
          { id: 'ledger', label: 'Read the harbour ledger', icon: 'ledger',
            desc: 'The Morrow - ballast only',
            text: [
              "The Morrow is logged out at 02:20 and back at 04:55, cargo BALLAST ONLY. Her draught is recorded at 2.4 metres, which is a loaded boat, not an empty one.",
              "The cargo column for the same run has been overwritten with correcting fluid. Under the fluid, faintly: SIX CRATES - CHANNEL THREE.",
              "The ledger is in Colm's hand. He signs every entry on the page."
            ],
            gives: ['c26_manifest'],
            hint: 'A ballast-only run does not sit two and a half metres deep.'
          },
          { id: 'tape', label: 'Play the final transmission', icon: 'ear', puzzle: 'last-audio',
            desc: 'Eleven seconds - live or recorded?',
            gives: ['c26_tape'],
            hint: 'Listen for the relay ident. It repeats underneath her voice.'
          }
        ]
      },
      {
        id: 'boathouse', name: 'The Old Boathouse', short: 'Boathouse', time: '10:15',
        art: { kind: 'docks', mood: 'storm' },
        requires: ['c26_manifest'],
        intro: 'A tar-paper shed at the end of the private mooring. The Morrow is tied outside, her name half painted over. Inside there is a heater, a kettle and a locker with a new padlock.',
        actions: [
          { id: 'locker', label: 'Open the boathouse locker', icon: 'lock', puzzle: 'locker-pin',
            desc: 'Four-digit padlock',
            gives: ['c26_locker'],
            hint: 'The Morrow was logged out at 02:20. She was logged back at 04:55.'
          },
          { id: 'nessa', label: 'Question Nessa Tarn', icon: 'user', suspect: 'nessa',
            desc: "Colm's daughter - deckhand on the ferry" },
          { id: 'mooring', label: 'Examine the mooring cleat', icon: 'rope',
            desc: 'Grey paint, fresh rope burn',
            text: [
              "The cleat is scored with fresh rope burn and flecked with grey paint that matches the launch Tam saw. The wear is recent, from a line pulled hard against the tide.",
              "A second, older mooring ring sits unused. The Morrow has been moved from it and tied here, close to the shed.",
              "Under the cleat, half in the water, is a folded tide table with three dates circled. Saturday is the third."
            ],
            gives: ['c26_mooring'],
            hint: 'The boat moved in the dark and was tied where it could be unloaded out of sight.'
          }
        ]
      }
    ],
    puzzles: {
      'relay-term': {
        type: 'terminal', title: 'Relay Console', subtitle: 'North Cliff archive', icon: 'terminal',
        user: 'evane', host: 'northcliff-relay', password: 'morrow',
        intro: 'Relay maintenance console. Type help for commands.',
        banner: 'CARRIER ACTIVE - 02:14 BURST - CHANNEL UNLISTED',
        files: [
          { name: 'archive.log', body: '01:58 carrier stable<br>02:14 BURST TX - 11s - ORIGIN BEARING 312<br>02:14 audio buffer sealed - operator key<br>02:19 POWER DOWN - manual - console key<br><span class="r">02:19 door contact OPEN - no exit logged</span>' },
          { name: 'transmit.log', body: '<b>LAST TX</b><br>Bearing: <b>312 degrees</b><br>Duration: <b>11 seconds</b><br>Content: <span class="g">ARCHIVE LOOP + LIVE VOICE</span><br><span class="d">Archive loop repeats every 4s. Voice layer recorded over it.</span>' },
          { name: 'staff.txt', body: '<b>ELSA VANE</b> - relief operator, console key<br><b>FENN BARLOW</b> - maintenance, no transmit authority<br><b>C. TARN</b> - harbour master, mooring access only<br><span class="d">Station decommissioned 14 months ago. Power retained for coastal monitoring.</span>' }
        ],
        hintText: 'The password is the tide code painted on the wall. Try MORROW.',
        success: 'The archive opens. The final transmission ran for eleven seconds, carried a live voice over a looping archive, and the console was shut down manually at 02:19.',
        gives: ['c26_log'], flags: ['relayOpen'],
        short: 'The relay log is open.',
        log: 'The relay log records an eleven-second burst at 02:14 on bearing 312, then a manual shutdown at 02:19 and an opened door with no exit.'
      },
      'bearing-cipher': {
        type: 'cipher', title: 'Tide Cipher', subtitle: 'Paper under the desk', icon: 'cipher',
        prompt: 'A strip of paper is taped beneath the desk. Turn the wheel until the group resolves into a boat and a channel.',
        plain: 'MORROW TIDE THREE', shift: 7,
        hintText: 'Shift of seven. It starts with the boat that is tied outside.',
        success: 'The paper reads MORROW TIDE THREE. The relay was transmitting on the harbour master\'s private channel.',
        gives: ['c26_cipher'], flags: ['cipherRead'],
        short: 'The cipher names the Morrow and channel three.',
        log: 'The paper decodes to MORROW TIDE THREE - the harbour master\'s boat and his private radio channel.'
      },
      'tide-math': {
        type: 'math', title: 'Tide Window', subtitle: 'When was the body placed?', icon: 'clock',
        info: 'High water is 02:00. The causeway is impassable from 40 minutes after high water until 3 hours 20 minutes after it. Elsa was found at 06:12.',
        placeholder: 'minutes', unit: 'min',
        answer: 52, tolerance: 0,
        hintText: 'High water 02:00. Impassable starts 02:40 and ends 05:20. How long between 05:20 and 06:12?',
        success: 'The causeway reopened at 05:20. Elsa was found fifty-two minutes later. She could not have fallen in at 02:14 - the road was already under water.',
        gives: ['c26_tide'], flags: ['tideDone'],
        short: 'The causeway was already flooded at 02:14.',
        log: 'The tide table proves the causeway was under water from 02:40. Elsa was placed there after the water receded, not drowned at the relay.'
      },
      'last-audio': {
        type: 'audio', title: 'The Final Eleven Seconds', subtitle: 'Live or looped?', icon: 'ear',
        prompt: 'Play the last transmission. Elsa speaks for eleven seconds, but something underneath her voice is not live.',
        pattern: [440, 0, 330, 440, 0, 550, 330],
        waveform: 'Her voice begins mid-sentence and ends mid-sentence. Beneath it, the relay ident repeats on a four-second clock, perfectly regular, three times.',
        options: [
          { t: 'A live broadcast from the relay microphone', v: 'live' },
          { t: 'A recorded archive loop with Elsa\'s voice layered over it', v: 'loop' },
          { t: 'A carrier tone with no voice at all', v: 'tone' },
          { t: 'A second operator imitating Elsa', v: 'double' }
        ],
        answer: 'loop',
        wrong: 'Count the ident. It lands exactly every four seconds, even through her sentence. Live radio does not keep time like a machine.',
        hintText: 'The ident repeats on a fixed clock under her voice. That is a loop.',
        success: 'The transmission is a loop with a live voice cut over it. Elsa set a dead-man switch. She knew she might not be alive to press send.',
        gives: ['c26_tape'], flags: ['tapeHeard'],
        short: 'Elsa set a dead-man transmission.',
        log: 'The final transmission is an archive loop with Elsa\'s voice layered on top. She recorded it in advance, knowing she might not survive.'
      },
      'locker-pin': {
        type: 'keypad', title: 'Boathouse Locker', subtitle: 'Four-digit padlock', icon: 'keypad',
        deviceLabel: 'BOATHOUSE LOCKER - PRIVATE', length: 4, code: '0220',
        prompt: 'The padlock is cheap and new. The harbour ledger gives the Morrow\'s departure time on the night Elsa died. Four digits.',
        hintText: 'The Morrow logged out at 02:20 and back at 04:55. Use the departure time.',
        success: 'The locker opens on a spare relay handset, a tide table and an envelope of cash.',
        gives: ['c26_locker'], flags: ['lockerOpen'],
        short: 'The missing relay handset is in the locker.',
        log: 'The boathouse locker holds the missing relay handset, a marked tide table and £6,000 in used notes.'
      }
    },
    clues: {
      'c26_body': { name: 'No water in the lungs', caption: 'Dry airway - head wound - placed after death', icon: 'blood', type: 'Forensic observation',
        desc: 'There is no seawater in the lungs or stomach. A blunt wound above the left ear was made before death. Elsa did not drown in the causeway channel.',
        tells: 'She was killed elsewhere and placed on the causeway when the tide allowed it.' },
      'c26_cradle': { name: 'Empty handset cradle', caption: 'Cable cut clean - handset missing', icon: 'sound', type: 'Physical evidence',
        desc: 'The spare relay handset is missing and its cable has been cut, not unplugged. A dark stain sits by the door.',
        tells: 'The murder weapon came from the relay room. The killer took it away.' },
      'c26_log': { name: 'Relay archive', caption: '02:14 burst - bearing 312 - manual shutdown 02:19', icon: 'chart', type: 'Technical record',
        desc: 'An eleven-second burst on bearing 312 at 02:14, then a manual power-down at 02:19. The door opened but no exit was logged.',
        tells: 'Someone shut the station down by hand and left without logging out.' },
      'c26_cipher': { name: 'Tide cipher', caption: 'MORROW TIDE THREE', icon: 'cipher', type: 'Decoded message',
        desc: 'A strip of paper under the desk decodes to MORROW TIDE THREE: the harbour master\'s boat and his private channel.',
        tells: 'The relay was transmitting on Colm Tarn\'s channel, not a coastguard frequency.' },
      'c26_tide': { name: 'Tide calculation', caption: 'Causeway under water 02:40 to 05:20', icon: 'clock', type: 'Reconstruction',
        desc: 'High water was 02:00. The causeway flooded at 02:40 and reopened at 05:20. Elsa was found at 06:12.',
        tells: 'Her body was placed on the stones after 05:20. The 02:14 fall is impossible.' },
      'c26_fisher': { name: "Tam's statement", caption: 'Grey launch - no lights - low in the water', icon: 'eye', type: 'Witness statement',
        desc: 'The lobster skipper saw a grey harbour launch leave the channel at 02:30 without lights, sitting low as if loaded, its name painted over.',
        tells: 'The Morrow was moving cargo at the time Elsa died.' },
      'c26_boot': { name: 'Recovered boot', caption: 'Harbour mud - tied lace - mooring rope', icon: 'footprint', type: 'Physical evidence',
        desc: 'Elsa\'s boot was wedged under the marker with harbour mud in the tread, the lace still tied, and a strand of grey mooring rope in the heel.',
        tells: 'She was in the harbour water and on a moored launch before she was left on the causeway.' },
      'c26_manifest': { name: 'Harbour ledger', caption: 'Ballast only - six crates - channel three', icon: 'ledger', type: 'Document',
        desc: 'The Morrow logged a ballast-only run at 02:20, but her draught shows a loaded boat. Under correcting fluid: SIX CRATES - CHANNEL THREE.',
        tells: 'Colm falsified the manifest. The boat carried cargo he did not want recorded.' },
      'c26_tape': { name: 'Dead-man transmission', caption: 'Archive loop - live voice - names channel three', icon: 'usb', type: 'Audio evidence',
        desc: 'Elsa\'s final transmission layers her voice over a looping relay ident and names the harbour master\'s channel. It was prepared in advance.',
        tells: 'Elsa knew she was in danger and left a message that would transmit without her.' },
      'c26_locker': { name: 'Boathouse evidence', caption: 'Blood in the handset grille - marked tide table', icon: 'lockbox', type: 'Physical evidence',
        desc: 'The missing relay handset, blood dried in its grille, a tide table with Saturday circled, and £6,000 in used notes.',
        tells: 'The weapon and the payment were kept together. The killer expected the locker to stay private.' },
      'relay_log': { name: 'Undercover relay log', caption: 'Copied from the station - purge order', icon: 'usb', type: 'Undercover evidence',
        desc: 'The operation copied the relay maintenance log before the coastguard sealed the station. It shows the purge order and the channel-three patch.',
        tells: 'The relay was being run as a private beacon by someone with harbour authority.' },
      'relay_bearing': { name: 'Origin bearing plot', caption: '312 degrees - private mooring', icon: 'chart', type: 'Undercover evidence',
        desc: 'The operation plotted the final transmission bearing at 312 degrees. The line runs directly to the Morrow\'s private mooring.',
        tells: 'The transmission was guiding a boat into Colm Tarn\'s mooring, not calling for help.' },
      'c26_mooring': { name: 'Mooring cleat', caption: 'Fresh grey paint - rope burn - third tide', icon: 'rope', type: 'Physical evidence',
        desc: 'The cleat has fresh grey paint transfer and rope burn matching the launch Tam saw. A tide table beneath it circles Saturday as the third date.',
        tells: 'The Morrow was moved to the private mooring for a night run on Saturday.' },
      'c26_nessa': { name: "Nessa's angry message", caption: 'Threat about the boat - not about Elsa', icon: 'phone', type: 'Red herring',
        desc: 'Nessa texted Elsa: Keep away from my father\'s boat or I will put you in the water. She was crewing the ferry from midnight to six.',
        tells: 'Nessa was angry about the boat, not the woman. Her ferry log clears her.' }
    },
    suspects: [
      {
        id: 'colm', name: 'Colm Tarn', role: 'Harbour master - owns the mooring and the Morrow', location: 'harbour', locationName: 'Harbour office',
        tag: 'Primary suspect', portrait: { seed: 'colm-tarn', hair: 'short', hairColor: '#6a5a4a', skin: 1, expression: 'guarded', collar: 'coat' },
        intro: 'Colm is broad, weathered and polite in the way of a man used to being obeyed by weather. He has already made you tea and already decided what you will be told.',
        questions: [
          { q: 'Where were you at two in the morning?', a: 'In bed. The harbour is quiet at that hour. I logged the Morrow out in the evening and that was that.' },
          { q: 'Why does the ledger show six crates under the correcting fluid?', a: 'A clerical error. Ballast, crates, it is all the same paperwork. The boat was empty.', requires: ['c26_manifest'], gives: ['c26_manifest'],
            follow: 'Her draught was 2.4 metres. An empty boat does not sit that low.' },
          { q: 'Who else uses channel three?', a: 'Nobody. It is an old harbour channel. Decommissioned, like the relay.', requires: ['c26_cipher'], gives: ['c26_cipher'],
            follow: 'Elsa\'s cipher names channel three and his boat. He does not ask what the cipher says.' },
          { q: 'Why is there blood in the relay handset?', a: 'I have never held that handset. I do not go up to the relay. Fenn does the maintenance.', requires: ['c26_locker'], gives: ['c26_locker'],
            follow: 'The locker is on his private mooring. The padlock code was the Morrow\'s departure time.' },
          { q: 'What was Elsa going to report?', a: 'I do not know. She was a relief operator. She came and went.', requires: ['c26_tape'], gives: ['c26_tape'],
            follow: 'The recording says she named his channel. He was the report.' }
        ],
        after: 'He asks whether the coastguard has been told. He does not ask how Elsa died.'
      },
      {
        id: 'nessa', name: 'Nessa Tarn', role: "Colm's daughter - ferry deckhand", location: 'boathouse', locationName: 'Old boathouse',
        tag: 'Red herring', portrait: { seed: 'nessa-tarn', hair: 'long', hairColor: '#2a1a12', skin: 2, expression: 'angry', collar: 'jacket' },
        intro: 'Nessa is still in her ferry fleece, salt in her hair and a chip on her shoulder the size of the harbour wall. She hated Elsa and does not pretend otherwise.',
        questions: [
          { q: 'Did you threaten Elsa?', a: 'I told her to keep away from the boat. My father lets her use it like a taxi. I did not threaten her life, I threatened her parking.', gives: ['c26_nessa'],
            follow: 'The message is about mooring rights. It is ugly, not lethal.' },
          { q: 'Where were you at two?', a: 'On the ferry. Midnight to six. Ask the captain, ask the ticket log, ask the forty passengers who could not sleep.', requires: ['c26_nessa'], gives: ['c26_nessa'],
            follow: 'The ferry log puts her on the water, three miles from the causeway, all night.' }
        ]
      },
      {
        id: 'fenn', name: 'Fenn Barlow', role: 'Relay maintenance - found the console live', location: 'relay', locationName: 'Relay room',
        tag: 'Witness', portrait: { seed: 'fenn-barlow', hair: 'buzz', hairColor: '#8a8a82', skin: 3, expression: 'tired', collar: 'coat' },
        intro: 'Fenn has maintained the dead relay for fourteen months because nobody told him to stop. He is methodical, tired, and furious that his station has been used.',
        questions: [
          { q: 'When did you last service the relay?', a: 'Thursday. I shut the console down and locked it. When I came in this morning the power was on and the door was open.', gives: ['c26_log'],
            follow: 'The log records a manual power-down at 02:19, using a console key. Elsa had one. Colm signed for the spare.' },
          { q: 'Who has a console key?', a: 'Me and Elsa. The harbour office holds a spare for emergencies. Colm signed for it in March and never gave it back.', requires: ['c26_log'], gives: ['c26_manifest'],
            follow: 'The spare key is in the harbour office ledger, signed out to C. Tarn.' },
          { q: 'Could the relay transmit on channel three?', a: 'It could transmit on anything if you wired it. The aerial is still live. Somebody has been using it as a beacon.', requires: ['c26_cipher'],
            follow: 'The bearing points at the private mooring. The relay was guiding boats in.' }
        ]
      }
    ],
    timeline: [
      { time: '01:58', text: 'Relay carrier stabilises on an unlisted channel.' },
      { time: '02:14', text: 'Eleven-second burst on bearing 312. Elsa\'s voice is inside it.' },
      { time: '02:19', text: 'Relay console powered down by hand. Door opened, no exit logged.' },
      { time: '02:20', text: 'The Morrow logs out of harbour, supposedly in ballast.' },
      { time: '02:30', text: 'Tam Rennie sees a grey launch leave without lights, low in the water.' },
      { time: '02:40', text: 'Causeway floods. Nobody can stand on the stones.' },
      { time: '04:55', text: 'The Morrow logs back in. Six crates are unloaded at the private mooring.' },
      { time: '05:20', text: 'Causeway reopens.' },
      { time: '06:12', text: 'Tam finds Elsa on the third marker.' }
    ],
    links: [
      { a: 'c26_locker', b: 'colm', note: 'The missing handset is in Colm\'s private boathouse locker.' },
      { a: 'c26_manifest', b: 'colm', note: 'The altered manifest is in Colm\'s hand.' },
      { a: 'c26_cipher', b: 'colm', note: 'The cipher names his boat and his private channel.' },
      { a: 'c26_mooring', b: 'colm', note: 'The Morrow moved to his private mooring for the night run.' },
      { a: 'c26_fisher', b: 'colm', note: 'A grey harbour launch matches the Morrow.' }
    ],
    forensics: {
      prompt: 'Two samples from the boathouse. Match each to its reference.',
      samples: [
        { id: 'blood', type: 'BLOOD', label: 'Handset grille - dried', mark: 'human, matches Elsa Vane' },
        { id: 'paint', type: 'PAINT', label: 'Mooring cleat transfer', mark: 'grey marine enamel' }
      ],
      candidates: [
        { id: 'morrow', label: 'The Morrow - grey harbour launch' },
        { id: 'ferry', label: 'The passenger ferry' },
        { id: 'relay', label: 'Relay station casing' }
      ],
      answer: { blood: 'morrow', paint: 'morrow' },
      success: 'The blood is Elsa\'s. The paint is the Morrow\'s grey enamel. The handset was carried on the boat that moved the crates.',
      gives: ['c26_locker']
    },
    documents: [
      { id: 'ledger', title: 'Harbour ledger - night of the death', sub: 'Entries in Colm Tarn\'s hand', body: '<div class="doc-sheet"><b>PORT OF NORTH CLIFF - MOVEMENTS</b><br><br><b>MORROW</b> - out 02:20 - in 04:55<br>Cargo: <span class="g">BALLAST ONLY</span><br>Draught: <b>2.4 m</b><br>Master: <b>C. TARN</b><br><br><span class="d">Cargo overwritten in correcting fluid. Traces: SIX CRATES - CHANNEL THREE.</span></div>',
        question: 'What is wrong with the entry?', options: [
          { t: 'A ballast-only boat would not sit 2.4 metres deep', v: 'a' },
          { t: 'The Morrow did not leave harbour that night', v: 'b' },
          { t: 'Colm Tarn was not the master', v: 'c' }
        ],
        answer: 0, gives: ['c26_manifest'],
        log: 'The Morrow was logged in ballast but sat 2.4 metres deep. The cargo entry was overwritten with six crates for channel three.',
        wrong: 'Compare the cargo to the draught. An empty boat rides high.' },
      { id: 'tide', title: 'Tide table - North Cliff', sub: 'Posted by the harbour office', body: '<div class="doc-sheet"><b>NORTH CLIFF - SATURDAY</b><br><br>High water: <b>02:00</b><br>Causeway flooded: <b>02:40 - 05:20</b><br>Low water: <b>08:05</b><br><br><span class="d">Third tide of the spring cycle marked in pencil.</span><br><span class="d">Handwritten: M - 02:14 - 3</span></div>',
        question: 'Which sequence does the tide table support?', options: [
          { t: 'Elsa was placed on the causeway after 05:20', v: 'a' },
          { t: 'Elsa fell into the channel at 02:14', v: 'b' },
          { t: 'The causeway was dry all night', v: 'c' }
        ],
        answer: 0, gives: ['c26_tide'],
        log: 'The tide table shows the causeway under water from 02:40 to 05:20, so Elsa could only have been placed there after it receded.',
        wrong: 'Read the flood window. The road was under water at 02:14.' }
    ],
    audioCalls: [
      { id: 'c26-999', title: 'Emergency call - harbour office', sub: 'Tam reports the body', cue: 'Under Tam\'s voice: the relay ident, repeating every four seconds, and a man in the background telling someone to close the channel.', pattern: [440, 0, 330, 440, 0, 440], tone: 'sine',
        options: [
          { t: 'The relay was still transmitting its loop', v: 'a' },
          { t: 'The harbour radio was switched off', v: 'b' },
          { t: 'The call came from the causeway', v: 'c' }
        ],
        answer: 0, gives: ['c26_tape'], flag: 'callHeard',
        log: 'Tam\'s emergency call captures the relay ident still looping in the background, with a man ordering the channel closed.',
        wrong: 'Listen under the voice. The four-second ident is still running.' }
    ],
    mapTask: {
      q: 'Which route matches the launch, the tide and the crate unload?', options: [
        { t: 'Relay -> causeway -> harbour office', v: 'a' },
        { t: 'Private mooring -> channel three -> north buoy -> private mooring by 04:55', v: 'b' },
        { t: 'Harbour -> open sea -> another port', v: 'c' }
      ],
      answer: 1, gives: ['c26_mooring'],
      log: 'The Morrow left the private mooring, ran channel three to the north buoy and returned by 04:55 to unload.',
      wrong: 'She logged back in at 04:55. The boat did not go to another port.' },
    redHerrings: [
      { clue: 'c26_nessa', label: "Nessa's angry message", clearedBy: ['c26_nessa', 'c26_fisher'], note: 'Nessa was crewing the ferry from midnight to six. Her threat was about the boat, not Elsa.' }
    ],
    contradictions: [
      { suspect: 'colm', statement: 1, evidence: ['c26_manifest', 'c26_mooring'],
        expose: 'The ledger records the Morrow out at 02:20 with six crates under the fluid, and the cleat shows she was tied at his private mooring. He was not in bed.',
        wrong: 'The boat and the mooring are both in his name.' },
      { suspect: 'colm', statement: 2, evidence: ['c26_cipher', 'c26_tape'],
        expose: 'Elsa\'s cipher names his boat and channel three. Her recording says she was reporting the harbour master\'s channel. He is the channel.',
        wrong: 'Listen to the transmission. She names the boat and the channel.' },
      { suspect: 'colm', statement: 3, evidence: ['c26_locker'],
        expose: 'The missing handset with Elsa\'s blood is in his private boathouse locker, behind a padlock set to the Morrow\'s departure time.',
        wrong: 'The locker is on his mooring and the code is his boat\'s time.' }
    ],
    solution: {
      minEvidence: 8,
      questions: [
        { kind: 'suspect', q: 'Who killed Elsa Vane?', options: [
          { t: 'Colm Tarn - harbour master', v: 'colm' },
          { t: 'Nessa Tarn - his daughter', v: 'nessa' },
          { t: 'Fenn Barlow - relay maintenance', v: 'fenn' },
          { t: 'Tam Rennie - the lobster skipper', v: 'tam' }
        ], answer: 'colm' },
        { kind: 'method', q: 'How did Elsa die?', options: [
          { t: 'Struck with the relay handset, then placed on the causeway after the tide', v: 'handset' },
          { t: 'She drowned when the causeway flooded at 02:14', v: 'drowned' },
          { t: 'She fell from the relay cliff in the storm', v: 'fall' },
          { t: 'She was poisoned at the harbour office', v: 'poison' }
        ], answer: 'handset' },
        { kind: 'motive', q: 'Why was Elsa killed?', options: [
          { t: 'She recorded proof that Colm was using the relay to guide smuggling runs', v: 'smuggling' },
          { t: 'She was leaving the relay for a better-paid job', v: 'job' },
          { t: 'She had stolen money from the harbour office', v: 'money' },
          { t: 'She was having an affair with Colm', v: 'affair' }
        ], answer: 'smuggling' },
        { kind: 'evidence', q: 'Which evidence breaks Colm\'s alibi?', options: [
          { t: 'The altered manifest, the mooring paint and the handset in his locker', v: 'manifest' },
          { t: 'Nessa\'s angry text message', v: 'text' },
          { t: 'The relay station being decommissioned', v: 'relay' },
          { t: 'The lobster boat\'s catch log', v: 'catch' }
        ], answer: 'manifest' }
      ],
      verdict: {
        who: "Colm Tarn",
        whoDesc: ", the harbour master, was charged with the murder of Elsa Vane.",
        how: "He struck her with the missing relay handset, kept her body until the tide had covered the causeway, then laid her on the stones so the sea would take the blame.",
        why: "Elsa had recorded proof that the decommissioned relay was guiding smuggling runs into Colm's private mooring. The channel was his, and she was about to make it public.",
        key: "The altered manifest, the mooring paint on the cleat, and the bloodied handset in his boathouse locker."
      },
      reveal: [
        "The post-mortem said drowning, but there was no seawater in her lungs and none in her stomach. Elsa Vane was dead before the causeway flooded.",
        "The final transmission carried a bearing of 312 degrees, straight to Colm's mooring. Eleven seconds was all the Morrow needed to find the channel.",
        "Nessa's angry message was about the boat she crewed, not the woman she lost. She was on the ferry from midnight to six, and the sea was the only thing that lied."
      ],
      quote: "A dead station was still calling ships home.",
      twist: "The decommission order was signed by Colm himself. He kept the relay alive on his own authority and filed it as maintenance."
    }
  });
})();
