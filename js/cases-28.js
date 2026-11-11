/* ============================================================
   CASE 28 - THE FORGOTTEN ARCHIVE
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c28', num: 28,
    title: 'The Forgotten Archive',
    subtitle: 'A girl vanished in 1998. The library kept her hidden in the wall.',
    difficulty: 4, est: '35-45 min',
    cover: { kind: 'archive', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Marie Kell, 19 - student archivist, Bellwether College' },
      { k: 'Scene', v: 'The old library annex, now under demolition' },
      { k: 'Missing', v: 'Last seen 12 November 1998' },
      { k: 'Found', v: 'Monday, 09:20 - inside a sealed service duct' }
    ],
    briefing: [
      "Marie Kell disappeared on a Thursday night in 1998. The file says runaway: a packed bag, a bus ticket, a boyfriend she had argued with. Nobody looked for her very hard. The college wanted the story gone before the winter donor dinner.",
      "Twenty-eight years later a demolition crew opened a bricked-up service duct in the old library annex and found a skeleton with a student card in its pocket. The card is Marie's. The duct was sealed the week she vanished.",
      "Her case box is still in the basement. It is thin, polite and almost empty. Somewhere in it is the reason nobody ever searched the archive."
    ],
    opening: 'The annex smells of wet brick and old paper. A hole has been knocked through the basement wall, and cold air moves out of it like the building is breathing.',
    objectives: [
      'Establish how Marie Kell died and how she was hidden.',
      'Recover the 1998 case box and the missing archive records.',
      'Decode the rare-book ledger and trace the sale.',
      'Prove who had access to the archive that night.'
    ],
    locations: [
      {
        id: 'site', name: 'Demolition Site', short: 'Annex', time: '10:00',
        art: { kind: 'archive', mood: 'cold' },
        intro: 'A basement half pulled down. The service duct is a black rectangle at chest height, its brick seal broken from the outside. A forensic tent covers the floor beneath it.',
        actions: [
          { id: 'body', label: 'Examine the remains and the duct', icon: 'blood', hotspot: { x: 48, y: 52 },
            desc: 'The bones, the binding, the mortar',
            text: [
              "The skeleton is curled against the back of the duct. The hyoid bone is fractured on both sides, the kind of break that comes from sustained pressure, not a fall.",
              "The wrists are still held together by a loop of electrical cable. The cable has a college maintenance tag.",
              "The brick seal was mortared from the archive side. A fossil of a rubber glove is pressed into the mortar near the top course."
            ],
            gives: ['c28_body', 'c28_duct'],
            hint: 'The duct was sealed from inside the archive, and the binding is college cable.'
          },
          { id: 'photo', label: 'Enhance the 1998 library photograph', icon: 'photo', puzzle: 'library-photo',
            desc: 'A donor photograph taken the week she vanished',
            gives: ['c28_photo'],
            hint: 'Slide the enhancement to the archive door. Someone is standing in it after hours.'
          },
          { id: 'card', label: 'Read the student card', icon: 'id',
            desc: 'Marie Kell, 1998 intake',
            text: [
              "The card is warped but legible: MARIE KELL, LIBRARY ARCHIVE ASSISTANT, STUDENT NO. MK-981112.",
              "In her handwriting on the back: ATLAS - CHECK THE BUYER.",
              "There is a second number scratched beneath it, the old case reference: 98-1112."
            ],
            gives: ['c28_card'],
            hint: 'She left a note on her own card. It points at a book and a buyer.'
          }
        ]
      },
      {
        id: 'archive', name: 'Old Library Archive', short: 'Archive', time: '11:00',
        art: { kind: 'archive', mood: 'cold' },
        requires: ['c28_body'],
        intro: 'The archive survived the demolition, just: a long room of shelves, card indexes and a desk under a green lamp. Dr Evelyn March has worked here since 1991. She has not sat down.',
        actions: [
          { id: 'evelyn', label: 'Question Dr Evelyn March', icon: 'user', suspect: 'evelyn',
            desc: 'Archivist - worked with Marie in 1998' },
          { id: 'ledger', label: 'Find the rare-book ledger', icon: 'cipher', puzzle: 'sale-cipher',
            desc: 'A coded acquisitions list',
            gives: ['c28_cipher'],
            hint: 'The card says ATLAS. Try a small shift and look for the word WREN.'
          },
          { id: 'shelf', label: 'Check the empty shelf', icon: 'book',
            desc: 'The atlas is missing - so is its record',
            text: [
              "Shelf 14 holds a gap the exact size of a folio atlas. A collection label remains: BELLWETHER ATLAS, DONATED 1972, ACCESSION A-114.",
              "The accession card has been removed from the index. The card drawer has a fresh gap where it used to sit, freshly cut, as if someone cleaned it recently.",
              "A layer of dust on the shelf is thin in the shape of a book. It has been gone a long time, but something was placed there and removed again."
            ],
            gives: ['c28_atlas'],
            hint: 'The atlas is gone and someone has cleaned its record.'
          }
        ]
      },
      {
        id: 'college', name: 'Records Office', short: 'Records', time: '12:10',
        art: { kind: 'office', mood: 'cold' },
        requires: ['c28_cipher'],
        intro: 'A modern office bolted onto the old college. The registrar keeps the 1998 file boxes on a high shelf, labelled with a neatness that suggests nobody has ever asked for them.',
        actions: [
          { id: 'micro', label: 'Read the microfiche index', icon: 'terminal', puzzle: 'micro-term',
            desc: '1998 archive access and security logs',
            gives: ['c28_badge'],
            hint: 'Type HELP. The archive log for 12 November is in the box marked A-114.'
          },
          { id: 'custody', label: 'Sort the case box', icon: 'archive', puzzle: 'custody-seq',
            desc: 'Report, search, burial, review',
            gives: ['c28_case'],
            hint: 'The standard sequence: missing report, search, recovery, review. The 1998 file skips the search.'
          },
          { id: 'danny', label: 'Question Danny Rooke', icon: 'user', suspect: 'danny',
            desc: 'Boyfriend in 1998 - left town that week' }
        ]
      },
      {
        id: 'wren', name: 'Arthur Wren\'s Bungalow', short: 'Bungalow', time: '13:30',
        art: { kind: 'interior', mood: 'cold' },
        requires: ['c28_badge'],
        intro: 'A neat bungalow on the coast road, full of model ships and framed staff photographs. Arthur Wren kept the college keys for twenty-two years. He opens the door before you knock.',
        actions: [
          { id: 'wren', label: 'Question Arthur Wren', icon: 'user', suspect: 'wren',
            desc: 'Retired security chief - held the archive keys' },
          { id: 'safe', label: 'Open the display cabinet safe', icon: 'keypad', puzzle: 'safe-pin',
            desc: 'Four-digit lock under the brass nameplate',
            gives: ['c28_ring'],
            hint: 'The old case number is printed on the student card: 98-1112.'
          },
          { id: 'ships', label: 'Search the workshop', icon: 'search',
            desc: 'Auction receipts and a book-shaped case',
            text: [
              "On the bench: a stack of auction receipts from 1999, all for rare books, all paid to a seller listed only as A.W.",
              "A long book-shaped case lies under a dust sheet. The foam is cut for a folio. The case is empty, and the label in the lid reads BELLWETHER ATLAS.",
              "A college maintenance cable is wound neatly on a nail. It is the same type used to bind Marie's wrists."
            ],
            gives: ['c28_sale', 'c28_cable'],
            hint: 'The atlas case is empty. The auction receipts are made out to A.W.'
          }
        ]
      }
    ],
    puzzles: {
      'library-photo': {
        type: 'photo', title: 'The Donor Photograph', subtitle: 'Enhance the archive door', icon: 'photo',
        scene: { kind: 'archive', mood: 'cold' },
        target: { x: 68, y: 50, w: 18, h: 26 }, range: [60, 84],
        reveal: 'At the archive door: a man in a security uniform carrying a long flat case. The time stamp is 23:26, 12 November 1998. The door should have been locked.',
        question: 'What does the enhanced photograph show?', options: [
          { t: 'A security officer carrying a flat case into the archive after hours', v: 'wren' },
          { t: 'Marie leaving the library with a suitcase', v: 'marie' },
          { t: 'A group of students at the donor dinner', v: 'dinner' }
        ],
        answer: 'wren',
        wrong: 'Look at the door, not the crowd. The uniform is a college security jacket and the case is flat and long.',
        success: 'The photograph shows Arthur Wren entering the archive at 23:26 with a flat case. He claimed he had gone home at ten.',
        gives: ['c28_photo'], flags: ['photoSeen'],
        short: 'Wren entered the archive at 23:26.',
        log: 'The donor photograph shows Arthur Wren entering the archive at 23:26 carrying a flat case, two hours after his claimed departure.'
      },
      'sale-cipher': {
        type: 'cipher', title: 'Rare-Book Ledger', subtitle: 'Coded acquisitions', icon: 'cipher',
        prompt: 'The ledger lists donations beside coded initials. Turn the wheel until the seller and the missing book resolve.',
        plain: 'WREN SOLD THE ATLAS', shift: 4,
        hintText: 'A small shift. The surname on the security staff list is WREN.',
        success: 'The ledger decodes: WREN SOLD THE ATLAS. The security chief had been selling donated rare books for years.',
        gives: ['c28_cipher'], flags: ['cipherRead'],
        short: 'The ledger names Wren as the seller.',
        log: 'The coded ledger reads WREN SOLD THE ATLAS. The college security chief had been selling donated rare books.'
      },
      'micro-term': {
        type: 'terminal', title: 'Microfiche Index', subtitle: 'Archive records, 1998', icon: 'terminal',
        user: 'registrar', host: 'bellwether-index', password: 'atlas',
        intro: 'Bellwether College records terminal. Type help for commands.',
        banner: '1988-1999 ARCHIVE - BOX A-114',
        files: [
          { name: 'access.log', body: '12/11/98<br>18:40 M. KELL in - archive<br>22:05 M. KELL no exit logged<br>23:06 A. WREN in - archive<br><span class="r">01:38 A. WREN out - archive - carrying case</span>' },
          { name: 'security.txt', body: '<b>A. WREN</b> - chief of security, all keys<br><b>M. KELL</b> - archive assistant, day access only<br><b>E. MARCH</b> - archivist, day access only<br><span class="d">Night patrol cancelled 12/11 for donor dinner.</span>' },
          { name: 'missing.txt', body: '13/11/98 - Missing person report filed by E. MARCH<br>Status: <b>RUNAWAY</b> - no search authorised<br>Bag found at bus station: packed, no ticket<br><span class="d">Reporting officer: A. WREN</span>' }
        ],
        hintText: 'Find the badge that enters after Marie and leaves at 01:38 carrying a case.',
        success: 'The log is damning: Marie entered at 18:40 and never left. Wren entered at 23:06 and left at 01:38 carrying a case. Wren took the missing report himself.',
        gives: ['c28_badge'], flags: ['microRead'],
        short: 'Wren entered after Marie and carried out a case.',
        log: 'The 1998 access log shows Marie entering at 18:40 with no exit, and Wren entering at 23:06 and leaving at 01:38 with a case.'
      },
      'custody-seq': {
        type: 'sequence', title: 'The 1998 Case Box', subtitle: 'Four documents, one missing step', icon: 'archive',
        prompt: 'Put the case documents in the order a proper investigation would follow. Then notice what the 1998 file never did.',
        variant: 'strips',
        items: [
          { t: 'Missing person report filed', sub: '13 November 1998' },
          { t: 'Witness statements collected', sub: '15 November 1998' },
          { t: 'Building search authorised', sub: 'NEVER' },
          { t: 'File marked runaway and closed', sub: '2 December 1998' }
        ],
        success: 'The file jumps from statements to closure. No search of the building was ever authorised. Wren wrote the report and Wren closed it.',
        gives: ['c28_case'], flags: ['custodyDone'],
        short: 'The archive was never searched in 1998.',
        log: 'The case box shows statements were taken but the building was never searched. Wren filed and closed the runaway report himself.'
      },
      'safe-pin': {
        type: 'keypad', title: 'Display Cabinet Safe', subtitle: 'Four-digit lock', icon: 'keypad',
        deviceLabel: 'A.W. - DISPLAY CABINET', length: 4, code: '1112',
        prompt: 'The safe sits under Wren\'s brass nameplate. The last four digits of Marie\'s old case number are etched into the lock surround.',
        hintText: 'The case number is 98-1112. Four digits.',
        success: 'The safe opens on a velvet tray holding a student ring and a folded auction receipt.',
        gives: ['c28_ring'], flags: ['safeOpen'],
        short: 'Marie\'s ring is in Wren\'s safe.',
        log: 'Wren\'s safe holds Marie\'s student ring and an auction receipt for the Bellwether Atlas.'
      }
    },
    clues: {
      'c28_body': { name: 'Fractured hyoid', caption: 'Both sides - sustained pressure', icon: 'blood', type: 'Forensic observation',
        desc: 'The hyoid bone is fractured on both sides and the wrists were bound with electrical cable. There is no evidence of a fall.',
        tells: 'Marie was restrained and strangled. This was not a runaway.' },
      'c28_duct': { name: 'Sealed service duct', caption: 'Mortared from the archive side', icon: 'pin', type: 'Scene evidence',
        desc: 'The duct was sealed with brick and mortar from inside the archive. A rubber-glove fossil sits in the top course.',
        tells: 'Her body was hidden by someone with access to the archive and the maintenance stores.' },
      'c28_card': { name: "Marie's student card", caption: 'ATLAS - CHECK THE BUYER', icon: 'id', type: 'Document',
        desc: 'Marie\'s card carries her handwritten note: ATLAS - CHECK THE BUYER, and the old case number 98-1112.',
        tells: 'She knew the atlas mattered and she was trying to leave a trail.' },
      'c28_photo': { name: 'Donor photograph', caption: 'Wren at the archive door - 23:26', icon: 'photo', type: 'Photographic evidence',
        desc: 'An enhanced donor photograph shows Arthur Wren entering the archive at 23:26 with a flat case, two hours after he said he went home.',
        tells: 'Wren lied about his movements. He was in the archive after Marie.' },
      'c28_cipher': { name: 'Decoded ledger', caption: 'WREN SOLD THE ATLAS', icon: 'cipher', type: 'Decoded message',
        desc: 'The rare-book ledger decodes to WREN SOLD THE ATLAS. The security chief had been selling donated books.',
        tells: 'Marie found the theft. That is why she was silenced.' },
      'c28_atlas': { name: 'Empty atlas shelf', caption: 'Accession card removed', icon: 'book', type: 'Physical evidence',
        desc: 'The Bellwether Atlas is missing from shelf 14, and its accession card has been cut out of the index.',
        tells: 'Someone removed both the book and its record - the work of a person who knew the archive system.' },
      'c28_badge': { name: '1998 access log', caption: 'Marie in 18:40 - Wren in 23:06 - out 01:38', icon: 'id', type: 'Technical record',
        desc: 'Marie entered the archive at 18:40 and never logged out. Wren entered at 23:06 and left at 01:38 carrying a case.',
        tells: 'Wren was the last person with Marie. He carried something out of the archive.' },
      'c28_case': { name: 'The 1998 case box', caption: 'Runaway - no search authorised', icon: 'archive', type: 'Document',
        desc: 'The case box has a missing person report, three statements, no building search, and a closure marked runaway.',
        tells: 'The investigation was deliberately hollow. Wren filed the report and signed it closed.' },
      'c28_sale': { name: 'Auction receipts', caption: '1999 - seller A.W.', icon: 'money', type: 'Financial record',
        desc: 'A stack of 1999 auction receipts for rare books, all paid to a seller listed as A.W. One names the Bellwether Atlas.',
        tells: 'Wren sold the atlas a year after Marie disappeared. The theft and the murder are the same case.' },
      'c28_ring': { name: "Marie's student ring", caption: 'Engraved M.K. - in Wren\'s safe', icon: 'jewelry', type: 'Physical evidence',
        desc: 'A silver student ring engraved M.K. was found in Wren\'s display-cabinet safe, with an auction receipt for the atlas.',
        tells: 'Wren kept a personal trophy. He had Marie\'s ring and the book she died for.' },
      'c28_cable': { name: 'Maintenance cable', caption: 'College tag - matches wrist binding', icon: 'wire', type: 'Physical evidence',
        desc: 'A coil of college maintenance cable hangs in Wren\'s workshop. The tag matches the cable used to bind Marie.',
        tells: 'The binding came from Wren\'s stores and was kept as an ordinary tool.' },
      'c28_boyfriend': { name: "Danny's alibi", caption: 'Bus ticket - left at 21:00', icon: 'ticket', type: 'Red herring',
        desc: 'Danny Rooke argued with Marie that afternoon and left town on the 21:00 bus. The ticket and the driver place him forty miles away by 23:00.',
        tells: 'The obvious boyfriend was gone before Wren entered the archive.' }
    },
    suspects: [
      {
        id: 'wren', name: 'Arthur Wren', role: 'Retired security chief - held the archive keys', location: 'wren', locationName: 'The bungalow',
        tag: 'Primary suspect', portrait: { seed: 'arthur-wren', hair: 'silver', hairColor: '#c8c0b4', skin: 1, expression: 'guarded', collar: 'coat' },
        intro: 'Wren is seventy-one, tidy and unhurried. He remembers Marie as a nice girl who ran off to the city. He has a model of every ship he ever served on and a place for everything.',
        questions: [
          { q: 'When did you last see Marie Kell?', a: 'The afternoon of the twelfth. She was shelving donations. I went home at ten and heard the next day that she had run away.', gives: ['c28_photo'],
            follow: 'The donor photograph puts him at the archive door at 23:26. The access log has him leaving at 01:38.' },
          { q: 'Why did you file the missing report yourself?', a: 'The archivist was upset. I was security. It was a runaway, not a crime. I filled in the form and closed it.', requires: ['c28_case'], gives: ['c28_case'],
            follow: 'He filed it, investigated it and closed it. No building search was ever requested.' },
          { q: 'What happened to the Bellwether Atlas?', a: 'Books go missing. It was donated before my time. I would not know an atlas from a phone book.', requires: ['c28_cipher'], gives: ['c28_cipher'],
            follow: 'The coded ledger says WREN SOLD THE ATLAS. The auction receipts are signed A.W.' },
          { q: 'Why is Marie\'s ring in your safe?', a: 'I found it in the car park. I kept it in case someone claimed it. That is what a careful man does.', requires: ['c28_ring'], gives: ['c28_ring'],
            follow: 'He kept it for twenty-eight years. The safe code was her case number.' },
          { q: 'Why is there college cable in your workshop?', a: 'I fixed things. Everyone knew that. A bit of cable is not evidence of anything.', requires: ['c28_cable'], gives: ['c28_cable'],
            follow: 'The cable matches the binding. The glove fossil in the mortar is a maintenance glove.' }
        ],
        after: 'He asks whether the college will pay for a lawyer. He does not ask what was found in the wall.'
      },
      {
        id: 'danny', name: 'Danny Rooke', role: 'Boyfriend in 1998 - left town that night', location: 'college', locationName: 'Records office',
        tag: 'Red herring', portrait: { seed: 'danny-rooke', hair: 'short', hairColor: '#6a4a32', skin: 2, expression: 'tired', collar: 'jacket' },
        intro: 'Danny came back to the college because the news found him. He is fifty and looks older. He has carried the story of the fight for twenty-eight years.',
        questions: [
          { q: 'Did you hurt Marie?', a: 'No. We argued about the archive, about her working late. I got the bus at nine. The driver knew me. I was in Plymouth by eleven.', gives: ['c28_boyfriend'],
            follow: 'The bus ticket and the driver place him forty miles away when Wren entered the archive.' },
          { q: 'What did you argue about?', a: 'She said she had found something in the donations. Something big. She would not tell me. She said the security man kept looking at her.', requires: ['c28_boyfriend'],
            follow: 'She was frightened of Wren before she disappeared.' },
          { q: 'Why did everyone believe you ran her off?', a: 'Because it was easier. The college wanted a boyfriend story. Wren gave them one before I even got back.', requires: ['c28_case'], gives: ['c28_case'],
            follow: 'The runaway narrative was written by the man who killed her.' }
        ]
      },
      {
        id: 'evelyn', name: 'Dr Evelyn March', role: 'Archivist - worked with Marie', location: 'archive', locationName: 'Old archive',
        tag: 'Witness', portrait: { seed: 'evelyn-march', hair: 'bob', hairColor: '#b0a89a', skin: 1, expression: 'sad', collar: 'knit' },
        intro: 'Evelyn has kept the archive alive long after the college stopped funding it. She reports her missing person with a calm that has been rehearsed for decades.',
        questions: [
          { q: 'What was Marie working on?', a: 'The donation catalogue. She was comparing accessions to the shelves. She found gaps. Books that were listed but not there.', gives: ['c28_atlas'],
            follow: 'The gaps were the books Wren had sold. Marie was building a list.' },
          { q: 'Why was there no search?', a: 'Wren told me she had run away. He said he had found her bag at the bus station. I believed him because I wanted to.', requires: ['c28_case'], gives: ['c28_case'],
            follow: 'The bag was packed with no ticket. Wren reported it before anyone had asked for a search.' },
          { q: 'Did Marie say anything about Wren?', a: 'She said he had a key to everything and a reason to use it. I told her not to be dramatic. I have had twenty-eight years to regret that.', requires: ['c28_cipher'],
            follow: 'Wren held every key. The archive was his.' }
        ]
      }
    ],
    timeline: [
      { time: '18:40', text: 'Marie Kell enters the archive. She never logs out.' },
      { time: '21:00', text: 'Danny Rooke leaves on the Plymouth bus.' },
      { time: '23:06', text: 'Arthur Wren enters the archive with a flat case.' },
      { time: '23:26', text: 'The donor photograph captures Wren at the archive door.' },
      { time: '01:38', text: 'Wren leaves the archive carrying a case.' },
      { time: '13 Nov', text: 'Wren files the runaway report and closes it.' },
      { time: '1999', text: 'The Bellwether Atlas is sold at auction by A.W.' },
      { time: 'Present', text: 'Demolition opens the sealed duct.' }
    ],
    links: [
      { a: 'c28_badge', b: 'wren', note: 'Wren entered the archive after Marie and left with a case.' },
      { a: 'c28_cipher', b: 'wren', note: 'The decoded ledger names Wren as the seller.' },
      { a: 'c28_ring', b: 'wren', note: 'Marie\'s ring was hidden in Wren\'s safe.' },
      { a: 'c28_cable', b: 'wren', note: 'The binding cable matches Wren\'s maintenance stores.' },
      { a: 'c28_sale', b: 'wren', note: 'The auction receipts are signed A.W.' }
    ],
    forensics: {
      prompt: 'Two samples from the duct. Match each to its source.',
      samples: [
        { id: 'mortar', type: 'MORTAR', label: 'Duct seal - glove fossil', mark: 'college maintenance mortar' },
        { id: 'bind', type: 'CABLE', label: 'Wrist binding', mark: 'college issue, tag A-114' }
      ],
      candidates: [
        { id: 'stores', label: 'College maintenance stores' },
        { id: 'demo', label: 'Modern demolition mortar' },
        { id: 'home', label: 'Wren\'s garden brickwork' }
      ],
      answer: { mortar: 'stores', bind: 'stores' },
      success: 'Both samples come from the college maintenance stores. The duct was sealed with college materials by someone with access to them.',
      gives: ['c28_duct']
    },
    documents: [
      { id: 'missing', title: 'Missing person report - 1998', sub: 'Filed by A. Wren', body: '<div class="doc-sheet"><b>BELLWETHER COLLEGE - SECURITY REPORT</b><br>Missing: <b>Marie Kell, 19</b><br>Last seen: 12 November 1998<br>Status: <b>RUNAWAY</b><br>Bag recovered: bus station, packed, no ticket<br><br>Search of buildings: <span class="g">NOT REQUESTED</span><br>Reporting officer: <b>A. WREN</b><br><br><span class="d">Closed: 2 December 1998. Signed A. Wren.</span></div>',
        question: 'What is wrong with the report?', options: [
          { t: 'It declares her a runaway without searching the building', v: 'a' },
          { t: 'It was filed a year too late', v: 'b' },
          { t: 'It was filed by her boyfriend', v: 'c' }
        ],
        answer: 0, gives: ['c28_case'],
        log: 'Wren declared Marie a runaway and closed the file without ever searching the building where she died.',
        wrong: 'Look at what the report never requested.' },
      { id: 'auction', title: 'Auction receipt - 1999', sub: 'Lot 114: The Bellwether Atlas', body: '<div class="doc-sheet"><b>HARBOUR & VALE AUCTIONS</b><br>Lot 114 - <b>The Bellwether Atlas</b>, 1611<br>Seller: <b>A.W.</b><br>Buyer: private collection<br>Price: <b>£42,000</b><br>Date: <b>March 1999</b><br><br><span class="d">Provenance declared: private library, no institutional mark.</span></div>',
        question: 'Why does the receipt matter?', options: [
          { t: 'It ties Wren to selling the atlas a year after Marie vanished', v: 'a' },
          { t: 'It proves the atlas was donated in 1999', v: 'b' },
          { t: 'It names Danny as the seller', v: 'c' }
        ],
        answer: 0, gives: ['c28_sale'],
        log: 'The auction receipt shows A.W. sold the Bellwether Atlas in 1999 for £42,000, a year after Marie found the theft.',
        wrong: 'The initials and the date tell you who profited and when.' }
    ],
    audioCalls: [
      { id: 'c28-999', title: 'Emergency call - night porter, 1998', sub: 'Recovered from the old switchboard', cue: 'Under the porter\'s voice: a metal door, then a man saying, the archive is closed, go back to bed, then the line cuts.', pattern: [300, 0, 300, 420, 0], tone: 'triangle',
        options: [
          { t: 'A man sent the porter away from the archive', v: 'a' },
          { t: 'The porter found Marie alive', v: 'b' },
          { t: 'The call was made from the bus station', v: 'c' }
        ],
        answer: 0, gives: ['c28_badge'], flag: 'callHeard',
        log: 'The 1998 switchboard call captures a man ordering the night porter away from the archive on the night Marie vanished.',
        wrong: 'Listen to the voice that is not the porter. It is giving an order.' }
    ],
    mapTask: {
      q: 'Which route explains the duct, the case and the 01:38 exit?', options: [
        { t: 'Archive -> service duct -> loading bay with the atlas case', v: 'a' },
        { t: 'Archive -> bus station -> Plymouth', v: 'b' },
        { t: 'Archive -> donor dinner -> front gate', v: 'c' }
      ],
      answer: 0, gives: ['c28_duct'],
      log: 'Wren moved Marie into the service duct, sealed it, and carried the atlas out through the loading bay at 01:38.',
      wrong: 'The duct opens off the archive, and the loading bay is the only exit that avoids the front desk.' },
    redHerrings: [
      { clue: 'c28_boyfriend', label: "Danny's argument and bus ticket", clearedBy: ['c28_boyfriend', 'c28_badge'], note: 'Danny left on the 21:00 bus and was forty miles away when Wren entered the archive.' }
    ],
    contradictions: [
      { suspect: 'wren', statement: 0, evidence: ['c28_photo', 'c28_badge'],
        expose: 'He said he went home at ten. The photograph times him at the archive door at 23:26, and the access log has him leaving at 01:38 with a case.',
        wrong: 'The photograph and the badge log both put him in the archive after ten.' },
      { suspect: 'wren', statement: 1, evidence: ['c28_case'],
        expose: 'He filed the report, declared her a runaway and closed the case without requesting a search. He was the investigator and the suspect.',
        wrong: 'Read the report. The building was never searched.' },
      { suspect: 'wren', statement: 2, evidence: ['c28_cipher', 'c28_sale'],
        expose: 'The ledger says WREN SOLD THE ATLAS and the auction receipts are made out to A.W. He knew exactly what the atlas was.',
        wrong: 'The coded ledger and the receipts both carry his initials.' }
    ],
    solution: {
      minEvidence: 8,
      questions: [
        { kind: 'suspect', q: 'Who killed Marie Kell?', options: [
          { t: 'Arthur Wren - college security chief', v: 'wren' },
          { t: 'Danny Rooke - her boyfriend', v: 'danny' },
          { t: 'Dr Evelyn March - the archivist', v: 'evelyn' },
          { t: 'An unknown intruder at the donor dinner', v: 'intruder' }
        ], answer: 'wren' },
        { kind: 'method', q: 'How was Marie hidden?', options: [
          { t: 'Strangled in the archive and sealed inside the service duct', v: 'duct' },
          { t: 'She fell into the duct during demolition', v: 'fall' },
          { t: 'She was buried in the college garden', v: 'garden' },
          { t: 'She drowned in the harbour and was moved later', v: 'water' }
        ], answer: 'duct' },
        { kind: 'motive', q: 'Why was Marie killed?', options: [
          { t: 'She found the ledger proving Wren was stealing and selling rare books', v: 'books' },
          { t: 'She was leaving the college without telling him', v: 'leave' },
          { t: 'She had stolen money from the donation fund', v: 'money' },
          { t: 'She refused to give him a key to the archive', v: 'key' }
        ], answer: 'books' },
        { kind: 'evidence', q: 'Which evidence proves Wren was in the archive that night?', options: [
          { t: 'The donor photograph and the 1998 access log', v: 'photo' },
          { t: 'Danny\'s bus ticket', v: 'bus' },
          { t: 'The archivist\'s statement', v: 'evelyn' },
          { t: 'The empty shelf label', v: 'shelf' }
        ], answer: 'photo' }
      ],
      verdict: {
        who: "Arthur Wren",
        whoDesc: ", the college security chief, was charged with the murder of Marie Kell.",
        how: "He strangled her in the archive, sealed her inside the service duct, and filed her as a runaway the same week. The building did the rest of the hiding for twenty-eight years.",
        why: "Marie found the ledger that showed Wren stealing and selling the college's rare books. The atlas that paid for the donor wing was one of them.",
        key: "The donor photograph placing him at the archive door at 23:26, and the 1998 access log."
      },
      reveal: [
        "The packed bag and the bus ticket were a story, not a trail. Marie never left the annex. The duct was bricked up seven days after she vanished.",
        "Wren investigated his own crime. He wrote runaway, closed the case and never requested a search of the one building he controlled. Nobody asked why.",
        "Danny Rooke spent twenty-eight years believing she chose a bus over him. The photograph that clears him hung in the donor dinner for two decades."
      ],
      quote: "Some files are thin because someone made them that way.",
      twist: "The atlas was sold a year after she disappeared, and the receipt is made out to A.W."
    }
  });
})();
