/* ============================================================
   CASE 11 — THE BONE ORCHARD
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c11', num: 11,
    title: 'The Bone Orchard',
    subtitle: 'A meat wholesaler is found frozen in his own cold room, and every vet certificate is signed in the same green ink.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'shop', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Anton Weiss, 44 — meat wholesaler' },
      { k: 'Scene', v: 'Weiss & Sons, cold room two' },
      { k: 'Found', v: '05:50 — by the morning driver' },
      { k: 'Cause', v: 'Blunt force to the skull, then frozen' }
    ],
    briefing: [
      'Weiss & Sons has supplied half the city’s butchers for three generations. At five in the morning the delivery driver found Anton Weiss hanging from a meat hook in cold room two, frozen stiff, with a neat hole in the back of his skull and his own coat folded on a stool.',
      'The cold room was running at minus twenty-two. The thermostat had been turned down by hand. Anton had been dead for hours before he went in there — the pathologist can tell from the way the blood had settled before it froze.',
      'The plant’s veterinary certificates are kept in a safe behind the counter. Every certificate for the last eight months is signed by Dr Eli Croft in the same green ink. Every one certifies a carcass fit for human consumption. Half the animals never saw the inside of his clinic.',
      'A wholesaler frozen among his own stock. A vet who signs without looking. A foreman with a record. The meat trade has always been a business of trust, which is another word for paper.'
    ],
    opening: 'Cold room two is a white box with a hook in the ceiling. The air tastes of iron. Somewhere beyond the door, the plant is already running again, because meat does not stop for the dead.',
    objectives: [
      'Establish how and when Anton Weiss died.',
      'Trace the green ink on the veterinary certificates.',
      'Find out what was really leaving the loading bay at night.',
      'Identify who had a reason to freeze the body — and the paperwork.'
    ],
    locations: [
      {
        id: 'cold', name: 'Cold room two', short: 'Cold room', time: '06:20',
        art: { kind: 'shop', mood: 'cold' },
        intro: 'The room is a white tiled box, four degrees below freezing and dropping. Anton Weiss hangs from a steel hook, his hands tied behind him with butcher’s twine. His coat is folded neatly on a stool, which is the detail that will not leave you.',
        actions: [
          { id: 'scene', label: 'Examine the body and the room', icon: 'blood', hotspot: { x: 48, y: 52 },
            desc: 'The hook, the coat, the thermostat',
            text: [
              'Anton Weiss is forty-four, broad through the shoulders, with the hands of a man who still cut his own meat. The wound at the back of his skull is a clean, round depression about the width of a thumb. There is no blood on the floor. There would not be — the room took it.',
              'The thermostat is set to minus twenty-two. Beside it, a maintenance log runs in half-hourly rows. The last three entries have been made in a different hand from the rest: <b>23:10, door open. 23:40, door closed. 00:10, set to -22.</b>',
              'His coat is folded on the stool. In the inside pocket: a pocket recorder, still working, and a folded certificate with writing on the back.'
            ],
            gives: ['body-note', 'thermostat-log', 'coat-recorder'],
            hint: 'Start with the body and the room. The thermostat log has been written by two different hands.'
          },
          { id: 'hook', label: 'Inspect the overhead meat hook', icon: 'tool', hotspot: { x: 52, y: 20 },
            desc: 'The hook and its housing',
            requires: ['body-note'],
            text: [
              'The hook is a standard gambrel, rated for a side of beef. It has been wiped, but not well. In the thread of the mounting bolt there is a single dark fibre and a smear of something that is not animal blood.',
              'More important is the chain hoist above it. To hang a grown man you need the hoist. To work the hoist you need the key that unlocks the chain box — and the key is on a hook by the office door, where the foreman keeps it.',
              'The hook itself did not kill him. The hole in his skull is too small and too round. Something like a captive-bolt gun made that.'
            ],
            gives: ['hook-fibre'],
            hint: 'The chain hoist needs a key. Find out who can reach it.'
          },
          { id: 'seal', label: 'Check the door seal and drain', icon: 'search', hotspot: { x: 79, y: 74 },
            desc: 'Rubber seal, floor drain, scratches',
            requires: ['body-note'],
            text: [
              'The rubber seal around the door is intact except at the bottom, where it has been torn. There are fresh scuff marks on the stainless threshold, two parallel lines about the width of a boot heel.',
              'In the floor drain: a sliver of green plastic, the kind used for cable ties, and a single pill of a sedative used on livestock. The plant keeps a bottle in the foreman’s office, locked in a drawer.'
            ],
            gives: ['door-scratches', 'sedative'],
            hint: 'A body was dragged through that door. Look at the threshold and the drain.'
          }
        ]
      },
      {
        id: 'office', name: 'Weiss & Sons office', short: 'Office', time: '07:05',
        art: { kind: 'office' },
        requires: ['body-note'],
        intro: 'A warm little room with a kettle, a wall of framed certificates, and a smell of old paper and disinfectant. Anton’s desk is tidy. His brother Lorenz’s desk is not.',
        actions: [
          { id: 'desk', label: 'Search Anton’s desk', icon: 'ledger',
            desc: 'Ledger, insurance file, a green pen',
            text: [
              'The desk has one locked drawer and three that are not. The open drawers hold order books, a bag of boiled sweets, and a photograph of Anton with his father outside the original shop.',
              'The locked drawer gives way to a letter knife. Inside: the firm’s purchase ledger, an insurance policy taken out six weeks ago on Anton’s life for eight hundred thousand, and a green fountain pen with a custom nib.',
              'The ledger’s letterhead says <b>WEISS & SONS — EST. 1962</b>. The last page is a list of shipments to a company called Meridian Foods, each marked with a small green tick.'
            ],
            gives: ['ledger', 'insurance-policy', 'green-pen'],
            hint: 'The office is where the paperwork lives. Start with the desk.'
          },
          { id: 'safe', label: 'Open the certificates safe', icon: 'lock', puzzle: 'safe',
            desc: 'A four-digit keypad behind the framed certificates',
            requires: ['ledger'],
            hint: 'The safe code is a year. The ledger letterhead gives it to you: EST. 1962.'
          },
          { id: 'invoices', label: 'Compare the export invoices', icon: 'note',
            desc: 'Meridian Foods, eight months of shipments',
            requires: ['export-contract'],
            text: [
              'Meridian Foods is not a butcher. It is a cold-storage broker with one office and no website. The invoices show forty-one shipments of “boneless beef” at a price no beef producer could match.',
              'Each invoice is countersigned by Lorenz Weiss. Each one is accompanied by a veterinary certificate signed by Dr Eli Croft. The certificate numbers run in a neat sequence — and every tenth number is missing.',
              'On the back of the last invoice, in Anton’s handwriting: <b>“Ask E.C. what he is actually signing. Ask L. where the horses come from.”</b>'
            ],
            gives: ['export-invoices', 'anton-note'],
            hint: 'The invoices tell you where the money went. Read the back of the last one.'
          }
        ]
      },
      {
        id: 'plant', name: 'Loading bay', short: 'Loading bay', time: '08:10',
        art: { kind: 'factory', mood: 'cold' },
        requires: ['insurance-policy'],
        intro: 'Two lorries, one idle. The bay doors are open to a grey morning and the floor is wet with disinfectant. A driver sits on a crate, smoking like it is a duty.',
        actions: [
          { id: 'driver', label: 'Interview the morning driver', icon: 'user',
            desc: 'The man who found the body',
            text: [
              '“I got here at half five,” the driver says. “Door to cold room two was open a hand’s width. I thought someone had left it. I went in, and there he was, swinging. I did not touch him. I know better than to touch.”',
              'He smokes for a while. “There was a van here last night. Lorenz’s van. I saw it from the road on my way home, about eleven. Backed right up to the bay like it was loading.”',
              '“Lorenz doesn’t load. He wears a suit. He stands by the door and tells other people to lift things. But last night he was here on his own.”'
            ],
            gives: ['driver-statement'],
            hint: 'The driver was on the road last night. Ask him what he saw.'
          },
          { id: 'baycam', label: 'Enhance the bay camera still', icon: 'cctv', puzzle: 'baycam',
            desc: 'A cheap camera, a dark yard, one number plate',
            requires: ['driver-statement'],
            hint: 'The bay camera catches the yard at 23:04. Enhance the image until the van resolves.'
          },
          { id: 'crates', label: 'Inspect the outgoing crates', icon: 'search',
            desc: 'Stencilled boxes, wrong labels',
            requires: ['export-invoices'],
            text: [
              'The crates are stamped <b>BEEF — PRODUCT OF THE UNITED KINGDOM</b>. Under the stencil, on the wooden slats, there is another mark: a small horseshoe burned into the wood and painted over.',
              'One crate has been opened. Inside, the cuts are dark and coarse, vacuum-packed with a Meridian Foods label. The veterinary stamp on the label is dated three weeks ago. The animal it describes was never at this plant.',
              'A clipboard on the pallet lists the load: <b>41 cases. Destination: Meridian cold store. Signature: L.W.</b>'
            ],
            gives: ['crate-labels'],
            hint: 'The crates are stamped twice. Look under the stencil.'
          }
        ]
      },
      {
        id: 'clinic', name: 'Croft Veterinary Clinic', short: 'Vet clinic', time: '10:20',
        art: { kind: 'lab' },
        requires: ['certificates'],
        intro: 'A small clinic above a pet shop. The waiting room smells of wet dog and antiseptic. Dr Eli Croft is sixty-one, careful, and does not seem surprised to see you.',
        actions: [
          { id: 'croft', label: 'Interview Dr Eli Croft', icon: 'user', suspect: 'croft',
            desc: 'The vet whose signature is on everything',
            hint: 'Croft signed the certificates. Ask him how.'
          },
          { id: 'certbook', label: 'Seize the certificate book', icon: 'note',
            desc: 'Serial numbers, carbon copies, and gaps',
            requires: ['export-invoices'],
            text: [
              'The certificate book is a carbon-copy pad, kept in a drawer with a bottle of green ink. The top copy goes to the plant. The carbon stays here.',
              'The carbon copies tell a different story. Three hundred and twelve certificates signed in the last eight months. Forty-one of them have no animal description at all — just a signature, a date, and a blank line where the carcass details should be.',
              'The green ink in the bottle is a commercially mixed aniline dye. It is not the ink of a veterinary practice. It is the ink of a man who buys his stationery from the same wholesaler as the abattoir.'
            ],
            gives: ['blank-certs', 'ink-bottle'],
            hint: 'The carbon copies in the vet’s book will show what he actually signed.'
          },
          { id: 'ink', label: 'Run an ink comparison', icon: 'flask', puzzle: 'ink',
            desc: 'Green ink from the certificates, green ink from the pen',
            requires: ['green-pen', 'blank-certs'],
            hint: 'All green inks look alike until you separate the dyes. Add the reagents in order: solvent, buffer, developer, then the fixative.'
          }
        ]
      },
      {
        id: 'abattoir', name: 'Abattoir floor', short: 'Abattoir', time: '12:40',
        art: { kind: 'factory', mood: 'acid' },
        requires: ['bay-photo'],
        intro: 'The killing floor is hosed down and shining. A foreman in a white coat watches you from the rail, arms folded. Behind him, a row of captive-bolt guns hang in their cradles like sleeping tools.',
        actions: [
          { id: 'marek', label: 'Interview Marek Dole', icon: 'user', suspect: 'marek',
            desc: 'Foreman, twelve years, one assault charge',
            hint: 'The foreman controls the hoist key and the bolt guns. Ask him about both.'
          },
          { id: 'boltgun', label: 'Check the captive-bolt guns', icon: 'tool',
            desc: 'One cradle is empty',
            requires: ['hook-fibre'],
            text: [
              'There are six cradles. Five hold captive-bolt guns. The sixth is empty, and the tag on it reads <b>UNIT 3 — OUT FOR MAINTENANCE</b> in a hand that is not the maintenance clerk’s.',
              'The guns are cleaned every night. The log says all six were returned at 21:00. It does not say who signed them back in.',
              'The round wound on Anton’s skull matches the bolt head exactly. A captive-bolt gun does not kill a cow instantly — it stuns. Against a man’s skull, at close range, it does something worse.'
            ],
            gives: ['bolt-gun', 'bolt-log'],
            hint: 'Count the bolt guns. One is missing, and the maintenance tag is a lie.'
          },
          { id: 'timecards', label: 'Pull the staff timecards', icon: 'clock',
            desc: 'Who was on site at 23:00',
            requires: ['bolt-gun'],
            text: [
              'The clock is a mechanical beast by the staff door. The cards tell a simple story: Anton clocked out at 22:40. Marek clocked out at 22:52. The night cleaner clocked in at 23:30. Lorenz Weiss has no card — he is an owner and does not use one.',
              'But the security sign-in book at the gate is more honest. It has an entry for <b>L. WEISS — 22:58 — OFFICE</b>, written by the night guard, and no exit time.',
              'On the back of Anton’s card, someone has written: <b>“He came back for the certificates.”</b>'
            ],
            gives: ['timecards'],
            hint: 'Owners do not punch a clock. Check the gate book as well.'
          },
          { id: 'timeline', label: 'Reconstruct the night', icon: 'clock', puzzle: 'timeline',
            desc: 'Five moments that do not fit the story',
            requires: ['timecards', 'driver-statement'],
            hint: 'Order the night from the last time Anton was seen alive to the moment his body was found.'
          }
        ]
      },
      {
        id: 'home', name: 'Lorenz Weiss’s house', short: 'Lorenz’s', time: '16:30',
        art: { kind: 'house', mood: 'mansion' },
        requires: ['bay-photo'],
        intro: 'A new-build executive house behind electric gates. The lawn is perfect. Inside, everything is grey and glass and arranged by somebody who does not expect to be argued with.',
        actions: [
          { id: 'study', label: 'Search the study', icon: 'search',
            desc: 'Desk, pen refills, bank letters',
            requires: ['ink-match'],
            text: [
              'The study is the only room in the house that looks lived in. The desk has a green leather blotter, a laptop, and a wooden pen tray holding three green fountain pens — the same model as the one in Anton’s desk.',
              'In the bottom drawer: a box of twelve green ink refills, each stamped with the manufacturer’s batch code <b>AN-4417</b>. The certificate ink came from the same batch.',
              'The bank letters are addressed to Lorenz personally, not the firm. The most recent is a demand for £212,000 on a property development that has run out of money.'
            ],
            gives: ['pen-refill', 'bank-letters'],
            hint: 'Lorenz has money trouble. The study will show it.'
          },
          { id: 'laptop', label: 'Open Lorenz’s laptop', icon: 'terminal', puzzle: 'lorenz-pc',
            desc: 'A locked machine with a bad password habit',
            requires: ['pen-refill'],
            hint: 'Lorenz names his passwords after the things he is proud of. The yard has a nickname, painted over the cold room door.'
          },
          { id: 'lorenz', label: 'Confront Lorenz Weiss', icon: 'user', suspect: 'lorenz',
            desc: 'The brother who stands to inherit everything',
            requires: ['anton-email'],
            hint: 'With Anton’s email in hand, it is time to ask Lorenz about the shipment.'
          }
        ]
      }
    ],
    puzzles: {
      safe: {
        type: 'keypad', title: 'The Certificate Safe', subtitle: 'Four-digit keypad', icon: 'lockbox',
        deviceLabel: 'WEISS & SONS — SAFE', length: 4, code: '1962',
        prompt: 'A green steel safe behind a framed hygiene certificate. The keypad wants four digits. <span style="color:var(--dim)">Anton was a sentimental man about the firm.</span>',
        hintText: 'The ledger letterhead says “WEISS & SONS — EST. 1962”. Four digits. No leading zero needed.',
        successTitle: 'Safe open.',
        success: 'The bolts slide back. Inside: a bundle of veterinary certificates, an export contract, and a smell of cold paper.',
        gives: ['certificates', 'export-contract'], flags: ['safeOpen'],
        short: 'The certificate file is open.',
        log: 'The safe contains eight months of veterinary certificates — all signed by Dr Eli Croft in green ink — and a contract with a cold-storage broker called Meridian Foods.'
      },
      ink: {
        type: 'mix', title: 'Ink Comparison', subtitle: 'Thin-layer chromatography', icon: 'flask',
        prompt: 'Green ink from the certificate pad. Green ink from Anton’s pen. Under the naked eye they are identical. Separate the dyes and the lie comes apart.',
        note: 'Add the reagents in the correct order. Solvent first, then buffer, then developer, then fixative.',
        reagents: [
          { name: 'Solvent', color: '#67e8f9' },
          { name: 'Buffer', color: '#a3e635' },
          { name: 'Developer', color: '#a855f7' },
          { name: 'Fixative', color: '#fbbf24' }
        ],
        order: [0, 1, 2, 3],
        wrong: 'The plate floods brown. Wrong order — the dyes never separate. Empty the beaker and try again.',
        hintText: 'Read the labels on the reagent bottles: SOLVENT, BUFFER, DEVELOPER, FIXATIVE. The note on the bench gives the sequence.',
        success: 'Two green inks, two different dye profiles. The certificate ink is a custom aniline batch — AN-4417 — sold to exactly one account in the city: Lorenz Weiss.',
        successTitle: 'Different inks.',
        gives: ['ink-match'], flags: ['inkTested'],
        short: 'The certificate ink matches Lorenz’s private batch.',
        log: 'The certificates were not signed with the clinic’s ink. They were signed with a custom batch sold to Lorenz Weiss.'
      },
      baycam: {
        type: 'photo', title: 'Loading Bay Camera', subtitle: 'Enhance a still from 23:04', icon: 'cctv',
        scene: { kind: 'factory', mood: 'cold' },
        target: { x: 62, y: 57, w: 22, h: 26 }, range: [58, 78],
        question: 'What is backed up to the loading bay at 23:04?',
        options: [
          { t: 'A red delivery lorry with its trailer doors open', v: 'lorry' },
          { t: 'Lorenz Weiss’s grey panel van, rear doors facing the bay', v: 'van' },
          { t: 'The night cleaner’s bicycle', v: 'bike' },
          { t: 'An empty bay with the shutter down', v: 'empty' }
        ],
        answer: 'van',
        reveal: 'The grey van resolves out of the grain. The rear doors are open. A man in a suit stands at the bay, holding something long and dark.',
        wrong: 'The blur hides more than that. Slide the enhancement into the clear band and look at the vehicle’s shape.',
        hintText: 'The clear band is between 58% and 78%. Look for the shape of a panel van, not a lorry.',
        success: 'The plate resolves: <b>LW 04 VAN</b>. Lorenz Weiss’s van was at the loading bay at 23:04, with its rear doors open.',
        successTitle: 'The van is there.',
        gives: ['bay-photo'], flags: ['bayChecked'],
        short: 'Lorenz’s van was at the bay at 23:04.',
        log: 'Enhanced bay footage shows Lorenz Weiss’s grey van at the loading bay at 23:04, rear doors open, a man in a suit beside it.'
      },
      timeline: {
        type: 'sequence', title: 'The Night, In Order', subtitle: 'Five moments, one lie', icon: 'clock', variant: 'strips',
        prompt: 'The story Lorenz told does not fit the clock. Put the night in order.',
        items: [
          { t: 'Anton clocks out', sub: '22:40 — staff door', order: 1 },
          { t: 'Lorenz signs in at the gate', sub: '22:58 — “OFFICE”', order: 2 },
          { t: 'The grey van backs up to the bay', sub: '23:04 — bay camera', order: 3 },
          { t: 'Cold room two door opens', sub: '23:10 — thermostat log', order: 4 },
          { t: 'The body is found', sub: '05:50 — morning driver', order: 5 }
        ],
        wrong: 'That order puts a man in two places at once. Start with the last time Anton was seen alive.',
        hintText: 'Anton clocked out first. The gate book, the bay camera and the thermostat log give the rest.',
        success: 'The night lines up: Anton never left the site. Lorenz arrived at 22:58, opened the cold room at 23:10, and turned the thermostat down at 00:10. The body had four hours to freeze before the driver found it.',
        successTitle: 'The clock breaks his alibi.',
        gives: ['timeline'], flags: ['timelineBuilt'],
        short: 'Lorenz was on site when Anton died.',
        log: 'Timeline established: Anton clocked out at 22:40 but never left. Lorenz signed in at 22:58; the cold room opened at 23:10 and was set to -22 at 00:10.'
      },
      'lorenz-pc': {
        type: 'terminal', title: 'Lorenz’s Laptop', subtitle: 'The owner’s account', icon: 'terminal',
        user: 'lorenz', host: 'weiss-office', password: 'orchard',
        intro: 'Connection established. The desktop is a photograph of the yard at dawn. Type "help" for commands.',
        banner: 'WEISS & SONS — OWNER ACCESS. 3 FILES. 1 SECURE FOLDER.',
        files: [
          { name: 'readme.txt', body: 'Anton wants to audit the Meridian account. I have told him the numbers are seasonal. He keeps asking about the certificates.<br><br>— L' },
          { name: 'meridian', body: '<span class="d">41 shipments. £1.4m.</span><br>Product code: BEEF-UK-41<br>Actual origin: <span class="y">LIVESTOCK — MIXED</span><br>Certificates: CROFT, E. (blank copies supplied)<br><span class="d">Profit margin: 61%.</span>' },
          { name: 'anton_last.eml', locked: true, secret: true, hint: 'Private mail archive. Owner password required.', body: '<span class="y">FROM: anton@weissandsons<br>TO: lorenz@weissandsons<br>SUBJECT: Tomorrow</span><br><br>“I have the Meridian paperwork in front of me. The certificates are for animals that never existed. I am calling the regulator at nine tomorrow, and I am telling Eli what you have been doing with his signature.<br><br>You can explain it to them, or you can explain it to me tonight. I will be in the office until ten.”<br><br><span class="r">— A.</span><br><br><span class="d">Reply, 23:02: “Then I will come to you.”</span>' }
        ],
        hintText: 'The password is painted over the cold room door: THE BONE ORCHARD. Try the second word.',
        success: 'The secure mail folder opens. Anton’s last email is a threat to report Lorenz at nine the next morning. Lorenz’s reply is timestamped 23:02.',
        successTitle: 'Motive, in writing.',
        gives: ['anton-email', 'lorenz-file'], flags: ['lorenzMail'],
        short: 'Anton was going to report the fraud at nine.',
        log: 'Lorenz’s laptop contains Anton’s final email: he was reporting the Meridian fraud at nine the next morning. Lorenz replied at 23:02: “Then I will come to you.”'
      }
    },
    suspects: [
      {
        id: 'croft', name: 'Dr Eli Croft', role: 'Veterinarian · certificate signatory', location: 'clinic', locationName: 'Croft Veterinary Clinic', tag: 'Witness / suspect',
        portrait: { seed: 'croft-vet', hair: 'short', hairColor: '#8d8d99', skin: 0, expression: 'sad', collar: 'shirt', glasses: 'round', age: 'old' },
        intro: 'Sixty-one, neatly dressed, with the tired eyes of a man who has been signing things he did not read. He offers you tea before you ask a single question.',
        questions: [
          { q: 'You certifying forty-one shipments you never inspected. Why?', requires: ['export-invoices'],
            a: '“I did not falsify anything.” He says it too quickly. “Anton asked me to sign blank certificates. He said it was a paperwork shortcut — that the animals had been inspected by the abattoir’s own vet and he only needed my name for the export file. I have known that family for thirty years. I signed.” He looks at his hands. “I signed whatever he put in front of me.”',
            gives: ['croft-explanation'] },
          { q: 'The ink on your certificates came from Lorenz Weiss’s private batch.', requires: ['ink-match'], present: true,
            a: 'He goes very still. “Lorenz bought the pens. He said the clinic should look professional.” A long pause. “Anton would never have asked me to sign a blank certificate. Anton was the careful one.” He closes his eyes. “Lorenz brought the pad to me. Lorenz always brought the pad.”',
            gives: ['croft-suspicion'], flags: ['croftCleared'] },
          { q: 'Who benefited from Anton’s death?', requires: ['insurance-policy'],
            a: '“Lorenz. The firm. The insurance.” He says it without pleasure. “But you should know something. Anton came to see me last week. He asked me what I would do if I found out a man was selling horse as beef. I told him I would go to the police. He said he was going to do exactly that.”' },
          { q: 'Why did you never inspect the animals?', requires: ['blank-certs'],
            a: '“Because there were no animals to inspect.” He sets down his cup. “That is what I have been trying not to say out loud. The certificates were for carcasses that arrived already cut and boxed. I never saw a live animal, a hide, or a tag. I signed paper.”' }
        ],
        after: 'He gives you the certificate book without being asked. It is the first honest thing he has done in eight months.'
      },
      {
        id: 'marek', name: 'Marek Dole', role: 'Foreman · twelve years at the plant', location: 'abattoir', locationName: 'Abattoir floor', tag: 'Suspect',
        portrait: { seed: 'marek-foreman', hair: 'buzz', hairColor: '#2b1a12', skin: 2, expression: 'angry', collar: 'apron', beard: 'stubble' },
        intro: 'Built like a door, with a handshake that ends conversations. He has an assault conviction from 2016 and a union badge he wears like a medal.',
        questions: [
          { q: 'Where were you between ten and midnight?', requires: ['timecards'],
            a: '“Home. Clocked out at 22:52, same as the card says. My wife will tell you. I was in bed by half eleven.” He folds his arms. “I know how it looks. I hit a man in a pub eight years ago. That does not make me a murderer.”',
            gives: ['marek-alibi'] },
          { q: 'The chain-hoist key is kept by the office door. Who used it?', requires: ['hook-fibre'],
            a: '“Anyone could. It hangs there.” Then he stops. “But the chain box is locked at night. Only three keys. Mine, Anton’s, and the one in Lorenz’s desk drawer. I did not touch it.” He looks at the hook in the photo. “You do not need the hoist to kill a man. You need it to hang him.”' },
          { q: 'One of your captive-bolt guns is missing.', requires: ['bolt-gun'], present: true,
            a: 'He takes the tag and reads it twice. “I did not write that.” His jaw works. “Unit three was in its cradle when I left. I check them every night. Somebody took it after 22:00 and put a maintenance tag on the empty slot.” A pause. “Lorenz has a key to this floor. He has a key to everything.”',
            gives: ['marek-suspicion'] },
          { q: 'What was Anton like to work for?', requires: ['body-note'],
            a: '“Fair. Soft, maybe. He knew every man’s name and every man’s kids.” He looks at the floor. “His brother is the one you want to talk to. Lorenz has been coming in at night for months, loading his own vans. Anton found out. I heard them arguing on Tuesday. Lorenz said, ‘You will not take this from me.’”',
            gives: ['marek-argument'] }
        ],
        after: 'He goes back to hosing the floor. His hands are shaking, but not from the cold.'
      },
      {
        id: 'lorenz', name: 'Lorenz Weiss', role: 'Co-owner · Anton’s younger brother', location: 'home', locationName: 'The executive house', tag: 'Prime suspect',
        portrait: { seed: 'lorenz-weiss', hair: 'short', hairColor: '#5b3a22', skin: 1, expression: 'smug', collar: 'suit', beard: 'goatee', glasses: 'square' },
        intro: 'Fifty-one, tanned, wearing a coat that cost more than the interview room. He pours himself a drink and does not offer you one. “My brother had a bad heart,” he says. “The cold would have finished him anyway.”',
        questions: [
          { q: 'Where were you on the night Anton died?', requires: ['timeline'],
            a: '“At home. Alone.” He smiles. “I know how that sounds. But I am not the one who was found hanging in a freezer, detective. I am the one who has to run this firm now.”',
            gives: ['lorenz-alibi'], flags: ['lorenzHostile'] },
          { q: 'Your van was at the loading bay at 23:04.', requires: ['bay-photo'], present: true,
            a: 'The glass stops halfway to his mouth. “The van is used by the firm. Anyone can take it.” He sets the glass down. “You have a blurry photograph and a driver who cannot tell one grey van from another. That is not evidence. That is weather.”',
            flags: ['lorenzHostile'] },
          { q: 'The certificate ink came from your private batch.', requires: ['ink-match'], present: true,
            a: '“I buy stationery for the whole company. That is not a crime.” He straightens his cuff. “Eli Croft signed those certificates. If something was wrong with them, take it up with him. I merely paid for the pens.”',
            gives: ['lorenz-denial'] },
          { q: 'Anton was going to report the Meridian fraud at nine the next morning.', requires: ['anton-email'], present: true,
            a: 'He reads the email twice. His face does not change, which is how you know. “Anton was a romantic,” he says at last. “He thought the firm was a family. It is a business. Families eat their own.” He looks up. “I was at home. You cannot put me in that cold room.”',
            gives: ['lorenz-motive'], flags: ['lorenzBroke'] },
          { q: 'Why did you turn the thermostat down to minus twenty-two?', requires: ['timeline'],
            a: '“I do not touch thermostats.” A beat. “And if I did, it would be to keep the stock cold. That is what a cold room is for.” He smiles again, and it does not reach his eyes. “You are going to need more than a maintenance log, detective. My brother was depressed. Everyone knew it. He had been talking about ending it for months.”',
            gives: ['lorenz-story'] }
        ],
        after: 'He shows you out through the electric gate. On the drive, his van is parked with its rear doors facing the house, as if it has just been unloaded.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Anton Weiss — post-mortem note', caption: 'Cold room two · blunt-force trauma', icon: 'blood', type: 'Forensic report',
        desc: 'A round depressed fracture at the back of the skull, consistent with a captive-bolt stunner at close range. No defensive wounds. Time of death estimated between 22:30 and 00:30.',
        tells: 'He was stunned from behind. The body was moved after death and left hanging to freeze.'
      },
      'thermostat-log': {
        name: 'Thermostat maintenance log', caption: '23:10 door open · 00:10 set to -22', icon: 'note', type: 'Physical record',
        desc: 'Half-hourly readings in three different hands. The last three entries were written by someone who arrived after the plant closed.',
        tells: 'Someone entered the cold room at 23:10 and deliberately turned the temperature down afterwards.'
      },
      'coat-recorder': {
        name: 'Pocket recorder in the folded coat', caption: 'Still running when found', icon: 'audio', type: 'Audio evidence',
        desc: 'A cheap dictation recorder, switched on at 22:47 and never stopped. Forty-one minutes of a cold room, a door, and two men arguing.',
        tells: 'Anton turned it on before the meeting. He knew he might need a witness.'
      },
      'hook-fibre': {
        name: 'Fibre from the hoist bolt', caption: 'Dark wool · machine grease', icon: 'fiber', type: 'Trace evidence',
        desc: 'A single dark wool fibre caught in the thread of the mounting bolt. The chain box key was needed to lift a body that size.',
        tells: 'The killer used the hoist, and was wearing a dark wool coat.'
      },
      'door-scratches': {
        name: 'Scuffed threshold', caption: 'Two parallel heel marks', icon: 'footprint', type: 'Scene mark',
        desc: 'Fresh scuffs on the stainless threshold, consistent with a body being dragged through the door feet-first.',
        tells: 'Anton did not walk into that room. He was brought.'
      },
      'sedative': {
        name: 'Livestock sedative', caption: 'Floor drain · one broken pill', icon: 'pill', type: 'Chemical evidence',
        desc: 'A single acepromazine tablet from the locked drawer in the foreman’s office. Enough to quiet a man, not to kill him.',
        tells: 'The killer had access to the foreman’s locked drawer — or a key to it.'
      },
      'ledger': {
        name: 'Weiss & Sons purchase ledger', caption: 'Est. 1962 · Meridian shipments', icon: 'ledger', type: 'Financial record',
        desc: 'Eight months of shipments to Meridian Foods, each marked with a green tick. The margins are extraordinary for beef.',
        tells: 'The firm was making far too much money on “beef” to be selling beef.'
      },
      'insurance-policy': {
        name: 'Life insurance policy', caption: '£800,000 · taken out six weeks ago', icon: 'badge', type: 'Financial record',
        desc: 'A policy on Anton’s life, arranged by Lorenz, with the firm named as beneficiary. The medical was rushed through.',
        tells: 'Lorenz had eight hundred thousand reasons to want his brother dead.'
      },
      'green-pen': {
        name: 'Green fountain pen', caption: 'Anton’s locked desk drawer', icon: 'tool', type: 'Physical evidence',
        desc: 'A custom-nib fountain pen filled with green aniline ink. The same shade as every veterinary certificate.',
        tells: 'The green ink is not a coincidence. It is a signature of sorts.'
      },
      'certificates': {
        name: 'Veterinary certificates', caption: '312 certificates · one signature', icon: 'letter', type: 'Official record',
        desc: 'Every certificate for eight months, signed by Dr Eli Croft. Forty-one have no animal description at all.',
        tells: 'The paperwork was manufactured, not inspected.'
      },
      'export-contract': {
        name: 'Meridian Foods contract', caption: 'Cold-storage broker · 41 shipments', icon: 'note', type: 'Contract',
        desc: 'A supply contract for “boneless beef” at a price that undercuts every legitimate producer in the region.',
        tells: 'Meridian is the pipeline. The question is what actually travelled through it.'
      },
      'export-invoices': {
        name: 'Export invoices', caption: 'Countersigned by Lorenz Weiss', icon: 'ledger', type: 'Financial record',
        desc: 'Forty-one invoices, every one countersigned by Lorenz. Every tenth certificate number is missing from the file.',
        tells: 'Lorenz controlled the paperwork. The missing numbers are the shipments he did not want traced.'
      },
      'anton-note': {
        name: 'Anton’s note on the invoice', caption: '“Ask E.C. … Ask L. where the horses come from.”', icon: 'note', type: 'Handwritten note',
        desc: 'A pencilled note on the back of the last Meridian invoice, in Anton’s hand.',
        tells: 'Anton had already worked out the fraud. He was asking the right questions.'
      },
      'driver-statement': {
        name: 'Morning driver’s statement', caption: '“Lorenz’s van. About eleven.”', icon: 'note', type: 'Witness statement',
        desc: 'The driver saw Lorenz’s grey panel van backed up to the loading bay at around 23:00, with its rear doors open.',
        tells: 'Lorenz lied about being at home. He was at the plant when Anton died.'
      },
      'bay-photo': {
        name: 'Loading bay still, 23:04', caption: 'LW 04 VAN · rear doors open', icon: 'cctv', type: 'Surveillance',
        desc: 'An enhanced still from the bay camera. Lorenz’s van is parked at the bay. A man in a suit stands beside the open rear doors.',
        tells: 'Lorenz was at the bay with a vehicle large enough to move a body.'
      },
      'crate-labels': {
        name: 'Double-stamped crates', caption: 'BEEF over a burned horseshoe', icon: 'search', type: 'Physical evidence',
        desc: 'Outgoing crates stencilled “BEEF — PRODUCT OF THE UNITED KINGDOM”, with a horseshoe burned into the wood beneath.',
        tells: 'The product was horse. The labels were the fraud.'
      },
      'blank-certs': {
        name: 'Certificate carbon copies', caption: '41 blanks · signed but empty', icon: 'letter', type: 'Official record',
        desc: 'The carbon copies in Croft’s book show forty-one certificates signed with no animal description. The top copies went to the plant.',
        tells: 'Croft signed blanks. Someone else filled them in — or used them as they were.'
      },
      'ink-bottle': {
        name: 'Clinic green ink', caption: 'Commercial aniline dye', icon: 'flask', type: 'Chemical evidence',
        desc: 'The ink in Croft’s certificate drawer is a standard commercial green. It does not match the ink on the certificates.',
        tells: 'The certificates were signed somewhere else, with someone else’s pen.'
      },
      'ink-match': {
        name: 'Ink batch AN-4417', caption: 'Sold to one account: L. Weiss', icon: 'flask', type: 'Forensic analysis',
        desc: 'Chromatography separates the certificate ink into a custom aniline profile from batch AN-4417, sold to a single private account.',
        tells: 'Lorenz’s private ink is on every certificate. He supplied the pens and the paperwork.'
      },
      'bolt-gun': {
        name: 'Missing captive-bolt gun', caption: 'Unit 3 · cradle empty', icon: 'tool', type: 'Weapon',
        desc: 'One of six captive-bolt stunners is missing from its cradle. The maintenance tag on the empty slot is forged.',
        tells: 'The murder weapon came from the plant’s own killing floor.'
      },
      'bolt-log': {
        name: 'Bolt-gun return log', caption: 'All six returned at 21:00', icon: 'note', type: 'Record',
        desc: 'The log shows all six guns returned at 21:00. The signature is a scrawl that matches neither the foreman nor the maintenance clerk.',
        tells: 'Someone took a gun after the plant closed and tried to cover the gap.'
      },
      'timecards': {
        name: 'Staff timecards', caption: 'Anton out at 22:40 · no return', icon: 'clock', type: 'Record',
        desc: 'Anton clocked out at 22:40. The gate book records Lorenz signing in at 22:58 with no exit time.',
        tells: 'Anton left the floor but not the site. Lorenz arrived after hours.'
      },
      'timeline': {
        name: 'Reconstructed timeline', caption: '22:40 → 05:50', icon: 'clock', type: 'Analysis',
        desc: 'Anton clocked out; Lorenz signed in; the van backed up; the cold room opened; the thermostat dropped; the body was found.',
        tells: 'There is no window in which Lorenz was at home. His alibi is a fiction.'
      },
      'pen-refill': {
        name: 'Green ink refills', caption: 'Batch AN-4417 · Lorenz’s study', icon: 'flask', type: 'Physical evidence',
        desc: 'A box of twelve green refills in Lorenz’s desk, all from the same manufacturer’s batch as the certificate ink.',
        tells: 'The ink on the certificates came from this house.'
      },
      'bank-letters': {
        name: 'Personal bank demands', caption: '£212,000 overdue', icon: 'money', type: 'Financial record',
        desc: 'Letters addressed to Lorenz personally, demanding repayment on a failed property development. The firm’s accounts were not used.',
        tells: 'Lorenz was personally ruined. The insurance and the Meridian money were his way out.'
      },
      'anton-email': {
        name: 'Anton’s final email', caption: '“I am calling the regulator at nine tomorrow.”', icon: 'mail', type: 'Digital evidence',
        desc: 'Anton’s last email to Lorenz, sent at 22:41, announcing that he would report the Meridian fraud the next morning. Lorenz replied at 23:02.',
        tells: 'Lorenz had less than an hour to stop him.'
      },
      'lorenz-file': {
        name: 'Meridian profit file', caption: '£1.4m · 61% margin', icon: 'ledger', type: 'Financial record',
        desc: 'Lorenz’s private breakdown of the Meridian trade: forty-one shipments, mixed livestock, blank certificates supplied by Croft.',
        tells: 'Lorenz knew exactly what was in the crates. The fraud was his.'
      },
      'croft-explanation': {
        name: 'Croft’s explanation', caption: '“Lorenz always brought the pad.”', icon: 'note', type: 'Interview',
        desc: 'Croft admits signing blank certificates as a paperwork shortcut, but says Lorenz, not Anton, supplied the pad and the pens.',
        tells: 'Croft is guilty of negligence, not murder. Lorenz built the paper trail.'
      },
      'croft-suspicion': {
        name: 'Croft’s suspicion', caption: '“Anton was the careful one.”', icon: 'audio', type: 'Interview',
        desc: 'Confronted with the ink evidence, Croft says Anton would never have asked for blank certificates. Lorenz brought them.',
        tells: 'The fraud was Lorenz’s from the beginning.'
      },
      'marek-alibi': {
        name: 'Marek’s alibi', caption: 'Home by 23:00 · wife confirms', icon: 'note', type: 'Alibi',
        desc: 'Marek clocked out at 22:52 and was home before eleven. His wife and neighbour both confirm it.',
        tells: 'Marek is a violent man with a temper, but he was not at the plant when Anton died.'
      },
      'marek-suspicion': {
        name: 'Marek on the bolt gun', caption: '“Lorenz has a key to everything.”', icon: 'audio', type: 'Interview',
        desc: 'Marek insists unit 3 was in its cradle when he left, and that Lorenz holds keys to the killing floor and the chain box.',
        tells: 'Lorenz had access to the weapon and the hoist.'
      },
      'marek-argument': {
        name: 'The Tuesday argument', caption: '“You will not take this from me.”', icon: 'note', type: 'Witness statement',
        desc: 'Marek heard Anton and Lorenz arguing on Tuesday. Anton said he was going to the regulator. Lorenz said, “You will not take this from me.”',
        tells: 'The threat was made two days before the murder.'
      },
      'lorenz-alibi': {
        name: 'Lorenz’s alibi', caption: '“At home. Alone.”', icon: 'audio', type: 'Statement',
        desc: 'Lorenz claims he was at home alone all night. There is no witness, no camera, and no phone data to support it.',
        tells: 'The alibi is not an alibi. It is an assertion.'
      },
      'lorenz-denial': {
        name: 'Lorenz on the ink', caption: '“I merely paid for the pens.”', icon: 'audio', type: 'Statement',
        desc: 'Lorenz admits buying the ink but denies filling in the certificates. He points at Croft.',
        tells: 'He is trying to put the paperwork on the man who signed it.'
      },
      'lorenz-motive': {
        name: 'Lorenz’s motive', caption: '“It is a business. Families eat their own.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with Anton’s email, Lorenz does not deny the fraud. He calls Anton a romantic and says the firm is a business.',
        tells: 'He admits the motive without admitting the act.'
      },
      'lorenz-story': {
        name: 'Lorenz’s suicide story', caption: '“He had been talking about ending it.”', icon: 'note', type: 'Statement',
        desc: 'Lorenz claims Anton was depressed and suicidal. No friend, doctor, or family member has ever said so.',
        tells: 'He is building a story to explain a frozen body with a hole in its skull.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Anton Weiss?',
          options: [
            { t: 'Marek Dole — the foreman with a violent record', v: 'marek' },
            { t: 'Dr Eli Croft — the vet who signed the certificates', v: 'croft' },
            { t: 'Lorenz Weiss — the co-owner and Anton’s brother', v: 'lorenz' },
            { t: 'Greta Weiss — the plant’s quality inspector', v: 'greta' }
          ], answer: 'lorenz' },
        { q: 'How was Anton killed?',
          options: [
            { t: 'He was stunned with a captive-bolt gun, then hung in the cold room to freeze', v: 'stun' },
            { t: 'He fell and struck his head on the rail while checking the thermostat', v: 'fall' },
            { t: 'He was poisoned with livestock sedatives and left in the freezer', v: 'poison' },
            { t: 'He was crushed by a falling side of beef and moved to the cold room', v: 'crush' }
          ], answer: 'stun' },
        { q: 'What was the motive?',
          options: [
            { t: 'Anton was going to report the mislabelled meat and the forged certificates', v: 'report' },
            { t: 'A dispute over the family inheritance and the house', v: 'inheritance' },
            { t: 'Lorenz was having an affair with Anton’s wife', v: 'affair' },
            { t: 'Anton had been stealing from the firm’s accounts', v: 'theft' }
          ], answer: 'report' },
        { q: 'Which evidence breaks the case?',
          options: [
            { t: 'The missing bolt gun and the scuffed threshold', v: 'bolt' },
            { t: 'The ink batch matching Lorenz’s private supply, tied to the Meridian fraud', v: 'ink' },
            { t: 'The driver’s statement and the van number plate', v: 'driver' },
            { t: 'Marek’s assault conviction and his argument with Anton', v: 'marek' }
          ], answer: 'ink' }
      ],
      verdict: {
        who: 'Lorenz Weiss, 51 — co-owner of Weiss & Sons, Anton’s younger brother',
        whoDesc: 'was arrested at the plant and charged with murder and fraud. He denied everything until the ink results were read into the record.',
        how: 'He stunned Anton with a captive-bolt gun in the office, dragged him into cold room two, hoisted him onto the hook, and turned the thermostat down to make the time of death impossible to fix.',
        why: 'Anton had discovered that Lorenz was selling horsemeat as British beef through Meridian Foods, using blank veterinary certificates. He was going to the regulator at nine the next morning.',
        key: 'The green ink on three hundred and twelve certificates matched a custom batch sold only to Lorenz, and the fraud files on his laptop explained what the certificates were really covering.'
      },
      reveal: [
        'Lorenz Weiss did not set out to kill his brother. He set out to save a business that had been quietly rotting for eight months. Meridian Foods paid cash for “boneless beef” and never asked where it came from. Lorenz bought horses from three collapsed farms, had them slaughtered at a plant two counties away, and moved the meat through Weiss & Sons under his brother’s name and a vet’s signature.',
        'Anton found the discrepancy in the margins first. He was not a suspicious man, but he was a careful one. He drove to Meridian’s cold store, looked at the labels, and came home with a horseshoe burned into a crate. Then he opened the certificate file and found forty-one blanks.',
        'On Tuesday night he sent Lorenz an email. It was calm, almost gentle. He said he was calling the regulator at nine. He said he would be in the office until ten. He gave his brother a chance to explain.',
        'Lorenz came to the plant at 22:58. He signed the gate book because the night guard was watching. He took the captive-bolt gun from the killing floor and the chain-box key from the foreman’s drawer. In the office, Anton was sitting with the certificate file open. Lorenz stood behind him and pulled the trigger.',
        'The bolt did not kill Anton at once. It stunned him, which is what it is designed to do. Lorenz dragged him through the cold-room door, hoisted him onto the hook, and turned the thermostat to minus twenty-two. Then he wrote three false entries in the maintenance log, in a hand that was not quite his brother’s.',
        'He was careful about the coat. He folded it and put it on the stool, because a hanging man does not fold his own coat. He was less careful about the ink. The certificates he had been filling in for months were signed with his own private batch, bought from the same wholesaler he used for the firm’s letterhead.',
        'Dr Eli Croft signed blanks because a man he had known for thirty years asked him to. He will lose his licence, and he knows it. Marek Dole has a temper and a record, but he was home in bed. The only person in the plant at 23:10 was the man with the key.',
        'In the pocket of Anton’s folded coat, the recorder was still running. Forty-one minutes of a cold room humming, a door opening, and two brothers arguing about a shipment of horses. At the end, Anton says: <i>“You could have just told them, Lorenz. It would have been a fine.”</i>',
        'Lorenz’s reply is almost too quiet to hear. <i>“A fine would have killed me anyway.”</i>'
      ],
      quote: 'A fine would have killed me anyway.',
      twist: 'The final detail was in Anton’s coat. He had turned on a pocket recorder at 22:47, before Lorenz arrived, because he knew his brother well enough to want a witness. The recorder was still running when the driver found the body — and it had captured the entire murder, including the moment Lorenz said, “You should have signed the papers, Anton.”'
    }
  });
})();
