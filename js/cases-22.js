/* ============================================================
   CASE 22 - THE MISSING LABORATORY REPORT
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c22', num: 22,
    title: 'The Missing Laboratory Report',
    subtitle: 'A scientist froze to death in a cold room. The report that could have saved her is gone.',
    difficulty: 4, est: '35-45 min',
    cover: { kind: 'lab', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Dr Lena Ost, 34 - senior analyst, Meridian Blood Services' },
      { k: 'Scene', v: 'Cold storage room 2, Meridian lab' },
      { k: 'Found', v: 'Thursday, 07:15 - by the morning technician' },
      { k: 'Official cause', v: 'Hypothermia after an apparent lock-in' }
    ],
    briefing: [
      "Meridian Blood Services screens donor blood for a dozen private hospitals. On Wednesday night its senior analyst, Lena Ost, was found dead in cold storage room 2. The door had closed behind her. The internal release handle was taped shut.",
      "The official story is a terrible accident: a tired scientist, a faulty latch, a cold room that drops to minus twenty. But Lena had spent the afternoon printing a sterility report that nobody can now find. The printer log says forty-one pages went out. The file on the server has been deleted.",
      "Her director, Marcus Vale, says the batch was clean. The hospital that received it says three patients are already sick. Somebody at Meridian chose a reputation over a report."
    ],
    opening: 'The cold room breathes a white fog when you open it. Shelves of labelled vials recede into the dark, and the only sound is the compressor fighting to bring the temperature back down.',
    objectives: [
      'Establish how Lena died and whether the cold room was locked deliberately.',
      'Recover the missing sterility report and its findings.',
      'Match the contaminated batch to the person who cleared it.',
      'Find who had access - and who lied about the alarm.'
    ],
    locations: [
      {
        id: 'cold', name: 'Cold Storage 2', short: 'Cold room', time: '07:40',
        art: { kind: 'lab', mood: 'cold' },
        intro: 'Minus twenty and falling. Lena is on her side between two racks, arms drawn in. The internal release handle is wrapped in silver lab tape. A rack of batch 44B vials stands open beside her.',
        actions: [
          { id: 'body', label: 'Examine Lena and the door', icon: 'blood', hotspot: { x: 46, y: 60 },
            desc: 'The latch, the tape, the mark on her neck',
            text: [
              "Lena's lips are blue and her fingers are curled, but there is a narrow red burn under her jaw that cold does not make. It is a pressure mark, a hard cylinder pressed against the throat.",
              "The internal release handle has been wrapped in lab tape, three turns, tight enough that the lever cannot move. The tape was applied from the outside, then the door pulled shut.",
              "A CO2 cylinder stands by the rack, its valve cap missing. The frost around the outlet is fresh."
            ],
            gives: ['c22_cold', 'c22_frost'],
            hint: 'Hypothermia does not leave a pressure burn. Look at the door handle and the gas cylinder.'
          },
          { id: 'rack', label: 'Sample the opened rack', icon: 'flask', puzzle: 'batch-assay',
            desc: 'Batch 44B - culture and reagent',
            gives: ['c22_vial'],
            hint: 'Run the culture first. A contaminated batch will cloud the medium within hours.'
          },
          { id: 'latch', label: 'Check the external lock', icon: 'lock',
            desc: 'Who can lock a cold room from outside?',
            text: [
              "The external lock is a magnetic card latch, not a key. It logs every close and open. The last close is 21:42. The next open is 07:14, when the technician arrived.",
              "Between those times the door was locked from the corridor side. The internal release should have opened it in under a second.",
              "A maintenance sticker on the frame reads: ALARM TEST PASSED - 18:05 - M. VALE."
            ],
            gives: ['c22_alarm'],
            hint: 'The door was locked from outside. The alarm was tested and passed the same evening.'
          }
        ]
      },
      {
        id: 'lab', name: 'Analysis Lab', short: 'Lab', time: '08:30',
        art: { kind: 'lab', mood: 'cold' },
        requires: ['c22_cold'],
        intro: 'Black benches, humming centrifuges, a wall of reagent bottles. Lena\'s desk is neat except for a printer tray full of blank paper and a coffee cup with a lipstick mark.',
        actions: [
          { id: 'desk', label: 'Open Lena\'s desk drawer', icon: 'keypad', puzzle: 'desk-lock',
            desc: 'A four-digit drawer lock',
            gives: ['c22_email'],
            hint: 'Lena dated everything by batch: 44B was logged on the fourth of April.'
          },
          { id: 'printer', label: 'Read the printer queue', icon: 'terminal',
            desc: 'Forty-one pages, one deleted job',
            text: [
              "The printer log shows a job at 17:52: STERILITY_44B_FINAL, forty-one pages, user LOST. The job completed. The pages were collected.",
              "At 18:10 the same user printed a single page: a chain-of-custody form. At 18:12 the server copy of the report was deleted by an administrator account - not Lena's.",
              "The administrator account belongs to Marcus Vale."
            ],
            gives: ['c22_cc'],
            hint: 'The report was printed and collected before it was deleted.'
          },
          { id: 'sam', label: 'Question Sam Iyer', icon: 'user', suspect: 'sam',
            desc: 'Junior technician - borrowed a keycard' }
        ]
      },
      {
        id: 'archive', name: 'Document Archive', short: 'Archive', time: '09:20',
        art: { kind: 'archive', mood: 'cold' },
        requires: ['c22_cc'],
        intro: 'A basement room of grey boxes and one ancient shredder. The air is paper-dry. A box marked CHAIN OF CUSTODY 44B sits open on the table.',
        actions: [
          { id: 'index', label: 'Search the custody box', icon: 'archive', puzzle: 'custody-seq',
            desc: 'Four forms out of order',
            gives: ['c22_access'],
            hint: 'Follow the batch: collection, screening, retest, release.'
          },
          { id: 'shred', label: 'Search the shredder bag', icon: 'search',
            desc: 'Strips with a report header',
            text: [
              "The bag is full of cross-cut strips. Most are routine. Six strips carry the header MERIDIAN BLOOD SERVICES - STERILITY REPORT 44B.",
              "One strip reads: RESULT: NON-STERILE. ACTION: QUARANTINE ALL UNITS. Another reads: RELEASED BY M. VALE - 16:40.",
              "The shredder was used at 18:20, eight minutes after the server copy was deleted."
            ],
            gives: ['c22_shred'],
            hint: 'The report says non-sterile. Vale released the batch anyway.'
          },
          { id: 'iris', label: 'Question Iris Bell', icon: 'user', suspect: 'iris',
            desc: 'Supplier representative - batch 44B' }
        ]
      },
      {
        id: 'office', name: "Vale's Office", short: 'Office', time: '10:05',
        art: { kind: 'office', mood: 'cold' },
        requires: ['c22_shred'],
        intro: 'A corner office with a view of the car park and a framed photograph of a sailing boat. Vale\'s coat is on the hook. His shoes are by the radiator, drying.',
        actions: [
          { id: 'shoe', label: 'Examine Vale\'s shoes', icon: 'footprint',
            desc: 'A pale crust along the sole',
            text: [
              "There is a pale crystalline crust in the tread of Vale's right shoe. It smells faintly of ammonia and old blood - the same smell as the reagent bench downstairs.",
              "The lab stores that reagent in a single carboy beside the cold room door. It is used only when handling batch cultures.",
              "Vale told the first officer he had not been in the lab since lunchtime."
            ],
            gives: ['c22_shoe'],
            hint: 'The crust is reagent. The reagent lives beside the cold room.'
          },
          { id: 'vale', label: 'Question Marcus Vale', icon: 'user', suspect: 'vale',
            desc: 'Lab director - signed the release' },
          { id: 'terminal', label: 'Read the access system', icon: 'terminal', puzzle: 'access-term',
            desc: 'Badge events, 17:00 to 22:00',
            gives: ['c22_access'],
            hint: 'Find the badge that entered but never left before the lock closed.'
          }
        ]
      }
    ],
    puzzles: {
      'desk-lock': {
        type: 'keypad', title: "Lena's Drawer", subtitle: 'Four-digit lock', icon: 'keypad',
        deviceLabel: 'DESK DRAWER - OST', length: 4, code: '0404',
        prompt: 'Lena coded her locks by batch date. Batch 44B was logged on the fourth of April. Four digits, day and month.',
        hintText: 'The rack label says BATCH 44B - LOGGED 04/04. Use that date.',
        success: 'The drawer slides open on a printed email and a carbon copy folded into thirds.',
        gives: ['c22_email'], flags: ['deskOpen'],
        short: 'Lena kept a carbon copy of the report.',
        log: 'The drawer holds Lena\'s email to Vale: I will not sign a clean release for a dirty batch. And a carbon copy of the sterility report.'
      },
      'batch-assay': {
        type: 'mix', title: 'Batch 44B Assay', subtitle: 'Culture and reagent', icon: 'chemical',
        prompt: 'Run the sterility assay. Add the culture medium, then the growth supplement, then the indicator. Read the result.',
        reagents: [
          { name: 'Thioglycollate medium', color: '#d9c27a' },
          { name: 'Growth supplement', color: '#8a5a2b' },
          { name: 'Indicator reagent', color: '#e879f9' }
        ],
        order: [0, 1, 2],
        note: 'Add the medium first, then the supplement, then the indicator. Reagent before the culture has grown proves nothing.',
        hintText: 'Medium, supplement, indicator. Never indicator before the culture has grown.',
        success: 'The culture clouds, then turns yellow at the indicator stage. Batch 44B is non-sterile. The release should never have been signed.',
        gives: ['c22_vial'], flags: ['assayDone'],
        short: 'Batch 44B is contaminated.',
        log: 'The assay confirms batch 44B is non-sterile. Three hospital units were already released from it.'
      },
      'custody-seq': {
        type: 'sequence', title: 'Chain of Custody', subtitle: 'Four forms, one batch', icon: 'archive',
        prompt: 'Put the custody forms in the order the batch moved through the building.',
        variant: 'strips',
        items: [
          { t: 'Donor collection - unit 44B', sub: '04 April, 09:20' },
          { t: 'Screening - non-sterile flag', sub: '04 April, 15:10' },
          { t: 'Retest requested by L. Ost', sub: '04 April, 16:20' },
          { t: 'Release signed by M. Vale', sub: '04 April, 16:40' }
        ],
        success: 'The forms line up: Vale released the batch twenty minutes after Lena requested a retest, and before the retest was done.',
        gives: ['c22_access'], flags: ['custodyDone'],
        short: 'Vale released the batch before the retest.',
        log: 'The custody chain shows Vale signed the release before the retest result existed.'
      },
      'access-term': {
        type: 'terminal', title: 'Access Control', subtitle: 'Badge events', icon: 'terminal',
        user: 'security', host: 'meridian-acs', password: '44b',
        passwords: ['44b', 'batch 44b', '44 b batch'],
        intro: 'Meridian access control. Type help for commands.',
        banner: 'BADGE EVENTS - 04 APRIL - LAB WING',
        files: [
          { name: 'events.log', body: '17:02 L.OST in<br>17:52 L.OST in (lab)<br>18:04 M.VALE in<br>18:20 M.VALE in (archive)<br>21:38 M.VALE in (cold corridor)<br>21:42 COLD ROOM 2 LOCKED<br>21:44 M.VALE out<br><span class="r">21:45 S.IYER badge out (main entrance)</span>' },
          { name: 'alerts.log', body: '<span class="d">18:05 ALARM TEST PASSED - M. VALE</span><br>21:42 COLD ROOM 2 ALARM: DISABLED<br><span class="d">Disabled from corridor panel. No fault recorded.</span>' },
          { name: 'staff.txt', body: '<b>MARCUS VALE</b> - director, full access<br><b>LENA OST</b> - senior analyst, lab and cold<br><b>SAM IYER</b> - technician, lab only<br><b>IRIS BELL</b> - supplier, escorted only' }
        ],
        hintText: 'Look for the badge that enters the cold corridor just before the lock, and the alarm disabled from the corridor panel.',
        success: 'Vale badges into the cold corridor at 21:38. The door locks at 21:42. The alarm is disabled from the corridor panel. Sam had already left the building.',
        gives: ['c22_access'], flags: ['accessRead'],
        short: 'Vale entered the cold corridor before the lock.',
        log: 'Access control places Vale in the cold corridor at 21:38, four minutes before the door locked and the alarm was disabled.'
      }
    },
    clues: {
      'c22_cold': { name: 'Taped release handle', caption: 'Three turns - applied from outside', icon: 'lock', type: 'Scene evidence',
        desc: 'The internal release handle was wrapped in lab tape so the lever could not move. The tape was applied before the door closed.',
        tells: 'The lock-in was deliberate. Lena could not get out.' },
      'c22_frost': { name: 'Pressure burn', caption: 'Cylinder mark under the jaw', icon: 'blood', type: 'Forensic observation',
        desc: 'A narrow red burn under the jaw, shaped like a cylinder valve. No frost damage around it.',
        tells: 'She was struck with the CO2 cylinder before she was left in the cold. This was not hypothermia alone.' },
      'c22_vial': { name: 'Batch 44B culture', caption: 'Non-sterile - released anyway', icon: 'flask', type: 'Forensic analysis',
        desc: 'The culture clouds and turns yellow. Batch 44B is contaminated and should have been quarantined.',
        tells: 'The missing report was real. Vale released a contaminated batch.' },
      'c22_email': { name: "Lena's email", caption: 'I will not sign a clean release', icon: 'mail', type: 'Digital evidence',
        desc: 'Lena wrote to Vale at 16:35: The retest is not back. I will not sign a clean release for a dirty batch. He replied: Then I will.',
        tells: 'Vale knew the batch was dirty and chose to release it.' },
      'c22_cc': { name: 'Carbon copy of the report', caption: 'NON-STERILE - QUARANTINE ALL UNITS', icon: 'note', type: 'Document',
        desc: 'A carbon copy of the sterility report, folded into the desk. The result is non-sterile. The release is signed by M. Vale.',
        tells: 'The report existed and was suppressed. Its findings are the motive.' },
      'c22_shred': { name: 'Shredded report strips', caption: 'Cross-cut - six identifiable strips', icon: 'search', type: 'Physical evidence',
        desc: 'Strips from the missing report in the shredder bag, including the result and Vale\'s release signature.',
        tells: 'Vale destroyed the report after deleting the server copy.' },
      'c22_access': { name: 'Access control log', caption: 'Vale in cold corridor 21:38 - Sam out 21:45', icon: 'id', type: 'Technical record',
        desc: 'Vale badged into the cold corridor at 21:38 and out at 21:44. Sam Iyer badged out of the main entrance at 21:45 and never entered the corridor.',
        tells: 'Vale was the last person with Lena. Sam was already leaving the building.' },
      'c22_shoe': { name: 'Reagent on Vale\'s shoe', caption: 'Ammonia crust - culture reagent', icon: 'footprint', type: 'Trace evidence',
        desc: 'A crystalline crust in Vale\'s shoe tread matches the culture reagent stored beside the cold room.',
        tells: 'Vale stood at the reagent bench and then at the cold room. His claim that he never returned to the lab is false.' },
      'c22_alarm': { name: 'Alarm test sticker', caption: 'Test passed 18:05 - disabled 21:42', icon: 'alert', type: 'Physical evidence',
        desc: 'The cold room alarm passed its test at 18:05, then was disabled from the corridor panel at 21:42.',
        tells: 'The alarm did not fail. It was switched off by someone with corridor access.' },
      'c22_keycard': { name: "Sam's borrowed keycard", caption: 'Returned at 20:10 - badged out 21:45', icon: 'id', type: 'Red herring',
        desc: 'Sam borrowed a lab keycard to collect a bag, then returned it at 20:10. The card was not used again.',
        tells: 'The obvious suspect had already left. The card is a dead end.' }
    },
    suspects: [
      {
        id: 'vale', name: 'Marcus Vale', role: 'Laboratory director - signed the release', location: 'office', locationName: "Vale's office",
        tag: 'Primary suspect', portrait: { seed: 'marcus-vale', hair: 'silver', hairColor: '#b8b0a4', skin: 1, expression: 'cold', collar: 'suit' },
        intro: 'Vale has the calm of a man who has been interviewed by lawyers before. He calls the death a tragedy and the report a clerical error. He does not call it a crime.',
        questions: [
          { q: 'Where were you on Wednesday night?', a: 'Here until seven, then home. I came back at nine for a file and left again by ten. The security system will show you.' },
          { q: 'Why was the cold room alarm disabled?', a: 'It was not disabled. The cold room alarm has been faulty for weeks. I tested it myself and it passed, but the sensor is old.', gives: ['c22_alarm'],
            follow: 'The test sticker says PASSED at 18:05. The log says DISABLED at 21:42 from the corridor panel.' },
          { q: 'Did you delete the sterility report?', a: 'I archived it. There is a difference. The server does that automatically.', requires: ['c22_cc'], gives: ['c22_cc'],
            follow: 'The administrator account is his. The deletion is manual, not automatic.' },
          { q: 'Why is there reagent on your shoe?', a: 'I walked through the lab. It is a laboratory. There is reagent on the floor.', requires: ['c22_shoe'], gives: ['c22_shoe'],
            follow: 'The reagent is stored only beside the cold room door, not on the route to his office.' },
          { q: 'Who released batch 44B?', a: 'I did. The retest was verbal. Lena was satisfied. We agreed to release pending the paperwork.', requires: ['c22_vial'],
            follow: 'Lena\'s email says the opposite. She refused. He signed anyway.' }
        ],
        after: 'He asks that the hospital be told nothing until the investigation is complete. He calls it reputation management.'
      },
      {
        id: 'sam', name: 'Sam Iyer', role: 'Junior technician - borrowed a keycard', location: 'lab', locationName: 'Lab bench',
        tag: 'Red herring', portrait: { seed: 'sam-iyer', hair: 'curly', hairColor: '#1a1210', skin: 4, expression: 'nervous', collar: 'scrubs' },
        intro: 'Sam is twenty-three and looks younger. He borrowed a keycard on Wednesday evening, which he knows looks terrible. He also left the building before the cold room was locked.',
        questions: [
          { q: 'Why did you borrow a keycard?', a: 'I forgot my gym bag. The cleaner let me in with a spare. I returned it at ten past eight. The log shows it.', gives: ['c22_keycard'],
            follow: 'The card was returned and never used again. Sam badged out at 21:45.' },
          { q: 'Did you see Lena that night?', a: 'She was at the printer, arguing with Vale. She said the batch was dirty. He said the batch was fine. I left.', requires: ['c22_keycard'],
            follow: 'That argument is the last time anyone saw Lena alive.' },
          { q: 'What is in cold storage 2?', a: 'Batch racks. And the CO2 cylinders for the incubators. Vale is the only one who moves those.', requires: ['c22_frost'],
            follow: 'The cylinder was found beside the rack, its cap missing.' }
        ]
      },
      {
        id: 'iris', name: 'Iris Bell', role: 'Supplier representative - batch 44B', location: 'archive', locationName: 'Archive',
        tag: 'Witness', portrait: { seed: 'iris-bell', hair: 'bob', hairColor: '#5a3a22', skin: 2, expression: 'guarded', collar: 'coat' },
        intro: 'Iris supplied the donor units. She is worried about liability and says so. She also has the delivery record that proves the batch was flagged before it ever reached the lab.',
        questions: [
          { q: 'Was batch 44B clean when it arrived?', a: 'No. I flagged it. I sent the flag to Vale directly. He told me the lab would retest and release.', gives: ['c22_vial'],
            follow: 'The supplier warning and Lena\'s assay say the same thing. Vale had two warnings.' },
          { q: 'Who authorised the release?', a: 'Vale. Always Vale. I do not have release authority and neither does Lena.', requires: ['c22_vial'],
            follow: 'The signature on the release is his. The responsibility is his.' }
        ]
      }
    ],
    timeline: [
      { time: '09:20', text: 'Batch 44B collected. Supplier flags a sterility concern.' },
      { time: '15:10', text: 'Screening marks 44B non-sterile.' },
      { time: '16:20', text: 'Lena requests a retest and refuses to sign a clean release.' },
      { time: '16:40', text: 'Vale signs the release anyway.' },
      { time: '17:52', text: 'Lena prints the full sterility report. Forty-one pages.' },
      { time: '18:12', text: 'Server copy deleted by Vale\'s administrator account.' },
      { time: '18:20', text: 'Report shredded in the archive.' },
      { time: '21:38', text: 'Vale badges into the cold corridor.' },
      { time: '21:42', text: 'Cold room 2 locked from outside. Alarm disabled.' },
      { time: '07:14', text: 'Technician opens the cold room and finds Lena.' }
    ],
    links: [
      { a: 'c22_access', b: 'vale', note: 'Vale is the last badge in the cold corridor before the lock.' },
      { a: 'c22_shoe', b: 'vale', note: 'Culture reagent from beside the cold room is on his shoe.' },
      { a: 'c22_email', b: 'vale', note: 'Vale knew the batch was dirty and overrode Lena\'s refusal.' },
      { a: 'c22_cc', b: 'vale', note: 'The suppressed report carries Vale\'s release signature.' }
    ],
    forensics: {
      prompt: 'Two samples from the cold room. Match each to its reference.',
      samples: [
        { id: 'crust', type: 'REAGENT', label: 'Shoe crust - ammonia salts', mark: 'culture reagent 44B' },
        { id: 'culture', type: 'CULTURE', label: 'Vial 44B-07', mark: 'clouded, yellow indicator' }
      ],
      candidates: [
        { id: 'bench', label: 'Culture bench reagent carboy' },
        { id: 'clean', label: 'Floor cleaning solvent' },
        { id: 'hosp', label: 'Hospital intravenous fluid' }
      ],
      answer: { crust: 'bench', culture: 'bench' },
      success: 'Both samples match the culture bench carboy beside the cold room. Vale handled the batch, then handled the door.'
    },
    documents: [
      { id: 'chain', title: 'Chain of custody - 44B', sub: 'Four signatures', body: '<div class="doc-sheet"><b>MERIDIAN BLOOD SERVICES</b><br>UNIT 44B - CUSTODY RECORD<br><br>Collected: 04/04 - 09:20 - <b>I. BELL</b><br>Screened: 04/04 - 15:10 - <span class="g">NON-STERILE</span><br>Retest requested: 04/04 - 16:20 - <b>L. OST</b><br>Released: 04/04 - 16:40 - <b>M. VALE</b><br><br><span class="d">Retest result: pending at time of release.</span></div>',
        question: 'What is wrong with the release?',
        options: [
          { t: 'Vale released the batch before the retest result existed', v: 'a' },
          { t: 'Lena released the batch without authority', v: 'b' },
          { t: 'The supplier collected the batch early', v: 'c' }
        ],
        answer: 0, gives: ['c22_access'],
        log: 'The custody record shows Vale signed the release before the retest result existed.',
        wrong: 'Compare the retest time to the release time.' },
      { id: 'maint', title: 'Cold room maintenance log', sub: 'Alarm tests and faults', body: '<div class="doc-sheet"><b>COLD ROOM 2 - SERVICE LOG</b><br><br>12/03 - sensor cleaned - <b>PASS</b><br>28/03 - door seal replaced - <b>PASS</b><br>04/04 18:05 - alarm test - <b>PASS - M. VALE</b><br>04/04 21:42 - <span class="g">ALARM DISABLED - CORRIDOR PANEL</span><br><br><span class="d">Disable requires supervisor badge. No fault code recorded.</span></div>',
        question: 'What does the maintenance log prove?',
        options: [
          { t: 'The alarm worked, then was deliberately disabled', v: 'a' },
          { t: 'The alarm had been broken for weeks', v: 'b' },
          { t: 'The door seal failed and trapped Lena', v: 'c' }
        ],
        answer: 0, gives: ['c22_alarm'],
        log: 'The cold room alarm passed its test at 18:05 and was deliberately disabled at 21:42 from the corridor panel.',
        wrong: 'The same evening has a PASS and a DISABLED entry. Read both.' }
    ],
    audioCalls: [
      { id: 'c22-999', title: 'Emergency call - security desk', sub: 'The guard who found Lena', cue: 'Under the guard\'s voice: the cold room alarm is silent. The compressor hums. No bell, no warning tone.', pattern: [300, 0, 300, 0, 420], tone: 'triangle',
        options: [
          { t: 'The cold room alarm was sounding', v: 'a' },
          { t: 'The cold room alarm was silent', v: 'b' },
          { t: 'A fire alarm was ringing elsewhere', v: 'c' }
        ],
        answer: 1, gives: ['c22_alarm'], flag: 'callHeard',
        log: 'The guard\'s call confirms the cold room alarm was silent when Lena was found. It had been disabled.',
        wrong: 'Listen for the bell. There is only the compressor.' }
    ],
    mapTask: {
      q: 'Which route matches Vale\'s badge and the reagent on his shoe?',
      options: [
        { t: 'Office -> car park -> home at 19:00', v: 'home' },
        { t: 'Office -> archive -> cold corridor -> lab bench -> exit at 21:44', v: 'cold' },
        { t: 'Office -> hospital -> supplier depot', v: 'hospital' }
      ],
      answer: 1, gives: ['c22_access'],
      log: 'Vale moved from the archive to the cold corridor, then past the reagent bench before leaving at 21:44.',
      wrong: 'The reagent bench is beside the cold room. His shoe ties him to that corridor.' },
    redHerrings: [
      { clue: 'c22_keycard', label: 'Sam\'s borrowed keycard', clearedBy: ['c22_keycard', 'c22_access'], note: 'Sam returned the card at 20:10, badged out at 21:45, and never entered the cold corridor.' }
    ],
    contradictions: [
      { suspect: 'vale', statement: 1, evidence: ['c22_alarm'],
        expose: 'The maintenance log shows his own PASS at 18:05 and a DISABLED entry at 21:42 from the corridor panel. The alarm did not fail. He switched it off.',
        wrong: 'He blames a faulty sensor. The service log is signed by him.' },
      { suspect: 'vale', statement: 3, evidence: ['c22_shoe'],
        expose: 'The reagent on his shoe exists only beside the cold room. His claim that he never returned to the lab collapses.',
        wrong: 'The crust is not floor dirt. It is the culture carboy.' },
      { suspect: 'vale', statement: 4, evidence: ['c22_email', 'c22_cc'],
        expose: 'Lena\'s email refuses the release. The carbon report marks the batch non-sterile. Vale signed it clean anyway.',
        wrong: 'The retest was never verbal. It was never done.' }
    ],
    solution: {
      minEvidence: 7,
      questions: [
        { kind: 'suspect', q: 'Who killed Dr Lena Ost?', options: [
          { t: 'Marcus Vale - laboratory director', v: 'vale' },
          { t: 'Sam Iyer - junior technician', v: 'sam' },
          { t: 'Iris Bell - supplier representative', v: 'iris' },
          { t: 'An unknown intruder with a stolen badge', v: 'intruder' }
        ], answer: 'vale' },
        { kind: 'method', q: 'How was her death staged?', options: [
          { t: 'She was struck with a CO2 cylinder, then locked in the cold room', v: 'cylinder' },
          { t: 'She was poisoned at the reagent bench', v: 'poison' },
          { t: 'She fell and the door sealed by accident', v: 'fall' },
          { t: 'She was suffocated in the archive and moved later', v: 'archive' }
        ], answer: 'cylinder' },
        { kind: 'motive', q: 'Why was Lena killed?', options: [
          { t: 'She found the sterility report that exposed Vale\'s false release', v: 'report' },
          { t: 'She was planning to leave for a rival laboratory', v: 'rival' },
          { t: 'She had embezzled from the lab budget', v: 'money' },
          { t: 'She was having an affair with Vale\'s partner', v: 'affair' }
        ], answer: 'report' },
        { kind: 'evidence', q: 'Which evidence proves the report was suppressed?', options: [
          { t: 'The carbon copy and the shredded strips', v: 'report' },
          { t: 'The security guard\'s emergency call', v: 'call' },
          { t: 'The supplier delivery note', v: 'supplier' },
          { t: 'The cold room maintenance sticker', v: 'alarm' }
        ], answer: 'report' }
      ],
      verdict: {
        who: "Marcus Vale",
        whoDesc: ", the laboratory director, was charged with the murder of Dr Lena Ost.",
        how: "He struck her with a CO2 cylinder, taped the cold-room release handle shut, and left her inside. Then he deleted the sterility report from the server and called it a faulty latch.",
        why: "The report marked a released blood batch non-sterile. Three hospital patients were already sick, and the signature that cleared it was his.",
        key: "The carbon copy of the report, the shredded strips, and the alarm he disabled with his own pass."
      },
      reveal: [
        "Lena printed forty-one pages because she knew the server copy would not survive her. She was right. She left the carbon in the one place a director never searches: the machine that made it.",
        "Vale switched off the cold corridor alarm at 21:42. The sensor did not fail. The man who blamed it had signed the maintenance override himself.",
        "Sam's borrowed keycard and Iris's delivery note were both real. Neither of them opened the door that killed her."
      ],
      quote: "A reputation is a heavy thing to carry over a report.",
      twist: "The batch was cleared twice: once on paper, once by a phone call from Vale's direct line to the hospital's duty manager."
    }
  });
})();
