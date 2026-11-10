/* ============================================================
   CASE 21 — THE ORCHARD FIRE
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c21', num: 21,
    title: 'The Orchard Fire',
    subtitle: 'A cider maker burns to death in her own barn, and the fire smells of apples, not petrol.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'barn', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Ruth Tamsin, 58 — cider maker, Hollow Orchard' },
      { k: 'Scene', v: 'The old barn, Hollow Orchard' },
      { k: 'Found', v: '05:40 — by the farmhand' },
      { k: 'Cause', v: 'Blunt-force trauma · fire set afterwards' }
    ],
    briefing: [
      'Hollow Orchard has ninety acres of old apple trees, a cider press from 1911, and a barn that has not changed since Ruth Tamsin’s grandfather rebuilt it after the war. At twenty to six, the farmhand Marek saw smoke and broke the door down. Ruth was inside, under the press, already dead.',
      'The fire brigade found an accelerant trail around the press and called it arson. The pathologist found a depressed fracture at the base of Ruth’s skull and no soot in her lungs. She was killed before the fire, not by it.',
      'Ruth had been arguing with her nephew Aiden about the future of the orchard. She had also been arguing with Beatrix Voss, who owns the rival cider company down the valley and wanted the land. And she had sacked Marek on Tuesday for drinking on the job.',
      'The barn burned for forty minutes. The fire did not reach the farmhouse, the cider lab, or the new packing shed. It destroyed one building, one press, and one woman. Whoever set it knew exactly what they wanted to burn.'
    ],
    opening: 'The barn is a black skeleton open to a grey sky. The iron press stands in the middle like a gallows. Everything smells of smoke, scorched wood, and under it — faintly, unmistakably — hot apple brandy.',
    objectives: [
      'Prove the fire was set and Ruth was killed before it.',
      'Identify the accelerant.',
      'Find what the fire was meant to destroy.',
      'Establish who had access to the barn that morning.'
    ],
    locations: [
      {
        id: 'barn', name: 'The burned barn', short: 'Barn', time: '06:40',
        art: { kind: 'barn', mood: 'cold' },
        intro: 'A stone-and-timber barn with a collapsed roof and a floor of wet ash. The cider press is scorched but standing. A blackened five-gallon drum sits by the door. The fire officer has chalked a body outline under the press.',
        actions: [
          { id: 'body', label: 'Examine the body and the press', icon: 'blood', hotspot: { x: 50, y: 58 },
            desc: 'The wound, the press handle, the drum',
            text: [
              'Ruth Tamsin lies under the press, one arm across her chest. The back of her skull is caved in. There is no soot in her mouth or nose, and her eyes are clear. She died before the fire reached her.',
              'The press handle is missing from its socket. It lies three feet away, scorched along one side but clean at the grip. There is a dark stain in the grain near the end.',
              'The five-gallon drum by the door is half full of a clear amber liquid. It is not petrol. It smells of apples and alcohol. The fire officer’s note says: <b>“Accelerant poured in a ring around the press. Ignition at the base. No accelerant elsewhere.”</b>'
            ],
            gives: ['body-note', 'press-handle', 'accelerant-drum'],
            hint: 'The wound is at the back of the head. The handle is missing. The drum is not petrol.'
          },
          { id: 'search', label: 'Search the barn', icon: 'search', puzzle: 'barn-search',
            desc: 'Six details in the ash',
            requires: ['body-note'],
            hint: 'Check the door, the floor, the press, the beam, the drum and the tracks outside.'
          },
          { id: 'fuel', label: 'Analyse the accelerant', icon: 'chemical', puzzle: 'accelerant',
            desc: 'Four residues, one ignition source',
            requires: ['accelerant-drum'],
            hint: 'Test each residue. The one that burns with a blue flame and smells of apples is the accelerant.' }
        ]
      },
      {
        id: 'orchard', name: 'The orchard', short: 'Orchard', time: '07:40',
        art: { kind: 'forest' },
        requires: ['body-note'],
        intro: 'Ninety acres of gnarled apple trees in frost, some of them a hundred years old. A row of young saplings has been planted at the eastern edge, each one tagged with a plastic label. The ground is rutted with tractor tracks.',
        actions: [
          { id: 'saplings', label: 'Inspect the new saplings', icon: 'photo',
            desc: 'Heritage trees? Or something cheaper', requires: ['body-note'],
            text: [
              'The new trees are planted in a neat row where forty old cider-apple trees used to stand. The stumps have been ground out. The saplings are tagged <b>“GOLDEN DELIGHT — COMMERCIAL GRADE”</b>.',
              'A clipboard in the tractor shed records the sale of forty mature cider-apple trees to a landscape contractor for £62,000, signed by A. Tamsin. The trees were sold in March. Ruth’s signature is not on the sale.',
              'A second page lists the replacement saplings at £4 each. The difference is £61,840, and there is no record of it entering the orchard account.'
            ],
            gives: ['tree-sale', 'forged-signature'], flags: ['orchardSearched'],
            hint: 'The new trees are not heritage stock. Follow the money from the old ones.'
          },
          { id: 'aiden', label: 'Interview Aiden Tamsin', icon: 'user', suspect: 'aiden',
            desc: 'Nephew · farm manager · signed the sale', hint: 'Aiden signed for the tree sale. Ask him where the money went.' },
          { id: 'tracks', label: 'Read the tractor tracks', icon: 'car',
            desc: 'Two sets of wheels, one direction', requires: ['body-note'],
            text: [
              'The tractor tracks run from the barn to the eastern row and back. The tread is the farm’s old tractor, which Aiden drives. Marek’s boots are all over the yard, but his bicycle tracks stop at the gate.',
              'Beside the barn door: a single fresh tyre print from a small car, narrower than the tractor, with a distinctive diagonal cut in the tread. Beatrix Voss drives a compact with a repaired front tyre.',
              'The car print arrives and leaves again without turning toward the house. Whoever made it came to the barn, not the farmhouse.'
            ],
            gives: ['tractor-tracks', 'car-print'], flags: ['tracksRead'],
            hint: 'The tractor went to the new row. The car came only to the barn.'
          }
        ]
      },
      {
        id: 'house', name: 'The farmhouse', short: 'Farmhouse', time: '08:30',
        art: { kind: 'house' },
        requires: ['forged-signature'],
        intro: 'A stone farmhouse with a warm kitchen and a cold study. Ruth’s will is on the desk under a paperweight shaped like an apple. The answering machine is blinking. A half-drunk cup of tea sits on the windowsill.',
        actions: [
          { id: 'study', label: 'Search the study', icon: 'ledger',
            desc: 'The will, the accounts, a letter from the trust', requires: ['forged-signature'],
            text: [
              'Ruth’s will leaves Hollow Orchard to a preservation trust, with Aiden as manager for life and a salary. It is signed and witnessed. A covering letter from the trust says the sale would complete in September and that “the orchard’s accounts will be independently audited”.',
              'The farm accounts show a £61,840 gap between the tree sale and the new plantings. Aiden’s name is on every withdrawal. A second set of loan papers shows he borrowed £58,000 against the orchard’s equipment, using Ruth’s forged signature.',
              'A letter from Ruth’s solicitor, dated last week, says: <b>“I have asked Aiden to explain the missing trees and the loans. If he cannot, I will report the matter to the police after the fair.”</b>'
            ],
            gives: ['ruth-will', 'audit-letter', 'loan-papers'], flags: ['studySearched'],
            hint: 'The audit was coming. The loans were due. The fair was Saturday.'
          },
          { id: 'safe', label: 'Open Ruth’s desk safe', icon: 'lockbox', puzzle: 'safe',
            desc: 'Four digits · the orchard’s founding year', requires: ['ruth-will'],
            hint: 'The press is stamped 1911. Try 1911.' },
          { id: 'machine', label: 'Play the answering machine', icon: 'audio', puzzle: 'voicemail',
            desc: '05:12 — Ruth leaving a message', requires: ['audit-letter'],
            hint: 'Listen to the last message. It was left before the fire was discovered.' }
        ]
      },
      {
        id: 'lab', name: 'The cider lab', short: 'Cider lab', time: '09:30',
        art: { kind: 'lab', mood: 'mansion' },
        requires: ['accelerant-result'],
        intro: 'A converted dairy with stainless-steel tanks, hydrometers, and a wall of labelled bottles. Beatrix Voss is at the bench in a waxed jacket, testing a sample of the burned drum. She has brought her own glassware.',
        actions: [
          { id: 'beatrix', label: 'Interview Beatrix Voss', icon: 'user', suspect: 'beatrix',
            desc: 'Rival cider maker · wants the orchard', hint: 'Beatrix wanted the land. Ask her about the car print and the brandy.' },
          { id: 'lab', label: 'Search the lab', icon: 'ledger',
            desc: 'A purchase order, a contract, a sample', requires: ['accelerant-result'],
            text: [
              'Beatrix’s briefcase holds a draft contract to buy Hollow Orchard from Aiden Tamsin for £1.2 million, conditional on “vacant possession”. It is dated three weeks ago. Ruth’s signature line is blank.',
              'A purchase order from the lab records twenty gallons of “apple spirit — 65% — for fortifying” delivered last month. The order is signed by Aiden. The lab does not fortify its cider.',
              'A sample bottle on the bench is labelled <b>“BARN DRUM — 62% ABV — APPLE BRANDY”</b>. Beatrix has already run the test. Her note says: <b>“Not my stock. Aiden’s press. He has been distilling behind the barn.”</b>'
            ],
            gives: ['beatrix-contract', 'spirit-order', 'brandy-sample'], flags: ['labSearched'],
            hint: 'The brandy came from Aiden’s order. The contract needed Ruth gone.'
          }
        ]
      },
      {
        id: 'pub', name: 'The Wheatsheaf', short: 'The pub', time: '11:00',
        art: { kind: 'interior' },
        requires: ['tractor-tracks'],
        intro: 'A low pub at the crossroads with a fire in the grate and a photograph of Ruth behind the bar. Marek is in the corner with a bandaged hand and a glass of lemonade he is not drinking. The landlord is polishing the same glass over and over.',
        actions: [
          { id: 'marek', label: 'Interview Marek Nowak', icon: 'user', suspect: 'marek',
            desc: 'Farmhand · sacked on Tuesday', hint: 'Marek found the body. Ask him about the fire and the sacking.' },
          { id: 'timeline', label: 'Rebuild the morning', icon: 'clock', puzzle: 'fire-timeline',
            desc: 'Seven moments before the fire brigade', requires: ['tractor-tracks'],
            hint: 'Use the tractor clock, the phone log, the smoke sighting and the brigade arrival.' }
        ]
      }
    ],
    puzzles: {
      'barn-search': {
        type: 'hotspot', title: 'The Barn', subtitle: 'Six details in the ash', icon: 'search',
        scene: { kind: 'barn', mood: 'cold' },
        targets: [
          { label: 'Broken padlock', x: 24, y: 42, r: 5.5, text: 'The barn padlock has been cut with bolt croppers, not burned. It was opened before the fire.' },
          { label: 'Boot print in ash', x: 62, y: 78, r: 6, text: 'A boot print in wet ash, size ten, with a distinctive zigzag tread. The farm’s own boots have a different pattern.' },
          { label: 'Brandy trail', x: 38, y: 70, r: 5.5, text: 'A dark trail of liquid soaked into the floor timbers, running in a ring around the press and ending at the drum.' },
          { label: 'Press handle', x: 55, y: 54, r: 5.5, text: 'The missing press handle, scorched on one side, with a dark stain in the grain. There is a hair caught in a crack.' },
          { label: 'Cut beam', x: 76, y: 50, r: 5, text: 'A roof beam has been partly sawn through above the press. The fire weakened it; the saw marks are older.' },
          { label: 'Drum lid', x: 30, y: 56, r: 5, text: 'The drum lid has been wrenched off and the seal is broken. It was opened recently, not by the fire.' }
        ],
        note: 'Click directly on the details. The ash is still warm in places.',
        hintText: 'Look at the door, the floor, the press, the beam, the drum and the boot print.',
        success: 'The barn gives up six details: a cut padlock, a boot print, a brandy trail, the press handle, a sawn beam, and an opened drum.',
        successTitle: 'The fire was prepared, not accidental.',
        gives: ['cut-padlock', 'zigzag-boot', 'brandy-trail'], flags: ['barnSearched'],
        short: 'The barn was opened before the fire and the handle is the weapon.',
        log: 'The barn search finds a cut padlock, a zigzag boot print, a brandy trail, the press handle, a sawn beam, and an opened drum.'
      },
      'accelerant': {
        type: 'mix', title: 'Accelerant Analysis', subtitle: 'Four residues, one ignition source', icon: 'chemical',
        reagents: [
          { name: 'Apple brandy', color: '#d99a3a' },
          { name: 'Paraffin', color: '#8b8b8b' },
          { name: 'Turpentine', color: '#6be3c8' },
          { name: 'Water', color: '#5aa9e6' }
        ],
        order: [0],
        note: 'The drum sample is 62% alcohol and smells of apples. Test each residue for flame colour and residue. Add the one that matches.',
        wrong: 'That residue burns with the wrong flame or leaves the wrong ash. The drum smelled of apples.',
        hintText: 'Apple brandy burns blue with almost no soot. Paraffin burns yellow and smokes. Add the apple brandy.',
        success: 'The residue matches apple brandy at 62% ABV — the orchard’s own spirit, distilled from its own fruit. The accelerant did not come from a petrol station. It came from Aiden’s still behind the barn.',
        successTitle: 'The fire was set with the orchard’s own brandy.',
        gives: ['accelerant-result', 'still-location'], flags: ['accelerantDone'],
        short: 'Apple brandy was the accelerant.',
        log: 'The accelerant is apple brandy at 62% ABV, from a still behind the barn — not petrol or paraffin.'
      },
      safe: {
        type: 'keypad', title: 'Ruth’s Desk Safe', subtitle: 'Four-digit keypad', icon: 'keypad',
        deviceLabel: 'R. TAMSIN — PRIVATE', length: 4, code: '1911',
        prompt: 'A small safe under Ruth’s desk. The keypad wants four digits. <span style="color:var(--dim)">The old cider press is stamped with the year the family bought it.</span>',
        hintText: 'The press is stamped 1911. Enter 1911.',
        successTitle: 'The safe opens.',
        success: 'Inside: the orchard’s original deeds, a fire-insurance policy, and a brown envelope marked <b>“AIDEN — LOANS — DO NOT LET HIM SELL”</b>. The envelope holds the forged loan papers and a note from Ruth: “He has taken the trees. He cannot take the orchard.”',
        gives: ['forged-loans', 'ruth-note'], flags: ['safeOpen'],
        short: 'Ruth’s safe holds the forged loan papers.',
        log: 'Ruth’s safe holds the original deeds, a fire-insurance policy, and an envelope of Aiden’s forged loan papers.'
      },
      voicemail: {
        type: 'audio', title: 'The Answering Machine', subtitle: '05:12 — the last message', icon: 'audio',
        prompt: 'The farmhouse answering machine holds three messages. The last one was left at 05:12, twenty-eight minutes before the fire was seen.',
        pattern: [220, 0, 330, 220, 0, 440, 330, 0],
        tempo: 0.48,
        waveform: 'A click. Wind. Ruth’s voice, close to the phone, speaking quickly. A man’s voice in the background. The clatter of a metal door. Then the line goes dead.',
        options: [
          { t: 'Ruth telling her solicitor that Aiden had come to the barn and was threatening her', v: 'aiden' },
          { t: 'Ruth asking Beatrix Voss to leave the orchard', v: 'beatrix' },
          { t: 'Ruth apologising to Marek for sacking him', v: 'marek' },
          { t: 'A wrong number from the village shop', v: 'shop' }
        ],
        answer: 'aiden',
        wrong: 'Listen to the name. Ruth is not apologising. She is frightened of the man in the barn.',
        hintText: 'The man is her nephew. She says “the loans” and “the trust”.',
        success: 'The message resolves: <i>“Martin, it’s Ruth. Aiden is here. He has been drinking and he says he will not let the trust audit the accounts. He has the loan papers. I am going to the barn to lock the —”</i> A man’s voice, distant: <i>“Put the phone down, Ruth.”</i> The line cuts.',
        successTitle: 'Ruth named her killer on the machine.',
        gives: ['voicemail-ruth'], flags: ['voicemailDone'],
        short: 'Ruth’s last message names Aiden.',
        log: 'Ruth’s final voicemail names Aiden and says he has the forged loan papers and is in the barn with her.'
      },
      'fire-timeline': {
        type: 'sequence', title: 'The Morning of the Fire', subtitle: 'Seven moments before the brigade', icon: 'clock', variant: 'strips',
        prompt: 'The tractor clock, the phone log, the smoke sighting and the brigade record disagree. Put the morning in order.',
        items: [
          { t: 'Aiden opens the barn with bolt croppers', sub: '04:50 — cut padlock', order: 1 },
          { t: 'Ruth leaves the voicemail for her solicitor', sub: '05:12 — answering machine', order: 2 },
          { t: 'The argument in the barn', sub: '05:15 — press handle and boot print', order: 3 },
          { t: 'Aiden pours the brandy ring', sub: '05:22 — accelerant trail', order: 4 },
          { t: 'The fire is lit', sub: '05:25 — fire officer', order: 5 },
          { t: 'Marek sees smoke from the lane', sub: '05:38 — witness', order: 6 },
          { t: 'The fire brigade arrives', sub: '05:52 — station log', order: 7 }
        ],
        wrong: 'The voicemail was left before the argument. The fire was lit after the brandy was poured.',
        hintText: 'Barn opened 04:50, voicemail 05:12, argument 05:15, brandy 05:22, fire 05:25, smoke seen 05:38, brigade 05:52.',
        success: 'The morning assembles: Aiden opened the barn forty minutes before dawn, Ruth followed him and left a message naming him, the argument turned violent, and the fire was set seven minutes later. Marek saw the smoke thirteen minutes after that.',
        successTitle: 'Aiden was in the barn before Ruth died.',
        gives: ['fire-timeline'], flags: ['timelineDone'],
        short: 'Aiden opened the barn and lit the fire after killing Ruth.',
        log: 'Timeline: barn opened 04:50, voicemail 05:12, argument 05:15, brandy poured 05:22, fire lit 05:25, smoke seen 05:38.'
      }
    },
    suspects: [
      {
        id: 'aiden', name: 'Aiden Tamsin', role: 'Nephew · farm manager', location: 'orchard', locationName: 'The orchard', tag: 'Prime suspect',
        portrait: { seed: 'aiden-tamsin', hair: 'short', hairColor: '#3a2a1b', skin: 0, expression: 'wary', collar: 'coat', beard: 'stubble' },
        intro: 'Thirty-six, with his aunt’s broad hands and none of her patience. He signed the tree sale, the loan papers and the brandy order. He was in the barn before dawn. He says he was checking the frost.',
        questions: [
          { q: 'Where were you at five this morning?', requires: ['fire-timeline'],
            a: '“In the orchard. Checking the frost.” He rubs his hands. “The new trees are fragile. I was out from half four.” A pause. “I saw the smoke from the east field. I ran back.”',
            gives: ['aiden-alibi'], flags: ['aidenHostile'] },
          { q: 'You sold forty mature cider trees for £62,000.', requires: ['tree-sale'], present: true,
            a: '“Thinning the stock. Ruth knew.” He looks away. “She signed the sale. You can see her signature.”',
            gives: ['aiden-sale'] },
          { q: 'Ruth’s signature on the loan papers was forged.', requires: ['forged-loans'], present: true,
            a: '“She gave me permission.” His voice rises. “She was going to sell to the trust and leave me with a salary. I built the new rows. I kept the place going while she played lady of the manor.”',
            gives: ['aiden-loans'], flags: ['aidenBroke'] },
          { q: 'Your voicemail is on her machine. She named you.', requires: ['voicemail-ruth'], present: true,
            a: 'He is quiet for a long time. “She was going to call the police. Over trees. Over money.” He looks up. “I did not mean to hit her. She came at me with the handle. I took it off her.”',
            gives: ['aiden-confession'], flags: ['aidenBroke'] }
        ],
        after: 'He asks whether the orchard will still go to the trust. You tell him the trust will decide. He says, “It was never mine anyway,” and puts his head in his hands.'
      },
      {
        id: 'beatrix', name: 'Beatrix Voss', role: 'Rival cider maker · buyer', location: 'lab', locationName: 'Cider lab', tag: 'Suspect',
        portrait: { seed: 'beatrix-voss', hair: 'bob', hairColor: '#8d8d99', skin: 1, expression: 'smug', collar: 'coat', glasses: 'square' },
        intro: 'Fifty-two, sharp, with a waxed jacket and a lab full of glassware. She wanted Hollow Orchard for twenty years and had a draft contract to prove it. She also has an alibi, a tyre print, and a sample of Aiden’s brandy.',
        questions: [
          { q: 'Your car was at the barn this morning.', requires: ['car-print'], present: true,
            a: '“I drove past at half five. I saw smoke and kept going.” She folds her arms. “I do not stop for other people’s fires. I called the brigade from the crossroads.”',
            gives: ['beatrix-car'] },
          { q: 'You had a contract to buy the orchard from Aiden.', requires: ['beatrix-contract'], present: true,
            a: '“A draft. Conditional on vacant possession.” She does not flinch. “Aiden approached me. He said Ruth was old and the trust was a fantasy. I told him to bring me a signed deed.”',
            gives: ['beatrix-contract-statement'] },
          { q: 'The brandy came from Aiden’s still.', requires: ['brandy-sample'], present: true,
            a: '“I tested it myself. Sixty-two per cent, apple spirit, and a hint of the same yeast I use.” She smiles without warmth. “He has been distilling behind the barn for a year. I would have reported it, but I wanted the land more.”',
            gives: ['beatrix-brandy'] },
          { q: 'You inherit nothing if the trust takes the orchard.', requires: ['ruth-will'], present: true,
            a: '“Correct. But I do not kill for land, detective. I wait.” She puts down the sample. “Aiden is a liar and a thief. He is also a coward. Look at the press handle.”',
            gives: ['beatrix-deflect'] }
        ],
        after: 'She offers to buy the burned orchard at a reduced price. You tell her to speak to the trust. She gives you her card anyway.'
      },
      {
        id: 'marek', name: 'Marek Nowak', role: 'Farmhand · sacked Tuesday', location: 'pub', locationName: 'The Wheatsheaf', tag: 'Suspect',
        portrait: { seed: 'marek-nowak', hair: 'buzz', hairColor: '#8a5a33', skin: 2, expression: 'sad', collar: 'coat', beard: 'full' },
        intro: 'Forty-four, with a bandaged hand and the flat exhaustion of a man who has been blamed for something before. He found the body. He was sacked on Tuesday. He had a key to the barn.',
        questions: [
          { q: 'You were sacked on Tuesday.', requires: ['body-note'],
            a: '“For drinking. One bottle of cider after work.” He turns his glass. “Ruth was fair. She said I could come back after the fair if I stayed dry. I was going to ask her on Saturday.”',
            gives: ['marek-sacking'] },
          { q: 'What did you see when you opened the barn?', requires: ['body-note'],
            a: '“Smoke. The door was warm.” He holds up his bandaged hand. “I burned it on the latch. I got the door open and saw her under the press. Then I ran for the house.”',
            gives: ['marek-discovery'] },
          { q: 'Your boots match the print in the ash.', requires: ['zigzag-boot'], present: true,
            a: '“I walked through the ash when I found her. Of course my boots are there.” He points at the bandage. “You can check the tread. It is the same as every farm boot in the valley.”',
            gives: ['marek-boot'] },
          { q: 'Who else had a key to the barn?', requires: ['cut-padlock'],
            a: '“The padlock was new. Only Ruth and Aiden had the key.” He thinks. “But Aiden keeps bolt croppers in the tractor. He cuts the bale wire with them.”',
            gives: ['marek-key'] }
        ],
        after: 'He asks whether he still has a job. You tell him the trust is looking for a manager. He says he will apply when the police are finished with him.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Ruth Tamsin — post-mortem note', caption: 'Blunt trauma · no soot · dead before fire', icon: 'blood', type: 'Forensic report',
        desc: 'A depressed fracture at the base of the skull. No soot in the airway. Ruth was dead before the fire reached her.',
        tells: 'The fire was set to cover a killing. This is not arson with a body; it is murder with a fire.'
      },
      'press-handle': {
        name: 'Missing press handle', caption: 'Scorched · dark stain · hair in the grain', icon: 'tool', type: 'Weapon',
        desc: 'The iron handle of the cider press, found three feet from the socket. There is a dark stain in the grain and a human hair caught in a crack.',
        tells: 'The murder weapon came from the barn. The killer used the press handle and left it in the ash.'
      },
      'accelerant-drum': {
        name: 'Five-gallon drum', caption: 'Clear amber liquid · smells of apples', icon: 'glass', type: 'Physical evidence',
        desc: 'A drum by the barn door, half full of a clear amber liquid that smells of apples and alcohol. The lid has been wrenched open.',
        tells: 'The accelerant was not petrol. It was something made on the farm.'
      },
      'cut-padlock': {
        name: 'Cut padlock', caption: 'Bolt croppers · before the fire', icon: 'tool', type: 'Physical evidence',
        desc: 'The barn padlock, cut through with bolt croppers. The cut edges are clean and not fire-damaged.',
        tells: 'Someone opened the barn before the fire. They had no key, but they had the right tool.'
      },
      'zigzag-boot': {
        name: 'Boot print in ash', caption: 'Size ten · zigzag tread', icon: 'footprint', type: 'Trace evidence',
        desc: 'A boot print in wet ash near the press, size ten with a zigzag tread.',
        tells: 'Someone stood beside the press after the fire was started. The tread can be matched.'
      },
      'brandy-trail': {
        name: 'Brandy trail', caption: 'Ring around the press · ends at drum', icon: 'glass', type: 'Scene mark',
        desc: 'A dark trail of liquid soaked into the floor, running in a ring around the press and ending at the drum.',
        tells: 'The accelerant was poured deliberately around the body and the press, not splashed randomly.'
      },
      'accelerant-result': {
        name: 'Accelerant result', caption: 'Apple brandy · 62% ABV', icon: 'chemical', type: 'Forensic analysis',
        desc: 'The accelerant is apple brandy at 62% ABV, distilled from the orchard’s own fruit.',
        tells: 'The fire was set with the farm’s own spirit. The still is the link to Aiden.'
      },
      'still-location': {
        name: 'Still behind the barn', caption: 'Copper pot · mash · brandy', icon: 'chemical', type: 'Scene mark',
        desc: 'A small copper still behind the barn, with a mash barrel of apple pulp and a demijohn of clear spirit.',
        tells: 'Aiden was distilling illegally. The brandy in the drum came from his still.'
      },
      'tree-sale': {
        name: 'Tree sale contract', caption: '40 mature trees · £62,000', icon: 'ledger', type: 'Contract',
        desc: 'A contract selling forty mature cider-apple trees to a landscape contractor for £62,000, signed by Aiden Tamsin.',
        tells: 'Aiden sold the orchard’s heritage stock without Ruth’s knowledge. The money never reached the farm account.'
      },
      'forged-signature': {
        name: 'Aiden’s signature', caption: 'Not Ruth’s hand', icon: 'note', type: 'Document',
        desc: 'A signature purporting to be Ruth’s on the tree sale contract, copied from her will rather than written naturally.',
        tells: 'Aiden forged Ruth’s signature. He had a motive to keep the accounts from being audited.'
      },
      'tractor-tracks': {
        name: 'Tractor tracks', caption: 'Barn → eastern row → barn', icon: 'car', type: 'Trace evidence',
        desc: 'Tractor tracks running from the barn to the new sapling row and back. The tread matches the farm’s old tractor.',
        tells: 'The tractor was used before the fire. Aiden drives it.'
      },
      'car-print': {
        name: 'Car tyre print', caption: 'Diagonal cut · came only to the barn', icon: 'car', type: 'Trace evidence',
        desc: 'A fresh tyre print from a small car with a diagonal cut in the tread, arriving at the barn and leaving without going to the house.',
        tells: 'Beatrix came to the barn, not the farmhouse. She may have seen something — or done something.'
      },
      'ruth-will': {
        name: 'Ruth’s will', caption: 'Orchard to the preservation trust', icon: 'letter', type: 'Document',
        desc: 'Ruth’s signed will leaving Hollow Orchard to a preservation trust, with Aiden as manager for life and an independent audit of the accounts.',
        tells: 'The trust would audit the accounts. Aiden’s fraud would be exposed in September.'
      },
      'audit-letter': {
        name: 'Solicitor’s letter', caption: '“Report the matter after the fair.”', icon: 'letter', type: 'Document',
        desc: 'A letter from Ruth’s solicitor confirming she had asked Aiden to explain the missing trees and loans, and would report him after the fair.',
        tells: 'Ruth had given Aiden a deadline. He killed her before it arrived.'
      },
      'loan-papers': {
        name: 'Forged loan papers', caption: '£58,000 · Ruth’s signature', icon: 'money', type: 'Financial record',
        desc: 'Loan papers for £58,000 secured against the orchard’s equipment, bearing Ruth’s forged signature.',
        tells: 'Aiden borrowed against the farm and forged his aunt’s name. The audit would have found it.'
      },
      'forged-loans': {
        name: 'Safe loan envelope', caption: '“AIDEN — LOANS — DO NOT LET HIM SELL”', icon: 'money', type: 'Financial record',
        desc: 'A brown envelope from Ruth’s safe containing the forged loan papers and a note: “He has taken the trees. He cannot take the orchard.”',
        tells: 'Ruth had already gathered the evidence. She was about to use it.'
      },
      'ruth-note': {
        name: 'Ruth’s note', caption: '“He cannot take the orchard.”', icon: 'note', type: 'Personal record',
        desc: 'A note in Ruth’s hand, found with the forged loans, stating that Aiden had taken the trees but could not take the orchard.',
        tells: 'Ruth knew about the fraud and was determined to stop the sale. She was not afraid of him — yet.'
      },
      'beatrix-contract': {
        name: 'Draft sale contract', caption: '£1.2m · vacant possession', icon: 'ledger', type: 'Contract',
        desc: 'A draft contract for Beatrix Voss to buy Hollow Orchard from Aiden for £1.2 million, conditional on vacant possession.',
        tells: 'Aiden was trying to sell land he did not own. Beatrix had a motive to want Ruth out of the way — but the contract was never signed.'
      },
      'spirit-order': {
        name: 'Spirit purchase order', caption: '20 gallons · 65% · signed Aiden', icon: 'receipt', type: 'Financial record',
        desc: 'An order for twenty gallons of apple spirit for “fortifying”, signed by Aiden. The orchard does not fortify its cider.',
        tells: 'Aiden was buying or making high-strength spirit. The still and the drum follow from it.'
      },
      'brandy-sample': {
        name: 'Brandy sample', caption: '62% ABV · apple · Aiden’s still', icon: 'chemical', type: 'Forensic evidence',
        desc: 'A sample of the burned drum’s contents, tested at 62% ABV and identified as apple brandy from Aiden’s still.',
        tells: 'The accelerant came from Aiden, not from Beatrix or the petrol station.'
      },
      'voicemail-ruth': {
        name: 'Ruth’s last voicemail', caption: '“Aiden is here.”', icon: 'audio', type: 'Audio evidence',
        desc: 'A voicemail left at 05:12, naming Aiden, the loans and the trust, and ending with a man’s voice telling Ruth to put the phone down.',
        tells: 'Aiden was in the barn with Ruth minutes before she died. His alibi is false.'
      },
      'fire-timeline': {
        name: 'Fire timeline', caption: '04:50 → 05:52', icon: 'clock', type: 'Analysis',
        desc: 'Aiden opened the barn, Ruth left the voicemail, the argument turned violent, the brandy was poured, the fire was lit, and Marek saw the smoke.',
        tells: 'Aiden had both the opportunity and the sequence of the killing. He was there before the fire.'
      },
      'aiden-alibi': {
        name: 'Aiden’s alibi', caption: '“Checking the frost.”', icon: 'audio', type: 'Statement',
        desc: 'Aiden claims he was in the east field checking the frost from 04:30 and saw the smoke on his way back.',
        tells: 'The voicemail places him in the barn at 05:12. He was not in the east field.'
      },
      'aiden-sale': {
        name: 'Aiden on the trees', caption: '“Ruth knew.”', icon: 'note', type: 'Statement',
        desc: 'Aiden claims Ruth approved the sale of the mature trees and signed the contract.',
        tells: 'The signature is a forgery. Ruth’s note says he took the trees without permission.'
      },
      'aiden-loans': {
        name: 'Aiden on the loans', caption: '“She gave me permission.”', icon: 'audio', type: 'Statement',
        desc: 'Aiden claims Ruth authorised the £58,000 loan against the orchard’s equipment.',
        tells: 'The signature is forged and Ruth’s envelope is marked “DO NOT LET HIM SELL”. His story collapses.'
      },
      'aiden-confession': {
        name: 'Aiden’s confession', caption: '“I did not mean to hit her.”', icon: 'audio', type: 'Statement',
        desc: 'Aiden admits the argument, the press handle and the fire, claiming he struck her in a struggle and panicked.',
        tells: 'He admits killing Ruth and burning the barn. The physical evidence matches his account.'
      },
      'beatrix-car': {
        name: 'Beatrix on the car', caption: '“I drove past and called the brigade.”', icon: 'note', type: 'Statement',
        desc: 'Beatrix admits driving past the barn at 05:30, seeing smoke and calling the fire brigade from the crossroads.',
        tells: 'Her car print is explained. She was not at the barn during the murder.'
      },
      'beatrix-contract-statement': {
        name: 'Beatrix on the contract', caption: '“Aiden approached me.”', icon: 'audio', type: 'Statement',
        desc: 'Beatrix says Aiden approached her with an offer to sell the orchard and she drafted a conditional contract.',
        tells: 'Aiden was trying to sell land he did not own. Beatrix was a willing buyer, not a killer.'
      },
      'beatrix-brandy': {
        name: 'Beatrix on the brandy', caption: '“Aiden’s still.”', icon: 'note', type: 'Statement',
        desc: 'Beatrix identifies the accelerant as Aiden’s apple brandy and says he had been distilling behind the barn for a year.',
        tells: 'The accelerant ties the fire directly to Aiden.'
      },
      'beatrix-deflect': {
        name: 'Beatrix’s deflection', caption: '“Aiden is a liar and a thief.”', icon: 'audio', type: 'Statement',
        desc: 'Beatrix points out that Aiden is dishonest and cowardly, and suggests the press handle will prove it.',
        tells: 'She is self-interested but accurate. The handle and the voicemail point to Aiden.'
      },
      'marek-sacking': {
        name: 'Marek on the sacking', caption: '“She said I could come back.”', icon: 'note', type: 'Statement',
        desc: 'Marek says Ruth sacked him for drinking but promised he could return after the fair if he stayed dry.',
        tells: 'Marek had no motive. He was trying to earn his job back, not lose it forever.'
      },
      'marek-discovery': {
        name: 'Marek’s discovery', caption: '“I burned my hand on the latch.”', icon: 'audio', type: 'Witness statement',
        desc: 'Marek describes opening the hot barn door, seeing Ruth under the press and running for the house.',
        tells: 'Marek arrived after the fire was set. His boot print in the ash has an innocent explanation.'
      },
      'marek-boot': {
        name: 'Marek on the boot print', caption: '“Every farm boot in the valley.”', icon: 'footprint', type: 'Statement',
        desc: 'Marek says his boots match the print because he walked through the ash when he found the body.',
        tells: 'The print is consistent with his rescue attempt, not the murder.'
      },
      'marek-key': {
        name: 'Marek on the key', caption: '“Only Ruth and Aiden.”', icon: 'note', type: 'Statement',
        desc: 'Marek says only Ruth and Aiden had a key to the new padlock, and that Aiden keeps bolt croppers on the tractor.',
        tells: 'Aiden had the means to open the barn. The cut padlock matches the bolt croppers.'
      }
    },
    solution: {
      minEvidence: 10,
      questions: [
        { q: 'Who killed Ruth Tamsin?', 
          options: [
            { t: 'Beatrix Voss — the rival who wanted the orchard', v: 'beatrix' },
            { t: 'Marek Nowak — the farmhand she sacked', v: 'marek' },
            { t: 'Aiden Tamsin — her nephew and farm manager', v: 'aiden' },
            { t: 'A contractor paid to clear the trees', v: 'contractor' }
          ], answer: 'aiden' },
        { q: 'How did Ruth die?', 
          options: [
            { t: 'Struck with the cider-press handle, then the barn was set alight', v: 'handle' },
            { t: 'Trapped in the barn and burned to death', v: 'burned' },
            { t: 'Hit by the tractor while Aiden was moving trees', v: 'tractor' },
            { t: 'Poisoned by fumes from the still before the fire', v: 'fumes' }
          ], answer: 'handle' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Ruth was about to expose Aiden’s forged loans and tree sales to the trust', v: 'loans' },
            { t: 'Ruth was going to sell the orchard to Beatrix without telling Aiden', v: 'sale' },
            { t: 'Aiden wanted the insurance money for the burned barn', v: 'insurance' },
            { t: 'Ruth had discovered Aiden was distilling brandy illegally', v: 'still' }
          ], answer: 'loans' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'Ruth’s voicemail naming Aiden, the brandy accelerant and the press handle', v: 'voicemail' },
            { t: 'Beatrix’s draft contract', v: 'contract' },
            { t: 'Marek’s boot print in the ash', v: 'boot' },
            { t: 'The insurance policy in Ruth’s safe', v: 'insurance' }
          ], answer: 'voicemail' }
      ],
      verdict: {
        who: 'Aiden Tamsin, 36 — Ruth’s nephew and manager of Hollow Orchard',
        whoDesc: 'was arrested at the orchard and charged with murder and arson. He pleaded guilty to manslaughter and arson; the murder charge was reduced after the court accepted a loss-of-control defence.',
        how: 'He opened the barn with bolt croppers, argued with Ruth about the trust audit, struck her with the cider-press handle, poured apple brandy around the press and set it alight.',
        why: 'Ruth had discovered the £62,000 tree sale and the £58,000 forged loan. She was going to report him after the fair, and the trust’s audit would have exposed the rest.',
        key: 'Ruth’s voicemail names Aiden in the barn at 05:12, the accelerant is his own apple brandy, and the press handle carries her blood and his boot print is in the ash.'
      },
      reveal: [
        'Hollow Orchard was never Aiden Tamsin’s. It was Ruth’s, and before her it was her father’s, and before him it belonged to a family that had pressed cider in the same barn since 1911. Aiden had worked there for twelve years and had never quite accepted that work was not the same as ownership.',
        'He started small: a few trees sold here, a loan taken there, a signature copied from a letter. The tree sale brought in £62,000 and the loans another £58,000, and none of it reached the orchard account. He told himself he was investing in the future. He told himself Ruth would understand.',
        'She did not. The trust’s audit was scheduled for September. Her solicitor had written to Aiden asking for an explanation. On the Thursday before the fair, Ruth told him she would report him to the police if he did not repay the money by Saturday.',
        'Aiden went to the barn before dawn on Friday. He cut the new padlock with the bolt croppers from the tractor, not because he had no key, but because he wanted it to look like an intruder. He was already thinking about how the fire would be explained.',
        'Ruth followed him. She called her solicitor and left a message naming him, the loans and the trust. Then she went to the barn to lock it. The argument was about the money, but it was also about twenty years of being the nephew who was never quite trusted.',
        'He hit her once with the press handle. She fell against the press and did not get up. He stood there for seven minutes, according to the fire timeline, and then he poured the brandy. It was his own spirit, sixty-two per cent, distilled behind the barn. He wanted the fire to burn hot and fast and destroy the accounts.',
        'It destroyed the barn, the press and the harvest records. It did not destroy the safe, the voicemail, the forged loans, or the brandy trail. It also did not destroy the smell. The fire officer noticed it before he noticed anything else: apples, not petrol.',
        'Beatrix Voss was cleared of any involvement. She bought the burned land from the trust for a reduced price, replanted it with her own stock, and named the new cider “Hollow Fire”. Marek Nowak was rehired as orchard manager. He does not drink on the job.',
        'Aiden Tamsin was sentenced to sixteen years. At the trial, the court heard Ruth’s last voicemail: “Aiden is here. He has the loan papers. I am going to the barn to lock the —” The recording ended with a man’s voice saying, “Put the phone down, Ruth.”',
        'The trust kept the original cider press. It stands in the new barn, restored and oiled, with a small plaque that reads: “RUTH TAMSIN — 1967–2025. SHE KNEW WHAT THE ORCHARD WAS WORTH.”'
      ],
      quote: 'He has taken the trees. He cannot take the orchard.',
      twist: 'The final detail was the padlock. Aiden had a key; he cut the lock anyway to make the fire look like the work of an intruder. That single piece of theatre put the bolt croppers in his hand, the barn opening at 04:50, and the whole timeline in front of the jury.'
    }
  });
})();
