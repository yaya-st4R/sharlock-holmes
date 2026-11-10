/* ============================================================
   CASES 05–07
   ============================================================ */
(function () {
  'use strict';
  const C = window.SH.cases;

  /* ------------------------------------------------------------
     CASE 05 — THE QUIET WARD
     ------------------------------------------------------------ */
  C.push({
    id: 'c05', num: 5,
    title: 'The Quiet Ward',
    subtitle: 'A patient dies of an insulin overdose in a hospital where the cameras were down for maintenance.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'hospital', mood: 'night' },
    facts: [
      { k: 'Victim', v: 'Jonah Reed, 34 — clinical trial volunteer' },
      { k: 'Scene', v: 'Ward 4, St Alder Hospital' },
      { k: 'Found', v: '06:10 — by the night nurse' },
      { k: 'Cause', v: 'Acute insulin overdose' }
    ],
    briefing: [
      'Jonah Reed was not a sick man. He was a volunteer in a paid drug trial, admitted for observation, healthy enough to complain about the food. At six in the morning the night nurse found him cold in bed with an empty saline bag still hooked to his arm.',
      'The bag contained insulin. Jonah was not diabetic. The dose was four times what a diabetic patient would take in a day. The hospital’s drug cabinet log says the cabinet was opened at 22:15 with a valid code. The ward camera says the corridor was empty. The camera was wrong: it had been switched off for “maintenance” at 22:00.',
      'The trial is run by Dr Linus Hale, a man with a research grant, a waiting list of volunteers, and a reputation for results that nobody has been able to reproduce. Jonah had been asking questions about the data for a week.',
      'A healthy man, a silent ward, and a bag of insulin that nobody signed for. The hospital calls it a tragic error. The error has a code, and the code has an owner.'
    ],
    opening: 'Ward 4 is too quiet. The machines have been switched off. Jonah Reed lies under a sheet with one arm outside it, still taped where the line went in. The tape is the wrong colour for the ward. That is the sort of detail hospitals never notice and detectives cannot forget.',
    objectives: [
      'Establish how the insulin reached Jonah Reed’s line.',
      'Open the drug cabinet and identify the code used.',
      'Reconstruct who was in Ward 4 between 22:00 and 23:30.',
      'Find what Jonah Reed discovered about the trial.'
    ],
    locations: [
      {
        id: 'ward', name: 'Ward 4', short: 'Ward 4', time: '07:05',
        art: { kind: 'hospital', mood: 'night' },
        intro: 'Four beds, three empty, one screened off. The window is sealed. The observation desk is at the far end of the corridor, with a clear view of every door — when there is someone sitting at it.',
        actions: [
          {
            id: 'bed', label: 'Examine Jonah’s bed', icon: 'blood', hotspot: { x: 46, y: 62 },
            desc: 'The line, the bag, the tape', gives: ['chart', 'saline-bag'],
            text: [
              'The saline bag is empty and still hanging. The port has been punctured twice: once by the nurse’s needle, once by something larger. The second puncture is ragged, as though the additive was pushed in through a wider gauge.',
              'The tape holding the cannula is pink. Every other bed in Ward 4 uses blue tape. The pink roll is kept in the trial cupboard, not the ward stock.',
              'On the chart, the 22:00 observations are signed by a nurse who was not on shift. The signature is a loop that looks like <b>P.S.</b>, but the handwriting belongs to someone who usually signs in capitals.'
            ]
          },
          {
            id: 'roommate', label: 'Question the patient in bed 2', icon: 'user',
            desc: 'He was awake most of the night', gives: ['roommate-statement'],
            text: [
              'Bed 2 is a retired teacher with a broken hip and no interest in being helpful. He is, however, bored. “The doctor came in at half ten. Not the night one — the important one. Dr Hale. He had a bag from the pharmacy.”',
              '“He pulled the curtain round and stayed maybe four minutes. I heard the stand rattle. Then he left without saying anything. Jonah was asleep. He was always asleep by then.”',
              'He thinks for a moment. “The nurse came later. The young one. She looked at the bag and went white. She did not call anyone for a long time.”'
            ]
          },
          {
            id: 'martin', label: 'Interview Martin Reed', icon: 'user', suspect: 'martin',
            desc: 'Jonah’s brother · first in the building', hint: 'Martin was called before the police. Ask why he was already outside.'
          }
        ]
      },
      {
        id: 'pharmacy', name: 'Hospital pharmacy', short: 'Pharmacy', time: '08:30',
        art: { kind: 'lab', mood: 'hospital' }, requires: ['saline-bag'],
        intro: 'A locked room with a hatch, a fridge, and a cabinet of controlled drugs that is supposed to be impossible to open without two signatures. The cabinet is open. The signature book is open at a page that has been torn out.',
        actions: [
          {
            id: 'cabinet', label: 'Crack the drug cabinet log', icon: 'lock', kind: 'puzzle', puzzle: 'drug-cabinet',
            desc: 'A keypad with a shared code', requires: ['saline-bag'],
            hint: 'The cabinet code is rotated weekly. The current code is written on the whiteboard — upside down.'
          },
          {
            id: 'priya', label: 'Interview Priya Shah', icon: 'user', suspect: 'priya',
            desc: 'Night nurse · found the body', hint: 'Priya was on shift. She saw the bag before anyone else.'
          },
          {
            id: 'mix', label: 'Recreate the infusion', icon: 'flask', kind: 'puzzle', puzzle: 'infusion',
            desc: 'What was in the bag, and in what order', requires: ['cabinet-log'], optional: true,
            hint: 'The bag was saline first, then the additive. The lab notes list the sequence.'
          }
        ]
      },
      {
        id: 'station', name: 'Nurse station', short: 'Station', time: '10:10',
        art: { kind: 'hospital', mood: 'desk' }, requires: ['cabinet-log'],
        intro: 'A curved desk with three monitors and a wall of whiteboards. The duty roster has been wiped clean except for one name. The ward diary is open at the night of the death.',
        actions: [
          {
            id: 'duty', label: 'Reconstruct the night shift', icon: 'clock', kind: 'puzzle', puzzle: 'shift-grid',
            desc: 'Who was where when the cabinet opened', requires: ['cabinet-log'],
            hint: 'Cross-check the cabinet code, the ward diary, and the observations chart. Only one person fits every entry.'
          },
          {
            id: 'notes', label: 'Read the ward diary', icon: 'note',
            desc: 'The night’s entries, including the gaps', requires: ['cabinet-log'], gives: ['nurse-notes'],
            text: [
              'The diary is typed, not handwritten, which is unusual. Every entry has a timestamp and a staff code. At 22:00 there is a gap of forty minutes. The next entry reads: <b>“22:40 — Dr Hale — routine review — no issues.”</b>',
              'The 22:40 entry is the only one on the page with no staff code. It has been entered with an administrator override.',
              'At 23:10, a note in Priya Shah’s hand: <b>“Saline bag replaced. Dr Hale informed. Told not to escalate.”</b>'
            ]
          },
          {
            id: 'camera', label: 'Check the corridor camera', icon: 'cctv',
            desc: 'The forty minutes the camera was off', requires: ['cabinet-log'], gives: ['camera-gap'],
            text: [
              'The camera was disabled at 22:00 from the internal maintenance console. The login was an administrator account. There was no maintenance ticket.',
              'The console log shows the same account logged in again at 23:12 and re-enabled the camera. The account belongs to Dr Linus Hale.',
              'In the corridor outside Ward 4, a cleaner’s trolley was parked across the camera’s view for the entire forty minutes. The cleaner was on his break. He did not park it there.'
            ]
          }
        ]
      },
      {
        id: 'morgue', name: 'Hospital morgue', short: 'Morgue', time: '12:15',
        art: { kind: 'morgue', mood: 'cold' }, requires: ['shift-grid'],
        intro: 'Four steel drawers, one occupied, and a pathologist who has been waiting for someone to ask him a real question. The room is kept at four degrees. It feels warmer than the ward.',
        actions: [
          {
            id: 'autopsy', label: 'Read the autopsy', icon: 'blood',
            desc: 'Insulin, timing, and a missing vial', gives: ['autopsy-report', 'insulin-vial'],
            text: [
              'The pathologist does not look up. “Acute insulin overdose. Blood glucose near zero. Time of death between 22:30 and 23:00. He would have gone into a coma within twenty minutes and died within the hour.”',
              '“Here is the part your friends at the hospital will not like. The insulin in his blood is not ward stock. It is trial-grade, concentrated, and it comes in vials that are only issued to the trial team.”',
              'He holds up a small glass vial in an evidence bag. “This was in the waste bin in the pharmacy. Empty. The label has been removed, but the batch number is etched into the glass. Trial batch 44. The trial’s own supply.”'
            ]
          },
          {
            id: 'records', label: 'Check the death record', icon: 'ledger',
            desc: 'A second death with the same signature', requires: ['autopsy-report'], gives: ['death-log'],
            text: [
              'The morgue log for the last eighteen months lists 214 deaths. Three of them are marked <b>“unexpected — clinical trial”</b>. All three were healthy volunteers. All three died at night. All three had their observations signed by the same doctor.',
              'The first two were recorded as “cardiac events”. The families were paid settlements. The paperwork is signed by the hospital’s legal office, not the coroner.',
              'In the margin beside the third entry, in the pathologist’s hand: <i>“Nobody asked me about the first two.”</i>'
            ]
          }
        ]
      },
      {
        id: 'office', name: 'Dr Hale’s office', short: 'Hale’s office', time: '14:40',
        art: { kind: 'office', mood: 'hospital' }, requires: ['autopsy-report'],
        intro: 'A corner office with a view of the car park and a bookshelf full of journals with Dr Linus Hale’s name on the spine. He is already there, writing. He does not offer you a seat.',
        actions: [
          {
            id: 'hale', label: 'Interview Dr Linus Hale', icon: 'user', suspect: 'hale',
            desc: 'Trial lead · calm, precise, very tired', hint: 'Hale signed the observations and disabled the camera. Ask him about the forty minutes.'
          },
          {
            id: 'desk', label: 'Search the office', icon: 'search',
            desc: 'Trial data, a grant letter, a locked drawer', gives: ['trial-data'],
            text: [
              'The desk is immaculate except for one drawer that does not close. Inside: a folder marked <b>“PHASE II — INTERIM”</b> and a letter from the funding body, dated three weeks ago.',
              'The trial data is a work of art. Twenty volunteers, all with identical responses, all with side-effect profiles copied from a different study. The numbers are too clean. Real data is messy; this data has been arranged.',
              'The grant letter says the funding will be withdrawn unless the trial reaches its primary endpoint by the end of the month. Handwritten at the top, in Hale’s hand: <b>“J.R. is asking questions. Handle it.”</b>'
            ]
          },
          {
            id: 'pc', label: 'Open Hale’s trial laptop', icon: 'terminal', kind: 'puzzle', puzzle: 'hale-pc',
            desc: 'A deleted email and a second data set', requires: ['trial-data'],
            hint: 'Hale’s password is not a name. It is the number of the trial phase he cannot afford to lose.'
          }
        ]
      }
    ],
    puzzles: {
      'drug-cabinet': {
        type: 'keypad', title: 'The Drug Cabinet', subtitle: 'Weekly rotating code', icon: 'lock',
        deviceLabel: 'CONTROLLED DRUGS — ST ALDER', length: 4, code: '4471',
        prompt: 'A cabinet that requires two signatures and a four-digit code. The signature book has been torn. The whiteboard in the pharmacy still has the week’s code on it, written upside down.',
        hintText: 'Turn the whiteboard code the right way up: 1744 becomes 4471. The cabinet has not been re-coded since Monday.',
        success: 'The cabinet log opens. Code 4471 was used at 22:15 from the pharmacy terminal. The staff ID attached to the entry is HALE, L. — trial lead.',
        successTitle: 'The log opens.',
        gives: ['cabinet-log'], flags: ['cabinetOpen'],
        short: 'The drug cabinet log names Hale.',
        log: 'The drug cabinet was opened at 22:15 with code 4471 and the staff ID of Dr Linus Hale.'
      },
      infusion: {
        type: 'mix', title: 'What Was in the Bag', subtitle: 'Recreate the infusion', icon: 'flask',
        reagents: [
          { name: 'Saline', color: '#93c5fd' },
          { name: 'Insulin (trial)', color: '#fbbf24' },
          { name: 'Potassium', color: '#c084fc' },
          { name: 'Glucose', color: '#6ee7b7' }
        ],
        order: [0, 2, 1, 3],
        prompt: 'The lab has reconstructed the bag’s contents from the residue. Add the reagents in the order the hospital’s own infusion protocol requires — the order that would keep a patient alive.',
        note: 'Saline first, then the electrolyte, then the active agent, then the flush. One wrong drop and the sample is ruined.',
        hintText: 'Saline is the base. Potassium goes in before insulin. Glucose is the final flush.',
        success: 'The sequence resolves: saline, potassium, insulin, glucose. The bag was a real infusion — with the insulin dose increased by a factor of forty.',
        successTitle: 'The infusion is reconstructed.',
        gives: ['compound-analysis'], flags: ['mixDone'],
        short: 'The insulin dose was forty times normal.',
        log: 'The infusion contained a forty-fold insulin dose, added in a sequence consistent with someone who knew the protocol.'
      },
      'shift-grid': {
        type: 'logicgrid', title: 'The Night Shift', subtitle: 'Cross-check three records', icon: 'clock',
        prompt: 'The cabinet log, the ward diary, and the observations chart disagree. Only one combination fits every timestamp. The camera gap ran from 22:00 to 22:40.',
        rows: [
          { label: 'Cabinet code used at 22:15 by', selects: [{ label: 'staff', options: [{ t: 'Priya Shah', v: 'priya' }, { t: 'Linus Hale', v: 'hale' }, { t: 'Martin Reed', v: 'martin' }], answer: 'hale' }] },
          { label: 'Ward 4 entered at 22:25 by', selects: [{ label: 'person', options: [{ t: 'Priya Shah', v: 'priya' }, { t: 'Linus Hale', v: 'hale' }, { t: 'the cleaner', v: 'cleaner' }], answer: 'hale' }] },
          { label: 'Observation chart signed at 22:40 by', selects: [{ label: 'signature', options: [{ t: 'Priya Shah', v: 'priya' }, { t: 'Linus Hale', v: 'hale' }, { t: 'an unknown visitor', v: 'unknown' }], answer: 'hale' }] }
        ],
        hintText: 'The cabinet log names Hale. The diary’s 22:40 entry has no staff code and an administrator override. Hale was the only person with both.',
        success: 'Every record points the same way. Hale opened the cabinet, entered Ward 4 during the camera gap, and signed the observations himself.',
        wrong: 'Cross-check the timestamps. The nurse was at the station; the cleaner was on his break; only one person appears in all three records.',
        gives: ['shift-grid'], flags: ['gridDone'],
        short: 'Hale was the only person unaccounted for.',
        log: 'The night-shift grid places Hale at the cabinet at 22:15, in Ward 4 at 22:25, and signing the 22:40 observations.'
      },
      'hale-pc': {
        type: 'terminal', title: 'Hale’s Trial Laptop', subtitle: 'Phase II — deleted files', icon: 'terminal',
        user: 'lhale', host: 'st-alder-trial-01', password: 'two',
        intro: 'The laptop wakes to a trial dashboard. Twenty volunteers, all green, all perfect. A deleted folder called OLD_DATA is still in the recycle bin. Type "help" for commands.',
        banner: 'PHASE II — CONFIDENTIAL. 4 FILES. 1 ENCRYPTED VOLUME.',
        files: [
          { name: 'readme.txt', body: 'Primary endpoint due in 14 days. Do not let the volunteers talk to each other. Do not let J.R. talk to anyone.' },
          { name: 'old_data.csv', body: '<span class="d">VOLUNTEER 04 — J. REED — ADVERSE EVENT LOG</span><br>Day 3: headache. Day 5: reported dizziness. Day 6: <span class="y">requested raw data</span>. Day 7: <span class="r">“I think the numbers are copied.”</span>' },
          { name: 'settlements.pdf', body: '<span class="d">TWO PRIOR SETTLEMENTS — CONFIDENTIAL</span><br>Volunteer 11 — cardiac event — £180,000 — NDA<br>Volunteer 17 — cardiac event — £220,000 — NDA<br><span class="r">BOTH OBSERVATIONS SIGNED: L. HALE</span>' },
          { name: 'phase2_archive.zip', locked: true, hint: 'Encrypted. Hale cannot afford to lose a phase. The password is the phase number.', secret: true, body: '<span class="g">ARCHIVE CONTENTS:</span><br><br>1. <b>email_to_funder.txt</b> — <span class="d">“The interim data is clean. We will hit the endpoint. The volunteer asking questions has been managed.”</span><br><br>2. <b>protocol_note.txt</b> — <span class="y">“If a volunteer becomes a problem, the infusion can be adjusted. Insulin is undetectable after the fact if the bag is replaced.”</span><br><br>3. <b>camera_console.log</b> — <span class="r">22:00 DISABLE — USER L.HALE<br>23:12 ENABLE — USER L.HALE</span><br><br>4. <b>j_reid_last_email.txt</b> — <span class="y">“I have a copy of the real data. I am going to the regulator on Friday. I am not asking for money.”</span>' }
        ],
        hintText: 'The trial is Phase II. Hale thinks in phases, not names. Try the number.',
        success: 'The archive opens. Two prior deaths, two secret settlements, a note describing insulin as “undetectable after the fact”, and Jonah Reed’s last email.',
        successTitle: 'Phase II decrypted.',
        gives: ['trial-emails', 'prior-deaths', 'jonah-email'], flags: ['pcOpen'],
        short: 'Hale’s trial archive is open.',
        log: 'Hale’s laptop contains two prior volunteer deaths, an NDA settlement file, a note about using insulin, and Jonah’s email naming the regulator.'
      }
    },
    suspects: [
      {
        id: 'hale', name: 'Dr Linus Hale', role: 'Trial lead · administrator access', location: 'office', locationName: 'Hale’s office', tag: 'Prime suspect',
        portrait: { seed: 'linus-hale', hair: 'short', hairColor: '#5a4a3a', skin: 0, expression: 'cold', collar: 'doctor', eyes: '#2b1a12', glasses: 'rect' },
        intro: 'Linus Hale is fifty-six, silver-templed, and exhausted in a way that looks expensive. He speaks about Jonah Reed in the past tense with the careful sympathy of a man reading from a statement. His hands are steady. His eyes are not.',
        questions: [
          {
            q: 'Where were you between ten and eleven?', gives: ['hale-alibi'],
            a: '“In my office, reviewing the interim data. I had a grant deadline.” He gestures at the laptop. “I went to the ward at half ten for a routine review. Jonah was asleep. I did not wake him.”',
            follow: 'The ward diary has no staff code for that review. The camera was disabled eleven minutes before it.'
          },
          {
            q: 'The cabinet was opened with your staff ID.', requires: ['cabinet-log'],
            a: '“My ID is shared with the trial team. It is not a password.” He holds your eye. “If you are going to accuse me of stealing insulin, I would like to know why I would use my own code and then leave the log open.”',
            gives: ['hale-deflect'], flags: ['haleHostile']
          },
          {
            q: 'Two volunteers died before Jonah. Both signed by you.', requires: ['prior-deaths'], present: true,
            a: 'The tiredness goes out of his face. What is left is very still. “Those were settlements. They were tragic, but they were settled. The families did not want an inquest.”<br><br>“You are building a pattern out of coincidences. Medicine is full of coincidences. That is what makes it hard.”',
            gives: ['hale-pattern'], flags: ['haleBroke']
          },
          {
            q: 'Jonah found the real data. He was going to the regulator on Friday.', requires: ['jonah-email'], present: true,
            a: 'He looks at the email for a long time. “He was thirty-four. He had a brother and a dog and a ridiculous car. I did not want him to die.” A pause. “I wanted him to stop.”<br><br>“There is a difference. I have been telling myself there is a difference.”',
            gives: ['hale-admission']
          }
        ],
        after: 'He asks whether the trial will be suspended. It is the only question he asks that is not about himself.'
      },
      {
        id: 'priya', name: 'Priya Shah', role: 'Night nurse · found the body', location: 'pharmacy', locationName: 'Pharmacy', tag: 'Witness / suspect',
        portrait: { seed: 'priya-shah', hair: 'long', hairColor: '#1b1b1b', skin: 2, expression: 'worried', collar: 'scrubs', eyes: '#3a2159' },
        intro: 'Priya is twenty-nine and has not slept. She keeps her hands in her pockets and her eyes on the cabinet. She has already told three different people the same story, and each time it comes out a little faster.',
        questions: [
          {
            q: 'Why did you not call anyone when you saw the bag?', gives: ['priya-statement'],
            a: '“I did call. I called Dr Hale. He told me to replace the bag and not to escalate until he got there.” She swallows. “I am a night nurse. When the trial lead tells you not to escalate, you do not escalate. I have a visa.”',
            follow: 'She says the word “visa” the way another person might say “hostage”.'
          },
          {
            q: 'Who signed the 22:00 observations?', requires: ['nurse-notes'],
            a: '“It was not me. I was at the desk. The signature looks a bit like my initials, but I dot my i’s. The chart does not.” She looks at you. “Dr Hale asked me to sign the 23:10 entry. He said it would keep the ward out of it. I refused.”<br><br>“I should have refused the first thing.”',
            gives: ['priya-doubt']
          },
          {
            q: 'You replaced the bag. What did you do with the old one?', requires: ['compound-analysis'],
            a: '“I put it in the pharmacy waste, like he said. I did not think.” She stops. “There was a pink tape on the line. I remember because we do not use pink tape on the ward. The trial cupboard uses pink.”<br><br>“He said Jonah had a reaction to the trial drug. He said it was expected. There was nothing expected about it.”',
            gives: ['priya-tape'], flags: ['priyaTruth']
          }
        ],
        after: 'She gives you the pink tape roll from the trial cupboard. It is identical to the tape on Jonah’s cannula.'
      },
      {
        id: 'martin', name: 'Martin Reed', role: 'Jonah’s brother', location: 'ward', locationName: 'Ward 4', tag: 'Witness / suspect',
        portrait: { seed: 'martin-reed', hair: 'buzz', hairColor: '#2b1a12', skin: 3, expression: 'angry', collar: 'jacket', eyes: '#2b1a12', beard: 'stubble' },
        intro: 'Martin is six years older than Jonah and has been crying in the corridor because he is not allowed to cry in the ward. He came to the hospital at five in the morning, before anyone called him. He says he had a feeling.',
        questions: [
          {
            q: 'How did you know to come in?', gives: ['martin-story'],
            a: '“Jonah texted me at eleven last night. He said, ‘If I do not answer in the morning, go to the hospital and ask for the trial data.’ I thought he was being dramatic.” He wipes his face. “He was always being dramatic. He was also usually right.”',
            follow: 'The message is on his phone. Sent at 23:04, before the nurse replaced the bag.'
          },
          {
            q: 'Why did you arrive before the hospital called you?', requires: ['chart'],
            a: '“Because he did not answer at six. I called the ward. The nurse said he was sleeping. I knew he was not sleeping.” He looks at the screened bed. “I do not know anything about insulin. I know my brother was scared of someone in that trial.”',
            gives: ['martin-alibi']
          },
          {
            q: 'Did Jonah mention anyone by name?', requires: ['trial-data'],
            a: '“He said the doctor had copied the numbers from another study. He had a copy of the real data on a stick. He hid it because he thought they would search his room.” He stops. “Did you find a stick? He said it was in a book.”',
            gives: ['usb-lead']
          }
        ],
        after: 'He asks you to find the USB before the hospital does. He is right to ask.'
      }
    ],
    clues: {
      chart: {
        name: 'Jonah’s observation chart', caption: '22:00 · signature not the nurse’s', icon: 'note', type: 'Medical records',
        desc: 'The 22:00 observations are signed with a loop resembling P.S., in handwriting that belongs to someone who normally signs in capitals. The 22:40 entry has no staff code.',
        tells: 'Someone signed for a nurse who was not there. The chart is not a record of care; it is a record of cover.'
      },
      'saline-bag': {
        name: 'The empty saline bag', caption: 'Double-punctured port · pink tape', icon: 'pill', type: 'Physical evidence',
        desc: 'The port was punctured twice, once with a wide-gauge needle. The cannula is taped with pink tape from the trial cupboard, not the ward’s blue stock.',
        tells: 'The insulin was added to the bag by hand, using trial supplies. This was not a pharmacy error.'
      },
      'roommate-statement': {
        name: 'Bed 2’s account', caption: '“The important one”', icon: 'note', type: 'Witness statement',
        desc: 'Bed 2 saw Dr Hale enter Jonah’s bay at half ten with a pharmacy bag, draw the curtain, stay four minutes, and leave without speaking.',
        tells: 'Hale was alone with Jonah and the bag during the exact window the camera was off.'
      },
      'cabinet-log': {
        name: 'The drug cabinet log', caption: '22:15 · code 4471 · HALE, L.', icon: 'keypad', type: 'Records',
        desc: 'The cabinet was opened at 22:15 with the weekly code and Hale’s staff ID. The signature book page for that date has been torn out.',
        tells: 'Hale took the insulin himself. The torn page shows he knew the signature would be a problem.'
      },
      'compound-analysis': {
        name: 'The infusion analysis', caption: 'Forty times the therapeutic dose', icon: 'flask', type: 'Forensic evidence',
        desc: 'Saline, potassium, insulin, glucose — a real protocol, with the insulin increased forty-fold. The batch matches the trial supply.',
        tells: 'The killer understood the hospital’s infusion protocol well enough to make the bag look routine. This was clinical knowledge, not a mistake.'
      },
      'shift-grid': {
        name: 'The night-shift grid', caption: 'One person, three records', icon: 'clock', type: 'Deduction',
        desc: 'Hale opened the cabinet at 22:15, entered Ward 4 at 22:25, and signed the 22:40 observations. The nurse was at the station; the cleaner was on his break.',
        tells: 'There is no unexplained visitor. The person with the keys, the code, and the clinical knowledge is the trial lead.'
      },
      'nurse-notes': {
        name: 'The ward diary', caption: 'Forty minutes missing', icon: 'note', type: 'Medical records',
        desc: 'A typed diary with a forty-minute gap at 22:00. The 22:40 review has no staff code and an administrator override. The 23:10 entry says “do not escalate”.',
        tells: 'The record was edited after the fact by someone with administrator access. The instruction not to escalate came from above the nurse.'
      },
      'camera-gap': {
        name: 'The camera console', caption: 'Disabled 22:00 · enabled 23:12', icon: 'cctv', type: 'Digital evidence',
        desc: 'The corridor camera was disabled from the maintenance console using Hale’s administrator account. No maintenance ticket exists. A cleaner’s trolley blocked the view.',
        tells: 'Hale created the blind spot and then removed it. The trolley was placed by someone who knew exactly what the camera could see.'
      },
      'autopsy-report': {
        name: 'The autopsy', caption: 'Insulin · death 22:30–23:00', icon: 'blood', type: 'Forensic report',
        desc: 'Acute insulin overdose. Death within an hour. The insulin is trial-grade concentrate from the hospital’s own Phase II supply.',
        tells: 'Jonah died while Hale was in the ward. The drug came from the trial, not the ward stock.'
      },
      'insulin-vial': {
        name: 'The empty vial', caption: 'Batch 44 · label removed', icon: 'pill', type: 'Physical evidence',
        desc: 'An empty trial-grade insulin vial in the pharmacy waste. The label is gone; the batch number is etched into the glass.',
        tells: 'The killer tried to remove the label but not the batch number. The vial leads straight back to the trial team.'
      },
      'death-log': {
        name: 'The morgue log', caption: 'Three unexpected deaths', icon: 'ledger', type: 'Records',
        desc: 'Three healthy volunteers died at night over eighteen months. All three charts signed by Hale. The first two were settled privately as “cardiac events”.',
        tells: 'Jonah was not the first. The pattern predates him, and the settlements were designed to keep it invisible.'
      },
      'trial-data': {
        name: 'The Phase II folder', caption: 'Too-clean data · “Handle it”', icon: 'ledger', type: 'Financial evidence',
        desc: 'Twenty identical responses and copied side-effect profiles. A funder letter threatens withdrawal unless the endpoint is met. Hale has written “J.R. is asking questions. Handle it.”',
        tells: 'The trial is fraudulent and Hale knew Jonah was a threat. The note is a motive in six words.'
      },
      'trial-emails': {
        name: 'Phase II archive', caption: 'Settlements · protocol note · camera log', icon: 'laptop', type: 'Digital evidence',
        desc: 'Two prior settlements, a note describing insulin as “undetectable after the fact if the bag is replaced”, and the camera console log in Hale’s name.',
        tells: 'Hale had both the method and the experience. The protocol note is a confession written before the crime.'
      },
      'prior-deaths': {
        name: 'The prior settlements', caption: 'Two volunteers · two NDAs', icon: 'money', type: 'Financial evidence',
        desc: 'Volunteers 11 and 17 died of “cardiac events”. Both families signed NDAs. Both observation charts were signed by Hale.',
        tells: 'The hospital has been buying silence for years. Jonah was the first volunteer who could not be bought.'
      },
      'jonah-email': {
        name: 'Jonah’s last email', caption: '“I am going to the regulator.”', icon: 'mail', type: 'Digital evidence',
        desc: 'Jonah had a copy of the real data and planned to go to the regulator on Friday. He was not asking for money.',
        tells: 'Jonah could not be settled. He had to be stopped before Friday. Hale’s motive now has a deadline.'
      },
      'usb-lead': {
        name: 'The hidden USB', caption: '“He said it was in a book.”', icon: 'usb', type: 'Lead',
        desc: 'Martin says Jonah hid a copy of the real trial data on a USB stick, inside a book, because he expected his room to be searched.',
        tells: 'There is a second copy of the data somewhere in the hospital. Hale does not have it.'
      },
      'hale-alibi': {
        name: 'Hale’s account', caption: '“A routine review”', icon: 'note', type: 'Alibi',
        desc: 'Hale claims he was in his office and visited the ward at half ten for a routine review. The diary has no staff code for the review, and the camera was disabled at 22:00.',
        tells: 'Hale put himself in the ward at the exact time he later claimed to know nothing about.'
      },
      'hale-deflect': {
        name: '“My ID is shared”', caption: 'Hale on the cabinet log', icon: 'note', type: 'Interview',
        desc: 'Hale dismisses the cabinet log as a shared credential and asks why he would use his own code and leave the record open.',
        tells: 'He has an answer for the code but not for the torn signature page or the forty-minute camera gap.'
      },
      'hale-pattern': {
        name: '“Medicine is full of coincidences”', caption: 'Hale on the prior deaths', icon: 'audio', type: 'Statement',
        desc: 'Confronted with two prior volunteer deaths, Hale calls them settled tragedies and accuses you of building a pattern from coincidence.',
        tells: 'He does not deny signing the charts. He denies that repetition means anything — which is what a man would say if repetition was his method.'
      },
      'hale-admission': {
        name: '“I wanted him to stop”', caption: 'Hale on Jonah Reed', icon: 'audio', type: 'Statement',
        desc: 'Hale admits he did not want Jonah dead, only silent, and says he has been telling himself there is a difference.',
        tells: 'This is not a denial. It is a confession with a distinction attached to make it bearable.'
      },
      'priya-statement': {
        name: 'Priya’s account', caption: '“Do not escalate”', icon: 'note', type: 'Witness statement',
        desc: 'Priya called Hale when she saw the bag. He told her to replace it and not escalate. She complied because of her visa.',
        tells: 'Hale was the first person told and the person who ordered silence. That is not the behaviour of an innocent doctor.'
      },
      'priya-doubt': {
        name: 'The forged observations', caption: 'Priya on the chart', icon: 'note', type: 'Witness statement',
        desc: 'Priya says the 22:00 signature is not hers; she dots her i’s and the chart does not. Hale asked her to sign the 23:10 entry; she refused.',
        tells: 'Hale was forging the night nurse’s observations. The chart was built to make the death look like a ward error.'
      },
      'priya-tape': {
        name: 'The pink tape', caption: 'Trial cupboard stock', icon: 'fiber', type: 'Physical evidence',
        desc: 'Priya identifies the pink cannula tape as trial-cupboard stock. Hale told her Jonah had an expected reaction to the trial drug.',
        tells: 'The tape ties the infusion to the trial team. Hale’s “expected reaction” was an excuse prepared in advance.'
      },
      'martin-story': {
        name: 'Jonah’s last text', caption: '23:04 · “ask for the trial data”', icon: 'phone', type: 'Digital evidence',
        desc: 'Jonah texted Martin at 23:04: “If I do not answer in the morning, go to the hospital and ask for the trial data.”',
        tells: 'Jonah knew he was in danger before the bag was replaced. He had already taken steps to protect the evidence.'
      },
      'martin-alibi': {
        name: 'Martin’s movements', caption: 'Home until 05:00', icon: 'note', type: 'Alibi',
        desc: 'Martin called the ward at six, was told Jonah was sleeping, and drove in. His phone and door camera place him at home until 05:00.',
        tells: 'The brother had no opportunity and no access. He is a witness with a motive, which is the best kind of witness.'
      }
    },
    solution: {
      minEvidence: 9,
      questions: [
        {
          q: 'Who killed Jonah Reed?',
          options: [
            { t: 'Dr Linus Hale — the trial lead', v: 'hale' },
            { t: 'Priya Shah — the night nurse', v: 'priya' },
            { t: 'Martin Reed — Jonah’s brother', v: 'martin' },
            { t: 'Jonah died of an accidental pharmacy error', v: 'accident' }
          ],
          answer: 'hale'
        },
        {
          q: 'How was the insulin administered?',
          options: [
            { t: 'It was injected directly into his arm while he slept', v: 'inject' },
            { t: 'It was added to the saline bag and dripped into his line', v: 'bag' },
            { t: 'It was mixed into his dinner', v: 'food' },
            { t: 'It was substituted for a routine antibiotic', v: 'antibiotic' }
          ],
          answer: 'bag'
        },
        {
          q: 'What was Hale protecting?',
          options: [
            { t: 'A fraudulent clinical trial and two prior deaths', v: 'trial' },
            { t: 'A secret relationship with a patient', v: 'affair' },
            { t: 'A drug-theft operation run from the pharmacy', v: 'theft' },
            { t: 'His brother’s job at the hospital', v: 'family' }
          ],
          answer: 'trial'
        },
        {
          q: 'Which evidence breaks the case?',
          options: [
            { t: 'The pink tape and the empty trial vial', v: 'tape' },
            { t: 'The night-shift grid and the cabinet log in Hale’s name', v: 'grid' },
            { t: 'Martin’s last text from Jonah', v: 'text' },
            { t: 'The autopsy’s estimate of time of death', v: 'autopsy' }
          ],
          answer: 'grid'
        }
      ],
      verdict: {
        who: 'Dr Linus Hale, 56 — lead investigator, St Alder Phase II trial',
        whoDesc: 'was arrested in his office with the deleted trial archive still open on his laptop.',
        how: 'He opened the drug cabinet with his own code, took a trial-grade insulin vial, entered Ward 4 during the camera blackout, and injected the insulin into Jonah Reed’s saline bag. He then forged the observations and told the night nurse not to escalate.',
        why: 'Jonah had discovered that the trial data was fabricated and was going to the regulator on Friday. Hale had already buried two prior volunteer deaths with NDAs. A third would end his career and his research.',
        key: 'The night-shift grid. Hale controlled the camera, the cabinet log, and the chart, but he could not be in three records at once without being the only person who appeared in all of them.'
      },
      reveal: [
        'The Phase II trial was supposed to be Linus Hale’s masterpiece. Twenty healthy volunteers, a clean endpoint, a grant that would carry his department for a decade. The only problem was the data, which had been copied from a German study and polished until it shone. Jonah Reed, a volunteer with a boring job and a good memory, noticed that two patients with different histories had produced identical side-effect profiles.',
        'Hale had handled difficult volunteers before. Volunteer 11 and Volunteer 17 had both died at night, both of “cardiac events”, both settled quietly with the families. Hale had signed their observation charts himself. The hospital’s legal office had been grateful for the discretion. Nobody had asked the pathologist what he thought.',
        'On Monday night, Jonah texted his brother: if I do not answer in the morning, ask for the trial data. Then he went to sleep. At 22:00, Hale disabled the ward camera from the maintenance console and parked a cleaner’s trolley across the corridor. At 22:15 he opened the drug cabinet with his own code. At 22:25 he entered the bay with a pharmacy bag and drew the curtain.',
        'The insulin went into the saline bag through a wide-gauge needle. Jonah would have slipped into a coma within twenty minutes. Hale signed the observations at 22:40, re-enabled the camera at 23:12, and told the night nurse to replace the bag and not to escalate. By the time Priya understood what she had seen, the evidence was in a waste bin and the chart had a nurse’s initials on it.',
        'What Hale had not accounted for was the pink tape, the batch number etched into the vial, the morgue log with three unexpected deaths, and a night nurse who dotted her i’s. The trial data was copied. The alibi was edited. The camera log was in his own name. He had built a perfect system for making people disappear quietly, and it worked right up until somebody looked at the paperwork.',
        'Jonah Reed’s hidden USB was found two days later, inside a paperback copy of a novel about a doctor who gets away with it. The book was a gift from his brother. The joke was not funny any more.'
      ],
      quote: 'He did not want him dead. He wanted him quiet. The difference was the only thing he had left.',
      twist: 'The hospital knew. The two prior settlements had been approved by the same legal office that now called Jonah’s death a tragic error. Hale was not a rogue doctor; he was a cost centre that had been managed for years — until a volunteer with a good memory made the cost visible.'
    }
  });

  /* ------------------------------------------------------------
     CASE 06 — THE PAWNBROKER'S LEDGER
     ------------------------------------------------------------ */
  C.push({
    id: 'c06', num: 6,
    title: 'The Pawnbroker’s Ledger',
    subtitle: 'A shot pawnbroker, a coded ledger, and a painting that is worth more as a lie.',
    difficulty: 4, est: '35–45 min',
    cover: { kind: 'shop', mood: 'night' },
    facts: [
      { k: 'Victim', v: 'Sol Klein, 67 — pawnbroker' },
      { k: 'Scene', v: 'Klein’s Pawn, back office' },
      { k: 'Found', v: '08:20 — by his nephew' },
      { k: 'Cause', v: 'Single gunshot wound, close range' }
    ],
    briefing: [
      'Sol Klein had run the same pawnshop for forty years. He knew every stolen watch in the city and most of the people who stole them. He was not a popular man, but he was a useful one, and useful men tend to live longer than popular ones.',
      'On Tuesday morning his nephew found him face down behind the counter with a bullet in his chest and the safe open. Nothing was taken. The till was untouched. The only thing missing was a painting that had been leaning against the wall for three weeks, waiting for an auction.',
      'Sol kept two sets of books: a clean set for the tax office and a coded ledger for everything else. The coded ledger is still in the safe, written in a substitution cipher that looks like nonsense until you know what Sol was afraid of.',
      'A dead pawnbroker, an untouched till, and a missing painting nobody can prove was real. The gun is old. The lie is newer.'
    ],
    opening: 'The shop smells of dust and old leather. Behind the counter, the chalk outline has been drawn around a man who spent his life standing exactly there. On the wall, a rectangle of clean paint marks where the painting used to hang.',
    objectives: [
      'Open the shop safe and recover Sol’s coded ledger.',
      'Decode the ledger and identify the items Sol was tracking.',
      'Enhance the alley camera and trace the van.',
      'Establish who had a reason to want Sol quiet.'
    ],
    locations: [
      {
        id: 'shop', name: 'Klein’s Pawn', short: 'The shop', time: '09:10',
        art: { kind: 'shop', mood: 'night' },
        intro: 'A narrow shop front with a bell on the door and a window full of cameras, rings, and one wedding dress that has been there since 1998. The counter is scratched with decades of rings and watches. Behind it, the carpet has been cut away.',
        actions: [
          {
            id: 'body', label: 'Examine the scene', icon: 'blood', hotspot: { x: 52, y: 66 },
            desc: 'The wound, the chalk, the missing painting', gives: ['bullet', 'missing-painting'],
            text: [
              'Sol was shot at close range, straight through the chest. There is no defensive wound, no overturned stool, no sign of a struggle. He knew the person who killed him and did not expect the gun.',
              'The safe is open, but the trays are still full: rings, watches, a bag of gold teeth. The killer did not come for cash. The only thing missing is a painting that was leaning against the wall behind the counter — a small, dark portrait of a woman in a blue coat.',
              'On the floor, half under the safe, is a pawn ticket with a number written on it in Sol’s hand: <b>#B-114</b>. The ticket is for a firearm.'
            ]
          },
          {
            id: 'counter', label: 'Search the counter', icon: 'search',
            desc: 'Tickets, keys, a single earring', gives: ['pawn-ticket', 'shop-keys'],
            text: [
              'The counter drawer is a filing system of a man who trusted nobody and remembered everything. Tickets are bundled by month, each one annotated with a symbol: a circle, a cross, a tiny drawing of an eye.',
              'One ticket is new. It is made out to <b>“D. KLEIN”</b> for a silver locket, pawned three weeks ago and never redeemed. The locket is still in the tray. Inside it, a photograph of Sol as a young man with his arm around a woman.',
              'The shop keys are on a ring with a brass tag: <b>BACK OFFICE — BEWARE OF THE DOG.</b> There is no dog.'
            ]
          },
          {
            id: 'danny', label: 'Interview Danny Klein', icon: 'user', suspect: 'danny',
            desc: 'The nephew · found the body', hint: 'Danny found Sol and called it in. Ask what he touched.'
          }
        ]
      },
      {
        id: 'office', name: 'Back office', short: 'Office', time: '10:30',
        art: { kind: 'office', mood: 'old' }, requires: ['pawn-ticket'],
        intro: 'A room the size of a wardrobe, with a desk, a safe, and a wall of framed photographs of items Sol had been asked to sell. Most of them are watches. One of them is a painting of a woman in a blue coat.',
        actions: [
          {
            id: 'safe', label: 'Open the shop safe', icon: 'lock', kind: 'puzzle', puzzle: 'shop-safe',
            desc: 'Three dials and a lot of history', requires: ['pawn-ticket'],
            hint: 'Sol scratched the combination on the underside of the counter: #B-114. The dials take two digits each.'
          },
          {
            id: 'ledger', label: 'Decode the ledger', icon: 'cipher', kind: 'puzzle', puzzle: 'ledger-cipher',
            desc: 'A substitution cipher in a pawnbroker’s hand', requires: ['ledger-book'],
            hint: 'Every entry is a substitution. Turn the wheel until the names resolve. Start with the first line.'
          },
          {
            id: 'vera', label: 'Interview Vera Sloane', icon: 'user', suspect: 'vera',
            desc: 'A customer · has been here every day', hint: 'Vera says she came to redeem a ring. The ring is still in the tray.'
          }
        ]
      },
      {
        id: 'alley', name: 'Service alley', short: 'Alley', time: '12:05',
        art: { kind: 'street', mood: 'rain' }, requires: ['ledger-decoded'],
        intro: 'A wet alley behind the shop, full of bins and the smell of a restaurant two doors down. A security camera looks down from the back of the auction house. Its lens is clean. The alley is not.',
        actions: [
          {
            id: 'search', label: 'Search the alley', icon: 'search', hotspot: { x: 66, y: 70 },
            desc: 'Bins, a dropped glove, a fresh tyre track', gives: ['tyre-track', 'glove'],
            text: [
              'A single black glove lies under the fire escape. It is expensive leather and the wrong size for Sol. Inside the wrist, a dry cleaner’s tag is still attached: <b>ORR & SONS — 1 PAIR — COLLECTED TUESDAY.</b>',
              'The tyre track is fresh in the wet ash. A van, wide tyres, a distinctive tread block. The same track appears in the loading-bay photograph on the auction house’s website.',
              'A bin bag has been slit open and searched. Inside: a takeaway box, a receipt for a taxi, and a torn strip of canvas with blue paint on the edge.'
            ]
          },
          {
            id: 'photo', label: 'Enhance the alley camera', icon: 'camera', kind: 'puzzle', puzzle: 'alley-photo',
            desc: 'A van at 02:14 with its lights off', requires: ['tyre-track'],
            hint: 'The van is in the frame, but the plates are washed out. Slide the enhancement until the rear doors resolve.'
          },
          {
            id: 'receipt', label: 'Trace the taxi receipt', icon: 'receipt',
            desc: 'A fare from the auction house at 02:40', requires: ['tyre-track'], gives: ['taxi-receipt'],
            text: [
              'The receipt is from a firm that only serves the auction district. The pickup was the auction house loading bay at 02:40. The drop-off was a storage unit on the ring road.',
              'The driver remembers the fare. “Two men. One had a painting wrapped in a curtain. The other one paid cash and told me to keep the engine running. They were arguing about whether it was real.”',
              'The storage unit is rented to a company called <b>ORR FINE ART HOLDINGS</b>. The company was dissolved six months ago. The unit is still paid for in cash.'
            ]
          }
        ]
      },
      {
        id: 'auction', name: 'Orr’s auction house', short: 'Auction house', time: '14:20',
        art: { kind: 'theatre', mood: 'gallery' }, requires: ['cctv-van'],
        intro: 'A white room full of paintings that cost more than the building. Miles Orr is in the middle of it, arranging a small dark portrait of a woman in a blue coat on a velvet easel. He does not look surprised to see you. He looks annoyed.',
        actions: [
          {
            id: 'miles', label: 'Interview Miles Orr', icon: 'user', suspect: 'miles',
            desc: 'Auctioneer · the painting is already on display', hint: 'Miles has the missing painting. Ask him where it came from.'
          },
          {
            id: 'catalogue', label: 'Check the auction catalogue', icon: 'book',
            desc: 'Provenance, estimates, and one very clean lie', gives: ['auction-catalogue'],
            text: [
              'The catalogue lists the painting as <b>“Portrait of a Woman in Blue — attributed to Vermeer — estimate £2.4m”</b>. The provenance section is three lines long and cites a private collection that does not exist.',
              'The estimate is four times the highest price ever paid for a work by that hand. The viewing notes say the painting has been “freshly conserved” and “requires no technical analysis”.',
              'In the margin, in pencil: <i>“Sol says the blue is wrong. Sol is a pawnbroker. What does he know?”</i>'
            ]
          },
          {
            id: 'painting', label: 'Examine the painting', icon: 'photo',
            desc: 'The blue is the wrong blue', requires: ['auction-catalogue'], gives: ['forgery-proof'],
            text: [
              'The painting is beautiful and wrong. The blue of the coat is too bright, too modern; the pigment sits on the canvas rather than sinking into it. Under a loupe, the craquelure is too regular, like a pattern printed on.',
              'On the back, a label has been scraped away. Under the label, in pencil: <b>“V.S. — after Vermeer — 2021.”</b>',
              'In the frame’s rebate, a tiny bead of blue paint has been trapped. It matches the strip of canvas found in the alley bin. This is the painting that left Sol’s shop.'
            ]
          }
        ]
      },
      {
        id: 'archive', name: 'Police property archive', short: 'Archive', time: '16:40',
        art: { kind: 'archive' }, requires: ['ledger-decoded'],
        intro: 'A basement full of shelves, each one labelled with a year. The property clerk finds Sol’s name in a file from 1994 and another from 2019. She puts them on the table and leaves you alone with them.',
        actions: [
          {
            id: 'cold', label: 'Read the 1994 file', icon: 'ledger',
            desc: 'A pawned gun and an unsolved shooting', requires: ['ledger-decoded'], gives: ['cold-case'],
            text: [
              'In 1994, Sol Klein pawned a revolver to a man called <b>Arthur Orr</b> — Miles Orr’s father. The gun was used in a shooting three days later. Arthur was never charged. Sol gave a statement that changed between the first and second interview.',
              'The file notes that Sol was “uncooperative” and “appeared frightened”. The officer’s handwritten comment: <i>“Klein knows who pulled the trigger. He is protecting someone, or he is being protected.”</i>',
              'The gun was never recovered. The pawn ticket in the file is numbered <b>#B-114</b>.'
            ]
          },
          {
            id: 'gun', label: 'Trace the murder weapon', icon: 'gun',
            desc: 'The same ticket, thirty years later', requires: ['cold-case'], gives: ['gun-record'],
            text: [
              'The bullet from Sol’s chest matches a .38 revolver that was pawned in 1994 and never recovered. The pawn ticket for that gun is #B-114 — the same number written on the ticket under Sol’s safe.',
              'The gun was pawned by Arthur Orr. The shop was Sol Klein’s. The ticket was kept, not filed. Sol had been holding onto the one piece of evidence that could reopen a thirty-year-old murder.',
              'Miles Orr was nine years old when his father pawned that gun. He has spent his life selling things that are not what they appear to be.'
            ]
          }
        ]
      }
    ],
    puzzles: {
      'shop-safe': {
        type: 'dial', title: 'The Shop Safe', subtitle: 'Three dials, one old number', icon: 'lockbox',
        code: [19, 94, 11], labels: ['YEAR', 'PAIR', 'TICKET'],
        prompt: 'A heavy safe with three brass dials. On the underside of the counter, scratched into the wood: “#B-114 — 1994.” Sol trusted numbers more than people.',
        hintText: 'The ticket is B-114. The year is 1994. Set the dials to 19, 94, 11.',
        success: 'The safe opens. Inside: a cloth-bound ledger, a silver locket, and an old pawn ticket for a .38 revolver.',
        successTitle: 'The safe opens.',
        gives: ['ledger-book', 'old-ticket'], flags: ['safeOpen'],
        short: 'Sol’s coded ledger is out.',
        log: 'The shop safe contains a cloth-bound coded ledger, a silver locket, and a 1994 pawn ticket for a revolver numbered #B-114.'
      },
      'ledger-cipher': {
        type: 'cipher', title: 'Sol’s Ledger', subtitle: 'A pawnbroker’s substitution cipher', icon: 'cipher',
        plain: 'MILES ORR', shift: 8, answer: ['miles orr', 'milesorr'],
        prompt: 'The ledger is written in a simple substitution. Every entry is an item, a date, and a name. The first line is the name that repeats on every page.',
        note: 'Sol was not a spy. He moved every letter forward by eight. Turn the wheel back until the words resolve.',
        hintText: 'The first word has five letters, the second has three. It is the name of the auctioneer.',
        success: 'The letters resolve into a name: <b>MILES ORR</b>. Every stolen item in the ledger passed through his auction house, and every sale was split three ways.',
        successTitle: 'The ledger names Orr.',
        gives: ['ledger-decoded'], flags: ['ledgerOpen'],
        short: 'The ledger decodes to MILES ORR.',
        log: 'Sol’s coded ledger decodes to MILES ORR: a record of stolen goods laundered through the auction house, with a three-way split.'
      },
      'alley-photo': {
        type: 'photo', title: 'The Alley Camera', subtitle: '02:14 · a van with no lights', icon: 'camera',
        scene: { kind: 'street', mood: 'rain' }, target: { x: 62, y: 58, w: 18, h: 22 }, range: [62, 80],
        prompt: 'The alley camera caught a van at 02:14 with its lights off. The rear doors are open. Enhance the loading bay behind it.',
        reveal: 'A man in an expensive coat is carrying a curtain-wrapped rectangle toward the van. Behind him, the auction house’s loading-bay door is open. A second man holds the door and looks at his watch.',
        question: 'What is happening in the alley?',
        options: [
          { t: 'A delivery of furniture to the auction house', v: 'furniture' },
          { t: 'Miles Orr loading a wrapped painting into a van', v: 'orr' },
          { t: 'Sol Klein taking out the rubbish', v: 'sol' },
          { t: 'A taxi driver waiting for a fare', v: 'taxi' }
        ],
        answer: 'orr',
        wrong: 'Look at the coat and the loading-bay door. The man carrying the rectangle is not a porter, and the door belongs to the auction house.',
        hintText: 'The figure is tall, wearing a light coat, and carrying something flat and rectangular. The auction house loading bay is behind him.',
        success: 'The frame resolves: Miles Orr, in his own coat, loading a curtain-wrapped painting into a van outside his own loading bay at 02:14.',
        successTitle: 'Orr, at the loading bay.',
        gives: ['cctv-van'], flags: ['sawOrr'],
        short: 'Orr was loading the painting himself.',
        log: 'Enhanced alley footage shows Miles Orr loading a curtain-wrapped painting into a van at his own loading bay at 02:14.'
      }
    },
    suspects: [
      {
        id: 'danny', name: 'Danny Klein', role: 'Sol’s nephew · found the body', location: 'shop', locationName: 'Klein’s Pawn', tag: 'Witness / suspect',
        portrait: { seed: 'danny-klein', hair: 'curly', hairColor: '#2b1a12', skin: 1, expression: 'worried', collar: 'hoodie', eyes: '#3a2159' },
        intro: 'Danny is thirty-two and has the red eyes of a man who has been crying and the twitchy hands of a man who has been gambling. He found his uncle at eight and called the police at eight-twenty. In between, he says, he did not touch anything.',
        questions: [
          {
            q: 'Why were you at the shop so early?', gives: ['danny-story'],
            a: '“I have a key. I come in on Tuesdays to do the banking.” He looks at the chalk outline. “The door was open. I thought he was in the back. Then I saw his shoes.”<br><br>“I did not take anything. I know what it looks like. I did not take anything.”',
            follow: 'He says it twice before you ask. The till is untouched. The safe is open.'
          },
          {
            q: 'You pawned your mother’s locket three weeks ago.', requires: ['pawn-ticket'],
            a: '“I needed money. Sol took it and gave me more than it was worth. He said it was a loan, not a pawn.” He wipes his nose. “He was going to give it back when I paid him. I was going to pay him on Friday.”<br><br>“He was not a soft man. But he was soft with me.”',
            gives: ['danny-debt']
          },
          {
            q: 'Did Sol mention anyone threatening him?', requires: ['ledger-decoded'],
            a: '“He said a man from the auction house came by. Orr. He said Orr wanted a painting and Sol would not sell it.” Danny’s voice drops. “He said the painting was a fake. He said if he sold it, he would be selling a lie, and he had already sold enough lies for one lifetime.”',
            gives: ['danny-statement']
          }
        ],
        after: 'He asks whether he can keep the locket. You tell him it is evidence. He nods, as though he expected that.'
      },
      {
        id: 'vera', name: 'Vera Sloane', role: 'Customer · restorer', location: 'office', locationName: 'Back office', tag: 'Person of interest',
        portrait: { seed: 'vera-sloane', hair: 'wavy', hairColor: '#6b4a2b', skin: 2, expression: 'wary', collar: 'coat', eyes: '#2b1a12' },
        intro: 'Vera is in her sixties, wearing gloves indoors and carrying a handbag that smells of turpentine. She says she came to redeem a ring. The ring is in the tray behind her. She does not turn around.',
        questions: [
          {
            q: 'What is your relationship with Sol?', gives: ['vera-story'],
            a: '“I restore paintings. Sol found things for me. Sometimes he found things that were not quite what they claimed to be.” She smiles without warmth. “He was a useful man. I am sorry he is dead. I am also sorry about the painting.”',
            follow: 'She says “the painting” before you mention a painting.'
          },
          {
            q: 'You painted the Vermeer.', requires: ['forgery-proof'],
            a: 'She looks at the blue paint under your loupe and sighs. “I painted a Vermeer. That does not make me a murderer. It makes me a better painter than the market deserves.”<br><br>“Sol was going to give it to the police as evidence of Orr’s fraud. Orr found out. I told him not to. Sol never listened to anyone.”',
            gives: ['vera-painting'], flags: ['veraBroke']
          },
          {
            q: 'Who asked you to forge it?', requires: ['ledger-decoded'],
            a: '“Orr. He supplied the canvas, the pigment, and the story. I supplied the hand.” She pulls off one glove. Her fingers are stained with blue. “He promised me the painting would go to a private collector and never be seen again. Then Sol put it in his window.”<br><br>“I did not know Sol was going to keep it. I did not know he was going to die for it.”',
            gives: ['vera-contract']
          }
        ],
        after: 'She gives you the name of the private collector, the pigment supplier, and her solicitor, in that order. She is not afraid of Orr. She is afraid of being boring.'
      },
      {
        id: 'miles', name: 'Miles Orr', role: 'Auctioneer · Orr Fine Art', location: 'auction', locationName: 'Auction house', tag: 'Prime suspect',
        portrait: { seed: 'miles-orr', hair: 'short', hairColor: '#7a6a5a', skin: 0, expression: 'smug', collar: 'suit', eyes: '#2b1a12', glasses: 'round' },
        intro: 'Miles Orr is sixty and dressed like a man who wants to be photographed next to something expensive. He has the missing painting on an easel. He offers you a glass of water before you ask a question. He does not offer you a chair.',
        questions: [
          {
            q: 'Where did the painting come from?', gives: ['miles-alibi'],
            a: '“A private collection in Geneva.” He smiles. “Established provenance. The owner wishes to remain anonymous. You understand.”<br><br>“Sol Klein was a pawnbroker. He would not know a Vermeer if it pawned itself. If he told you the painting was fake, he was trying to lower the price.”',
            follow: 'The provenance is three lines long. The private collection does not exist.'
          },
          {
            q: 'Your glove was found in the alley.', requires: ['cctv-van'],
            a: '“I walk through that alley every day. It is a shortcut to my car.” He takes the glove and turns it over. “I lose gloves. I am a busy man.”<br><br>“If you are suggesting I was at the shop at two in the morning, I would ask you to check my building’s security. I was here. I often work late.”',
            gives: ['miles-deflect'], flags: ['milesHostile']
          },
          {
            q: 'Sol’s ledger has your name on every page.', requires: ['ledger-decoded'], present: true,
            a: 'He does not look at the ledger. “Sol kept books the way other men keep grudges. He wrote down everyone who ever sold him a watch.” A pause. “If my name is in there, it is because I bought watches.”',
            gives: ['miles-pressure']
          },
          {
            q: 'The gun that killed him was pawned by your father in 1994.', requires: ['gun-record'], present: true,
            a: 'The glass stops halfway to his mouth. “My father is dead.”<br><br>“Sol was a blackmailer. He kept that ticket for thirty years and never used it. He liked having it. He liked knowing I knew he had it.”<br><br>“I did not go there to kill him. I went to get the painting. He said he was going to the police. He said it with that little smile he had.”',
            gives: ['miles-admission'], flags: ['milesBroke']
          }
        ],
        after: 'He asks whether the auction will still go ahead. He is told it will not. He looks, briefly, like a man whose whole life has been a reserve price.'
      }
    ],
    clues: {
      bullet: {
        name: 'The bullet', caption: '.38 · close range', icon: 'gun', type: 'Ballistics',
        desc: 'A .38 bullet recovered from Sol Klein’s chest. The wound is contact-range. There are no defensive injuries.',
        tells: 'Sol knew the killer and was not afraid of him until the gun came out. This was a conversation that turned.'
      },
      'missing-painting': {
        name: 'The missing portrait', caption: 'Woman in a blue coat', icon: 'photo', type: 'Physical evidence',
        desc: 'A small portrait of a woman in a blue coat, missing from the shop. The till and the safe were untouched. Only the painting was taken.',
        tells: 'The killer came for the painting, not the money. That makes this a crime about a lie, not a robbery.'
      },
      'pawn-ticket': {
        name: 'Danny’s pawn ticket', caption: 'Silver locket · never redeemed', icon: 'ticket', type: 'Records',
        desc: 'A ticket made out to D. Klein for a silver locket, pawned three weeks ago. The locket is still in the tray, with a photograph of a young Sol inside.',
        tells: 'Danny needed money, but Sol was helping him. The nephew is in debt, not in the will.'
      },
      'shop-keys': {
        name: 'The shop keys', caption: 'Back office · no dog', icon: 'key', type: 'Physical evidence',
        desc: 'Sol’s key ring, including the back-office key. The brass tag says “BEWARE OF THE DOG”. Sol did not own a dog.',
        tells: 'Sol used jokes as locks. The keys were not taken, so the killer did not need them.'
      },
      'ledger-book': {
        name: 'The cloth-bound ledger', caption: 'Every item, every name, in code', icon: 'ledger', type: 'Records',
        desc: 'A ledger written in a substitution cipher. Every entry is an item, a date, and a name. The first line is the name that repeats on every page.',
        tells: 'Sol documented the entire laundering operation. The ledger is the most dangerous object in the shop.'
      },
      'ledger-decoded': {
        name: 'The decoded ledger', caption: 'MILES ORR · three-way split', icon: 'cipher', type: 'Coded evidence',
        desc: 'The ledger decodes to a record of stolen goods sold through Orr’s auction house, with proceeds split three ways between Sol, Orr, and a restorer.',
        tells: 'Orr was not a customer; he was a partner. The missing painting was part of a fraud that Sol was about to expose.'
      },
      'auction-catalogue': {
        name: 'The auction catalogue', caption: '“Attributed to Vermeer · £2.4m”', icon: 'book', type: 'Document',
        desc: 'The portrait is listed with a fictional provenance, an impossible estimate, and a note that it “requires no technical analysis”.',
        tells: 'The auction house is selling a painting it does not want examined. That is not confidence; it is a warning.'
      },
      'forgery-proof': {
        name: 'The wrong blue', caption: '“V.S. — after Vermeer — 2021”', icon: 'photo', type: 'Forensic evidence',
        desc: 'The blue pigment is modern; the craquelure is printed on. Under a scraped label: “V.S. — after Vermeer — 2021.” A bead of the same paint is in the frame.',
        tells: 'The painting is a forgery. Sol knew, and the label names the forger.'
      },
      'tyre-track': {
        name: 'The van track', caption: 'Wide tyres · loading bay', icon: 'car', type: 'Trace evidence',
        desc: 'A fresh van track in the alley, matching the loading-bay photograph on the auction house website. A strip of blue-painted canvas is in the bin.',
        tells: 'A van from the auction house was in the alley. The canvas strip ties it to the painting.'
      },
      glove: {
        name: 'The black glove', caption: 'ORR & SONS · dry cleaning', icon: 'mask', type: 'Physical evidence',
        desc: 'An expensive leather glove under the fire escape, with a dry-cleaning tag from Orr & Sons collected on Tuesday.',
        tells: 'Orr was in the alley. The tag is dated the morning after the murder.'
      },
      'cctv-van': {
        name: 'The alley camera', caption: '02:14 · Orr at the loading bay', icon: 'cctv', type: 'Surveillance',
        desc: 'Enhanced footage shows Miles Orr loading a curtain-wrapped painting into a van outside his own loading bay at 02:14.',
        tells: 'Orr handled the painting himself in the middle of the night. This was not a routine transfer.'
      },
      'taxi-receipt': {
        name: 'The taxi receipt', caption: 'Auction house → storage unit', icon: 'receipt', type: 'Records',
        desc: 'A pickup at the auction loading bay at 02:40, drop-off at a storage unit rented to Orr Fine Art Holdings. Two men, one painting, an argument about whether it was real.',
        tells: 'The painting was moved to a storage unit after the murder. Orr was not acting alone, and the argument was about authenticity.'
      },
      'cold-case': {
        name: 'The 1994 file', caption: 'Arthur Orr · pawned revolver', icon: 'ledger', type: 'Records',
        desc: 'Arthur Orr pawned a revolver at Sol’s shop in 1994. It was used in a shooting three days later. Sol’s statement changed between interviews.',
        tells: 'Sol had been protecting someone — or being protected — for thirty years. The gun connects the Orr family to the shop.'
      },
      'gun-record': {
        name: 'The murder weapon', caption: 'Ticket #B-114 · .38 revolver', icon: 'gun', type: 'Ballistics',
        desc: 'The bullet matches a .38 revolver pawned in 1994 under ticket #B-114 — the number written on the ticket under Sol’s safe.',
        tells: 'The gun that killed Sol was pawned by Miles Orr’s father. Sol kept the ticket for thirty years. That is a motive with a serial number.'
      },
      'old-ticket': {
        name: 'The 1994 pawn ticket', caption: '#B-114 · a .38 revolver', icon: 'ticket', type: 'Records',
        desc: 'An old ticket for a .38 revolver, pawned by Arthur Orr. Sol kept it in the safe beside the ledger.',
        tells: 'Sol kept the one piece of evidence that could reopen a thirty-year-old murder. He was holding it over the Orr family.'
      },
      'danny-story': {
        name: 'Danny’s account', caption: '“I did not take anything.”', icon: 'note', type: 'Witness statement',
        desc: 'Danny found the body at eight, called the police at eight-twenty, and insists he touched nothing. The till was untouched.',
        tells: 'If Danny is lying, he is lying about something other than money. The scene was not robbed.'
      },
      'danny-debt': {
        name: 'The locket loan', caption: 'Sol was helping him', icon: 'jewelry', type: 'Personal item',
        desc: 'Sol gave Danny more than the locket was worth and called it a loan, not a pawn. The locket is still in the tray.',
        tells: 'Danny had a reason to love his uncle and no reason to kill him. The debt is a red herring.'
      },
      'danny-statement': {
        name: '“The painting was a fake”', caption: 'Danny on Sol and Orr', icon: 'note', type: 'Witness statement',
        desc: 'Sol told Danny that Orr wanted a painting Sol would not sell, because it was a fake and Sol had “sold enough lies for one lifetime”.',
        tells: 'Sol was about to break with Orr over the forgery. That is a motive for silencing him.'
      },
      'vera-story': {
        name: 'Vera’s account', caption: '“I restore paintings.”', icon: 'note', type: 'Interview',
        desc: 'Vera says she restores paintings and that Sol found things for her. She mentions “the painting” before you do.',
        tells: 'She knows about the painting because she made it. Her composure is professional, not innocent.'
      },
      'vera-painting': {
        name: 'The confession of a forger', caption: '“I painted a Vermeer.”', icon: 'photo', type: 'Statement',
        desc: 'Vera admits forging the painting and says Sol was going to give it to the police as evidence of Orr’s fraud.',
        tells: 'Orr had a motive to stop Sol. Vera had a motive to keep quiet, but not to kill.'
      },
      'vera-contract': {
        name: 'The commission', caption: 'Orr supplied canvas and story', icon: 'note', type: 'Statement',
        desc: 'Vera says Orr supplied the canvas, pigment, and provenance. He promised the painting would go to a private collector. Sol put it in his window instead.',
        tells: 'The forgery was Orr’s operation. Sol’s decision to display it threatened the whole scheme.'
      },
      'miles-alibi': {
        name: 'Orr’s provenance', caption: '“A private collection in Geneva”', icon: 'note', type: 'Alibi',
        desc: 'Orr claims the painting came from an anonymous Geneva collection and dismisses Sol as a pawnbroker who would not know a Vermeer.',
        tells: 'The provenance is fabricated. Orr is not defending the painting; he is defending the story around it.'
      },
      'miles-deflect': {
        name: '“I lose gloves”', caption: 'Orr on the alley', icon: 'note', type: 'Interview',
        desc: 'Orr dismisses the glove as a daily shortcut and claims he was in his building, working late.',
        tells: 'The glove has a dry-cleaning tag dated the morning after the murder. He did not lose it before the crime; he lost it during.'
      },
      'miles-pressure': {
        name: '“I bought watches”', caption: 'Orr on the ledger', icon: 'note', type: 'Interview',
        desc: 'Orr refuses to look at the decoded ledger and claims his name appears only because he bought watches from Sol.',
        tells: 'The ledger records sales, dates, and a three-way split. “Buying watches” does not explain the split.'
      },
      'miles-admission': {
        name: '“He said it with that smile”', caption: 'Orr on the gun and the threat', icon: 'audio', type: 'Statement',
        desc: 'Orr admits he went to the shop to get the painting, that Sol threatened to go to the police, and that Sol smiled when he said it.',
        tells: 'Motive, opportunity, and the weapon’s history are now on the record. The only thing missing is the gun itself.'
      }
    },
    solution: {
      minEvidence: 9,
      questions: [
        {
          q: 'Who killed Sol Klein?',
          options: [
            { t: 'Miles Orr — the auctioneer', v: 'orr' },
            { t: 'Danny Klein — the nephew with gambling debts', v: 'danny' },
            { t: 'Vera Sloane — the forger', v: 'vera' },
            { t: 'A random robbery gone wrong', v: 'robbery' }
          ],
          answer: 'orr'
        },
        {
          q: 'Why was Sol killed?',
          options: [
            { t: 'He refused to hand over the forged painting and threatened to expose Orr', v: 'expose' },
            { t: 'He was killed for the money in the safe', v: 'money' },
            { t: 'He was killed by a customer he cheated on a pawn', v: 'customer' },
            { t: 'He was killed to stop him selling the shop', v: 'sale' }
          ],
          answer: 'expose'
        },
        {
          q: 'What was the painting?',
          options: [
            { t: 'A genuine Vermeer worth millions', v: 'real' },
            { t: 'A forgery painted by Vera Sloane for Orr', v: 'forgery' },
            { t: 'A family portrait of no value', v: 'family' },
            { t: 'A stolen masterpiece from a museum', v: 'stolen' }
          ],
          answer: 'forgery'
        },
        {
          q: 'Which evidence breaks the case?',
          options: [
            { t: 'The bullet and the 1994 pawn ticket', v: 'gun' },
            { t: 'The decoded ledger naming Orr and the enhanced alley footage', v: 'ledger' },
            { t: 'Danny’s unpaid debt and the silver locket', v: 'locket' },
            { t: 'Vera’s blue-stained fingers', v: 'fingers' }
          ],
          answer: 'ledger'
        }
      ],
      verdict: {
        who: 'Miles Orr, 60 — auctioneer, Orr Fine Art',
        whoDesc: 'was arrested at his own auction preview with a .38 revolver in the storage unit and blue paint under his thumbnail.',
        how: 'He went to the shop after midnight to take the forged painting. Sol refused to hand it over and told him he was going to the police. Orr shot him once at contact range, loaded the painting into the van himself, and drove it to the storage unit.',
        why: 'Sol had the ledger, the forgery, and the 1994 pawn ticket for the gun Orr’s father used in an unsolved shooting. Orr had spent thirty years selling lies; Sol was about to sell the truth.',
        key: 'The decoded ledger. It turns a pawnbroker’s murder into a thirty-year conspiracy: Orr’s name on every page, a three-way split, and a forged Vermeer that Sol refused to keep quiet about.'
      },
      reveal: [
        'Sol Klein had been a fence for forty years, but he had never been a fool. He knew that the painting Miles Orr brought him was not a Vermeer. He knew because Vera Sloane had painted it in a studio above a dry cleaner, and because Orr had supplied the canvas, the pigment, and the provenance. Sol was supposed to sell it quietly to a private collector and take his cut.',
        'Instead, Sol put it in his window. He told Orr he was tired of selling lies. He told his nephew the painting was fake. He told Vera he was going to give it to the police as evidence of a fraud that stretched from the auction house to a storage unit on the ring road. He was sixty-seven years old and had decided, very late, to become a difficult man.',
        'Orr came to the shop after midnight. The alley camera caught him loading a curtain-wrapped rectangle into a van at 02:14. The glove he lost under the fire escape had a dry-cleaning tag from the day before. The gun he used was a .38 that his father had pawned at the same shop in 1994. Sol had kept the ticket for thirty years, in the safe, beside the ledger.',
        'The ledger was Sol’s insurance and his suicide note. It named Orr on every page, recorded every stolen item, every sale, and every split. It was written in a substitution cipher that Sol thought was clever. It took less than an hour to break.',
        'The painting was recovered from a storage unit rented to a company that no longer existed. It is currently in a police evidence locker, where it is worth considerably less than two point four million and considerably more than the life of the man who refused to sell it.',
        'Miles Orr has asked to be allowed to attend the auction of his own estate. The request was denied.'
      ],
      quote: 'He had already sold enough lies for one lifetime. It was the honesty that killed him.',
      twist: 'The forged painting was not Orr’s only copy. Vera had made three: one for the collector, one for Sol, and one for the police. The one in the evidence locker is the only genuine thing in the case — a forgery made to expose a bigger lie.'
    }
  });

  /* ------------------------------------------------------------
     CASE 07 — THE GLASSHOUSE
     ------------------------------------------------------------ */
  C.push({
    id: 'c07', num: 7,
    title: 'The Glasshouse',
    subtitle: 'A botanist dies in a locked greenhouse with the antidote growing beside her.',
    difficulty: 3, est: '30–40 min',
    cover: { kind: 'greenhouse', mood: 'night' },
    facts: [
      { k: 'Victim', v: 'Dr Iris Bell, 41 — botanist' },
      { k: 'Scene', v: 'The Thornwood glasshouse' },
      { k: 'Found', v: '07:30 — by her assistant' },
      { k: 'Cause', v: 'Suspected plant toxin' }
    ],
    briefing: [
      'The Thornwood glasshouse is a cathedral of glass and steam, built to keep tropical plants alive in a country that does not want them. Dr Iris Bell ran it for twelve years. She was found at dawn in the fern aisle, face down, with a teacup beside her and a cut on her thumb.',
      'The glasshouse was locked from the inside. The exotic plants were untouched. The only thing disturbed was a bed of foxglove, which is not exotic at all — it grows wild in the hedgerows and it is one of the most reliable poisons in the British countryside.',
      'Iris was weeks away from publishing a paper that would have made her name and ruined someone else’s. Her assistant says she was excited. Her rival says she was careless. The groundskeeper says the glasshouse has a ghost.',
      'A locked glasshouse, a cup of tea, and a poison that grows in the garden. The ghost did not do this. The ghost does not need to.'
    ],
    opening: 'The glasshouse is warm and wet and smells of crushed green. Water drips from the glass onto the ferns. Iris Bell lies between two beds of foxglove, one hand curled around a teacup, the other reaching toward a plant that is not foxglove at all.',
    objectives: [
      'Identify the toxin that killed Iris Bell.',
      'Determine how the poison entered her tea.',
      'Establish who had access to the locked glasshouse.',
      'Find the research that someone was willing to kill for.'
    ],
    locations: [
      {
        id: 'greenhouse', name: 'The glasshouse', short: 'Glasshouse', time: '08:15',
        art: { kind: 'greenhouse', mood: 'dawn' },
        intro: 'A long iron-and-glass tunnel, fogged with humidity. The beds are labelled in Iris’s neat hand. One label has been turned around. The teacup is still half full. The tea has a faintly bitter smell that does not belong to tea.',
        actions: [
          {
            id: 'body', label: 'Examine the body and teacup', icon: 'blood', hotspot: { x: 44, y: 68 },
            desc: 'A cut thumb, a bitter cup, a turned label', gives: ['autopsy-note', 'tea-sample'],
            text: [
              'Iris has been dead for six or seven hours. Her pupils are fixed and dilated. Her pulse would have slowed, then stopped. There is a small cut on her thumb, the kind made by a thorn or a knife, and a faint green stain under the nail.',
              'The teacup contains a residue of black tea and something else: a bitter, woody note. The lab will find digitalis. Foxglove. The same plant that grows in the bed beside her, and in every hedgerow for a mile.',
              'The plant label nearest her hand has been turned around. On the front, in Iris’s hand: <b>DIGITALIS PURPUREA — COMMON FOXGLOVE.</b> On the back, in pencil: <b>“Not mine. Ask R.”</b>'
            ]
          },
          {
            id: 'bed', label: 'Search the plant beds', icon: 'search',
            desc: 'One bed is disturbed. One is not.', gives: ['foxglove-bed'],
            text: [
              'The foxglove bed has been cut back. Not harvested neatly — cut in a hurry, with a knife, leaving ragged stems. The clippings are in the compost bucket, still green.',
              'Beside the foxglove, a bed of lily of the valley is untouched. So is the wolfsbane, the hemlock, and the ricin-bearing castor beans. Whoever took the poison knew exactly which plant to choose and exactly how much to take.',
              'In the soil at the edge of the bed, a footprint. Small, flat, rubber-soled. The kind of shoe worn by someone who works on their feet all day.'
            ]
          },
          {
            id: 'rowan', label: 'Interview Rowan Pike', icon: 'user', suspect: 'rowan',
            desc: 'Her assistant · found the body', hint: 'Rowan found Iris at dawn. Ask what he touched and what he moved.'
          }
        ]
      },
      {
        id: 'lab', name: 'The potting lab', short: 'Lab', time: '09:40',
        art: { kind: 'lab', mood: 'green' }, requires: ['tea-sample'],
        intro: 'A small room off the glasshouse, full of jars, labels, and a centrifuge that has not been switched off. Iris’s notebook is open on the bench. Someone has torn out the last three pages.',
        actions: [
          {
            id: 'notebook', label: 'Read Iris’s notebook', icon: 'note',
            desc: 'A paper, a rival, and a warning', gives: ['research-notes'],
            text: [
              'Iris’s notebook is a record of a decade of work on a drought-resistant strain of wheat. The last complete entry is three weeks ago: <b>“Results are stable. Review will pass. C.W. has asked to be a co-author. I said no.”</b>',
              'The next page has been torn out. The page after that begins mid-sentence: <b>“…if she takes the credit, the whole trial is compromised. I have the original data. I will not be bullied.”</b>',
              'Pressed between the pages is a receipt for a train ticket to the agricultural institute, dated tomorrow. Iris was going to present the data in person.'
            ]
          },
          {
            id: 'mix', label: 'Reconstruct the poison', icon: 'flask', kind: 'puzzle', puzzle: 'toxin-mix',
            desc: 'Digitalis, tannin, and a bitter mask', requires: ['research-notes'],
            hint: 'The tea was dosed with a tincture. Digitalis first, then the bitter mask, then the fixative.'
          },
          {
            id: 'fridge', label: 'Check the sample fridge', icon: 'flask',
            desc: 'A missing vial and a broken lock', requires: ['research-notes'], gives: ['missing-vial'],
            text: [
              'The sample fridge is kept at four degrees. The lock has been forced with a screwdriver. One tray is empty: the tray labelled <b>“D. PURPUREA — TINCTURE — 30ML”</b>.',
              'The fridge log shows the tray was signed out at 21:10 the night before. The signature is a scrawl that could be Rowan Pike or Celeste Ward. The pen has been left uncapped on the bench.',
              'In the waste bin, a pair of thin latex gloves, inside out, with a green stain on the fingers.'
            ]
          }
        ]
      },
      {
        id: 'cottage', name: 'Iris’s cottage', short: 'Cottage', time: '11:30',
        art: { kind: 'cabin', mood: 'green' }, requires: ['research-notes'],
        intro: 'A small stone cottage at the edge of the grounds, with a wood stove and a wall of books. The back door is unlocked. A cat is sitting on the kitchen table, next to a stack of unopened post.',
        actions: [
          {
            id: 'study', label: 'Search the study', icon: 'search',
            desc: 'A draft paper, a letter, a will', gives: ['paper-draft', 'will-draft'],
            text: [
              'The study is a nest of paper. The draft paper is complete, with Iris’s name alone on the title page and a note in the margin: <b>“C.W. removed from author list — data integrity.”</b>',
              'In the desk drawer, a letter from the agricultural institute: <b>“We have received a complaint regarding the provenance of your data. A review will be held on Friday. Dr Ward has agreed to assist.”</b>',
              'Under the letter, a will. Iris left the glasshouse, the cottage, and her research archive to the institute — not to her assistant, not to her rival, not to her family. A handwritten codicil adds: <b>“Rowan gets the ferns.”</b>'
            ]
          },
          {
            id: 'cat', label: 'Check the kitchen calendar', icon: 'note',
            desc: 'Two visitors, one night', requires: ['paper-draft'], gives: ['calendar-note'],
            text: [
              'The calendar is a month of tidy squares. The night Iris died has two entries: <b>“R — 21:00 — tea”</b> and <b>“C — 22:30 — NO”</b>.',
              'The second entry is underlined twice. On the counter, two mugs have been washed and left to dry. One has a chip on the rim. The other still has a faint green ring inside.',
              'A takeaway menu is held to the fridge by a magnet shaped like a foxglove. On the back, in Iris’s hand: <i>“If anything happens, the data is in the third drawer. Not the cloud. The cloud is watched.”</i>'
            ]
          }
        ]
      },
      {
        id: 'centre', name: 'Thornwood garden centre', short: 'Garden centre', time: '13:10',
        art: { kind: 'shop', mood: 'green' }, requires: ['toxin-id'],
        intro: 'A garden centre that sells more than compost: foxgloves in trays, digitalis seeds behind the counter, and a groundskeeper who has been working here since before the glasshouse was built. Abe Moon is potting seedlings with enormous, careful hands.',
        actions: [
          {
            id: 'abe', label: 'Interview Abe Moon', icon: 'user', suspect: 'abe',
            desc: 'Groundskeeper · knows every plant', hint: 'Abe has keys to the glasshouse. Ask him who else does.'
          },
          {
            id: 'sales', label: 'Check the seed and tincture sales', icon: 'ledger',
            desc: 'Who has been buying foxglove', gives: ['sales-log'],
            text: [
              'The sales log is a notebook, not a computer. Abe writes everything down: seeds, compost, tinctures, and the names of people who ask for things they should not.',
              'Three weeks ago: <b>“D. purpurea tincture — 30ml — C. Ward — institute account.”</b> The signature is Celeste Ward’s. The tincture was collected by a man in a green coat who said he was her assistant.',
              'Yesterday: <b>“Foxglove seeds — 3 packets — R. Pike — cash.”</b> Abe has underlined the cash. He underlines cash.'
            ]
          },
          {
            id: 'ghost', label: 'Ask about the glasshouse ghost', icon: 'eye',
            desc: 'A story Abe has been telling for years', requires: ['sales-log'], gives: ['ghost-story'],
            text: [
              'Abe laughs. “The ghost is a story I tell the school groups. There is no ghost. There is a fault in the heating pipe that makes a noise like a woman singing.” He pauses. “But there is a key.”',
              '“The glasshouse has three keys. Mine. Iris’s. And one in the institute office for emergencies.” He turns a pot in his hands. “Iris changed the lock last month. She said someone had been in the beds at night. She did not say who.”',
              'On the wall behind him, a photograph of the glasshouse in summer. Iris is standing in the middle of the fern aisle, laughing. Rowan is beside her. Celeste is at the edge of the frame, looking at the camera.'
            ]
          }
        ]
      },
      {
        id: 'office', name: 'Institute office', short: 'Institute', time: '15:00',
        art: { kind: 'office', mood: 'green' }, requires: ['toxin-id'],
        intro: 'A modern office bolted onto the back of an old estate. Dr Celeste Ward has the corner desk, the window, and the only chair with armrests. She is on the phone when you arrive. She does not get off it for four minutes.',
        actions: [
          {
            id: 'celeste', label: 'Interview Dr Celeste Ward', icon: 'user', suspect: 'celeste',
            desc: 'Rival botanist · co-author removed', hint: 'Celeste was removed from the paper. Ask her about the complaint.'
          },
          {
            id: 'desk', label: 'Search Celeste’s desk', icon: 'search',
            desc: 'A grant application and a familiar signature', requires: ['sales-log'], gives: ['grant-letter'],
            text: [
              'The desk is aggressively tidy. A grant application for the same drought-resistant wheat strain, submitted six weeks ago, with Celeste as sole investigator. The supporting data is Iris’s data, re-typed with the labels changed.',
              'A copy of the complaint against Iris, signed by Celeste, accuses Iris of “data manipulation” and recommends that the review be held before publication. The date on the complaint is the day Iris died.',
              'In the bin, a train ticket to the agricultural institute, dated tomorrow, in Celeste’s name. She was going to present the paper as her own.'
            ]
          },
          {
            id: 'cipher', label: 'Decode the dedication', icon: 'cipher', kind: 'puzzle', puzzle: 'plant-cipher',
            desc: 'A message in the plant labels', requires: ['grant-letter'],
            hint: 'Iris labelled every plant in Latin. The first letter of each label in the fern aisle spells something.'
          }
        ]
      }
    ],
    puzzles: {
      'toxin-mix': {
        type: 'mix', title: 'The Bitter Cup', subtitle: 'Reconstruct the tincture', icon: 'flask',
        reagents: [
          { name: 'Digitalis tincture', color: '#f472b6' },
          { name: 'Black tea', color: '#92400e' },
          { name: 'Tannin', color: '#a16207' },
          { name: 'Honey', color: '#fbbf24' }
        ],
        order: [1, 0, 2, 3],
        prompt: 'The lab has identified digitalis in the teacup. Reconstruct the order in which the cup was made, based on the residue layers.',
        note: 'Tea first, then the tincture, then the tannin to mask the bitterness, then the honey. The layers in the cup tell you the order.',
        hintText: 'The tea is the base. Digitalis was added while the tea was still hot. Tannin came next, then honey.',
        success: 'The layers resolve: tea, digitalis, tannin, honey. The tincture was added to a hot drink by someone who knew exactly how bitter it would be.',
        successTitle: 'The cup is reconstructed.',
        gives: ['toxin-id'], flags: ['mixDone'],
        short: 'Digitalis was added to the tea before the tannin.',
        log: 'The teacup layers show tea, digitalis, tannin, then honey — a deliberate dose masked with bitterness and sweetness.'
      },
      'plant-cipher': {
        type: 'cipher', title: 'The Plant Labels', subtitle: 'A message in Latin', icon: 'cipher',
        plain: 'CELESTE WARD', shift: 4, answer: ['celeste ward', 'celesteward'],
        prompt: 'Iris labelled every bed in Latin. The first letters of the labels in the fern aisle are not a botanical sequence. They are a message.',
        note: 'Turn the wheel back until the letters resolve into a name. The first word has seven letters.',
        hintText: 'Iris was a botanist, not a spy. She used the same simple shift she used for her field notes: four letters back.',
        success: 'The labels resolve into a name: <b>CELESTE WARD</b>. Iris had been spelling it out in the glasshouse for weeks, one label at a time.',
        successTitle: 'The labels name Ward.',
        gives: ['label-message'], flags: ['labelDecoded'],
        short: 'Iris’s plant labels spell CELESTE WARD.',
        log: 'The first letters of Iris’s plant labels decode to CELESTE WARD — a message left in plain sight for anyone who knew how to read it.'
      }
    },
    suspects: [
      {
        id: 'rowan', name: 'Rowan Pike', role: 'Research assistant · found the body', location: 'greenhouse', locationName: 'Glasshouse', tag: 'Witness / suspect',
        portrait: { seed: 'rowan-pike', hair: 'wavy', hairColor: '#6b4a2b', skin: 1, expression: 'shocked', collar: 'shirt', eyes: '#3a5a40' },
        intro: 'Rowan is twenty-eight, with soil under his nails and the fixed calm of someone in shock. He found Iris at half seven and called the police at ten to eight. He has not stopped apologising for touching the teacup.',
        questions: [
          {
            q: 'What happened when you found her?', gives: ['rowan-story'],
            a: '“I opened the glasshouse at seven thirty. The door was locked, but the key was in my pocket. She was in the fern aisle. I thought she had fainted. I picked up the cup to move it and then I realised she was cold.”',
            follow: 'He demonstrates picking up the cup with two fingers. It is exactly how the cup was found.'
          },
          {
            q: 'Why did Iris turn the foxglove label around?', requires: ['foxglove-bed'],
            a: '“She thought someone was coming in at night. She changed the lock and started labelling the beds in code.” He looks at the bed. “She told me not to touch the foxgloves. She said they were evidence.”<br><br>“Evidence of what, I asked her. She said, ‘Of who I am not.’”',
            gives: ['rowan-message']
          },
          {
            q: 'The fridge log says you signed out the tincture.', requires: ['missing-vial'],
            a: '“I signed for a saline sample. Look at the time — 21:10. I was at the pub with the other assistants at nine. The landlord will remember, I spilled a pint on him.” He swallows. “The signature is mine. The time is not. Someone copied it from the sample book.”',
            gives: ['rowan-alibi'], flags: ['rowanBroke']
          },
          {
            q: 'Iris left you the ferns in her will. Not the glasshouse — the ferns.', requires: ['will-draft'],
            a: 'He laughs, and then cries. “That is exactly what she would do. She knew I hated the ferns. She said I would learn to love them or die trying.”<br><br>“I did not kill her. I did not need the glasshouse. I wanted the research to survive. So did she.”',
            gives: ['rowan-grief']
          }
        ],
        after: 'He gives you his trainers without being asked. The soles are worn smooth; they do not match the print in the bed.'
      },
      {
        id: 'abe', name: 'Abe Moon', role: 'Groundskeeper · has a key', location: 'centre', locationName: 'Garden centre', tag: 'Witness',
        portrait: { seed: 'abe-moon', hair: 'buzz', hairColor: '#d1d5db', skin: 2, expression: 'calm', collar: 'overalls', eyes: '#2b1a12', age: 'old' },
        intro: 'Abe Moon has spent thirty years keeping plants alive and has the quiet authority of a man who knows where every pipe and key is buried. He calls Iris “the doctor” and speaks of her in the present tense. He does not seem surprised that she is dead, only tired.',
        questions: [
          {
            q: 'Who has keys to the glasshouse?', gives: ['abe-keys'],
            a: '“Me, the doctor, and the institute office. The office key hangs in a cupboard. Anyone with the office code can take it.” He looks at his hands. “I told her to change the lock. She changed it and did not tell the institute. She said she wanted the spare to stay where she could see it.”',
            follow: 'The spare key was found in the office cupboard. The office code is known to the entire senior staff.'
          },
          {
            q: 'You sold Celeste Ward a foxglove tincture.', requires: ['sales-log'],
            a: '“I sold the institute a tincture on the account. Dr Ward signed for it. A young man in a green coat collected it.” He shakes his head. “I do not know why a botanist needs a tincture. You can make it from the plants. That is the point of the plants.”',
            gives: ['abe-testimony']
          }
        ],
        after: 'He asks you not to trample the foxglove bed. Then he asks whether the doctor suffered. You tell him no. It is mostly true.'
      },
      {
        id: 'celeste', name: 'Dr Celeste Ward', role: 'Rival botanist · removed from the paper', location: 'office', locationName: 'Institute office', tag: 'Prime suspect',
        portrait: { seed: 'celeste-ward', hair: 'bob', hairColor: '#4a2b1b', skin: 0, expression: 'cold', collar: 'suit', eyes: '#2b1a12', glasses: 'rect' },
        intro: 'Celeste Ward is forty-six, precise, and wearing a suit in a building full of people in boots. She has the confidence of someone who has always been the smartest person in the room and the anger of someone who has recently been told she is not.',
        questions: [
          {
            q: 'Where were you the night Iris died?', gives: ['celeste-alibi'],
            a: '“At home. Marking student papers. I sent my last email at eleven forty.” She gives you the timestamp without being asked. “I live alone. Nobody can confirm it, but the email is real.”',
            follow: 'The email was sent from her phone at 23:40. The glasshouse is a nine-minute walk from her front door.'
          },
          {
            q: 'You were removed from the paper.', requires: ['paper-draft'],
            a: '“I was removed because Iris could not tolerate a co-author. The data was mine as much as hers. I helped design the trial.” Her jaw tightens. “She rewrote the results to make herself the sole author. That is not science. That is theft.”',
            gives: ['celeste-grievance'], flags: ['celesteHostile']
          },
          {
            q: 'The foxglove tincture was collected on your account.', requires: ['sales-log'],
            a: '“The institute account is shared. Anyone can use my name.” She taps a finger on the desk. “If I were going to poison someone, I would not buy the poison from the place where I work and sign for it.”',
            gives: ['celeste-deflect']
          },
          {
            q: 'The plant labels spell your name, Celeste.', requires: ['label-message'], present: true,
            a: 'She looks at the photographs of the labels. For the first time, she is silent. “She was doing it for weeks,” she says eventually. “I thought it was a joke. She was like that.”<br><br>“I did not go to the glasshouse. I did not need to. She was going to be reviewed on Friday. I was going to win.” A pause. “I did go to her cottage at half ten. To talk. She told me to leave.”',
            gives: ['celeste-cottage'], flags: ['celesteBroke']
          }
        ],
        after: 'She asks whether the review will still go ahead. You tell her the review is the least of her problems. For once, she has nothing to say.'
      }
    ],
    clues: {
      'autopsy-note': {
        name: 'The foxglove dose', caption: 'Digitalis · death 22:00–02:00', icon: 'blood', type: 'Forensic report',
        desc: 'Iris died of digitalis poisoning between ten and two. The dose was large and deliberate. There were no signs of a struggle.',
        tells: 'She drank the poison willingly, in her own glasshouse, at night. The killer did not have to force her.'
      },
      'tea-sample': {
        name: 'The teacup', caption: 'Black tea · digitalis · tannin', icon: 'glass', type: 'Physical evidence',
        desc: 'A half-full teacup with a faint bitter, woody note. The lab finds digitalis, tannin, and honey. The cup was wiped at the rim but not inside.',
        tells: 'The poison was masked with tannin and honey. This was a prepared dose, not a handful of leaves thrown in.'
      },
      'foxglove-bed': {
        name: 'The cut foxglove', caption: 'Ragged stems · fresh clippings', icon: 'fiber', type: 'Physical evidence',
        desc: 'The foxglove bed has been cut in a hurry. The clippings are still green. A small rubber-soled footprint is pressed into the soil.',
        tells: 'The poison was taken from the glasshouse itself, by someone who knew which plant to cut and did not care about neatness.'
      },
      'research-notes': {
        name: 'Iris’s notebook', caption: '“I will not be bullied.”', icon: 'note', type: 'Written evidence',
        desc: 'A decade of work, a paper due to publish, and a missing page. The surviving page names C.W., who asked to be a co-author and was refused.',
        tells: 'The paper was worth killing for. The rival had both a motive and a reason to want the data.'
      },
      'missing-vial': {
        name: 'The missing tincture', caption: 'Fridge forced · 30ml digitalis', icon: 'pill', type: 'Physical evidence',
        desc: 'A tray labelled “D. PURPUREA — TINCTURE — 30ML” is empty. The fridge lock was forced with a screwdriver. The log shows a signature at 21:10.',
        tells: 'The poison was taken from the glasshouse lab, not bought or made outside. The time is before Iris’s cottage guests arrived.'
      },
      'paper-draft': {
        name: 'The draft paper', caption: 'Iris’s name alone', icon: 'note', type: 'Document',
        desc: 'A complete draft with Iris’s name alone on the title page and a note: “C.W. removed from author list — data integrity.”',
        tells: 'Iris was about to publish without her rival. The paper was the motive, and the note is the insult.'
      },
      'will-draft': {
        name: 'Iris’s will', caption: 'Everything to the institute · the ferns to Rowan', icon: 'letter', type: 'Document',
        desc: 'Iris left the glasshouse and research archive to the institute, with a handwritten codicil: “Rowan gets the ferns.”',
        tells: 'Rowan had no financial motive, and Iris was thinking about the future of the research. The will is a portrait of a woman who expected to live.'
      },
      'calendar-note': {
        name: 'The kitchen calendar', caption: '“R — 21:00 — tea. C — 22:30 — NO.”', icon: 'note', type: 'Written evidence',
        desc: 'Two visitors on the night of the death. Two washed mugs, one with a green ring inside. A note: “If anything happens, the data is in the third drawer.”',
        tells: 'Iris was not surprised by visitors. She was keeping a record, and she was already afraid.'
      },
      'sales-log': {
        name: 'The garden centre log', caption: 'Tincture on C. Ward’s account', icon: 'ledger', type: 'Records',
        desc: 'A 30ml foxglove tincture sold to Celeste Ward’s institute account, collected by a man in a green coat. Three packets of foxglove seeds sold to Rowan Pike for cash.',
        tells: 'The poison was acquired in Celeste’s name. The seeds are a red herring; foxglove grows wild, and the tincture is the dose.'
      },
      'ghost-story': {
        name: 'The glasshouse keys', caption: 'Three keys · one spare', icon: 'key', type: 'Witness statement',
        desc: 'Abe has one key, Iris had one, and a spare hangs in the institute office cupboard. Iris changed the lock last month after someone was in the beds at night.',
        tells: 'The locked glasshouse had three keys. Anyone with the office code could take the spare.'
      },
      'toxin-id': {
        name: 'The digitalis tincture', caption: 'Tea · tannin · honey', icon: 'flask', type: 'Forensic evidence',
        desc: 'The teacup reveals digitalis layered between tea and tannin, sweetened with honey. The dose came from the missing lab tray.',
        tells: 'The killer used the glasshouse’s own tincture, prepared a deliberate dose, and knew Iris’s sweet tooth well enough to hide the bitterness.'
      },
      'label-message': {
        name: 'The plant labels', caption: 'First letters: CELESTE WARD', icon: 'cipher', type: 'Coded evidence',
        desc: 'The first letters of the labels in the fern aisle decode to CELESTE WARD. Iris had been spelling the name out for weeks.',
        tells: 'Iris knew who was threatening her. She left the accusation in the one place her rival would never look.'
      },
      'grant-letter': {
        name: 'The grant application', caption: 'Iris’s data, Celeste’s name', icon: 'ledger', type: 'Financial evidence',
        desc: 'A grant application submitted by Celeste six weeks ago, using Iris’s data with the labels changed. A complaint against Iris dated the day she died.',
        tells: 'Celeste was prepared to take the paper by process as well as theft. The complaint was the first move in a plan that needed Iris gone.'
      },
      'rowan-story': {
        name: 'Rowan’s account', caption: '“I picked up the cup.”', icon: 'note', type: 'Witness statement',
        desc: 'Rowan opened the glasshouse with his own key, found Iris, picked up the teacup, and called the police. He did not see anyone else.',
        tells: 'Rowan had access and opportunity, but his first act was to contaminate the evidence, not to hide it.'
      },
      'rowan-message': {
        name: '“Who I am not”', caption: 'Iris on the foxgloves', icon: 'note', type: 'Witness statement',
        desc: 'Iris told Rowan the foxgloves were evidence of “who I am not” and warned him not to touch them.',
        tells: 'Iris knew the plants were being used to frame her or someone else. The foxglove bed was a stage, not a source.'
      },
      'rowan-alibi': {
        name: 'Rowan’s alibi', caption: 'The pub · 21:00–23:00', icon: 'receipt', type: 'Alibi',
        desc: 'A pub landlord remembers Rowan spilling a pint at nine. He was there until eleven. The fridge log signature was copied from the sample book.',
        tells: 'Rowan was not in the lab when the tincture was taken. Someone used his name after he left.'
      },
      'rowan-grief': {
        name: '“She knew I hated the ferns”', caption: 'Rowan on the will', icon: 'note', type: 'Statement',
        desc: 'Rowan laughs and cries at the codicil. He says he wanted the research to survive, not the glasshouse.',
        tells: 'Rowan’s grief is real, and his motive is sentimental rather than financial. He is not the killer.'
      },
      'abe-keys': {
        name: 'The spare key', caption: 'Institute office cupboard', icon: 'key', type: 'Witness statement',
        desc: 'The spare glasshouse key hangs in the institute office cupboard. The office code is known to all senior staff.',
        tells: 'The locked glasshouse was not a locked room. Anyone with the office code could have taken the key.'
      },
      'abe-testimony': {
        name: 'Abe on the tincture', caption: 'Collected by a man in green', icon: 'note', type: 'Witness statement',
        desc: 'Abe sold the institute a foxglove tincture on Celeste Ward’s account. A young man in a green coat collected it.',
        tells: 'The tincture was collected by someone acting for Celeste, or someone who wanted her name on the record.'
      },
      'celeste-alibi': {
        name: 'Celeste’s alibi', caption: 'Home · 23:40 email', icon: 'mail', type: 'Alibi',
        desc: 'Celeste says she was home marking papers and sent an email at 23:40. The glasshouse is a nine-minute walk from her door.',
        tells: 'The email proves she was awake, not that she was home. Nine minutes is enough to walk to a glasshouse and back.'
      },
      'celeste-grievance': {
        name: '“That is theft”', caption: 'Celeste on the paper', icon: 'audio', type: 'Statement',
        desc: 'Celeste says the data was as much hers as Iris’s and that Iris rewrote the results to make herself sole author.',
        tells: 'She believes she has been robbed of credit. That is a powerful motive for a proud scientist.'
      },
      'celeste-deflect': {
        name: '“The account is shared”', caption: 'Celeste on the tincture', icon: 'note', type: 'Interview',
        desc: 'Celeste dismisses the tincture purchase as a shared account and points out she would not sign for her own poison.',
        tells: 'It is a good point, and it is also the reason the purchase is not the decisive evidence.'
      },
      'celeste-cottage': {
        name: '“I went to talk”', caption: 'Celeste at 22:30', icon: 'audio', type: 'Statement',
        desc: 'Celeste admits she went to Iris’s cottage at half ten to talk and was told to leave. She says she did not go to the glasshouse.',
        tells: 'She was in the grounds at the time Iris was dying. Her alibi is now a confession of presence.'
      }
    },
    solution: {
      minEvidence: 8,
      questions: [
        {
          q: 'Who killed Dr Iris Bell?',
          options: [
            { t: 'Dr Celeste Ward — her rival', v: 'celeste' },
            { t: 'Rowan Pike — her assistant', v: 'rowan' },
            { t: 'Abe Moon — the groundskeeper', v: 'abe' },
            { t: 'Iris took her own life rather than face the review', v: 'suicide' }
          ],
          answer: 'celeste'
        },
        {
          q: 'How was the poison administered?',
          options: [
            { t: 'It was injected into her arm', v: 'inject' },
            { t: 'It was stirred into her tea at the cottage', v: 'tea' },
            { t: 'She breathed fumes in the glasshouse', v: 'fumes' },
            { t: 'It was absorbed through the cut on her thumb', v: 'cut' }
          ],
          answer: 'tea'
        },
        {
          q: 'What was the motive?',
          options: [
            { t: 'The research paper and the credit for Iris’s data', v: 'credit' },
            { t: 'An inheritance from Iris’s will', v: 'inheritance' },
            { t: 'A romantic rivalry over Rowan', v: 'romance' },
            { t: 'A dispute over the glasshouse lease', v: 'lease' }
          ],
          answer: 'credit'
        },
        {
          q: 'Which evidence breaks the case?',
          options: [
            { t: 'The cut foxglove and the footprint', v: 'foxglove' },
            { t: 'The digitalis tincture and Iris’s plant-label cipher', v: 'toxin' },
            { t: 'Rowan’s pub alibi and the ferns in the will', v: 'rowan' },
            { t: 'Abe’s story about the glasshouse ghost', v: 'ghost' }
          ],
          answer: 'toxin'
        }
      ],
      verdict: {
        who: 'Dr Celeste Ward, 46 — botanist, Thornwood Institute',
        whoDesc: 'was arrested at the institute with a train ticket to the agricultural review in her bag.',
        how: 'She took the spare key from the institute office, cut foxglove from the glasshouse bed, drew a digitalis tincture from the lab fridge, and brought Iris a cup of tea at the cottage. She used tannin and honey to mask the bitterness. Then she left Iris to die among the plants she had spent her life naming.',
        why: 'Iris was about to publish a decade of research under her own name, with Celeste removed for data integrity. Celeste had built her career on the same data and was prepared to take it by process — or by poison.',
        key: 'Iris’s plant labels. She had been spelling CELESTE WARD in the first letters of her beds for weeks, the accusation hidden in plain sight, in the one language her rival was too proud to read.'
      },
      reveal: [
        'The Thornwood glasshouse was Iris Bell’s life’s work. She had spent twelve years breeding a strain of wheat that could survive a dry summer, and the paper was finally ready. Celeste Ward had helped design the trial, but she had not written the paper, and she had not earned the data. When Iris removed her from the author list, Celeste did what a certain kind of scientist does when the credit is taken away: she decided the work belonged to her.',
        'Iris knew something was wrong. She changed the lock. She labelled the beds in a private code. She turned the foxglove label around and wrote “Not mine. Ask R.” on the back. She told her assistant the foxgloves were evidence of “who I am not”. She wrote in her notebook: I will not be bullied.',
        'On the last night of her life, she made two cups of tea. Rowan came at nine and left. Celeste came at half ten and was told to leave. But Celeste did not leave the grounds. She took the spare key from the institute office, cut foxglove from the bed, drew a tincture from the lab fridge, and came back with a fresh cup. Tea, digitalis, tannin, honey.',
        'Iris was dead by two in the morning. The glasshouse was locked. The foxgloves were cut. The tincture tray was empty. The plant labels spelled CELESTE WARD in first letters, a message that had been growing in the beds for weeks, waiting for someone to read it.',
        'Celeste Ward was arrested with a train ticket to the agricultural institute in her bag. She had planned to present Iris’s paper the next day. She had even prepared a slide thanking the late Dr Bell for her “foundational contributions”. The slide was in her laptop, along with the data, unchanged except for the name on the title page.',
        'The institute has withdrawn the paper. The wheat strain survives. Rowan Pike has been given the ferns, as promised, and has killed three of them already.'
      ],
      quote: 'She wrote the name in the flowerbeds. It was the only place her rival never thought to look.',
      twist: 'The foxglove was not the poison Celeste intended. She had planned to use the lab’s digitalis tincture, which is traceable and clinical. The foxgloves in the bed were Iris’s own warning — a plant she had planted years earlier to remind herself what a beautiful thing can do. Celeste cut them because she wanted the death to look like an accident in a garden. She made it look like a message instead.'
    }
  });

})();
