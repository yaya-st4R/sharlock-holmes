/* ============================================================
   CASE 23 - DEAD MAN'S PASSWORD
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c23', num: 23,
    title: "Dead Man's Password",
    subtitle: 'A cryptographer left one message behind. It was not the suicide note.',
    difficulty: 4, est: '35-45 min',
    cover: { kind: 'office', mood: 'neon' },
    facts: [
      { k: 'Victim', v: 'Alan Mercer, 41 - cryptographer, co-founder of Meridian Vault' },
      { k: 'Scene', v: 'His study, Bell Yard, second floor' },
      { k: 'Found', v: 'Friday, 22:06 - by his business partner' },
      { k: 'Official cause', v: 'Apparent suicide by overdose' }
    ],
    briefing: [
      "Alan Mercer designed encryption systems for people who did not want to be found. On Friday night his business partner, Rowan Pike, let himself into the flat and found Alan dead at his desk with an empty pill bottle, a glass of whiskey and a typed note.",
      "The note says he could not go on. It is signed with a keyboard font. Alan handwrote everything, even shopping lists. He also hated the phrase in the first line - it was the opening of a novel he mocked for years.",
      "Alan's last act, six minutes before the estimated time of death, was to schedule an email. It has not arrived yet. It is addressed to you."
    ],
    opening: 'The study is warm and smells of whiskey and overheated electronics. A screensaver drifts across three monitors. One keyboard key is worn smooth, brighter than all the others.',
    objectives: [
      'Establish whether Alan wrote the suicide note.',
      'Break into the study systems and recover the scheduled message.',
      'Decode the poem that hides his wallet seed phrase.',
      'Find who had access to the flat and the account at the time of death.'
    ],
    locations: [
      {
        id: 'study', name: "Alan's Study", short: 'Study', time: '22:40',
        art: { kind: 'office', mood: 'neon' },
        intro: 'Books floor to ceiling, a mechanical keyboard, three monitors and a glass of whiskey with only one set of prints on it. Alan is in the chair, head back, the pill bottle on its side.',
        actions: [
          { id: 'body', label: 'Examine Alan and the desk', icon: 'blood', hotspot: { x: 50, y: 54 },
            desc: 'The glass, the bottle, the note',
            text: [
              "Alan's lips are stained amber but his tongue is clean. The whiskey was not swallowed. There is a faint chemical smell under it - something bitter and synthetic.",
              "The pill bottle is open but full. The capsules are a sleeping aid Alan did not take; the prescription is in his partner's name.",
              "The note is printed on the study printer. The printer queue shows it was typed at 19:58, before Alan's last known login."
            ],
            gives: ['c23_scene', 'c23_note', 'c23_prescription'],
            hint: 'The whiskey was not drunk. The pills were not swallowed. The note was printed before he died.'
          },
          { id: 'pc', label: 'Open the scheduled mail server', icon: 'terminal', puzzle: 'mail-term',
            desc: 'One scheduled message, one locked account',
            gives: ['c23_deadswitch'],
            hint: 'The worn keys spell NIGHT. Alan\'s favourite poem is Ode to a Nightingale.'
          },
          { id: 'dial', label: 'Unlock the desk drawer', icon: 'keypad', puzzle: 'drawer-pin',
            desc: 'Four digits hidden in the poem',
            gives: ['c23_poem'],
            hint: 'The poem is numbered. Lines 10, 24, 17 and 3 carry the digits.'
          }
        ]
      },
      {
        id: 'vault', name: 'Meridian Vault Office', short: 'Vault office', time: '23:25',
        art: { kind: 'office', mood: 'cold' },
        requires: ['c23_note'],
        intro: 'A glass meeting room and six empty desks. The company has two founders and no staff. A buyout contract sits on the table with a pen still uncapped beside it.',
        actions: [
          { id: 'contract', label: 'Read the buyout contract', icon: 'ledger',
            desc: 'Alan was selling his share - without Rowan',
            text: [
              "The contract is dated for Monday. Alan was selling his entire share of Meridian Vault to a holding company for Â£2.4 million, and the deal required him to retain sole control of the recovery wallet until completion.",
              "On the final page, a handwritten clause has been struck through: Rowan Pike to remain technical director. In the margin, in Alan's hand: No.",
              "Rowan's signature is on the earlier page. He had already agreed to be removed."
            ],
            gives: ['c23_contract'],
            hint: 'Alan was about to sell Rowan\'s company out from under him.'
          },
          { id: 'server', label: 'Audit the recovery server', icon: 'terminal', puzzle: 'vault-log',
            desc: 'Who moved the wallet seed?',
            gives: ['c23_wallet'],
            hint: 'Read the access rows. One login comes from outside the office.'
          },
          { id: 'rowan', label: 'Question Rowan Pike', icon: 'user', suspect: 'rowan',
            desc: 'Business partner - found the body' }
        ]
      },
      {
        id: 'celia', name: "Celia's House", short: "Celia's house", time: '00:20',
        art: { kind: 'interior', mood: 'cold' },
        requires: ['c23_contract'],
        intro: 'A neat terrace house with a sleeping child upstairs. Celia Mercer, Alan\'s ex-wife, keeps her voice low and her hands wrapped around a mug.',
        actions: [
          { id: 'celiaTalk', label: 'Question Celia Mercer', icon: 'user', suspect: 'celia',
            desc: 'Ex-wife - sent him a furious email' },
          { id: 'photo', label: 'Look at the framed photograph', icon: 'photo',
            desc: 'Two founders, one cracked frame',
            text: [
              "A photograph of Alan and Rowan at the company launch, both much younger. The frame is cracked across Rowan's face.",
              "Celia says Alan broke it himself, years ago, after Rowan took credit for a system Alan built. They stayed partners because the company needed both names on the paperwork.",
              "On the back, in Alan's handwriting: The only key Rowan never had was the one in my head."
            ],
            gives: ['c23_grudge'],
            hint: 'The partnership was already broken before the money.'
          }
        ]
      },
      {
        id: 'bo', name: 'Bo\'s Flat', short: "Bo's flat", time: '01:10',
        art: { kind: 'interior', mood: 'neon' },
        requires: ['c23_wallet'],
        intro: 'A single room above a kebab shop. Bo is the company intern, twenty years old, still wearing the lanyard from work. They have not slept.',
        actions: [
          { id: 'boTalk', label: 'Question Bo Lin', icon: 'user', suspect: 'bo',
            desc: 'Intern - administered the recovery server' },
          { id: 'timeline', label: 'Check Bo\'s access log printout', icon: 'chart', puzzle: 'access-grid',
            desc: 'Three logins, one impossible badge',
            gives: ['c23_print'],
            hint: 'Match each login to the badge holder, the room and the time.'
          }
        ]
      }
    ],
    puzzles: {
      'drawer-pin': {
        type: 'keypad', title: "Alan's Drawer", subtitle: 'Four-digit lock', icon: 'keypad',
        deviceLabel: 'DESK DRAWER - A. MERCER', length: 4, code: '1024',
        prompt: 'The drawer has a four-digit lock. A printed poem is taped to the desk: lines 10, 24, 17 and 3 have been underlined. Read the number of words in each underlined line.',
        hintText: 'Line 10 has one word. Line 24 has zero? No - count every word, including the small ones.',
        success: 'The drawer opens on a handwritten poem and a USB stick labelled RECOVERY.',
        gives: ['c23_poem'], flags: ['drawerOpen'],
        short: 'The poem and recovery stick are out.',
        log: 'The drawer holds Alan\'s handwritten poem. The first letters of each stanza spell NIGHTINGALE.'
      },
      'mail-term': {
        type: 'terminal', title: 'Scheduled Mail Server', subtitle: 'Alan\'s private account', icon: 'terminal',
        user: 'amercer', host: 'meridian-mail', password: 'nightingale',
        passwords: ['nightingale', 'the nightingale', 'nightingale account'],
        intro: 'Alan\'s private mail server. Type help for commands.',
        banner: '1 SCHEDULED MESSAGE - DELIVERY 22:00 - RECIPIENT: INVESTIGATIONS',
        files: [
          { name: 'scheduled.eml', locked: true, hint: 'Encrypted with the account password.', secret: true, body: '<span class="g">FROM: A. MERCER</span><br><span class="g">TO: INVESTIGATIONS</span><br><span class="g">SEND: 22:00</span><br><br>If this arrives, I am dead.<br><br>Rowan has been asking for my seed phrase for three weeks. I refused. Tonight he came to the flat with a bottle of whiskey and a prescription that is not mine.<br><br>I have hidden the phrase in the poem. The wallet is empty by now, I expect. Check the recovery server. Check who logged in from outside.<br><br><span class="r">Do not let him call it grief.</span>' },
          { name: 'inbox.txt', body: '<span class="d">18:40 R. PIKE:</span> Coming over after eight. We need to finish the handover.<br><span class="d">19:02 A. MERCER:</span> There is no handover. Read the contract.<br><span class="d">19:58 A. MERCER:</span> I have written down what happens if I am wrong about you.' },
          { name: 'wallet.txt', body: '<span class="d">RECOVERY WALLET - BALANCE</span><br>22:40 - <b>0.00</b><br>20:40 - transfer out - <span class="g">all funds</span> - IP 84.22.109.7<br><span class="d">Last known IP for R. Pike\'s home connection.</span>' }
        ],
        hintText: 'The worn keys on the keyboard are N, I, G, H, T. The poem is Ode to a Nightingale. Try the bird.',
        success: 'The scheduled message opens. Alan names Rowan, the whiskey and the stolen seed phrase.',
        gives: ['c23_deadswitch', 'c23_wallet'], flags: ['mailOpen'],
        short: 'Alan\'s scheduled message names Rowan.',
        log: 'Alan scheduled a message for 22:00: Rowan came with whiskey and a prescription, demanded the seed phrase, and intended to make it look like suicide.'
      },
      'vault-log': {
        type: 'terminal', title: 'Recovery Server', subtitle: 'Wallet access audit', icon: 'terminal',
        user: 'bo', host: 'vault-recovery', password: 'recovery',
        passwords: ['recovery', 'the recovery', 'vault recovery'],
        intro: 'Meridian Vault recovery console. Type help for commands.',
        banner: 'WALLET AUDIT - 20:00 TO 21:00',
        files: [
          { name: 'audit.log', body: '20:05 R.PIKE login - office desk 3<br>20:12 R.PIKE seed request - DENIED<br>20:40 EXTERNAL login - 84.22.109.7 - seed accepted<br>20:41 WALLET DRAINED - 412 units<br>20:44 EXTERNAL logout<br><span class="d">Office badge: R. PIKE in 19:58, out 20:15.</span>' },
          { name: 'notes.txt', body: '<span class="d">Seed phrase is not stored digitally. A. MERCER.</span><br><span class="d">Physical copy held in study. Poem only.</span>' },
          { name: 'bo.txt', body: 'I gave Rowan the desk login because he is a director. I did not give him the seed. He shouted at me. Then he left.' }
        ],
        hintText: 'The external login at 20:40 uses Rowan\'s home IP. The office badge leaves at 20:15.',
        success: 'The audit is clear: Rowan logged in from the office, was refused the seed, left, then drained the wallet from his home connection at 20:40.',
        gives: ['c23_wallet'], flags: ['vaultAudit'],
        short: 'Rowan drained the wallet from home.',
        log: 'The recovery audit shows Rowan was refused the seed at 20:12, left the office at 20:15, and drained the wallet from his home IP at 20:40.'
      },
      'access-grid': {
        type: 'logicgrid', title: 'Access Grid', subtitle: 'Three logins, three badges', icon: 'id',
        prompt: 'Match each login to the badge holder, the room and the time. Only one combination fits every log.',
        rows: [
          { label: '20:05', selects: [
            { label: 'badge', options: [{ t: 'Rowan Pike', v: 'rowan' }, { t: 'Bo Lin', v: 'bo' }, { t: 'Celia Mercer', v: 'celia' }], answer: 'rowan' },
            { label: 'room', options: [{ t: 'Desk 3', v: 'desk' }, { t: 'Server room', v: 'server' }, { t: 'Study', v: 'study' }], answer: 'desk' }
          ] },
          { label: '20:40', selects: [
            { label: 'badge', options: [{ t: 'Rowan Pike', v: 'rowan' }, { t: 'Bo Lin', v: 'bo' }, { t: 'Celia Mercer', v: 'celia' }], answer: 'rowan' },
            { label: 'room', options: [{ t: 'Desk 3', v: 'desk' }, { t: 'Remote - home IP', v: 'remote' }, { t: 'Study', v: 'study' }], answer: 'remote' }
          ] },
          { label: '21:10', selects: [
            { label: 'badge', options: [{ t: 'Rowan Pike', v: 'rowan' }, { t: 'Bo Lin', v: 'bo' }, { t: 'Celia Mercer', v: 'celia' }], answer: 'bo' },
            { label: 'room', options: [{ t: 'Desk 3', v: 'desk' }, { t: 'Server room', v: 'server' }, { t: 'Study', v: 'study' }], answer: 'server' }
          ] }
        ],
        hintText: 'Bo was on the server at 21:10. Rowan was at desk 3 at 20:05, then remote at 20:40.',
        success: 'The grid locks: Rowan at the desk, Rowan remote, Bo on the server. Nobody else touched the wallet.',
        gives: ['c23_print'], flags: ['gridDone'],
        short: 'Rowan had the only outside access.',
        log: 'The access grid isolates Rowan as the only person who both requested the seed and logged in remotely at 20:40.'
      },
      'poem-cipher': {
        type: 'cipher', title: 'The Handwritten Poem', subtitle: 'First letters of each stanza', icon: 'cipher',
        prompt: 'The poem is an acrostic. Turn the cipher wheel until the stanza initials resolve into a word.',
        plain: 'ROWAN HOLDS THE KEY', shift: 2,
        answers: ['rowan holds the key', 'rowan holds key', 'rowan has the key', 'rowan has key'],
        hintText: 'The first letters are already R H T K. The shift is small.',
        success: 'The acrostic resolves: ROWAN HOLDS THE KEY. Alan hid the accusation in plain sight.',
        gives: ['c23_poem'], flags: ['poemRead'],
        short: 'The poem accuses Rowan.',
        log: 'The poem acrostic reads ROWAN HOLDS THE KEY.'
      }
    },
    clues: {
      'c23_scene': { name: 'Untouched whiskey', caption: 'Amber stain - no swallow - bitter residue', icon: 'glass', type: 'Forensic observation',
        desc: 'The whiskey was not swallowed. A bitter synthetic residue sits under the amber. The pills are a sleeping aid in Rowan\'s name.',
        tells: 'Alan was drugged, not self-medicated. The scene was arranged.' },
      'c23_note': { name: 'Printed suicide note', caption: 'Typed at 19:58 - before death', icon: 'note', type: 'Document',
        desc: 'The note is printed, not handwritten. It uses a phrase Alan mocked publicly. The printer log shows 19:58.',
        tells: 'Someone else wrote the note and printed it before Alan died.' },
      'c23_deadswitch': { name: 'Scheduled message', caption: 'Sent at 22:00 - names Rowan', icon: 'mail', type: 'Digital evidence',
        desc: 'Alan scheduled an email six minutes before the estimated time of death: Rowan came with whiskey and a prescription and demanded the seed phrase.',
        tells: 'Alan knew he was in danger and left a message that could survive him.' },
      'c23_wallet': { name: 'Drained wallet', caption: '20:40 - Rowan\'s home IP', icon: 'money', type: 'Financial record',
        desc: 'The recovery wallet was emptied at 20:40 from Rowan Pike\'s home connection, after he was refused the seed at the office.',
        tells: 'Rowan had the seed phrase. He stole the money before Alan was found.' },
      'c23_poem': { name: 'Acrostic poem', caption: 'ROWAN HOLDS THE KEY', icon: 'book', type: 'Document',
        desc: 'A handwritten poem whose stanza initials spell ROWAN HOLDS THE KEY. The drawer also held a recovery USB.',
        puzzle: 'poem-cipher',
        tells: 'Alan identified his killer in writing and hid it where only a reader would look.' },
      'c23_contract': { name: 'Buyout contract', caption: 'Alan selling - Rowan removed', icon: 'ledger', type: 'Financial record',
        desc: 'Alan was selling his share for Â£2.4 million. A clause removing Rowan as technical director is struck through in Alan\'s hand.',
        tells: 'Rowan was about to lose the company and the payout. That is a motive.' },
      'c23_print': { name: 'Whiskey glass print', caption: 'Rowan\'s thumb - outside surface', icon: 'fingerprint', type: 'Forensic evidence',
        desc: 'A clean thumb print on the outside of the whiskey glass matches Rowan Pike. Alan\'s prints are on the keyboard but not the glass.',
        tells: 'Rowan poured the drink. Alan never held it.' },
      'c23_grudge': { name: 'Cracked photograph', caption: 'The only key Rowan never had', icon: 'photo', type: 'Background',
        desc: 'A launch photograph cracked across Rowan\'s face. On the back, Alan wrote: The only key Rowan never had was the one in my head.',
        tells: 'The partnership was broken long before the money. Alan knew Rowan wanted the seed.' },
      'c23_exwife': { name: "Celia's angry email", caption: 'Threat about the divorce - not the will', icon: 'mail', type: 'Red herring',
        desc: 'Celia wrote: You will not take this house from me. She meant the divorce settlement, not his life.',
        tells: 'Celia was at her daughter\'s school concert until eleven. Her anger is real, her alibi is solid.' },
      'c23_prescription': { name: 'Prescription bottle', caption: 'Rowan Pike - filled two days ago', icon: 'pill', type: 'Physical evidence',
        desc: 'The sleeping pills are prescribed to Rowan Pike and were collected two days before the death.',
        tells: 'The drug in Alan\'s whiskey came into the flat with Rowan.' }
    },
    suspects: [
      {
        id: 'rowan', name: 'Rowan Pike', role: 'Business partner - found the body', location: 'vault', locationName: 'Vault office',
        tag: 'Primary suspect', portrait: { seed: 'rowan-pike', hair: 'wavy', hairColor: '#3a2a1e', skin: 1, expression: 'sad', collar: 'suit' },
        intro: 'Rowan is handsome in the way of someone who has been photographed for company profiles. He cries at the right moments. He calls Alan his brother and the note a tragedy.',
        questions: [
          { q: 'When did you arrive at the flat?', a: 'Ten o\'clock. I let myself in with my key when he did not answer. I found him at his desk. I called the police at once.' },
          { q: 'What were you doing between eight and ten?', a: 'At the office. Then home. I was not at the flat. Alan was alive when I left.', requires: ['c23_wallet'],
            follow: 'The recovery server says he was refused the seed at 20:12, then left the office at 20:15.' },
          { q: 'Where did the whiskey come from?', a: 'Alan always had whiskey. It was his. I did not pour it.', requires: ['c23_print'], gives: ['c23_print'],
            follow: 'His thumb print is on the outside of the glass. Alan did not hold it.' },
          { q: 'Who has access to the recovery wallet?', a: 'Alan and I. The seed phrase was his. I never had it.', requires: ['c23_deadswitch'], gives: ['c23_deadswitch'],
            follow: 'The wallet was drained from his home connection at 20:40. He had the seed by then.' },
          { q: 'Why was Alan selling the company?', a: 'A disagreement. Business. It was not personal.', requires: ['c23_contract'], gives: ['c23_contract'],
            follow: 'The struck clause would have removed Rowan entirely. It was personal.' }
        ],
        after: 'He asks whether the scheduled email can be kept out of the press. He does not ask what it says.'
      },
      {
        id: 'celia', name: 'Celia Mercer', role: 'Ex-wife - sent a furious email', location: 'celia', locationName: "Celia's house",
        tag: 'Red herring', portrait: { seed: 'celia-mercer', hair: 'long', hairColor: '#5a2a2a', skin: 2, expression: 'tired', collar: 'knit' },
        intro: 'Celia is composed and tired. She has spent two years separating her life from Alan\'s and does not pretend to be grieving.',
        questions: [
          { q: 'Did you threaten Alan?', a: 'I said he would not take the house. That is a divorce sentence, not a death threat. My daughter was singing in a school concert until eleven.', gives: ['c23_exwife'],
            follow: 'The school has a recording. Celia was on stage with the choir parents.' },
          { q: 'Did Alan have enemies?', a: 'One. Rowan. Alan said Rowan kept asking for a key. He laughed about it. He thought it made him clever.', requires: ['c23_exwife'],
            follow: 'Alan believed the key was in his head. He wrote it down anyway.' }
        ]
      },
      {
        id: 'bo', name: 'Bo Lin', role: 'Intern - administered the recovery server', location: 'bo', locationName: "Bo's flat",
        tag: 'Witness', portrait: { seed: 'bo-lin', hair: 'short', hairColor: '#0e0c0a', skin: 3, expression: 'anxious', collar: 'hoodie' },
        intro: 'Bo is twenty, exhausted, and terrified of being blamed for a server they only half understand. They have printed the access log twice and highlighted different lines.',
        questions: [
          { q: 'Who asked for the seed phrase?', a: 'Rowan. He shouted at me when I said no. He said he was a director and I was nobody.', gives: ['c23_wallet'],
            follow: 'The server log records the refusal at 20:12.' },
          { q: 'Why did you log in at 21:10?', a: 'I was checking the wallet. It was already empty. I did not move anything. I would not know how.', requires: ['c23_wallet'], gives: ['c23_print'],
            follow: 'The drain happened thirty minutes before Bo\'s login. Bo is not the thief.' },
          { q: 'Who else knows the seed phrase?', a: 'Only Alan. He said he wrote it down once, in a poem, because nobody reads poetry.', requires: ['c23_deadswitch'],
            follow: 'Rowan found the poem. Or forced Alan to translate it.' }
        ]
      }
    ],
    timeline: [
      { time: '18:40', text: 'Rowan messages Alan: coming over after eight.' },
      { time: '19:02', text: 'Alan replies: there is no handover.' },
      { time: '19:58', text: 'The suicide note is typed and printed.' },
      { time: '20:05', text: 'Rowan badges into the office. He asks the server for the seed and is refused.' },
      { time: '20:15', text: 'Rowan leaves the office.' },
      { time: '20:20', text: 'Rowan arrives at Alan\'s flat with whiskey.' },
      { time: '20:40', text: 'The wallet is drained from Rowan\'s home IP.' },
      { time: '21:54', text: 'Alan schedules an email for 22:00.' },
      { time: '22:06', text: 'Rowan calls the police and reports a suicide.' }
    ],
    links: [
      { a: 'c23_print', b: 'rowan', note: 'Rowan\'s print is on the glass Alan never held.' },
      { a: 'c23_wallet', b: 'rowan', note: 'The wallet was drained from Rowan\'s home connection.' },
      { a: 'c23_deadswitch', b: 'rowan', note: 'Alan\'s scheduled message names Rowan and the whiskey.' },
      { a: 'c23_contract', b: 'rowan', note: 'Rowan was being removed from the company Alan was selling.' }
    ],
    forensics: {
      prompt: 'Two samples from the study. Match each to its owner.',
      samples: [
        { id: 'glass', type: 'PRINT', label: 'Whiskey glass - outer surface', mark: 'right thumb, clean' },
        { id: 'bitter', type: 'RESIDUE', label: 'Whiskey residue', mark: 'synthetic sedative' }
      ],
      candidates: [
        { id: 'rowan', label: 'Rowan Pike' },
        { id: 'alan', label: 'Alan Mercer' },
        { id: 'celia', label: 'Celia Mercer' }
      ],
      answer: { glass: 'rowan', bitter: 'rowan' },
      success: 'The print is Rowan\'s. The residue is his prescription sedative. Alan never drank the whiskey.'
    },
    documents: [
      { id: 'note', title: 'The suicide note', sub: 'Printed, not handwritten', body: '<div class="doc-sheet"><b>I am sorry for everything.</b><br><br>I cannot go on pretending that any of this matters. The company was my life and now it is a cage. I have made arrangements. Do not look for a reason. There is only the work, and the work is finished.<br><br><span class="d">Alan</span><br><br><span class="d">Printed 19:58 - study printer</span></div>',
        question: 'What is wrong with the note?',
        options: [
          { t: 'It is printed and uses a phrase Alan publicly mocked', v: 'a' },
          { t: 'It is too short to be a real note', v: 'b' },
          { t: 'It names Rowan directly', v: 'c' }
        ],
        answer: 0, gives: ['c23_note'],
        log: 'The note was printed at 19:58, before Alan died, and uses a phrase he publicly mocked. He did not write it.',
        wrong: 'Alan handwrote everything. This is a printer font.' },
      { id: 'buyout', title: 'Buyout agreement', sub: 'Signed by both founders', body: '<div class="doc-sheet"><b>MERIDIAN VAULT LTD - SHARE PURCHASE</b><br>Seller: <b>A. Mercer</b> (51%)<br>Buyer: <b>Halcyon Holdings</b><br>Consideration: <b>Â£2,400,000</b><br><br>Clause 14: Seller retains sole custody of recovery wallet until completion.<br>Clause 15: <s>R. Pike to remain technical director.</s><br><br><span class="d">Margin note, A. Mercer: No.</span></div>',
        question: 'Why does the contract matter?',
        options: [
          { t: 'It gives Rowan a motive to stop the sale and take the wallet', v: 'a' },
          { t: 'It proves the company was bankrupt', v: 'b' },
          { t: 'It shows Alan intended to give Rowan the seed', v: 'c' }
        ],
        answer: 0, gives: ['c23_contract'],
        log: 'The buyout would remove Rowan and leave Alan sole custodian of the wallet. Rowan had both a financial and a personal motive.',
        wrong: 'Ask what Rowan loses when the sale completes.' }
    ],
    audioCalls: [
      { id: 'c23-999', title: 'Emergency call - Rowan Pike', sub: 'Reported at 22:06', cue: 'Under Rowan\'s voice: a lift chime and the office reception announcement, which stops running at 21:00. The call is not from the flat.', pattern: [420, 0, 420, 300], tone: 'sine',
        options: [
          { t: 'He called from Alan\'s flat', v: 'a' },
          { t: 'He called from the Meridian Vault office', v: 'b' },
          { t: 'He called from the street outside', v: 'c' }
        ],
        answer: 1, gives: ['c23_print'], flag: 'callHeard',
        log: 'Rowan\'s emergency call was made from the office, not the flat. The lift chime identifies the building.',
        wrong: 'Listen to the background. That is a lift, not a flat.' }
    ],
    mapTask: {
      q: 'Which route matches the badge, the server and the 22:06 call?',
      options: [
        { t: 'Home -> flat at 22:00 -> call from flat', v: 'home' },
        { t: 'Office 20:05 -> flat 20:20 -> office 22:00 -> call', v: 'loop' },
        { t: 'Office -> airport -> hotel', v: 'airport' }
      ],
      answer: 1, gives: ['c23_wallet'],
      log: 'Rowan went office to flat, then back to the office before calling. The loop puts him at the flat during the drain.',
      wrong: 'The call background is the office. He went back.' },
    redHerrings: [
      { clue: 'c23_exwife', label: 'Celia\'s furious email', clearedBy: ['c23_exwife', 'c23_contract'], note: 'Celia was at a school concert until eleven. Her threat was about the divorce house, not Alan\'s life.' }
    ],
    contradictions: [
      { suspect: 'rowan', statement: 1, evidence: ['c23_wallet', 'c23_deadswitch'],
        expose: 'The server records him at the office at 20:05 and refused the seed at 20:12. The wallet drains from his home IP at 20:40. His timeline is a fiction.',
        wrong: 'He claims he was not there. The server says otherwise.' },
      { suspect: 'rowan', statement: 3, evidence: ['c23_wallet'],
        expose: 'The wallet was drained from his home connection. He did not need Alan\'s permission; he had already taken the seed.',
        wrong: 'The external login is tied to his home IP, not Alan\'s.' },
      { suspect: 'rowan', statement: 4, evidence: ['c23_contract'],
        expose: 'The struck clause removes Rowan from the company. Alan was selling without him. That is not a business disagreement; it is a betrayal.',
        wrong: 'Read the margin in Alan\'s hand. The sale was removing him.' }
    ],
    solution: {
      minEvidence: 7,
      questions: [
        { kind: 'suspect', q: 'Who killed Alan Mercer?', options: [
          { t: 'Rowan Pike - business partner', v: 'rowan' },
          { t: 'Celia Mercer - ex-wife', v: 'celia' },
          { t: 'Bo Lin - the intern', v: 'bo' },
          { t: 'Alan Mercer - by his own hand', v: 'suicide' }
        ], answer: 'rowan' },
        { kind: 'method', q: 'How was the death staged?', options: [
          { t: 'Sedative in whiskey, then a printed note and an arranged scene', v: 'staged' },
          { t: 'A genuine overdose with a genuine note', v: 'overdose' },
          { t: 'Strangulation before the pills were placed', v: 'strangled' },
          { t: 'A fall in the study made to look like sleep', v: 'fall' }
        ], answer: 'staged' },
        { kind: 'motive', q: 'Why was Alan killed?', options: [
          { t: 'Rowan wanted the wallet seed and was being cut out of the company', v: 'wallet' },
          { t: 'Alan was going to expose an affair', v: 'affair' },
          { t: 'Celia wanted the house', v: 'house' },
          { t: 'Bo wanted Alan\'s job', v: 'job' }
        ], answer: 'wallet' },
        { kind: 'evidence', q: 'Which evidence breaks the suicide story?', options: [
          { t: 'The scheduled email and the 20:40 wallet drain', v: 'email' },
          { t: 'The cracked photograph', v: 'photo' },
          { t: 'Celia\'s email', v: 'celia' },
          { t: 'The empty pill bottle', v: 'pills' }
        ], answer: 'email' }
      ],
      verdict: {
        who: "Rowan Pike",
        whoDesc: ", Alan Mercer's business partner, was charged with his murder.",
        how: "He sedated Alan with whiskey, printed a note Alan would never write, and arranged the desk to sell a suicide. Then he used the seed phrase to empty the wallet.",
        why: "Alan was cutting him out of the company, and Rowan had already learned enough of the seed to take the money. The partnership was ending. The wallet was not.",
        key: "The scheduled email that arrived after death, and the 20:40 drain from Rowan's home connection."
      },
      reveal: [
        "Alan scheduled his last message six minutes before he died, addressed to the investigator rather than a friend. He knew what was coming and wanted it timed to outlive him.",
        "The note was typed. Alan handwrote everything, even shopping lists. The poem held the seed phrase, and Rowan had been reading it over his shoulder for months.",
        "Celia's email was fury about a house. The school concert put her across town until eleven. She wanted him poorer, not dead."
      ],
      quote: "A man who encrypts his life leaves instructions for the people who will read it.",
      twist: "The worn key on the keyboard was not the password. It was the first word of the poem."
    }
  });
})();
