/* ============================================================
   CASE 15 — UNDERTOW
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c15', num: 15,
    title: 'Undertow',
    subtitle: 'A champion open-water swimmer drowns in a quarry she has swum a thousand times, and her watch says she finished the session.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'quarry', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Lena Voss, 27 — open-water swimmer' },
      { k: 'Scene', v: 'Harlow quarry, north jetty' },
      { k: 'Found', v: '06:40 — by a dog walker' },
      { k: 'Cause', v: 'Drowning · head injury · sedative in the blood' }
    ],
    briefing: [
      'Lena Voss swam the Harlow quarry every morning before work. She had done it in fog, in sleet, and once in a storm that closed the roads. She was training for a solo Channel crossing. She could tread water for an hour with her hands tied.',
      'At twenty to seven a dog walker found her floating face down beside the north jetty, still in her wetsuit, her swim cap pulled half off. The post-mortem says drowning. It also says she had a sedative in her blood and a blunt injury behind her left ear.',
      'Her coach says she had a heart condition nobody knew about. Her training partner says she was swimming better than ever. Her sponsor says she was going to announce something on Monday, and would not say what.',
      'The quarry is twenty metres deep and eight degrees cold. A strong swimmer can die in water like that. But Lena Voss did not drown because she was weak. She drowned because someone made sure she stayed under.'
    ],
    opening: 'The quarry is flat and black and very quiet. The north jetty is a concrete finger disappearing into the water. Lena’s towel is folded on the rail. Her flask is still warm. Her watch is still running.',
    objectives: [
      'Establish whether Lena drowned during her swim or afterwards.',
      'Recover her training data and the last minutes before the watch stopped.',
      'Trace the sedative in her blood.',
      'Find out what she was going to announce on Monday.'
    ],
    locations: [
      {
        id: 'quarry', name: 'Harlow quarry', short: 'The quarry', time: '07:10',
        art: { kind: 'quarry', mood: 'cold' },
        intro: 'A flooded slate quarry ringed by black cliffs. The water is glassy and cold enough to ache. Lena’s body has been moved to the bank under a silver sheet. The north jetty runs out into the deep water.',
        actions: [
          { id: 'body', label: 'Examine Lena and the jetty', icon: 'blood', hotspot: { x: 62, y: 67 },
            desc: 'The wetsuit, the head wound, the watch',
            text: [
              'Lena is twenty-seven, lean and sun-brown, with the shoulders of a swimmer. Her wetsuit is zipped to the throat. Her swim cap is half off, caught on one ear. There is a small, deep bruise behind her left ear, hidden by her hair.',
              'The pathologist’s note: <b>“Water in the lungs. Drowning. Sedative (zopiclone) in the blood at twice the therapeutic dose. Blunt impact, left mastoid, perimortem. She was alive when she entered the water.”</b>',
              'On her left wrist: a swim watch, still running. The screen reads <b>SESSION COMPLETE — 3.2 KM — 56:11</b>. The last recorded heart rate is 168. Then nothing.'
            ],
            gives: ['body-note', 'wrist-watch'],
            hint: 'The watch says the session was completed. The pathologist says she drowned. Those two facts cannot both be innocent.'
          },
          { id: 'jetty', label: 'Search the jetty and the bank', icon: 'search',
            desc: 'Towel, flask, a length of rope',
            requires: ['body-note'],
            text: [
              'Her towel is folded on the rail, still dry at the centre. Her flask contains black coffee, still warm. Her shoes are side by side under the bench, laces tucked in — the habit of someone who swims here often.',
              'At the end of the jetty, a mooring weight has been dragged out of position. It is a concrete block with a steel ring, used to hold the lane rope. There is a dark smear on the ring and a strand of blonde hair caught in the shackle.',
              'The lane rope itself has been cut. Not untied — cut, cleanly, with a blade.'
            ],
            gives: ['mooring-weight', 'cut-rope'],
            hint: 'The lane rope has been cut. Look at the mooring weight and the rail.'
          },
          { id: 'water', label: 'Take water and blood samples', icon: 'flask', puzzle: 'tox',
            desc: 'Separate the sedative from the quarry',
            requires: ['body-note'],
            hint: 'Run the sample through solvent, buffer, reagent, and fixative — in that order.'
          }
        ]
      },
      {
        id: 'clubhouse', name: 'Swim club clubhouse', short: 'Clubhouse', time: '08:20',
        art: { kind: 'cabin' },
        requires: ['body-note'],
        intro: 'A wooden hut with a kettle, a noticeboard, and the smell of chlorine and wet neoprene. Martin Rook is at the table with a training plan and a phone that will not stop buzzing. Chloe Dane is in the corner, still in her swim kit, shaking.',
        actions: [
          { id: 'rook', label: 'Interview Martin Rook', icon: 'user', suspect: 'rook',
            desc: 'Coach · twenty years at the club',
            hint: 'Rook was the last person to see Lena before her swim.'
          },
          { id: 'lockers', label: 'Search Lena’s locker', icon: 'search',
            desc: 'A diary, a supplement bottle, a printed email',
            requires: ['body-note'],
            text: [
              'Lena’s locker is neat: a spare cap, a roll of tape, a stick of lip balm, and a diary with a rubber band around it. The diary is a training log, every session dated and timed.',
              'Behind the diary: a bottle of iron supplements with the label peeled off and replaced with a handwritten one: <b>“B12 — take one.”</b> The capsules inside are not B12. They are small white tablets with a manufacturer’s mark.',
              'Folded into the diary: a printed email from the national anti-doping panel, dated two weeks ago. <b>“Thank you for your statement. We will contact you after the weekend.”</b>'
            ],
            gives: ['locker-diary', 'supplement-bottle', 'doping-email'],
            hint: 'Lena’s locker has a bottle with a false label and a letter about a statement.'
          },
          { id: 'board', label: 'Check the training board', icon: 'note',
            desc: 'This week’s sessions, revised in red',
            text: [
              'The training board lists the week’s sessions in green marker. Lena’s name is at the top of every open-water slot. The Channel relay team is listed below: Chloe Dane, Sam Okafor, Lena Voss, reserve.',
              'Someone has drawn a red line through Lena’s name on Monday and written <b>“WITHDRAWN”</b> in the margin. The ink is fresh. The handwriting is Martin Rook’s.',
              'Beside the board, a newspaper clipping from last month: <b>“VOSS BREAKS CLUB RECORD — COACH HAILS ‘ONCE-IN-A-GENERATION’ SWIMMER.”</b>'
            ],
            gives: ['training-board'],
            hint: 'Lena’s name has been crossed out for Monday — before she died.'
          },
          { id: 'watchdata', label: 'Download the swim watch', icon: 'clock', puzzle: 'watch',
            desc: 'Splits, heart rate, and the last lap',
            requires: ['wrist-watch', 'training-board'],
            hint: 'The session was 3.2 km at an average pace of 1:45 per 100 m. Work out how long it should have taken.'
          },
          { id: 'chloe', label: 'Talk to Chloe Dane', icon: 'user', suspect: 'chloe',
            desc: 'Training partner · relay reserve',
            requires: ['training-board'],
            hint: 'Chloe was on the jetty this morning. Ask her what she saw.'
          }
        ]
      },
      {
        id: 'boathouse', name: 'Boathouse', short: 'Boathouse', time: '09:30',
        art: { kind: 'docks' },
        requires: ['tox-report'],
        intro: 'A low shed at the south end of the quarry, full of kayaks, buoys, and rope. A small motorboat is tied to the jetty outside. The club camera is mounted above the door, pointed at the north jetty.',
        actions: [
          { id: 'boat', label: 'Search the motorboat', icon: 'car',
            desc: 'Fuel can, wet rope, a pair of gloves',
            requires: ['cut-rope'],
            text: [
              'The boat is a club RIB with an outboard motor. The fuel can is half full. In the bow locker: a coil of new rope, a pair of black nitrile gloves, and a towel that is still damp.',
              'The rope matches the cut lane rope exactly — same diameter, same green fleck. The gloves are salted and stiff. The towel has a smear of black coffee on one corner.',
              'The boat’s ignition is warm. It has been used this morning, and recently.'
            ],
            gives: ['boat-rope', 'gloves'],
            hint: 'The lane rope was cut. The boat locker has a matching coil.'
          },
          { id: 'camera', label: 'Enhance the jetty camera', icon: 'cctv', puzzle: 'jettycam',
            desc: 'A grey morning and a second figure',
            requires: ['mooring-weight'],
            hint: 'The camera looks straight down the north jetty. Enhance the image until the figure at the end resolves.'
          },
          { id: 'phone', label: 'Recover Lena’s phone', icon: 'phone',
            desc: 'In the boat’s dry bag',
            requires: ['boat-rope'],
            text: [
              'Lena’s phone is in a waterproof dry bag under the boat seat. The screen is cracked. The last outgoing message was sent at 05:02 to a contact saved as <b>“A.V.”</b>: <b>“If I don’t call by seven, go to the panel. The file is in my locker.”</b>',
              'There is a second message, unsent, to the same contact: <b>“He knows. He took my supplements.”</b>',
              'The phone’s location history ends at the north jetty at 05:11.'
            ],
            gives: ['lena-phone', 'unsent-warning'],
            hint: 'Lena left a message for someone before her swim. Read the unsent draft too.'
          }
        ]
      },
      {
        id: 'chemist', name: 'Bellweather Pharmacy', short: 'Pharmacy', time: '11:00',
        art: { kind: 'shop' },
        requires: ['tox-report'],
        intro: 'A small pharmacy on the road to the quarry, with a bell over the door and a pharmacist who knows every customer by name. The prescription register is open on the counter.',
        actions: [
          { id: 'pharmacist', label: 'Ask about the sedative', icon: 'pill',
            desc: 'Zopiclone · who bought it',
            text: [
              'The pharmacist checks the register. “Zopiclone. We dispense it on prescription only. Last month we had a private prescription for a Mr Martin Rook — he said it was for his dog, for travel anxiety. I told him we do not dispense for animals. He was very insistent.”',
              'She finds the record: <b>“ROOK, MARTIN — 28 tablets — private prescription — 14th.”</b> The prescribing vet’s name has been scratched out and replaced with a doctor’s stamp.',
              '“He paid cash,” she says. “I remember because he asked me not to put it through the till.”'
            ],
            gives: ['sedative-prescription', 'rook-payment'],
            hint: 'The sedative in Lena’s blood had to come from somewhere. Ask about the register.'
          },
          { id: 'register', label: 'Photograph the prescription log', icon: 'ledger',
            desc: 'Dates, doses, and a scratched-out vet',
            requires: ['sedative-prescription'],
            text: [
              'The log shows three private prescriptions for zopiclone in the last two months, all collected by the same man, all paid in cash. The prescriber’s details have been altered on each one.',
              'The pharmacy’s CCTV shows Martin Rook collecting the last box on the 14th, wearing his club jacket. He signs the register with a flourish.',
              'In the margin, the pharmacist has written: <b>“Unusual. Check vet licence.”</b>'
            ],
            gives: ['script-log'],
            hint: 'Three prescriptions, one collector. Photograph the log.'
          }
        ]
      },
      {
        id: 'flat', name: 'Martin Rook’s flat', short: 'Rook’s flat', time: '13:20',
        art: { kind: 'cabin', mood: 'cold' },
        requires: ['jetty-photo'],
        intro: 'A ground-floor flat with a view of the quarry road. The curtains are open. On the kitchen table: a laptop, a box of syringes, and a training diary open to Lena’s name.',
        actions: [
          { id: 'search', label: 'Search the flat', icon: 'search', hotspot: { x: 42, y: 56 },
            desc: 'Vials, syringes, a bank transfer',
            requires: ['sedative-prescription'],
            text: [
              'The kitchen table is a doping station: a box of EPO vials, a sharps bin, and a printed schedule with Lena’s name at the top. The schedule runs to the Channel crossing date.',
              'In the bedroom: a bank statement showing twelve payments from a sports supplement company, each £2,000, into Rook’s personal account. The latest payment is dated three days ago.',
              'On the desk: a printed copy of Lena’s anti-doping statement, with a note in Rook’s hand: <b>“She cannot send this. Fix it.”</b>'
            ],
            gives: ['vials', 'bank-transfer', 'rook-note'],
            hint: 'Rook’s flat is the doping headquarters. Search the kitchen and the desk.'
          },
          { id: 'laptop', label: 'Open Rook’s laptop', icon: 'terminal', puzzle: 'rook-pc',
            desc: 'Training files and a deleted email',
            requires: ['vials'],
            hint: 'Rook’s whole life is the Channel crossing. His password is the swim he has been planning for two years.'
          },
          { id: 'rook', label: 'Confront Martin Rook', icon: 'user', suspect: 'rook',
            desc: 'The coach with the syringe schedule',
            requires: ['doping-files'],
            hint: 'With the doping files open, ask Rook about the morning of the swim.'
          }
        ]
      },
      {
        id: 'vane', name: 'Adam Vane’s house', short: 'Vane’s house', time: '15:40',
        art: { kind: 'house', mood: 'mansion' },
        requires: ['lena-phone'],
        intro: 'A glass house on the ridge above the quarry, with a lap pool on the terrace and a view of the water. Adam Vane is on the phone when you arrive. He ends the call before you reach the door.',
        actions: [
          { id: 'adam', label: 'Interview Adam Vane', icon: 'user', suspect: 'adam',
            desc: 'Sponsor · married · Lena’s “A.V.”',
            hint: 'Lena’s last message was to A.V. Ask him what she meant.'
          },
          { id: 'search', label: 'Search the study', icon: 'search',
            desc: 'Texts, a sponsorship contract, a cheque',
            requires: ['adam-statement'],
            text: [
              'The study is all glass and white leather. In the desk: a sponsorship contract for Lena’s Channel crossing, signed by Adam personally. A second contract, unsigned, would transfer her image rights to his sports agency.',
              'His phone is on the desk, unlocked. The thread with “Lena V.” runs back eight months. The last messages are hers: <b>“I’m going to the panel on Monday. I won’t name you. But I have to name him.”</b> His reply: <b>“Don’t. He’ll destroy you.”</b>',
              'A cheque stub for £15,000, made out to Martin Rook, dated three weeks ago. The memo line says <b>“CHANNEL PREP — FINAL”</b>.'
            ],
            gives: ['adam-texts', 'rook-cheque'],
            hint: 'Adam knew about the panel. Search his study for the messages.'
          }
        ]
      }
    ],
    puzzles: {
      tox: {
        type: 'mix', title: 'Toxicology Screen', subtitle: 'Separate the sedative', icon: 'flask',
        prompt: 'The blood sample is contaminated with quarry water. Separate the organic compounds, then run the reagent test for zopiclone.',
        note: 'Add the reagents in the correct order: solvent, buffer, reagent, fixative.',
        reagents: [
          { name: 'Solvent', color: '#67e8f9' },
          { name: 'Buffer', color: '#a3e635' },
          { name: 'Reagent', color: '#e879f9' },
          { name: 'Fixative', color: '#fbbf24' }
        ],
        order: [0, 1, 2, 3],
        wrong: 'The sample turns cloudy and the reading is lost. Empty the beaker and follow the bench card.',
        hintText: 'The bench card reads: SOLVENT, BUFFER, REAGENT, FIXATIVE. In that order.',
        success: 'The reagent turns violet. Zopiclone, at twice the therapeutic dose. Lena was sedated before she entered the water.',
        successTitle: 'She was drugged.',
        gives: ['tox-report'], flags: ['toxDone'],
        short: 'Lena had zopiclone in her blood.',
        log: 'Toxicology confirms zopiclone at twice the therapeutic dose — enough to slow a swimmer’s reaction time and judgment.'
      },
      watch: {
        type: 'math', title: 'Swim Watch Data', subtitle: 'How long was she in the water?', icon: 'clock',
        info: 'The watch records a 3.2 km session at an average pace of 1:45 per 100 m. Lena entered the water at 04:15. The watch stopped at 05:11. Rook says she never completed the session.',
        placeholder: 'minutes',
        unit: 'minutes',
        answer: 56, tolerance: 1,
        working: '3,200 m ÷ 100 = 32 × 1.75 min = 56 minutes.',
        wrong: 'Check the arithmetic: 3.2 km is 32 × 100 m. At 1:45 per 100 m, each 100 m takes 1.75 minutes.',
        hintText: '32 hundred-metre blocks × 1.75 minutes = 56 minutes.',
        success: 'The numbers agree. Lena entered at 04:15 and the watch stopped at 05:11 — fifty-six minutes, exactly the planned session. She finished the swim. Whatever happened, happened at the jetty afterwards.',
        successTitle: 'She finished the session.',
        gives: ['watch-data'], flags: ['watchDone'],
        short: 'Lena completed the full 3.2 km swim.',
        log: 'Watch data proves Lena completed the full 3.2 km session in 56 minutes, finishing at the jetty at 05:11. She did not drown mid-swim.'
      },
      jettycam: {
        type: 'photo', title: 'North Jetty Camera', subtitle: '05:09 — a second figure', icon: 'cctv',
        scene: { kind: 'quarry', mood: 'cold' },
        target: { x: 63, y: 49, w: 20, h: 28 }, range: [56, 76],
        question: 'What does the camera show at the end of the jetty?',
        options: [
          { t: 'A second person in a club jacket, crouching at the mooring weight', v: 'coach' },
          { t: 'A dog running along the jetty', v: 'dog' },
          { t: 'An empty jetty with the lane rope intact', v: 'empty' },
          { t: 'Two swimmers entering the water together', v: 'swimmers' }
        ],
        answer: 'coach',
        reveal: 'A figure in a dark club jacket is crouched at the mooring weight, one hand on the rope. The figure is too broad for Chloe. The jacket has a white stripe down the sleeve.',
        wrong: 'The figure is at the end of the jetty, near the mooring weight. Slide into the clear band and look at the jacket.',
        hintText: 'The clear band is 56% to 76%. Look for a person, not a boat.',
        success: 'The figure resolves: a broad-shouldered man in a club jacket with a white sleeve stripe, crouched at the mooring weight at 05:09. Martin Rook owns that jacket.',
        successTitle: 'Rook was on the jetty.',
        gives: ['jetty-photo'], flags: ['camDone'],
        short: 'Rook was on the jetty at 05:09.',
        log: 'The jetty camera shows a man in Rook’s club jacket crouched at the mooring weight at 05:09 — two minutes before Lena’s watch stopped.'
      },
      'rook-pc': {
        type: 'terminal', title: 'Rook’s Laptop', subtitle: 'Coach account', icon: 'terminal',
        user: 'mrook', host: 'harlow-swim', password: 'channel',
        intro: 'Connection established. The desktop is a photograph of the Channel at dawn. Type "help" for commands.',
        banner: 'HARLOW SWIM CLUB — COACH ACCESS. 3 FILES. 1 DELETED MAIL.',
        files: [
          { name: 'training.csv', body: '<span class="d">LENA VOSS — CHANNEL BLOCK</span><br>Week 1 — 28 km<br>Week 2 — 34 km<br>Week 3 — <span class="y">EPO cycle 2. Adjust dose.</span><br>Week 4 — taper<br><span class="r">Note: panel date Monday. She cannot compete if suspended.</span>' },
          { name: 'suppliers.txt', body: '<span class="d">Supplement company — “recovery support”</span><br>12 payments × £2,000<br>Contact: A. VANE<br><span class="d">Do not discuss with athletes.</span>' },
          { name: 'monday.eml', locked: true, secret: true, hint: 'Deleted mail. Coach password required.', body: '<span class="y">FROM: lena.voss<br>TO: clean.sport@panel<br>SUBJECT: Statement — Martin Rook</span><br><br>“I have been told my supplements were legal. They were not. Coach Rook administered EPO injections for three months and told me it was iron. I have the vials and the schedule. I am willing to testify on Monday.<br><br>I am not naming anyone else. I only want him stopped.”<br><br><span class="r">— Lena Voss</span><br><br><span class="d">Forwarded to M. Rook at 04:58. Read receipt: 05:00.</span>' }
        ],
        hintText: 'Rook has been planning the Channel crossing for two years. Try CHANNEL.',
        success: 'The deleted mail opens. Lena sent her doping statement to the anti-doping panel at 04:58. Rook received a forwarded copy at 04:58 and read it at 05:00 — thirteen minutes before she reached the jetty.',
        successTitle: 'He knew before she finished.',
        gives: ['doping-files', 'statement-mail'], flags: ['pcDone'],
        short: 'Rook read Lena’s doping statement before she died.',
        log: 'Rook’s laptop contains Lena’s doping statement, forwarded to him at 04:58 and read at 05:00 — before her swim ended.'
      }
    },
    suspects: [
      {
        id: 'rook', name: 'Martin Rook', role: 'Head coach · Harlow Swim Club', location: 'clubhouse', locationName: 'Clubhouse', tag: 'Prime suspect',
        portrait: { seed: 'martin-rook', hair: 'short', hairColor: '#8d8d99', skin: 0, expression: 'angry', collar: 'coat', beard: 'stubble', age: 'adult' },
        intro: 'Forty-four, wide-shouldered, with a coach’s voice that fills a room. He is holding a training plan and a phone. He speaks about Lena in the past tense before you have told him she is dead.',
        questions: [
          { q: 'Where were you at five this morning?', requires: ['jetty-photo'],
            a: '“At home. Asleep.” He does not blink. “I do not swim with the athletes. I coach from the bank. Lena knew the quarry better than I do.”',
            gives: ['rook-alibi'], flags: ['rookHostile'] },
          { q: 'Your jacket is on the jetty camera at 05:09.', requires: ['jetty-photo'], present: true,
            a: 'He looks at the still for a long time. “That could be anyone. Half the club has that jacket.” A pause. “I was on the bank at six. I found her towel and I called the police. That is all.”',
            gives: ['rook-story'] },
          { q: 'Lena’s blood contains zopiclone from a prescription in your name.', requires: ['sedative-prescription'], present: true,
            a: '“For the dog.” His voice rises. “I told the chemist it was for the dog. She had travel anxiety. You can check.” He rubs his face. “Lena was a difficult girl. Talented, but difficult. She had been making accusations for weeks. None of them were true.”',
            gives: ['rook-denial'], flags: ['rookHostile'] },
          { q: 'You read her doping statement at 05:00.', requires: ['statement-mail'], present: true,
            a: 'The room goes very quiet. “It was a mistake. A misunderstanding about supplements. I was going to explain it to her on Monday.” He looks at the table. “She would have been suspended. Her career would have been over. I was trying to protect her.”',
            gives: ['rook-motive'], flags: ['rookBroke'] },
          { q: 'The lane rope was cut, and there is a matching coil in your boat.', requires: ['boat-rope'], present: true,
            a: '“It is club rope. It is kept in the boat.” He stands up. “I want a lawyer. I know how this works. You have a photograph of a jacket and a bottle of dog medicine. That is not a murder case.”',
            gives: ['rook-break'] }
        ],
        after: 'He asks whether he can call his wife. You tell him he can call whoever he likes. He does not pick up the phone.'
      },
      {
        id: 'chloe', name: 'Chloe Dane', role: 'Training partner · relay reserve', location: 'clubhouse', locationName: 'Clubhouse', tag: 'Witness / suspect',
        portrait: { seed: 'chloe-dane', hair: 'ponytail', hairColor: '#c9a24a', skin: 1, expression: 'sad', collar: 'coat', eyes: '#3a2159' },
        intro: 'Twenty-six, still in her swim kit, with a towel around her shoulders and eyes red from crying or chlorine. She and Lena had swum together since they were teenagers.',
        questions: [
          { q: 'What did you see this morning?', requires: ['body-note'],
            a: '“I got here at half five. Lena’s car was already here. I saw a figure at the end of the jetty — I thought it was her, stretching.” She wipes her face. “I went into the clubhouse to change. When I came out, the jetty was empty and there was a boat moving on the south side.”',
            gives: ['chloe-statement'] },
          { q: 'You were going to be replaced in the relay.', requires: ['training-board'],
            a: '“I was the reserve. That was fair. Lena was faster.” She looks at the board. “I was angry about it for about a week. Then I got over it. I am not going to pretend I am a saint. But I did not kill her.”',
            gives: ['chloe-motive'], flags: ['chloeCleared'] },
          { q: 'Did Lena say anything about the panel on Monday?', requires: ['doping-email'],
            a: '“She said she was going to tell the truth and it would blow up the club.” Chloe lowers her voice. “She asked me to come with her. I said I could not. I have a scholarship. I could not afford to be involved.” She starts crying again. “She was not afraid of Rook. She was afraid of what it would do to everyone else.”',
            gives: ['chloe-panel'] },
          { q: 'Was Lena a strong enough swimmer to drown in a quarry?', requires: ['watch-data'],
            a: '“She could swim the Channel tomorrow.” Chloe laughs, once, without humour. “She swam this quarry in a storm last winter. Something had to be wrong. She did not just go under.”',
            gives: ['chloe-belief'] }
        ],
        after: 'She asks whether she can go home. You tell her to stay close. She nods and goes back to staring at the water.'
      },
      {
        id: 'adam', name: 'Adam Vane', role: 'Sponsor · sports agency owner', location: 'vane', locationName: 'The glass house', tag: 'Suspect',
        portrait: { seed: 'adam-vane', hair: 'wavy', hairColor: '#5b3a22', skin: 0, expression: 'neutral', collar: 'suit', glasses: 'square', beard: 'goatee' },
        intro: 'Fifty-one, tanned, with a lap pool he does not use and a view of the quarry he pretends not to watch. He is careful with his words to the point of making them useless.',
        questions: [
          { q: 'What was Lena going to announce on Monday?', requires: ['lena-phone'],
            a: '“A statement to the anti-doping panel.” He pours a glass of water. “She had convinced herself that Martin was doping her. I told her she needed evidence, not accusations. She said she had evidence.”',
            gives: ['adam-statement'] },
          { q: 'You were having an affair with her.', requires: ['adam-texts'],
            a: '“That is not relevant.” He sets the glass down. “Lena was an extraordinary athlete. I sponsored her. I cared about her. If you are going to turn that into a motive, you are going to have to explain why I would kill the person I was trying to protect.”',
            gives: ['adam-affair'], flags: ['adamHostile'] },
          { q: 'Your messages say “He’ll destroy you.”', requires: ['adam-texts'], present: true,
            a: '“I meant her career. Rook is a powerful man in this sport. He has made swimmers disappear before.” He looks out at the quarry. “I told her to go to the panel with a lawyer. She said she did not want a lawyer. She wanted it to be clean.”',
            gives: ['adam-fear'] },
          { q: 'Where were you at five this morning?', requires: ['adam-texts'],
            a: '“Here. In bed. My wife will confirm it, though I understand why you might not find that persuasive.” He meets your eyes. “I did not go to the quarry. I have not swum in that water in twenty years.”' ,
            gives: ['adam-alibi'] }
        ],
        after: 'He asks you to leave by the side gate so the neighbours do not see the car. You use the front door.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Lena Voss — post-mortem note', caption: 'Drowning · sedative · head injury', icon: 'blood', type: 'Forensic report',
        desc: 'Water in the lungs, zopiclone at twice the therapeutic dose, and a blunt impact behind the left ear. She was alive when she entered the water.',
        tells: 'She drowned, but she was drugged and struck first. This was not an accident of the cold.'
      },
      'wrist-watch': {
        name: 'Swim watch', caption: '3.2 km · 56:11 · stopped 05:11', icon: 'watch', type: 'Device',
        desc: 'A GPS swim watch, still running. It records a completed 3.2 km session in 56 minutes and eleven seconds. The last heart rate is 168.',
        tells: 'Lena finished her swim. Whatever happened next happened at the jetty.'
      },
      'mooring-weight': {
        name: 'Moved mooring weight', caption: 'Dark smear · blonde hair', icon: 'tool', type: 'Weapon',
        desc: 'A concrete mooring weight dragged out of position, with a dark smear and a strand of blonde hair caught in the shackle.',
        tells: 'The weight was used to strike her. The killer did not have time to clean it.'
      },
      'cut-rope': {
        name: 'Cut lane rope', caption: 'Clean blade · not untied', icon: 'rope', type: 'Physical evidence',
        desc: 'The lane rope has been cut, not untied. The cut end is clean and recent.',
        tells: 'Someone wanted the lane marker out of the way — or wanted to make it look as if Lena had become tangled.'
      },
      'tox-report': {
        name: 'Toxicology report', caption: 'Zopiclone · twice therapeutic dose', icon: 'flask', type: 'Forensic analysis',
        desc: 'Lena’s blood contains zopiclone at twice the therapeutic dose. The sedative would slow reaction time and impair judgment in cold water.',
        tells: 'Someone sedated her before the swim. A swimmer does not take a sleeping pill before training.'
      },
      'locker-diary': {
        name: 'Lena’s training diary', caption: 'Every session timed', icon: 'book', type: 'Personal record',
        desc: 'A meticulous training log. The last entry reads: “3.2 km — jetty — 04:15. Tell A. after.”',
        tells: 'She planned to meet someone after the swim. The diary is a timeline of her final morning.'
      },
      'supplement-bottle': {
        name: 'False-label supplement bottle', caption: '“B12” · not B12', icon: 'pill', type: 'Physical evidence',
        desc: 'A bottle relabelled “B12 — take one”. The capsules inside are small white tablets with a manufacturer’s mark, not B12.',
        tells: 'Lena had already discovered that her “supplements” were something else.'
      },
      'doping-email': {
        name: 'Anti-doping panel letter', caption: '“We will contact you after the weekend.”', icon: 'letter', type: 'Official record',
        desc: 'A printed email from the national anti-doping panel thanking Lena for her statement and promising contact after the weekend.',
        tells: 'Lena had already given evidence. Monday was not the beginning of the process — it was the end.'
      },
      'training-board': {
        name: 'Training board', caption: 'Lena “WITHDRAWN” in red', icon: 'note', type: 'Record',
        desc: 'The week’s training schedule, with Lena’s name crossed out for Monday in fresh red ink. The handwriting is Martin Rook’s.',
        tells: 'Rook had already decided Lena would not be swimming on Monday. He knew about the panel.'
      },
      'watch-data': {
        name: 'Watch analysis', caption: '56 minutes · session complete', icon: 'clock', type: 'Analysis',
        desc: 'Lena entered at 04:15 and completed 3.2 km in 56 minutes, finishing at 05:11. The pace matches her planned session exactly.',
        tells: 'She was alive and swimming normally until she reached the jetty. The attack happened there.'
      },
      'boat-rope': {
        name: 'Matching rope coil', caption: 'Same green fleck as the lane rope', icon: 'rope', type: 'Physical evidence',
        desc: 'A new coil of rope in the club RIB, matching the cut lane rope exactly. The boat’s ignition is still warm.',
        tells: 'The boat was used this morning, and the rope came from it.'
      },
      'gloves': {
        name: 'Nitrile gloves', caption: 'Salted · stiff · bow locker', icon: 'mask', type: 'Physical evidence',
        desc: 'A pair of black nitrile gloves in the boat locker, stiff with salt and quarry water.',
        tells: 'The killer wore gloves and used the boat. The gloves were left behind in a hurry.'
      },
      'jetty-photo': {
        name: 'Jetty camera still, 05:09', caption: 'Man in club jacket at the mooring weight', icon: 'cctv', type: 'Surveillance',
        desc: 'An enhanced still showing a broad-shouldered figure in a club jacket with a white sleeve stripe, crouched at the mooring weight.',
        tells: 'Rook was on the jetty two minutes before Lena’s watch stopped.'
      },
      'lena-phone': {
        name: 'Lena’s phone', caption: '“If I don’t call by seven…”', icon: 'phone', type: 'Device',
        desc: 'Lena’s last message to A.V. at 05:02, asking him to go to the panel if she did not call by seven. An unsent draft: “He knows. He took my supplements.”',
        tells: 'Lena knew she was in danger. She had already arranged a fallback.'
      },
      'unsent-warning': {
        name: 'Unsent warning', caption: '“He knows. He took my supplements.”', icon: 'note', type: 'Digital evidence',
        desc: 'A draft message on Lena’s phone, never sent. It names no one, but the context is unmistakable.',
        tells: 'Lena confronted someone about the supplements before her swim. That confrontation got her killed.'
      },
      'sedative-prescription': {
        name: 'Zopiclone prescription', caption: 'M. Rook · “for the dog”', icon: 'pill', type: 'Pharmacy record',
        desc: 'A private prescription for twenty-eight zopiclone tablets, collected by Martin Rook and paid for in cash. He claimed it was for his dog.',
        tells: 'The sedative in Lena’s blood came from Rook’s prescription.'
      },
      'rook-payment': {
        name: 'Cash payment record', caption: 'Asked not to use the till', icon: 'receipt', type: 'Record',
        desc: 'The pharmacist remembers Rook paying cash and asking for the sale not to go through the till.',
        tells: 'Rook did not want the purchase traceable. He knew what he was going to use it for.'
      },
      'script-log': {
        name: 'Prescription log', caption: 'Three boxes · one collector', icon: 'ledger', type: 'Pharmacy record',
        desc: 'Three private zopiclone prescriptions in two months, all collected by the same man, all with altered prescriber details.',
        tells: 'The sedative was acquired over time, not in a panic. This was planned.'
      },
      'vials': {
        name: 'EPO vials and schedule', caption: 'Lena’s name at the top', icon: 'pill', type: 'Physical evidence',
        desc: 'A box of EPO vials, a sharps bin, and a printed doping schedule with Lena’s name and the Channel crossing date.',
        tells: 'Rook was running a doping programme. Lena was his star subject.'
      },
      'bank-transfer': {
        name: 'Supplement company payments', caption: '12 × £2,000 · into Rook’s account', icon: 'money', type: 'Financial record',
        desc: 'Twelve payments of £2,000 from a sports supplement company into Rook’s personal account over three months.',
        tells: 'Rook was being paid to keep the programme running and the athletes quiet.'
      },
      'rook-note': {
        name: 'Rook’s handwritten note', caption: '“She cannot send this. Fix it.”', icon: 'note', type: 'Handwritten note',
        desc: 'A printed copy of Lena’s anti-doping statement with a note in Rook’s hand: “She cannot send this. Fix it.”',
        tells: 'Rook knew about the statement and had already decided to stop it.'
      },
      'doping-files': {
        name: 'Doping programme files', caption: 'EPO cycles · payments · Lena’s statement', icon: 'laptop', type: 'Digital evidence',
        desc: 'Rook’s laptop contains the full doping programme, twelve payments, and Lena’s forwarded statement.',
        tells: 'The motive is not a sudden argument. It is a three-month fraud about to be exposed.'
      },
      'statement-mail': {
        name: 'Forwarded doping statement', caption: 'Read at 05:00 · thirteen minutes before the jetty', icon: 'letter', type: 'Digital evidence',
        desc: 'Lena’s statement to the anti-doping panel, forwarded to Rook at 04:58 and read at 05:00.',
        tells: 'Rook knew exactly what she was going to do, and he knew before she finished her swim.'
      },
      'adam-texts': {
        name: 'Adam’s messages', caption: '“He’ll destroy you.”', icon: 'phone', type: 'Digital evidence',
        desc: 'Eight months of messages between Adam Vane and Lena, ending with her plan to name Rook at the panel and his warning.',
        tells: 'Adam knew about the panel and tried to stop her. He had a motive to protect his agency, but not to kill.'
      },
      'rook-cheque': {
        name: 'Cheque to Martin Rook', caption: '£15,000 · “CHANNEL PREP — FINAL”', icon: 'money', type: 'Financial record',
        desc: 'A cheque stub from Adam Vane to Martin Rook for £15,000, marked “Channel prep — final”.',
        tells: 'Adam was paying Rook, not just sponsoring Lena. The relationship is more complicated than it looked.'
      },
      'chloe-statement': {
        name: 'Chloe’s account', caption: 'A figure on the jetty · a boat on the south side', icon: 'note', type: 'Witness statement',
        desc: 'Chloe saw a figure at the end of the jetty at half five and a boat moving on the south side when she came out of the clubhouse.',
        tells: 'Someone else was at the quarry that morning, and a boat was used.'
      },
      'chloe-motive': {
        name: 'Chloe on the relay', caption: '“I was angry for a week.”', icon: 'audio', type: 'Interview',
        desc: 'Chloe admits she was angry about being replaced, then dismisses it. She has no connection to the sedative or the boat.',
        tells: 'Chloe had a small motive and no means. The case does not point at her.'
      },
      'chloe-panel': {
        name: 'Chloe on the panel', caption: '“She was afraid for everyone else.”', icon: 'note', type: 'Interview',
        desc: 'Lena asked Chloe to accompany her to the panel. Chloe refused because of her scholarship.',
        tells: 'Lena was prepared to expose the programme alone. She knew the risk.'
      },
      'chloe-belief': {
        name: '“She could swim the Channel tomorrow.”', caption: 'Chloe on Lena’s ability', icon: 'audio', type: 'Interview',
        desc: 'Chloe insists Lena was far too strong to drown in the quarry under normal conditions.',
        tells: 'The drowning only makes sense if Lena was incapacitated first.'
      },
      'adam-statement': {
        name: 'Adam’s account', caption: '“She said she had evidence.”', icon: 'note', type: 'Statement',
        desc: 'Adam confirms Lena was going to the anti-doping panel on Monday with evidence against her coach.',
        tells: 'The panel was the deadline. Rook had one weekend to stop her.'
      },
      'adam-affair': {
        name: 'Adam’s affair', caption: '“Not relevant.”', icon: 'audio', type: 'Statement',
        desc: 'Adam refuses to discuss his relationship with Lena, calling it irrelevant to the investigation.',
        tells: 'He had a personal motive to keep her quiet, but no link to the quarry or the sedative.'
      },
      'adam-fear': {
        name: 'Adam’s warning', caption: '“He has made swimmers disappear before.”', icon: 'note', type: 'Statement',
        desc: 'Adam says Rook is powerful enough to end a swimmer’s career, and that he warned Lena to take a lawyer.',
        tells: 'Rook had a history of controlling athletes. Adam was afraid of him.'
      },
      'adam-alibi': {
        name: 'Adam’s alibi', caption: 'At home · wife confirms', icon: 'receipt', type: 'Alibi',
        desc: 'Adam was at home until seven. His wife and the house alarm log confirm it.',
        tells: 'Adam was not at the quarry. His involvement is financial and personal, not physical.'
      },
      'rook-alibi': {
        name: 'Rook’s alibi', caption: '“At home. Asleep.”', icon: 'audio', type: 'Statement',
        desc: 'Rook claims he was at home until six and only came to the quarry after Lena’s towel was found.',
        tells: 'The camera puts him on the jetty at 05:09. His alibi is false.'
      },
      'rook-story': {
        name: 'Rook on the jacket', caption: '“Half the club has that jacket.”', icon: 'note', type: 'Statement',
        desc: 'Rook dismisses the camera still as a generic club jacket and claims he arrived at six.',
        tells: 'The jacket has a white sleeve stripe. Only the coaching staff wear that design.'
      },
      'rook-denial': {
        name: 'Rook on the sedative', caption: '“For the dog.”', icon: 'audio', type: 'Statement',
        desc: 'Rook insists the zopiclone was for his dog’s travel anxiety and that Lena’s accusations were false.',
        tells: 'The pharmacy has no veterinary authorisation on file. The dog story is invented.'
      },
      'rook-motive': {
        name: 'Rook’s admission', caption: '“I was trying to protect her.”', icon: 'audio', type: 'Statement',
        desc: 'Rook admits reading Lena’s doping statement and says he was trying to protect her career.',
        tells: 'He knew she was going to expose him. He had the motive and the deadline.'
      },
      'rook-break': {
        name: 'Rook’s collapse', caption: '“I want a lawyer.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the matching rope, Rook stops explaining and asks for a lawyer.',
        tells: 'The physical evidence has moved beyond the story he prepared.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Lena Voss?',
          options: [
            { t: 'Chloe Dane — the relay reserve she replaced', v: 'chloe' },
            { t: 'Adam Vane — her sponsor and married lover', v: 'adam' },
            { t: 'Martin Rook — her coach and the architect of her doping', v: 'rook' },
            { t: 'No one — she drowned after a cramp in cold water', v: 'accident' }
          ], answer: 'rook' },
        { q: 'How did Lena die?',
          options: [
            { t: 'She was sedated, struck at the jetty, and held under the water', v: 'sedated' },
            { t: 'She suffered a heart attack during the swim and sank', v: 'heart' },
            { t: 'She became tangled in the lane rope and drowned', v: 'rope' },
            { t: 'She was struck by the boat propeller', v: 'propeller' }
          ], answer: 'sedated' },
        { q: 'What was the motive?',
          options: [
            { t: 'Lena was going to expose Rook’s doping programme at the panel on Monday', v: 'doping' },
            { t: 'Lena was going to leave the club and join a rival', v: 'rival' },
            { t: 'Rook was in love with Chloe and Lena stood in the way', v: 'love' },
            { t: 'Lena had stolen money from the club’s accounts', v: 'money' }
          ], answer: 'doping' },
        { q: 'Which evidence breaks the case?',
          options: [
            { t: 'The jetty camera, the sedative prescription, and the doping files', v: 'camera' },
            { t: 'The cut lane rope and the warm flask', v: 'rope' },
            { t: 'Adam’s cheque to Rook', v: 'cheque' },
            { t: 'Chloe’s anger about the relay team', v: 'chloe' }
          ], answer: 'camera' }
      ],
      verdict: {
        who: 'Martin Rook, 44 — head coach at Harlow Swim Club',
        whoDesc: 'was arrested at the clubhouse and charged with murder. The doping files and the jetty footage were entered as evidence.',
        how: 'He sedated Lena with zopiclone, waited for her at the jetty, struck her with the mooring weight, and held her under until she drowned.',
        why: 'Lena had given a statement to the anti-doping panel naming him. It was due to be heard on Monday. He killed her to stop the statement, not the swim.',
        key: 'The jetty camera placed Rook at the mooring weight at 05:09; the pharmacy and the flat supplied the sedative and the doping programme.'
      },
      reveal: [
        'Martin Rook had been coaching at Harlow for twenty years. He had produced three national champions and one Olympian. He had also been running a doping programme for eight years, financed by a supplement company that paid him £2,000 a month to keep the results coming.',
        'Lena Voss was his best subject. She was strong, disciplined, and trusting. For three months he injected her with EPO and told her it was iron. She broke the club record. He told the newspapers she was a once-in-a-generation swimmer. He did not tell them why.',
        'Two weeks before she died, Lena found the vials in his kit bag. She compared the labels with the injections he had given her. Then she printed her training diary and wrote a statement for the anti-doping panel. She was not going to name Adam Vane, who had paid for her Channel crossing. She was not going to name the supplement company. She was going to name Rook, and only Rook.',
        'The panel was scheduled for Monday. Rook was forwarded a copy of the statement at 04:58 on Friday morning. He read it at 05:00. At 05:09 the jetty camera caught him crouched at the mooring weight.',
        'He had already put zopiclone in her coffee flask. He had already cut the lane rope. He had already brought the boat around to the south side. When Lena finished her swim and reached the jetty, he was waiting with the mooring weight in his hand.',
        'She was still alive when she went into the water. The pathologist is clear about that. The sedative slowed her. The blow dazed her. The cold did the rest. Rook dragged her to the north jetty, left her floating, and took the boat back to the boathouse.',
        'He was careful about almost everything. He wore gloves. He wiped the weight. He took the supplement bottle from her locker. He did not account for three things: the cut rope in his own boat, the camera above the boathouse, and the watch on Lena’s wrist that recorded every second of her last swim.',
        'The statement was sent to the panel at 09:00 that morning, as scheduled. Lena had set it up before she left the house. Rook killed her thirteen minutes after reading it, and it went out anyway.',
        'The dog he claimed the zopiclone was for did not exist. The vet whose name was on the prescription had never issued it. The supplement company’s payments ran to a bank account in Rook’s name. The only part of his story that survived the week was the part about the cold water.'
      ],
      quote: 'She was not afraid of Rook. She was afraid of what it would do to everyone else.',
      twist: 'The final detail was the letter from the panel. Lena had not planned to deliver it on Monday — she had already submitted it, and the panel had replied two weeks earlier. Monday was the date of the hearing. Rook killed her to stop a statement that had already been filed. The email was scheduled to forward at 09:00; it went out while he was still being interviewed.'
    }
  });
})();
