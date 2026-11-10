/* ============================================================
   CASE 12 — THE PAPER MOON
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c12', num: 12,
    title: 'The Paper Moon',
    subtitle: 'A master printer is found dead against her own press, and the counterfeit plates in her safe are better than the real thing.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'shop', mood: 'mansion' },
    facts: [
      { k: 'Victim', v: 'Iris Penn, 38 — fine-art printer' },
      { k: 'Scene', v: 'Penn & Moon Fine Press, pressroom' },
      { k: 'Found', v: '21:15 — by the cleaning woman' },
      { k: 'Cause', v: 'Electrocution · safety cut-out bypassed' }
    ],
    briefing: [
      'Iris Penn could print a watermark you could feel with your eyes closed. She ran a two-room press in the old type foundry and took commissions from museums, wedding stationers, and — according to the financial crimes unit — some of the best counterfeiters in Europe.',
      'She was found at quarter past nine, lying against the flywheel of her 1850 Albion press. The power was still on. The safety cut-out had been bypassed with a length of copper wire. The medical examiner says she was dead before the cleaner opened the door.',
      'In the darkroom safe: eleven engraved plates for a Bank of England fifty-pound note. Not copies. <i>Masters.</i> The kind of plates that make a counterfeiter weep with gratitude.',
      'Her apprentice says she was teaching him the trade. Her sister says she was a criminal. A collector says she was selling him history. All three of them were in the building yesterday. One of them knew which wire to pull.'
    ],
    opening: 'The pressroom smells of ink, oil, and ozone. The great iron press stands in the middle of the floor like an animal that has been interrupted. On the stone bed, a single fifty-pound proof is curling at the edges.',
    objectives: [
      'Determine how the press was made lethal.',
      'Identify what the plates in the safe actually are.',
      'Separate Iris’s clients from her enemies.',
      'Find the person who understood the press well enough to kill with it.'
    ],
    locations: [
      {
        id: 'pressroom', name: 'The pressroom', short: 'Pressroom', time: '21:40',
        art: { kind: 'shop', mood: 'mansion' },
        intro: 'A high room with north light and a stone floor. The Albion press dominates it: iron, brass, and a flywheel taller than a man. Iris Penn is slumped at its base, one hand still curled around the roller handle.',
        actions: [
          { id: 'press', label: 'Examine the press and the body', icon: 'tool', hotspot: { x: 58, y: 56 },
            desc: 'The flywheel, the wiring, the burn',
            text: [
              'Iris is thirty-eight, small, with ink under her nails and a burn across the heel of her right hand. The burn is entry and exit in one: she was touching the metal roller when the current came through.',
              'The press is an 1850 Albion with an after-market electric drive. The safety cut-out — a small black box bolted to the frame — has been opened. A length of copper wire runs from the live terminal straight to the press chassis, bypassing the trip.',
              'The wire is not old. It is bright, stripped at both ends, and bent with a pair of pliers. On the floor beneath the press: a screwdriver with a yellow handle, and a smear of black ink on the stone.'
            ],
            gives: ['press-body', 'burn-mark', 'yellow-driver'],
            hint: 'The safety cut-out has been opened with a screwdriver. Look at the wire.'
          },
          { id: 'wiring', label: 'Trace the bypass circuit', icon: 'wire', puzzle: 'wiring',
            desc: 'Four connections, one deliberate mistake',
            requires: ['press-body'],
            hint: 'Match the labels on the terminal block. The bypass joins LIVE to CHASSIS — the rest should be earth, neutral, and the cut-out relay.'
          },
          { id: 'bench', label: 'Search the press bench', icon: 'search',
            desc: 'Ink knives, a proof note, a broken seal',
            requires: ['press-body'],
            text: [
              'The bench is crowded with the tools of a working printer: ink knives, a granite slab, tweezers, a magnifying glass, and a stack of cream paper with the Penn & Moon watermark.',
              'On top of the stack is a fresh fifty-pound proof. The serial number is <b>PM 04 417</b>. In the bottom right corner, almost invisible, there is a second mark: a small crescent moon printed in fluorescent ink.',
              'Beneath the bench, a broken wax seal with the crest of the City Police financial crimes unit. Someone has stepped on it.'
            ],
            gives: ['proof-note', 'police-seal'],
            hint: 'The proof note has two marks. One of them is not part of the currency design.'
          }
        ]
      },
      {
        id: 'darkroom', name: 'The darkroom', short: 'Darkroom', time: '22:10',
        art: { kind: 'lab' },
        requires: ['press-body'],
        intro: 'A red bulb, a sink of developer, and a smell that gets into your sinuses. The safe is set into the brick wall behind a hanging curtain. Eleven copper plates sit inside it like a set of teeth.',
        actions: [
          { id: 'tanks', label: 'Check the developing tanks', icon: 'flask',
            desc: 'Negatives, test strips, a diary page',
            text: [
              'The tanks hold three sheets of film and a strip of test prints. The film is a negative of a fifty-pound note, exposed in sections: portrait, thread, hologram, serial block.',
              'The test strip is more interesting. It shows the same note printed six times, each with a different serial number. Across the bottom, in Iris’s hand: <b>“PM series — for the unit only. Do not circulate.”</b>',
              'Taped to the inside of the tank lid is a page torn from a desk diary. It reads: <b>“T. — 8pm. Bring the plates back. No buyers. I mean it.”</b>'
            ],
            gives: ['plate-negatives', 'diary-page'],
            hint: 'The tanks hold more than film. Check the lid.'
          },
          { id: 'safe', label: 'Open the plate safe', icon: 'lock', puzzle: 'safe',
            desc: 'A four-digit combination lock',
            requires: ['plate-negatives'],
            hint: 'The safe code is stamped on the press itself: the Albion was made in 1850.'
          },
          { id: 'uv', label: 'Examine the proof under UV', icon: 'eye', puzzle: 'uv',
            desc: 'A second layer of ink, invisible in daylight',
            requires: ['plates'],
            hint: 'The proof has a crescent moon in fluorescent ink. Slide the UV lamp until the second mark comes up.'
          }
        ]
      },
      {
        id: 'office', name: 'Iris’s office', short: 'Office', time: '22:40',
        art: { kind: 'office' },
        requires: ['plate-negatives'],
        intro: 'A narrow room lined with drawers of type. A kettle, a cats’ blanket, and a desk that has been searched — not by the police, who came after you, but by someone in a hurry.',
        actions: [
          { id: 'desk', label: 'Search the desk', icon: 'ledger',
            desc: 'Order book, a police letter, a missing cheque',
            text: [
              'The order book lists commissions from museums, a wedding stationer, and a private collector called Marcus Vane. Every entry is neat. The last three are not: <b>“VANE — hold. THEO — hold. POLICE — hold.”</b>',
              'Under the blotter: a letter on City Police headed paper. <i>“Dear Ms Penn, further to our conversation, the unit would like to retain your services for the duration of Operation Paper Moon. The plates remain Crown property. Please do not discuss the commission with any third party.”</i>',
              'The cheque book is short by one cheque. The carbon reads: <b>£15,000 — cash — T. Marsh.</b>'
            ],
            gives: ['order-book', 'police-letter', 'cheque-carbon'],
            hint: 'The desk has been searched, but the blotter was missed.'
          },
          { id: 'diary', label: 'Read the desk diary', icon: 'book',
            desc: 'The last week, in ballpoint',
            text: [
              'Monday: <b>“Vane called again. Wants the moon set. Told him no.”</b>',
              'Tuesday: <b>“T. late. Ink on his cuffs. Said it was from the workshop. It was not.”</b>',
              'Wednesday: <b>“Call from the unit. They want the plates back Friday. T. must not know.”</b>',
              'Thursday: <b>“T. argued. Said I was wasting the best work of my life. He does not understand what the plates are for.”</b>',
              'Friday: <b>“T. 8pm. Bring the plates back. No buyers. I mean it.”</b>'
            ],
            gives: ['diary'],
            hint: 'The desk diary is the clearest account of the last week.'
          },
          { id: 'pc', label: 'Open Iris’s computer', icon: 'terminal', puzzle: 'iris-pc',
            desc: 'A password and two mail folders',
            requires: ['diary'],
            hint: 'Iris signs her proofs with a crescent moon. The Spanish word for moon is four letters.'
          }
        ]
      },
      {
        id: 'basement', name: 'Paper store', short: 'Basement', time: '23:05',
        art: { kind: 'basement' },
        requires: ['uv-note'],
        intro: 'A low cellar stacked with reams of rag paper, guillotines, and the smell of damp cardboard. A trimming machine sits under a bare bulb, its bed dusted with paper shavings.',
        actions: [
          { id: 'paper', label: 'Inspect the paper stock', icon: 'note',
            desc: 'Watermarked reams and a hidden bundle',
            text: [
              'The paper is high-quality rag, watermarked with the Penn & Moon crescent. Most of it is legitimate stock, ordered from a mill in Somerset.',
              'Behind the last ream is a bundle wrapped in brown paper. Inside: fifty sheets of bank-note paper, the real thing, with the correct linen content and watermark. The tax stamp on the wrapper is dated three weeks ago.',
              'A delivery note is tucked into the string. It is made out to <b>M. VANE</b>, not to Iris. The signature at the bottom is a looping scrawl: <b>T. Marsh</b>.'
            ],
            gives: ['paper-stock'],
            hint: 'The legitimate paper is not the interesting paper.'
          },
          { id: 'trimmer', label: 'Check the trimming machine', icon: 'tool',
            desc: 'Fresh shavings, a cut glove',
            requires: ['paper-stock'],
            text: [
              'The trimmer’s blade is new. The shavings in the tray are crisp and clean — cut within the last day. Mixed in with them: a sliver of copper wire and a fragment of yellow plastic.',
              'On the floor, half under the machine: a single nitrile glove, cut across the thumb. There is black ink on the fingers and a smear of copper grease on the palm.',
              'The machine’s safety guard has been removed and propped against the wall. It has been removed recently; the screw holes are still bright.'
            ],
            gives: ['trimmer-trace'],
            hint: 'The trimmer has been used since the last clean. Look in the tray.'
          },
          { id: 'lastnight', label: 'Reconstruct the last night', icon: 'clock', puzzle: 'lastnight',
            desc: 'Five moments from the diary and the pub',
            requires: ['diary', 'barman-statement'],
            hint: 'Start with the argument the barman overheard, then follow the diary.'
          }
        ]
      },
      {
        id: 'pub', name: 'The Crown & Press', short: 'The Crown', time: '23:40',
        art: { kind: 'interior', variant: 'living' },
        requires: ['police-letter'],
        intro: 'A pub across the road from the foundry, all dark wood and framed theatre posters. The landlord knows every printer in the district and is not sure he wants to.',
        actions: [
          { id: 'barman', label: 'Ask the landlord about Friday night', icon: 'user',
            desc: 'Who came in, who left, who was angry',
            text: [
              '“Iris came in about half six,” the landlord says. “Sat in the corner with her sister. They had a proper row. Delia kept saying ‘you’re throwing it away’ and Iris kept saying ‘you don’t understand what it is.’ Delia left in a state.”',
              '“Then the collector came in. Vane. Fancy coat. He was in and out in ten minutes. Iris wouldn’t even stand up for him.”',
              '“The boy came last. Theo. About eight. He looked — I don’t know — excited. Scared. He kept checking his phone. Iris paid the tab and they went back across the road together. That was the last time I saw her.”'
            ],
            gives: ['barman-statement', 'pub-timeline', 'theo-address'],
            hint: 'The landlord saw all three of them on Friday. Ask him for the order.'
          },
          { id: 'delia', label: 'Interview Delia Penn', icon: 'user', suspect: 'delia',
            desc: 'Iris’s older sister, furious and grieving',
            hint: 'Delia had a public argument with Iris hours before the death.'
          },
          { id: 'vane', label: 'Interview Marcus Vane', icon: 'user', suspect: 'vane',
            desc: 'Collector, buyer, and the last client',
            hint: 'Vane wanted something Iris would not sell him.'
          }
        ]
      },
      {
        id: 'flat', name: 'Theo’s flat', short: 'Theo’s', time: '01:10',
        art: { kind: 'attic' },
        requires: ['theo-address'],
        intro: 'A studio flat above a kebab shop, full of expensive printing equipment and cheap furniture. The kitchen table is covered in bank-note proofs, cut neatly into bricks and banded with rubber bands.',
        actions: [
          { id: 'search', label: 'Search the flat', icon: 'search', hotspot: { x: 38, y: 58 },
            desc: 'Bricks of proofs, a bank slip, a tool roll',
            text: [
              'The proofs are good. Not perfect — the serial blocks are slightly out of register — but good enough to pass in a dim pub. There are two hundred of them, in fifty-pound denominations. Ten thousand pounds in fake money, sitting next to a kettle.',
              'In the bedroom: an unopened letter from a college of printing, offering Theo a place on a two-year course. The deposit has been paid. The receipt is dated three days ago.',
              'On the windowsill: a tool roll, open. A screwdriver with a yellow handle is missing from the set. Beside it, a bank paying-in slip for £15,000, paid into Theo’s account on Friday afternoon.'
            ],
            gives: ['theo-transfer', 'college-letter', 'tool-roll'],
            hint: 'The tool roll is missing the screwdriver from the pressroom floor.'
          },
          { id: 'theo', label: 'Confront Theo Marsh', icon: 'user', suspect: 'theo',
            desc: 'The apprentice, twenty-two, waiting for something',
            requires: ['theo-messages'],
            hint: 'Theo’s own messages put him at the press at eight. Ask him why.'
          }
        ]
      }
    ],
    puzzles: {
      wiring: {
        type: 'repair', title: 'The Bypass Circuit', subtitle: 'Four connections, one murder', icon: 'wire',
        prompt: 'The safety cut-out has been opened. Someone has rewired the press so the chassis goes live when the drive starts. Rebuild the circuit and see exactly what they did.',
        note: 'Match the terminal block on the left to the correct lead on the right. The bypass is the connection that should not exist.',
        pairs: [
          { l: 'LIVE', r: 'BROWN LEAD', color: '#f43f5e' },
          { l: 'NEUTRAL', r: 'BLUE LEAD', color: '#67e8f9' },
          { l: 'EARTH', r: 'FRAME BOND', color: '#fbbf24' },
          { l: 'CUT-OUT', r: 'SAFETY RELAY', color: '#a855f7' }
        ],
        hintText: 'Colour is the tell: live is brown, neutral is blue, earth is yellow-green. The cut-out should feed the safety relay — not the chassis.',
        success: 'The circuit resolves on the bench. The bypass runs from LIVE straight to the cast-iron frame. When the drive starts, the whole press becomes a live conductor. It was not an accident. It was a trap.',
        successTitle: 'The press was wired to kill.',
        gives: ['rewired-press'], flags: ['pressWired'],
        short: 'The safety cut-out was deliberately bypassed.',
        log: 'The press was rewired by hand: LIVE to chassis, safety relay disconnected. Anyone touching the roller would take the full current.'
      },
      safe: {
        type: 'keypad', title: 'The Plate Safe', subtitle: 'Four-digit combination', icon: 'lockbox',
        deviceLabel: 'PENN & MOON — PLATE SAFE', length: 4, code: '1850',
        prompt: 'A brick-lined safe behind a curtain. The combination dial has been replaced with a keypad. <span style="color:var(--dim)">Iris chose numbers that belonged to the press.</span>',
        hintText: 'The maker’s plate on the Albion press reads “No. 7 — 1850”. Four digits.',
        successTitle: 'The safe opens.',
        success: 'Eleven copper plates, each wrapped in acid-free tissue. A bank-note plate is not a forgery until it is used. These are the masters.',
        gives: ['plates', 'plate-ledger'], flags: ['platesFound'],
        short: 'Eleven bank-note plates recovered.',
        log: 'The safe holds eleven engraved plates for a Bank of England fifty-pound note, plus a ledger recording every proof pulled from them.'
      },
      uv: {
        type: 'photo', title: 'Under the UV Lamp', subtitle: 'A second layer of ink', icon: 'eye',
        scene: { kind: 'office' },
        target: { x: 54, y: 47, w: 18, h: 22 }, range: [52, 72],
        question: 'What does the fluorescent mark on the proof show?',
        options: [
          { t: 'A crescent moon and the initials T.M.', v: 'moon' },
          { t: 'The Bank of England crest', v: 'crest' },
          { t: 'A row of serial numbers', v: 'serial' },
          { t: 'Nothing — the ink is a printing defect', v: 'nothing' }
        ],
        answer: 'moon',
        reveal: 'A crescent moon glows green under the lamp, and beside it, tiny but unmistakable: T.M. The mark is not part of the note. It is a signature.',
        wrong: 'The lamp is not quite in the band. Slide it into the clear range and look for the shape in the lower corner.',
        hintText: 'The clear band is 52% to 72%. The mark is small and curved, in the lower right of the note.',
        success: 'The UV mark reads: crescent moon, then <b>T.M.</b> — Theo Marsh’s initials, printed into the proof with fluorescent ink from the workshop cabinet.',
        successTitle: 'The moon has initials.',
        gives: ['uv-note'], flags: ['uvChecked'],
        short: 'Theo’s initials are in the proof.',
        log: 'Under UV, the proof carries a crescent moon and the initials T.M. — a deliberate signature in fluorescent ink.'
      },
      'iris-pc': {
        type: 'terminal', title: 'Iris’s Computer', subtitle: 'Penn & Moon office account', icon: 'terminal',
        user: 'iris', host: 'penn-moon', password: 'luna',
        intro: 'Connection established. The desktop wallpaper is a photograph of a press bed covered in type. Type "help" for commands.',
        banner: 'PENN & MOON — JOB ARCHIVE. 3 FILES. 1 SEALED FOLDER.',
        files: [
          { name: 'commissions.txt', body: 'MUSEUM — letterpress programme (paid)<br>WEDDING — 200 invitations (paid)<br>VANE, M. — “moon set” (REFUSED)<br>UNIT — Paper Moon (Crown property, unpaid)<br><span class="d">Note: do not invoice the unit. Do not discuss with T.</span>' },
          { name: 'proofs', body: '<span class="d">Proof register.</span><br>PM 04 417 — press proof, 1 sheet<br>PM 04 418 — press proof, 1 sheet<br>PM 04 419 — <span class="r">MISSING</span><br><span class="d">Three proofs pulled Friday. One has left the building.</span>' },
          { name: 'paper_moon.enc', locked: true, secret: true, hint: 'Sealed police commission. Unit password required.', body: '<span class="y">OPERATION PAPER MOON — CITY POLICE</span><br><br>Consultant: Iris Penn.<br>Task: produce master plates for training and detection exercises.<br>Plates remain Crown property. No proofs to be circulated.<br><br><span class="g">MESSAGE FROM DS HALE, 16:20 FRIDAY:</span><br>“Iris — we need the plates back tomorrow. The cartel has heard a set exists. If they come looking, do not try to be brave. Call us.”<br><br><span class="r">Read receipt: T. MARSH, 19:58.</span>' }
        ],
        hintText: 'Iris marks her proofs with a crescent moon. Try the Spanish word for moon: LUNA.',
        success: 'The sealed folder opens. Operation Paper Moon was a police commission: Iris was making master plates as a consultant, and the plates were Crown property. The read receipt is timestamped 19:58 — Theo Marsh.',
        successTitle: 'The plates were police property.',
        gives: ['vane-emails', 'theo-messages'], flags: ['pcOpen'],
        short: 'Iris was working for the police.',
        log: 'Iris’s computer confirms the plates were a police training commission. Theo opened the sealed folder at 19:58 on Friday.'
      },
      lastnight: {
        type: 'sequence', title: 'Friday Night, In Order', subtitle: 'Five witnesses, one timeline', icon: 'clock', variant: 'strips',
        prompt: 'The diary, the landlord and the clock do not agree with the story you have been told. Put Friday night in order.',
        items: [
          { t: 'Delia argues with Iris', sub: '18:30 — The Crown & Press', order: 1 },
          { t: 'Marcus Vane is refused', sub: '19:10 — ten minutes, no sale', order: 2 },
          { t: 'Theo arrives at the pub', sub: '20:00 — “excited, scared”', order: 3 },
          { t: 'Iris and Theo cross to the foundry', sub: '20:20 — last seen alive', order: 4 },
          { t: 'The press is started', sub: '20:41 — drive log', order: 5 },
          { t: 'The body is found', sub: '21:15 — cleaning woman', order: 6 }
        ],
        wrong: 'That order puts Iris in the pub after she was already at the press. Start with the argument the landlord overheard.',
        hintText: 'Delia first, then Vane, then Theo. The drive log gives the press time. The cleaner found her last.',
        success: 'The night resolves: Delia left angry, Vane left empty-handed, and Theo walked Iris back to the foundry at 20:20. The press drive logged a start at 20:41. She was dead by 21:00.',
        successTitle: 'Theo was the last person with her.',
        gives: ['timeline'], flags: ['timelineBuilt'],
        short: 'Theo was alone with Iris when the press started.',
        log: 'Timeline: Delia 18:30, Vane 19:10, Theo 20:00. Theo and Iris crossed to the foundry at 20:20; the press started at 20:41.'
      }
    },
    suspects: [
      {
        id: 'delia', name: 'Delia Penn', role: 'Iris’s sister · runs the paper shop', location: 'pub', locationName: 'The Crown & Press', tag: 'Suspect',
        portrait: { seed: 'delia-penn', hair: 'bob', hairColor: '#5b3a22', skin: 2, expression: 'angry', collar: 'coat', age: 'adult' },
        intro: 'Forty-five, sharp-faced, still in her shop apron. She has been crying and is furious about it. “She was my little sister. I am allowed to be angry at her.”',
        questions: [
          { q: 'What were you arguing about on Friday?', requires: ['barman-statement'],
            a: '“The plates.” She says it like a swear word. “She showed me one. A fifty. Perfect. I said, Iris, they will put you in prison. She laughed at me. She said I did not understand what the plates were for.” She wipes her eyes. “I thought she was being clever. I thought she was selling them.”',
            gives: ['delia-argument'] },
          { q: 'Did you know she was working for the police?', requires: ['police-letter'], present: true,
            a: 'She stares at the letter for a long time. “No.” Her voice cracks. “She never told me. She let me think —” She stops. “That is exactly what she would do. She would rather be thought a criminal than explain herself.”',
            gives: ['delia-cleared'], flags: ['deliaCleared'] },
          { q: 'Where were you between eight and nine?', requires: ['timeline'],
            a: '“At the shop. Closing up. The till roll will show it, and my neighbour was in the back room with me until half nine.” She looks at you. “I did not kill my sister. I said terrible things to her, and then I went home, and now she is dead. That is the whole of it.”',
            gives: ['delia-alibi'] },
          { q: 'Who is Theo Marsh to your sister?', requires: ['diary'],
            a: '“Her apprentice. A sweet boy, she said. He had a good eye.” She stops. “She was paying for his college course. Did you know that? She was trying to get him out of the trade. Out of the counterfeit trade, I mean. The one she was already in.”' }
        ],
        after: 'She asks to see the body. You tell her it is not possible. She nods, as if she expected that.'
      },
      {
        id: 'vane', name: 'Marcus Vane', role: 'Print collector · Iris’s last client', location: 'pub', locationName: 'The Crown & Press', tag: 'Suspect',
        portrait: { seed: 'vane-collector', hair: 'wavy', hairColor: '#8d8d99', skin: 0, expression: 'smug', collar: 'suit', glasses: 'square', beard: 'goatee' },
        intro: 'Sixty, silver, wearing a coat with a velvet collar. He collects “fine printing” the way other men collect alibis. He does not shake your hand.',
        questions: [
          { q: 'What did you want from Iris Penn?', requires: ['order-book'],
            a: '“A set of proofs. Nothing more.” He examines his cuff. “I am a collector. Iris was the finest printer of her generation. Her moon series is legendary among people who know. I wanted one complete set for my collection.”',
            gives: ['vane-story'] },
          { q: 'You supplied her with bank-note paper.', requires: ['paper-stock'], present: true,
            a: 'He does not blink. “I supply paper to many printers. It is a legitimate trade.” A pause. “If Iris chose to use it for something other than wedding invitations, that is a matter for her estate.”',
            gives: ['vane-paper'], flags: ['vaneHostile'] },
          { q: 'Where were you at eight o’clock?', requires: ['timeline'],
            a: '“In my car, driving home. I left the pub at ten past seven and did not go back.” He smiles. “I know how this looks. The collector, the plates, the dead woman. But I am a buyer, detective. Buyers do not destroy the thing they want.”',
            gives: ['vane-alibi'] },
          { q: 'Who else wanted the plates?', requires: ['theo-messages'],
            a: '“The boy.” He says it without hesitation. “Theo Marsh. He came to me three weeks ago and offered me a set. I told him I dealt with Iris, not with apprentices. He was very insistent. He said he knew where the plates were kept.”' ,
            gives: ['vane-suspicion'] }
        ],
        after: 'He gives you a business card printed on paper that is almost certainly illegal. “Do call if you find the moon set.”'
      },
      {
        id: 'theo', name: 'Theo Marsh', role: 'Apprentice · twenty-two', location: 'flat', locationName: 'Theo’s flat', tag: 'Prime suspect',
        portrait: { seed: 'theo-marsh', hair: 'curly', hairColor: '#2b1a12', skin: 3, expression: 'shock', collar: 'hoodie', age: 'adult' },
        intro: 'Twenty-two, with ink on his fingers and a tremor he cannot hide. He opens the door in a hoodie and bare feet, looks at the badge, and says, “She fell against the press. I told the police. She fell.”',
        questions: [
          { q: 'You were the last person with her. What happened?', requires: ['timeline'],
            a: '“We argued. About the plates. She wanted to give them back to the police. I said —” He stops. “I said she was throwing away the best work of her life. She told me to leave. I left. I went to the pub. You can ask the landlord.”',
            gives: ['theo-story'], flags: ['theoHostile'] },
          { q: 'The safety cut-out was bypassed with copper wire and a yellow-handled screwdriver.', requires: ['rewired-press'], present: true,
            a: '“That is not mine.” Too fast. “I mean — I have tools. Everyone has tools. The yellow one is a cheap brand. You can buy it anywhere.” He looks at the floor. “She was always careful with the press. She would never have left it wired like that.”',
            gives: ['theo-denial'] },
          { q: 'Your initials are printed on the proof in fluorescent ink.', requires: ['uv-note'], present: true,
            a: 'He goes white. “The moon mark is hers. She puts it on everything.” A pause. “The initials are mine. I printed a proof. One proof. She said I could. That does not mean I killed her.”',
            gives: ['theo-proof'], flags: ['theoBroke'] },
          { q: 'You paid £15,000 into your account on Friday afternoon. Where did it come from?', requires: ['theo-transfer'], present: true,
            a: '“A buyer.” He is crying now, quietly. “I sold him a proof. Just one. I thought — the plates were worth more than her pride. She was going to give them to the police for nothing. I thought if I sold one, she would see what they were worth.” He wipes his face. “I did not touch the wiring. I swear. I did not.”',
            gives: ['theo-sale'], flags: ['theoBroke'] },
          { q: 'Why did Iris pay for your college course?', requires: ['college-letter'],
            a: 'He looks at the letter as if it is a stranger’s. “She said I had a good eye. She said there was a life for me outside the trade.” His voice drops. “I did not understand why she would do that. Not until now.”' ,
            gives: ['theo-motive'], flags: ['theoGrief'] }
        ],
        after: 'He sits on the floor among the fake money and asks whether Iris suffered. You do not answer.'
      }
    ],
    clues: {
      'press-body': {
        name: 'Iris Penn — post-mortem note', caption: 'Pressroom · electrocution', icon: 'blood', type: 'Forensic report',
        desc: 'A burn across the right palm and a second at the heel of the hand. Cardiac arrest consistent with a high-current shock through the metal roller.',
        tells: 'She was touching the press when the power came through. This was not a fall.'
      },
      'burn-mark': {
        name: 'Burn pattern on the roller', caption: 'Entry and exit in one contact', icon: 'fiber', type: 'Trace evidence',
        desc: 'A crisp electrical burn on the steel roller, matching the burn on Iris’s hand. The current came through the frame.',
        tells: 'The press chassis was live. The wiring made it lethal.'
      },
      'yellow-driver': {
        name: 'Yellow-handled screwdriver', caption: 'Under the press · black ink', icon: 'tool', type: 'Physical evidence',
        desc: 'A cheap screwdriver with a yellow plastic handle, found under the press. The tip is scarred from opening the safety cut-out.',
        tells: 'The bypass was installed by hand, minutes before Iris touched the roller.'
      },
      'rewired-press': {
        name: 'Bypassed safety circuit', caption: 'LIVE → CHASSIS', icon: 'wire', type: 'Forensic analysis',
        desc: 'The cut-out relay was disconnected and a copper wire run from the live terminal to the cast-iron frame. The drive would electrify the whole press.',
        tells: 'Someone who understood the press rewired it to kill. This was deliberate.'
      },
      'proof-note': {
        name: 'Fifty-pound proof', caption: 'Serial PM 04 417 · crescent mark', icon: 'money', type: 'Physical evidence',
        desc: 'A fresh proof pulled from the plates. The serial number is hand-set. A tiny crescent moon is printed in the lower corner.',
        tells: 'The plates were being used. The crescent is Iris’s mark — or someone copying it.'
      },
      'police-seal': {
        name: 'Broken police seal', caption: 'Financial crimes unit · stepped on', icon: 'badge', type: 'Official item',
        desc: 'A broken wax seal from the City Police financial crimes unit, found beneath the press bench. Someone stood on it in a hurry.',
        tells: 'The police had a formal relationship with Iris. This was not a simple forgery case.'
      },
      'plate-negatives': {
        name: 'Bank-note negatives', caption: 'Portrait, thread, hologram, serial', icon: 'photo', type: 'Photographic evidence',
        desc: 'Film negatives of a fifty-pound note, exposed in sections. The detail is extraordinary. A test strip shows six different serials.',
        tells: 'Iris was not copying a note. She was building a set of masters.'
      },
      'diary-page': {
        name: 'Diary page in the tank lid', caption: '“T. — 8pm. No buyers.”', icon: 'note', type: 'Handwritten note',
        desc: 'A page torn from the desk diary, taped inside the developing tank. It names Theo and sets an eight o’clock meeting.',
        tells: 'Iris expected Theo to return the plates. She did not trust him with them.'
      },
      'plates': {
        name: 'Eleven copper plates', caption: 'Bank of England fifty · masters', icon: 'tool', type: 'Physical evidence',
        desc: 'Eleven engraved copper plates for a fifty-pound note, wrapped in acid-free tissue. The quality is museum-grade.',
        tells: 'These are the source. Every proof in the city came from this safe.'
      },
      'plate-ledger': {
        name: 'Plate proof ledger', caption: 'Three proofs pulled Friday', icon: 'ledger', type: 'Record',
        desc: 'Iris’s register of every proof pulled from the plates. Three were printed on Friday. One is unaccounted for.',
        tells: 'Someone pulled an extra proof on Friday and took it out of the building.'
      },
      'uv-note': {
        name: 'UV signature', caption: 'Crescent moon + T.M.', icon: 'photo', type: 'Forensic analysis',
        desc: 'Under ultraviolet light, the proof carries a crescent moon and the initials T.M. in fluorescent ink.',
        tells: 'Theo printed this proof himself. His signature is on the evidence.'
      },
      'order-book': {
        name: 'Penn & Moon order book', caption: 'Vane, Theo, Police — all on hold', icon: 'ledger', type: 'Business record',
        desc: 'Commissions from museums, a wedding stationer, Marcus Vane and the police. The last three entries are marked “hold”.',
        tells: 'Iris had stopped taking work from Vane and Theo. The police commission was the only job that mattered.'
      },
      'police-letter': {
        name: 'Operation Paper Moon letter', caption: 'Financial crimes unit · Crown property', icon: 'letter', type: 'Official record',
        desc: 'A letter from the City Police retaining Iris as a consultant. The plates remain Crown property and must not be discussed.',
        tells: 'Iris was working for the police, not against them. The “counterfeiting” was a training commission.'
      },
      'cheque-carbon': {
        name: 'Missing cheque carbon', caption: '£15,000 cash — T. Marsh', icon: 'money', type: 'Financial record',
        desc: 'The carbon copy of a cheque paid out in cash to Theo Marsh on Friday. The cheque itself is gone.',
        tells: 'Theo received a large cash payment the same day Iris died.'
      },
      'diary': {
        name: 'Iris’s desk diary', caption: 'The last week · “T. must not know”', icon: 'book', type: 'Personal record',
        desc: 'A week of entries tracking Vane’s demands, Theo’s lateness, and the police request for the plates. The last entry sets the eight o’clock meeting.',
        tells: 'Iris was afraid of what Theo would do if he found out the plates were going back.'
      },
      'paper-stock': {
        name: 'Bank-note paper bundle', caption: 'Delivered to M. Vane · signed T. Marsh', icon: 'note', type: 'Physical evidence',
        desc: 'Fifty sheets of genuine bank-note paper hidden behind the legitimate stock. The delivery note names Marcus Vane but is signed by Theo Marsh.',
        tells: 'Theo was moving counterfeit supplies through Iris’s business, using Vane’s name.'
      },
      'trimmer-trace': {
        name: 'Trimmer shavings', caption: 'Copper wire · yellow plastic · cut glove', icon: 'fiber', type: 'Trace evidence',
        desc: 'Fresh shavings in the trimmer tray contain copper wire and yellow plastic. A cut nitrile glove lies beneath the machine.',
        tells: 'The bypass wire was cut to length in this basement. The killer cleaned up here but missed the tray.'
      },
      'barman-statement': {
        name: 'Landlord’s statement', caption: 'Delia 18:30 · Vane 19:10 · Theo 20:00', icon: 'note', type: 'Witness statement',
        desc: 'The landlord watched all three visitors come and go. Theo was the last, and he left with Iris.',
        tells: 'Theo was the last person seen with Iris before the press started.'
      },
      'pub-timeline': {
        name: 'Pub timeline', caption: 'Three visitors, one order', icon: 'clock', type: 'Analysis',
        desc: 'Delia argued, Vane was refused, Theo arrived excited and left with Iris at twenty past eight.',
        tells: 'Only one person walked back to the foundry with her.'
      },
      'theo-address': {
        name: 'Theo Marsh’s address', caption: 'Flat above the kebab shop', icon: 'map', type: 'Lead',
        desc: 'The landlord keeps a staff list behind the bar. Theo Marsh lives in the studio flat above the kebab shop on Wells Street.',
        tells: 'A place to search, and a place where the money and the tools are likely to be.'
      },
      'theo-transfer': {
        name: '£15,000 bank deposit', caption: 'Paid in Friday afternoon', icon: 'money', type: 'Financial record',
        desc: 'A paying-in slip for £15,000 cash, deposited into Theo Marsh’s account on Friday afternoon.',
        tells: 'Theo had sold something valuable hours before Iris died.'
      },
      'college-letter': {
        name: 'Printing college offer', caption: 'Deposit paid · three days ago', icon: 'letter', type: 'Personal item',
        desc: 'An offer of a place on a two-year printing course, with the deposit paid. Iris paid it.',
        tells: 'Iris was trying to get Theo out of the counterfeit trade. He was destroying his way out instead.'
      },
      'tool-roll': {
        name: 'Theo’s tool roll', caption: 'Yellow screwdriver missing', icon: 'tool', type: 'Physical evidence',
        desc: 'A complete tool roll on Theo’s windowsill, with one empty slot where a yellow-handled screwdriver should be.',
        tells: 'The screwdriver under the press came from this flat.'
      },
      'theo-messages': {
        name: 'Theo’s read receipt', caption: '19:58 · Operation Paper Moon folder', icon: 'laptop', type: 'Digital evidence',
        desc: 'The police commission folder on Iris’s computer was opened at 19:58 on Friday. The account was logged in as Iris, but the receipt records T. Marsh.',
        tells: 'Theo knew the plates were police property before he walked Iris back to the foundry.'
      },
      'vane-emails': {
        name: 'Vane’s commission file', caption: '“Moon set” · refused', icon: 'letter', type: 'Digital evidence',
        desc: 'A series of increasingly irritated emails from Marcus Vane asking for a complete set of moon proofs. Iris refused each one.',
        tells: 'Vane wanted the plates, but Iris would not sell. He had no access to the press.'
      },
      'timeline': {
        name: 'Friday night timeline', caption: '18:30 → 21:15', icon: 'clock', type: 'Analysis',
        desc: 'Delia argued, Vane was refused, Theo arrived, Theo and Iris crossed to the foundry, the press started at 20:41, the body was found at 21:15.',
        tells: 'Theo had twenty-one minutes alone with Iris and the press before it started.'
      },
      'delia-argument': {
        name: 'Delia’s argument', caption: '“I thought she was selling them.”', icon: 'audio', type: 'Interview',
        desc: 'Delia confronted Iris about the plates, believing she was a criminal. Iris refused to explain.',
        tells: 'Delia had a motive to be angry, but not to kill. She wanted Iris to stop, not to die.'
      },
      'delia-cleared': {
        name: 'Delia’s reaction to the letter', caption: 'She did not know', icon: 'note', type: 'Interview',
        desc: 'Delia had no idea Iris was working for the police. Her anger turns to grief when she reads the letter.',
        tells: 'Delia was not protecting a secret. She was excluded from one.'
      },
      'delia-alibi': {
        name: 'Delia’s alibi', caption: 'Shop till · neighbour until 21:30', icon: 'receipt', type: 'Alibi',
        desc: 'Delia was closing the paper shop with a neighbour until half past nine. The till roll supports her.',
        tells: 'Delia was across the road, not in the pressroom.'
      },
      'vane-story': {
        name: 'Vane’s collection story', caption: '“One complete set.”', icon: 'audio', type: 'Statement',
        desc: 'Vane claims he wanted a legitimate set of proofs for his collection. He admits offering Iris large sums.',
        tells: 'Vane had a motive to acquire the plates, but no reason to destroy them.'
      },
      'vane-paper': {
        name: 'Vane on the paper', caption: '“I supply many printers.”', icon: 'note', type: 'Statement',
        desc: 'Confronted with the bank-note paper delivery, Vane admits supplying paper but denies knowledge of its use.',
        tells: 'Vane was involved in the supply chain, but the delivery was signed by Theo.'
      },
      'vane-alibi': {
        name: 'Vane’s alibi', caption: 'Left the pub at 19:10', icon: 'receipt', type: 'Alibi',
        desc: 'Vane left the pub before eight and drove home. His car’s parking record places him on the other side of the city at 20:45.',
        tells: 'Vane was not at the foundry when the press started.'
      },
      'vane-suspicion': {
        name: 'Vane on Theo', caption: '“He said he knew where the plates were kept.”', icon: 'audio', type: 'Interview',
        desc: 'Vane says Theo approached him three weeks ago, offering a set of proofs and claiming access to the plates.',
        tells: 'Theo was trying to sell the plates behind Iris’s back.'
      },
      'theo-story': {
        name: 'Theo’s first account', caption: '“We argued. I left.”', icon: 'audio', type: 'Statement',
        desc: 'Theo claims he argued with Iris and left for the pub before eight. The landlord puts him back at the foundry at 20:20.',
        tells: 'His timeline is false from the first sentence.'
      },
      'theo-denial': {
        name: 'Theo on the wiring', caption: '“That is not mine.”', icon: 'audio', type: 'Statement',
        desc: 'Theo denies touching the press wiring, then admits the yellow screwdriver is a common brand. He knows too much about the cut-out.',
        tells: 'He recognised the bypass before it was described to him.'
      },
      'theo-proof': {
        name: 'Theo’s proof', caption: '“One proof. She said I could.”', icon: 'photo', type: 'Statement',
        desc: 'Theo admits printing a proof and putting his initials in fluorescent ink. He denies pulling the extra proof that left the building.',
        tells: 'He had the skill, the access, and the ink.'
      },
      'theo-sale': {
        name: 'Theo’s confession', caption: '“I sold him a proof.”', icon: 'audio', type: 'Statement',
        desc: 'Theo breaks: he sold a proof for £15,000, believing Iris was wasting the plates. He insists he did not touch the wiring.',
        tells: 'He had a motive and a buyer, and he was in the building when Iris died.'
      },
      'theo-motive': {
        name: 'Theo on the college course', caption: '“She said I had a good eye.”', icon: 'note', type: 'Interview',
        desc: 'Theo realises Iris was paying for his course to get him out of the trade. He begins to understand what he destroyed.',
        tells: 'Iris was protecting him. He killed the person trying to save him.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Iris Penn?',
          options: [
            { t: 'Delia Penn — the sister who argued with her', v: 'delia' },
            { t: 'Marcus Vane — the collector who wanted the plates', v: 'vane' },
            { t: 'Theo Marsh — the apprentice she was trying to save', v: 'theo' },
            { t: 'Iris Penn — a staged suicide disguised as an accident', v: 'iris' }
          ], answer: 'theo' },
        { q: 'How was the press made lethal?',
          options: [
            { t: 'The safety cut-out was bypassed, wiring the chassis live', v: 'bypass' },
            { t: 'The drive motor was overfilled with oil and caught fire', v: 'fire' },
            { t: 'The roller was coated with conductive ink', v: 'ink' },
            { t: 'The flywheel was loosened so it struck her', v: 'flywheel' }
          ], answer: 'bypass' },
        { q: 'What was the motive?',
          options: [
            { t: 'Iris was returning the counterfeit plates to the police, destroying Theo’s sale', v: 'plates' },
            { t: 'Iris had been stealing Theo’s designs and passing them off as her own', v: 'credit' },
            { t: 'Theo was in love with Delia and Iris stood in the way', v: 'love' },
            { t: 'Iris was going to sell the shop without paying Theo his share', v: 'money' }
          ], answer: 'plates' },
        { q: 'Which evidence breaks the case?',
          options: [
            { t: 'The UV initials on the proof and the rewired safety circuit', v: 'uv' },
            { t: 'Vane’s failed attempt to buy the moon set', v: 'vane' },
            { t: 'Delia’s public argument in the pub', v: 'delia' },
            { t: 'The missing cheque and the paper delivery note', v: 'cheque' }
          ], answer: 'uv' }
      ],
      verdict: {
        who: 'Theo Marsh, 22 — Iris Penn’s apprentice',
        whoDesc: 'was arrested at his flat and charged with murder. He confessed to the sale, the argument, and the wiring before dawn.',
        how: 'He bypassed the press’s safety cut-out with copper wire, then asked Iris to check the roller alignment. When she touched the frame, the live chassis killed her.',
        why: 'Iris was returning the plates to the police. Theo had already sold a proof to Marcus Vane for £15,000 and believed the plates were his future. He killed the one person trying to get him out of the trade.',
        key: 'The UV initials on the proof tied Theo to the plates; the rewired cut-out and the yellow screwdriver from his own tool roll tied him to the press.'
      },
      reveal: [
        'Operation Paper Moon was not a counterfeiting ring. It was a police training programme. Iris Penn was a consultant: she engraved master plates so that bank clerks and customs officers could learn to spot a perfect forgery. The plates were Crown property. The proofs were meant to be destroyed.',
        'Theo Marsh did not know that. He knew Iris was the best printer he had ever seen, that she kept eleven copper plates in a safe, and that collectors would pay anything for a set. He also knew she was about to give them back.',
        'On Friday afternoon he took a proof to Marcus Vane and sold it for fifteen thousand pounds. Vane did not ask where it came from. Vane never did. Theo paid the money into his account, then went to the pub to meet his teacher.',
        'Iris had already made up her mind. The diary entry is explicit: “T. — 8pm. Bring the plates back. No buyers. I mean it.” She was not going to expose him. She was going to take the plates away before he did something he could not undo.',
        'Theo walked her back to the foundry at twenty past eight. He had the screwdriver in his pocket and the copper wire in his sleeve. While Iris was checking the ink on the stone, he opened the cut-out box and ran a live wire to the frame. Then he asked her to check the roller.',
        'The press was an 1850 Albion with an electric drive. It had no residual current breaker. When Iris touched the roller, the current passed through her hand and out through her heel. She was dead before she hit the floor. Theo switched off the drive, wiped the switch, and went home.',
        'He almost got away with it. The wiring looked like an accident. The plates looked like a counterfeiting ring. Delia’s argument gave the police a suspect with a motive. Vane’s collection gave them a buyer. The only thing that did not fit was a crescent moon and two initials, printed in ink that only shows under ultraviolet light.',
        'Theo had signed his work. He always did. Iris taught him that.',
        'The letter from the printing college was still on his windowsill when the police arrived. The deposit had been paid by Iris three days earlier. She had been trying to buy him a way out of the only trade he had ever wanted to be good at.'
      ],
      quote: 'She said I had a good eye. She said there was a life for me outside the trade.',
      twist: 'The final detail was in the college letter. Iris had paid Theo’s deposit on Wednesday — two days before he killed her. She was not returning the plates to destroy his future. She was returning them so that he could have one.'
    }
  });
})();
