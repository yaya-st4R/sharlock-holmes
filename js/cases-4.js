/* ============================================================
   CASES 08–10
   ============================================================ */
(function () {
  'use strict';
  const C = window.SH.cases;

  /* ------------------------------------------------------------
     CASE 08 — THE MIDNIGHT DINER
     ------------------------------------------------------------ */
  C.push({
    id: 'c08', num: 8,
    title: 'The Midnight Diner',
    subtitle: 'The cook is dead in the freezer, the till is short, and the last receipt was printed after he died.',
    difficulty: 3, est: '30–40 min',
    cover: { kind: 'diner', mood: 'night' },
    facts: [
      { k: 'Victim', v: 'Gus Malone, 52 — night cook' },
      { k: 'Scene', v: 'The Blue Hour diner, walk-in freezer' },
      { k: 'Found', v: '02:40 — by the waitress' },
      { k: 'Cause', v: 'Blunt-force trauma, then hypothermia' }
    ],
    briefing: [
      'The Blue Hour is the kind of diner that stays open because it has always stayed open. At two in the morning it serves cab drivers, nurses coming off shift, and people who have nowhere better to be. Gus Malone has cooked there for nineteen years.',
      'At 02:40 the waitress opened the walk-in freezer and found him on the floor between the boxes of fries, with a dent in the back of his skull and a meat tenderizer beside him. The freezer thermostat had been turned up to its warmest setting. The door had been wedged shut from the outside with a mop handle.',
      'The till is short. The safe is open. The security camera has been unplugged. It looks like a robbery that went wrong — except the robber took nothing valuable, and the last receipt in the register was printed at 02:12, twenty minutes after Gus died.',
      'A dead cook, a fake robbery, and a receipt from the future. Somebody in this diner is very bad at lying, and somebody else is very good at it.'
    ],
    opening: 'The diner is still warm. The griddle is off, but the lights are on and the coffee machine is ticking as it cools. In the freezer, Gus Malone is lying on his side with one hand under his cheek, as though he decided to take a nap and forgot to wake up.',
    objectives: [
      'Establish the real time of death against the freezer thermostat.',
      'Explain the receipt printed after Gus died.',
      'Identify the weapon and the person who handled it.',
      'Find out what Gus was about to do before he was killed.'
    ],
    locations: [
      {
        id: 'diner', name: 'The Blue Hour diner', short: 'Diner', time: '03:10',
        art: { kind: 'diner', mood: 'night' },
        intro: 'Red vinyl booths, a counter of cracked chrome, and a jukebox that has been playing the same three songs since 1987. The register is open. The cash drawer is empty. On the floor by the counter, a broken coffee cup has been swept into a neat pile.',
        actions: [
          {
            id: 'body', label: 'Examine the scene', icon: 'blood', hotspot: { x: 34, y: 72 },
            desc: 'The counter, the till, the mop handle', gives: ['autopsy-note', 'robbery-scene'],
            text: [
              'The till is empty, but the safe is not. A stack of deposit bags sits inside, untouched. Whoever cleaned out the register knew exactly how much cash would be there — and exactly how little it was worth.',
              'The security camera cable has been pulled out of the wall, not cut. There is dust on the plug. It was unplugged before the robbery, which means the robber knew where the socket was.',
              'The broken cup on the floor has been swept up, but the brush is still on the counter. Nobody sweeps a crime scene unless they are trying to make it look like an ordinary accident.'
            ]
          },
          {
            id: 'receipts', label: 'Collect the receipts', icon: 'receipt',
            desc: 'Three tickets, one impossible timestamp', gives: ['receipt-stack'],
            text: [
              'The register holds three receipts from the night: a cab driver at 23:50, a nurse at 00:35, and a takeaway order at 02:12. The last one is for a double burger, fries, and a chocolate shake.',
              'Gus was found at 02:40. The pathologist says he died between 00:45 and 01:15. The 02:12 receipt was printed after his death — by someone who knew the menu well enough to ring it up.',
              'The takeaway order was never collected. It is still sitting in a bag on the counter, cold and untouched.'
            ]
          },
          {
            id: 'eliot', label: 'Interview Eliot Cross', icon: 'user', suspect: 'eliot',
            desc: 'Waiter · on shift all night', hint: 'Eliot was the only person working front of house. Ask him about the last customer.'
          }
        ]
      },
      {
        id: 'kitchen', name: 'The kitchen', short: 'Kitchen', time: '04:20',
        art: { kind: 'diner', mood: 'kitchen' }, requires: ['receipt-stack'],
        intro: 'A narrow kitchen of steel and grease. The grill is still warm. The meat tenderizer is on the counter, wiped but not washed. A phone lies face up beside the sink, screen cracked, battery at 4%.',
        actions: [
          {
            id: 'weapon', label: 'Examine the meat tenderizer', icon: 'tool',
            desc: 'Wiped handle, a single print', requires: ['receipt-stack'], gives: ['weapon-tenderizer'],
            text: [
              'The tenderizer is heavy, cast aluminium, with a wooden handle. The handle has been wiped, but the head has not. A single print is visible on the flat side, in what looks like kitchen grease.',
              'The print is small, narrow, and unmistakably a woman’s. The other side of the head carries a dark stain that the wipe missed.',
              'In the knife drawer, a boning knife is missing from its slot. The slot is dusty; the knife has been gone for a while.'
            ]
          },
          {
            id: 'phone', label: 'Play Gus’s last voicemail', icon: 'audio', kind: 'puzzle', puzzle: 'gus-voicemail',
            desc: 'A message saved at 01:05', requires: ['receipt-stack'],
            hint: 'Gus called someone at one in the morning. The voicemail is still on his phone. Listen under the kitchen noise.'
          },
          {
            id: 'rhonda', label: 'Interview Rhonda Beck', icon: 'user', suspect: 'rhonda',
            desc: 'Owner · arrived at 03:00', hint: 'Rhonda owns the diner. She arrived after the body was found with a insurance folder under her arm.'
          }
        ]
      },
      {
        id: 'freezer', name: 'The walk-in freezer', short: 'Freezer', time: '05:30',
        art: { kind: 'basement', mood: 'cold' }, requires: ['voicemail'],
        intro: 'A steel box at the back of the kitchen, breathing cold air. The thermostat has been turned to its warmest setting, but the floor is still slick with ice. Boxes of fries are stacked against the wall. One box has been moved.',
        actions: [
          {
            id: 'log', label: 'Check the freezer thermostat', icon: 'clock',
            desc: 'A tampered dial and a temperature log', requires: ['voicemail'], gives: ['freezer-log', 'time-shift'],
            text: [
              'The thermostat has been turned from minus eighteen to minus two. At that temperature, a body cools much more slowly. The pathologist’s estimate of death between 00:45 and 01:15 is based on the body being found at minus eighteen.',
              'At minus two, the body would have cooled at half the rate. Gus could have died as early as 23:45 or as late as 01:40. The thermostat was tampered with to move the time of death.',
              'The freezer’s internal log is a paper chart, changed weekly. Someone has drawn a second line on it in pencil, then rubbed it out. The erased line sits at 00:52.'
            ]
          },
          {
            id: 'box', label: 'Search the freezer boxes', icon: 'search',
            desc: 'A missing knife and a bloodied apron', requires: ['freezer-log'], gives: ['hidden-knife'],
            text: [
              'Behind the fries, wrapped in a black bin bag, is the missing boning knife. The blade is clean but the handle is sticky. Beside it, a white apron folded into a square. The apron has a name tag: <b>RHONDA</b>.',
              'The apron is stained with blood and grease. The blood is on the inside, as though the apron was worn while someone knelt over a body.',
              'Under the apron, a bank deposit slip for £2,400, dated tomorrow. The account is the diner’s. The signature is Rhonda Beck’s. The slip has not been filled in by the bank; it has been filled in by hand, at the counter, in a hurry.'
            ]
          }
        ]
      },
      {
        id: 'parking', name: 'Parking lot', short: 'Parking lot', time: '06:40',
        art: { kind: 'parking', mood: 'night' }, requires: ['freezer-log'],
        intro: 'A cracked asphalt lot behind the diner, lit by one sodium lamp and the red glow of the diner sign. A tow truck is parked across two spaces. The diner’s back door opens directly onto the lot.',
        actions: [
          {
            id: 'search', label: 'Search the parking lot', icon: 'search', hotspot: { x: 64, y: 64 },
            desc: 'A customer’s car, a cigarette, a dropped wallet', gives: ['parking-ticket', 'hal-statement'],
            text: [
              'A silver saloon is still parked in the far corner, engine cold, windows fogged. Inside: a takeaway bag from the diner, a paperback, and a wallet belonging to <b>HAL PRENTICE</b>. Hal is a regular who comes in every night at eleven and leaves at one.',
              'The takeaway bag contains a double burger, fries, and a chocolate shake — the same order as the 02:12 receipt. It was never collected.',
              'By the back door, a cigarette end with a lipstick ring. The brand is the same one Rhonda smokes. The back door was propped open with a brick, even though the diner’s security policy says it must be locked after midnight.'
            ]
          },
          {
            id: 'hal', label: 'Question Hal Prentice', icon: 'user', suspect: 'hal',
            desc: 'Regular customer · his car never left', hint: 'Hal’s car is still here. Ask why his order was rung up after he left.'
          },
          {
            id: 'till', label: 'Balance the till', icon: 'math', kind: 'puzzle', puzzle: 'till-math',
            desc: 'Three receipts, one missing deposit', optional: true,
            hint: 'Add the three receipts. Then compare the total to the deposit slip. The difference is the motive.'
          }
        ]
      },
      {
        id: 'office', name: 'Rhonda’s office', short: 'Office', time: '08:00',
        art: { kind: 'office', mood: 'diner' }, requires: ['freezer-log'],
        intro: 'A converted storeroom with a desk, a filing cabinet, and a framed photograph of Gus and Rhonda at the diner’s opening. Both of them are laughing. The frame is dusty. The desk has been cleared, but the bin is full.',
        actions: [
          {
            id: 'rhonda', label: 'Question Rhonda Beck', icon: 'user', suspect: 'rhonda',
            desc: 'Owner · insurance folder, missing apron', hint: 'Rhonda’s apron is in the freezer. Ask her why.'
          },
          {
            id: 'books', label: 'Search the office', icon: 'ledger',
            desc: 'Insurance, debts, and a partnership agreement', gives: ['insurance-policy', 'partnership'],
            text: [
              'The filing cabinet is locked, but the key is in the desk. Inside: an insurance policy on the diner, increased three weeks ago to cover “key person loss”. The beneficiary is Rhonda Beck. The policy pays out on accidental death or murder on the premises.',
              'A partnership agreement, signed nineteen years ago, gives Gus a forty percent share. A handwritten note clipped to it says: <b>“Gus wants out. Wants the buyout by Friday. Where do I get 80k?”</b>',
              'The bin contains a torn-up letter from the bank: a second mortgage, two months in arrears, and a final notice. Rhonda was not just short of money. She was drowning.'
            ]
          },
          {
            id: 'orders', label: 'Reconstruct the last orders', icon: 'clock', kind: 'puzzle', puzzle: 'order-log',
            desc: 'Who ordered what, and when', requires: ['insurance-policy'],
            hint: 'The receipts and the parking lot tell the same story. Put the last hour of the diner in order.'
          }
        ]
      }
    ],
    puzzles: {
      'gus-voicemail': {
        type: 'audio', title: 'Gus’s Last Voicemail', subtitle: '01:05 · forty-one seconds', icon: 'audio',
        prompt: 'Gus called his brother at 01:05. The voicemail is still on his phone, recorded in the kitchen with the extractor fan running. Listen under the noise.',
        pattern: [480, 480, 480, 0, 360, 360, 0, 240, 240],
        tempo: 0.29,
        waveform: 'Three even tones, a pause, two lower tones, a pause, two falling tones. A man repeating a name and a number. The rhythm is urgent but not panicked.',
        options: [
          { t: 'Gus telling his brother that Rhonda threatened him over the buyout', v: 'rhonda' },
          { t: 'A customer complaining about a cold burger', v: 'customer' },
          { t: 'Eliot asking Gus to cover the late shift', v: 'eliot' },
          { t: 'A radio advert for the diner', v: 'advert' }
        ],
        answer: 'rhonda',
        wrong: 'The voice is low and close to the phone. It repeats a name twice. It is not a customer, and it is not a radio.',
        hintText: 'The first repeated word has two syllables. The second is a sum of money. Gus is not asking for help; he is warning someone.',
        success: 'The voice resolves under the fan: <i>“Rhonda says she will not pay the buyout. She said if I push it, I will regret it. I am coming home tomorrow. If I do not—”</i> The message ends.',
        successTitle: 'Gus knew.',
        gives: ['voicemail'], flags: ['heardGus'],
        short: 'Gus warned his brother about Rhonda.',
        log: 'Gus’s voicemail says Rhonda refused the buyout and threatened him: “If I push it, I will regret it.”'
      },
      'till-math': {
        type: 'math', title: 'Balance the Till', subtitle: 'Three receipts, one deposit', icon: 'math',
        info: 'Three receipts: £14.50, £9.25, and £21.75. The deposit slip in the freezer is for £24.00. The register float was £20.00. <br><br>How much cash is missing from the till?',
        placeholder: 'Amount in pounds', unit: '£', answer: 21.5, tolerance: 0.01,
        working: 'Receipts total £45.50. Float £20.00. Expected cash: £65.50. Deposit slip: £24.00. Missing: £41.50 — or, if the deposit slip is the true total taken, the register was short by £21.50 before the deposit.',
        hintText: 'Add the receipts, add the float, subtract the deposit slip. The difference is the amount Rhonda needed.',
        wrong: 'Recheck the arithmetic. Add the receipts first, then the float, then subtract the deposit.',
        success: 'The till is short by £21.50 — exactly the amount of the diner’s final mortgage payment. This was not a robbery. It was a woman balancing her books with a dead man’s cash.',
        successTitle: 'The till balances.',
        gives: ['till-math'], flags: ['tillDone'],
        short: 'The missing cash matches Rhonda’s mortgage payment.',
        log: 'The till is short by £21.50, matching the diner’s final mortgage payment. The “robbery” was staged.'
      },
      'order-log': {
        type: 'sequence', title: 'The Last Hour', subtitle: 'Receipts, cars, and one impossible order', icon: 'clock',
        prompt: 'Put the last hour of the Blue Hour in order. The receipts, the parking lot, and the freezer log must all agree.',
        items: [
          { t: '23:50 — cab driver pays and leaves', sub: 'receipt 1', order: 0 },
          { t: '00:35 — nurse orders coffee', sub: 'receipt 2', order: 1 },
          { t: '00:52 — freezer thermostat turned up', sub: 'erased log line', order: 2 },
          { t: '01:05 — Gus leaves a voicemail', sub: 'his brother', order: 3 },
          { t: '02:12 — takeaway order rung up', sub: 'after Gus died', order: 4 },
          { t: '02:40 — body found', sub: 'freezer door wedged', order: 5 }
        ],
        hintText: 'The thermostat was changed before Gus called his brother. The takeaway order came after he was dead.',
        success: 'The last hour has a shape: a tampered thermostat, a warning voicemail, and a takeaway order rung up by someone who was not Gus.',
        wrong: 'The voicemail came after the thermostat was changed. The takeaway order came after the voicemail. Start with the last real customer.',
        gives: ['order-log'], flags: ['orderDone'],
        short: 'The last hour is reconstructed.',
        log: 'The freezer thermostat was changed at 00:52, Gus called his brother at 01:05, and the takeaway order was rung up at 02:12 after he died.'
      }
    },
    suspects: [
      {
        id: 'rhonda', name: 'Rhonda Beck', role: 'Owner · insurance beneficiary', location: 'office', locationName: 'Rhonda’s office', tag: 'Prime suspect',
        portrait: { seed: 'rhonda-beck', hair: 'curly', hairColor: '#7a2e2e', skin: 1, expression: 'wary', collar: 'apron', eyes: '#2b1a12' },
        intro: 'Rhonda is fifty, with the arms of someone who has carried a lot of plates and the eyes of someone who has not slept. She arrived at three with an insurance folder under her arm and has been crying in a way that stops whenever you ask a question.',
        questions: [
          {
            q: 'Where were you when Gus died?', gives: ['rhonda-alibi'],
            a: '“At home. I left at midnight. Eliot closed up.” She looks at the office door. “Gus and I argued earlier. About the buyout. He wanted his share by Friday and I did not have it. That is not a reason to kill someone. That is a reason to have a headache.”',
            follow: 'The diner’s back door was propped open with a brick at 00:40. Rhonda’s cigarette is beside it.'
          },
          {
            q: 'Your apron was in the freezer.', requires: ['hidden-knife'],
            a: '“I keep a spare here. It must have fallen.” She hears how it sounds. “I did not put it there. Why would I put my own apron next to a body?”<br><br>“You think I am stupid? I have been running this diner for nineteen years. I know how to hide things.”',
            gives: ['rhonda-slip'], flags: ['rhondaHostile']
          },
          {
            q: 'Gus called his brother at one. He said you threatened him.', requires: ['voicemail'], present: true,
            a: 'Her face goes very still. “He called me a thief. He said he would take the diner apart brick by brick if he had to. I told him to go home and sleep it off.”<br><br>“I did not threaten to kill him. I said he would regret pushing me. That is not the same thing.”',
            gives: ['rhonda-admission'], flags: ['rhondaBroke']
          },
          {
            q: 'The till is short by exactly your mortgage payment. The receipt was printed after he died.', requires: ['till-math'], present: true,
            a: 'She looks at the numbers for a long time. “I did not plan it. He was in the kitchen, shouting about the buyout. I picked up the tenderizer to scare him. He laughed at me.”<br><br>“The freezer was open. I only meant to lock him in until he calmed down. When I came back, he was not moving.”',
            gives: ['rhonda-confession']
          }
        ],
        after: 'She asks whether the diner will stay open. It is the only question she asks about the future.'
      },
      {
        id: 'eliot', name: 'Eliot Cross', role: 'Waiter · front of house', location: 'diner', locationName: 'Diner', tag: 'Witness / suspect',
        portrait: { seed: 'eliot-cross', hair: 'long', hairColor: '#2b1a12', skin: 4, expression: 'nervous', collar: 'apron', eyes: '#3a2159' },
        intro: 'Eliot is twenty-three and has been working nights for six months. He keeps looking at the register. He says he did not see anything, then remembers three things he saw, then says he is not sure.',
        questions: [
          {
            q: 'What happened after Rhonda left?', gives: ['eliot-statement'],
            a: '“Nothing. Gus was in the kitchen. I was front of house. The cab driver left, the nurse left, and then it was quiet.” He swallows. “I went out back for a cigarette at one. When I came in, the kitchen door was shut and the freezer light was on.”<br><br>“I did not open it. I thought Gus was cleaning.”',
            follow: 'He does not mention the 02:12 receipt. You have to ask him twice.'
          },
          {
            q: 'Who rang up the 02:12 order?', requires: ['receipt-stack'],
            a: '“I did.” He says it too quickly. “A guy called from the payphone. Same as Hal’s order. I rang it up and put it in a bag. He said he would collect it.”<br><br>“I did not see who called. I did not think. I just wanted to finish the shift.”',
            gives: ['eliot-receipt']
          },
          {
            q: 'You were alone with a body in the freezer.', requires: ['freezer-log'],
            a: '“I did not know he was in there!” His voice cracks. “I thought he had gone home. Rhonda called me at two and said she was coming back. She told me to ring up one last order so the till would look normal.”<br><br>“She said it was for the insurance. She said if I did not help, I would lose my job.”',
            gives: ['eliot-pressure'], flags: ['eliotBroke']
          }
        ],
        after: 'He is not a killer. He is a witness who was paid in shifts and fear, and he has been waiting for someone to ask the right question.'
      },
      {
        id: 'hal', name: 'Hal Prentice', role: 'Regular customer · silver saloon', location: 'parking', locationName: 'Parking lot', tag: 'Witness',
        portrait: { seed: 'hal-prentice', hair: 'buzz', hairColor: '#d1d5db', skin: 0, expression: 'tired', collar: 'coat', eyes: '#2b1a12', age: 'old' },
        intro: 'Hal is seventy, retired, and comes to the Blue Hour every night because his wife used to come with him and he has not found a better way to miss her. He is sitting in his car with the engine off, waiting to be asked.',
        questions: [
          {
            q: 'Why is your car still here?', gives: ['hal-alibi'],
            a: '“Because I fell asleep.” He gestures at the paperback. “I come in at eleven, order the same thing, and leave at one. Last night I fell asleep in the car. When I woke up, the police were here.”<br><br>“I did not go in. I did not see anything. I am sorry.”',
            follow: 'His receipt is in the takeaway bag. It is timestamped 23:55, not 02:12.'
          },
          {
            q: 'Did you see Rhonda leave?', requires: ['freezer-log'],
            a: '“I saw her car at midnight. She drove off fast. Then she came back around two, parked by the back door, and went in with a folder.” He looks at the diner. “I thought she had forgotten something. She was in there for a long time.”',
            gives: ['hal-witness'], flags: ['halTruth']
          }
        ],
        after: 'He asks whether Gus suffered. You tell him it was quick. He nods and says Gus made the best burger in the city. It is not relevant. It is the only thing he wants to say.'
      }
    ],
    clues: {
      'autopsy-note': {
        name: 'The pathologist’s note', caption: 'Blunt force · then hypothermia', icon: 'blood', type: 'Forensic report',
        desc: 'Gus was struck from behind, then placed in the freezer while still alive. Death was caused by hypothermia, not the blow. Estimated time: 00:45–01:15.',
        tells: 'The killer wanted him to die slowly, or wanted the body found later. The freezer was a holding place, not a hiding place.'
      },
      'robbery-scene': {
        name: 'The staged robbery', caption: 'Till empty · safe untouched · camera unplugged', icon: 'money', type: 'Scene evidence',
        desc: 'The till was emptied but the safe was not touched. The camera was unplugged at the socket. A broken cup was swept into a neat pile.',
        tells: 'The “robber” knew the layout and wanted the scene tidy. This was not theft; it was theatre.'
      },
      'receipt-stack': {
        name: 'The three receipts', caption: '02:12 · printed after death', icon: 'receipt', type: 'Records',
        desc: 'A cab driver at 23:50, a nurse at 00:35, and a takeaway order at 02:12. The takeaway was never collected and the order matches Hal’s usual.',
        tells: 'Someone used the register after Gus died to make the night look normal. They knew Hal’s order well enough to fake it.'
      },
      'weapon-tenderizer': {
        name: 'The meat tenderizer', caption: 'Cast aluminium · small greasy print', icon: 'tool', type: 'Weapon',
        desc: 'A heavy tenderizer with a wiped handle and a single print on the head. The print is small, narrow, and female. A boning knife is missing from the drawer.',
        tells: 'The killer is a woman who works in the kitchen. The missing knife was hidden separately, in the freezer.'
      },
      'freezer-log': {
        name: 'The tampered thermostat', caption: 'Minus 18 → minus 2', icon: 'clock', type: 'Scene evidence',
        desc: 'The freezer thermostat was turned from minus eighteen to minus two, slowing the cooling of the body. An erased pencil line sits at 00:52.',
        tells: 'The time of death was deliberately shifted. The killer knew the pathologist would use the freezer temperature.'
      },
      'time-shift': {
        name: 'The time-of-death problem', caption: '00:45–01:15 → 23:45–01:40', icon: 'clock', type: 'Deduction',
        desc: 'At minus two, the body would have cooled at half the rate. The real window runs from 23:45 to 01:40, which includes both Rhonda’s departure and her return.',
        tells: 'The thermostat does not clear Rhonda. It widens the window to include her, and it proves someone tampered with the scene.'
      },
      'hidden-knife': {
        name: 'The hidden knife and apron', caption: 'Freezer · name tag RHONDA', icon: 'mask', type: 'Physical evidence',
        desc: 'A boning knife and a bloodstained apron with Rhonda’s name tag, wrapped in a bin bag behind the fries. A £2,400 deposit slip in the apron pocket.',
        tells: 'Rhonda was in the freezer with the body and tried to hide the tools. The deposit slip is the money she needed.'
      },
      'voicemail': {
        name: 'Gus’s voicemail', caption: '01:05 · “You will regret it.”', icon: 'audio', type: 'Audio evidence',
        desc: 'Gus tells his brother that Rhonda refused the buyout and threatened him: “If I push it, I will regret it.”',
        tells: 'Gus knew he was in danger and named the person. His death was not a random robbery.'
      },
      'insurance-policy': {
        name: 'The key-person policy', caption: 'Increased three weeks ago', icon: 'money', type: 'Financial evidence',
        desc: 'An insurance policy on the diner increased to cover “key person loss”, with Rhonda as beneficiary. It pays on accidental death or murder on the premises.',
        tells: 'Rhonda had a financial reason for Gus to die at work. The policy was increased before the murder, not after.'
      },
      partnership: {
        name: 'The partnership agreement', caption: 'Gus owns 40% · buyout due Friday', icon: 'note', type: 'Document',
        desc: 'Gus owned forty percent of the diner and wanted out. A note in Rhonda’s hand: “Where do I get 80k?” A bank letter warns of a second mortgage in arrears.',
        tells: 'Rhonda could not pay the buyout. Killing Gus removed the debt and triggered the insurance. Motive and method in one folder.'
      },
      'till-math': {
        name: 'The short till', caption: '£21.50 missing', icon: 'money', type: 'Financial evidence',
        desc: 'The receipts, float, and deposit slip leave the till £21.50 short — the exact amount of Rhonda’s final mortgage payment.',
        tells: 'The “robbery” took exactly what Rhonda needed and nothing else. That is not a robber. That is an owner.'
      },
      'order-log': {
        name: 'The last hour', caption: '00:52 → 02:40', icon: 'clock', type: 'Timeline',
        desc: 'Thermostat changed at 00:52, voicemail at 01:05, fake takeaway order at 02:12, body found at 02:40.',
        tells: 'The scene was manipulated in stages. The fake order was the last thing done before the body was “found”.'
      },
      'parking-ticket': {
        name: 'Hal’s takeaway', caption: 'Ordered 23:55 · never collected', icon: 'receipt', type: 'Physical evidence',
        desc: 'A takeaway bag in Hal’s car with a 23:55 receipt for the same order as the 02:12 receipt. Hal fell asleep and never collected it.',
        tells: 'The 02:12 order was a duplicate created by someone watching the register, not a real customer.'
      },
      'hal-statement': {
        name: 'Hal’s car', caption: 'Parked all night · engine cold', icon: 'car', type: 'Physical evidence',
        desc: 'Hal’s silver saloon in the far corner, fogged windows, a paperback, and a takeaway bag. He was asleep in it from one until the police arrived.',
        tells: 'Hal was on the lot all night, with a view of the back door. He is the closest thing to a witness.'
      },
      'hal-alibi': {
        name: 'Hal’s explanation', caption: '“I was asleep in the car.”', icon: 'audio', type: 'Interview',
        desc: 'Hal admits he lied about leaving because he was sleeping off a double shift in the car park. His car never moved; the engine was cold when the police arrived.',
        tells: 'Hal is a witness with a reason to lie about being there, but no reason to kill Gus.'
      },
      'rhonda-alibi': {
        name: 'Rhonda’s account', caption: '“I left at midnight.”', icon: 'note', type: 'Alibi',
        desc: 'Rhonda says she went home at midnight and returned at three. Her cigarette is by the propped-open back door, and Hal saw her car return at two.',
        tells: 'The alibi places her at the diner at midnight and again at two — the two ends of the real time-of-death window.'
      },
      'rhonda-slip': {
        name: '“I know how to hide things”', caption: 'Rhonda on the apron', icon: 'audio', type: 'Statement',
        desc: 'Rhonda dismisses the apron as a spare and then says, “I know how to hide things,” before correcting herself.',
        tells: 'She is thinking like a person who has already hidden something. The freezer was the hiding place.'
      },
      'rhonda-admission': {
        name: '“He would regret pushing me”', caption: 'Rhonda on the threat', icon: 'audio', type: 'Statement',
        desc: 'Rhonda admits she told Gus he would regret pushing her, but insists it was not a threat to kill him.',
        tells: 'She has admitted the threat Gus reported. The only remaining question is what she did in the freezer.'
      },
      'rhonda-confession': {
        name: '“I only meant to lock him in”', caption: 'Rhonda’s confession', icon: 'audio', type: 'Statement',
        desc: 'Rhonda admits striking Gus with the tenderizer, putting him in the freezer to “cool off”, and finding him dead when she returned.',
        tells: 'This is not a denial. It is a confession with a lesser charge attached, and it leaves out the staged robbery.'
      },
      'eliot-statement': {
        name: 'Eliot’s account', caption: '“The kitchen door was shut.”', icon: 'note', type: 'Witness statement',
        desc: 'Eliot went out for a cigarette at one. When he came back, the kitchen door was shut and the freezer light was on. He did not open it.',
        tells: 'The freezer was in use at one in the morning. Eliot heard or saw something and chose not to look.'
      },
      'eliot-receipt': {
        name: 'The 02:12 order', caption: 'Rung up by Eliot', icon: 'receipt', type: 'Witness statement',
        desc: 'Eliot admits ringing up the takeaway order at 02:12 at Rhonda’s instruction, to make the till look normal for the insurance.',
        tells: 'Rhonda directed the staging after the death. Eliot is an accomplice to the cover-up, not the killing.'
      },
      'eliot-pressure': {
        name: 'Rhonda’s phone call', caption: '02:00 · “Ring up one last order.”', icon: 'phone', type: 'Witness statement',
        desc: 'Rhonda called Eliot at two and told him to ring up a fake order so the till would look normal. She said it was for the insurance.',
        tells: 'Rhonda was at the diner or nearby at two, directing the scene. Her claim that she arrived at three is false.'
      },
      'hal-witness': {
        name: 'Hal’s observation', caption: 'Rhonda’s car returned at 02:00', icon: 'car', type: 'Witness statement',
        desc: 'Hal saw Rhonda’s car leave fast at midnight, return at two, and park by the back door. She went in with a folder and stayed a long time.',
        tells: 'Rhonda was at the diner during the staging window. The “arrived at three” story is a lie.'
      }
    },
    solution: {
      minEvidence: 8,
      questions: [
        {
          q: 'Who killed Gus Malone?',
          options: [
            { t: 'Rhonda Beck — the owner', v: 'rhonda' },
            { t: 'Eliot Cross — the waiter', v: 'eliot' },
            { t: 'Hal Prentice — the regular customer', v: 'hal' },
            { t: 'A robber who was interrupted', v: 'robber' }
          ],
          answer: 'rhonda'
        },
        {
          q: 'How was the time of death disguised?',
          options: [
            { t: 'The freezer thermostat was turned up to slow the body’s cooling', v: 'thermostat' },
            { t: 'The body was kept in a warm car before being moved', v: 'car' },
            { t: 'The pathologist was bribed', v: 'bribe' },
            { t: 'The clock in the diner was wrong', v: 'clock' }
          ],
          answer: 'thermostat'
        },
        {
          q: 'What was the motive?',
          options: [
            { t: 'Gus wanted a buyout Rhonda could not pay, and his death triggered insurance', v: 'money' },
            { t: 'Gus was stealing from the till', v: 'theft' },
            { t: 'A love triangle involving Eliot', v: 'romance' },
            { t: 'Gus was going to sell the diner to a chain', v: 'sale' }
          ],
          answer: 'money'
        },
        {
          q: 'Which evidence breaks the case?',
          options: [
            { t: 'The meat tenderizer and the missing knife', v: 'weapon' },
            { t: 'The tampered thermostat and the fake 02:12 receipt', v: 'timeline' },
            { t: 'Hal’s takeaway bag and his car', v: 'hal' },
            { t: 'The insurance policy alone', v: 'insurance' }
          ],
          answer: 'timeline'
        }
      ],
      verdict: {
        who: 'Rhonda Beck, 50 — owner of the Blue Hour diner',
        whoDesc: 'was arrested at the diner with the insurance folder still on her desk.',
        how: 'She struck Gus with a meat tenderizer during an argument over the buyout, then put him in the walk-in freezer while he was still alive. She turned the thermostat up to confuse the time of death, staged a robbery, and directed Eliot to ring up a fake order at 02:12.',
        why: 'Gus owned forty percent of a diner Rhonda could not afford to buy him out of. The bank was foreclosing, the policy had just been increased, and Gus had given her until Friday. She chose the freezer.',
        key: 'The freezer thermostat and the fake receipt. Rhonda moved the time of death, but she moved it into a window that included her own return to the diner — and the receipt she created to make the night look normal was printed after the man who was supposed to have cooked the order was already dead.'
      },
      reveal: [
        'The Blue Hour had been losing money for three years. Rhonda Beck had remortgaged her house, borrowed from her sister, and increased the diner’s insurance policy to cover “key person loss” — a phrase she had found in a leaflet and liked because it sounded like something that happened to other people.',
        'Gus Malone owned forty percent of the diner and wanted out. He had given Rhonda until Friday to find eighty thousand pounds. On the last night of his life he stood in the kitchen and told her, not unkindly, that he would take the diner apart brick by brick if he had to. She picked up the meat tenderizer to frighten him. He laughed at her.',
        'The first blow was not planned. The freezer was. She put him inside while he was still breathing, turned the thermostat to minus two, and wedged the door shut with a mop handle. Then she drove home, came back at two, cleared the till, unplugged the camera, and called Eliot to ring up one last order so the night would look normal.',
        'The fake order was her mistake. She chose Hal’s usual — a double burger, fries, and a chocolate shake — because it was the only order she could remember. She did not know Hal was asleep in his car outside, or that his real receipt was still in the bag on the passenger seat, timestamped 23:55.',
        'Gus’s voicemail was the other mistake. He had called his brother at one in the morning, while the freezer was still humming, and said the words that would eventually put Rhonda in a cell: she threatened me. If I push it, I will regret it.',
        'The Blue Hour closed for good on a Tuesday. The sign is still in the window. Somebody has written on it, in marker: “Best burger in the city.” Nobody has disagreed.'
      ],
      quote: 'She only meant to lock him in until he calmed down. He never did.',
      twist: 'The insurance policy would not have paid. Rhonda had increased it three weeks earlier but missed the final medical declaration, so the “key person loss” clause was void. She killed Gus for money that was never going to arrive — and the only thing she actually collected was the £21.50 from the till.'
    }
  });

  /* ------------------------------------------------------------
     CASE 09 — THE ARCHIVIST'S FIRE
     ------------------------------------------------------------ */
  C.push({
    id: 'c09', num: 9,
    title: 'The Archivist’s Fire',
    subtitle: 'A fire in the city archive, a dead archivist, and a catalogue that remembers what the flames took.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'archive', mood: 'fire' },
    facts: [
      { k: 'Victim', v: 'Nora Quill, 38 — city archivist' },
      { k: 'Scene', v: 'The municipal archive, basement stacks' },
      { k: 'Found', v: '03:20 — by the fire service' },
      { k: 'Cause', v: 'Smoke inhalation; fire set in two places' }
    ],
    briefing: [
      'The municipal archive holds two hundred years of the city’s paper memory: deeds, maps, court records, and the kind of documents that only matter when somebody wants to build something. At three in the morning it burned. The fire service found Nora Quill on the floor of the basement stacks, twenty feet from an open strongroom, with a fire blanket in her hands.',
      'The fire started in two places, which is one place more than an accident needs. The strongroom door was open. The land deed index was on the floor, half burned. The security guard’s key card was used at 01:40, but he says he was in the toilet.',
      'Nora had spent the last month digitising the archive. She told a colleague she had found “something that changes the shape of the city”. She did not say what. The server room survived the fire. The backup tapes did not.',
      'A fire in a paper archive is a perfect crime, unless somebody has already made a copy. Nora Quill was the kind of archivist who made copies.'
    ],
    opening: 'The archive smells of wet ash and melted plastic. The ceiling is a lattice of black beams. Water drips through them onto the charred floor. In the strongroom, the shelves are empty; the deeds were taken before the fire, not burned in it.',
    objectives: [
      'Find the two points of origin and the accelerant.',
      'Open the strongroom and establish what was taken.',
      'Decode Nora’s catalogue and find the copy she made.',
      'Identify who needed the city’s paper memory to disappear.'
    ],
    locations: [
      {
        id: 'archive', name: 'The archive', short: 'Archive', time: '05:10',
        art: { kind: 'archive', mood: 'fire' },
        intro: 'The main reading room has survived with smoke damage and a collapsed shelf. The basement stairs are taped off. A fire investigator is photographing a patch of floor near the periodicals, where the fire began.',
        actions: [
          {
            id: 'origin', label: 'Examine the fire scene', icon: 'flask', hotspot: { x: 62, y: 66 },
            desc: 'Two seats of fire and a chemical smell', gives: ['accelerant', 'fire-origin'],
            text: [
              'The fire investigator points with a pen. “Two seats. One here, in the periodicals. One in the basement stacks. Both started low and spread fast. That is not wiring. That is a pour.”',
              'The lab finds a residue of white spirit and a trace of paraffin. The accelerant was poured in a line between the two points, but the line failed to catch. The fire went out before it reached the strongroom.',
              'In the periodicals bin, a half-burned glove. In the pocket, a receipt for four litres of white spirit from a hardware shop three streets away. The receipt is dated yesterday.'
            ]
          },
          {
            id: 'catalogue', label: 'Recover the card catalogue', icon: 'note',
            desc: 'Charred cards and a code in the margins', requires: ['accelerant'], gives: ['catalogue-fragment'],
            text: [
              'The card catalogue is a wall of narrow drawers, most of them smoke-damaged but intact. Nora’s handwriting is on every card: titles, dates, locations, and small pencil notes in the margin.',
              'One drawer — LANDS AND DEEDS — has been emptied. The cards are gone. In their place, a single index card with a coded line in Nora’s hand: <b>“W.F. — 14/2 — THE WET FEET — ASK P.V.”</b>',
              'On the back of the card, a pencil drawing of a building with a river running through it. The building is the old Custom House. The river is not where the river should be.'
            ]
          },
          {
            id: 'ben', label: 'Interview Ben Okoro', icon: 'user', suspect: 'ben',
            desc: 'Security guard · his key card opened the door', hint: 'Ben’s card was used at 01:40. Ask him where he was.'
          }
        ]
      },
      {
        id: 'basement', name: 'Basement stacks', short: 'Basement', time: '07:00',
        art: { kind: 'basement', mood: 'fire' }, requires: ['fire-origin'],
        intro: 'A low concrete room lined with shelves, most of them empty and blackened. The strongroom door stands open, its lock intact. Water pools in the dips of the floor. On the wall, a fire map has been annotated in red marker.',
        actions: [
          {
            id: 'strongroom', label: 'Open the strongroom', icon: 'lock', kind: 'puzzle', puzzle: 'strongroom',
            desc: 'A four-digit lock and an empty deed index', requires: ['fire-origin'],
            hint: 'Nora used the archive’s founding year for every lock. The date is on the plaque in the reading room.'
          },
          {
            id: 'deeds', label: 'Check the deed index', icon: 'ledger',
            desc: 'Which deeds are missing', requires: ['strongroom-index'], gives: ['missing-deeds'],
            text: [
              'The strongroom index lists 214 deeds. Twelve are missing. All twelve relate to the same three streets beside the river — the streets where the city wants to build its new flood barrier.',
              'The deeds were not burned. The fire did not reach this shelf. They were removed, and the index was left open on the floor to make it look as if Nora was working when the fire started.',
              'On the back of the index, in Nora’s hand: <b>“Voss asked for these on Monday. I said no. He said I would regret it.”</b>'
            ]
          },
          {
            id: 'nora', label: 'Read Nora’s desk diary', icon: 'book',
            desc: 'The last week of a careful woman', requires: ['strongroom-index'], gives: ['nora-diary'],
            text: [
              'Nora’s diary is a plain notebook, one page per day. Monday: <b>“P.V. request — refused. He was angry. Said the barrier needs the land.”</b> Tuesday: <b>“Scanned all 12. Stored copy. Not on server. Ask A.C. for help.”</b>',
              'Wednesday: <b>“A.C. says the copy is safe. P.V. called again. Told him the archive is not a shredder.”</b> Thursday — the night of the fire — is blank except for a single line: <b>“If I am wrong about the deeds, the whole barrier is built on a lie.”</b>',
              'Tucked into the back cover, a photograph of Nora and a woman in a restoration studio, both laughing. The woman has paint on her hands. The caption reads: <b>“Adele — the only person who understands paper.”</b>'
            ]
          }
        ]
      },
      {
        id: 'marshal', name: 'Fire marshal’s office', short: 'Fire marshal', time: '09:20',
        art: { kind: 'office' }, requires: ['strongroom-index'],
        intro: 'A portacabin outside the archive, full of equipment cases and coffee cups. The fire marshal has been up all night and is not impressed by the city council’s offer of a statement. She has a timeline on the whiteboard.',
        actions: [
          {
            id: 'report', label: 'Read the fire report', icon: 'note',
            desc: 'Two seats, one accelerant, one open strongroom', requires: ['strongroom-index'], gives: ['fire-report'],
            text: [
              'The report confirms two seats of fire, white spirit and paraffin, and a failed accelerant trail between them. The fire was set between 01:15 and 01:50. The smoke alarm in the basement was disabled at 01:30.',
              'The alarm was disabled from the security panel with a staff code. The code belongs to Ben Okoro. The panel log also shows the strongroom door opened at 01:38 and closed at 01:44.',
              'The marshal taps the board. “Whoever did this knew the building. They knew the alarm, the strongroom, and the fire map. They also knew the fire would not reach the strongroom — because they had already emptied it.”'
            ]
          },
          {
            id: 'timeline', label: 'Reconstruct the fire', icon: 'clock', kind: 'puzzle', puzzle: 'fire-timeline',
            desc: 'Six events, one impossible alibi', requires: ['fire-report'],
            hint: 'Start with the alarm. The strongroom was opened after the alarm was disabled, and the fire was set before the smoke was seen.'
          },
          {
            id: 'adele', label: 'Interview Adele Crane', icon: 'user', suspect: 'adele',
            desc: 'Paper restorer · Nora’s friend', requires: ['fire-report'], hint: 'Adele is mentioned in Nora’s diary. Ask her what copy Nora made.'
          }
        ]
      },
      {
        id: 'studio', name: 'Restoration studio', short: 'Studio', time: '11:40',
        art: { kind: 'lab', mood: 'paper' }, requires: ['fire-report'],
        intro: 'A bright studio above a bookshop, smelling of wheat paste and solvent. Adele Crane is working on a water-damaged map with a scalpel and the concentration of a surgeon. She does not stop when you come in.',
        actions: [
          {
            id: 'adele', label: 'Interview Adele Crane', icon: 'user', suspect: 'adele',
            desc: 'Restorer · Nora’s closest friend', hint: 'Nora told Adele about the copy. Ask where it is.'
          },
          {
            id: 'ledger', label: 'Search the restoration ledger', icon: 'ledger',
            desc: 'A job booked the day before the fire', gives: ['restoration-ledger'],
            text: [
              'Adele’s ledger records every item she has treated for the city. The last entry is dated two days before the fire: <b>“12 deeds — stabilise and scan — N.Q. — confidential.”</b>',
              'The work was booked under a false title: <b>“A History of Wet Feet.”</b> Adele smiles when you read it aloud. “Nora’s joke. She said nobody would ever ask to see a book with that title.”',
              'In the ledger margin, a note: <b>“Copy stored at the old Custom House. P.V. must not know.”</b>'
            ]
          },
          {
            id: 'cipher', label: 'Decode the catalogue note', icon: 'cipher', kind: 'puzzle', puzzle: 'catalogue-cipher',
            desc: '“THE WET FEET” — a false title', requires: ['restoration-ledger'],
            hint: 'Nora wrote “ASK P.V.” in the catalogue. Turn the wheel until the false title becomes a location.'
          }
        ]
      },
      {
        id: 'council', name: 'Council office', short: 'Council', time: '14:00',
        art: { kind: 'courtroom', mood: 'office' }, requires: ['catalogue-cipher'],
        intro: 'A civic building with a marble hall and a carpet that costs more than the archive’s annual budget. Councillor Peter Voss has the corner office. On his wall, a rendering of the new flood barrier, gleaming and white, with the river running obediently through the middle.',
        actions: [
          {
            id: 'voss', label: 'Interview Peter Voss', icon: 'user', suspect: 'voss',
            desc: 'Councillor · chair of the barrier committee', hint: 'Voss asked Nora for the deeds. Ask him why.'
          },
          {
            id: 'desk', label: 'Search the councillor’s desk', icon: 'search',
            desc: 'The land file, the contract, the lie', requires: ['restoration-ledger'], gives: ['land-file', 'barrier-contract'],
            text: [
              'The desk drawer is locked with a key that is still in the lock. Inside: a land acquisition file for the three streets beside the river, a contract with a construction company owned by Voss’s brother-in-law, and a valuation that assumes the land is “unencumbered by historic title”.',
              'The contract is worth forty-one million pounds. The valuation is dated before the archive fire. The deeds would have shown that the land is held in trust for the descendants of the original dock workers — which would have delayed the barrier for a decade.',
              'At the bottom of the file, a memo in Voss’s hand: <b>“Archive is the only obstacle. Quill is being difficult. Handle it.”</b>'
            ]
          },
          {
            id: 'scans', label: 'Access the scanned deeds', icon: 'terminal', kind: 'puzzle', puzzle: 'deed-pc',
            desc: 'The archive server survived the fire', requires: ['land-file'],
            hint: 'Nora’s copy was stored under a false title. The server login is her staff number.'
          }
        ]
      }
    ],
    puzzles: {
      strongroom: {
        type: 'keypad', title: 'The Strongroom', subtitle: 'Four-digit lock', icon: 'lock',
        deviceLabel: 'ARCHIVE STRONGROOM', length: 4, code: '1888',
        prompt: 'The strongroom lock is a four-digit mechanical keypad. Nora used the same number for every archive lock: the year the building was founded.',
        hintText: 'The plaque in the reading room reads: “MUNICIPAL ARCHIVE — FOUNDED 1888.”',
        success: 'The lock releases. The strongroom is empty where the deed shelves should be. The index lies open on the floor.',
        successTitle: 'The strongroom opens.',
        gives: ['strongroom-index'], flags: ['strongroomOpen'],
        short: 'The strongroom is open and the deeds are gone.',
        log: 'The strongroom opens on empty deed shelves. Twelve deeds are missing, all for the streets beside the river.'
      },
      'fire-timeline': {
        type: 'sequence', title: 'The Fire Timeline', subtitle: 'From alarm to ashes', icon: 'clock',
        prompt: 'Put the events of the night in order. The alarm, the strongroom, and the fire must all fit inside the guard’s missing hour.',
        items: [
          { t: '01:15 — accelerant poured in the periodicals', sub: 'first seat', order: 0 },
          { t: '01:30 — basement smoke alarm disabled', sub: 'Ben’s staff code', order: 1 },
          { t: '01:38 — strongroom opened', sub: 'deeds removed', order: 2 },
          { t: '01:44 — strongroom closed', sub: 'index left open', order: 3 },
          { t: '01:50 — fire set in basement stacks', sub: 'second seat', order: 4 },
          { t: '03:20 — fire service finds Nora', sub: 'smoke inhalation', order: 5 }
        ],
        hintText: 'The alarm was disabled before the strongroom was opened. The basement fire was set after the deeds were removed.',
        success: 'The night has a sequence now: accelerant, alarm, strongroom, fire. Someone knew the building well enough to do it in that order and still leave the strongroom standing.',
        wrong: 'The strongroom cannot be opened before the alarm is disabled. The fire in the stacks was set after the deeds were gone.',
        gives: ['fire-timeline'], flags: ['timelineDone'],
        short: 'The fire timeline is reconstructed.',
        log: 'The accelerant was poured at 01:15, the alarm disabled at 01:30, the strongroom emptied at 01:38, and the basement fire set at 01:50.'
      },
      'catalogue-cipher': {
        type: 'cipher', title: 'The Catalogue Note', subtitle: '“A History of Wet Feet”', icon: 'cipher',
        plain: 'CUSTOM HOUSE', shift: 5, answer: ['custom house', 'customhouse'],
        prompt: 'Nora left a false book title in the catalogue: “THE WET FEET.” The restoration ledger says the copy is stored at the old Custom House. Decode the note to confirm the location.',
        note: 'Nora used a five-letter shift for her private notes. Turn the wheel back until the words resolve.',
        hintText: 'The building in her pencil drawing is the old Custom House. The cipher confirms it.',
        success: 'The letters resolve to <b>CUSTOM HOUSE</b>. Nora stored the scanned deeds in the old building by the river — the one whose land the barrier was supposed to take.',
        successTitle: 'The copy has a home.',
        gives: ['custom-house', 'catalogue-cipher'], flags: ['catalogueDecoded'],
        short: 'The scanned deeds are at the Custom House.',
        log: 'The catalogue cipher resolves to CUSTOM HOUSE, where Nora stored the scanned deeds under the false title “A History of Wet Feet”.'
      },
      'deed-pc': {
        type: 'terminal', title: 'The Archive Server', subtitle: 'The copy that survived', icon: 'terminal',
        user: 'nquill', host: 'archive-server-02', password: '1888',
        intro: 'The archive server survived the fire because it was in a sealed room with its own power. Nora’s staff account is still logged in. Type "help" for commands.',
        banner: 'MUNICIPAL ARCHIVE — DIGITAL STORE. 4 FILES. 1 ENCRYPTED VOLUME.',
        files: [
          { name: 'readme.txt', body: 'If you are reading this, the paper is gone. The scans are in WET_FEET. Do not trust the council. — N.Q.' },
          { name: 'deed_index.csv', body: '<span class="d">12 DEEDS — RIVERSIDE STREETS</span><br>Deed 4 — trust held for descendants of dock workers<br>Deed 7 — covenant restricts construction above 2 storeys<br>Deed 11 — <span class="y">city has no freehold title</span><br><span class="r">VALUATION (COUNCIL): “unencumbered”</span>' },
          { name: 'barrier_memo.pdf', body: '<span class="g">FLOOD BARRIER — LAND ACQUISITION</span><br>Contractor: VOSS & PARTNERS (est. 2023)<br>Value: £41,000,000<br><span class="y">NOTE: archive deeds must not reach the public inquiry.</span>' },
          { name: 'wet_feet.zip', locked: true, hint: 'Encrypted. Nora used the archive’s founding year for every lock.', secret: true, body: '<span class="g">ARCHIVE CONTENTS:</span><br><br>1. <b>deed_scans/</b> — all twelve deeds, high resolution, with the trust clauses highlighted.<br><br>2. <b>nora_note.txt</b> — <span class="y">“If I do not come back, give this to the inquiry. The barrier is being built on land the city does not own. Voss knows. He asked me to lose the deeds. I said no.”</span><br><br>3. <b>cctv_archive.mp4</b> — <span class="r">01:22 — a man in a council coat enters the archive with a jerrycan. Face visible at 01:31.</span>' }
        ],
        hintText: 'The strongroom code was the archive’s founding year: 1888. Nora used the same number for her staff account.',
        success: 'The archive opens. Twelve deed scans, a memo about the barrier contract, and CCTV footage of a man in a council coat carrying a jerrycan into the archive at 01:22.',
        successTitle: 'The copy survived.',
        gives: ['scanned-deeds', 'voss-cctv', 'nora-note'], flags: ['deedsFound'],
        short: 'Nora’s scanned deeds and the CCTV are recovered.',
        log: 'Nora’s digital archive contains the twelve deeds, a memo tying the barrier contract to Voss, and CCTV of a man in a council coat carrying a jerrycan.'
      }
    },
    suspects: [
      {
        id: 'voss', name: 'Peter Voss', role: 'Councillor · barrier committee chair', location: 'council', locationName: 'Council office', tag: 'Prime suspect',
        portrait: { seed: 'peter-voss', hair: 'short', hairColor: '#7a6a5a', skin: 0, expression: 'smug', collar: 'suit', eyes: '#2b1a12' },
        intro: 'Peter Voss is sixty-one, tanned, and wears a lapel pin shaped like a bridge. He is pleased to see you, which is the first suspicious thing about him. On his wall, the flood barrier rendering is lit like a religious painting.',
        questions: [
          {
            q: 'Why did you want the deeds?', gives: ['voss-alibi'],
            a: '“I wanted to review them. The barrier is a major public project. Due diligence.” He smiles. “Nora was protective of her archive. She treated a filing cabinet like a fortress. I respected that.”',
            follow: 'The land file in his desk says the deeds were “the only obstacle”. He did not mention that to the police.'
          },
          {
            q: 'The fire started in two places. The strongroom was emptied first.', requires: ['fire-report'],
            a: '“Terrible. Truly terrible.” He folds his hands. “But you cannot seriously suggest I set a fire in a public building. I was at a council dinner until midnight. After that, I was at home with my wife.”<br><br>“Nora was a dedicated public servant. If she died trying to save the archive, that is a tragedy. It is also not my fault.”',
            gives: ['voss-deflect'], flags: ['vossHostile']
          },
          {
            q: 'Your memo says the archive is the only obstacle. “Handle it.”', requires: ['land-file'], present: true,
            a: 'He does not look at the paper. “I write a great many memos. ‘Handle it’ means schedule a meeting. You are reading a tone into a word.”<br><br>“The deeds are old. The trust clauses are unenforceable. The barrier will be built. Nora was being obstructive for the sake of being obstructive.”',
            gives: ['voss-pressure']
          },
          {
            q: 'The CCTV shows a man in a council coat with a jerrycan at 01:22.', requires: ['voss-cctv'], present: true,
            a: 'The smile goes away. “That coat is issued to fifty people. It could be any of them.”<br><br>“I did not go there to hurt her. I went to take the deeds. She was in the basement. She saw me and she said she had already scanned them. She said the whole city would know by morning.”<br><br>“I only wanted to frighten her. The fire was supposed to be in the empty room. She went back for the index.”',
            gives: ['voss-admission'], flags: ['vossBroke']
          }
        ],
        after: 'He asks whether the barrier contract can be “paused” rather than cancelled. Even now, he is managing the story.'
      },
      {
        id: 'ben', name: 'Ben Okoro', role: 'Security guard · staff code used', location: 'archive', locationName: 'Archive', tag: 'Witness / suspect',
        portrait: { seed: 'ben-okoro', hair: 'short', hairColor: '#1b1b1b', skin: 4, expression: 'frightened', collar: 'uniform', eyes: '#2b1a12' },
        intro: 'Ben is thirty-four and has been a security guard for six months. He keeps his hands in his pockets and his eyes on the exit. His key card opened the strongroom at 01:38. He says he was in the toilet.',
        questions: [
          {
            q: 'Where were you at half one?', gives: ['ben-statement'],
            a: '“In the toilet. On the ground floor. I was there maybe fifteen minutes.” He swallows. “My card was in my pocket. I do not know how it got used. Maybe someone copied it.”<br><br>“There was a man in the building. A councillor. He came in at one and said he had permission to review the deeds. I told him he needed Nora.”',
            follow: 'He did not report the councillor’s visit. He was afraid of losing his job.'
          },
          {
            q: 'You disabled the smoke alarm with your code.', requires: ['fire-report'],
            a: '“No. I mean — the panel logs my code, but I did not touch it.” His voice rises. “The councillor asked me to show him the panel. He said he needed to check the fire system for the review. I showed him. Then I went to the toilet.”<br><br>“I know how it sounds. I know.”',
            gives: ['ben-panel'], flags: ['benBroke']
          },
          {
            q: 'Why did you not call the fire service when you smelled smoke?', requires: ['fire-timeline'],
            a: '“I did call. At two. The alarm did not go off, so I called the station directly.” He wipes his face. “The councillor told me it was a routine test. He said if I raised the alarm, I would be blamed for the damage. I am a Black security guard in a council building. I believed him.”',
            gives: ['ben-fear']
          }
        ],
        after: 'He gives you the visitor log. The councillor signed in at 01:05 and out at 02:10. The signature is Peter Voss’s.'
      },
      {
        id: 'adele', name: 'Adele Crane', role: 'Paper restorer · Nora’s friend', location: 'studio', locationName: 'Restoration studio', tag: 'Witness',
        portrait: { seed: 'adele-crane', hair: 'bun', hairColor: '#6b4a2b', skin: 2, expression: 'sad', collar: 'apron', eyes: '#3a2159' },
        intro: 'Adele is in her fifties, with wheat paste under her nails and the steady hands of someone who has spent thirty years repairing things other people broke. She has been crying, but she stopped when you came in. She is angry in a very quiet way.',
        questions: [
          {
            q: 'What did Nora ask you to do?', gives: ['adele-statement'],
            a: '“She asked me to stabilise twelve deeds and scan them. She said the originals might not survive the month.” Adele puts down her scalpel. “She was not being dramatic. She was being an archivist. Archivists know that paper burns.”<br><br>“I stored the scans at the old Custom House. She said the council must not know. She was right.”',
            follow: 'She gives you the key to the Custom House strongbox without being asked.'
          },
          {
            q: 'Who else knew about the copy?', requires: ['restoration-ledger'],
            a: '“Nora, me, and the man she called P.V. He came to the studio on Monday. He offered me money for the scans.” She looks at the map on her table. “I told him I did not know what he was talking about. He said, ‘Everyone has a price.’ I said, ‘Not for paper.’”',
            gives: ['adele-witness'], flags: ['adeleTruth']
          }
        ],
        after: 'She asks you to make sure the deeds are published, not just used as evidence. It is the only thing she asks for.'
      }
    ],
    clues: {
      accelerant: {
        name: 'The accelerant', caption: 'White spirit · paraffin · failed trail', icon: 'flask', type: 'Forensic evidence',
        desc: 'Two seats of fire, white spirit and paraffin, and a trail between them that failed to catch. A half-burned glove and a hardware receipt are in the periodicals bin.',
        tells: 'The fire was deliberate and amateur. The killer wanted the archive gone but did not understand how fire moves.'
      },
      'fire-origin': {
        name: 'The two seats', caption: 'Periodicals and basement', icon: 'blood', type: 'Scene evidence',
        desc: 'One fire in the periodicals, one in the basement stacks. Both started low. The strongroom was not burned; it was emptied.',
        tells: 'The fire was a distraction. The real target was the deed shelf, and the fire was meant to make the theft look like destruction.'
      },
      'catalogue-fragment': {
        name: 'Nora’s index card', caption: '“THE WET FEET — ASK P.V.”', icon: 'note', type: 'Written evidence',
        desc: 'A single index card left in the emptied LANDS AND DEEDS drawer: “W.F. — 14/2 — THE WET FEET — ASK P.V.” A pencil drawing of the Custom House with the river in the wrong place.',
        tells: 'Nora knew the deeds would be taken and left a trail. “P.V.” is Peter Voss, and “The Wet Feet” is a hiding place.'
      },
      'strongroom-index': {
        name: 'The strongroom index', caption: 'Twelve deeds missing', icon: 'ledger', type: 'Records',
        desc: 'Twelve deeds are missing, all for the riverside streets. The shelves were not burned. The index was left open to stage a death at work.',
        tells: 'The theft happened before the fire. The killer needed the deeds gone and the archive to look destroyed.'
      },
      'missing-deeds': {
        name: 'The missing deeds', caption: '“Voss asked. I said no.”', icon: 'note', type: 'Written evidence',
        desc: 'Nora’s note on the back of the index: “Voss asked for these on Monday. I said no. He said I would regret it.”',
        tells: 'Nora identified her killer and his motive in writing before the fire. The note survived because it was in the strongroom.'
      },
      'nora-diary': {
        name: 'Nora’s desk diary', caption: 'Scanned all 12 · “P.V. called again”', icon: 'book', type: 'Written evidence',
        desc: 'Nora refused Voss on Monday, scanned all twelve deeds on Tuesday, and told him the archive was not a shredder on Wednesday. Thursday is blank except for one line about the barrier being built on a lie.',
        tells: 'Nora knew the deeds proved the barrier was fraudulent. She made a copy and hid it. That copy is why she died.'
      },
      'fire-report': {
        name: 'The fire report', caption: 'Alarm disabled · strongroom opened', icon: 'note', type: 'Official report',
        desc: 'Fire set 01:15–01:50. Basement alarm disabled at 01:30 with Ben Okoro’s code. Strongroom opened 01:38, closed 01:44.',
        tells: 'The fire and the theft were coordinated. Someone with access to the security panel and the strongroom ran the whole sequence.'
      },
      'fire-timeline': {
        name: 'The fire timeline', caption: '01:15 → 03:20', icon: 'clock', type: 'Timeline',
        desc: 'Accelerant at 01:15, alarm off at 01:30, strongroom emptied at 01:38, fire set at 01:50, body found at 03:20.',
        tells: 'The fire was set after the deeds were taken. Nora was still in the building when the basement was lit.'
      },
      'restoration-ledger': {
        name: 'The restoration ledger', caption: '“A History of Wet Feet”', icon: 'ledger', type: 'Records',
        desc: 'A job booked two days before the fire: twelve deeds stabilised and scanned, under the false title “A History of Wet Feet”. Copy stored at the old Custom House.',
        tells: 'Nora made a copy and hid it under a joke title. The killer burned the originals but did not know about the scans.'
      },
      'custom-house': {
        name: 'The Custom House copy', caption: 'Twelve deeds · trust clauses', icon: 'archive', type: 'Digital evidence',
        desc: 'The scanned deeds show the riverside land is held in trust for the descendants of dock workers, with covenants restricting construction. The city has no freehold title.',
        tells: 'The barrier cannot legally be built on this land. The deeds are the difference between a forty-one-million contract and a fraud inquiry.'
      },
      'catalogue-cipher': {
        name: 'The false title', caption: 'Decodes to CUSTOM HOUSE', icon: 'cipher', type: 'Coded evidence',
        desc: 'Nora’s cipher confirms the copy is at the old Custom House. The title “A History of Wet Feet” was chosen because nobody would ever request it.',
        tells: 'Nora planned for the archive to burn. She made the evidence harder to find than the fire.'
      },
      'land-file': {
        name: 'The councillor’s land file', caption: '“Archive is the only obstacle.”', icon: 'ledger', type: 'Financial evidence',
        desc: 'A land acquisition file for the riverside streets, a valuation calling the land “unencumbered”, and a memo in Voss’s hand: “Archive is the only obstacle. Quill is being difficult. Handle it.”',
        tells: 'Voss knew the deeds would block the barrier. The memo is a motive with a date.'
      },
      'barrier-contract': {
        name: 'The barrier contract', caption: '£41m · Voss & Partners', icon: 'money', type: 'Financial evidence',
        desc: 'A forty-one-million-pound contract with a construction company owned by Voss’s brother-in-law. The valuation predates the fire and assumes clear title.',
        tells: 'The fraud is not abstract. Voss’s family stood to make millions if the deeds disappeared.'
      },
      'scanned-deeds': {
        name: 'The twelve scans', caption: 'Trust clauses · no freehold', icon: 'archive', type: 'Digital evidence',
        desc: 'High-resolution scans of all twelve deeds, with trust clauses and construction covenants highlighted. The city does not own the land outright.',
        tells: 'The barrier is being built on a lie. Publishing the deeds would end the contract and the councillor’s career.'
      },
      'voss-cctv': {
        name: 'The council-coat man', caption: '01:22 · a jerrycan', icon: 'cctv', type: 'Surveillance',
        desc: 'Archive CCTV shows a man in a council coat entering with a jerrycan at 01:22. His face is visible at 01:31.',
        tells: 'Voss was in the archive with an accelerant before the fire started. His presence is no longer a matter of inference.'
      },
      'nora-note': {
        name: 'Nora’s last note', caption: '“Give this to the inquiry.”', icon: 'note', type: 'Digital evidence',
        desc: '“If I do not come back, give this to the inquiry. The barrier is being built on land the city does not own. Voss knows. He asked me to lose the deeds. I said no.”',
        tells: 'Nora expected to be killed. She left instructions, evidence, and a name. The case is already solved in her own words.'
      },
      'voss-alibi': {
        name: 'Voss’s account', caption: '“Due diligence”', icon: 'note', type: 'Alibi',
        desc: 'Voss claims he wanted to review the deeds for due diligence and was at a council dinner until midnight, then home with his wife.',
        tells: 'The visitor log places him in the archive at 01:05. The dinner ended at midnight. His alibi has a one-hour hole exactly where the fire sits.'
      },
      'voss-deflect': {
        name: '“Terrible. Truly terrible.”', caption: 'Voss on the fire', icon: 'note', type: 'Interview',
        desc: 'Voss calls the fire a tragedy, denies any involvement, and describes Nora as a dedicated public servant who was being obstructive.',
        tells: 'He is already framing her death as an accident and her work as obstruction. That is a man preparing a narrative.'
      },
      'voss-pressure': {
        name: '“Schedule a meeting”', caption: 'Voss on “Handle it”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the memo, Voss claims “handle it” means scheduling a meeting and that the trust clauses are unenforceable.',
        tells: 'He does not deny the file or the contract. He denies the meaning of his own handwriting.'
      },
      'voss-admission': {
        name: '“I only wanted to frighten her”', caption: 'Voss on the night', icon: 'audio', type: 'Statement',
        desc: 'Voss admits going to the archive to take the deeds, being seen by Nora, and setting the fire to frighten her. He says she went back for the index.',
        tells: 'He has admitted arson and presence. The distinction between frightening and killing is the only thing left for a court to decide.'
      },
      'ben-statement': {
        name: 'Ben’s account', caption: '“A councillor came in at one.”', icon: 'note', type: 'Witness statement',
        desc: 'Ben says Voss entered at one, claimed permission to review the deeds, and asked to see the security panel. Ben went to the toilet and left him alone.',
        tells: 'Voss had the opportunity and the access. Ben was used, not complicit.'
      },
      'ben-panel': {
        name: 'The panel demonstration', caption: 'Voss asked to see the alarm', icon: 'note', type: 'Witness statement',
        desc: 'Ben showed Voss the fire panel because Voss said he needed to check it for the review. The alarm was disabled minutes later with Ben’s code.',
        tells: 'Voss learned the code from Ben and used it to disable the alarm. Ben’s key card was cloned or borrowed.'
      },
      'ben-fear': {
        name: 'Why Ben waited', caption: '“I would be blamed.”', icon: 'note', type: 'Witness statement',
        desc: 'Ben smelled smoke at two and called the fire service, but did not raise the alarm because Voss told him it was a test and he would be blamed for the damage.',
        tells: 'Voss deliberately delayed the alarm. That delay is what turned an arson into a death.'
      },
      'adele-statement': {
        name: 'Adele’s account', caption: '“Paper burns.”', icon: 'note', type: 'Witness statement',
        desc: 'Nora asked Adele to stabilise and scan twelve deeds because the originals might not survive the month. The scans were stored at the Custom House.',
        tells: 'Nora anticipated the fire. The copy is the only reason the case can be proved.'
      },
      'adele-witness': {
        name: 'Voss at the studio', caption: '“Everyone has a price.”', icon: 'note', type: 'Witness statement',
        desc: 'Voss came to Adele’s studio and offered money for the scans. She pretended not to know what he meant. He said everyone has a price.',
        tells: 'Voss knew about the copy before the fire. That is why he needed both the deeds and the person who made them.'
      }
    },
    solution: {
      minEvidence: 9,
      questions: [
        {
          q: 'Who set the archive fire?',
          options: [
            { t: 'Peter Voss — the councillor', v: 'voss' },
            { t: 'Ben Okoro — the security guard', v: 'ben' },
            { t: 'Adele Crane — the restorer', v: 'adele' },
            { t: 'Nora Quill — she burned the archive herself', v: 'nora' }
          ],
          answer: 'voss'
        },
        {
          q: 'Why were the deeds taken before the fire?',
          options: [
            { t: 'They proved the city did not own the land for the flood barrier', v: 'land' },
            { t: 'They were valuable antiques', v: 'value' },
            { t: 'They contained Nora’s private papers', v: 'private' },
            { t: 'They were needed for an unrelated court case', v: 'court' }
          ],
          answer: 'land'
        },
        {
          q: 'How did Nora preserve the evidence?',
          options: [
            { t: 'She sent the originals to the newspaper', v: 'newspaper' },
            { t: 'She scanned the deeds and hid them under a false title', v: 'scans' },
            { t: 'She memorised the contents', v: 'memory' },
            { t: 'She gave them to the fire marshal', v: 'marshal' }
          ],
          answer: 'scans'
        },
        {
          q: 'Which evidence breaks the case?',
          options: [
            { t: 'The accelerant and the two seats of fire', v: 'fire' },
            { t: 'The scanned deeds, the councillor’s memo, and the CCTV of the jerrycan', v: 'deeds' },
            { t: 'Ben’s missing key card', v: 'card' },
            { t: 'Adele’s restoration ledger', v: 'ledger' }
          ],
          answer: 'deeds'
        }
      ],
      verdict: {
        who: 'Peter Voss, 61 — city councillor and chair of the flood barrier committee',
        whoDesc: 'was arrested at the council chamber with the land acquisition file still open on his desk.',
        how: 'He entered the archive at 01:05, asked Ben Okoro to show him the fire panel, disabled the basement alarm with Ben’s code, emptied the strongroom of twelve deeds, poured white spirit in two places, and set the fire. Nora Quill was still in the basement. She died of smoke inhalation twenty feet from the open strongroom.',
        why: 'The deeds proved the riverside land was held in trust and could not be built on. The forty-one-million-pound barrier contract belonged to Voss’s brother-in-law. Nora refused to lose the deeds, so Voss tried to burn them — and her.',
        key: 'Nora’s scanned deeds and the councillor’s own memo. Voss burned the paper, but Nora had already made a copy, hidden under a joke title, with a note that named him and a CCTV file that showed him carrying the jerrycan.'
      },
      reveal: [
        'The flood barrier was supposed to save the city. It was also, according to the contract on Peter Voss’s desk, supposed to make his brother-in-law very rich. The only problem was twelve deeds in the municipal archive, which showed that the riverside land was held in trust for the descendants of the dock workers who had lived there for two hundred years. The city did not own the land. It had never owned the land.',
        'Nora Quill found the deeds while digitising the archive. She refused Voss’s request to “lose” them. She told him the archive was not a shredder. Then she did what a good archivist does: she made copies, stabilised the originals, and hid the scans under the least appealing title she could imagine. A History of Wet Feet.',
        'On Thursday night, Voss came to the archive with a jerrycan and a council coat. He signed in at 01:05. He asked the security guard to show him the fire panel, learned the code, and sent the guard to the toilet. He emptied the strongroom, poured white spirit in two places, and lit the basement. He thought Nora had gone home. She had come back for the index.',
        'The fire did not reach the strongroom. The scanner did not burn. The server room survived behind a fire door. By morning, the deeds were already on their way to the public inquiry, and the man in the council coat was visible on the archive’s own camera at 01:22, carrying a jerrycan through the reading room.',
        'Voss told the police it was a tragedy. He told the inquiry it was a maintenance failure. He told his wife it was a misunderstanding. The only story that survived was Nora’s, written in a catalogue card and a hidden file: the barrier is being built on land the city does not own. Voss knows.',
        'The barrier project has been suspended. The twelve deeds are on display in the reading room that survived the fire. The card catalogue has a new entry, in a different hand: “A History of Wet Feet — Quill, N. — reference only.”'
      ],
      quote: 'A fire in a paper archive is a perfect crime, unless somebody has already made a copy.',
      twist: 'Voss did not need to kill Nora. She had already sent the scans to the inquiry, and the publication was scheduled for the morning. He burned the originals to destroy evidence that had already left the building. The fire killed the only person who could have stopped the story — and guaranteed that it would run.'
    }
  });

  /* ------------------------------------------------------------
     CASE 10 — THE FERRYMAN
     ------------------------------------------------------------ */
  C.push({
    id: 'c10', num: 10,
    title: 'The Ferryman',
    subtitle: 'A ferry captain drowns at low tide, and the tide table says the water was never deep enough.',
    difficulty: 3, est: '30–40 min',
    cover: { kind: 'docks', mood: 'fog' },
    facts: [
      { k: 'Victim', v: 'Tomas Reyes, 49 — ferry captain' },
      { k: 'Scene', v: 'Pier 4, the Greystone ferry' },
      { k: 'Found', v: '05:40 — under the pier' },
      { k: 'Cause', v: 'Drowning; water in the lungs' }
    ],
    briefing: [
      'Tomas Reyes had captained the Greystone ferry for twenty-two years. He knew the tide the way other people know their own phone number. At 05:40 on Tuesday he was found under Pier 4, face down in eighteen inches of water, with his boots still on and his keys in his pocket.',
      'The harbour master says it was an accident: a man slipped on the wet pier in the fog. But the tide table says the water under Pier 4 was never deeper than two feet that night, and Tomas could swim. His lungs are full of salt water. His boots are full of mud from the riverbed, not the harbour.',
      'The ferry’s radio was found smashed in the wheelhouse. The last distress call was logged at 23:12, but the tape is missing. The first mate says she heard nothing. The warehouse owner says he saw nothing. The harbour inspector says the paperwork is in order.',
      'A ferryman who knew the tide, drowned in water that was never deep enough. The river does not lie. The people on it do.'
    ],
    opening: 'Pier 4 is wrapped in fog. The ferry bumps gently against its moorings, empty and patient. Under the pier, the water is flat and brown. Tomas Reyes is lying in it with his eyes open and his keys still in his pocket, as though he lay down for a rest and the river made a mistake.',
    objectives: [
      'Establish where Tomas actually drowned.',
      'Recover the ferry’s distress call.',
      'Use the tide table to test the harbour master’s timeline.',
      'Identify who had a reason to keep Tomas quiet.'
    ],
    locations: [
      {
        id: 'docks', name: 'Pier 4', short: 'Docks', time: '06:20',
        art: { kind: 'docks', mood: 'fog' },
        intro: 'A long concrete pier with rusted bollards and a ticket hut that has not been used since the ferry went cashless. The water is the colour of weak tea. A coil of mooring rope has been cut, not untied.',
        actions: [
          {
            id: 'body', label: 'Examine the body', icon: 'blood', hotspot: { x: 46, y: 72 },
            desc: 'Salt water, river mud, pockets intact', gives: ['water-lungs', 'boot-mud'],
            text: [
              'Tomas’s lungs are full of salt water. The water under the pier is brackish but shallow; the lab will find a higher salinity in his lungs than in the harbour. He drowned somewhere else and was moved.',
              'His boots are caked with grey river mud, the kind found on the warehouse side of the basin, not the clean gravel of Pier 4. His keys are still in his pocket. His wallet is still in his coat.',
              'There is a bruise on the back of his neck, small and round, the size of a mooring cleat. It is not the sort of bruise a fall makes.'
            ]
          },
          {
            id: 'rope', label: 'Check the mooring line', icon: 'rope',
            desc: 'Cut clean through, then retied', gives: ['cut-line'],
            text: [
              'The ferry’s bow line has been cut through with a sharp knife and then retied with a different knot. Tomas used a ferryman’s hitch. This is a granny knot, tied by someone in a hurry.',
              'The cut end is clean. A knife was used, not a rope fraying. On the bollard, a dark smear that could be oil or blood.',
              'A set of tyre tracks leads away from the pier toward the warehouse road. A heavy vehicle, loaded. The tracks are already softening in the fog.'
            ]
          },
          {
            id: 'lena', label: 'Interview Lena Cruz', icon: 'user', suspect: 'lena',
            desc: 'First mate · on the ferry that night', hint: 'Lena was on the ferry with Tomas. Ask her about the last run.'
          }
        ]
      },
      {
        id: 'ferry', name: 'The Greystone ferry', short: 'Ferry', time: '08:00',
        art: { kind: 'docks', mood: 'ferry' }, requires: ['cut-line'],
        intro: 'A small car ferry with a wheelhouse like a greenhouse and a deck that smells of diesel and seaweed. The radio is smashed. The logbook is open. In the cabin, a photograph of a girl in a hospital bed is taped to the dash.',
        actions: [
          {
            id: 'radio', label: 'Repair the ferry radio', icon: 'wire', kind: 'puzzle', puzzle: 'ferry-radio',
            desc: 'Four leads, one missing distress call', requires: ['cut-line'],
            hint: 'The radio was smashed, not disconnected. Reconnect the leads by matching the colours.'
          },
          {
            id: 'log', label: 'Read the ferry log', icon: 'book',
            desc: 'A last run that never happened', requires: ['cut-line'], gives: ['ferry-log'],
            text: [
              'The log records the ferry’s final run at 22:40, docked at 23:05. The next line is blank, but there is an indentation on the page beneath: <b>“23:10 — crossing — 1 vehicle — no passengers.”</b>',
              'The ferry did not make that crossing. The engine hour meter shows no movement after 23:05. Someone wrote the entry in advance and then did not sail.',
              'In the cabin, the photograph of the girl has a date on the back: <b>“Marisol — 9th birthday — hospital.”</b> Under it, a note in Tomas’s hand: <b>“Two more runs. Then the money is enough.”</b>'
            ]
          },
          {
            id: 'cabin', label: 'Search the cabin', icon: 'search',
            desc: 'A hidden envelope and a second manifest', requires: ['ferry-log'], gives: ['hidden-manifest', 'daughter-note'],
            text: [
              'Under the bunk, taped to the hull, an envelope. Inside: a second cargo manifest, different from the official one. It lists medical supplies — insulin, antibiotics, painkillers — loaded at the warehouse and consigned to a clinic across the river.',
              'A note in Tomas’s hand: <b>“Sarn knows. He wants a cut. I said no. If anything happens, the manifest is under the bunk. Marisol needs the medicine.”</b>',
              'The official manifest in the wheelhouse lists the same crates as “machine parts”. The signature at the bottom is not Tomas’s. It is a scrawl that matches the warehouse owner’s.'
            ]
          }
        ]
      },
      {
        id: 'harbour', name: 'Harbour office', short: 'Harbour', time: '10:15',
        art: { kind: 'office', mood: 'fog' }, requires: ['distress-call'],
        intro: 'A warm office with a wall of tide tables and a radio console that logs every channel. May Doyle has been harbour inspector for eight years and has already prepared a statement. She reads it to you before you ask a question.',
        actions: [
          {
            id: 'may', label: 'Interview May Doyle', icon: 'user', suspect: 'may',
            desc: 'Harbour inspector · accident report ready', hint: 'May has already closed the case as an accident. Ask her about the tide.'
          },
          {
            id: 'tide', label: 'Pull the tide table', icon: 'note',
            desc: 'The water was never deep enough', requires: ['distress-call'], gives: ['tide-data'],
            text: [
              'The tide table for Tuesday night is pinned above the console. Low water at 23:04. High water at 05:20. At the time of the distress call, the depth under Pier 4 was 1.8 feet. At the time of the body being found, it was 2.1 feet.',
              'Tomas was six feet one. A man cannot drown face down in eighteen inches of water unless he is held there. The harbour inspector’s report says “slipped and struck his head”. The bruise on his neck is not on his head.',
              'The tide table has been annotated in pencil: <b>“23:04 — LOW — 1.8ft — CHECK SALINITY.”</b> The handwriting is not May’s.'
            ]
          },
          {
            id: 'math', label: 'Calculate the drowning window', icon: 'math', kind: 'puzzle', puzzle: 'tide-math',
            desc: 'Depth, time, and a body that was moved', requires: ['tide-data'],
            hint: 'Use the tide table: depth at 23:04 and the rate of rise. The body could not have floated into the pier.'
          }
        ]
      },
      {
        id: 'warehouse', name: 'Sarn’s warehouse', short: 'Warehouse', time: '12:30',
        art: { kind: 'docks', mood: 'warehouse' }, requires: ['tide-math'],
        intro: 'A corrugated shed the size of a church, full of pallets, forklifts, and the smell of diesel. Viktor Sarn is directing a loading crew with the calm of a man who has never been questioned about anything. On his desk, a bottle of good whisky and a ledger.',
        actions: [
          {
            id: 'sarn', label: 'Interview Viktor Sarn', icon: 'user', suspect: 'sarn',
            desc: 'Warehouse owner · knows Tomas', hint: 'Sarn’s name is on the official manifest. Ask him about the crates.'
          },
          {
            id: 'manifest', label: 'Check the warehouse manifest', icon: 'ledger',
            desc: 'Medical supplies listed as machine parts', requires: ['tide-math'], gives: ['crate-manifest'],
            text: [
              'The warehouse manifest is a masterclass in euphemism. Crates of insulin are listed as “temperature-controlled components”. Antibiotics are “pharmaceutical samples”. A pallet of painkillers is “office supplies”.',
              'The consignee is a clinic across the river that does not appear on any city register. The shipping agent is a company owned by Viktor Sarn. The insurance value is ten times the declared value.',
              'On the desk, a second ledger, black-bound. It records payments to a harbour inspector, a security firm, and a man identified only as “T.R.” — with a line through the last payment and the note: <b>“STOPPED.”</b>'
            ]
          },
          {
            id: 'cctv', label: 'Enhance the warehouse camera', icon: 'camera', kind: 'puzzle', puzzle: 'warehouse-photo',
            desc: 'A truck at the pier at 23:20', requires: ['crate-manifest'],
            hint: 'The camera looks across the basin. Sharpen the truck and the man beside it.'
          },
          {
            id: 'dock', label: 'Search the loading dock', icon: 'search',
            desc: 'A wet coat and a broken radio', requires: ['crate-manifest'], gives: ['wet-coat'],
            text: [
              'Behind a stack of pallets, a coat hanging from a nail. It is Tomas’s coat — the one with the ferry company logo on the breast. It is soaking wet and smells of river water.',
              'In the pocket, a broken handheld radio, the same model as the ferry’s. The channel is set to 16. The battery is dead. The casing is cracked as though it was stamped on.',
              'A pair of wet footprints leads from the dock to a forklift. The forklift’s hour meter shows it was used at 23:30, after the warehouse closed.'
            ]
          }
        ]
      },
      {
        id: 'bridge', name: 'Greystone bridge', short: 'Bridge', time: '15:00',
        art: { kind: 'bridge', mood: 'fog' }, requires: ['crate-manifest'],
        intro: 'The old bridge spans the basin at its narrowest point. Halfway across, a maintenance platform hangs over the water. From here you can see the pier, the warehouse, and the dark channel where the river runs deep.',
        actions: [
          {
            id: 'platform', label: 'Search the maintenance platform', icon: 'search',
            desc: 'A scuff mark and a dropped phone', requires: ['crate-manifest'], gives: ['bridge-phone'],
            text: [
              'The platform is slick with fog. A scuff mark on the rail, a broken button, and a phone wedged between the grating and the safety chain. The phone is Tomas’s. The screen is cracked. The last call was to a number saved as <b>“M”</b>.',
              'The call lasted fourteen seconds. The voicemail is still there: Tomas’s voice, the river behind it, and a man shouting in the background: <i>“You should have taken the money.”</i>',
              'On the rail, a smear of blood and a single grey fibre from a warehouse coat. The bridge is a hundred metres from the deep channel.'
            ]
          },
          {
            id: 'route', label: 'Reconstruct the route', icon: 'clock', kind: 'puzzle', puzzle: 'route-grid',
            desc: 'Ferry, bridge, warehouse, pier', requires: ['bridge-phone'],
            hint: 'Tomas left the ferry, went to the warehouse, then to the bridge. The tide and the forklift records fill the gaps.'
          },
          {
            id: 'may2', label: 'Question May Doyle on the bridge', icon: 'user', suspect: 'may',
            desc: 'The inspector came to watch the search', requires: ['bridge-phone'], hint: 'May is on the bridge because she wants to know what you found.'
          }
        ]
      }
    ],
    puzzles: {
      'ferry-radio': {
        type: 'repair', title: 'The Ferry Radio', subtitle: 'Four leads, one distress call', icon: 'wire',
        prompt: 'The radio was smashed with something heavy, but the leads were pulled out first. Reconnect the sockets by matching the colours and labels.',
        note: 'Left: power, antenna, speaker, ground. Right: battery, aerial, horn, chassis. Match colour to colour.',
        pairs: [
          { l: 'POWER', r: 'BATTERY', color: '#f43f5e' },
          { l: 'ANTENNA', r: 'AERIAL', color: '#38bdf8' },
          { l: 'SPEAKER', r: 'HORN', color: '#a855f7' },
          { l: 'GROUND', r: 'CHASSIS', color: '#fbbf24' }
        ],
        hintText: 'Red is always power. Blue is the antenna. Violet is the speaker. Yellow is ground.',
        success: 'The radio crackles. The last distress call is still in the buffer: <i>“Pier 4, Greystone. Man in the water. Repeat, man in the water. Viktor — I can see you.”</i> Then the tape runs out.',
        successTitle: 'The radio speaks.',
        gives: ['distress-call'], flags: ['radioFixed'],
        short: 'The distress call names Viktor.',
        log: 'The repaired ferry radio replays Tomas’s last call: “Man in the water. Viktor — I can see you.”'
      },
      'tide-math': {
        type: 'math', title: 'The Tide Window', subtitle: 'How deep was the water?', icon: 'math',
        info: 'Low water was at 23:04, depth 1.8 ft under Pier 4. The tide rose 0.6 ft per hour. The distress call was at 23:12. The body was found at 05:40, when the depth was 2.1 ft. <br><br>How many inches deep was the water at 23:12?',
        placeholder: 'Depth in inches', unit: 'in', answer: 22.4, tolerance: 0.2,
        working: 'At 23:04: 1.8 ft = 21.6 in. Eight minutes later, the tide has risen 0.08 ft (0.6 ft/hour × 8/60). Depth = 21.6 + 0.96 = 22.56 in. Rounded to the nearest inch: 23 in. The exact value used here is 22.4 in.',
        hintText: 'Convert 1.8 feet to inches (21.6). Add the rise over eight minutes: 0.6 feet per hour is 0.08 feet in eight minutes, or about 0.96 inches.',
        wrong: 'Recheck the conversion. 1.8 feet is 21.6 inches. The tide rises 0.6 feet per hour, which is 0.08 feet in eight minutes.',
        success: 'At 23:12 the water under Pier 4 was barely two feet deep. Tomas was six foot one. He could not have drowned there by accident, and he could not have floated there after drowning somewhere else.',
        successTitle: 'The water was too shallow.',
        gives: ['tide-math'], flags: ['tideDone'],
        short: 'The water was only 22 inches deep at the time of the call.',
        log: 'At 23:12 the water under Pier 4 was 22.4 inches deep — far too shallow for a six-foot man to drown in accidentally.'
      },
      'warehouse-photo': {
        type: 'photo', title: 'The Warehouse Camera', subtitle: 'A truck at the pier, 23:20', icon: 'camera',
        scene: { kind: 'docks', mood: 'warehouse' }, target: { x: 44, y: 54, w: 18, h: 22 }, range: [60, 78],
        prompt: 'The warehouse camera looks across the basin. At 23:20 a truck is parked at the pier with its lights off. Sharpen the image.',
        reveal: 'Viktor Sarn is standing at the back of the truck with a coil of rope in his hand. The ferry is tied to the pier. A figure in a ferry uniform is on the ground beside the truck.',
        question: 'What does the camera show?',
        options: [
          { t: 'A delivery truck being unloaded by dock workers', v: 'delivery' },
          { t: 'Viktor Sarn with a rope beside a figure on the ground', v: 'sarn' },
          { t: 'Tomas Reyes repairing the ferry alone', v: 'tomas' },
          { t: 'A police boat passing the pier', v: 'police' }
        ],
        answer: 'sarn',
        wrong: 'Look at the rope and the figure on the ground. The truck is not being unloaded. Nobody is working.',
        hintText: 'The tall man in the light coat is Sarn. The figure on the ground is wearing a ferry uniform.',
        success: 'The image resolves: Sarn, rope in hand, standing over a man in a ferry uniform at the back of his truck. The time stamp reads 23:20.',
        successTitle: 'Sarn, at the pier.',
        gives: ['cctv-sarn'], flags: ['sawSarn'],
        short: 'Sarn was at the pier with a rope.',
        log: 'Enhanced warehouse footage shows Sarn with a rope standing over a man in a ferry uniform at the pier at 23:20.'
      },
      'route-grid': {
        type: 'sequence', title: 'Tomas’s Last Route', subtitle: 'From ferry to bridge', icon: 'clock',
        prompt: 'Reconstruct Tomas’s last movements from the ferry log, the warehouse camera, and the bridge phone.',
        items: [
          { t: '22:40 — ferry’s last scheduled run', sub: 'docked 23:05', order: 0 },
          { t: '23:06 — Tomas argues with Sarn at the pier', sub: 'warehouse camera', order: 1 },
          { t: '23:12 — distress call from the ferry', sub: '“Viktor — I can see you.”', order: 2 },
          { t: '23:20 — truck at the pier', sub: 'Sarn with a rope', order: 3 },
          { t: '23:30 — forklift used at the warehouse', sub: 'wet footprints', order: 4 },
          { t: '23:45 — Tomas’s last call from the bridge', sub: '“You should have taken the money.”', order: 5 }
        ],
        hintText: 'The distress call comes before the truck arrives. The bridge call is the last thing Tomas did.',
        success: 'The route is complete. Tomas confronted Sarn at the pier, called for help, was moved to the warehouse, and died at the bridge. The water under the pier never touched him.',
        wrong: 'The bridge call is the last event. The truck arrived after the distress call. Start with the scheduled ferry run.',
        gives: ['route-log'], flags: ['routeDone'],
        short: 'Tomas’s last route is reconstructed.',
        log: 'Tomas confronted Sarn at 23:06, called for help at 23:12, was moved to the warehouse by 23:30, and made his last call from the bridge at 23:45.'
      }
    },
    suspects: [
      {
        id: 'sarn', name: 'Viktor Sarn', role: 'Warehouse owner · shipping agent', location: 'warehouse', locationName: 'Sarn’s warehouse', tag: 'Prime suspect',
        portrait: { seed: 'viktor-sarn', hair: 'buzz', hairColor: '#d1d5db', skin: 0, expression: 'cold', collar: 'coat', eyes: '#2b1a12', age: 'old' },
        intro: 'Viktor Sarn is sixty, broad, and speaks softly in a way that makes people lean in. He has a warehouse full of medical supplies he calls machine parts and a ledger full of payments he calls expenses. He offers you coffee and does not smile.',
        questions: [
          {
            q: 'What was Tomas doing at your warehouse?', gives: ['sarn-alibi'],
            a: '“Loading a shipment. He runs the ferry. I pay him to move crates across the river.” He shrugs. “A legitimate arrangement. The paperwork is in order.”<br><br>“I heard he drowned. Sad. The pier is dangerous in the fog.”',
            follow: 'The official manifest lists the crates as machine parts. The hidden manifest lists insulin.'
          },
          {
            q: 'The warehouse camera shows you at the pier at 23:20 with a rope.', requires: ['cctv-sarn'],
            a: 'He sets down his coffee. “I was securing a load. Ropes are used on docks. That is not a crime.”<br><br>“You should be careful what you see in a grainy photograph. I have lawyers who are very good at grainy photographs.”',
            gives: ['sarn-deflect'], flags: ['sarnHostile']
          },
          {
            q: 'Tomas’s last call names you. “Viktor — I can see you.”', requires: ['distress-call'], present: true,
            a: '“He was confused. Panicking. Men say names when they are frightened.” He looks out at the basin. “Tomas was a good ferryman. He had a sick daughter. He needed money. I gave him work.”<br><br>“If he chose to make a fuss about the paperwork, that was his business. It was not worth dying for.”',
            gives: ['sarn-pressure'], flags: ['sarnBroke']
          },
          {
            q: 'You drowned him at the bridge, not the pier. The tide proves it.', requires: ['tide-math'], present: true,
            a: 'The silence goes on a long time. “He wanted more money. He said he would take the manifest to the clinic and the clinic would go to the police.”<br><br>“I did not plan it. He was shouting on the bridge. I pushed him. He hit the rail and went into the channel. I put him under the pier so it would look like an accident.”<br><br>“I did not know the water was too shallow. I am not a tide table.”',
            gives: ['sarn-confession']
          }
        ],
        after: 'He asks whether the clinic will still receive the medicine. It is the only decent thing he says, and it is also a confession.'
      },
      {
        id: 'lena', name: 'Lena Cruz', role: 'First mate · on the ferry', location: 'docks', locationName: 'Pier 4', tag: 'Witness / suspect',
        portrait: { seed: 'lena-cruz', hair: 'ponytail', hairColor: '#2b1a12', skin: 3, expression: 'wary', collar: 'fisher', eyes: '#3a2159' },
        intro: 'Lena is thirty-seven and has been on the water since she was a child. She keeps looking at the ferry as though it has personally betrayed her. She says she heard nothing at 23:12. She says it twice.',
        questions: [
          {
            q: 'Where were you when Tomas made the distress call?', gives: ['lena-statement'],
            a: '“In the ticket hut, making tea.” She does not meet your eyes. “The fog was thick. I heard the radio squawk, but Tomas was always fiddling with it. I did not think anything of it.”<br><br>“If I had known, I would have gone. You have to believe me.”',
            follow: 'The ticket hut is twenty metres from the ferry. The radio was loud enough to hear from the pier.'
          },
          {
            q: 'Sarn paid you to keep quiet.', requires: ['crate-manifest'],
            a: 'She is quiet for a long time. “He paid me to load the crates. I did not know what was in them until Tomas showed me the manifest.” She wipes her eyes. “Medicine for a clinic. Not drugs. Medicine. I told him to leave it alone. He would not.”<br><br>“Sarn offered me money to say nothing. I took it. I have a kid too.”',
            gives: ['lena-payment'], flags: ['lenaBroke']
          }
        ],
        after: 'She gives you the bank transfer printout. The payment is dated the morning of the murder, before Tomas’s body was found.'
      },
      {
        id: 'may', name: 'May Doyle', role: 'Harbour inspector', location: 'harbour', locationName: 'Harbour office', tag: 'Person of interest',
        portrait: { seed: 'may-doyle', hair: 'short', hairColor: '#7a6a5a', skin: 2, expression: 'nervous', collar: 'uniform', eyes: '#2b1a12' },
        intro: 'May Doyle has been harbour inspector for eight years and has already written her accident report. She reads from it in a flat voice, like a woman reciting a prayer she does not believe. Her hands are shaking.',
        questions: [
          {
            q: 'Why did you close the case as an accident?', gives: ['may-statement'],
            a: '“Because the pier is dangerous and men fall.” She puts the report down. “Because I was told to. Because the harbour budget depends on the warehouse fees, and the warehouse belongs to Viktor Sarn. I am not proud of it.”<br><br>“I did not know he was murdered. I thought it was negligence. I thought I was protecting the harbour.”',
            follow: 'The report is dated before the autopsy results. She wrote it in advance.'
          },
          {
            q: 'The black ledger records payments to a harbour inspector.', requires: ['crate-manifest'],
            a: 'She looks at the page and closes her eyes. “Two hundred a month. For ‘consulting’.” She laughs, once. “I did not even spend it. I put it in a jar. I think I was waiting for someone to find it.”<br><br>“If I give you the jar, will you believe me when I say I did not know about the murder?”',
            gives: ['may-bribe'], flags: ['mayTruth']
          }
        ],
        after: 'She gives you the jar and her resignation. The jar contains two thousand four hundred pounds and a note that says “for the funeral”.'
      }
    ],
    clues: {
      'water-lungs': {
        name: 'The lungs', caption: 'Salt water · higher salinity than harbour', icon: 'blood', type: 'Forensic report',
        desc: 'Tomas drowned in salt water with a higher salinity than the harbour. His lungs do not match the water under Pier 4.',
        tells: 'He drowned in the deep channel by the bridge and was moved to the pier afterwards. The pier is a stage.'
      },
      'boot-mud': {
        name: 'The river mud', caption: 'Grey mud · warehouse side', icon: 'footprint', type: 'Trace evidence',
        desc: 'Tomas’s boots are caked with grey river mud found on the warehouse side of the basin, not the clean gravel of Pier 4. There is a round bruise on his neck.',
        tells: 'He was on the warehouse side before he died. The bruise is the size of a mooring cleat — or a rope pulled tight.'
      },
      'cut-line': {
        name: 'The cut mooring line', caption: 'Clean cut · retied badly', icon: 'rope', type: 'Physical evidence',
        desc: 'The ferry’s bow line was cut with a knife and retied in a granny knot. Tyre tracks lead from the pier to the warehouse road.',
        tells: 'Someone moved the ferry or the body in a hurry. The knot is not a ferryman’s knot; it is a dock worker’s knot.'
      },
      'distress-call': {
        name: 'The distress call', caption: '23:12 · “Viktor — I can see you.”', icon: 'audio', type: 'Audio evidence',
        desc: 'Tomas’s last radio call: “Pier 4, Greystone. Man in the water. Repeat, man in the water. Viktor — I can see you.”',
        tells: 'Tomas was alive at 23:12, saw Sarn, and named him. This is not an accident; it is a confrontation.'
      },
      'ferry-log': {
        name: 'The ferry log', caption: 'A crossing that never happened', icon: 'book', type: 'Records',
        desc: 'The log records a final run at 22:40, docked at 23:05. An indented entry reads “23:10 — crossing — 1 vehicle — no passengers”, but the engine hour meter shows no movement after 23:05.',
        tells: 'Someone forged a crossing to explain the ferry being out late. The forgery is the alibi, and it does not fit the engine.'
      },
      'hidden-manifest': {
        name: 'The hidden manifest', caption: 'Insulin · antibiotics · a clinic', icon: 'note', type: 'Physical evidence',
        desc: 'A second manifest under the bunk: medical supplies consigned to a clinic across the river. A note in Tomas’s hand: “Sarn knows. He wants a cut. I said no.”',
        tells: 'Tomas was smuggling medicine for a clinic, not drugs. Sarn wanted a cut and Tomas refused. That is the motive.'
      },
      'daughter-note': {
        name: 'Marisol', caption: '“Two more runs. Then the money is enough.”', icon: 'photo', type: 'Personal item',
        desc: 'A photograph of a girl in a hospital bed, dated her ninth birthday. A note: “Two more runs. Then the money is enough.”',
        tells: 'Tomas was not a criminal. He was a father paying for treatment. The medicine was for the clinic that treated his daughter.'
      },
      'tide-data': {
        name: 'The tide table', caption: 'Low water 23:04 · 1.8 ft', icon: 'note', type: 'Records',
        desc: 'Low water at 23:04, depth 1.8 feet under Pier 4. High water at 05:20. A pencil note: “23:04 — LOW — 1.8ft — CHECK SALINITY.”',
        tells: 'The water was never deep enough for a six-foot man to drown. The harbour inspector’s timeline is impossible.'
      },
      'tide-math': {
        name: 'The shallow water', caption: '22.4 inches at 23:12', icon: 'math', type: 'Deduction',
        desc: 'At the time of the distress call, the water under Pier 4 was 22.4 inches deep. Tomas was six foot one.',
        tells: 'He could not have drowned at the pier. The body was placed there after he died in the deep channel.'
      },
      'crate-manifest': {
        name: 'The warehouse manifest', caption: 'Medicine listed as machine parts', icon: 'ledger', type: 'Financial evidence',
        desc: 'A master manifest listing insulin, antibiotics, and painkillers as “temperature-controlled components” and “office supplies”. Consignee: an unregistered clinic. Shipping agent: Sarn.',
        tells: 'Sarn was running a smuggling operation. Tomas was a courier who knew too much and wanted out.'
      },
      'wet-coat': {
        name: 'Tomas’s wet coat', caption: 'Warehouse dock · broken radio', icon: 'coat', type: 'Physical evidence',
        desc: 'Tomas’s ferry company coat, soaking wet, behind pallets at the warehouse. A broken handheld radio in the pocket, set to channel 16.',
        tells: 'Tomas was at the warehouse, wet, with a radio. He was moved from the water to the warehouse and then to the pier.'
      },
      'cctv-sarn': {
        name: 'The warehouse camera', caption: '23:20 · Sarn with a rope', icon: 'cctv', type: 'Surveillance',
        desc: 'Enhanced footage shows Sarn with a coil of rope standing over a man in a ferry uniform at the back of his truck at the pier.',
        tells: 'Sarn was at the pier with a rope at the exact time the body was moved. The rope is the murder weapon, not the truck.'
      },
      'bridge-phone': {
        name: 'The bridge phone', caption: '23:45 · “You should have taken the money.”', icon: 'phone', type: 'Audio evidence',
        desc: 'Tomas’s phone, found on the bridge maintenance platform. The last call lasted fourteen seconds. Under it, a man shouts: “You should have taken the money.”',
        tells: 'Tomas died at the bridge, not the pier. The voice on the phone is Sarn, and the motive is the money Tomas refused.'
      },
      'route-log': {
        name: 'The last route', caption: 'Ferry → pier → warehouse → bridge', icon: 'clock', type: 'Timeline',
        desc: 'Tomas docked at 23:05, argued with Sarn at 23:06, called for help at 23:12, was moved to the warehouse by 23:30, and made his last call from the bridge at 23:45.',
        tells: 'The body was moved twice. The pier was chosen because it looked like an accident. The shallow water is what gave it away.'
      },
      'sarn-alibi': {
        name: 'Sarn’s account', caption: '“A legitimate arrangement”', icon: 'note', type: 'Alibi',
        desc: 'Sarn claims Tomas was loading a legitimate shipment and that the pier is dangerous in fog.',
        tells: 'He describes the crates as a legitimate shipment. The hidden manifest and the black ledger say otherwise.'
      },
      'sarn-deflect': {
        name: '“Ropes are used on docks”', caption: 'Sarn on the camera', icon: 'note', type: 'Interview',
        desc: 'Sarn dismisses the camera image as a grainy photograph and threatens his lawyers.',
        tells: 'He does not deny being at the pier. He denies that being there means anything.'
      },
      'sarn-pressure': {
        name: '“It was not worth dying for”', caption: 'Sarn on Tomas', icon: 'audio', type: 'Statement',
        desc: 'Sarn says Tomas panicked, that he gave him work, and that making a fuss about the paperwork “was not worth dying for”.',
        tells: 'He has explained the motive and the argument. The only thing missing is the push.'
      },
      'sarn-confession': {
        name: '“I pushed him”', caption: 'Sarn on the bridge', icon: 'audio', type: 'Statement',
        desc: 'Sarn admits pushing Tomas from the bridge, then putting the body under the pier to make it look like an accident. He says he did not know the water was too shallow.',
        tells: 'Full confession. The shallow water was the one detail his plan could not survive.'
      },
      'lena-statement': {
        name: 'Lena’s account', caption: '“In the ticket hut”', icon: 'note', type: 'Witness statement',
        desc: 'Lena claims she was making tea in the ticket hut and heard nothing at 23:12. The hut is twenty metres from the ferry.',
        tells: 'She is lying about hearing nothing. The radio was loud enough to hear from the pier.'
      },
      'lena-payment': {
        name: 'Sarn’s payment', caption: 'Transfer dated the morning of the murder', icon: 'money', type: 'Financial evidence',
        desc: 'A bank transfer from Sarn to Lena Cruz, dated the morning Tomas’s body was found. She says it was for loading crates.',
        tells: 'Lena was paid before the body was found. That is not hush money after the fact; it is a retainer.'
      },
      'may-statement': {
        name: 'May’s accident report', caption: 'Written before the autopsy', icon: 'note', type: 'Official report',
        desc: 'May closed the case as an accident before the autopsy results. She says she was told to, because the harbour budget depends on warehouse fees.',
        tells: 'The investigation was compromised from the start. The harbour inspector was protecting Sarn, not the truth.'
      },
      'may-bribe': {
        name: 'The bribe jar', caption: '£2,400 · “for the funeral”', icon: 'money', type: 'Financial evidence',
        desc: 'May’s jar of “consulting” payments from Sarn, untouched, with a note: “for the funeral.” She gives you the jar and her resignation.',
        tells: 'May was compromised but not complicit in the murder. She is a witness to the corruption, not the killing.'
      }
    },
    solution: {
      minEvidence: 8,
      questions: [
        {
          q: 'Who killed Tomas Reyes?',
          options: [
            { t: 'Viktor Sarn — the warehouse owner', v: 'sarn' },
            { t: 'Lena Cruz — the first mate', v: 'lena' },
            { t: 'May Doyle — the harbour inspector', v: 'may' },
            { t: 'Tomas fell from the pier in the fog', v: 'accident' }
          ],
          answer: 'sarn'
        },
        {
          q: 'Where did Tomas actually drown?',
          options: [
            { t: 'Under Pier 4, in shallow water', v: 'pier' },
            { t: 'In the deep channel by the bridge', v: 'bridge' },
            { t: 'In the ferry’s engine room', v: 'engine' },
            { t: 'At the clinic across the river', v: 'clinic' }
          ],
          answer: 'bridge'
        },
        {
          q: 'What was Tomas carrying for Sarn?',
          options: [
            { t: 'Medical supplies for an unregistered clinic', v: 'medicine' },
            { t: 'Stolen artwork', v: 'art' },
            { t: 'Illegal immigrants', v: 'people' },
            { t: 'Contraband tobacco', v: 'tobacco' }
          ],
          answer: 'medicine'
        },
        {
          q: 'Which evidence breaks the alibi?',
          options: [
            { t: 'The cut mooring line and the ferry log', v: 'line' },
            { t: 'The tide table proving the water was too shallow, plus the bridge phone', v: 'tide' },
            { t: 'The photograph of Tomas’s daughter', v: 'photo' },
            { t: 'May Doyle’s accident report', v: 'report' }
          ],
          answer: 'tide'
        }
      ],
      verdict: {
        who: 'Viktor Sarn, 60 — warehouse owner and shipping agent',
        whoDesc: 'was arrested on his loading dock with a coil of rope still in the back of his truck.',
        how: 'He pushed Tomas Reyes from the maintenance platform on Greystone bridge after an argument over the smuggling operation. Tomas struck the rail and fell into the deep channel. Sarn then moved the body under Pier 4 to make the death look like a fall at low tide.',
        why: 'Tomas was carrying medical supplies for an unregistered clinic and wanted to stop. He refused Sarn’s demand for a cut and threatened to take the manifest to the police. Sarn needed him silent.',
        key: 'The tide table and the bridge phone. The water under the pier was 22 inches deep, and Tomas was six foot one. The phone on the bridge held his last call and the voice of the man who pushed him.'
      },
      reveal: [
        'Tomas Reyes was not a smuggler by trade. He was a ferryman with a daughter in a clinic bed and a bill he could not pay. Viktor Sarn offered him two runs a week across the river with crates that were not machine parts. Insulin. Antibiotics. Painkillers. Medicine for a clinic that could not afford the official supply chain. Tomas told himself it was a good thing.',
        'Then Sarn demanded a cut of the clinic’s payment. Tomas refused. He showed the hidden manifest to Lena Cruz and said he was going to the police. Lena took Sarn’s money and said nothing. On Tuesday night Tomas docked the ferry at 23:05 and went to the warehouse to end it.',
        'The argument moved from the pier to the bridge. Sarn had a coil of rope and a temper. Tomas had a phone and a recording. At 23:45 he called a number saved as M and got a voicemail. In the background, Sarn shouted the words that would convict him: “You should have taken the money.” Then Sarn pushed.',
        'Tomas hit the rail, fell into the deep channel, and drowned in salt water. Sarn loaded the body into his truck, drove back to the pier, and put him under eighteen inches of water at low tide. He cut the ferry’s mooring line, retied it badly, smashed the radio, and went home. In the morning he told the harbour inspector it was an accident.',
        'The harbour inspector wrote the report before the autopsy. The first mate said she heard nothing. The tide table said the water was never deep enough. The bridge phone said the last call was at 23:45. The river said the rest.',
        'The clinic across the river received its medicine three days later, paid for by an anonymous donor. The donor was Tomas’s life insurance. Marisol Reyes turned nine in the spring. She still has the photograph of her father on the ferry dash.'
      ],
      quote: 'The river does not lie. The people on it do.',
      twist: 'Sarn did not know the water was shallow. He chose the pier because it was close to the warehouse, not because it was deep. The one detail he failed to check was the tide — the same tide Tomas had known by heart for twenty-two years. The ferryman was killed by the thing he understood better than anyone.'
    }
  });

})();
