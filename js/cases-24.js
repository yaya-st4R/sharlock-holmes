/* ============================================================
   CASE 24 - THE VANISHING EXHIBITION
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c24', num: 24,
    title: 'The Vanishing Exhibition',
    subtitle: 'A painting disappeared from a locked gallery. The guard never left the room.',
    difficulty: 3, est: '30-40 min',
    cover: { kind: 'theatre', mood: 'gala' },
    facts: [
      { k: 'Victim', v: 'Elias Ward, 58 - night security, Meridian Gallery' },
      { k: 'Scene', v: 'North gallery and store room, during the autumn gala' },
      { k: 'Found', v: 'Friday, 22:10 - by a caterer' },
      { k: 'Stolen', v: 'The Quiet Hour, oil on canvas, insured for Â£3.1m' }
    ],
    briefing: [
      "At 21:55 the Meridian Gallery closed its north wing for a private viewing. At 22:10 a caterer found the night guard, Elias Ward, dead in the store room with a bronze maquette beside his head. The painting on the north wall was still hanging.",
      "It was not the painting. The canvas is a forgery, painted over an old frame. The original - The Quiet Hour - left the building in a crate marked LIGHTING, signed out by the curator herself.",
      "The cameras show Elias doing his rounds at 21:30 and nothing after. The service door logged a close at 21:42. The crate left at 21:50. Somebody in this gallery knows exactly how long a locked room takes to empty."
    ],
    opening: 'The north gallery is still lit for the gala. Champagne glasses ring faintly under the music. On the wall, The Quiet Hour looks exactly right - until you stand close enough to see the brushwork.',
    objectives: [
      'Establish how Elias Ward died and what he interrupted.',
      'Prove the hanging painting is a forgery.',
      'Trace the crate and the original canvas.',
      'Identify who signed the crate out and why.'
    ],
    locations: [
      {
        id: 'gallery', name: 'North Gallery', short: 'Gallery', time: '22:30',
        art: { kind: 'theatre', mood: 'gala' },
        intro: 'A long room of dark walls and careful spotlights. The Quiet Hour hangs alone at the far end: a woman at a window, painted in soft grey light. The frame is original. The canvas is not.',
        actions: [
          { id: 'canvas', label: 'Examine the painting', icon: 'photo', puzzle: 'forgery-photo',
            desc: 'Enhance the brushwork and the signature',
            gives: ['c24_forgery'],
            hint: 'Slide the enhancement to the centre. Look for a second signature under the varnish.'
          },
          { id: 'frame', label: 'Inspect the frame and hanging wire', icon: 'search',
            desc: 'Fresh screw holes, old dust',
            text: [
              "The frame is original - gilt, heavy, with a museum accession plate dated 1911. The screws holding the canvas are bright and new. The old holes are empty and still full of black dust.",
              "The hanging wire has been re-strung with modern braided cord. A gallery technician would use picture wire and a sealed crimp. This is hardware-store cord.",
              "Behind the frame, a scrap of paper is wedged against the stretcher: a delivery note for a crate, marked LIGHTING - FRAGILE."
            ],
            gives: ['c24_frame'],
            hint: 'The frame is old. Everything holding the canvas is new.'
          },
          { id: 'donor', label: 'Speak to the donor, Lady Ash', icon: 'user',
            desc: 'She lent the painting - and noticed the light',
            text: [
              "Lady Ash has owned The Quiet Hour for forty years. She says the painting has been in the same light every time she has seen it, and tonight the grey is too blue.",
              "She also says the curator, Margot Sloane, called her twice this week to confirm the loan agreement and the insurance schedule. The second call was at nine o'clock tonight, from the gallery.",
              "Lady Ash did not lend the painting to be sold. She lent it to be seen."
            ],
            gives: ['c24_donor'],
            hint: 'The donor can see a colour difference. She also knows who called about the insurance.'
          }
        ]
      },
      {
        id: 'store', name: 'Store Room', short: 'Store room', time: '22:45',
        art: { kind: 'basement', mood: 'cold' },
        requires: ['c24_frame'],
        intro: 'A low room of packing crates and sculpture plinths. Elias lies between two shelves, one hand still reaching for his torch. A bronze horse lies on its side, its base dark and tacky.',
        actions: [
          { id: 'body', label: 'Examine Elias and the maquette', icon: 'blood', hotspot: { x: 48, y: 58 },
            desc: 'The wound, the bronze, the missing torch',
            text: [
              "Elias has a depressed fracture above the left ear, angled downward. The bronze horse beside him weighs nine kilos and carries a dark tacky stain on its base.",
              "His torch is not in his hand. It is under the bottom shelf, switched on, its lens cracked. The beam points at a crate marked LIGHTING.",
              "There is bronze dust on the shoulder of his uniform, and a smear of the same dust on the crate lid."
            ],
            gives: ['c24_body', 'c24_torch'],
            hint: 'The weapon is not hidden. Look at what the torch was pointing at.'
          },
          { id: 'crate', label: 'Open the lighting crate', icon: 'lockbox',
            desc: 'Empty - but the packing tells a story',
            text: [
              "The crate is empty except for foam cut to the exact dimensions of a framed canvas. The shipping label names a private address in the north and a collection time of 21:50.",
              "The signature on the release form is a looped, confident hand: M. SLOANE. The crate was sealed with gallery tape and loaded through the service door.",
              "A second label underneath is older: HALCYON FINE ART - FORGERY RECOVERY UNIT. This crate has been used before."
            ],
            gives: ['c24_crate'],
            hint: 'The crate is empty. The release form has a signature.'
          },
          { id: 'service', label: 'Check the service door lock', icon: 'keypad', puzzle: 'service-pin',
            desc: 'Four-digit maintenance code',
            gives: ['c24_access'],
            hint: 'The door code is the year the gallery opened, printed on every accession plate.'
          }
        ]
      },
      {
        id: 'studio', name: 'Restoration Studio', short: 'Studio', time: '23:30',
        art: { kind: 'lab', mood: 'cold' },
        requires: ['c24_forgery'],
        intro: 'A white room that smells of varnish and lavender. Anton Vey is cleaning a brush that does not need cleaning. A canvas stretcher leans against the wall, still wet at the corners.',
        actions: [
          { id: 'anton', label: 'Question Anton Vey', icon: 'user', suspect: 'anton',
            desc: 'Restorer - made the copy' },
          { id: 'pigment', label: 'Test the varnish and pigment', icon: 'chemical', puzzle: 'pigment-mix',
            desc: 'Old master or modern copy?',
            gives: ['c24_pigment'],
            hint: 'Titanium white was not available before 1920. The copy is full of it.'
          },
          { id: 'bench', label: 'Search the restoration bench', icon: 'search',
            desc: 'A colour recipe in Margot\'s hand',
            text: [
              "Under the bench is a notebook of colour recipes. The last page is written in a different hand from the rest: a mix of titanium white, Prussian blue and a trace of yellow ochre, with the note match the grey exactly.",
              "The handwriting matches the signature on the crate release. Margot Sloane ordered the copy made.",
              "A receipt is folded into the page: 1 crate, foam cut to 120 x 90, paid in cash."
            ],
            gives: ['c24_recipe'],
            hint: 'Margot ordered the colour match. Anton mixed it.'
          }
        ]
      },
      {
        id: 'office', name: "Margot's Office", short: 'Office', time: '00:10',
        art: { kind: 'office', mood: 'cold' },
        requires: ['c24_crate'],
        intro: 'A curator\'s office with a view over the closed gallery. The desk is immaculate. A single drawer is not quite shut.',
        actions: [
          { id: 'margot', label: 'Question Margot Sloane', icon: 'user', suspect: 'margot',
            desc: 'Curator - signed the crate out' },
          { id: 'access', label: 'Read the door and crate log', icon: 'terminal', puzzle: 'crate-log',
            desc: 'Service door, crate, lift',
            gives: ['c24_access'],
            hint: 'Find the badge that opened the service door and signed for the crate.'
          },
          { id: 'gala', label: 'Reconstruct the gala timeline', icon: 'clock', puzzle: 'gala-seq',
            desc: 'Six moments, one gap',
            gives: ['c24_timeline'],
            hint: 'Elias\'s last round, the service door, the crate, the body.'
          }
        ]
      }
    ],
    puzzles: {
      'forgery-photo': {
        type: 'photo', title: 'The Quiet Hour', subtitle: 'Enhance the brushwork', icon: 'photo',
        scene: { kind: 'theatre', mood: 'gala' },
        target: { x: 50, y: 46, w: 22, h: 26 }, range: [60, 82],
        reveal: 'Under the varnish: a second signature, A. VEY, and a brushstroke of titanium white that could not exist before 1920.',
        question: 'What does the enhanced canvas prove?',
        options: [
          { t: 'The painting is a modern copy', v: 'copy' },
          { t: 'The painting is the original with a new frame', v: 'original' },
          { t: 'The painting has been restored by the gallery', v: 'restored' }
        ],
        answer: 'copy',
        wrong: 'Titanium white is a modern pigment. The signature under the varnish is not the original artist\'s.',
        success: 'The canvas is a forgery by Anton Vey, painted over an old stretcher and varnished to look aged.',
        gives: ['c24_forgery'], flags: ['forgerySeen'],
        short: 'The hanging painting is a forgery.',
        log: 'The Quiet Hour on the wall is a modern copy. Anton Vey signed it under the varnish in titanium white.'
      },
      'service-pin': {
        type: 'keypad', title: 'Service Door', subtitle: 'Maintenance code', icon: 'keypad',
        deviceLabel: 'SERVICE DOOR - NORTH WING', length: 4, code: '1911',
        prompt: 'The service door uses the gallery\'s opening year as its maintenance code. The accession plate on the frame gives the year.',
        hintText: 'The frame plate reads MERIDIAN GALLERY - ACCESSION 1911.',
        success: 'The service door opens. Its internal log shows a close at 21:42 and no open until the caterer at 22:10.',
        gives: ['c24_access'], flags: ['doorOpen'],
        short: 'The service door was closed at 21:42.',
        log: 'The service door closed at 21:42 and did not reopen until 22:10. The crate left between those times.'
      },
      'pigment-mix': {
        type: 'mix', title: 'Pigment Analysis', subtitle: 'Layering the copy', icon: 'chemical',
        prompt: 'Recreate the copy\'s ground layer to identify its period. Add the pigments in the order a restorer would.',
        reagents: [
          { name: 'Chalk ground', color: '#d8d0c0' },
          { name: 'Titanium white', color: '#f4f4f0' },
          { name: 'Prussian blue', color: '#1e3a8a' },
          { name: 'Yellow ochre', color: '#b8860b' }
        ],
        order: [0, 1, 2, 3],
        note: 'Ground first, then the opaque white, then the blues, then the ochre. A pre-1920 painting cannot contain titanium.',
        hintText: 'Ground, white, blue, ochre. Titanium white in the mix proves the copy is modern.',
        success: 'The ground layer contains titanium white. No painting from 1911 could. The copy was made this year.',
        gives: ['c24_pigment'], flags: ['pigmentDone'],
        short: 'The copy uses modern titanium white.',
        log: 'Pigment analysis confirms titanium white in the ground layer. The canvas was painted in the last five years.'
      },
      'crate-log': {
        type: 'terminal', title: 'Crate and Door Log', subtitle: 'Service access', icon: 'terminal',
        user: 'security', host: 'meridian-gallery', password: 'gallery',
        intro: 'Gallery access console. Type help for commands.',
        banner: 'SERVICE WING - 21:00 TO 22:30',
        files: [
          { name: 'door.log', body: '21:42 SERVICE DOOR closed - badge M. SLOANE<br>21:44 SERVICE DOOR opened - badge M. SLOANE<br>21:46 LIFT NORTH held open - manual<br>21:50 CRATE signed out - M. SLOANE<br><span class="d">22:10 SERVICE DOOR opened - caterer</span>' },
          { name: 'crate.log', body: '<b>CRATE L-04</b><br>Contents: LIGHTING - FRAGILE<br>Released by: <b>M. SLOANE</b><br>Destination: private address, north<br><span class="r">Weight logged: 41kg - consistent with a framed canvas.</span>' },
          { name: 'staff.txt', body: '<b>M. SLOANE</b> - curator, service and store access<br><b>A. VEY</b> - restorer, studio only<br><b>E. WARD</b> - security, all areas, no crate authority' }
        ],
        hintText: 'The same badge closes the door, holds the lift and signs the crate. That is not a courier.',
        success: 'Margot Sloane closed the service door at 21:42, held the lift, and signed the crate out at 21:50.',
        gives: ['c24_access'], flags: ['crateLog'],
        short: 'Margot signed the crate out herself.',
        log: 'The access log shows Margot closing the service door, holding the lift and signing the crate out at 21:50.'
      },
      'gala-seq': {
        type: 'sequence', title: 'The Gala Timeline', subtitle: 'Six moments', icon: 'clock',
        prompt: 'Put the gala events in order. The gap between the last round and the body is the murder window.',
        variant: 'strips',
        items: [
          { t: 'Elias begins his north-wing round', sub: '21:30' },
          { t: 'Service door closed - Margot badge', sub: '21:42' },
          { t: 'Crate loaded and signed out', sub: '21:50' },
          { t: 'North wing closed for private viewing', sub: '21:55' },
          { t: 'Caterer finds Elias in the store room', sub: '22:10' }
        ],
        success: 'The window is twenty-eight minutes: Elias rounds at 21:30, the crate leaves at 21:50, and no one sees him again.',
        gives: ['c24_timeline'], flags: ['galaSeq'],
        short: 'The murder window is 21:30 to 22:10.',
        log: 'The timeline places the murder between Elias\'s last round at 21:30 and the crate leaving at 21:50.'
      }
    },
    clues: {
      'c24_body': { name: 'Blunt-force wound', caption: 'Downward angle - bronze dust', icon: 'blood', type: 'Forensic observation',
        desc: 'A depressed fracture above the left ear, angled downward, with bronze dust in the wound and on the uniform shoulder.',
        tells: 'Elias was struck from above by someone shorter than him, using the bronze maquette.' },
      'c24_torch': { name: "Elias's torch", caption: 'Under the shelf - aimed at the crate', icon: 'eye', type: 'Physical evidence',
        desc: 'The torch was found switched on beneath the bottom shelf, its lens cracked, the beam pointing at the lighting crate.',
        tells: 'Elias saw the crate being moved and was trying to light it when he was attacked.' },
      'c24_forgery': { name: 'Forged canvas', caption: 'Titanium white - A. VEY signature', icon: 'photo', type: 'Forensic analysis',
        desc: 'The hanging painting is a modern copy over an old stretcher, signed under the varnish by Anton Vey.',
        tells: 'The theft was planned as a swap, not a smash-and-grab.' },
      'c24_frame': { name: 'Re-screwed frame', caption: 'Old holes - new screws - fresh cord', icon: 'search', type: 'Physical evidence',
        desc: 'The original frame has new screws, empty old holes and modern braided hanging cord.',
        tells: 'The canvas was removed and replaced while the frame stayed on the wall.' },
      'c24_crate': { name: 'Empty lighting crate', caption: 'Foam cut for a canvas - signed M. SLOANE', icon: 'lockbox', type: 'Physical evidence',
        desc: 'A crate marked LIGHTING, foam-cut for a framed canvas, released by M. Sloane at 21:50 to a private northern address.',
        tells: 'The original left the gallery with the curator\'s authority.' },
      'c24_access': { name: 'Service door log', caption: 'Closed 21:42 - lift held - crate out 21:50', icon: 'id', type: 'Technical record',
        desc: 'Margot\'s badge closed the service door at 21:42, held the north lift open, and signed the crate out eight minutes later.',
        tells: 'Margot controlled the exit. She cannot claim the crate left without her.' },
      'c24_recipe': { name: 'Colour recipe', caption: 'Margot\'s hand - match the grey exactly', icon: 'note', type: 'Document',
        desc: 'A notebook page in Margot\'s handwriting specifying titanium white, Prussian blue and ochre to match the original grey.',
        tells: 'Margot commissioned the forgery. The colour match was her instruction.' },
      'c24_pigment': { name: 'Modern pigment', caption: 'Titanium white - post-1920', icon: 'chemical', type: 'Forensic analysis',
        desc: 'The copy\'s ground layer contains titanium white, a pigment unavailable when the original was painted.',
        tells: 'The copy is recent. The forgery was made for this exhibition.' },
      'c24_donor': { name: "Lady Ash's statement", caption: 'Wrong grey - calls about insurance', icon: 'eye', type: 'Witness statement',
        desc: 'The donor noticed the grey was too blue and confirms Margot called twice about the loan and insurance, the last time at nine tonight.',
        tells: 'Margot knew the painting was about to be replaced and was checking the payout.' },
      'c24_debt': { name: "Donor's son's debts", caption: 'Gambling markers - old news', icon: 'money', type: 'Red herring',
        desc: 'Lady Ash\'s son owes money to a private club. The debt is two years old and the club has no connection to the gallery.',
        tells: 'The son is a scandal, not a suspect. He was abroad on the night.' },
      'c24_timeline': { name: 'Gala timeline', caption: '21:30 round - 21:50 crate - 22:10 body', icon: 'clock', type: 'Reconstruction',
        desc: 'Elias\'s last round is 21:30. The crate leaves at 21:50. The body is found at 22:10. No one sees Elias between.',
        tells: 'The murder happened during the crate move, not during the public viewing.' }
    },
    suspects: [
      {
        id: 'margot', name: 'Margot Sloane', role: 'Curator - signed the crate out', location: 'office', locationName: "Margot's office",
        tag: 'Primary suspect', portrait: { seed: 'margot-sloane', hair: 'bob', hairColor: '#2a1a12', skin: 1, expression: 'composed', collar: 'blazer' },
        intro: 'Margot is elegant, precise and entirely unbothered by the body in her store room. She calls the theft a misunderstanding and the death a terrible accident involving a falling sculpture.',
        questions: [
          { q: 'When did you last see Elias?', a: 'At the start of the gala. He was checking the north wing. I was with donors until the caterer came to find me.' },
          { q: 'Why did you sign out a lighting crate?', a: 'The lighting contractor collected some spare fittings. The crate is theirs. I signed the paperwork as a courtesy.', requires: ['c24_crate'], gives: ['c24_crate'],
            follow: 'The crate foam is cut for a 120 by 90 canvas. Lighting fittings do not need that shape.' },
          { q: 'Who made the copy on the wall?', a: 'There is no copy. That is The Quiet Hour. Lady Ash lent it personally. You can see the accession plate.', requires: ['c24_forgery'], gives: ['c24_forgery'],
            follow: 'The plate is on the frame. The canvas beneath it is signed by Anton Vey.' },
          { q: 'Why did you call Lady Ash at nine tonight?', a: 'To confirm the loan. It is my job to keep donors informed.', requires: ['c24_donor'], gives: ['c24_donor'],
            follow: 'She called twice this week about insurance. The second call was after the gallery closed.' },
          { q: 'Where is the original painting now?', a: 'I have no idea what you mean. If the painting is on the wall, the painting is on the wall.', requires: ['c24_frame'],
            follow: 'The painting on the wall is not the painting she is describing.' }
        ],
        after: 'She asks whether the gala photographs can be released before the story breaks. She is already writing the press line.'
      },
      {
        id: 'anton', name: 'Anton Vey', role: 'Restorer - painted the copy', location: 'studio', locationName: 'Restoration studio',
        tag: 'Accomplice', portrait: { seed: 'anton-vey', hair: 'long', hairColor: '#6a5a4a', skin: 2, expression: 'nervous', collar: 'apron' },
        intro: 'Anton has paint under his nails and a tremor in his left hand. He admits the copy within four minutes, then spends the next twenty trying to explain why he made it.',
        questions: [
          { q: 'Did you paint the copy?', a: 'Yes. Margot asked for a study copy for the archive. I did not know it would hang in the gallery. I swear I did not.', gives: ['c24_forgery'],
            follow: 'A study copy does not need a forged signature and a varnish aged to match the original.' },
          { q: 'Who paid you?', a: 'Margot. Cash. She said the gallery could not afford a proper restoration and the donor would never know.', requires: ['c24_recipe'], gives: ['c24_recipe'],
            follow: 'The recipe in the notebook is in her hand. The instruction was to match the grey exactly.' },
          { q: 'Did you see Elias in the store room?', a: 'No. I was in the studio all night. I heard the lift, though. Twice. The second time it stayed open too long.', requires: ['c24_access'],
            follow: 'The lift log shows a manual hold at 21:46. That is when the crate was loaded.' }
        ]
      },
      {
        id: 'donorSon', name: 'Hugo Ash', role: "Lady Ash's son - gambling debts", location: 'gallery', locationName: 'Gala bar',
        tag: 'Red herring', portrait: { seed: 'hugo-ash', hair: 'short', hairColor: '#8a6a3a', skin: 3, expression: 'bored', collar: 'suit' },
        intro: 'Hugo is drunk, loud, and delighted by the drama. He owes money to a club in the city and has been telling everyone the painting is worth more than the gallery.',
        questions: [
          { q: 'Where were you when Elias died?', a: 'At the bar. Then outside smoking. Then back at the bar. Ask anyone. I do not go into store rooms; they are dusty.', gives: ['c24_debt'],
            follow: 'The bar staff and a taxi receipt put him outside the gallery from 21:35 to 22:05.' },
          { q: 'Do you need money?', a: 'Everyone needs money. I do not need it badly enough to kill a guard over a painting I cannot sell.', requires: ['c24_debt'],
            follow: 'His debt is two years old and his mother controls the trust. Killing Elias would not release a penny.' }
        ]
      }
    ],
    timeline: [
      { time: '20:00', text: 'Gala opens. The Quiet Hour is on the north wall.' },
      { time: '21:30', text: 'Elias begins his north-wing round.' },
      { time: '21:42', text: 'Service door closed on Margot\'s badge.' },
      { time: '21:44', text: 'Service door opened again. North lift held manually.' },
      { time: '21:50', text: 'Crate signed out by Margot and loaded.' },
      { time: '21:55', text: 'North wing closed for a private viewing.' },
      { time: '22:10', text: 'Caterer finds Elias in the store room.' }
    ],
    links: [
      { a: 'c24_access', b: 'margot', note: 'Margot\'s badge closed the door, held the lift and signed the crate.' },
      { a: 'c24_recipe', b: 'margot', note: 'The colour-match instruction is in Margot\'s handwriting.' },
      { a: 'c24_crate', b: 'margot', note: 'Margot released the original canvas to a private address.' },
      { a: 'c24_body', b: 'anton', note: 'Bronze dust from the maquette matches the studio casting bench.' }
    ],
    forensics: {
      prompt: 'Two samples from the store room. Match each to its reference.',
      samples: [
        { id: 'bronze', type: 'TRACE', label: 'Wound and shoulder - bronze dust', mark: 'casting alloy, leaded' },
        { id: 'varnish', type: 'RESIDUE', label: 'Canvas surface - varnish', mark: 'modern acrylic resin' }
      ],
      candidates: [
        { id: 'maquette', label: 'Bronze horse maquette' },
        { id: 'frame', label: 'Original gilt frame' },
        { id: 'crate', label: 'Lighting crate foam' }
      ],
      answer: { bronze: 'maquette', varnish: 'frame' },
      success: 'The wound dust matches the bronze maquette. The canvas varnish is modern acrylic, confirming the forgery.'
    },
    documents: [
      { id: 'loan', title: 'Loan agreement - The Quiet Hour', sub: 'Insurance schedule attached', body: '<div class="doc-sheet"><b>MERIDIAN GALLERY - LOAN AGREEMENT</b><br>Owner: <b>Lady Margaret Ash</b><br>Work: <b>The Quiet Hour</b>, oil on canvas, 1911<br>Insured value: <b>Â£3,100,000</b><br>Loan period: 14 days<br><br>Clause 9: The work may not be moved from the north gallery without the owner\'s written consent.<br><br><span class="d">Handwritten addition: Consent not requested. - M. Sloane</span></div>',
        question: 'What does the loan agreement reveal?',
        options: [
          { t: 'Moving the painting required consent that was never given', v: 'a' },
          { t: 'The painting was already sold to a private buyer', v: 'b' },
          { t: 'Lady Ash had insured the painting for too little', v: 'c' }
        ],
        answer: 0, gives: ['c24_donor'],
        log: 'The loan agreement forbids moving the painting without Lady Ash\'s written consent. None was requested.',
        wrong: 'Read clause 9 and the handwritten note beneath it.' },
      { id: 'insurance', title: 'Insurance claim draft', sub: 'Prepared before the theft', body: '<div class="doc-sheet"><b>HALCYON FINE ART - CLAIM DRAFT</b><br>Policy: HG-221<br>Work: The Quiet Hour<br>Claimant: <b>Meridian Gallery</b><br>Amount: <b>Â£3,100,000</b><br><br>Status: <span class="g">DRAFT - NOT SUBMITTED</span><br>Prepared by: <b>M. SLOANE</b><br>Date prepared: <b>Friday, 18:40</b><br><br><span class="d">Note: theft must be reported before 24 hours. Photographs attached.</span></div>',
        question: 'Why is the claim draft important?',
        options: [
          { t: 'It was prepared hours before the painting was reported stolen', v: 'a' },
          { t: 'It proves the painting was never insured', v: 'b' },
          { t: 'It names Anton Vey as the claimant', v: 'c' }
        ],
        answer: 0, gives: ['c24_crate'],
        log: 'Margot prepared an insurance claim at 18:40, hours before the theft. The disappearance was planned.',
        wrong: 'Look at the date and time prepared. The theft had not happened yet.' }
    ],
    audioCalls: [
      { id: 'c24-999', title: 'Emergency call - caterer', sub: 'Report from the store room', cue: 'Under the caterer\'s voice: the gala string quartet, then a lift bell, then a heavy door closing. The music is still playing when she finds the body.', pattern: [500, 0, 500, 380, 0], tone: 'sine',
        options: [
          { t: 'The gala was still in progress', v: 'a' },
          { t: 'The gallery was empty and closed', v: 'b' },
          { t: 'A fire alarm had cleared the building', v: 'c' }
        ],
        answer: 0, gives: ['c24_timeline'], flag: 'callHeard',
        log: 'The gala was still playing when Elias was found. The theft happened during the event, not after it.',
        wrong: 'Listen for the quartet. The party never stopped.' }
    ],
    mapTask: {
      q: 'Which route did the crate take out of the north wing?',
      options: [
        { t: 'North gallery -> store room -> service door -> north lift', v: 'a' },
        { t: 'North gallery -> front entrance -> taxi rank', v: 'b' },
        { t: 'Store room -> basement -> sewer access', v: 'c' }
      ],
      answer: 0, gives: ['c24_access'],
      log: 'The crate went north gallery to store room, through the service door, and up the north lift.',
      wrong: 'The service log and the lift hold mark the route.' },
    redHerrings: [
      { clue: 'c24_debt', label: "Hugo Ash's gambling debts", clearedBy: ['c24_debt', 'c24_timeline'], note: 'Hugo was at the bar and outside smoking from 21:35 to 22:05. His debt is old and does not touch the gallery.' }
    ],
    contradictions: [
      { suspect: 'margot', statement: 1, evidence: ['c24_crate', 'c24_access'],
        expose: 'The crate foam is cut for a canvas, and her badge signs it out at 21:50. Lighting fittings do not require a curator\'s signature.',
        wrong: 'The crate shape and her signature say it was never lighting.' },
      { suspect: 'margot', statement: 2, evidence: ['c24_forgery', 'c24_pigment'],
        expose: 'The canvas is signed A. VEY under the varnish and contains titanium white. It cannot be the 1911 original.',
        wrong: 'The frame is original. The canvas is not.' },
      { suspect: 'margot', statement: 4, evidence: ['c24_recipe'],
        expose: 'The colour-match recipe is in her handwriting, instructing Anton to match the original grey. She commissioned the copy.',
        wrong: 'The notebook page is in her hand, not Anton\'s.' }
    ],
    solution: {
      minEvidence: 7,
      questions: [
        { kind: 'suspect', q: 'Who killed Elias Ward?', options: [
          { t: 'Margot Sloane - curator', v: 'margot' },
          { t: 'Anton Vey - restorer', v: 'anton' },
          { t: 'Hugo Ash - the donor\'s son', v: 'hugo' },
          { t: 'A courier collecting the crate', v: 'courier' }
        ], answer: 'margot' },
        { kind: 'method', q: 'How did Elias die?', options: [
          { t: 'He was struck with the bronze maquette while interrupting the crate move', v: 'maquette' },
          { t: 'He fell from the store room shelving', v: 'fall' },
          { t: 'He was poisoned at the gala bar', v: 'poison' },
          { t: 'He was crushed by the crate being lowered', v: 'crate' }
        ], answer: 'maquette' },
        { kind: 'motive', q: 'Why was the painting swapped?', options: [
          { t: 'Margot intended to sell the original and claim the insurance', v: 'sell' },
          { t: 'Anton wanted to display his own work in the gallery', v: 'glory' },
          { t: 'Lady Ash wanted to hide a forgery she already owned', v: 'donor' },
          { t: 'Hugo needed money for his gambling debts', v: 'debt' }
        ], answer: 'sell' },
        { kind: 'evidence', q: 'Which evidence proves the painting on the wall is a forgery?', options: [
          { t: 'The modern pigment and the A. Vey signature under the varnish', v: 'forgery' },
          { t: 'The donor\'s statement about the light', v: 'donor' },
          { t: 'The broken torch under the shelf', v: 'torch' },
          { t: 'The gala timeline', v: 'timeline' }
        ], answer: 'forgery' }
      ],
      verdict: {
        who: "Margot Sloane",
        whoDesc: ", the curator, was charged with the murder of Elias Ward and the theft of The Quiet Hour.",
        how: "She struck him with the bronze maquette when he interrupted the crate being moved, then signed out a forged canvas and an original in a case marked LIGHTING.",
        why: "The gallery was drowning and Margot had already drafted an insurance claim. The original was going to a private buyer; the copy was going to stay on the wall.",
        key: "The modern pigment, the A. Vey signature under the varnish, and the curator's own signature on the crate."
      },
      reveal: [
        "Elias Ward did his rounds at 21:30 and met a crate where a wall should have been. He was not the intended victim. He was the wrong man in the right corridor.",
        "The painting on the wall was painted by Anton Vey at Margot's request: a colour match in her own handwriting. Anton believed he was restoring a copy, not replacing an original.",
        "Hugo's debts were old and public. He was at the bar and outside smoking when the crate left. The gallery's cleanest suspect was its only innocent one."
      ],
      quote: "The frame was original. The painting was a confession.",
      twist: "The insurance draft was dated Friday, two days before the theft. Margot had costed the crime before she committed it."
    }
  });
})();
