/* ============================================================
   CASE 30 - THE FINAL BLUEPRINT
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c30', num: 30,
    title: 'The Final Blueprint',
    subtitle: 'The tower was built over a lie. The surveyor found it in the foundations.',
    difficulty: 5, est: '45-60 min',
    cover: { kind: 'factory', mood: 'night' },
    facts: [
      { k: 'Victim', v: 'Ines Marlowe, 44 - independent city surveyor' },
      { k: 'Scene', v: 'Meridian Tower, unfinished lift shaft and basement' },
      { k: 'Found', v: 'Sunday, 07:30 - by the site foreman' },
      { k: 'Official cause', v: 'Fall from the thirty-eighth floor' }
    ],
    briefing: [
      "Meridian Tower is the last building Victor Sable will ever need to justify. Thirty-eight floors of glass and steel over a basement that connects to the courthouse evidence warehouse. Ines Marlowe was the independent surveyor who had to sign the as-built plans before the planning inquiry on Monday.",
      "On Sunday morning the site log says she signed in at 06:10 and signed out at 07:05. At 07:30 the foreman found her at the bottom of the unfinished lift shaft. She had fallen thirty-eight floors, but her key card was in the reader at the ground-floor gate, not on her body.",
      "The approved blueprint shows the foundation pilings in one line. The as-built survey shows them in another. Between those two lines there is a room that should not exist, and a route that explains every case this city has buried."
    ],
    opening: 'The tower is a skeleton in the rain. The lift shaft is a black column down the middle of the floor, its safety gate chained open. Wind moves through the building like it owns it.',
    objectives: [
      'Establish how Ines fell and whether she was alone.',
      'Compare the approved and as-built foundation plans.',
      'Find the hidden basement corridor and what it connects to.',
      'Prove who needed the surveyor silent before Monday.'
    ],
    locations: [
      {
        id: 'floor38', name: 'Thirty-Eighth Floor', short: 'Floor 38', time: '08:10',
        art: { kind: 'factory', mood: 'night' },
        intro: 'An open concrete floor with no windows yet, only plastic sheeting and rain. The lift shaft is a square hole in the centre. The safety gate is chained open, the chain bright and new.',
        actions: [
          { id: 'shaft', label: 'Examine the shaft and the gate', icon: 'blood', hotspot: { x: 50, y: 58 },
            desc: 'The chain, the rail, the missing helmet',
            text: [
              "The safety gate should be closed and padlocked whenever the shaft is open. It is chained open with a new galvanised chain, the kind sold in the site stores.",
              "There is a scuff of pale plaster on the gate rail at hip height and a torn thread of grey wool caught on the chain. Ines was wearing a grey coat.",
              "Her helmet is on the floor six feet from the shaft, upright, not fallen. She did not walk to the edge wearing it. Someone put it down."
            ],
            gives: ['c30_body', 'c30_gate'],
            hint: 'The gate was chained open, and her helmet was placed neatly away from the edge.'
          },
          { id: 'plan', label: 'Enhance the as-built plan overlay', icon: 'photo', puzzle: 'plan-photo',
            desc: 'Approved line against as-built line',
            gives: ['c30_blueprint'],
            hint: 'Enhance the foundation corner. The as-built piling line sits east of the approved line by more than a wall.'
          },
          { id: 'math', label: 'Calculate the hidden volume', icon: 'math', puzzle: 'piling-math',
            desc: 'How big is the space between the lines?',
            gives: ['c30_math'],
            hint: 'Offset 4.2 m, length 18 m, height 3 m. Multiply.'
          }
        ]
      },
      {
        id: 'site', name: 'Site Office', short: 'Site office', time: '09:00',
        art: { kind: 'office', mood: 'cold' },
        requires: ['c30_body'],
        intro: 'A portacabin full of drawings, site radios and a coffee machine that has been left on for hours. Victor Sable is on the phone. He ends the call when you enter and offers you a chair.',
        actions: [
          { id: 'victor', label: 'Question Victor Sable', icon: 'user', suspect: 'victor',
            desc: 'Developer - sole director of Meridian Tower' },
          { id: 'log', label: 'Open the site access system', icon: 'terminal', puzzle: 'site-term',
            desc: 'Gate, lift and key-card events',
            gives: ['c30_site'],
            hint: 'The site password is the project name. Look for the card that signs out after the fall.'
          },
          { id: 'radio', label: 'Play the site intercom', icon: 'ear', puzzle: 'argument-audio',
            desc: 'A conversation on the thirty-eighth floor',
            gives: ['c30_audio'],
            hint: 'Listen for who is giving the order. The second voice is the surveyor.'
          }
        ]
      },
      {
        id: 'basement', name: 'Basement Level', short: 'Basement', time: '10:20',
        art: { kind: 'basement', mood: 'night' },
        requires: ['c30_blueprint'],
        intro: 'Below the tower, the concrete changes. A new service corridor runs east, lit by strip lights, its walls still raw. At the far end there is a steel door with a police evidence seal, cut and hanging.',
        actions: [
          { id: 'corridor', label: 'Follow the hidden corridor', icon: 'map', puzzle: 'corridor-seq',
            desc: 'Tower basement to the courthouse',
            gives: ['c30_corridor'],
            hint: 'Order the spaces from the tower to the evidence warehouse.'
          },
          { id: 'core', label: 'Drill a core sample', icon: 'chemical', puzzle: 'core-mix',
            desc: 'Concrete, aggregate, reinforcement',
            gives: ['c30_foundation'],
            hint: 'Add the core, then the acid, then the indicator. The reinforcement has been cut.'
          },
          { id: 'seal', label: 'Read the evidence seal', icon: 'lock',
            desc: 'Cut from the inside',
            text: [
              "The police evidence seal is dated three months ago and numbered for the courthouse warehouse. It has been cut from the inside with a bolt cutter, then hung back in place.",
              "Beyond the door: a loading bay, a pallet truck and a whiteboard listing six case references. Four of them are files you have worked.",
              "The corridor is not a sewer or a service duct. It is a purpose-built route between the tower and the evidence store."
            ],
            gives: ['c30_route'],
            hint: 'The seal was cut from the inside. The corridor was built to move evidence.'
          }
        ]
      },
      {
        id: 'studio', name: "Celeste's Studio", short: 'Studio', time: '11:30',
        art: { kind: 'office', mood: 'cold' },
        requires: ['c30_site'],
        intro: 'An architect\'s studio above a bookshop, full of foam models and rolled drawings. Celeste Rook is packing a portfolio. She has not slept and she does not stop packing.',
        actions: [
          { id: 'celeste', label: 'Question Celeste Rook', icon: 'user', suspect: 'celeste',
            desc: 'Architect - signed the original drawings' },
          { id: 'drawings', label: 'Compare the drawing sets', icon: 'cipher', puzzle: 'blueprint-cipher',
            desc: 'A note in the margin',
            gives: ['c30_cipher'],
            hint: 'Try a shift of five. The sentence begins with PILINGS.'
          },
          { id: 'model', label: 'Inspect the foam model', icon: 'search',
            desc: 'A corridor that is not on the plan',
            text: [
              "The foam model has been cut open along the basement. A narrow corridor runs east from the tower to a block marked CROWN. Someone has scratched a line through the word CROWN and written EVIDENCE.",
              "The corridor is not on the approved drawings pinned to the wall. It exists only in the model and in the as-built survey.",
              "A note in Celeste\'s hand is pinned to the base: V - if this goes to inquiry, we both go down."
            ],
            gives: ['c30_model'],
            hint: 'The model shows the corridor. The drawings do not.'
          }
        ]
      }
    ],
    puzzles: {
      'plan-photo': {
        type: 'photo', title: 'As-Built Overlay', subtitle: 'Approved against built', icon: 'photo',
        scene: { kind: 'factory', mood: 'night' },
        target: { x: 44, y: 54, w: 22, h: 24 }, range: [62, 88],
        reveal: 'The as-built piling line is 4.2 metres east of the approved line. Between them, a corridor 18 metres long and 3 metres high has been left out of every submitted drawing.',
        question: 'What does the overlay prove?', options: [
          { t: 'The foundation was shifted east to create an unrecorded corridor', v: 'shift' },
          { t: 'The surveyor drew the pilings in the wrong place', v: 'error' },
          { t: 'The tower was built exactly to the approved plan', v: 'same' }
        ],
        answer: 'shift',
        wrong: 'The two lines do not meet. The gap is wide enough to walk through, and it runs toward the courthouse.',
        success: 'The overlay exposes a 4.2-metre shift in the foundation line, creating an unrecorded corridor between the tower and the evidence warehouse.',
        gives: ['c30_blueprint'], flags: ['planSeen'],
        short: 'The foundation was shifted to hide a corridor.',
        log: 'The as-built overlay shows the pilings moved 4.2 metres east, creating a hidden corridor between Meridian Tower and the courthouse evidence warehouse.'
      },
      'piling-math': {
        type: 'math', title: 'Hidden Volume', subtitle: 'Measure the gap', icon: 'math',
        info: 'The as-built piling line is 4.2 m east of the approved line. The unrecorded corridor is 18 m long and 3 m high. Calculate its volume in cubic metres.',
        placeholder: 'm3', unit: 'm3',
        answer: 226.8, tolerance: 0.2,
        hintText: 'Volume = 4.2 x 18 x 3.',
        success: 'Two hundred and twenty-six cubic metres of unrecorded space. That is not a construction error; it is a room built on purpose.',
        gives: ['c30_math'], flags: ['mathDone'],
        short: 'The hidden corridor is 226.8 cubic metres.',
        log: 'The gap between the approved and as-built piling lines encloses 226.8 cubic metres - a purpose-built hidden corridor.'
      },
      'site-term': {
        type: 'terminal', title: 'Site Access System', subtitle: 'Gates, lift and key cards', icon: 'terminal',
        user: 'site', host: 'meridian-tower', password: 'meridian',
        passwords: ['meridian', 'meridian tower'],
        intro: 'Meridian Tower site control. Type help for commands.',
        banner: 'SUNDAY ACCESS - 05:30 TO 08:00',
        files: [
          { name: 'gate.log', body: '06:02 V. SABLE in - north gate<br>06:10 I. MARLOWE in - north gate<br>06:12 LIFT 38 - SABLE + MARLOWE<br><span class="r">07:05 I. MARLOWE card out - north gate</span><br>07:12 V. SABLE out - north gate' },
          { name: 'lift.log', body: '06:12 LIFT 2 to 38 - two occupants<br>06:14 LIFT 2 doors held - manual<br><span class="d">07:01 LIFT 2 to ground - one occupant</span><br><span class="r">07:05 card presented at gate - no CCTV facial match</span>' },
          { name: 'staff.txt', body: '<b>V. SABLE</b> - developer, full site access<br><b>I. MARLOWE</b> - surveyor, escorted access<br><b>M. VOSS</b> - foreman, site access<br><b>C. ROOK</b> - architect, office access only' }
        ],
        hintText: 'Ines enters at 06:10 and her card leaves at 07:05 without a facial match. Sable leaves seven minutes later.',
        success: 'The access system is clear: Ines enters at 06:10 and never leaves. Her card is used at 07:05 with no facial match. Sable leaves at 07:12. The lift carried two people up and one person down.',
        gives: ['c30_site'], flags: ['siteOpen'],
        short: 'Ines never left the tower alive.',
        log: 'The site log shows Ines entering at 06:10 with no exit, her card used at 07:05 without a facial match, and Sable leaving at 07:12.'
      },
      'argument-audio': {
        type: 'audio', title: 'Site Intercom', subtitle: 'Thirty-eighth floor', icon: 'ear',
        prompt: 'The site intercom recorded the floor at 06:40. Two voices. One is calm. One is not.',
        pattern: [300, 0, 420, 300, 0, 500], waveform: 'A man says: sign the as-built and we are done. A woman answers: I have seen the basement. The man says: then you understand why you cannot leave with it. Then wind, then a gate.',
        options: [
          { t: 'Sable threatening Ines to sign the plans and stay quiet', v: 'threat' },
          { t: 'Ines threatening to sue Sable over a delay', v: 'sue' },
          { t: 'Two workers arguing about overtime', v: 'overtime' },
          { t: 'A phone call with the planning office', v: 'phone' }
        ],
        answer: 'threat',
        wrong: 'The woman names the basement. The man answers with a condition on her leaving. That is not a site dispute.',
        hintText: 'Listen to the condition: why you cannot leave with it. Then the gate.',
        success: 'The intercom captures Sable telling Ines she cannot leave with what she found in the basement. Minutes later the lift carries one person down.',
        gives: ['c30_audio'], flags: ['audioHeard'],
        short: 'Sable threatened Ines on the intercom.',
        log: 'The site intercom records Sable telling Ines she cannot leave with what she found in the basement, immediately before she fell.'
      },
      'corridor-seq': {
        type: 'sequence', title: 'The Hidden Route', subtitle: 'Tower to courthouse', icon: 'map',
        prompt: 'Put the spaces in order along the hidden corridor, from the tower to the evidence warehouse.',
        variant: 'strips',
        items: [
          { t: 'Meridian Tower basement service bay', sub: 'west end' },
          { t: 'Unrecorded concrete corridor', sub: '18 metres' },
          { t: 'Cut police seal', sub: 'courthouse side' },
          { t: 'Evidence warehouse loading bay', sub: 'east end' }
        ],
        success: 'The route is continuous: tower, corridor, cut seal, evidence warehouse. The corridor was built to move evidence without passing a gate.',
        gives: ['c30_corridor'], flags: ['corridorDone'],
        short: 'The corridor connects the tower to the evidence warehouse.',
        log: 'The hidden corridor runs from Meridian Tower\'s basement directly to the courthouse evidence warehouse loading bay.'
      },
      'core-mix': {
        type: 'mix', title: 'Foundation Core', subtitle: 'Read the concrete', icon: 'chemical',
        prompt: 'Test the core from the corridor wall. Add the reagents in order and read the result.',
        reagents: [
          { name: 'Concrete core', color: '#b8b0a4' },
          { name: 'Acid digest', color: '#e879f9' },
          { name: 'Iron indicator', color: '#67e8f9' }
        ],
        order: [0, 1, 2],
        note: 'Core first, then digest, then indicator. The iron indicator turns blue where reinforcement has been cut.',
        hintText: 'Core, acid, indicator. A blue band means cut reinforcement.',
        success: 'The indicator turns blue in a clean horizontal band. The reinforcement in the corridor wall was cut after the concrete cured. The corridor was inserted into an existing foundation.',
        gives: ['c30_foundation'], flags: ['coreDone'],
        short: 'The corridor was cut into the foundation after construction.',
        log: 'The core sample shows reinforcement cut cleanly after the concrete cured. The hidden corridor was retro-fitted into the finished foundation.'
      },
      'blueprint-cipher': {
        type: 'cipher', title: 'Margin Note', subtitle: 'Architect to developer', icon: 'cipher',
        prompt: 'A pencilled sentence runs along the margin of the drawing set. Turn the wheel until the warning resolves.',
        plain: 'PILINGS MOVED EAST', shift: 5,
        answers: ['pilings moved east', 'the pilings moved east', 'pilings moved to the east', 'the pilings moved to the east'],
        hintText: 'A shift of five. The first word is PILINGS.',
        success: 'The margin reads PILINGS MOVED EAST. The architect knew the foundation had been shifted and wrote it down.',
        gives: ['c30_cipher'], flags: ['cipherRead'],
        short: 'The drawings admit the pilings were moved.',
        log: 'The margin note decodes to PILINGS MOVED EAST, proving the architectural team knew the foundation was shifted.'
      }
    },
    clues: {
      'c30_body': { name: 'Fall with a struggle', caption: 'Grey wool on the gate - helmet placed, not dropped', icon: 'blood', type: 'Forensic observation',
        desc: 'A grey wool thread is caught on the gate chain. Ines\'s helmet was set upright six feet from the shaft. There are pressure marks on both wrists.',
        tells: 'She was held at the gate before she fell. The helmet was placed after the struggle.' },
      'c30_gate': { name: 'Chained-open safety gate', caption: 'New galvanised chain - site stores', icon: 'lock', type: 'Scene evidence',
        desc: 'The shaft gate was chained open with a new galvanised chain from the site stores. Site rules require it locked whenever the shaft is open.',
        tells: 'Someone prepared the shaft. The chain was not an oversight.' },
      'c30_blueprint': { name: 'As-built overlay', caption: 'Pilings 4.2 m east - corridor omitted', icon: 'chart', type: 'Survey evidence',
        desc: 'The as-built piling line sits 4.2 metres east of the approved line, enclosing an 18-metre corridor that appears on no submitted drawing.',
        tells: 'The foundation was deliberately shifted to create a hidden route.' },
      'c30_math': { name: 'Hidden volume', caption: '226.8 cubic metres unrecorded', icon: 'math', type: 'Measurement',
        desc: 'The gap between the approved and as-built lines encloses 226.8 cubic metres of space - enough for a service corridor.',
        tells: 'The void is too large to be a construction error. It was built.' },
      'c30_site': { name: 'Site access log', caption: 'Ines in 06:10 - card out 07:05 - no facial match', icon: 'id', type: 'Technical record',
        desc: 'Ines entered at 06:10 with Sable. Her card was used at the gate at 07:05 without a facial match. Sable left at 07:12.',
        tells: 'Ines never left alive. Someone used her card to fake an exit.' },
      'c30_audio': { name: 'Intercom recording', caption: 'You cannot leave with it', icon: 'sound', type: 'Audio evidence',
        desc: 'Sable tells Ines she cannot leave with what she found in the basement. Wind, then a gate, then the lift.',
        tells: 'Sable knew about the corridor and made a direct threat minutes before her death.' },
      'c30_corridor': { name: 'Hidden corridor', caption: 'Tower basement to evidence warehouse', icon: 'map', type: 'Scene evidence',
        desc: 'An unrecorded concrete corridor connects the tower basement to the courthouse evidence warehouse through a cut police seal.',
        tells: 'The tower was built as a private route into the evidence store. That is the heart of the Meridian network.' },
      'c30_route': { name: 'Cut evidence seal', caption: 'Cut from the inside - six case references', icon: 'lock', type: 'Physical evidence',
        desc: 'A courthouse evidence seal was cut from the inside and hung back. A whiteboard beyond lists six case references.',
        tells: 'Evidence has been moving through the corridor for months, and Ines found the route.' },
      'c30_foundation': { name: 'Cut reinforcement', caption: 'Retro-fitted after the concrete cured', icon: 'chemical', type: 'Forensic analysis',
        desc: 'The corridor core shows reinforcement cut in a clean band after curing. The corridor was inserted into an existing foundation.',
        tells: 'The corridor was built secretly, after the approved foundation was poured.' },
      'c30_cipher': { name: 'Margin note', caption: 'PILINGS MOVED EAST', icon: 'cipher', type: 'Decoded message',
        desc: 'A pencilled margin note on the drawing set decodes to PILINGS MOVED EAST.',
        tells: 'The architect knew the foundation had been shifted, which makes the drawings part of the concealment.' },
      'c30_model': { name: 'Foam site model', caption: 'Corridor marked CROWN - changed to EVIDENCE', icon: 'search', type: 'Physical evidence',
        desc: 'A cutaway model shows the hidden corridor running to a block marked CROWN, later overwritten with EVIDENCE.',
        tells: 'The design team knew the corridor reached the courthouse.' },
      'c30_celeste': { name: "Celeste's altered drawings", caption: 'She redrew the basement - under pressure', icon: 'note', type: 'Red herring',
        desc: 'Celeste redrew the basement after Sable threatened to ruin her practice. Her margin note says he made her do it. She was in the studio all Sunday morning.',
        tells: 'She concealed the corridor on paper, but she did not build it and she was not at the tower.' },
      'c30_marek': { name: "Marek's statement", caption: 'Sable\'s car at 06:00 - argument on 38', icon: 'eye', type: 'Witness statement',
        desc: 'The foreman saw Sable\'s car at the north gate at 06:00 and heard him shouting on the thirty-eighth floor at 06:40.',
        tells: 'Sable was in the tower before Ines and stayed until after she fell.' },
      'c30_contract': { name: 'Development agreement', caption: 'Bonus for completion before the inquiry', icon: 'ledger', type: 'Financial record',
        desc: 'Sable\'s development agreement with Meridian Holdings pays a large bonus if the tower is certified before the planning inquiry.',
        tells: 'Sable needed Ines\'s signature by Monday. Without it, the bonus and the corridor both disappear.' }
    },
    suspects: [
      {
        id: 'victor', name: 'Victor Sable', role: 'Developer - sole director of Meridian Tower', location: 'site', locationName: 'Site office',
        tag: 'Primary suspect', portrait: { seed: 'victor-sable', hair: 'short', hairColor: '#2a2a2a', skin: 1, expression: 'cold', collar: 'suit' },
        intro: 'Sable is fifty-eight, tanned and entirely at ease in a hard hat. He calls Ines a brilliant woman and her death a tragedy of site safety. He has already called his lawyer twice.',
        questions: [
          { q: 'Where were you on Sunday morning?', a: 'At home until seven. I came to the site at eight and the foreman told me. I was not here when she fell.', gives: ['c30_marek'],
            follow: 'His car is on the north gate camera at 06:00. The site log has him entering at 06:02 with Ines.' },
          { q: 'Why did Ines sign out at 07:05 if she was dead?', a: 'She must have left. The system does not lie. Perhaps she went for coffee and came back. Perhaps the fall was later.', requires: ['c30_site'], gives: ['c30_site'],
            follow: 'Her card was used without a facial match. The lift carried two people up and one down. Sable left at 07:12.' },
          { q: 'Why were the foundation pilings moved east?', a: 'A minor adjustment. Ground conditions. The engineers approved it. It is all in the file.', requires: ['c30_blueprint'], gives: ['c30_blueprint'],
            follow: 'The adjustment creates 226 cubic metres of unrecorded corridor running to the evidence warehouse. That is not ground conditions.' },
          { q: 'What is at the east end of the basement corridor?', a: 'Nothing. A service route. The basement is not part of the building yet.', requires: ['c30_corridor'], gives: ['c30_corridor'],
            follow: 'The corridor ends at a cut courthouse evidence seal. Six case references are written on a board inside.' },
          { q: 'Did you threaten Ines on the intercom?', a: 'We disagreed. She was refusing to certify. I told her she could not leave with an unsigned survey. That is not a threat. That is a deadline.', requires: ['c30_audio'], gives: ['c30_audio'],
            follow: 'The recording says she could not leave with what she found in the basement. Minutes later she was at the shaft.' },
          { q: 'Why is there a bonus for certifying before the inquiry?', a: 'Every developer has an incentive clause. It is standard. It does not make me a murderer.', requires: ['c30_contract'], gives: ['c30_contract'],
            follow: 'The bonus is paid by Meridian Holdings, the same company that leased floor 14 from Diane Kestrel and paid the Gilt Room account.' }
        ],
        after: 'He asks whether the inquiry will be postponed. He does not ask what happened to her body.'
      },
      {
        id: 'celeste', name: 'Celeste Rook', role: 'Architect - redrew the basement plans', location: 'studio', locationName: "Celeste's studio",
        tag: 'Red herring', portrait: { seed: 'celeste-rook', hair: 'long', hairColor: '#3a2a1e', skin: 2, expression: 'guilty', collar: 'coat' },
        intro: 'Celeste is packing as if the room is on fire. She admits the drawings are wrong before you ask. She says Sable made her change them and she can prove where she was.',
        questions: [
          { q: 'Did you redraw the basement?', a: 'Yes. Sable told me the foundation had moved and the drawings had to match. I removed the corridor. I have regretted it every day since.', gives: ['c30_celeste'],
            follow: 'The margin note in her own hand says PILINGS MOVED EAST. She knew, but she did not build the corridor.' },
          { q: 'Where were you on Sunday morning?', a: 'Here. Packing. The bookshop owner below saw me at six and at nine. I did not go to the tower. I have not been there in weeks.', requires: ['c30_celeste'], gives: ['c30_celeste'],
            follow: 'The bookshop owner confirms it. Celeste was three miles away when Ines fell.' },
          { q: 'Why did you help him?', a: 'Because he said he would destroy my practice. Because I was afraid. Because I am not brave, and Ines was.', requires: ['c30_model'], gives: ['c30_model'],
            follow: 'She is an accomplice to the concealment, not to the killing.' }
        ]
      },
      {
        id: 'marek', name: 'Marek Voss', role: 'Site foreman - found the body', location: 'floor38', locationName: 'Thirty-eighth floor',
        tag: 'Witness', portrait: { seed: 'marek-voss', hair: 'buzz', hairColor: '#8a8a82', skin: 3, expression: 'tired', collar: 'coat' },
        intro: 'Marek has been on site since five. He found Ines at half seven and has not stopped shaking since. He keeps his notebook open at the same page.',
        questions: [
          { q: 'Who was on site before you?', a: 'Sable\'s car at six. Ines at ten past. They went up together. I thought it was a survey meeting. I did not go up until the shouting.', gives: ['c30_marek'],
            follow: 'The gate camera and the lift log confirm two people up and one down.' },
          { q: 'What did you hear?', a: 'Sable shouting. Not words, just the shape of it. Then the lift came down at seven and he walked past me without his hard hat. He never takes it off.', requires: ['c30_audio'], gives: ['c30_marek'],
            follow: 'Sable left at 07:12 without his hard hat. It was found on the thirty-eighth floor.' },
          { q: 'Did you see the shaft gate?', a: 'It is always chained open when the shaft is live. I reported it twice. Sable said the chain was cheaper than a lock. The chain in the photo is new.', requires: ['c30_gate'], gives: ['c30_gate'],
            follow: 'The chain was replaced the week Ines died. The purchase is in the site stores.' }
        ]
      }
    ],
    timeline: [
      { time: '06:00', text: 'Sable\'s car arrives at the north gate.' },
      { time: '06:02', text: 'Sable signs in. The site is empty except for the foreman.' },
      { time: '06:10', text: 'Ines Marlowe signs in. The lift carries two people to floor 38.' },
      { time: '06:40', text: 'Intercom records Sable and Ines arguing about the basement.' },
      { time: '06:55', text: 'The shaft gate chain is moved. Ines\'s helmet is placed on the floor.' },
      { time: '07:01', text: 'The lift returns to the ground with one occupant.' },
      { time: '07:05', text: 'Ines\'s card is used at the gate without a facial match.' },
      { time: '07:12', text: 'Sable leaves the site without his hard hat.' },
      { time: '07:30', text: 'Marek finds Ines at the bottom of the shaft.' }
    ],
    links: [
      { a: 'c30_site', b: 'victor', note: 'Sable entered with Ines, and her card left without her.' },
      { a: 'c30_audio', b: 'victor', note: 'The intercom captures his threat minutes before the fall.' },
      { a: 'c30_blueprint', b: 'victor', note: 'The foundation shift creates the corridor he needed.' },
      { a: 'c30_contract', b: 'victor', note: 'The completion bonus depended on Ines certifying before Monday.' },
      { a: 'c30_marek', b: 'victor', note: 'The foreman saw his car and heard the argument.' },
      { a: 'c30_corridor', b: 'victor', note: 'The corridor links his tower to the evidence warehouse.' }
    ],
    forensics: {
      prompt: 'Two samples from floor 38. Match each to its source.',
      samples: [
        { id: 'wool', type: 'FIBRE', label: 'Gate chain - grey wool', mark: 'cashmere blend, grey coat' },
        { id: 'print', type: 'PRINT', label: 'Gate rail - partial palm', mark: 'right palm, downward smear' }
      ],
      candidates: [
        { id: 'ines', label: 'Ines Marlowe\'s grey coat' },
        { id: 'victor', label: 'Victor Sable\'s site gloves' },
        { id: 'marek', label: 'Marek Voss\'s work jacket' }
      ],
      answer: { wool: 'ines', print: 'ines' },
      success: 'The fibre is from Ines\'s coat and the palm print is hers, smeared downward on the rail. She was held at the gate before she went over.',
      gives: ['c30_body']
    },
    documents: [
      { id: 'inquiry', title: 'Planning inquiry submission', sub: 'Due Monday, 09:00', body: '<div class="doc-sheet"><b>MERIDIAN TOWER - AS-BUILT CERTIFICATION</b><br>Surveyor: <b>Ines Marlowe</b><br>Status: <span class="g">UNSIGNED</span><br><br>Annex 4: Foundation piling line<br>Approved: <b>grid A</b><br>As built: <b>grid A + 4.2 m east</b><br><br><span class="d">Unrecorded void noted at basement east. Referred to planning authority.</span></div>',
        question: 'Why did Sable need Ines stopped?', options: [
          { t: 'Her unsigned report would expose the shifted foundation to the inquiry', v: 'a' },
          { t: 'She was going to buy the tower herself', v: 'b' },
          { t: 'She had missed the submission deadline', v: 'c' }
        ],
        answer: 0, gives: ['c30_blueprint'],
        log: 'Ines\'s report was unsigned and noted the shifted piling line. If submitted, it would expose the hidden corridor to the planning inquiry.',
        wrong: 'Read the annex. The foundation is the issue, and the report is still unsigned.' },
      { id: 'bonus', title: 'Development agreement', sub: 'Completion bonus', body: '<div class="doc-sheet"><b>MERIDIAN HOLDINGS - DEVELOPMENT AGREEMENT</b><br>Developer: <b>V. SABLE</b><br>Project: Meridian Tower<br>Bonus: <b>Â£4,000,000</b> on certification before inquiry<br><br>Clause 9: Basement service route to be completed to tenant specification.<br><span class="d">Tenant: Meridian Holdings. Route: east, to courthouse boundary.</span></div>',
        question: 'What does the agreement reveal?', options: [
          { t: 'Sable was paid to build the corridor to the courthouse boundary', v: 'a' },
          { t: 'The tower was never insured', v: 'b' },
          { t: 'Celeste Rook was the sole developer', v: 'c' }
        ],
        answer: 0, gives: ['c30_contract'],
        log: 'The development agreement pays Sable a Â£4 million bonus for certification and explicitly requires a basement route to the courthouse boundary.',
        wrong: 'Read clause 9. The corridor is a contractual requirement, not an accident.' }
    ],
    audioCalls: [
      { id: 'c30-999', title: 'Emergency call - site foreman', sub: 'Marek reports the fall', cue: 'Under Marek\'s voice: the wind through the open floor, then a lift bell, then Sable in the background saying, I was not here, I was not here.', pattern: [420, 0, 300, 420, 300, 0], tone: 'triangle',
        options: [
          { t: 'Sable was at the site and repeating that he was not there', v: 'a' },
          { t: 'Sable was at home and the call proves it', v: 'b' },
          { t: 'The lift was out of service', v: 'c' }
        ],
        answer: 0, gives: ['c30_marek'], flag: 'callHeard',
        log: 'The foreman\'s emergency call captures Sable in the background insisting he was not at the site - while standing on it.',
        wrong: 'Listen to the voice in the background. He is repeating a story, not giving an alibi.' }
    ],
    mapTask: {
      q: 'Which route explains the hidden corridor and the fake exit?', options: [
        { t: 'Floor 38 shaft -> lift to ground -> basement corridor -> evidence warehouse', v: 'a' },
        { t: 'Floor 38 -> roof -> neighbouring building', v: 'b' },
        { t: 'Site office -> north gate -> home without entering the tower', v: 'c' }
      ],
      answer: 0, gives: ['c30_corridor'],
      log: 'The tower route runs from the shaft to the ground lift, through the basement corridor and into the evidence warehouse.',
      wrong: 'The corridor runs east from the basement, and the shaft is the only way down from floor 38.' },
    redHerrings: [
      { clue: 'c30_celeste', label: "Celeste's altered drawings", clearedBy: ['c30_celeste', 'c30_cipher'], note: 'Celeste redrew the basement under pressure and was in her studio all Sunday morning. She concealed the corridor; she did not kill for it.' }
    ],
    contradictions: [
      { suspect: 'victor', statement: 0, evidence: ['c30_site', 'c30_marek'],
        expose: 'His car is at the gate at 06:00, he signs in at 06:02, and the foreman sees him leave at 07:12. He was in the tower before and after Ines fell.',
        wrong: 'The gate camera, the site log and the foreman all place him there.' },
      { suspect: 'victor', statement: 1, evidence: ['c30_site'],
        expose: 'Ines\'s card was used at 07:05 without a facial match. The lift carried two people up and one down. She never left alive.',
        wrong: 'Her card left without her face. The lift count is two up, one down.' },
      { suspect: 'victor', statement: 2, evidence: ['c30_blueprint', 'c30_math'],
        expose: 'The shift creates 226 cubic metres of unrecorded corridor running east. That is not ground conditions; it is a room built on purpose.',
        wrong: 'Measure the gap. It is large enough to walk through.' },
      { suspect: 'victor', statement: 4, evidence: ['c30_audio'],
        expose: 'The intercom records him telling Ines she cannot leave with what she found in the basement. That is not a deadline; it is a threat.',
        wrong: 'Play the recording. He puts a condition on her leaving.' }
    ],
    solution: {
      minEvidence: 9,
      questions: [
        { kind: 'suspect', q: 'Who killed Ines Marlowe?', options: [
          { t: 'Victor Sable - developer of Meridian Tower', v: 'victor' },
          { t: 'Celeste Rook - the architect', v: 'celeste' },
          { t: 'Marek Voss - the site foreman', v: 'marek' },
          { t: 'An unknown intruder on the site', v: 'intruder' }
        ], answer: 'victor' },
        { kind: 'method', q: 'How did Ines die?', options: [
          { t: 'She was held at the shaft gate and pushed into the lift shaft', v: 'shaft' },
          { t: 'She fell accidentally while inspecting the shaft', v: 'fall' },
          { t: 'She was struck in the site office and moved to the shaft', v: 'struck' },
          { t: 'She jumped rather than sign the report', v: 'jump' }
        ], answer: 'shaft' },
        { kind: 'motive', q: 'Why was Ines killed?', options: [
          { t: 'She found the hidden corridor and would not certify the tower', v: 'corridor' },
          { t: 'She was selling the survey to a rival developer', v: 'rival' },
          { t: 'She had discovered Sable\'s affair with Celeste', v: 'affair' },
          { t: 'She was demanding more money for the survey', v: 'money' }
        ], answer: 'corridor' },
        { kind: 'evidence', q: 'Which evidence proves the tower hides a route to the evidence warehouse?', options: [
          { t: 'The as-built overlay and the cut police seal in the corridor', v: 'corridor' },
          { t: 'The site foreman\'s emergency call', v: 'call' },
          { t: 'Celeste\'s packing boxes', v: 'boxes' },
          { t: 'The missing hard hat', v: 'hat' }
        ], answer: 'corridor' }
      ],
      verdict: {
        who: 'Victor Sable',
        whoDesc: ', the developer of Meridian Tower, was charged with the murder of Ines Marlowe.',
        how: 'He held her at the chained-open shaft gate and pushed her thirty-eight floors. He then used her key card to fake an exit and called it a site accident.',
        why: 'Ines had found the unrecorded corridor between Meridian Tower and the courthouse evidence warehouse. Her signature would have buried it; her death was meant to bury her.',
        key: 'The as-built overlay showing 226 cubic metres of hidden corridor, and the cut police seal inside it.'
      },
      reveal: [
        'Ines Marlowe signed in at 06:10 and never signed out. Her card did, at 07:05, in a reader that cannot read a dead woman\'s face.',
        'The lift carried two people up and one down. The approved pilings and the as-built survey disagree by a corridor: the same corridor that explains where this city\'s evidence has been going.',
        'The site foreman\'s call was panic, not confession. Celeste Rook hid the corridor on paper because Sable pressured her; she spent Sunday in her studio, drawing the truth for the inquiry.'
      ],
      quote: 'Thirty-eight floors of glass, and the honest part was underground.',
      twist: 'The final blueprint was never about the tower. It was a map of every case the city had buried, and Sable built the door.'
    }
  });
})();
