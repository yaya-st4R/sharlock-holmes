/* ============================================================
   CASE 17 — THE NINTH FLOOR
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c17', num: 17,
    title: 'The Ninth Floor',
    subtitle: 'An architect falls nine floors on a site he was about to shut down, and the concrete tells a different story.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'factory', mood: 'cold' },
    facts: [
      { k: 'Victim', v: 'Ravi Chandrasekhar, 39 — architect' },
      { k: 'Scene', v: 'Meridian Tower site, level nine' },
      { k: 'Found', v: '05:30 — by the concrete crew' },
      { k: 'Cause', v: 'Fall from height · harness anchor cut' }
    ],
    briefing: [
      'Meridian Tower was supposed to be the tallest residential block in the city. At half past five in the morning, a concrete crew found its architect on the ground beside the crane deck, still in his harness, the lanyard cut clean through.',
      'Ravi Chandrasekhar had been on site since four. He had a reputation for turning up before everyone else and checking things nobody asked him to check. The pathologist says he was alive when he fell. The harness says he should not have fallen at all.',
      'The tower’s concrete is supplied by a lab the developer owns. The test certificates are signed by a structural engineer named Mira Solano. Ravi had been asking for core samples for a month. On Thursday he finally took one himself.',
      'A man who checks things nobody asks him to check is a dangerous thing on a construction site. The question is not why he was on the ninth floor at five in the morning. The question is who needed him to leave it.'
    ],
    opening: 'Level nine is a concrete skeleton open to a grey sky. Rebar stands up from the slab like grass. The safety rail at the north edge has a clean gap in it. Nine floors below, a tarpaulin covers the place where Ravi Chandrasekhar landed.',
    objectives: [
      'Establish whether the fall was an accident or a staged death.',
      'Test the concrete in the tower’s ninth-floor slab.',
      'Trace who altered the strength certificates.',
      'Find out what Ravi was going to do with the core sample.'
    ],
    locations: [
      {
        id: 'site', name: 'Level nine', short: 'Ninth floor', time: '06:10',
        art: { kind: 'factory', mood: 'cold' },
        intro: 'An unfinished floor of grey slab, orange safety mesh, and wind. The north edge has a gap in the rail where a section has been unbolted and set aside. Ravi’s tool bag is open by the core drill.',
        actions: [
          { id: 'body', label: 'Examine the edge and the harness', icon: 'blood', hotspot: { x: 58, y: 60 },
            desc: 'The rail, the lanyard, the anchor',
            text: [
              'The safety rail at the north edge is intact except for one section, which has been unbolted and leaned against the mesh. The bolts are on the slab in a neat row. Whoever opened the rail did not do it in a hurry.',
              'Ravi’s harness is still buckled. The lanyard — the strap that should have caught him — is cut clean through about a metre from the anchor point. The cut edge is smooth, not frayed.',
              'His phone is under the rebar, screen cracked, still recording a voice memo. The recording timer reads 04:51:08 — it has been running for nearly five hours.'
            ],
            gives: ['body-note', 'harness', 'phone', 'anchor-bolt'],
            hint: 'The rail was unbolted, not broken. The lanyard was cut, not torn. Start with the edge.'
          },
          { id: 'search', label: 'Search the ninth-floor slab', icon: 'search', puzzle: 'site',
            desc: 'Five things that do not belong',
            requires: ['body-note'],
            hint: 'Look at the rail, the drain, the slab, the dust, and the harness store tag.'
          },
          { id: 'core', label: 'Inspect Ravi’s core drill', icon: 'tool',
            desc: 'A hole in the slab and a sample in a tube',
            requires: ['body-note'],
            text: [
              'The core drill is still plugged in. It has a diamond bit and a water feed. Beside it, a neat hole has been cut through the slab and into the structural concrete below.',
              'A steel sample tube lies on its side, labelled in Ravi’s hand: <b>“L9 CORE — 04:40 — DO NOT LOSE.”</b> The tube is empty.',
              'The drill’s water tray is full of grey slurry. In the slurry: a partial boot print, size eleven, with a distinctive diamond tread.'
            ],
            gives: ['core-hole', 'slurry-print'],
            hint: 'Ravi cut a core sample. The tube is empty — someone took it.'
          }
        ]
      },
      {
        id: 'ground', name: 'Ground floor and crane deck', short: 'Ground floor', time: '06:50',
        art: { kind: 'street', mood: 'cold' },
        requires: ['body-note'],
        intro: 'The base of the tower is a mud yard ringed by site fencing. A tower crane stands over it, its hook swinging slightly. The crane operator’s cab is dark. A group of workers in hi-vis stand by the site office, smoking and not talking.',
        actions: [
          { id: 'crane', label: 'Check the crane log', icon: 'note',
            desc: 'Lifts, loads, and a gap',
            requires: ['body-note'],
            text: [
              'The crane log records every lift. The last entry is 04:35 — a pallet of rebar to level nine. After that: nothing until 05:40, when the operator returned from his break.',
              'The crane’s load cell records a weight at 05:06, but no lift command. The hook was moving. Someone used the crane manually, from the ground pendant, and did not log it.',
              'The operator’s break card shows him clocking out at 04:30 and back in at 05:40. He was not in the cab.'
            ],
            gives: ['crane-log'],
            hint: 'The crane moved without a lift command. Check the load cell and the operator’s break card.'
          },
          { id: 'operator', label: 'Interview the crane operator', icon: 'user',
            desc: 'The man who saw a light on nine',
            requires: ['crane-log'],
            text: [
              '“I was in the canteen,” the operator says. “I saw a light on nine about five past five. Work light, not a torch. Somebody was up there.”',
              '“Then I saw the hook move. I thought it was the wind, but the wind does not swing a hook that smooth. I went out to look. By the time I got to the deck, there was a man on the ground and the hook was still swinging.”',
              'He stubs out his cigarette. “The site manager was already there. Gideon. He was standing over the body with his phone out, not calling anyone. Just standing.”'
            ],
            gives: ['witness-statement'],
            hint: 'The operator was on break but saw a light and the hook move. Ask him what he saw.'
          },
          { id: 'gate', label: 'Pull the gate and badge records', icon: 'id',
            desc: 'Who came in before dawn',
            requires: ['witness-statement'],
            text: [
              'The gate log is a clipboard, not a computer. Night entries are written by the security guard. At 04:12: <b>R. CHANDRASEKHAR — ARCHITECT — LEVEL 9.</b> At 04:38: <b>M. SOLANO — ENGINEER — LEVEL 9.</b> At 04:55: <b>G. MARSH — SITE MANAGER — LEVEL 4.</b>',
              'At 05:18 there is a second entry for Mira Solano, this time to the ground floor. The guard has written a question mark beside it.',
              'At 05:05: <b>C. RENN — VISITOR — GROUND.</b> Caleb Renn is the developer’s son. He is not supposed to be on site without an escort.'
            ],
            gives: ['badge-log'],
            hint: 'The gate log is handwritten. Read the times, not the titles.'
          }
        ]
      },
      {
        id: 'office', name: 'Site office', short: 'Site office', time: '07:40',
        art: { kind: 'office' },
        requires: ['core-hole'],
        intro: 'A portacabin with a kettle, a printer, and a wall of drawings. Ravi’s desk is covered in test certificates and a half-eaten sandwich. The safe under the desk is bolted to the floor.',
        actions: [
          { id: 'desk', label: 'Search Ravi’s desk', icon: 'ledger',
            desc: 'Pour docket, report draft, a red pen',
            requires: ['core-hole'],
            text: [
              'The desk is a timeline of a man losing patience. Test certificates are stacked in date order, each one marked with a red tick. The last three have red question marks instead.',
              'The pour docket for level nine is pinned to the wall: <b>“POUR 09 — 12/09 — 180 m³ — SUPPLIER: MERIDIAN READYMIX.”</b> Someone has circled the date and written <b>“CHECK CUBES”</b>.',
              'A draft report sits in the printer tray. Title: <b>“STRUCTURAL NON-CONFORMANCE — MERIDIAN TOWER LEVELS 7–9.”</b> The conclusion is one sentence: <b>“The concrete does not meet the specified grade and must be replaced.”</b>'
            ],
            gives: ['pour-docket', 'report-draft'],
            hint: 'The pour docket gives the date. The draft report gives the stakes.'
          },
          { id: 'safe', label: 'Open the document safe', icon: 'lockbox', puzzle: 'safe',
            desc: 'Four-digit keypad · the pour date',
            requires: ['pour-docket'],
            hint: 'The pour docket is dated 12/09. The keypad wants four digits: 0912.'
          },
          { id: 'pc', label: 'Open Ravi’s computer', icon: 'terminal', puzzle: 'ravi-pc',
            desc: 'The report, the emails, and the send button',
            requires: ['report-draft'],
            hint: 'Ravi named his machine after the tower he was trying to save. Try MERIDIAN.'
          },
          { id: 'timeline', label: 'Rebuild the morning', icon: 'clock', puzzle: 'morning',
            desc: 'Seven moments before the fall',
            requires: ['badge-log', 'crane-log'],
            hint: 'Ravi at 04:12, Mira at 04:38, core at 04:40, report at 04:44, crane at 05:06, fall at 05:12, body at 05:30.' }
        ]
      },
      {
        id: 'lab', name: 'Meridian materials lab', short: 'Materials lab', time: '09:00',
        art: { kind: 'lab' },
        requires: ['test-certificates'],
        intro: 'A low building behind the site with a compression rig, a wall of numbered cube moulds, and the smell of wet cement. Mira Solano is at the bench in a white coat, weighing a cube that has already been crushed.',
        actions: [
          { id: 'mira', label: 'Interview Mira Solano', icon: 'user', suspect: 'mira',
            desc: 'Structural engineer · certificate signatory',
            hint: 'Mira signed the certificates. Ask her about the cubes.'
          },
          { id: 'cubes', label: 'Calculate the cube results', icon: 'chart', puzzle: 'cubes',
            desc: 'Three cubes, one specification',
            requires: ['test-certificates'],
            hint: 'Add the three cube results and divide by three. The specification is 40 N/mm².'
          },
          { id: 'compare', label: 'Compare the certificates', icon: 'search',
            desc: 'The originals against the signed copies',
            requires: ['cube-results'],
            text: [
              'The lab’s original test sheets are kept in a ring binder. The signed certificates are in a separate folder. They do not match.',
              'The original sheet for level nine records cube results of 31.2, 33.4 and 29.8 N/mm². The signed certificate records 41.2, 42.0 and 40.6. The certificate is dated two days after the test. The handwriting is Mira Solano’s.',
              'In the bottom of the binder: a payment advice from Meridian Developments for <b>“consultancy — structural verification”</b>, £18,000, paid to M. Solano. The date is the same day the certificate was signed.'
            ],
            gives: ['falsified-certs', 'payment-record'],
            hint: 'The originals and the signed copies disagree. Follow the numbers.'
          },
          { id: 'technician', label: 'Talk to the lab technician', icon: 'user',
            desc: 'The man who crushed the cubes',
            requires: ['falsified-certs'],
            text: [
              '“I ran those cubes myself,” the technician says. “Thirty-one, thirty-three, twenty-nine. They were nowhere near spec.” He glances at the door. “Mira told me there had been a mix-up at the plant and the samples were contaminated. She said she would handle the paperwork.”',
              '“Then Mr Chandrasekhar came in with his own core sample. He asked me to test it independently. I did. It came out at thirty point one.” He looks at his hands. “Mira was standing right there when I told him. She went very quiet.”',
              'The independent test sheet is still in the technician’s locker. It is signed by him and dated Thursday.'
            ],
            gives: ['lab-statement', 'independent-test'],
            hint: 'The technician tested Ravi’s core sample. Ask what happened next.'
          }
        ]
      },
      {
        id: 'home', name: 'Ravi’s house', short: 'Ravi’s house', time: '10:30',
        art: { kind: 'house' },
        requires: ['sent-report'],
        intro: 'A narrow terrace house with a bicycle in the hall and drawings pinned to the kitchen wall. Ravi’s wife, Nila, sits at the table with a phone in her hand and her daughter’s school bag by the door.',
        actions: [
          { id: 'nila', label: 'Interview Nila Chandrasekhar', icon: 'user',
            desc: 'Ravi’s wife · the last person he called',
            requires: ['sent-report'],
            text: [
              '“He called me at four thirty,” Nila says. “He said he had the sample. He said he was going to send the report before the site opened, so nobody could stop it.” She stops. “He said, ‘If I am wrong, I will look a fool. If I am right, they will try to make me look a fool.’”',
              '“He sent it at twenty-four minutes to five. I got the copy at five thirty-one. He was already dead.” She slides the phone across the table. “The email says it was delivered to the regulator at five thirty.”',
              'On the kitchen table: Ravi’s notebook, open to a page headed <b>“WHO SIGNED WHAT”</b>.'
            ],
            gives: ['nila-statement', 'notebook'],
            hint: 'Nila has the sent email and Ravi’s notebook. Read both.'
          },
          { id: 'memo', label: 'Play Ravi’s last voice memo', icon: 'audio',
            desc: '05:11 — one minute before the fall',
            requires: ['phone'],
            text: [
              'The memo begins with wind and the sound of a drill. Ravi’s voice is close to the phone, calm, almost cheerful.',
              '“Nila, it is me. I am on nine. The core is out and it is bad — thirty point one. I have sent the report. I am going to take a photograph of the hole and then I am coming home. Tell Leela I will do the school run.”',
              'Then, clear as a bell, a woman’s voice behind him: <b>“You should have signed it, Ravi.”</b> The memo ends with a scuff, a metallic click, and wind.'
            ],
            gives: ['ravi-memo'],
            hint: 'Ravi’s phone is still recording. Play the last memo to the end.'
          }
        ]
      },
      {
        id: 'developer', name: 'Meridian Developments', short: 'Developer', time: '12:00',
        art: { kind: 'office', mood: 'mansion' },
        requires: ['falsified-certs'],
        intro: 'A glass office on the twenty-second floor of a building that is finished. The model of Meridian Tower sits on a plinth in reception, nine floors of it already sold off-plan. Caleb Renn is in the boardroom with a plate of untouched pastries.',
        actions: [
          { id: 'caleb', label: 'Interview Caleb Renn', icon: 'user', suspect: 'caleb',
            desc: 'Project director · the developer’s son',
            hint: 'Caleb owns the lab and the tower. Ask him what he knew.'
          },
          { id: 'files', label: 'Search the project files', icon: 'ledger',
            desc: 'Payments, variations, and a pressure email',
            requires: ['payment-record'],
            text: [
              'The project file for Meridian Tower is three inches thick. Under “Materials”, a variation order changes the concrete specification from grade 40 to grade 30 without a structural reassessment. It is signed by Caleb Renn and countersigned by Mira Solano.',
              'A folder of emails shows the pressure: <b>“Mira — the numbers need to work. We cannot afford a re-pour. Sign the certs and I will handle the regulator.”</b> The reply is two words: <b>“I understand.”</b>',
              'A payment schedule shows £18,000 to M. Solano, described as “structural verification”, and a second payment of £120,000 to a “consultancy” owned by Caleb’s brother-in-law.'
            ],
            gives: ['caleb-files', 'variation-order', 'payment-to-lab'],
            hint: 'The variation order is the paper trail. Find the email that goes with it.'
          },
          { id: 'alibi', label: 'Check Caleb’s movements', icon: 'cctv',
            desc: 'Gate log, car park, and a 05:05 arrival',
            requires: ['badge-log'],
            text: [
              'Caleb’s car entered the site at 05:03 and left at 05:26. The gate guard remembers him because he arrived without an escort and asked for Gideon Marsh.',
              'The car park camera shows him walking toward the tower at 05:05 and returning at 05:24, carrying a document tube. He does not look up at the tower.',
              'His driver’s statement says Caleb told him to wait because “there was a problem with the architect”.'
            ],
            gives: ['caleb-alibi'],
            hint: 'The gate log puts Caleb on site at five. Check the car park camera.'
          }
        ]
      }
    ],
    puzzles: {
      safe: {
        type: 'keypad', title: 'Document Safe', subtitle: 'Four-digit keypad', icon: 'lockbox',
        deviceLabel: 'SITE OFFICE — DOCUMENTS', length: 4, code: '0912',
        prompt: 'A document safe under Ravi’s desk. The keypad wants four digits. <span style="color:var(--dim)">Ravi changed it to the date of the pour he was worried about.</span>',
        hintText: 'The pour docket is dated 12/09. The code is 0912.',
        successTitle: 'Safe open.',
        success: 'Inside: the signed test certificates for levels seven to nine, the supply contract with Meridian Readymix, and a second set of certificates that do not match the first.',
        gives: ['test-certificates', 'contract'], flags: ['safeOpen'],
        short: 'The test certificates are recovered.',
        log: 'The site safe holds two sets of concrete test certificates — the originals and the signed copies — plus the supply contract.'
      },
      'ravi-pc': {
        type: 'terminal', title: 'Ravi’s Computer', subtitle: 'Architect account', icon: 'terminal',
        user: 'ravi', host: 'meridian-tower', password: 'meridian',
        intro: 'Connection established. The desktop is a photograph of the tower at sunset. Type "help" for commands.',
        banner: 'MERIDIAN TOWER — ARCHITECT ACCESS. 3 FILES. 1 SENT ITEM.',
        files: [
          { name: 'nonconformance.txt', body: '<span class="d">STRUCTURAL NON-CONFORMANCE — LEVELS 7–9</span><br>Cube results: 31.2 / 33.4 / 29.8 N/mm²<br>Specification: 40 N/mm²<br>Core sample L9: 30.1 N/mm²<br><span class="r">Conclusion: concrete does not meet grade. Replace or reinforce before occupation.</span>' },
          { name: 'contacts.txt', body: 'M. SOLANO — engineer — certs<br>G. MARSH — site manager — access<br>C. RENN — developer — pressure<br><span class=\"y\">Regulator: structural.standards@hse.gov</span>' },
          { name: 'regulator.eml', locked: true, secret: true, hint: 'Sent mail archive. Architect password required.', body: '<span class="y">TO: structural.standards@hse.gov<br>SUBJECT: Meridian Tower — non-conformance levels 7–9</span><br><br>“I am the architect of record. I have attached independent cube results and a core sample from level nine. The concrete is approximately 25% below specification.<br><br>I have also attached the signed certificates, which do not match the lab originals. The certificates are signed by M. Solano.<br><br><span class="r">— Ravi Chandrasekhar</span>”<br><br><span class="d">Scheduled send: 04:44. Delivered: 05:30.</span>' }
        ],
        hintText: 'Ravi named the machine after the tower. Try MERIDIAN.',
        success: 'The sent folder opens. Ravi scheduled the report to the regulator at 04:44, to be delivered at 05:30. The attachment includes the independent test and the mismatched certificates.',
        successTitle: 'The report was already sent.',
        gives: ['email-log', 'sent-report'], flags: ['pcOpen'],
        short: 'Ravi’s report went to the regulator at 05:30.',
        log: 'Ravi’s computer confirms he scheduled the non-conformance report at 04:44; it was delivered to the regulator at 05:30, after his death.'
      },
      cubes: {
        type: 'math', title: 'Concrete Cube Results', subtitle: 'Do the numbers meet specification?', icon: 'chart',
        info: 'Three cubes from the level-nine pour were crushed at seven days. Results: 31.2, 33.4 and 29.8 N/mm². The specified grade is 40 N/mm². Ravi’s independent core sample tested at 30.1 N/mm².',
        placeholder: 'average strength', unit: 'N/mm²', answer: 31.5, tolerance: 0.3,
        working: '(31.2 + 33.4 + 29.8) ÷ 3 = 94.4 ÷ 3 = 31.47 N/mm², rounded to 31.5.',
        wrong: 'Add the three results and divide by three. The answer should be just under 32.',
        hintText: '31.2 + 33.4 + 29.8 = 94.4. Divide by three.',
        success: 'The average is 31.5 N/mm² against a specified 40. The concrete is more than twenty per cent weak. Ravi was right, and the signed certificates were fiction.',
        successTitle: 'The concrete is failing.',
        gives: ['cube-results'], flags: ['cubesDone'],
        short: 'The level-nine concrete averages 31.5 N/mm².',
        log: 'The three level-nine cubes average 31.5 N/mm² against a 40 N/mm² specification. The concrete is roughly 21% below grade.'
      },
      site: {
        type: 'hotspot', title: 'The Ninth Floor', subtitle: 'Five details out of place', icon: 'search',
        scene: { kind: 'factory', mood: 'cold' },
        targets: [
          { label: 'Cut lanyard', x: 62, y: 48, r: 6, text: 'The lanyard is cut clean through with a blade. The strap is under tension and the cut is smooth — no fraying.' },
          { label: 'Blade in the drain', x: 34, y: 70, r: 5.5, text: 'A retractable utility knife lies in the floor drain, blade extended, with grey concrete dust in the handle.' },
          { label: 'Core hole', x: 22, y: 58, r: 6, text: 'A neat 100 mm core hole through the slab. The sample tube beside it is empty.' },
          { label: 'Boot print in slurry', x: 48, y: 78, r: 6, text: 'A partial boot print in the drill slurry. Size eleven, diamond tread — site manager’s boots.' },
          { label: 'Harness store tag', x: 78, y: 72, r: 5, text: 'A plastic key tag stamped HARNESS STORE. The store key is missing from its hook.' }
        ],
        note: 'Click directly on the details. The floor has been walked over, but not cleaned.',
        hintText: 'Check the edge, the drain, the slab, the dust, and the tag near the tool bag.',
        success: 'The floor gives up its secrets: a cut lanyard, a blade in the drain, an empty core hole, a boot print in the slurry, and a missing harness-store key.',
        successTitle: 'The scene was staged in a hurry.',
        gives: ['cut-lanyard', 'blade', 'boot-print', 'harness-store'], flags: ['siteSearched'],
        short: 'The lanyard was cut and the sample taken.',
        log: 'The ninth-floor search finds a cleanly cut lanyard, a utility knife in the drain, a boot print in the slurry, and a missing harness-store key.'
      },
      morning: {
        type: 'sequence', title: 'The Morning, In Order', subtitle: 'Seven moments before the fall', icon: 'clock', variant: 'strips',
        prompt: 'The gate log, the crane record and Ravi’s phone disagree about the morning. Put it in order.',
        items: [
          { t: 'Ravi badges onto level nine', sub: '04:12 — gate log', order: 1 },
          { t: 'Mira Solano badges onto level nine', sub: '04:38 — gate log', order: 2 },
          { t: 'Ravi cuts the core sample', sub: '04:40 — drill and tube', order: 3 },
          { t: 'Ravi schedules the regulator report', sub: '04:44 — sent mail', order: 4 },
          { t: 'The crane hook moves without a lift command', sub: '05:06 — load cell', order: 5 },
          { t: 'Ravi falls from the north edge', sub: '05:12 — estimated', order: 6 },
          { t: 'The concrete crew finds the body', sub: '05:30 — ground floor', order: 7 }
        ],
        wrong: 'Mira badged in before Ravi scheduled the report. Check the gate times first, then the crane.',
        hintText: 'Ravi at 04:12, Mira at 04:38, core at 04:40, report at 04:44, crane at 05:06, fall at 05:12, body found at 05:30.',
        success: 'The morning lines up. Mira arrived twenty-six minutes after Ravi, while he was cutting the core. By the time he scheduled the report, she was already on the floor. The crane moved eight minutes before he fell.',
        successTitle: 'Mira was on nine before the report was sent.',
        gives: ['timeline'], flags: ['timelineBuilt'],
        short: 'Mira was on level nine before Ravi died.',
        log: 'Timeline: Ravi 04:12; Mira 04:38; core 04:40; report 04:44; crane 05:06; fall 05:12; body found 05:30.'
      }
    },
    suspects: [
      {
        id: 'mira', name: 'Mira Solano', role: 'Structural engineer · certificate signatory', location: 'lab', locationName: 'Materials lab', tag: 'Prime suspect',
        portrait: { seed: 'mira-solano', hair: 'bun', hairColor: '#1b1220', skin: 2, expression: 'wary', collar: 'shirt', glasses: 'square', eyes: '#3a2159' },
        intro: 'Thirty-five, precise, with a white coat and a wedding ring she keeps turning. She signed every certificate for the tower. She has been expecting this conversation since half past five.',
        questions: [
          { q: 'Where were you between four and half past five?', requires: ['badge-log'],
            a: '“At the lab. I came in early to finish the level-nine file.” She does not blink. “I badged onto level nine at 04:38, yes. I wanted to see the pour for myself. I was back on the ground by five.”',
            gives: ['mira-alibi'], flags: ['miraHostile'] },
          { q: 'Your signed certificates do not match the lab originals.', requires: ['falsified-certs'], present: true,
            a: '“There was a mix-up with the samples.” Her voice is flat. “The plant sent contaminated cubes. I corrected the record.” A pause. “You have the originals, I assume. The technician has never liked me.”',
            gives: ['mira-cert-story'] },
          { q: 'The harness lanyard was cut with a blade.', requires: ['blade'], present: true,
            a: '“Then someone cut it.” She folds her hands. “Ravi was always taking risks. He would lean over the edge to photograph a defect. I told him to clip in properly. He said the harness slowed him down.”',
            gives: ['mira-harness'] },
          { q: 'Ravi’s report names you. It was sent to the regulator at five thirty.', requires: ['sent-report'], present: true,
            a: 'For the first time she looks away. “I did not know it had gone.” A long silence. “I thought —” She stops. “I thought I had more time.”',
            gives: ['mira-motive'], flags: ['miraBroke'] },
          { q: 'Ravi’s voice memo recorded a woman saying, “You should have signed it.”', requires: ['ravi-memo'], present: true,
            a: 'She does not deny it. She sits very still. “He asked me to certify the slab. I told him it was only twenty per cent under. I told him a re-pour would bankrupt the project. He said he did not care about the project.” Her voice cracks. “He said he cared about the people who would live in it.”',
            gives: ['mira-confession'], flags: ['miraBroke'] }
        ],
        after: 'She asks whether the tower will be demolished. You tell her the regulator will decide. She nods, and looks almost relieved.'
      },
      {
        id: 'gideon', name: 'Gideon Marsh', role: 'Site manager · twelve years on site', location: 'ground', locationName: 'Ground floor', tag: 'Suspect',
        portrait: { seed: 'gideon-marsh', hair: 'buzz', hairColor: '#2b1a12', skin: 3, expression: 'angry', collar: 'coat', beard: 'stubble' },
        intro: 'Forty-eight, broad, with a hi-vis jacket that has seen better decades. He was the first person at the body. He has already told three different versions of how he got there.',
        questions: [
          { q: 'Why was the north rail unbolted?', requires: ['harness'],
            a: '“It was not unbolted when I left it.” He folds his arms. “We open that section when we are bringing materials up. It was closed at four. I checked it myself.”',
            gives: ['gideon-rail'] },
          { q: 'You have a record for assault.', requires: ['witness-statement'], present: true,
            a: '“Eight years ago. A fight outside a pub. The man swung first.” His jaw works. “I have been on this site for three years without a lost-time incident. I do not kill architects because they annoy me.”',
            gives: ['gideon-record'], flags: ['gideonHostile'] },
          { q: 'The boot print in the slurry is your size.', requires: ['boot-print'], present: true,
            a: '“I walk on that floor every day. Of course my boot is in the slurry.” He points at the rail. “You want to know who was up there at five? Ask the engineer. She badged in at 04:38 and she was still on the floor when I got to the body.”',
            gives: ['gideon-mira'] },
          { q: 'Who has the harness-store key?', requires: ['harness-store'],
            a: '“Me, the safety officer, and the engineer. It is a standard key.” He looks at the tag. “The store was open this morning. I found the door unlocked when I came in.”',
            gives: ['gideon-key'] }
        ],
        after: 'He offers to walk you through the site one more time. You tell him you have seen enough. He goes back to shouting at a concrete truck.'
      },
      {
        id: 'caleb', name: 'Caleb Renn', role: 'Project director · Meridian Developments', location: 'developer', locationName: 'Meridian Developments', tag: 'Suspect',
        portrait: { seed: 'caleb-renn', hair: 'short', hairColor: '#8a5a33', skin: 0, expression: 'smug', collar: 'suit', beard: 'goatee' },
        intro: 'Twenty-nine, tanned, with a suit that costs more than the site office. His father owns the company. Caleb owns the problem, and he has brought pastries to make it smaller.',
        questions: [
          { q: 'The level-nine concrete is twenty per cent under specification.', requires: ['falsified-certs'], present: true,
            a: '“A batch issue. It happens.” He selects a pastry and puts it down again. “We have an engineer’s certificate saying the slab is sound. If the tests were wrong, that is a lab matter, not a developer matter.”',
            gives: ['caleb-story'] },
          { q: 'You paid Mira Solano £18,000 to verify the structure.', requires: ['payment-record'], present: true,
            a: '“Consultancy. She is very good.” He meets your eyes. “Everyone on this site is paid by someone. That is how construction works. It is not a conspiracy, detective. It is a payroll.”',
            gives: ['caleb-payment'], flags: ['calebHostile'] },
          { q: 'You were on site at five this morning.', requires: ['caleb-alibi'], present: true,
            a: '“I came to collect a document from Gideon.” A pause. “I heard about the accident on the radio. I left before the police arrived. I did not want to be in the way.”',
            gives: ['caleb-excuse'] },
          { q: 'Why did you tell your driver there was “a problem with the architect”?', requires: ['caleb-alibi'], present: true,
            a: 'He straightens his tie. “Because there was. Ravi was threatening to shut the site over a batch of bad concrete. That is a problem. It is not a murder.” He leans forward. “You are looking at the wrong person. I wanted the report buried. Mira wanted it dead.”',
            gives: ['caleb-deflect'] }
        ],
        after: 'He offers you a pastry on the way out. You decline. He eats it in the lift, alone.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Ravi Chandrasekhar — post-mortem note', caption: 'Fall from height · alive on impact', icon: 'blood', type: 'Forensic report',
        desc: 'Multiple injuries consistent with a fall from height. No injury before the fall. Death was rapid but not instant.',
        tells: 'He went over the edge alive. The question is why his harness did not save him.'
      },
      'harness': {
        name: 'Cut safety harness', caption: 'Lanyard cut clean through', icon: 'wire', type: 'Physical evidence',
        desc: 'Ravi’s harness, still buckled. The lanyard is severed about a metre from the anchor with a smooth, clean cut.',
        tells: 'The fall was arranged. A lanyard under load does not cut itself.'
      },
      'phone': {
        name: 'Ravi’s phone', caption: 'Voice memo still recording', icon: 'phone', type: 'Device',
        desc: 'A cracked phone found under the rebar, voice memo app still running. The timer reads 04:51:08.',
        tells: 'The phone was recording before the fall. It may have captured the killer.'
      },
      'anchor-bolt': {
        name: 'Unbolted rail section', caption: 'Bolts laid out in a neat row', icon: 'tool', type: 'Scene mark',
        desc: 'The north rail section has been unbolted and leaned against the mesh. The bolts are arranged in a neat row on the slab.',
        tells: 'The rail was opened deliberately, by someone calm enough to keep the bolts tidy.'
      },
      'boot-print': {
        name: 'Boot print in slurry', caption: 'Size eleven · diamond tread', icon: 'footprint', type: 'Trace evidence',
        desc: 'A partial boot print in the drill slurry, size eleven with a diamond tread.',
        tells: 'Someone stood in the wet slurry beside the core drill. The print matches the site manager’s boots.'
      },
      'core-hole': {
        name: 'Core sample hole', caption: '100 mm · sample tube empty', icon: 'tool', type: 'Scene mark',
        desc: 'A neat core hole through the ninth-floor slab, with an empty steel sample tube labelled “L9 CORE — 04:40”.',
        tells: 'Ravi took the sample. Someone took it from him.'
      },
      'slurry-print': {
        name: 'Slurry footprint', caption: 'Wet cement · fresh', icon: 'footprint', type: 'Trace evidence',
        desc: 'A partial boot print in the drill slurry beside the core hole, still wet when the first officer arrived.',
        tells: 'Someone approached the drill after Ravi started cutting. The print was made before the slurry dried.'
      },
      'cut-lanyard': {
        name: 'Lanyard cut', caption: 'Smooth blade · under tension', icon: 'wire', type: 'Forensic detail',
        desc: 'The lanyard fibres are cut cleanly, not torn. The strap was under tension when it was severed.',
        tells: 'The killer cut the lanyard while Ravi was already leaning against it.'
      },
      'blade': {
        name: 'Utility knife in the drain', caption: 'Blade extended · concrete dust', icon: 'tool', type: 'Weapon',
        desc: 'A retractable utility knife found in the floor drain, blade extended, with grey concrete dust in the handle.',
        tells: 'The murder weapon was left at the scene. It came from the site, not from outside.'
      },
      'harness-store': {
        name: 'Harness store tag', caption: 'Key missing from its hook', icon: 'id', type: 'Physical evidence',
        desc: 'A plastic tag stamped HARNESS STORE, found by Ravi’s tool bag. The store key is missing from its hook.',
        tells: 'The killer took the harness-store key to access Ravi’s equipment.'
      },
      'crane-log': {
        name: 'Crane log and load cell', caption: 'Manual movement at 05:06', icon: 'note', type: 'Record',
        desc: 'The crane log shows no lift after 04:35, but the load cell records a weight at 05:06. The hook moved without a command.',
        tells: 'Someone used the crane manually from the ground pendant while the operator was on break.'
      },
      'witness-statement': {
        name: 'Crane operator’s statement', caption: '“A light on nine — and the hook moved.”', icon: 'note', type: 'Witness statement',
        desc: 'The operator saw a work light on level nine at five past five and the crane hook moving without a lift command. Gideon Marsh was already standing over the body when he reached the deck.',
        tells: 'Someone was on level nine at the time of the fall, and Gideon was first on scene.'
      },
      'badge-log': {
        name: 'Gate and badge log', caption: 'Ravi 04:12 · Mira 04:38 · Caleb 05:05', icon: 'id', type: 'Access record',
        desc: 'Handwritten gate entries: Ravi at 04:12, Mira at 04:38, Gideon at 04:55, Caleb at 05:05, Mira again at 05:18.',
        tells: 'Mira was on site twenty-six minutes before the fall. Her second entry at 05:18 does not match her statement.'
      },
      'pour-docket': {
        name: 'Level-nine pour docket', caption: '12/09 · Meridian Readymix', icon: 'note', type: 'Record',
        desc: 'The pour docket for level nine, dated 12/09, with “CHECK CUBES” written in Ravi’s hand.',
        tells: 'Ravi had identified the date of the suspect pour. The safe code is built from it.'
      },
      'report-draft': {
        name: 'Draft non-conformance report', caption: '“The concrete must be replaced.”', icon: 'letter', type: 'Document',
        desc: 'Ravi’s draft report on levels seven to nine, concluding that the concrete does not meet the specified grade.',
        tells: 'Ravi had already decided the tower was unsafe. He was going to shut the site down.'
      },
      'test-certificates': {
        name: 'Two sets of test certificates', caption: 'Originals vs signed copies', icon: 'letter', type: 'Official record',
        desc: 'The lab originals and the signed certificates for levels seven to nine. The numbers do not agree.',
        tells: 'The signed certificates were altered. Someone had a reason to make the concrete look stronger.'
      },
      'contract': {
        name: 'Supply contract', caption: 'Meridian Readymix · grade 30', icon: 'ledger', type: 'Contract',
        desc: 'The concrete supply contract for level nine, specifying grade 30 concrete at a price below the grade 40 rate.',
        tells: 'The weaker concrete was ordered deliberately, not delivered by mistake.'
      },
      'email-log': {
        name: 'Scheduled report email', caption: 'Scheduled 04:44 · delivered 05:30', icon: 'laptop', type: 'Digital evidence',
        desc: 'Ravi’s report to the regulator, scheduled for delivery at 05:30 with the independent test and certificate comparison attached.',
        tells: 'The report was already out of Ravi’s hands before he died. Killing him could not stop it.'
      },
      'sent-report': {
        name: 'Regulator report', caption: 'Non-conformance · levels 7–9', icon: 'letter', type: 'Digital evidence',
        desc: 'The non-conformance report naming Mira Solano as the certificate signatory, delivered to the regulator at 05:30.',
        tells: 'Ravi’s death was not enough to bury the evidence. The report arrived anyway.'
      },
      'cube-results': {
        name: 'Cube test calculation', caption: 'Average 31.5 N/mm² · spec 40', icon: 'chart', type: 'Forensic analysis',
        desc: 'The three level-nine cubes average 31.5 N/mm² against a specified 40 N/mm². The concrete is roughly 21% weak.',
        tells: 'The signed certificates claiming 40+ are false. The tower is unsafe.'
      },
      'falsified-certs': {
        name: 'Falsified certificates', caption: 'Signed by M. Solano · two days later', icon: 'ledger', type: 'Document',
        desc: 'The signed certificates record 41.2, 42.0 and 40.6 N/mm² — numbers that do not match the lab originals. They are signed by Mira Solano.',
        tells: 'Mira had the opportunity, the expertise and the pen. She falsified the record.'
      },
      'payment-record': {
        name: 'Consultancy payment', caption: '£18,000 · M. Solano', icon: 'money', type: 'Financial record',
        desc: 'A payment advice from Meridian Developments to Mira Solano for “structural verification”, dated the same day she signed the false certificates.',
        tells: 'Mira was paid to make the numbers work. The motive is financial and professional.'
      },
      'independent-test': {
        name: 'Independent core test', caption: '30.1 N/mm² · Thursday', icon: 'note', type: 'Lab record',
        desc: 'The technician’s independent test of Ravi’s core sample, recording 30.1 N/mm² and signed on Thursday.',
        tells: 'Ravi had proof the slab was weak. Mira knew he had it.'
      },
      'lab-statement': {
        name: 'Lab technician’s statement', caption: '“She went very quiet.”', icon: 'note', type: 'Witness statement',
        desc: 'The technician confirms the original cube results and says Mira was present when he told Ravi about the independent core test.',
        tells: 'Mira knew Ravi had independent proof. She had one morning to stop him.'
      },
      'variation-order': {
        name: 'Concrete variation order', caption: 'Grade 40 → grade 30', icon: 'ledger', type: 'Contract',
        desc: 'A variation order downgrading the concrete specification without structural reassessment, signed by Caleb Renn and Mira Solano.',
        tells: 'The developer and the engineer changed the specification together. Both had something to lose.'
      },
      'caleb-files': {
        name: 'Project pressure emails', caption: '“Sign the certs.”', icon: 'letter', type: 'Digital evidence',
        desc: 'Emails from Caleb Renn pressuring Mira to sign the certificates: “We cannot afford a re-pour. Sign the certs and I will handle the regulator.”',
        tells: 'Caleb created the pressure. Mira made the false record. The chain leads back to both of them.'
      },
      'ravi-memo': {
        name: 'Ravi’s last voice memo', caption: '“You should have signed it, Ravi.”', icon: 'audio', type: 'Audio evidence',
        desc: 'A forty-second memo recorded at 05:11, ending with a woman’s voice behind Ravi: “You should have signed it, Ravi.”',
        tells: 'A woman was on the ninth floor with Ravi before he fell. The voice is the last thing on the tape.'
      },
      'nila-statement': {
        name: 'Nila’s statement', caption: '“He sent it at twenty-four minutes to five.”', icon: 'audio', type: 'Witness statement',
        desc: 'Ravi’s wife confirms he called at 04:30, said he had the sample, and sent the report before the site opened.',
        tells: 'Ravi knew he was in danger. He made sure the report left his hands first.'
      },
      'notebook': {
        name: 'Ravi’s notebook', caption: '“WHO SIGNED WHAT”', icon: 'note', type: 'Personal record',
        desc: 'Ravi’s site notebook, open to a page tracking who signed each certificate and when.',
        tells: 'Ravi had already mapped the paper trail. He knew exactly who to confront.'
      },
      'payment-to-lab': {
        name: 'Second payment', caption: '£120,000 · “consultancy”', icon: 'money', type: 'Financial record',
        desc: 'A second payment from Meridian Developments to a consultancy owned by Caleb’s brother-in-law.',
        tells: 'Caleb was moving money through family companies. The fraud is wider than one slab.'
      },
      'caleb-alibi': {
        name: 'Caleb’s movements', caption: 'On site 05:03–05:26', icon: 'cctv', type: 'Surveillance',
        desc: 'Caleb’s car entered the site at 05:03 and left at 05:26. He was seen walking toward the tower and returning with a document tube.',
        tells: 'Caleb was on site at the time of the fall. He had a reason to want the report gone.'
      },
      'timeline': {
        name: 'Morning timeline', caption: '04:12 → 05:30', icon: 'clock', type: 'Analysis',
        desc: 'Ravi arrived, cut the core, scheduled the report. Mira arrived, the crane moved, Ravi fell, the crew found him.',
        tells: 'Mira had both the opportunity and the knowledge to cut a lanyard.'
      },
      'mira-alibi': {
        name: 'Mira’s alibi', caption: '“Back on the ground by five.”', icon: 'audio', type: 'Statement',
        desc: 'Mira claims she visited level nine at 04:38 and was back on the ground by five. Her second gate entry at 05:18 contradicts her.',
        tells: 'Her timeline places her on the floor at the moment the crane moved.'
      },
      'mira-cert-story': {
        name: 'Mira on the certificates', caption: '“A mix-up with the samples.”', icon: 'note', type: 'Statement',
        desc: 'Mira claims the plant sent contaminated cubes and she corrected the record in good faith.',
        tells: 'The independent core test and the variation order show the “mix-up” was deliberate.'
      },
      'mira-harness': {
        name: 'Mira on the harness', caption: '“He said the harness slowed him down.”', icon: 'audio', type: 'Statement',
        desc: 'Mira suggests Ravi was reckless with his harness and often worked without clipping in properly.',
        tells: 'The lanyard was cut under tension. Recklessness does not produce a smooth blade cut.'
      },
      'mira-motive': {
        name: 'Mira on the report', caption: '“I thought I had more time.”', icon: 'note', type: 'Statement',
        desc: 'Told the report had been delivered, Mira says she did not know it had gone and that she thought she had more time.',
        tells: 'She was trying to stop the report. The report was the reason for the murder.'
      },
      'mira-confession': {
        name: 'Mira’s admission', caption: '“He cared about the people who would live in it.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the voice memo, Mira admits arguing with Ravi about certifying the slab and says he refused to sign.',
        tells: 'She was on the floor with him, arguing about the certificate, minutes before he fell.'
      },
      'gideon-rail': {
        name: 'Gideon on the rail', caption: '“It was closed at four.”', icon: 'note', type: 'Statement',
        desc: 'Gideon says the north rail section was closed when he checked at four and was not responsible for opening it.',
        tells: 'The rail was opened after 04:00 by someone who knew how to unbolt it quietly.'
      },
      'gideon-record': {
        name: 'Gideon’s record', caption: 'Assault · 2016 · no site incidents', icon: 'badge', type: 'Record',
        desc: 'A 2016 assault conviction and a clean three-year site safety record.',
        tells: 'Gideon is a hard man with a temper, but his record does not make him a murderer.'
      },
      'gideon-mira': {
        name: 'Gideon on Mira', caption: '“She was still on the floor.”', icon: 'audio', type: 'Statement',
        desc: 'Gideon says Mira was on level nine when he reached the body and that she badged in before dawn.',
        tells: 'The site manager puts Mira at the scene. His own boot print has an innocent explanation.'
      },
      'gideon-key': {
        name: 'Gideon on the harness store', caption: '“The door was unlocked.”', icon: 'note', type: 'Statement',
        desc: 'Gideon says the harness store was found unlocked and that three people hold keys.',
        tells: 'The killer had access to the harness store — or took the key from it.'
      },
      'caleb-story': {
        name: 'Caleb’s batch story', caption: '“A batch issue. It happens.”', icon: 'note', type: 'Statement',
        desc: 'Caleb dismisses the weak concrete as a batch issue and points to the engineer’s certificate.',
        tells: 'He is hiding behind Mira’s signature. He knows the certificate is the only thing keeping the tower open.'
      },
      'caleb-payment': {
        name: 'Caleb on the payment', caption: '“It is a payroll.”', icon: 'audio', type: 'Statement',
        desc: 'Caleb describes the £18,000 payment to Mira as ordinary consultancy and denies any improper arrangement.',
        tells: 'The payment was made the same day the false certificates were signed. It is not ordinary.'
      },
      'caleb-excuse': {
        name: 'Caleb’s excuse', caption: '“I did not want to be in the way.”', icon: 'note', type: 'Statement',
        desc: 'Caleb says he came to collect a document and left when he heard about the accident.',
        tells: 'He was on site at 05:05. He left with a document tube after the fall.'
      },
      'caleb-deflect': {
        name: 'Caleb’s deflection', caption: '“Mira wanted it dead.”', icon: 'audio', type: 'Statement',
        desc: 'Caleb admits wanting the report buried but insists Mira was the one with the technical motive.',
        tells: 'He is trying to trade the engineer for himself. The physical evidence points at her.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Ravi Chandrasekhar?', 
          options: [
            { t: 'Gideon Marsh — the site manager with a violent record', v: 'gideon' },
            { t: 'Caleb Renn — the developer whose project was about to be shut down', v: 'caleb' },
            { t: 'Mira Solano — the engineer who falsified the concrete certificates', v: 'mira' },
            { t: 'No one — the harness failed and Ravi fell by accident', v: 'accident' }
          ], answer: 'mira' },
        { q: 'How did Ravi die?', 
          options: [
            { t: 'Mira cut his lanyard while he was working at the open edge, and he fell', v: 'lanyard' },
            { t: 'He was struck with a tool and pushed through the rail', v: 'struck' },
            { t: 'The crane hook knocked him from the slab', v: 'crane' },
            { t: 'He was overcome by fumes from the core drill', v: 'fumes' }
          ], answer: 'lanyard' },
        { q: 'What was the motive?', 
          options: [
            { t: 'Ravi had proof the concrete was substandard and had sent a report to the regulator', v: 'report' },
            { t: 'Ravi was going to expose Caleb’s affair with Mira', v: 'affair' },
            { t: 'Ravi had stolen Mira’s design for the tower', v: 'design' },
            { t: 'Ravi was going to sell the site to a rival developer', v: 'sale' }
          ], answer: 'report' },
        { q: 'Which evidence breaks the case?', 
          options: [
            { t: 'The voice memo with Mira’s voice, the cut lanyard and the falsified certificates', v: 'memo' },
            { t: 'Gideon’s boot print in the slurry', v: 'boot' },
            { t: 'Caleb’s £18,000 payment to the lab', v: 'payment' },
            { t: 'The crane hook moving at 05:06', v: 'crane' }
          ], answer: 'memo' }
      ],
      verdict: {
        who: 'Mira Solano, 35 — structural engineer and certificate signatory for Meridian Tower',
        whoDesc: 'was arrested at the materials lab and charged with murder. She pleaded guilty to manslaughter and fraud; the murder charge was reduced after a psychiatric assessment.',
        how: 'She met Ravi on level nine, argued with him about signing the slab, cut his lanyard with a utility knife while he was leaning against the open edge, and took the core sample.',
        why: 'Ravi had independent proof that the concrete was 21% below specification and had scheduled a report to the regulator. The report would have ended her career and exposed the fraud she had signed.',
        key: 'The voice memo recorded Mira saying “You should have signed it, Ravi” seconds before the fall, and the cut lanyard matched the utility knife from the site store.'
      },
      reveal: [
        'Meridian Tower was sold off-plan before a single floor was finished. The buyers paid for a grade 40 structure. The concrete that arrived on site was grade 30, ordered deliberately to save four hundred thousand pounds on a project already over budget.',
        'Mira Solano knew. She had signed the variation order. She had watched the cubes fail and had written the false certificates herself, at Caleb Renn’s insistence, for £18,000 and the promise of a directorship. She told herself the difference was small. She told herself the building would stand.',
        'Ravi Chandrasekhar did not tell himself anything. He tested the concrete, took a core sample, and scheduled a report to the regulator at 04:44. He called his wife at 04:30 and said he was coming home for the school run. He was on level nine before dawn because he wanted the evidence in the regulator’s hands before the site opened.',
        'Mira badged in at 04:38. She found him at the core drill. The argument was quiet — the phone recorded only the end of it. She told him a re-pour would bankrupt the project. He said he cared about the people who would live in it. She said, “You should have signed it, Ravi.”',
        'Then she cut the lanyard. He was leaning against the rail, photographing the core hole. The strap parted. He went over the edge without a sound. She took the sample tube, unbolted the rail section to make the fall look like carelessness, and left the knife in the drain.',
        'She was almost clever. She had a reason to be on the floor, a reason to argue with him, and a certificate that made the concrete look sound. She did not account for the phone in the rebar, still recording; for the crane operator who saw the hook move; or for the core sample that was already in the technician’s locker.',
        'The report reached the regulator at 05:30, twelve minutes after Mira left the site. It named her. It attached the independent test. It described the certificates as “inconsistent with the laboratory record”. Ravi had made sure that killing him would not be enough.',
        'Caleb Renn was charged with fraud and perverting the course of justice. Gideon Marsh was cleared of involvement and kept his job, which he said was more than he deserved. The tower was evacuated and demolished six months later. The buyers got their money back.',
        'Mira Solano was sentenced to eighteen years. At the sentencing hearing, the prosecution read Ravi’s last voice memo aloud. The court heard him say he would do the school run. Then it heard the woman’s voice behind him, and the scuff, and the wind.',
        'Nila Chandrasekhar did the school run that morning. She has done it every morning since.'
      ],
      quote: 'He cared about the people who would live in it.',
      twist: 'The final detail was the send time. Ravi scheduled the report at 04:44, fourteen minutes before Mira arrived, precisely because he did not trust the site. He knew that if something happened to him, the report would go anyway. Mira killed a man who had already made himself impossible to silence.'
    }
  });
})();
