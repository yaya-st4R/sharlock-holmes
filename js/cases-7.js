/* ============================================================
   CASE 13 — THE NIGHT SHIFT
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c13', num: 13,
    title: 'The Night Shift',
    subtitle: 'A call-centre supervisor is found dead in her car, and the last 999 call she took was never logged.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'parking', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Nadia Okonjo, 31 — night-shift supervisor' },
      { k: 'Scene', v: 'Meridian Response, staff car park' },
      { k: 'Found', v: '06:05 — by the morning security guard' },
      { k: 'Cause', v: 'Carbon monoxide · engine running, hose in the window' }
    ],
    briefing: [
      'At six in the morning the security guard found Nadia Okonjo in her car with the engine idling and a length of garden hose taped to the exhaust. The windows were up. The doors were locked. It looked like a suicide until the pathologist found the bruise behind her ear.',
      'Nadia ran the night shift at Meridian Response, a call centre that handles complaints for a mobile phone network. She was good at it. She kept a diary of every escalation, every irregularity, every caller who did not sound like a customer.',
      'At 02:14 she took a call that never reached the queue. The recording exists, but the call log has been edited. The caller was a woman reporting a break-in. In the background, a man was telling her what to say.',
      'Her team leader says she was depressed. Her best friend says she was furious. The security guard says nobody drove out of that car park between two and six. Somebody is lying about the shape of the night.'
    ],
    opening: 'The car park is empty except for the car and the cones around it. The engine is off now, but the exhaust pipe still smells hot. On the passenger seat: a lanyard, a cold cup of tea, and a phone with forty-one missed calls from a number saved as “J.”',
    objectives: [
      'Confirm whether Nadia’s death was suicide or murder.',
      'Recover the unlogged 999 call and identify the voice behind it.',
      'Audit the night shift’s call records and access badges.',
      'Find who had access to Nadia’s car — and her queue.'
    ],
    locations: [
      {
        id: 'carpark', name: 'Staff car park', short: 'Car park', time: '06:20',
        art: { kind: 'parking', mood: 'cold' },
        intro: 'A concrete deck behind the call centre, lit by two failing sodium lamps. Nadia’s blue hatchback sits in the far corner, nose out, with a garden hose running from the exhaust to the rear window.',
        actions: [
          { id: 'car', label: 'Examine Nadia’s car', icon: 'car', hotspot: { x: 59, y: 66 },
            desc: 'The hose, the locks, the bruise',
            text: [
              'The hose is a cheap green garden hose, cut to length and taped to the exhaust with duct tape. The other end is wedged into the rear window, which has been wound down just enough to hold it. The windows are otherwise shut.',
              'The driver’s door is locked. So are the others. The keys are in the ignition. Nadia is in the driver’s seat, seatbelt off, head tilted toward the passenger side. There is a bruise behind her right ear, roughly the size of a small stone.',
              'The pathologist’s preliminary note is clipped to the windscreen wiper: <b>“Blunt impact, left occipital. Perimortem. CO exposure consistent with post-mortem or peri-mortem. This was not self-inflicted.”</b>'
            ],
            gives: ['body-note', 'hose', 'car-phone'],
            hint: 'Look at the locks and the bruise. A suicide does not usually start with a blow to the head.'
          },
          { id: 'carparkcam', label: 'Pull the car park camera', icon: 'cctv',
            desc: 'One camera, one angle, one lie',
            requires: ['body-note'],
            text: [
              'The camera is mounted over the barrier and covers the entrance, not the far corner. It records Nadia’s car arriving at 01:48. It records the barrier rising. It does not record anyone leaving on foot before dawn.',
              'At 02:31, a figure walks into frame from the direction of the fire door. Dark coat, hood up, average height. The figure disappears behind the camera housing for six minutes, then reappears and walks back toward the building.',
              'The timestamp is five minutes slow. The guard who services the camera has been meaning to fix it for a month.'
            ],
            gives: ['carpark-cctv'],
            hint: 'The camera covers the entrance. The fire door is the blind spot.'
          },
          { id: 'patrol', label: 'Check the guard’s patrol sheet', icon: 'note',
            desc: 'Initials, times, and a missing round',
            requires: ['carpark-cctv'],
            text: [
              'The patrol sheet is a clipboard by the barrier. Rounds are logged every hour: 01:00, 02:00, 03:00. The 02:00 round is signed but the 03:00 round has been written in a different pen, with the same initials.',
              'At the bottom: <b>“02:10 — fire door propped. Reported to shift supervisor. No answer.”</b>',
              'The guard’s handwriting is round and careful. The 03:00 entry is not.'
            ],
            gives: ['guard-log'],
            hint: 'The guard noticed something at ten past two. Read the bottom of the sheet.'
          }
        ]
      },
      {
        id: 'floor', name: 'Call centre floor', short: 'The floor', time: '07:10',
        art: { kind: 'office' },
        requires: ['body-note'],
        intro: 'Forty desks in rows under fluorescent lights. Half the screens are still logged in, showing abandoned calls and a queue that has been paused since midnight. Someone has written “RIP NAD” on the whiteboard and someone else has rubbed it half away.',
        actions: [
          { id: 'desk', label: 'Search Nadia’s desk', icon: 'search',
            desc: 'A diary, a headset, a mug that says NIGHT OWL',
            text: [
              'The desk is immaculate. A mug of cold coffee, a stress ball shaped like a phone, and a headset with one ear cushion missing. The drawer is locked; the key is under the keyboard.',
              'Inside: a pocket diary, a packet of indigestion tablets, and a printed list headed <b>“IRREGULAR — DO NOT DELETE”</b>. The list contains eleven call IDs, all from the last three weeks, all outside normal hours.',
              'The diary’s last entry is Friday: <b>“J. took 04:17 again. Not on rota. Asked him. He said don’t make this a thing.”</b>'
            ],
            gives: ['desk-diary', 'irregular-list'],
            hint: 'The locked drawer key is under the keyboard. Start with the diary.'
          },
          { id: 'calllog', label: 'Audit the call log', icon: 'ledger',
            desc: 'One call missing from the queue',
            requires: ['desk-diary'],
            text: [
              'The call system logs every inbound call by extension. At 02:14 there is a gap of six minutes and forty-one seconds in Nadia’s queue — but no corresponding call record.',
              'The system administrator’s note is attached: <b>“Manual deletion, 02:21. User: JPIKE. Reason: test call.”</b>',
              'A test call does not last seven minutes. A test call does not have a recording.'
            ],
            gives: ['call-log', 'deletion-note'],
            hint: 'The supervisor’s queue has a hole in it. Check the admin note.'
          },
          { id: 'call', label: 'Recover the deleted 999 call', icon: 'audio', puzzle: 'call',
            desc: 'Seven minutes of a voice that should not exist',
            requires: ['call-log'],
            hint: 'The call was deleted from the queue but not from the backup. Listen to the background, not just the caller.'
          }
        ]
      },
      {
        id: 'office', name: 'Supervisor’s office', short: 'Office', time: '08:00',
        art: { kind: 'office' },
        requires: ['call-audio'],
        intro: 'A glass box at the end of the floor with a view of every desk. Nadia’s chair is pushed back, her keyboard at an angle. The safe under the desk is open a finger’s width.',
        actions: [
          { id: 'safe', label: 'Open the escalation safe', icon: 'lockbox', puzzle: 'safe',
            desc: 'A four-digit keypad · the call time',
            requires: ['call-log'],
            hint: 'The safe code is the time of the deleted call: 02:14.'
          },
          { id: 'pc', label: 'Open Nadia’s computer', icon: 'terminal', puzzle: 'nadia-pc',
            desc: 'The supervisor account and a hidden mail folder',
            requires: ['irregular-list'],
            hint: 'Nadia’s mug says NIGHT OWL. Her password is one word, lower case.'
          },
          { id: 'complaints', label: 'Read the escalation file', icon: 'ledger',
            desc: 'Eleven calls, one name',
            requires: ['complaints-file'],
            text: [
              'The file is a list of eleven complaints escalated by Nadia, each one closed by the same team leader: <b>J. Pike</b>. Each complaint involves a customer whose account was accessed after a call to Meridian Response.',
              'In the margin, Nadia has written: <b>“Not a coincidence. J. is taking card details on the quiet. The 04:17 calls are the pattern.”</b>',
              'The last page is a draft email to the network’s fraud team, unsent. Subject: <b>“Operation Night Shift.”</b>'
            ],
            gives: ['fraud-draft'],
            hint: 'The safe file is the motive. Read the margin notes.'
          }
        ]
      },
      {
        id: 'breakroom', name: 'Break room', short: 'Break room', time: '08:40',
        art: { kind: 'interior', variant: 'living' },
        requires: ['call-log'],
        intro: 'A narrow room with a fridge, a microwave, and a noticeboard covered in union posters and birthday cards. Elsa Renn is sitting at the table with a mug she has not drunk from.',
        actions: [
          { id: 'elsa', label: 'Interview Elsa Renn', icon: 'user', suspect: 'elsa',
            desc: 'Night advisor · union rep · Nadia’s friend',
            hint: 'Elsa worked the same shift as Nadia. Ask her about the 02:14 call.'
          },
          { id: 'lockers', label: 'Search the staff lockers', icon: 'search',
            desc: 'One locker has been forced',
            requires: ['call-audio'],
            text: [
              'Most of the lockers are empty or full of energy drinks. One — Nadia’s — has been forced with a flat blade. Inside: a spare hoodie, a packet of biscuits, and a USB stick taped to the back of the door.',
              'The USB is labelled <b>NIGHT SHIFT — BACKUP</b>. It contains a single spreadsheet: eleven calls, eleven card numbers, eleven names. The last column is headed <b>“J.P. — payout”</b>.',
              'The locker door has a smear of black ink on the frame, the same ink as the fingerprint pad by the fire door.'
            ],
            gives: ['usb-drive', 'locker-trace'],
            hint: 'Someone forced Nadia’s locker after she died. Look at the door frame.'
          }
        ]
      },
      {
        id: 'security', name: 'Security room', short: 'Security', time: '09:20',
        art: { kind: 'server' },
        requires: ['carpark-cctv'],
        intro: 'A cupboard full of monitors and the smell of old coffee. Marcus Webb, the night guard, is watching the car park camera on a loop. He has not shaved.',
        actions: [
          { id: 'marcus', label: 'Interview Marcus Webb', icon: 'user', suspect: 'marcus',
            desc: 'Night guard · first on scene',
            hint: 'Marcus signed the patrol sheet. Ask him about the 03:00 round.'
          },
          { id: 'badges', label: 'Pull the door access log', icon: 'id',
            desc: 'Who badged in after midnight',
            requires: ['guard-log'],
            text: [
              'The access system records every badge. After midnight: Elsa Renn out at 00:12, back in at 02:38. Jared Pike in at 01:55, no exit until 06:12. Marcus Webb in at 21:00, no exit.',
              'There is one more entry with no name: <b>FIRE DOOR — 02:10 — FORCED</b>. The fire door opens onto the car park and does not require a badge from the inside.',
              'The badge reader by the fire door is smeared with black ink from the fingerprint pad.'
            ],
            gives: ['badge-log'],
            hint: 'The fire door did not need a badge. The main doors did.'
          },
          { id: 'dvr', label: 'Rebuild the camera timeline', icon: 'clock', puzzle: 'dvr',
            desc: 'Six frames, one missing person',
            requires: ['badge-log', 'carpark-cctv'],
            hint: 'Start with Nadia arriving, then the fire door, then the figure. The 03:00 patrol entry is forged.'
          }
        ]
      },
      {
        id: 'jared', name: 'Jared Pike’s flat', short: 'Jared’s', time: '11:30',
        art: { kind: 'attic' },
        requires: ['jared-emails'],
        intro: 'A rented flat above a betting shop, full of screens. Three monitors show the Meridian queue on a delay. A fourth shows a spreadsheet of card numbers. Jared Pike is not home, but his laptop is.',
        actions: [
          { id: 'search', label: 'Search the flat', icon: 'search', hotspot: { x: 44, y: 54 },
            desc: 'Screens, cash, a hooded coat',
            text: [
              'The monitors are logged into the Meridian system with Nadia’s supervisor credentials. The spreadsheet on the fourth screen has eleven rows, matching the USB exactly. A column headed <b>“TAKEN”</b> totals £41,200.',
              'In the bedroom: a dark hooded coat with a torn cuff, a holdall containing £8,000 in cash, and a receipt for a garden hose bought three days ago.',
              'The coat cuff has a smear of black ink on it. The same ink is on the fire-door pad.'
            ],
            gives: ['jared-coat', 'jared-cash', 'hose-receipt'],
            hint: 'Jared has been running the call centre’s queue from his flat. Search the bedroom.'
          },
          { id: 'jared', label: 'Confront Jared Pike', icon: 'user', suspect: 'jared',
            desc: 'The team leader with a side business',
            requires: ['usb-drive'],
            hint: 'With the USB and the coat, it is time to hear what Jared has to say.'
          }
        ]
      }
    ],
    puzzles: {
      call: {
        type: 'audio', title: 'The Deleted Call', subtitle: '02:14 · 6 minutes 41 seconds', icon: 'audio',
        prompt: 'The call was removed from the queue at 02:21 by user JPIKE. The backup audio remains. Listen to the whole recording — especially the background.',
        pattern: [300, 300, 0, 440, 520, 520, 0, 220],
        tempo: 0.3,
        waveform: 'A woman’s voice, steady at first, then a man’s voice underneath it — lower, faster, close to the microphone. The woman repeats a phrase she has clearly been given.',
        options: [
          { t: 'A genuine break-in report with a child crying in the background', v: 'breakin' },
          { t: 'A woman being coached by a man who is telling her what to say', v: 'coach' },
          { t: 'A recorded message played back over the line', v: 'recording' },
          { t: 'Two customers arguing on a crossed line', v: 'crossed' }
        ],
        answer: 'coach',
        wrong: 'Listen to the gaps. The woman pauses before every phrase, and a second voice fills each pause with the next line.',
        hintText: 'The caller is not reporting a crime. She is performing one. The man’s voice gives her the words.',
        success: 'You isolate the background channel. A man’s voice, close to the phone: <i>“Tell them you saw a man in the car park. Tell them you were scared. Don’t use my name.”</i> The caller is reading from a script held by someone else.',
        successTitle: 'She was being coached.',
        gives: ['call-audio', 'coach-voice'], flags: ['callRecovered'],
        short: 'The 02:14 call was scripted by a man.',
        log: 'The deleted call contains a man’s voice coaching the caller: “Tell them you saw a man in the car park. Don’t use my name.”'
      },
      safe: {
        type: 'keypad', title: 'Escalation Safe', subtitle: 'Four-digit keypad', icon: 'lockbox',
        deviceLabel: 'NIGHT SUPERVISOR — SAFE', length: 4, code: '0214',
        prompt: 'A small safe under the desk. Nadia changed the code every week to the time of the worst call she took. <span style="color:var(--dim)">This week was a bad one.</span>',
        hintText: 'The deleted call came in at 02:14. Four digits, no colon.',
        successTitle: 'Safe open.',
        success: 'Inside: a folder of escalations, a printed list of irregular calls, and a draft email to the network’s fraud team.',
        gives: ['complaints-file'], flags: ['safeOpen'],
        short: 'The escalation file is open.',
        log: 'Nadia’s safe holds eleven escalation reports and an unsent fraud complaint against a team leader identified only as “J.”'
      },
      'nadia-pc': {
        type: 'terminal', title: 'Nadia’s Computer', subtitle: 'Supervisor account', icon: 'terminal',
        user: 'nadia', host: 'meridian-night', password: 'nightowl',
        intro: 'Connection established. The desktop is a photograph of a cat in a call-centre headset. Type "help" for commands.',
        banner: 'MERIDIAN RESPONSE — NIGHT SUPERVISOR. 3 FILES. 1 HIDDEN FOLDER.',
        files: [
          { name: 'rota.txt', body: 'MON–FRI NIGHT: Nadia O. (supervisor), Elsa R., Jared P. (team lead), Marcus W. (security)<br><span class="d">Note: Jared has added himself to 04:00–05:00 cover every night for three weeks. He is not on the approved rota.</span>' },
          { name: 'backup.csv', body: '<span class="d">IRREGULAR CALLS — DO NOT DELETE</span><br>02:14 — deleted — JPIKE<br>04:17 — deleted — JPIKE<br>04:17 — deleted — JPIKE<br>04:18 — deleted — JPIKE<br><span class="y">11 calls. 11 card numbers. £41,200.</span>' },
          { name: 'night_shift.eml', locked: true, secret: true, hint: 'Draft fraud report. Supervisor password required.', body: '<span class="y">TO: fraud@meridian-network<br>SUBJECT: Operation Night Shift</span><br><br>“For three weeks, calls have been disappearing from the night queue and reappearing as card-not-present fraud. The deletions are logged to team leader J. PIKE. He is also logged into the system from an external IP.<br><br>I have copied the call IDs and the card numbers to a USB drive. I am giving him until Friday to explain. If he does not, I am sending this.<br><br><span class="r">— Nadia Okonjo</span>”<br><br><span class="d">Saved 01:12 Friday. Never sent.</span>' }
        ],
        hintText: 'Her mug says NIGHT OWL. Try NIGHTOWL, lower case.',
        success: 'The hidden folder opens. Nadia had documented everything: eleven deleted calls, eleven card numbers, and a draft fraud report naming Jared Pike. She was giving him until Friday.',
        successTitle: 'She had him cold.',
        gives: ['jared-emails', 'fraud-list'], flags: ['pcOpen'],
        short: 'Nadia’s fraud file names Jared Pike.',
        log: 'Nadia’s computer contains a complete fraud file: eleven deleted calls traced to Jared Pike, £41,200 in stolen card details, and an unsent report.'
      },
      dvr: {
        type: 'sequence', title: 'Car Park Timeline', subtitle: 'Six frames, one missing exit', icon: 'clock', variant: 'strips',
        prompt: 'The camera clock is five minutes slow. The patrol sheet has a forged entry. Put the night in order.',
        items: [
          { t: 'Nadia’s car arrives', sub: '01:48 — barrier camera', order: 1 },
          { t: 'Jared badges into the building', sub: '01:55 — main door', order: 2 },
          { t: 'The fire door is forced', sub: '02:10 — access log', order: 3 },
          { t: 'The deleted call is taken', sub: '02:14 — Nadia’s queue', order: 4 },
          { t: 'The call is deleted', sub: '02:21 — JPIKE admin', order: 5 },
          { t: 'A hooded figure crosses the car park', sub: '02:31 — camera clock', order: 6 },
          { t: 'Jared badges out', sub: '06:12 — main door', order: 7 }
        ],
        wrong: 'That order has Jared leaving before he arrived. Start with Nadia’s car and follow the doors.',
        hintText: 'Car, badge in, fire door, call, deletion, figure, badge out. The camera is slow by five minutes.',
        success: 'The night fits together. Jared badged in at 01:55, forced the fire door at 02:10, took the call at 02:14, deleted it at 02:21, and walked back across the car park at 02:31. He did not badge out until six.',
        successTitle: 'He never left the building.',
        gives: ['dvr-timeline'], flags: ['timelineBuilt'],
        short: 'Jared was in the building at 02:14.',
        log: 'Timeline: Jared badged in at 01:55, forced the fire door at 02:10, and deleted Nadia’s call at 02:21. The camera caught him crossing the car park at 02:31.'
      }
    },
    suspects: [
      {
        id: 'jared', name: 'Jared Pike', role: 'Team leader · night shift', location: 'jared', locationName: 'His flat', tag: 'Prime suspect',
        portrait: { seed: 'jared-pike', hair: 'short', hairColor: '#2b1a12', skin: 0, expression: 'smug', collar: 'suit', beard: 'stubble' },
        intro: 'Thirty-four, smooth, with the practised sympathy of a man who has spent ten years telling people he understands. He arrives at the flat with a coffee and a story already prepared.',
        questions: [
          { q: 'Where were you between two and three?', requires: ['dvr-timeline'],
            a: '“On the floor. Covering the queue.” He smiles. “Nadia asked me to stay late. She was behind on escalations. I was at my desk until six.”',
            gives: ['jared-alibi'], flags: ['jaredHostile'] },
          { q: 'The deleted call is logged to your admin account.', requires: ['deletion-note'], present: true,
            a: '“Test call.” He does not blink. “We run test calls every night. You can ask anyone.” A pause. “Look, Nadia was having a hard time. She was making mistakes. I covered for her. That is what a team leader does.”',
            gives: ['jared-story'] },
          { q: 'The call recording has a man coaching the caller.', requires: ['call-audio'], present: true,
            a: 'The smile stays, but something behind it closes. “I do not know what you think you heard.” He sets down the coffee. “Call centre audio is compressed. It picks up all sorts. You are going to need more than a voice.”',
            gives: ['jared-denial'], flags: ['jaredHostile'] },
          { q: 'Why was Nadia’s locker forced?', requires: ['usb-drive'], present: true,
            a: '“I do not know anything about a locker.” He looks at the USB on the table. “That is not mine.” A long pause. “If you found that in her locker, it could be anyone’s. She had a lot of enemies. She was difficult.”',
            gives: ['jared-locker'] },
          { q: 'Your coat has black ink on the cuff. The fire-door pad has the same ink.', requires: ['jared-coat'], present: true,
            a: 'He looks at his own cuff for the first time. “I was in the building. I already told you that. The fire door was propped. I closed it.” He straightens his jacket. “You are trying to turn a mistake into a murder. Nadia killed herself. The bruise could be anything. She hit her head on the steering wheel.”',
            gives: ['jared-break'], flags: ['jaredBroke'] }
        ],
        after: 'He asks whether he can finish his coffee. You tell him no. He drinks it anyway.'
      },
      {
        id: 'elsa', name: 'Elsa Renn', role: 'Night advisor · union representative', location: 'breakroom', locationName: 'Break room', tag: 'Witness',
        portrait: { seed: 'elsa-renn', hair: 'bun', hairColor: '#8a5a33', skin: 4, expression: 'wary', collar: 'shirt', glasses: 'round' },
        intro: 'Twenty-nine, with a lanyard covered in union badges and a face that has been awake for too long. She and Nadia started on the same intake course five years ago.',
        questions: [
          { q: 'How was Nadia on Friday?', requires: ['desk-diary'],
            a: '“Angry. Properly angry. She had found something on the call log — calls disappearing, card numbers showing up in fraud reports. She said she was giving someone until Friday to explain.” Elsa folds her hands. “She would not tell me who. She said she did not want me involved.”',
            gives: ['elsa-statement'] },
          { q: 'Who had access to the supervisor’s queue?', requires: ['call-log'],
            a: '“Supervisors, team leaders, and IT. Jared Pike had admin. He was always on the system after hours. He said it was for cover.” She looks at you. “He was on the rota for 04:00 every night for three weeks. Nobody asked why. He is very good at not being asked.”',
            gives: ['elsa-jared'] },
          { q: 'Where were you at 02:14?', requires: ['badge-log'],
            a: '“On my break. Outside, by the bins, smoking a cigarette I promised Nadia I had given up.” She shrugs. “The badge log will show me going out at midnight and coming back at half two. I was not in the car park. The bins are round the side.”',
            gives: ['elsa-alibi'] },
          { q: 'Did Nadia ever mention being afraid?', requires: ['fraud-draft'],
            a: '“Not afraid. Exhausted.” She looks at the mug in her hands. “She said, ‘If I stop now, he wins.’ She was not the type to kill herself. She was the type to make a scene at the Christmas party.”',
            gives: ['elsa-fear'] }
        ],
        after: 'She gives you her number and says to call if you need someone to explain the queue system to a jury.'
      },
      {
        id: 'marcus', name: 'Marcus Webb', role: 'Night security guard', location: 'security', locationName: 'Security room', tag: 'Witness / suspect',
        portrait: { seed: 'marcus-webb', hair: 'buzz', hairColor: '#8d8d99', skin: 3, expression: 'sad', collar: 'coat', age: 'old' },
        intro: 'Sixty, with a bad back and a clipboard he holds like a shield. He found the body and has been sitting with it in his head ever since.',
        questions: [
          { q: 'Walk me through your night.', requires: ['guard-log'],
            a: '“Round at one. Nothing. Round at two — fire door was propped. I called the supervisor’s desk. No answer. I wrote it on the sheet and went to check the door. It was closed by the time I got there.” He swallows. “I thought she had gone home. I did not check the car park until six.”',
            gives: ['marcus-statement'] },
          { q: 'The 03:00 patrol entry is in your handwriting but a different pen.', requires: ['guard-log'], present: true,
            a: '“Jared asked me to sign it. He said he had done the round for me because my back was bad. He is a helpful man. Everyone says so.” He looks at the clipboard. “I should not have signed it. I know.”',
            gives: ['marcus-suspicion'] },
          { q: 'Did you see anyone cross the car park?', requires: ['carpark-cctv'],
            a: '“Only on the camera. A figure at half two. Hood up. I thought it was a kid from the estate.” He rewinds the footage. “I did not see a face. But the walk — the walk was Jared’s. He has a way of leaning forward, like he is late for something.”',
            gives: ['marcus-identification'] },
          { q: 'Was Nadia’s car locked when you found it?', requires: ['body-note'],
            a: '“Locked. All four doors. I had to break the window.” He looks at his hands. “The engine was running. The hose was taped. I have seen suicides before. This did not look like one. The tape was neat. Too neat.”' ,
            gives: ['marcus-scene'] }
        ],
        after: 'He asks whether he will lose his job for signing the false round. You tell him that is the least of his problems.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Nadia Okonjo — post-mortem note', caption: 'Blunt impact · CO exposure', icon: 'blood', type: 'Forensic report',
        desc: 'A blunt impact behind the right ear, consistent with a stone or a small tool. Carbon monoxide exposure peri-mortem. No defensive wounds.',
        tells: 'She was struck before the hose was rigged. The suicide was staged.'
      },
      'hose': {
        name: 'Garden hose and duct tape', caption: 'Exhaust to rear window', icon: 'tool', type: 'Physical evidence',
        desc: 'A green garden hose cut to length and taped to the exhaust. The tape is neat and evenly pressed. A suicide rig is rarely this tidy.',
        tells: 'The killer planned the scene in advance and took care over the details.'
      },
      'car-phone': {
        name: 'Nadia’s phone', caption: '41 missed calls from “J.”', icon: 'phone', type: 'Device',
        desc: 'Nadia’s phone, found on the passenger seat. Forty-one missed calls from a contact saved as “J.” between 02:20 and 05:50.',
        tells: 'Jared was trying to reach her — or trying to establish that he thought she was alive.'
      },
      'carpark-cctv': {
        name: 'Car park camera still', caption: '02:31 · hooded figure', icon: 'cctv', type: 'Surveillance',
        desc: 'A hooded figure crosses the car park at 02:31, disappears behind the camera housing for six minutes, and returns to the building.',
        tells: 'Someone was in the car park at the time of the murder. The camera clock is five minutes slow.'
      },
      'guard-log': {
        name: 'Guard patrol sheet', caption: '02:10 fire door propped · 03:00 forged', icon: 'note', type: 'Record',
        desc: 'The 02:00 round notes a propped fire door and no answer from the supervisor. The 03:00 entry is written in a different pen.',
        tells: 'The fire door was the killer’s route. Someone forged the later round to cover the gap.'
      },
      'desk-diary': {
        name: 'Nadia’s desk diary', caption: '“J. took 04:17 again.”', icon: 'book', type: 'Personal record',
        desc: 'Nadia tracked Jared’s unauthorised 04:17 calls for three weeks. The last entry warns him to explain.',
        tells: 'Nadia had identified Jared’s pattern and was about to act on it.'
      },
      'irregular-list': {
        name: 'Irregular call list', caption: 'Eleven IDs · do not delete', icon: 'ledger', type: 'Record',
        desc: 'A printed list of eleven call IDs from the last three weeks, all outside normal hours, all removed from the queue.',
        tells: 'The fraud was systematic. Nadia was building a case.'
      },
      'call-log': {
        name: 'Call log gap', caption: '02:14 · 6m41s missing', icon: 'laptop', type: 'Digital evidence',
        desc: 'A gap of six minutes and forty-one seconds in Nadia’s queue with no call record. A manual deletion is logged at 02:21.',
        tells: 'The call existed. Someone with admin access removed it.'
      },
      'deletion-note': {
        name: 'Deletion audit note', caption: 'User JPIKE · “test call”', icon: 'laptop', type: 'Digital evidence',
        desc: 'The call system’s audit trail names JPIKE as the user who deleted the 02:14 call, with the reason “test call”.',
        tells: 'Jared Pike deleted the only record of the call. There was no test.'
      },
      'call-audio': {
        name: 'Recovered 999 call', caption: 'A woman reading a script', icon: 'audio', type: 'Audio evidence',
        desc: 'The deleted call’s backup audio. A woman reports a break-in, pausing before each phrase while a man’s voice feeds her the words.',
        tells: 'The call was manufactured. The man coaching her is the killer’s accomplice — or the killer.'
      },
      'coach-voice': {
        name: 'The coaching voice', caption: '“Don’t use my name.”', icon: 'audio', type: 'Forensic analysis',
        desc: 'A low male voice, close to the microphone, audible in the gaps: “Tell them you saw a man in the car park. Don’t use my name.”',
        tells: 'The caller was creating a false suspect. The voice is the only direct link to the planner.'
      },
      'complaints-file': {
        name: 'Escalation file', caption: 'Eleven complaints · all closed by J. Pike', icon: 'ledger', type: 'Business record',
        desc: 'Eleven customer complaints, each involving an account accessed after a call to Meridian, each closed by Jared Pike.',
        tells: 'Jared was both the thief and the person who closed the complaints.'
      },
      'fraud-draft': {
        name: 'Operation Night Shift draft', caption: 'Unsent email to fraud team', icon: 'letter', type: 'Digital evidence',
        desc: 'Nadia’s unsent fraud report, naming J. Pike and describing eleven deleted calls and £41,200 in card losses.',
        tells: 'This is the motive. Nadia was one click from ending Jared’s side business.'
      },
      'usb-drive': {
        name: 'NIGHT SHIFT USB', caption: '11 cards · £41,200', icon: 'usb', type: 'Digital evidence',
        desc: 'A USB drive taped inside Nadia’s forced locker. It contains a spreadsheet of stolen card numbers and a payout column headed “J.P.”',
        tells: 'The evidence was hidden where Nadia thought it would be safe. Someone knew to look there.'
      },
      'locker-trace': {
        name: 'Locker door trace', caption: 'Black ink · forced blade', icon: 'fiber', type: 'Trace evidence',
        desc: 'Black ink on the forced locker frame, matching the fingerprint pad by the fire door. The locker was opened after Nadia died.',
        tells: 'The killer searched her locker for the USB and left a trace on the door.'
      },
      'badge-log': {
        name: 'Door access log', caption: 'Jared in 01:55 · out 06:12', icon: 'id', type: 'Access record',
        desc: 'Jared Pike badged in at 01:55 and did not badge out until 06:12. The fire door was forced at 02:10.',
        tells: 'Jared was inside the building for the entire window in which Nadia died.'
      },
      'dvr-timeline': {
        name: 'Car park timeline', caption: '01:48 → 06:12', icon: 'clock', type: 'Analysis',
        desc: 'Nadia arrived at 01:48. Jared badged in at 01:55. The fire door was forced at 02:10. The call came at 02:14. The deletion followed at 02:21.',
        tells: 'Only one person was in the right place at every point in the sequence.'
      },
      'jared-coat': {
        name: 'Hooded coat with ink', caption: 'Torn cuff · black fingerprint ink', icon: 'mask', type: 'Physical evidence',
        desc: 'A dark hooded coat in Jared’s flat with a torn cuff and a smear of black ink matching the fire-door pad.',
        tells: 'Jared was the figure on the camera. The ink ties him to the forced door.'
      },
      'jared-cash': {
        name: '£8,000 in cash', caption: 'Holdall · unexplained', icon: 'money', type: 'Financial evidence',
        desc: 'A holdall of used notes in Jared’s bedroom, far more than a team leader’s savings.',
        tells: 'Jared was profiting from the fraud. The card data was being sold.'
      },
      'hose-receipt': {
        name: 'Garden hose receipt', caption: 'Bought three days ago', icon: 'receipt', type: 'Physical evidence',
        desc: 'A receipt for a green garden hose, bought three days before Nadia’s death, in Jared’s flat.',
        tells: 'The murder weapon was purchased in advance. This was not a crime of passion.'
      },
      'jared-emails': {
        name: 'Nadia’s hidden fraud folder', caption: 'Operation Night Shift', icon: 'laptop', type: 'Digital evidence',
        desc: 'The complete fraud file on Nadia’s computer: deleted calls, card numbers, and an unsent report naming Jared Pike.',
        tells: 'Jared knew she had the file. He had access to her machine.'
      },
      'fraud-list': {
        name: 'Fraud payout list', caption: '11 calls · £41,200', icon: 'ledger', type: 'Financial record',
        desc: 'A list of eleven card numbers and the amounts taken, with a column marked “J.P. — payout”.',
        tells: 'The motive is money, and the money has a name on it.'
      },
      'elsa-statement': {
        name: 'Elsa’s statement', caption: '“She was giving someone until Friday.”', icon: 'note', type: 'Witness statement',
        desc: 'Elsa says Nadia had discovered disappearing calls and card fraud, and had given the culprit until Friday to explain.',
        tells: 'Nadia was planning a confrontation. Jared knew it was coming.'
      },
      'elsa-jared': {
        name: 'Elsa on Jared', caption: '“Always on the system after hours.”', icon: 'audio', type: 'Interview',
        desc: 'Elsa says Jared had admin access, added himself to the 04:00 rota every night, and was never questioned.',
        tells: 'Jared had the access, the opportunity, and the habit of not being asked.'
      },
      'elsa-alibi': {
        name: 'Elsa’s alibi', caption: 'Outside by the bins · 00:12–02:38', icon: 'receipt', type: 'Alibi',
        desc: 'Elsa badged out at 00:12 and back in at 02:38. She was smoking by the bins, round the side of the building.',
        tells: 'Elsa was outside, but not in the car park. The camera does not show her.'
      },
      'elsa-fear': {
        name: '“If I stop now, he wins.”', caption: 'Elsa on Nadia’s state of mind', icon: 'note', type: 'Interview',
        desc: 'Elsa insists Nadia was not suicidal. She was exhausted, furious, and determined to finish what she had started.',
        tells: 'The suicide story does not fit the woman her friend knew.'
      },
      'marcus-statement': {
        name: 'Marcus’s account', caption: 'Fire door propped · no answer', icon: 'note', type: 'Witness statement',
        desc: 'Marcus found the fire door propped at 02:10 and called the supervisor’s desk. No one answered. He did not check the car park until six.',
        tells: 'Nadia was already in the car park by 02:10. The fire door was the killer’s route.'
      },
      'marcus-suspicion': {
        name: 'Marcus on the forged round', caption: '“Jared asked me to sign it.”', icon: 'audio', type: 'Interview',
        desc: 'Marcus admits Jared asked him to sign the 03:00 patrol entry because of his bad back.',
        tells: 'Jared was building an alibi for the hour he needed covered.'
      },
      'marcus-identification': {
        name: 'The walk on the camera', caption: '“The walk was Jared’s.”', icon: 'cctv', type: 'Identification',
        desc: 'Marcus recognises the hooded figure’s forward-leaning walk as Jared Pike’s.',
        tells: 'The figure in the car park was the team leader.'
      },
      'marcus-scene': {
        name: 'The locked car', caption: 'All four doors locked', icon: 'car', type: 'Scene note',
        desc: 'Nadia’s car was locked when Marcus found it. He had to break the window to reach her.',
        tells: 'Someone locked the car after rigging the hose. A person committing suicide does not lock the doors from the inside and leave the keys in the ignition.'
      },
      'jared-alibi': {
        name: 'Jared’s alibi', caption: '“On the floor until six.”', icon: 'audio', type: 'Statement',
        desc: 'Jared claims he was covering the queue on the call-centre floor all night. The badge and camera records put him in the car park.',
        tells: 'His alibi is contradicted by the building’s own systems.'
      },
      'jared-story': {
        name: 'Jared on the deletion', caption: '“A test call.”', icon: 'note', type: 'Statement',
        desc: 'Jared calls the deleted 02:14 call a routine test. The recording is seven minutes long and has a caller on it.',
        tells: 'He is lying about the most easily checked fact in the case.'
      },
      'jared-denial': {
        name: 'Jared on the recording', caption: '“Call audio is compressed.”', icon: 'audio', type: 'Statement',
        desc: 'Jared dismisses the coaching voice as compression artefact and refuses to discuss the call.',
        tells: 'He knows the recording is a problem. He has no explanation for it.'
      },
      'jared-locker': {
        name: 'Jared on the locker', caption: '“She had a lot of enemies.”', icon: 'note', type: 'Statement',
        desc: 'Jared denies forcing Nadia’s locker and suggests the USB could belong to anyone.',
        tells: 'He is trying to distance himself from the one object that ties him to the fraud.'
      },
      'jared-break': {
        name: 'Jared’s collapse', caption: '“Nadia killed herself.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the ink on his cuff, Jared insists Nadia hit her head on the steering wheel and killed herself.',
        tells: 'The steering wheel does not explain the hose, the locked doors, or the deleted call.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Nadia Okonjo?',
          options: [
            { t: 'Elsa Renn — her friend and union representative', v: 'elsa' },
            { t: 'Marcus Webb — the guard who found the body', v: 'marcus' },
            { t: 'Jared Pike — the team leader running the card fraud', v: 'jared' },
            { t: 'Nadia herself — a suicide staged to look like murder', v: 'nadia' }
          ], answer: 'jared' },
        { q: 'How was Nadia killed?',
          options: [
            { t: 'She was struck behind the ear, then placed in the car with a hose from the exhaust', v: 'staged' },
            { t: 'She was locked in the car and died of heat exhaustion', v: 'heat' },
            { t: 'She was poisoned at her desk and moved to the car', v: 'poison' },
            { t: 'She was pushed from the car park roof and placed in the car', v: 'fall' }
          ], answer: 'staged' },
        { q: 'What was the motive?',
          options: [
            { t: 'Nadia had documented his card fraud and was about to report him', v: 'fraud' },
            { t: 'Jared was in love with Elsa and Nadia stood in the way', v: 'love' },
            { t: 'Nadia was going to sell the call centre to a rival', v: 'sale' },
            { t: 'Jared believed Nadia had stolen his promotion', v: 'promotion' }
          ], answer: 'fraud' },
        { q: 'Which evidence breaks the case?',
          options: [
            { t: 'The deleted call audio and the badge/camera timeline', v: 'call' },
            { t: 'Marcus’s forged patrol entry', v: 'patrol' },
            { t: 'Elsa’s cigarette break and the bins', v: 'elsa' },
            { t: 'The garden hose receipt in Jared’s flat', v: 'hose' }
          ], answer: 'call' }
      ],
      verdict: {
        who: 'Jared Pike, 34 — night-shift team leader at Meridian Response',
        whoDesc: 'was arrested at his flat and charged with murder and fraud. The deleted call recording was played at his trial.',
        how: 'He struck Nadia behind the ear in the car park, rigged a garden hose from the exhaust to the rear window, locked the car, and left through the propped fire door.',
        why: 'Nadia had documented eleven deleted calls and £41,200 in stolen card details, all traced to his admin account. She was giving him until Friday to explain. He used the time to plan her death.',
        key: 'The recovered 02:14 call, with a man coaching the caller, matched to Jared’s badge and camera movements on the night.'
      },
      reveal: [
        'The fraud was almost elegant. Jared Pike had admin access to the night queue. When a customer called with a card problem, he would take the call off Nadia’s screen, keep the customer talking, and write down the long card number. Then he would delete the call and mark it as a test. The card details went to a buyer who paid in cash.',
        'He had been doing it for three weeks. Eleven calls. Forty-one thousand pounds. Nadia noticed the gap in her queue before she noticed the money. She pulled the call IDs, cross-referenced the fraud reports, and found the same name closing every complaint: J. Pike.',
        'On Friday night she took the 02:14 call herself. The caller was a woman reporting a break-in in the car park. In the background, a man was feeding her lines. Nadia recognised the voice. She kept the call open for seven minutes and saved the backup audio.',
        'Jared knew she had it. He had been watching her queue. At 01:55 he badged into the building. At 02:10 he forced the fire door and propped it open. At 02:14 he took the call from her — not on the phone, but in the car park, where she had gone to meet the caller.',
        'He struck her once behind the ear with a stone from the planter by the barrier. Then he carried her to her own car, sat her in the driver’s seat, and rigged the hose. He locked the doors, pocketed her phone, and walked back through the fire door. The camera caught him at 02:31, five minutes slow, hood up, leaning forward like a man late for something.',
        'He deleted the call at 02:21. He forged the 03:00 patrol round with Marcus’s clipboard. He called Nadia’s phone forty-one times between 02:20 and 05:50, building a record of a man who thought his supervisor had gone home.',
        'The suicide story held for less than an hour. The bruise behind her ear, the locked doors, the neat tape on the hose. Then the call log gap. Then the backup audio. Then the ink on his cuff and the receipt for a garden hose in his flat.',
        'The woman on the 02:14 call was traced to a flat in the north of the city. She had been paid £200 to make a false report. She did not know what the call was for. She recognised Jared’s voice from the recording immediately.',
        'Nadia’s unsent email was still in her drafts folder. Subject: Operation Night Shift. It ended with a sentence that the prosecution read aloud: <i>“I am giving him until Friday. After that, I am not asking.”</i>'
      ],
      quote: 'I am giving him until Friday. After that, I am not asking.',
      twist: 'The final detail was in the call itself. Nadia did not take the 02:14 call from her desk — the queue record shows her extension was idle. She took it in the car park, on her mobile, from the woman Jared had paid to lure her outside. She knew it was a trap, and she recorded it anyway.'
    }
  });
})();
