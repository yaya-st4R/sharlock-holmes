/* ============================================================
   CASE 24 — THE KINGSWAY VAULT
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c24', num: 24,
    title: 'The Kingsway Vault',
    subtitle: 'A vault manager dies inside a time-locked strongroom that nobody could have left.',
    difficulty: 5, est: '45–55 min',
    cover: { kind: 'office', mood: 'mansion' },
    facts: [
      { k: 'Victim', v: 'Edmund Sayer, 61 — vault manager, Kingsway Private Bank' },
      { k: 'Scene', v: 'The strongroom, Kingsway House' },
      { k: 'Found', v: '07:20 — by the cleaning supervisor' },
      { k: 'Cause', v: 'Cyanide · administered in his evening coffee' }
    ],
    briefing: [
      'Kingsway Private Bank has held other people’s secrets since 1907. Its strongroom sits two floors below the lobby behind a door of hardened steel and a time lock that cannot be opened between eight at night and seven in the morning. The clients like that. Some of them pay for it.',
      'At twenty past seven the cleaning supervisor found Edmund Sayer sitting at the strongroom desk with his head on his arms and his coffee cup beside him. The door had opened on time. The log said nobody had entered or left since eight the previous evening. The first officer wrote “natural causes” and asked whether the family wanted the cup returned.',
      'The pathologist found cyanide in the coffee and in Edmund’s blood. He had died between 19:50 and 20:10. The door sealed at 20:14. The strongroom was not opened again until 07:14.',
      'That should be impossible. Edmund was inside. The killer was not. And between those two times, safety deposit box 118 was drilled open and £2.1 million in bearer bonds was taken.',
      'The bank wants this to be a tragedy and a robbery. The bonds say otherwise: they were issued to Meridian Heritage, the company that has been buying half the city. The bank has been holding them for a client who does not exist.'
    ],
    opening: 'The strongroom is a cold steel box with a marble floor and a smell of oil and paper. Edmund Sayer sits at the desk as if he has fallen asleep. The time-lock dial above the door reads 07:14. At the far wall, box 118 hangs open, its lock drilled in a neat circle. The drill is not there.',
    objectives: [
      'Prove Edmund was murdered before the door sealed.',
      'Work out how the killer left a time-locked room.',
      'Find out what was in box 118.',
      'Establish who had the override and the motive.'
    ],
    locations: [
      {
        id: 'strongroom', name: 'The strongroom', short: 'Strongroom', time: '07:45',
        art: { kind: 'basement', mood: 'cold' },
        intro: 'A steel-lined room the size of a small flat: a desk, two chairs, a wall of deposit boxes, and a marble floor. The time-lock dial is above the door. Box 118 is open and empty. Edmund’s cup is still on the desk beside his hand.',
        actions: [
          { id: 'body', label: 'Examine Edmund and the desk', icon: 'blood', hotspot: { x: 48, y: 58 },
            desc: 'The cup, the desk, the open box',
            text: [
              'Edmund Sayer is slumped forward, face turned to the left, hands relaxed. There is no sign of a struggle. His lips and fingernails are pink — the particular pink of cyanide, not of a heart attack.',
              'The coffee cup is half full and smells of bitter almonds. A small brown bottle lies in the waste bin under the desk, labelled <b>“PHOTOGRAPHIC FIXER — SODIUM CYANIDE”</b>. It has been wiped clean.',
              'Box 118 is open. The lock has been drilled with a neat circular cut, the kind a diamond core bit makes. A fine grey powder sits on the shelf beneath it.'
            ],
            gives: ['body-note', 'cyanide-bottle', 'box-drilled'],
            hint: 'The poison is in the coffee. The bottle is in the bin. The box was drilled, not picked.'
          },
          { id: 'search', label: 'Search the strongroom', icon: 'search', puzzle: 'vault-search',
            desc: 'Six details in a sealed room',
            requires: ['body-note'],
            hint: 'Check the door, the dial, the desk, box 118, the floor, and the ventilation grille.' },
          { id: 'lock', label: 'Read the time-lock dial', icon: 'chart', puzzle: 'lockmath',
            desc: 'The dial is fast — by how much?', requires: ['timelock-log'],
            hint: 'Divide the drift by the gain per hour. The answer is in hours.' },
          { id: 'drill', label: 'Calculate the drilling time', icon: 'tool', puzzle: 'drillmath',
            desc: 'How long was the killer in the room?', requires: ['box-drilled'],
            hint: '18 mm at 0.75 mm per minute, plus twelve minutes of setup and five of cooling.' }
        ]
      },
      {
        id: 'lobby', name: 'The bank lobby', short: 'Lobby', time: '08:30',
        art: { kind: 'interior', mood: 'mansion' },
        requires: ['body-note'],
        intro: 'A cathedral of marble and brass, built to make depositors feel small. The night porter, Henry Osei, is behind the counter with a mop and a story. The visitor log is open on the desk. The lift has a brass gate and a handwritten sign: OUT OF ORDER.',
        actions: [
          { id: 'porter', label: 'Interview Henry Osei', icon: 'user', suspect: 'henry',
            desc: 'Night porter · the only man on the floor', hint: 'Henry was here all night. Ask him who came in after seven.' },
          { id: 'log', label: 'Read the visitor log', icon: 'ledger',
            desc: 'Seven names and one blank line', requires: ['body-note'],
            text: [
              'The visitor log records seven entries for Thursday: four clients, a courier, a cleaner, and <b>“V. HALE — 19:40 — MAINTENANCE”</b>. The final line is blank except for a time: <b>20:12</b>.',
              'The courier delivered a sealed case at 18:55 and left at 19:05. The cleaner signed in at 19:30 and out at 19:55. Victor Hale signed in at 19:40 and did not sign out.',
              'The lift was taken out of service at 20:20 by a maintenance key. The service stairs to the strongroom level were locked at 20:25 with the same key.'
            ],
            gives: ['visitor-log', 'lift-record'],
            hint: 'Victor Hale signed in and never out. The lift was taken out of service twenty minutes later.'
          },
          { id: 'lift', label: 'Inspect the lift and service stairs', icon: 'tool',
            desc: 'A maintenance key and a service corridor', requires: ['visitor-log'],
            text: [
              'The lift gate opens onto a service corridor that runs behind the strongroom wall. The corridor has a fire door at each end and a panel marked <b>“TIME-LOCK OVERRIDE — AUTHORISED PERSONNEL”</b>.',
              'The override panel is unlocked. Its log shows the strongroom door was released at 20:09 and resealed at 20:14. The release was authorised with a security key, not a manager’s code.',
              'A maintenance key hangs in the lift control box. It is stamped <b>V.H.</b> The service corridor has a fresh scuff of grey dust on the floor, the same colour as the powder under box 118.'
            ],
            gives: ['override-log', 'maintenance-key'], flags: ['liftChecked'],
            hint: 'The override released the door at 20:09 — before it sealed. The key is Victor’s.'
          }
        ]
      },
      {
        id: 'security', name: 'Security office', short: 'Security', time: '09:20',
        art: { kind: 'server', mood: 'cold' },
        requires: ['override-log'],
        intro: 'A windowless room of monitors and grey lockers. Victor Hale is at the desk in a security uniform with his cap off and his hands very still. He has been in the building since 19:40. He says he was checking the alarm all night.',
        actions: [
          { id: 'victor', label: 'Interview Victor Hale', icon: 'user', suspect: 'victor',
            desc: 'Security chief · holder of the override', hint: 'Victor has the override key. Ask him about the 20:09 release.' },
          { id: 'alarm', label: 'Repair the alarm panel', icon: 'tool', puzzle: 'alarm',
            desc: 'Four zones cross-wired', requires: ['override-log'],
            hint: 'Match each zone to its circuit. The labels are stamped inside the panel.' },
          { id: 'locker', label: 'Search the lockers', icon: 'lockbox',
            desc: 'A tool case, a locker, a deposit slip', requires: ['lift-record'],
            text: [
              'Victor’s locker holds a black tool case with a diamond core bit, a tube of cutting paste, and a small vacuum cleaner for metal dust. The bit is 22 mm, the exact diameter of the hole in box 118.',
              'A deposit slip in the case records the contents of box 118: <b>“£2.1M BEARER BONDS — MERIDIAN HERITAGE — DO NOT RECORD”</b>. The slip is signed by the bank’s manager, not by Victor.',
              'A second locker, belonging to the deputy manager, contains a betting slip for £14,000 and a letter from a loan company. The lock has not been forced.'
            ],
            gives: ['tool-case', 'bond-slip', 'deputy-debt'],
            hint: 'The drill bit matches the hole. The bond slip names Meridian.'
          }
        ]
      },
      {
        id: 'office', name: 'The manager’s office', short: 'Manager’s office', time: '10:30',
        art: { kind: 'office', mood: 'mansion' },
        requires: ['bond-slip'],
        intro: 'A panelled office on the second floor with a view of the river and a portrait of the founder. The deputy manager, Celia Vane, is at the desk with a spreadsheet open and a cup of coffee she has not touched. She has been running the bank since eight.',
        actions: [
          { id: 'celia', label: 'Interview Celia Vane', icon: 'user', suspect: 'celia',
            desc: 'Deputy manager · acting head', hint: 'Celia signed the bond slip. Ask her who authorised box 118.' },
          { id: 'desk', label: 'Search the manager’s office', icon: 'ledger',
            desc: 'A box register, an audit memo, a key', requires: ['bond-slip'],
            text: [
              'The box register lists 118 as <b>“MERIDIAN HERITAGE — SEALED — NO ACCESS WITHOUT MANAGER + SECURITY”</b>. The last access entry is dated three years ago, when the box was deposited.',
              'An internal audit memo, dated last month, notes that box 118 has never been inspected and that the client’s address is a serviced office in Rotterdam. Edmund has written in the margin: <b>“Ask V.H. why the bonds are not on the client ledger.”</b>',
              'A spare strongroom key is in the desk drawer, still sealed in its envelope. The seal is unbroken. The key has never been used.'
            ],
            gives: ['box-register', 'audit-memo', 'spare-key'],
            hint: 'Edmund was asking Victor about the bonds. The spare key is still sealed.'
          },
          { id: 'safe', label: 'Open the manager’s safe', icon: 'keypad', puzzle: 'safe',
            desc: 'Four digits · the bank’s founding year', requires: ['box-register'],
            hint: 'Kingsway Private Bank was founded in 1907. Try 1907.' },
          { id: 'files', label: 'Read the Meridian file', icon: 'archive',
            desc: 'The client who does not exist', requires: ['safe-open'],
            text: [
              'The Meridian file contains a power of attorney, a passport copy in the name of <b>Ian Kettle</b>, and a letter authorising Victor Hale to act for the client in all matters concerning box 118.',
              'A second letter, from the bank’s compliance office, asks why £2.1 million in bearer bonds were accepted without a source-of-funds declaration. Edmund has replied: <b>“Because V.H. signed it through. I am asking the board.”</b>',
              'The board meeting is scheduled for Monday. Edmund’s death is on Thursday.'
            ],
            gives: ['meridian-file', 'kettle-authority', 'board-letter'],
            hint: 'The box belongs to Meridian, and Victor acts for it. Edmund was going to the board.'
          }
        ]
      },
      {
        id: 'workshop', name: 'Vault workshop', short: 'Workshop', time: '11:40',
        art: { kind: 'lab', mood: 'cold' },
        requires: ['tool-case'],
        intro: 'A concrete room behind the strongroom with a bench, a vice, and a rack of core bits. The bank’s locksmith, Ada Okonkwo, is at the bench with a magnifier and a drilled lock cylinder. She has already worked out how it was done. She wants to tell someone.',
        actions: [
          { id: 'ada', label: 'Interview Ada Okonkwo', icon: 'user',
            desc: 'Locksmith · the only honest expert', hint: 'Ada can tell you how box 118 was opened and how long it took.' },
          { id: 'bench', label: 'Examine the workshop', icon: 'tool',
            desc: 'A core bit, a jig, a time-lock manual', requires: ['box-drilled'],
            text: [
              'The bench holds a portable drill jig, a set of diamond core bits, and a coffee tin full of grey powder. The jig is set for a 22 mm bit and a 90-degree entry — the exact angle of the hole in box 118.',
              'The time-lock manual is open at a page headed <b>“EMERGENCY RELEASE — AUTHORISED PERSONNEL”</b>. The page has been folded over. A handwritten note in the margin reads: <b>“V.H. — release is logged. Use only with manager present.”</b>',
              'A maintenance schedule shows the strongroom was serviced on Thursday afternoon. The engineer signed out at 17:50. Victor Hale signed the work order.'
            ],
            gives: ['drill-jig', 'override-manual', 'service-schedule'],
            hint: 'The jig matches the hole. The override manual explains how the door was released.'
          },
          { id: 'choice', label: 'Identify the drilled box', icon: 'lockbox', puzzle: 'box-choice',
            desc: 'Which box was opened, and what was in it?', requires: ['box-register'],
            hint: 'The bond slip and the register both name box 118.' }
        ]
      },
      {
        id: 'lounge', name: 'The clients’ lounge', short: 'Clients’ lounge', time: '13:00',
        art: { kind: 'hotel', mood: 'mansion' },
        requires: ['meridian-file'],
        intro: 'A quiet room of leather chairs and a portrait of a dead chairman. A man in a grey coat is sitting by the window with a briefcase on his knees. He introduces himself as Ian Kettle’s solicitor and says his client is abroad. He would like box 118 released to him.',
        actions: [
          { id: 'lawyer', label: 'Interview the solicitor', icon: 'user',
            desc: 'Meridian’s representative · wants the box', requires: ['kettle-authority'],
            text: [
              'The solicitor is careful. He says Meridian Heritage deposited the bonds in 2022 and that his client has a right to withdraw them. He produces a power of attorney signed by Ian Kettle.',
              'When you mention that box 118 was drilled open, he closes his briefcase. “Then my client has been robbed,” he says. “As has the bank.” He does not ask how Edmund died.',
              'In the briefcase, visible for a moment: a folder marked <b>“KINGS WAY — COMPLETION”</b>. The bank is being sold, and Meridian is the buyer.'
            ],
            gives: ['solicitor-statement', 'sale-folder'],
            hint: 'Meridian is buying the bank. The bonds were deposited by the buyer.'
          },
          { id: 'timeline', label: 'Rebuild the night', icon: 'clock', puzzle: 'vault-timeline',
            desc: 'Eight moments between 18:55 and 07:20', requires: ['override-log', 'visitor-log'],
            hint: 'Start with the courier and end with the cleaning supervisor.' }
        ]
      }
    ],
    puzzles: {
      'vault-search': {
        type: 'hotspot', title: 'The Strongroom', subtitle: 'Six details in a sealed room', icon: 'search',
        scene: { kind: 'basement', mood: 'cold' },
        targets: [
          { label: 'Coffee cup', x: 42, y: 52, r: 5.5, text: 'A half-full coffee cup that smells of bitter almonds. The cyanide was in the drink, not the air.' },
          { label: 'Cyanide bottle', x: 34, y: 78, r: 5, text: 'A brown bottle of photographic fixer in the waste bin, wiped clean. Sodium cyanide is the active ingredient.' },
          { label: 'Drilled box 118', x: 76, y: 46, r: 6, text: 'Box 118, opened with a 22 mm diamond core bit. Grey powder on the shelf and a perfect circular hole.' },
          { label: 'Time-lock dial', x: 22, y: 30, r: 5, text: 'The time-lock dial above the door, reading 07:14. Its internal clock is running fast.' },
          { label: 'Vent grille', x: 62, y: 24, r: 5, text: 'A ventilation grille at ceiling height. The screws have been removed and replaced, and one is cross-threaded.' },
          { label: 'Grey dust trail', x: 54, y: 70, r: 5.5, text: 'A trail of grey drilling dust from the box toward the door, broken by the cleaner’s mop.' }
        ],
        note: 'Click directly on the details. The strongroom has been sealed since the body was found.',
        hintText: 'Look at the cup, the bin, box 118, the dial, the vent, and the floor.',
        success: 'The strongroom gives up six details: poisoned coffee, a cyanide bottle, drilled box 118, a fast time-lock dial, a tampered vent, and a trail of drilling dust.',
        successTitle: 'The room was not as sealed as it looked.',
        gives: ['vent-tamper', 'dust-trail', 'timelock-log'], flags: ['vaultSearched'],
        short: 'The coffee was poisoned and the vent was tampered with.',
        log: 'The strongroom search finds poisoned coffee, a cyanide bottle, drilled box 118, a fast time-lock dial, a tampered vent and a dust trail.'
      },
      'lockmath': {
        type: 'math', title: 'The Time Lock', subtitle: 'How far had the dial drifted?', icon: 'chart',
        info: 'The time-lock dial gains 2.4 minutes every hour. When the door opened it read 07:14, but the true time was 07:00. The lock was last serviced and reset at 20:00 the previous evening.',
        placeholder: 'hours since reset', unit: 'hours', answer: 11, tolerance: 0.3,
        working: 'The dial was 14 minutes fast. At 2.4 minutes per hour, 14 ÷ 2.4 = 5.83 hours of drift — but the door-opening delay and the service reset add a further five hours of running. The full interval from reset to opening is 11 hours.',
        wrong: 'The dial is 14 minutes fast. Divide by 2.4, then account for the door-opening delay. The answer is eleven hours.',
        hintText: '14 ÷ 2.4 = 5.83. Add the five-hour door delay. The reset was eleven hours before opening.',
        success: 'The maths puts the reset at 20:00 and the opening at 07:00 — eleven hours, exactly as logged. But the dial gained fourteen minutes in that time. The time lock was not tampered with; it was simply fast. The door opened at 07:14 by the dial, and 07:00 by the clock.',
        successTitle: 'The dial explains the time, not the escape.',
        gives: ['timelock-result'], flags: ['lockDone'],
        short: 'The time lock was fast, but not tampered with.',
        log: 'The time-lock dial gained fourteen minutes over eleven hours. It was fast, not bypassed.'
      },
      'drillmath': {
        type: 'math', title: 'The Drilling Time', subtitle: 'How long was the killer at the box?', icon: 'tool',
        info: 'The steel door of deposit box 118 is 18 mm thick. A diamond core bit cuts 0.75 mm per minute through that steel. Setup takes twelve minutes. The bit must cool for five minutes before it can be withdrawn.',
        placeholder: 'minutes at the box', unit: 'minutes', answer: 41, tolerance: 1,
        working: '18 mm ÷ 0.75 mm per minute = 24 minutes. Add 12 minutes of setup and 5 minutes of cooling: 24 + 12 + 5 = 41 minutes.',
        wrong: 'Divide the thickness by the cutting rate, then add the setup and cooling times. The answer is just over forty minutes.',
        hintText: '18 ÷ 0.75 = 24. Add 12 and 5. Total 41 minutes.',
        success: 'The killer needed forty-one minutes at the box. The override released the door at 20:09 and resealed it at 20:14 — five minutes. Forty-one minutes does not fit. The drilling must have happened earlier, or the door was held open longer than the log admits.',
        successTitle: 'The box was drilled before the override.',
        gives: ['drill-time'], flags: ['drillDone'],
        short: 'Box 118 took 41 minutes to drill — longer than the override window.',
        log: 'The drilling calculation shows 41 minutes were needed, far longer than the five-minute override recorded in the log.'
      },
      'alarm': {
        type: 'repair', title: 'The Alarm Panel', subtitle: 'Four zones cross-wired', icon: 'tool',
        prompt: 'The security panel was opened during the night. Zone 4 — the strongroom corridor — was bypassed. The other leads are loose.',
        note: 'Match each zone to its circuit. The labels are stamped inside the panel.',
        pairs: [
          { l: 'ZONE 1 — LOBBY', r: 'CIRCUIT A', color: '#a855f7' },
          { l: 'ZONE 2 — LIFT', r: 'CIRCUIT B', color: '#67e8f9' },
          { l: 'ZONE 3 — STAIRS', r: 'CIRCUIT C', color: '#fbbf24' },
          { l: 'ZONE 4 — STRONGROOM', r: 'CIRCUIT D', color: '#f87171' }
        ],
        hintText: 'Zone 1 to A, zone 2 to B, zone 3 to C, zone 4 to D.',
        success: 'The panel boots and the event buffer loads. Zone 4 was bypassed at 19:52 with a security key and restored at 07:05. The bypass was not recorded in the night log.',
        successTitle: 'The strongroom alarm was switched off at 19:52.',
        gives: ['alarm-log'], flags: ['alarmFixed'],
        short: 'The strongroom alarm was bypassed at 19:52 with a security key.',
        log: 'The repaired alarm panel shows zone 4 was bypassed at 19:52 with a security key and restored at 07:05.'
      },
      'safe': {
        type: 'keypad', title: 'The Manager’s Safe', subtitle: 'Four-digit keypad', icon: 'keypad',
        deviceLabel: 'E. SAYER — PRIVATE', length: 4, code: '1907',
        prompt: 'A safe behind the founder’s portrait. The keypad wants four digits. <span style="color:var(--dim)">Edmund used the bank’s founding year for every combination.</span>',
        hintText: 'Kingsway Private Bank was founded in 1907. Enter 1907.',
        successTitle: 'The safe opens.',
        success: 'Inside: the Meridian client file, a board memorandum, and a sealed envelope addressed to the chairman marked <b>“BOX 118 — URGENT”</b>.',
        gives: ['safe-open', 'meridian-file'], flags: ['safeOpen'],
        short: 'The manager’s safe holds the Meridian file and a letter to the chairman.',
        log: 'The manager’s safe opens on 1907, revealing the Meridian client file and a sealed letter to the chairman about box 118.'
      },
      'box-choice': {
        type: 'choice', title: 'Which Box?', subtitle: 'Identify the drilled deposit box', icon: 'lockbox',
        prompt: 'The strongroom holds 240 deposit boxes. One was drilled. Use the register, the bond slip and the dust trail to identify it.',
        options: [
          { t: 'Box 118 — Meridian Heritage — £2.1m bearer bonds', v: '118' },
          { t: 'Box 204 — a private client — family jewellery', v: '204' },
          { t: 'Box 071 — the bank’s own deeds and seals', v: '071' },
          { t: 'Box 162 — a sealed estate file from 1998', v: '162' }
        ],
        answer: '118',
        wrong: 'Check the bond slip and the box register. The drilled box belongs to the client who does not exist.',
        hintText: 'The bond slip names box 118 and Meridian Heritage.',
        success: 'Box 118 was the target: £2.1 million in bearer bonds deposited by Meridian Heritage, a client with a Rotterdam address and no source-of-funds declaration. The bonds were the reason for the murder and the sale.',
        successTitle: 'The box belonged to Meridian Heritage.',
        gives: ['box-118'], flags: ['boxIdentified'],
        short: 'Box 118 held Meridian Heritage’s bearer bonds.',
        log: 'Box 118, belonging to Meridian Heritage, held £2.1 million in bearer bonds and was the target of the drilling.'
      },
      'vault-timeline': {
        type: 'sequence', title: 'The Night, In Order', subtitle: 'Eight moments before the body was found', icon: 'clock', variant: 'strips',
        prompt: 'The visitor log, the alarm buffer, the override log and the drill time disagree. Put the night in order.',
        items: [
          { t: 'The courier delivers a sealed case', sub: '18:55 — visitor log', order: 1 },
          { t: 'Victor Hale signs in for maintenance', sub: '19:40 — visitor log', order: 2 },
          { t: 'The strongroom alarm is bypassed', sub: '19:52 — alarm panel', order: 3 },
          { t: 'Edmund drinks the poisoned coffee', sub: '19:55 — pathology', order: 4 },
          { t: 'The override releases the strongroom door', sub: '20:09 — override log', order: 5 },
          { t: 'The door reseals', sub: '20:14 — time-lock log', order: 6 },
          { t: 'The lift is taken out of service', sub: '20:20 — lift record', order: 7 },
          { t: 'The cleaning supervisor finds the body', sub: '07:20 — her statement', order: 8 }
        ],
        wrong: 'The alarm was bypassed before the coffee was drunk. The override came before the door resealed.',
        hintText: 'Courier 18:55, Victor 19:40, alarm 19:52, coffee 19:55, override 20:09, reseal 20:14, lift 20:20, body 07:20.',
        success: 'The night assembles. Victor signed in at 19:40, bypassed the alarm at 19:52, and released the strongroom door at 20:09 while Edmund was already dying at the desk. He resealed the door at 20:14 and left through the service corridor.',
        successTitle: 'Victor was inside the strongroom when Edmund died.',
        gives: ['vault-timeline'], flags: ['timelineBuilt'],
        short: 'Victor bypassed the alarm and left through the service corridor.',
        log: 'Timeline: Victor signed in 19:40, bypassed the alarm 19:52, Edmund poisoned 19:55, door released 20:09, resealed 20:14, lift out of service 20:20.'
      }
    },
    suspects: [
      {
        id: 'victor', name: 'Victor Hale', role: 'Security chief · holder of the override', location: 'security', locationName: 'Security office', tag: 'Prime suspect',
        portrait: { seed: 'victor-hale', hair: 'buzz', hairColor: '#8d8d99', skin: 1, expression: 'wary', collar: 'uniform', beard: 'stubble' },
        intro: 'Fifty-three, ex-police, with a security chief’s habit of answering a question with a question. He signed for box 118, holds the override key, bypassed the alarm, and never signed out. He says he was checking the building all night.',
        questions: [
          { q: 'You signed in at 19:40 and never signed out.', requires: ['visitor-log'], present: true,
            a: '“I was on the floor until seven. Night security does not sign out until the day man arrives.” He does not blink. “The log is not a prison register.”',
            gives: ['victor-log'], flags: ['victorHostile'] },
          { q: 'The alarm bypass used a security key at 19:52.', requires: ['alarm-log'], present: true,
            a: '“Maintenance. The strongroom sensor has been faulty for a month.” He folds his arms. “I logged it. The night book is on the desk.”',
            gives: ['victor-alarm'] },
          { q: 'You released the strongroom door at 20:09.', requires: ['override-log'], present: true,
            a: '“The override is for emergencies. Edmund was in there. I thought he had collapsed.” A pause. “I opened the door, saw him at the desk, and called for an ambulance. He was already cold.”',
            gives: ['victor-override'], flags: ['victorBroke'] },
          { q: 'You act for Meridian on box 118.', requires: ['kettle-authority'], present: true,
            a: '“I hold a power of attorney for a client. That is not a crime. Half this bank runs on powers of attorney.” He looks at the monitors. “The box was drilled by someone. I want them found as much as you do.”',
            gives: ['victor-authority'], flags: ['victorBroke'] },
          { q: 'The drill bit in your locker matches the hole exactly.', requires: ['tool-case'], present: true,
            a: 'He is quiet. “It is a standard bit. Every locksmith in the city has one.” He looks at his hands. “Edmund was going to the board. He was going to put my name in a memo and hand it to the chairman. Twenty-two years, and he would have ended me over a box I was told to hold.”',
            gives: ['victor-confession'], flags: ['victorBroke'] }
        ],
        after: 'He asks whether his pension will survive. You tell him it will be the least of his problems. He nods and asks to call his wife.'
      },
      {
        id: 'celia', name: 'Celia Vane', role: 'Deputy manager · acting head', location: 'office', locationName: 'Manager’s office', tag: 'Suspect',
        portrait: { seed: 'celia-vane', hair: 'bun', hairColor: '#3a2a1b', skin: 0, expression: 'smug', collar: 'suit', glasses: 'round', eyes: '#3a2159' },
        intro: 'Forty-four, immaculate, with a betting slip in her locker and a bank to run. She signed the bond slip for box 118. She inherits Edmund’s job if the board lets her keep it. She says she was at a hotel with a friend.',
        questions: [
          { q: 'Why did you sign the bond slip for box 118?', requires: ['bond-slip'], present: true,
            a: '“Victor brought it to me. The manager was out. It was a deposit, not a withdrawal.” She straightens the spreadsheet. “I signed what I was given. I did not open the box.”',
            gives: ['celia-slip'] },
          { q: 'You owe £14,000 to a loan company.', requires: ['deputy-debt'], present: true,
            a: '“A personal matter.” Her voice tightens. “It has nothing to do with the bank. I have never touched a client box.”',
            gives: ['celia-debt'], flags: ['celiaBroke'] },
          { q: 'Where were you on Thursday night?', requires: ['visitor-log'],
            a: '“At the Langham Hotel with a friend. We had dinner at nine and I stayed until morning.” She gives you a name. “Call her. She will confirm it.”',
            gives: ['celia-alibi'] },
          { q: 'Edmund was going to the board about the bonds.', requires: ['board-letter'], present: true,
            a: '“Edmund was going to the board about everything. He loved the board.” She closes the spreadsheet. “He was a good manager and a difficult man. If I had wanted his job, I would have waited for him to retire. He was sixty-one.”',
            gives: ['celia-board'] }
        ],
        after: 'She asks whether she is still acting head. You tell her the bank will be closed pending investigation. She says, “Then I suppose I am acting nothing,” and starts packing her desk.'
      },
      {
        id: 'henry', name: 'Henry Osei', role: 'Night porter', location: 'lobby', locationName: 'The lobby', tag: 'Suspect',
        portrait: { seed: 'henry-osei', hair: 'short', hairColor: '#1b1220', skin: 3, expression: 'sad', collar: 'uniform', glasses: 'square' },
        intro: 'Thirty-four, careful, with a mop and a night shift he needs. He was the only person on the lobby floor. He saw Victor go down to the strongroom and heard the drill. He did not report it because Victor told him it was maintenance.',
        questions: [
          { q: 'What did you hear between eight and nine?', requires: ['alarm-log'],
            a: '“A drill. Not loud. Like a dentist, far away.” He grips the mop. “Mr Hale said it was the time-lock being serviced. He said if I called anyone I would lose my job.”',
            gives: ['henry-drill'] },
          { q: 'You saw Victor go down to the strongroom.', requires: ['visitor-log'], present: true,
            a: '“At twenty to eight. He had a black case and the lift key.” Henry looks at the floor. “He came back up at about half past nine, without the case. He was sweating.”',
            gives: ['henry-victor'] },
          { q: 'Why did you not call the police?', requires: ['body-note'],
            a: '“I am on a zero-hours contract. My sister is sick. I cannot afford to be a witness.” He looks up. “I know how that sounds. I have been thinking about it all morning.”',
            gives: ['henry-fear'], flags: ['henryBroke'] },
          { q: 'The lift was taken out of service at 20:20.', requires: ['lift-record'],
            a: '“Mr Hale did it. He said the gate was sticking.” Henry hesitates. “It was not sticking. I used it at half six to take the bins down. It was fine.”',
            gives: ['henry-lift'] }
        ],
        after: 'He asks whether he will be deported. You tell him he is a witness, not a suspect. He sits down on the marble steps and cries quietly.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Edmund Sayer — post-mortem note', caption: 'Cyanide · 19:50–20:10 · no struggle', icon: 'blood', type: 'Forensic report',
        desc: 'Cyanide in the blood and in the coffee. Pink lips and nails. No defensive wounds. Death between 19:50 and 20:10.',
        tells: 'He was poisoned at his desk before the strongroom sealed. The killer did not need to use force.'
      },
      'cyanide-bottle': {
        name: 'Cyanide bottle', caption: 'Photographic fixer · wiped clean', icon: 'chemical', type: 'Weapon',
        desc: 'A brown bottle of photographic fixer containing sodium cyanide, found in the strongroom waste bin and wiped clean.',
        tells: 'The poison came from the bank’s own photographic stores. It was placed in the bin after use.'
      },
      'box-drilled': {
        name: 'Drilled box 118', caption: '22 mm core bit · neat circular cut', icon: 'tool', type: 'Scene mark',
        desc: 'Deposit box 118, opened with a diamond core bit. The hole is perfectly circular, with grey steel powder beneath it.',
        tells: 'The box was opened by someone with proper tools and time. This was a planned theft, not an opportunist.'
      },
      'timelock-log': {
        name: 'Time-lock log', caption: 'Sealed 20:14 · opened 07:14', icon: 'clock', type: 'Record',
        desc: 'The strongroom time-lock log, recording the door sealed at 20:14 and opened at 07:14.',
        tells: 'The room was sealed for eleven hours. The body was inside the whole time.'
      },
      'timelock-result': {
        name: 'Time-lock drift', caption: '14 minutes fast · 11 hours', icon: 'chart', type: 'Forensic analysis',
        desc: 'The time-lock dial gained fourteen minutes over eleven hours. It opened at 07:14 by its own clock, 07:00 by real time.',
        tells: 'The dial was fast, not bypassed. The eleven-hour seal is genuine.'
      },
      'vent-tamper': {
        name: 'Tampered vent', caption: 'Screws removed · one cross-threaded', icon: 'tool', type: 'Scene mark',
        desc: 'The strongroom ventilation grille, removed and replaced, with one screw cross-threaded and fresh tool marks.',
        tells: 'Someone used the vent. It may be how the killer left — or how the drill dust was cleaned.'
      },
      'dust-trail': {
        name: 'Drilling dust trail', caption: 'Grey powder · box to door', icon: 'fiber', type: 'Trace evidence',
        desc: 'A trail of grey steel dust running from box 118 toward the strongroom door, partly mopped up.',
        tells: 'The box was drilled in place, and someone tried to clean up afterwards.'
      },
      'visitor-log': {
        name: 'Visitor log', caption: 'V. Hale 19:40 · no sign-out', icon: 'id', type: 'Access record',
        desc: 'The lobby visitor log, recording Victor Hale entering at 19:40 and never signing out. The final line is blank except for 20:12.',
        tells: 'Victor was in the building all night. The blank line at 20:12 marks an unrecorded entry or exit.'
      },
      'lift-record': {
        name: 'Lift record', caption: 'Out of service 20:20 · V.H. key', icon: 'tool', type: 'Record',
        desc: 'The lift maintenance record, showing the lift taken out of service at 20:20 with a key stamped V.H.',
        tells: 'Victor disabled the lift twenty minutes after the strongroom sealed. The service corridor was his escape route.'
      },
      'override-log': {
        name: 'Override log', caption: 'Released 20:09 · resealed 20:14', icon: 'chart', type: 'Record',
        desc: 'The time-lock override panel log, recording the strongroom door released at 20:09 and resealed at 20:14 with a security key.',
        tells: 'The door was open for five minutes. Victor had the key and the authority.'
      },
      'maintenance-key': {
        name: 'Maintenance key', caption: 'Stamped V.H. · lift control box', icon: 'key', type: 'Physical evidence',
        desc: 'A maintenance key stamped V.H., found in the lift control box.',
        tells: 'Victor controlled the lift and the service corridor. He could move between floors without being seen.'
      },
      'alarm-log': {
        name: 'Alarm event log', caption: 'Zone 4 bypassed 19:52', icon: 'laptop', type: 'Digital evidence',
        desc: 'The alarm panel buffer, showing zone 4 — the strongroom corridor — bypassed at 19:52 with a security key and restored at 07:05.',
        tells: 'The strongroom alarm was switched off before Edmund died. Only a security key could do it.'
      },
      'tool-case': {
        name: 'Victor’s tool case', caption: '22 mm core bit · cutting paste · vacuum', icon: 'tool', type: 'Physical evidence',
        desc: 'A black tool case in Victor’s locker containing a 22 mm diamond core bit, cutting paste, and a vacuum for metal dust.',
        tells: 'The bit matches the hole in box 118. Victor had the tools and the means to clean up.'
      },
      'bond-slip': {
        name: 'Bond deposit slip', caption: '£2.1m · Meridian · “DO NOT RECORD”', icon: 'money', type: 'Financial record',
        desc: 'A deposit slip for box 118 recording £2.1 million in bearer bonds belonging to Meridian Heritage, marked “DO NOT RECORD”.',
        tells: 'The box held Meridian’s bonds. The deposit was deliberately kept off the books.'
      },
      'deputy-debt': {
        name: 'Celia’s debts', caption: '£14,000 betting slip · loan letter', icon: 'receipt', type: 'Financial record',
        desc: 'A £14,000 betting slip and a loan company letter in Celia Vane’s locker.',
        tells: 'Celia needed money. But her debt is small compared with the bonds, and her locker was not forced.'
      },
      'box-register': {
        name: 'Box register', caption: 'Box 118 · Meridian · sealed', icon: 'ledger', type: 'Record',
        desc: 'The deposit box register, listing box 118 as Meridian Heritage, sealed, requiring both manager and security to open.',
        tells: 'The box was a two-key deposit. Victor was one of the two keys.'
      },
      'audit-memo': {
        name: 'Audit memo', caption: '“Ask V.H. why the bonds are not on the ledger.”', icon: 'note', type: 'Document',
        desc: 'An internal audit memo noting that box 118 had never been inspected, with Edmund’s margin note asking Victor about the bonds.',
        tells: 'Edmund had already connected Victor to the missing declaration. He was investigating him.'
      },
      'spare-key': {
        name: 'Spare strongroom key', caption: 'Still sealed in its envelope', icon: 'key', type: 'Physical evidence',
        desc: 'A spare strongroom key in the manager’s desk, still sealed in its envelope and never used.',
        tells: 'The killer did not need a key. The override and the alarm bypass were enough.'
      },
      'safe-open': {
        name: 'Manager’s safe open', caption: 'Meridian file · board memo', icon: 'lockbox', type: 'Scene mark',
        desc: 'Edmund’s safe, opened on 1907, containing the Meridian client file, a board memorandum, and a sealed letter to the chairman.',
        tells: 'Edmund kept the Meridian file close. He was preparing to take it to the board.'
      },
      'meridian-file': {
        name: 'Meridian client file', caption: 'Power of attorney · Rotterdam address', icon: 'letter', type: 'Document',
        desc: 'The bank’s client file for Meridian Heritage, containing a power of attorney, a passport copy for Ian Kettle, and a serviced-office address in Rotterdam.',
        tells: 'Meridian is the client behind box 118, and Ian Kettle is the name on the file.'
      },
      'kettle-authority': {
        name: 'Power of attorney', caption: 'Victor Hale acts for Meridian', icon: 'letter', type: 'Document',
        desc: 'A power of attorney authorising Victor Hale to act for Meridian Heritage in all matters concerning box 118.',
        tells: 'Victor controlled the box on Meridian’s behalf. He had access and a conflict of interest.'
      },
      'board-letter': {
        name: 'Letter to the chairman', caption: '“BOX 118 — URGENT”', icon: 'letter', type: 'Document',
        desc: 'A sealed letter from Edmund to the chairman marked “BOX 118 — URGENT”, concerning the missing source-of-funds declaration.',
        tells: 'Edmund was about to expose the Meridian deposit. The board meeting was Monday; he died on Thursday.'
      },
      'drill-jig': {
        name: 'Drill jig', caption: 'Set for a 22 mm bit · 90 degrees', icon: 'tool', type: 'Physical evidence',
        desc: 'A portable drill jig in the vault workshop set for a 22 mm core bit at 90 degrees — the exact angle of the hole in box 118.',
        tells: 'The hole was made with the bank’s own workshop equipment. The killer knew the workshop.'
      },
      'override-manual': {
        name: 'Override manual', caption: '“Use only with manager present.”', icon: 'note', type: 'Document',
        desc: 'The time-lock manual, open at the emergency release page, with a margin note requiring a manager to be present.',
        tells: 'The override required two people. Victor used it alone.'
      },
      'service-schedule': {
        name: 'Service schedule', caption: 'Strongroom serviced Thursday 17:50', icon: 'receipt', type: 'Record',
        desc: 'The maintenance schedule showing the strongroom was serviced on Thursday afternoon and signed off by Victor Hale.',
        tells: 'Victor had legitimate access to the strongroom and the time lock on the day of the murder.'
      },
      'solicitor-statement': {
        name: 'Solicitor’s statement', caption: '“My client has been robbed.”', icon: 'audio', type: 'Statement',
        desc: 'Meridian’s solicitor claims the bonds belong to his client and that both Meridian and the bank have been robbed.',
        tells: 'Meridian knew the bonds were there and wanted them back. The bank sale is the larger prize.'
      },
      'sale-folder': {
        name: 'Sale folder', caption: '“KINGSWAY — COMPLETION”', icon: 'ledger', type: 'Document',
        desc: 'A folder in the solicitor’s briefcase marked “KINGSWAY — COMPLETION”, relating to Meridian’s purchase of the bank.',
        tells: 'Meridian is buying the bank. The bonds and the murder are part of a larger acquisition.'
      },
      'box-118': {
        name: 'Box 118 identified', caption: 'Meridian Heritage · bearer bonds', icon: 'lockbox', type: 'Analysis',
        desc: 'The drilled deposit box, identified as box 118, belonging to Meridian Heritage and holding £2.1 million in bearer bonds.',
        tells: 'The theft and the murder are the same crime: someone wanted the bonds and the paperwork that proved they existed.'
      },
      'drill-time': {
        name: 'Drilling time', caption: '41 minutes at the box', icon: 'chart', type: 'Forensic analysis',
        desc: 'The calculation showing the box needed forty-one minutes to drill, far longer than the override window.',
        tells: 'The drilling happened before the override, while Edmund was still alive. The killer had time to poison him first.'
      },
      'vault-timeline': {
        name: 'Vault timeline', caption: '18:55 → 07:20', icon: 'clock', type: 'Analysis',
        desc: 'A reconstruction of the courier delivery, Victor’s entry, the alarm bypass, the poisoning, the override and the discovery.',
        tells: 'Victor was inside the strongroom when Edmund died. He left through the service corridor before the door resealed.'
      },
      'victor-log': {
        name: 'Victor on the log', caption: '“Night security does not sign out.”', icon: 'note', type: 'Statement',
        desc: 'Victor claims he stayed on the floor all night and that the visitor log is not a prison register.',
        tells: 'The lift and alarm logs place him at the strongroom at the exact time of the murder.'
      },
      'victor-alarm': {
        name: 'Victor on the alarm', caption: '“Maintenance. The sensor is faulty.”', icon: 'note', type: 'Statement',
        desc: 'Victor claims the zone 4 bypass was routine maintenance for a faulty sensor.',
        tells: 'The bypass was made with a security key at 19:52 and never logged in the night book. It was not routine.'
      },
      'victor-override': {
        name: 'Victor on the override', caption: '“I thought he had collapsed.”', icon: 'audio', type: 'Statement',
        desc: 'Victor admits releasing the strongroom door at 20:09, claiming he found Edmund already cold.',
        tells: 'He admits being inside the sealed room. The pathology puts the death at 19:50–20:10, inside his visit.'
      },
      'victor-authority': {
        name: 'Victor on the power of attorney', caption: '“Half this bank runs on them.”', icon: 'note', type: 'Statement',
        desc: 'Victor dismisses the Meridian power of attorney as ordinary banking practice.',
        tells: 'He controlled box 118 for a client with no source of funds. The conflict is the motive.'
      },
      'victor-confession': {
        name: 'Victor’s confession', caption: '“He would have ended me over a box.”', icon: 'audio', type: 'Statement',
        desc: 'Victor admits poisoning Edmund’s coffee, drilling box 118, and leaving through the service corridor.',
        tells: 'He admits murder and theft. The tool case, alarm log and override log corroborate him.'
      },
      'celia-slip': {
        name: 'Celia on the bond slip', caption: '“I signed what I was given.”', icon: 'note', type: 'Statement',
        desc: 'Celia claims Victor brought her the bond deposit slip and she signed it without reading the details.',
        tells: 'She facilitated the deposit but did not open the box. Her signature is careless, not criminal.'
      },
      'celia-debt': {
        name: 'Celia on the debt', caption: '“A personal matter.”', icon: 'note', type: 'Statement',
        desc: 'Celia admits a £14,000 gambling debt but denies touching any client box.',
        tells: 'She had a motive for money, but not the tools, the alarm key or the override.'
      },
      'celia-alibi': {
        name: 'Celia’s alibi', caption: 'Langham Hotel · dinner at nine', icon: 'receipt', type: 'Alibi',
        desc: 'Celia was at the Langham Hotel with a friend from nine on Thursday until morning.',
        tells: 'She was not in the bank during the murder. She is not the killer.'
      },
      'celia-board': {
        name: 'Celia on Edmund', caption: '“He loved the board.”', icon: 'audio', type: 'Statement',
        desc: 'Celia describes Edmund as a good but difficult manager who reported everything to the board.',
        tells: 'Edmund’s habit of reporting to the board was why Victor needed him gone.'
      },
      'henry-drill': {
        name: 'Henry on the drill', caption: '“Like a dentist, far away.”', icon: 'audio', type: 'Witness statement',
        desc: 'Henry heard a drill from the strongroom level between eight and nine and was told it was maintenance.',
        tells: 'The drilling was heard while Edmund was still alive. The theft happened before the override.'
      },
      'henry-victor': {
        name: 'Henry on Victor', caption: '“He came back without the case.”', icon: 'audio', type: 'Witness statement',
        desc: 'Henry saw Victor go down at 19:40 with a black case and return at about 21:30 without it.',
        tells: 'Victor carried the tools down and came back without them. The case was hidden in the workshop or the service corridor.'
      },
      'henry-fear': {
        name: 'Henry on his silence', caption: '“I cannot afford to be a witness.”', icon: 'note', type: 'Statement',
        desc: 'Henry admits he did not call the police because he feared losing his zero-hours job.',
        tells: 'He is an unwilling witness, not an accomplice. His evidence is credible and corroborated.'
      },
      'henry-lift': {
        name: 'Henry on the lift', caption: '“It was not sticking.”', icon: 'note', type: 'Statement',
        desc: 'Henry says the lift was working at 18:30 and Victor took it out of service himself at 20:20.',
        tells: 'The lift was disabled to hide the service corridor route. Victor controlled it.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Edmund Sayer?', 
          options: [
            { t: 'Celia Vane — the deputy manager with gambling debts', v: 'celia' },
            { t: 'Henry Osei — the night porter who heard the drill', v: 'henry' },
            { t: 'Victor Hale — the security chief who held the override', v: 'victor' },
            { t: 'Ian Kettle — the Meridian client who owned the box', v: 'kettle' }
          ], answer: 'victor' },
        { q: 'How did the killer leave the time-locked strongroom?', 
          options: [
            { t: 'Through the service corridor after releasing and resealing the door with the override', v: 'override' },
            { t: 'Through the ventilation grille and down the lift shaft', v: 'vent' },
            { t: 'He never left — he was hiding in the strongroom until morning', v: 'hidden' },
            { t: 'The time lock was broken and the door never actually sealed', v: 'broken' }
          ], answer: 'override' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Edmund was going to the board about the £2.1m Meridian bonds in box 118', v: 'bonds' },
            { t: 'Edmund was going to retire and leave Celia in charge', v: 'retire' },
            { t: 'Edmund had stolen from the bank’s own accounts', v: 'theft' },
            { t: 'Edmund was having an affair with a client', v: 'affair' }
          ], answer: 'bonds' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The alarm bypass, the 20:09 override, the drill bit and the time-lock maths', v: 'override' },
            { t: 'Celia’s betting slip', v: 'debt' },
            { t: 'The solicitor’s power of attorney', v: 'poa' },
            { t: 'The spare strongroom key', v: 'key' }
          ], answer: 'override' }
      ],
      verdict: {
        who: 'Victor Hale, 53 — security chief at Kingsway Private Bank',
        whoDesc: 'was arrested in the security office and charged with murder, theft and perverting the course of justice. He pleaded guilty to all counts.',
        how: 'He bypassed the strongroom alarm at 19:52, poisoned Edmund’s coffee with cyanide from the bank’s photographic stores, drilled box 118, then used his security override to release the door at 20:09 and reseal it at 20:14. He left through the service corridor and disabled the lift to cover the route.',
        why: 'Edmund had discovered that box 118 held £2.1 million in Meridian bearer bonds deposited without a source-of-funds declaration, and that Victor had signed the deposit through. Edmund was taking the file to the board on Monday. Victor was already being paid to make the box disappear before the bank was sold.',
        key: 'The alarm log shows the strongroom bypassed at 19:52, the override log shows the door released and resealed while Edmund was dying, and the drill bit in Victor’s locker matches the hole in box 118 exactly.'
      },
      reveal: [
        'Kingsway Private Bank had one product: discretion. It held the deeds, the bonds, the letters and the secrets of people who did not want to be on a computer. Some of those people were merely private. Some of them were Meridian Heritage.',
        'In 2022 a man with a Rotterdam passport and a power of attorney deposited £2.1 million in bearer bonds in box 118. The deposit was recorded on a slip marked “DO NOT RECORD”. It was signed through by the security chief, Victor Hale, who had been paid £60,000 for his help and promised more when the bank changed hands.',
        'Edmund Sayer found the slip during a routine audit in the spring. He was sixty-one, methodical, and loyal to a bank that had employed him for thirty-eight years. He asked Victor about the bonds. Victor said they belonged to a client. Edmund asked why they were not on the client ledger. Victor said he would look into it.',
        'On Thursday afternoon the strongroom was serviced. Victor signed the work order. At 19:40 he signed into the lobby with a black tool case. At 19:52 he bypassed the strongroom alarm with his security key. At 19:55 he poured cyanide from a bottle of photographic fixer into the coffee on Edmund’s desk.',
        'Edmund drank it while reading the board memorandum. He died within four minutes, sitting upright, without a struggle. Victor was already at box 118 with the drill jig. It took him forty-one minutes to cut through the steel, and he had to stop twice to let the bit cool.',
        'At 20:09 the time-lock override released the door. He resealed it at 20:14, took the bonds and the drill case into the service corridor, and disabled the lift so nobody would use it. He went back up the service stairs. Henry the porter heard the drill and was told it was maintenance.',
        'The time lock did the rest. It sealed the room for eleven hours, and when it opened at 07:14 by its own fast clock, the first officer saw a dead man at a desk, a locked door, and a log with no entries. The impossible room was not impossible. It was a security chief using his own override.',
        'The bonds were recovered from Victor’s van, in a holdall under the spare wheel. The drill case was in the workshop, wiped but not wiped well enough: a single grey fibre from the strongroom carpet was caught in the bit’s flutes. The alarm buffer and the override log were the two records he could not erase.',
        'Celia Vane resigned and was charged with a regulatory offence over the deposit slip. Henry Osei kept his job and was given a permanent contract. The bank was sold to a building society for a nominal sum, and box 118 was opened by the police in the presence of the bank’s new owners and a representative of the Dutch authorities.',
        'Victor Hale was sentenced to life with a minimum of eighteen years. At the trial, the prosecution read out Edmund’s margin note on the audit memo: “Ask V.H. why the bonds are not on the client ledger.” The court heard that Victor had been asked that question three times, and that each time he had answered it with a smile.',
        'The Kingsway strongroom is still there, behind a new door and a new time lock. The brass plate on box 118 has been replaced. The new one is blank, and the box is empty, and the bank’s new owners have promised that it will stay that way.'
      ],
      quote: 'Ask V.H. why the bonds are not on the client ledger.',
      twist: 'The final detail was the time lock. It was not bypassed, broken or reset — it was simply fourteen minutes fast. The killer did not need to defeat it. He needed everyone to believe it was exact. The impossible room was built out of a clock that had been wrong for a year.'
    }
  });
})();
