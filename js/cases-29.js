/* ============================================================
   CASE 29 - BROKEN SIGNAL
   Undercover-gated case. Deploy the Night Shift operation first.
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c29', num: 29,
    title: 'Broken Signal',
    subtitle: 'Four cameras failed for four minutes. Ravi Chand fell in the dark.',
    difficulty: 4, est: '40-50 min',
    cover: { kind: 'server', mood: 'night' },
    missionId: 'm-nightshift',
    facts: [
      { k: 'Victim', v: 'Ravi Chand, 29 - night monitoring operator' },
      { k: 'Scene', v: 'Control room and east stairwell, Kellard House' },
      { k: 'Found', v: 'Monday, 05:40 - by the morning cleaner' },
      { k: 'Official cause', v: 'Fall from the fourteenth-floor landing' }
    ],
    briefing: [
      "Kellard House has twelve floors of tenants and six floors of nothing. Ravi Chand watched the empty ones for a security contractor, twelve screens and a chair, every night from seven to seven.",
      "At 02:14 four cameras lost signal at once. They came back at 02:18. At 05:40 the cleaner found Ravi at the bottom of the east stairwell. The system logged no alarm, no door fault, and no reason for a man to be on the fourteenth floor.",
      "The building\'s facilities director says the outage was a maintenance purge. The camera clock says otherwise. So does the raw feed, if there is any of it left."
    ],
    opening: 'The control room is lit blue. Twelve monitors show empty corridors, a lift lobby, an archive door and rain on the car park. One chair is turned toward the door, away from the screens.',
    objectives: [
      'Establish how Ravi died and why he left the control room.',
      'Recover the raw footage from the four-minute gap.',
      'Match the figure in the corridor to a badge and a face.',
      'Prove who altered the camera clock and why.'
    ],
    locations: [
      {
        id: 'control', name: 'Control Room', short: 'Control', time: '06:20',
        art: { kind: 'server', mood: 'night' },
        intro: 'A windowless room of monitor glow and cold coffee. The chair is turned away from the desk. A mug has been knocked over and not cleaned. The console is still logged in.',
        actions: [
          { id: 'console', label: 'Open the camera archive', icon: 'terminal', puzzle: 'monitor-term',
            desc: 'Raw feed, gap log, staff list',
            gives: ['night_raw'],
            hint: 'Ravi\'s console password was NIGHTSHIFT. Look for the maintenance command at 02:09.'
          },
          { id: 'chair', label: 'Examine the chair and the floor', icon: 'search', hotspot: { x: 46, y: 58 },
            desc: 'A turned chair, a dropped mug, a scuffed cable',
            text: [
              "The chair is turned toward the door, not the monitors. Ravi stood up fast and left without pushing it back.",
              "Under the desk, a USB extension cable has been pulled out of the console. The socket is bent. A thumb drive is missing.",
              "The floor by the door holds a single scuff mark, the kind a shoe makes when someone turns sharply and runs."
            ],
            gives: ['night_body', 'night_drive'],
            hint: 'He left in a hurry with something from the console. The missing thumb drive is the key.'
          },
          { id: 'audio', label: 'Listen to the gap', icon: 'ear', puzzle: 'gap-audio',
            desc: 'Four minutes of carrier and voices',
            gives: ['night_gap'],
            hint: 'Under the carrier there is a woman\'s voice and a door. The loop is not empty.'
          }
        ]
      },
      {
        id: 'stair', name: 'East Stairwell', short: 'Stairwell', time: '07:10',
        art: { kind: 'basement', mood: 'night' },
        requires: ['night_body'],
        intro: 'Concrete stairs spiralling down eighteen floors, wet with tracked rain. Ravi is at the bottom landing, one arm under him. A security lanyard is still around his neck, but the card is gone.',
        actions: [
          { id: 'body', label: 'Examine Ravi and the landing', icon: 'blood', hotspot: { x: 50, y: 62 },
            desc: 'The angle, the hands, the missing card',
            text: [
              "The back of Ravi\'s head is crushed, but there are grazes on both palms and a fracture in his left wrist, the kind made by trying to catch a rail.",
              "There is a fresh handprint on the fourteenth-floor landing rail, four floors up. It is too small to be Ravi\'s and it is smeared downward, as if someone leaned hard and let go.",
              "His lanyard is empty. The card was removed after he fell, not torn off in the fall."
            ],
            gives: ['night_body', 'night_stair'],
            hint: 'He tried to catch himself. The handprint four floors up is not his.'
          },
          { id: 'door', label: 'Read the stairwell door log', icon: 'keypad', puzzle: 'stair-pin',
            desc: 'Four-digit facilities code',
            gives: ['night_stair'],
            hint: 'The facilities override code is the building\'s opening year, on the plaque in reception.'
          },
          { id: 'cleaner', label: 'Question the cleaner', icon: 'user',
            desc: 'She found him - and heard the alarm',
            text: [
              "The cleaner, Mrs Adeyemi, starts at five. She heard the purge alarm from the control room at 02:20 but did not go in; the door was locked and she has no key.",
              "At 05:40 she found Ravi. The east stairwell door was propped open with a rubber wedge, the kind facilities use for moving equipment.",
              "She saw a woman in a facilities coat come out of the lift at 02:30 carrying a laptop bag. She did not see her face."
            ],
            gives: ['night_witness'],
            hint: 'A woman in a facilities coat, a laptop bag, and a propped stairwell door.'
          }
        ]
      },
      {
        id: 'office', name: "Kestrel's Office", short: 'Office', time: '08:00',
        art: { kind: 'office', mood: 'night' },
        requires: ['night_gap'],
        intro: 'A glass office on the twelfth floor with a view of the rain. Diane Kestrel\'s coat is on the hook, still damp. Her laptop is open on the desk, the screen turned away from the door.',
        actions: [
          { id: 'diane', label: 'Question Diane Kestrel', icon: 'user', suspect: 'diane',
            desc: 'Facilities director - controls the cameras' },
          { id: 'contract', label: 'Read the floor 14 contract', icon: 'ledger',
            desc: 'A tenant that does not exist',
            text: [
              "Floor 14 is leased to Meridian Holdings for secure colocation. The rent is paid quarterly into an account that is not the building\'s.",
              "The contract grants the tenant unrestricted after-hours access and a private fibre line. The signature for the landlord is D. KESTREL.",
              "An annex lists equipment: twelve server racks, one independent power supply, and one badge reader installed by the tenant. The reader is not on the building system."
            ],
            gives: ['night_contract'],
            hint: 'The fourteenth floor is rented to a company that pays Diane directly.'
          },
          { id: 'clock', label: 'Check the camera clock settings', icon: 'clock', puzzle: 'clock-seq',
            desc: 'Four failures, one changed clock',
            gives: ['night_clock'],
            hint: 'The clock moved backward seven minutes. Order the events around 02:09.'
          }
        ]
      },
      {
        id: 'floor14', name: 'Floor 14 Server Hall', short: 'Floor 14', time: '09:20',
        art: { kind: 'server', mood: 'night' },
        requires: ['night_contract'],
        intro: 'The lift opens on a floor that is supposed to be empty. Instead there is a sealed server hall, a biometric reader and a cable run disappearing into the ceiling. The air is warm.',
        actions: [
          { id: 'frame', label: 'Enhance the raw corridor frame', icon: 'photo', puzzle: 'frame-photo',
            desc: 'A figure with a lanyard',
            gives: ['night_frame'],
            hint: 'Enhance the figure\'s collar. Look for the scarab pin and the facilities coat.'
          },
          { id: 'mina', label: 'Question Mina Osei', icon: 'user', suspect: 'mina',
            desc: 'Data centre technician - installed the racks' },
          { id: 'grid', label: 'Reconstruct the badge timeline', icon: 'id', puzzle: 'shift-grid',
            desc: 'Three badges, three floors',
            gives: ['night_badge'],
            hint: 'The lost card is used at 02:14, but the master facilities card is used before and after.'
          }
        ]
      }
    ],
    puzzles: {
      'monitor-term': {
        type: 'terminal', title: 'Camera Archive', subtitle: 'Kellard House CCTV', icon: 'terminal',
        user: 'rchand', host: 'kellard-cctv', password: 'nightshift',
        passwords: ['nightshift', 'night shift', 'the night shift'],
        intro: 'Kellard monitoring console. Type help for commands.',
        banner: 'NIGHT LOG - 4 CAMERAS - GAP 02:14-02:18',
        files: [
          { name: 'feed.log', body: '02:09 CLOCK ADJUST - facilities console - -7 min<br>02:14 CAM E1 E3 E7 E9 SIGNAL LOST<br>02:14 BADGE 4471 - ARCHIVE DOOR<br>02:18 SIGNAL RESTORED<br><span class="r">02:18 RAW BUFFER EXPORT - user RCHAND - drive E:</span>' },
          { name: 'gap.log', body: '<b>MAINTENANCE PURGE</b> - command issued 02:09<br>Source: <b>FACILITIES-12</b><br>Authorised by: <b>D. KESTREL</b><br><span class="d">Purge targets the four empty-floor cameras only.</span><br><span class="r">Buffer copy retained on local drive E:.</span>' },
          { name: 'staff.txt', body: '<b>R. CHAND</b> - night operator, console access<br><b>D. KESTREL</b> - facilities director, master badge<br><b>O. FENN</b> - night supervisor, badge 4471 reported lost<br><span class="d">Lost-card drawer key held by facilities director.</span>' }
        ],
        hintText: 'The gap was a maintenance purge authorised by D. KESTREL. Ravi exported the raw buffer before it was purged.',
        success: 'The console shows a deliberate clock adjustment and a four-camera purge authorised by Diane Kestrel. Ravi exported the raw buffer to a local drive before it was erased.',
        gives: ['night_raw'], flags: ['consoleOpen'],
        short: 'Diane authorised the purge.',
        log: 'The CCTV console shows Diane Kestrel authorising a four-camera purge at 02:09, and Ravi exporting the raw buffer before it was erased.'
      },
      'gap-audio': {
        type: 'audio', title: 'The Four-Minute Gap', subtitle: 'Carrier, voice, door', icon: 'ear',
        prompt: 'Play the audio recovered from the gap. A carrier tone runs underneath, then a woman speaks, then a heavy door closes.',
        pattern: [330, 330, 0, 260, 420, 0, 260, 330],
        waveform: 'The carrier is machine-steady for ninety seconds. A woman\'s voice cuts in, calm and close to the microphone: close it, close it now. Then a door, then the carrier resumes.',
        options: [
          { t: 'A maintenance purge with no one in the corridor', v: 'empty' },
          { t: 'A woman ordering someone to close the floor while standing at the camera', v: 'woman' },
          { t: 'Ravi talking to himself in the control room', v: 'ravi' },
          { t: 'A recorded announcement from the lift', v: 'lift' }
        ],
        answer: 'woman',
        wrong: 'The voice is not an announcement. It is speaking to someone, and the microphone is close enough to hear her breathe.',
        hintText: 'Listen for the words close it and the door. The voice is female and close.',
        success: 'The gap audio captures a woman ordering the floor closed, then a heavy door. The purge was not empty; someone was on the fourteenth floor.',
        gives: ['night_gap'], flags: ['gapHeard'],
        short: 'A woman was on floor 14 during the gap.',
        log: 'The gap audio contains a woman ordering the floor closed and a heavy door, proving someone was on floor 14 during the purge.'
      },
      'stair-pin': {
        type: 'keypad', title: 'East Stairwell', subtitle: 'Facilities override', icon: 'keypad',
        deviceLabel: 'EAST STAIR - FACILITIES', length: 4, code: '2004',
        prompt: 'The stairwell door uses the facilities override code. The building\'s opening year is on the brass plaque in reception.',
        hintText: 'KELLARD HOUSE - OPENED 2004. Four digits.',
        success: 'The door log opens. The east stairwell was unlocked with a facilities key at 02:18 and propped open at 02:19.',
        gives: ['night_stair'], flags: ['stairOpen'],
        short: 'The stairwell was opened with a facilities key.',
        log: 'The stairwell log shows a facilities key unlocking the door at 02:18, one minute after the camera gap ended.'
      },
      'clock-seq': {
        type: 'sequence', title: 'Camera Clock', subtitle: 'Four events, seven minutes', icon: 'clock',
        prompt: 'Put the camera events in the order the raw buffer records them. The clock was moved backward, so the displayed times lie.',
        variant: 'strips',
        items: [
          { t: 'Clock adjusted by -7 minutes from facilities', sub: 'displayed 02:09' },
          { t: 'Archive door badge 4471', sub: 'displayed 02:14' },
          { t: 'Four cameras lose signal', sub: 'displayed 02:14' },
          { t: 'Raw buffer restored, signal returns', sub: 'displayed 02:18' }
        ],
        success: 'The clock was moved before the gap. In real time the purge began at 02:16, and the badge entry at 02:21. The adjustment was made to make the gap look like a routine loop.',
        gives: ['night_clock'], flags: ['clockDone'],
        short: 'The camera clock was moved back seven minutes.',
        log: 'The camera clock was adjusted backward seven minutes at 02:09, shifting the real purge and badge entry outside the recorded window.'
      },
      'frame-photo': {
        type: 'photo', title: 'Corridor Frame', subtitle: 'Enhance the figure', icon: 'photo',
        scene: { kind: 'server', mood: 'night' },
        target: { x: 58, y: 48, w: 16, h: 30 }, range: [62, 86],
        reveal: 'A woman in a facilities coat, a lanyard at her collar and a gold scarab pin on the lapel. The time stamp reads 02:16. She is looking back at the camera.',
        question: 'Who does the enhanced frame show?', options: [
          { t: 'A woman in a facilities coat with a scarab pin', v: 'diane' },
          { t: 'A cleaner with a trolley', v: 'cleaner' },
          { t: 'Ravi Chand leaving the control room', v: 'ravi' }
        ],
        answer: 'diane',
        wrong: 'The coat is facilities issue, and the pin is the one Diane wears on her lapel in every staff photograph.',
        success: 'The frame shows Diane Kestrel on the fourteenth floor at the moment of the purge, wearing her facilities coat and scarab pin.',
        gives: ['night_frame'], flags: ['frameSeen'],
        short: 'Diane was on floor 14 during the gap.',
        log: 'The enhanced frame places Diane Kestrel on the fourteenth floor at 02:16, wearing her facilities coat and gold scarab pin.'
      },
      'shift-grid': {
        type: 'logicgrid', title: 'Badge Timeline', subtitle: 'Three badges, three floors', icon: 'id',
        prompt: 'Match each time to the badge used and the floor it opened. Only one combination fits the door and camera records.',
        rows: [
          { label: '01:58', selects: [
            { label: 'badge', options: [{ t: 'D. Kestrel master', v: 'master' }, { t: 'Lost card 4471', v: 'lost' }, { t: 'R. Chand operator', v: 'ravi' }], answer: 'master' },
            { label: 'floor', options: [{ t: 'Floor 14', v: '14' }, { t: 'Control room', v: 'control' }, { t: 'Car park', v: 'car' }], answer: '14' }
          ] },
          { label: '02:14', selects: [
            { label: 'badge', options: [{ t: 'D. Kestrel master', v: 'master' }, { t: 'Lost card 4471', v: 'lost' }, { t: 'R. Chand operator', v: 'ravi' }], answer: 'lost' },
            { label: 'floor', options: [{ t: 'Archive door', v: 'archive' }, { t: 'Control room', v: 'control' }, { t: 'Car park', v: 'car' }], answer: 'archive' }
          ] },
          { label: '02:22', selects: [
            { label: 'badge', options: [{ t: 'D. Kestrel master', v: 'master' }, { t: 'Lost card 4471', v: 'lost' }, { t: 'R. Chand operator', v: 'ravi' }], answer: 'master' },
            { label: 'floor', options: [{ t: 'East stairwell', v: 'stair' }, { t: 'Control room', v: 'control' }, { t: 'Car park', v: 'car' }], answer: 'stair' }
          ] }
        ],
        hintText: 'The master card opens floor 14 before the gap and the stairwell after it. The lost card is used in between.',
        success: 'Diane\'s master card opens floor 14 at 01:58 and the east stairwell at 02:22. The lost card in between was taken from her own lost-card drawer.',
        gives: ['night_badge'], flags: ['gridDone'],
        short: 'Diane\'s master card opened the stairwell at 02:22.',
        log: 'The badge grid shows Diane\'s master card opening floor 14 before the gap and the east stairwell after it. The lost card was a decoy.'
      }
    },
    clues: {
      'night_body': { name: 'Fall with defensive injuries', caption: 'Palms and wrist - pushed, not jumped', icon: 'blood', type: 'Forensic observation',
        desc: 'Ravi has grazes on both palms and a fractured left wrist from trying to catch the rail. The head wound is consistent with a backward fall.',
        tells: 'He was pushed from behind while facing the stairs. This was not a deliberate jump.' },
      'night_drive': { name: 'Missing thumb drive', caption: 'USB socket bent - drive gone', icon: 'usb', type: 'Physical evidence',
        desc: 'The console USB cable has been pulled out and the socket bent. Ravi exported the raw buffer to a drive that is no longer in the room.',
        tells: 'Ravi copied the footage and carried it with him. Someone took it from his body.' },
      'night_raw': { name: 'Raw camera buffer', caption: 'Recovered from the local drive', icon: 'chart', type: 'Digital evidence',
        desc: 'The raw feed from the four-minute gap shows a figure on floor 14 and a facilities badge entry that the purge was meant to erase.',
        tells: 'The footage was deliberately purged. The purge itself is evidence.' },
      'night_gap': { name: 'Gap audio', caption: 'Woman says close it - then a door', icon: 'sound', type: 'Audio evidence',
        desc: 'The audio under the carrier captures a woman ordering the floor closed, followed by a heavy door.',
        tells: 'Someone was on the empty floor during the purge. The outage was not maintenance.' },
      'night_frame': { name: 'Enhanced corridor frame', caption: 'Facilities coat - scarab pin - 02:16', icon: 'photo', type: 'Photographic evidence',
        desc: 'The raw frame shows a woman in a facilities coat with a gold scarab pin, looking back at the camera during the gap.',
        tells: 'Diane Kestrel was on floor 14 at the time she claims the floor was empty.' },
      'night_badge': { name: 'Badge timeline', caption: 'Master card 01:58 and 02:22 - lost card 02:14', icon: 'id', type: 'Technical record',
        desc: 'Diane\'s master card opens floor 14 at 01:58 and the east stairwell at 02:22. The lost card 4471 is used at the archive door between them.',
        tells: 'Diane used her own master card around the gap. The lost card was taken from her drawer as a decoy.' },
      'night_clock': { name: 'Camera clock adjustment', caption: 'Seven minutes backward at 02:09', icon: 'clock', type: 'Technical record',
        desc: 'The camera clock was moved backward seven minutes from the facilities console before the purge, shifting the real timeline outside the recorded window.',
        tells: 'The gap was staged. Someone with facilities access wanted the times to lie.' },
      'night_contract': { name: 'Floor 14 contract', caption: 'Meridian Holdings - rent paid to Diane', icon: 'ledger', type: 'Document',
        desc: 'Floor 14 is leased to Meridian Holdings for secure colocation, with rent paid to a private account and a badge reader installed off-system.',
        tells: 'Diane was running a private business inside the empty floors, not maintenance.' },
      'night_stair': { name: 'Stairwell door log', caption: 'Facilities key 02:18 - propped at 02:19', icon: 'key', type: 'Technical record',
        desc: 'The east stairwell was unlocked with a facilities key at 02:18 and propped open one minute later.',
        tells: 'The killer had facilities access and needed the stairwell open before moving Ravi.' },
      'night_witness': { name: "Mrs Adeyemi's statement", caption: 'Woman in facilities coat - laptop bag - 02:30', icon: 'eye', type: 'Witness statement',
        desc: 'The cleaner saw a woman in a facilities coat leave the lift at 02:30 carrying a laptop bag, and found the stairwell door wedged open.',
        tells: 'The woman left the floor after the purge with equipment, not a cleaning trolley.' },
      'night_red': { name: "Ollie's lost card", caption: 'Reported lost a week ago - in the decoy drawer', icon: 'id', type: 'Red herring',
        desc: 'Ollie Fenn reported his card lost a week before the death. It was kept in the facilities lost-card drawer, which Diane controls.',
        tells: 'The card was available to Diane. Its use points at the person who held the drawer, not at Ollie.' },
      'night_audio2': { name: 'Your undercover recording', caption: 'The supervisor names the badge drawer', icon: 'sound', type: 'Undercover evidence',
        desc: 'The night-shift recording captures the supervisor saying the lost-card drawer is kept by facilities and only Diane signs it out.',
        tells: 'Diane had access to the decoy card. The operation delivered the missing link.' }
    },
    suspects: [
      {
        id: 'diane', name: 'Diane Kestrel', role: 'Facilities director - controls cameras and badges', location: 'office', locationName: 'Twelfth-floor office',
        tag: 'Primary suspect', portrait: { seed: 'diane-kestrel', hair: 'bob', hairColor: '#2a1a12', skin: 1, expression: 'cold', collar: 'blazer' },
        intro: 'Diane is polished and impatient. She calls the death a terrible accident and the outage a routine purge. She wears a gold scarab pin on her lapel and does not take it off while you talk.',
        questions: [
          { q: 'Where were you at two in the morning?', a: 'At home. I left at six. The building runs itself at night; that is what the monitoring contract is for.', gives: ['night_frame'],
            follow: 'Her master card opens floor 14 at 01:58. The corridor frame shows her on the floor at 02:16.' },
          { q: 'Why was your master card used after midnight?', a: 'I lost it last week. I reported it. Anyone could have picked it up. That is why we have a lost-card procedure.', requires: ['night_badge'], gives: ['night_badge'],
            follow: 'The lost-card drawer is in her office and only she signs it out. Her own master card is used before and after the gap.' },
          { q: 'What is on floor 14?', a: 'Empty space. A tenant took a short lease and never moved in. There is nothing up there but dust and old racks.', requires: ['night_contract'], gives: ['night_contract'],
            follow: 'The contract grants Meridian Holdings after-hours access and a private fibre line, paid to her account.' },
          { q: 'Why was the camera clock moved back seven minutes?', a: 'The cameras drift. Maintenance corrects them. I did not touch the clock personally.', requires: ['night_clock'], gives: ['night_clock'],
            follow: 'The adjustment came from the facilities console at 02:09, seven minutes before four cameras failed. That is not drift.' },
          { q: 'Why did Ravi leave the control room?', a: 'I have no idea. He was a night operator. Perhaps he heard a noise. Perhaps he was tired.', requires: ['night_raw'], gives: ['night_raw'],
            follow: 'The raw feed shows him copying the purge footage, then a figure in a facilities coat following him to the stairwell.' }
        ],
        after: 'She asks whether the monitoring contract will be suspended. She does not ask how Ravi fell.'
      },
      {
        id: 'ollie', name: 'Ollie Fenn', role: 'Night supervisor - lost his badge', location: 'stair', locationName: 'East stairwell',
        tag: 'Red herring', portrait: { seed: 'ollie-fenn', hair: 'curly', hairColor: '#5a4a3a', skin: 3, expression: 'anxious', collar: 'jacket' },
        intro: 'Ollie is pale and over-caffeinated. His badge was used at the archive door, and he knows how that sounds. He has brought the loss report with him, folded into quarters.',
        questions: [
          { q: 'Why was your badge used at 02:14?', a: 'I lost it a week ago. I reported it the same day. It has been in the facilities drawer since. I have never even been on floor fourteen.', gives: ['night_red'],
            follow: 'The loss report is stamped a week before the death. The drawer is signed out only by Diane.' },
          { q: 'Where were you when Ravi fell?', a: 'On my rounds, floors one to six. The lift log has me at the lobby at 02:05 and the car park at 02:40. I did not go above twelve.', requires: ['night_red'], gives: ['night_red'],
            follow: 'The lift and door logs keep him below the twelfth floor all night.' },
          { q: 'Who has access to the lost-card drawer?', a: 'Facilities. Diane signs it out. I am security, not facilities. She keeps the key with the master cards.', requires: ['night_badge'],
            follow: 'That is the link. Diane could take the lost card and use it as a decoy.' }
        ]
      },
      {
        id: 'mina', name: 'Mina Osei', role: 'Data centre technician - installed the floor 14 racks', location: 'floor14', locationName: 'Floor 14',
        tag: 'Witness', portrait: { seed: 'mina-osei', hair: 'long', hairColor: '#1a1210', skin: 4, expression: 'wary', collar: 'hoodie' },
        intro: 'Mina is still wearing the access lanyard from the installation. She was paid cash to rack twelve servers and ask no questions. She has been waiting for someone to ask the right one.',
        questions: [
          { q: 'Who hired you to install the racks?', a: 'Diane. Cash. She said it was a private colocation client and the paperwork was already handled. The client never came to the building.', gives: ['night_contract'],
            follow: 'The contract names Meridian Holdings. The rent goes to an account in Diane\'s name.' },
          { q: 'What runs on those servers?', a: 'Copy jobs. Huge ones. A fibre line comes in from outside and the data goes out again. I was told not to look at the traffic.', requires: ['night_contract'], gives: ['night_contract'],
            follow: 'Floor 14 is not empty. It is a data laundering room.' },
          { q: 'Did you see Diane on the night of the death?', a: 'I saw her coat. She came up at about two, which she never does. She was carrying a laptop bag and she looked... wrong. Angry. I stayed in the lift.', requires: ['night_frame'], gives: ['night_frame'],
            follow: 'That matches the corridor frame and the cleaner\'s statement.' }
        ]
      }
    ],
    timeline: [
      { time: '01:58', text: 'Diane\'s master card opens floor 14.' },
      { time: '02:09', text: 'Camera clock moved back seven minutes from the facilities console.' },
      { time: '02:14', text: 'Four cameras lose signal. Lost card 4471 opens the archive door.' },
      { time: '02:16', text: 'Raw frame captures Diane on floor 14.' },
      { time: '02:18', text: 'Signal restored. East stairwell unlocked with a facilities key.' },
      { time: '02:20', text: 'Ravi leaves the control room with the raw buffer on a drive.' },
      { time: '02:22', text: 'Diane\'s master card opens the east stairwell.' },
      { time: '02:30', text: 'Cleaner sees a woman in a facilities coat leave with a laptop bag.' },
      { time: '05:40', text: 'Ravi found at the bottom of the east stairwell.' }
    ],
    links: [
      { a: 'night_badge', b: 'diane', note: 'Diane\'s master card opens floor 14 and the stairwell around the gap.' },
      { a: 'night_frame', b: 'diane', note: 'The corridor frame shows her on floor 14 during the purge.' },
      { a: 'night_contract', b: 'diane', note: 'The floor 14 contract pays rent to her private account.' },
      { a: 'night_clock', b: 'diane', note: 'The clock adjustment came from the facilities console she controls.' },
      { a: 'night_audio2', b: 'diane', note: 'The undercover recording names her lost-card drawer.' }
    ],
    forensics: {
      prompt: 'Two samples from the stairwell. Match each to its source.',
      samples: [
        { id: 'fibre', type: 'FIBRE', label: 'Landing rail - coat fibre', mark: 'navy wool, facilities issue' },
        { id: 'pin', type: 'TRACE', label: 'Scuff mark - gold transfer', mark: 'soft gold alloy' }
      ],
      candidates: [
        { id: 'diane', label: 'Diane Kestrel\'s facilities coat and scarab pin' },
        { id: 'ollie', label: 'Ollie Fenn\'s security jacket' },
        { id: 'cleaner', label: 'The cleaner\'s uniform' }
      ],
      answer: { fibre: 'diane', pin: 'diane' },
      success: 'The rail fibre matches Diane\'s facilities coat, and the gold transfer matches her scarab pin. She leaned on the rail above the stairwell.',
      gives: ['night_frame']
    },
    documents: [
      { id: 'lease', title: 'Floor 14 lease', sub: 'Meridian Holdings - private colocation', body: '<div class="doc-sheet"><b>KELLARD HOUSE - FLOOR 14</b><br>Tenant: <b>MERIDIAN HOLDINGS</b><br>Use: secure colocation<br>Access: <b>after hours, unrestricted</b><br>Private fibre: <b>installed by tenant</b><br>Rent account: <b>D. KESTREL</b><br><br><span class="d">Badge reader installed off building system.</span></div>',
        question: 'What does the lease reveal?', options: [
          { t: 'Diane leased the empty floor to a private client and took the rent', v: 'a' },
          { t: 'The floor was leased to the building\'s security contractor', v: 'b' },
          { t: 'The lease expired before the death', v: 'c' }
        ],
        answer: 0, gives: ['night_contract'],
        log: 'Diane leased floor 14 to Meridian Holdings, took the rent personally, and installed an off-system badge reader.',
        wrong: 'Read who receives the rent and who signed for the landlord.' },
      { id: 'incident', title: 'Incident report - 05:55', sub: 'Filed by D. Kestrel', body: '<div class="doc-sheet"><b>KELLARD HOUSE - INCIDENT REPORT</b><br>Time: 05:55<br>Reported by: <b>D. KESTREL</b><br>Incident: contractor fall, east stairwell<br>Cause: <b>unauthorised access to empty floor</b><br><br><span class="d">CCTV reviewed: routine maintenance purge. No anomaly.</span><br><span class="d">Stairwell door: found propped, secured at 06:10.</span></div>',
        question: 'Why is the incident report suspicious?', options: [
          { t: 'It was filed before the police arrived and declares the CCTV clean', v: 'a' },
          { t: 'It names Ravi as the person who authorised the purge', v: 'b' },
          { t: 'It says the stairwell was locked all night', v: 'c' }
        ],
        answer: 0, gives: ['night_raw'],
        log: 'Diane filed the incident report herself at 05:55, blamed Ravi for unauthorised access and declared the CCTV clean.',
        wrong: 'Look at who wrote it and what they decided before anyone investigated.' }
    ],
    audioCalls: [
      { id: 'c29-999', title: 'Emergency call - morning cleaner', sub: 'Mrs Adeyemi reports the body', cue: 'Under the cleaner\'s voice: the purge alarm still ringing in the control room, then a woman\'s voice in the corridor saying, it is done, close it.', pattern: [380, 0, 380, 260, 0, 420], tone: 'triangle',
        options: [
          { t: 'The purge alarm was still sounding and a woman was in the corridor', v: 'a' },
          { t: 'The building was silent and empty', v: 'b' },
          { t: 'Ravi was calling for help', v: 'c' }
        ],
        answer: 0, gives: ['night_gap'], flag: 'callHeard',
        log: 'The cleaner\'s call captures the purge alarm and a woman saying it is done, close it - the same voice as the gap audio.',
        wrong: 'Listen under the cleaner. The alarm and the woman are both there.' }
    ],
    mapTask: {
      q: 'Which route fits the badge, the camera and the stairwell?', options: [
        { t: 'Control room -> floor 14 at 02:16 -> east stairwell at 02:22 -> car park', v: 'a' },
        { t: 'Control room -> lobby -> home at 02:00', v: 'b' },
        { t: 'Floor 14 -> roof -> fire escape', v: 'c' }
      ],
      answer: 0, gives: ['night_badge'],
      log: 'The route runs from the control room to floor 14 during the gap, then to the east stairwell, then out through the car park.',
      wrong: 'The master card opens floor 14 before the gap and the stairwell after it.' },
    redHerrings: [
      { clue: 'night_red', label: "Ollie's lost badge", clearedBy: ['night_red', 'night_badge'], note: 'Ollie reported the card lost a week earlier. Diane controls the lost-card drawer and used it as a decoy.' }
    ],
    contradictions: [
      { suspect: 'diane', statement: 0, evidence: ['night_badge', 'night_frame'],
        expose: 'Her master card opens floor 14 at 01:58, and the corridor frame shows her there at 02:16. She was not at home.',
        wrong: 'The badge log and the enhanced frame both put her on floor 14.' },
      { suspect: 'diane', statement: 1, evidence: ['night_audio2'],
        expose: 'The lost-card drawer is kept in her office and only she signs it out. The decoy card was available to her, not to Ollie.',
        wrong: 'The undercover recording names her as the only person who can take the card.' },
      { suspect: 'diane', statement: 2, evidence: ['night_contract'],
        expose: 'The lease grants Meridian Holdings after-hours access and pays rent to her private account. Floor 14 is not empty; it is her business.',
        wrong: 'The contract and the rent account both point to her.' },
      { suspect: 'diane', statement: 3, evidence: ['night_clock', 'night_raw'],
        expose: 'The clock was moved seven minutes before four cameras failed and the buffer purged. That is not drift; it is staging.',
        wrong: 'The adjustment came from her facilities console, minutes before the purge.' }
    ],
    solution: {
      minEvidence: 8,
      questions: [
        { kind: 'suspect', q: 'Who killed Ravi Chand?', options: [
          { t: 'Diane Kestrel - facilities director', v: 'diane' },
          { t: 'Ollie Fenn - night supervisor', v: 'ollie' },
          { t: 'Mina Osei - data centre technician', v: 'mina' },
          { t: 'An unknown intruder using a lost card', v: 'intruder' }
        ], answer: 'diane' },
        { kind: 'method', q: 'How did Ravi die?', options: [
          { t: 'He was pushed down the east stairwell after copying the purge footage', v: 'push' },
          { t: 'He fell on his rounds in the dark', v: 'fall' },
          { t: 'He was struck in the control room and moved later', v: 'struck' },
          { t: 'He was electrocuted by the server racks', v: 'shock' }
        ], answer: 'push' },
        { kind: 'motive', q: 'Why was Ravi killed?', options: [
          { t: 'He copied proof that Diane was running a secret operation on floor 14', v: 'operation' },
          { t: 'He was stealing from the building\'s tenants', v: 'theft' },
          { t: 'He refused to work the night shift', v: 'shift' },
          { t: 'He was having an affair with Diane', v: 'affair' }
        ], answer: 'operation' },
        { kind: 'evidence', q: 'Which evidence proves the outage was staged?', options: [
          { t: 'The clock adjustment and the purge authorised by Diane', v: 'clock' },
          { t: 'The cleaner\'s emergency call', v: 'call' },
          { t: 'Mina\'s installation lanyard', v: 'lanyard' },
          { t: 'The lift lobby camera', v: 'lift' }
        ], answer: 'clock' }
      ],
      verdict: {
        who: "Diane Kestrel",
        whoDesc: ", the facilities director, was charged with the murder of Ravi Chand.",
        how: "She pushed him down the east stairwell after he copied the purge footage, then authorised a maintenance purge and moved the camera clock back four minutes to cover the gap.",
        why: "Ravi had proof that floor 14 was leased to Meridian Holdings under a private badge system, with the rent paid into Diane's own account. He was going to report it.",
        key: "The clock adjustment, the purge she authorised, and the badge log that put her on floor 14 at 01:58."
      },
      reveal: [
        "Four cameras died at 02:14 and came back at 02:18. The gap was not a failure. It was a window, cut to the length of a walk to the east stairwell.",
        "Ravi's console password was NIGHTSHIFT. He copied the raw feed because he expected the system to eat it. He was right about the system, and wrong about who would come for him.",
        "Ollie's lost badge was a decoy from Diane's own drawer. Ollie was not on floor 14. He was not even in the building when the cameras went dark."
      ],
      quote: "The clock is part of the evidence. Someone had forgotten that.",
      twist: "Floor 14 was never empty. Meridian Holdings paid rent on it for eleven months, and the payments went to Diane Kestrel, not the landlord."
    }
  });
})();
