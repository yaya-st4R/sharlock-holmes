/* ============================================================
   CASE 19 — THE LAST DELIVERY
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c19', num: 19,
    title: 'The Last Delivery',
    subtitle: 'A courier is found dead in his van with the engine running, and a parcel that never arrived is still in the back.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'parking', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Danny Okafor, 34 — parcel courier' },
      { k: 'Scene', v: 'Northgate Couriers yard, bay 4' },
      { k: 'Found', v: '05:10 — by the night dispatcher' },
      { k: 'Cause', v: 'Blunt-force trauma · carbon-monoxide staging' }
    ],
    briefing: [
      'Northgate Couriers moves forty thousand parcels a night through a yard behind the ring road. At ten past five, the night dispatcher found one of the vans parked in bay four with its engine idling and a garden hose running from the exhaust to a cracked rear window. Danny Okafor was in the driver’s seat, still wearing his hi-vis, dead.',
      'The yard wanted it to be suicide. Danny had debts, a recent separation, and a union complaint against the company that had gone nowhere. The police wrote “no suspicious circumstances” on the log at 07:20.',
      'The pathologist did not agree. There is a depressed fracture above Danny’s left temple, and there is no soot in his lungs. He was dead before the engine started.',
      'In the back of the van, still sealed, is a parcel addressed to a journalist. It was due for delivery at 04:30. It never arrived. Somebody at Northgate was willing to kill a courier to make sure it never did.'
    ],
    opening: 'Bay four smells of diesel and wet cardboard. The van sits with its nose against the fence, engine off now, a coil of garden hose on the passenger seat. The rear doors are open. Inside, among the parcels, a single crate is strapped to the floor and labelled MACHINE PARTS — FRAGILE.',
    objectives: [
      'Prove Danny was dead before the engine ran.',
      'Open the parcel he was supposed to deliver.',
      'Trace who altered his route and his paperwork.',
      'Find out who at Northgate was moving more than parcels.'
    ],
    locations: [
      {
        id: 'yard', name: 'The depot yard', short: 'Yard · bay 4', time: '06:20',
        art: { kind: 'parking', mood: 'cold' },
        intro: 'A floodlit yard of puddles, oil, and numbered bays. The van is still in bay four behind police tape. A row of identical white vans faces the fence, their roofs silver with frost. The gate camera on the pole above the office has a broken cable hanging loose.',
        actions: [
          { id: 'van', label: 'Examine the van and the body', icon: 'blood', hotspot: { x: 52, y: 60 },
            desc: 'The hose, the seat, the parcel',
            text: [
              'Danny Okafor is slumped in the driver’s seat with his seatbelt on. His face is pale, but there is no cherry-red flush of carbon-monoxide poisoning. The keys are in the ignition, turned to off.',
              'A garden hose runs from the exhaust to the rear window. The window is cracked open two inches. The hose is dry at the exhaust end and there is frost on the coil. It was put there after the engine stopped.',
              'The pathologist’s preliminary note is tucked into the door pocket: <b>“Depressed fracture, left temple. No soot in the airways. Dead before the engine started.”</b>'
            ],
            gives: ['body-note', 'hose', 'van-key'],
            hint: 'The hose is dry and frosted. The engine was running long before it was attached.'
          },
          { id: 'search', label: 'Search the van', icon: 'search', puzzle: 'van-search',
            desc: 'Six things that do not belong',
            requires: ['body-note'],
            hint: 'Check the footwell, the parcel shelf, the fuel gauge, the dash, the rear door and the crate strap.'
          },
          { id: 'camera', label: 'Repair the yard camera', icon: 'tool', puzzle: 'camera',
            desc: 'A cable pulled from the housing',
            requires: ['route-log'],
            hint: 'Match the camera leads: power, video, trigger, heater.'
          },
          { id: 'review', label: 'Review the camera footage', icon: 'cctv',
            desc: '04:20 — someone at the van',
            requires: ['camera-feed'],
            text: [
              'The camera buffer is grainy but usable. At 04:12 the gate opens and van 17 drives out. At 04:29 it returns and reverses into bay four.',
              'At 04:20 a figure walks to the rear of the van carrying a coiled garden hose. The figure is wearing a company fleece with a lanyard. The face is visible for two frames: Marta Kline.',
              'She opens the rear doors, feeds the hose through the cracked window, and stands beside the van for four minutes. Then she walks back toward the office, wiping her hands on a cloth.'
            ],
            gives: ['camera-still'],
            hint: 'The footage runs to 04:40. Watch the van after it comes back.'
          },
          { id: 'gate', label: 'Check the gate code and log', icon: 'id',
            desc: 'Who opened the barrier after midnight',
            requires: ['route-log'],
            text: [
              'The yard gate uses a four-digit code, changed monthly. The log shows the barrier opening at 23:58, 00:40, 02:14, 03:02, 03:47, and 04:12. The 03:47 entry is labelled “SUPERVISOR” and has no vehicle registration.',
              'The 04:12 entry is Danny’s van, leaving. The 04:29 entry is the same van coming back. Between those times the gate did not open again.',
              'The supervisor’s code is 0417. Marta Kline has not changed it in three years. Every driver knows it.'
            ],
            gives: ['gate-log', 'supervisor-code'],
            hint: 'The gate log gives you the movements. The supervisor code is the oldest one in the book.'
          }
        ]
      },
      {
        id: 'warehouse', name: 'The loading bay', short: 'Loading bay', time: '07:00',
        art: { kind: 'docks', mood: 'cold' },
        requires: ['parcel-waybill'],
        intro: 'A cavernous steel shed lit by yellow sodium lamps. Conveyor belts rattle and stop. At the far end, a bay marked OUT OF SERVICE holds a stack of wooden crates under a tarpaulin. The scanner at the bay has been unplugged.',
        actions: [
          { id: 'crate', label: 'Open the crate from the van', icon: 'tool',
            desc: 'Machine parts that are not machine parts',
            requires: ['parcel-waybill'],
            text: [
              'The crate is screwed shut, not nailed. Inside, packed in foam: a small oil painting in a gilt frame, a bronze figure of a horse, and a sealed folder of provenance documents.',
              'The painting is labelled on the back: <b>“PORTRAIT OF A LADY — ATTRIB. TITIAN — DO NOT EXPOSE TO LIGHT.”</b> The provenance folder names a private collection in Amsterdam that reported a theft four months ago.',
              'The waybill says the parcel weighs 12 kg. The crate weighs closer to 31 kg. Somebody has been shipping art through the parcel network and paying by the kilo.'
            ],
            gives: ['crate-contents', 'stolen-painting', 'provenance'],
            hint: 'The crate is heavier than its waybill. Open it and read the label on the back of the painting.'
          },
          { id: 'bay', label: 'Search the out-of-service bay', icon: 'search',
            desc: 'A wrench, a manifest, and a stack of labels',
            requires: ['crate-contents'],
            text: [
              'The bay has been used recently: fresh scuff marks on the concrete, a coil of strapping, a roll of blank waybills. On the shelf: a torque wrench with a dark stain on the head and a few strands of close-cropped hair caught in the ratchet.',
              'A printed manifest lists six “machine parts” consignments over the past two months, all booked by the same account: <b>NORTHGATE INTERNAL — SUPERVISOR.</b> All six were scanned out after midnight by the same handheld.',
              'The handheld is in the charger. Its last scan was at 03:58 — the crate that is now in Danny’s van.'
            ],
            gives: ['torque-wrench', 'ghost-manifest', 'handheld'],
            hint: 'The bay is where the crate was loaded. Check the shelf and the handheld.'
          },
          { id: 'scanner', label: 'Read the bay scanner', icon: 'chart', puzzle: 'scan',
            desc: 'Six ghost consignments',
            requires: ['ghost-manifest'],
            hint: 'Match each consignment to the bay, the time and the weight. The odd one out is the crate in the van.'
          }
        ]
      },
      {
        id: 'office', name: 'Dispatch office', short: 'Dispatch', time: '08:00',
        art: { kind: 'office' },
        requires: ['handheld'],
        intro: 'A glass box above the loading bay with six monitors, a kettle, and a wall of route maps. Dev Shah is at the dispatch desk with his headphones around his neck. Marta Kline’s office is behind a partition at the back, door closed.',
        actions: [
          { id: 'dev', label: 'Interview Dev Shah', icon: 'user', suspect: 'dev',
            desc: 'Night dispatcher · the man who found the van', hint: 'Dev found the body. Ask him who changed the route.' },
          { id: 'terminal', label: 'Open the dispatch terminal', icon: 'terminal', puzzle: 'dispatch',
            desc: 'Routes, manifests, and a deleted message',
            requires: ['handheld'],
            hint: 'Dev’s password is the depot name. Try NORTHGATE.'
          },
          { id: 'marta', label: 'Interview Marta Kline', icon: 'user', suspect: 'marta',
            desc: 'Depot supervisor · holder of the master code', hint: 'Marta controls the gate codes and the manifests. Ask her about 03:47.' },
          { id: 'safe', label: 'Open the supervisor’s safe', icon: 'lockbox', puzzle: 'safe',
            desc: 'Four digits · the gate code', requires: ['supervisor-code'],
            hint: 'The gate code is 0417. Marta uses it for everything.' },
          { id: 'route', label: 'Rebuild the last route', icon: 'clock', puzzle: 'route',
            desc: 'Seven moments from clock-in to discovery',
            requires: ['camera-still', 'route-log'],
            hint: 'Use the dispatch log, the radio, the scanner and the gate log. Start with Danny clocking in.' }
        ]
      },
      {
        id: 'breakroom', name: 'Drivers’ breakroom', short: 'Breakroom', time: '09:00',
        art: { kind: 'interior' },
        requires: ['body-note'],
        intro: 'A Portakabin with a microwave, a noticeboard, and a smell of burnt toast. Three drivers are sitting at a plastic table, not talking. The rota for the week is pinned to the wall, with two names changed in red pen.',
        actions: [
          { id: 'ron', label: 'Interview Ron Delaney', icon: 'user', suspect: 'ron',
            desc: 'Senior driver · union representative', hint: 'Ron was supposed to drive the 04:12 route. Ask him why Danny took it.' },
          { id: 'rota', label: 'Read the rota and the noticeboard', icon: 'note',
            desc: 'A swapped route, a union notice, a warning', requires: ['body-note'],
            text: [
              'The rota shows Ron Delaney down for the 04:12 trunk run to the city, and Danny Okafor down for the local loop. Someone has changed the names in red pen and initialled it <b>M.K.</b>',
              'On the noticeboard: a union poster about the “ghost consignments” and a handwritten warning — <b>“STOP USING BAY 6. THEY ARE WATCHING.”</b> The handwriting matches Danny’s signature on his contract.',
              'The clock-in machine records Danny at 03:41 and Ron at 03:58. Ron was late. If the rota had not been changed, Ron would have been in the van at four.'
            ],
            gives: ['rota', 'union-notice', 'clock-in'],
            hint: 'The rota was changed by M.K. Danny was not supposed to be on the trunk run.'
          },
          { id: 'radio', label: 'Play the dispatch radio', icon: 'audio', puzzle: 'radio',
            desc: '03:55 — a voice on channel two', requires: ['rota'],
            hint: 'Listen to the last call before the gate opened at 04:12. It is not Dev’s voice.' }
        ]
      },
      {
        id: 'morgue', name: 'City mortuary', short: 'Mortuary', time: '10:30',
        art: { kind: 'morgue', mood: 'cold' },
        requires: ['body-note'],
        intro: 'A white-tiled room with a drain in the floor and a row of steel drawers. Danny’s clothes are folded on a tray: a hi-vis vest, a hoodie, boots, and a lanyard with a photograph of a little girl. The pathologist has left a worksheet on the desk.',
        actions: [
          { id: 'autopsy', label: 'Read the autopsy', icon: 'blood',
            desc: 'The wound, the lungs, the time', requires: ['body-note'],
            text: [
              'The pathologist’s report is blunt. <b>“Depressed fracture of the left temporal bone, consistent with a single blow from a heavy metal object. No soot or carboxyhaemoglobin elevation. The victim was dead before the engine started. Time of death 03:50–04:05.”</b>',
              'Under the fingernails: grey paint flakes and a few black fibres, the kind used in cargo strapping. On the knuckles: a fresh abrasion, as if he had hit something — or someone — before he died.',
              'The toxicology screen is negative except for caffeine and a low dose of ibuprofen. He was not drunk, drugged, or asleep. He was working.'
            ],
            gives: ['autopsy', 'paint-flakes', 'time-of-death'],
            hint: 'Time of death is 03:50–04:05. The van left at 04:12 and came back at 04:29.'
          },
          { id: 'idle', label: 'Calculate the engine time', icon: 'chart', puzzle: 'idle',
            desc: 'Fuel used against idle burn', requires: ['autopsy'],
            hint: 'The van burns 1.4 litres an hour at idle. The tank took 0.9 litres. Divide.' }
        ]
      }
    ],
    puzzles: {
      'van-search': {
        type: 'hotspot', title: 'Van 17', subtitle: 'Six things that do not belong', icon: 'search',
        scene: { kind: 'parking', mood: 'cold' },
        targets: [
          { label: 'Dry garden hose', x: 24, y: 72, r: 5.5, text: 'The hose is dry at the exhaust end and frosty along the coil. It was attached after the engine had cooled.' },
          { label: 'Phone in the footwell', x: 42, y: 78, r: 5.5, text: 'Danny’s phone, screen down in the footwell, still unlocked. A photo of an open crate is unsent in the message draft.' },
          { label: 'Fuel receipt', x: 58, y: 52, r: 5, text: 'A fuel receipt timed 03:36 — 0.9 litres of diesel. The van was refuelled before the route, not after.' },
          { label: 'Cracked rear window', x: 72, y: 40, r: 5.5, text: 'The rear window is cracked open two inches. The latch is stiff with cold and there is no tape residue. It was opened from inside.' },
          { label: 'Crate strap', x: 80, y: 68, r: 5.5, text: 'A black cargo strap, cut rather than unbuckled, with grey paint flakes on the webbing. Danny’s knuckles match the pattern.' },
          { label: 'Dashcam cable', x: 56, y: 30, r: 5, text: 'The dashcam has been unplugged and its SD card removed. The cable is still warm where it was pulled.' }
        ],
        note: 'Click directly on the details. The van has not been valeted since the body was found.',
        hintText: 'Look at the hose, the footwell, the dash, the rear window, the crate strap, and the dashcam.',
        success: 'The van gives up six details: a dry hose, Danny’s phone, a fuel receipt, a cracked rear window, a cut crate strap, and a missing dashcam card.',
        successTitle: 'The suicide was assembled afterwards.',
        gives: ['phone-draft', 'fuel-receipt', 'strap-cut', 'dashcam-missing', 'parcel-waybill'], flags: ['vanSearched'],
        short: 'The hose was attached after death and the dashcam card is gone.',
        log: 'The van search finds a dry, frosty hose, Danny’s unlocked phone, a 03:36 fuel receipt, a cut crate strap, and an empty dashcam slot.'
      },
      'camera': {
        type: 'repair', title: 'The Yard Camera', subtitle: 'Four leads pulled from the housing', icon: 'tool',
        prompt: 'The camera above the office has been disabled. Its cable was pulled from the housing and the leads are loose.',
        note: 'Match each lead to its socket. The labels on the housing are faded but readable.',
        pairs: [
          { l: 'POWER', r: '12V DC', color: '#a855f7' },
          { l: 'VIDEO', r: 'BNC OUT', color: '#67e8f9' },
          { l: 'TRIGGER', r: 'MOTION', color: '#fbbf24' },
          { l: 'HEATER', r: 'THERMOSTAT', color: '#34d399' }
        ],
        hintText: 'Power is DC. Video is BNC. Motion is the trigger. The heater goes to the thermostat.',
        success: 'The camera wakes with a click and a red light. Its buffer holds forty minutes of footage, including the yard gate and bay four.',
        successTitle: 'The camera was recording all night.',
        gives: ['camera-feed'], flags: ['cameraFixed'],
        short: 'The yard camera footage is recovered.',
        log: 'The yard camera is repaired. Its buffer holds forty minutes of footage covering the gate and bay four.'
      },
      scan: {
        type: 'logicgrid', title: 'The Ghost Consignments', subtitle: 'Six crates, one account', icon: 'chart',
        prompt: 'The scanner records six consignments booked to “Northgate Internal — Supervisor” over two months. Cross-check the bay, the time, and the weight.',
        rows: [
          { label: 'Consignment 1', selects: [
            { label: 'bay', options: [{ v: '6', t: 'Bay 6' }, { v: '4', t: 'Bay 4' }, { v: '2', t: 'Bay 2' }], answer: '6' },
            { label: 'weight', options: [{ v: '12', t: '12 kg' }, { v: '31', t: '31 kg' }, { v: '8', t: '8 kg' }], answer: '12' }
          ] },
          { label: 'Consignment 4', selects: [
            { label: 'bay', options: [{ v: '6', t: 'Bay 6' }, { v: '4', t: 'Bay 4' }, { v: '2', t: 'Bay 2' }], answer: '4' },
            { label: 'time', options: [{ v: '0358', t: '03:58' }, { v: '0214', t: '02:14' }, { v: '0400', t: '04:00' }], answer: '0358' }
          ] },
          { label: 'The crate in Danny’s van', selects: [
            { label: 'bay', options: [{ v: '6', t: 'Bay 6' }, { v: '4', t: 'Bay 4' }, { v: '2', t: 'Bay 2' }], answer: '6' },
            { label: 'weight', options: [{ v: '12', t: '12 kg' }, { v: '31', t: '31 kg' }, { v: '8', t: '8 kg' }], answer: '31' }
          ] }
        ],
        wrong: 'The waybill weight is not the real weight. Check the crate and the handheld scan time.',
        hintText: 'The waybill says 12 kg; the crate weighs 31. The last scan was 03:58 at bay 6.',
        success: 'The six consignments line up: all booked to the supervisor’s account, all scanned after midnight, all from bay six, all heavier than their waybills.',
        successTitle: 'The ghost account belongs to the supervisor.',
        gives: ['ghost-account'], flags: ['scansDone'],
        short: 'The ghost consignments were booked by Marta’s account.',
        log: 'Six consignments were booked to “Northgate Internal — Supervisor” and scanned out of bay six after midnight. The crate in the van weighed 31 kg against a 12 kg waybill.'
      },
      dispatch: {
        type: 'terminal', title: 'Dispatch Terminal', subtitle: 'Northgate routing system', icon: 'terminal',
        user: 'dev', host: 'northgate-dispatch', password: 'northgate',
        intro: 'Connection established. The desktop shows a live map of the city with forty vans moving. Type "help" for commands.',
        banner: 'NORTHGATE DISPATCH — NIGHT SHIFT. 3 FILES. 1 DELETED MESSAGE.',
        files: [
          { name: 'routes.log', body: '<span class="d">04:12 — VAN 17 — TRUNK RUN — DRIVER: D. OKAFOR</span><br>04:29 — VAN 17 — RETURN — DRIVER: D. OKAFOR<br><span class="y">Route changed 03:44 by user M.KLINE. Original driver: R. DELANEY.</span><br><span class="r">No reason logged. Change initialled in red pen on the paper rota.</span>' },
          { name: 'manifest.csv', body: 'NORTHGATE INTERNAL — SUPERVISOR<br>0612 — MACHINE PARTS — 12 kg — BAY 6<br>0627 — MACHINE PARTS — 12 kg — BAY 6<br><span class="y">0631 — MACHINE PARTS — 12 kg — BAY 6 — HOLD FOR TRUNK</span><br><span class="r">TRUNK HOLD: PARCEL TO BE DELIVERED BY 04:30. DO NOT SCAN AT DEPOT.</span>' },
          { name: 'deleted.msg', locked: true, secret: true, hint: 'Recovered message. Dispatcher password required.', body: '<span class="y">FROM: M.KLINE — 03:42</span><br>“Dev — swap Danny onto the trunk. Ron is asking questions and I want him off the gate. Tell Danny it is a favour. Do not log it.”<br><br><span class="d">Read receipt: 03:43. Deleted 04:33.</span>' }
        ],
        hintText: 'The depot name is the password. Try NORTHGATE.',
        success: 'The deleted message recovers: Marta Kline ordered Danny onto the trunk run at 03:42, specifically to keep Ron away from the gate. The manifest shows the crate was held for the 04:30 trunk delivery.',
        successTitle: 'Marta put Danny in the van.',
        gives: ['route-log', 'hold-order', 'deleted-message'], flags: ['dispatchOpen'],
        short: 'Marta changed the route and ordered Danny onto the trunk run.',
        log: 'The dispatch terminal shows Marta swapped Danny onto the trunk run at 03:42 to keep Ron away from the gate, and that the crate was held for a 04:30 delivery.'
      },
      radio: {
        type: 'audio', title: 'Dispatch Radio', subtitle: 'Channel two · 03:55', icon: 'audio',
        prompt: 'The radio logger holds the last four minutes of channel two before the gate opened.',
        pattern: [240, 0, 300, 240, 0, 360, 300, 0],
        tempo: 0.5,
        waveform: 'Static. A click. A woman’s voice, clipped and low. An engine idling. The clatter of a gate. Then nothing until Dev’s voice at 04:31, saying, “Oh God. Oh God, no.”',
        options: [
          { t: 'Marta Kline telling Danny to take the crate through the gate without scanning it', v: 'marta' },
          { t: 'Dev Shah asking Danny to cover the trunk run', v: 'dev' },
          { t: 'Ron Delaney warning Danny about the ghost consignments', v: 'ron' },
          { t: 'A security guard asking for a gate code', v: 'guard' }
        ],
        answer: 'marta',
        wrong: 'Listen for the woman. She is giving an instruction, not asking a question. The engine is already running.',
        hintText: 'The voice says “do not scan it”. That is a supervisor’s instruction, not a dispatcher’s.',
        success: 'The radio resolves: <i>“Danny. Bay six. The crate goes through the gate tonight, not the scanner. Do not scan it and do not stop.”</i> Danny: <i>“Marta, this is—”</i> The gate clatters. The recording ends.',
        successTitle: 'Marta ordered the crate out unscanned.',
        gives: ['radio-call'], flags: ['radioDone'],
        short: 'Marta ordered Danny through the gate without scanning the crate.',
        log: 'The dispatch radio captures Marta Kline ordering Danny to take the bay-six crate through the gate without scanning it.'
      },
      safe: {
        type: 'keypad', title: 'Supervisor’s Safe', subtitle: 'Four-digit keypad', icon: 'keypad',
        deviceLabel: 'M. KLINE — PRIVATE', length: 4, code: '0417',
        prompt: 'A small safe under Marta’s desk. The keypad wants four digits. <span style="color:var(--dim)">Marta has used the same number for the gate code for three years.</span>',
        hintText: 'The gate code is 0417. Enter 0417.',
        successTitle: 'The safe opens.',
        success: 'Inside: £8,400 in used notes, a second mobile phone, and a folder of invoices from a company called Meridian Heritage Ltd. Each invoice is for “logistics and storage”.',
        gives: ['cash', 'burner-phone', 'heritage-invoices'], flags: ['safeOpen'],
        short: 'Marta’s safe holds cash, a burner phone and smuggling invoices.',
        log: 'Marta’s safe contains £8,400 cash, a burner phone, and invoices from Meridian Heritage Ltd for “logistics and storage”.'
      },
      idle: {
        type: 'math', title: 'The Idle Engine', subtitle: 'How long was the van running?', icon: 'chart',
        info: 'The van’s engine burns 1.4 litres of diesel per hour at idle. The fuel receipt at 03:36 records 0.9 litres added. The tank was full when the van returned at 04:29. The engine was switched off at 05:09.',
        placeholder: 'minutes of idle running', unit: 'minutes', answer: 38.6, tolerance: 2,
        working: '0.9 litres ÷ 1.4 litres per hour = 0.643 hours. 0.643 × 60 = 38.6 minutes.',
        wrong: 'Divide the fuel used by the hourly burn, then multiply by sixty. The answer is under forty minutes.',
        hintText: '0.9 ÷ 1.4 = 0.643 hours. Multiply by 60.',
        success: 'The engine ran for roughly 39 minutes — from 04:30 to 05:09. Danny was dead by 04:05. The hose was attached to a running engine and a body that had been in the van for nearly half an hour.',
        successTitle: 'The engine was running long after Danny died.',
        gives: ['idle-time'], flags: ['idleDone'],
        short: 'The engine idled for 39 minutes, starting after Danny was dead.',
        log: 'The van’s fuel use shows the engine idled for about 39 minutes, from 04:30 to 05:09 — long after Danny’s death at 03:50–04:05.'
      },
      route: {
        type: 'sequence', title: 'The Last Route', subtitle: 'Eleven minutes that never happened', icon: 'clock', variant: 'strips',
        prompt: 'The gate log, the scanner, the camera and the radio disagree about the last hour. Put the route in order.',
        items: [
          { t: 'Danny clocks in for the local loop', sub: '03:41 — clock-in machine', order: 1 },
          { t: 'Marta changes the rota to the trunk run', sub: '03:44 — dispatch log', order: 2 },
          { t: 'Marta orders the crate out unscanned', sub: '03:55 — radio', order: 3 },
          { t: 'The crate is scanned at bay six', sub: '03:58 — handheld', order: 4 },
          { t: 'Danny leaves through the gate', sub: '04:12 — gate log', order: 5 },
          { t: 'The van returns and parks in bay four', sub: '04:29 — gate log', order: 6 },
          { t: 'Dev finds the body', sub: '05:10 — dispatch office', order: 7 }
        ],
        wrong: 'Marta changed the rota before she called him on the radio. The crate was scanned before the gate opened.',
        hintText: 'Clock-in 03:41, rota 03:44, radio 03:55, scan 03:58, gate out 04:12, return 04:29, body found 05:10.',
        success: 'The route lines up. Danny was given the trunk run three minutes after clocking in. He was told not to scan the crate. He scanned it anyway at 03:58 — and photographed it. That photograph is the reason he died.',
        successTitle: 'Danny disobeyed the order and photographed the crate.',
        gives: ['route-timeline'], flags: ['routeDone'],
        short: 'Danny scanned and photographed the crate, then died.',
        log: 'Timeline: rota changed 03:44, radio order 03:55, scan 03:58, gate out 04:12, return 04:29, body found 05:10.'
      }
    },
    suspects: [
      {
        id: 'marta', name: 'Marta Kline', role: 'Depot supervisor · master gate code', location: 'office', locationName: 'Dispatch office', tag: 'Prime suspect',
        portrait: { seed: 'marta-kline', hair: 'bun', hairColor: '#3a2a1b', skin: 0, expression: 'wary', collar: 'coat', eyes: '#3a2159' },
        intro: 'Fifty-one, in a company fleece with a lanyard full of keys. She has run the night shift for eleven years and speaks about it like a country she governs. She changed the rota. She made the radio call. She has an answer for everything.',
        questions: [
          { q: 'Why did you put Danny on the trunk run?', requires: ['route-log'], present: true,
            a: '“Ron was late. Danny was available. That is what a supervisor does.” She does not look up from her clipboard. “I did not know the van had a problem. If I had, I would have sent someone else.”',
            gives: ['marta-rota'], flags: ['martaHostile'] },
          { q: 'You told Danny not to scan the crate.', requires: ['radio-call'], present: true,
            a: '“I told him not to scan it because the scanner was down.” A pause. “The handheld at bay six has been faulty for weeks. I was protecting the schedule.” She meets your eyes. “You have a voice on a radio. You do not have a crime.”',
            gives: ['marta-radio'] },
          { q: 'The crate contained a stolen Titian.', requires: ['stolen-painting'], present: true,
            a: 'The clipboard comes down. “I do not know anything about a painting.” Her voice is tighter. “I move parcels. I do not open them. That is policy.”',
            gives: ['marta-painting'], flags: ['martaBroke'] },
          { q: 'Danny’s phone has an unsent photograph of the open crate.', requires: ['phone-draft'], present: true,
            a: '“He should not have opened it.” She says it before she can stop herself. Then, more slowly: “I mean — if he opened a customer’s parcel, that is a disciplinary matter. It is not murder.”',
            gives: ['marta-slip'], flags: ['martaBroke'] },
          { q: 'The torque wrench from bay six has your hair in the ratchet.', requires: ['torque-wrench'], present: true,
            a: 'She looks at the table for a long time. “He was going to send it to a journalist,” she says. “Everything. The account, the invoices, the photographs. Eleven years of work. Gone because a driver wanted to be a hero.” She looks up. “I did not plan it. He swung at me first.”',
            gives: ['marta-confession'], flags: ['martaBroke'] }
        ],
        after: 'She asks who will run the night shift now. You tell her it will not be her. She nods, and begins to tidy the desk.'
      },
      {
        id: 'dev', name: 'Dev Shah', role: 'Night dispatcher', location: 'office', locationName: 'Dispatch office', tag: 'Suspect',
        portrait: { seed: 'dev-shah', hair: 'short', hairColor: '#1b1220', skin: 3, expression: 'sad', collar: 'shirt', glasses: 'square' },
        intro: 'Twenty-eight, precise, with headphones around his neck and a cold cup of tea beside the keyboard. He found the body. He also deleted a message at 04:33. He has been waiting for someone to ask him about it.',
        questions: [
          { q: 'Why did you delete Marta’s message?', requires: ['deleted-message'], present: true,
            a: '“Because she told me to.” He rubs his face. “She said it was a rota change, nothing more. I believed her until I saw the van.” He looks at the monitors. “I should have called someone. I did not.”',
            gives: ['dev-deleted'] },
          { q: 'You found the body at 05:10.', requires: ['body-note'],
            a: '“The engine was running. I thought he was asleep.” He stops. “The hose was already there. I did not touch it. I called the yard manager, then the police.” A pause. “Marta got there before the police. She was already in the yard when I came back out.”',
            gives: ['dev-discovery'] },
          { q: 'Who else uses the supervisor account?', requires: ['ghost-account'], present: true,
            a: '“Only Marta. The account is for internal stock, damaged parcels, returns.” He lowers his voice. “But the password is on a sticky note under her keyboard. Half the office knows it.”',
            gives: ['dev-account'] },
          { q: 'Did Danny call you before he left?', requires: ['radio-call'], present: true,
            a: '“He called channel two at 03:55. I heard him say ‘Marta, this is—’ and then she cut him off.” He looks at the floor. “I thought it was a routing argument. It was not.”',
            gives: ['dev-radio'] }
        ],
        after: 'He asks whether he will lose his job. You tell him the truth will matter more than the job. He nods and goes back to the monitors.'
      },
      {
        id: 'ron', name: 'Ron Delaney', role: 'Senior driver · union representative', location: 'breakroom', locationName: 'Breakroom', tag: 'Suspect',
        portrait: { seed: 'ron-delaney', hair: 'buzz', hairColor: '#8d8d99', skin: 1, expression: 'angry', collar: 'coat', beard: 'stubble' },
        intro: 'Fifty-six, built like a fridge, with a union badge on his fleece and a bandage on his left hand. He was supposed to drive the trunk run. He was late. He has been asking questions about bay six for a month.',
        questions: [
          { q: 'Why was Danny on your route?', requires: ['rota'],
            a: '“Marta changed it.” He holds up the bandaged hand. “I was at the hospital with my wife. I clocked in at 03:58 and the rota had my name scratched out.” He looks at you. “Danny took my run. If I had been on time, it would have been me in that van.”',
            gives: ['ron-rota'] },
          { q: 'You have been investigating the ghost consignments.', requires: ['ghost-manifest'], present: true,
            a: '“A month. Six crates out of bay six, all booked to the supervisor, all after midnight.” He leans forward. “I told Danny to photograph the next one. I thought if we had proof, the union could take it to the board.” He stops. “I got him killed.”',
            gives: ['ron-investigation'], flags: ['ronBroke'] },
          { q: 'Where were you between three and four?', requires: ['clock-in'],
            a: '“Hospital. My wife had a scan. I have the parking ticket.” He pulls it from his pocket. “I got here at 03:58. Martha was already in the yard.”',
            gives: ['ron-alibi'] },
          { q: 'Danny sent you a photograph at 04:02.', requires: ['phone-draft'], present: true,
            a: 'He takes out his phone. “I got it. A crate with a painting in it. I told him to send it to the journalist and get out of there.” His jaw works. “He said he had one more drop. The 04:30 trunk.”',
            gives: ['ron-photo'] }
        ],
        after: 'He gives you the parking ticket and the photograph without being asked. “Whatever happens to me,” he says, “make sure the board sees that painting.”'
      }
    ],
    clues: {
      'body-note': {
        name: 'Danny Okafor — post-mortem note', caption: 'Fracture · no soot · dead before engine', icon: 'blood', type: 'Forensic report',
        desc: 'A depressed fracture above the left temple. No soot in the lungs. Danny was dead before the engine was started.',
        tells: 'The carbon-monoxide suicide was staged. This is a murder made to look like one.'
      },
      'hose': {
        name: 'Garden hose', caption: 'Dry at exhaust · frost on coil', icon: 'tool', type: 'Physical evidence',
        desc: 'A garden hose running from the exhaust to the rear window. The exhaust end is dry and the coil is frosted.',
        tells: 'The hose was attached after the engine had cooled. The staging happened later.'
      },
      'van-key': {
        name: 'Van keys', caption: 'Ignition off · driver’s pocket', icon: 'key', type: 'Physical evidence',
        desc: 'The van keys, found in Danny’s pocket, with the ignition switched off.',
        tells: 'Whoever parked the van after the body was placed had a key — or took Danny’s.'
      },
      'phone-draft': {
        name: 'Unsent photograph', caption: 'Open crate · painting in foam', icon: 'phone', type: 'Digital evidence',
        desc: 'Danny’s unlocked phone, with an unsent message draft containing a photograph of an open crate and a framed painting.',
        tells: 'Danny photographed the crate before he died. The photograph is why he was killed.'
      },
      'fuel-receipt': {
        name: 'Fuel receipt', caption: '03:36 · 0.9 litres', icon: 'receipt', type: 'Record',
        desc: 'A fuel receipt for 0.9 litres of diesel, timed 03:36, found in the van.',
        tells: 'The fuel was bought before the route. The idle time can be calculated from it.'
      },
      'strap-cut': {
        name: 'Cut cargo strap', caption: 'Grey paint flakes on the webbing', icon: 'fiber', type: 'Trace evidence',
        desc: 'A black cargo strap, cut rather than unbuckled, with grey paint flakes in the webbing.',
        tells: 'The crate was opened in the van. Danny cut the strap and got paint on his hands.'
      },
      'dashcam-missing': {
        name: 'Missing dashcam card', caption: 'Cable unplugged · slot empty', icon: 'cctv', type: 'Device',
        desc: 'The dashcam has been unplugged and its SD card removed. The cable is still warm.',
        tells: 'Someone removed the dashcam footage after the body was placed.'
      },
      'gate-log': {
        name: 'Gate log', caption: '03:47 supervisor · 04:12 out · 04:29 in', icon: 'id', type: 'Access record',
        desc: 'The barrier opened at 03:47 on the supervisor’s code with no vehicle registration, then for Danny’s van at 04:12 and again at 04:29.',
        tells: 'Marta entered the yard before Danny left and was there when he returned.'
      },
      'supervisor-code': {
        name: 'Supervisor gate code', caption: '0417 · unchanged for three years', icon: 'keypad', type: 'Access record',
        desc: 'Marta Kline’s gate code, 0417, known to every driver and unchanged for three years.',
        tells: 'The code opens the gate and the supervisor’s safe. It is also the first thing to check.'
      },
      'cash': {
        name: 'Bundle of used notes', caption: '£8,400 · supervisor’s safe', icon: 'money', type: 'Physical evidence',
        desc: 'A bundle of used twenty-pound notes in Marta Kline’s safe, wrapped in a courier depot rubber band.',
        tells: 'Marta was being paid in cash, off the books. The smuggling was profitable.'
      },
      'burner-phone': {
        name: 'Burner phone', caption: 'Second mobile · prepaid', icon: 'phone', type: 'Device',
        desc: 'A cheap prepaid mobile in Marta’s safe, with one contact saved as “M.H. — accounts”.',
        tells: 'Marta kept a separate phone for the smuggling business. The contact links her to Meridian Heritage.'
      },
      'heritage-invoices': {
        name: 'Meridian Heritage invoices', caption: '“Logistics and storage”', icon: 'ledger', type: 'Financial record',
        desc: 'A folder of invoices from Meridian Heritage Ltd for “logistics and storage”, paid in cash.',
        tells: 'The depot was being paid to move stolen art. The invoices tie Marta to the network.'
      },
      'parcel-waybill': {
        name: 'Crate waybill', caption: 'Machine parts · 12 kg · trunk hold', icon: 'note', type: 'Document',
        desc: 'The waybill for the crate in Danny’s van: machine parts, 12 kg, held for the 04:30 trunk delivery.',
        tells: 'The crate was supposed to leave the depot at 04:30 without being scanned. It was the reason for the route.'
      },
      'route-log': {
        name: 'Dispatch route log', caption: 'Route changed 03:44 by M. KLINE', icon: 'ledger', type: 'Digital evidence',
        desc: 'The dispatch log shows Marta Kline changed the trunk route from Ron Delaney to Danny Okafor at 03:44, with no reason recorded.',
        tells: 'Marta put Danny in that van. She also kept Ron away from the gate.'
      },
      'hold-order': {
        name: 'Trunk hold order', caption: '“DO NOT SCAN AT DEPOT”', icon: 'note', type: 'Document',
        desc: 'A manifest note ordering the bay-six crate to be held for the trunk and not scanned at the depot.',
        tells: 'The crate was meant to bypass the scanner. Danny scanned it anyway.'
      },
      'deleted-message': {
        name: 'Deleted dispatch message', caption: '“Swap Danny onto the trunk.”', icon: 'laptop', type: 'Digital evidence',
        desc: 'Marta’s message to Dev at 03:42: swap Danny onto the trunk, keep Ron off the gate, do not log it.',
        tells: 'Marta deliberately put Danny on the route and kept the union representative away.'
      },
      'radio-call': {
        name: 'Radio recording', caption: '“Do not scan it.”', icon: 'audio', type: 'Audio evidence',
        desc: 'Marta’s voice on channel two at 03:55, ordering Danny to take the bay-six crate through the gate without scanning it.',
        tells: 'Marta controlled the crate’s movement. Danny was following her order when he found the painting.'
      },
      'camera-feed': {
        name: 'Yard camera feed', caption: '40 minutes · gate and bay four', icon: 'cctv', type: 'Surveillance',
        desc: 'The repaired yard camera’s buffer, showing the gate and bay four between 03:30 and 04:40.',
        tells: 'The footage can place Marta in the yard at the time of the murder.'
      },
      'camera-still': {
        name: 'Camera still, 04:20', caption: 'Marta at the van · leash in hand', icon: 'cctv', type: 'Surveillance',
        desc: 'A still from the yard camera showing Marta Kline at the rear of van 17 at 04:20, holding the garden hose.',
        tells: 'Marta attached the hose herself. She was alone with the van before Dev found the body.'
      },
      'crate-contents': {
        name: 'Crate contents', caption: 'Painting · bronze horse · provenance', icon: 'photo', type: 'Physical evidence',
        desc: 'A crate packed with an oil painting, a small bronze horse, and a folder of provenance documents.',
        tells: 'The “machine parts” were stolen art. The depot was being used as a smuggling route.'
      },
      'stolen-painting': {
        name: 'Stolen Titian', caption: '“Portrait of a Lady” · reported stolen', icon: 'photo', type: 'Physical evidence',
        desc: 'A portrait attributed to Titian, with a provenance folder naming a private collection in Amsterdam that reported it stolen four months ago.',
        tells: 'The crate was worth more than every other parcel in the van. It is the motive.'
      },
      'provenance': {
        name: 'Provenance folder', caption: 'Amsterdam collection · theft report', icon: 'letter', type: 'Document',
        desc: 'A folder of documents tracing the painting to a private collection reported stolen four months earlier.',
        tells: 'The smuggling ring is international. Northgate is one link in a chain.'
      },
      'ghost-manifest': {
        name: 'Ghost consignment manifest', caption: 'Six crates · supervisor account', icon: 'ledger', type: 'Financial record',
        desc: 'A printed manifest of six “machine parts” consignments over two months, all booked to Northgate Internal — Supervisor.',
        tells: 'Marta has been moving crates for months. The operation is systematic.'
      },
      'ghost-account': {
        name: 'Ghost account analysis', caption: 'Bay 6 · after midnight · overweight', icon: 'chart', type: 'Analysis',
        desc: 'A cross-check of the six ghost consignments: all from bay six, all after midnight, all heavier than their waybills.',
        tells: 'The supervisor’s internal account is the smuggling route. The weights prove the fraud.'
      },
      'handheld': {
        name: 'Bay-six handheld', caption: 'Last scan 03:58 · crate', icon: 'laptop', type: 'Device',
        desc: 'The handheld scanner from bay six, still in its charger, with its last scan at 03:58 recorded against the crate.',
        tells: 'Danny scanned the crate he was told not to scan. The record is still there.'
      },
      'torque-wrench': {
        name: 'Torque wrench', caption: 'Dark stain · hair in the ratchet', icon: 'tool', type: 'Weapon',
        desc: 'A heavy torque wrench from the out-of-service bay, with a dark stain on the head and strands of close-cropped hair in the ratchet.',
        tells: 'The murder weapon came from the loading bay. The hair can be matched.'
      },
      'autopsy': {
        name: 'Autopsy report', caption: '03:50–04:05 · single blow', icon: 'blood', type: 'Forensic report',
        desc: 'A single blow to the temple killed Danny between 03:50 and 04:05. No drugs, no alcohol, no soot.',
        tells: 'He died before the van left the depot — or very soon after. The staging happened after 04:29.'
      },
      'paint-flakes': {
        name: 'Paint flakes under the nails', caption: 'Grey paint · black strapping fibres', icon: 'fiber', type: 'Trace evidence',
        desc: 'Grey paint flakes and black cargo-strap fibres under Danny’s fingernails, with a fresh abrasion on his knuckles.',
        tells: 'Danny opened the crate and struggled with someone before he died.'
      },
      'time-of-death': {
        name: 'Time of death', caption: '03:50–04:05', icon: 'clock', type: 'Forensic report',
        desc: 'The pathologist fixes the time of death between 03:50 and 04:05.',
        tells: 'Danny was dead before the van returned at 04:29. The hose and the running engine were staged.'
      },
      'idle-time': {
        name: 'Idle-time calculation', caption: '0.9 L ÷ 1.4 L/h = 39 min', icon: 'chart', type: 'Forensic analysis',
        desc: 'The van’s fuel use shows the engine idled for about 39 minutes, from 04:30 to 05:09.',
        tells: 'The engine was started after the body was brought back. The suicide was constructed.'
      },
      'route-timeline': {
        name: 'Route timeline', caption: '03:41 → 05:10', icon: 'clock', type: 'Analysis',
        desc: 'Danny clocked in, was moved to the trunk, ordered not to scan the crate, scanned it anyway, left at 04:12, returned at 04:29.',
        tells: 'Danny had roughly twenty minutes between the scan and his death. The crate was opened in that window.'
      },
      'rota': {
        name: 'Altered rota', caption: 'Danny → trunk · initialled M.K.', icon: 'note', type: 'Record',
        desc: 'The weekly rota, with Danny’s name moved to the trunk run and Ron’s scratched out, initialled M.K. in red pen.',
        tells: 'Marta changed the route on paper as well as in the system. She wanted Danny in the van.'
      },
      'union-notice': {
        name: 'Union notice', caption: '“STOP USING BAY 6.”', icon: 'news', type: 'Document',
        desc: 'A union poster about the ghost consignments, with a handwritten warning in Danny’s hand: “STOP USING BAY 6. THEY ARE WATCHING.”',
        tells: 'Danny knew about the smuggling and had been warned off. He kept investigating.'
      },
      'clock-in': {
        name: 'Clock-in record', caption: 'Danny 03:41 · Ron 03:58', icon: 'receipt', type: 'Record',
        desc: 'The clock-in machine records Danny at 03:41 and Ron at 03:58.',
        tells: 'Ron was late. If the rota had not been changed, Ron would have taken the trunk and Danny would have lived.'
      },
      'marta-rota': {
        name: 'Marta on the rota', caption: '“Ron was late.”', icon: 'note', type: 'Statement',
        desc: 'Marta claims she moved Danny to the trunk because Ron was late and Danny was available.',
        tells: 'The dispatch log shows the change at 03:44, fourteen minutes before Ron clocked in. She could not have known he was late.'
      },
      'marta-radio': {
        name: 'Marta on the radio call', caption: '“The scanner was faulty.”', icon: 'audio', type: 'Statement',
        desc: 'Marta claims she told Danny not to scan the crate because the bay-six scanner was broken.',
        tells: 'The handheld was working and recorded the scan. Her explanation is false.'
      },
      'marta-painting': {
        name: 'Marta on the painting', caption: '“I do not open parcels.”', icon: 'note', type: 'Statement',
        desc: 'Marta denies any knowledge of the stolen painting or the crate’s contents.',
        tells: 'The invoices in her safe connect her to Meridian Heritage and the smuggling route.'
      },
      'marta-slip': {
        name: 'Marta’s slip', caption: '“He should not have opened it.”', icon: 'audio', type: 'Statement',
        desc: 'Marta says Danny should not have opened the crate before correcting herself to a disciplinary complaint.',
        tells: 'She knew the crate had been opened. She knew what was inside.'
      },
      'marta-confession': {
        name: 'Marta’s confession', caption: '“I did not plan it. He swung at me first.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the wrench, Marta admits confronting Danny in bay six and striking him once.',
        tells: 'She admits the killing and the staging. The physical evidence matches her account.'
      },
      'dev-deleted': {
        name: 'Dev on the message', caption: '“She said it was a rota change.”', icon: 'note', type: 'Statement',
        desc: 'Dev admits deleting Marta’s message because she told him it was only a rota change.',
        tells: 'Marta covered her tracks through the dispatcher. Dev is a witness, not an accomplice.'
      },
      'dev-discovery': {
        name: 'Dev’s discovery', caption: '“Marta was already in the yard.”', icon: 'audio', type: 'Witness statement',
        desc: 'Dev describes finding the van at 05:10 and seeing Marta already in the yard when he came back out.',
        tells: 'Marta was at the van before the police. She had time to finish the staging.'
      },
      'dev-account': {
        name: 'Dev on the account', caption: '“The password is on a sticky note.”', icon: 'note', type: 'Statement',
        desc: 'Dev confirms only Marta uses the supervisor account, but the password is written under her keyboard.',
        tells: 'The ghost account points to Marta, though others could technically access it.'
      },
      'dev-radio': {
        name: 'Dev on the radio', caption: '“She cut him off.”', icon: 'audio', type: 'Statement',
        desc: 'Dev heard Danny start to question Marta on channel two and heard Marta cut him off.',
        tells: 'Danny was trying to raise an objection at 03:55. He was already in trouble.'
      },
      'ron-rota': {
        name: 'Ron on the rota', caption: '“Danny took my run.”', icon: 'audio', type: 'Statement',
        desc: 'Ron confirms Marta changed the rota and that he was at the hospital with his wife until 03:58.',
        tells: 'Ron was the intended driver. The route swap put Danny in the wrong place at the wrong time.'
      },
      'ron-investigation': {
        name: 'Ron’s investigation', caption: '“I got him killed.”', icon: 'note', type: 'Statement',
        desc: 'Ron admits he asked Danny to photograph the next ghost consignment for the union.',
        tells: 'Danny was acting on Ron’s request. The whistleblower was Ron; Danny was the one who paid.'
      },
      'ron-alibi': {
        name: 'Ron’s alibi', caption: 'Hospital car park · 03:58', icon: 'receipt', type: 'Alibi',
        desc: 'A hospital parking ticket timed 03:42 and the clock-in record at 03:58 place Ron away from the depot during the murder.',
        tells: 'Ron could not have killed Danny. He was late because of his wife’s scan.'
      },
      'ron-photo': {
        name: 'Ron’s photograph', caption: 'Received 04:02 · crate and painting', icon: 'phone', type: 'Digital evidence',
        desc: 'The photograph Danny sent Ron at 04:02, showing the open crate and the painting.',
        tells: 'Danny had proof and had already shared it. Killing him could not bury the painting.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Danny Okafor?', 
          options: [
            { t: 'Ron Delaney — the union man who sent him to photograph the crate', v: 'ron' },
            { t: 'Dev Shah — the dispatcher who deleted the message', v: 'dev' },
            { t: 'Marta Kline — the supervisor who ran the ghost consignments', v: 'marta' },
            { t: 'A smuggler from the Meridian Heritage network', v: 'smuggler' }
          ], answer: 'marta' },
        { q: 'How was Danny killed?', 
          options: [
            { t: 'Struck with a torque wrench, then placed in the van with a hose to stage a suicide', v: 'wrench' },
            { t: 'Gassed in the van and left with the engine running', v: 'gas' },
            { t: 'Strangled in the loading bay and driven to the yard', v: 'strangled' },
            { t: 'Pushed from the loading bay and crushed under the van', v: 'crushed' }
          ], answer: 'wrench' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Danny photographed the stolen painting and was about to expose the smuggling route', v: 'painting' },
            { t: 'Danny was stealing money from the depot safe', v: 'theft' },
            { t: 'Danny was having an affair with Marta’s wife', v: 'affair' },
            { t: 'Danny had been offered Ron’s job and threatened to take it', v: 'job' }
          ], answer: 'painting' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The camera still of Marta with the hose, the wrench with her hair, and the radio order', v: 'camera' },
            { t: 'Ron’s hospital parking ticket', v: 'ticket' },
            { t: 'Dev’s deleted message', v: 'message' },
            { t: 'The fuel receipt from 03:36', v: 'fuel' }
          ], answer: 'camera' }
      ],
      verdict: {
        who: 'Marta Kline, 51 — night-shift supervisor at Northgate Couriers',
        whoDesc: 'was arrested in the dispatch office and charged with murder. She pleaded guilty to manslaughter and fraud; the murder charge was reduced after a psychiatric report.',
        how: 'She confronted Danny in bay six when she saw the crate had been opened, struck him once with a torque wrench, and moved him to the van. After the 04:29 return she attached the garden hose and started the engine to stage a suicide.',
        why: 'Danny had photographed the stolen painting and sent the image to Ron, the union representative. Marta had been selling space in Northgate’s parcel stream to an art-smuggling ring for two years, and Danny’s photograph would have ended it.',
        key: 'The repaired yard camera shows Marta holding the hose at the van at 04:20, the torque wrench carries her hair, and the radio recording captures her ordering Danny through the gate unscanned.'
      },
      reveal: [
        'Northgate Couriers was a good business with a bad secret. Six crates a month left bay six after midnight, all booked to an internal supervisor account, all labelled machine parts, all heavier than their waybills. Inside were paintings, bronzes, manuscripts, and small antiquities moving from European collections to private buyers who did not ask for receipts.',
        'Marta Kline built the route. She had run the night shift for eleven years and knew every camera, every code, every driver’s weak point. The gate code was her birthday. The manifest account was her name. The invoices were paid to a shell company called Meridian Heritage, and the money went into a safe under her desk.',
        'Ron Delaney, the union representative, had been asking questions for a month. He had seen the crates and the after-midnight scans. He asked Danny to photograph the next one, thinking a photograph would be enough to take to the board. Danny agreed because he needed the overtime and because he liked Ron.',
        'On Thursday night Marta changed the rota. She put Danny on the trunk run and Ron on the local loop, because Ron was the one asking questions and she wanted him away from the gate. She called Danny at 03:55 and told him not to scan the crate. Danny scanned it anyway at 03:58. Then he opened it at the lights on the ring road and photographed what was inside.',
        'He sent the photograph to Ron at 04:02. He called Marta at 04:07 and told her he was bringing the crate back. He was not angry. He was reasonable. That was the worst thing he could have been. He said he would give her a chance to explain before he called the journalist.',
        'She met him in bay six at 04:15. The argument was short. He swung at her — the abrasion on his knuckles and the bruise on her forearm support it — and she picked up the torque wrench from the shelf. One blow. He fell against the crate and did not get up.',
        'She loaded him into the van, drove it back through the gate at 04:29, and staged the suicide in the yard. She attached the hose to an engine that had been running for twenty minutes, cracked the rear window, and put the key in his pocket. She wiped the wrench but missed the hair in the ratchet.',
        'She almost got away with it. The first officers accepted the suicide. It was the pathologist who noticed there was no soot in his lungs. Then the fuel calculation showed the engine had run for thirty-nine minutes, all of it after Danny was dead. Then the camera came back online and showed Marta holding the hose.',
        'The painting was a Titian, stolen from a private collection in Amsterdam four months earlier. It was returned in a diplomatic crate with two customs officers and a representative of the insurer. The bronze horse is still missing.',
        'Marta Kline was sentenced to nineteen years. Dev Shah resigned and gave evidence at the trial. Ron Delaney kept his job and his union badge, and every year on the anniversary he drives the 04:12 trunk run himself, alone, with the radio off.',
        'Danny Okafor’s last delivery arrived at the journalist’s office at 04:31, two minutes after the gate log recorded his van coming back. The package was a padded envelope with a phone inside. The phone contained one photograph, one draft message, and no name.'
      ],
      quote: 'He said he would give me a chance to explain. That was the worst thing he could have done.',
      twist: 'The final detail was the route swap. Marta did not put Danny on the trunk to kill him — she put him there to keep Ron away from the gate. Danny was collateral. The person she was trying to silence was the union man, and the person who died was the one who happened to be driving.'
    }
  });
})();
