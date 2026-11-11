/* ============================================================
   CASE 27 - HOUSE OF CONTRADICTIONS
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c27', num: 27,
    title: 'House of Contradictions',
    subtitle: 'Four people at dinner. One of them is lying about everything.',
    difficulty: 4, est: '40-50 min',
    cover: { kind: 'house', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Sir Peter Hallam, 67 - retired judge' },
      { k: 'Scene', v: 'The dining room, Wren House' },
      { k: 'Found', v: 'Friday, 22:40 - by the housekeeper' },
      { k: 'Official cause', v: 'Heart attack, signed by the family doctor' }
    ],
    briefing: [
      "Sir Peter Hallam sentenced people for thirty years. On Friday he invited three of them to dinner: his wife, his son, and the doctor who had been treating his heart. He was dead by the time the port was poured.",
      "The family doctor, Imogen Sable, signed the certificate at the house. Heart attack, natural causes, no post-mortem required. The paramedics had not arrived. The body was still warm.",
      "Everyone at that table has told a different version of the same ninety minutes. One of those versions is not a lie about a dinner. It is a lie about a murder. Your job is to find the seam."
    ],
    opening: 'Wren House is a cold, handsome building with too many clocks. In the dining room, four places are still set. One glass has been taken away. The rest have been polished clean.',
    objectives: [
      'Establish what killed Sir Peter and when.',
      'Recover the true sequence of the dinner hour.',
      'Expose the lie that holds the family story together.',
      'Find whose signature turned a murder into a natural death.'
    ],
    locations: [
      {
        id: 'dining', name: 'The Dining Room', short: 'Dining room', time: '23:10',
        art: { kind: 'house', mood: 'cold' },
        intro: 'Candles burned to stubs. A decanter of port sits at the head of the table, one glass beside it. Sir Peter is on the floor by his chair, napkin still tucked, face grey.',
        actions: [
          { id: 'body', label: 'Examine Sir Peter and the table', icon: 'blood', hotspot: { x: 50, y: 58 },
            desc: 'The glass, the napkin, the missing place',
            text: [
              "Sir Peter's lips and fingertips are blue. There is a faint yellow-green ring in the whites of his eyes. His own heart medication would not do that at this dose.",
              "The port glass beside his plate is empty except for a fine sediment. The decanter is nearly full. Only one person at this table drank port.",
              "A fourth place has been cleared and polished. The housekeeper says the doctor took her own glass to the kitchen before the ambulance arrived."
            ],
            gives: ['c27_body', 'c27_glass'],
            hint: 'The empty glass is the one that matters. The decanter is nearly full.'
          },
          { id: 'decanter', label: 'Test the port and the sediment', icon: 'chemical', puzzle: 'tox-mix',
            desc: 'What was in the glass?',
            gives: ['c27_tox'],
            hint: 'Run the screen in the right order: extraction, reagent, indicator. The yellow-green ring is the tell.'
          },
          { id: 'cards', label: 'Read the place cards and glasses', icon: 'users', puzzle: 'dinner-grid',
            desc: 'Who drank what, and who left the table',
            gives: ['c27_seating'],
            hint: 'Beatrice does not drink port. The doctor never drinks alcohol. The son argued about money.'
          }
        ]
      },
      {
        id: 'study', name: "Sir Peter's Study", short: 'Study', time: '23:45',
        art: { kind: 'office', mood: 'cold' },
        requires: ['c27_body'],
        intro: 'A judge\'s study: law reports, a photograph of a courtroom, a locked medicine cabinet behind the desk. The waste bin holds a torn envelope and a single blister pack.',
        actions: [
          { id: 'cabinet', label: 'Open the medicine cabinet', icon: 'keypad', puzzle: 'cabinet-pin',
            desc: 'Four-digit lock - a judgment date',
            gives: ['c27_pills'],
            hint: 'The framed judgment on the wall is dated 14 March. Use the day and month.'
          },
          { id: 'will', label: 'Read the new will', icon: 'note', puzzle: 'will-seq',
            desc: 'Three drafts, one signature',
            gives: ['c27_will'],
            hint: 'Follow the dates: draft, meeting, signature, revocation.'
          },
          { id: 'bea', label: 'Question Beatrice Hallam', icon: 'user', suspect: 'bea',
            desc: 'Wife - was in the kitchen when he fell' }
        ]
      },
      {
        id: 'surgery', name: "Dr Sable's Surgery", short: 'Surgery', time: '00:30',
        art: { kind: 'lab', mood: 'cold' },
        requires: ['c27_pills'],
        intro: 'A private clinic on the high street, all pale wood and soft lighting. The appointment book is open. A locked drugs cupboard stands behind the desk, its key still in the lock.',
        actions: [
          { id: 'imogen', label: 'Question Dr Imogen Sable', icon: 'user', suspect: 'imogen',
            desc: 'Family doctor - signed the certificate' },
          { id: 'cert', label: 'Audit the death certificates', icon: 'terminal', puzzle: 'cert-term',
            desc: 'Eleven care-home deaths in eighteen months',
            gives: ['c27_certs'],
            hint: 'Read the causes of death. The same signature, the same phrase, the same missing post-mortem.'
          },
          { id: 'drugs', label: 'Check the drugs cupboard', icon: 'pill',
            desc: 'Digoxin stock against the register',
            text: [
              "The digoxin register shows forty tablets received and thirty-six accounted for. Four are missing. The entry beside the gap is a dash, not a signature.",
              "A box of empty gelatine capsules sits on the shelf, the kind a doctor uses to make up a compound. Two capsules are missing from the blister.",
              "The cupboard key is still in the lock. Imogen Sable is the only person with a key, and she left it open for you to find."
            ],
            gives: ['c27_drugs'],
            hint: 'Four digoxin tablets and two empty capsules are unaccounted for.'
          }
        ]
      },
      {
        id: 'garden', name: 'The Garden', short: 'Garden', time: '01:20',
        art: { kind: 'greenhouse', mood: 'night' },
        requires: ['c27_glass'],
        intro: 'A walled garden with a burning bin still warm at the corner. The housekeeper, Mrs Okafor, is standing by the back door with her coat on, waiting to be asked the right question.',
        actions: [
          { id: 'okafor', label: 'Question Mrs Okafor', icon: 'user',
            desc: 'Housekeeper - saw who left the table',
            text: [
              "Mrs Okafor served the main course at 21:50. At 22:05 she saw Dr Sable leave the dining room with her medical bag and go into the study. She was there for six minutes.",
              "At 22:20 she heard Sir Peter shout. Not a word, just a sound. By the time she reached the dining room, he was on the floor and Dr Sable was already kneeling beside him.",
              "At 22:35 Dr Sable asked her to take the doctor\'s glass to the kitchen and wash it. Mrs Okafor did not. It is still wrapped in a tea towel by the sink."
            ],
            gives: ['c27_witness'],
            hint: 'The housekeeper can put the doctor out of the room and give you the glass.'
          },
          { id: 'bin', label: 'Search the burning bin', icon: 'search',
            desc: 'A melted syringe and a foil cap',
            text: [
              "The bin holds ash, a melted plastic barrel and a foil cap stamped with a pharmacy batch number. The batch matches the digoxin box in the surgery.",
              "There is a single glass ampoule fragment, the kind used for injectable digoxin. It has been heated until it cracked.",
              "The bin was lit recently. The ash is still warm and the garden is cold."
            ],
            gives: ['c27_syringe'],
            hint: 'The foil cap and ampoule match the surgery\'s digoxin batch.'
          },
          { id: 'glass', label: 'Recover the washed glass', icon: 'glass',
            desc: 'A residue in the stem',
            text: [
              "The glass is still wrapped in the tea towel. It has been rinsed, not washed. There is a pale ring of sediment in the hollow stem that water cannot reach.",
              "The sediment smells faintly bitter and leaves a yellow-green stain on the cloth.",
              "A second glass on the draining board is clean. Only one glass at the table was used by the doctor."
            ],
            gives: ['c27_glass2'],
            hint: 'The stem was not washed. The residue is still there.'
          }
        ]
      }
    ],
    puzzles: {
      'cabinet-pin': {
        type: 'keypad', title: 'Medicine Cabinet', subtitle: 'Four-digit judgment date', icon: 'keypad',
        deviceLabel: 'CABINET - HALLAM', length: 4, code: '1403',
        prompt: 'The cabinet lock is set to a date Sir Peter used for everything. The only framed judgment on the wall is dated 14 March 1998.',
        hintText: 'Day and month, four digits: 14 March is 1403.',
        success: 'The cabinet opens on a pill organiser. The digoxin compartment has been refilled with plain white capsules that are not digoxin.',
        gives: ['c27_pills'], flags: ['cabinetOpen'],
        short: 'The digoxin was swapped for placebos.',
        log: 'Sir Peter\'s pill organiser contains white placebo capsules where his digoxin should be. The real tablets are missing from the surgery.'
      },
      'tox-mix': {
        type: 'mix', title: 'Toxicology Screen', subtitle: 'The port glass', icon: 'chemical',
        prompt: 'Run the screen on the sediment from the port glass. Add the reagents in the correct order and read the colour.',
        reagents: [
          { name: 'Solvent extraction', color: '#c9b28a' },
          { name: 'Digoxin reagent', color: '#f4f4f0' },
          { name: 'Indicator', color: '#a3e635' }
        ],
        order: [0, 1, 2],
        note: 'Extract first, then bind the glycoside, then add indicator. Indicator before extraction turns everything green and proves nothing.',
        hintText: 'Extraction, reagent, indicator. A yellow-green result means digoxin.',
        success: 'The indicator turns yellow-green. The port contained a therapeutic drug at a lethal dose - enough to stop a damaged heart within minutes.',
        gives: ['c27_tox'], flags: ['toxDone'],
        short: 'The port was dosed with digoxin.',
        log: 'The port glass contained a lethal dose of digoxin. Sir Peter\'s own prescription was replaced with placebos, so his heart had no tolerance.'
      },
      'dinner-grid': {
        type: 'logicgrid', title: 'The Dinner Table', subtitle: 'Who drank what, and who left', icon: 'users',
        prompt: 'Match each guest to their drink and their movement during dinner. Every statement from the family should agree with this grid. One does not.',
        rows: [
          { label: 'Beatrice', selects: [
            { label: 'drink', options: [{ t: 'Port', v: 'port' }, { t: 'Claret', v: 'claret' }, { t: 'Tonic water', v: 'tonic' }], answer: 'claret' },
            { label: 'left table', options: [{ t: 'Stayed seated', v: 'stayed' }, { t: 'Went to kitchen', v: 'kitchen' }, { t: 'Went to study', v: 'study' }], answer: 'kitchen' }
          ] },
          { label: 'Theo', selects: [
            { label: 'drink', options: [{ t: 'Port', v: 'port' }, { t: 'Claret', v: 'claret' }, { t: 'Tonic water', v: 'tonic' }], answer: 'port' },
            { label: 'left table', options: [{ t: 'Stayed seated', v: 'stayed' }, { t: 'Went to kitchen', v: 'kitchen' }, { t: 'Went to study', v: 'study' }], answer: 'stayed' }
          ] },
          { label: 'Imogen', selects: [
            { label: 'drink', options: [{ t: 'Port', v: 'port' }, { t: 'Claret', v: 'claret' }, { t: 'Tonic water', v: 'tonic' }], answer: 'tonic' },
            { label: 'left table', options: [{ t: 'Stayed seated', v: 'stayed' }, { t: 'Went to kitchen', v: 'kitchen' }, { t: 'Went to study', v: 'study' }], answer: 'study' }
          ] }
        ],
        hintText: 'The wife does not drink port. The doctor never drinks alcohol. The son argued about money and stayed at the table.',
        success: 'The grid locks: Beatrice drank claret and went to the kitchen, Theo drank port and stayed, Imogen drank tonic and went to the study.',
        gives: ['c27_seating'], flags: ['gridDone'],
        short: 'Imogen left the table for the study.',
        log: 'The place-card grid places Imogen in the study during dinner, not at the table. Her account is impossible.'
      },
      'will-seq': {
        type: 'sequence', title: 'The New Will', subtitle: 'Four documents, one signature', icon: 'note',
        prompt: 'Put the will documents in order. The dates show a man changing his mind, then changing it back.',
        variant: 'strips',
        items: [
          { t: 'First draft - Theo inherits everything', sub: '12 March' },
          { t: 'Meeting with the solicitor', sub: '14 March' },
          { t: 'Second draft - clinic trust created', sub: '15 March' },
          { t: 'Signed copy - Theo disinherited', sub: '18 March' }
        ],
        success: 'The signed will leaves the estate to a clinic trust and cuts Theo out. That is Theo\'s motive - and it is not the murder.',
        gives: ['c27_will'], flags: ['willRead'],
        short: 'Theo was disinherited three days before the dinner.',
        log: 'The signed will disinherits Theo and creates a clinic trust. Theo had a motive, but the will explains his anger, not the poison.'
      },
      'cert-term': {
        type: 'terminal', title: 'Certificate Audit', subtitle: 'Care-home deaths', icon: 'terminal',
        user: 'registrar', host: 'county-coroner', password: 'sable',
        intro: 'County death registration audit. Type help for commands.',
        banner: 'DR I. SABLE - CERTIFICATES SIGNED - 18 MONTHS',
        files: [
          { name: 'certs.log', body: 'CARE HOME - ELMHURST<br>11 deaths - all signed I. SABLE<br>Cause: <b>natural causes - cardiac</b><br>Post-mortem: <span class="r">none requested</span><br><br><span class="d">All 11 within 24 hours of a drug round.</span>' },
          { name: 'flag.txt', body: '<span class="g">SIR PETER HALLAM</span> - circuit judge, retired<br>Complaint filed: <b>14 March</b><br>Subject: falsified death certificates, Elmhurst<br><span class="r">Hearing listed for Monday.</span>' },
          { name: 'stock.txt', body: 'DIGOXIN - surgery stock<br>Received: 40<br>Dispensed: 36<br><span class="r">Unaccounted: 4</span><br>Last register entry: dash, unsigned.<br><span class="d">Sable is sole keyholder.</span>' }
        ],
        hintText: 'Read the complaint date and the eleven deaths. The judge was about to hear the case against her.',
        success: 'The audit finds eleven care-home deaths signed by Imogen Sable without post-mortems, and Sir Peter\'s complaint listed for Monday. She had everything to lose.',
        gives: ['c27_certs'], flags: ['certRead'],
        short: 'Peter was about to hear the case against Imogen.',
        log: 'Imogen signed eleven care-home death certificates without post-mortems. Sir Peter had filed a complaint and the hearing was set for Monday.'
      }
    },
    clues: {
      'c27_body': { name: 'Blue lips, green-ringed eyes', caption: 'Digoxin toxicity - not a simple heart attack', icon: 'blood', type: 'Forensic observation',
        desc: 'Blue lips and fingertips, with a yellow-green ring in the eyes. The signs fit acute digoxin toxicity, not an unheralded heart attack.',
        tells: 'His heart was stopped by a drug, not disease.' },
      'c27_glass': { name: 'The port glass', caption: 'Bitter sediment - only one drinker', icon: 'glass', type: 'Physical evidence',
        desc: 'The empty port glass holds a fine bitter sediment. Only one person at the table drank port, and that glass was cleared before the ambulance.',
        tells: 'The poison was in the glass, and someone removed it from the table.' },
      'c27_seating': { name: 'Dinner place-card grid', caption: 'Imogen left for the study at 22:05', icon: 'users', type: 'Reconstruction',
        desc: 'The place cards and drinks place Beatrice in the kitchen, Theo at the table, and Imogen out of the room for six minutes before the port was poured.',
        tells: 'Imogen was alone in the study with her medical bag immediately before Sir Peter collapsed.' },
      'c27_tox': { name: 'Toxicology result', caption: 'Lethal digoxin in the port', icon: 'chemical', type: 'Forensic analysis',
        desc: 'The sediment contains digoxin at a lethal concentration. The dose would stop a compromised heart in minutes.',
        tells: 'This was a deliberate overdose, administered at the table.' },
      'c27_pills': { name: 'Swapped medication', caption: 'Placebo capsules in the organiser', icon: 'pill', type: 'Physical evidence',
        desc: 'Sir Peter\'s digoxin compartment has been refilled with plain white capsules. The real tablets are missing from the surgery.',
        tells: 'Someone with medical knowledge disabled his tolerance before the dinner, so a normal dose became lethal.' },
      'c27_drugs': { name: 'Drug register gap', caption: 'Four digoxin missing - unsigned entry', icon: 'ledger', type: 'Document',
        desc: 'Four digoxin tablets and two gelatine capsules are unaccounted for in Imogen\'s cupboard. The register entry is an unsigned dash.',
        tells: 'Imogen took the drug and the means to capsule it. She is the only keyholder.' },
      'c27_certs': { name: 'Eleven certificates', caption: 'No post-mortems - same signature', icon: 'note', type: 'Document',
        desc: 'Eleven care-home deaths in eighteen months, all certified by Imogen Sable as natural cardiac deaths, none referred for post-mortem.',
        tells: 'She had a pattern of hiding deaths behind her signature - and Sir Peter was about to expose it.' },
      'c27_will': { name: 'Signed will', caption: 'Theo disinherited - clinic trust created', icon: 'note', type: 'Document',
        desc: 'Three days before the dinner, Sir Peter signed a will that cut Theo out and left the estate to a clinic trust.',
        tells: 'Theo had a motive for anger, but the will does not put digoxin in the port.' },
      'c27_witness': { name: "Mrs Okafor's statement", caption: 'Imogen in the study at 22:05 - six minutes', icon: 'eye', type: 'Witness statement',
        desc: 'The housekeeper saw Imogen leave the table with her medical bag at 22:05 and return from the study six minutes later. Sir Peter collapsed at 22:20.',
        tells: 'Imogen was out of the room long enough to fetch the digoxin and return before dinner ended.' },
      'c27_syringe': { name: 'Burnt syringe', caption: 'Digoxin ampoule - surgery batch', icon: 'chemical', type: 'Physical evidence',
        desc: 'A melted syringe, a glass ampoule fragment and a foil cap from the surgery\'s digoxin batch, burned in the garden bin.',
        tells: 'She drew up the drug and tried to destroy the evidence the same night.' },
      'c27_glass2': { name: 'Rinsed glass residue', caption: 'Sediment trapped in the stem', icon: 'glass', type: 'Physical evidence',
        desc: 'Imogen\'s own glass was rinsed, not washed. Sediment trapped in the stem matches the port glass and the toxicology result.',
        tells: 'She drank from a dosed glass too - or used it to carry the drug. Either way she handled it.' },
      'c27_theo': { name: "Theo's public threat", caption: 'You will not cut me out - shouted at dinner', icon: 'user', type: 'Red herring',
        desc: 'Theo shouted that his father would not cut him out of the will. Two guests heard it. He was loud, drunk and at the table when Peter collapsed.',
        tells: 'Theo had a motive and a temper, but he had no access to digoxin and never left the table.' },
      'c27_bea': { name: "Beatrice's affair", caption: 'A divorce solicitor - not a poisoner', icon: 'letter', type: 'Red herring',
        desc: 'Beatrice had been seeing a divorce solicitor for six weeks. The papers were served on Thursday. She was in the kitchen when Peter fell.',
        tells: 'She wanted out of the marriage, not the estate. The kitchen staff confirm she was there.' }
    },
    suspects: [
      {
        id: 'imogen', name: 'Dr Imogen Sable', role: 'Family doctor - signed the death certificate', location: 'surgery', locationName: 'The surgery',
        tag: 'Primary suspect', portrait: { seed: 'imogen-sable', hair: 'bob', hairColor: '#8a7a62', skin: 1, expression: 'cold', collar: 'blouse' },
        intro: 'Imogen is calm, precise and faintly amused. She calls Sir Peter a difficult patient and the dinner a tragedy. She has already used the word natural four times.',
        questions: [
          { q: 'Where were you when Sir Peter collapsed?', a: 'At the table. I had just poured the port. We were all together until he fell. Nobody left the room.', gives: ['c27_seating'],
            follow: 'Mrs Okafor watched her leave at 22:05 with her medical bag and return six minutes later. The place-card grid says the same.' },
          { q: 'Why did you sign the certificate at the house?', a: 'He had a long cardiac history. I was his doctor. It was obvious. There was no need to trouble the coroner.', requires: ['c27_body'], gives: ['c27_body'],
            follow: 'Blue lips, green-ringed eyes and a bitter glass are not obvious cardiac history. They are a tox screen.' },
          { q: 'Did you prescribe digoxin to Sir Peter?', a: 'Yes. A low maintenance dose. His organiser was checked every week. There was nothing wrong with it.', requires: ['c27_pills'], gives: ['c27_pills'],
            follow: 'The organiser holds placebo capsules. The real tablets are missing from her cupboard, four of them, unaccounted.' },
          { q: 'Four digoxin tablets are missing from your register. Where are they?', a: 'A counting error. I have a busy practice. If every missing tablet were a murder, the county would be empty.', requires: ['c27_tox'], gives: ['c27_drugs'],
            follow: 'Four tablets, two gelatine capsules and a melted syringe in her garden bin. That is not a counting error.' },
          { q: 'Why did you wash your glass before the ambulance came?', a: 'I did not. Mrs Okafor is confused. She is old and she was frightened.', requires: ['c27_glass2'], gives: ['c27_glass2'],
            follow: 'The glass is still in the tea towel. Her sediment is in the stem.' },
          { q: 'What was Sir Peter going to do on Monday?', a: 'I have no idea. He was retired. He had opinions, not cases.', requires: ['c27_certs'], gives: ['c27_certs'],
            follow: 'The coroner\'s list has his complaint against her listed for Monday. Eleven deaths, no post-mortems, her signature.' }
        ],
        after: 'She asks whether you have spoken to the coroner yet. It is the first question that sounds like fear.'
      },
      {
        id: 'theo', name: 'Theo Hallam', role: 'Son - disinherited three days earlier', location: 'dining', locationName: 'The dining room',
        tag: 'Red herring', portrait: { seed: 'theo-hallam', hair: 'wavy', hairColor: '#3a2418', skin: 2, expression: 'angry', collar: 'suit' },
        intro: 'Theo is red-eyed and still drunk. He admits the shouting. He admits the will. He does not pretend to be sorry his father is dead.',
        questions: [
          { q: 'Did you threaten your father?', a: 'I said he could not cut me out. I was shouting about money. I did not kill him. I was at the table when he fell - everyone saw me.', gives: ['c27_theo'],
            follow: 'Two guests and the housekeeper place him at the table. He never went near the port decanter.' },
          { q: 'Why were you disinherited?', a: 'Because I am a disappointment. Because he wanted to leave everything to a clinic for people who never worked a day. He told me at dinner.', requires: ['c27_will'], gives: ['c27_will'],
            follow: 'The will is signed. The clinic trust is real. Theo loses everything, but he did not have the drug.' },
          { q: 'Do you know Dr Sable well?', a: 'She has been his doctor for years. She was at the house more than I was. She poured his drinks. She signed his death like a receipt.', requires: ['c27_theo'],
            follow: 'The last sentence is drunk, but it is also accurate.' }
        ]
      },
      {
        id: 'bea', name: 'Beatrice Hallam', role: 'Wife - serving divorce papers', location: 'study', locationName: 'The study',
        tag: 'Witness', portrait: { seed: 'beatrice-hallam', hair: 'long', hairColor: '#b8b0a4', skin: 1, expression: 'tired', collar: 'dress' },
        intro: 'Beatrice is composed and exhausted. She had planned to leave her husband and does not hide it. She was in the kitchen when he fell, arguing with the caterer about sorbet.',
        questions: [
          { q: 'Did you want your husband dead?', a: 'I wanted him divorced. There is a difference. The papers were served on Thursday. I was in the kitchen from ten past ten until I heard him shout.', gives: ['c27_bea'],
            follow: 'The caterer and two staff confirm she was in the kitchen.' },
          { q: 'Who was at the table when he fell?', a: 'Theo. Imogen. Me, for the first half. Imogen left with her bag at one point. She said she had a call.', requires: ['c27_witness'], gives: ['c27_witness'],
            follow: 'That matches the housekeeper and the place-card grid.' },
          { q: 'What was Sir Peter like with Dr Sable?', a: 'Polite. Cold. He had asked her about Elmhurst. She laughed and said there was nothing to ask. He did not laugh.', requires: ['c27_certs'], gives: ['c27_certs'],
            follow: 'Elmhurst is the care home. The complaint was filed that same week.' }
        ]
      }
    ],
    timeline: [
      { time: '21:30', text: 'Sir Peter, Beatrice, Theo and Imogen sit down to dinner.' },
      { time: '21:50', text: 'Main course served. Theo argues about the will.' },
      { time: '22:05', text: 'Imogen leaves the table with her medical bag and goes to the study.' },
      { time: '22:11', text: 'Imogen returns and pours the port.' },
      { time: '22:20', text: 'Sir Peter collapses. Mrs Okafor hears the shout.' },
      { time: '22:27', text: 'Imogen signs the death certificate at the house.' },
      { time: '22:35', text: 'Imogen asks the housekeeper to wash the glasses.' },
      { time: '22:40', text: 'The housekeeper calls the family and then the police.' },
      { time: '23:05', text: 'The garden bin is lit.' }
    ],
    links: [
      { a: 'c27_witness', b: 'imogen', note: 'Mrs Okafor puts Imogen in the study during dinner.' },
      { a: 'c27_drugs', b: 'imogen', note: 'The missing digoxin and capsules are from her locked cupboard.' },
      { a: 'c27_tox', b: 'imogen', note: 'The lethal drug is the one she prescribes and controls.' },
      { a: 'c27_certs', b: 'imogen', note: 'Her signature hid eleven deaths, and Peter was about to expose it.' },
      { a: 'c27_syringe', b: 'imogen', note: 'The burnt syringe matches her surgery batch.' }
    ],
    forensics: {
      prompt: 'Two samples from the case. Match each to its source.',
      samples: [
        { id: 'dig', type: 'DRUG', label: 'Port sediment', mark: 'digoxin, lethal concentration' },
        { id: 'cap', type: 'TRACE', label: 'Garden bin foil cap', mark: 'digoxin ampoule batch 1142' }
      ],
      candidates: [
        { id: 'surgery', label: "Dr Sable's surgery" },
        { id: 'pills', label: "Sir Peter's own capsules" },
        { id: 'kitchen', label: 'The kitchen sherry' }
      ],
      answer: { dig: 'surgery', cap: 'surgery' },
      success: 'Both samples match the surgery\'s digoxin batch. The drug came from Imogen\'s cupboard, not the victim\'s own medicine.'
    },
    documents: [
      { id: 'cert', title: 'Death certificate - Sir Peter Hallam', sub: 'Completed at the house', body: '<div class="doc-sheet"><b>MEDICAL CERTIFICATE OF CAUSE OF DEATH</b><br>Name: <b>Sir Peter Hallam</b><br>Cause: <b>1(a) Acute cardiac arrest</b><br>&nbsp; &nbsp; &nbsp; &nbsp; <b>2. Ischaemic heart disease</b><br>Signed: <b>Dr I. SABLE</b><br>Place: Wren House<br><br><span class="d">Referred to coroner: NO. Post-mortem: NO.</span><br><span class="d">Certificate completed before ambulance arrival.</span></div>',
        question: 'Why is the certificate suspicious?', options: [
          { t: 'It was completed before the paramedics arrived and waived a post-mortem', v: 'a' },
          { t: 'It names the wrong cause of death', v: 'b' },
          { t: 'It was signed by a family member', v: 'c' }
        ],
        answer: 0, gives: ['c27_certs'],
        log: 'Imogen completed the death certificate at the house before the ambulance arrived and waived the post-mortem.',
        wrong: 'Look at when and where it was signed.' },
      { id: 'willdoc', title: 'Last will - 18 March', sub: 'Signed copy', body: '<div class="doc-sheet"><b>HALLAM - LAST WILL AND TESTAMENT</b><br>Dated: <b>18 March</b><br><br>Clause 4: I leave the residue of my estate to the <b>Hallam Clinic Trust</b>.<br>Clause 5: <s>My son Theo Hallam</s> - no provision.<br><br><span class="d">Signed: Sir Peter Hallam. Witness: solicitor.</span><br><span class="d">Previous will dated 12 March revoked.</span></div>',
        question: 'What does the will establish?', options: [
          { t: 'Theo had a motive for anger but not for poison', v: 'a' },
          { t: 'Theo inherited the estate', v: 'b' },
          { t: 'The will was unsigned', v: 'c' }
        ],
        answer: 0, gives: ['c27_will'],
        log: 'The signed will disinherits Theo and creates a clinic trust. It explains the shouting, not the digoxin.',
        wrong: 'Read who inherits and who is cut out.' }
    ],
    audioCalls: [
      { id: 'c27-999', title: 'Emergency call - Wren House', sub: 'Beatrice reports the collapse', cue: 'Under Beatrice\'s voice: Imogen in the background saying, I am his doctor, I will sign, then a glass being set down hard, then the tap running.', pattern: [420, 0, 300, 420, 0, 300], tone: 'triangle',
        options: [
          { t: 'Imogen was already controlling the scene', v: 'a' },
          { t: 'Imogen was outside waiting for the ambulance', v: 'b' },
          { t: 'The call was made from the surgery', v: 'c' }
        ],
        answer: 0, gives: ['c27_witness'], flag: 'callHeard',
        log: 'The emergency call captures Imogen announcing she will sign the certificate, then the sound of a glass and running water.',
        wrong: 'Listen to who is speaking in the background and what the tap is doing.' }
    ],
    mapTask: {
      q: 'Which route fits the housekeeper, the place cards and the certificate?', options: [
        { t: 'Dining room -> study 22:05 -> dining room 22:11 -> certificate', v: 'a' },
        { t: 'Dining room -> garden -> surgery -> return at midnight', v: 'b' },
        { t: 'Study -> kitchen -> dining room without leaving the table', v: 'c' }
      ],
      answer: 0, gives: ['c27_seating'],
      log: 'Imogen left the table for the study at 22:05, returned at 22:11, and signed the certificate after Peter collapsed.',
      wrong: 'The housekeeper and the place cards both place her in the study before the collapse.' },
    redHerrings: [
      { clue: 'c27_theo', label: "Theo's shouted threat", clearedBy: ['c27_theo', 'c27_seating'], note: 'Theo was at the table when Peter fell. He had a motive but no access to digoxin.' },
      { clue: 'c27_bea', label: "Beatrice's divorce papers", clearedBy: ['c27_bea', 'c27_witness'], note: 'Beatrice was in the kitchen with the caterer. She wanted a divorce, not a funeral.' }
    ],
    contradictions: [
      { suspect: 'imogen', statement: 0, evidence: ['c27_witness', 'c27_seating'],
        expose: 'Mrs Okafor watched her leave for the study at 22:05 and the place-card grid confirms it. She was not at the table until he fell.',
        wrong: 'The housekeeper and the dinner grid both put her out of the room.' },
      { suspect: 'imogen', statement: 2, evidence: ['c27_pills', 'c27_tox'],
        expose: 'The organiser holds placebos and the port contained a lethal dose. His medication was not fine; it was neutralised.',
        wrong: 'The pills in the organiser are not digoxin.' },
      { suspect: 'imogen', statement: 4, evidence: ['c27_glass2'],
        expose: 'The rinsed glass still holds sediment in the stem. She handled the glass before the ambulance arrived.',
        wrong: 'The glass was rinsed, not washed. The stem kept the evidence.' },
      { suspect: 'imogen', statement: 5, evidence: ['c27_certs'],
        expose: 'His complaint against her was listed for Monday. She knew exactly what he was going to do.',
        wrong: 'The coroner\'s list has the complaint and her name.' }
    ],
    solution: {
      minEvidence: 8,
      questions: [
        { kind: 'suspect', q: 'Who killed Sir Peter Hallam?', options: [
          { t: 'Dr Imogen Sable - family doctor', v: 'imogen' },
          { t: 'Theo Hallam - disinherited son', v: 'theo' },
          { t: 'Beatrice Hallam - his wife', v: 'bea' },
          { t: 'Mrs Okafor - the housekeeper', v: 'okafor' }
        ], answer: 'imogen' },
        { kind: 'method', q: 'How was he killed?', options: [
          { t: 'His digoxin was replaced with placebos, then a lethal dose was put in his port', v: 'digoxin' },
          { t: 'He was smothered during the night', v: 'smother' },
          { t: 'He had a genuine heart attack brought on by the argument', v: 'heart' },
          { t: 'He was poisoned by the kitchen at dinner', v: 'kitchen' }
        ], answer: 'digoxin' },
        { kind: 'motive', q: 'Why was he killed?', options: [
          { t: 'He was about to expose her falsified care-home death certificates', v: 'expose' },
          { t: 'He was changing his will in her favour', v: 'will' },
          { t: 'She was in love with Theo', v: 'affair' },
          { t: 'He refused to pay her medical fees', v: 'fees' }
        ], answer: 'expose' },
        { kind: 'evidence', q: 'Which contradiction breaks her story?', options: [
          { t: 'She claimed to be at the table while the housekeeper put her in the study', v: 'table' },
          { t: 'She claimed the port was unopened', v: 'port' },
          { t: 'She claimed Theo poured the port', v: 'theo' },
          { t: 'She claimed the certificate was signed at the surgery', v: 'cert' }
        ], answer: 'table' }
      ],
      verdict: {
        who: "Dr Imogen Sable",
        whoDesc: ", the family doctor, was charged with the murder of Sir Peter Hallam.",
        how: "She replaced his digoxin with placebos, then put a lethal dose in his port while the housekeeper saw her leave for the study. She signed the certificate before the paramedics arrived.",
        why: "Sir Peter was about to expose the care-home death certificates she had falsified for years. One signature from him would have ended her career and her freedom.",
        key: "The place-card grid and the housekeeper's account that put her in the study when she claimed to be at the table."
      },
      reveal: [
        "The dinner had four versions because four people needed something unsaid. Only one of them needed the time of death to stay soft.",
        "The organiser in her bag held placebos, not digoxin. Peter's heart had been running unmedicated for days before the port finished what the swapped pills began.",
        "Theo shouted at his father and lost his inheritance twice: once on paper, once in the will. Beatrice wanted a divorce. Neither of them carried the bag with the pills."
      ],
      quote: "A natural death is a story someone signs.",
      twist: "The certificate was signed at 22:40. The paramedics logged the call at 22:52. Imogen had already decided what killed him."
    }
  });
})();
