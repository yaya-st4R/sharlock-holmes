/* ============================================================
   CASE 25 - OPERATION: FALSE IDENTITY
   Undercover-gated case. Deploy before you can accuse.
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c25', num: 25,
    title: 'Operation: False Identity',
    subtitle: 'An undercover officer died wearing another man\'s name. Someone kept using it.',
    difficulty: 5, est: '45-55 min',
    cover: { kind: 'hotel', mood: 'club' },
    missionId: 'm-false-identity',
    facts: [
      { k: 'Victim', v: 'DC Ivo Marsh, 36 - undercover alias "Dane Rook"' },
      { k: 'Scene', v: 'Room 402, the Gilt Room private hotel' },
      { k: 'Found', v: 'Friday, 23:10 - by hotel security' },
      { k: 'Official cause', v: 'Apparent overdose - champagne and sedatives' }
    ],
    briefing: [
      "The Gilt Room has no sign, no register and no interest in who you really are. Room 402 was booked under the name Dane Rook. The man in the bed was Ivo Marsh, a police officer working undercover inside the Meridian network.",
      "He was three days from closing a case against the people selling access to a police evidence transfer. His handler lost contact at 20:30. At 21:10 the hotel register shows Dane Rook checking in - forty minutes after Ivo was already dead.",
      "The room is clean. The champagne is expensive. The safe is open. And the only way to close this file is to go back inside the Gilt Room under the same name, and make them believe it."
    ],
    opening: 'Room 402 smells of expensive soap and something sweeter underneath. A black suit is folded over a chair. The bed is made around a body as if the hotel were expecting a review.',
    objectives: [
      'Establish how Ivo Marsh died and who used his alias.',
      'Recover the guest register and the room ledger.',
      'Go undercover as Dane Rook and obtain the recording.',
      'Prove who sold the police transfer route.'
    ],
    locations: [
      {
        id: 'room', name: 'Room 402', short: 'Room 402', time: '23:30',
        art: { kind: 'hotel', mood: 'club' },
        intro: 'A suite with a view of the river and the curtains half drawn. Ivo is on the bed, one hand open. Two champagne flutes stand on the nightstand; only one has been used.',
        actions: [
          { id: 'body', label: 'Examine Ivo and the glasses', icon: 'blood', hotspot: { x: 52, y: 56 },
            desc: 'The scar, the sedative, the second glass',
            text: [
              "Ivo has a pale scar across the back of his left hand, the old kind that never fades. It matches the description of Dane Rook in the file. This is the right man.",
              "There is a small puncture behind his left ear, hidden by the hair. The champagne flute beside him carries a bitter almond smell. The second glass is clean and untouched.",
              "His wallet is open on the floor, cash still inside. A hotel key card is missing. His phone is gone."
            ],
            gives: ['c25_scar', 'c25_autopsy'],
            hint: 'The scar confirms the identity. The puncture and the untouched second glass say the scene was arranged.'
          },
          { id: 'safe', label: 'Open the room safe', icon: 'keypad', puzzle: 'safe-pin',
            desc: 'Four digits - Ivo\'s badge number',
            gives: ['c25_safe'],
            hint: 'Ivo\'s police badge number is in the file. Use the last four digits.'
          },
          { id: 'phone', label: 'Recover Ivo\'s backup phone', icon: 'phone', puzzle: 'backup-term',
            desc: 'One unsent message to his handler',
            gives: ['c25_phone'],
            hint: 'His password was the operation name: MERIDIAN.'
          }
        ]
      },
      {
        id: 'lobby', name: 'Gilt Room Lobby', short: 'Lobby', time: '00:05',
        art: { kind: 'hotel', mood: 'club' },
        requires: ['c25_scar'],
        intro: 'Black marble, low lamps and a reception desk with no computer visible. The guest register is a leather book, kept by hand. The host, Marta Voss, watches you from the bar.',
        actions: [
          { id: 'register', label: 'Read the guest register', icon: 'ledger',
            desc: 'D. Rook checked in at 21:10',
            text: [
              "The register lists ROOM 402 - D. ROOK - IN 21:10 - PAID BY MERIDIAN CORPORATE ACCOUNT. The handwriting is neat and identical to the entry above it.",
              "A second line has been added in pencil: 402 - late checkout - do not disturb. The time beside it is 20:25, before Dane Rook supposedly arrived.",
              "The register is kept behind the desk because it never leaves the building. Marta signed every page."
            ],
            gives: ['c25_roster'],
            hint: 'The room was marked do-not-disturb before the guest checked in.'
          },
          { id: 'maid', label: 'Question the maid, Lucia', icon: 'user',
            desc: 'She cleaned the fourth floor at 20:40',
            text: [
              "Lucia remembers Marta Voss coming out of room 402 at 20:45 with a towel wrapped around her hand. She said the guest had spilled champagne and she was helping.",
              "Lucia also remembers the room being occupied before 21:10. She heard the shower running at 20:20. The register says the room was empty.",
              "She did not report it. Marta is the host. You do not report the host."
            ],
            gives: ['c25_witness'],
            hint: 'The maid puts Marta in the room before the official check-in.'
          },
          { id: 'terminal', label: 'Audit the hotel key system', icon: 'terminal', puzzle: 'key-audit',
            desc: 'Who opened room 402?',
            gives: ['c25_keylog'],
            hint: 'Look for the master key. The master key overrides every guest card.'
          }
        ]
      },
      {
        id: 'office', name: 'Manager\'s Office', short: 'Office', time: '01:00',
        art: { kind: 'office', mood: 'club' },
        requires: ['c25_witness'],
        intro: 'A small room behind reception with a recorder on the desk. Not hidden. The red light is on. Marta is already seated, hands folded, waiting for you to sit down.',
        actions: [
          { id: 'marta', label: 'Question Marta Voss', icon: 'user', suspect: 'marta',
            desc: 'The host - owns the room, the register, the key' },
          { id: 'recorder', label: 'Play the desk recorder', icon: 'sound', puzzle: 'desk-audio',
            desc: 'A conversation recorded before you arrived',
            gives: ['c25_coaching'],
            hint: 'Listen for who is coaching whom. The second voice is the courier.'
          },
          { id: 'cctv', label: 'Review the corridor camera', icon: 'cctv', puzzle: 'corridor-seq',
            desc: 'Four clips, one missing minute',
            gives: ['c25_camera'],
            hint: 'The camera loops at 20:30. The loop is the tell.'
          }
        ]
      },
      {
        id: 'courier', name: "Leo's Flat", short: "Leo's flat", time: '02:10',
        art: { kind: 'interior', mood: 'cold' },
        requires: ['c25_roster'],
        intro: 'A basement flat with a bicycle in the hall and a stack of delivery receipts. Leo is awake, dressed, and has clearly been expecting someone to knock for hours.',
        actions: [
          { id: 'leo', label: 'Question Leo Ward', icon: 'user', suspect: 'leo',
            desc: 'Courier - paid to move packages' },
          { id: 'cufflink', label: 'Search the bedroom', icon: 'search',
            desc: 'One cufflink, one suitcase',
            text: [
              "Under the bed: a silver cufflink engraved with a small M. It matches the pair Marta wears on her right cuff.",
              "A packed suitcase sits open on the bed, tickets to the coast for the morning. Leo says he was leaving because Marta told him to.",
              "A delivery log on the table lists six runs to the police evidence warehouse, all signed by the same officer - the officer whose transfer was sold."
            ],
            gives: ['c25_cufflink', 'c25_delivery'],
            hint: 'The cufflink is Marta\'s. The suitcase says Leo was being moved out of the way.'
          },
          { id: 'delivery', label: 'Trace the delivery route', icon: 'map',
            desc: 'Six runs to the evidence warehouse',
            text: [
              "The delivery log maps six runs from the Gilt Room to the police evidence warehouse. Every one is signed by the same desk sergeant, a man named Halloran.",
              "Halloran was the officer who requested the transfer. His signature appears on the route sheet and on Leo's delivery receipts.",
              "Leo says he never met Halloran. He only collected sealed boxes from Marta and drove them where she said."
            ],
            gives: ['c25_delivery'],
            hint: 'The same sergeant signed the route and the deliveries. He is the link.'
          }
        ]
      }
    ],
    puzzles: {
      'safe-pin': {
        type: 'keypad', title: 'Room Safe', subtitle: 'Four-digit police badge', icon: 'keypad',
        deviceLabel: 'IN-ROOM SAFE - 402', length: 4, code: '4471',
        prompt: 'The safe uses Ivo\'s police badge number. The file lists his badge as D-4471. Use the last four digits.',
        hintText: 'Badge D-4471. The safe wants the four digits after the letter.',
        success: 'The safe opens on a cash envelope, a burner phone and a printed transfer schedule.',
        gives: ['c25_safe'], flags: ['safeOpen'],
        short: 'The transfer schedule is in the safe.',
        log: 'The safe holds Â£8,000 in cash and a printed police evidence transfer schedule for Saturday 01:00.'
      },
      'backup-term': {
        type: 'terminal', title: "Ivo's Backup Phone", subtitle: 'One unsent message', icon: 'terminal',
        user: 'imarsh', host: 'secure-handler', password: 'meridian',
        intro: 'Secure handler app. Type help for commands.',
        banner: '1 DRAFT MESSAGE - UNSENT - PRIORITY',
        files: [
          { name: 'draft.txt', locked: true, hint: 'Encrypted with the operation name.', secret: true, body: '<span class="g">TO: HANDLER</span><br><br>Marta knows I am police. She did not run. She offered me a deal and a drink.<br><br>If this does not send, the route is compromised. The transfer is Saturday at 01:00. The buyer is using Marta\'s corporate account.<br><br><span class="r">Do not trust the courier story. The courier is a mule, not the leak.</span>' },
          { name: 'calls.txt', body: '20:12 - incoming - MARTA<br>20:14 - incoming - MARTA<br>20:31 - outgoing - HANDLER - 11 seconds<br>20:33 - incoming - MARTA<br><span class="d">Phone placed in safe at 20:35.</span>' },
          { name: 'notes.txt', body: 'Alias: Dane Rook. Scar left hand.<br>Marta runs the room. Corporate account: MERIDIAN HOLDINGS.<br>Courier: Leo Ward. Paid by Marta. Not the source.' }
        ],
        hintText: 'The operation name is MERIDIAN. Try the handler\'s app password.',
        success: 'Ivo\'s draft names Marta, the corporate account and the transfer time. He believed the courier was a mule, not the leak.',
        gives: ['c25_phone'], flags: ['backupOpen'],
        short: 'Ivo\'s draft names Marta.',
        log: 'Ivo\'s unsent message identifies Marta as the buyer, gives the transfer time, and clears the courier as a mule.'
      },
      'key-audit': {
        type: 'terminal', title: 'Hotel Key Audit', subtitle: 'Room 402 access', icon: 'terminal',
        user: 'security', host: 'gilt-keys', password: 'gilt',
        intro: 'Gilt Room key console. Type help for commands.',
        banner: 'KEY EVENTS - ROOM 402 - 19:00 TO 22:00',
        files: [
          { name: 'keys.log', body: '20:18 MASTER open - M. VOSS<br>20:44 MASTER open - M. VOSS<br>21:09 GUEST card issued - D. ROOK<br>21:12 GUEST open - D. ROOK<br><span class="r">21:13 MASTER open - M. VOSS</span>' },
          { name: 'issue.txt', body: '<span class="d">Guest card D. ROOK issued at reception by M. VOSS.</span><br>Identification presented: passport. Photo matches body.<br><span class="d">Note: passport not retained.</span>' },
          { name: 'master.txt', body: 'Master key: held by M. VOSS and security chief.<br>Security chief off-site until 23:00.<br><span class="d">All master opens logged to the host.</span>' }
        ],
        hintText: 'The master key opens the room before and after the guest card is issued. Marta is the only master key holder on site.',
        success: 'Marta\'s master key opens room 402 at 20:18 and 20:44, then again at 21:13 - after the guest card was used. She was in the room with the body.',
        gives: ['c25_keylog'], flags: ['keyAudit'],
        short: 'Marta opened 402 before and after check-in.',
        log: 'The key audit shows Marta\'s master key opening room 402 at 20:18, 20:44 and 21:13. She was there before and after the fake check-in.'
      },
      'desk-audio': {
        type: 'audio', title: 'Desk Recorder', subtitle: 'A conversation after the death', icon: 'ear',
        prompt: 'The recorder was running when you arrived. Two voices, one calm, one frightened. Identify what the calm voice is doing.',
        pattern: [330, 330, 0, 280, 430, 0, 280],
        waveform: 'A woman speaks in even sentences. A man answers in fragments. She repeats one phrase three times, slower each time, like a line being taught.',
        options: [
          { t: 'Marta is coaching Leo to take the blame', v: 'coach' },
          { t: 'Marta is confessing to the murder', v: 'confess' },
          { t: 'Leo is threatening Marta', v: 'threat' },
          { t: 'Two guests are arguing about a bill', v: 'bill' }
        ],
        answer: 'coach',
        wrong: 'Listen to who repeats and who follows. The calm voice is teaching a story, not telling one.',
        hintText: 'The woman repeats the same line. The man repeats it back. That is rehearsal.',
        success: 'Marta is coaching Leo: You will say you sold the route. I will pay your family. The recording is her voice, unmistakably.',
        gives: ['c25_coaching'], flags: ['deskAudio'],
        short: 'Marta is coaching Leo to confess.',
        log: 'The desk recorder captures Marta coaching Leo to claim he sold the route, promising to pay his family.'
      },
      'corridor-seq': {
        type: 'sequence', title: 'Corridor Camera', subtitle: 'Four clips and a loop', icon: 'cctv',
        prompt: 'Put the corridor clips in order. The camera loops once; the repeated clip is the gap.',
        variant: 'strips',
        items: [
          { t: 'Ivo enters 402 alone', sub: '20:12' },
          { t: 'Marta enters with a bottle', sub: '20:18' },
          { t: 'Corridor empty - camera loop', sub: '20:30' },
          { t: 'Marta leaves, towel around hand', sub: '20:45' }
        ],
        success: 'The loop covers fifteen minutes. Marta enters before it and leaves after. The fake check-in happens inside the gap.',
        gives: ['c25_camera'], flags: ['corridorSeq'],
        short: 'The camera loop hides Marta leaving 402.',
        log: 'The corridor camera loops for fifteen minutes while Marta is inside room 402 with Ivo.'
      }
    },
    clues: {
      'c25_scar': { name: 'Scar confirmation', caption: 'Left hand - matches Dane Rook file', icon: 'id', type: 'Identification',
        desc: 'The body carries the old scar described in Dane Rook\'s file. The dead man is Ivo Marsh, the undercover officer.',
        tells: 'The victim is the real Dane Rook alias. The identity did not die with him.' },
      'c25_autopsy': { name: 'Sedative and puncture', caption: 'Bitter champagne - needle behind ear', icon: 'pill', type: 'Forensic observation',
        desc: 'A sedative in the champagne and a small puncture behind the left ear. The second glass is untouched.',
        tells: 'Ivo was drugged and injected. The overdose was staged after death.' },
      'c25_safe': { name: 'Room safe contents', caption: 'Cash - burner phone - transfer schedule', icon: 'money', type: 'Physical evidence',
        desc: 'Â£8,000 cash, a burner phone and a printed schedule for the police evidence transfer at 01:00 Saturday.',
        tells: 'The room was a business office. The transfer was the product being sold.' },
      'c25_phone': { name: "Ivo's unsent message", caption: 'Marta knows - courier is a mule', icon: 'phone', type: 'Digital evidence',
        desc: 'Ivo\'s draft names Marta, the corporate account and the transfer time. He says the courier is a mule, not the leak.',
        tells: 'The victim identified his killer before he died.' },
      'c25_roster': { name: 'Guest register', caption: 'D. Rook in at 21:10 - do not disturb at 20:25', icon: 'ledger', type: 'Document',
        desc: 'Room 402 is booked to D. Rook at 21:10 but marked do-not-disturb at 20:25. The corporate account belongs to Meridian Holdings.',
        tells: 'Someone checked in under a dead man\'s name after he was killed.' },
      'c25_keylog': { name: 'Master key audit', caption: 'Marta opens 402 before and after check-in', icon: 'key', type: 'Technical record',
        desc: 'Marta\'s master key opens room 402 at 20:18, 20:44 and 21:13. The guest card is issued at 21:09.',
        tells: 'Marta was in the room before the fake check-in and again after it. She controlled the scene.' },
      'c25_witness': { name: "Lucia's statement", caption: 'Marta left 402 at 20:45 - towel on hand', icon: 'eye', type: 'Witness statement',
        desc: 'The maid saw Marta leave room 402 at 20:45 with a towel around her hand, and heard the shower running at 20:20.',
        tells: 'Marta was in the room with Ivo when he died. The towel hid a cut or a burn.' },
      'c25_camera': { name: 'Corridor loop', caption: 'Fifteen minutes missing - 20:30 to 20:45', icon: 'cctv', type: 'Video evidence',
        desc: 'The corridor camera loops from 20:30 to 20:45. Marta enters before the loop and leaves after it.',
        tells: 'The camera gap was made to hide Marta leaving the room, not a stranger entering.' },
      'c25_coaching': { name: 'Desk recording', caption: 'Marta coaches Leo to take the blame', icon: 'sound', type: 'Audio evidence',
        desc: 'Marta\'s voice, recorded on the office desk: You will say you sold the route. I will pay your family.',
        tells: 'Marta constructed the courier story. The courier is a scapegoat.' },
      'c25_cufflink': { name: 'Engraved cufflink', caption: 'M under the bed - Marta\'s pair', icon: 'jewelry', type: 'Red herring',
        desc: 'A silver cufflink engraved M found under Leo\'s bed. It matches Marta\'s pair, not Leo\'s clothing.',
        tells: 'Marta planted it, or lost it while managing Leo. It points at her, not at him.' },
      'c25_delivery': { name: 'Delivery log', caption: 'Six police warehouse runs - Halloran signed', icon: 'ticket', type: 'Document',
        desc: 'Six deliveries to the police evidence warehouse, all signed by Sergeant Halloran and collected by Leo under Marta\'s instruction.',
        tells: 'Halloran and Marta are the link. Leo moved boxes; he did not sell the route.' },
      'gilt_roster': { name: 'Gilt Room attendee roster', caption: 'Recovered undercover - alias entries', icon: 'ledger', type: 'Undercover evidence',
        desc: 'The operation roster lists every attendee at the Gilt Room sale, including the Meridian corporate account and the alias D. Rook.',
        tells: 'The sale was run through Marta\'s company. The roster ties the network to the hotel.' },
      'gilt_recording': { name: 'Wiretap recording', caption: 'Marta orders the cover story', icon: 'sound', type: 'Undercover evidence',
        desc: 'The recording from the Gilt Room captures Marta instructing the courier to take the blame and naming the buyer of the transfer.',
        tells: 'Marta is the leak and the killer. The operation delivered the proof.' }
    },
    suspects: [
      {
        id: 'marta', name: 'Marta Voss', role: 'Host of the Gilt Room - Meridian account holder', location: 'office', locationName: 'Manager\'s office',
        tag: 'Primary suspect', portrait: { seed: 'marta-voss', hair: 'silver', hairColor: '#c8c0b4', skin: 1, expression: 'cold', collar: 'blazer' },
        intro: 'Marta is silver-haired, immaculate, and speaks to you as if you are a guest who has overstayed. She owns the register, the master key and the corporate account that paid for room 402.',
        questions: [
          { q: 'When did Dane Rook check in?', a: 'At ten past nine. I issued the card myself. He was a quiet man. He paid in advance and asked not to be disturbed.', gives: ['c25_roster'],
            follow: 'The register also says do-not-disturb at 20:25, forty-five minutes before he arrived.' },
          { q: 'Did you enter room 402?', a: 'Only to deliver the champagne. I do not clean rooms. That is Lucia\'s job.', requires: ['c25_keylog'], gives: ['c25_keylog'],
            follow: 'The master key log puts her in the room three times, including after the guest card was used.' },
          { q: 'Who is Dane Rook?', a: 'A fixer from the coast. He buys access. I do not ask what access. That is the arrangement.', requires: ['c25_phone'], gives: ['c25_phone'],
            follow: 'Ivo\'s unsent message says Dane Rook was a police alias. Marta knew, and she still served him.' },
          { q: 'Why does the hotel account belong to Meridian Holdings?', a: 'A holding company for the building. It is dull paperwork. You would not understand it.', requires: ['c25_roster'],
            follow: 'Meridian Holdings also paid the courier and booked the transfer schedule.' },
          { q: 'Did you tell Leo to take the blame?', a: 'Leo is a delivery boy. He takes orders. If he says otherwise, he is confused.', requires: ['c25_coaching'], gives: ['c25_coaching'],
            follow: 'The desk recorder says otherwise. Her voice, his name, a promise to pay his family.' }
        ],
        after: 'She offers you a drink. She does not ask whether you are police. She already knows.'
      },
      {
        id: 'leo', name: 'Leo Ward', role: 'Courier - paid by Marta', location: 'courier', locationName: "Leo's flat",
        tag: 'Scapegoat', portrait: { seed: 'leo-ward', hair: 'short', hairColor: '#2a1a10', skin: 4, expression: 'afraid', collar: 'jacket' },
        intro: 'Leo is twenty-six, thin, and has packed a suitcase he does not want to explain. He says he moved boxes and never asked what was in them. He is telling the truth about that.',
        questions: [
          { q: 'Did you sell the transfer route?', a: 'No. I drove boxes. Marta paid me in cash. She said it was hotel business. I never met the buyer.', gives: ['c25_delivery'],
            follow: 'His delivery log shows six runs, all signed by Sergeant Halloran. Leo collected, he did not negotiate.' },
          { q: 'Why were you leaving?', a: 'Marta told me to. She gave me a ticket and said to stay away for a week. She said the police would look for a courier, not a host.', requires: ['c25_coaching'],
            follow: 'She was moving him out of the way and preparing him to be the story.' },
          { q: 'Whose cufflink is under your bed?', a: 'Hers. She was here last night, shouting at me to keep my mouth shut. She must have lost it.', requires: ['c25_cufflink'], gives: ['c25_cufflink'],
            follow: 'The engraving is M. Leo owns no silver cufflinks.' }
        ]
      },
      {
        id: 'ada', name: 'Ada Renn', role: 'Woman in green - inside the network', location: 'office', locationName: 'Gilt Room bar',
        tag: 'Witness', portrait: { seed: 'ada-renn', hair: 'long', hairColor: '#3a1a12', skin: 2, expression: 'wary', collar: 'coat' },
        intro: 'Ada wears her coat indoors and orders nothing. She was in the Gilt Room on the night and she is the only person there who seems afraid of Marta rather than of you.',
        questions: [
          { q: 'Who runs the Meridian account?', a: 'Marta. The hotel, the transfers, the couriers. She calls it hospitality. It is a queue for access.', gives: ['c25_roster'],
            follow: 'The corporate account and the master key both belong to her.' },
          { q: 'Did you see Ivo leave the room?', a: 'I saw Marta go in with a bottle. I saw her come out alone. She was holding her hand in a towel and she did not look like a host.', requires: ['c25_witness'],
            follow: 'Ada\'s account matches Lucia\'s and the key audit.' },
          { q: 'Who bought the transfer?', a: 'Halloran. The desk sergeant. He signed the route and the deliveries. Marta sold him the schedule.', requires: ['c25_delivery'],
            follow: 'Halloran is the buyer on the other side. Marta is the seller in this room.' }
        ]
      }
    ],
    timeline: [
      { time: '20:12', text: 'Ivo enters room 402 alone.' },
      { time: '20:18', text: 'Marta enters with a bottle. Master key.' },
      { time: '20:30', text: 'Corridor camera loops. Fifteen minutes are lost.' },
      { time: '20:45', text: 'Marta leaves 402 with a towel around her hand.' },
      { time: '21:09', text: 'Guest card for D. Rook issued to Marta.' },
      { time: '21:10', text: 'The register records D. Rook checking in.' },
      { time: '21:13', text: 'Marta\'s master key opens 402 again.' },
      { time: '23:10', text: 'Hotel security finds Ivo dead.' }
    ],
    links: [
      { a: 'c25_keylog', b: 'marta', note: 'Marta opened 402 before and after the fake check-in.' },
      { a: 'c25_roster', b: 'marta', note: 'Meridian Holdings paid for the room and the alias.' },
      { a: 'c25_coaching', b: 'marta', note: 'Her recorded voice coaches Leo to confess.' },
      { a: 'c25_cufflink', b: 'marta', note: 'Her engraved cufflink was under Leo\'s bed.' },
      { a: 'gilt_recording', b: 'marta', note: 'The wiretap captures Marta ordering the cover story.' },
      { a: 'gilt_roster', b: 'marta', note: 'The attendee roster ties the sale to the Meridian account.' }
    ],
    forensics: {
      prompt: 'Two samples from the suite. Match each to its reference.',
      samples: [
        { id: 'champagne', type: 'RESIDUE', label: 'Used flute - bitter residue', mark: 'benzodiazepine + alcohol' },
        { id: 'puncture', type: 'TRACE', label: 'Puncture behind ear', mark: 'fine-gauge needle, no metal' }
      ],
      candidates: [
        { id: 'sed', label: 'Sedative prescription - Marta Voss' },
        { id: 'hotel', label: 'Hotel minibar medication' },
        { id: 'ivo', label: "Ivo's own emergency kit" }
      ],
      answer: { champagne: 'sed', puncture: 'sed' },
      success: 'Both samples match the sedative prescribed to Marta Voss. She brought the drug into the room.',
      gives: ['c25_autopsy']
    },
    documents: [
      { id: 'register', title: 'Gilt Room guest register', sub: 'Handwritten - 402', body: '<div class="doc-sheet"><b>THE GILT ROOM - PRIVATE REGISTER</b><br><br>402 - <b>D. ROOK</b> - IN 21:10 - OUT ---<br>Account: <b>MERIDIAN HOLDINGS</b><br>Signed: <b>M. VOSS</b><br><br><span class="d">Pencil, margin: 402 - late checkout - do not disturb - 20:25</span><br><span class="d">Pencil, lower margin: guest card issued 21:09</span></div>',
        question: 'What is impossible about the register?',
        options: [
          { t: 'The room was marked do-not-disturb before the guest checked in', v: 'a' },
          { t: 'The room number is wrong for the fourth floor', v: 'b' },
          { t: 'Marta did not sign the entry', v: 'c' }
        ],
        answer: 0, gives: ['c25_roster'],
        log: 'The register marks room 402 do-not-disturb at 20:25, before D. Rook checks in at 21:10.',
        wrong: 'Compare the pencil time to the check-in time.' },
      { id: 'transfer', title: 'Evidence transfer schedule', sub: 'Recovered from the room safe', body: '<div class="doc-sheet"><b>METROPOLITAN POLICE - EVIDENCE TRANSFER</b><br>Case: Operation Lattice<br>Route: Warehouse 4 -> Central Court<br>Time: <b>Saturday 01:00</b><br>Escort: 2 officers<br>Authorising officer: <b>Sgt J. HALLORAN</b><br><br><span class="d">Copy 3 of 3. Copy 1 retained by authorising officer. Copy 2 unaccounted for.</span></div>',
        question: 'Why does the schedule matter?',
        options: [
          { t: 'It is the product Marta was selling and Halloran was buying', v: 'a' },
          { t: 'It proves Ivo was not on duty', v: 'b' },
          { t: 'It shows the transfer was cancelled', v: 'c' }
        ],
        answer: 0, gives: ['c25_safe'],
        log: 'The transfer schedule is the commodity. Halloran authorised the route; Marta sold it from room 402.',
        wrong: 'Ask who benefits from knowing the route and the escort.' }
    ],
    audioCalls: [
      { id: 'c25-999', title: 'Emergency call - hotel security', sub: 'Report from room 402', cue: 'Under the guard\'s voice: a lift arriving, then Marta\'s voice in the background saying, I will handle this. She is already in the corridor.', pattern: [420, 0, 420, 0, 330], tone: 'sine',
        options: [
          { t: 'Marta was already at the scene before police were called', v: 'a' },
          { t: 'Marta was asleep in her office', v: 'b' },
          { t: 'The guard called from outside the hotel', v: 'c' }
        ],
        answer: 0, gives: ['c25_witness'], flag: 'callHeard',
        log: 'The security call captures Marta in the corridor before the police arrive. She was managing the scene.',
        wrong: 'Listen for the voice in the background. Marta is already there.' }
    ],
    mapTask: {
      q: 'Which route fits the key log, the camera and the maid?',
      options: [
        { t: 'Marta: office -> 402 at 20:18 -> office at 20:45 -> 402 at 21:13', v: 'a' },
        { t: 'Marta: office -> home at 20:00 -> hotel at 23:00', v: 'b' },
        { t: 'Leo: flat -> 402 at 20:18 -> warehouse', v: 'c' }
      ],
      answer: 0, gives: ['c25_keylog'],
      log: 'Marta went office to 402, back to the office, then to 402 again after the fake check-in.',
      wrong: 'The master key and the camera both put Marta on the fourth floor twice.' },
    redHerrings: [
      { clue: 'c25_cufflink', label: 'The engraved cufflink', clearedBy: ['c25_cufflink', 'c25_coaching'], note: 'The cufflink is Marta\'s, planted under Leo\'s bed. Leo is the mule, not the murderer.' },
      { clue: 'c25_delivery', label: 'The courier\'s delivery log', clearedBy: ['c25_delivery', 'gilt_recording'], note: 'Leo moved sealed boxes on Marta\'s instructions. The recording shows her building his confession.' }
    ],
    contradictions: [
      { suspect: 'marta', statement: 1, evidence: ['c25_keylog', 'c25_witness'],
        expose: 'The master key opens 402 three times, and Lucia sees her leave at 20:45. She did not deliver champagne; she managed a death.',
        wrong: 'Lucia and the key audit both put her inside the room.' },
      { suspect: 'marta', statement: 3, evidence: ['c25_roster'],
        expose: 'Meridian Holdings paid for the room, the courier and the transfer. It is not dull paperwork; it is her operation.',
        wrong: 'Follow the corporate account. It leads straight back to her desk.' },
      { suspect: 'marta', statement: 4, evidence: ['c25_coaching', 'gilt_recording'],
        expose: 'The desk recorder captures her coaching Leo to confess. The wiretap captures her naming the buyer. He is not confused; he is scripted.',
        wrong: 'Play the recording again. The calm voice is hers.' }
    ],
    solution: {
      minEvidence: 8,
      questions: [
        { kind: 'suspect', q: 'Who killed Ivo Marsh?', options: [
          { t: 'Marta Voss - host of the Gilt Room', v: 'marta' },
          { t: 'Leo Ward - the courier', v: 'leo' },
          { t: 'Ada Renn - the woman in green', v: 'ada' },
          { t: 'Sergeant Halloran - the buyer', v: 'halloran' }
        ], answer: 'marta' },
        { kind: 'method', q: 'How was Ivo killed?', options: [
          { t: 'Sedative in champagne, then an injection, staged as an overdose', v: 'sedative' },
          { t: 'A genuine overdose he took himself', v: 'overdose' },
          { t: 'Strangled during a struggle', v: 'strangled' },
          { t: 'Shot and the wound hidden by the bedding', v: 'shot' }
        ], answer: 'sedative' },
        { kind: 'motive', q: 'Why was Ivo killed?', options: [
          { t: 'He was police, and Marta was selling the evidence transfer route', v: 'transfer' },
          { t: 'He was blackmailing Leo over the deliveries', v: 'blackmail' },
          { t: 'He refused to pay for his room', v: 'room' },
          { t: 'He was a rival fixer from the coast', v: 'rival' }
        ], answer: 'transfer' },
        { kind: 'evidence', q: 'Which evidence proves Marta ran the operation?', options: [
          { t: 'The wiretap recording and the attendee roster', v: 'wiretap' },
          { t: 'The unused champagne glass', v: 'glass' },
          { t: 'The maid\'s towel', v: 'towel' },
          { t: 'The hotel lift chime', v: 'lift' }
        ], answer: 'wiretap' }
      ],
      verdict: {
        who: "Marta Voss",
        whoDesc: ", the host of the Gilt Room, was charged with the murder of Detective Ivo Marsh.",
        how: "She sedated his champagne, injected him in the room, and staged the scene as an overdose. Forty minutes later she checked Dane Rook into 402 to build a second, living suspect.",
        why: "Ivo was police, three days from closing the case on the evidence-transfer sale. Marta ran the auction, and his testimony would have ended it.",
        key: "The wiretap recording of her ordering the cover story, and the attendee roster in the Meridian account."
      },
      reveal: [
        "Ivo Marsh checked in as Dane Rook because the hotel never asked twice. Marta used the same alias at 21:10 to prove he was alive after he was already cold.",
        "The cufflink under Leo's bed was planted. Leo moved sealed boxes and believed he was a courier. The recording shows Marta building his confession before anyone had asked him a question.",
        "The Gilt Room sold more than rooms. The roster, the recording and the corporate account all point at an operation that reached beyond the hotel, and beyond the sergeant who came to buy it."
      ],
      quote: "A room with no register is a room where anyone can be anyone. Even the dead.",
      twist: "Sergeant Halloran was the buyer, not the killer. The file does not end at the Gilt Room; it only starts there."
    }
  });
})();
