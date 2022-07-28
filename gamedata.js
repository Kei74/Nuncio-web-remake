let textNodes = [
    {
      id: 'Docks',
      event: 'Nuncio',
      text: 'Taciturn functionaries walk the docks, in the uniforms of postmen. An enormous crowned statue casts a chilling shadow.The shadows gleam with rats\' eyes. Their ceaseless chittering rolls like the tide.',
      options: [
        {
          btxt: 'Go to the postmen\'s tavern',
          txt:  'The Inky Blotter, it\'s called. The sign doesn\'t look like much.',
          bstxt: 'Warmer inside than it looks',
          stxt: 'Faces turn in your direction, but no one seems surprised to have a new arrival on the island.',
          nextText: 'Tavern',
          repeatable: true
        },
        {
          btxt: 'Explore along the beach',
          txt:  'There\'s a long stretch of shale, dotted with washed-up kegs and barrels and smaller flotsam.',
          bstxt: 'Shifty going',
          stxt: 'The rocks slip and slither underfoot, but you keep your balance.',
          nextText: 'Beach',
          repeatable: true
        },
        {
          btxt: 'Try a shift at the Dead Letter Office',
          txt:  'There is a sign of a cancelled stamp over the door.',
          bstxt: 'Extensive tour',
          stxt: 'Blunt Thomas takes you around the office: a small collection room where those retrieving letters may state their business. A much larger set of back offices where newly arrived letters and parcels are collected and sorted. A dank, briny smell that never goes away, presumably because so many of the parcels spent time in the water before they arrived here.\n\nIn the back room is a machine manned (ratted?) by a Postal Rat, a Rattus Faber in a pinstriped hat. It shovels sludge-damp letters into the machine\'s hopper and they come out dried, cleaned, pressed, and sorted into slots by size and quality of paper.',
          requiredState: (currentState) => currentState.Office == 1,
          nextText: 'Office'
        },
        {
          btxt: 'Do some more shiftwork at the Dead Letter Office',
          txt:  'It seems to be the chief occupation hereabouts.',
          bstxt: 'The bell chimes above the door',
          stxt: 'The fellow manning Collections looks awake for half a second when you come in, until he realizes you\'re here to relieve him.',
          requiredState: (currentState) => currentState.Office >= 2,
          nextText: 'Office',
          repeatable: true
        }
      ]
    },
    {
      id: 'Tavern',
      event: 'The Inky Blotter',
      text: 'Lit by two roaring fires, one at either end of the room. The bartender is in postman\'s uniform, like almost all of the patrons. A noseless postal inspector called Blunt Thomas delivers the drinks, clears tables, and stacks the firewood.',
      options: [
        {
          btxt: 'Listen in on postal tall tales',
          txt:  'Fishermen brag about fish that got away. Postmen brag about hard deliveries.',
          bstxt: 'Amazing what you get for a penny stamp',
          stxt: 'Delicate bottles lowered down chimneys on a rope. DO NOT FOLD UNDER ANY CIRCUMSTANCE letters curled through a narrow slot. Rattling, groaning crates brought back to the same address every day for twenty-two days running. The windows they pried open, the servants they bribed, the delivery surcharges they paid out of their own salaries just to get rid of one more packet.\n\nIt is hard to tell which they hate more: the senders of mail, or the recipients. \"Stands to reason, if the message was a welcome one, they\'d tell the other fellow in person,\" reflects the Hairless Postwoman.',
          requiredState: (currentState) => currentState.Taverntalk <= 3,
          setState: (currentState) => currentState.Taverntalk++
        },
        {
          btxt: 'Ask why the local currency consists of rats',
          txt:  'Two strings of rats for a pint of ale. Three strings for wine. Five for the tolerable brandy under the bar.',
          bstxt: 'Scarcity is not an issue',
          stxt: 'The Hairless Postwoman at the end of the bar smiles mirthlessly; or maybe it\'s just the lack of eyebrows that does it. \"Long enough carrying the things around, you get into the habit,\" she says.\n\nThen she tells you that if you stay out late enough, you\'ll see some of the postmen making a procession to the centre of the island, stringing up rats around the statue like Yuletide decorations, in prayer to an ancient deity of this place.\n\nFrom the coughing and choking elsewhere in the pub, you\'d guess this is a story they often tell to newcomers.',
          requiredState: (currentState) => currentState.Taverntalk >= 1 && currentState.Taverntalk <= 3,
          setState: (currentState) => currentState.Taverntalk++
        },
        {
          btxt: 'Ask about the big statue in the center of the island',
          txt: 'If there were a guidebook for visitors, it would have to be the first entry.',
          bstxt: 'Scarcity is not an issue',
          stxt: '\"Oh, that. It\'s all of us, isn\'t it? Sort of the spirit of the island.\" Most of them don\'t seem troubled for more of an explanation than that. Though the Hairless Postwoman tells you it didn\'t always look like a Fallen London postman at all: that it used to have a different face, and a more old-fashioned outfit.',
          requiredState: (currentState) => currentState.Taverntalk <= 3,
          setState: (currentState) => currentState.Taverntalk++
        },
        {
          btxt: 'Ask why the Hairless Postwoman is hairless',
          txt:  'Legacy of some interestingly explosive package, maybe?',
          bstxt: 'Faux pas',
          stxt: '\"No,\" she says. Curt, not pleased you asked. \"Still had eyebrows when I came to Nuncio.\"\n\nThe postman at the next bench diverts you, speaks in a low voice. \"Lots of people find habits when they can\'t deliver the post any more. This one has a plucking habit. Best learn not to notice.\"\n\nYou glance up. The Hairless Postwoman is still glaring at you.',
          requiredState: (currentState) => currentState.Taverntalk <= 3 && currentState.Taverntalk >=1,
          setState: (currentState) => currentState.Taverntalk--
        },
        {
          btxt: 'Ask how they occupy themselves all day',
          txt: 'There must be more than this...?',
          bstxt: 'Dead Letter Office',
          stxt: 'Big building, centre of town. Hard to miss. You can work there too, if you want. It\'s not clear whether this is a generous offer or a threat.',
          requiredState: (currentState) => currentState.Office == 0 && currentState.Taverntalk >=2,
          setState: (currentState) => currentState.Office++
        },
        {
          btxt: 'Ask to borrow a uniform',
          txt: 'If you\'re to fit in here, you\'ll need one.',
          bstxt: 'Look but not touch',
          stxt: 'They\'re polite, even apologetic, about your request. You\'re welcome here, and welcome to take shifts at the Dead Letter Office, but you cannot wear the uniform unless you were a postal employee back in Fallen London. Regulations.\n\nBlunt Thomas lets you have a look at his uniform jacket, at least. Neat stitching, gilded buttons, a thin but dignified circle of braid at the collar.\n\nInside, a patch that goes over the heart, stitched with six red letters. You can\'t read it, but it makes your eyes itch and your scalp feel like burning.',
          requiredState: (currentState) => currentState.Taverntalk >= 3,
          setState: (currentState) => currentState.Taverntalk++
        },
        {
          btxt: 'Ask why letters wash ashore here',
          txt: 'Maybe one of them will know.',
          bstxt: 'The Pull',
          stxt: 'It\'s the Pull, they tell you. Dead letters are like so many iron filings, drawn to Nuncio.\n\n"See for yourself," suggests the Hairless Postwoman. "Go down to the shore, collect up a bunch of what\'s washed there, and you\'ll feel it soon enough."\n\n"Saves time for the rest of us," says another voice. Apparently beach-scavenging is a civic duty hereabouts, like working in the Dead Letter Office.',
          requiredState: (currentState) => currentState.Taverntalk >= 2 && currentState.Secrets ==1,
          setState: (currentState) => { currentState.Secrets = 2; if(currentState.Taverntalk<4) {currentState.Taverntalk++;}}
        },
        {
          btxt: 'Ask why the postmen came here',
          txt: 'You don\'t get the impression they\'re making a holiday of it.',
          bstxt: 'All unhappy postmen are alike',
          stxt: 'Their stories have different beginnings - boredom, frustration, a fellow who was overwhelmed by guilt after a misdelivery - but they always end the same way. Undeliverable letters and parcels accumulating over months and years. Attempts to ignore the undeliverable, to shove it into a desk or carry it in the bottom of the bag. An increasing preoccupation with these items.\n\nFinally, a decision: to meet the compulsion, to go to Nuncio and be rid at last of the remnants.\n\nThe postmen do not bring the dead letters to Nuncio. The letters bring the postmen.',
          requiredState: (currentState) => currentState.Taverntalk >= 2 && currentState.Secrets ==2,
          setState: (currentState) => { currentState.Secrets = 3; if(currentState.Taverntalk<4) {currentState.Taverntalk++;}}
        },
        {
          btxt: 'Back to the docks',
          txt:  'Leave the warmth of the Blotter for now.',
          nextText: 'Docks',
          repeatable: true
        }
      ]
    },
    {
      id: 3,
      text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
      options: [
        {
          text: 'Explore the castle',
          nextText: 4
        },
        {
          text: 'Find a room to sleep at in the town',
          nextText: 5
        },
        {
          text: 'Find some hay in a stable to sleep in',
          nextText: 6
        }
      ]
    },
    {
      id: 4,
      text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 5,
      text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 6,
      event: 'Survived',
      text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
      options: [
        {
          text: 'Explore the castle',
          nextText: 7
        }
      ]
    },
    {
      id: 7,
      text: 'While exploring the castle you come across a horrible monster in your path.',
      options: [
        {
          text: 'Try to run',
          nextText: 8
        },
        {
          text: 'Attack it with your sword',
          requiredState: (currentState) => currentState.sword,
          nextText: 9
        },
        {
          text: 'Hide behind your shield',
          requiredState: (currentState) => currentState.shield,
          nextText: 10
        },
        {
          text: 'Throw the blue goo at it',
          requiredState: (currentState) => currentState.blueGoo,
          nextText: 11
        }
      ]
    },
    {
      id: 8,
      text: 'Your attempts to run are in vain and the monster easily catches.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 9,
      text: 'You foolishly thought this monster could be slain with a single sword.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 10,
      text: 'The monster laughed as you hid behind your shield and ate you.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 11,
      text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
      options: [
        {
          text: 'Congratulations. Play Again.',
          nextText: -1
        }
      ]
    }
  ]