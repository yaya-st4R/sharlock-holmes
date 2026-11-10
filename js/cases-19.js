/* ============================================================
   CASE 25 — THE MERIDIAN FILE  (FINALE)
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c25', num: 25,
    title: 'The Meridian File',
    subtitle: 'The founder of Meridian Heritage dies on the eve of the sale that would have saved him, and every case in the city ends in the same room.',
    difficulty: 5, est: '60–75 min',
    cover: { kind: 'theatre', mood: 'mansion' },
    facts: [
      { k: 'Victim', v: 'Ian Kettle, 61 — chairman of Meridian Heritage' },
      { k: 'Scene', v: 'The saleroom, Meridian House' },
      { k: 'Found', v: '07:05 — by the cleaning supervisor' },
      { k: 'Cause', v: 'Electrocution · rigged stage spotlight' }
    ],
    briefing: [
      'Meridian House stands on the river at the end of a private lane: a Victorian auction room with a glass roof, a lot vault below and a gallery of things that were never meant to be seen together. For fifty years it has sold provenance. Some of that provenance was manufactured. Some of it was stolen.',
      'At nine this morning Meridian Heritage was due to hold the Provenance Sale — twenty-five private lots, by invitation only, for buyers who do not like their names in catalogues. The star lot was a bronze bell listed as a nineteenth-century replica. The reserve was on application.',
      'At seven the cleaning supervisor found Ian Kettle dead on the stage beneath a fallen spotlight. The stage was wet. The spotlight’s earth wire had been cut. The first officer wrote “industrial accident” and asked whether the sale would be postponed.',
      'Kettle had spent the last month negotiating with the police. He had offered the master ledger of Meridian Heritage — every purchase, every bribe, every name — in exchange for immunity. At eight last night he telephoned the incident room and said he would bring the ledger and the bell to the station at nine this morning.',
      'He did not come. Somebody cut a wire instead, and left him on the stage where the sale was to be held. The twenty-four other lots are still in the vault. The bell is still in the gallery. The ledger is not where anyone expected it to be.',
      'You have twenty-five case files on your desk. This is the one that closes them.'
    ],
    opening: 'The saleroom is dark except for the work lights. Ian Kettle lies on his back at the centre of the stage, one arm across his chest, his shoes in a shallow pool of water. A spotlight hangs beside him from a snapped chain, its lens burst. Above, the lighting gantry runs the length of the glass roof like a narrow iron bridge. The auction podium is untouched. On it, a printed card reads: LOT 25 — THE MERIDIAN BELL.',
    objectives: [
      'Prove the spotlight was deliberately rigged.',
      'Find the master ledger before the sale can be stopped.',
      'Connect the twenty-five lots to the Meridian network.',
      'Identify who at Meridian House had the reach and the reason.'
    ],
    locations: [
      {
        id: 'saleroom', name: 'The saleroom', short: 'Saleroom', time: '07:30',
        art: { kind: 'theatre', mood: 'mansion' },
        intro: 'A glass-roofed auction room with rows of empty chairs, a raised stage and a lighting gantry overhead. Ian Kettle is on the stage under the work lights. The stage is wet in a neat rectangle around the podium. The broken spotlight lies on its side, trailing a cut cable.',
        actions: [
          { id: 'body', label: 'Examine Ian Kettle and the stage', icon: 'blood', hotspot: { x: 50, y: 56 },
            desc: 'The body, the water, the cut cable',
            text: [
              'Ian Kettle is on his back, face turned toward the podium. There is a small burn at the base of his right thumb and a livid red mark across his left palm. His shoes and the cuffs of his trousers are soaked. The water is a shallow, deliberate rectangle around the podium, as if someone had poured it from the ornamental vase on the auction table.',
              'The spotlight is a theatrical unit on a chain that has been cut cleanly, not snapped. Its earth wire has been severed with wire cutters and the live core re-routed to the metal housing. When the unit fell, it earthed through the wet stage and through the man standing on it.',
              'In Kettle’s right hand is a printed card: <b>LOT 25 — THE MERIDIAN BELL — RESERVE ON APPLICATION</b>. On the back, in his own hand: <b>“9 a.m. — the ledger and the bell. No more.”</b>'
            ],
            gives: ['body-note', 'stage-water', 'cut-cable'],
            hint: 'The water is too neat to be a spill. The earth wire was cut by hand.'
          },
          { id: 'search', label: 'Search the saleroom', icon: 'search', puzzle: 'stage-search',
            desc: 'Six details around the stage',
            requires: ['body-note'],
            hint: 'Check the stage floor, the cable, the podium, the bell card, the aisle and the programme.' },
          { id: 'cipher', label: 'Decode the lot card', icon: 'cipher', puzzle: 'lot-cipher',
            desc: 'A line of letters on the back of the card',
            requires: ['lot-25-card'],
            hint: 'Kettle used a five-place shift for the private notes he did not want the auction staff to read.' },
          { id: 'podium', label: 'Read Kettle’s speech notes', icon: 'note',
            desc: 'The speech he did not give',
            requires: ['body-note'],
            text: [
              'The speech is clipped to the podium. It begins as an apology and ends as a confession. Kettle lists “the St Cuthbert’s bell, the Northgate canvases, the Ashcombe seed cases, the Kingsway bonds” and calls them “the assets of a fifty-year misunderstanding”.',
              'The last paragraph is underlined twice: <b>“At nine I will hand the original ledger and Lot 25 to the police. The sale cannot proceed. I will take the consequences.”</b>',
              'A printed lot card for Lot 25 is tucked into the speech. On the back, in Kettle’s hand, is a line of letters that is not English.'
            ],
            gives: ['kettle-speech', 'lot-25-card'],
            hint: 'Kettle meant to hand over the ledger and the bell. The card has a coded line on the back.'
          },
          { id: 'rig', label: 'Repair the lighting rig', icon: 'tool', puzzle: 'spotlight',
            desc: 'Four severed cores, one cut earth',
            requires: ['body-note'],
            hint: 'Match each core to its colour. The earth is the one that was cut twice.' }
        ]
      },
      {
        id: 'office', name: 'The auction office', short: 'Auction office', time: '08:20',
        art: { kind: 'office', mood: 'mansion' },
        requires: ['torn-ticket'],
        intro: 'A long room above the saleroom with a view of the river and a wall of framed sale posters. Mira Solberg, the auction director, is at the desk with the catalogue open and a phone in her hand. She has already called the buyers to say the sale is postponed. She has not called the police.',
        actions: [
          { id: 'mira', label: 'Interview Mira Solberg', icon: 'user', suspect: 'mira',
            desc: 'Auction director · ran the sale', hint: 'Mira knows every lot and every buyer. Ask her who had a key to the vault.' },
          { id: 'desk', label: 'Search the auction office', icon: 'ledger',
            desc: 'A catalogue, a note, an attendance list', requires: ['lot-25-card'],
            text: [
              'The sale catalogue is a hardback volume with twenty-five lots and no photographs. Lot 1 is “a bronze bell, 19th century, provenance private”. Lot 25 is the same bell, listed again as “the Meridian bell, reserve on application”. The same object appears twice.',
              'A handwritten note from Kettle is clipped inside the cover: <b>“Mira — the first lot is the original. The final lot is the proof. Do not let either leave the building.”</b>',
              'The attendance list for the Provenance Sale has forty-two names. Eleven are companies. One is written in by hand at the bottom: <b>“A. VOSS — GALLERY — 19:00.”</b>'
            ],
            gives: ['sale-catalogue', 'kettle-note', 'attendance-list'],
            hint: 'The bell is listed twice. The handwritten name at the bottom is Aurelia Voss.'
          },
          { id: 'terminal', label: 'Access the auction database', icon: 'terminal', puzzle: 'auction-db',
            desc: 'Twenty-five lots · forty-two buyers', requires: ['sale-catalogue'],
            hint: 'The database password is the word the whole sale is built on: PROVENANCE.' },
          { id: 'safe', label: 'Open the auction safe', icon: 'dial', puzzle: 'office-safe',
            desc: 'Three dials · lot, year, lot', requires: ['kettle-note'],
            hint: 'First lot 1, founding year 1974, final lot 25. Dial 01, 74, 25.' }
        ]
      },
      {
        id: 'strongroom', name: 'The lot vault', short: 'Lot vault', time: '09:10',
        art: { kind: 'basement', mood: 'cold' },
        requires: ['lot-index'],
        intro: 'A concrete vault below the saleroom, lined with numbered crates and a single steel shelf for the private lots. The air is cold and smells of packing straw and old varnish. The lot labels are printed in Meridian’s neat gold type. One crate is missing its lid.',
        actions: [
          { id: 'vault', label: 'Unlock the lot vault', icon: 'keypad', puzzle: 'vault-keypad',
            desc: 'Four digits · the year on the bell', requires: ['lot-index'],
            hint: 'Lot 25 is catalogued as a bell dated 1874. Enter 1874.' },
          { id: 'shelves', label: 'Open the lot crates', icon: 'archive',
            desc: 'Twenty-four lots, twenty-four crimes', requires: ['vault-open'],
            text: [
              'The crates are numbered 1 to 24. Lot 1 holds a bronze bell wrapped in wool. Lot 9 holds three Northgate canvases in a single frame. Lot 17 holds two cold-storage cases of cycad seed. Lot 24 holds a folder of bearer bonds from Kingsway Private Bank.',
              'Each crate has a provenance card. Each card gives a false history and a true price. The bell is dated 1874 and valued at £2.1 million. The seed cases are valued at £284,000. The bonds are valued at £2.1 million. The paintings are valued at £3.9 million.',
              'The shelf behind the crates holds a small brass tube, empty, and a shipping label addressed to “Meridian Heritage, Rotterdam”. The label is dated this morning.'
            ],
            gives: ['bell-crate', 'painting-crate', 'seed-case', 'bond-folder'],
            hint: 'The lots are the evidence from every case. The bell is lot 1 and lot 25.'
          },
          { id: 'ledger', label: 'Find the master ledger', icon: 'lockbox',
            desc: 'The book that names everyone', requires: ['ledger-location', 'vault-open'],
            text: [
              'The coded line on the lot card said: <b>THE MERIDIAN FILE IS IN THE BELL.</b> The crate for lot 25 is empty. The bell itself was never in the vault — it has been hanging in the private gallery since the building opened.',
              'On the empty crate is a receipt: <b>“LOT 25 — MERIDIAN BELL — TRANSFERRED TO GALLERY — 06:40 — A. VOSS.”</b> The ink is still tacky.',
              'A wax seal on the receipt carries the Meridian crest: a bell inside a circle. The seal is unbroken.'
            ],
            gives: ['master-ledger', 'meridian-seal', 'lot-25-receipt'],
            hint: 'The ledger is inside the bell, and the bell is in the gallery. The receipt is signed A. Voss.'
          }
        ]
      },
      {
        id: 'security', name: 'The security room', short: 'Security', time: '10:00',
        art: { kind: 'server', mood: 'cold' },
        requires: ['buyer-list'],
        intro: 'A windowless room of monitors, a rack of recorders and a kettle that has boiled dry. Dexter Vane, the head of security, is at the desk with his jacket off and a bandage on one hand. He says the stage alarm was faulty. He says the camera clock has always been wrong.',
        actions: [
          { id: 'dex', label: 'Interview Dexter Vane', icon: 'user', suspect: 'dex',
            desc: 'Head of security · the only man with keys', hint: 'Dex controls the cameras and the gantry. Ask him who went up there.' },
          { id: 'desk', label: 'Search the security room', icon: 'ledger',
            desc: 'A camera card, an access log, a roster', requires: ['buyer-list'],
            text: [
              'The camera recorder holds a card labelled <b>“SALEROOM — STAGE — 24H”</b>. The card is not encrypted. The access log records three entries after six o’clock: <b>06:40 — GALLERY — A. VOSS</b>, <b>06:52 — GANTRY — A. VOSS</b>, and <b>07:02 — STAGE — CLEANING</b>.',
              'The guard roster shows Dexter Vane signed in at 18:00 and out at 07:30. In the margin, in pencil: <b>“Stage alarm isolated — D.V. — 19:55.”</b>',
              'A second key hangs behind the monitor. It is stamped <b>GALLERY</b>. The tag is new.'
            ],
            gives: ['camera-card', 'access-log', 'guard-roster'],
            hint: 'Aurelia Voss entered the gallery at 06:40 and the gantry at 06:52.'
          },
          { id: 'camera', label: 'Enhance the saleroom camera', icon: 'cctv', puzzle: 'saleroom-cam',
            desc: '06:58 — the figure on the gantry', requires: ['camera-card'],
            hint: 'The clear band is 58% to 78%. Look for the grey coat and the silver bell brooch.' },
          { id: 'timeline', label: 'Rebuild the last night', icon: 'clock', puzzle: 'final-timeline',
            desc: 'Eight moments between 18:20 and 07:05', requires: ['access-log', 'rig-log'],
            hint: 'Start with Kettle’s call to the police and end with the cleaning supervisor.' }
        ]
      },
      {
        id: 'lab', name: 'The conservation lab', short: 'Conservation lab', time: '11:10',
        art: { kind: 'lab', mood: 'cold' },
        requires: ['master-ledger'],
        intro: 'A white room of solvents, cotton gloves and a document scanner. The lab is where Meridian made its provenance: false labels, false dates, false histories. A ledger-sized cradle sits empty on the bench, and the scanner still holds a warm memory of the last thing it read.',
        actions: [
          { id: 'forensics', label: 'Analyse the ledger and the seal', icon: 'chemical',
            desc: 'Ink, paper, and a wax impression', requires: ['master-ledger'],
            text: [
              'The ledger is bound in green morocco and stamped with the Meridian crest. The first page is dated 1974 and signed <b>“A. Voss”</b>. The ink is iron gall; the paper is 1970s bank stock. It is not a modern forgery. It is the original.',
              'The entries run to five hundred pages. Each names a lot, a buyer and a case. The St Cuthbert’s bell is entry one, bought in 1974 for £400 and sold to “Meridian Heritage” for £2.1 million in 2024. The Ashcombe seed cases and the Kingsway bonds are the last entries, dated this year. The handwriting changes after 1998 but the signature never does.',
              'The wax seal on the transfer receipt matches the seal on the ledger exactly. Under a lens, the seal contains a tiny founder’s mark: <b>AV 1974</b>.'
            ],
            gives: ['ink-analysis', 'paper-analysis', 'bell-inscription'],
            hint: 'The ledger is genuine and signed by A. Voss. The seal matches the transfer receipt.'
          },
          { id: 'value', label: 'Calculate the missing lot value', icon: 'math', puzzle: 'valuation',
            desc: 'Insurance, reserve and the missing £2.1m', requires: ['buyer-list', 'master-ledger'],
            hint: 'The 24 recovered lots are insured for £6.3m at 70% of reserve. The full sale reserve is £11.1m.' }
        ]
      },
      {
        id: 'gallery', name: 'The private gallery', short: 'Gallery', time: '12:00',
        art: { kind: 'house', mood: 'mansion' },
        requires: ['meridian-seal'],
        intro: 'A long gallery with a glass ceiling and a single bronze bell hanging from an iron frame at the far end. The walls are hung with the Northgate canvases. Two cold-storage cases stand open on a plinth of seed jars. A woman in a grey coat is sitting beneath the bell with a silver bell-shaped brooch at her collar. Aurelia Voss does not get up.',
        actions: [
          { id: 'aurelia', label: 'Interview Aurelia Voss', icon: 'user', suspect: 'aurelia',
            desc: 'Founder · the woman beneath the bell', hint: 'Aurelia founded Meridian in 1974. Ask her what the bell is worth.' },
          { id: 'quill', label: 'Interview Ptolemy Quill', icon: 'user', suspect: 'quill',
            desc: 'Meridian’s solicitor · the sale contract', hint: 'Quill drafted every sale. Ask him who signs for Meridian.' },
          { id: 'provenance', label: 'Match the lots to the cases', icon: 'chart', puzzle: 'provenance',
            desc: 'Four assets, four cities, four lots', requires: ['master-ledger', 'buyer-list', 'bell-crate', 'painting-crate', 'seed-case', 'bond-folder'],
            hint: 'The ledger gives each asset’s case and lot number. Bell 1, painting 9, seeds 17, bonds 24.' },
          { id: 'bell', label: 'Examine the Meridian bell', icon: 'lockbox',
            desc: 'A replica that is not a replica', requires: ['bell-inscription', 'network-map'],
            text: [
              'The bell is bronze, waist-high, and hung from an iron frame that has been bolted to the floor. Its inscription is not the one in the catalogue. It reads: <b>“ST CUTHBERT’S — CAST 1874 — RESTORED 1974 — A.V.”</b>',
              'The crown of the bell has a sealed tube welded into it, the size of a ledger. The weld is fresh. The tube’s cap carries the Meridian crest and the same wax seal as the transfer receipt.',
              'A brass plate beneath the bell reads: <b>“LOT 25 — THE MERIDIAN FILE — NOT FOR SALE.”</b>'
            ],
            gives: ['bell-original', 'ledger-tube'],
            hint: 'The bell is the original St Cuthbert’s bell. The ledger tube is welded into its crown.'
          },
          { id: 'lot', label: 'Identify the Meridian File', icon: 'choice', puzzle: 'master-lot',
            desc: 'Which lot is the file?', requires: ['lot-25-receipt'],
            hint: 'The receipt, the code and the bell all point to lot 25.' }
        ]
      }
    ],
    puzzles: {
      'stage-search': {
        type: 'hotspot', title: 'The Saleroom', subtitle: 'Six details around the stage', icon: 'search',
        scene: { kind: 'theatre', mood: 'mansion' },
        targets: [
          { label: 'Torn lot ticket', x: 44, y: 78, r: 5.5, text: 'A torn lot ticket under the front row, stamped LOT 25. The other half is missing.' },
          { label: 'Scorched cable', x: 66, y: 69, r: 5, text: 'The spotlight cable, scorched at the cut. The earth core is severed cleanly and the live core is folded back into the housing.' },
          { label: 'Pool of water', x: 54, y: 61, r: 5.5, text: 'A shallow rectangle of water around the podium. It has been poured from the vase, not spilled from a bucket.' },
          { label: 'Bell polish', x: 38, y: 47, r: 5, text: 'A tin of bronze polish on the auction table, open, with a rag still damp. Someone polished the bell before the sale.' },
          { label: 'Red sale cord', x: 72, y: 43, r: 5, text: 'The red sale cord from the podium, cut into lengths. It matches the cord tied around the missing lot card.' },
          { label: 'Rehearsal programme', x: 30, y: 63, r: 5, text: 'A printed rehearsal programme for 19:30, with Kettle’s name at the top and a handwritten note: “A.V. watching from the gantry.”' }
        ],
        note: 'Click directly on the details. The saleroom has not been cleaned since the body was found.',
        hintText: 'Look under the front row, at the cable, the water, the polish, the cord and the programme.',
        success: 'The saleroom gives up six details: a torn lot ticket, a scorched cable, a poured pool of water, fresh bell polish, a cut red cord, and a rehearsal programme that puts Aurelia Voss on the gantry.',
        successTitle: 'The stage was prepared before the sale.',
        gives: ['torn-ticket', 'ledger-fibre', 'bell-dust'], flags: ['stageSearched'],
        short: 'The stage was wet, the cable was cut, and Aurelia was on the gantry.',
        log: 'The saleroom search finds a torn Lot 25 ticket, a cut spotlight cable, a poured pool of water, bell polish, a cut red cord and a rehearsal programme naming A. Voss on the gantry.'
      },
      'spotlight': {
        type: 'repair', title: 'The Lighting Rig', subtitle: 'Four severed cores', icon: 'tool',
        prompt: 'The spotlight cable has been cut through. Four cores hang loose. The rig will not power until each core is joined to its matching colour.',
        note: 'Match each core to its colour. The earth is the one that was cut twice.',
        pairs: [
          { l: 'EARTH', r: 'GREEN / YELLOW', color: '#34d399' },
          { l: 'LIVE', r: 'BROWN', color: '#f87171' },
          { l: 'NEUTRAL', r: 'BLUE', color: '#67e8f9' },
          { l: 'DMX CONTROL', r: 'PURPLE', color: '#a855f7' }
        ],
        hintText: 'Earth to green/yellow, live to brown, neutral to blue, control to purple.',
        success: 'The rig powers up and the fault log loads. The earth was cut twice — once at the plug and once at the housing — while the live core was folded back to make contact with the metal. This was not wear. It was wiring done by someone who wanted the housing live and the earth dead.',
        successTitle: 'The spotlight was rigged to kill.',
        gives: ['rig-log', 'tamper-mark'], flags: ['rigFixed'],
        short: 'The spotlight was rewired so the metal housing became live.',
        log: 'The repaired lighting rig shows the earth was cut twice and the live core re-routed to the housing. The spotlight was deliberately rigged.'
      },
      'lot-cipher': {
        type: 'cipher', title: 'The Lot Card', subtitle: 'Kettle’s private shorthand', icon: 'cipher',
        plain: 'THE MERIDIAN FILE IS IN THE BELL', shift: 5,
        prompt: 'On the back of the Lot 25 card, in Kettle’s block capitals, is a line of letters that is not English.',
        note: 'Turn the wheel until the words resolve. The answer is the message, not the shift.',
        placeholder: 'Type the decoded message…',
        answer: ['the meridian file is in the bell', 'meridian file is in the bell'],
        wrong: 'The words are still shifted. Try another setting and read the first word aloud.',
        hintText: 'Shift the wheel five places back. The first word resolves to THE.',
        success: 'The line resolves: <b>THE MERIDIAN FILE IS IN THE BELL.</b> Kettle had hidden the ledger inside the one object that was listed twice, in a gallery that required the founder’s seal to enter.',
        successTitle: 'The ledger is inside the bell.',
        gives: ['ledger-location', 'cipher-line'], flags: ['cipherSolved'],
        short: 'The coded lot card says the Meridian File is in the bell.',
        log: 'Kettle’s coded lot card decodes to “THE MERIDIAN FILE IS IN THE BELL”.'
      },
      'auction-db': {
        type: 'terminal', title: 'Auction Database', subtitle: 'Twenty-five lots · forty-two buyers', icon: 'terminal',
        user: 'mira', host: 'meridian-auction', password: 'provenance',
        intro: 'The auction database holds the lot index, the buyer register and the private sale log. Type "help" for commands.',
        banner: 'MERIDIAN HOUSE — AUCTION SYSTEM. 3 FILES. 1 SECURE VOLUME.',
        files: [
          { name: 'lots.idx', body: 'LOT 01 — BRONZE BELL — 1874 — RESERVE £2.1M<br>LOT 09 — NORTHGATE CANVASES — RESERVE £3.9M<br>LOT 17 — ASHCOMBE SEED CASES — RESERVE £284K<br>LOT 24 — KINGSWAY BEARER BONDS — RESERVE £2.1M<br><span class="y">LOT 25 — THE MERIDIAN BELL — RESERVE ON APPLICATION</span>' },
          { name: 'buyers.db', locked: true, secret: true, hint: 'Encrypted buyer register. Director password required.', body: '<span class="y">A. VOSS — MERIDIAN HERITAGE — 42 LOTS — TOTAL £11.1M</span><br>ROTTERDAM TRUST — 9 LOTS<br>NORTHGATE HOLDINGS — 6 LOTS<br>KINGS WAY NOMINEES — 4 LOTS<br><span class="r">NOTE: LOT 25 IS NOT FOR SALE. IT IS THE FILE.</span>' },
          { name: 'secure.log', locked: true, body: '<span class="y">06:40 — GALLERY SEAL USED — A.VOSS</span><br>06:52 — GANTRY DOOR — A.VOSS<br><span class="r">06:58 — STAGE ALARM ISOLATED — D.VANE</span><br><span class="r">07:00 — SPOTLIGHT CIRCUIT FAULT</span>' }
        ],
        hintText: 'The password is the word the sale is built on: PROVENANCE.',
        success: 'The database opens. There were never twenty-five separate lots. There were twenty-four stolen assets and one file. Every buyer in the register is a Meridian shell. The total reserve is £11.1 million, and lot 25 is marked NOT FOR SALE — IT IS THE FILE.',
        successTitle: 'The sale was a laundering exercise.',
        gives: ['buyer-list', 'lot-index', 'terminal-log'], flags: ['dbOpen'],
        short: 'The auction database lists 24 stolen lots and one file.',
        log: 'The auction database reveals 24 stolen assets, 42 shell buyers, an £11.1m reserve, and lot 25 marked as the Meridian File.'
      },
      'office-safe': {
        type: 'dial', title: 'The Auction Safe', subtitle: 'Three dials · lot, year, lot', icon: 'dial',
        code: [1, 74, 25], labels: ['FIRST LOT', 'FOUNDED', 'FINAL LOT'],
        prompt: 'A wall safe behind the sale posters. Three dials, each numbered 00–99. <span style="color:var(--dim)">Kettle used the same combination for every Meridian lock: the first lot, the year the company was founded, and the final lot.</span>',
        hintText: 'First lot 1, founding year 1974 (use 74), final lot 25. Dial 01, 74, 25.',
        successTitle: 'The safe opens.',
        success: 'Inside: a share register, a shipping manifest for “one bell, one ledger, Rotterdam”, and a master key stamped MERIDIAN. The share register records a single controlling shareholder: <b>A. VOSS — 100%</b>.',
        gives: ['master-key', 'share-list', 'shipping-manifest'], flags: ['safeOpen'],
        short: 'The safe holds a share register naming A. Voss as sole owner.',
        log: 'The auction safe opens on 01–74–25, revealing a share register naming A. Voss as sole shareholder, a shipping manifest and a master key.'
      },
      'vault-keypad': {
        type: 'keypad', title: 'The Lot Vault', subtitle: 'Four-digit keypad', icon: 'keypad',
        deviceLabel: 'MERIDIAN — LOT VAULT', length: 4, code: '1874',
        prompt: 'A steel door with a keypad and a brass plate: <b>LOT VAULT — PRIVATE LOTS 1–25</b>. <span style="color:var(--dim)">The code is the year cast into the bell on the catalogue cover.</span>',
        hintText: 'Lot 25 is catalogued as a bell dated 1874. Enter 1874.',
        successTitle: 'The vault opens.',
        success: 'The vault opens on 1874. Twenty-four numbered crates line the walls. The shelf for lot 25 is empty, and a fresh transfer receipt is pinned to it.',
        gives: ['vault-open'], flags: ['vaultOpen'],
        short: 'The lot vault opens on 1874.',
        log: 'The lot vault opens on 1874, revealing 24 crates and an empty shelf for lot 25.'
      },
      'saleroom-cam': {
        type: 'photo', title: 'Saleroom Camera', subtitle: 'Enhance the 06:58 still', icon: 'cctv',
        scene: { kind: 'theatre', mood: 'mansion' },
        target: { x: 64, y: 30, w: 14, h: 20 }, range: [58, 78],
        question: 'Who is standing on the lighting gantry at 06:58?',
        options: [
          { t: 'A woman in a grey coat with a silver bell brooch', v: 'aurelia' },
          { t: 'Mira Solberg, carrying the sale catalogue', v: 'mira' },
          { t: 'Dexter Vane, in the security uniform', v: 'dex' },
          { t: 'A cleaner with a mop and bucket', v: 'cleaner' }
        ],
        answer: 'aurelia',
        reveal: 'The figure resolves: a tall woman in a grey wool coat, her face turned away, a tool roll under one arm. At her collar, caught by the work light, is a silver brooch shaped like a bell. She is standing beside the spotlight’s chain with a pair of wire cutters in her hand.',
        wrong: 'The figure is on the gantry, not the stage. Slide into the clear band and look at the coat and the brooch.',
        hintText: 'The clear band is 58% to 78%. Look for the grey coat and the silver bell brooch.',
        success: 'The camera puts Aurelia Voss on the gantry with wire cutters at 06:58, two minutes before the spotlight circuit faulted. The face is turned away, but the brooch is unique, and the tool roll matches the one in her gallery.',
        successTitle: 'Aurelia Voss was on the gantry.',
        gives: ['cctv-still', 'camera-time'], flags: ['camDone'],
        short: 'Aurelia was on the gantry with wire cutters at 06:58.',
        log: 'The enhanced saleroom camera shows Aurelia Voss on the gantry with wire cutters at 06:58.'
      },
      'provenance': {
        type: 'logicgrid', title: 'The Provenance Grid', subtitle: 'Four assets, four cities, four lots', icon: 'chart',
        prompt: 'The ledger, the crates and the buyer register each tell part of the story. Match every stolen asset to its case and its lot number.',
        rows: [
          { label: 'St Cuthbert’s bell', selects: [
            { label: 'case', options: [{ v: 'stcuthberts', t: 'St Cuthbert’s peal' }, { v: 'northgate', t: 'Northgate art' }, { v: 'ashcombe', t: 'Ashcombe seeds' }, { v: 'kingsway', t: 'Kingsway bonds' }], answer: 'stcuthberts' },
            { label: 'lot', options: [{ v: '1', t: 'Lot 1' }, { v: '9', t: 'Lot 9' }, { v: '17', t: 'Lot 17' }, { v: '24', t: 'Lot 24' }], answer: '1' }
          ] },
          { label: 'The Northgate canvases', selects: [
            { label: 'case', options: [{ v: 'northgate', t: 'Northgate art' }, { v: 'stcuthberts', t: 'St Cuthbert’s peal' }, { v: 'ashcombe', t: 'Ashcombe seeds' }, { v: 'kingsway', t: 'Kingsway bonds' }], answer: 'northgate' },
            { label: 'lot', options: [{ v: '9', t: 'Lot 9' }, { v: '24', t: 'Lot 24' }, { v: '1', t: 'Lot 1' }, { v: '17', t: 'Lot 17' }], answer: '9' }
          ] },
          { label: 'The Ashcombe seed cases', selects: [
            { label: 'case', options: [{ v: 'ashcombe', t: 'Ashcombe seeds' }, { v: 'kingsway', t: 'Kingsway bonds' }, { v: 'northgate', t: 'Northgate art' }, { v: 'stcuthberts', t: 'St Cuthbert’s peal' }], answer: 'ashcombe' },
            { label: 'lot', options: [{ v: '17', t: 'Lot 17' }, { v: '1', t: 'Lot 1' }, { v: '9', t: 'Lot 9' }, { v: '24', t: 'Lot 24' }], answer: '17' }
          ] },
          { label: 'The Kingsway bearer bonds', selects: [
            { label: 'case', options: [{ v: 'kingsway', t: 'Kingsway bonds' }, { v: 'ashcombe', t: 'Ashcombe seeds' }, { v: 'stcuthberts', t: 'St Cuthbert’s peal' }, { v: 'northgate', t: 'Northgate art' }], answer: 'kingsway' },
            { label: 'lot', options: [{ v: '24', t: 'Lot 24' }, { v: '17', t: 'Lot 17' }, { v: '9', t: 'Lot 9' }, { v: '1', t: 'Lot 1' }], answer: '24' }
          ] }
        ],
        wrong: 'Check the ledger entries and the crate numbers again. The bell is first and the bonds are last.',
        hintText: 'Bell lot 1, Northgate paintings lot 9, Ashcombe seeds lot 17, Kingsway bonds lot 24.',
        success: 'The grid locks together. Every lot in the sale is an asset from a closed case: St Cuthbert’s bell (lot 1), the Northgate canvases (lot 9), the Ashcombe seed cases (lot 17), the Kingsway bearer bonds (lot 24). Meridian Heritage did not buy them to keep them. It bought them to sell them back to the same network.',
        successTitle: 'Every case leads to the same room.',
        gives: ['network-map'], flags: ['logicDone'],
        short: 'The sale lots are the stolen assets from four separate cases.',
        log: 'A provenance grid matches the bell, the Northgate canvases, the Ashcombe seeds and the Kingsway bonds to lots 1, 9, 17 and 24.'
      },
      'final-timeline': {
        type: 'sequence', title: 'The Last Night', subtitle: 'Eight moments before the body was found', icon: 'clock', variant: 'strips',
        prompt: 'The access log, the rig log, the camera and the pathology disagree. Put the last night in order.',
        items: [
          { t: 'Kettle calls the incident room', sub: '18:20 — call log', order: 1 },
          { t: 'Aurelia Voss enters Meridian House', sub: '19:00 — attendance list', order: 2 },
          { t: 'Kettle begins the dress rehearsal', sub: '19:30 — rehearsal programme', order: 3 },
          { t: 'Dexter Vane isolates the stage alarm', sub: '19:55 — guard roster', order: 4 },
          { t: 'Aurelia goes up to the lighting gantry', sub: '06:52 — access log', order: 5 },
          { t: 'The spotlight’s earth wire is cut', sub: '06:58 — camera still', order: 6 },
          { t: 'Kettle steps onto the wet stage', sub: '07:00 — stage water', order: 7 },
          { t: 'The cleaning supervisor finds the body', sub: '07:05 — her statement', order: 8 }
        ],
        wrong: 'Kettle called the police before Aurelia arrived. The gantry came before the wire was cut.',
        hintText: 'Call 18:20, Aurelia 19:00, rehearsal 19:30, alarm 19:55, gantry 06:52, wire 06:58, stage 07:00, body 07:05.',
        success: 'The night assembles. Kettle called the police at twenty past six and told them he would hand over the ledger in the morning. Aurelia arrived at seven, watched the rehearsal, had Dexter isolate the alarm, then went up to the gantry at 06:52 and cut the earth wire. Kettle stepped onto the wet stage at seven and the housing did the rest.',
        successTitle: 'Kettle was killed before the sale opened.',
        gives: ['final-timeline'], flags: ['timelineBuilt'],
        short: 'Aurelia cut the wire at 06:58 and Kettle died at 07:00.',
        log: 'Timeline: Kettle called police 18:20, Aurelia arrived 19:00, rehearsal 19:30, alarm isolated 19:55, gantry 06:52, wire cut 06:58, death 07:00, body found 07:05.'
      },
      'valuation': {
        type: 'math', title: 'The Missing Lot Value', subtitle: 'Insurance, reserve and £2.1m', icon: 'math',
        info: 'The 24 recovered lots are insured for £6.3 million, which is 70% of their total reserve. The full Provenance Sale reserve is £11.1 million. Lot 25 is the difference.',
        placeholder: 'lot 25 reserve, £m', unit: '£ million', answer: 2.1, tolerance: 0.05,
        working: '£6.3m ÷ 0.70 = £9.0m for the 24 lots. £11.1m − £9.0m = £2.1m for lot 25.',
        wrong: 'Divide the insured value by 0.70 to get the reserve for the 24 lots, then subtract it from £11.1m.',
        hintText: '£6.3m is 70% of £9.0m. £11.1m − £9.0m = £2.1m.',
        success: 'Lot 25 was reserved at £2.1 million — exactly the face value of the Kingsway bearer bonds in lot 24. The bell and the bonds were the same money, moved twice. The “replica” was the collateral for the whole network.',
        successTitle: 'Lot 25 is worth £2.1 million.',
        gives: ['total-value', 'missing-lot'], flags: ['valueDone'],
        short: 'Lot 25 was reserved at £2.1m, matching the bearer bonds.',
        log: 'The valuation shows lot 25 was reserved at £2.1m, the same value as the Kingsway bearer bonds.'
      },
      'master-lot': {
        type: 'choice', title: 'The Meridian File', subtitle: 'Identify the final lot', icon: 'choice',
        prompt: 'The catalogue lists 25 lots. One of them is not an object but a file. Use the receipt, the code and the ledger to identify it.',
        options: [
          { t: 'Lot 25 — the bronze bell, listed as a replica', v: '25' },
          { t: 'Lot 1 — the same bell, listed as the original', v: '1' },
          { t: 'Lot 24 — the Kingsway bearer bonds', v: '24' },
          { t: 'Lot 9 — the Northgate canvases', v: '9' }
        ],
        answer: '25',
        wrong: 'The receipt and the coded card both point to the last lot. The bell is listed twice for a reason.',
        hintText: 'The transfer receipt says LOT 25 — MERIDIAN BELL. Enter lot 25.',
        success: 'Lot 25 is the Meridian File. The bell was listed twice: lot 1 as the original asset, lot 25 as the file. Inside its crown is the ledger that names every buyer, every bribe and every murder. It was never for sale. It was the insurance policy of a woman who had been selling the same stolen object for fifty years.',
        successTitle: 'Lot 25 is the file.',
        gives: ['master-lot'], flags: ['lotIdentified'],
        short: 'Lot 25, the bell, is the Meridian File.',
        log: 'Lot 25 — the bronze bell — is identified as the Meridian File, with the master ledger sealed inside its crown.'
      }
    },
    suspects: [
      {
        id: 'mira', name: 'Mira Solberg', role: 'Auction director · Meridian House', location: 'office', locationName: 'Auction office', tag: 'Suspect',
        portrait: { seed: 'mira-solberg', hair: 'bun', hairColor: '#3a2a1b', skin: 0, expression: 'wary', collar: 'suit', glasses: 'square', eyes: '#3a2159' },
        intro: 'Forty-one, precise, with a director’s memory for lot numbers and a director’s instinct for not asking where things came from. She has run the Provenance Sale for six years. She signed the vault access list, called the buyers when the body was found, and has not yet called the police.',
        questions: [
          { q: 'The sale was due to open at nine.', requires: ['sale-catalogue'], present: true,
            a: '“At nine. Twenty-five lots, forty-two buyers, no press.” She closes the catalogue. “Ian was going to make a speech and then hand the whole thing to you people. I told him it was madness. He said it was the only way to stop her.”',
            gives: ['mira-catalogue'], flags: ['miraHostile'] },
          { q: 'Who had a key to the lot vault?', requires: ['vault-open'], present: true,
            a: '“Ian. Me. Dexter, for the alarms. And the founder, though she has not used a key in years.” She hesitates. “Aurelia Voss. She owns the building. She owns everything. She signs the cheques and Ian signs the catalogue.”',
            gives: ['mira-key'] },
          { q: 'Where were you at twenty past eight last night?', requires: ['access-log'], present: true,
            a: '“At home. I left at six. The night staff had the building.” She slides the access log across the desk. “I was not on the gantry. I do not even like heights.”',
            gives: ['mira-alibi'] },
          { q: 'Kettle was going to hand the ledger to the police.', requires: ['kettle-note'], present: true,
            a: '“He had been negotiating for a month. Immunity for the ledger and the bell.” She looks at the river. “Aurelia found out on Wednesday. She came to the office and they argued for an hour. He said, ‘It is over, Aurelia.’ She said, ‘It is never over while the bell is still here.’”',
            gives: ['mira-kettle'], flags: ['miraBroke'] },
          { q: 'Aurelia Voss was in the building before the rehearsal.', requires: ['master-ledger'], present: true,
            a: '“She signed in at seven. She always watches the rehearsal from the gantry. She says the stage looks different from above.” Mira’s hands are flat on the catalogue. “I heard the spotlight fall. I did not go down. I called Dexter. He said it was an accident and I believed him because it was easier.”',
            gives: ['mira-aurelia'], flags: ['miraBroke'] }
        ],
        after: 'She asks whether the buyers will be told. You tell her the buyers will be interviewed. She nods, opens the catalogue at lot 25, and turns it around so you can read the reserve.'
      },
      {
        id: 'dex', name: 'Dexter Vane', role: 'Head of security · Meridian House', location: 'security', locationName: 'Security room', tag: 'Suspect',
        portrait: { seed: 'dexter-vane', hair: 'buzz', hairColor: '#1b1220', skin: 3, expression: 'angry', collar: 'police', beard: 'goatee', eyes: '#2b1a12' },
        intro: 'Forty-eight, ex-army, with a bandaged hand and a security chief’s contempt for questions. He isolated the stage alarm at 19:55. He controls the gantry door and the cameras. He says the spotlight was a fault and the clock was always wrong.',
        questions: [
          { q: 'Your camera clock is out by eight minutes.', requires: ['camera-card'], present: true,
            a: '“The recorder drifts. It has drifted for a year.” He does not look at the screen. “The gantry door was locked. The log says so.”',
            gives: ['dex-camera'] },
          { q: 'Who signed Aurelia Voss into the building?', requires: ['access-log'], present: true,
            a: '“She signs herself in. She has done for thirty years.” He scratches the bandage. “She came in at seven and went up to the gallery. Then the gantry. She likes to watch.”',
            gives: ['dex-log'], flags: ['dexHostile'] },
          { q: 'Meridian pays you twice.', requires: ['share-list'], present: true,
            a: '“Consultancy. Security consultancy.” He folds his arms. “Every private bank in the city pays for advice. It is not a crime to be paid.”',
            gives: ['dex-bribe'] },
          { q: 'You isolated the stage alarm at 19:55.', requires: ['rig-log'], present: true,
            a: '“The sensor was tripping. The stage lights set it off every time.” He pauses. “Aurelia asked me to isolate it for the rehearsal. She said the alarm would ruin the recording. I did not ask why she wanted the stage unwatched.”',
            gives: ['dex-alarm'], flags: ['dexBroke'] },
          { q: 'You saw her on the gantry with the wire cutters.', requires: ['cctv-still'], present: true,
            a: 'He looks at the still for a long time. “She came down at ten past seven with the tool roll. She said the spotlight chain was loose. She told me to report it as wear.” He puts both hands on the desk. “I have been protecting this building for twenty-two years. She made me protect her.”',
            gives: ['dex-saw'], flags: ['dexBroke'] }
        ],
        after: 'He asks whether he will be charged. You tell him that depends on what he says next. He reaches for the access log and starts to read out the times.'
      },
      {
        id: 'quill', name: 'Ptolemy Quill', role: 'Meridian’s solicitor', location: 'gallery', locationName: 'Private gallery', tag: 'Suspect',
        portrait: { seed: 'ptolemy-quill', hair: 'short', hairColor: '#8d8d99', skin: 1, expression: 'smug', collar: 'suit', glasses: 'round', age: 'old', beard: 'mustache' },
        intro: 'Sixty-six, immaculate, with a briefcase and a practiced regret. He has drafted every Meridian sale since 1998. He prepared the Provenance Sale contract, the immunity agreement, and the transfer of lot 25 to the gallery. He says he is only the lawyer.',
        questions: [
          { q: 'You drafted the sale for Meridian.', requires: ['sale-catalogue'], present: true,
            a: '“I drafted a private auction. Twenty-four lots, all with provenance.” He smiles. “Lot 25 was not for sale. It was a reserve item, held for the founder. That is all.”',
            gives: ['quill-sale'] },
          { q: 'Lot 25 is not a replica.', requires: ['bell-inscription'], present: true,
            a: '“The catalogue description is a commercial fiction.” He adjusts his glasses. “The bell is the original. It has been in the gallery since 1974. The church has been ringing a replica. My client regarded the substitution as a restoration, not a theft.”',
            gives: ['quill-bell'], flags: ['quillBroke'] },
          { q: 'Aurelia Voss signs every Meridian document.', requires: ['master-ledger'], present: true,
            a: '“She is the founder and sole shareholder. Ian was the chairman. There is a difference.” He opens the briefcase. “Every acquisition, every sale, every settlement — all of it was hers. Ian was the face. She was the signature.”',
            gives: ['quill-aurelia'], flags: ['quillBroke'] },
          { q: 'Kettle wanted immunity.', requires: ['kettle-speech'], present: true,
            a: '“He came to me on Monday. He wanted to hand over the ledger and the bell and take five years.” Quill’s mouth tightens. “I told him the offer was suicide. He said he was sixty-one and tired. He said he wanted to be able to sleep.”',
            gives: ['quill-kettle'] },
          { q: 'The ledger names the buyers.', requires: ['network-map'], present: true,
            a: '“It names everyone.” He closes the briefcase. “Every shell company, every bank, every public official who ever looked the other way. If that book reaches a courtroom, half the city will be answering questions. That is why she could not let him walk it out of the building.”',
            gives: ['quill-ledger'], flags: ['quillBroke'] }
        ],
        after: 'He asks whether he may represent himself. You tell him he may not. He sits down beside the bell and folds his hands.'
      },
      {
        id: 'aurelia', name: 'Aurelia Voss', role: 'Founder · Meridian Heritage', location: 'gallery', locationName: 'Private gallery', tag: 'Prime suspect',
        portrait: { seed: 'aurelia-voss', hair: 'bun', hairColor: '#d8d0e0', skin: 0, expression: 'smug', collar: 'suit', glasses: 'round', age: 'old', earrings: true },
        intro: 'Seventy-four, silver-haired, with a grey coat and a silver brooch shaped like a bell. She founded Meridian Heritage in 1974 with the proceeds of a bell that was never stolen. She has not given an interview in twenty years. She is sitting under the bell as if she has been waiting for you.',
        questions: [
          { q: 'You were on the gantry at 06:52.', requires: ['cctv-still'], present: true,
            a: '“I watch every rehearsal from the gantry. The stage looks different from above.” She touches the brooch. “The camera is a poor likeness. Anyone could be wearing a grey coat.”',
            gives: ['aurelia-alibi'] },
          { q: 'The bell in this room is the original St Cuthbert’s bell.', requires: ['bell-original'], present: true,
            a: '“Of course it is. The church has a replica. They have had one since 1974.” She looks up at it. “A bell is not a holy thing. It is a piece of bronze with a good story. I gave the church a better story and kept the bronze. Everybody was happy.”',
            gives: ['aurelia-bell'], flags: ['aureliaHostile'] },
          { q: 'Kettle was going to the police this morning.', requires: ['kettle-speech'], present: true,
            a: '“Ian was tired. Tired men make promises they cannot keep.” Her voice does not change. “I built this company from a bell and a borrowed office. He wanted to give it away for a clean conscience and five years in an open prison. I did not build it to be given away.”',
            gives: ['aurelia-kettle'], flags: ['aureliaBroke'] },
          { q: 'The sale was yours, and so was every asset in it.', requires: ['network-map'], present: true,
            a: '“The sale was a restoration. The bell, the paintings, the seeds, the bonds — they were always mine. Other people merely held them for a while.” She turns her eyes to you. “You have spent a year chasing my property across this city. You should be flattered. I have never sold anything to anyone who did not want it.”',
            gives: ['aurelia-sale'], flags: ['aureliaBroke'] },
          { q: 'You cut the earth wire with your tool roll, and the ledger is in the bell.', requires: ['tamper-mark', 'ledger-tube'], present: true,
            a: 'She is quiet for the first time. Then she laughs, once, without warmth. “He was standing on a wet stage in a building full of electricity. I did not have to kill him. I only had to let the building do what it was always going to do.” She looks at the bell. “The ledger is inside the crown. Take it. It will not tell you anything you have not already guessed.”',
            gives: ['aurelia-confession'], flags: ['aureliaBroke'] }
        ],
        after: 'She asks whether the bell will be returned to the church. You tell her it will be evidence. She says, “Then at least it will be rung again,” and holds out her wrists.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Ian Kettle — post-mortem note', caption: 'Electrocution · 06:55–07:05 · wet stage', icon: 'blood', type: 'Forensic report',
        desc: 'A burn at the base of the thumb and a livid mark across the palm. Death by electrocution between 06:55 and 07:05, on a stage that had been deliberately wetted.',
        tells: 'He was killed by a live spotlight housing while standing in water. The stage was prepared.'
      },
      'stage-water': {
        name: 'Poured stage water', caption: 'A neat rectangle around the podium', icon: 'default', type: 'Scene mark',
        desc: 'A shallow, deliberate rectangle of water around the auction podium, poured from the ornamental vase rather than spilled from a bucket.',
        tells: 'The water was placed to make the stage conductive. The killer planned the fall of the spotlight.'
      },
      'cut-cable': {
        name: 'Cut spotlight cable', caption: 'Earth severed twice · live folded back', icon: 'wire', type: 'Weapon',
        desc: 'The spotlight cable, cut cleanly at the plug and at the housing, with the live core folded back to touch the metal.',
        tells: 'The spotlight was rewired to make the housing live. This was not wear or an accident.'
      },
      'torn-ticket': {
        name: 'Torn Lot 25 ticket', caption: 'Under the front row · half missing', icon: 'ticket', type: 'Physical evidence',
        desc: 'Half a printed lot ticket stamped LOT 25, found under the front row. The other half is missing.',
        tells: 'Someone tore the lot ticket before the sale. The missing half may carry the reserve or the buyer’s mark.'
      },
      'ledger-fibre': {
        name: 'Green leather fibre', caption: 'Caught on the stage edge', icon: 'fiber', type: 'Trace evidence',
        desc: 'A green morocco fibre caught on the brass edge of the stage, matching the binding of the master ledger.',
        tells: 'The ledger was on the stage at some point after Kettle died. Someone moved it through the saleroom.'
      },
      'bell-dust': {
        name: 'Bronze polishing dust', caption: 'On the auction table', icon: 'chemical', type: 'Trace evidence',
        desc: 'Fine bronze polishing dust on the auction table, with a damp rag still carrying the same residue.',
        tells: 'The bell was polished before the sale. Someone wanted it to look like a replica on display, not a stolen original.'
      },
      'kettle-speech': {
        name: 'Kettle’s speech notes', caption: '“I will hand over the ledger and Lot 25.”', icon: 'note', type: 'Document',
        desc: 'The speech Kettle intended to give at nine, naming the St Cuthbert’s bell, the Northgate canvases, the Ashcombe seed cases and the Kingsway bonds as Meridian assets.',
        tells: 'Kettle planned to surrender the ledger and the bell to the police at nine. That was the motive.'
      },
      'lot-25-card': {
        name: 'Lot 25 card', caption: '“THE MERIDIAN BELL — RESERVE ON APPLICATION”', icon: 'ticket', type: 'Physical evidence',
        desc: 'A printed lot card for Lot 25, with a coded line in Kettle’s handwriting on the back.',
        tells: 'Kettle left a private message on the card. The code points to the hiding place of the ledger.'
      },
      'ledger-location': {
        name: 'Ledger location', caption: '“THE MERIDIAN FILE IS IN THE BELL”', icon: 'cipher', type: 'Coded evidence',
        desc: 'The decoded line on the back of the Lot 25 card, naming the bell as the hiding place of the master ledger.',
        tells: 'The ledger was sealed inside the bell in the gallery. The sale was never going to include it.'
      },
      'cipher-line': {
        name: 'Kettle’s cipher', caption: 'Five-place shift · block capitals', icon: 'cipher', type: 'Analysis',
        desc: 'A five-place Caesar shift written on the lot card, using Kettle’s private shorthand.',
        tells: 'Kettle did not trust the auction staff. He left the location of the ledger in code.'
      },
      'rig-log': {
        name: 'Lighting rig log', caption: 'Earth cut twice · live re-routed', icon: 'tool', type: 'Forensic analysis',
        desc: 'The lighting rig fault log, showing the earth core cut twice and the live core re-routed to the metal housing.',
        tells: 'The spotlight was deliberately wired to kill. The fault was created, not inherited.'
      },
      'tamper-mark': {
        name: 'Tool marks on the housing', caption: 'Wire cutters · fresh brass', icon: 'tool', type: 'Physical evidence',
        desc: 'Fresh tool marks on the spotlight housing, consistent with wire cutters and a small screwdriver.',
        tells: 'The housing was opened and rewired by hand. The tool roll in the gallery carries the same marks.'
      },
      'sale-catalogue': {
        name: 'Provenance Sale catalogue', caption: '25 lots · the bell listed twice', icon: 'ledger', type: 'Document',
        desc: 'The hardback sale catalogue, listing the bell as lot 1 (original) and lot 25 (the Meridian bell, reserve on application).',
        tells: 'The same object appears twice. Lot 1 is the asset; lot 25 is the file.'
      },
      'kettle-note': {
        name: 'Kettle’s note to Mira', caption: '“Do not let either leave the building.”', icon: 'note', type: 'Document',
        desc: 'A handwritten note from Kettle warning that the first lot is the original and the final lot is the proof.',
        tells: 'Kettle knew the bell and the ledger were the two things that mattered. He was afraid they would disappear.'
      },
      'attendance-list': {
        name: 'Attendance list', caption: '42 buyers · “A. VOSS — GALLERY — 19:00”', icon: 'id', type: 'Record',
        desc: 'The private sale attendance list, with forty-two buyers and a handwritten entry for Aurelia Voss in the gallery at seven.',
        tells: 'Aurelia Voss was in the building the night before the murder, in the gallery and on the gantry.'
      },
      'buyer-list': {
        name: 'Buyer register', caption: '42 shell companies · £11.1m', icon: 'money', type: 'Financial record',
        desc: 'The encrypted buyer register, showing forty-two bidders, most of them Meridian shell companies, and a total reserve of £11.1 million.',
        tells: 'The sale was a laundering exercise. Meridian was buying back its own stolen assets.'
      },
      'lot-index': {
        name: 'Lot index', caption: '24 assets + lot 25 · the file', icon: 'archive', type: 'Record',
        desc: 'The auction lot index, listing lot 1 as the bell, lot 9 as the Northgate canvases, lot 17 as the Ashcombe seeds, lot 24 as the Kingsway bonds, and lot 25 as the Meridian bell.',
        tells: 'Each lot is an asset from a different case. Lot 25 is the file that ties them together.'
      },
      'terminal-log': {
        name: 'Auction system log', caption: 'Gallery 06:40 · gantry 06:52 · fault 07:00', icon: 'laptop', type: 'Digital evidence',
        desc: 'The auction system log, recording the gallery seal used by A. Voss at 06:40, the gantry door at 06:52, and the spotlight circuit fault at 07:00.',
        tells: 'Aurelia Voss entered the gallery and the gantry immediately before the murder. The system recorded her seal.'
      },
      'master-key': {
        name: 'Meridian master key', caption: 'Stamped MERIDIAN · opens the gallery', icon: 'key', type: 'Physical evidence',
        desc: 'A master key from the auction safe, stamped MERIDIAN and able to open the private gallery.',
        tells: 'The gallery was never locked against the founder. The key was kept with the sale documents.'
      },
      'share-list': {
        name: 'Share register', caption: 'A. VOSS — 100%', icon: 'ledger', type: 'Financial record',
        desc: 'The Meridian Heritage share register, recording a single controlling shareholder: A. Voss, 100%.',
        tells: 'Aurelia Voss owns the company outright. Ian Kettle was an employee, not a principal.'
      },
      'shipping-manifest': {
        name: 'Shipping manifest', caption: '“One bell, one ledger, Rotterdam”', icon: 'receipt', type: 'Document',
        desc: 'A shipping manifest prepared for the morning after the sale, consigning one bell and one ledger to Rotterdam.',
        tells: 'Aurelia intended to ship the bell and the ledger out of the country before the police could act.'
      },
      'vault-open': {
        name: 'Lot vault open', caption: '24 crates · lot 25 empty', icon: 'lockbox', type: 'Scene mark',
        desc: 'The lot vault, opened on 1874, containing twenty-four numbered crates and an empty shelf where lot 25 should be.',
        tells: 'The lots are all still here. The bell and the ledger were moved to the gallery before the sale.'
      },
      'bell-crate': {
        name: 'Crate 1 — the bell', caption: 'Empty · wool packing · 1874', icon: 'archive', type: 'Physical evidence',
        desc: 'The crate for lot 1, emptied of its bronze bell but still holding the wool packing and the original 1874 catalogue label.',
        tells: 'The bell was removed from the vault and taken to the gallery. The crate is the proof it was here.'
      },
      'painting-crate': {
        name: 'Crate 9 — Northgate canvases', caption: 'Three paintings · one frame', icon: 'photo', type: 'Physical evidence',
        desc: 'The crate for lot 9, containing three Northgate canvases in a single frame, each with a false provenance label.',
        tells: 'The art from the Northgate case was being sold through Meridian. The network handled stolen paintings.'
      },
      'seed-case': {
        name: 'Crate 17 — Ashcombe seeds', caption: 'Two cold cases · cycad seed', icon: 'archive', type: 'Physical evidence',
        desc: 'The crate for lot 17, holding two cold-storage cases of cycad seed from the Ashcombe collection.',
        tells: 'The seed collection sold by Rowan Ashcombe was being resold through Meridian. The cases are linked.'
      },
      'bond-folder': {
        name: 'Crate 24 — Kingsway bonds', caption: '£2.1m bearer bonds', icon: 'money', type: 'Financial record',
        desc: 'The crate for lot 24, containing £2.1 million in bearer bonds from Kingsway Private Bank.',
        tells: 'The bonds stolen from box 118 were being laundered through the same sale as the bell.'
      },
      'master-ledger': {
        name: 'The Meridian ledger', caption: 'Green morocco · 500 pages · from 1974', icon: 'ledger', type: 'Document',
        desc: 'The master ledger of Meridian Heritage, bound in green morocco and sealed inside the bell, recording every purchase, bribe and false provenance since 1974.',
        tells: 'The ledger names the whole network, including Aurelia Voss as founder and controlling shareholder.'
      },
      'meridian-seal': {
        name: 'Meridian wax seal', caption: 'Bell within a circle · AV 1974', icon: 'lock', type: 'Physical evidence',
        desc: 'A wax seal from the transfer receipt, bearing the Meridian crest and the founder’s mark AV 1974, matching the seal on the ledger.',
        tells: 'Aurelia Voss personally sealed the ledger and the transfer. The seal opens the gallery.'
      },
      'lot-25-receipt': {
        name: 'Lot 25 transfer receipt', caption: '“Transferred to gallery — 06:40 — A. Voss”', icon: 'receipt', type: 'Record',
        desc: 'A receipt recording the transfer of lot 25 from the vault to the gallery at 06:40, signed A. Voss with an unbroken wax seal.',
        tells: 'Aurelia moved the bell and the ledger herself, minutes before the murder.'
      },
      'camera-card': {
        name: 'Saleroom camera card', caption: 'Stage · 24 hours · not encrypted', icon: 'cctv', type: 'Device',
        desc: 'The recorder card from the saleroom stage camera, holding the last twenty-four hours of footage.',
        tells: 'The camera was working. The footage can place the killer on the gantry.'
      },
      'access-log': {
        name: 'Access log', caption: '06:40 gallery · 06:52 gantry · 07:02 stage', icon: 'id', type: 'Access record',
        desc: 'The Meridian House door log, recording Aurelia Voss in the gallery at 06:40 and on the gantry at 06:52, and the cleaner on stage at 07:02.',
        tells: 'Aurelia Voss had sole access to the gallery and the gantry in the hour before the murder.'
      },
      'guard-roster': {
        name: 'Guard roster', caption: 'Stage alarm isolated 19:55 — D.V.', icon: 'note', type: 'Record',
        desc: 'The security roster, with a pencil note recording that Dexter Vane isolated the stage alarm at 19:55.',
        tells: 'The stage was deliberately left unwatched. Dexter disabled the alarm on someone’s instruction.'
      },
      'cctv-still': {
        name: 'Gantry still, 06:58', caption: 'Grey coat · silver bell brooch · wire cutters', icon: 'cctv', type: 'Surveillance',
        desc: 'An enhanced still of Aurelia Voss on the lighting gantry at 06:58, holding wire cutters, with her face turned away.',
        tells: 'Aurelia was on the gantry with the tool that cut the earth wire. The brooch identifies her.'
      },
      'camera-time': {
        name: 'Camera timestamp', caption: '06:58 · eight minutes fast', icon: 'watch', type: 'Analysis',
        desc: 'The camera timestamp, eight minutes fast, corrected to 06:50 by the recorder drift.',
        tells: 'The corrected time places Aurelia on the gantry two minutes before the circuit faulted.'
      },
      'final-timeline': {
        name: 'Last night timeline', caption: '18:20 → 07:05', icon: 'clock', type: 'Analysis',
        desc: 'A reconstruction of Kettle’s call, Aurelia’s arrival, the rehearsal, the alarm isolation, the gantry, the cut wire and the discovery.',
        tells: 'Aurelia had the time, the access and the tool. The murder was planned before the sale opened.'
      },
      'ink-analysis': {
        name: 'Ink analysis', caption: 'Iron gall · 1970s stock · genuine', icon: 'chemical', type: 'Forensic analysis',
        desc: 'The ledger ink is iron gall and the paper is 1970s bank stock. The document is not a modern forgery.',
        tells: 'The ledger is the original. Its entries can be trusted as a record of fifty years of crime.'
      },
      'paper-analysis': {
        name: 'Paper analysis', caption: 'Watermark · Meridian House · 1974', icon: 'note', type: 'Forensic analysis',
        desc: 'The ledger paper carries a 1974 Meridian House watermark, matching the founding year of the company.',
        tells: 'Aurelia Voss created the ledger when she founded the company. She has been keeping the record ever since.'
      },
      'bell-inscription': {
        name: 'Bell inscription', caption: '“ST CUTHBERT’S — 1874 — RESTORED 1974 — A.V.”', icon: 'archive', type: 'Physical evidence',
        desc: 'The inscription inside the bell: St Cuthbert’s, cast 1874, restored 1974, with the founder’s initials A.V.',
        tells: 'The gallery bell is the original St Cuthbert’s bell, not a replica. Aurelia Voss kept it for fifty years.'
      },
      'total-value': {
        name: 'Sale valuation', caption: '24 lots · £9.0m reserve', icon: 'chart', type: 'Analysis',
        desc: 'The 24 recovered lots carry a reserve of £9.0 million, based on their £6.3 million insurance at 70%.',
        tells: 'The recovered assets are worth nine million pounds. The missing lot is worth the rest.'
      },
      'missing-lot': {
        name: 'Lot 25 valuation', caption: '£2.1m — the same as the bonds', icon: 'money', type: 'Analysis',
        desc: 'Lot 25 was reserved at £2.1 million, exactly the face value of the Kingsway bearer bonds.',
        tells: 'The bell and the bonds were the same money. The sale was designed to launder the same value twice.'
      },
      'network-map': {
        name: 'Meridian network map', caption: 'Bell · paintings · seeds · bonds', icon: 'map', type: 'Analysis',
        desc: 'A grid matching the St Cuthbert’s bell, the Northgate canvases, the Ashcombe seed cases and the Kingsway bonds to lots 1, 9, 17 and 24.',
        tells: 'Every lot is an asset from a closed case. The Provenance Sale was the network’s final clearing house.'
      },
      'bell-original': {
        name: 'The original bell', caption: 'St Cuthbert’s · cast 1874 · hung 1974', icon: 'archive', type: 'Physical evidence',
        desc: 'The bronze bell in the private gallery, identified by its inscription as the original St Cuthbert’s bell.',
        tells: 'The bell was never stolen. It was swapped, and the church has rung a replica for fifty years.'
      },
      'ledger-tube': {
        name: 'Ledger tube', caption: 'Welded into the bell’s crown', icon: 'lockbox', type: 'Physical evidence',
        desc: 'A sealed brass tube welded into the crown of the bell, large enough to hold the master ledger.',
        tells: 'The ledger was hidden inside the bell. The Meridian File was not a file but a bell.'
      },
      'master-lot': {
        name: 'Lot 25 identified', caption: 'The Meridian File', icon: 'cipher', type: 'Analysis',
        desc: 'The final lot, identified as the Meridian File: the bell, the ledger and the record of every crime.',
        tells: 'Lot 25 was never for sale. It was the evidence and the insurance policy of the network.'
      },
      'mira-catalogue': {
        name: 'Mira on the sale', caption: '“He said it was the only way to stop her.”', icon: 'audio', type: 'Statement',
        desc: 'Mira says Kettle intended to hand over the ledger and the bell to stop Aurelia, and that she warned him it was madness.',
        tells: 'Kettle knew the network was controlled by Aurelia. He was trying to end it.'
      },
      'mira-key': {
        name: 'Mira on the vault', caption: '“She owns the building.”', icon: 'note', type: 'Statement',
        desc: 'Mira lists the vault keyholders: Kettle, herself, Dexter and Aurelia Voss.',
        tells: 'Aurelia had access to every lot. The vault was not a barrier to her.'
      },
      'mira-alibi': {
        name: 'Mira’s alibi', caption: 'Home from six · night staff in the building', icon: 'receipt', type: 'Alibi',
        desc: 'Mira says she left at six and was at home during the night, with the night staff in the building.',
        tells: 'Mira was not on the gantry. The access log places Aurelia there instead.'
      },
      'mira-kettle': {
        name: 'Mira on the argument', caption: '“It is never over while the bell is still here.”', icon: 'audio', type: 'Witness statement',
        desc: 'Mira describes the argument between Kettle and Aurelia on Wednesday, and Aurelia’s words about the bell.',
        tells: 'Aurelia knew Kettle planned to surrender the bell and the ledger. She had two days to stop him.'
      },
      'mira-aurelia': {
        name: 'Mira on the fall', caption: '“He said it was an accident.”', icon: 'audio', type: 'Statement',
        desc: 'Mira admits she heard the spotlight fall and accepted Dexter’s explanation because it was easier.',
        tells: 'The staff closed ranks around an accident. The physical evidence shows it was not one.'
      },
      'dex-camera': {
        name: 'Dexter on the camera', caption: '“The recorder drifts.”', icon: 'note', type: 'Statement',
        desc: 'Dexter dismisses the camera drift and insists the gantry door was locked.',
        tells: 'The access log shows the gantry opened with Aurelia’s seal. The camera drift is minutes, not hours.'
      },
      'dex-log': {
        name: 'Dexter on the access log', caption: '“She signs herself in.”', icon: 'audio', type: 'Statement',
        desc: 'Dexter confirms Aurelia entered at seven, went to the gallery, then the gantry.',
        tells: 'Aurelia was in the building before the rehearsal. Dexter’s own log places her there.'
      },
      'dex-bribe': {
        name: 'Dexter on the payments', caption: '“Security consultancy.”', icon: 'note', type: 'Statement',
        desc: 'Dexter admits receiving payments from Meridian beyond his salary and calls them security consultancy.',
        tells: 'Dexter was on Meridian’s payroll. His loyalty was to Aurelia, not to the building.'
      },
      'dex-alarm': {
        name: 'Dexter on the alarm', caption: '“She asked me to isolate it.”', icon: 'audio', type: 'Statement',
        desc: 'Dexter admits isolating the stage alarm at Aurelia’s request for the rehearsal.',
        tells: 'Aurelia arranged for the stage to be unwatched. The alarm isolation was part of the plan.'
      },
      'dex-saw': {
        name: 'Dexter on the gantry', caption: '“She told me to report it as wear.”', icon: 'audio', type: 'Statement',
        desc: 'Dexter admits seeing Aurelia come down from the gantry with a tool roll and telling him to report the chain as wear.',
        tells: 'Dexter saw Aurelia with the tools. His statement corroborates the CCTV and the tool marks.'
      },
      'quill-sale': {
        name: 'Quill on the sale', caption: '“Lot 25 was not for sale.”', icon: 'note', type: 'Statement',
        desc: 'Quill says lot 25 was a reserve item held for the founder, not part of the auction.',
        tells: 'Lot 25 was always the file. The sale catalogue listing was a cover.'
      },
      'quill-bell': {
        name: 'Quill on the bell', caption: '“A commercial fiction.”', icon: 'audio', type: 'Statement',
        desc: 'Quill admits the bell is the original St Cuthbert’s bell and the catalogue description is false.',
        tells: 'The bell was swapped, not stolen. Quill documented the fraud for fifty years.'
      },
      'quill-aurelia': {
        name: 'Quill on the founder', caption: '“Ian was the face. She was the signature.”', icon: 'audio', type: 'Statement',
        desc: 'Quill confirms Aurelia Voss is the founder and sole shareholder, and Kettle was only the public chairman.',
        tells: 'Aurelia controlled every Meridian transaction. The motive and the authority were hers.'
      },
      'quill-kettle': {
        name: 'Quill on the immunity', caption: '“He wanted to be able to sleep.”', icon: 'note', type: 'Statement',
        desc: 'Quill describes Kettle’s attempt to negotiate immunity and his fear of Aurelia.',
        tells: 'Kettle was trying to leave the network. Aurelia killed him to stop the ledger leaving with him.'
      },
      'quill-ledger': {
        name: 'Quill on the ledger', caption: '“It names everyone.”', icon: 'audio', type: 'Statement',
        desc: 'Quill says the ledger names every shell company, bank and official who protected Meridian.',
        tells: 'The ledger is the largest corruption case in the city. It had to be recovered before the sale.'
      },
      'aurelia-alibi': {
        name: 'Aurelia on the gantry', caption: '“Anyone could be wearing a grey coat.”', icon: 'note', type: 'Statement',
        desc: 'Aurelia admits she watches rehearsals from the gantry but denies being the figure in the still.',
        tells: 'The brooch, the tool roll and the access log place her there. The denial is not credible.'
      },
      'aurelia-bell': {
        name: 'Aurelia on the bell', caption: '“A bell is not a holy thing.”', icon: 'audio', type: 'Statement',
        desc: 'Aurelia admits keeping the original St Cuthbert’s bell and giving the church a replica.',
        tells: 'She admits the fifty-year fraud. The bell is the first and last asset of the network.'
      },
      'aurelia-kettle': {
        name: 'Aurelia on Kettle', caption: '“I did not build it to be given away.”', icon: 'audio', type: 'Statement',
        desc: 'Aurelia admits Kettle wanted to surrender the company and says she refused to let him.',
        tells: 'She had a direct motive to stop Kettle. The surrender would have destroyed everything she built.'
      },
      'aurelia-sale': {
        name: 'Aurelia on the sale', caption: '“They were always mine.”', icon: 'note', type: 'Statement',
        desc: 'Aurelia claims every asset in the sale belonged to her and that the buyers were merely holding her property.',
        tells: 'She admits ownership of the stolen assets. The sale was a laundering operation under her control.'
      },
      'aurelia-confession': {
        name: 'Aurelia’s confession', caption: '“I only had to let the building do it.”', icon: 'audio', type: 'Statement',
        desc: 'Aurelia admits cutting the earth wire and leaving Kettle on the wet stage, claiming the building did the rest.',
        tells: 'She admits the murder. The rig log, the CCTV, the tool marks and the ledger corroborate her account.'
      }
    },
    solution: {
      minEvidence: 24,
      questions: [
        { q: 'Who killed Ian Kettle?',
          options: [
            { t: 'Mira Solberg — the auction director who ran the sale', v: 'mira' },
            { t: 'Dexter Vane — the security chief who isolated the alarm', v: 'dex' },
            { t: 'Ptolemy Quill — Meridian’s solicitor', v: 'quill' },
            { t: 'Aurelia Voss — the founder and controlling shareholder', v: 'aurelia' }
          ], answer: 'aurelia' },
        { q: 'How was Kettle killed?',
          options: [
            { t: 'Electrocuted by a rigged spotlight on a deliberately flooded stage', v: 'spotlight' },
            { t: 'Poisoned in his coffee before the rehearsal', v: 'poison' },
            { t: 'Shot on the gantry and carried down to the stage', v: 'shot' },
            { t: 'Pushed from the gantry onto the stage below', v: 'fall' }
          ], answer: 'spotlight' },
        { q: 'Why did Aurelia kill him?',
          options: [
            { t: 'Kettle was about to hand the ledger and the original bell to the police', v: 'ledger' },
            { t: 'Kettle was stealing the sale proceeds for himself', v: 'theft' },
            { t: 'Kettle was selling the bell to a rival collector', v: 'rival' },
            { t: 'Kettle had discovered her affair with Quill', v: 'affair' }
          ], answer: 'ledger' },
        { q: 'What is the Meridian File?',
          options: [
            { t: 'The master ledger, sealed inside the original St Cuthbert’s bell', v: 'bell' },
            { t: 'The auction catalogue listing all twenty-five lots', v: 'catalogue' },
            { t: 'The Kingsway bearer bonds in lot 24', v: 'bonds' },
            { t: 'The Radio Meridian broadcast licence', v: 'radio' }
          ], answer: 'bell' },
        { q: 'Which evidence breaks the case?',
          options: [
            { t: 'The rig log, the gantry still, and the ledger sealed inside the bell', v: 'rig' },
            { t: 'The torn Lot 25 ticket under the front row', v: 'ticket' },
            { t: 'Mira Solberg’s alibi for the night', v: 'alibi' },
            { t: 'The Rotterdam shipping manifest', v: 'manifest' }
          ], answer: 'rig' }
      ],
      verdict: {
        who: 'Aurelia Voss, 74 — founder and controlling shareholder of Meridian Heritage',
        whoDesc: 'was arrested in the private gallery and charged with murder, fraud, theft and perverting the course of justice. She pleaded guilty to murder and fraud; the court accepted that she did not physically push Kettle, but that she rigged the spotlight knowing he would stand on the wet stage.',
        how: 'She had Dexter Vane isolate the stage alarm, went up to the lighting gantry at 06:52, cut the earth wire twice, re-routed the live core to the metal housing, and poured water across the stage from the ornamental vase. At seven Kettle stepped onto the podium and the housing earthed through him.',
        why: 'Kettle had negotiated immunity and was due to hand the master ledger and the original St Cuthbert’s bell to the police at nine. The ledger named every buyer, bank and official in the network. Aurelia had spent fifty years building Meridian Heritage and would not let it be given away.',
        key: 'The rig log shows the earth was cut twice, the enhanced gantry camera shows Aurelia with the wire cutters, and the master ledger was recovered from the crown of the original St Cuthbert’s bell — the Meridian File itself.'
      },
      reveal: [
        'Meridian Heritage began with a bell. In 1974 the church of St Cuthbert’s raised £400 for a restoration and a young woman named Aurelia Voss offered to arrange it. She had a replica cast in a foundry in Rotterdam, hung the replica in the tower, and kept the original. The church has been ringing the fake for fifty years. No one ever noticed, because a bell is a sound, not an object, and the sound was exactly right.',
        'She sold the original twice more. Once to a private collector in 1988, who was told it was a Victorian copy. Once to herself, through a company she had just founded, for £2.1 million. The company was Meridian Heritage. The bell became the first entry in a ledger she kept in green morocco and never let out of her sight.',
        'The ledger grew. A peal of bells in St Cuthbert’s parish. Three Northgate canvases that had been reported stolen in 2019 and sold to a buyer in Rotterdam. Two cold-storage cases of cycad seed from the Ashcombe collection. A folder of bearer bonds deposited at Kingsway Private Bank by a client who did not exist. Each acquisition was recorded on a single line, with a price, a buyer and a false provenance.',
        'Meridian did not steal these things itself. It bought them after other people had stolen them. It was the city’s laundering house: a respectable name, a private auction room, and a founder who had never given an interview in twenty years. Every case you closed led, eventually, to the same green ledger and the same bronze bell.',
        'Ian Kettle had been the face of Meridian since 1998. He signed the catalogues, charmed the buyers, and told himself he was a businessman. In the spring he found the first page of the ledger, the entry for the bell, and understood that the company had been built on a fifty-year fraud. He went to the police.',
        'He negotiated immunity for a month. On Wednesday he told Aurelia it was over. She came to the auction office and argued with him for an hour. He said, “It is over, Aurelia.” She said, “It is never over while the bell is still here.” He should have heard the warning for what it was.',
        'On Thursday night he called the incident room at 18:20 and said he would bring the ledger and the bell to the station at nine. Aurelia arrived at seven and watched the dress rehearsal from the gantry. At 19:55 she asked Dexter Vane to isolate the stage alarm. At 06:52 she went back up with a tool roll.',
        'The rest took eight minutes. She cut the earth wire twice, folded the live core back into the housing, and poured the vase across the stage. Kettle stepped up to the podium to rehearse his confession, and the spotlight came down. The cleaning supervisor found him at five past seven. The sale was still due to open at nine.',
        'The Meridian File was not a file. It was the bell. The ledger had been sealed inside its crown in a brass tube, and the bell had been hanging in the private gallery since 1974, above the woman who had built an empire out of it. Lot 25 was never for sale. It was the evidence, the insurance and the monument, all at once.',
        'The twenty-four other lots were recovered from the vault and returned: the Northgate canvases to their owners, the Ashcombe seeds to the botanic garden, the bearer bonds to the Dutch authorities, the bell to St Cuthbert’s. The church had to take down its replica. The original rang again on the first Sunday of Advent, and the sound was, according to the vicar, exactly the same.',
        'Aurelia Voss was sentenced to life with a minimum of twenty years. Ptolemy Quill was struck off and charged with fraud. Dexter Vane was sentenced to four years for perverting the course of justice. Mira Solberg was not charged; she had called the buyers, not the police, but she had also kept every record, and the records closed the case.',
        'The Meridian ledger ran to five hundred pages and named one hundred and forty people. Forty-one were charged. Nine were public officials. The joint investigation — the bells, the art, the radio station, the botanic garden, the bank — was bound into a single file and given a single name. On the cover, in the property clerk’s handwriting, it says: THE MERIDIAN FILE. CLOSED.'
      ],
      quote: 'It is never over while the bell is still here.',
      twist: 'The final detail was the bell itself. The Meridian File was not a document but the original St Cuthbert’s bell, hung in Aurelia’s private gallery for fifty years while the church rang a replica. The ledger was sealed inside its crown. Every case in the city — the bells, the paintings, the seeds, the bonds, the radio — was a line in a book that had been hidden in plain sound.'
    }
  });
})();
