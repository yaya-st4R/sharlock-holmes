/* ============================================================
   CASE 23 — THE DROWNED GARDEN
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c23', num: 23,
    title: 'The Drowned Garden',
    subtitle: 'A botanist is found in the rainwater tank of her glasshouse, and the plants are the only witnesses.',
    difficulty: 5, est: '40–50 min',
    cover: { kind: 'greenhouse', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Dr Imogen Vale, 52 — keeper of the National Seed Collection' },
      { k: 'Scene', v: 'The Palm House, Ashcombe Botanic Garden' },
      { k: 'Found', v: '06:55 — by the assistant botanist' },
      { k: 'Cause', v: 'Datura poisoning · drowned in the rainwater tank' }
    ],
    briefing: [
      'Ashcombe Botanic Garden is sixty acres of glass, gravel and grafted trees on the edge of the city. Its Palm House was built in 1873 and has the third-largest collection of cycads in the country. Dr Imogen Vale had run it for nineteen years.',
      'At ten to seven her assistant found her face down in the rainwater tank at the back of the Palm House,among the ferns. The tank is four feet deep. The ladder was folded against the wall. The first officer wrote “tragic accident” and asked about her next of kin.',
      'The pathologist found datura alkaloids in her blood and a bruise on the back of her neck. She was unconscious when she went into the water. She had been drinking tea at her desk, and the tea was not tea.',
      'Imogen had spent the spring auditing the seed collection. She told the trustees she had found “irregularities in the accession register” and asked for a private meeting with the chair. The meeting was scheduled for nine o’clock. She was dead three hours before it.',
      'The glasshouse is locked at night. Only four people have keys. The datura grows in the bed beside her desk.'
    ],
    opening: 'The Palm House at dawn: condensation on iron, the smell of wet soil and something sweet and faintly rotten. The tank at the back is black and still. A folding ladder leans against the wall, folded. On the path, a single rubber boot print, pointing away from the water.',
    objectives: [
      'Prove Imogen was drugged before she drowned.',
      'Identify the plant that was used.',
      'Find what the accession register was hiding.',
      'Establish who entered the glasshouse after it was locked.'
    ],
    locations: [
      {
        id: 'palm', name: 'The Palm House', short: 'Palm House', time: '07:30',
        art: { kind: 'greenhouse', mood: 'cold' },
        intro: 'An iron-and-glass cathedral of palms, cycads and tree ferns, cold at dawn. The rainwater tank sits behind a screen of ferns. Imogen’s desk is at the far end, under the datura bed. Her tea cup is still on the desk, half full. The pump house door beside the tank is open.',
        actions: [
          { id: 'body', label: 'Examine the tank and the body', icon: 'blood', hotspot: { x: 52, y: 56 },
            desc: 'The water, the ladder, the bruise',
            text: [
              'Imogen Vale is face down in the tank, arms drifting, a wool cardigan dark with water. There is a bruise at the base of her neck, roughly the size of a thumb, and no water in her sinuses to suggest a struggle.',
              'The tank is four feet deep and fed by the roof downpipe. The overflow pipe is blocked with a wad of sphagnum moss. The water level is higher than the marks on the brickwork, which means it was filled deliberately.',
              'The folding ladder is against the wall, still folded. Nobody climbs a four-foot tank with a ladder and then folds it up on the way down. The pathologist’s note is pinned to the fern frame: <b>“Datura alkaloids in blood. Bruise to cervical spine. Unconscious before immersion.”</b>'
            ],
            gives: ['body-note', 'bruise', 'blocked-overflow'],
            hint: 'The tank was filled on purpose. She was unconscious before she went in.'
          },
          { id: 'search', label: 'Search the Palm House', icon: 'search', puzzle: 'palm-search',
            desc: 'Six details among the ferns',
            requires: ['body-note'],
            hint: 'Check the desk, the datura bed, the tank edge, the pump house, the path, and the door.' },
          { id: 'tea', label: 'Analyse the tea', icon: 'chemical', puzzle: 'tea-test',
            desc: 'Four reagents, one alkaloid',
            requires: ['body-note'],
            hint: 'Datura gives a positive Dragendorff test. Add the extract, then the reagent, then the ammonia.' },
          { id: 'camera', label: 'Enhance the glasshouse camera', icon: 'cctv', puzzle: 'palm-cam',
            desc: '21:40 — someone at the tank', requires: ['body-note'],
            hint: 'The camera covers the tank path. Enhance until the figure resolves.' }
        ]
      },
      {
        id: 'potting', name: 'The potting shed', short: 'Potting shed', time: '08:40',
        art: { kind: 'barn', mood: 'office' },
        requires: ['body-note'],
        intro: 'A brick shed full of clay pots, labels and string. Silas Crane is at the bench, repotting a fern with hands that are not quite steady. He has worked here for thirty-one years. He found the tank running and the pump house open, and he has already told three people that Imogen must have slipped.',
        actions: [
          { id: 'silas', label: 'Interview Silas Crane', icon: 'user', suspect: 'silas',
            desc: 'Head gardener · thirty-one years', hint: 'Silas knows every plant and every key. Ask him about the datura and the tank.' },
          { id: 'bench', label: 'Search the potting shed', icon: 'search',
            desc: 'A key board, a diary, a bottle', requires: ['body-note'],
            text: [
              'The key board has four hooks: PALM HOUSE, PROPAGATOR, SEED VAULT, GLASS STORE. The Palm House key is on its hook. So is the vault key. The propagator key is missing — Silas says he lost it in the spring.',
              'Silas’s diary records the week in a gardener’s shorthand. Tuesday: <b>“I.V. found something in the register. R.A. called. I.V. upset.”</b> Wednesday: <b>“Datura flowering. I.V. asked me to keep the tea in the desk drawer locked.”</b>',
              'A brown bottle on the shelf is labelled <b>“DATURA TINCTURE — FOR APHIDS — DILUTE 1:100”</b>. It is three-quarters empty. The bottle has been wiped clean.'
            ],
            gives: ['key-board', 'silas-diary', 'datura-bottle'],
            hint: 'The tincture bottle has been wiped. The diary names R.A.'
          },
          { id: 'valve', label: 'Repair the irrigation panel', icon: 'tool', puzzle: 'irrigation',
            desc: 'Four valves cross-wired', requires: ['key-board'],
            hint: 'Match each valve to its zone. The labels are stamped on the solenoids.' }
        ]
      },
      {
        id: 'office', name: 'The director’s office', short: 'Director’s office', time: '09:30',
        art: { kind: 'office', mood: 'mansion' },
        requires: ['silas-diary'],
        intro: 'A warm office above the visitor centre with a view of the glasshouses. Rowan Ashcombe is at the desk in a good suit, chair turned to the window. A copy of the garden’s annual report is open at the funding page. The chair of the trustees has been waiting for the police since eight.',
        actions: [
          { id: 'rowan', label: 'Interview Rowan Ashcombe', icon: 'user', suspect: 'rowan',
            desc: 'Chair of trustees · donor · R.A.', hint: 'Rowan was the last person Imogen called. Ask about the nine o’clock meeting.' },
          { id: 'desk', label: 'Search the director’s office', icon: 'ledger',
            desc: 'A funding file, a letter, a diary', requires: ['silas-diary'],
            text: [
              'The funding file records a £600,000 grant from the Meridian Heritage Foundation, conditional on “rationalisation of the living collection”. A note in Rowan’s hand reads: <b>“Sell the duplicates. Nobody counts the cycads.”</b>',
              'A letter from Imogen, dated Monday, is paper-clipped to the file: <b>“Rowan — the accession register shows 114 specimens missing since January. The seeds were sold. I have the invoices and the courier slips. I will bring them to the trustees on Friday.”</b>',
              'The desk diary for Friday has one entry: <b>“09:00 — I.V. — register — R.A. only.”</b> The page has been turned down at the corner, as if someone read it twice.'
            ],
            gives: ['funding-file', 'imogen-letter', 'rowan-diary'],
            hint: 'The Meridian grant is the reason the collection was being “rationalised”.'
          },
          { id: 'vault', label: 'Open the seed vault', icon: 'keypad', puzzle: 'vault',
            desc: 'Four digits · the garden’s founding year', requires: ['funding-file'],
            hint: 'The Palm House was built in 1873. Try 1873.' },
          { id: 'register', label: 'Read the accession register', icon: 'archive',
            desc: 'The gaps in the collection', requires: ['vault-open'],
            text: [
              'The vault is a cool room of steel drawers and glass jars, each labelled with an accession number. The register is a leather-bound book on a reading stand, with a laptop beside it holding the digital copy.',
              'The paper register has been altered: 114 entries have a neat line through them and the note <b>“DUPLICATE — DISPOSED”</b>. The digital register still shows them as present. The alterations are in Rowan Ashcombe’s hand.',
              'A folder in the bottom drawer holds twenty-two invoices from Meridian Heritage for “botanical specimens — research material”, totalling £284,000. Each is signed by R. Ashcombe. The seeds were sold, not disposed of.'
            ],
            gives: ['altered-register', 'meridian-invoices', 'seed-list'],
            hint: 'The paper register was altered; the digital one was not. Compare them.' }
        ]
      },
      {
        id: 'lab', name: 'The seed laboratory', short: 'Seed lab', time: '10:40',
        art: { kind: 'lab', mood: 'cold' },
        requires: ['altered-register'],
        intro: 'A white room of microscopes, germination cabinets and a wall of labelled seed jars. Priya Nair is at the bench with her coat on, sorting a tray of cycad seeds. She was Imogen’s assistant for four years and expected to take over her research. She also has a grant application that depended on Imogen’s signature.',
        actions: [
          { id: 'priya', label: 'Interview Priya Nair', icon: 'user', suspect: 'priya',
            desc: 'Assistant botanist · found the body', hint: 'Priya found her. Ask about the register and the missing specimens.' },
          { id: 'labsearch', label: 'Search the seed lab', icon: 'ledger',
            desc: 'A grant file, a climate log, a courier slip', requires: ['altered-register'],
            text: [
              'The lab climate log shows the Palm House temperature dropping to 4°C at 22:10 on Thursday, then returning to 18°C at 22:30. The drop coincides with the pump house door opening. Somebody turned off the heating to make the glasshouse cold.',
              'A courier slip on the bench is dated Thursday, 18:20: <b>“COLLECT — 2 BOXES — SEED VAULT — RECIPIENT: MERIDIAN HERITAGE, ROTTERDAM.”</b> The signature is R. Ashcombe. The courier’s collection time is 21:15.',
              'Priya’s grant file is open at a page of reviewer comments. One line is highlighted: <b>“Application depends on continued access to the national collection. Subject to Dr Vale’s approval.”</b>'
            ],
            gives: ['climate-log', 'courier-slip', 'grant-file'],
            hint: 'The heating was turned off at 22:10. The courier collected seeds at 21:15.'
          },
          { id: 'logic', label: 'Cross-check the keys and entries', icon: 'chart', puzzle: 'key-logic',
            desc: 'Four people, four keys, one door',
            requires: ['key-board', 'camera-card'],
            hint: 'Match each person to their key and their entry time using the door log and the camera still.' }
        ]
      },
      {
        id: 'gate', name: 'The service gate', short: 'Service gate', time: '12:00',
        art: { kind: 'parking', mood: 'cold' },
        requires: ['climate-log'],
        intro: 'A chain-link gate behind the glasshouses, with a keypad and a camera on a pole. The night security guard, Dennis Okafor, is in the gatehouse with a flask and a bank of monitors. He saw the courier van. He did not see who let it in.',
        actions: [
          { id: 'dennis', label: 'Interview Dennis Okafor', icon: 'user',
            desc: 'Night security · gate log', requires: ['courier-slip'],
            text: [
              'Dennis remembers the van: white, no markings, arrived at 21:10 and left at 21:35. The driver had a collection note with a trustee’s signature. Dennis did not open the gate — it was already open when he looked.',
              'The gate log records a code entry at 21:08. The code belongs to the director’s office. There is a second entry at 22:05, and a third at 06:40 when the assistant arrived.',
              'Dennis’s camera monitor for the Palm House path was showing static all evening. He reported it on Wednesday. Nobody fixed it.'
            ],
            gives: ['gate-log', 'dennis-statement'],
            hint: 'The director’s gate code was used at 21:08 and 22:05.' },
          { id: 'timeline', label: 'Rebuild the night', icon: 'clock', puzzle: 'garden-timeline',
            desc: 'Eight moments between 18:20 and 06:55', requires: ['gate-log', 'climate-log'],
            hint: 'Start with the courier slip and end with Priya finding the body.' }
        ]
      }
    ],
    puzzles: {
      'palm-search': {
        type: 'hotspot', title: 'The Palm House', subtitle: 'Six details among the ferns', icon: 'search',
        scene: { kind: 'greenhouse', mood: 'cold' },
        targets: [
          { label: 'Tea cup with sediment', x: 76, y: 46, r: 5.5, text: 'A china cup on the desk with a grey-green sediment at the bottom. The tea was not tea.' },
          { label: 'Datura seed pod', x: 84, y: 62, r: 5, text: 'A spiked datura seed pod on the floor under the desk, broken open. The plant grows beside the desk.' },
          { label: 'Tank overflow', x: 34, y: 64, r: 5.5, text: 'The tank overflow pipe, blocked with a wad of sphagnum moss. Someone filled the tank above its normal level.' },
          { label: 'Folded ladder', x: 24, y: 54, r: 5, text: 'The folding ladder, still folded and hooked on the wall. Nobody used it to climb into the tank.' },
          { label: 'Pump house door', x: 58, y: 38, r: 5, text: 'The pump house door is open. The heater switch inside is set to OFF, and the timer has been overridden.' },
          { label: 'Rubber boot print', x: 46, y: 82, r: 6, text: 'A single rubber boot print on the path, pointing away from the tank. Size eleven, a man’s boot, with gravel in the tread.' }
        ],
        note: 'Click directly on the details. The glasshouse has not been watered since the body was found.',
        hintText: 'Look at the desk, the floor, the tank, the ladder, the pump house and the path.',
        success: 'The Palm House gives up six details: a cup of drugged tea, a broken datura pod, a blocked overflow, a folded ladder, a pump house switched off, and a man’s boot print walking away.',
        successTitle: 'She was drugged, drowned and left.',
        gives: ['tea-sediment', 'datura-pod', 'boot-print'], flags: ['palmSearched'],
        short: 'The tea was drugged and the tank was filled deliberately.',
        log: 'The Palm House search finds drugged tea, a broken datura pod, a blocked overflow, a folded ladder, a switched-off pump and a man’s boot print.'
      },
      'tea-test': {
        type: 'mix', title: 'The Tea Analysis', subtitle: 'Four reagents, one alkaloid', icon: 'chemical',
        reagents: [
          { name: 'Tea extract', color: '#7a5c2e' },
          { name: 'Ammonia', color: '#cfe8ff' },
          { name: 'Dragendorff reagent', color: '#e08a3c' },
          { name: 'Distilled water', color: '#5aa9e6' }
        ],
        order: [0, 2, 1],
        note: 'A thin-layer test for tropane alkaloids: spot the extract, add the Dragendorff reagent, then ammonia to develop. Add the reagents in that order.',
        wrong: 'The plate develops the wrong colour. Spot the extract first, then the reagent, then the ammonia.',
        hintText: 'Order: tea extract → Dragendorff reagent → ammonia.',
        success: 'The plate blooms orange-brown: a positive tropane alkaloid test. The tea contained datura — the same alkaloid the pathologist found in Imogen’s blood. The plant grew three feet from her desk.',
        successTitle: 'The poison came from the glasshouse.',
        gives: ['toxin-result', 'datura-source'], flags: ['teaTested'],
        short: 'The tea contained datura from the glasshouse bed.',
        log: 'The tea tests positive for tropane alkaloids, matching datura from the bed beside Imogen’s desk.'
      },
      'palm-cam': {
        type: 'photo', title: 'Palm House Camera', subtitle: 'Enhance the 21:40 still', icon: 'cctv',
        scene: { kind: 'greenhouse', mood: 'cold' },
        target: { x: 60, y: 48, w: 16, h: 34 }, range: [56, 78],
        question: 'Who is standing at the rainwater tank at 21:40?',
        options: [
          { t: 'Rowan Ashcombe, in a suit, holding a folded ladder', v: 'rowan' },
          { t: 'Silas Crane, in his gardener’s apron, carrying a hose', v: 'silas' },
          { t: 'Priya Nair, in a lab coat, carrying a seed tray', v: 'priya' },
          { t: 'A courier in a white van jacket', v: 'courier' }
        ],
        answer: 'rowan',
        reveal: 'The figure resolves: a tall man in a dark suit, jacket off, sleeves rolled, standing at the tank with a folded ladder under one arm. His face is turned toward the camera for a single frame. Rowan Ashcombe. Behind him, the pump house door is open.',
        wrong: 'The figure is at the tank, not the path. Slide into the clear band and look at the suit and the ladder.',
        hintText: 'The clear band is 56% to 78%. Look for the suit jacket and the folded ladder.',
        success: 'The camera places Rowan Ashcombe at the tank at 21:40 with the folding ladder — eighty minutes before the heating was switched off, and nine hours before the body was found.',
        successTitle: 'Rowan was at the tank.',
        gives: ['camera-card', 'rowan-still'], flags: ['palmCamDone'],
        short: 'Rowan was at the tank at 21:40.',
        log: 'The Palm House camera shows Rowan Ashcombe at the rainwater tank at 21:40, carrying the folding ladder.'
      },
      'irrigation': {
        type: 'repair', title: 'Irrigation Panel', subtitle: 'Four solenoid valves', icon: 'tool',
        prompt: 'The irrigation panel has been opened and the solenoid leads pulled. The glasshouse has been running on manual since Thursday.',
        note: 'Match each valve to its zone. The codes are stamped on the solenoids.',
        pairs: [
          { l: 'V1 — PALMS', r: 'ZONE A', color: '#a855f7' },
          { l: 'V2 — FERNS', r: 'ZONE B', color: '#67e8f9' },
          { l: 'V3 — CYCADS', r: 'ZONE C', color: '#fbbf24' },
          { l: 'V4 — TANK FILL', r: 'ZONE D', color: '#34d399' }
        ],
        hintText: 'V1 palms to A, V2 ferns to B, V3 cycads to C, V4 tank fill to D.',
        success: 'The panel comes back to life. The log buffer shows the tank-fill valve opened at 22:02 and ran for eleven minutes — long enough to raise the tank above the overflow. It was opened manually from the panel.',
        successTitle: 'The tank was filled by hand at 22:02.',
        gives: ['irrigation-log'], flags: ['irrigationFixed'],
        short: 'The tank-fill valve was opened manually at 22:02.',
        log: 'The repaired irrigation panel shows the tank-fill valve was opened manually at 22:02 and run for eleven minutes.'
      },
      'vault': {
        type: 'keypad', title: 'The Seed Vault', subtitle: 'Four-digit keypad', icon: 'keypad',
        deviceLabel: 'ASHCOMBE — SEED VAULT', length: 4, code: '1873',
        prompt: 'A cool-room door with a keypad. The code has not been changed since the vault was built with the Palm House. <span style="color:var(--dim)">The date is cast into the iron above the door.</span>',
        hintText: 'The Palm House was built in 1873. Enter 1873.',
        successTitle: 'The vault opens.',
        success: 'Inside: steel drawers of seed jars, a reading stand with the accession register, and a folder of invoices in the bottom drawer.',
        gives: ['vault-open', 'altered-register', 'accession-gap'], flags: ['vaultOpen'],
        short: 'The seed vault is open and the register is altered.',
        log: 'The seed vault opens on 1873, revealing the altered accession register and a folder of Meridian invoices.'
      },
      'key-logic': {
        type: 'logicgrid', title: 'Keys and Entries', subtitle: 'Four people, four keys, one door', icon: 'chart',
        prompt: 'The key board, the door log, the camera still and the statements give four partial pictures. Cross-check them.',
        rows: [
          { label: 'The figure at the tank, 21:40', selects: [
            { label: 'person', options: [{ v: 'rowan', t: 'Rowan Ashcombe' }, { v: 'silas', t: 'Silas Crane' }, { v: 'priya', t: 'Priya Nair' }], answer: 'rowan' },
            { label: 'object', options: [{ v: 'ladder', t: 'Folding ladder' }, { v: 'hose', t: 'Garden hose' }, { v: 'tray', t: 'Seed tray' }], answer: 'ladder' }
          ] },
          { label: 'The person who found the body', selects: [
            { label: 'person', options: [{ v: 'priya', t: 'Priya Nair' }, { v: 'silas', t: 'Silas Crane' }, { v: 'dennis', t: 'Dennis Okafor' }], answer: 'priya' },
            { label: 'time', options: [{ v: '0655', t: '06:55' }, { v: '0710', t: '07:10' }, { v: '0730', t: '07:30' }], answer: '0655' }
          ] },
          { label: 'The missing key on the board', selects: [
            { label: 'key', options: [{ v: 'propagator', t: 'Propagator' }, { v: 'palm', t: 'Palm House' }, { v: 'vault', t: 'Seed vault' }], answer: 'propagator' },
            { label: 'owner', options: [{ v: 'silas', t: 'Silas Crane' }, { v: 'rowan', t: 'Rowan Ashcombe' }, { v: 'priya', t: 'Priya Nair' }], answer: 'silas' }
          ] }
        ],
        wrong: 'Check the door log, the key board and Priya’s statement again. One person cannot be at the tank and at the gate.',
        hintText: 'Rowan is the figure with the ladder. Priya found the body at 06:55. Silas lost the propagator key.',
        success: 'The accounts lock together. Rowan had the director’s gate code and was at the tank at 21:40. Priya arrived at 06:40 and found the body at 06:55. Silas had lost the propagator key in the spring and had been covering for it ever since.',
        successTitle: 'The keys point at the director’s office.',
        gives: ['key-logic'], flags: ['logicDone'],
        short: 'Rowan had the gate code and was at the tank.',
        log: 'A cross-check of keys and entries places Rowan at the tank with the ladder, Priya at the discovery, and Silas missing the propagator key.'
      },
      'garden-timeline': {
        type: 'sequence', title: 'The Night, In Order', subtitle: 'Eight moments before the body was found', icon: 'clock', variant: 'strips',
        prompt: 'The gate log, the camera, the climate log and the statements disagree. Put the night in order.',
        items: [
          { t: 'The courier slip is signed for two boxes', sub: '18:20 — seed lab', order: 1 },
          { t: 'The courier collects the seed boxes', sub: '21:15 — service gate', order: 2 },
          { t: 'Rowan Ashcombe is at the tank with a ladder', sub: '21:40 — Palm House camera', order: 3 },
          { t: 'The tank-fill valve is opened by hand', sub: '22:02 — irrigation panel', order: 4 },
          { t: 'The heating is switched off', sub: '22:10 — pump house', order: 5 },
          { t: 'The gate code is used to leave', sub: '22:05 — service gate', order: 6 },
          { t: 'Priya arrives at the gate', sub: '06:40 — gate log', order: 7 },
          { t: 'Priya finds the body', sub: '06:55 — her statement', order: 8 }
        ],
        wrong: 'The courier came before the tank was filled. Rowan left after the heating was switched off.',
        hintText: 'Courier slip 18:20, collection 21:15, tank 21:40, fill 22:02, gate 22:05, heating 22:10, Priya 06:40, body 06:55.',
        success: 'The night lines up. The seeds left at 21:15. Rowan was at the tank twenty-five minutes later. The tank was filled at 22:02, the heating was switched off at 22:10, and Imogen was left in four feet of cold water until dawn.',
        successTitle: 'The murder took ninety minutes and a ladder.',
        gives: ['garden-timeline'], flags: ['timelineBuilt'],
        short: 'Rowan filled the tank and left Imogen in it overnight.',
        log: 'Timeline: seeds collected 21:15, Rowan at tank 21:40, tank filled 22:02, gate used 22:05, heating off 22:10, body found 06:55.'
      }
    },
    suspects: [
      {
        id: 'rowan', name: 'Rowan Ashcombe', role: 'Chair of trustees · donor', location: 'office', locationName: 'Director’s office', tag: 'Prime suspect',
        portrait: { seed: 'rowan-ashcombe', hair: 'combed', hairColor: '#8d8d99', skin: 1, expression: 'smug', collar: 'suit', glasses: 'square' },
        intro: 'Forty-seven, polished, with the garden’s name and a £600,000 grant attached to his family foundation. He signed twenty-two invoices for “botanical specimens”. He was at the tank at 21:40. He says he was at a fundraising dinner.',
        questions: [
          { q: 'Where were you between nine and eleven?', requires: ['camera-card'], present: true,
            a: '“At the Merchant Hall. The spring dinner. Two hundred people saw me.” He smiles. “I left at half eleven. You can check the speeches — I gave one.”',
            gives: ['rowan-alibi'], flags: ['rowanHostile'] },
          { q: 'The camera shows you at the tank at 21:40.', requires: ['rowan-still'], present: true,
            a: '“I came back for my diary. I went to the Palm House to check the heating — the cycads suffer in the cold.” A pause. “The ladder was already there. I moved it out of the way.”',
            gives: ['rowan-camera'] },
          { q: 'You signed for 114 specimens sold to Meridian Heritage.', requires: ['meridian-invoices'], present: true,
            a: '“Duplicates. The collection had duplicates. The trustees approved rationalisation.” He opens the annual report. “Read the minutes. It is all above board.”',
            gives: ['rowan-sale'], flags: ['rowanBroke'] },
          { q: 'Imogen was going to bring the register to the trustees this morning.', requires: ['imogen-letter'], present: true,
            a: '“Imogen was brilliant and difficult. She saw conspiracies in filing errors.” He closes the report. “If she was going to accuse me, she should have brought evidence. She had none.”',
            gives: ['rowan-letter'], flags: ['rowanBroke'] },
          { q: 'Datura was in her tea, and you have the only other key to the pump house.', requires: ['toxin-result'], present: true,
            a: 'He looks at the window for a long time. “She would not listen. The garden is running out of money. Meridian offered a way to keep the lights on, and she wanted to stop it over a few missing seeds.” He turns back. “I only meant her to sleep. The tank was for the ferns.”',
            gives: ['rowan-confession'], flags: ['rowanBroke'] }
        ],
        after: 'He asks whether the spring dinner will still go ahead. You tell him the garden will be closed. He straightens his tie and asks for his solicitor.'
      },
      {
        id: 'silas', name: 'Silas Crane', role: 'Head gardener · thirty-one years', location: 'potting', locationName: 'Potting shed', tag: 'Suspect',
        portrait: { seed: 'silas-crane', hair: 'short', hairColor: '#8d8d99', skin: 0, expression: 'sad', collar: 'coat', beard: 'full', age: 'old' },
        intro: 'Sixty-one, weathered, with soil under his nails and a key board he has never liked. He lost the propagator key in the spring and did not report it. He found the pump running and the tank full before anyone else that morning, and he told three people it was an accident.',
        questions: [
          { q: 'Why did you say it was an accident?', requires: ['body-note'],
            a: '“Because she was in the water and the ladder was folded and I did not want to think —” He stops. “I have worked here thirty-one years. I have never seen the tank full like that.”',
            gives: ['silas-accident'] },
          { q: 'The datura tincture bottle has been wiped clean.', requires: ['datura-bottle'], present: true,
            a: '“I use it for aphids. One part to a hundred.” He looks at his hands. “I keep it on the shelf. Everyone knows it is there. Imogen asked me to lock the tea in the desk because she was sleeping badly.”',
            gives: ['silas-tincture'] },
          { q: 'You lost the propagator key.', requires: ['key-board'], present: true,
            a: '“In the spring. In the compost, I think.” He sighs. “I did not report it. I thought it would turn up. It opens the pump house too — the old lock, before they changed the front.”',
            gives: ['silas-key'], flags: ['silasBroke'] },
          { q: 'Who else knew about Imogen’s audit?', requires: ['silas-diary'], present: true,
            a: '“Rowan. She told him on Tuesday. He came down to the Palm House and they argued by the cycads.” He looks up. “She said, ‘You have sold the collection.’ He said, ‘I have saved the garden.’ I remember because she was crying.”',
            gives: ['silas-rowan'] }
        ],
        after: 'He asks whether he should feed the ferns. You tell him to leave everything as it is. He nods and puts his hands in his pockets.'
      },
      {
        id: 'priya', name: 'Priya Nair', role: 'Assistant botanist', location: 'lab', locationName: 'Seed laboratory', tag: 'Suspect',
        portrait: { seed: 'priya-nair', hair: 'long', hairColor: '#1b1220', skin: 3, expression: 'sad', collar: 'lab', eyes: '#2b1a12' },
        intro: 'Twenty-nine, careful, with a grant application that depended on Imogen’s signature and a research post that depended on her recommendation. She found the body. She also knew the vault code, the pump house and the datura bed.',
        questions: [
          { q: 'What did you see when you arrived?', requires: ['body-note'],
            a: '“The Palm House lights were on. The tank was running over. I thought a pipe had burst.” She stops. “Then I saw her cardigan. I did not go in. I called Silas and then the police.”',
            gives: ['priya-discovery'] },
          { q: 'You inherit Imogen’s research post.', requires: ['grant-file'], present: true,
            a: '“I inherit a grant application and a filing cabinet.” She folds her arms. “I would have worked for her for another ten years. She was the only person in this garden who cared about the collection.”',
            gives: ['priya-grant'], flags: ['priyaBroke'] },
          { q: 'You knew the vault code.', requires: ['vault-open'], present: true,
            a: '“Everyone knows the vault code. It is the date on the door.” She stops. “But I did not take anything. You can check the digital register. The paper one is the one that was altered.”',
            gives: ['priya-vault'] },
          { q: 'The courier collected two boxes at 21:15.', requires: ['courier-slip'], present: true,
            a: '“I saw the van from the lab window. I thought it was compost.” She looks at the slip. “Rowan signed it. Rowan has the only other key to the tank pump.”',
            gives: ['priya-courier'] }
        ],
        after: 'She asks whether the cycads will be all right without the heating. You tell her someone will come. She says, “They survived the last ice age. They will survive one night.”'
      }
    ],
    clues: {
      'body-note': {
        name: 'Imogen Vale — post-mortem note', caption: 'Datura · bruise · drowned unconscious', icon: 'blood', type: 'Forensic report',
        desc: 'Datura alkaloids in the blood, a bruise at the base of the neck, and water in the lungs consistent with drowning while unconscious.',
        tells: 'She was drugged, then drowned. This was not an accident.'
      },
      'bruise': {
        name: 'Cervical bruise', caption: 'Thumb-shaped · back of the neck', icon: 'blood', type: 'Forensic detail',
        desc: 'A thumb-shaped bruise at the base of Imogen’s neck, caused by pressure from behind.',
        tells: 'Someone held her head under the water. The killer stood behind her at the tank.'
      },
      'blocked-overflow': {
        name: 'Blocked overflow', caption: 'Sphagnum moss · water above the mark', icon: 'fiber', type: 'Scene mark',
        desc: 'The tank overflow pipe, blocked with sphagnum moss. The water level is above the normal brickwork mark.',
        tells: 'The tank was deliberately overfilled. The drowning was planned, not opportunistic.'
      },
      'tea-sediment': {
        name: 'Drugged tea', caption: 'Grey-green sediment', icon: 'chemical', type: 'Physical evidence',
        desc: 'Imogen’s tea cup, with a grey-green sediment at the bottom and no tea leaves.',
        tells: 'The drug was in her drink. She was sedated at her own desk.'
      },
      'datura-pod': {
        name: 'Datura seed pod', caption: 'Broken open · under the desk', icon: 'pill', type: 'Physical evidence',
        desc: 'A spiked datura seed pod, broken open on the floor under Imogen’s desk.',
        tells: 'The poison came from the glasshouse bed. Whoever used it knew the plant.'
      },
      'boot-print': {
        name: 'Rubber boot print', caption: 'Size eleven · walking away from the tank', icon: 'footprint', type: 'Trace evidence',
        desc: 'A single rubber boot print on the tank path, size eleven, pointing away from the water.',
        tells: 'A man walked away from the tank after the body was placed. The print can be matched.'
      },
      'toxin-result': {
        name: 'Toxin test result', caption: 'Positive tropane alkaloid', icon: 'chemical', type: 'Forensic analysis',
        desc: 'A thin-layer test confirming tropane alkaloids in Imogen’s tea, matching datura.',
        tells: 'The tea was dosed with datura from the glasshouse. The murder weapon grew three feet away.'
      },
      'datura-source': {
        name: 'Datura bed', caption: 'Flowering beside the desk', icon: 'chemical', type: 'Scene mark',
        desc: 'The datura bed beside Imogen’s desk, in flower, with one seed pod missing.',
        tells: 'The poison was harvested on site. The killer did not need to bring anything in.'
      },
      'camera-card': {
        name: 'Palm House camera card', caption: 'Recovered from the housing', icon: 'cctv', type: 'Device',
        desc: 'The camera card from the Palm House path camera, recovered intact after the camera was switched to static.',
        tells: 'The camera was disabled, not broken. Its card still holds the evening.'
      },
      'rowan-still': {
        name: 'Palm House still, 21:40', caption: 'Rowan · suit · folded ladder', icon: 'cctv', type: 'Surveillance',
        desc: 'An enhanced still of Rowan Ashcombe at the rainwater tank at 21:40, holding the folded ladder.',
        tells: 'Rowan was at the tank before the murder. His dinner alibi has a hole in it.'
      },
      'irrigation-log': {
        name: 'Irrigation log', caption: 'Tank-fill valve 22:02 · 11 minutes', icon: 'chart', type: 'Record',
        desc: 'The irrigation panel log showing the tank-fill valve opened manually at 22:02 and run for eleven minutes.',
        tells: 'The tank was filled from the panel. Whoever did it knew the irrigation system.'
      },
      'key-board': {
        name: 'Key board', caption: 'Palm House · vault · propagator missing', icon: 'key', type: 'Physical evidence',
        desc: 'The potting-shed key board, with the Palm House and vault keys present and the propagator key missing.',
        tells: 'The missing propagator key also opens the old pump house lock. Silas lost it in the spring.'
      },
      'silas-diary': {
        name: 'Silas’s diary', caption: '“I.V. found something in the register.”', icon: 'note', type: 'Personal record',
        desc: 'The head gardener’s diary, recording that Imogen found something in the register and argued with R.A.',
        tells: 'Imogen confronted Rowan days before her death. Silas knew about the argument.'
      },
      'datura-bottle': {
        name: 'Datura tincture', caption: 'Three-quarters empty · wiped clean', icon: 'pill', type: 'Physical evidence',
        desc: 'A brown bottle of datura tincture for aphids, three-quarters empty and wiped clean of prints.',
        tells: 'The tincture was used and the bottle cleaned. It came from the potting shed shelf.'
      },
      'accession-gap': {
        name: 'The missing specimens', caption: '114 entries struck through', icon: 'archive', type: 'Record',
        desc: 'The accession register with 114 entries struck through and marked “DUPLICATE — DISPOSED”.',
        tells: 'The collection was being sold off and recorded as duplicates. Imogen was auditing it.'
      },
      'funding-file': {
        name: 'Meridian funding file', caption: '£600,000 · “rationalisation”', icon: 'ledger', type: 'Financial record',
        desc: 'A funding file for a £600,000 grant from the Meridian Heritage Foundation, conditional on rationalising the collection.',
        tells: 'The garden was paid to sell its specimens. The grant is the motive.'
      },
      'imogen-letter': {
        name: 'Imogen’s letter', caption: '“114 specimens missing.”', icon: 'letter', type: 'Document',
        desc: 'A letter from Imogen to Rowan, stating that 114 specimens were missing and that she had the invoices and courier slips.',
        tells: 'Imogen had the evidence and was going to the trustees. She was killed the night before.'
      },
      'rowan-diary': {
        name: 'Rowan’s diary', caption: '“09:00 — I.V. — register — R.A. only.”', icon: 'note', type: 'Personal record',
        desc: 'Rowan’s desk diary, with the Friday meeting with Imogen marked and the page turned down.',
        tells: 'Rowan knew the meeting was about the register. He read the entry twice.'
      },
      'vault-open': {
        name: 'Seed vault open', caption: 'Register · invoices · jars', icon: 'lockbox', type: 'Scene mark',
        desc: 'The seed vault, opened on 1873, containing the accession register and a folder of Meridian invoices.',
        tells: 'The vault held the evidence of the sale. It was not locked against the trustees.'
      },
      'altered-register': {
        name: 'Altered accession register', caption: 'Paper altered · digital intact', icon: 'archive', type: 'Record',
        desc: 'The leather-bound accession register, altered in Rowan’s hand, while the digital copy still lists the specimens as present.',
        tells: 'Rowan falsified the register. The comparison with the digital copy proves it.'
      },
      'meridian-invoices': {
        name: 'Meridian invoices', caption: '22 invoices · £284,000', icon: 'money', type: 'Financial record',
        desc: 'Twenty-two invoices from Meridian Heritage for botanical specimens, totalling £284,000, each signed by R. Ashcombe.',
        tells: 'Rowan sold the collection. The money went to the garden — and to the foundation.'
      },
      'seed-list': {
        name: 'Seed consignment list', caption: 'Two boxes · Rotterdam', icon: 'note', type: 'Document',
        desc: 'A list of the specimens in the two boxes collected on Thursday night, including three cycad species listed as extinct in the wild.',
        tells: 'The sale was not duplicates. It included irreplaceable specimens.'
      },
      'climate-log': {
        name: 'Climate log', caption: '4°C at 22:10 · restored 22:30', icon: 'chart', type: 'Record',
        desc: 'The lab climate log, showing the Palm House temperature dropped to 4°C at 22:10 and restored at 22:30.',
        tells: 'The heating was switched off to make the glasshouse cold. It was a deliberate act.'
      },
      'courier-slip': {
        name: 'Courier slip', caption: '18:20 · two boxes · Meridian Rotterdam', icon: 'receipt', type: 'Document',
        desc: 'A courier collection slip for two seed boxes addressed to Meridian Heritage, Rotterdam, signed by R. Ashcombe.',
        tells: 'The specimens were shipped out the night Imogen died. The sale was already in motion.'
      },
      'grant-file': {
        name: 'Priya’s grant file', caption: '“Subject to Dr Vale’s approval.”', icon: 'letter', type: 'Document',
        desc: 'Priya’s grant application, dependent on continued access to the collection and Imogen’s approval.',
        tells: 'Priya had a professional motive to keep Imogen alive, not kill her.'
      },
      'key-logic': {
        name: 'Key and entry analysis', caption: 'Rowan · ladder · 21:40', icon: 'chart', type: 'Analysis',
        desc: 'A logic grid matching Rowan to the tank and the ladder, Priya to the discovery, and Silas to the missing propagator key.',
        tells: 'The access evidence points at Rowan. Only he had the gate code, the vault, and the reason.'
      },
      'gate-log': {
        name: 'Service gate log', caption: '21:08 · 22:05 · 06:40', icon: 'id', type: 'Access record',
        desc: 'The gate log showing the director’s code used at 21:08, again at 22:05, and Priya’s code at 06:40.',
        tells: 'Someone with the director’s code entered before the courier and left after the tank was filled.'
      },
      'dennis-statement': {
        name: 'Dennis’s statement', caption: '“The gate was already open.”', icon: 'audio', type: 'Witness statement',
        desc: 'The night guard’s statement that the gate was open at 21:10 and the Palm House camera had been static all evening.',
        tells: 'The killer disabled the camera and used the director’s code. The guard saw the van but not the person.'
      },
      'garden-timeline': {
        name: 'Garden timeline', caption: '18:20 → 06:55', icon: 'clock', type: 'Analysis',
        desc: 'A reconstruction of the seed collection, the tank-filling, the heating cut and the discovery.',
        tells: 'Rowan had ninety minutes alone in the glasshouse. He filled the tank and left Imogen in it overnight.'
      },
      'rowan-alibi': {
        name: 'Rowan’s alibi', caption: '“At the Merchant Hall.”', icon: 'audio', type: 'Statement',
        desc: 'Rowan claims he was at a fundraising dinner from nine until half past eleven.',
        tells: 'The camera places him at the tank at 21:40. The dinner alibi is false.'
      },
      'rowan-camera': {
        name: 'Rowan on the camera', caption: '“I came back for my diary.”', icon: 'note', type: 'Statement',
        desc: 'Rowan claims he returned to the Palm House to check the heating and moved the ladder out of the way.',
        tells: 'He admits being at the tank. His reason for the ladder does not explain the water.'
      },
      'rowan-sale': {
        name: 'Rowan on the register', caption: '“Duplicates. The trustees approved.”', icon: 'audio', type: 'Statement',
        desc: 'Rowan claims the missing specimens were duplicates and the sale was approved by the trustees.',
        tells: 'The seed list includes species extinct in the wild. There were no duplicates.'
      },
      'rowan-letter': {
        name: 'Rowan on Imogen', caption: '“She had no evidence.”', icon: 'note', type: 'Statement',
        desc: 'Rowan dismisses Imogen’s allegations as filing errors and says she had no evidence.',
        tells: 'The register, the invoices and the courier slips are the evidence. He knew she had them.'
      },
      'rowan-confession': {
        name: 'Rowan’s confession', caption: '“I only meant her to sleep.”', icon: 'audio', type: 'Statement',
        desc: 'Rowan admits dosing Imogen’s tea with datura and holding her under the tank water, claiming he meant only to silence her.',
        tells: 'He admits the poisoning and the drowning. The camera, the toxin and the register corroborate him.'
      },
      'silas-accident': {
        name: 'Silas on the accident', caption: '“I did not want to think —”', icon: 'audio', type: 'Statement',
        desc: 'Silas admits he called it an accident because he did not want to believe what he had seen.',
        tells: 'He found the tank running and the pump house open. He is a witness, not a killer.'
      },
      'silas-tincture': {
        name: 'Silas on the tincture', caption: '“One part to a hundred.”', icon: 'note', type: 'Statement',
        desc: 'Silas explains the datura tincture was for aphids and that everyone knew where it was kept.',
        tells: 'The poison was available to anyone with access to the potting shed — including Rowan.'
      },
      'silas-key': {
        name: 'Silas on the key', caption: '“It opens the pump house too.”', icon: 'note', type: 'Statement',
        desc: 'Silas admits losing the propagator key in the spring and not reporting it, knowing it also opens the old pump house.',
        tells: 'The pump house could be opened by anyone who found the key. Silas covered up a loss, not a murder.'
      },
      'silas-rowan': {
        name: 'Silas on the argument', caption: '“She was crying.”', icon: 'audio', type: 'Witness statement',
        desc: 'Silas describes the argument between Imogen and Rowan at the cycads, and Imogen’s words: “You have sold the collection.”',
        tells: 'Rowan knew exactly what Imogen had found. The argument was days before the murder.'
      },
      'priya-discovery': {
        name: 'Priya’s discovery', caption: '“The tank was running over.”', icon: 'audio', type: 'Witness statement',
        desc: 'Priya describes arriving at 06:40, seeing the Palm House lights on and the tank overflowing, then finding Imogen.',
        tells: 'The tank was still running at dawn. The scene had not been touched since the night before.'
      },
      'priya-grant': {
        name: 'Priya on the grant', caption: '“I inherit a filing cabinet.”', icon: 'note', type: 'Statement',
        desc: 'Priya says her grant depended on Imogen’s approval and she had no reason to want her dead.',
        tells: 'Her career depended on Imogen. She had a motive to protect her, not kill her.'
      },
      'priya-vault': {
        name: 'Priya on the vault', caption: '“Everyone knows the code.”', icon: 'note', type: 'Statement',
        desc: 'Priya points out that the vault code is the date on the door and the paper register was the altered copy.',
        tells: 'The vault was not secured against staff. The alteration is the crime, not the access.'
      },
      'priya-courier': {
        name: 'Priya on the courier', caption: '“Rowan signed it.”', icon: 'note', type: 'Statement',
        desc: 'Priya saw the courier van from the lab and identifies Rowan’s signature on the collection slip.',
        tells: 'Rowan arranged the shipment. The seeds left the garden before Imogen died.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Dr Imogen Vale?', 
          options: [
            { t: 'Silas Crane — the head gardener who lost the pump house key', v: 'silas' },
            { t: 'Priya Nair — the assistant who inherits her research post', v: 'priya' },
            { t: 'Rowan Ashcombe — the trustee who sold the seed collection', v: 'rowan' },
            { t: 'A courier from Meridian Heritage', v: 'courier' }
          ], answer: 'rowan' },
        { q: 'How was Imogen killed?', 
          options: [
            { t: 'Datura in her tea, then held under the tank water', v: 'drowned' },
            { t: 'Struck on the head and left in the tank', v: 'struck' },
            { t: 'She slipped on the wet path and drowned accidentally', v: 'accident' },
            { t: 'Poisoned by fumes from the blocked overflow', v: 'fumes' }
          ], answer: 'drowned' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Imogen was about to expose the sale of 114 specimens to Meridian', v: 'seeds' },
            { t: 'Imogen was going to close the glasshouse and sell the land', v: 'land' },
            { t: 'Imogen had discovered Rowan’s affair with a trustee', v: 'affair' },
            { t: 'Imogen had refused to approve Priya’s grant', v: 'grant' }
          ], answer: 'seeds' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The 21:40 camera still, the datura in the tea, and the altered register', v: 'camera' },
            { t: 'Silas’s missing propagator key', v: 'key' },
            { t: 'Priya’s grant application', v: 'grant' },
            { t: 'The courier slip signed by Rowan', v: 'slip' }
          ], answer: 'camera' }
      ],
      verdict: {
        who: 'Rowan Ashcombe, 47 — chair of the trustees of Ashcombe Botanic Garden',
        whoDesc: 'was arrested in the director’s office and charged with murder. He pleaded guilty to manslaughter and fraud; the court accepted that he intended to silence Imogen but not to kill her.',
        how: 'He dosed her tea with datura tincture from the potting shed, met her in the Palm House at 21:40, held her under the water in the rainwater tank, and blocked the overflow so the tank stayed full. He then switched off the heating and left by the service gate.',
        why: 'Imogen had discovered that 114 specimens from the national collection had been sold to Meridian Heritage for £284,000 and recorded as duplicates. She was due to give the evidence to the trustees at nine the next morning.',
        key: 'The Palm House camera shows Rowan at the tank at 21:40, the tea tests positive for datura from the bed beside her desk, and the paper register was altered in his handwriting while the digital copy still lists every specimen.'
      },
      reveal: [
        'Ashcombe Botanic Garden had been quietly failing for a decade. The glasshouses leaked, the heating bills rose, and the endowment had shrunk to less than a year’s running costs. Rowan Ashcombe’s family had given the garden its name and, in the spring, its rescue: £600,000 from the Meridian Heritage Foundation, conditional on “rationalisation of the living collection”.',
        'The collection was one of the most important in the country. It held cycads that had survived the dinosaurs, ferns collected by Victorian expeditions, and seeds that existed nowhere else in cultivation. To Rowan it was an asset. To Imogen Vale it was a trust.',
        'She began the audit in March. By Thursday she had found 114 missing specimens, twenty-two invoices, and a courier account in Rowan’s name. She wrote to him on Monday. She asked for a meeting with the trustees on Friday at nine. She told Silas Crane that she had “found something in the register” and that she was frightened.',
        'Rowan did not plan a murder. He planned a conversation. He came to the Palm House at twenty to ten, after leaving the fundraising dinner early, with a bottle of datura tincture from the potting shed and an argument he thought would work. He found her at her desk, drinking tea, and he poured the tincture into the cup while she was checking the ferns.',
        'She drank it. She argued with him for twenty minutes, growing slower and quieter. He said the garden would close without Meridian. She said the garden was not his to sell. Then she tried to stand up, and fell against the desk, and he caught her.',
        'He carried her to the tank. He told himself he was going to leave her there and let her wake up cold and frightened. But she was already heavy, and the tank was full of black water, and the ladder was folded against the wall. He held her under for four minutes. Then he blocked the overflow with moss and switched off the heating.',
        'He left at five past ten, using his director’s gate code. The courier had collected the two boxes of seeds at 21:15. The whole transaction took less than two hours, and it was recorded by a camera he thought was broken and a panel he did not know kept a log.',
        'Priya arrived at 06:40 and found the tank overflowing and the lights still on. Silas arrived twenty minutes later and told everyone it was an accident. Neither of them knew that the register had been altered, or that Imogen had written to Rowan, or that the seeds were already in Rotterdam.',
        'Meridian Heritage was the same company that had bought St Cuthbert’s bells, smuggled art through Northgate Couriers, and was in the process of buying Radio Meridian. The botanic garden was one more link in a chain of purchases made with the proceeds of stolen things. The joint investigation was already open. This case closed one loop in it.',
        'Rowan Ashcombe was sentenced to life with a minimum of fifteen years. The garden was taken over by a charitable trust, the Meridian grant was repaid from the sale of the foundation’s assets, and the 114 specimens were recovered from a warehouse in Rotterdam and returned in cold storage.',
        'The cycads survived the winter. Priya Nair became the collection’s keeper. On her first morning she removed the “DUPLICATE — DISPOSED” stamp from the register, photographed every page, and put the book in a glass case by the door with a new label: <b>“THIS IS NOT AN ASSET. IT IS A TRUST.”</b>',
        'Silas Crane retired two years later. He never found the propagator key. It was in the compost, exactly where he said it was, and it opened the pump house until the day they changed the lock.'
      ],
      quote: 'The garden is not yours to sell.',
      twist: 'The final detail was the overflow. Rowan blocked it with sphagnum moss from the fern bed — the one thing in the glasshouse that would not be noticed by a botanist arriving at dawn. It kept the tank full and made a deliberate drowning look like a slip. It also caught a green fibre under his signet ring, which was all the police needed.'
    }
  });
})();
