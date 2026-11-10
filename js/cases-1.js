/* ============================================================
   CASE 01 — THE ACID TANK
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c01', num: 1,
    title: 'The Acid Tank',
    subtitle: 'A missing manager, a body in the vat, and a woman who never sent those messages.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'factory', mood: 'acid' },
    facts: [
      { k: 'Victim', v: 'Michael “Mike” Okafor, 28 — shift manager' },
      { k: 'Scene', v: 'Harrow Acid Works, settling vat 3' },
      { k: 'Found', v: 'Tuesday, 06:12 — by the night crew' },
      { k: 'Missing', v: 'Reported Monday, 21:40 by his mother' }
    ],
    briefing: [
      'The call came in at six in the morning: a man had fallen into settling vat 3 at the Harrow Acid Works. By the time the first officer arrived, there was not much man left. Industrial acid at that concentration does not leave a body. It leaves a smear, a few teeth, and a smell that gets into your clothes and stays there.',
      'The coroner found a clean fracture on the back of the skull. A fall into a vat does not crack a skull like that. Someone hit him first — hard — and then lowered him into the acid to make the evidence disappear.',
      'Outside the plant, in the staff lot, there is a green Rover with its driver door open and rain in the seats. No wallet on the dash. No phone in the door. Just a parking stub and a faint smell of somebody else’s perfume.',
      'A man is missing. An ID is waiting to be found. And somewhere in this city, somebody is sleeping very well for a person who just dissolved a human being.'
    ],
    opening: 'The vat is still warm under the floodlights. The factory hums. Somewhere behind you, a gate clicks in the wind, and you start to wonder how many people walked past that tank before dawn and saw nothing at all.',
    objectives: [
      'Identify the body in the vat and the owner of the abandoned car.',
      'Establish Mike Okafor’s last movements and state of mind.',
      'Crack the phone PIN and recover his messages.',
      'Trace the woman calling herself Bella — and explain why her story does not fit.',
      'Find the person who was pretending to be her.'
    ],
    locations: [
      {
        id: 'works', name: 'Harrow Acid Works', short: 'Acid works',
        time: '07:20', art: { kind: 'factory', mood: 'acid' },
        intro: 'The plant smells of rust and lemon cleaner. Vat 3 sits under a rusted catwalk, its surface skimmed with a thin green film. The foreman keeps saying the same sentence: “Nobody falls in. Nobody.”',
        actions: [
          {
            id: 'vat', label: 'Inspect settling vat 3', icon: 'blood', hotspot: { x: 35, y: 78 },
            desc: 'The acid, the rim, the maintenance rail',
            text: [
              'The vat holds 8,000 litres of spent pickling acid. The surface is a flat, poisonous green. A maintenance rail runs along the lip at hip height — it is intact, bolted, and much too high for a grown man to simply topple over.',
              'The pathologist’s preliminary note is clipped to the rail: <b>“Cranial fracture, posterior. Perimortem. Consistent with a blow from a heavy, blunt instrument. Acid exposure post-mortem or peri-mortem. This was not a fall.”</b>',
              'Under the catwalk you find a steel wrench, wiped but not washed. There is a single hair caught in the jaw of it.'
            ],
            gives: ['vat-report', 'wrench'],
            hint: 'Start with the vat itself — the pathologist left a note on the rail.'
          },
          {
            id: 'car', label: 'Search the abandoned Rover', icon: 'car', hotspot: { x: 72, y: 76 },
            desc: 'Open driver door, wet seats, glovebox',
            text: [
              'The Rover is a 2009 model with 190,000 miles on it and a rosary hanging from the mirror. The driver’s seat is pushed back for a tall man. The ignition is empty. The glovebox holds a parking stub from a diner called Mo’s and a paperback with the corners folded down.',
              'Wedged between the seat and the handbrake is a leather wallet. Inside: forty pounds, a loyalty card, and a staff ID for the Harrow Acid Works. The photo shows a broad-shouldered man with a cautious smile.',
              '<b>MICHAEL OKAFOR — SHIFT MANAGER.</b> The ID has no home address. The car is registered to a leasing company that no longer exists.'
            ],
            gives: ['id-card'],
            hint: 'The car outside is the obvious place to start. Check the glovebox and the seats.'
          },
          {
            id: 'cctv', label: 'Pull the factory CCTV', icon: 'cctv',
            desc: 'Cameras 4 and 6, Monday night',
            requires: ['id-card'],
            text: [
              'The security office is a cupboard with a fan. The overnight guard queues up Monday’s footage and stops it at 02:11.',
              'Camera 6 looks down the service lane. A man in a dark hooded coat walks beside a woman with long dark hair. They are close enough to be holding hands. At the vat-room door, the woman turns. The camera catches her face for less than a second: high cheekbones, a small nose, dark eyes.',
              'The guard scratches his chin. “That’s the girlfriend, then. She’s been here before. Always at night. Never signs in.”',
              'On the screen, the woman’s shoulder is almost exactly level with the man’s. Mike Okafor was five foot eleven. The woman in the footage is tall.'
            ],
            gives: ['cctv-still', 'cctv-height'],
            hint: 'Once you know who the car belongs to, the security office can pull the factory cameras.'
          },
          {
            id: 'phone', label: 'Search the car’s hidden compartment', icon: 'phone', hotspot: { x: 68, y: 70 },
            desc: 'Under the passenger seat, a phone buzzes',
            requires: ['family-statement'],
            text: [
              'His mother said he never went anywhere without his phone. The car was cleaned out — but not well enough. Under the passenger seat, taped to the underside of the rail, is a slim black phone in a cracked case.',
              'The screen lights up with forty-one notifications. It asks for a four-digit PIN.',
              'Clipped to the sun visor above it is a photograph of an older woman in a paper party hat. On the back, in Mike’s careful handwriting: <b>“Mum’s 60th — 07/13. The best day.”</b>',
              'People are predictable with numbers. Especially kind people.'
            ],
            gives: ['phone-found', 'birthday-note'],
            hint: 'The family mentioned something about a birthday. Look at the photo clipped in the car.',
            actionLabel: 'Unlock the phone'
          },
          {
            id: 'unlock', label: 'Crack the four-digit PIN', icon: 'lock', kind: 'puzzle', puzzle: 'phone',
            desc: 'Mike’s phone, forty-one notifications', requires: ['phone-found'], optional: true,
            hint: 'Four digits. Mike was sentimental. The date on the sun-visor photograph is 07/13.'
          },
          {
            id: 'voice', label: 'Play the saved voice memo', icon: 'audio', kind: 'puzzle', puzzle: 'voice',
            desc: 'A recording made forty minutes before he died', requires: ['chats'], optional: true,
            hint: 'There is a voice memo on Mike’s phone, saved beside his last messages.'
          }
        ]
      },
      {
        id: 'okafor', name: 'Okafor family home', short: 'Okafor home',
        time: '09:05', art: { kind: 'house' },
        requires: ['id-card'],
        intro: 'A terrace house with a tidy front garden and a police ribbon on the gate. Inside, the kettle is on and nobody is drinking. Mike’s mother has set out three cups anyway.',
        actions: [
          {
            id: 'mother', label: 'Speak to Mrs Okafor', icon: 'user',
            desc: 'His mother, holding a photograph',
            text: [
              '“He was the gentlest boy,” she says. “He gave his coat to a stranger in November and came home blue. He gave his last twenty pounds to a man outside the station. He told me about everyone he met — the bus driver, the girl at the till, the man who fixed the boiler. Everyone.”',
              'She turns the photograph in her hands. “So why would anyone want to hurt him? And I don’t believe he would hurt himself. He had a list on the fridge. He was going to fix the shed.”',
              'She pauses. “There was a girl. He never said her name. I only knew because he smiled at his phone. He never told me about her — and he told me about everyone.”'
            ],
            gives: ['family-statement'],
            hint: 'The family home is where the victim becomes a person. Start with his mother.'
          },
          {
            id: 'sister', label: 'Speak to his sister, Ada', icon: 'user',
            desc: 'Twenty-six, angry, precise',
            requires: ['family-statement'],
            text: [
              'Ada does not cry. She speaks like she is filing a report. “A week ago he was furious. Properly furious, not his usual quiet sulk. He said someone had been lying to him for months and he was going to end it. I asked who. He said he needed to hear them say it out loud first.”',
              '“I thought it was a girlfriend. He never brought anyone home. He had this one smile when he talked about her — like he was protecting her from us. But he also said he changed all his passwords after the break-in. Everything is Mum’s birthday now. 07/13.”',
              'She looks at you. “If you find her, ask her why he was crying in his car outside our house on Sunday. Ask her that.”'
            ],
            gives: ['sister-statement'],
            hint: 'The sister knows more than the mother. Ask about the week before he died.'
          }
        ]
      },
      {
        id: 'diner', name: "Mo's Diner", short: "Mo's diner",
        time: '11:40', art: { kind: 'diner' },
        requires: ['chats'],
        intro: 'Mo’s is the kind of diner that has never changed the menu and never needed to. A laminated sign says EMPLOYEES MUST WASH HANDS. Someone has added, in marker, “and their secrets.”',
        actions: [
          {
            id: 'manager', label: 'Ask the shift manager about Bella', icon: 'user',
            desc: 'A woman with a lanyard and no patience',
            text: [
              '“Bella Rourke. Barista. Good worker. Quiet. Went home Monday night and hasn’t called in since.” The manager checks a roster. “She and Mike worked opposite shifts. I never saw them talk. Not once. He was shy — really shy. He used to turn red when she said good morning.”',
              'She writes Bella’s address on a napkin. Then she says something that stays with you: “The strange thing is, she asked to switch to nights a few months ago. Same nights he worked. I thought she was avoiding him, but she said she liked the quiet.”',
              '“You’re the second person asking about her this week. Some bloke rang yesterday, said he was her brother. Sounded just like her, actually.”'
            ],
            gives: ['bella-address', 'roster'],
            hint: 'The chats mention a diner. Mo’s is on Mike’s parking stub.'
          }
        ]
      },
      {
        id: 'bella', name: "Bella's house", short: "Bella's",
        time: '13:15', art: { kind: 'house', mood: 'mansion' },
        requires: ['bella-address'],
        intro: 'A small flat above a shuttered shop. Wind chimes. A dead potted plant. Bella Rourke opens the door before you knock and looks at you like she has been expecting this for a long time.',
        actions: [
          {
            id: 'interview', label: 'Interview Bella Rourke', icon: 'user', suspect: 'bella',
            desc: 'Calm, short, and very certain she has never met you',
            hint: 'Bella is home. Ask her about Mike.'
          },
          {
            id: 'warrant', label: 'Execute the search warrant', icon: 'search',
            desc: 'Return with paper and search the flat',
            requiresFlags: ['bellaHostile'],
            text: [
              'Bella stands on the pavement in a coat over her pyjamas, arms folded, while two officers search her flat. She does not shout. That is somehow worse.',
              'Her phone is on the kitchen table. It is unlocked. Its photo gallery is a diary of an ordinary life: lunches, selfies, a cat, a neighbour’s dog. Hundreds of photographs. Not one of them is a photograph that was sent to Mike.',
              'Her messaging apps contain no thread with Mike Okafor. No hidden folder. No deleted archive. There is a group chat with her cousins and a running argument about a wedding. Nothing else.',
              'In the bedroom you find a shoebox of old photographs. One is a birthday party: eight children with sticky name labels on their chests. <b>Arnold. Becca. Ann. Sammy. James. Bella. Stella. Fella.</b>',
              'Stella is the tallest, with Bella’s face but older, harder. And Fella is a boy — a small, serious boy with Bella’s exact eyes.',
              'Then one of the officers calls out from the spare room. There is an old camcorder in a box of dead cables, and it will not switch on.'
            ],
            gives: ['bella-phone', 'height-mismatch', 'birthday-photo'],
            flags: ['knows-stella'],
            hint: 'Bella has refused to answer any more questions. That is enough for a warrant.'
          },
          {
            id: 'camera', label: 'Repair the old camcorder', icon: 'camera', kind: 'puzzle', puzzle: 'camera',
            desc: 'A dead camcorder and a box of cables', requires: ['bella-phone'],
            hint: 'The camcorder has power, video and ground leads. Match the sockets by colour and label.'
          },
          {
            id: 'stream', label: 'Check the livestream that keeps appearing', icon: 'laptop', hotspot: { x: 82, y: 34 },
            desc: 'A face that is almost Bella’s', requires: ['childhood-photo'],
            text: [
              'A clip is circulating on a small streaming app. The face is Bella’s — the same cheekbones, the same nose — but the voice is wrong. Lower. Faster. The laugh is a bark.',
              'The account is called <b>FELLAONLINE</b>. The bio says: “just a guy who looks like someone you know.” Streams on weeknights. Works at a Mo’s Diner — not the one near the acid works, the one on the Northside ring road, forty minutes away.',
              'In the comments, someone asks about the photographs pinned to the wall behind him. They are photographs of Mike Okafor. Mike at a wedding. Mike asleep on a sofa. Mike looking up from a phone, caught in a moment he did not know was being kept.',
              'The streamer smiles at the camera. It is Bella’s smile, on a man’s face, and it does not reach the eyes.'
            ],
            gives: ['streamer-account', 'stream-stills'],
            hint: 'After the birthday photograph, search the streamer accounts for that face.'
          }
        ]
      },
      {
        id: 'northside', name: "Mo's — Northside", short: 'Northside',
        time: '17:30', art: { kind: 'diner' },
        requires: ['streamer-account'],
        intro: 'A newer Mo’s, all chrome and LED menu boards, on the ring road. The staff look tired in the way that only a double shift can make a person tired.',
        actions: [
          {
            id: 'ask', label: 'Ask about the streamer', icon: 'user',
            desc: 'Someone here knows @fellaonline',
            text: [
              'The assistant manager recognises the photograph immediately. “That’s Fella. Fella Rourke. Works fryers, mostly. Night shift. He’s quiet — quieter than you’d think from the videos.”',
              'She checks the rota. “He called in sick today. First time in two years. His address is on the emergency sheet. Flat 4, Bellamy Court.”',
              'She hesitates. “He talks about his sisters a lot. Bella mostly. He says she’s the pretty one. He gets weird about it — like he’s proud and angry at the same time.”',
              'On the wall by the staff door, someone has pinned a staff photograph. Fella stands at the back, half a head taller than everyone else, wearing Bella’s exact smile.'
            ],
            gives: ['northside-job', 'fella-address'],
            flags: ['knows-fella'],
            hint: 'The streamer said where he works. Go and ask the staff.'
          }
        ]
      },
      {
        id: 'fellas', name: "Fella's flat", short: "Fella's",
        time: '19:10', art: { kind: 'interior', variant: 'living' },
        requires: ['fella-address'],
        intro: 'Flat 4, Bellamy Court. The curtains are closed in the middle of the day. A ring light stands in the corner of the living room, next to a shelf of wigs on polystyrene heads. From somewhere inside, a phone is buzzing.',
        actions: [
          {
            id: 'search', label: 'Search the flat', icon: 'search', hotspot: { x: 30, y: 62 },
            desc: 'Wigs, photographs, a locked laptop',
            text: [
              'The flat is spotless and deeply wrong. On the kitchen table: a makeup mirror, a colour-correcting palette, and a printed photograph of Bella Rourke taken from her social media. On the sofa: a long dark wig, cheap but convincing.',
              'In the bedroom, a shoebox of photographs. Mike Okafor at a bus stop. Mike in the diner, through a window. Mike asleep on a sofa that is not in this flat. Each one is dated in the same neat hand.',
              'On the desk is a laptop. The screen asks for a password. The desktop wallpaper is a birthday photograph — the same one from Bella’s shoebox. Beside it, a sticky note reads: <b>“They named us so we would always belong together.”</b>',
              'You know three names from that party. The laptop password is probably one of them.'
            ],
            gives: ['wig', 'fella-photos', 'laptop'],
            hint: 'Fella keeps his life in one room. Search it.'
          },
          {
            id: 'laptop', label: 'Hack Fella’s laptop', icon: 'terminal', kind: 'puzzle', puzzle: 'fella-pc',
            desc: 'A locked machine full of Bella’s face', requires: ['laptop'],
            hint: 'Try the name of the sister Fella could never stop being compared to. Password is one word, no capitals.'
          },
          {
            id: 'confront', label: 'Question Fella Rourke', icon: 'user', suspect: 'fella',
            desc: 'He is sitting outside, waiting for something', requires: ['fella-chats'],
            hint: 'With the chat archive open, it is time to hear him say it.'
          }
        ]
      }
    ],
    puzzles: {
      phone: {
        type: 'keypad', title: 'Mike’s Phone', subtitle: 'Four-digit PIN', icon: 'phone', deviceLabel: 'MIKE’S PHONE', length: 4, code: '0713',
        prompt: 'The phone is locked. Mike was the sort of man who used a date that mattered to him. <span style="color:var(--dim)">Four digits.</span>',
        hintText: 'The photograph on the sun visor is inscribed “Mum’s 60th — 07/13”. A four-digit PIN does not need the year.',
        successTitle: 'Unlocked.',
        success: 'The PIN pad dissolves into his home screen. Forty-one notifications, one saved voice memo, and a conversation with a woman called Bella that should not exist.',
        gives: ['chats'], flags: ['phoneUnlocked'],
        short: 'Mike’s messages are open.',
        log: 'The phone opens. The last conversation on the screen is with “Bella ♥”. The messages are intimate, funny, months long — and according to Bella Rourke, she never sent a single one of them.'
      },
      camera: {
        type: 'repair', title: 'The Dead Camcorder', subtitle: 'Repair the old camera', icon: 'camera',
        prompt: 'The camcorder is dead. Someone cut the leads when they packed it away. Reconnect the sockets by matching the labels.',
        note: 'Left side: the camera’s output block. Right side: the leads from the battery and tape unit. Match colour to colour.',
        pairs: [
          { l: 'POWER', r: 'BATTERY', color: '#f43f5e' },
          { l: 'VIDEO', r: 'TAPE OUT', color: '#a855f7' },
          { l: 'GROUND', r: 'CHASSIS', color: '#fbbf24' }
        ],
        hintText: 'Colour is the tell: red power, violet video, yellow ground. Read the labels, not the cable lengths.',
        success: 'The camcorder whirs, clicks, and spits a strip of old tape into the tray. The screen flickers to life.',
        successTitle: 'Tape spinning.',
        gives: ['camera-video', 'childhood-photo'], flags: ['knows-stella'],
        short: 'The family tape is playing.',
        log: 'The camcorder plays a home video: Bella’s parents in a bright kitchen, laughing. “We’ll name them so they rhyme,” her mother says. “Bella. Stella. And if it’s a boy — Fella.” The tape cuts to the birthday party. Eight children. Two of them look like Bella. One of them is a boy.'
      },
      voice: {
        type: 'audio', title: 'Saved Voice Memo', subtitle: 'Sixteen seconds, recorded at 01:31', icon: 'audio',
        prompt: 'Mike saved one recording before he died. The pitch has been altered. Listen to the rhythm, then decide what you are hearing.',
        pattern: [420, 420, 0, 360, 520, 0, 300, 300],
        tempo: 0.28,
        waveform: 'Two short tones — pause — one rising tone — pause — two falling tones. It reads like a man forcing his voice higher, then letting it drop.',
        options: [
          { t: 'Bella Rourke’s voice, recorded at the diner', v: 'bella' },
          { t: 'A man’s voice, pitched up to sound like a woman', v: 'man' },
          { t: 'A synthetic text-to-speech voice', v: 'synth' },
          { t: 'Two women talking over each other', v: 'two' }
        ],
        answer: 'man',
        wrong: 'Listen again. The pitch is unstable — it cracks downward at the end of a sentence. That is not a recording artifact.',
        hintText: 'A pitch-shifted voice does not only change tone. It changes where the breath falls. The last two tones drop back to a natural male register.',
        success: 'You isolate the final four seconds. Under the raised pitch, the voice drops into a register that is unmistakably male: <i>“You should have just believed I was her, Mike.”</i>',
        successTitle: 'That is not Bella.',
        gives: ['voice-memo', 'voice-transcript'],
        short: 'The voice on the recording is male.',
        log: 'Mike’s final recording contains a male voice under the pitch-shift: “You should have just believed I was her, Mike.”'
      },
      'fella-pc': {
        type: 'terminal', title: 'Fella’s Laptop', subtitle: 'Administrator access', icon: 'terminal',
        user: 'fella', host: 'bellamy-04', password: 'stella',
        intro: 'Connection established. The desktop wallpaper is the birthday photograph. Type "help" for commands.',
        banner: 'WELCOME BACK, FELLA. 4 FILES. 1 ENCRYPTED VOLUME.',
        files: [
          { name: 'readme.txt', body: 'I am not her. I never said I was her. They just believed what they wanted to believe.<br><br>— F' },
          { name: 'photos', body: '<span class="d">3,214 files.</span><br>bella_01.jpg · bella_02.jpg · bella_smile.jpg · bella_at_work.jpg<br><span class="d">Every one uploaded from the same phone. None of them are of Fella.</span>' },
          { name: 'mike', body: '<span class="d">A folder of 96 photographs.</span><br>mike_bus_stop.jpg · mike_asleep.jpg · mike_wedding.jpg · mike_last_night.jpg<br><span class="d">The last file was created Monday, 23:58. Four hours before Mike died.</span>' },
          { name: 'bella_archive.zip', locked: true, hint: 'This file is encrypted. Administrator password required.', secret: true, body: '<span class="g">ARCHIVE CONTENTS:</span><br><br>1. <b>chatlog_0713.txt</b> — 14,802 messages between “Bella” and Mike Okafor, spanning 9 months.<br><br><span class="d">“I think I love you.” — Mike<br>“You don’t know me yet.” — Bella<br>“Then let me meet you.” — Mike<br>“Not yet. I’m not ready for you to see me.” — Bella</span><br><br>2. <b>draft_message.txt</b> — unsent:<br><span class="y">“You should have just believed I was her, Mike.”</span><br><br>3. <b>voice_note_0131.wav</b> — the same recording saved on Mike’s phone.<br><br><span class="r">ACCESS LOGGED. USER: FELLA ROURKE.</span>' }
        ],
        hintText: 'The wallpaper is the birthday photograph. The sticky note says “They named us so we would always belong together.” Try the older sister’s name.',
        success: 'The encrypted volume opens. Fourteen thousand messages, ninety-six photographs of Mike, and one unsent sentence that explains everything.',
        successTitle: 'Archive decrypted.',
        gives: ['fella-chats', 'draft-message', 'fella-archive'], flags: ['fellaCaught'],
        short: 'The fake-Bella archive is open.',
        log: 'Fella’s laptop contains the complete fake-Bella archive: nine months of manufactured intimacy, ninety-six stolen photographs of Mike, and a draft message: “You should have just believed I was her, Mike.”'
      }
    },
    suspects: [
      {
        id: 'bella', name: 'Bella Rourke', role: 'Barista · Mike’s former co-worker', location: 'bella', locationName: "Bella's flat", tag: 'Witness / suspect',
        portrait: { seed: 'bella-main', hair: 'bob', hairColor: '#2b1a12', skin: 1, expression: 'wary', collar: 'apron', eyes: '#3a2159' },
        intro: 'Bella is short — five foot two in her socks — and she does not look away when she says she has never met you before. She has the flat, careful voice of somebody who has been accused of things before.',
        questions: [
          {
            q: 'You worked with Mike Okafor at Mo’s. What was he like?', gives: ['bella-denial'],
            a: '“Quiet. Polite. He used to bring in cakes for people’s birthdays and pretend someone else made them. He never talked to me much. He’d smile — this strange, private smile — and then look at his shoes.” She folds her arms. “I don’t know what he was like outside work. I didn’t know him.”',
            follow: 'She says “I didn’t know him” the way a person says a line they have practiced.'
          },
          {
            q: 'Were you two involved?', requires: ['bella-denial'],
            a: '“No.” Flat. Immediate. “He was shy. He ran away from me. Everyone knew that. If you’re here because someone told you we were together, they were lying.” She looks at you. “Why would I lie about that? He’s dead. I’m not going to pretend I didn’t know him to protect a reputation. I’m telling you: we were nothing.”'
          },
          {
            q: 'These messages came from your account. Explain them.', requires: ['chats'], present: true,
            gives: ['bella-refusal'], flags: ['bellaHostile'],
            a: 'She reads the screen for a long time. Her jaw works. “I have never in my life texted Mike Okafor.” She pushes the phone back across the table. “I don’t care what that says. I don’t care about the timestamps. You can manufacture anything on a screen. I did not send those.”<br><br>“If you’re going to sit there and tell me I was in love with a man I barely spoke to, then you’re not investigating. You’re fitting a story to the first person you can find. I want you to leave.”',
            follow: 'She stands by the door with her arms folded. She does not slam it. She simply waits until you are on the other side of it.'
          },
          {
            q: 'The CCTV shows you walking into the acid works with Mike on Monday night.', requires: ['cctv-still'],
            a: '“That is not me.” She says it quietly, which is somehow worse. “I was at home. Alone. I ordered food at nine and watched television until I fell asleep. I don’t know who that is on your camera, but she is taller than me and she is not me.”',
            flags: ['bellaHostile']
          },
          {
            q: 'Where were you on Monday night?', gives: ['bella-alibi'],
            a: '“Here. I didn’t go out. At about eight I ordered from the Chinese place on the corner. The delivery boy will remember — I answered the door in my dressing gown and he laughed at me.” She gives you the name of the restaurant without being asked. “Check it. I’m not going anywhere.”'
          }
        ],
        after: 'You get the sense she has told you everything she knows — and none of it is what you wanted.'
      },
      {
        id: 'stella', name: 'Stella Rourke', role: 'Deceased sister · records only', revealFlag: 'knows-stella', tag: 'File review',
        portrait: { seed: 'stella-r', hair: 'long', hairColor: '#2b1a12', skin: 1, expression: 'smile', collar: 'shirt' },
        intro: 'Stella Rourke died three years ago, at twenty-nine, in a collision on the ring road. You are reading her file in a plastic chair. The photograph on the front is almost Bella’s face, but older and harder.',
        questions: [
          {
            q: 'How did Stella die?',
            a: 'The collision report is four pages long and answers none of the questions you want to ask. Stella was driving home from a late shift. The other driver was twice over the limit. She was pronounced at the scene. Bella identified the body.',
            follow: 'Three years old, and the file still smells of the hospital.'
          },
          {
            q: 'Who is Fella Rourke?',
            a: 'The file lists three siblings: Bella, Stella, and Fella. Fella was the youngest. There is a note in the margin from a family liaison officer: <i>“Younger brother is having difficulty. Keeps saying he should have been the one.”</i>',
            gives: ['fella-record'],
            follow: 'You close the file. The dead cannot be questioned, but the living can.'
          }
        ]
      },
      {
        id: 'fella', name: 'Fella Rourke', role: 'Bella’s brother · @fellaonline', location: 'fellas', locationName: 'The flat', revealFlag: 'knows-fella', tag: 'Prime suspect',
        portrait: { seed: 'fella-main', hair: 'short', hairColor: '#2b1a12', skin: 1, expression: 'smug', collar: 'hoodie', eyes: '#3a2159', beard: 'stubble' },
        intro: 'He is sitting on the low wall outside Bellamy Court with a takeaway coffee, watching the police van. He is tall — six foot one — with Bella’s face and none of her smallness. When he sees you, he smiles. “You found me,” he says. “Most people don’t.”',
        questions: [
          {
            q: 'Where were you on Monday night?',
            a: '“Streaming. Ask anyone. I was live from ten until one in the morning.” He shrugs. “You can check the VOD. There’s a timestamp and everything.”',
            gives: ['fella-alibi'],
            follow: 'The stream is real. So is the thirty-minute gap in the middle where he “lost connection”.'
          },
          {
            q: 'Why is your laptop full of messages from Bella?', requires: ['fella-chats'], present: true,
            a: 'He does not look at the screen. He looks at you. “Because people believe what they want to believe. Mike wanted a girl to love him. I gave him one.”<br><br>“You think I’m sick? Maybe. But I didn’t make him lonely. He was already lonely. I just made the loneliness feel like a person.”',
            gives: ['fella-admission'], flags: ['fellaBroke'],
            follow: 'His voice is steady. His hand is not.'
          },
          {
            q: 'This is your voice on Mike’s recording. Not Bella’s.', requires: ['voice-transcript'], present: true,
            a: 'He listens to the recording twice. On the second listen, his jaw tightens. “He recorded me.” A pause. “He wasn’t supposed to be able to do that. I did everything right.”',
            gives: ['fella-voice'], flags: ['fellaBroke']
          },
          {
            q: 'Why did you kill him?', requires: ['draft-message'], present: true,
            a: '“He said he was going to tell her. The real her. He said he was going to tell everyone what I am.” Fella looks out at the road. “Nine months. Nine months of being the best thing in his life. And then he finds one wrong detail and suddenly I’m a lie.”<br><br>“I only wanted him to meet me. My face, my voice — I thought if he saw me, he might understand. But he looked at me like I was wearing her skin.” He smiles again, and it is Bella’s smile. “So I made him disappear. I’m good at that. I’ve been disappearing my whole life.”',
            gives: ['confession'],
            follow: 'He asks for a cigarette. He does not ask for a lawyer.'
          }
        ],
        after: 'He does not deny it. He explains it, which is not the same as regretting it.'
      }
    ],
    clues: {
      'vat-report': {
        name: 'The pathologist’s note', caption: 'Vat 3 · cranial fracture', icon: 'blood', type: 'Forensic report',
        desc: 'A blow to the back of the skull, then the acid. The maintenance rail on the vat is too high for an accidental fall.',
        tells: 'This is a staging: kill him elsewhere, then use the acid to destroy what is left.',
        detail: 'Perimortem fracture. Acid exposure after death. The acid was not the cause of death; it was the cleanup.'
      },
      wrench: {
        name: 'Wiped steel wrench', caption: 'Catwalk · hair in the jaw', icon: 'tool', type: 'Weapon',
        desc: 'A 14-inch pipe wrench from the plant’s own tool crib. Wiped, but not washed. One dark hair caught in the worm gear.',
        tells: 'The killer used something close to hand — and was calm enough to clean it afterwards. Calm, not professional.'
      },
      'id-card': {
        name: 'Unclaimed staff ID', caption: 'Michael Okafor · shift manager', icon: 'id', type: 'Identification',
        desc: 'Found in the abandoned Rover. Michael Okafor, 28, shift manager at Harrow Acid Works. No home address printed.',
        tells: 'The man in the acid is Mike Okafor. The car belongs to his job, not to him — which means somebody moved him in it.'
      },
      'family-statement': {
        name: 'Mrs Okafor’s account', caption: 'Family home · 09:05', icon: 'note', type: 'Witness statement',
        desc: 'Mike told his mother about everyone he met — except the girl he was smiling at on his phone. She does not believe he would hurt himself.',
        tells: 'Mike had a secret relationship. He kept it from the one person he told everything to. That is not like him.',
        detail: '“He gave his coat to a stranger and came home blue.” “He never told me about her.”'
      },
      'sister-statement': {
        name: 'Ada’s account', caption: 'A week before his death', icon: 'note', type: 'Witness statement',
        desc: 'Mike was furious a week before he died. Someone had lied to him for months and he was going to end it. He had changed every password to Mum’s birthday: 07/13.',
        tells: 'Mike knew he was being lied to. He was planning a confrontation — which gives the liar a motive. Also gives you his PIN.'
      },
      'phone-found': {
        name: 'Mike’s phone', caption: 'Hidden under the passenger seat', icon: 'phone', type: 'Device',
        desc: 'A black phone in a cracked case. Forty-one notifications, locked with a four-digit PIN. Deliberately hidden in the car rather than taken.',
        tells: 'The killer did not know the phone was there. That means the phone still holds what they were trying to erase.'
      },
      'birthday-note': {
        name: 'Sun-visor photograph', caption: '“Mum’s 60th — 07/13”', icon: 'photo', type: 'Personal item',
        desc: 'A photograph of Mike’s mother in a paper party hat. The back is inscribed in his handwriting: “Mum’s 60th — 07/13. The best day.”',
        tells: 'Mike used numbers he loved. Four digits. 07/13.'
      },
      chats: {
        name: 'The “Bella” conversations', caption: '9 months · 14,802 messages', icon: 'phone', type: 'Digital evidence',
        desc: 'A long, intimate conversation between Mike and a woman calling herself Bella. A breakup message. A final meeting arranged at the acid works. And a message from Mike’s boss: “Mike, you don’t want Bella to replace you as manager. Get back to me.”',
        tells: 'The relationship existed — but only in text. And the final meeting was chosen by “Bella”, at a place full of acid.',
        detail: 'The last messages: <b>“I accept the breakup. One last date. The place where we first met.”</b> — Bella. Mike replied: <b>“I’ll be there. I need to hear you say it.”</b> He arrived at 01:55. He was dead by 02:30.'
      },
      'bella-address': {
        name: 'Bella’s address', caption: 'Napkin from the shift manager', icon: 'map', type: 'Lead',
        desc: 'Bella Rourke, 14 Carlow Street, flat above the shuttered shop. She has not called in since Monday.',
        tells: 'Bella is now the obvious suspect. Too obvious, maybe. But you have to knock on the door.'
      },
      roster: {
        name: 'The night rota', caption: 'Mo’s Diner', icon: 'note', type: 'Records',
        desc: 'Bella asked to switch to night shifts three months ago — the same nights Mike worked. They never spoke on shift.',
        tells: 'She wanted to be near him without being seen with him. Or someone wanted to be near him while wearing her name.'
      },
      'bella-denial': {
        name: 'Bella’s first denial', caption: '“I didn’t know him”', icon: 'audio', type: 'Interview',
        desc: 'Bella insists she and Mike barely spoke. She describes him as shy, always smiling at his shoes, never brave enough to talk to her.',
        tells: 'Either she is a superb liar, or somebody knew Mike well enough to invent the exact relationship he wanted.'
      },
      'bella-alibi': {
        name: 'Bella’s alibi', caption: 'Monday night · Chinese takeaway', icon: 'receipt', type: 'Alibi',
        desc: 'Bella says she stayed in, ordered Chinese food at eight, and answered the door in her dressing gown. The restaurant confirms the order.',
        tells: 'Bella’s alibi is ordinary and checkable. The woman on the CCTV was not ordinary, and she was not short.'
      },
      'cctv-still': {
        name: 'CCTV, 02:11', caption: 'Service lane · Mike and a tall woman', icon: 'cctv', type: 'Surveillance',
        desc: 'Mike walks beside a tall woman in a dark coat. Her face is caught for a fraction of a second: Bella’s cheekbones, Bella’s nose, but taller than Bella.',
        tells: '“Bella” went to the factory with Mike. But this woman is too tall to be the Bella sitting in her flat.',
        detail: 'The timestamp reads 02:11:46. Mike’s phone last connected to the cell tower at 02:14. He was inside the plant.'
      },
      'cctv-height': {
        name: 'The height problem', caption: '5′11″ vs 5′2″', icon: 'photo', type: 'Comparison',
        desc: 'The woman on the CCTV is almost exactly Mike’s height. Bella Rourke is five foot two. Without heels, the difference is nine inches.',
        tells: 'The person on the footage is not Bella. The woman who arranged the meeting and the woman in the flat are two different people — or one person and one performance.'
      },
      'bella-refusal': {
        name: 'Bella’s refusal', caption: '“I never texted him.”', icon: 'letter', type: 'Interview',
        desc: 'Presented with the chats, Bella denies ever sending them. She accuses you of manufacturing evidence, then asks you to leave.',
        tells: 'She is either the liar of the century or she genuinely has never seen those messages. One of those options should terrify you more.'
      },
      'bella-phone': {
        name: 'Bella’s phone', caption: 'No chats. No photographs.', icon: 'phone', type: 'Digital evidence',
        desc: 'Bella’s phone contains hundreds of everyday photographs and no trace of Mike Okafor. The photographs “Bella” sent to Mike do not exist on her device. Neither do the messages.',
        tells: 'The “Bella” who sent those pictures was not using this phone. Someone else built a Bella out of stolen details.',
        detail: 'Her camera roll runs to 6,000 images, dated daily. The images sent to Mike are absent — including a selfie in a red dress that Bella has never owned.'
      },
      'height-mismatch': {
        name: 'The short Bella', caption: 'Nine inches too short', icon: 'photo', type: 'Comparison',
        desc: 'Standing in her kitchen, Bella barely reaches the top of the fridge. The woman on the CCTV cleared the factory rail without ducking.',
        tells: 'The CCTV woman was not Bella. If she was not Bella, then who was using Bella’s name, face and photographs?'
      },
      'birthday-photo': {
        name: 'The birthday party', caption: 'Eight children · name labels', icon: 'photo', type: 'Photograph',
        desc: 'Arnold, Becca, Ann, Sammy, James, Bella, Stella and Fella. Stella is tall and looks like an older Bella. Fella is a small, serious boy with Bella’s eyes.',
        tells: 'There are three Rourke children, not two. And the two who look like Bella are Stella and Fella.',
        detail: 'On the back, in pencil: “Bella 6, Stella 11, Fella 4.” Fella is wearing a paper crown and holding Bella’s hand.'
      },
      'camera-video': {
        name: 'The parents’ tape', caption: 'Repaired camcorder · 1998', icon: 'camera', type: 'Home video',
        desc: 'Bella’s parents in a bright kitchen. “We’ll name them so they rhyme,” her mother says. “Bella. Stella. And if it’s a boy — Fella.”',
        tells: 'The names are a family joke, not a clue in themselves. But they explain the shape of Fella’s life: always the boy in a family of Bellas.'
      },
      'childhood-photo': {
        name: 'Stella and Fella', caption: 'The tall one and the boy', icon: 'photo', type: 'Photograph',
        desc: 'Stella is the tallest child in the picture, with Bella’s face. Fella is a boy who looks even more like Bella than Stella does.',
        tells: 'The tall figure on the CCTV resembles Stella — but Stella has been dead for three years. The other match is Fella, who is alive.'
      },
      'streamer-account': {
        name: '@fellaonline', caption: 'Livestream · Northside', icon: 'laptop', type: 'Digital lead',
        desc: 'The streamer has Bella’s face but a man’s voice and a man’s height. His wall is covered in photographs of Mike. Bio: “just a guy who looks like someone you know.”',
        tells: 'The impersonation did not stop with text. He was performing Bella in public — and keeping Mike as a trophy wall.'
      },
      'stream-stills': {
        name: 'Stream stills', caption: 'Photographs behind the streamer', icon: 'photo', type: 'Digital evidence',
        desc: 'Mike at a wedding. Mike asleep. Mike looking up from a phone. The same photographs that were sent to Mike during the “relationship”.',
        tells: 'The streamer and the fake Bella are the same person. He kept the photographs because they proved he had been loved.'
      },
      'northside-job': {
        name: 'The Northside rota', caption: 'Fella Rourke · fryers', icon: 'note', type: 'Records',
        desc: 'Fella Rourke works nights at the Northside Mo’s. He talks about his sisters constantly. He called in sick for the first time in two years.',
        tells: 'The man on the stream is real, employed, and close enough to drive to the acid works on a Monday night.'
      },
      'fella-address': {
        name: 'Fella’s address', caption: 'Flat 4, Bellamy Court', icon: 'map', type: 'Lead',
        desc: 'A flat on the ring road, forty minutes from Mo’s. He lives alone. He has a ring light in the living room.',
        tells: 'Time to see where the performance was built.'
      },
      wig: {
        name: 'The dark wig', caption: 'Sofa · long, cheap, convincing', icon: 'mask', type: 'Physical evidence',
        desc: 'A long dark wig on a polystyrene head, styled to match Bella’s hair. Beside it, makeup and a printed photograph of Bella’s face.',
        tells: 'The Bella on the CCTV was a costume. The height was not.'
      },
      'fella-photos': {
        name: 'The Mike collection', caption: '96 photographs · 8 months', icon: 'photo', type: 'Physical evidence',
        desc: 'Mike at a bus stop. Mike through a diner window. Mike asleep on a sofa. Dated in a neat hand. The last photograph was taken Sunday night.',
        tells: 'This was not a casual crush. This was surveillance of a life somebody wanted to own.'
      },
      laptop: {
        name: 'The locked laptop', caption: 'Wallpaper: the birthday party', icon: 'laptop', type: 'Device',
        desc: 'A laptop with a password prompt and a sticky note: “They named us so we would always belong together.”',
        tells: 'Three names on that birthday photograph. One of them is a dead woman. One of them is a liar. The password is probably one of the three.'
      },
      'fella-chats': {
        name: 'The fake-Bella archive', caption: '14,802 messages · full history', icon: 'phone', type: 'Digital evidence',
        desc: 'Every message Mike ever received from “Bella”, written by Fella. The photographs, the voice notes, the inside jokes, the breakup, the meeting at the acid works.',
        tells: 'Fella built a person out of photographs and then killed the only man who looked closely enough to notice.'
      },
      'draft-message': {
        name: 'The unsent draft', caption: '“You should have just believed…”', icon: 'note', type: 'Digital evidence',
        desc: 'A draft message in Fella’s archive: “You should have just believed I was her, Mike.” Unsent. Saved. Kept.',
        tells: 'He did not write that for Mike. He wrote it for himself. It is a confession shaped like a grievance.'
      },
      'fella-archive': {
        name: 'Voice note 0131', caption: 'The same file Mike saved', icon: 'audio', type: 'Digital evidence',
        desc: 'Fella’s laptop contains the original of the recording on Mike’s phone. Same file, same timestamp, same voice underneath the pitch.',
        tells: 'The man on the recording and the man with the laptop are the same person. There is no Bella in this file.'
      },
      'fella-record': {
        name: 'Fella Rourke — family file', caption: 'Youngest of three · “difficulty”', icon: 'note', type: 'Records',
        desc: 'A family liaison note from the year Stella died: Fella was the youngest, and kept saying he should have been the one in the car.',
        tells: 'Fella has spent years being the brother who survived. That is a wound with a very long reach.'
      },
      'fella-admission': {
        name: 'Fella’s admission', caption: '“I gave him a person to love.”', icon: 'audio', type: 'Statement',
        desc: 'Fella admits building the Bella identity. He does not call it a crime. He calls it a kindness.',
        tells: 'He knows exactly what he did. He has a story that makes it survivable.'
      },
      'fella-voice': {
        name: 'Fella on the recording', caption: '“He wasn’t supposed to do that.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with Mike’s voice memo, Fella recognises his own voice under the pitch shift. He does not deny it.',
        tells: 'The recording is the one piece of evidence he cannot explain away.'
      },
      'voice-memo': {
        name: 'Mike’s final recording', caption: '01:31 · 16 seconds', icon: 'audio', type: 'Audio evidence',
        desc: 'Mike recorded a voice at the meeting place. Under the pitch-shifted imitation of Bella, a man’s voice: “You should have just believed I was her, Mike.”',
        tells: 'Mike knew. He had already worked out that the woman he loved did not exist — and he recorded proof before he walked into the plant.'
      },
      'voice-transcript': {
        name: 'Voice analysis', caption: 'Pitch-shift stripped', icon: 'fingerprint', type: 'Forensic analysis',
        desc: 'Under the raised pitch: a male register, local accent, a slight lisp on the letter “s”. The pattern matches Fella Rourke’s stream recordings.',
        tells: 'The person at the acid works was not Bella. It was a man wearing her voice.'
      },
      'fella-alibi': {
        name: 'Fella’s stream alibi', caption: '22:00–01:00', icon: 'cctv', type: 'Alibi',
        desc: 'Fella was live for three hours. At 01:07 the stream drops for thirty-one minutes — “connection trouble” — then returns. He logs off at 01:41.',
        tells: 'The acid works is a nineteen-minute drive from Bellamy Court. Thirty-one minutes is enough time to kill a man if you do not waste any.'
      },
      'confession': {
        name: 'Fella’s confession', caption: '“I’ve been disappearing my whole life.”', icon: 'audio', type: 'Statement',
        desc: 'Fella admits creating Bella, arranging the final meeting, and striking Mike when he threatened to expose the lie.',
        tells: 'It was not a crime of passion. It was the maintenance of a fiction. Mike became a detail that had to be removed.'
      }
    },
    solution: {
      minEvidence: 9,
      questions: [
        {
          q: 'Who is responsible for Mike Okafor’s death?',
          options: [
            { t: 'Bella Rourke — the woman in the chats', v: 'bella' },
            { t: 'Stella Rourke — the sister on the CCTV', v: 'stella' },
            { t: 'Fella Rourke — Bella’s brother and the fake-Bella account', v: 'fella' },
            { t: 'Desmond Vale — Mike’s manager at the acid works', v: 'vale' }
          ],
          answer: 'fella'
        },
        {
          q: 'How did Mike actually die?',
          options: [
            { t: 'He fell into the vat while checking the rail', v: 'fall' },
            { t: 'He was struck from behind, then lowered into the acid to destroy the body', v: 'struck' },
            { t: 'He was poisoned at the diner and dumped in the vat afterwards', v: 'poison' },
            { t: 'He was crushed by machinery and the body was moved', v: 'crush' }
          ],
          answer: 'struck'
        },
        {
          q: 'What was the motive?',
          options: [
            { t: 'Mike was going to expose the impersonation and tell the real Bella', v: 'expose' },
            { t: 'Mike had stolen money from the diner', v: 'money' },
            { t: 'Jealousy over Bella’s relationship with a co-worker', v: 'jealousy' },
            { t: 'An inheritance dispute between the Rourke siblings', v: 'inheritance' }
          ],
          answer: 'expose'
        },
        {
          q: 'Which piece of evidence breaks the case?',
          options: [
            { t: 'Bella’s takeaway receipt and her short height', v: 'alibi' },
            { t: 'The acid report and the wiped wrench', v: 'acid' },
            { t: 'Fella’s laptop archive matched to Mike’s voice memo', v: 'archive' },
            { t: 'The old birthday photograph and the family camcorder', v: 'photo' }
          ],
          answer: 'archive'
        }
      ],
      verdict: {
        who: 'Fella Rourke, 26 — Bella’s brother, streamer, and the author of “Bella”',
        whoDesc: 'was arrested at Bellamy Court and charged with murder, assault, and identity theft.',
        how: 'He struck Mike Okafor across the back of the skull with a steel wrench, then lowered him into settling vat 3 to dissolve the evidence.',
        why: 'Mike discovered that the woman he had been in love with for nine months did not exist. He threatened to tell the real Bella. Fella killed him to keep the story alive.',
        key: 'Fella’s own archive — 14,802 fabricated messages, the stolen photographs, the unsent draft — matched to the voice memo Mike recorded in the final minutes of his life.'
      },
      reveal: [
        'The woman in Mike Okafor’s phone never existed. She was assembled, message by message, by a lonely young man who had spent his entire life being compared to a sister who was prettier, and another sister who was dead. Fella Rourke knew what people saw when they looked at him: Bella’s face on a man’s body. For most of his life, that had been a curse. Online, it became a door.',
        'He built Bella from stolen details — the way she took her coffee, the names of her cousins, a photograph of a red dress she had never owned. He gave her a softer voice. He gave her a reason to love Mike Okafor, the shy shift manager who had been kind to her in a diner and never brave enough to say so. For nine months, Mike was happier than he had ever been. He told his mother about a girl he had met. He did not tell her her name.',
        'Then Mike noticed a crack in the performance. A voice note that slipped. A photograph that did not match the shape of the room in another. A message from his boss that “Bella” answered before Mike had told her about it. He asked to meet. He said he needed to hear her say it out loud. Fella agreed, because the only thing worse than being caught was being abandoned.',
        'At 01:55 on Monday, Mike walked into the acid works beside a tall woman in a dark coat. The CCTV caught them at the vat-room door. At 02:11 the woman’s face turned toward the camera: Bella’s cheekbones, Bella’s nose, Bella’s smile. At 02:12, Mike turned his back. The wrench was already in Fella’s hand.',
        'He struck once. Mike went down. Fella dragged him to the maintenance rail, lifted him over it, and let the acid take the rest. Then he went home, washed his hands, and started a livestream at 01:41 with a thirty-one-minute gap in the middle that he called connection trouble.',
        'The search of Bella’s flat nearly ended the case in the wrong place. Her phone had no photographs of Mike. Her messages had no trace of him. The woman in the chats had never existed on any device Bella owned — because she had never existed at all. The only thing left was a birthday photograph and a dead sister’s height. And a brother who looked so much more like Bella than anyone had ever wanted to admit.',
        'Mike’s final recording was still on his phone, saved under a file name he had typed with cold fingers while he waited: <b>“if i dont come back.”</b> Under the pitch-shifted imitation of Bella’s voice, a man’s voice says: <i>“You should have just believed I was her, Mike.”</i>',
        'The draft was still open on Fella’s laptop when the police arrived. He had not sent it. He had been reading it.'
      ],
      quote: 'You should have just believed I was her, Mike.',
      twist: 'The voice memo was not a clue Mike left by accident. He had already worked out that “Bella” was not Bella. He went to the factory to hear it in person — and recorded it in case he did not come back. He was right.'
    }
  });
})();
