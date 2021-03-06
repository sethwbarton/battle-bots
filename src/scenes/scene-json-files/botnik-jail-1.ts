import { talkToNpc } from '../../game/npc'
import { defaultBedInteract } from '../../game/bed'

export const botnikJailOne = {
  walls: [
    {
      coords: {
        x: 2,
        y: 0,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 0,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 0,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 0,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 0,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 2,
        y: 1,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 1,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 1,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 1,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 1,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 2,
        y: 2,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 2,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 2,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 2,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 2,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 2,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 3,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 6,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 9,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 12,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 15,
        y: 3,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 2,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 3,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 6,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 9,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 12,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 15,
        y: 6,
      },
      symbol: '-',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 2,
        y: 7,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 7,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 7,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 7,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 7,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 2,
        y: 8,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 8,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 8,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 8,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 8,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 2,
        y: 9,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 5,
        y: 9,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 8,
        y: 9,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 11,
        y: 9,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
    {
      coords: {
        x: 14,
        y: 9,
      },
      symbol: '|',
      collidable: true,
      hitpoints: 100000000,
    },
  ],
  beds: [
    {
      interact: defaultBedInteract,
      coords: {
        x: 1,
        y: 0,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 4,
        y: 0,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 7,
        y: 0,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 10,
        y: 0,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 13,
        y: 0,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 16,
        y: 0,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 1,
        y: 9,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 3,
        y: 9,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 6,
        y: 9,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 9,
        y: 9,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 12,
        y: 9,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
    {
      interact: defaultBedInteract,
      coords: {
        x: 15,
        y: 9,
      },
      symbol: '??',
      collidable: false,
      hitpoints: 100,
    },
  ],
  doors: [
    {
      collidable: true,
      coords: {
        x: 1,
        y: 3,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 4,
        y: 3,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 7,
        y: 3,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 10,
        y: 3,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 13,
        y: 3,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 16,
        y: 3,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 1,
        y: 6,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 4,
        y: 6,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 7,
        y: 6,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 10,
        y: 6,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 13,
        y: 6,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
    {
      collidable: true,
      coords: {
        x: 16,
        y: 6,
      },
      hitpoints: 100000000,
      symbol: '~',
    },
  ],
  npcs: [
    {
      name: 'Galuel Tulant',
      interact: talkToNpc,
      dialogueMap: {
        openingPhrase: 'Yes?',
        options: [],
      },
      collidable: true,
      coords: {
        x: 6,
        y: 0,
      },
      hitpoints: 100,
      symbol: '??',
    },
    {
      interact: talkToNpc,
      name: 'Fralerus Junain',
      dialogueMap: {
        openingPhrase: 'Yes?',
        options: [],
      },
      collidable: true,
      coords: {
        x: 4,
        y: 1,
      },
      hitpoints: 100,
      symbol: '??',
    },
    {
      interact: talkToNpc,
      name: 'Dunibane Maxich',
      dialogueMap: {
        openingPhrase: 'Yes?',
        options: [],
      },
      collidable: true,
      coords: {
        x: 12,
        y: 1,
      },
      hitpoints: 100,
      symbol: '??',
    },
    {
      interact: talkToNpc,
      name: 'Zelphar Sylric',
      dialogueMap: {
        openingPhrase: 'Yes?',
        options: [],
      },
      collidable: true,
      coords: {
        x: 15,
        y: 1,
      },
      hitpoints: 100,
      symbol: '??',
    },
    {
      interact: talkToNpc,
      name: 'Esdergus Callenix',
      dialogueMap: {
        openingPhrase: 'Yes?',
        options: [],
      },
      collidable: true,
      coords: {
        x: 9,
        y: 2,
      },
      hitpoints: 100,
      symbol: '??',
    },
    {
      interact: talkToNpc,
      name: 'Malon Sarnala',
      dialogueMap: {
        openingPhrase: 'Yes?',
        options: [],
      },
      collidable: true,
      coords: {
        x: 1,
        y: 7,
      },
      hitpoints: 100,
      symbol: '??',
    },
    {
      interact: talkToNpc,
      name: 'Polonius Merc',
      dialogueMap: {
        openingPhrase:
          "Well well well... look at the trash the King's lackeys finally decided to clean up. How ya doin' sweet heart? Hope the guards weren't too rough on your soft skin.",
        options: [
          {
            subject: 'Your Background',
            response: "I ain't talkin to you.",
          },
          {
            subject: 'Escape',
            response:
              "Gee, what an original idea! Ya think I haven't tried it? Ya think? I don't know how to escape. Just leave me alone. Check under your bed or something and get lost.",
          },
        ],
      },
      collidable: true,
      coords: {
        x: 9,
        y: 7,
      },
      hitpoints: 100,
      symbol: '??',
    },
    {
      interact: talkToNpc,
      name: 'Kolvar Miracan',
      dialogueMap: {
        openingPhrase: 'Yes?',
        options: [],
      },
      collidable: true,
      coords: {
        x: 15,
        y: 7,
      },
      hitpoints: 100,
      symbol: '??',
    },
  ],
  id: 'botnik-jail-1',
}
