/* ============================================================
   CASE 22 — THE LAST BROADCAST
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c22', num: 22,
    title: 'The Last Broadcast',
    subtitle: 'A late-night host dies mid-show, and the voice that finishes the programme is not his.',
    difficulty: 5, est: '40–50 min',
    cover: { kind: 'server', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Gideon Marsh, 57 — host of Night Line, Radio Meridian' },
      { k: 'Scene', v: 'Studio B, Radio Meridian, floor 11' },
      { k: 'Found', v: '01:12 — by the producer' },
      { k: 'Cause', v: 'Blunt-force trauma · broadcast continued after death' }
    ],
    briefing: [
      'Radio Meridian has broadcast from the same building since 1974. Between eleven and one every weeknight, Gideon Marsh talked to the city about its dreams, its debts, and the people it had lost. He was rude, funny, and occasionally dangerous. Two hundred thousand people listened.',
      'On Thursday he died at twenty past eleven, during the news bulletin. The show continued until one o’clock. The producer says Gideon was alive at midnight — she spoke to him through the glass. The playout system says the same. The voice on air says the same.',
      'The pathologist says he had been dead for nearly two hours when he was found. Blunt trauma to the back of the skull, delivered from behind. The microphone counterweight is missing from its thread.',
      'Gideon had been working on a story he would not put in the running order. At midnight he was going to name the new owner of Radio Meridian, a company called Meridian Heritage, and read out a list of payments that had nothing to do with broadcasting.',
      'He never read it. But somebody made sure the show went on.'
    ],
    opening: 'Studio B is soundproofed, warm, and utterly silent. The red ON AIR lamp is still lit above the door. The microphone hangs from its boom at the height of a seated man. The chair is pushed back. On the floor between the desk and the wall, a brass counterweight lies in a smear of blood.',
    objectives: [
      'Prove Gideon was dead before midnight.',
      'Find out how the broadcast continued.',
      'Recover the story he was going to read.',
      'Establish who needed the show to sound normal.'
    ],
    locations: [
      {
        id: 'studio', name: 'Studio B', short: 'Studio B', time: '01:30',
        art: { kind: 'server', mood: 'cold' },
        intro: 'A small square studio: a desk, two mics, a phone, a wall of acoustic foam, and a window onto the control room. A mug of tea has gone cold. A notebook lies open at a page of names. The microphone boom is bent slightly to the left.',
        actions: [
          { id: 'body', label: 'Examine Gideon and the studio', icon: 'blood', hotspot: { x: 48, y: 58 },
            desc: 'The wound, the mic, the open notebook',
            text: [
              'Gideon Marsh is on his back between the desk and the wall, one arm under him, his glasses folded neatly on the desk beside the mug. The back of his skull is broken. There is very little blood for a head wound, and none on the microphone.',
              'The microphone counterweight — a brass cylinder the size of a thumb — lies under the desk. There is blood and a few grey hairs in the knurling. The threaded socket on the boom is empty.',
              'The notebook is open at a list of dates and figures. The top line reads: <b>“MERIDIAN — 00:00 — READ THE LOT.”</b> The page after it has been torn out.'
            ],
            gives: ['body-note', 'mic-weight', 'notebook'],
            hint: 'The weapon is the mic weight. The missing page is what he meant to read.'
          },
          { id: 'search', label: 'Search Studio B', icon: 'search', puzzle: 'studio-search',
            desc: 'Six details in a soundproof room',
            requires: ['body-note'],
            hint: 'Check the desk, the boom, the foam wall, the floor, the door and the phone.' },
          { id: 'playout', label: 'Read the playout screen', icon: 'terminal', puzzle: 'playout',
            desc: 'The show that ran itself',
            requires: ['body-note'],
            hint: 'The playout system logs every item. The password is the programme name.' }
        ]
      },
      {
        id: 'control', name: 'The control room', short: 'Control room', time: '02:10',
        art: { kind: 'office' },
        requires: ['body-note'],
        intro: 'A glass box beside the studio with a mixing desk, six screens and a wall of old cart machines. Nell Prentice is at the desk with her headphones around her neck. She has not stopped shaking since the police arrived. The log book is open in front of her.',
        actions: [
          { id: 'nell', label: 'Interview Nell Prentice', icon: 'user', suspect: 'nell',
            desc: 'Producer · the only voice on the talkback', hint: 'Nell says she spoke to Gideon at midnight. Ask her what he said.' },
          { id: 'logbook', label: 'Read the studio log', icon: 'ledger',
            desc: 'Every item, every minute, every cut', requires: ['body-note'],
            text: [
              'The paper log runs from 22:45 to 01:10 in Nell’s neat handwriting. At 23:18: <b>“NEWS. G out for a smoke.”</b> At 23:26: <b>“G back. All good.”</b> At 00:00: <b>“G reading the Meridian piece. Cut to ad at 00:11.”</b>',
              'At 00:11 there is a coffee ring across the page and a gap of four minutes before the next entry. At 00:15: <b>“G tired. Running best-of.”</b>',
              'The last entry, at 01:02, reads: <b>“Went in. Found him. Called 999.”</b> The handwriting is much worse.'
            ],
            gives: ['studio-log', 'coffee-gap'],
            hint: 'The log claims Gideon read the Meridian piece at midnight. The torn page says otherwise.'
          },
          { id: 'audio', label: 'Analyse the broadcast', icon: 'audio', puzzle: 'broadcast',
            desc: '23:18 → 01:00 — find the splice',
            requires: ['playout-log'],
            hint: 'Listen for the room tone. It changes when a voice is recorded in a different room.' }
        ]
      },
      {
        id: 'archive', name: 'The tape archive', short: 'Archive', time: '03:00',
        art: { kind: 'archive', mood: 'cold' },
        requires: ['splice-point'],
        intro: 'A basement room of steel shelving and cardboard boxes, cold enough to see your breath. Every programme since 1974 is here on tape, cartridge or hard drive. The Meridian Heritage file is not where the index says it should be.',
        actions: [
          { id: 'shelves', label: 'Search the archive shelves', icon: 'archive',
            desc: 'A missing box, a lending slip, a shelf list', requires: ['splice-point'],
            text: [
              'The index card for <b>“MERIDIAN HERITAGE — INVESTIGATION — G. MARSH”</b> is still in the drawer, but the shelf beneath it is empty. A lending slip tucked behind the card shows the box was signed out at 22:50 last night.',
              'The signature is a looping <b>N. PRENTICE</b>. Beneath it, in a different pen: <b>“Returned 23:05 — N.P.”</b> The box is not on the shelf.',
              'A shelf list in Gideon’s hand records the contents: seven minidiscs, a folder of company filings, and a photograph of a man outside a warehouse in Rotterdam. The words <b>“M.H. = MERIDIAN”</b> are underlined three times.'
            ],
            gives: ['lending-slip', 'shelf-list', 'rotterdam-photo'],
            hint: 'Nell signed the file out and back. The box is gone, but the list remains.'
          },
          { id: 'cipher', label: 'Decode Gideon’s notebook page', icon: 'cipher', puzzle: 'notebook-cipher',
            desc: 'A line of letters on the inside cover',
            requires: ['notebook'],
            hint: 'Gideon used a Caesar shift for his private notes. Shift the wheel until it reads as a warning.' },
          { id: 'minidisc', label: 'Play the hidden minidisc', icon: 'audio', puzzle: 'minidisc',
            desc: 'Found inside a tape case', requires: ['lending-slip'],
            hint: 'The discs were separated. This one is labelled “00:00 — MASTER”.' }
        ]
      },
      {
        id: 'office', name: 'Station manager’s office', short: 'Manager’s office', time: '04:00',
        art: { kind: 'office' },
        requires: ['meridian-letter'],
        intro: 'A corner office with a view of the river and a desk that has never had a coffee ring on it. Conrad Ainsley is standing at the window with his hands behind his back. On the wall: a framed photograph of the station staff, 1998. Gideon is in the front row, grinning.',
        actions: [
          { id: 'conrad', label: 'Interview Conrad Ainsley', icon: 'user', suspect: 'conrad',
            desc: 'Station manager · sold Radio Meridian', hint: 'Conrad signed the sale. Ask him when the deal completes.' },
          { id: 'desk', label: 'Search the desk', icon: 'ledger',
            desc: 'The sale contract, a payment schedule, a letter', requires: ['meridian-letter'],
            text: [
              'The sale contract transfers Radio Meridian to Meridian Heritage Ltd for £4.6 million, completion at 09:00 on Friday. Conrad’s signature is on the last page. So is the signature of a director named <b>I. KETTLE</b>.',
              'A payment schedule shows £340,000 received in June and £90,000 in September, both marked “consultancy”. The bank details belong to a company in Rotterdam.',
              'A letter from Meridian’s solicitors warns: <b>“Completion is conditional on there being no adverse publicity. Any broadcast or press investigation into the purchaser will void the agreement.”</b>'
            ],
            gives: ['sale-contract', 'payment-schedule', 'completion-letter'],
            hint: 'The sale completes in the morning. Any adverse publicity voids it.'
          },
          { id: 'safe', label: 'Open the office safe', icon: 'keypad', puzzle: 'office-safe',
            desc: 'Four digits · the station’s founding year', requires: ['sale-contract'],
            hint: 'Radio Meridian has broadcast since 1974. Try 1974.' },
          { id: 'roof', label: 'Check the transmitter log', icon: 'chart',
            desc: 'Who went up to the roof at 23:20', requires: ['meridian-letter'],
            text: [
              'The transmitter room log records every door opening. At 23:19 the roof door was opened with Nell Prentice’s pass. At 23:22 it opened again. At 00:06 it opened a third time, and stayed open for eleven minutes.',
              'The transmitter itself logged a drop in power at 23:21 — a brief interruption consistent with someone opening the cabinet. At 00:06 the emergency cutoff was used, then reset.',
              'A cigarette end on the roof matches the brand Gideon smoked. A second cigarette end, crushed flat, is a menthol brand that Nell carries in her bag.'
            ],
            gives: ['roof-log', 'cigarette-ends'],
            hint: 'Nell went to the roof at 23:19. The transmitter dropped a minute later.' }
        ]
      },
      {
        id: 'newsroom', name: 'The newsroom', short: 'Newsroom', time: '05:00',
        art: { kind: 'office', mood: 'cold' },
        requires: ['splice-point'],
        intro: 'A wide room of empty desks and dead screens. The overnight news editor, Jae Mercer, is at the far end with a phone to his ear and a coat already on. He was Gideon’s co-host for six years before he was moved to the news desk.',
        actions: [
          { id: 'jae', label: 'Interview Jae Mercer', icon: 'user', suspect: 'jae',
            desc: 'News editor · Gideon’s former co-host', hint: 'Jae was moved off the show. Ask him why, and what Gideon told him.' },
          { id: 'wire', label: 'Read the overnight wire', icon: 'news',
            desc: 'A spiked story and a legal note', requires: ['splice-point'],
            text: [
              'The overnight wire holds a story filed by Gideon at 22:40 and spiked by Conrad at 22:55. The headline: <b>“RADIO MERIDIAN SOLD TO COMPANY LINKED TO STOLEN ART”</b>.',
              'The story names Meridian Heritage, Ian Kettle, and a warehouse in Rotterdam. It lists £430,000 in “consultancy” payments and connects the company to the sale of a church peal in the spring.',
              'A legal note from Conrad is attached: <b>“Do not run. This is not sourced and the deal completes Friday. Kill it.”</b> Under it, in Gideon’s hand: <b>“It is sourced. I have the discs. 00:00.”</b>'
            ],
            gives: ['spiked-story', 'legal-note'],
            hint: 'The story was spiked at 22:55. Gideon meant to read it at midnight.'
          },
          { id: 'timeline', label: 'Rebuild the night', icon: 'clock', puzzle: 'night-timeline',
            desc: 'Eight moments between 22:40 and 01:12', requires: ['studio-log', 'roof-log'],
            hint: 'Start with Gideon filing the story and end with Nell finding the body.' }
        ]
      }
    ],
    puzzles: {
      'studio-search': {
        type: 'hotspot', title: 'Studio B', subtitle: 'Six details in a soundproof room', icon: 'search',
        scene: { kind: 'server', mood: 'cold' },
        targets: [
          { label: 'Brass counterweight', x: 44, y: 74, r: 5.5, text: 'The microphone counterweight under the desk, with blood and grey hairs in the knurling. It unscrews by hand.' },
          { label: 'Torn notebook page', x: 58, y: 52, r: 5, text: 'The stub of a torn page in the notebook, with faint pencil indentations: the numbers 00:00 and the word MERIDIAN.' },
          { label: 'Cold mug', x: 36, y: 50, r: 5, text: 'A mug of tea, stone cold and untouched. Gideon always drank his tea. He never got to this one.' },
          { label: 'Bent boom', x: 62, y: 34, r: 5, text: 'The microphone boom is bent to the left, as if someone pulled it down and it struck the desk on the way.' },
          { label: 'Foam scuff', x: 76, y: 62, r: 5, text: 'A scuff on the acoustic foam at shoulder height, with a single black wool fibre caught in the surface.' },
          { label: 'Lit ON AIR lamp', x: 22, y: 30, r: 5, text: 'The ON AIR lamp is still lit. The studio was live — or made to look live — long after Gideon stopped speaking.' }
        ],
        note: 'Click directly on the details. The studio has not been cleaned, only switched off.',
        hintText: 'Look under the desk, at the notebook, the mug, the boom, the foam, and the lamp.',
        success: 'Studio B gives up six details: the brass counterweight, a torn page, a cold mug, a bent boom, a wool fibre on the foam, and a lamp that was still lit.',
        successTitle: 'The studio was made to look occupied.',
        gives: ['wool-fibre', 'torn-page'], flags: ['studioSearched'],
        short: 'The weapon is the mic weight and the ON AIR lamp was left burning.',
        log: 'The studio search finds the brass counterweight, a torn notebook page, a cold mug, a bent boom, a black wool fibre, and the ON AIR lamp still lit.'
      },
      'broadcast': {
        type: 'audio', title: 'The Broadcast', subtitle: 'Find the splice', icon: 'audio',
        prompt: 'The full programme runs from 23:00 to 01:00. The room tone under Gideon’s voice changes at one point. Find the item that was recorded somewhere else.',
        pattern: [180, 240, 0, 300, 180, 0, 420, 240],
        tempo: 0.44,
        waveform: 'Gideon talking. A record. The news bulletin. Then Gideon again, but the room sounds larger, and there is a faint hum at 50 Hz that is not in Studio B. The applause at the end is from an old show.',
        options: [
          { t: 'The “midnight reading” was recorded earlier and played from the archive', v: 'splice' },
          { t: 'The news bulletin was pre-recorded by the newsroom', v: 'news' },
          { t: 'The final hour was a live phone-in from another studio', v: 'phonein' },
          { t: 'The whole show was broadcast from the roof transmitter room', v: 'roof' }
        ],
        answer: 'splice',
        wrong: 'Listen to the room, not the words. The last hour has a different hum and old applause.',
        hintText: 'The 50 Hz hum belongs to the archive booth, not Studio B. The midnight segment is a recording.',
        success: 'The analysis is conclusive. From 00:00 onward, Gideon’s voice is a compilation of archive recordings, cut together with old links. The “midnight reading” never happened. The voice that said “goodnight” at one o’clock was recorded in 2019.',
        successTitle: 'Gideon was dead before midnight.',
        gives: ['splice-point', 'archive-voice'], flags: ['broadcastAnalyzed'],
        short: 'The midnight hour was assembled from archive recordings.',
        log: 'Audio analysis shows the programme after midnight was assembled from archive recordings of Gideon, not broadcast live.'
      },
      'playout': {
        type: 'terminal', title: 'Playout System', subtitle: 'The show that ran itself', icon: 'terminal',
        user: 'producer', host: 'meridian-playout', password: 'nightline',
        intro: 'The playout terminal controls the broadcast chain. Type "help" for commands. Every item is logged with a time, a source and an operator.',
        banner: 'MERIDIAN PLAYOUT — STUDIO B. 2 FILES. 1 EDIT LOG.',
        files: [
          { name: 'running.log', body: '23:00:00 LIVE — G. MARSH<br>23:18:10 NEWS BULLETIN<br><span class="y">23:26:00 VT — ARCHIVE — “G. MARSH LINK 2019-04”</span><br><span class="r">23:26:02 OPERATOR: N.PRENTICE — SOURCE CHANGED: LIVE → ARCHIVE</span><br>00:00:00 VT — ARCHIVE — “MERIDIAN PIECE — REHEARSAL”<br>00:11:00 AD BREAK<br>01:00:00 VT — ARCHIVE — “G. MARSH GOODNIGHT 2019”' },
          { name: 'edit.log', body: '<span class="y">23:25:44 — item inserted: MERIDIAN PIECE — REHEARSAL — 11:00 duration</span><br>23:25:51 — item inserted: LINK 2019-04<br><span class="r">23:26:02 — live microphone muted by N.PRENTICE</span><br><span class="r">23:26:02 — studio talkback disabled</span><br>00:11:00 — item trimmed by N.PRENTICE (−4:12)' },
          { name: 'access.log', locked: true, secret: true, hint: 'Recovered access log. Producer password required.', body: '<span class="y">23:19 — ROOF DOOR — N.PRENTICE</span><br>23:22 — ROOF DOOR — N.PRENTICE<br>23:26 — STUDIO B — N.PRENTICE<br><span class="r">23:31 — STUDIO B — N.PRENTICE — MIC MUTED</span><br>00:06 — ROOF DOOR — N.PRENTICE<br>01:02 — STUDIO B — N.PRENTICE' }
        ],
        hintText: 'The programme name is the password. Try NIGHTLINE.',
        success: 'The playout log tells the story. At 23:26:02 Nell Prentice switched the live microphone to archive and disabled the studio talkback. The Meridian piece was inserted as a rehearsal recording. The show did not continue. It was reassembled.',
        successTitle: 'Nell switched the studio to archive at 23:26.',
        gives: ['playout-log', 'edit-log', 'access-log'], flags: ['playoutOpen'],
        short: 'Nell muted the live mic and ran archive recordings.',
        log: 'The playout log shows Nell Prentice muted the live microphone at 23:26:02 and replaced the programme with archive recordings, including a rehearsal of the Meridian piece.'
      },
      'office-safe': {
        type: 'keypad', title: 'Conrad’s Safe', subtitle: 'Four-digit keypad', icon: 'keypad',
        deviceLabel: 'C. AINSLEY — PRIVATE', length: 4, code: '1974',
        prompt: 'A wall safe behind the framed photograph. The keypad wants four digits. <span style="color:var(--dim)">Conrad has never changed the code from the station’s first day.</span>',
        hintText: 'Radio Meridian began broadcasting in 1974. Enter 1974.',
        successTitle: 'The safe opens.',
        success: 'Inside: a second copy of the sale contract, a letter from a Rotterdam bank, and a printed list of “consultancy” payments to Conrad Ainsley totalling £430,000.',
        gives: ['conrad-payments', 'rotterdam-bank'], flags: ['officeSafeOpen'],
        short: 'Conrad’s safe holds £430,000 in consultancy payments.',
        log: 'Conrad’s safe contains a copy of the sale contract, a Rotterdam bank letter, and a list of £430,000 in consultancy payments to himself.'
      },
      'notebook-cipher': {
        type: 'cipher', title: 'The Inside Cover', subtitle: 'Gideon’s private shorthand', icon: 'cipher',
        plain: 'MERIDIAN OWNS THE NIGHT', shift: 4,
        prompt: 'On the inside cover of the notebook, in Gideon’s block capitals, is a line of letters that is not shorthand and not English.',
        note: 'Turn the wheel until the words resolve. The answer is the message, not the shift.',
        placeholder: 'Type the decoded message…',
        answer: ['meridian owns the night', 'meridian own the night'],
        wrong: 'The words are still shifted. Try another setting and read the first word aloud.',
        hintText: 'Shift the wheel four places back. The first word resolves to MERIDIAN.',
        success: 'The line resolves: <b>MERIDIAN OWNS THE NIGHT.</b> Under it, in smaller letters, Gideon had written a date and a time: “Friday 09:00 — completion — read the lot before they own the day too.”',
        successTitle: 'Gideon knew who was buying the station.',
        gives: ['meridian-letter', 'cipher-solution'], flags: ['cipherSolved'],
        short: 'Gideon’s notebook names Meridian as the buyer.',
        log: 'A coded line in Gideon’s notebook decodes to “MERIDIAN OWNS THE NIGHT”, with the completion date and time of the station sale.'
      },
      'minidisc': {
        type: 'audio', title: 'The Hidden Minidisc', subtitle: '“00:00 — MASTER”', icon: 'audio',
        prompt: 'One disc was left behind in the wrong case. It is labelled in Gideon’s hand: “00:00 — MASTER”. The recording is eleven minutes long.',
        pattern: [300, 0, 240, 300, 0, 420, 240, 0],
        tempo: 0.42,
        waveform: 'Gideon’s voice, close and level. Papers turning. A name, repeated. A company number. A list of payments. Then a pause, and the sound of a studio door opening.',
        options: [
          { t: 'Gideon reading the Meridian investigation, with someone entering the studio at the end', v: 'gideon' },
          { t: 'Nell Prentice rehearsing a news bulletin', v: 'nell' },
          { t: 'Conrad Ainsley dictating a letter to the solicitors', v: 'conrad' },
          { t: 'An old interview with Ian Kettle about heritage property', v: 'kettle' }
        ],
        answer: 'gideon',
        wrong: 'Listen to the reader. It is the man whose name is on the label, and he is interrupted.',
        hintText: 'The voice is Gideon’s. At the end a door opens and a woman says his name.',
        success: 'The disc is Gideon’s rehearsal of the Meridian piece. He names Meridian Heritage, Ian Kettle, the Rotterdam warehouse, and £430,000 in payments. At ten minutes forty, a door opens. A woman’s voice says, “Gideon. Conrad says the story is dead.” Gideon says, “Then Conrad is wrong.” The recording ends with a dull impact.',
        successTitle: 'The rehearsal ends with the blow.',
        gives: ['master-disc', 'impact-audio'], flags: ['minidiscPlayed'],
        short: 'Gideon’s rehearsal records the moment he was struck.',
        log: 'The hidden minidisc holds Gideon’s Meridian rehearsal and the sound of a woman entering, naming Conrad, followed by a blow.'
      },
      'night-timeline': {
        type: 'sequence', title: 'The Night, In Order', subtitle: 'Eight moments before the body was found', icon: 'clock', variant: 'strips',
        prompt: 'The playout log, the roof log, the studio log and the audio disagree. Put the night in order.',
        items: [
          { t: 'Gideon files the Meridian story', sub: '22:40 — newsroom wire', order: 1 },
          { t: 'Conrad spikes the story', sub: '22:55 — legal note', order: 2 },
          { t: 'Nell signs out the Meridian archive box', sub: '22:50 — lending slip', order: 3 },
          { t: 'Gideon goes on air', sub: '23:00 — running order', order: 4 },
          { t: 'Nell goes to the roof', sub: '23:19 — transmitter log', order: 5 },
          { t: 'The live microphone is muted', sub: '23:26 — playout log', order: 6 },
          { t: 'The archive Meridian piece is broadcast', sub: '00:00 — running log', order: 7 },
          { t: 'Nell finds the body', sub: '01:02 — studio log', order: 8 }
        ],
        wrong: 'The story was filed before it was spiked. Nell went to the roof before the mic was muted.',
        hintText: 'Filed 22:40, spiked 22:55, box signed out 22:50, on air 23:00, roof 23:19, mic muted 23:26, archive 00:00, body 01:02.',
        success: 'The night resolves. Gideon filed a story at twenty to eleven. Conrad killed it fifteen minutes later. Nell took the archive box, went to the roof at 23:19, and at 23:26 she muted the live studio and let the archive speak for a dead man.',
        successTitle: 'The murder happened during the news bulletin.',
        gives: ['night-timeline'], flags: ['timelineBuilt'],
        short: 'Gideon was killed at 23:20 and the show ran on archive tape.',
        log: 'Timeline: story filed 22:40, spiked 22:55, Gideon on air 23:00, Nell on roof 23:19, mic muted 23:26, archive broadcast 00:00, body found 01:02.'
      }
    },
    suspects: [
      {
        id: 'nell', name: 'Nell Prentice', role: 'Producer · Night Line', location: 'control', locationName: 'Control room', tag: 'Prime suspect',
        portrait: { seed: 'nell-prentice', hair: 'bob', hairColor: '#3a2a1b', skin: 0, expression: 'wary', collar: 'shirt', glasses: 'round', eyes: '#3a2159' },
        intro: 'Thirty-eight, precise, with a producer’s instinct for filling silence. She has run Night Line for six years. She signed out the Meridian box, went to the roof at 23:19, muted the studio at 23:26, and says she spoke to Gideon at midnight.',
        questions: [
          { q: 'You spoke to Gideon at midnight.', requires: ['studio-log'], present: true,
            a: '“Through the talkback. He was reading the Meridian piece. He sounded tired.” She folds her hands. “I told him to take a break after the ad. He said he was fine.”', 
            gives: ['nell-talkback'], flags: ['nellHostile'] },
          { q: 'The studio talkback was disabled at 23:26.', requires: ['playout-log'], present: true,
            a: '“It glitches. The desk does it when the archive cart is patched in.” She looks at the mixing desk. “I did not disable anything. The system logs are not gospel.”',
            gives: ['nell-glitch'] },
          { q: 'You signed out the Meridian archive box at 22:50.', requires: ['lending-slip'], present: true,
            a: '“Gideon asked me to pull it for the midnight piece.” A pause. “I put it back at five past eleven. The slip says so.” She does not mention that the box is not on the shelf.',
            gives: ['nell-box'], flags: ['nellBroke'] },
          { q: 'Your pass opened the roof door at 23:19 and again at 00:06.', requires: ['roof-log'], present: true,
            a: '“I smoke on the roof. It is the only place in this building where Conrad cannot see me.” She stubs out the cigarette in the saucer. “The transmitter alarm went off at six past midnight. I reset it. That is my job.”',
            gives: ['nell-roof'], flags: ['nellBroke'] },
          { q: 'This is your voice on the master disc, telling him the story was dead.', requires: ['master-disc'], present: true,
            a: 'She is silent for a long time. “Conrad said the sale would fail if the story ran. He said Gideon would destroy the station and everyone in it.” She looks up. “I went in to ask him to wait one day. He laughed at me. He turned his back. The weight was on the desk.”',
            gives: ['nell-confession'], flags: ['nellBroke'] }
        ],
        after: 'She asks whether the one o’clock news will still go out. You tell her the station will be off air by morning. She nods, and begins to label the tapes for the police.'
      },
      {
        id: 'conrad', name: 'Conrad Ainsley', role: 'Station manager · sold the station', location: 'office', locationName: 'Manager’s office', tag: 'Suspect',
        portrait: { seed: 'conrad-ainsley', hair: 'short', hairColor: '#8d8d99', skin: 1, expression: 'smug', collar: 'suit', glasses: 'square' },
        intro: 'Fifty-nine, silver, with the smooth manner of a man who has been selling things for thirty years. He signed the sale to Meridian Heritage, spiked Gideon’s story, and took £430,000 in “consultancy”. He says the murder is a tragedy and the timing is unfortunate.',
        questions: [
          { q: 'You spiked Gideon’s story at 22:55.', requires: ['legal-note'], present: true,
            a: '“It was not sourced. He had a folder and a grudge.” Conrad straightens his cuff. “I am responsible for this station. You do not broadcast an accusation against the buyer on the morning of completion.”',
            gives: ['conrad-spike'], flags: ['conradHostile'] },
          { q: 'Meridian Heritage paid you £430,000.', requires: ['conrad-payments'], present: true,
            a: '“Consultancy. For the transition.” He meets your eyes. “I have declared it. There is nothing illegal about being paid for advice.”',
            gives: ['conrad-payments-statement'] },
          { q: 'The sale completes at nine this morning.', requires: ['sale-contract'], present: true,
            a: '“At nine.” He glances at his watch. “Unless the buyer invokes the publicity clause. Which, given the circumstances, they may well do.” He says it carefully, as if the thought has only just occurred to him.',
            gives: ['conrad-completion'] },
          { q: 'Gideon told you he had the discs.', requires: ['spiked-story'], present: true,
            a: '“He told me a great many things.” A pause. “I did not kill him, detective. I did not even go to the eleventh floor after ten o’clock. Ask the lift log.”',
            gives: ['conrad-alibi'] }
        ],
        after: 'He asks whether he may use the office phone. You tell him he may not. He sits down and looks at the river for a long time.'
      },
      {
        id: 'jae', name: 'Jae Mercer', role: 'News editor · former co-host', location: 'newsroom', locationName: 'Newsroom', tag: 'Suspect',
        portrait: { seed: 'jae-mercer', hair: 'short', hairColor: '#1b1220', skin: 3, expression: 'sad', collar: 'shirt', eyes: '#2b1a12' },
        intro: 'Forty-two, tired, with his coat already on and a phone he keeps checking. He co-hosted Night Line for six years before Conrad moved him to the news desk. He was in the building, he hated Conrad, and he knew what Gideon was going to read.',
        questions: [
          { q: 'Why were you moved off the show?', requires: ['spiked-story'],
            a: '“I asked one question too many about the accounts.” He puts the phone down. “Conrad moved me to overnights. Gideon called it a promotion with a knife in it. He was not wrong.”',
            gives: ['jae-moved'] },
          { q: 'Gideon told you what he had.', requires: ['master-disc'], present: true,
            a: '“He played me two minutes of the rehearsal at about half nine.” Jae rubs his eyes. “Meridian, Rotterdam, the church bells. He said if anything happened to him, I should tell the police where the discs were. I did not think he meant it.”',
            gives: ['jae-discs'], flags: ['jaeBroke'] },
          { q: 'Where were you at half past eleven?', requires: ['night-timeline'],
            a: '“Here. Rewriting the one o’clock bulletin.” He gestures at the screen. “I filed a version at 23:40 and another at 00:20. The timestamps are on the system. I did not go near Studio B.”',
            gives: ['jae-alibi'] },
          { q: 'You knew Nell signed out the archive box.', requires: ['lending-slip'], present: true,
            a: '“Nell does what Conrad tells her. Always has.” He stops. “But she loved Gideon. She would not —” He looks at the control room through the glass. “She would not have needed to. He was going to read it anyway.”',
            gives: ['jae-nell'] }
        ],
        after: 'He asks whether he can take the Meridian story to the morning paper. You tell him to send it to the police first. He nods and starts typing.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Gideon Marsh — post-mortem note', caption: 'Blunt trauma · two hours dead', icon: 'blood', type: 'Forensic report',
        desc: 'A depressed fracture at the back of the skull. Time of death 23:15–23:30. Gideon had been dead for nearly two hours when he was found.',
        tells: 'The broadcast after midnight was not live. Someone kept the show going with a dead man’s voice.'
      },
      'mic-weight': {
        name: 'Microphone counterweight', caption: 'Brass · blood and grey hairs', icon: 'tool', type: 'Weapon',
        desc: 'The brass counterweight from the microphone boom, found under the desk with blood and grey hairs in the knurling.',
        tells: 'The murder weapon came from the studio. Whoever killed him stood behind the boom and struck once.'
      },
      'notebook': {
        name: 'Gideon’s notebook', caption: '“MERIDIAN — 00:00 — READ THE LOT”', icon: 'note', type: 'Personal record',
        desc: 'Gideon’s notebook, open at a list of dates and payments. The top line schedules the Meridian story for midnight. A page has been torn out.',
        tells: 'Gideon planned to expose Meridian on air at midnight. Someone removed the page.'
      },
      'torn-page': {
        name: 'Torn page stub', caption: 'Pencil indentations · 00:00 · MERIDIAN', icon: 'note', type: 'Physical evidence',
        desc: 'The stub of the torn page, with faint pencil indentations reading 00:00 and MERIDIAN.',
        tells: 'The missing page was the running order for the Meridian piece. It was removed after Gideon died.'
      },
      'wool-fibre': {
        name: 'Black wool fibre', caption: 'Caught in the acoustic foam', icon: 'fiber', type: 'Trace evidence',
        desc: 'A single black wool fibre caught at shoulder height in the acoustic foam of Studio B.',
        tells: 'Someone in a black wool coat stood close to the wall behind the microphone. Nell’s coat is black wool.'
      },
      'studio-log': {
        name: 'Studio log', caption: '“G back. All good.” · 23:26', icon: 'ledger', type: 'Record',
        desc: 'Nell Prentice’s handwritten studio log, claiming Gideon returned from a smoke at 23:26 and read the Meridian piece at midnight.',
        tells: 'The log is false. Gideon was already dead at 23:26.'
      },
      'coffee-gap': {
        name: 'Coffee-ring gap', caption: 'Four minutes missing · 00:11–00:15', icon: 'note', type: 'Record',
        desc: 'A coffee ring across the log page at 00:11 and a four-minute gap before the next entry.',
        tells: 'The log was written in a hurry, around other work — the work of running an archive broadcast.'
      },
      'playout-log': {
        name: 'Playout running log', caption: '23:26 — LIVE → ARCHIVE', icon: 'laptop', type: 'Digital evidence',
        desc: 'The playout system log showing the source switched from live to archive at 23:26:02, with the Meridian rehearsal inserted for midnight.',
        tells: 'The programme after 23:26 was assembled, not broadcast. The switch was made by Nell Prentice.'
      },
      'edit-log': {
        name: 'Playout edit log', caption: 'Microphone muted · talkback disabled', icon: 'laptop', type: 'Digital evidence',
        desc: 'The edit log recording that the live microphone was muted and the studio talkback disabled at 23:26:02 by N. Prentice.',
        tells: 'Nell cut the studio off. She then had complete control of what the city heard.'
      },
      'access-log': {
        name: 'Door access log', caption: 'Roof 23:19 · Studio B 23:31 · Roof 00:06', icon: 'id', type: 'Access record',
        desc: 'The station door log showing Nell’s pass at the roof and Studio B between 23:19 and 01:02.',
        tells: 'Nell moved between the roof, the studio and the transmitter during the critical hour.'
      },
      'roof-log': {
        name: 'Transmitter log', caption: 'Power drop 23:21 · cutoff 00:06', icon: 'chart', type: 'Record',
        desc: 'The transmitter room log, recording a power drop at 23:21 and the emergency cutoff at 00:06.',
        tells: 'Someone opened the transmitter cabinet minutes after Gideon died. The 00:06 cutoff was a second intervention.'
      },
      'cigarette-ends': {
        name: 'Two cigarette ends', caption: 'Gideon’s brand and Nell’s menthol', icon: 'fiber', type: 'Trace evidence',
        desc: 'Two cigarette ends on the roof: one of Gideon’s brand, one menthol, crushed flat.',
        tells: 'Gideon and Nell were both on the roof during the night. Nell’s account of a solitary smoke is incomplete.'
      },
      'lending-slip': {
        name: 'Archive lending slip', caption: 'Signed out 22:50 · N. Prentice', icon: 'note', type: 'Record',
        desc: 'The lending slip for the Meridian Heritage archive box, signed out by Nell Prentice at 22:50 and marked returned at 23:05.',
        tells: 'Nell took the Meridian file before the broadcast. The box never went back on the shelf.'
      },
      'shelf-list': {
        name: 'Archive shelf list', caption: 'Seven discs · filings · Rotterdam photo', icon: 'archive', type: 'Record',
        desc: 'Gideon’s shelf list for the Meridian box: seven minidiscs, a folder of company filings and a photograph taken in Rotterdam.',
        tells: 'Gideon had seven discs of evidence. Only one was left behind.'
      },
      'rotterdam-photo': {
        name: 'Rotterdam photograph', caption: 'Warehouse · man in a grey coat', icon: 'photo', type: 'Photograph',
        desc: 'A photograph of a warehouse in Rotterdam with a man in a grey coat at the loading door. On the back: “I.K. — 14/6”.',
        tells: 'Ian Kettle was at the Rotterdam warehouse. The Meridian network is real.'
      },
      'meridian-letter': {
        name: 'Decoded notebook line', caption: '“MERIDIAN OWNS THE NIGHT”', icon: 'cipher', type: 'Coded evidence',
        desc: 'A Caesar-shifted line in Gideon’s notebook decoding to “MERIDIAN OWNS THE NIGHT”, with the completion date of the sale.',
        tells: 'Gideon knew Meridian was buying the station. He intended to read it on air before completion.'
      },
      'cipher-solution': {
        name: 'Notebook date', caption: 'Friday 09:00 — completion', icon: 'cipher', type: 'Analysis',
        desc: 'Beneath the decoded line, Gideon wrote the completion date and time and the words “read the lot before they own the day too”.',
        tells: 'The murder was timed to the sale. The broadcast was meant to stop it.'
      },
      'master-disc': {
        name: 'Master minidisc', caption: '“00:00 — MASTER” · 11 minutes', icon: 'audio', type: 'Audio evidence',
        desc: 'Gideon’s rehearsal of the Meridian piece, naming Meridian Heritage, Ian Kettle, Rotterdam and £430,000 in payments.',
        tells: 'The story existed and was recorded. It was the reason he was killed.'
      },
      'impact-audio': {
        name: 'Impact at 10:40', caption: 'A door · a woman’s voice · a blow', icon: 'audio', type: 'Audio evidence',
        desc: 'The last twenty seconds of the master disc: a studio door, a woman telling Gideon the story is dead, his refusal, and a dull impact.',
        tells: 'Gideon was killed in Studio B during the news bulletin, immediately after refusing to drop the story.'
      },
      'sale-contract': {
        name: 'Sale contract', caption: 'Meridian Heritage · £4.6m · completion 09:00', icon: 'ledger', type: 'Contract',
        desc: 'The contract selling Radio Meridian to Meridian Heritage Ltd for £4.6 million, signed by Conrad Ainsley and I. Kettle at completion on Friday morning.',
        tells: 'Conrad sold the station to the company Gideon was investigating. The timing is the motive.'
      },
      'payment-schedule': {
        name: 'Payment schedule', caption: '£340,000 June · £90,000 September', icon: 'money', type: 'Financial record',
        desc: 'A payment schedule showing £340,000 and £90,000 received by Conrad, both marked “consultancy”, paid from Rotterdam.',
        tells: 'Conrad was paid by Meridian before the sale. He had already chosen his side.'
      },
      'completion-letter': {
        name: 'Completion letter', caption: '“Any adverse publicity will void the agreement”', icon: 'letter', type: 'Document',
        desc: 'A letter from Meridian’s solicitors warning that any broadcast or press investigation into the purchaser will void the sale.',
        tells: 'Gideon’s broadcast would have cost Conrad £4.6 million. The deadline was the motive.'
      },
      'conrad-payments': {
        name: 'Conrad’s payment list', caption: '£430,000 · Rotterdam bank', icon: 'money', type: 'Financial record',
        desc: 'A list of consultancy payments to Conrad Ainsley totalling £430,000, found in his safe with a Rotterdam bank letter.',
        tells: 'Conrad was on Meridian’s payroll. He was not a neutral seller.'
      },
      'rotterdam-bank': {
        name: 'Rotterdam bank letter', caption: 'Account in Conrad’s name', icon: 'letter', type: 'Financial record',
        desc: 'A letter from a Rotterdam bank confirming an account in Conrad Ainsley’s name, funded by Meridian Heritage.',
        tells: 'The money trail runs from Meridian to Conrad. He had every reason to stop the broadcast.'
      },
      'spiked-story': {
        name: 'Spiked Meridian story', caption: '“SOLD TO COMPANY LINKED TO STOLEN ART”', icon: 'news', type: 'Document',
        desc: 'Gideon’s filed story naming Meridian Heritage, Ian Kettle, the Rotterdam warehouse and £430,000 in payments.',
        tells: 'The story was ready and sourced. It was killed by Conrad at 22:55.'
      },
      'legal-note': {
        name: 'Conrad’s legal note', caption: '“Do not run. Kill it.”', icon: 'note', type: 'Document',
        desc: 'A note from Conrad ordering the story spiked, with Gideon’s reply underneath: “It is sourced. I have the discs. 00:00.”',
        tells: 'Conrad knew Gideon intended to broadcast. Gideon knew Conrad wanted it stopped.'
      },
      'archive-voice': {
        name: 'Archive voice analysis', caption: '00:00 hour recorded in 2019', icon: 'audio', type: 'Analysis',
        desc: 'Audio analysis showing the midnight hour was assembled from 2019 archive recordings, with old applause and a different room tone.',
        tells: 'The voice that finished the show was not Gideon. It was a recording.'
      },
      'splice-point': {
        name: 'The splice', caption: '23:26:02 · live to archive', icon: 'audio', type: 'Audio evidence',
        desc: 'The exact point in the broadcast where the live microphone was cut and the archive recordings began.',
        tells: 'The switch happened during the news bulletin, while everyone in the building was listening to the news.'
      },
      'night-timeline': {
        name: 'Night timeline', caption: '22:40 → 01:02', icon: 'clock', type: 'Analysis',
        desc: 'A reconstruction placing the spiked story, the archive box, the roof visits, the muted microphone and the discovery in order.',
        tells: 'The murder happened at 23:20, inside the news bulletin. The rest of the night was theatre.'
      },
      'nell-talkback': {
        name: 'Nell on the talkback', caption: '“He sounded tired.”', icon: 'audio', type: 'Statement',
        desc: 'Nell claims she spoke to Gideon through the talkback at midnight and that he was reading the Meridian piece.',
        tells: 'The talkback was disabled at 23:26. She could not have spoken to him.'
      },
      'nell-glitch': {
        name: 'Nell on the system', caption: '“It glitches.”', icon: 'note', type: 'Statement',
        desc: 'Nell dismisses the muted microphone and disabled talkback as a desk glitch.',
        tells: 'The edit log records a deliberate switch by N. Prentice. It was not a glitch.'
      },
      'nell-box': {
        name: 'Nell on the archive box', caption: '“I put it back at five past eleven.”', icon: 'note', type: 'Statement',
        desc: 'Nell claims she returned the Meridian archive box to the shelf at 23:05.',
        tells: 'The box is missing. The lending slip is the only record of it.'
      },
      'nell-roof': {
        name: 'Nell on the roof', caption: '“I smoke up there.”', icon: 'audio', type: 'Statement',
        desc: 'Nell admits using the roof door at 23:19 and 00:06, claiming she smoked and reset the transmitter alarm.',
        tells: 'The transmitter log shows a power drop at 23:21 — while Nell was alone with the cabinet.'
      },
      'nell-confession': {
        name: 'Nell’s confession', caption: '“He turned his back. The weight was on the desk.”', icon: 'audio', type: 'Statement',
        desc: 'Nell admits going into Studio B during the news, arguing with Gideon, and striking him once with the microphone counterweight.',
        tells: 'She admits the killing and the deception. The playout log and the master disc corroborate her account.'
      },
      'conrad-spike': {
        name: 'Conrad on the story', caption: '“It was not sourced.”', icon: 'note', type: 'Statement',
        desc: 'Conrad claims he spiked Gideon’s story because it was unsourced and would have endangered the sale.',
        tells: 'The story was sourced with seven discs. Conrad killed it to protect £4.6 million.'
      },
      'conrad-payments-statement': {
        name: 'Conrad on the payments', caption: '“Consultancy. For the transition.”', icon: 'audio', type: 'Statement',
        desc: 'Conrad confirms receiving £430,000 from Meridian Heritage and describes it as consultancy for the transition.',
        tells: 'The payments connect him directly to the purchaser. He was not a neutral party.'
      },
      'conrad-completion': {
        name: 'Conrad on completion', caption: '“Unless they invoke the publicity clause.”', icon: 'note', type: 'Statement',
        desc: 'Conrad notes that the buyer may void the sale because of the publicity surrounding Gideon’s death.',
        tells: 'He understood exactly what the murder would do to the deal — and to his money.'
      },
      'conrad-alibi': {
        name: 'Conrad’s alibi', caption: 'Lift log · left the floor at 22:00', icon: 'id', type: 'Alibi',
        desc: 'The lift log confirms Conrad left the eleventh floor at 22:00 and did not return until the police arrived.',
        tells: 'Conrad did not strike the blow. He set the deadline and let someone else enforce it.'
      },
      'jae-moved': {
        name: 'Jae on the move', caption: '“A promotion with a knife in it.”', icon: 'note', type: 'Statement',
        desc: 'Jae says he was moved off Night Line after asking about the station accounts.',
        tells: 'Conrad removed the people who asked questions. Jae had a grievance but no access to the studio that night.'
      },
      'jae-discs': {
        name: 'Jae on the discs', caption: '“Tell the police where the discs were.”', icon: 'audio', type: 'Statement',
        desc: 'Jae says Gideon played him two minutes of the rehearsal and told him what to do if anything happened.',
        tells: 'Gideon knew he was in danger. He had already shared the evidence with a colleague.'
      },
      'jae-alibi': {
        name: 'Jae’s alibi', caption: 'Newsroom system · filed 23:40 and 00:20', icon: 'receipt', type: 'Alibi',
        desc: 'The newsroom system records Jae filing bulletins at 23:40 and 00:20, placing him at his desk.',
        tells: 'Jae was in the newsroom during the murder. He is not the killer.'
      },
      'jae-nell': {
        name: 'Jae on Nell', caption: '“Nell does what Conrad tells her.”', icon: 'note', type: 'Statement',
        desc: 'Jae says Nell has always followed Conrad’s instructions but loved Gideon.',
        tells: 'Nell is the link between Conrad’s orders and the studio. Her loyalty was divided — and she chose the sale.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Gideon Marsh?', 
          options: [
            { t: 'Conrad Ainsley — the station manager who sold the station', v: 'conrad' },
            { t: 'Jae Mercer — the co-host who was moved off the show', v: 'jae' },
            { t: 'Nell Prentice — the producer who kept the show on air', v: 'nell' },
            { t: 'Ian Kettle — the buyer from Meridian Heritage', v: 'kettle' }
          ], answer: 'nell' },
        { q: 'How did Gideon die?', 
          options: [
            { t: 'Struck from behind with the microphone counterweight during the news', v: 'weight' },
            { t: 'Poisoned in his tea and left in the studio', v: 'tea' },
            { t: 'Strangled with the microphone cable and staged at the desk', v: 'cable' },
            { t: 'Pushed down the stairwell and carried back to the studio', v: 'stairs' }
          ], answer: 'weight' },
        { q: 'Why did the broadcast continue after his death?', 
          options: [
            { t: 'To make it look as if he was alive at midnight and the Meridian story had aired', v: 'alibi' },
            { t: 'Because the playout system was automated and could not be stopped', v: 'automation' },
            { t: 'To give the station time to sell advertising before the police arrived', v: 'ads' },
            { t: 'Because Nell did not know he was dead until one o’clock', v: 'ignorance' }
          ], answer: 'alibi' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The playout log, the audio splice, and Gideon’s master disc', v: 'playout' },
            { t: 'Conrad’s £430,000 in consultancy payments', v: 'payments' },
            { t: 'Jae’s spiked news bulletin', v: 'bulletin' },
            { t: 'The missing archive box', v: 'box' }
          ], answer: 'playout' }
      ],
      verdict: {
        who: 'Nell Prentice, 38 — producer of Night Line',
        whoDesc: 'was arrested in the control room and charged with murder. She pleaded guilty to manslaughter; the prosecution accepted that the blow was struck in a moment of panic and that the deception afterwards was the greater crime.',
        how: 'She went into Studio B during the 23:18 news bulletin, argued with Gideon about the Meridian story, and struck him once with the brass microphone counterweight. She then returned to the control room, muted the live studio, and ran two hours of archive recordings so the city would believe he was alive.',
        why: 'Conrad Ainsley had told her the sale would collapse if Gideon named Meridian. Nell had produced the show for six years, had a mortgage, and believed — or told herself — that silencing one broadcast would save the station and everyone in it.',
        key: 'The playout log shows Nell muted the studio at 23:26, the audio analysis proves the midnight hour was archive tape, and Gideon’s master disc captures her voice in the studio seconds before the blow.'
      },
      reveal: [
        'Radio Meridian had been losing money for a decade. Conrad Ainsley had been losing his nerve for about as long. When Meridian Heritage offered £4.6 million for the licence, the transmitter and the archive, he did not ask where the money came from. He asked how quickly.',
        'Gideon Marsh asked where the money came from. He had spent six weeks on it: company filings, a Rotterdam warehouse, a church peal sold in the spring, a shipping docket with the same address. He had seven minidiscs and a story he was going to read at midnight, three hours before the sale completed.',
        'Conrad spiked the story at 22:55. Gideon told him he would read it anyway. Conrad went home. He did not need to be in the building. He had already made the argument to the only person who could stop it: the producer, who had a mortgage, and a loyalty to the station, and a producer’s belief that the show must go on.',
        'Nell Prentice went to the roof at 23:19 and smoked a cigarette. She went back down. During the news bulletin she opened the studio door and asked Gideon to wait one day. He laughed at her. He turned his back to pour a glass of water. The counterweight was on the desk, unscrewed from the boom for a service that was never done.',
        'She struck him once. He fell between the desk and the wall. She stood there for six minutes. Then she went back to the control room, logged the time, muted the live microphone, disabled the talkback, and inserted the archive cart.',
        'It was, in its way, a masterpiece of production. She used Gideon’s own rehearsals, his own links, his own voice from 2019. She cut the Meridian piece down to four minutes and ran it at midnight as if he had read it — which, in a sense, he had. The city heard a man say goodnight at one o’clock. The man had been dead for an hour and a half.',
        'She almost got away with it. The first officers saw a locked studio, a lit ON AIR lamp, a log in the producer’s hand and a broadcast that had run to time. It was the pathologist who noticed the time of death. Then the playout engineer noticed the source change at 23:26:02. Then the audio analysis found the room tone, and the archive, and the 2019 applause.',
        'The Meridian box was recovered from Nell’s flat, under her bed, with six of the seven discs intact. The seventh was in a tape case in the archive, where Gideon had hidden it in plain sight. It contained his rehearsal, and the last eleven minutes of his life.',
        'Meridian Heritage withdrew from the sale. Ian Kettle was arrested in Rotterdam three weeks later on fraud and money-laundering charges; he was already wanted in connection with the St Cuthbert’s bell fraud and the Northgate art smuggling case. The two investigations were joined, and the joined file ran to nine hundred pages.',
        'Conrad Ainsley was charged with perverting the course of justice and with receiving £430,000 in corrupt payments. He was sentenced to five years. He maintained to the end that he had never asked anyone to hurt Gideon. The court accepted that he had only asked Nell to keep the story off the air.',
        'Nell Prentice was sentenced to twelve years. At the trial, the prosecution played the last twenty seconds of the master disc. The court heard her say, “Gideon. Conrad says the story is dead.” Then his voice, tired and amused: “Then Conrad is wrong.” Then the sound of a chair turning, and a blow.',
        'Radio Meridian was bought by a community trust for one pound. It still broadcasts from the eleventh floor. At midnight on Thursdays, the presenter reads the names of the city’s dead. The producer’s chair is empty, and nobody has ever asked for it.'
      ],
      quote: 'Then Conrad is wrong.',
      twist: 'The final detail was the sale itself. Conrad had already been paid £430,000, but the completion money — the £4.6 million — was due to him at nine in the morning. He did not kill Gideon. He simply told Nell that the station would die without the sale, and let her do the arithmetic. The murder was committed by a woman who believed she was saving her job.'
    }
  });
})();
