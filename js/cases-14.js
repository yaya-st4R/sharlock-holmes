/* ============================================================
   CASE 20 — THE SALT HOUSE
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c20', num: 20,
    title: 'The Salt House',
    subtitle: 'A chef is found frozen in his own walk-in, and the menu says he was dead before he got cold.',
    difficulty: 5, est: '40–50 min',
    cover: { kind: 'interior', mood: 'mansion' },
    facts: [
      { k: 'Victim', v: 'Marco Bellini, 44 — chef-owner, The Salt House' },
      { k: 'Scene', v: 'The Salt House kitchen and walk-in freezer' },
      { k: 'Found', v: '08:10 — by the sous chef' },
      { k: 'Cause', v: 'Ligature strangulation · freezer staging' }
    ],
    briefing: [
      'The Salt House has eleven tables, two Michelin stars, and a waiting list of six months. Marco Bellini built it from a harbour fish stall into the best restaurant on the coast. He was famous for salt-baking whole fish in a crust of thyme and egg white, and for shouting at people until they cried.',
      'At ten past eight his sous chef found him in the walk-in freezer, curled against the shelving with a sack of salt under his head. The door was propped open six inches. The thermostat read minus eighteen. The first officer wrote “accidental hypothermia” and went for breakfast.',
      'The pathologist found petechiae in both eyes and a fractured hyoid bone. Marco Bellini had been strangled. The freezer was not where he died. It was where somebody put him.',
      'Two days earlier, Marco had called his solicitor and asked for an emergency appointment. He said he wanted to change his will. He also said he had “found something in the cellar that changes everything”. He did not say what. He did not live to sign.'
    ],
    opening: 'The kitchen is silent and spotless, which is the first thing wrong with it. At eight in the morning there should be prep cooks, radio, steam. Instead there is the low hum of the walk-in and the smell of salt, thyme, and something cold and metallic under both.',
    objectives: [
      'Establish when and how Marco Bellini died.',
      'Work out why his body was put in the freezer.',
      'Find what he discovered in the cellar.',
      'Identify who needed him to die before the will was signed.'
    ],
    locations: [
      {
        id: 'freezer', name: 'Walk-in freezer', short: 'Freezer', time: '08:40',
        art: { kind: 'basement', mood: 'cold' },
        intro: 'A steel box at the back of the kitchen, eight feet by ten, furred with ice. Shelves of mise en place, vacuum bags, and a sack of Maldon salt. Marco’s body has been left in situ for the scene photographs. A plastic strip curtain hangs across the door, one strip torn.',
        actions: [
          { id: 'body', label: 'Examine Marco and the freezer', icon: 'blood', hotspot: { x: 53, y: 56 },
            desc: 'The body, the door, the temperature log',
            text: [
              'Marco Bellini is curled on his side against the bottom shelf, knees drawn up, hands tucked under his chin. There is a red-brown groove around his throat, deep and horizontal. His eyes are bloodshot to the whites.',
              'The freezer door is propped open with a folded menu. The thermostat and alarm have been switched off at the wall. The temperature log, a paper roll beside the door, shows a flat line at minus eighteen until 02:14, a brief rise to minus eleven, then a return to minus eighteen at 02:31.',
              'The pathologist’s note on the door reads: <b>“Ligature strangulation. Petechial haemorrhage. Hyoid fracture. No frostbite on the lips or fingertips. He was dead before refrigeration.”</b>'
            ],
            gives: ['body-note', 'freezer-log', 'apron-fiber'],
            hint: 'The log is a timeline. The note says he was dead before he was cold.'
          },
          { id: 'search', label: 'Search the freezer', icon: 'search', puzzle: 'freezer-search',
            desc: 'Six details in the cold',
            requires: ['body-note'],
            hint: 'Check the floor, the sack of salt, the door strip, the drain, the shelf, and the camera housing.'
          },
          { id: 'camera', label: 'Enhance the cellar camera', icon: 'cctv', puzzle: 'cellar-cam',
            desc: '02:14 — someone in the cellar',
            requires: ['camera-card'],
            hint: 'The card came from the freezer camera. Enhance the corridor until the figure resolves.'
          }
        ]
      },
      {
        id: 'kitchen', name: 'The kitchen', short: 'Kitchen', time: '09:20',
        art: { kind: 'interior', mood: 'mansion' },
        requires: ['body-note'],
        intro: 'A long stainless room with a pass at one end and a wall of copper pans. Everything is in its place. The reservation book sits open on the maître d’s stand. A staff rota is pinned above the clock-in machine. One of the copper pans is missing from its hook.',
        actions: [
          { id: 'reservations', label: 'Read the reservation book', icon: 'ledger',
            desc: 'Last night’s eleven tables and one late guest',
            requires: ['body-note'],
            text: [
              'The reservation book records eleven tables for Thursday. Nine are ticked off. Two are marked NO SHOW: table four (H. Lin, 20:00) and table eleven (N. Bellini, 21:30).',
              'In the margin beside table eleven someone has written <b>“ARGUMENT — CELLAR — 23:40”</b> in pencil, then rubbed it out. The paper is indented where the pencil pressed.',
              'A separate note, in Marco’s hand, is clipped inside the back cover: <b>“Solicitor — Friday 09:00 — new will — do not tell N.”</b>'
            ],
            gives: ['reservation-book', 'will-note'],
            hint: 'The margin note was rubbed out but not erased. Read the indentation.'
          },
          { id: 'rota', label: 'Check the staff rota and clock-in', icon: 'id',
            desc: 'Who was in the building at two in the morning',
            requires: ['body-note'],
            text: [
              'The rota shows the kitchen closed at 23:30. Marco stayed late for “stock take”. Lena Petrov clocked out at 23:52. Hugo Lin clocked out at 23:18. Nadia Bellini did not clock in at all — she is not staff — but the door log records her key at 23:31 and again at 02:06.',
              'The clock-in machine has a manual override button for the back door. It was used at 02:06 and again at 02:28. The override does not log a name.',
              'The missing copper pan is the largest one, used for salt-baking. Its hook is empty and there is a clean circle in the grease where it hung.'
            ],
            gives: ['rota-record', 'door-log', 'missing-pan'],
            hint: 'Nadia’s key was used twice. The back-door override was used between those times.'
          },
          { id: 'recipe', label: 'Decode the recipe card', icon: 'cipher', puzzle: 'recipe',
            desc: 'A card in the salt-baking section',
            requires: ['reservation-book'],
            hint: 'Marco wrote his private notes as a Caesar shift. Turn the wheel until the card reads as a warning.'
          }
        ]
      },
      {
        id: 'cellar', name: 'The wine cellar', short: 'Cellar', time: '10:10',
        art: { kind: 'basement', mood: 'mansion' },
        requires: ['freezer-log'],
        intro: 'A brick vault under the restaurant with racks of wine, a tasting table, and a steel door marked PRIVATE. The air is cold but not freezing. A bottle of ’82 Barolo lies smashed on the floor. The steel door has a three-wheel combination lock.',
        actions: [
          { id: 'ledger', label: 'Search the cellar', icon: 'ledger',
            desc: 'The wine ledger, a forged invoice, a broken bottle',
            requires: ['freezer-log'],
            text: [
              'The wine ledger is meticulous until the last page. Marco has marked six bottles as “TRANSFERRED — N.B.” in red ink, each one a genuine vintage worth more than four thousand pounds. Beside them: <b>“NOT IN STOCK. ASK NADIA.”</b>',
              'A folder of invoices from a company called Coast Fine Wines records purchases of the same six vintages at auction — then resale to the restaurant at three times the price. The invoices are signed by N. Bellini.',
              'The smashed Barolo has a cork on the floor beside it. The cork is stamped 1985, not 1982. The bottle is a fake. Somebody was tasting it when Marco found them.'
            ],
            gives: ['wine-ledger', 'forged-invoices', 'fake-bottle'],
            hint: 'The ledger, the invoices and the bottle all point the same way. Follow N.B.'
          },
          { id: 'safe', label: 'Open the private cellar door', icon: 'lockbox', puzzle: 'cellar-lock',
            desc: 'Three wheels · the bin numbers', requires: ['wine-ledger', 'bin-number'],
            hint: 'Marco’s note says “the answer is in the bins”. Set the wheels to 7, 13, 29.' },
          { id: 'documents', label: 'Read the private documents', icon: 'letter',
            desc: 'The new will and the sale contract',
            requires: ['safe-open'],
            text: [
              'The steel door opens onto a small archive: the restaurant’s deeds, insurance policies, and a sealed envelope marked <b>“LAST WILL — M. BELLINI — DRAFT”</b>.',
              'The draft will leaves the restaurant, the cellar, and Marco’s shares to the staff — Lena Petrov first among them — with a life interest for Nadia in the flat above. It is dated two days ago and unsigned.',
              'A second document is a sale contract for the restaurant to a hotel group, contingent on Marco delivering “unencumbered title”. A handwritten note from Nadia says: <b>“Sign it or I will take the cellar to the police.”</b>'
            ],
            gives: ['draft-will', 'sale-contract', 'nadia-threat'],
            hint: 'The will is unsigned. The sale contract has Nadia’s handwriting on it.'
          }
        ]
      },
      {
        id: 'morgue', name: 'City mortuary', short: 'Mortuary', time: '11:30',
        art: { kind: 'morgue', mood: 'cold' },
        requires: ['body-note'],
        intro: 'A white-tiled room with a drain, a row of drawers, and a pathologist who has been waiting for someone to ask the right question. Marco’s clothes are folded on a tray: chef’s whites, a salted apron, one black sock, no shoes.',
        actions: [
          { id: 'autopsy', label: 'Read the full autopsy', icon: 'blood',
            desc: 'The ligature, the hyoid, the time', requires: ['body-note'],
            text: [
              'The report is precise. <b>“Ligature mark, horizontal, 1.2 cm wide, with a woven pattern consistent with an apron tie. Petechiae. Fractured hyoid. No defensive wounds on the hands. Time of death 23:45–00:15.”</b>',
              'There is a second finding: <b>“Salt residue in the trachea and nasal passages.”</b> Marco inhaled salt before he died. Not enough to drown him — just enough to prove his face was pressed into something salty.',
              'The pathologist taps the tray. “He was strangled with something soft and woven. Then someone washed him, dressed him, and put him in the freezer. The salt in his airway came from the wash — or from the pan.”'
            ],
            gives: ['autopsy', 'salt-trachea', 'time-of-death'],
            hint: 'The time of death is 23:45–00:15. The freezer log does not move until 02:14.'
          },
          { id: 'cooling', label: 'Calculate the cooling time', icon: 'chart', puzzle: 'cooling',
            desc: 'Body temperature against freezer log', requires: ['autopsy'],
            hint: 'Use the cooling rate and the core temperature. The body cannot have been in the freezer since midnight.' }
        ]
      },
      {
        id: 'flat', name: 'Nadia’s flat', short: 'Nadia’s flat', time: '13:00',
        art: { kind: 'house', mood: 'mansion' },
        requires: ['draft-will'],
        intro: 'The flat above the restaurant: white walls, expensive nothing, a half-packed suitcase by the door. Nadia Bellini is on the balcony with a cigarette and a glass of wine she has not touched. She is still wearing the previous evening’s dress.',
        actions: [
          { id: 'nadia', label: 'Interview Nadia Bellini', icon: 'user', suspect: 'nadia',
            desc: 'Estranged wife · co-owner · N.B.', hint: 'Nadia’s key was used at 02:06. Ask her about the cellar and the will.' },
          { id: 'search', label: 'Search the flat', icon: 'search',
            desc: 'A suitcase, a safe, a pair of boots', requires: ['nadia-threat'],
            text: [
              'The suitcase is packed for a flight: two weeks in Sicily, one-way ticket, booked at 23:58 on Thursday. Inside, wrapped in a towel: a restaurant apron with a torn tie and a dark stain along the hem.',
              'A small safe in the bedroom holds £12,000 in cash, a passport, and a second set of restaurant accounts showing six “consultancy” payments to Coast Fine Wines totalling £84,000.',
              'By the door: a pair of black leather boots with salt crusted around the soles and a fine spray of red wine on the toe. The tread matches the print in the freezer.'
            ],
            gives: ['packed-bag', 'apron-torn', 'nadia-accounts', 'nadia-boots'],
            hint: 'The apron tie is woven. The boots have salt on them. The ticket was booked before the body was found.'
          }
        ]
      },
      {
        id: 'shop', name: 'Coast Fine Wines', short: 'Wine shop', time: '14:30',
        art: { kind: 'shop', mood: 'mansion' },
        requires: ['wine-ledger'],
        intro: 'A narrow shop behind the harbour with a brass sign and a window full of dusty bottles. Hugo Lin is at the counter with a pricing gun and a glass of something pale. He has been expecting you since breakfast.',
        actions: [
          { id: 'hugo', label: 'Interview Hugo Lin', icon: 'user', suspect: 'hugo',
            desc: 'Sommelier · wine merchant · table four', hint: 'Hugo supplied the fake bottles. Ask him who ordered them.' },
          { id: 'invoices', label: 'Search the shop office', icon: 'ledger',
            desc: 'Auction records, a ledger, a note', requires: ['forged-invoices'],
            text: [
              'The auction records show six lots bought by Coast Fine Wines over eighteen months, all cheap bottles of the right vintage with damaged labels. In the workshop: a glue pot, a set of cork stamps, and a box of blank Italian labels.',
              'A ledger headed <b>“N.B. — PRIVATE”</b> records the sale of each relabelled bottle to The Salt House at auction value, with a 30% commission to Coast Fine Wines. The last entry is dated the day Marco died.',
              'A note in Nadia’s hand is pinned to the ledger: <b>“He has the ledger. Get it back or we are both finished.”</b>'
            ],
            gives: ['auction-records', 'counterfeit-ledger', 'hugo-note'],
            hint: 'The shop was relabelling cheap wine. Nadia was the customer, not the victim.'
          }
        ]
      }
    ],
    puzzles: {
      'freezer-search': {
        type: 'hotspot', title: 'The Walk-In', subtitle: 'Six details in the cold', icon: 'search',
        scene: { kind: 'basement', mood: 'cold' },
        targets: [
          { label: 'Salt on the floor', x: 33, y: 76, r: 5.5, text: 'A patch of coarse salt near the door, wet at the edges. It was used to melt ice — or to wash something down.' },
          { label: 'Boot print', x: 47, y: 82, r: 6, text: 'A partial boot print in the salt, toe pointing out. A woman’s leather sole, with a wine-red fleck in the tread.' },
          { label: 'Torn door strip', x: 70, y: 44, r: 5.5, text: 'One plastic strip on the curtain is torn and stretched. Something was dragged through the door, not carried.' },
          { label: 'Cork in the drain', x: 26, y: 62, r: 5, text: 'A wine cork in the floor drain, stamped 1985. The bottle smashed in the cellar was labelled 1982.' },
          { label: 'Missing camera card', x: 78, y: 30, r: 5, text: 'The camera above the door has been opened. The SD card is gone and the housing is still warm.' },
          { label: 'Apron hook', x: 58, y: 58, r: 5, text: 'An apron hanging on the wall hook, missing one tie. The remaining tie is woven cotton — the same pattern as the mark on Marco’s throat.' }
        ],
        note: 'Click directly on the details. The freezer has not been cleaned, only made cold again.',
        hintText: 'Look at the floor, the door, the drain, the camera, and the apron.',
        success: 'The freezer gives up six details: salt on the floor, a boot print with a wine-red fleck, a torn door strip, an 1985 cork, a missing camera card, and an apron missing its tie.',
        successTitle: 'The body was dragged in, not walked.',
        gives: ['camera-card', 'salt-print', 'torn-strip', 'cork', 'apron-hook'], flags: ['freezerSearched'],
        short: 'The body was dragged in and the camera card taken.',
        log: 'The freezer search finds a boot print in salt, a torn door strip, an 1985 cork, a missing camera card, and an apron missing its tie.'
      },
      'cellar-cam': {
        type: 'photo', title: 'Cellar Camera', subtitle: 'Enhance the 02:14 still', icon: 'cctv',
        scene: { kind: 'basement', mood: 'mansion' },
        target: { x: 58, y: 50, w: 15, h: 32 }, range: [55, 75],
        question: 'Who is carrying something through the cellar at 02:14?',
        options: [
          { t: 'Nadia Bellini, carrying a folded white apron', v: 'nadia' },
          { t: 'Lena Petrov, carrying a copper pan', v: 'lena' },
          { t: 'Hugo Lin, carrying a wine case', v: 'hugo' },
          { t: 'Marco Bellini, carrying a sack of salt', v: 'marco' }
        ],
        answer: 'nadia',
        reveal: 'The figure resolves: a woman in a dark dress and a coat, moving fast toward the walk-in corridor. She is carrying a folded white apron and a bottle. Her boots catch the light. The time stamp reads 02:14:22.',
        wrong: 'The figure is in the corridor, not the kitchen. Slide into the clear band and look at the dress and the apron.',
        hintText: 'The clear band is 55% to 75%. Look for the dress and the folded apron.',
        success: 'The camera places Nadia in the cellar corridor at 02:14 carrying a folded apron — three minutes after Marco’s body was moved. She was not there to choose wine.',
        successTitle: 'Nadia was moving the body.',
        gives: ['cellar-still'], flags: ['cellarCamDone'],
        short: 'Nadia was in the cellar at 02:14 with an apron.',
        log: 'The cellar camera shows Nadia Bellini at 02:14, carrying a folded apron and a bottle toward the walk-in corridor.'
      },
      'recipe': {
        type: 'cipher', title: 'The Salt-Baking Card', subtitle: 'A note in the recipe box', icon: 'cipher',
        plain: 'THE FREEZER IS A LIE', shift: 6,
        prompt: 'In the salt-baking section, between the bass and the turbot, is a card in Marco’s handwriting. It looks like a recipe. The quantities make no sense.',
        note: 'Turn the wheel until the words resolve. The answer is the message, not the shift.',
        placeholder: 'Type the decoded message…',
        answer: ['the freezer is a lie', 'freezer is a lie'],
        wrong: 'The words are still shifted. Try another setting and read the first word aloud.',
        hintText: 'Shift the wheel six places back. The first word resolves to THE.',
        success: 'The card resolves: <b>THE FREEZER IS A LIE.</b> Marco had already worked out that someone meant to put him in the cold. Underneath, in smaller letters: <b>“CHECK THE BINS — 7, 13, 29.”</b>',
        successTitle: 'Marco knew the freezer was a trap.',
        gives: ['freezer-message', 'bin-number'], flags: ['cipherSolved'],
        short: 'Marco left a coded warning about the freezer.',
        log: 'A coded recipe card decodes to “THE FREEZER IS A LIE” with the numbers 7, 13, 29 — the cellar combination.'
      },
      'cellar-lock': {
        type: 'dial', title: 'The Private Cellar', subtitle: 'Three wheels · bin numbers', icon: 'lockbox',
        code: [7, 13, 29], labels: ['BIN A', 'BIN B', 'BIN C'],
        prompt: 'A steel door with a three-wheel lock. Marco’s coded card gives the numbers. <span style="color:var(--dim)">His cellar bins are numbered by vintage and row.</span>',
        hintText: 'Set the wheels to 7, 13 and 29.',
        successTitle: 'The door swings open.',
        success: 'Behind the door: a small archive of deeds, insurance policies, and two sealed envelopes. One is the draft will. The other is a sale contract with Nadia’s handwriting all over it.',
        gives: ['safe-open', 'draft-will', 'sale-contract'], flags: ['cellarOpen'],
        short: 'The private cellar is open.',
        log: 'The private cellar opens on the numbers 7, 13, 29, revealing the draft will and the restaurant sale contract.'
      },
      'cooling': {
        type: 'math', title: 'The Cooling Curve', subtitle: 'When did the body enter the freezer?', icon: 'chart',
        info: 'Marco’s core temperature at 09:00 was 6°C. The freezer holds −18°C. A clothed adult body cools at roughly 4.5°C per hour in a freezer of that size during the first phase of cooling. Marco’s normal core temperature was 37°C. The freezer log shows the door open from 02:14 to 02:31.',
        placeholder: 'hours in the freezer', unit: 'hours', answer: 6.9, tolerance: 1.2,
        working: 'From 37°C to 6°C is a drop of 31°C. At 4.5°C per hour, that is 31 ÷ 4.5 = 6.9 hours. Nine in the morning minus 6.9 hours is approximately 02:06.',
        wrong: 'Subtract 6°C from 37°C, divide by 4.5, then count back from 09:00. The answer is under seven hours.',
        hintText: '31 ÷ 4.5 = 6.9 hours. Nine in the morning minus 6.9 hours is about 02:06.',
        success: 'The body entered the freezer at roughly 02:06 — eight minutes before the door log recorded the door opening. Marco died between 23:45 and 00:15. For two hours his body was somewhere cool but not frozen, and at 02:14 Nadia moved it into the walk-in.',
        successTitle: 'The body entered the freezer at two in the morning.',
        gives: ['cooling-result'], flags: ['coolingDone'],
        short: 'The body entered the freezer around 02:06, matching Nadia’s second visit.',
        log: 'The cooling curve places the body’s entry into the freezer at about 02:06, matching the 02:14 door log and Nadia’s 02:06 key entry.'
      }
    },
    suspects: [
      {
        id: 'nadia', name: 'Nadia Bellini', role: 'Estranged wife · co-owner', location: 'flat', locationName: 'Her flat', tag: 'Prime suspect',
        portrait: { seed: 'nadia-bellini', hair: 'long', hairColor: '#1b1220', skin: 1, expression: 'wary', collar: 'dress', eyes: '#3a2159' },
        intro: 'Forty-one, elegant, with a suitcase by the door and a one-way ticket in her bag. She owns forty per cent of The Salt House and signed every invoice for the counterfeit wine. She says she was at her sister’s house. Her sister says she was not.',
        questions: [
          { q: 'Where were you between midnight and two?', requires: ['door-log'],
            a: '“At my sister’s. In Whitstable.” She does not blink. “I came back this morning when I heard.” A pause. “The door log must be wrong. Marco changed the codes all the time.”',
            gives: ['nadia-alibi'], flags: ['nadiaHostile'] },
          { q: 'Your key opened the back door at 23:31 and 02:06.', requires: ['door-log'], present: true,
            a: '“I came to collect my things. He was alive when I left.” She lights another cigarette. “We argued. About the restaurant. About the will. That is not a crime.”',
            gives: ['nadia-door'] },
          { q: 'You were buying counterfeit wine through Coast Fine Wines.', requires: ['counterfeit-ledger'], present: true,
            a: '“I was buying wine. Hugo handled the labels. It was a victimless thing.” She exhales. “Marco found the ledger. He said he would take it to the police unless I signed the sale. I told him to do what he liked.”',
            gives: ['nadia-wine'], flags: ['nadiaBroke'] },
          { q: 'Marco’s draft will leaves you a life interest and nothing else.', requires: ['draft-will'], present: true,
            a: '“He was punishing me.” Her voice drops. “Twenty years. I built that restaurant with him. He was going to give it to a sous chef who cannot even bone a turbot.” She stubs out the cigarette. “I did not kill him.”',
            gives: ['nadia-will'], flags: ['nadiaBroke'] },
          { q: 'Your apron has a torn tie and a stain that matches his throat.', requires: ['apron-torn'], present: true,
            a: 'She looks at the apron on the table for a long time. “He grabbed me. I pushed him away.” A breath. “The tie caught. That is all. It was an accident.” She looks up. “Then I panicked. You would have panicked too.”',
            gives: ['nadia-confession'], flags: ['nadiaBroke'] }
        ],
        after: 'She asks whether the restaurant will still get its third star. You tell her the restaurant is closed. She says, “Then it was all for nothing,” and reaches for her coat.'
      },
      {
        id: 'lena', name: 'Lena Petrov', role: 'Sous chef · named in the draft will', location: 'kitchen', locationName: 'The kitchen', tag: 'Suspect',
        portrait: { seed: 'lena-petrov', hair: 'braid', hairColor: '#b06a2c', skin: 2, expression: 'sad', collar: 'chef', eyes: '#2b1a12' },
        intro: 'Thirty-three, with a burn scar on one wrist and the flat, exhausted calm of a chef who has just lost her mentor and her job on the same morning. She found the body. She also inherits the restaurant if the draft will is valid.',
        questions: [
          { q: 'What did you see when you opened the freezer?', requires: ['body-note'],
            a: '“The door was propped. I thought the seal had gone.” She stops. “He was on the floor. I knew before I touched him. His face was wrong.” She wipes her hands on her apron. “I called the ambulance. Then I called you.”',
            gives: ['lena-discovery'] },
          { q: 'You inherit the restaurant under the new will.', requires: ['draft-will'], present: true,
            a: '“I did not know.” She looks genuinely shaken. “He never told me. He said he was going to change things, but he did not say —” She stops. “You think I killed him for this? I would have worked for him for free.”',
            gives: ['lena-inheritance'], flags: ['lenaBroke'] },
          { q: 'Where were you at midnight?', requires: ['rota-record'],
            a: '“Here. Prepping for Friday. I clocked out at 23:52 and went home.” She frowns. “Marco was still in the cellar. He told me to leave the ledger on the pass. He said he had a visitor.”',
            gives: ['lena-alibi'] },
          { q: 'The missing copper pan is the salt-baking pan.', requires: ['missing-pan'],
            a: '“It is the biggest one. You can fit a turbot in it.” She looks at the empty hook. “Nadia used it once, years ago. She said it was the only pan big enough to hold a whole fish.” A pause. “Or a person’s head.”',
            gives: ['lena-pan'] }
        ],
        after: 'She asks whether she can finish the service on Saturday. You tell her the restaurant is a crime scene. She nods and goes to check the walk-in temperature out of habit.'
      },
      {
        id: 'hugo', name: 'Hugo Lin', role: 'Sommelier · wine merchant', location: 'shop', locationName: 'Coast Fine Wines', tag: 'Suspect',
        portrait: { seed: 'hugo-lin', hair: 'short', hairColor: '#1b1220', skin: 3, expression: 'smug', collar: 'suit', glasses: 'round' },
        intro: 'Thirty-nine, immaculate, with a pricing gun in one hand and a glass of something he will not name. He sold the restaurant six bottles that were not what their labels said. He also has an alibi for the night, and he is keen for you to check it.',
        questions: [
          { q: 'You relabelled cheap wine as vintage Barolo.', requires: ['counterfeit-ledger'], present: true,
            a: '“I corrected labels. The wine was good. The market is a theatre.” He smiles. “Nadia ordered it. I supplied it. If Marco had a problem, he should have taken it up with his wife.”',
            gives: ['hugo-counterfeit'] },
          { q: 'Marco found the ledger.', requires: ['hugo-note'], present: true,
            a: '“He found a ledger. He also found a way to make me pay for it.” He puts down the glass. “He wanted fifty thousand to keep quiet. I told him I would rather go to prison than be bled.”',
            gives: ['hugo-motive'], flags: ['hugoHostile'] },
          { q: 'Where were you at midnight?', requires: ['rota-record'],
            a: '“At home. My wife will confirm it. I clocked out at 23:18 and I did not come back.” He slides a taxi receipt across the counter. “I was in a cab by half past eleven. The driver remembers me because I argued about the route.”',
            gives: ['hugo-alibi'] },
          { q: 'Nadia says you handled the labels.', requires: ['nadia-wine'], present: true,
            a: '“Nadia says a great deal.” He straightens a bottle on the counter. “She also says she was at her sister’s, and her sister says otherwise. If you are choosing between us, detective, look at who had a key.”',
            gives: ['hugo-deflect'] }
        ],
        after: 'He offers you a glass of the counterfeit Barolo. You decline. He drinks it himself and says, “Still good.”'
      }
    ],
    clues: {
      'body-note': {
        name: 'Marco Bellini — post-mortem note', caption: 'Strangled · no frostbite · staged', icon: 'blood', type: 'Forensic report',
        desc: 'Ligature strangulation with a woven fabric. Petechiae and a fractured hyoid. No frostbite. Marco was dead before he entered the freezer.',
        tells: 'The freezing was staging. The murder happened elsewhere, earlier.'
      },
      'freezer-log': {
        name: 'Freezer temperature log', caption: '02:14 rise · 02:31 closed', icon: 'clock', type: 'Record',
        desc: 'A paper log showing the freezer at minus eighteen until 02:14, rising to minus eleven, then returning to minus eighteen at 02:31.',
        tells: 'The door was open for seventeen minutes at 02:14. Someone moved something in or out.'
      },
      'apron-fiber': {
        name: 'Woven ligature fibres', caption: 'Cotton apron tie · red-brown stain', icon: 'fiber', type: 'Trace evidence',
        desc: 'Fibres from a woven cotton apron tie found in the ligature groove on Marco’s throat.',
        tells: 'The murder weapon was an apron. It came from the restaurant, not from outside.'
      },
      'camera-card': {
        name: 'Freezer camera card', caption: 'Removed · housing warm', icon: 'cctv', type: 'Device',
        desc: 'The SD card from the camera above the freezer door, removed from its housing. The card is missing.',
        tells: 'Someone removed the freezer footage. The camera may have seen the body being brought in.'
      },
      'salt-print': {
        name: 'Boot print in salt', caption: 'Woman’s leather sole · wine-red fleck', icon: 'footprint', type: 'Trace evidence',
        desc: 'A partial boot print in spilled salt, with a wine-red fleck in the tread.',
        tells: 'A woman walked through the salt after it was spilled. The wine fleck ties her to the cellar.'
      },
      'torn-strip': {
        name: 'Torn door strip', caption: 'Stretched · dragged through', icon: 'tool', type: 'Scene mark',
        desc: 'One plastic strip on the freezer curtain is torn and stretched, consistent with a body being dragged through the door.',
        tells: 'Marco was dragged into the freezer, not carried. The killer was not strong enough to lift him.'
      },
      'cork': {
        name: 'Cork in the drain', caption: 'Stamped 1985 · bottle labelled 1982', icon: 'glass', type: 'Physical evidence',
        desc: 'A wine cork stamped 1985, found in the freezer drain. The bottle smashed in the cellar was labelled 1982.',
        tells: 'The cellar bottle was a fake. The cork came from the tasting that led to the argument.'
      },
      'apron-hook': {
        name: 'Apron missing a tie', caption: 'Woven cotton · one tie torn away', icon: 'fiber', type: 'Physical evidence',
        desc: 'An apron on the freezer wall hook, missing one tie. The remaining tie matches the fibres in the ligature mark.',
        tells: 'The murder weapon hung in the freezer. The killer took it from the scene.'
      },
      'cellar-still': {
        name: 'Cellar camera still, 02:14', caption: 'Nadia · folded apron · bottle', icon: 'cctv', type: 'Surveillance',
        desc: 'An enhanced still of Nadia Bellini in the cellar corridor at 02:14, carrying a folded apron and a bottle.',
        tells: 'Nadia moved through the cellar at the exact time the freezer door opened. She was carrying the murder weapon.'
      },
      'freezer-message': {
        name: 'Coded recipe card', caption: '“THE FREEZER IS A LIE”', icon: 'cipher', type: 'Coded evidence',
        desc: 'A Caesar-shifted recipe card in Marco’s hand, decoding to a warning about the freezer and the cellar numbers.',
        tells: 'Marco knew someone meant to put him in the cold. He left a trail for whoever found him.'
      },
      'bin-number': {
        name: 'Cellar bin numbers', caption: '7 · 13 · 29', icon: 'cipher', type: 'Coded evidence',
        desc: 'The numbers 7, 13 and 29 hidden in the coded recipe card, matching the private cellar lock.',
        tells: 'Marco left the combination where only someone who knew his habits would look.'
      },
      'reservation-book': {
        name: 'Reservation book', caption: 'N. Bellini · 21:30 · “ARGUMENT — CELLAR”', icon: 'ledger', type: 'Record',
        desc: 'The reservation book for Thursday, with Nadia Bellini booked at 21:30 and a rubbed-out margin note about an argument in the cellar at 23:40.',
        tells: 'Nadia was in the restaurant before midnight. The argument was serious enough to record.'
      },
      'will-note': {
        name: 'Solicitor note', caption: '“New will — do not tell N.”', icon: 'note', type: 'Personal record',
        desc: 'A note in Marco’s hand: “Solicitor — Friday 09:00 — new will — do not tell N.”',
        tells: 'Marco was changing his will and hiding it from Nadia. The appointment was the morning after his death.'
      },
      'rota-record': {
        name: 'Staff rota and clock-in', caption: 'Lena 23:52 · Hugo 23:18 · Nadia 02:06', icon: 'id', type: 'Record',
        desc: 'The staff rota and clock-in record, showing who was in the building and when. Nadia’s key was used at 23:31 and 02:06.',
        tells: 'Nadia was in the restaurant at midnight and again at two. Both visits bracket the murder.'
      },
      'door-log': {
        name: 'Back-door log', caption: 'Nadia 23:31 · override 02:06 · override 02:28', icon: 'id', type: 'Access record',
        desc: 'The back-door log, recording Nadia’s key at 23:31 and 02:06, and manual overrides at 02:06 and 02:28.',
        tells: 'Nadia came back at two and used the override. The freezer log matches her second visit.'
      },
      'missing-pan': {
        name: 'Missing copper pan', caption: 'Largest salt-baking pan · hook empty', icon: 'tool', type: 'Scene mark',
        desc: 'The largest copper pan, used for salt-baking, is missing from its hook. A clean circle remains in the grease.',
        tells: 'Someone took the pan. It may have been used to move or wash the body.'
      },
      'wine-ledger': {
        name: 'Wine ledger', caption: 'Six bottles “TRANSFERRED — N.B.”', icon: 'ledger', type: 'Financial record',
        desc: 'Marco’s cellar ledger, marking six genuine vintages as transferred to N.B., with the note “NOT IN STOCK. ASK NADIA.”',
        tells: 'Nadia removed six valuable bottles. Marco had discovered the loss and written her initials beside it.'
      },
      'forged-invoices': {
        name: 'Coast Fine Wines invoices', caption: 'Auction purchases · three-times resale', icon: 'receipt', type: 'Financial record',
        desc: 'Invoices showing Coast Fine Wines buying cheap bottles at auction and reselling them to The Salt House at three times the price, signed by N. Bellini.',
        tells: 'Nadia and Hugo were running a counterfeit wine scheme through the restaurant. Marco had the paperwork.'
      },
      'fake-bottle': {
        name: 'Smashed fake Barolo', caption: 'Cork stamped 1985 · label 1982', icon: 'glass', type: 'Physical evidence',
        desc: 'A smashed bottle labelled 1982 Barolo with a cork stamped 1985, proving the bottle was relabelled.',
        tells: 'The wine was counterfeit. The argument in the cellar was about the fraud, not the marriage.'
      },
      'safe-open': {
        name: 'Private cellar open', caption: 'Deeds · policies · sealed envelopes', icon: 'lockbox', type: 'Scene mark',
        desc: 'The private cellar behind the three-wheel lock, containing deeds, insurance policies and two sealed envelopes.',
        tells: 'Marco kept his most important papers behind a code only he knew. The code was left in the recipe box.'
      },
      'draft-will': {
        name: 'Draft will', caption: 'Restaurant to the staff · Nadia life interest', icon: 'letter', type: 'Document',
        desc: 'An unsigned draft will leaving The Salt House and Marco’s shares to the staff, with a life interest in the flat for Nadia.',
        tells: 'Nadia would lose the restaurant under the new will. The will was due to be signed the morning after the murder.'
      },
      'sale-contract': {
        name: 'Restaurant sale contract', caption: 'Hotel group · “unencumbered title”', icon: 'ledger', type: 'Contract',
        desc: 'A contract to sell The Salt House to a hotel group, contingent on Marco delivering unencumbered title.',
        tells: 'Nadia wanted the sale. Marco’s new will and his evidence of the wine fraud would have stopped it.'
      },
      'nadia-threat': {
        name: 'Nadia’s note', caption: '“Sign it or I will take the cellar to the police.”', icon: 'note', type: 'Personal record',
        desc: 'A handwritten note from Nadia to Marco, threatening to take the cellar — and the wine fraud — to the police unless he signed the sale.',
        tells: 'Nadia was willing to expose herself to force the sale. The argument was at a breaking point.'
      },
      'autopsy': {
        name: 'Full autopsy', caption: 'Ligature · hyoid · time 23:45–00:15', icon: 'blood', type: 'Forensic report',
        desc: 'The full autopsy fixes the time of death between 23:45 and 00:15 and confirms strangulation with a woven ligature.',
        tells: 'Marco died before midnight, while the restaurant was still open. The freezer move at 02:14 was hours later.'
      },
      'salt-trachea': {
        name: 'Salt in the airway', caption: 'Inhaled before death', icon: 'chemical', type: 'Forensic detail',
        desc: 'Coarse salt in Marco’s trachea and nasal passages, inhaled before death.',
        tells: 'His face was pressed into salt — probably the salt-baking pan — during the struggle.'
      },
      'time-of-death': {
        name: 'Time of death', caption: '23:45–00:15', icon: 'clock', type: 'Forensic report',
        desc: 'The pathologist fixes Marco’s death between 23:45 and 00:15, before the freezer door opened at 02:14.',
        tells: 'The freezer log is a staging timeline, not a murder timeline.'
      },
      'cooling-result': {
        name: 'Cooling calculation', caption: 'Body entered freezer around 02:06', icon: 'chart', type: 'Forensic analysis',
        desc: 'The cooling curve places Marco’s body in the freezer at about 02:06, matching the 02:14 door log and Nadia’s 02:06 key entry.',
        tells: 'The body was kept somewhere cool for two hours before it was moved. Nadia’s second visit was the move.'
      },
      'packed-bag': {
        name: 'Packed suitcase', caption: 'One-way ticket · booked 23:58', icon: 'ticket', type: 'Physical evidence',
        desc: 'A suitcase packed for Sicily, with a one-way ticket booked at 23:58 on Thursday.',
        tells: 'Nadia planned to leave the country hours before the body was found. She booked the ticket after the argument.'
      },
      'apron-torn': {
        name: 'Torn apron', caption: 'Missing tie · dark stain', icon: 'fiber', type: 'Physical evidence',
        desc: 'A restaurant apron in Nadia’s suitcase, missing one tie, with a dark stain along the hem.',
        tells: 'Nadia kept the murder weapon and packed it. The stain can be matched to Marco.'
      },
      'nadia-accounts': {
        name: 'Nadia’s second accounts', caption: '£84,000 to Coast Fine Wines', icon: 'ledger', type: 'Financial record',
        desc: 'A second set of accounts showing six “consultancy” payments to Coast Fine Wines totalling £84,000.',
        tells: 'Nadia was paying Hugo through the restaurant. The fraud was systematic and profitable.'
      },
      'nadia-boots': {
        name: 'Nadia’s boots', caption: 'Salt on the soles · wine on the toe', icon: 'footprint', type: 'Physical evidence',
        desc: 'Black leather boots with salt crusted around the soles and a red-wine spray on the toe.',
        tells: 'Nadia walked through the salt in the freezer and stood in the cellar when the bottle smashed.'
      },
      'auction-records': {
        name: 'Auction records', caption: 'Six lots · cheap bottles · damaged labels', icon: 'receipt', type: 'Record',
        desc: 'Auction records showing Coast Fine Wines buying six cheap bottles of the right vintage with damaged labels.',
        tells: 'Hugo bought bottles to relabel. This was a planned counterfeit operation.'
      },
      'counterfeit-ledger': {
        name: 'Counterfeit ledger', caption: '“N.B. — PRIVATE” · 30% commission', icon: 'ledger', type: 'Financial record',
        desc: 'A ledger recording the sale of relabelled bottles to The Salt House, with a 30% commission to Coast Fine Wines.',
        tells: 'Hugo and Nadia were partners in the fraud. Marco had the ledger.'
      },
      'hugo-note': {
        name: 'Nadia’s warning to Hugo', caption: '“He has the ledger.”', icon: 'note', type: 'Personal record',
        desc: 'A note from Nadia to Hugo: “He has the ledger. Get it back or we are both finished.”',
        tells: 'Nadia and Hugo both knew Marco had the evidence. Both had a reason to want it back.'
      },
      'nadia-alibi': {
        name: 'Nadia’s alibi', caption: '“At my sister’s in Whitstable.”', icon: 'audio', type: 'Statement',
        desc: 'Nadia claims she was at her sister’s house in Whitstable until the morning.',
        tells: 'Her key was used at the restaurant at 23:31 and 02:06. The alibi is false.'
      },
      'nadia-door': {
        name: 'Nadia on the door log', caption: '“I came to collect my things.”', icon: 'note', type: 'Statement',
        desc: 'Nadia admits using her key at 23:31 and 02:06 but says she collected her things and left.',
        tells: 'She was in the building at the time of the murder and again when the body was moved.'
      },
      'nadia-wine': {
        name: 'Nadia on the wine', caption: '“A victimless thing.”', icon: 'audio', type: 'Statement',
        desc: 'Nadia admits the counterfeit wine scheme and says Marco threatened to take the ledger to the police.',
        tells: 'Marco had both the wine evidence and the new will. Nadia was about to lose everything.'
      },
      'nadia-will': {
        name: 'Nadia on the will', caption: '“He was punishing me.”', icon: 'audio', type: 'Statement',
        desc: 'Nadia admits she knew about the new will and believed Marco was punishing her for the fraud.',
        tells: 'The will gave her a motive. The signing was the deadline.'
      },
      'nadia-confession': {
        name: 'Nadia’s confession', caption: '“The tie caught. It was an accident.”', icon: 'audio', type: 'Statement',
        desc: 'Nadia admits the struggle and the apron tie but claims Marco’s death was an accident and the freezer was panic.',
        tells: 'She admits the killing and the staging. The autopsy and camera corroborate her presence.'
      },
      'lena-discovery': {
        name: 'Lena’s discovery', caption: '“His face was wrong.”', icon: 'audio', type: 'Witness statement',
        desc: 'Lena describes finding the freezer door propped and Marco on the floor, already dead.',
        tells: 'The scene was staged before Lena arrived. She called for help immediately.'
      },
      'lena-inheritance': {
        name: 'Lena on the will', caption: '“He never told me.”', icon: 'note', type: 'Statement',
        desc: 'Lena says she did not know she was named in Marco’s draft will.',
        tells: 'She had no motive to kill the man who was giving her the restaurant. She is a beneficiary, not a suspect.'
      },
      'lena-alibi': {
        name: 'Lena’s alibi', caption: 'Clocked out 23:52 · home by 00:10', icon: 'receipt', type: 'Alibi',
        desc: 'Lena clocked out at 23:52 and was home by ten past midnight. Her flatmate confirms it.',
        tells: 'Lena left before the murder window closed. She is not the killer.'
      },
      'lena-pan': {
        name: 'Lena on the pan', caption: '“Nadia used it once.”', icon: 'note', type: 'Statement',
        desc: 'Lena identifies the missing copper pan as the largest salt-baking pan and remembers Nadia using it years ago.',
        tells: 'The pan connects the salt in Marco’s airway to the kitchen — and to Nadia.'
      },
      'hugo-counterfeit': {
        name: 'Hugo on the wine', caption: '“The market is a theatre.”', icon: 'audio', type: 'Statement',
        desc: 'Hugo admits relabelling cheap wine but insists Nadia ordered it and Marco was trying to blackmail him.',
        tells: 'Hugo had a motive, but his alibi and the physical evidence point elsewhere.'
      },
      'hugo-motive': {
        name: 'Hugo on the blackmail', caption: '“I would rather go to prison than be bled.”', icon: 'note', type: 'Statement',
        desc: 'Hugo admits Marco demanded fifty thousand pounds to keep the counterfeit wine quiet.',
        tells: 'Hugo had a reason to hate Marco. He also had a taxi receipt and a wife to prove where he was.'
      },
      'hugo-alibi': {
        name: 'Hugo’s alibi', caption: 'Taxi home · 23:30 · wife confirms', icon: 'receipt', type: 'Alibi',
        desc: 'Hugo clocked out at 23:18 and took a taxi home at 23:30. His wife and the driver confirm it.',
        tells: 'Hugo was not at the restaurant during the murder. He is a fraudster, not a killer.'
      },
      'hugo-deflect': {
        name: 'Hugo’s deflection', caption: '“Look at who had a key.”', icon: 'audio', type: 'Statement',
        desc: 'Hugo points out that Nadia had a key, a motive and a false alibi.',
        tells: 'He is trying to trade Nadia for himself. The door log and camera prove him right.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Marco Bellini?', 
          options: [
            { t: 'Lena Petrov — the sous chef who inherits the restaurant', v: 'lena' },
            { t: 'Hugo Lin — the wine merchant he was blackmailing', v: 'hugo' },
            { t: 'Nadia Bellini — his estranged wife and co-owner', v: 'nadia' },
            { t: 'A burglar who broke in through the cellar', v: 'burglar' }
          ], answer: 'nadia' },
        { q: 'How did Marco die?', 
          options: [
            { t: 'Strangled with an apron tie during a struggle in the cellar', v: 'apron' },
            { t: 'Frozen to death in the walk-in after being locked in', v: 'frozen' },
            { t: 'Hit with the missing copper pan and left in the freezer', v: 'pan' },
            { t: 'Poisoned with counterfeit wine at dinner service', v: 'wine' }
          ], answer: 'apron' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Marco’s new will and his evidence of the wine fraud would have left Nadia with nothing', v: 'will' },
            { t: 'Marco was going to expose Lena’s affair with Hugo', v: 'affair' },
            { t: 'Marco was selling the restaurant without paying the staff', v: 'sale' },
            { t: 'Marco had stolen Nadia’s inheritance from her family', v: 'inheritance' }
          ], answer: 'will' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The cellar camera still, the apron tie, the door log and the cooling calculation', v: 'camera' },
            { t: 'Hugo’s counterfeit wine ledger', v: 'ledger' },
            { t: 'Lena’s inheritance under the draft will', v: 'inheritance' },
            { t: 'The broken bottle in the cellar', v: 'bottle' }
          ], answer: 'camera' }
      ],
      verdict: {
        who: 'Nadia Bellini, 41 — estranged wife, co-owner of The Salt House',
        whoDesc: 'was arrested at the flat with a packed suitcase and charged with murder. She pleaded guilty to manslaughter and fraud; the murder charge was reduced after the court accepted a loss-of-control defence.',
        how: 'She met Marco in the cellar during an argument about the wine ledger and the sale. She strangled him with her apron tie, dragged him through the freezer curtain, and put him inside. She returned at 02:14 to move the body and open the freezer door.',
        why: 'Marco had discovered the counterfeit wine scheme, changed his will to leave the restaurant to the staff, and was due to sign it the next morning. Nadia would have lost the restaurant, the flat and her share of the sale.',
        key: 'The cellar camera shows Nadia carrying the folded apron at 02:14, the apron tie matches the ligature, the door log places her inside at 23:31 and 02:06, and the cooling calculation proves the body was in the freezer hours before she claimed.'
      },
      reveal: [
        'The Salt House was Marco Bellini’s whole life. He built it with Nadia in the years when they could not afford a second chair, and he kept it when the marriage ended because the restaurant was the only thing he still understood. She kept her forty per cent and her key. He kept the kitchen and the debts.',
        'The debts were worse than anyone knew. Nadia had been selling the cellar’s best bottles to private buyers and replacing them with relabelled cheap wine bought through Hugo Lin. Six bottles a month for eighteen months, £84,000 in commissions, all signed with her initials. Marco found the ledger in the spring and said nothing until Thursday.',
        'On Thursday he called his solicitor and asked for an emergency appointment. He told Nadia he was changing his will. He told her he had the ledger, the invoices, and the bottle with the wrong cork. He told her he would give her one chance to sign the sale and leave quietly. She came to the restaurant at 23:31 to take that chance.',
        'The argument started in the cellar and moved through the kitchen. He was calm. That was the thing that broke her — he was calm, and he was going to take everything, and he was going to be reasonable about it. She grabbed the apron tie. He grabbed her wrist. They fell against the shelf. The tie tightened.',
        'She held it for four minutes. Then she let go and he did not move. She sat on the cellar floor beside him and smoked a cigarette. At some point after midnight she decided not to call anyone.',
        'She dragged him through the freezer curtain, lifted him onto the shelf, and turned the thermostat down. But first she kept him in the cellar, in the big copper pan, for two hours while she smoked and decided what to do. She took the camera card. She went home, packed a bag for Sicily, and booked a one-way ticket at 23:58. Then she came back at 02:06 to move him into the walk-in and to collect the apron.',
        'She was almost clever. The freezer was a good idea: it confused the time of death, it explained the cold, it made a murder look like an accident. She did not account for the cooling curve, which put the body in the freezer hours before she claimed to have arrived. She did not account for the freezer camera, whose card she took but whose footage had already uploaded to the cloud. And she did not account for the apron, which she packed in her suitcase with the tie still missing.',
        'Hugo Lin was charged with fraud and counterfeit goods. He gave evidence against Nadia and received a suspended sentence. Lena Petrov was named as the restaurant’s new head chef in Marco’s unsigned will; the court upheld it, and she reopened The Salt House eight months later with a menu that did not include salt-baked fish.',
        'Nadia Bellini was sentenced to fourteen years. At the trial, the prosecution read Marco’s coded recipe card aloud: “THE FREEZER IS A LIE.” The court heard that he had known someone meant to kill him, and had left a warning in the one place he trusted: his own recipe box.',
        'The Salt House still has two stars. Lena keeps the third place setting empty on Fridays. She says it is for Marco. The staff know it is for the person he thought he was marrying.'
      ],
      quote: 'He was going to take everything, and he was going to be reasonable about it.',
      twist: 'The freezer was not the first place he was hidden. Marco’s body had been in the cellar’s salt-baking pan for two hours before Nadia moved him to the walk-in — the pan was big enough to hold a whole fish, and the salt in his airway proves it. She washed the pan, put it back on the hook, and forgot to put the apron back with it.'
    }
  });
})();
