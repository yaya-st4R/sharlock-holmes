/* ============================================================
   CASE 21 - SILENT FREQUENCY
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c21', num: 21,
    title: 'Silent Frequency',
    subtitle: 'A pirate radio DJ died on air. The broadcast kept playing after she did.',
    difficulty: 3, est: '30-40 min',
    cover: { kind: 'interior', mood: 'neon' },
    facts: [
      { k: 'Victim', v: 'Nadia Rooke, 31 - overnight DJ, callsign NYX' },
      { k: 'Scene', v: 'Studio B, Radio Sable, above the Blue Wash laundrette' },
      { k: 'Found', v: 'Wednesday, 06:40 - by the morning producer' },
      { k: 'Cause', v: 'Apparent electrocution at the mixing desk' }
    ],
    briefing: [
      "Radio Sable broadcasts from a room above a laundrette and has no licence, no accounts and no obvious owner. At 02:14 its overnight host, Nadia Rooke, stopped speaking mid-sentence. The carrier stayed up. The music kept playing for another eleven minutes.",
      "The morning producer found her slumped across the desk with one hand on a headphone jack. The desk was live. The coroner says her heart stopped before the burn marks were made, which is not how electricity usually works.",
      "The station log says the booth microphone was muted for the whole eleven minutes. Somebody wanted the audience to hear a show. Nobody was meant to hear the truth."
    ],
    opening: 'The studio still smells of hot dust and coffee. A red ON AIR lamp burns over an empty chair, and the headphones lie on the desk like something sleeping.',
    objectives: [
      'Establish how Nadia died and why the desk was live.',
      'Recover the missing eleven minutes of broadcast.',
      'Decode the numbers hidden in the station accounts.',
      'Identify who had a reason to keep the frequency quiet.'
    ],
    locations: [
      {
        id: 'studio', name: 'Studio B', short: 'Studio', time: '07:05',
        art: { kind: 'interior', mood: 'neon' },
        intro: 'A soundproofed box the size of a wardrobe, lined with egg cartons and old carpet. The mixing desk is scorched around the headphone socket. A wall clock has stopped at 02:14.',
        actions: [
          { id: 'booth', label: 'Examine the desk and the body', icon: 'blood', hotspot: { x: 52, y: 55 },
            desc: 'The burn, the jack, the missing headphones',
            text: [
              "Nadia is face down across the desk. There is a scorch mark on the metal jack plate, but her fingertips are clean. The burn on her wrist is narrow and deliberate, as if the cable was pressed against her skin after she stopped breathing.",
              "The headphones are not on her head. They are coiled in the corner, unplugged. The desk fader is pushed all the way up, and the microphone channel is muted.",
              "A studio engineer would spot it at once: this was not a live accident. Somebody made the desk look live."
            ],
            gives: ['c21_booth', 'c21_headphones'],
            hint: 'Look at where the burn is, then look at what her hands were doing.'
          },
          { id: 'desk', label: 'Open the production computer', icon: 'terminal', puzzle: 'studio-pin',
            desc: 'A four-digit lock on the playout system',
            gives: ['c21_tape'],
            hint: 'The station frequency is printed on the wall: 102.4. The log is set to 02:14.'
          },
          { id: 'broadcast', label: 'Play the recovered broadcast', icon: 'ear', puzzle: 'dead-air',
            desc: 'Eleven minutes of Nadia — live or recorded?',
            hint: 'Listen to the rhythm and the jingle. A live studio cannot repeat itself that exactly.'
          },
          { id: 'callum', label: 'Question Callum Reeve', icon: 'user', suspect: 'callum',
            desc: 'Station owner - says he went home at midnight' }
        ]
      },
      {
        id: 'transmitter', name: 'Transmitter Room', short: 'Transmitter', time: '07:40',
        art: { kind: 'server', mood: 'neon' },
        requires: ['c21_booth'],
        intro: 'A cupboard of blinking racks and one chair. The carrier meter is still warm. A maintenance hatch hangs open, its fuse tray resting on top of the rack.',
        actions: [
          { id: 'log', label: 'Read the transmitter log', icon: 'chart',
            desc: 'Carrier history, 01:50 to 02:40',
            text: [
              "The carrier never dropped. From 02:14 to 02:25 the transmitter was broadcasting a pre-recorded programme file tagged NIGHT_ARCHIVE_07.",
              "At 02:26 a live microphone opened for four seconds. The log records a male voice saying: 'Close it. Close it now.' Then the file resumes.",
              "The desk in Studio B was muted at 02:13. Whatever the audience heard, it did not come from the booth."
            ],
            gives: ['c21_log'],
            hint: 'The carrier stayed up. That means the show was coming from somewhere else.'
          },
          { id: 'panel', label: 'Repair the fuse tray', icon: 'wire', puzzle: 'tx-repair',
            desc: 'Three leads pulled from the emergency cut-off',
            gives: ['c21_fuse'],
            hint: 'Match colour to label. The cut-off did not fail; it was pulled.'
          },
          { id: 'priya', label: 'Question Priya Sen', icon: 'user', suspect: 'priya',
            desc: 'Producer - programmed the overnight files' }
        ]
      },
      {
        id: 'laundrette', name: 'Blue Wash Laundrette', short: 'Laundrette', time: '08:20',
        art: { kind: 'shop', mood: 'neon' },
        requires: ['c21_booth'],
        intro: 'Steam, detergent and a radio on the shelf playing the same station. The owner, Mags, is folding towels with the fierce concentration of someone avoiding a question.',
        actions: [
          { id: 'mags', label: 'Talk to Mags, the owner', icon: 'user',
            desc: 'She heard the show - and the stairs',
            text: [
              "Mags did not hear a scream. She heard the studio door on the back stairs at twenty past two, then a car starting in the alley. She looked out. Callum Reeve was getting into a grey estate with a laptop bag on the passenger seat.",
              "She remembers the time because the laundrette dryer buzzer goes off at 02:20 every night.",
              "She also remembers the show did not stop. 'Nadia kept talking,' she says. 'Only it was the same thing she said the night before. Word for word.'"
            ],
            gives: ['c21_witness'],
            hint: 'She heard the door, the car, and the show that should have been live.'
          },
          { id: 'answerphone', label: 'Play the station answerphone', icon: 'phone',
            desc: 'Three messages, one caller who does not leave a name',
            text: [
              "Message one, 01:12: a man's voice, distorted. 'Nyx. You have the list. Do not read it out.'",
              "Message two, 02:02: the same voice. 'Last warning. The shipment is Sable. Say the name on air and you are done.'",
              "Message three, 02:16: silence, then a radio playing in another room. The same jingle, twice, overlapping."
            ],
            gives: ['c21_call'],
            hint: 'The caller names the shipment ten minutes before she died.'
          },
          { id: 'shred', label: 'Search the recycling bin', icon: 'search', puzzle: 'coded-ad',
            desc: 'A torn ad invoice with numbers in the margin',
            gives: ['c21_coded'],
            hint: 'The numbers are a Caesar shift. Five letters, then a time.'
          }
        ]
      },
      {
        id: 'flat', name: "Callum's Flat", short: 'Flat', time: '09:10',
        art: { kind: 'interior', mood: 'cold' },
        requires: ['c21_log'],
        intro: 'A clean flat with expensive speakers and no books. A grey estate is parked outside with a laptop bag on the passenger seat, exactly where Mags said it would be.',
        actions: [
          { id: 'coat', label: 'Search the coat rack', icon: 'coat',
            desc: 'A studio key, a soldering iron, a receipt',
            text: [
              "A spare Studio B key hangs in the coat pocket, still warm from a soldering iron that has been used recently. The iron is in the kitchen, its tip freshly tinned.",
              "The receipt is from an electronics shop, timed 18:40 the previous evening: one 6.35mm jack plug, one reel of insulated cable, one tube of heat-shrink.",
              "The station does not repair its own gear. Callum told the staff that outside engineers did all of it."
            ],
            gives: ['c21_key'],
            hint: 'A studio key and a hot soldering iron in the same coat.'
          },
          { id: 'ledger', label: 'Read the advertising ledger', icon: 'ledger',
            desc: 'Payments that do not match the adverts',
            text: [
              "The ledger lists ordinary adverts - a minicab firm, a tanning salon, a kebab shop - but the payments beside them are far too large and arrive in cash on the first of every month.",
              "In the margin, someone has written five-letter groups: SABLE, TIDE, Crate, NORTH, 02:14.",
              "The final page is an insurance policy on the studio, taken out eleven days ago, naming Callum Reeve as sole beneficiary."
            ],
            gives: ['c21_ledger'],
            hint: 'The adverts are a cover. The margins carry the real business.'
          },
          { id: 'mox', label: 'Question Mox, the rival DJ', icon: 'user', suspect: 'mox',
            desc: 'He threatened Nadia on air two nights ago' }
        ]
      }
    ],
    puzzles: {
      'studio-pin': {
        type: 'keypad', title: 'Playout System', subtitle: 'Four-digit studio PIN', icon: 'keypad',
        deviceLabel: 'RADIO SABLE - PLAYOUT', length: 4, code: '0214',
        prompt: 'The playout system is locked. The wall clock stopped at 02:14, and the transmitter log calls the file NIGHT_ARCHIVE_07. The PIN is the minute the show became a recording.',
        hintText: 'Look at the stopped clock. Four digits: the time the broadcast changed hands.',
        success: 'The playout opens on the archive folder. NIGHT_ARCHIVE_07 is the same eleven minutes Nadia supposedly presented live.',
        gives: ['c21_tape'], flags: ['pinOpen'],
        short: 'The pre-recorded segment is on the screen.',
        log: 'NIGHT_ARCHIVE_07 is a rehearsal tape of Nadia reading the same links she supposedly spoke live. The file was created eight days ago.'
      },
      'tx-repair': {
        type: 'repair', title: 'Emergency Cut-Off', subtitle: 'Restore the transmitter', icon: 'wire',
        prompt: 'The emergency cut-off has been pulled apart. Reconnect the three leads by matching each output to its label.',
        pairs: [
          { l: 'MAINS', r: 'POWER', color: '#f43f5e' },
          { l: 'CARRIER', r: 'SIGNAL', color: '#67e8f9' },
          { l: 'CHASSIS', r: 'GROUND', color: '#fbbf24' }
        ],
        hintText: 'Red carries power, cyan carries signal, yellow is ground. The labels are on the tray.',
        success: 'The cut-off resets with a hard clack. The fuse was not blown - it was removed by hand and laid neatly on the rack.',
        gives: ['c21_fuse'], flags: ['txFixed'],
        short: 'The transmitter was manually cut out.',
        log: 'The emergency cut-off was removed deliberately. The fuse is intact. Someone wanted the booth dead while the carrier stayed up.'
      },
      'coded-ad': {
        type: 'cipher', title: 'Margin Numbers', subtitle: 'Five-letter group and a time', icon: 'cipher',
        prompt: 'The torn invoice has a Caesar cipher in the margin. Turn the wheel until the shipment name and hour resolve.',
        plain: 'SABLE SHIPS AT TWO', shift: 4,
        answers: ['sable ships at two', 'sable ships at 2', 'sable ships at two am', 'sable ships at 2am', 'the sable ships at two', 'ships at two'],
        hintText: 'The station name is Sable. Try shifting until those five letters appear.',
        success: 'The margin resolves: SABLE SHIPS AT TWO. The shipment moves at two in the morning - the exact hour Nadia stopped speaking.',
        gives: ['c21_coded'], flags: ['adDecoded'],
        short: 'The coded advert names the SABLE shipment.',
        log: 'The station was reading coded shipment times on air inside ordinary adverts. The next SABLE run was set for 02:00.'
      },
      'dead-air': {
        type: 'audio', title: 'The Missing Eleven Minutes', subtitle: 'Live or recorded?', icon: 'ear',
        prompt: 'Listen to the recovered broadcast. The words match Nadia, but something in the rhythm does not.',
        pattern: [440, 440, 0, 330, 550, 0, 330, 330],
        waveform: 'Every sentence is followed by the same half-second of room tone. The jingle repeats with identical timing twice in a row, which a live desk never does.',
        options: [
          { t: 'Nadia was alive and presenting the whole segment', v: 'live' },
          { t: 'The segment is a pre-recorded rehearsal, played after she died', v: 'recorded' },
          { t: 'A second presenter was imitating her voice', v: 'double' },
          { t: 'The tape has been deliberately slowed down', v: 'slow' }
        ],
        answer: 'recorded',
        wrong: 'Listen to the jingle. It repeats with machine-perfect timing. A live studio cannot do that twice.',
        hintText: 'Room tone and repeated jingles are the tell. Nobody breathes between those sentences.',
        success: 'The eleven minutes are a rehearsal tape. Nadia died before 02:14. The broadcast was a mask laid over the murder.',
        gives: ['c21_tape'], flags: ['deadAir'],
        short: 'The broadcast was pre-recorded.',
        log: 'The final eleven minutes were a pre-recorded rehearsal. The killer used the archive to make the death look like a live accident.'
      }
    },
    clues: {
      'c21_booth': { name: 'Staged electrocution', caption: 'Burn after death - desk made live', icon: 'blood', type: 'Forensic observation',
        desc: 'The wrist burn was applied after circulation stopped. The desk was live, but the body was not touching it when the current flowed.',
        tells: 'The electrocution was staged. Nadia was killed some other way, then arranged at a live desk.' },
      'c21_headphones': { name: 'Unplugged headphones', caption: 'Coiled in the corner - not worn', icon: 'sound', type: 'Physical evidence',
        desc: 'The studio headphones were unplugged and coiled neatly in the corner, several feet from the body.',
        tells: 'Nobody monitoring a live broadcast takes their headphones off and coils them. The booth was arranged after the fact.' },
      'c21_tape': { name: 'NIGHT_ARCHIVE_07', caption: 'Rehearsal tape - created eight days ago', icon: 'usb', type: 'Digital evidence',
        desc: 'A pre-recorded rehearsal of Nadia reading the same links. It was played from 02:14 while the booth microphone stayed muted.',
        tells: 'The killer had a recording ready. The murder was planned around the broadcast schedule.' },
      'c21_log': { name: 'Transmitter log', caption: 'Carrier up - booth muted - male voice at 02:26', icon: 'chart', type: 'Technical record',
        desc: 'The carrier never dropped. The booth mic was muted at 02:13. A male voice opened a live mic at 02:26 and said: Close it now.',
        tells: 'A man was in the transmitter room after Nadia died. He knew how to keep the signal alive.' },
      'c21_fuse': { name: 'Removed fuse', caption: 'Intact - pulled by hand', icon: 'wire', type: 'Physical evidence',
        desc: 'The emergency cut-off fuse is unblown. It was removed and laid on the rack, then the tray left open.',
        tells: 'Someone deliberately isolated the booth while keeping the transmitter on air.' },
      'c21_witness': { name: "Mags's statement", caption: 'Callum left at 02:20 - show already recorded', icon: 'eye', type: 'Witness statement',
        desc: 'The laundrette owner saw Callum leave by the back stairs at 02:20 and drive off with a laptop bag. The radio was still playing the same links from the previous night.',
        tells: 'Callum was in the building after the time he claims to have gone home. He carried the means to run the archive.' },
      'c21_key': { name: 'Freshly cut studio key', caption: 'Solder and heat-shrink in the coat', icon: 'key', type: 'Physical evidence',
        desc: 'A spare Studio B key in Callum\'s coat, beside a receipt for a jack plug, cable and heat-shrink bought the evening before.',
        tells: 'Callum built the live-looking rig himself. The materials match the modified headphone socket.' },
      'c21_ledger': { name: 'Advertising ledger', caption: 'Cash payments - coded margins - new insurance', icon: 'ledger', type: 'Financial record',
        desc: 'The adverts are a front. Cash arrives monthly, coded groups sit in the margins, and a new insurance policy names Callum as sole beneficiary.',
        tells: 'Callum had both a hidden income and a financial reason for Nadia to disappear.' },
      'c21_coded': { name: 'Decoded ad margin', caption: 'SABLE SHIPS AT TWO', icon: 'cipher', type: 'Decoded message',
        desc: 'A Caesar cipher in the invoice margin reads: SABLE SHIPS AT TWO. The station was broadcasting shipment times inside adverts.',
        tells: 'Nadia had proof the station was a smuggling signal. That is a motive for silence.' },
      'c21_call': { name: 'Answerphone threats', caption: 'Sable warning - two hours before death', icon: 'phone', type: 'Audio evidence',
        desc: 'Two distorted male warnings naming the Sable shipment, then a third message at 02:16 with the station jingle playing twice in the background.',
        tells: 'The caller knew the shipment name and was near a radio when the pre-recorded show went out.' },
      'c21_threat': { name: "Mox's on-air threat", caption: 'Threatened her slot - not her life', icon: 'sound', type: 'Red herring',
        desc: 'Mox called Nadia a thief and said he would bury her show. His threat was about the 02:00 timeslot, not the woman.',
        tells: 'Mox was broadcasting live at his own station when Nadia died. Loud, not lethal.' }
    },
    suspects: [
      {
        id: 'callum', name: 'Callum Reeve', role: 'Station owner - sole beneficiary', location: 'flat', locationName: "Callum's flat",
        tag: 'Primary suspect', portrait: { seed: 'callum-reeve', hair: 'short', hairColor: '#2b1a12', skin: 2, expression: 'guarded', collar: 'coat' },
        intro: 'Callum speaks in the low, reasonable voice of a man who has never had to raise it. He owns the station, the transmitter and the lease on the flat above the laundrette. He says he left before midnight.',
        questions: [
          { q: 'Where were you when Nadia died?', a: 'Home. I left at midnight and I was asleep by half past. The station runs itself overnight; that is the point of an archive.' },
          { q: 'When did you last see Nadia alive?', a: 'She was in the booth when I left. Half eleven, maybe twelve. I locked the street door and went home. I never went back.', requires: ['c21_booth'],
            follow: 'He says it without blinking. Mags says the grey estate was still in the alley at twenty past two.' },
          { q: 'Why is there fresh solder on your repair kit?', a: 'I fix things. It is my station. A jack plug wears out. That is not a crime.', requires: ['c21_key'], gives: ['c21_key'],
            follow: 'The soldering iron is still warm. The receipt is for exactly the parts used on the desk.' },
          { q: 'What does SABLE mean?', a: 'A sponsor. A shipping firm, maybe. I do not read every advert.', requires: ['c21_coded'], gives: ['c21_coded'],
            follow: 'His jaw tightens around the word. He knows exactly what Sable is.' },
          { q: 'Who else had a key to Studio B?', a: 'Priya. Mox had one once, but I changed the lock. Nadia had the third.', requires: ['c21_key'],
            follow: 'Three keys. One is in his coat. One is on Priya\'s lanyard. Mox\'s was returned.' }
        ],
        after: 'He asks whether the station will stay on air. Not whether Nadia will.'
      },
      {
        id: 'priya', name: 'Priya Sen', role: 'Producer - programmes the overnight files', location: 'transmitter', locationName: 'Transmitter room',
        tag: 'Witness', portrait: { seed: 'priya-sen', hair: 'long', hairColor: '#120c0a', skin: 3, expression: 'tired', collar: 'blouse' },
        intro: 'Priya has been awake for thirty hours and is furious about it. She built the playout system and knows every file on it. She also knows she is the obvious person to have scheduled the archive.',
        questions: [
          { q: 'Who scheduled NIGHT_ARCHIVE_07?', a: 'I did not. I built the folder, but that file was added eight days ago from an external drive. The login was Callum\'s.', gives: ['c21_tape'],
            follow: 'She pulls up the audit trail. The file was copied in at 23:40, while she was on air.' },
          { q: 'Why was the booth microphone muted?', a: 'It was not muted when I left. The desk defaults to live. Someone pressed the mute and left it there.', requires: ['c21_log'], gives: ['c21_log'] },
          { q: 'Did Nadia seem afraid?', a: 'She was excited. She said she had the shipment list and was going to read it out at two. I told her to be careful. She laughed.', requires: ['c21_coded'],
            follow: 'That was the last thing Priya said to her.' }
        ]
      },
      {
        id: 'mox', name: 'Mox Delaney', role: 'Rival DJ - threatened her on air', location: 'flat', locationName: 'By the bins',
        tag: 'Red herring', portrait: { seed: 'mox-delaney', hair: 'buzz', hairColor: '#6b4a2f', skin: 4, expression: 'angry', collar: 'jacket' },
        intro: 'Mox is all volume and no weight, a man who has been performing anger for so long it has become a personality. He called Nadia a thief on air and said he would bury her show.',
        questions: [
          { q: 'Did you threaten Nadia?', a: 'I said I would bury her show. I meant the timeslot, not the woman. There is a difference and every DJ in this city knows it.', gives: ['c21_threat'],
            follow: 'He was live on his own station from one until four. Twelve witnesses and a recording.' },
          { q: 'Where were you at two in the morning?', a: 'On air. Ring the station. Ask the callers. I do not leave a live desk, not even to spit.', requires: ['c21_threat'],
            follow: 'His broadcast log confirms it. Mox is loud, but he is not the killer.' }
        ]
      }
    ],
    timeline: [
      { time: '23:40', text: 'NIGHT_ARCHIVE_07 copied onto the playout system using Callum\'s login.' },
      { time: '01:12', text: 'Answerphone warning: You have the list. Do not read it out.' },
      { time: '02:00', text: 'Nadia begins the overnight show. She tells Priya she will read the shipment list at two.' },
      { time: '02:13', text: 'Booth microphone muted from the transmitter room.' },
      { time: '02:14', text: 'Archive file starts. Nadia is already dead.' },
      { time: '02:20', text: 'Mags sees Callum leave by the back stairs with a laptop bag.' },
      { time: '02:26', text: 'A male voice opens a live mic: Close it. Close it now.' },
      { time: '06:40', text: 'Nadia found by the morning producer.' }
    ],
    links: [
      { a: 'c21_key', b: 'callum', note: 'The spare studio key and fresh soldering kit sit in Callum\'s coat.' },
      { a: 'c21_ledger', b: 'callum', note: 'Callum took the cash and signed the new insurance policy.' },
      { a: 'c21_witness', b: 'callum', note: 'Mags puts Callum at the studio at 02:20, after his alibi.' },
      { a: 'c21_coded', b: 'callum', note: 'The coded advert ran under Callum\'s licence and login.' }
    ],
    forensics: {
      prompt: 'Two samples from the headphone socket. Match each to its reference.',
      samples: [
        { id: 'solder', type: 'SOLDER', label: 'Jack plate - fresh alloy', mark: 'leads-free, rosin core' },
        { id: 'scorch', type: 'RESIDUE', label: 'Wrist burn - copper trace', mark: 'cable pressed after death' }
      ],
      candidates: [
        { id: 'kit', label: 'Callum\'s repair kit' },
        { id: 'mains', label: 'Studio mains supply' },
        { id: 'mox', label: 'Mox\'s cigarette lighter' }
      ],
      answer: { solder: 'kit', scorch: 'mains' },
      success: 'The solder matches Callum\'s kit. The burn is mains copper, applied to skin after circulation stopped.'
    },
    documents: [
      { id: 'schedule', title: 'Broadcast schedule - week 34', sub: 'Overnight changes in red ink',
        body: '<div class="doc-sheet"><b>RADIO SABLE - PROGRAMME GRID</b><br><span class="d">Week 34 - not for broadcast</span><br><br>00:00 - 02:00 &nbsp; REPEAT: THE LONG NIGHT<br>02:00 - 04:00 &nbsp; <b>NYX LIVE</b> &nbsp; <span class="g">(handwritten: ARCHIVE 07 - C)</span><br>04:00 - 06:00 &nbsp; AUTOMATION<br><br>Note in margin: <i>Nyx to read Sable list at 02:00. Kill the mic if she starts.</i></div>',
        question: 'What does the red-ink change prove?',
        options: [
          { t: 'The 02:00 live show was replaced in advance by an archive file', v: 'a' },
          { t: 'Nadia was moved to a different timeslot', v: 'b' },
          { t: 'The transmitter was scheduled for maintenance', v: 'c' }
        ],
        answer: 0, gives: ['c21_ledger'],
        log: 'The programme grid was altered in advance: Nadia\'s live slot was replaced by ARCHIVE 07 with Callum\'s initials beside it.',
        wrong: 'Read the red ink. It names the archive and the person who authorised it.' },
      { id: 'insurance', title: 'Studio insurance certificate', sub: 'Issued eleven days before the death',
        body: '<div class="doc-sheet"><b>HARBOUR & VALE ASSURANCE</b><br>Policy: RS-1142<br>Life and key-person cover: <b>Nadia Rooke</b><br>Beneficiary: <b>Callum Reeve, sole director</b><br>Sum assured: <b>Â£180,000</b><br><br><span class="d">Signed: C. Reeve. Witness: none required.</span></div>',
        question: 'Why does the policy matter?',
        options: [
          { t: 'It gives Callum a large financial motive', v: 'a' },
          { t: 'It proves Nadia wanted to leave the station', v: 'b' },
          { t: 'It shows the station was properly licensed', v: 'c' }
        ],
        answer: 0, gives: ['c21_ledger'],
        log: 'Callum insured Nadia\'s life eleven days before her death, naming himself sole beneficiary.',
        wrong: 'Ask who gets paid when Nadia dies.' }
    ],
    audioCalls: [
      { id: 'c21-999', title: 'Emergency call - Blue Wash', sub: 'Mags reports a body upstairs', cue: 'Under Mags\'s voice: the same station jingle twice, overlapping, then a click as the studio door closes.', pattern: [540, 540, 0, 380, 620], tone: 'sine',
        options: [
          { t: 'A live broadcast from the booth', v: 'a' },
          { t: 'Two recordings of the same jingle playing over each other', v: 'b' },
          { t: 'A car alarm in the alley', v: 'c' }
        ],
        answer: 1, gives: ['c21_call'], flag: 'callHeard',
        log: 'The emergency call background contains the station jingle twice, out of sync. The broadcast was recorded, not live.',
        wrong: 'Listen beneath the voice. The same jingle arrives twice, a half-second apart.' }
    ],
    mapTask: {
      q: 'Callum claims he went home at midnight. Which route fits the timestamps?',
      options: [
        { t: 'Studio -> home at 00:10, asleep until morning', v: 'home' },
        { t: 'Studio -> transmitter room at 02:13 -> alley at 02:20 -> home', v: 'studio' },
        { t: 'Home -> rival station -> studio at dawn', v: 'rival' }
      ],
      answer: 1, gives: ['c21_witness'],
      log: 'The feasible route puts Callum in the transmitter room at 02:13 and in the alley at 02:20.',
      wrong: 'The transmitter log and Mags both place him in the building after midnight. Try the route that fits both.'
    },
    redHerrings: [
      { clue: 'c21_threat', label: 'Mox\'s on-air threat', clearedBy: ['c21_threat', 'c21_tape'], note: 'Mox was live on his own station at 02:00. His threat was about a timeslot, not a life.' }
    ],
    contradictions: [
      { suspect: 'callum', statement: 1, evidence: ['c21_witness', 'c21_log'],
        expose: 'Mags saw Callum leave at 02:20, and the transmitter log records a male voice in the room at 02:26. His midnight alibi is a lie.',
        wrong: 'That does not put him in the building after midnight. Try the witness who saw the car.' },
      { suspect: 'callum', statement: 3, evidence: ['c21_coded'],
        expose: 'The decoded advert reads SABLE SHIPS AT TWO. Callum claimed he did not read the adverts, but the code ran under his login.',
        wrong: 'He can dismiss a word. He cannot dismiss the decoded margin.' }
    ],
    solution: {
      minEvidence: 7,
      questions: [
        { kind: 'suspect', q: 'Who killed Nadia Rooke?', options: [
          { t: 'Callum Reeve - station owner and beneficiary', v: 'callum' },
          { t: 'Priya Sen - producer who built the playout', v: 'priya' },
          { t: 'Mox Delaney - rival DJ who threatened her', v: 'mox' },
          { t: 'Mags - the laundrette owner below', v: 'mags' }
        ], answer: 'callum' },
        { kind: 'method', q: 'How was the death disguised?', options: [
          { t: 'A live electrocution at the mixing desk', v: 'live' },
          { t: 'A pre-recorded broadcast was played while the booth stayed muted', v: 'archive' },
          { t: 'A second DJ imitated Nadia while she was held elsewhere', v: 'double' },
          { t: 'The transmitter was switched off and the show faked from home', v: 'off' }
        ], answer: 'archive' },
        { kind: 'motive', q: 'Why was Nadia killed?', options: [
          { t: 'She was about to read the SABLE smuggling times on air', v: 'expose' },
          { t: 'She was leaving the station for a rival broadcaster', v: 'rival' },
          { t: 'She had stolen the station\'s advertising money', v: 'money' },
          { t: 'She knew about an insurance fraud on the studio', v: 'insurance' }
        ], answer: 'expose' },
        { kind: 'evidence', q: 'Which evidence breaks the alibi?', options: [
          { t: 'The archive tape and the muted booth log', v: 'tape' },
          { t: 'Mox\'s on-air threat', v: 'threat' },
          { t: 'The station insurance policy', v: 'policy' },
          { t: 'The laundrette answerphone messages', v: 'phone' }
        ], answer: 'tape' }
      ],
      verdict: {
        who: "Callum Reeve",
        whoDesc: ", the station owner, was arrested for the murder of Nadia Rooke.",
        how: "He pre-recorded her overnight show, killed her before the slot began, and fed the archive tape into a muted booth. The eleven minutes the city heard were already dead.",
        why: "Nadia had the SABLE smuggling times and was going to read them on air. The station's licence, its debts and its owner all pointed at the same network.",
        key: "The archive tape, the muted booth log, and burn marks made after her heart had already stopped."
      },
      reveal: [
        "Nadia Rooke died at 02:03. The voice that carried the broadcast until 02:14 was assembled from a session recorded two nights earlier, down to the laugh she never used on air.",
        "The booth microphone stayed muted the whole time. Callum needed the audience, not the room. He kept the frequency warm so nobody would ask why the host had gone quiet.",
        "Mox Delaney's threat was real anger and nothing more. The loudest man in the file was the only one with an alibi he never bothered to build."
      ],
      quote: "The carrier stayed up. Nobody was listening to the room.",
      twist: "The coded advert was the tell. SABLE SHIPS AT TWO ran under Callum's login, in the margins of a business he claimed never to read."
    }
  });
})();
