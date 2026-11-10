/* ============================================================
   CASE 18 — THE BELL AT VESPERS
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c18', num: 18,
    title: 'The Bell at Vespers',
    subtitle: 'The old bell-ringer is found hanged in a locked tower, and the bells above him have been sold.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'church', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Enoch Pyle, 71 — bell-ringer and churchwarden' },
      { k: 'Scene', v: 'St Cuthbert’s bell tower, ringing chamber' },
      { k: 'Found', v: '18:35 — by his granddaughter' },
      { k: 'Cause', v: 'Blunt-force trauma · death staged as hanging' }
    ],
    briefing: [
      'St Cuthbert’s has stood at the top of the town for six hundred years. Its tower holds a peal of eight bells, rung by a band of volunteers who have been short of money, short of young people, and long on tradition. Enoch Pyle had rung them for fifty-three of those years.',
      'At twenty-five to seven his granddaughter Cass found him hanging from the bell rope in the ringing chamber. The tower door was locked. The key was in his coat pocket. The police were ready to call it a suicide until the pathologist found the wound at the back of his skull.',
      'Two weeks earlier, the church council had voted to sell the bells to a private collector and replace them with recordings. Enoch had voted against. He had also, according to the vicar, become “difficult” about the paperwork.',
      'The bells are still up there. They have not been rung since. On the night Enoch died, someone climbed the tower, killed him, and then went to the trouble of making it look like he had done it himself. The question is which of the people who love this church needed him gone.']
    ,
    opening: 'The ringing chamber smells of dust, rope wax, and the cold mineral breath of old stone. Eight bell ropes hang through the ceiling like a curtain. The seventh is cut short, its end wrapped in a noose. The tower clock is stopped at 18:17.',
    objectives: [
      'Establish how Enoch Pyle really died.',
      'Recover the recording he made in the bell chamber.',
      'Prove what happened to the church bells.',
      'Break the alibi of the person who locked the tower.'
    ],
    locations: [
      {
        id: 'tower', name: 'The bell tower', short: 'Bell tower', time: '19:10',
        art: { kind: 'church', mood: 'cold' },
        intro: 'A circular stone room with a ladder to the bell chamber, a clock mechanism in a glass case, and eight ropes hanging in a neat arc. Enoch’s body has been taken down, but the chalk outline remains beneath the seventh rope. The tower door at the bottom was locked when Cass arrived; the key was in Enoch’s pocket.',
        actions: [
          { id: 'body', label: 'Examine the ringing chamber', icon: 'blood', hotspot: { x: 46, y: 57 },
            desc: 'The rope, the clock, the chalk outline',
            text: [
              'Enoch Pyle was a small, wiry man with hands like knotted string. The chalk outline shows him hanging with his feet clear of the floor. The seventh bell rope has been cut about two metres up and knotted into a noose.',
              'The pathologist’s note is pinned to the door: <b>“Blunt trauma to the occiput, consistent with a blow from behind. Ligature marks are post-mortem. He was dead before he was hanged.”</b>',
              'The tower clock stopped at 18:17. Its glass case is intact. A fine trail of brass filings runs from the mechanism to the ladder.',
              'By the wall, the disused tenor bell hangs silent on its frame. Its clapper lies on the floor beneath it, detached, with a dark stain and a few grey hairs caught in the pivot.'
            ],
            gives: ['body-note', 'bell-rope', 'clock-stop', 'clapper'],
            hint: 'The hanging was staged. Look at the back of the head, then at the clock.'
          },
          { id: 'search', label: 'Search the tower', icon: 'search', puzzle: 'tower-search',
            desc: 'Five details the killer missed',
            requires: ['body-note'],
            hint: 'Search the rope, the bell frame, the floor, the ledge, and the space under the clock.'
          },
          { id: 'tape', label: 'Play Enoch’s recorder', icon: 'audio', puzzle: 'recording',
            desc: 'A cassette in a chalk bag',
            requires: ['recorder'],
            hint: 'The recorder was still in its chalk bag. Listen past the bells to the voices.'
          },
          { id: 'cipher', label: 'Decode the bell inscription', icon: 'cipher', puzzle: 'inscription',
            desc: 'A line of letters around the tenor bell',
            requires: ['recorder'],
            hint: 'The inscription is a Caesar shift. Turn the wheel until it reads as English.'
          }
        ]
      },
      {
        id: 'church', name: 'The church and vestry', short: 'Church', time: '20:00',
        art: { kind: 'church' },
        requires: ['body-note'],
        intro: 'The nave is dim and cold, with a Christmas tree nobody has taken down. The vestry is a small room behind the organ: a desk, a filing cabinet, a safe, and a framed photograph of the bell band from 1974.',
        actions: [
          { id: 'vestry', label: 'Search the vestry', icon: 'ledger',
            desc: 'Service book, faculty papers, a visitor list',
            requires: ['bell-inscription'],
            text: [
              'The vestry desk is neat to the point of obsession. The service book has been altered: the entry for the bell-ringing practice on Thursday has been inked out and replaced with “cancelled”.',
              'A folder marked <b>“FACULTY — BELLS”</b> holds a letter from the diocesan office approving the sale of the bells for £340,000. The letter is dated three months ago. The church council minutes recording the vote are dated two weeks ago.',
              'A visitor list for the tower open day shows four names: Alice Marchetti, Ian Kettle, Tobias Rook, and a single line in Enoch’s hand: <b>“Man from the foundry — did not give a name.”</b>'
            ],
            gives: ['service-book', 'faculty-letter', 'visitor-list'],
            hint: 'The faculty letter is older than the vote. Read the service book entry too.'
          },
          { id: 'safe', label: 'Open the vestry safe', icon: 'keypad', puzzle: 'safe',
            desc: 'Four digits · the tenor bell’s date',
            requires: ['service-book'],
            hint: 'The tenor bell bears the date 1864. The safe code is 1864.'
          },
          { id: 'camera', label: 'Enhance the churchyard camera', icon: 'cctv', puzzle: 'churchyard',
            desc: '18:12 — a figure by the north door',
            requires: ['body-note'],
            hint: 'The camera covers the north door. Enhance until the figure resolves.'
          }
        ]
      },
      {
        id: 'foundry', name: 'Rook Bell Foundry', short: 'Bell foundry', time: '08:00',
        art: { kind: 'factory', mood: 'cold' },
        requires: ['replica-invoice'],
        intro: 'A low brick workshop behind the railway, cold as a cellar. The furnace is out. In the casting yard stand six enormous bell moulds, each one identical. Tobias Rook is drinking tea from a enamel mug with a bell on it.',
        actions: [
          { id: 'tobias', label: 'Interview Tobias Rook', icon: 'user', suspect: 'tobias',
            desc: 'Bell-founder · the last man to see the bells',
            hint: 'Tobias cast the replacements. Ask him when, and for whom.'
          },
          { id: 'ledger', label: 'Search the foundry office', icon: 'ledger',
            desc: 'Order book, shipping docket, a photograph',
            requires: ['replica-invoice'],
            text: [
              'The order book records a commission from Meridian Heritage Ltd for “eight bells, tenor weight 14 cwt, distressed finish”. The delivery address is a private warehouse at the docks. The date is six weeks ago.',
              'The shipping docket is stamped <b>PAID — A. MARCHETTI</b> in the vicar’s own hand. The payment came from the church’s restoration fund.',
              'A photograph on the office wall shows Tobias and Enoch at the foundry twenty years ago, both much younger, both laughing. Enoch has his arm around Tobias’s shoulder. On the back: <b>“The only honest bell man I know.”</b>'
            ],
            gives: ['foundry-ledger', 'shipping-docket', 'old-photo'],
            hint: 'The foundry made eight new bells. Find the order and the shipping address.'
          },
          { id: 'logic', label: 'Cross-check the sightings', icon: 'chart', puzzle: 'sightings',
            desc: 'Three people, three places, one lie',
            requires: ['foundry-ledger', 'photo-still'],
            hint: 'Match each person to their vehicle and their 18:10 location using the gate log and the camera still.'
          }
        ]
      },
      {
        id: 'vicarage', name: 'The vicarage', short: 'Vicarage', time: '09:30',
        art: { kind: 'house' },
        requires: ['sale-docs'],
        intro: 'A stone house beside the church with a leaking gutter and a garden full of unpruned roses. The study is warmer than the church. Rev. Alice Marchetti is at her desk in a clerical shirt, writing a funeral address for a man she is also a suspect in the death of.',
        actions: [
          { id: 'alice', label: 'Interview Rev. Alice Marchetti', icon: 'user', suspect: 'alice',
            desc: 'Vicar · signatory to the bell sale',
            hint: 'Alice signed the foundry docket. Ask her about the money and about 18:10.'
          },
          { id: 'study', label: 'Search the study', icon: 'search',
            desc: 'A diary, a letter, and a key cabinet',
            requires: ['sale-docs'],
            text: [
              'Alice’s diary for Thursday is open on the desk. <b>“18:00 — tower. E. P. — final.”</b> The entry is underlined twice.',
              'A letter from the diocesan registrar warns that the bell sale cannot proceed while a formal objection is lodged. A note in Alice’s hand in the margin: <b>“He cannot lodge it if he is gone.”</b>',
              'The key cabinet has a hook labelled TOWER. The hook is empty. Below it, a second label: <b>SPARE — NORTH DOOR.</b> The spare key is there, still on its ring.'
            ],
            gives: ['alice-diary', 'registrar-letter', 'key-cabinet'],
            hint: 'Her diary puts her at the tower at six. The margin note is worse.'
          }
        ]
      },
      {
        id: 'pub', name: 'The Bell and Anchor', short: 'The pub', time: '11:00',
        art: { kind: 'interior' },
        requires: ['photo-still'],
        intro: 'A low-beamed pub at the bottom of the hill, full of brass bells and framed photographs of the old ringers. Cass Pyle is in the corner with a glass of lemonade and her grandfather’s coat folded on the bench beside her.',
        actions: [
          { id: 'cass', label: 'Interview Cass Pyle', icon: 'user', suspect: 'cass',
            desc: 'Granddaughter · found the body',
            hint: 'Cass found him. Ask her what she saw and what she was doing before.'
          },
          { id: 'timeline', label: 'Rebuild the evening', icon: 'clock', puzzle: 'timeline',
            desc: 'Seven moments between 17:55 and 18:40',
            requires: ['photo-still', 'visitor-list'],
            hint: 'Use the tower clock, the camera, the gate log and the statements. Start with Enoch going up.'
          },
          { id: 'regulars', label: 'Talk to the bell band', icon: 'users',
            desc: 'The ringers who did not ring',
            requires: ['timeline'],
            text: [
              'The band is four old men and Cass. They had been told practice was cancelled by text at 16:40 — from Enoch’s phone. None of them thought it strange. Enoch often cancelled when his chest was bad.',
              '“He was going to ring a quarter peal for the bishop,” one says. “He had been practising the method all week. He would not have cancelled that.”',
              'Another man, the treble ringer, adds: “The week before, he asked me whether I had ever heard the bells sound wrong. I said they sounded the same as always. He said, ‘That is the trouble.’”'
            ],
            gives: ['band-statement', 'cancel-text'],
            hint: 'The cancellation text came from Enoch’s phone. Who had it after he died?'
          }
        ]
      }
    ],
    puzzles: {
      'tower-search': {
        type: 'hotspot', title: 'The Ringing Chamber', subtitle: 'Five details the killer missed', icon: 'search',
        scene: { kind: 'church' },
        targets: [
          { label: 'Filings by the clock', x: 30, y: 38, r: 5.5, text: 'Fine brass filings on the floor beneath the clock case. Someone adjusted the mechanism with a file — and stopped it at 18:17 to fix the time of death.' },
          { label: 'Oil footprint', x: 57, y: 74, r: 6, text: 'A partial footprint in dark oil by the ladder. The tread is a woman’s walking boot, size six. Cass wears boots; so does the vicar.' },
          { label: 'Recorder in the chalk bag', x: 69, y: 66, r: 5.5, text: 'A small handheld recorder in a canvas chalk bag, switched off but still warm. The tape counter reads 00:18:42.' },
          { label: 'Spare key on the ledge', x: 22, y: 62, r: 5, text: 'A brass tower key on the stone ledge behind the door, wiped but not hidden. It is the spare from the vicarage cabinet.' },
          { label: 'Wax on the bell rope', x: 46, y: 30, r: 5.5, text: 'Fresh rope wax on the seventh rope, and a clean cut above the knot. The rope was cut after Enoch was already dead.' }
        ],
        note: 'Click directly on the details. The tower has not been cleaned since the body was found.',
        hintText: 'Look below the clock, by the ladder, near the chalk bag, on the ledge, and at the rope.',
        success: 'The tower gives up five details: brass filings, an oil footprint, Enoch’s recorder, the spare tower key, and a rope cut after death.',
        successTitle: 'The clock was stopped by hand.',
        gives: ['oil-print', 'recorder', 'spare-key', 'rope-cut'], flags: ['towerSearched'],
        short: 'The clock was tampered with and the recorder found.',
        log: 'The tower search finds brass filings beneath the stopped clock, an oil footprint, Enoch’s recorder, the vicarage spare key, and a bell rope cut post-mortem.'
      },
      recording: {
        type: 'audio', title: 'Enoch’s Recorder', subtitle: '00:18:42 — the argument in the tower', icon: 'audio',
        prompt: 'The recorder was still in Enoch’s chalk bag. The first fifteen minutes are the sound of bells and footsteps. The last three are voices.',
        pattern: [180, 0, 240, 180, 360, 0, 300, 200],
        tempo: 0.46,
        waveform: 'A heavy door. Boots on stone. Enoch’s voice, low and angry. A woman answering. The clink of a metal case. Then a long, muffled scrape, and silence.',
        options: [
          { t: 'Enoch arguing with Rev. Alice Marchetti about the bell sale', v: 'alice' },
          { t: 'Enoch arguing with Tobias Rook about a bad casting', v: 'tobias' },
          { t: 'Enoch praying alone in the bell chamber', v: 'prayer' },
          { t: 'Cass Pyle begging her grandfather to cancel the practice', v: 'cass' }
        ],
        answer: 'alice',
        wrong: 'Listen for the woman’s voice. She is the one giving orders, not asking questions.',
        hintText: 'The woman says “the faculty is signed”. Only one person in this case would call the paperwork “the faculty”.',
        success: 'The recording is clear enough. Enoch: <i>“You cannot sell them. They are not yours.”</i> Alice: <i>“They are not bells any more, Enoch. They are a liability.”</i> A metal case closes. Enoch: <i>“I have copies of everything. The faculty. The invoice. The photographs.”</i> Alice, very quietly: <i>“Then you have made this difficult.”</i>',
        successTitle: 'The vicar was in the tower.',
        gives: ['audio-recording'], flags: ['tapePlayed'],
        short: 'Alice argued with Enoch about the bell sale minutes before he died.',
        log: 'Enoch’s recorder captures Rev. Alice Marchetti arguing with him about the bell sale. He tells her he has copies of everything; she says he has made things difficult.'
      },
      inscription: {
        type: 'cipher', title: 'The Tenor Inscription', subtitle: 'A Caesar wheel in the bell chamber', icon: 'cipher',
        plain: 'THE BELLS ARE FALSE', shift: 5,
        prompt: 'Around the shoulder of the tenor bell runs a Latin inscription. Under it, scratched into the bronze in Enoch’s hand, is a second line of letters that is not Latin at all.',
        note: 'Turn the wheel until the words resolve. The answer is the message, not the shift.',
        placeholder: 'Type the decoded message…',
        answer: ['the bells are false', 'bells are false'],
        wrong: 'The words are still shifted. Try another setting and read the first word aloud.',
        hintText: 'Shift the wheel five places back. The first word resolves to THE.',
        success: 'The scratched line resolves: <b>THE BELLS ARE FALSE.</b> Enoch had discovered that the bells hanging in the tower were not the originals. The real peal had already gone.',
        successTitle: 'The bells in the tower are copies.',
        gives: ['bell-inscription'], flags: ['cipherSolved'],
        short: 'The bells in the tower are replicas.',
        log: 'A line scratched inside the tenor bell decodes to “THE BELLS ARE FALSE” — Enoch’s warning that the tower bells had been replaced.'
      },
      safe: {
        type: 'keypad', title: 'The Vestry Safe', subtitle: 'Four-digit keypad', icon: 'keypad',
        deviceLabel: 'ST CUTHBERT’S VESTRY', length: 4, code: '1864',
        prompt: 'A small safe bolted inside the vestry cupboard. The keypad wants four digits. <span style="color:var(--dim)">Enoch used the date cast into the tenor bell for every church combination.</span>',
        hintText: 'The tenor bell is dated 1864. Enter 1864.',
        successTitle: 'The safe opens.',
        success: 'Inside: the sale contract for the peal, a folder of faculty correspondence, and an invoice from Rook Bell Foundry for eight replacement bells.',
        gives: ['sale-docs', 'replica-invoice'], flags: ['safeOpen'],
        short: 'The bell sale contract and replica invoice are recovered.',
        log: 'The vestry safe holds the £340,000 bell sale contract, diocesan correspondence, and an invoice for eight replacement bells from Rook Bell Foundry.'
      },
      churchyard: {
        type: 'photo', title: 'Churchyard Camera', subtitle: 'Enhance the 18:12 still', icon: 'cctv',
        scene: { kind: 'church', mood: 'cold' },
        target: { x: 62, y: 52, w: 16, h: 30 }, range: [56, 76],
        question: 'Who is walking toward the tower’s north door at 18:12?',
        options: [
          { t: 'Rev. Alice Marchetti, in a dark raincoat, carrying a key', v: 'alice' },
          { t: 'Tobias Rook, in foundry overalls, carrying a tool bag', v: 'tobias' },
          { t: 'Cass Pyle, in her ringing jumper, carrying a bell rope', v: 'cass' },
          { t: 'A delivery driver with a parcel', v: 'driver' }
        ],
        answer: 'alice',
        reveal: 'The figure resolves: a woman in a dark raincoat, collar up, walking briskly toward the north door. A car is parked on the gravel behind her, engine running, headlights off. The key in her hand catches the light.',
        wrong: 'The figure is at the north door, not in the lane. Slide into the clear band and look at the coat and the car.',
        hintText: 'The clear band is 56% to 76%. Look for the car and the key.',
        success: 'The camera places Alice Marchetti at the tower’s north door at 18:12 — six minutes before the clock stopped. Her car was on the gravel with its lights off.',
        successTitle: 'The vicar came in the back way.',
        gives: ['photo-still'], flags: ['cameraDone'],
        short: 'Alice was at the tower at 18:12.',
        log: 'The churchyard camera shows Rev. Alice Marchetti entering the tower by the north door at 18:12, her car parked with its lights off.'
      },
      sightings: {
        type: 'logicgrid', title: 'Three Sightings', subtitle: 'Match the person, the vehicle and the place', icon: 'chart',
        prompt: 'The gate log, the camera still and the foundry docket give three partial pictures. Cross-check them.',
        rows: [
          { label: 'The raincoat at the north door', selects: [
            { label: 'person', options: [{ v: 'alice', t: 'Rev. Alice Marchetti' }, { v: 'tobias', t: 'Tobias Rook' }, { v: 'cass', t: 'Cass Pyle' }], answer: 'alice' },
            { label: 'vehicle', options: [{ v: 'car', t: 'Small car, lights off' }, { v: 'van', t: 'Foundry van' }, { v: 'bike', t: 'Bicycle' }], answer: 'car' }
          ] },
          { label: 'The figure in the foundry yard', selects: [
            { label: 'person', options: [{ v: 'alice', t: 'Rev. Alice Marchetti' }, { v: 'tobias', t: 'Tobias Rook' }, { v: 'ian', t: 'Ian Kettle' }], answer: 'tobias' },
            { label: 'time', options: [{ v: '1730', t: '17:30' }, { v: '1810', t: '18:10' }, { v: '1830', t: '18:30' }], answer: '1730' }
          ] },
          { label: 'The person who found the body', selects: [
            { label: 'person', options: [{ v: 'alice', t: 'Rev. Alice Marchetti' }, { v: 'cass', t: 'Cass Pyle' }, { v: 'ian', t: 'Ian Kettle' }], answer: 'cass' },
            { label: 'item', options: [{ v: 'key', t: 'The tower key' }, { v: 'rope', t: 'A bell rope' }, { v: 'phone', t: 'Enoch’s phone' }], answer: 'key' }
          ] }
        ],
        wrong: 'Check the camera still, the foundry time clock and Cass’s statement again. One person cannot be in two places.',
        hintText: 'Alice is the raincoat and the car. Tobias clocked in at 17:30. Cass found the body with the key in Enoch’s pocket.',
        success: 'The three accounts lock together. Alice was at the tower at 18:12. Tobias was in the foundry until half past five. Cass found the body with the tower key in her grandfather’s coat.',
        successTitle: 'The sightings agree.',
        gives: ['sightings'], flags: ['logicDone'],
        short: 'The three sightings place Alice at the tower.',
        log: 'A cross-check of the sightings places Alice at the north door with her car, Tobias in the foundry until 17:30, and Cass at the tower with the key.'
      },
      timeline: {
        type: 'sequence', title: 'The Evening, In Order', subtitle: 'Seven moments before the body was found', icon: 'clock', variant: 'strips',
        prompt: 'The tower clock, the camera, the gate log and the statements disagree. Put the evening in order.',
        items: [
          { t: 'Enoch climbs the tower to check the bells', sub: '17:55 — band statement', order: 1 },
          { t: 'Alice enters by the north door', sub: '18:12 — churchyard camera', order: 2 },
          { t: 'The argument in the bell chamber', sub: '18:13 — recorder', order: 3 },
          { t: 'The clock stops', sub: '18:17 — tower mechanism', order: 4 },
          { t: 'Alice leaves through the north door', sub: '18:20 — camera', order: 5 },
          { t: 'Cass finds the body', sub: '18:35 — pub statement', order: 6 },
          { t: 'The police are called', sub: '18:40 — log', order: 7 }
        ],
        wrong: 'Alice arrived after Enoch went up. The clock stopped before she left. Check the camera times.',
        hintText: 'Enoch 17:55, Alice 18:12, argument 18:13, clock 18:17, Alice leaves 18:20, Cass 18:35, police 18:40.',
        success: 'The evening assembles itself: Enoch went up at five to six, Alice followed seventeen minutes later, the argument ran for four minutes, the clock stopped, and Alice left three minutes after that. She had twenty minutes before Cass arrived.',
        successTitle: 'Alice had twenty minutes alone with the body.',
        gives: ['timeline'], flags: ['timelineBuilt'],
        short: 'Alice was in the tower before the clock stopped.',
        log: 'Timeline: Enoch 17:55; Alice 18:12; argument 18:13; clock stopped 18:17; Alice left 18:20; Cass found the body 18:35.'
      }
    },
    suspects: [
      {
        id: 'alice', name: 'Rev. Alice Marchetti', role: 'Vicar of St Cuthbert’s', location: 'vicarage', locationName: 'The vicarage', tag: 'Prime suspect',
        portrait: { seed: 'alice-marchetti', hair: 'bob', hairColor: '#4a3b2a', skin: 0, expression: 'wary', collar: 'shirt', glasses: 'round', eyes: '#3a2159' },
        intro: 'Forty-six, composed, with the particular calm of someone who has been the most reasonable person in the room for twenty years. She signed the sale. She holds the spare key. She was in the tower at 18:12.',
        questions: [
          { q: 'Where were you between six and half past six?', requires: ['photo-still'],
            a: '“At the vicarage, preparing my sermon.” She meets your eyes. “I did not go to the tower. The camera must be wrong, or you are misreading it.” A pause. “I have a coat like that. Half the parish has a coat like that.”',
            gives: ['alice-alibi'], flags: ['aliceHostile'] },
          { q: 'Your diary says “18:00 — tower — E. P. — final.”', requires: ['alice-diary'], present: true,
            a: '“I wanted to speak to him about the sale. He was being obstructive.” She folds her hands. “I went at six. He was not there. I waited five minutes and left. I never went up.”',
            gives: ['alice-diary-excuse'] },
          { q: 'Enoch recorded your argument. You said he had made things difficult.', requires: ['audio-recording'], present: true,
            a: 'The calm cracks, just at the edge. “He was threatening to report me to the diocese. He had copies of the faculty letter — letters he should never have seen. I said things I regret. That is not murder.”',
            gives: ['alice-recording'], flags: ['aliceBroke'] },
          { q: 'The spare tower key from your cabinet was found on the ledge.', requires: ['spare-key'], present: true,
            a: '“Then someone took it.” She looks at the key cabinet. “The cabinet is not locked. The whole parish has access to that room. You cannot hang a woman on an unlocked cupboard.”',
            gives: ['alice-key'] },
          { q: 'The clock was stopped at 18:17 with a file from your study.', requires: ['rope-cut'], present: true,
            a: 'She is silent for a long moment. “Enoch was a good man,” she says at last. “He was also a stubborn one. The church is falling down around us. The bells were the only asset we had. He could not see that.” She looks up. “I did not kill him.”',
            gives: ['alice-clock'], flags: ['aliceBroke'] }
        ],
        after: 'She asks whether she may still take the funeral. You tell her that will be for the bishop to decide. She nods, as if she already knew.'
      },
      {
        id: 'tobias', name: 'Tobias Rook', role: 'Bell-founder · cast the replacements', location: 'foundry', locationName: 'Rook Bell Foundry', tag: 'Suspect',
        portrait: { seed: 'tobias-rook', hair: 'short', hairColor: '#8d8d99', skin: 1, expression: 'sad', collar: 'coat', beard: 'full', age: 'old' },
        intro: 'Sixty-three, with foundry dust in every crease and a handshake like a vice. He cast the eight replacements and knew Enoch for forty years. He has not stopped looking at the photograph on his office wall.',
        questions: [
          { q: 'You cast eight bells for St Cuthbert’s.', requires: ['replica-invoice'], present: true,
            a: '“Aye. Eight bells, distressed finish, delivered six weeks ago.” He turns his mug. “I did not ask where they were going. I should have. Enoch would have asked.”',
            gives: ['tobias-cast'] },
          { q: 'Enoch was your friend.', requires: ['old-photo'], present: true,
            a: '“The best man I knew.” His voice is flat. “He came to me in the spring. Asked me to cast a peal that looked old. I told him it was a strange thing to want. He said it was for the church.” He looks away. “I did not know they meant to hang them in his tower and sell the real ones.”',
            gives: ['tobias-friend'] },
          { q: 'Where were you at six o’clock?', requires: ['foundry-ledger'],
            a: '“Here. The time clock says 17:30 and I was in the yard until seven.” He gestures at the window. “The lad was with me. We were loading the last moulds.”',
            gives: ['tobias-alibi'] },
          { q: 'Who paid for the bells?', requires: ['shipping-docket'], present: true,
            a: '“The church restoration fund. The docket is signed by the vicar.” He rubs his eyes. “I should have smelled it. Enoch did. He came here a fortnight ago and asked me to keep the patterns. I thought he was being sentimental.”',
            gives: ['tobias-payment'] }
        ],
        after: 'He gives you the patterns for the eight replacement bells without being asked. “For the court,” he says. “If it comes to that.”'
      },
      {
        id: 'cass', name: 'Cass Pyle', role: 'Granddaughter · bell-ringer', location: 'pub', locationName: 'The Bell and Anchor', tag: 'Suspect',
        portrait: { seed: 'cass-pyle', hair: 'long', hairColor: '#b06a2c', skin: 2, expression: 'sad', collar: 'shirt', eyes: '#2b1a12' },
        intro: 'Twenty-four, in a ringing jumper with a bell on the front, holding a glass she has not drunk from. She found him. She also stands to inherit his cottage, his books, and his share of the bell fund.',
        questions: [
          { q: 'What did you see when you opened the tower?', requires: ['body-note'],
            a: '“The door was locked. I used his key — it was in his coat. I thought he had fallen.” She stops. “He was hanging. The seventh rope. I cut him down. I know I should not have. I could not leave him like that.”',
            gives: ['cass-statement'] },
          { q: 'You inherit his cottage.', requires: ['cass-statement'], present: true,
            a: '“He left me the cottage. He left the church the bell fund. He left me a box of letters I have not opened.” She looks at the table. “I would rather have him.”',
            gives: ['cass-inheritance'], flags: ['cassHostile'] },
          { q: 'Someone cancelled the practice from Enoch’s phone at 16:40.', requires: ['cancel-text'], present: true,
            a: '“He often cancelled.” She frowns. “But he was excited about Thursday. He had been practising the method all week. He would not have cancelled that.” She looks up. “You think whoever killed him sent the text.”',
            gives: ['cass-text'] },
          { q: 'Did your grandfather say anything about the bells sounding wrong?', requires: ['band-statement'],
            a: '“He asked me to listen to the tenor. He said it had a false note.” She shakes her head. “I told him he was going deaf. He said, ‘No, love. The bell is lying.’” She wipes her eyes. “I thought he was joking.”',
            gives: ['cass-bell'] }
        ],
        after: 'She asks whether the bells will be taken away now. You tell her you do not know. She says, “Good,” and means it.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Enoch Pyle — post-mortem note', caption: 'Blunt trauma · hanging staged', icon: 'blood', type: 'Forensic report',
        desc: 'A blow to the back of the head killed Enoch Pyle. The ligature marks are post-mortem: he was hanged after he was already dead.',
        tells: 'The killer struck him from behind, then staged a suicide. This is murder.'
      },
      'bell-rope': {
        name: 'Cut bell rope', caption: 'Seventh rope · noose · cut above the knot', icon: 'rope', type: 'Physical evidence',
        desc: 'The seventh bell rope, cut about two metres up and knotted into a noose. The cut edge is clean and the rope has fresh wax.',
        tells: 'The rope was cut after the body was placed. The killer used the tower’s own equipment.'
      },
      'clock-stop': {
        name: 'Stopped tower clock', caption: '18:17 · brass filings beneath', icon: 'clock', type: 'Scene mark',
        desc: 'The tower clock stopped at 18:17, its glass intact. Brass filings on the floor show the mechanism was adjusted by hand.',
        tells: 'The killer stopped the clock to fix a time of death. The real time may be earlier.'
      },
      'clapper': {
        name: 'Loose bell clapper', caption: 'Detached · dark stain · grey hairs', icon: 'tool', type: 'Weapon',
        desc: 'The clapper of the disused tenor bell, lying beneath its frame. There is a dark stain on the bulb and a few grey hairs caught in the pivot.',
        tells: 'The murder weapon came from the tower itself. The killer used the bell’s own iron.'
      },
      'oil-print': {
        name: 'Oil footprint', caption: 'Woman’s boot · size six · by the ladder', icon: 'footprint', type: 'Trace evidence',
        desc: 'A partial footprint in dark oil at the foot of the ladder, made by a woman’s walking boot, size six.',
        tells: 'A woman climbed to the bell chamber after the mechanism was oiled. Cass and Alice both wear that size.'
      },
      'recorder': {
        name: 'Enoch’s recorder', caption: 'Handheld cassette · 00:18:42', icon: 'audio', type: 'Device',
        desc: 'A small handheld recorder in Enoch’s chalk bag, switched off but still warm, with eighteen minutes of tape used.',
        tells: 'Enoch was recording in the tower. The tape may hold the argument that killed him.'
      },
      'spare-key': {
        name: 'Spare tower key', caption: 'Vicarage cabinet · found on the ledge', icon: 'key', type: 'Physical evidence',
        desc: 'A brass tower key from the vicarage key cabinet, wiped but left on the stone ledge inside the ringing chamber.',
        tells: 'The killer had access to the vicarage key cabinet and used the spare to lock the tower behind them.'
      },
      'rope-cut': {
        name: 'Post-mortem rope cut', caption: 'Fresh wax · clean blade cut', icon: 'rope', type: 'Forensic detail',
        desc: 'The bell rope was cut cleanly above the noose after the body was suspended. Fresh wax is smeared on the cut.',
        tells: 'The killer handled the rope after death. The staging was deliberate, not panicked.'
      },
      'bell-inscription': {
        name: 'Decoded bell inscription', caption: '“THE BELLS ARE FALSE”', icon: 'cipher', type: 'Puzzle solution',
        desc: 'A Caesar-shifted line scratched inside the tenor bell, decoding to a warning from Enoch.',
        tells: 'Enoch knew the bells in the tower were not the originals. He was documenting a swap.'
      },
      'service-book': {
        name: 'Altered service book', caption: 'Thursday practice “cancelled”', icon: 'note', type: 'Record',
        desc: 'The church service book, with the Thursday bell practice inked out and replaced with “cancelled” in a different hand.',
        tells: 'Someone wanted the tower empty on Thursday evening. The change was made before Enoch died.'
      },
      'faculty-letter': {
        name: 'Diocesan faculty letter', caption: 'Sale approved · £340,000', icon: 'letter', type: 'Official record',
        desc: 'A letter from the diocesan office approving the sale of the eight bells for £340,000, dated three months before the church council vote.',
        tells: 'The sale was arranged before the congregation knew. The paperwork was already in motion.'
      },
      'visitor-list': {
        name: 'Tower open-day list', caption: 'Alice · Ian · Tobias · “man from the foundry”', icon: 'note', type: 'Record',
        desc: 'A list of visitors to the tower, including Alice Marchetti, Ian Kettle, Tobias Rook, and an unnamed foundry man in Enoch’s hand.',
        tells: 'All three suspects had recently been inside the tower. Enoch was suspicious of the foundry visit.'
      },
      'sale-docs': {
        name: 'Bell sale contract', caption: 'Meridian Heritage · £340,000', icon: 'ledger', type: 'Contract',
        desc: 'The contract for the sale of St Cuthbert’s peal to Meridian Heritage Ltd, signed by Rev. Alice Marchetti and Ian Kettle.',
        tells: 'Alice and Ian stood to make the sale happen. Enoch was the formal objector blocking it.'
      },
      'replica-invoice': {
        name: 'Replica bell invoice', caption: 'Eight bells · Rook Foundry · paid by A. Marchetti', icon: 'receipt', type: 'Financial record',
        desc: 'An invoice for eight replacement bells from Rook Bell Foundry, marked paid from the church restoration fund and signed by Alice Marchetti.',
        tells: 'The bells in the tower were already copies. The real peal had been sold and replaced.'
      },
      'photo-still': {
        name: 'Churchyard still, 18:12', caption: 'Raincoat · north door · car with lights off', icon: 'cctv', type: 'Surveillance',
        desc: 'An enhanced camera still of a woman in a dark raincoat entering the tower’s north door at 18:12, with a car parked behind her.',
        tells: 'Alice was at the tower six minutes before the clock stopped, contradicting her statement.'
      },
      'foundry-ledger': {
        name: 'Foundry order book', caption: 'Eight bells · distressed finish', icon: 'ledger', type: 'Record',
        desc: 'The foundry order book recording a commission for eight replacement bells, tenor weight fourteen hundredweight, delivered six weeks ago.',
        tells: 'The replica peal was cast to order. This was a planned swap, not an accident.'
      },
      'shipping-docket': {
        name: 'Shipping docket', caption: 'Paid · A. Marchetti · docks warehouse', icon: 'receipt', type: 'Financial record',
        desc: 'A docket for the delivery of eight bells to a private warehouse at the docks, stamped paid by A. Marchetti.',
        tells: 'Alice paid for the replicas and arranged their delivery. She was at the centre of the fraud.'
      },
      'old-photo': {
        name: 'Photograph of Enoch and Tobias', caption: '“The only honest bell man I know.”', icon: 'photo', type: 'Personal item',
        desc: 'A photograph of Enoch and Tobias at the foundry twenty years ago, inscribed by Enoch.',
        tells: 'Tobias and Enoch were old friends. Tobias had no reason to kill him.'
      },
      'audio-recording': {
        name: 'Tower recording', caption: '“Then you have made this difficult.”', icon: 'audio', type: 'Audio evidence',
        desc: 'Enoch’s recorder captures an argument with Alice Marchetti about the bell sale, ending with her quiet threat.',
        tells: 'Alice was in the tower with Enoch minutes before he died. Her alibi is false.'
      },
      'alice-diary': {
        name: 'Alice’s diary', caption: '“18:00 — tower — E. P. — final.”', icon: 'note', type: 'Personal record',
        desc: 'The vicar’s diary entry for Thursday, underlined twice, placing her at the tower at six o’clock.',
        tells: 'Alice planned the meeting. She lied about going to the tower.'
      },
      'registrar-letter': {
        name: 'Registrar’s warning', caption: '“The sale cannot proceed while an objection stands.”', icon: 'letter', type: 'Official record',
        desc: 'A letter warning that the bell sale cannot proceed while a formal objection is lodged. Alice’s margin note reads: “He cannot lodge it if he is gone.”',
        tells: 'Alice knew exactly what Enoch’s death would achieve. The motive is in her own handwriting.'
      },
      'key-cabinet': {
        name: 'Vicarage key cabinet', caption: 'TOWER hook empty · spare on ring', icon: 'key', type: 'Physical evidence',
        desc: 'The vicarage key cabinet with an empty hook for the tower key and the north-door spare still on its ring.',
        tells: 'The tower key was taken from the vicarage. The spare was used to lock the door afterwards.'
      },
      'sightings': {
        name: 'Cross-checked sightings', caption: 'Alice · car · north door', icon: 'chart', type: 'Analysis',
        desc: 'A logic grid matching Alice to the raincoat and the car, Tobias to the foundry at 17:30, and Cass to the discovery of the body.',
        tells: 'The three accounts agree. Alice is the only person placed at the tower at 18:12.'
      },
      'timeline': {
        name: 'Evening timeline', caption: '17:55 → 18:40', icon: 'clock', type: 'Analysis',
        desc: 'Enoch went up at 17:55, Alice arrived at 18:12, the argument ran to 18:17, and Alice left at 18:20.',
        tells: 'Alice had twenty minutes alone in the tower before Cass arrived. The clock was stopped inside that window.'
      },
      'band-statement': {
        name: 'Bell band statement', caption: '“The tenor has a false note.”', icon: 'note', type: 'Witness statement',
        desc: 'The ringers confirm Enoch believed the tenor bell sounded wrong and had been asking questions about the peal.',
        tells: 'Enoch had noticed the substitution. He was investigating the bells himself.'
      },
      'cancel-text': {
        name: 'Cancellation text', caption: 'Sent 16:40 from Enoch’s phone', icon: 'phone', type: 'Digital evidence',
        desc: 'A text cancelling Thursday’s practice, sent from Enoch’s phone at 16:40. Enoch was excited about the practice and would not have cancelled it.',
        tells: 'Someone else had Enoch’s phone before the murder. The killer planned an empty tower.'
      },
      'cass-statement': {
        name: 'Cass’s statement', caption: '“The door was locked. I used his key.”', icon: 'audio', type: 'Witness statement',
        desc: 'Cass describes finding the tower locked, using Enoch’s key from his coat, and cutting him down from the seventh rope.',
        tells: 'The tower was locked from the outside with Enoch’s own key. The killer had access to his coat.'
      },
      'cass-inheritance': {
        name: 'Cass’s inheritance', caption: 'The cottage · the letters', icon: 'note', type: 'Financial record',
        desc: 'Enoch left Cass his cottage and a box of letters. The church received the bell fund.',
        tells: 'Cass had a modest motive, but no access to the vicarage key or the faculty papers.'
      },
      'cass-text': {
        name: 'Cass on the text', caption: '“He would not have cancelled that.”', icon: 'note', type: 'Statement',
        desc: 'Cass insists Enoch would not have cancelled the practice and suggests the killer sent the message.',
        tells: 'The cancellation was part of the plan. It kept the tower empty.'
      },
      'cass-bell': {
        name: 'Cass on the false note', caption: '“The bell is lying.”', icon: 'audio', type: 'Statement',
        desc: 'Cass recalls Enoch asking her to listen to the tenor and saying, “The bell is lying.”',
        tells: 'Enoch knew the bell was a replacement. He was trying to tell the band.'
      },
      'alice-alibi': {
        name: 'Alice’s first alibi', caption: '“At the vicarage, preparing my sermon.”', icon: 'audio', type: 'Statement',
        desc: 'Alice claims she did not go to the tower and dismisses the camera image as a case of mistaken identity.',
        tells: 'The camera and her own diary contradict her. She lied about the tower.'
      },
      'alice-diary-excuse': {
        name: 'Alice’s second account', caption: '“I went at six. He was not there.”', icon: 'note', type: 'Statement',
        desc: 'Confronted with her diary, Alice admits visiting the tower at six but says Enoch was not there and she left.',
        tells: 'She changed her story. The camera shows her arriving at 18:12, not 18:00.'
      },
      'alice-recording': {
        name: 'Alice on the recording', caption: '“He was threatening to report me.”', icon: 'audio', type: 'Statement',
        desc: 'Alice admits the argument and the threat in the recording but denies striking Enoch.',
        tells: 'She had motive, presence and a threat in her own voice. The physical evidence completes it.'
      },
      'alice-key': {
        name: 'Alice on the spare key', caption: '“The cabinet is not locked.”', icon: 'note', type: 'Statement',
        desc: 'Alice claims anyone could have taken the tower key from the unlocked vicarage cabinet.',
        tells: 'The key was returned to the ledge inside the locked tower. Whoever used it had already been inside.'
      },
      'alice-clock': {
        name: 'Alice on Enoch', caption: '“He could not see that.”', icon: 'audio', type: 'Statement',
        desc: 'Alice speaks about Enoch’s stubbornness and the church’s finances, but continues to deny killing him.',
        tells: 'She admits the motive and the resentment. The staged hanging was meant to close the case.'
      },
      'tobias-cast': {
        name: 'Tobias on the casting', caption: '“I did not ask where they were going.”', icon: 'audio', type: 'Statement',
        desc: 'Tobias confirms casting eight replacement bells and delivering them six weeks ago.',
        tells: 'The replica peal was made to order. He is a witness to the fraud, not its author.'
      },
      'tobias-friend': {
        name: 'Tobias on Enoch', caption: '“The best man I knew.”', icon: 'audio', type: 'Statement',
        desc: 'Tobias describes his forty-year friendship with Enoch and his regret at casting the replacements.',
        tells: 'Tobias had no motive. He was used by Alice and Ian without knowing the full plan.'
      },
      'tobias-alibi': {
        name: 'Tobias’s alibi', caption: 'Foundry time clock · 17:30–19:00', icon: 'receipt', type: 'Alibi',
        desc: 'Tobias clocked in at 17:30 and was loading moulds with an apprentice until seven.',
        tells: 'Tobias was at the foundry when Enoch died. He is not the killer.'
      },
      'tobias-payment': {
        name: 'Tobias on the payment', caption: '“The docket is signed by the vicar.”', icon: 'note', type: 'Statement',
        desc: 'Tobias confirms the restoration fund paid for the bells and that Alice signed the docket.',
        tells: 'The money trail leads to Alice, not the foundry.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Enoch Pyle?', 
          options: [
            { t: 'Cass Pyle — the granddaughter who found the body', v: 'cass' },
            { t: 'Tobias Rook — the bell-founder who cast the fakes', v: 'tobias' },
            { t: 'Rev. Alice Marchetti — the vicar who sold the bells', v: 'alice' },
            { t: 'Ian Kettle — the developer who bought them', v: 'ian' }
          ], answer: 'alice' },
        { q: 'How was Enoch killed?', 
          options: [
            { t: 'Struck from behind with the bell clapper, then hanged from the rope', v: 'clapper' },
            { t: 'Pushed from the bell chamber and hanged to hide the fall', v: 'fall' },
            { t: 'Poisoned, then strung up to look like a suicide', v: 'poison' },
            { t: 'Strangled with the bell rope during the argument', v: 'strangled' }
          ], answer: 'clapper' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Enoch was the formal objector blocking the £340,000 bell sale', v: 'sale' },
            { t: 'Enoch had stolen money from the restoration fund', v: 'theft' },
            { t: 'Enoch was going to expose Cass’s affair with Ian Kettle', v: 'affair' },
            { t: 'Enoch had refused to hand over the foundry patterns', v: 'patterns' }
          ], answer: 'sale' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The recording of Alice in the tower, the camera still, and her own diary', v: 'recording' },
            { t: 'Cass’s inheritance of the cottage', v: 'inheritance' },
            { t: 'Tobias’s foundry order book', v: 'order' },
            { t: 'The cancellation text sent from Enoch’s phone', v: 'text' }
          ], answer: 'recording' }
      ],
      verdict: {
        who: 'Rev. Alice Marchetti, 46 — vicar of St Cuthbert’s',
        whoDesc: 'was arrested at the vicarage and charged with murder. She resigned her living the same day and did not apply for bail.',
        how: 'She met Enoch in the ringing chamber, struck him from behind with the loose clapper of the disused tenor bell, and hanged him from the seventh rope. She stopped the tower clock at 18:17 to fix the time of death, then locked the tower with the spare key.',
        why: 'Enoch had lodged a formal objection to the £340,000 sale of the peal. He had copies of the faculty letter, the replica invoice, and photographs of the bells being swapped. With him alive, the sale could not proceed — and Alice had already spent part of the money.',
        key: 'Enoch’s recorder captured the argument, the churchyard camera placed Alice at the north door at 18:12, and the spare key from her own cabinet was found inside the locked tower.'
      },
      reveal: [
        'The bells of St Cuthbert’s were sold in the spring. The contract was signed by the vicar and a man named Ian Kettle, who ran a heritage company with a warehouse at the docks and a talent for making old things disappear. The price was £340,000. The congregation was told the peal needed restoration they could not afford.',
        'The real bells left the tower on a Tuesday in June, in a furniture van with no markings. The replacements arrived the same afternoon: eight new bells from Rook Bell Foundry, cast to look six hundred years old, with a distressed finish and a false inscription. Tobias Rook made them because the church asked him to. He did not ask why.',
        'Enoch Pyle noticed within a week. He had rung those bells for fifty-three years. He knew the tenor’s hum, the third’s slight flatness, the way the treble rang on a frosty morning. The new peal sounded perfect. That was how he knew.',
        'He started asking questions. He found the faculty letter in the vestry, older than the vote that was supposed to authorise it. He found the invoice. He photographed the bell fittings. He lodged a formal objection with the diocese, which meant the sale could not be completed while he lived.',
        'Alice Marchetti had already spent £90,000 of the money on roof repairs and a new heating system. She told herself it was for the church. She told herself Enoch was being selfish. On Thursday evening she went to the tower to ask him one last time to withdraw the objection.',
        'He refused. He recorded her. He said he had copies of everything. She picked up the loose clapper from the disused tenor and hit him once, from behind. He fell without a sound. Then she did the thing that turned a moment of violence into a murder: she staged it.',
        'She cut the seventh rope, knotted it, and hanged him. She stopped the clock at 18:17 with a file from her study. She locked the tower with the spare key and went out through the north door, where the camera caught her at 18:12 on the way in and 18:20 on the way out. She walked back to the vicarage and began writing a funeral address.',
        'She would have got away with it if Enoch had not been the kind of man who recorded everything. The cassette was still in his chalk bag. The spare key was still on the ledge. The brass filings were still under the clock. And his granddaughter knew he would never have cancelled a quarter peal.',
        'Ian Kettle was charged with fraud and handling stolen goods. The real bells were recovered from a warehouse in Rotterdam and returned to the diocese. They were rehung two years later, in a service Cass Pyle did not attend.',
        'Alice Marchetti was convicted of murder and sentenced to life with a minimum of sixteen years. At the trial, the prosecution played the recording. The court heard Enoch say, “You cannot sell them. They are not yours.” Then it heard the vicar reply, “They are not bells any more, Enoch. They are a liability.”',
        'The bells were rung for the first time on the anniversary of his death. Cass pulled the tenor. It sounded, she said, exactly right.'
      ],
      quote: 'They are not bells any more, Enoch. They are a liability.',
      twist: 'The final detail was the clock. Alice stopped it at 18:17 to make the time of death look later, but the tower clock had been running seven minutes fast for a month — Enoch had noted it in the service book. The real time of the blow was 18:10, while Alice’s car was still on the gravel with its lights off.'
    }
  });
})();
