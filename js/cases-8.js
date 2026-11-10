/* ============================================================
   CASE 14 — THE CIPHER ROOM
   ============================================================ */
(function () {
  'use strict';
  window.SH.cases.push({
    id: 'c14', num: 14,
    title: 'The Cipher Room',
    subtitle: 'An escape-room designer is found dead inside his own locked puzzle, and the only way out is a door that should not exist.',
    difficulty: 5, est: '40–50 min',
    cover: { kind: 'theatre', mood: 'mansion' },
    facts: [
      { k: 'Victim', v: 'Rufus Kettle, 41 — escape-room designer' },
      { k: 'Scene', v: 'Locked In, room three: The Cipher Room' },
      { k: 'Found', v: '20:40 — by the 20:00 booking, still locked in' },
      { k: 'Cause', v: 'Blunt trauma · brass puzzle piece' }
    ],
    briefing: [
      'Locked In is the kind of place where people pay to be frightened for an hour. Three rooms, three stories, one emergency override. Rufus Kettle designed all of them. He was found in room three at twenty past eight, face down beside the final puzzle, with the door still maglocked and the emergency bar down.',
      'The players who found him had booked the room for eight. They stood in the corridor for forty minutes while the game master tried the override. When the door finally opened, Rufus had been dead for at least half an hour.',
      'The room is a locked-room puzzle in the worst possible way. The door was locked from the inside. The windows are painted shut. The only other opening is a service crawlspace barely wide enough for a person — and it was bolted from the room side.',
      'His business partner says he was alone. His actress says he was impossible. His locksmith says the room was safe. One of them is telling the truth about the door.'
    ],
    opening: 'Room three smells of dust and cold brass. The walls are covered in cipher wheels, mirror writing, and a countdown clock frozen at 00:00. Rufus Kettle lies beside the final plinth with a brass puzzle piece in his hand, as if he died trying to solve his own game.',
    objectives: [
      'Establish how the killer left a room locked from the inside.',
      'Crack the final cipher and find what it really opens.',
      'Audit the room’s access system and the night’s bookings.',
      'Identify who knew the crawlspace existed — and how to close it from outside.'
    ],
    locations: [
      {
        id: 'room', name: 'The Cipher Room', short: 'Room three', time: '20:55',
        art: { kind: 'basement', mood: 'mansion' },
        intro: 'A low room dressed as a Victorian study: a desk, a wall of clocks, and a plinth in the centre with a brass puzzle box on top. Rufus is face down beside the plinth. The countdown clock reads zero and will not move.',
        actions: [
          { id: 'body', label: 'Examine the body and the plinth', icon: 'blood', hotspot: { x: 55, y: 63 },
            desc: 'The wound, the brass piece, the final puzzle',
            text: [
              'Rufus Kettle is forty-one, thin, with ink on his fingers and a watch stopped at 19:47. The wound at his temple is a neat, deep depression with a brass-coloured edge. There is blood on the corner of the plinth and a brass puzzle piece in his right hand.',
              'The piece is one of the room’s props: a heavy, star-shaped key that fits the final box. It has been cleaned. The blood on the plinth has not.',
              'The countdown clock on the wall is frozen at zero. Beneath it, a brass plate reads: <b>THE LAST DOOR OPENS FROM THE OTHER SIDE.</b>'
            ],
            gives: ['body-note', 'brass-piece'],
            hint: 'The watch stopped at 19:47. The brass piece in his hand is the murder weapon — or meant to look like it.'
          },
          { id: 'wall', label: 'Solve the wall cipher', icon: 'lock', puzzle: 'cipher',
            desc: 'Six rotating letter rings',
            requires: ['body-note'],
            hint: 'The cipher is a Caesar shift. Turn the rings until the words resolve, then type the message.'
          },
          { id: 'crawl', label: 'Inspect the service crawlspace', icon: 'search', hotspot: { x: 84, y: 72 },
            desc: 'Bolted from the room side — almost',
            requires: ['body-note'],
            text: [
              'The crawlspace hatch is set low in the east wall behind a hinged bookcase. It is bolted from the room side with two brass shoot bolts. The bolts are drawn. The hatch is closed but not locked.',
              'On the floor of the crawlspace: a single grey fibre, a scuff of dust, and a smear of fresh grease on the frame. Someone has been through here recently, and they were not trying to be quiet.',
              'The crawlspace runs six feet to a utility corridor. The utility corridor opens onto the control room. There is no camera in the utility corridor.'
            ],
            gives: ['crawl-trace'],
            hint: 'The hatch is bolted from the room side, but the bolts are drawn. Look at the frame and the dust.'
          }
        ]
      },
      {
        id: 'lobby', name: 'Locked In reception', short: 'Reception', time: '21:20',
        art: { kind: 'office', mood: 'mansion' },
        requires: ['body-note'],
        intro: 'A black-walled reception with a neon sign and a wall of framed five-star reviews. The booking screen still shows room three as IN PLAY. Priya Shah is sitting behind the desk with a cold cup of tea and a phone she keeps turning over.',
        actions: [
          { id: 'priya', label: 'Interview Priya Shah', icon: 'user', suspect: 'priya',
            desc: 'Co-founder · the other half of Locked In',
            hint: 'Priya was in the building. Ask her about the sale and the room.'
          },
          { id: 'guestbook', label: 'Check the booking book', icon: 'ledger',
            desc: 'Three rooms, one private booking',
            text: [
              'The booking book is a physical ledger, kept open on the desk. The 20:00 slot for room three is booked to a group of four under the name “HALLOWAY”. They arrived at 19:55 and were kept in the corridor until 20:40.',
              'At 19:30 there is a private entry in Priya’s hand: <b>“RK — run-through, room 3, 19:30–20:15. Do not disturb.”</b>',
              'At 19:58, a second entry: <b>“PS — override check, control room.”</b> The handwriting is the same. There is no exit time.'
            ],
            gives: ['guestbook'],
            hint: 'There was a private run-through before the public booking. Read the entries around it.'
          },
          { id: 'phone', label: 'Examine Rufus’s phone', icon: 'phone',
            desc: 'A cracked screen and a last message',
            requires: ['guestbook'],
            text: [
              'Rufus’s phone is in the reception lost-property drawer, bagged by the first officer. The screen is cracked but working. The last message was sent at 19:22 to Priya: <b>“We need to talk about the sale before Thursday. I am not signing the new cap table. You know why.”</b>',
              'The reply came at 19:24: <b>“Then we talk tonight. Room 3. 19:30.”</b>',
              'The phone’s step counter records movement until 19:46, then nothing. The watch stopped a minute later.'
            ],
            gives: ['rufus-phone'],
            hint: 'Rufus’s last message was to Priya, about the sale. The reply set the meeting.'
          }
        ]
      },
      {
        id: 'control', name: 'Control room', short: 'Control', time: '22:00',
        art: { kind: 'server' },
        requires: ['cipher-note'],
        intro: 'A windowless room of monitors, a maglock panel, and a wall of labelled keys. The main screen shows the three rooms as green outlines. Room three is still red. A log scrolls in the corner.',
        actions: [
          { id: 'console', label: 'Open the control terminal', icon: 'terminal', puzzle: 'app',
            desc: 'The access system and its admin log',
            requires: ['rufus-phone'],
            hint: 'The company’s first room was called Theseus. Rufus used it as every password.'
          },
          { id: 'override', label: 'Use the emergency override', icon: 'lock', puzzle: 'override',
            desc: 'A four-digit maintenance code',
            requires: ['guestbook'],
            hint: 'Room three opened in March 2019. The maintenance code is the month and year: 0319.'
          },
          { id: 'monitors', label: 'Check the corridor cameras', icon: 'cctv',
            desc: 'No camera in the utility corridor',
            requires: ['crawl-trace'],
            text: [
              'There are four cameras: reception, the main corridor, the control-room door, and the fire exit. There is no camera in the utility corridor because Rufus said it would spoil the immersion.',
              'At 19:48, the control-room door camera shows Priya Shah entering. She is wearing a grey jacket. At 19:52 she leaves, carrying a tablet and a set of keys.',
              'At 19:53, the main corridor camera shows her walking toward the front of house. She does not come back until 20:35, when the players start complaining.'
            ],
            gives: ['cam-feed'],
            hint: 'The utility corridor is a blind spot. But the control-room door is not.'
          },
          { id: 'timeline', label: 'Rebuild the last hour', icon: 'clock', puzzle: 'lasthour',
            desc: 'Seven moments, one locked room',
            requires: ['app-log', 'cam-feed'],
            hint: 'The message came before the run-through. Then motion, control room, override, corridor, players.' }
        ]
      },
      {
        id: 'workshop', name: 'The workshop', short: 'Workshop', time: '22:40',
        art: { kind: 'basement' },
        requires: ['crawl-trace'],
        intro: 'A maker’s room: sawdust, brass offcuts, a lathe, and shelves of half-finished puzzle boxes. On the wall, a whiteboard still shows the design for room three, with one panel circled in red.',
        actions: [
          { id: 'tools', label: 'Check the toolbench', icon: 'tool',
            desc: 'A missing brass key and fresh filings',
            requires: ['brass-piece'],
            text: [
              'The bench is covered in brass filings and the smell of cutting oil. A vice holds a half-finished star key, identical to the one in Rufus’s hand.',
              'The key rack on the wall has fourteen hooks. Thirteen keys. The empty hook is labelled <b>“CIPHER — FINAL”</b>.',
              'The filings around the vice are fresh. Someone has been making a duplicate key within the last day.'
            ],
            gives: ['toolmark', 'missing-key'],
            hint: 'The key in Rufus’s hand is a prop. Check the rack for the original.'
          },
          { id: 'notes', label: 'Read the design notes', icon: 'book',
            desc: 'The crawlspace, the override, the sale',
            requires: ['toolmark'],
            text: [
              'The design folder for room three is open on the bench. The crawlspace is marked on the plan as <b>“SERVICE — STAFF ONLY”</b>. In the margin, in Rufus’s hand: <b>“Bolts from inside. Emergency override from control. Do not tell players.”</b>',
              'Tucked into the folder: a draft sale agreement for Locked In. The buyer is a leisure group. Rufus’s signature is on the last page. Priya’s name has been struck through on the cap table and replaced with a smaller payout.',
              'On the back of the agreement, in Priya’s handwriting: <b>“After everything? You are selling my rooms.”</b>'
            ],
            gives: ['design-notes', 'sale-contract'],
            hint: 'The design notes explain the crawlspace. The sale agreement explains the rage.'
          },
          { id: 'hidden', label: 'Search the workshop shelves', icon: 'search', puzzle: 'hidden',
            desc: 'Five things out of place',
            requires: ['missing-key'],
            hint: 'Look for the duplicate key, a grey thread, a control-room tablet, a pair of gloves, and a fresh scratch.'
          }
        ]
      },
      {
        id: 'theatre', name: 'The old theatre', short: 'Theatre', time: '23:30',
        art: { kind: 'theatre' },
        requires: ['guestbook'],
        intro: 'Lottie Renn rents a dressing room in the disused theatre next door. The corridor smells of dust and greasepaint. She is taking off her stage makeup with the door open, as if she has been expecting company.',
        actions: [
          { id: 'lottie', label: 'Interview Lottie Renn', icon: 'user', suspect: 'lottie',
            desc: 'Actress · game master · Rufus’s ex',
            hint: 'Lottie was the game master on duty. Ask her about the override.'
          },
          { id: 'playbill', label: 'Check the theatre playbill', icon: 'news',
            desc: 'The show that closed last week',
            requires: ['cam-feed'],
            text: [
              'The playbill is for a two-woman show called <i>The Locked Room</i>. Lottie Renn and Priya Shah. It closed last week after four performances.',
              'The reviews are pinned beside the mirror. One is circled: <b>“A clever two-hander about two women who destroy each other over a house. Shah is the revelation.”</b>',
              'On the back of the playbill, in Priya’s hand: <b>“We should have kept playing this one.”</b>'
            ],
            gives: ['playbill'],
            hint: 'Priya and Lottie were in a play together. The reviews may matter more than the show.'
          }
        ]
      },
      {
        id: 'priyaoffice', name: 'Priya’s office', short: 'Priya’s office', time: '00:10',
        art: { kind: 'office', mood: 'mansion' },
        requires: ['app-log'],
        intro: 'A small office above reception with a view of the street. The desk is covered in contracts, a tablet, and a framed photograph of Priya and Rufus at the opening night of room one, grinning like children.',
        actions: [
          { id: 'search', label: 'Search Priya’s desk', icon: 'search',
            desc: 'A tablet, a grey jacket, a printed email',
            requires: ['cam-feed'],
            text: [
              'The tablet on the desk is the control-room tablet. Its access log is open: <b>“ROOM 3 OVERRIDE — 19:52 — USER P.SHAH.”</b>',
              'On the back of the door hangs a grey jacket. There is a long grey fibre caught in the cuff, and a smear of grease on the sleeve. The jacket matches the one on the corridor camera.',
              'In the drawer: a printed email from Rufus to the buyer, dated this morning. <b>“Priya is out. The sale completes Thursday. She will get the agreed settlement and nothing more.”</b>'
            ],
            gives: ['priya-tablet', 'grey-jacket', 'sale-email'],
            hint: 'Priya’s tablet and jacket are both in this room. The email explains why.'
          },
          { id: 'confront', label: 'Confront Priya Shah', icon: 'user', suspect: 'priya',
            desc: 'The co-founder with the control tablet',
            requires: ['app-log'],
            hint: 'With the override log in hand, it is time to ask Priya about 19:52.'
          }
        ]
      }
    ],
    puzzles: {
      cipher: {
        type: 'cipher', title: 'The Wall Cipher', subtitle: 'Six rotating letter rings', icon: 'lock',
        cipher: 'TUJS KWTRM YMJ TYJMW XNIJ', shift: 5,
        prompt: 'The final puzzle is a Caesar wheel built into the wall. Six rings of letters, one message. The room will not give up its secret until you read it.',
        note: 'Turn the wheel until the words resolve. The answer is the message, not the shift.',
        placeholder: 'Type the decoded message…',
        answer: ['open from the other side', 'open from other side', 'the door opens from the other side'],
        wrong: 'The words are still scrambled. Try a different shift and read the first word aloud.',
        hintText: 'Shift the wheel five places back. The first word resolves to OPEN.',
        success: 'The rings click into place. The message reads: <b>OPEN FROM THE OTHER SIDE.</b> It is not a riddle. It is an instruction for staff — the crawlspace hatch.',
        successTitle: 'The wall speaks.',
        gives: ['cipher-note'], flags: ['cipherSolved'],
        short: 'The cipher points to the crawlspace.',
        log: 'The wall cipher decodes to “OPEN FROM THE OTHER SIDE” — a staff instruction for the service crawlspace, not a player puzzle.'
      },
      override: {
        type: 'keypad', title: 'Emergency Override', subtitle: 'Four-digit maintenance code', icon: 'lockbox',
        deviceLabel: 'LOCKED IN — MAINTENANCE', length: 4, code: '0319',
        prompt: 'The override panel opens the maglocks on every room. The code is changed when a room is commissioned. <span style="color:var(--dim)">Room three was commissioned in March 2019.</span>',
        hintText: 'Month and year of room three’s opening: March 2019 → 0319.',
        successTitle: 'Override accepted.',
        success: 'The panel glows green. The log shows the last override was entered at 19:52 — from the control-room tablet, under Priya Shah’s user account.',
        gives: ['override-log'], flags: ['overrideOpen'],
        short: 'The last override was at 19:52.',
        log: 'The emergency override log records a room-three unlock at 19:52, entered from the control-room tablet under Priya Shah’s account.'
      },
      app: {
        type: 'terminal', title: 'Control Room Terminal', subtitle: 'Access and booking system', icon: 'terminal',
        user: 'control', host: 'locked-in', password: 'theseus',
        intro: 'Connection established. The screen shows three room outlines and a scrolling access log. Type "help" for commands.',
        banner: 'LOCKED IN — CONTROL ACCESS. 3 FILES. 1 ADMIN LOG.',
        files: [
          { name: 'rooms.txt', body: 'ROOM 1 — THE VAULT (2017)<br>ROOM 2 — THE SIGNAL (2018)<br>ROOM 3 — THE CIPHER (2019)<br><span class="d">Room 3 service crawlspace: utility corridor → control room. Staff only.</span>' },
          { name: 'bookings', body: '<span class="d">19:30 — RK private run-through — room 3</span><br><span class="d">19:55 — HALLOWAY x4 — room 3 (held in corridor)</span><br><span class="y">20:00 — room 3 still locked. Override attempted 20:36.</span>' },
          { name: 'access.log', locked: true, secret: true, hint: 'Admin log. Control password required.', body: '<span class="y">ACCESS LOG — FRIDAY</span><br>19:30 — room 3 — RUN-THROUGH — R.KETTLE<br>19:47 — room 3 — MOTION DETECTED<br>19:48 — control room — P.SHAH<br>19:52 — room 3 — OVERRIDE — P.SHAH<br>19:53 — utility corridor — DOOR OPEN<br>19:58 — control room — P.SHAH<br>20:36 — room 3 — OVERRIDE FAILED<br><span class="r">Note: override at 19:52 disabled the internal maglock for 60 seconds.</span>' }
        ],
        hintText: 'The first room was Theseus. Rufus used the name for every password. Try THESEUS.',
        success: 'The admin log opens. At 19:52, Priya Shah used the control-room tablet to disable the room’s internal maglock for sixty seconds. The utility corridor door opened at 19:53.',
        successTitle: 'The door was opened from outside.',
        gives: ['app-log'], flags: ['appOpen'],
        short: 'Priya’s override opened the room at 19:52.',
        log: 'The admin log shows Priya Shah’s override at 19:52, followed by the utility corridor door opening at 19:53.'
      },
      hidden: {
        type: 'hotspot', title: 'The Workshop', subtitle: 'Five things out of place', icon: 'search',
        scene: { kind: 'basement' },
        targets: [
          { label: 'Duplicate brass key', x: 24, y: 44, r: 6, text: 'A freshly cut brass star key, still warm from the vice. It fits the final plinth.' },
          { label: 'Grey thread on the lathe', x: 48, y: 58, r: 5, text: 'A grey fibre caught on the lathe handle, matching the jacket in Priya’s office.' },
          { label: 'Control-room tablet', x: 68, y: 50, r: 6, text: 'A tablet logged in as P.SHAH, with the override screen still open.' },
          { label: 'Pair of nitrile gloves', x: 36, y: 72, r: 5, text: 'One glove, worn at the fingertips, with brass filings inside.' },
          { label: 'Fresh scratch on the hatch', x: 80, y: 30, r: 6, text: 'A fresh scrape on the wall beside the bookcase hinge, at crawlspace height.' }
        ],
        note: 'Click directly on the details. The workshop has been tidied in a hurry, but not well.',
        hintText: 'Look at the bench, the lathe, the shelf, the floor, and the wall by the bookcase hinge.',
        success: 'The workshop tells a story: a duplicate key was cut, gloves were worn, the tablet was used, and someone scraped the wall crawling out. Priya did not just open the room. She was inside it.',
        successTitle: 'The workshop gives her up.',
        gives: ['hidden-cache'], flags: ['workshopSearched'],
        short: 'Priya cut a duplicate key and crawled out.',
        log: 'The workshop search found a duplicate brass key, a grey fibre, the control tablet, used gloves, and a fresh scrape by the crawlspace hatch.'
      },
      lasthour: {
        type: 'sequence', title: 'The Last Hour', subtitle: 'Seven moments, one locked room', icon: 'clock', variant: 'strips',
        prompt: 'The room was locked from the inside. The logs say otherwise. Put the last hour in order.',
        items: [
          { t: 'Rufus sends his last message', sub: '19:22 — sent mail', order: 1 },
          { t: 'Rufus enters room three', sub: '19:30 — private run-through', order: 2 },
          { t: 'The motion sensor trips', sub: '19:47 — room three', order: 3 },
          { t: 'Priya enters the control room', sub: '19:48 — corridor camera', order: 4 },
          { t: 'Priya uses the override', sub: '19:52 — control tablet', order: 5 },
          { t: 'The utility corridor door opens', sub: '19:53 — access log', order: 6 },
          { t: 'The players arrive', sub: '19:55 — held in corridor', order: 7 }
        ],
        wrong: 'Rufus sent the message before he entered the room. Put the message first.',
        hintText: 'The message came before the run-through. Then motion, control room, override, corridor, players.',
        success: 'The hour lines up: Rufus texted Priya at 19:22, entered the room at 19:30, and was dead by 19:47. Priya was in the control room at 19:48, opened the room at 19:52, and left through the utility corridor at 19:53.',
        successTitle: 'The locked room was a lie.',
        gives: ['timeline'], flags: ['timelineBuilt'],
        short: 'Priya was inside the room at 19:47.',
        log: 'Timeline: Rufus entered at 19:30, motion at 19:47, Priya in control at 19:48, override at 19:52, utility door at 19:53.'
      }
    },
    suspects: [
      {
        id: 'priya', name: 'Priya Shah', role: 'Co-founder · Locked In', location: 'lobby', locationName: 'Reception', tag: 'Prime suspect',
        portrait: { seed: 'priya-shah', hair: 'long', hairColor: '#1b1220', skin: 4, expression: 'wary', collar: 'suit', eyes: '#3a2159' },
        intro: 'Thirty-eight, composed, with the kind of stillness that costs effort. She and Rufus built Locked In from a rented room and a second-hand lathe. She does not look surprised to see you. She looks tired.',
        questions: [
          { q: 'Where were you between 19:30 and 20:00?', requires: ['guestbook'],
            a: '“In the control room, checking the override. We had a run-through scheduled and a public booking straight after. I wanted to make sure the maglocks were clean.” She meets your eyes. “I was not in room three.”',
            gives: ['priya-alibi'], flags: ['priyaHostile'] },
          { q: 'Your override opened room three at 19:52.', requires: ['app-log'], present: true,
            a: '“I opened it because Rufus did not answer.” Her voice does not change. “I thought he was ignoring me. He did that. I opened the door, called his name, and when he did not answer I assumed he had gone out the back.”',
            gives: ['priya-story'], flags: ['priyaHostile'] },
          { q: 'The crawlspace hatch was bolted from the inside. The bolts were drawn.', requires: ['crawl-trace'], present: true,
            a: '“Then someone drew them.” A pause. “Rufus drew them. He was testing the room. He did that before every run-through.” She looks at the hatch. “You are not suggesting I climbed through a six-foot service duct in a suit.”',
            gives: ['priya-denial'] },
          { q: 'Rufus was selling the company and cutting you out.', requires: ['sale-contract'], present: true,
            a: 'The stillness breaks for half a second. “He was selling the rooms I built. My rooms. After fourteen years.” She straightens her cuff. “Yes, I was angry. I had a right to be angry. That does not make me a murderer.”',
            gives: ['priya-motive'], flags: ['priyaBroke'] },
          { q: 'Your jacket has a grey fibre and grease on the sleeve.', requires: ['grey-jacket'], present: true,
            a: '“It is a grey jacket. Half the city owns a grey jacket.” She looks at the sleeve. “The grease is from the lathe. I have been cutting keys all week.” A long pause. “You have a log and a fibre. You do not have a witness. Rufus was alone in that room.”',
            gives: ['priya-break'], flags: ['priyaBroke'] }
        ],
        after: 'She asks whether the sale will still go through. You tell her a death usually concentrates the mind of a buyer. She almost smiles.'
      },
      {
        id: 'lottie', name: 'Lottie Renn', role: 'Actress · game master on duty', location: 'theatre', locationName: 'The old theatre', tag: 'Suspect',
        portrait: { seed: 'lottie-renn', hair: 'wavy', hairColor: '#c9a24a', skin: 1, expression: 'sad', collar: 'coat', eyes: '#3a2159' },
        intro: 'Twenty-nine, still in half her stage makeup, with a cigarette she is not supposed to be smoking. She was the game master on Friday night. She was also, briefly, Rufus’s partner.',
        questions: [
          { q: 'You were the game master. Why did the players wait forty minutes?', requires: ['guestbook'],
            a: '“Because the override kept failing.” She stubs out the cigarette. “I tried the panel in reception. It said room three was still in play. Priya was in the control room. I assumed she was handling it.” She looks away. “I should have gone down there myself.”',
            gives: ['lottie-statement'] },
          { q: 'When did you last see Rufus?', requires: ['timeline'],
            a: '“At six. He was in the workshop, cutting a key. He said he had a meeting at half seven and he wanted the room perfect.” She frowns. “He was in a strange mood. Excited and sad at the same time. He said, ‘After Thursday, none of this will be mine.’”',
            gives: ['lottie-last'] },
          { q: 'You and Rufus were involved.', requires: ['rufus-phone'],
            a: '“For eight months. It ended badly.” She looks at her reflection in the mirror. “He was married to the company. I was a room he could leave.” She stubs out the cigarette again, though it is already out. “I did not kill him. I would have made a scene first.”',
            gives: ['lottie-relationship'] },
          { q: 'Priya was in your play. What was she like?', requires: ['playbill'],
            a: '“Terrifying.” She smiles without warmth. “She played a woman who locks her sister in a cellar and then calls the police to report her missing. Four nights. She was word-perfect every time.” She pauses. “I thought it was acting.”',
            gives: ['lottie-priya'] }
        ],
        after: 'She asks whether Priya has been arrested. When you do not answer, she says, “It is always the quiet one. Everyone knows that.”'
      },
      {
        id: 'owen', name: 'Owen Grieve', role: 'Locksmith · room maintenance', location: 'workshop', locationName: 'The workshop', tag: 'Witness',
        portrait: { seed: 'owen-grieve', hair: 'buzz', hairColor: '#8d8d99', skin: 0, expression: 'neutral', collar: 'apron', glasses: 'square', age: 'old' },
        intro: 'Fifty-two, with the flat hands of a man who works with small mechanisms. He installed the maglocks in all three rooms. He is not happy to be here.',
        questions: [
          { q: 'Could room three be locked from the outside?', requires: ['cipher-note'],
            a: '“Only with the override.” He taps the panel. “The maglock is fail-secure. If you cut the power, it stays locked. If you use the override, it opens for sixty seconds and then re-locks. It logs the user.” He looks at you. “It is not a perfect system. But it does not lie.”',
            gives: ['owen-system'] },
          { q: 'What about the crawlspace?', requires: ['crawl-trace'],
            a: '“Rufus insisted. Fire regulations. It bolts from the room side, but the bolts are brass and the frame is old. A child could draw them from outside with a wire.” He shrugs. “I told him to fit a second lock. He said it would ruin the game.”',
            gives: ['owen-crawl'] },
          { q: 'Did anyone ask you for a duplicate key?', requires: ['missing-key'],
            a: '“Not me.” He thinks. “But the key blanks are on the shelf. Anyone with a lathe could cut one. Priya uses the lathe more than Rufus. She built the mechanisms for room one.” He looks at the empty hook. “I noticed that key was missing on Wednesday. I assumed Rufus had it.”',
            gives: ['owen-key'] },
          { q: 'Who knew about the override code?', requires: ['override-log'],
            a: '“Rufus, Priya, and me. It is in the maintenance folder, but the folder is kept in the office. The code is room number and opening date. Anyone who has read the folder knows it.” He looks at the control room. “Priya wrote the folder.”',
            gives: ['owen-code'] }
        ],
        after: 'He offers to show you the maglock wiring. You tell him it will not be necessary. He looks relieved.'
      }
    ],
    clues: {
      'body-note': {
        name: 'Rufus Kettle — post-mortem note', caption: 'Blunt trauma · brass residue', icon: 'blood', type: 'Forensic report',
        desc: 'A depressed fracture at the right temple with brass residue in the wound. Death between 19:40 and 20:00. No defensive wounds.',
        tells: 'He was struck with a brass object from the room itself, by someone he did not expect to fight.'
      },
      'brass-piece': {
        name: 'Brass star key', caption: 'In Rufus’s hand · wiped clean', icon: 'tool', type: 'Weapon',
        desc: 'The final puzzle key, heavy and star-shaped, with brass residue in the teeth. It has been wiped clean of fingerprints.',
        tells: 'The murder weapon was a prop. The killer knew the room and cleaned up afterwards.'
      },
      'crawl-trace': {
        name: 'Crawlspace trace', caption: 'Grey fibre · grease · drawn bolts', icon: 'fiber', type: 'Trace evidence',
        desc: 'A grey fibre, a dust scuff, and fresh grease on the hatch frame. The bolts were drawn from inside — or with a wire from outside.',
        tells: 'The killer left through the crawlspace. The locked room was a stage trick.'
      },
      'cipher-note': {
        name: 'The wall cipher', caption: '“OPEN FROM THE OTHER SIDE”', icon: 'lock', type: 'Puzzle solution',
        desc: 'The final wall cipher decodes to a staff instruction: the crawlspace hatch opens from the other side.',
        tells: 'The riddle was not for players. It was a maintenance note disguised as a puzzle.'
      },
      'guestbook': {
        name: 'Booking book', caption: '19:30 run-through · 19:58 override', icon: 'ledger', type: 'Record',
        desc: 'A private run-through at 19:30, a public booking at 20:00, and a 19:58 override entry in Priya’s hand.',
        tells: 'Rufus and Priya were alone in the building before the players arrived.'
      },
      'rufus-phone': {
        name: 'Rufus’s phone', caption: '“We need to talk about the sale.”', icon: 'phone', type: 'Device',
        desc: 'The last messages between Rufus and Priya, arranging a 19:30 meeting in room three to discuss the sale and the cap table.',
        tells: 'Priya knew exactly where Rufus would be and when.'
      },
      'app-log': {
        name: 'Control-room admin log', caption: '19:52 override · P.SHAH', icon: 'laptop', type: 'Digital evidence',
        desc: 'Priya Shah’s account disabled the room-three maglock for sixty seconds at 19:52. The utility corridor door opened at 19:53.',
        tells: 'The room was opened from outside while Rufus was inside it. Priya was at the controls.'
      },
      'override-log': {
        name: 'Override panel log', caption: '19:52 · control tablet', icon: 'lockbox', type: 'Access record',
        desc: 'The maintenance panel records a room-three override at 19:52, entered from the control-room tablet under Priya’s user account.',
        tells: 'The only person who opened the room that night was Priya.'
      },
      'cam-feed': {
        name: 'Corridor camera stills', caption: 'Priya in control 19:48–19:52', icon: 'cctv', type: 'Surveillance',
        desc: 'Priya enters the control room at 19:48 in a grey jacket, leaves at 19:52 with a tablet and keys, and does not return until 20:35.',
        tells: 'She had the means and the window. The utility corridor has no camera.'
      },
      'toolmark': {
        name: 'Freshly cut key', caption: 'Brass filings · vice marks', icon: 'tool', type: 'Physical evidence',
        desc: 'A half-finished star key in the vice, with fresh filings and tool marks matching the key in Rufus’s hand.',
        tells: 'Someone made a duplicate of the final key within the last day.'
      },
      'missing-key': {
        name: 'Empty key hook', caption: '“CIPHER — FINAL”', icon: 'key', type: 'Physical evidence',
        desc: 'The key rack has fourteen hooks and thirteen keys. The missing one is labelled “CIPHER — FINAL”.',
        tells: 'The original key was taken. The key in Rufus’s hand may not be the murder weapon at all.'
      },
      'design-notes': {
        name: 'Room three design notes', caption: 'Crawlspace: staff only', icon: 'note', type: 'Document',
        desc: 'The design folder marks the service crawlspace and its internal bolts. A marginal note in Rufus’s hand: “Do not tell players.”',
        tells: 'Only staff knew the crawlspace existed. The killer was staff.'
      },
      'sale-contract': {
        name: 'Draft sale agreement', caption: 'Priya struck from the cap table', icon: 'ledger', type: 'Contract',
        desc: 'A sale agreement for Locked In, signed by Rufus. Priya’s name has been removed from the cap table and replaced with a small settlement.',
        tells: 'Priya was about to lose the company she co-founded. She had a motive for rage.'
      },
      'playbill': {
        name: 'The Locked Room playbill', caption: 'Lottie and Priya · closed last week', icon: 'news', type: 'Personal item',
        desc: 'A two-woman show about two women who destroy each other over a house. Priya played the woman who locks her sister in a cellar.',
        tells: 'Priya has spent a month rehearsing exactly this kind of crime.'
      },
      'priya-tablet': {
        name: 'Control-room tablet', caption: 'Override screen still open', icon: 'laptop', type: 'Digital evidence',
        desc: 'The tablet from the control room, logged in as P.SHAH, with the room-three override screen still open.',
        tells: 'The override was entered from this device, by this user, at 19:52.'
      },
      'grey-jacket': {
        name: 'Grey jacket', caption: 'Fibre in the cuff · grease on the sleeve', icon: 'mask', type: 'Physical evidence',
        desc: 'A grey jacket hanging in Priya’s office, with a grey fibre in the cuff and a smear of grease on the sleeve.',
        tells: 'The jacket matches the camera and the crawlspace trace. Priya went through the service duct.'
      },
      'sale-email': {
        name: 'Rufus’s sale email', caption: '“Priya is out.”', icon: 'letter', type: 'Digital evidence',
        desc: 'A printed email from Rufus to the buyer confirming that Priya would receive “the agreed settlement and nothing more”.',
        tells: 'Priya’s motive is documented in Rufus’s own words.'
      },
      'hidden-cache': {
        name: 'Workshop cache', caption: 'Duplicate key · gloves · tablet', icon: 'search', type: 'Physical evidence',
        desc: 'A hidden set of items in the workshop: a duplicate brass key, used nitrile gloves, the control tablet, and a fresh scrape by the hatch.',
        tells: 'The killer prepared the duplicate key and the escape route in advance.'
      },
      'timeline': {
        name: 'Last hour timeline', caption: '19:22 → 19:55', icon: 'clock', type: 'Analysis',
        desc: 'Rufus texted Priya, entered the room, and died. Priya entered the control room, used the override, and left through the utility corridor before the players arrived.',
        tells: 'There is no version of the night in which Priya was not at the controls when the room was opened.'
      },
      'priya-alibi': {
        name: 'Priya’s first account', caption: '“I was in the control room.”', icon: 'audio', type: 'Statement',
        desc: 'Priya claims she was checking the maglocks and never entered room three. The control log supports the first half and contradicts the second.',
        tells: 'She admits the location but not the act.'
      },
      'priya-story': {
        name: 'Priya on the override', caption: '“I thought he was ignoring me.”', icon: 'note', type: 'Statement',
        desc: 'Priya says she opened the room because Rufus did not answer, then assumed he had left by the back.',
        tells: 'She had a reason to open the room. She also had a reason to lie about what she found.'
      },
      'priya-denial': {
        name: 'Priya on the crawlspace', caption: '“You think I climbed through a duct?”', icon: 'audio', type: 'Statement',
        desc: 'Priya dismisses the idea that she used the crawlspace, pointing to her suit and her size.',
        tells: 'The crawlspace is six feet long and the hatch is two feet wide. A determined person could fit.'
      },
      'priya-motive': {
        name: 'Priya’s motive', caption: '“My rooms. After fourteen years.”', icon: 'audio', type: 'Statement',
        desc: 'Confronted with the sale contract, Priya admits she was furious about being cut out of the company she built.',
        tells: 'She had the motive, the access, and the technical knowledge.'
      },
      'priya-break': {
        name: 'Priya’s challenge', caption: '“You do not have a witness.”', icon: 'note', type: 'Statement',
        desc: 'Priya points out that there is no witness to the murder and that the physical evidence is circumstantial.',
        tells: 'She is right about the witness. She is wrong about the room’s own recording.'
      },
      'lottie-statement': {
        name: 'Lottie’s account', caption: '“The override kept failing.”', icon: 'note', type: 'Witness statement',
        desc: 'Lottie was at reception trying the override while Priya was in the control room. The panel kept reporting room three as in play.',
        tells: 'Priya was the only person with control-room access during the critical window.'
      },
      'lottie-last': {
        name: 'Lottie’s last sighting', caption: '“After Thursday, none of this will be mine.”', icon: 'note', type: 'Witness statement',
        desc: 'Lottie saw Rufus in the workshop at six, cutting a key and talking about the sale. He seemed excited and sad.',
        tells: 'Rufus knew the sale was coming. He did not know Priya had seen the contract.'
      },
      'lottie-relationship': {
        name: 'Lottie and Rufus', caption: 'Eight months · ended badly', icon: 'audio', type: 'Interview',
        desc: 'Lottie admits a brief relationship with Rufus. It ended when she realised she came second to the company.',
        tells: 'Lottie had a motive for anger, but she was at reception when the override was used.'
      },
      'lottie-priya': {
        name: 'Lottie on Priya', caption: '“I thought it was acting.”', icon: 'note', type: 'Interview',
        desc: 'Lottie describes Priya’s performance as a woman who locks her sister in a cellar and reports her missing.',
        tells: 'Priya had been rehearsing the psychology of a locked-room disappearance for a month.'
      },
      'owen-system': {
        name: 'Owen on the maglock', caption: '“It does not lie.”', icon: 'lock', type: 'Technical statement',
        desc: 'The maglock is fail-secure. Only the override can open it, and every override is logged with a user.',
        tells: 'The room was opened by the override. The log names the user.'
      },
      'owen-crawl': {
        name: 'Owen on the crawlspace', caption: '“A child could draw those bolts.”', icon: 'note', type: 'Technical statement',
        desc: 'The crawlspace bolts are brass and the frame is old. They can be drawn from outside with a wire.',
        tells: 'The “locked from inside” detail is not the barrier it appears to be.'
      },
      'owen-key': {
        name: 'Owen on the duplicate key', caption: '“Priya uses the lathe more than Rufus.”', icon: 'audio', type: 'Interview',
        desc: 'Owen says the key blanks are unsecured and Priya is the more experienced machinist.',
        tells: 'Priya had the skill to cut the duplicate key.'
      },
      'owen-code': {
        name: 'Owen on the override code', caption: '“Priya wrote the folder.”', icon: 'note', type: 'Interview',
        desc: 'The override code is in the maintenance folder, which Priya wrote and kept in the office.',
        tells: 'Priya knew the code without needing to look it up.'
      }
    },
    solution: {
      minEvidence: 12,
      questions: [
        { q: 'Who killed Rufus Kettle?',
          options: [
            { t: 'Lottie Renn — the actress and game master', v: 'lottie' },
            { t: 'Owen Grieve — the locksmith who installed the maglocks', v: 'owen' },
            { t: 'Priya Shah — the co-founder he was cutting out of the sale', v: 'priya' },
            { t: 'Rufus himself — a botched attempt to test the room’s safety', v: 'rufus' }
          ], answer: 'priya' },
        { q: 'How did the killer leave a room locked from the inside?',
          options: [
            { t: 'Through the service crawlspace, after opening the maglock from the control room', v: 'crawl' },
            { t: 'Through the painted-shut window, which had been loosened', v: 'window' },
            { t: 'By hiding in the room until the players arrived', v: 'hide' },
            { t: 'By using a duplicate key to lock the door from outside', v: 'key' }
          ], answer: 'crawl' },
        { q: 'What was the motive?',
          options: [
            { t: 'Rufus was selling the company and cutting Priya out of the cap table', v: 'sale' },
            { t: 'Rufus was going to expose Priya’s affair with Owen', v: 'affair' },
            { t: 'Priya wanted the insurance money on Rufus’s life', v: 'insurance' },
            { t: 'Rufus had stolen the design for room three from Priya', v: 'design' }
          ], answer: 'sale' },
        { q: 'Which evidence breaks the case?',
          options: [
            { t: 'The 19:52 override log and the crawlspace fibre on Priya’s jacket', v: 'override' },
            { t: 'The brass key in Rufus’s hand', v: 'key' },
            { t: 'Lottie’s account of the failing override panel', v: 'lottie' },
            { t: 'The cipher on the wall', v: 'cipher' }
          ], answer: 'override' }
      ],
      verdict: {
        who: 'Priya Shah, 38 — co-founder of Locked In',
        whoDesc: 'was arrested in her office and charged with murder. She maintained that she had only opened the room to look for Rufus.',
        how: 'She struck Rufus with the brass star key during their private meeting, climbed out through the service crawlspace, and used the control-room override to re-lock the room from outside.',
        why: 'Rufus had sold the company without her and removed her from the cap table. She had built the rooms he was selling. She killed him in the one room that could make his death look like an accident.',
        key: 'The 19:52 override under Priya’s account, the utility corridor door opening at 19:53, and the grey fibre from her jacket caught on the crawlspace frame.'
      },
      reveal: [
        'Locked In was Priya’s idea. She found the empty basement, built the first room with a second-hand lathe, and painted the signs herself. Rufus designed the puzzles. Priya built the mechanisms that made them work. By the time the company was worth selling, the paperwork said otherwise.',
        'On Thursday morning Rufus signed a sale agreement with a leisure group. The cap table had been rewritten. Priya’s name was gone, replaced by a settlement that would have bought her a small flat and nothing else. He did not tell her. He planned to tell her after the sale.',
        'She found the draft in the workshop on Friday afternoon. She printed his email to the buyer: “Priya is out. The sale completes Thursday. She will get the agreed settlement and nothing more.” Then she sent him a message asking to talk about the sale.',
        'Rufus replied at 19:24: “Then we talk tonight. Room 3. 19:30.” He thought they were going to argue about money. He was already cutting a duplicate key at the lathe.',
        'Priya came to the room with the duplicate key in her pocket and a plan she had been rehearsing since the theatre. She waited until Rufus turned to the plinth. Then she struck him once with the brass star key. He fell against the plinth. The watch on his wrist stopped at 19:47.',
        'She climbed through the crawlspace, drawing the bolts behind her with a length of wire. In the control room she entered the override code, opened the maglock for sixty seconds, and watched the utility corridor light turn green. Then she walked back to reception and waited for the players.',
        'The room was a perfect locked-room mystery. The door was maglocked. The windows were painted shut. The crawlspace was bolted from the inside. The only flaw was the control log, and the only flaw in the control log was that it recorded everything.',
        'The grey fibre in her jacket cuff came from the crawlspace insulation. The grease on her sleeve came from the hatch frame. The duplicate key was still in her desk drawer, under a printout of the sale email.',
        'Rufus built one final puzzle without meaning to. The room’s own recorder, hidden in the countdown clock, captured the last four minutes of his life. On the recording, Priya says: <i>“You always did like a locked room, Rufus.”</i> Then the sound of the key, and the door.'
      ],
      quote: 'You always did like a locked room, Rufus.',
      twist: 'The final detail was the cipher itself. Rufus had designed it as a maintenance instruction, not a clue. Priya solved it weeks earlier while testing the room — and used it to plan the murder. She did not crack the puzzle to escape. She cracked it to make sure no one else could.'
    }
  });
})();
