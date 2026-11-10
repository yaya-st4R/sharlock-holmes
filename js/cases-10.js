/* ============================================================
   CASE 16 — THE COLD READING
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c16', num: 16,
    title: 'The Cold Reading',
    subtitle: 'A stage medium is found dead in her own dressing room, and every spirit she sold was somebody else’s voice.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'theatre', mood: 'mansion' },
    facts: [
      { k: 'Victim', v: 'Marla Quinn, 52 — stage medium' },
      { k: 'Scene', v: 'The Grand Meridian hotel, Green Room' },
      { k: 'Found', v: '22:10 — by her assistant' },
      { k: 'Cause', v: 'Aconite poisoning · throat pastilles' }
    ],
    briefing: [
      'Marla Quinn sold the dead to the living for twenty years. She filled modest theatres, read palms at charity galas, and took private appointments in the Green Room of the Grand Meridian, where the curtains were heavy and the money was quiet.',
      'At ten past ten her assistant found her face down on the chaise with her throat pastille tin open beside her. The pathologist says aconite — monkshood — enough to stop a heart in minutes. The tin was her own. The pastilles were not.',
      'Three people had reason to want her quiet. A retired judge who had been paying her five thousand pounds a month to keep his wife’s “messages” coming. A hotel manager whose skimmed deposits she had discovered. And the assistant who knew every trick, every cue, and every secret in the appointment book.',
      'Marla Quinn was a fraud. That does not make her death a small thing. Somebody in that hotel decided the lie had gone far enough — and used the one thing she trusted to stop her heart.'
    ],
    opening: 'The Green Room smells of lilies, cold tea, and the faint chemical sweetness of throat lozenges. Marla is on the chaise, one hand under her cheek, as if she lay down for a nap. The spirit trumpet stands on its stand beside her, polished and waiting for a voice.',
    objectives: [
      'Establish what killed Marla and how it reached her.',
      'Learn how the “spirit voices” were really produced.',
      'Recover the recordings she used to control her clients.',
      'Identify who had a reason to silence her for good.'
    ],
    locations: [
      {
        id: 'green', name: 'The Green Room', short: 'Green Room', time: '22:25',
        art: { kind: 'theatre', mood: 'mansion' },
        intro: 'A dressing room dressed as a parlour: a chaise, a folding screen, a spirit trumpet on a brass stand, and a hundred small comforts arranged to make grieving people believe. The door was locked when the assistant arrived. Her key opened it.',
        actions: [
          { id: 'body', label: 'Examine Marla and the chaise', icon: 'blood', hotspot: { x: 54, y: 58 },
            desc: 'The pastille tin, the glass, the earpiece',
            text: [
              'Marla Quinn is fifty-two, silver-haired, dressed for a performance that will not happen. Her lips are slightly blue. There is a smell of bitter almonds and cheap floral throat pastilles. The tin lies open beside her: six pastilles left, pale green, hand-rolled.',
              'Her right ear holds a flesh-coloured receiver, the kind used with a hidden microphone. It is still switched on. A thin wire runs down her collar to a battery pack taped to her ribs.',
              'The pathologist’s note is clipped to the mirror: <b>“Aconite. Rapid onset. Pastilles appear to be the vehicle. Time of death 21:30–21:50.”</b>'
            ],
            gives: ['body-note', 'pastille-tin', 'earpiece'],
            hint: 'The earpiece is the first lie. A medium who talks to the dead should not need a radio receiver.'
          },
          { id: 'desk', label: 'Search the dressing table', icon: 'search',
            desc: 'Appointment book, client list, a locked drawer',
            requires: ['body-note'],
            text: [
              'The dressing table is covered in greasepaint, a hand mirror, and a neat row of crystals that have never touched a rock face. The top drawer holds an appointment book and a typed client list with monthly figures beside each name.',
              'The bottom drawer is locked. A small brass plate on it reads <b>“THE OTHER SIDE”</b>. The lock is a cheap three-wheel combination, the kind sold in joke shops.',
              'The appointment book records a private reading at 21:00 — client L. ASH — and a gap in the schedule afterwards for “clearing”.'
            ],
            gives: ['appt-book', 'client-list'],
            hint: 'The client list has money beside every name. The locked drawer is labelled “THE OTHER SIDE”.'
          },
          { id: 'cipher', label: 'Decode the appointment note', icon: 'lock', puzzle: 'cipher',
            desc: 'A line of nonsense at the back of the book',
            requires: ['appt-book'],
            hint: 'The note is a Caesar shift. Turn the wheel until the words resolve, then type the message.'
          },
          { id: 'lastaudio', label: 'Play the hidden cassette', icon: 'audio', puzzle: 'last',
            desc: '00:41:12 — what the trumpet heard',
            requires: ['session-tape'],
            hint: 'Listen past the hiss. The quiet woman’s voice comes after the reading, when the door opens.' }
        ]
      },
      {
        id: 'stage', name: 'The stage', short: 'The stage', time: '23:00',
        art: { kind: 'theatre' },
        requires: ['body-note'],
        intro: 'A small Edwardian stage with a velvet curtain and a single follow spot. The set is a drawing room with a fake fireplace and a real armchair. The spirit trumpet from the Green Room has a twin here, fixed to a boom arm above the audience.',
        actions: [
          { id: 'rig', label: 'Inspect the spirit trumpet rig', icon: 'wire',
            desc: 'A trumpet, a speaker, and a very old trick',
            text: [
              'The stage trumpet is mounted on a retractable boom. Inside the bell: a tiny speaker and a radio receiver tuned to the same frequency as Marla’s earpiece. The trumpet does not move on its own. It never did.',
              'A cue sheet is taped inside the boom housing. It lists clients by initial, the name of their dead relative, and a phrase to be played at the emotional peak. <b>“L.A. — WIFE — ‘You were not to blame.’”</b>',
              'The receiver has a second channel, unused, labelled <b>“ASSIST”</b>. That is the channel Esme used to feed Marla information during private readings.'
            ],
            gives: ['earpiece-rig', 'cue-sheet'],
            hint: 'Open the trumpet. The voice of the dead is a small speaker and a radio.'
          },
          { id: 'trumpet', label: 'Open the Green Room trumpet', icon: 'tool', puzzle: null,
            desc: 'Something rattles inside the bell',
            requires: ['cipher-note'],
            text: [
              'The Green Room trumpet is heavier than the stage prop. Unscrewing the bell reveals a compartment lined with foam: a microcassette recorder, voice-activated, still running.',
              'The tape counter reads 00:41:12. The machine has been recording since before the reading. It is warm.',
              'The cassette is labelled in Marla’s hand: <b>“ASH — FINAL — DO NOT COPY.”</b>'
            ],
            gives: ['hidden-recorder'],
            hint: 'The cipher said the trumpet holds a secret. Open it.'
          },
          { id: 'tape', label: 'Repair the reel-to-reel', icon: 'tool', puzzle: 'tape',
            desc: 'The old machine in the wings will play the cassette',
            requires: ['hidden-recorder'],
            hint: 'Match the deck’s labels: motor to drive belt, capstan to tape guide, head to pre-amp, speaker to output.'
          },
          { id: 'wings', label: 'Search the wings', icon: 'search',
            desc: 'A chair, a headset, a half-eaten sandwich',
            requires: ['earpiece-rig'],
            text: [
              'The wings hold a folding chair, a bottle of water, and a headset with a boom microphone. The headset is connected to a small transmitter. This is where the assistant sat during readings, feeding lines.',
              'On the floor beneath the chair: a printed sheet of client research. It lists Leonard Ash’s wife, her maiden name, the hospital where she died, and the phrase she used to say when he came home late.',
              'The sheet is annotated in two hands. Marla’s says <b>“Use the hospital. He still cries.”</b> Esme’s says <b>“No. Not this one.”</b>'
            ],
            gives: ['assist-chair', 'research-sheet'],
            hint: 'The assistant’s chair is where the “spirits” came from. Look at the research sheet.'
          }
        ]
      },
      {
        id: 'suite', name: 'Marla’s suite', short: 'Suite 402', time: '23:40',
        art: { kind: 'hotel', mood: 'mansion' },
        requires: ['earpiece-rig'],
        intro: 'A fourth-floor suite paid for by the hotel “for promotional purposes”. It is all velvet and room-service champagne, with a writing desk facing the river and a safe bolted into the wardrobe.',
        actions: [
          { id: 'desk', label: 'Search the writing desk', icon: 'ledger',
            desc: 'A blackmail ledger, bank slips, a photograph',
            text: [
              'The desk is a small museum of leverage. A black ledger records monthly payments from three clients, each under a code name. Beside it: paying-in slips for cash deposits of exactly five thousand pounds, dated the first of every month.',
              'Under the blotter: a photograph of a woman in her forties, dark-haired, with a shy smile. On the back, in Marla’s hand: <b>“E.V.’s mother — session 14 — voice only. Keep.”</b>',
              'A note in the ledger margin reads: <b>“ASH — increase to 6k. He will pay. He always pays.”</b>'
            ],
            gives: ['blackmail-ledger', 'bank-slips', 'mother-photo'],
            hint: 'The ledger is the motive file. The photograph under the blotter is the key to the assistant.'
          },
          { id: 'box', label: 'Open the “Other Side” cash box', icon: 'lockbox', puzzle: 'box',
            desc: 'Three wheels: hour, tens, minutes',
            requires: ['blackmail-ledger'],
            hint: 'Marla’s diary says the first contact came at 3:47 a.m. Set the wheels to 3, 4, 7.'
          },
          { id: 'pc', label: 'Open Marla’s laptop', icon: 'terminal', puzzle: 'marla-pc',
            desc: 'A mailing list and a threat',
            requires: ['client-list'],
            hint: 'Marla’s stage name came from a song about a girl called Marla. Try QUINN.'
          }
        ]
      },
      {
        id: 'service', name: 'Service corridor', short: 'Service', time: '00:10',
        art: { kind: 'interior' },
        requires: ['pastille-tin'],
        intro: 'A narrow back corridor of grey paint, linen carts, and a door marked STAFF ONLY. A camera points at the Green Room door from above a fire extinguisher. The corridor smells of washing powder and old cigarettes.',
        actions: [
          { id: 'cam', label: 'Enhance the corridor camera', icon: 'cctv', puzzle: 'corridorcam',
            desc: '21:34 — someone at the Green Room door',
            requires: ['body-note'],
            hint: 'The camera covers the Green Room door. Enhance the image until the figure resolves.'
          },
          { id: 'bins', label: 'Search the service bins', icon: 'search',
            desc: 'A pharmacy bag, a pastille wrapper, one glove',
            requires: ['corridor-photo'],
            text: [
              'The bins have been emptied, but not recently enough. At the bottom of the second bag: a paper pharmacy bag stamped <b>BELLWEATHER CHEMIST — 18:05</b>, a torn pastille wrapper, and a single black nitrile glove.',
              'The pharmacy bag contains a receipt for <b>aconite tincture — “for garden pests”</b>, paid in cash. The name on the receipt is a scrawl. The address given is the hotel.',
              'The glove has a smear of green paste on the thumb: the same colour as the pastilles in Marla’s tin.'
            ],
            gives: ['pharmacy-bag', 'pastille-wrapper', 'glove'],
            hint: 'The killer had to buy the poison somewhere. Check the bins.'
          },
          { id: 'keycard', label: 'Pull the keycard log', icon: 'id',
            desc: 'Who opened the Green Room door',
            requires: ['corridor-photo'],
            text: [
              'The hotel’s keycard system logs every door. The Green Room was opened at 21:07 by Marla’s own card, at 21:36 by a master key, and at 22:09 by the assistant.',
              'The master key is assigned to the duty manager, Julian Rooke. The 21:36 entry is logged to the service door, not the main corridor.',
              'At 21:53 the assistant’s card opens the service door from the corridor side. She claims she was on stage until ten.'
            ],
            gives: ['keycard-log'],
            hint: 'The master key and the assistant’s card both opened the door. Check the times.'
          }
        ]
      },
      {
        id: 'esme', name: 'Esme’s bedsit', short: 'Esme’s', time: '01:00',
        art: { kind: 'attic' },
        requires: ['keycard-log'],
        intro: 'A rented room above a laundrette, tidy in the way of someone who has learned to keep things small. A single bed, a sewing machine, and a wall of newspaper cuttings about a woman who died six years ago.',
        actions: [
          { id: 'search', label: 'Search the bedsit', icon: 'search', hotspot: { x: 46, y: 52 },
            desc: 'Cuttings, a notebook, a photograph',
            requires: ['mother-photo'],
            text: [
              'The cuttings are all about the same inquest: <b>“LOCAL WOMAN DIED AFTER ‘PSYCHIC’ PAYMENTS — CORONER WARNS OF EXPLOITATION.”</b> The woman in the photographs is the woman from Marla’s blotter. Her name was Valerie Vale. She was Esme’s mother.',
              'A notebook records every payment Valerie made to Marla: eleven thousand pounds over two years, money she borrowed against the house. The last page reads: <b>“She told Mum that Dad was waiting for her. Mum believed her. She believed her right to the end.”</b>',
              'Taped inside the wardrobe door: a photograph of Esme as a child, held by her mother. The same photograph Marla kept in her ledger.'
            ],
            gives: ['esme-mother', 'esme-notebook', 'cuttings'],
            hint: 'Esme’s bedsit is a shrine to her mother. Read the notebook.'
          },
          { id: 'esme', label: 'Confront Esme Vale', icon: 'user', suspect: 'esme',
            desc: 'The assistant who knew every trick',
            requires: ['session-tape'],
            hint: 'With the recording in hand, ask Esme about her mother — and about 21:36.'
          }
        ]
      },
      {
        id: 'ash', name: 'Leonard Ash’s house', short: 'Ash’s house', time: '09:00',
        art: { kind: 'house', mood: 'mansion' },
        requires: ['blackmail-ledger'],
        intro: 'A red-brick house behind a laurel hedge, with a brass nameplate and a garden that has not been touched since spring. Leonard Ash answers the door in a cardigan, holding a photograph of his wife.',
        actions: [
          { id: 'leonard', label: 'Interview Leonard Ash', icon: 'user', suspect: 'leonard',
            desc: 'Retired judge · client L.A.',
            hint: 'Leonard was Marla’s last client. Ask him about the reading.'
          },
          { id: 'study', label: 'Search the study', icon: 'search',
            desc: 'Cheque stubs, a letter, a diary',
            requires: ['blackmail-recordings'],
            text: [
              'The study is a judge’s room: law reports, a worn leather chair, and a photograph of a woman on the desk. In the drawer: twelve cheque stubs, each for five thousand pounds, each made out to M. QUINN CONSULTING.',
              'A letter from Marla, dated last month: <b>“Leonard — the connection is weakening. The other side requires more. Six thousand from now on, or I cannot guarantee your wife will still come through.”</b>',
              'His diary for Friday: <b>“21:00 — Marla. Ask about the hospital. Ask why she said ‘you were not to blame’.”</b>'
            ],
            gives: ['ash-cheque', 'ash-letter', 'ash-diary'],
            hint: 'The judge was being squeezed. The letter shows it in Marla’s own words.'
          }
        ]
      },
      {
        id: 'manager', name: 'Julian Rooke’s office', short: 'Manager’s office', time: '10:30',
        art: { kind: 'office' },
        requires: ['corridor-photo'],
        intro: 'A glass office off reception with a view of the lobby and a desk with nothing on it but a laptop and a hotel-branded pen. Julian Rooke is in his shirtsleeves, arranging a seating plan for a wedding that may not happen.',
        actions: [
          { id: 'julian', label: 'Interview Julian Rooke', icon: 'user', suspect: 'julian',
            desc: 'Hotel manager · master key holder',
            hint: 'Julian had a master key and a reason to use it. Ask him about the deposits.'
          },
          { id: 'accounts', label: 'Check the events accounts', icon: 'ledger',
            desc: 'Deposits, refunds, and a second ledger',
            requires: ['blackmail-ledger'],
            text: [
              'The hotel’s events accounts show twenty-two deposits taken for cancelled weddings, each refunded at eighty per cent to a different account. The account number matches a private savings account in Julian Rooke’s name.',
              'A second ledger, handwritten, sits under the laptop. It totals the skim at £46,000 over two years. The last page has a note in Marla’s hand: <b>“10% or I tell the board. You have until Friday.”</b>',
              'Julian’s own note beneath it: <b>“She will not stop. She never stops.”</b>'
            ],
            gives: ['skim-ledger', 'julian-note'],
            hint: 'The manager had a secret and Marla knew it. The second ledger is his.'
          }
        ]
      }
    ],
    puzzles: {
      cipher: {
        type: 'cipher', title: 'The Appointment Note', subtitle: 'A Caesar wheel and a hidden instruction', icon: 'lock',
        plain: 'THE TRUMPET HOLDS A SECRET', shift: 4,
        prompt: 'The back of the appointment book holds a line of nonsense in Marla’s hand. It is not a client note. It is a reminder to herself.',
        note: 'Turn the wheel until the words resolve. The answer is the message, not the shift.',
        placeholder: 'Type the decoded message…',
        answer: ['the trumpet holds a secret', 'trumpet holds a secret'],
        wrong: 'The words are still scrambled. Try another shift and read the first word aloud.',
        hintText: 'Shift the wheel four places back. The first word resolves to THE.',
        success: 'The line resolves: <b>THE TRUMPET HOLDS A SECRET.</b> Marla was not sentimental about her props. She used the Green Room trumpet to store her private recordings.',
        successTitle: 'The note points at the trumpet.',
        gives: ['cipher-note'], flags: ['cipherSolved'],
        short: 'The trumpet hides the recordings.',
        log: 'A coded note in Marla’s appointment book reads “THE TRUMPET HOLDS A SECRET” — a reminder about her hidden recorder.'
      },
      box: {
        type: 'dial', title: 'The Other Side Cash Box', subtitle: 'Three wheels · hour, tens, minutes', icon: 'lockbox',
        code: [3, 4, 7], labels: ['HOUR', 'MIN TENS', 'MIN UNITS'],
        prompt: 'A cheap three-wheel lock on a drawer labelled “THE OTHER SIDE”. Marla used the same combination for everything. <span style="color:var(--dim)">Her diary calls it “the hour of the first contact”.</span>',
        hintText: 'The first contact came at 3:47 a.m. Set the wheels to 3, 4, 7.',
        successTitle: 'The drawer opens.',
        success: 'Inside: a bundle of microcassettes, a client file for every name in the ledger, and a cash box containing £14,000. The recordings are labelled by client and date.',
        gives: ['blackmail-recordings', 'client-files'], flags: ['boxOpen'],
        short: 'The blackmail archive is open.',
        log: 'Marla’s locked drawer holds microcassettes of private sessions and a file on every client she was blackmailing.'
      },
      tape: {
        type: 'repair', title: 'The Reel-to-Reel', subtitle: 'Repair the old deck', icon: 'tool',
        prompt: 'The cassette from the trumpet needs a deck. There is a 1970s reel-to-reel in the wings, dusty but complete. Four connections are loose.',
        note: 'Match each component to its correct lead. The labels on the deck are worn but readable.',
        pairs: [
          { l: 'REEL MOTOR', r: 'DRIVE BELT', color: '#a855f7' },
          { l: 'CAPSTAN', r: 'TAPE GUIDE', color: '#67e8f9' },
          { l: 'PLAYBACK HEAD', r: 'PRE-AMP', color: '#fbbf24' },
          { l: 'SPEAKER', r: 'OUTPUT JACK', color: '#34d399' }
        ],
        hintText: 'Motor drives the belt. Capstan guides the tape. The head feeds the pre-amp. The speaker takes the output.',
        success: 'The deck spins up with a click and a hiss. The cassette plays. Marla’s voice fills the wings, warm and certain, telling a grieving man that his wife is proud of him.',
        successTitle: 'The dead speak again.',
        gives: ['session-tape'], flags: ['tapeFixed'],
        short: 'The hidden cassette can be played.',
        log: 'The reel-to-reel is repaired and the hidden cassette plays: a private session in which Marla feeds a client “spirit messages” from research notes.'
      },
      corridorcam: {
        type: 'photo', title: 'Service Corridor Camera', subtitle: 'Enhance the 21:34 still', icon: 'cctv',
        scene: { kind: 'interior' },
        target: { x: 57, y: 48, w: 18, h: 30 }, range: [54, 74],
        question: 'Who is outside the Green Room door at 21:34?',
        options: [
          { t: 'A night porter with a room-service tray', v: 'porter' },
          { t: 'Esme Vale, carrying the research folder', v: 'esme' },
          { t: 'Leonard Ash, still in his coat', v: 'ash' },
          { t: 'An empty corridor with a linen cart', v: 'empty' }
        ],
        answer: 'porter',
        reveal: 'The figure resolves: a night porter in a white jacket, holding a tray with a teapot and a single cup. He sets the tray on the floor outside the door and walks away. The tray is still there at midnight, untouched.',
        wrong: 'The figure is at the door, not in the corridor. Slide into the clear band and look at the uniform.',
        hintText: 'The clear band is 54% to 74%. Look for a hotel uniform, not a guest.',
        success: 'The still shows a night porter leaving a tray outside the Green Room at 21:34. The tray was a decoy — and the porter’s keycard was not used on the door.',
        successTitle: 'The tray was a decoy.',
        gives: ['corridor-photo'], flags: ['camDone'],
        short: 'A porter left a tray at 21:34 — but did not enter.',
        log: 'The corridor camera shows a night porter leaving an untouched tray outside the Green Room at 21:34. The door was opened separately with a master key.'
      },
      'marla-pc': {
        type: 'terminal', title: 'Marla’s Laptop', subtitle: 'The business behind the spirits', icon: 'terminal',
        user: 'marla', host: 'quinn-consulting', password: 'quinn',
        intro: 'Connection established. The desktop is a photograph of a theatre curtain. Type "help" for commands.',
        banner: 'QUINN CONSULTING — CLIENT ACCOUNTS. 3 FILES. 1 HIDDEN FOLDER.',
        files: [
          { name: 'clients.csv', body: '<span class="d">CLIENT — CODE — MONTHLY</span><br>L. ASH — “JUDGE” — £6,000<br>J. ROOKE — “MANAGER” — £2,000<br>E. VALE — “MOTHER” — <span class="y">£0 (asset retained)</span><br><span class="r">Note: E.V. is not a client. E.V. is staff. Keep the voice file.</span>' },
          { name: 'schedule.txt', body: 'FRI 21:00 — L. ASH — Green Room<br>FRI 21:30 — clear room — Esme<br><span class="d">Sat 10:00 — board meeting — Julian to pay or else</span>' },
          { name: 'valerie.enc', locked: true, secret: true, hint: 'Voice archive. Account password required.', body: '<span class="y">VOICE FILE — V. VALE — SESSION 14</span><br><br>“Marla, is that you? Is my husband there? Is he waiting?”<br><br><span class="d">Marla’s note: “Keep this one. The daughter pays attention. Use the mother’s voice if the daughter becomes difficult.”</span><br><br><span class="r">File accessed 19:42 Friday — user E.VALE.</span>' }
        ],
        hintText: 'Marla’s stage name came from a song about a girl called Marla. Try QUINN.',
        success: 'The hidden folder opens. Marla kept a voice file of Esme’s dead mother, recorded during a session, with a note about using it if Esme “becomes difficult”. The file was accessed at 19:42 on Friday — by Esme.',
        successTitle: 'The mother’s voice was an asset.',
        gives: ['voice-file', 'marla-files'], flags: ['pcOpen'],
        short: 'Marla kept Esme’s mother’s voice as leverage.',
        log: 'Marla’s laptop contains a voice file of Valerie Vale, Esme’s dead mother, with a note about using it against Esme. Esme accessed the file at 19:42 on Friday.'
      },
      last: {
        type: 'audio', title: 'The Hidden Recorder', subtitle: '00:41:12 — what the trumpet heard', icon: 'audio',
        prompt: 'The cassette from the Green Room trumpet was still running when Marla died. The first forty minutes are a private reading. The last two are something else.',
        pattern: [220, 0, 220, 330, 440, 0, 330, 220],
        tempo: 0.42,
        waveform: 'A man’s voice, then Marla’s, then a long silence. At 00:39:10 a door opens. At 00:39:40 a woman’s voice speaks very quietly, close to the microphone. At 00:40:55 the same voice says, “I’m sorry, Mum.”',
        options: [
          { t: 'Esme Vale, speaking to her dead mother after the poison takes effect', v: 'esme' },
          { t: 'A radio broadcast bleeding into the recording', v: 'radio' },
          { t: 'Leonard Ash, returning to the room to confront Marla', v: 'ash' },
          { t: 'Julian Rooke, using his master key to check the room', v: 'julian' }
        ],
        answer: 'esme',
        wrong: 'Listen past the hiss. The man’s voice belongs to the reading. The quiet woman’s voice comes later, when the door opens.',
        hintText: 'The last voice is a woman’s. She is not performing. She is talking to someone who is not there.',
        success: 'You isolate the final minute. A door. Footsteps. A woman breathing fast. Then Esme Vale’s voice, stripped of the stage accent she uses for clients: <i>“You kept her voice in a trumpet. You kept my mother in a drawer.”</i> A pause. <i>“I’m sorry, Mum.”</i>',
        successTitle: 'The trumpet heard everything.',
        gives: ['murder-audio'], flags: ['audioDone'],
        short: 'Esme’s voice is on the final recording.',
        log: 'The hidden recorder captured the murder: Esme confronting Marla about her mother’s voice file, then saying “I’m sorry, Mum.”'
      }
    },
    suspects: [
      {
        id: 'esme', name: 'Esme Vale', role: 'Assistant · research and cues', location: 'esme', locationName: 'Her bedsit', tag: 'Prime suspect',
        portrait: { seed: 'esme-vale', hair: 'bob', hairColor: '#2b1a12', skin: 1, expression: 'wary', collar: 'shirt', eyes: '#3a2159' },
        intro: 'Twenty-nine, quiet, with the careful stillness of someone who has spent years being invisible in a room. She found the body. She also knows exactly how every trick worked, because she built most of them.',
        questions: [
          { q: 'Where were you between 21:30 and 22:00?', requires: ['keycard-log'],
            a: '“On stage. Clearing the set for tomorrow.” She does not look away. “The stage manager saw me. The keycard log will show my card at the service door at 21:53, I know. I went to check the corridor because the tray was still outside.”', 
            gives: ['esme-alibi'], flags: ['esmeHostile'] },
          { q: 'Your mother was one of Marla’s clients.', requires: ['mother-photo'], present: true,
            a: 'Her face does not move, which is how you know. “Valerie Vale. She paid Marla eleven thousand pounds to talk to my father. She borrowed against the house. She died six years ago, believing he was waiting for her.” A pause. “I needed the job. I needed to see how she did it.”',
            gives: ['esme-mother-link'] },
          { q: 'Marla kept a recording of your mother’s voice. You accessed the file at 19:42.', requires: ['voice-file'], present: true,
            a: '“I wanted to delete it.” Her voice is very even. “She used it on me. In a session. She played my mother’s voice and told me she could arrange a meeting. She was laughing when I left.” She looks at her hands. “I did not poison her at 19:42. I was on stage at 21:30.”',
            gives: ['esme-admission'], flags: ['esmeBroke'] },
          { q: 'The hidden recorder caught your voice at 21:40.', requires: ['murder-audio'], present: true,
            a: 'She closes her eyes. “I went back for the file. She was already ill — I thought she was having a turn. I held her hand.” A long silence. “I did not put anything in her pastilles. I swear to God. I wanted her to live long enough to be arrested.”',
            gives: ['esme-denial'], flags: ['esmeBroke'] },
          { q: 'You bought aconite from Bellweather Chemist at 18:05.', requires: ['pharmacy-bag'], present: true,
            a: '“For the garden.” She almost smiles. “That is what I told the chemist. I have a garden the size of a bath mat.” She looks up. “You have a receipt with no name on it and a glove with green paste. That is not a confession.”',
            gives: ['esme-purchase'] }
        ],
        after: 'She asks whether the recordings will be destroyed. You tell her they are evidence. She nods, as if she expected that too.'
      },
      {
        id: 'leonard', name: 'Leonard Ash', role: 'Retired judge · client L.A.', location: 'ash', locationName: 'His house', tag: 'Suspect',
        portrait: { seed: 'leonard-ash', hair: 'short', hairColor: '#8d8d99', skin: 0, expression: 'sad', collar: 'suit', glasses: 'round', age: 'old' },
        intro: 'Sixty-one, upright, with the manners of a man who has spent his life being listened to. He holds a photograph of his wife and does not put it down. “She came through,” he says. “Marla made her come through.”',
        questions: [
          { q: 'What happened at the reading on Friday?', requires: ['appt-book'],
            a: '“The same as always. The lights. The trumpet. My Eleanor’s voice.” He looks at the photograph. “She said, ‘You were not to blame.’ She said it twice. I asked Marla what she meant. Marla said the other side does not explain itself.”',
            gives: ['leonard-reading'] },
          { q: 'You were paying her six thousand pounds a month.', requires: ['blackmail-ledger'], present: true,
            a: '“For the connection.” He says it without shame. “It is not blackmail if you pay willingly.” A pause. “She raised it last month. She said the connection was weakening. I would have paid anything. I did not kill her.”',
            gives: ['leonard-payment'] },
          { q: 'The “spirit voice” was a recording fed through a speaker.', requires: ['earpiece-rig'], present: true,
            a: 'The photograph trembles in his hand. “No.” He says it once, then again, quieter. “No. I heard her. She knew things. She knew about the hospital. She knew what Eleanor said when I came home late.” He sits down. “Marla could not have known that. Only Eleanor knew that.”',
            gives: ['leonard-denial'] },
          { q: 'Where were you at half past nine?', requires: ['corridor-photo'],
            a: '“In the lobby, waiting for my car. The doorman spoke to me. I was there for twenty minutes.” He looks at you. “I did not go back to that room. I could not have borne it.”',
            gives: ['ash-alibi'] }
        ],
        after: 'He asks whether Marla suffered. You tell him it was quick. He nods, and does not look relieved.'
      },
      {
        id: 'julian', name: 'Julian Rooke', role: 'Hotel manager · master key holder', location: 'manager', locationName: 'His office', tag: 'Suspect',
        portrait: { seed: 'julian-rooke', hair: 'short', hairColor: '#5b3a22', skin: 0, expression: 'smug', collar: 'suit', beard: 'goatee' },
        intro: 'Forty-four, polished, with a handshake he has practised. He has already prepared a statement about the hotel’s duty of care. He has not prepared for you to ask about the wedding deposits.',
        questions: [
          { q: 'Your master key opened the Green Room at 21:36.', requires: ['keycard-log'], present: true,
            a: '“The night porter uses the master key for room service. It is hotel policy.” He straightens his cuff. “I was in my office. The system logs the key, not the man carrying it.”',
            gives: ['julian-key'] },
          { q: 'Marla was demanding ten per cent of the deposits you skimmed.', requires: ['skim-ledger'], present: true,
            a: 'The polish slips for half a second. “That is a hotel accounting matter.” He recovers. “Marla Quinn was a guest with a vivid imagination. If she made accusations, they were not true.”',
            gives: ['julian-skim'], flags: ['julianHostile'] },
          { q: 'You sent a tray to the Green Room at 21:34.', requires: ['corridor-photo'], present: true,
            a: '“A complimentary tea service. She was a long-standing guest.” He smiles. “You can see the porter on the camera. He does not enter. He leaves the tray. That is service.”',
            gives: ['julian-tray'] },
          { q: 'Who else had a master key that night?', requires: ['keycard-log'],
            a: '“The duty manager. The night porter. Housekeeping.” He counts them on his fingers. “And the assistant had a green-room key. She was in and out all evening. If I were you, I would look at the person who found the body.”',
            gives: ['julian-deflect'] }
        ],
        after: 'He offers you a discount on a future stay. You decline.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Marla Quinn — post-mortem note', caption: 'Aconite · pastilles · 21:30–21:50', icon: 'blood', type: 'Forensic report',
        desc: 'Aconite poisoning, rapid onset, absorbed through the mouth. No defensive wounds. Time of death between 21:30 and 21:50.',
        tells: 'She took the poison willingly, in something she used every night. The killer knew her routine.'
      },
      'pastille-tin': {
        name: 'Open pastille tin', caption: 'Six left · pale green · hand-rolled', icon: 'pill', type: 'Physical evidence',
        desc: 'Marla’s throat pastille tin, open on the chaise. The remaining pastilles are pale green and smell of anise. One is missing.',
        tells: 'The poison was in the pastilles, not the tea. Someone had access to the tin.'
      },
      'earpiece': {
        name: 'Hidden earpiece', caption: 'Flesh-coloured receiver · still on', icon: 'wire', type: 'Device',
        desc: 'A radio receiver fitted to Marla’s ear, connected to a battery pack taped to her ribs. It was still switched on when she died.',
        tells: 'Marla was being fed information during readings. The “spirits” had a microphone.'
      },
      'appt-book': {
        name: 'Appointment book', caption: '21:00 — L. ASH — Green Room', icon: 'note', type: 'Record',
        desc: 'Marla’s appointments for the week. A private reading with L. Ash at 21:00, followed by a “clearing” slot at 21:30.',
        tells: 'Leonard Ash was the last client. Marla was alone with him until half past nine.'
      },
      'client-list': {
        name: 'Typed client list', caption: 'Three names · monthly figures', icon: 'ledger', type: 'Financial record',
        desc: 'A typed list of clients with monthly payments beside each name: JUDGE £6,000, MANAGER £2,000, MOTHER £0 (asset retained).',
        tells: 'Marla was running a blackmail operation with three targets — and one “asset” who was not a client at all.'
      },
      'cipher-note': {
        name: 'Decoded appointment note', caption: '“THE TRUMPET HOLDS A SECRET”', icon: 'lock', type: 'Puzzle solution',
        desc: 'A Caesar-shifted line at the back of the appointment book, decoding to a reminder about the spirit trumpet.',
        tells: 'Marla hid something inside her own prop.'
      },
      'earpiece-rig': {
        name: 'Spirit trumpet rig', caption: 'Speaker · receiver · retractable boom', icon: 'wire', type: 'Device',
        desc: 'The stage trumpet contains a small speaker and a radio receiver. It does not float. It plays whatever is transmitted to it.',
        tells: 'Every “spirit voice” was a recording or a live feed. The dead never spoke.'
      },
      'cue-sheet': {
        name: 'Cue sheet', caption: 'Client initials · dead relatives · phrases', icon: 'note', type: 'Document',
        desc: 'A cue sheet listing clients by initial, the name of their dead relative, and the phrase to play at the emotional peak.',
        tells: 'The readings were scripted. Marla knew exactly which wound to press.'
      },
      'hidden-recorder': {
        name: 'Hidden microcassette recorder', caption: 'Voice-activated · still running', icon: 'audio', type: 'Device',
        desc: 'A microcassette recorder hidden inside the Green Room trumpet, labelled “ASH — FINAL — DO NOT COPY”. It recorded for forty-one minutes.',
        tells: 'Marla recorded her sessions. The tape may contain more than a reading.'
      },
      'session-tape': {
        name: 'Private session recording', caption: 'Marla feeding a client “spirit messages”', icon: 'audio', type: 'Audio evidence',
        desc: 'The hidden cassette, played on the repaired deck. Marla’s voice, warm and certain, telling Leonard Ash that his wife is proud of him.',
        tells: 'The recordings were both evidence and leverage. Marla kept them to control her clients.'
      },
      'assist-chair': {
        name: 'Assistant’s headset', caption: 'Wings · boom mic · transmitter', icon: 'audio', type: 'Device',
        desc: 'A headset with a boom microphone connected to a small transmitter, found on a folding chair in the wings.',
        tells: 'This is where the research was fed to Marla during readings. Esme sat here.'
      },
      'research-sheet': {
        name: 'Client research sheet', caption: '“Use the hospital. He still cries.”', icon: 'note', type: 'Document',
        desc: 'A printed sheet of research on Leonard Ash, annotated in two hands: Marla’s instructions and Esme’s refusal.',
        tells: 'Esme knew the trick intimately — and she was beginning to resist it.'
      },
      'blackmail-ledger': {
        name: 'Blackmail ledger', caption: 'Three clients · monthly cash', icon: 'ledger', type: 'Financial record',
        desc: 'A black ledger recording monthly payments from JUDGE, MANAGER and MOTHER, with marginal notes about increasing the pressure.',
        tells: 'Marla was extracting money from at least three people. Any of them had a reason to want her gone.'
      },
      'bank-slips': {
        name: 'Cash deposit slips', caption: '£5,000 · first of every month', icon: 'money', type: 'Financial record',
        desc: 'Paying-in slips for cash deposits of five thousand pounds, dated the first of each month.',
        tells: 'The blackmail income was regular and documented. This was a business, not a one-off.'
      },
      'mother-photo': {
        name: 'Photograph of Valerie Vale', caption: '“E.V.’s mother — session 14”', icon: 'photo', type: 'Personal item',
        desc: 'A photograph of Esme’s mother, kept under Marla’s blotter with a note: “voice only. Keep.”',
        tells: 'Marla kept Esme’s mother as an asset — and Esme knew it.'
      },
      'blackmail-recordings': {
        name: 'Microcassette archive', caption: 'A tape for every client', icon: 'audio', type: 'Audio evidence',
        desc: 'A bundle of microcassettes from the “Other Side” drawer, labelled by client and date. Each contains a private session.',
        tells: 'Marla recorded every session. The archive is the full extent of her leverage.'
      },
      'client-files': {
        name: 'Client files', caption: 'Secrets, payments, and threats', icon: 'letter', type: 'Document',
        desc: 'A file for each client containing their secret, their payment history, and the phrase Marla used to keep them paying.',
        tells: 'The motive is not a single secret. It is a system of control.'
      },
      'voice-file': {
        name: 'Valerie Vale voice file', caption: '“Is my husband there?”', icon: 'audio', type: 'Digital evidence',
        desc: 'A digital recording of Esme’s mother during a session, kept on Marla’s laptop with a note about using it if Esme “becomes difficult”.',
        tells: 'Marla was prepared to use Esme’s dead mother against her. Esme accessed the file hours before the murder.'
      },
      'marla-files': {
        name: 'Marla’s client accounts', caption: 'JUDGE · MANAGER · MOTHER', icon: 'laptop', type: 'Digital evidence',
        desc: 'A spreadsheet of clients and payments, including a note that E. VALE is “staff” and her mother’s voice is an asset.',
        tells: 'Esme was not a client. She was leverage — and she knew it.'
      },
      'corridor-photo': {
        name: 'Corridor still, 21:34', caption: 'Night porter · untouched tray', icon: 'cctv', type: 'Surveillance',
        desc: 'An enhanced image of a night porter leaving a room-service tray outside the Green Room and walking away. The tray was never collected.',
        tells: 'The tray was a decoy. The door was opened separately with a master key.'
      },
      'pharmacy-bag': {
        name: 'Pharmacy bag and receipt', caption: 'Aconite tincture · paid cash · 18:05', icon: 'receipt', type: 'Physical evidence',
        desc: 'A paper bag from Bellweather Chemist containing a receipt for aconite tincture, sold “for garden pests”, paid in cash.',
        tells: 'The poison was bought locally, hours before the murder, by someone who gave the hotel as their address.'
      },
      'pastille-wrapper': {
        name: 'Torn pastille wrapper', caption: 'Green paste · service bin', icon: 'receipt', type: 'Trace evidence',
        desc: 'A torn wrapper from the same brand as Marla’s pastilles, found in the service corridor bin with traces of green paste.',
        tells: 'The pastilles were prepared or handled in the service corridor, away from the dressing room.'
      },
      'glove': {
        name: 'Single nitrile glove', caption: 'Green paste on the thumb', icon: 'mask', type: 'Physical evidence',
        desc: 'A black nitrile glove with a smear of green paste on the thumb, found in the service bin with the pharmacy bag.',
        tells: 'The killer handled the poisoned pastilles with a glove and disposed of it in the hotel’s own bin.'
      },
      'keycard-log': {
        name: 'Keycard access log', caption: '21:36 master key · 21:53 Esme', icon: 'id', type: 'Access record',
        desc: 'The Green Room door was opened at 21:07 by Marla, at 21:36 by a master key, and at 21:53 by Esme Vale’s card from the service side.',
        tells: 'Two people entered the room after Marla. One had a master key; one claimed to be on stage.'
      },
      'esme-mother': {
        name: 'Photograph of Esme and her mother', caption: 'Taped inside the wardrobe', icon: 'photo', type: 'Personal item',
        desc: 'A childhood photograph of Esme with Valerie Vale, taped inside the wardrobe door of her bedsit.',
        tells: 'Esme’s bedsit is a shrine to the woman Marla exploited. This is personal.'
      },
      'esme-notebook': {
        name: 'Esme’s notebook', caption: 'Eleven thousand pounds · “She believed her.”', icon: 'note', type: 'Personal record',
        desc: 'A notebook recording every payment Valerie Vale made to Marla, ending with a furious entry about her mother’s belief.',
        tells: 'Esme had been documenting the exploitation for years. She had motive and preparation.'
      },
      'cuttings': {
        name: 'Newspaper cuttings', caption: '“Coroner warns of exploitation”', icon: 'news', type: 'Personal item',
        desc: 'A wall of cuttings about the inquest into Valerie Vale’s death and the “psychic” payments that preceded it.',
        tells: 'Valerie’s death was linked publicly to Marla. Esme grew up with the consequences.'
      },
      'ash-cheque': {
        name: 'Twelve cheque stubs', caption: '£5,000 each · M. Quinn Consulting', icon: 'money', type: 'Financial record',
        desc: 'Twelve cheque stubs from Leonard Ash to Marla Quinn, each for five thousand pounds, dated monthly.',
        tells: 'Leonard was a long-term paying client. The payments are a motive only if he wanted them to stop.'
      },
      'ash-letter': {
        name: 'Marla’s demand letter', caption: '“Six thousand from now on.”', icon: 'letter', type: 'Document',
        desc: 'A letter from Marla to Leonard, raising his monthly payment and threatening to break the “connection” with his wife.',
        tells: 'Marla was squeezing him harder. He had a reason to be desperate — but not necessarily violent.'
      },
      'ash-diary': {
        name: 'Leonard’s diary', caption: '“Ask why she said ‘you were not to blame’.”', icon: 'note', type: 'Personal record',
        desc: 'An entry for Friday: Leonard planned to ask Marla why his wife’s message insisted he was not to blame.',
        tells: 'Leonard was beginning to doubt the performance. He was asking better questions.'
      },
      'skim-ledger': {
        name: 'Handwritten skim ledger', caption: '£46,000 over two years', icon: 'ledger', type: 'Financial record',
        desc: 'A private ledger recording £46,000 in diverted wedding deposits, with a note from Marla demanding ten per cent.',
        tells: 'Julian had a secret worth killing for, and Marla knew it.'
      },
      'julian-note': {
        name: 'Julian’s note', caption: '“She will not stop. She never stops.”', icon: 'note', type: 'Handwritten note',
        desc: 'A note in Julian Rooke’s handwriting beneath the skim ledger, written after Marla’s demand.',
        tells: 'Julian had reached the end of his patience. He had the master key and the opportunity.'
      },
      'murder-audio': {
        name: 'Final recording', caption: '“You kept my mother in a drawer.”', icon: 'audio', type: 'Audio evidence',
        desc: 'The last minute of the hidden cassette: a door, footsteps, and Esme Vale’s voice confronting Marla about her mother’s voice file.',
        tells: 'Esme was in the room when Marla died. Her own words place her there.'
      },
      'esme-alibi': {
        name: 'Esme’s alibi', caption: '“On stage until ten.”', icon: 'audio', type: 'Statement',
        desc: 'Esme claims she was clearing the stage until ten and only went to the corridor at 21:53 to check the tray.',
        tells: 'The stage is connected to the service corridor by a wing door. The alibi is not as tight as it sounds.'
      },
      'esme-mother-link': {
        name: 'Esme on her mother', caption: '“She believed her right to the end.”', icon: 'audio', type: 'Interview',
        desc: 'Esme admits her mother was one of Marla’s clients and that she took the job to understand how the trick worked.',
        tells: 'Esme had a deep, long-standing motive. She also had the skills to poison a pastille.'
      },
      'esme-admission': {
        name: 'Esme on the voice file', caption: '“She used it on me.”', icon: 'note', type: 'Statement',
        desc: 'Esme admits accessing her mother’s voice file at 19:42 and says Marla played it during a session to torment her.',
        tells: 'Esme had confronted Marla about the recording — and Marla had laughed.'
      },
      'esme-denial': {
        name: 'Esme’s denial', caption: '“I wanted her arrested.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the final recording, Esme insists she went back for the file and found Marla already dying.',
        tells: 'She admits being in the room. She denies the poison.'
      },
      'esme-purchase': {
        name: 'Esme on the aconite', caption: '“For the garden.”', icon: 'note', type: 'Statement',
        desc: 'Esme claims the aconite was for garden pests and that the pharmacy receipt has no name on it.',
        tells: 'The receipt may not carry her name, but the glove and the pastille wrapper connect her to the poison.'
      },
      'leonard-reading': {
        name: 'Leonard’s account of the reading', caption: '“She said, ‘You were not to blame.’”', icon: 'note', type: 'Witness statement',
        desc: 'Leonard describes the reading: the lights, the trumpet, his wife’s voice saying he was not to blame.',
        tells: 'Marla used a phrase that only his wife knew. That phrase had to come from research, not spirits.'
      },
      'leonard-payment': {
        name: 'Leonard on the payments', caption: '“Not blackmail if you pay willingly.”', icon: 'audio', type: 'Statement',
        desc: 'Leonard admits paying six thousand pounds a month for the “connection” and says he would have paid anything.',
        tells: 'He was a victim of the fraud, not its author.'
      },
      'leonard-denial': {
        name: 'Leonard’s disbelief', caption: '“Only Eleanor knew that.”', icon: 'audio', type: 'Statement',
        desc: 'Told the spirit voice was a recording, Leonard insists Marla could not have known the things she said.',
        tells: 'The information came from research — or from someone who had access to his wife’s hospital records.'
      },
      'ash-alibi': {
        name: 'Leonard’s alibi', caption: 'Lobby · doorman · 21:30–21:55', icon: 'receipt', type: 'Alibi',
        desc: 'Leonard was in the lobby waiting for his car from 21:30 until 21:55. The doorman confirms it.',
        tells: 'Leonard left before the poison took effect. He is not the killer.'
      },
      'julian-key': {
        name: 'Julian on the master key', caption: '“It logs the key, not the man.”', icon: 'audio', type: 'Statement',
        desc: 'Julian admits the master key was used but says the night porter carries it for room service.',
        tells: 'The master key could have been used by anyone with access to the porter’s station.'
      },
      'julian-skim': {
        name: 'Julian on the deposits', caption: '“A hotel accounting matter.”', icon: 'note', type: 'Statement',
        desc: 'Confronted with the skim ledger, Julian dismisses it as an internal accounting issue and denies Marla’s accusations.',
        tells: 'He had £46,000 and his career to lose. The motive is real.'
      },
      'julian-tray': {
        name: 'Julian on the tray', caption: '“A complimentary tea service.”', icon: 'note', type: 'Statement',
        desc: 'Julian confirms he ordered a tea service to the Green Room at 21:34 and points out that the porter did not enter.',
        tells: 'The tray was hotel business as usual. It does not explain the master-key entry at 21:36.'
      },
      'julian-deflect': {
        name: 'Julian’s deflection', caption: '“Look at the person who found the body.”', icon: 'audio', type: 'Statement',
        desc: 'Julian suggests the investigation should focus on Esme, who had a key and was in and out all evening.',
        tells: 'He is trying to move the case away from his own master key and his own ledger.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Marla Quinn?', 
          options: [
            { t: 'Leonard Ash — the client she was blackmailing', v: 'leonard' },
            { t: 'Julian Rooke — the manager whose theft she discovered', v: 'julian' },
            { t: 'Esme Vale — the assistant whose mother she destroyed', v: 'esme' },
            { t: 'A hotel guest who believed the spirits were real', v: 'guest' }
          ], answer: 'esme' },
        { q: 'How was Marla killed?', 
          options: [
            { t: 'Aconite was worked into her throat pastilles, which she took during the reading', v: 'pastilles' },
            { t: 'The tea tray was laced with poison and left outside her door', v: 'tea' },
            { t: 'She was smothered with a cushion during the reading', v: 'smother' },
            { t: 'The spirit trumpet was rigged to deliver an electric shock', v: 'shock' }
          ], answer: 'pastilles' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Marla kept a recording of Esme’s dead mother and used it to control her', v: 'mother' },
            { t: 'Marla was going to name Julian in the hotel theft investigation', v: 'theft' },
            { t: 'Marla was going to expose Leonard’s affair with his wife’s nurse', v: 'affair' },
            { t: 'Esme was going to inherit the consultancy and the recordings', v: 'inheritance' }
          ], answer: 'mother' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The final recording of Esme’s voice and the keycard log placing her at the door', v: 'audio' },
            { t: 'The pharmacy receipt for aconite', v: 'receipt' },
            { t: 'Julian’s skim ledger and master key', v: 'ledger' },
            { t: 'Leonard’s monthly payments and his wife’s message', v: 'cheque' }
          ], answer: 'audio' }
      ],
      verdict: {
        who: 'Esme Vale, 29 — Marla Quinn’s assistant and researcher',
        whoDesc: 'was arrested at her bedsit and charged with murder. She did not resist. She asked whether the recordings would be destroyed.',
        how: 'She bought aconite tincture in the afternoon, worked it into a fresh batch of Marla’s throat pastilles, and swapped the tin during the twenty minutes she was supposed to be clearing the stage.',
        why: 'Marla had recorded Esme’s mother during a session, used the recording to torment her, and kept it as leverage. Esme killed her to stop the voice — and to make sure it could never be used again.',
        key: 'The hidden recorder inside the spirit trumpet captured Esme in the room at 21:40, and the keycard log placed her at the service door at 21:53.'
      },
      reveal: [
        'Marla Quinn was not a medium. She was a researcher, a reader of faces, and a very good listener. Esme Vale did the research. She learned the clients’ names, their dead relatives, the hospitals where they died, and the phrases they used when they were happy. Then she sat in the wings with a headset and fed Marla the lines.',
        'It worked because grief wants to believe. Leonard Ash heard his wife say “you were not to blame” and paid six thousand pounds a month to hear it again. Julian Rooke heard nothing at all, but he paid two thousand a month to keep Marla quiet about the wedding deposits. And Valerie Vale, six years earlier, paid eleven thousand pounds to speak to a husband who had been dead for a decade.',
        'Valerie was Esme’s mother. She borrowed against the house. She stopped eating. She told her daughter that her father was waiting for her, and that Marla had said so. She died in a hospital bed with a photograph of him on the pillow. Esme was twenty-three.',
        'Esme took the job to understand the trick. For three years she built the research files, learned the cues, and watched Marla turn grief into income. She told herself she was gathering evidence. She was also, in the way of people who work closely with monsters, becoming useful to one.',
        'On Friday, Marla opened the voice file of Valerie Vale and played it during a session. She told Esme she could arrange a meeting. She laughed when Esme left. At 19:42 Esme opened the file on Marla’s laptop and saw the note: “Use the mother’s voice if the daughter becomes difficult.”',
        'She bought the aconite at 18:05, before the session, before the laughter. That is the detail that makes it murder. She had already decided. The card said “for garden pests”. The chemist did not ask questions. She worked the poison into six pastilles and put them in the tin in the Green Room while Marla was on stage.',
        'At 21:30, Marla took her evening pastille. At 21:34 the tray arrived, a decoy ordered by Julian to cover the master-key entry he had nothing to do with. At 21:40 Marla was already ill. Esme came back through the wing door and found her on the chaise. She held her hand. She said, “You kept her voice in a trumpet. You kept my mother in a drawer.”',
        'Then she said, “I’m sorry, Mum.”',
        'The recorder inside the trumpet was still running. It had been running since before the reading. It captured the whole thing: the door, the footsteps, the breathing, the quiet voice of a woman who had spent three years learning how to sound like other people’s dead.',
        'The case against Julian Rooke collapsed within a day. The master key was a porter’s key, logged but not attributable. The tray was tea. The skim ledger was real, and it would cost him his job and possibly his liberty — but it did not make him a murderer.',
        'Leonard Ash never learned that the voice he paid for was a recording. His family asked that he not be told. He still attends a spiritualist church on Sundays, where a different woman with a different trumpet tells him his wife is proud of him. He says it helps.',
        'Esme Vale pleaded guilty. At sentencing, her counsel read a line from her notebook: <i>“She told Mum that Dad was waiting for her. Mum believed her right to the end.”</i> The judge did not say anything for a long time.'
      ],
      quote: 'She kept my mother in a drawer.',
      twist: 'The final detail was in the trumpet. Marla’s hidden recorder was voice-activated, and it did not stop when she did. It recorded forty minutes of a private reading, then the murder, then eleven minutes of Esme sitting on the floor beside the body, playing her mother’s voice file over and over. The last thing on the tape is Esme saying, “It’s all right, Mum. You can go now.”'
    }
  });
})();
