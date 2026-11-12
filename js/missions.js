/* ============================================================
   UNDERCOVER MISSIONS — dialogue, objectives, heat, failure
   Compromise locks the case for 10 real minutes (persisted).
   ============================================================ */
(function () {
  'use strict';
  const A = window.Art;
  const G = window.Game;
  const S = window.SH;
  const esc = A.esc;

  /* ============================================================
     MISSION DEFINITIONS
     ============================================================ */
  const MISSIONS = S.MISSIONS = [
    {
      id: 'm-glasshouse',
      title: 'The Glasshouse',
      sub: 'A private auction. A ledger that should not exist.',
      caseId: null,
      kind: 'Standalone operation',
      cover: { kind: 'theatre', mood: 'gala' },
      brief: 'A courier named Ivo Marchetti is selling a stolen ledger to a private collector. You have one hour inside the auction to photograph the sale and leave without being made.',
      reward: 'Unlocks a permanent contact: <b>Ivo owes you a favour</b>. Later files may offer new openings.',
      objectives: ['Enter the auction as a buyer', 'Find the ledger room', 'Photograph the sale', 'Leave clean'],
      intro: 'g1',
      scenes: {
        g1: {
          art: { kind: 'theatre', mood: 'gala' },
          cap: 'THE GLASSHOUSE · MAIN HALL · 21:10',
          text: ['Crystal, low light, and a string quartet playing something expensive. Your invitation says <b>Mr A. Fen</b>, a collector from the north. Nobody checks the name twice.'],
          say: { who: 'Door steward', line: 'Your card, sir. And your plus-one?' },
          choices: [
            { t: '"I came alone. The plus-one is a rumour."', next: 'g2', heat: 0, note: 'The steward smiles. Alone is normal at this hour.' },
            { t: 'Hand over a forged card with a second name on it.', next: 'g2', heat: 2, note: 'The steward studies the card a beat too long, then waves you through.' },
            { t: '"I am here for the Marchetti sale. Take me to the ledger."', next: 'fail', fail: true, note: 'The steward\'s smile freezes. Two men in grey are already moving.' }
          ]
        },
        g2: {
          art: { kind: 'theatre', mood: 'gala' },
          cap: 'THE GLASSHOUSE · GALLERY',
          text: ['The auction lots are arranged like evidence: a bronze horse, a signed first edition, a cabinet of insects. Ivo Marchetti stands by the east door, pretending to admire a painting of a shipwreck.'],
          say: { who: 'Ivo Marchetti', line: 'You are Fen. The one who pays in cash. Good. The ledger is upstairs, but the collector brought friends.' },
          choices: [
            { t: '"Then we do this quietly. Which room?"', next: 'g3', heat: 0, clue: 'glasshouse_ledger', note: 'He taps two fingers against his glass: second floor, west.' },
            { t: '"Who are the friends?"', next: 'g3', heat: 1, clue: 'glasshouse_buyer', note: 'Ivo names the collector. The name is not a surprise. It is a warning.' },
            { t: 'Follow the two grey men without telling Ivo.', next: 'g3b', heat: 2, note: 'You learn the service stairs, and nearly learn what a security door feels like.' }
          ]
        },
        g3: {
          art: { kind: 'theatre', mood: 'gala' },
          cap: 'SECOND FLOOR · WEST CORRIDOR',
          text: ['The corridor is papered in dark green. A maid carries a tray of empty glasses. At the far end, a door is open just wide enough to show lamplight and the corner of a leather book.'],
          say: { who: 'Maid', line: 'The auction is downstairs, sir. Guests are not permitted up here.' },
          choices: [
            { t: 'Show the invitation and say you were asked to appraise a lot.', next: 'g4', heat: 0, objective: 1 },
            { t: 'Wait for her to pass, then slip through the door.', next: 'g4', heat: 1, objective: 1 },
            { t: 'Take the tray and pretend to be staff.', next: 'g4', heat: 2, objective: 1, note: 'It works. It also puts your face in front of three more people than necessary.' }
          ]
        },
        g3b: {
          art: { kind: 'theatre', mood: 'gala' },
          cap: 'SERVICE STAIRS',
          text: ['The service stairs smell of polish and cigarettes. Through the fire door you can hear two men arguing about a delivery that never arrived. One of them uses the word <i>ledger</i>.'],
          say: { who: 'Grey man', line: 'The buyer is upstairs. If Marchetti tries to change the price, we take the book and the money.' },
          choices: [
            { t: 'Photograph them through the crack in the door.', next: 'g4', heat: 1, clue: 'glasshouse_buyer' },
            { t: 'Back away and find the west corridor.', next: 'g4', heat: 1 },
            { t: 'Step out and bluff that you are the buyer.', next: 'fail', fail: true, note: 'You are not the buyer. They know it before you finish the sentence.' }
          ]
        },
        g4: {
          art: { kind: 'office', mood: 'gala' },
          cap: 'THE LEDGER ROOM',
          text: ['The ledger lies open beneath a green banker\'s lamp. Names, dates, sums. The collector is across the table, writing a cheque with a fountain pen. He does not look up.'],
          say: { who: 'The collector', line: 'Fen. I wondered which side you would sell to.' },
          choices: [
            { t: 'Photograph the open page while he signs.', next: 'g5', heat: 1, clue: 'glasshouse_page', objective: 2 },
            { t: 'Ask him who the ledger protects.', next: 'g5', heat: 2, clue: 'glasshouse_protect', objective: 2 },
            { t: 'Take the ledger and run.', next: 'fail', fail: true, note: 'The room has two doors. Both of them have men behind them.' }
          ]
        },
        g5: {
          art: { kind: 'street', mood: 'gala' },
          cap: 'SERVICE ALLEY · 22:02',
          text: ['Rain has started again. Ivo is waiting by the bins, smoking a cigarette he does not inhale. Behind you, the auction continues, oblivious.'],
          say: { who: 'Ivo Marchetti', line: 'Did you get it? Then go. And Fen — if this comes back to me, I was never here.' },
          choices: [
            { t: 'Leave through the alley without a word.', next: 'g-end', heat: 0, objective: 3 },
            { t: 'Tell him he owes you a favour.', next: 'g-end', heat: 0, objective: 3, note: 'He laughs once. It is not a happy sound, but it is agreement.' }
          ]
        },
        'g-end': {
          end: true,
          art: { kind: 'street', mood: 'gala' },
          cap: 'EXFILTRATION COMPLETE',
          text: ['You are three streets away before the shaking starts. In your pocket, the photograph is sharp enough to read.', 'Ivo Marchetti leaves the country by morning. The ledger page stays with you.'],
          rewardFlags: ['contact_ivo'],
          rewardText: 'Contact established: Ivo Marchetti.'
        }
      }
    },

    {
      id: 'm-quiet',
      title: 'The Quiet Room',
      sub: 'A members\' club where nobody gives a real name.',
      caseId: null,
      kind: 'Standalone operation',
      cover: { kind: 'diner', mood: 'club' },
      brief: 'An informant will meet you in the back room of the Candle Club. Find out who their handler is before the club closes. Do not give your real name, and do not accept a drink you did not see poured.',
      reward: 'Unlocks a permanent contact: <b>the Candle Club doorman</b> will pass you one name in a later file.',
      objectives: ['Get past the doorman', 'Find the informant', 'Identify the handler', 'Leave before the shutters come down'],
      intro: 'q1',
      scenes: {
        q1: {
          art: { kind: 'diner', mood: 'club' },
          cap: 'THE CANDLE CLUB · 23:20',
          text: ['The club is all velvet and cigarette smoke. A doorman with a boxer\'s nose watches the room in the mirror behind the bar.'],
          say: { who: 'Doorman', line: 'Members only. Or a name that means something.' },
          choices: [
            { t: '"Tell him the lighthouse is dark."', next: 'q2', heat: 0, note: 'A password from an old file. The doorman steps aside.' },
            { t: '"I am here to see the quiet room."', next: 'q2', heat: 2, note: 'He looks at you for a long moment, then nods at the curtain.' },
            { t: 'Try to walk past him.', next: 'fail', fail: true, note: 'He does not move. Two men behind you do.' }
          ]
        },
        q2: {
          art: { kind: 'diner', mood: 'club' },
          cap: 'THE BAR',
          text: ['A woman in a grey suit sits alone with two glasses. One is full. One is empty. She watches you in the mirror.'],
          say: { who: 'Woman in grey', line: 'You are late. Sit down. The man who followed you is at the end of the bar.' },
          choices: [
            { t: 'Sit, but do not touch either glass.', next: 'q3', heat: 0, clue: 'quiet_glass', note: 'She notices. Something in her shoulders relaxes.' },
            { t: 'Drink from the full glass.', next: 'q3', heat: 2, note: 'It is water. Your mouth is dry. Your instincts are slower than they should be.' },
            { t: 'Turn and look at the man at the end of the bar.', next: 'q3b', heat: 2, note: 'He sees you see him. The game changes.' }
          ]
        },
        q3: {
          art: { kind: 'diner', mood: 'club' },
          cap: 'THE QUIET ROOM',
          text: ['Behind the curtain: a table, a lamp, and a ledger of favours. The woman closes the door.'],
          say: { who: 'Woman in grey', line: 'My handler takes a cut of every job in this room. I want out. But I need a name that will survive a courtroom.' },
          choices: [
            { t: '"Give me the ledger. I will do the rest."', next: 'q4', heat: 0, clue: 'quiet_ledger', objective: 2 },
            { t: '"The man at the bar. Is he your handler?"', next: 'q4', heat: 1, clue: 'quiet_handler', objective: 2 },
            { t: '"I can get you out. Trust me."', next: 'q4', heat: 2, note: 'She studies you. Trust is a currency she does not spend cheaply.' }
          ]
        },
        q3b: {
          art: { kind: 'diner', mood: 'club' },
          cap: 'THE BAR · EYES MEET',
          text: ['The man at the bar lifts his glass an inch. A greeting, or a warning. The woman in grey has already stood up.'],
          say: { who: 'Man at the bar', line: 'She is not who she says. Neither are you. Sit down.' },
          choices: [
            { t: 'Sit. Ask who he works for.', next: 'q4', heat: 1, clue: 'quiet_handler', objective: 2 },
            { t: 'Follow the woman through the curtain.', next: 'q4', heat: 1, objective: 2 },
            { t: 'Show him the photograph from the Glasshouse.', next: 'fail', fail: true, note: 'He recognises the photograph. He also recognises that you should not have it.' }
          ]
        },
        q4: {
          art: { kind: 'diner', mood: 'club' },
          cap: 'THE QUIET ROOM · 23:51',
          text: ['The ledger is open. The names are written in three different hands. The woman in grey puts a finger on one of them and does not lift it.'],
          say: { who: 'Woman in grey', line: 'That is the handler. If I disappear, that name is the only thing that will speak for me.' },
          choices: [
            { t: 'Memorise the name and close the ledger.', next: 'q-end', heat: 0, clue: 'quiet_name', objective: 2 },
            { t: 'Photograph the page.', next: 'q-end', heat: 1, clue: 'quiet_name', objective: 2 },
            { t: 'Ask her to write it down and sign it.', next: 'q-end', heat: 2, clue: 'quiet_name', objective: 2 }
          ]
        },
        'q-end': {
          end: true,
          art: { kind: 'street', mood: 'club' },
          cap: 'THE SHUTTERS COME DOWN',
          text: ['You leave through the kitchen. The doorman holds the door and does not ask your name.', 'By dawn the Candle Club is closed for renovation. The name in your pocket is still good.'],
          rewardFlags: ['contact_doorman'],
          rewardText: 'Contact established: the Candle Club doorman.'
        }
      }
    },

    {
      id: 'm-false-identity',
      title: 'Operation: False Identity',
      sub: 'Enter the Gilt Room as a buyer. Find the leak.',
      caseId: 'c25',
      kind: 'Case operation · Case 25',
      cover: { kind: 'hotel', mood: 'club' },
      brief: 'The Meridian network is selling access to a police evidence transfer. You will pose as <b>Dane Rook</b>, a fixer from the coast. Identify which member of the organisation is leaking to the other side — and leave with proof.',
      reward: 'Delivers the <b>wiretap recording</b> and the <b>attendee roster</b> to Case 25.',
      objectives: ['Establish the Dane Rook identity', 'Read the room', 'Find the leak', 'Record the confession', 'Exfiltrate'],
      intro: 'f1',
      scenes: {
        f1: {
          art: { kind: 'hotel', mood: 'club' },
          cap: 'THE GILT ROOM · PRIVATE LOBBY',
          text: ['The Gilt Room is a members\' hotel with no sign and no register. A woman with silver hair checks your shoes before your face.'],
          say: { who: 'Host', line: 'Dane Rook. You are younger than your photograph. Who sent you?' },
          choices: [
            { t: '"Marta sent me. She said the room was short of honest men."', next: 'f2', heat: 0, note: 'The name lands. Marta is not a person you should know, but the host only nods.' },
            { t: '"I sent myself. I have money and I heard there was a sale."', next: 'f2', heat: 2, note: 'Greed is believable. Greed also makes you a target.' },
            { t: '"I am here for the police transfer. Take me to your boss."', next: 'fail', fail: true, note: 'Too fast. Too certain. The host lifts one finger and the doors close.' }
          ]
        },
        f2: {
          art: { kind: 'hotel', mood: 'club' },
          cap: 'THE LOUNGE · 22:40',
          text: ['Five people. A nervous accountant, a broad man with a signet ring, a woman in a green coat, a young courier, and the host. One of them is feeding information to the other side.'],
          say: { who: 'Broad man', line: 'Rook. You missed the auction. We are discussing the transfer. The police are moving a witness at midnight.' },
          choices: [
            { t: 'Ask who inside the organisation knew the route.', next: 'f3', heat: 0, clue: 'gilt_route', note: 'The accountant flinches. The woman in green does not.' },
            { t: 'Offer to pay double for the route.', next: 'f3', heat: 2, clue: 'gilt_offer', note: 'Money makes people honest about their price, not their loyalty.' },
            { t: 'Watch their hands instead of their faces.', next: 'f3', heat: 1, clue: 'gilt_hands', note: 'The courier keeps touching his left cuff. A tell, or a habit.' }
          ]
        },
        f3: {
          art: { kind: 'hotel', mood: 'club' },
          cap: 'THE BAR · 23:05',
          text: ['The woman in green finds you at the bar. She orders nothing. Her coat is still on, as if she might leave at any moment.'],
          say: { who: 'Woman in green', line: 'You are not Dane Rook. Dane Rook has a scar on his left hand. I checked.' },
          choices: [
            { t: '"Then you know what I am. Help me and I will help you."', next: 'f4', heat: 1, clue: 'gilt_green', objective: 2 },
            { t: '"Dane Rook had a scar. I had it removed."', next: 'f4', heat: 2, note: 'She does not believe you, but she lets it stand.' },
            { t: 'Walk away without answering.', next: 'f4', heat: 1, note: 'Walking away is an answer. She lets you go.' }
          ]
        },
        f4: {
          art: { kind: 'office', mood: 'club' },
          cap: 'THE MANAGER\'S OFFICE',
          text: ['The host is waiting with a recorder on the desk. Not a hidden one. A recorder, placed deliberately, its red light on.'],
          say: { who: 'Host', line: 'The leak is not me. It is the courier. He has been selling our routes for six weeks. I want you to hear him say it.' },
          choices: [
            { t: 'Ask the courier to repeat the route and the buyer.', next: 'f5', heat: 1, clue: 'gilt_confession', objective: 2 },
            { t: 'Check the recorder is running before anyone speaks.', next: 'f5', heat: 0, clue: 'gilt_recorder', objective: 3 },
            { t: 'Accuse the woman in green instead.', next: 'fail', fail: true, note: 'The room goes quiet. You have named the one person who was trying to help you.' }
          ]
        },
        f5: {
          art: { kind: 'office', mood: 'club' },
          cap: 'THE CONFESSION',
          text: ['The courier is brought in. He looks at the recorder, then at you. He does not run.'],
          say: { who: 'Courier', line: 'They paid me in instalments. The transfer route, the times, the two officers on the door. I did not know anyone would be hurt.' },
          choices: [
            { t: 'Let him finish. Say nothing.', next: 'f-end', heat: 0, clue: 'gilt_recording', objective: 3 },
            { t: 'Ask who paid him.', next: 'f-end', heat: 1, clue: 'gilt_buyer', objective: 3 },
            { t: 'Take the recorder and leave immediately.', next: 'f-end', heat: 2, clue: 'gilt_recording', objective: 3 }
          ]
        },
        'f-end': {
          end: true,
          art: { kind: 'street', mood: 'club' },
          cap: 'EXFILTRATION · 23:58',
          text: ['You walk out with the recorder in your coat and the host watching from the door. At the corner, a black car starts its engine and does not follow.', 'The recording is enough. The leak has a name, a voice, and a buyer.'],
          rewardClues: ['gilt_recording', 'gilt_roster'],
          rewardFlags: ['mission_m25'],
          rewardText: 'Case 25 evidence delivered: the wiretap and the attendee roster.'
        }
      }
    },

    {
      id: 'm-relay',
      title: 'The Relay',
      sub: 'A dead transmitter. A living signal.',
      caseId: 'c26',
      kind: 'Case operation · Case 26',
      cover: { kind: 'lighthouse', mood: 'storm' },
      brief: 'The last transmission came from a decommissioned relay station on the north cliff. Pose as a maintenance engineer, restore the transmitter, and copy the final archive before the tide cuts the causeway.',
      reward: 'Delivers the <b>relay log</b> and <b>origin bearing</b> to Case 26.',
      objectives: ['Pass the site check', 'Restore the relay', 'Copy the archive', 'Leave before the tide'],
      intro: 'r1',
      scenes: {
        r1: {
          art: { kind: 'lighthouse', mood: 'storm' },
          cap: 'NORTH CLIFF RELAY · 18:20',
          text: ['The station is a concrete box with a rusted aerial. A security man meets you at the gate with a clipboard and no umbrella.'],
          say: { who: 'Site guard', line: 'Maintenance? You are not on the sheet. Who signed the work order?' },
          choices: [
            { t: '"Coastal Signals. The order went to the old depot by mistake."', next: 'r2', heat: 0, note: 'He checks a number that does not exist, then waves you in. Bureaucracy is a lock with a weak pin.' },
            { t: '"Your transmitter has been bleeding into a police band for three days. I am here to stop it."', next: 'r2', heat: 2, note: 'The lie is technical enough to be true. He looks worried.' },
            { t: 'Show a badge you do not have.', next: 'fail', fail: true, note: 'He has seen that badge before. It belongs to someone else.' }
          ]
        },
        r2: {
          art: { kind: 'lighthouse', mood: 'storm' },
          cap: 'TRANSMITTER ROOM',
          text: ['The relay is dead. A meter on the wall is frozen at 00:00. Someone has pulled the main fuse and left it on the bench, as if they wanted the machine found but not heard.'],
          say: { who: 'Site guard', line: 'I am not supposed to leave you alone in here. But I am not paid enough to stand in the cold.' },
          choices: [
            { t: 'Wait for him to leave, then open the panel.', next: 'r3', heat: 0, objective: 1 },
            { t: 'Ask him who else has been in the room.', next: 'r3', heat: 1, clue: 'relay_visitor', objective: 1 },
            { t: 'Force the panel with a screwdriver.', next: 'r3', heat: 2, note: 'It opens. It also leaves a mark that a real engineer would never make.' }
          ]
        },
        r3: {
          art: { kind: 'server', mood: 'storm' },
          cap: 'RELAY CONTROL · POWER RESTORED',
          text: ['The console wakes in stages. A log scrolls past: carrier lost, carrier regained, a burst transmission at 02:14, then nothing. The final entry is addressed to no one.'],
          say: { who: 'Console', line: 'ARCHIVE PARTIAL. LAST TRANSMISSION: 02:14:07. ORIGIN BEARING: 312°. DURATION: 11 SECONDS.' },
          choices: [
            { t: 'Copy the archive to your drive.', next: 'r4', heat: 0, clue: 'relay_log', objective: 2 },
            { t: 'Cross-check the bearing against the coastal map.', next: 'r4', heat: 0, clue: 'relay_bearing', objective: 2 },
            { t: 'Transmit a test signal to see who answers.', next: 'r4', heat: 3, note: 'Something answers. It is not a voice. It is a carrier tone, and it does not stop.' }
          ]
        },
        r4: {
          art: { kind: 'lighthouse', mood: 'storm' },
          cap: 'THE CAUSEWAY · 19:02',
          text: ['The tide is already over the road. The guard is standing at the door with his coat on, watching the water.'],
          say: { who: 'Site guard', line: 'You have ten minutes before the causeway is gone. I am not staying for the second tide.' },
          choices: [
            { t: 'Take the archive and run for the causeway.', next: 'r-end', heat: 1, objective: 3 },
            { t: 'Ask him why the station was decommissioned.', next: 'r4b', heat: 1, clue: 'relay_reason' },
            { t: 'Stay and try to recover the erased portion.', next: 'r4b', heat: 2, note: 'The second tide is not a rumour. It takes the lower road.' }
          ]
        },
        r4b: {
          art: { kind: 'server', mood: 'storm' },
          cap: 'LAST MINUTE · ARCHIVE',
          text: ['The erased portion is not gone. It is overwritten with a single loop: a woman\'s voice, counting down from ten. Under it, a second signal.'],
          say: { who: 'Recovered audio', line: '— six — five — the light is out — four — tell them the relay was never dead —' },
          choices: [
            { t: 'Copy the recovered fragment.', next: 'r-end', heat: 1, clue: 'relay_fragment', objective: 2 },
            { t: 'Wipe the console and run.', next: 'r-end', heat: 0, objective: 3 },
            { t: 'Try to trace the second signal live.', next: 'fail', fail: true, note: 'The trace runs the wrong way. It finds you instead.' }
          ]
        },
        'r-end': {
          end: true,
          art: { kind: 'lighthouse', mood: 'storm' },
          cap: 'CAUSEWAY CROSSED · 19:11',
          text: ['The water reaches your ankles on the last stretch. Behind you, the relay light blinks once and goes dark.', 'In the car, the archive plays. Eleven seconds of a voice you have heard before — and a bearing that points at the one place the engineer was never supposed to be.'],
          rewardClues: ['relay_log', 'relay_bearing'],
          rewardFlags: ['mission_m26'],
          rewardText: 'Case 26 evidence delivered: the relay log and the origin bearing.'
        }
      }
    },

    {
      id: 'm-nightshift',
      title: 'Night Shift',
      sub: 'Six hours of footage. One missing minute.',
      caseId: 'c29',
      kind: 'Case operation · Case 29',
      cover: { kind: 'server', mood: 'night' },
      brief: 'The monitoring system at Kellard House recorded an incident, then lost four minutes. Pose as a night-shift security contractor and copy the raw feed before the system purges at dawn.',
      reward: 'Delivers the <b>raw footage fragment</b>, the <b>badge log</b> and your <b>undercover recording</b> to Case 29.',
      objectives: ['Get into the control room', 'Preserve the raw feed', 'Identify the gap', 'Leave before the purge'],
      intro: 'n1',
      scenes: {
        n1: {
          art: { kind: 'server', mood: 'night' },
          cap: 'KELLARD HOUSE · SERVICE ENTRANCE · 01:10',
          text: ['The building is asleep except for the server room. A contractor lanyard hangs on the night desk, left there for you by someone who wants this copied.'],
          say: { who: 'Night supervisor', line: 'You are the new contractor? The last one quit without notice. Sign here and do not touch the archive.' },
          choices: [
            { t: 'Sign the sheet with the name on the lanyard.', next: 'n2', heat: 0, note: 'The signature matches a man who has been dead for two years.' },
            { t: '"My paperwork is electronic. Check your inbox."', next: 'n2', heat: 2, note: 'There is no email. He is too tired to look twice.' },
            { t: 'Ask why the last contractor left.', next: 'n2', heat: 1, clue: 'night_contractor' }
          ]
        },
        n2: {
          art: { kind: 'server', mood: 'night' },
          cap: 'CONTROL ROOM · 01:26',
          text: ['Twelve monitors, one chair, cold coffee. The archive is already open. At 02:14, four cameras lose signal at once. At 02:18, they come back.'],
          say: { who: 'Supervisor', line: 'The system does a maintenance purge at dawn. Whatever is in the buffer now is all you get.' },
          choices: [
            { t: 'Copy the raw buffer to an external drive.', next: 'n3', heat: 0, clue: 'night_raw', objective: 1 },
            { t: 'Check which cameras failed first.', next: 'n3', heat: 0, clue: 'night_gap', objective: 2 },
            { t: 'Replay the missing window from the backup server.', next: 'n3', heat: 2, note: 'The backup is not on this floor. The request logs your session.' }
          ]
        },
        n3: {
          art: { kind: 'server', mood: 'night' },
          cap: 'TIMELINE WALL',
          text: ['The four cameras cover the east corridor, the lift lobby, the archive door, and the car park. Their clocks disagree by minutes. One clock was changed at 02:09.'],
          say: { who: 'Supervisor', line: 'I did not touch that clock. I was on my rounds. You can check the door log.' },
          choices: [
            { t: 'Compare the door log to the camera timestamps.', next: 'n4', heat: 0, clue: 'night_badge', objective: 2 },
            { t: 'Ask the supervisor to account for his rounds.', next: 'n4', heat: 1, clue: 'night_rounds' },
            { t: 'Accuse him of changing the clock.', next: 'n4', heat: 2, note: 'He denies it. Too quickly. But denial is not proof.' }
          ]
        },
        n4: {
          art: { kind: 'server', mood: 'night' },
          cap: 'ARCHIVE DOOR · 02:14',
          text: ['The archive door opens. A figure in a high-vis jacket enters, face turned from camera. The badge reader logs a card — not the supervisor\'s. Not the contractor\'s.'],
          say: { who: 'Supervisor', line: 'That card was reported lost last week. I logged it myself. Does that help you or hang me?' },
          choices: [
            { t: '"It helps you. The card was used after you logged it lost."', next: 'n5', heat: 0, clue: 'night_card', objective: 2 },
            { t: 'Copy the badge number and say nothing.', next: 'n5', heat: 1, clue: 'night_card', objective: 2 },
            { t: 'Ask him to unlock the archive room now.', next: 'n5', heat: 3, note: 'He refuses. The refusal is loud enough to wake the building.' }
          ]
        },
        n5: {
          art: { kind: 'server', mood: 'night' },
          cap: 'PURGE IMMINENT · 04:52',
          text: ['The dawn purge warning turns the room amber. The supervisor watches the screen, then you.'],
          say: { who: 'Supervisor', line: 'If you take that drive out of here, I will be the one answering questions. Tell me what you found.' },
          choices: [
            { t: 'Show him the corrupted timestamp.', next: 'n-end', heat: 0, objective: 3 },
            { t: 'Tell him the truth: the footage clears him.', next: 'n-end', heat: 0, objective: 3 },
            { t: 'Leave without answering.', next: 'n-end', heat: 1, objective: 3 }
          ]
        },
        'n-end': {
          end: true,
          art: { kind: 'street', mood: 'night' },
          cap: 'PURGE AVOIDED · 05:02',
          text: ['You walk out with the drive in your jacket. Behind you, the monitors blink through their morning routine.', 'The missing four minutes are not missing any more. Neither is the person who made them.'],
          rewardClues: ['night_raw', 'night_badge', 'night_audio2'],
          rewardFlags: ['mission_m29'],
          rewardText: 'Case 29 evidence delivered: the raw footage, the badge log and your undercover recording.'
        }
      }
    }
  ];

  function byId(id) { return MISSIONS.find(m => m.id === id); }

  /* ============================================================
     RUN STATE
     ============================================================ */
  function saveRuns() { G.persist(); }
  function runs() { G.save.missionRuns = G.save.missionRuns || {}; return G.save.missionRuns; }
  function done(id) {
    if (G.save.missions && G.save.missions[id] && G.save.missions[id].done) return true;
    const def = byId(id);
    if (def && def.caseId) {
      const p = G.progress(def.caseId);
      return !!(p.flags && p.flags['mission_' + id.replace(/^m-/, '')]);
    }
    return false;
  }
  function cooldownKey(def) { return def.caseId || ('mission:' + def.id); }

  function grant(def) {
    G.save.missions = G.save.missions || {};
    G.save.missions[def.id] = { done: true, at: Date.now() };
    G.save.stats.missions = (G.save.stats.missions || 0) + 1;
    const endNode = Object.keys(def.scenes || {}).map(k => def.scenes[k]).find(n => n && n.end) || {};
    const rewardClues = def.rewardClues || endNode.rewardClues || [];
    const rewardFlags = (def.rewardFlags || []).concat(endNode.rewardFlags || []);
    const rewardText = def.rewardText || endNode.rewardText || 'Operation complete.';
    if (def.caseId) {
      const p = G.progress(def.caseId);
      rewardClues.forEach(cid => { if (!p.found.includes(cid)) p.found.push(cid); });
      ['mission_' + def.id.replace(/^m-/, '')].concat(rewardFlags).forEach(f => { p.flags[f] = true; });
      if (p.log) p.log.push({ k: 'sys', t: 'UNDERCOVER COMPLETE - ' + def.title + '. ' + rewardText });
    } else if (rewardFlags.length) {
      G.save.missionFlags = G.save.missionFlags || {};
      rewardFlags.forEach(f => { G.save.missionFlags[f] = true; });
    }
    G.ach('undercover');
    G.sound('achieve');
    S.haptic('achieve');
    G.persist();
  }

  /* ============================================================
     CONTROLLER
     ============================================================ */
  const Mission = S.Mission = {
    list() { return MISSIONS; },
    def: byId,
    done,
    available(def) {
      if (def.caseId) {
        const c = G.caseById(def.caseId);
        if (!c) return false;
        const p = G.progress(def.caseId);
        return p.opened || p.found.length > 0;
      }
      return true;
    },

    /* ---------- dossier ---------- */
    dossier(opts) {
      opts = opts || {};
      const rows = MISSIONS.map(def => {
        const isDone = done(def.id);
        const left = G.coolLeft(cooldownKey(def));
        const visible = this.available(def) || isDone;
        if (opts.caseId && def.caseId !== opts.caseId) return '';
        if (!opts.all && !visible) return '';
        const tag = isDone ? '<span class="tag done">COMPLETE</span>'
          : left ? '<span class="tag">LOCKED ' + G.coolText(left) + '</span>'
            : '<span class="tag">AVAILABLE</span>';
        return `<div class="mission-card">
          <div class="thumb">${A.scene((def.cover || {}).kind || 'street', def.cover || {})}</div>
          <div><b>${esc(def.title)}</b><p>${esc(def.sub)}</p>${tag}
            <button class="btn btn-sm ${isDone ? '' : 'btn-primary'}" style="margin-left:8px" data-mission="${esc(def.id)}" ${left ? 'disabled' : ''}>
              ${isDone ? 'Review' : left ? 'Locked' : 'Deploy'}</button></div>
        </div>`;
      }).join('') || '<div class="st-empty small">No operations available for this file yet.</div>';
      const m = G.modal({
        title: 'Undercover Operations', sub: 'Fictional missions · failures carry a real lockout', icon: 'mask', wide: true,
        body: '<p class="board-help">Operations are controlled game scenarios. A failed mission is a <b style="color:#fda4af">MISSION COMPROMISED</b>: the file is sealed for ten real minutes, your progress in that case is wiped, and you must start the case again.</p>' + rows,
        footer: '<button class="btn" id="misClose">Close dossier</button>'
      });
      m.modal.querySelector('#misClose').onclick = m.close;
      m.modal.querySelectorAll('[data-mission]').forEach(b => b.onclick = () => {
        m.close();
        setTimeout(() => Mission.start(b.dataset.mission), 120);
      });
    },

    /* ---------- start / resume ---------- */
    start(id) {
      const def = byId(id);
      if (!def) return;
      const key = cooldownKey(def);
      const left = G.coolLeft(key);
      if (left) { this.renderCompromised(def, left); return; }
      const run = runs()[id] = runs()[id] || { node: def.intro, heat: 0, done: [], at: Date.now() };
      G.activeMission = def;
      G.missionRun = run;
      this.show();
    },

    show() {
      const def = G.activeMission;
      const run = G.missionRun;
      if (!def || !run) return;
      G.showScreen('mission');
      document.body.classList.remove('ws-mode');
      document.title = def.title + ' — Undercover';
      if (S.Audio) S.Audio.music('suspense');
      this.render();
    },

    render() {
      const def = G.activeMission, run = G.missionRun;
      if (!def || !run) return;
      const root = document.getElementById('screen-mission');
      const node = def.scenes[run.node];
      if (!node) { run.node = def.intro; return this.render(); }

      const heat = Math.min(5, run.heat || 0);
      const heatBars = Array.from({ length: 5 }, (_, i) => `<i class="${i < heat ? 'on' : ''}"></i>`).join('');
      const obj = (def.objectives || []).map((o, i) =>
        `<div class="ob ${(run.done || []).includes(i) ? 'done' : ''}"><span class="m">${(run.done || []).includes(i) ? '✓' : '○'}</span><span>${esc(o)}</span></div>`).join('');

      let body = '';
      if (node.end) {
        body = `<div class="mission-copy">${(node.text || []).map(p => `<p>${p}</p>`).join('')}
          <div class="verdict-note good" style="margin-top:14px">${esc(node.rewardText || 'Operation complete.')}</div></div>
          <div class="mission-choices"><button class="btn btn-primary" id="misDone">Return to the workshop</button></div>`;
      } else {
        const choices = (node.choices || []).map((ch, i) => {
          const dis = (ch.fail && heat >= 5);
          return `<button class="mission-choice" data-ch="${i}" ${dis ? 'disabled' : ''}>
            <span class="n">${String(i + 1).padStart(2, '0')}</span>${esc(ch.t)}</button>`;
        }).join('');
        body = `<div class="mission-scene">${A.scene((node.art || def.cover || {}).kind || 'street', node.art || def.cover || {})}<div class="cap">${esc(node.cap || '')}</div></div>
          <div class="mission-objectives">${obj}</div>
          <div class="mission-copy">
            ${(node.text || []).map(p => `<p>${p}</p>`).join('')}
            ${node.say ? `<div class="say"><b>${esc(node.say.who)}:</b> “${node.say.line}”</div>` : ''}
          </div>
          <div class="mission-choices">${choices}</div>
          <div class="mission-hud"><span>Heat <b>${heat}/5</b></span><span>Objectives <b>${(run.done || []).length}/${def.objectives.length}</b></span><span>File <b>${esc(def.caseId ? def.caseId.toUpperCase() : 'STANDALONE')}</b></span></div>`;
      }

      root.innerHTML = `<div class="mission-shell">
        <header class="mission-top">
          <button class="btn icon-btn" id="misBack" title="Abort operation">${A.icon('back')}</button>
          <div><div class="k">Undercover · ${esc(def.kind || 'Operation')}</div><h1>${esc(def.title)}</h1></div>
          <div class="heat"><span>HEAT</span><div class="heat-bars">${heatBars}</div></div>
        </header>
        <div class="mission-stage"><div class="mission-panel">${body}</div></div>
      </div>`;

      const back = root.querySelector('#misBack');
      if (back) back.onclick = () => this.abort();
      const doneBtn = root.querySelector('#misDone');
      if (doneBtn) doneBtn.onclick = () => {
        grant(def);
        delete runs()[def.id];
        G.activeMission = null; G.missionRun = null;
        saveRuns();
        if (S.Workshop) S.Workshop.show();
      };
      root.querySelectorAll('[data-ch]').forEach(b => b.onclick = () => this.choose(+b.dataset.ch));
    },

    choose(i) {
      const def = G.activeMission, run = G.missionRun;
      const node = def.scenes[run.node];
      const ch = (node.choices || [])[i];
      if (!ch) return;
      G.sound('click');
      if (ch.fail) return this.fail('Your cover broke.');
      if (ch.heat) {
        run.heat = (run.heat || 0) + ch.heat;
        if (run.heat >= 5) return this.fail('Too many eyes. Too many questions.');
      }
      if (ch.clue) {
        // local mission clues are narrative only until the mission grants its case bundle
        run.evidence = run.evidence || [];
        if (!run.evidence.includes(ch.clue)) run.evidence.push(ch.clue);
      }
      if (ch.objective != null && !(run.done || []).includes(ch.objective)) {
        run.done = run.done || [];
        run.done.push(ch.objective);
      }
      if (ch.note) {
        G.toast('<b>' + esc(ch.note) + '</b>', 'mask', 4200);
      }
      run.node = ch.next;
      S.haptic(ch.heat >= 2 ? 'warn' : 'tick');
      if (ch.heat >= 2) G.sound('warn');
      saveRuns();
      this.render();
    },

    abort() {
      const def = G.activeMission;
      G.modal({
        title: 'Abort operation?', sub: 'Leaving early is not the same as failing — but the file stays open.', icon: 'mask',
        body: '<p>You can return to the workshop and resume this operation later. Progress inside the mission is saved.</p>',
        footer: '<button class="btn" id="abNo">Stay in the field</button><button class="btn btn-primary" id="abYes">Withdraw</button>'
      });
      const m = document.querySelector('#modal-root .modal-back:last-child');
      if (!m) return;
      m.querySelector('#abNo').onclick = () => m.remove();
      m.querySelector('#abYes').onclick = () => {
        m.remove();
        G.activeMission = null; G.missionRun = null;
        if (S.Workshop) S.Workshop.show();
      };
    },

    fail(reason) {
      const def = G.activeMission;
      if (!def) return;
      const key = cooldownKey(def);
      delete runs()[def.id];
      G.startCooldown(key);
      G.save.stats.failedMissions = (G.save.stats.failedMissions || 0) + 1;
      saveRuns();
      G.sound('alarm');
      S.haptic('warn');
      this.renderCompromised(def, G.coolLeft(key), reason);
    },

    renderCompromised(def, ms, reason) {
      const root = document.getElementById('screen-mission');
      G.showScreen('mission');
      document.body.classList.remove('ws-mode');
      document.title = 'Mission Compromised';
      if (S.Audio) S.Audio.music('suspense');
      const draw = () => {
        const left = G.coolLeft(cooldownKey(def));
        root.innerHTML = `<div class="mission-shell">
          <header class="mission-top">
            <button class="btn icon-btn" id="cBack" title="Workshop">${A.icon('back')}</button>
            <div><div class="k">Undercover · connection lost</div><h1>Operation sealed</h1></div>
            <div class="heat"><span>HEAT</span><div class="heat-bars">${'<i class="on"></i>'.repeat(5)}</div></div>
          </header>
          <div class="mission-stage"><div class="mission-panel compromised">
            <div class="big">MISSION<br>COMPROMISED</div>
            <div class="sub">Your cover is blown</div>
            <p>${esc(reason || 'The room turned. Your identity did not survive the second question.')} In the fiction of this operation, the investigator is captured and the file is lost.</p>
            <p>Case ${esc(def.caseId ? def.caseId.replace(/^c/, '') : '')} is sealed for ten minutes. All progress in that file has been reset. The clock is saved — it keeps running if you close the page.</p>
            <div class="cooldown-clock" id="coolClock">${left ? G.coolText(left) : '00:00'}</div>
            <div class="cooldown-note">${left ? 'File sealed · restart from the beginning' : 'Seal lifted · return to the workshop'}</div>
            <div style="margin-top:24px"><button class="btn btn-primary" id="cBack2">${left ? 'Return to the workshop' : 'Back to the workshop'}</button></div>
          </div></div>
        </div>`;
        const go = () => {
          G.activeMission = null; G.missionRun = null;
          if (S.Workshop) S.Workshop.show();
        };
        root.querySelector('#cBack').onclick = go;
        root.querySelector('#cBack2').onclick = go;
        if (!left) return;
        const t = setInterval(() => {
          if (!document.body.contains(root) || !root.querySelector('#coolClock')) { clearInterval(t); return; }
          const n = G.coolLeft(cooldownKey(def));
          root.querySelector('#coolClock').textContent = G.coolText(n);
          if (!n) {
            clearInterval(t);
            root.querySelector('.cooldown-note').textContent = 'Seal lifted · return to the workshop';
            root.querySelector('#coolClock').textContent = '00:00';
          }
        }, 1000);
      };
      draw();
    }
  };
})();
