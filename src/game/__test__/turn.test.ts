import { GameState } from '../game-state'
import { doPlayerTurn } from '../turn'
import { Command } from '../command'
import { assocPath, dec, inc } from 'ramda'
import { exampleGameState } from './test-data/example-game-state'
import { mockUiController } from './test-data/mock-ui-controller'
import { Bed, defaultBedInteract } from '../bed'
import { Wall } from '../wall'

const exampleNpc = {
  name: 'Testing Npc',
  coords: { x: 1, y: 1 },
  symbol: '1',
  hitpoints: 100,
  collidable: true,
  dialogueMap: {
    openingPhrase: 'Hello?',
    options: [{ subject: '1', response: '2' }],
  },
}

const exampleGameStateWithNpc: GameState = assocPath(
  ['currentScene', 'npcs'],
  [exampleNpc],
  exampleGameState
)

describe('doPlayerTurn', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    exampleGameStateWithNpc.currentScene.npcs = [
      {
        name: 'Testing Npc',
        coords: { x: 1, y: 1 },
        symbol: '1',
        hitpoints: 100,
        collidable: true,
        dialogueMap: {
          openingPhrase: 'Hello?',
          options: [{ subject: '1', response: '2' }],
        },
      },
    ]
  })

  it("shows the help dialogue if the command doesn't compute", async () => {
    let callCount = 0
    mockUiController.promptInput = (input: string) => {
      if (callCount === 0) {
        callCount += 1
        return Promise.resolve('blah blah blah')
      }
      return Promise.resolve('w')
    }

    mockUiController.display = jest.fn()

    await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(mockUiController.display.mock.calls.length).toEqual(1)
  })

  describe('Player Movement', () => {
    it('Moves the player up when the command is given', async () => {
      mockUiController.promptInput = () => Promise.resolve(Command.MoveUp)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.y).toEqual(
        dec(exampleGameStateWithNpc.player.coords.y)
      )
    })

    it('Moves the player down when the command is given', async () => {
      mockUiController.promptInput = () => Promise.resolve(Command.MoveDown)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.y).toEqual(
        inc(exampleGameStateWithNpc.player.coords.y)
      )
    })

    it('Moves the player right when the command is given', async () => {
      mockUiController.promptInput = () => Promise.resolve(Command.MoveRight)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        inc(exampleGameStateWithNpc.player.coords.x)
      )
    })

    it('Moves the player left when the command is given', async () => {
      mockUiController.promptInput = () => Promise.resolve(Command.MoveLeft)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        dec(exampleGameStateWithNpc.player.coords.x)
      )
    })

    it('Moves the player up left when the command is given', async () => {
      mockUiController.promptInput = () => Promise.resolve(Command.MoveUpLeft)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        dec(exampleGameStateWithNpc.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        dec(exampleGameStateWithNpc.player.coords.y)
      )
    })

    it('Moves the player up right when the command is given', async () => {
      mockUiController.promptInput = () => Promise.resolve(Command.MoveUpRight)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        inc(exampleGameStateWithNpc.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        dec(exampleGameStateWithNpc.player.coords.y)
      )
    })

    it('Moves the player down right when the command is given', async () => {
      mockUiController.promptInput = () =>
        Promise.resolve(Command.MoveDownRight)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        inc(exampleGameStateWithNpc.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        inc(exampleGameStateWithNpc.player.coords.y)
      )
    })

    it('Moves the player down left when the command is given', async () => {
      mockUiController.promptInput = () => Promise.resolve(Command.MoveDownLeft)
      const updatedGameState = await doPlayerTurn(
        exampleGameStateWithNpc,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        dec(exampleGameStateWithNpc.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        inc(exampleGameStateWithNpc.player.coords.y)
      )
    })
  })

  describe('Npc Interaction', () => {
    test("Talking to an NPC when there isn't one in that spot prompts the user that they can't talk to that and reprompts for input", async () => {
      let callCount = 0
      mockUiController.promptInput = () => {
        if (callCount === 0) {
          callCount += 1
          return Promise.resolve('talk c9')
        }
        if (callCount === 1) {
          callCount += 1
          return Promise.resolve('talk a1')
        }
        return Promise.resolve('a')
      }
      mockUiController.promptMultiChoice = jest.fn(() => {
        return Promise.resolve('quit')
      })

      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptMultiChoice.mock.calls.length).toEqual(2)
    })

    test("Talking to an NPC shows the NPC's opening dialogue", async () => {
      mockUiController.promptInput = () => Promise.resolve('talk A1')
      mockUiController.promptMultiChoice = jest.fn(() =>
        Promise.resolve('quit')
      )
      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptMultiChoice.mock.calls[0][0]).toEqual(
        exampleGameStateWithNpc.currentScene.npcs?.[0].dialogueMap
          ?.openingPhrase
      )
    })

    test("Talking to an NPC shows the NPC's dialogue options after the opening phrase", async () => {
      mockUiController.promptInput = () => Promise.resolve('talk A1')
      mockUiController.promptMultiChoice = jest.fn(() =>
        Promise.resolve('quit')
      )
      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptMultiChoice.mock.calls.length
      ).toEqual(1)
    })

    test('Talking to an NPC shows the proper dialogue options for that NPC', async () => {
      mockUiController.promptInput = () => Promise.resolve('talk A1')
      mockUiController.promptMultiChoice = jest.fn(() =>
        Promise.resolve('quit')
      )
      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptMultiChoice.mock.calls[0][1]
      ).toEqual(['1', 'quit'])
    })

    test('Talking to a different NPC', async () => {
      const anotherNPC = {
        name: 'A different NPC',
        coords: { x: 2, y: 2 },
        symbol: '2',
        hitpoints: 100,
        collidable: true,
        dialogueMap: {
          openingPhrase: 'A new opener',
          options: [
            {
              subject: 'Your background',
              response: "I don't talk to strangers.",
            },
          ],
        },
      }

      exampleGameStateWithNpc.currentScene.npcs?.push(anotherNPC)
      mockUiController.promptInput = () => Promise.resolve('talk B2')
      mockUiController.promptMultiChoice = jest.fn(() =>
        Promise.resolve('quit')
      )

      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptMultiChoice.mock.calls[0][0]).toEqual(
        anotherNPC.dialogueMap.openingPhrase
      )
      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptMultiChoice.mock.calls[0][1]
      ).toEqual(['Your background', 'quit'])
    })

    test('You can exchange dialogue with an NPC until you quit the conversation', async () => {
      const anotherNPC = {
        name: 'A different NPC',
        coords: { x: 2, y: 2 },
        symbol: '2',
        hitpoints: 100,
        collidable: true,
        dialogueMap: {
          openingPhrase: 'A new opener',
          options: [
            {
              subject: 'Your background',
              response: "I don't like you enough to tell.",
            },
            {
              subject: 'Your profession',
              response: "I'm a programmer.",
            },
            {
              subject: 'A little secret',
              response: 'Seth is a bad programmer.',
            },
          ],
        },
      }

      exampleGameStateWithNpc.currentScene.npcs?.push(anotherNPC)
      mockUiController.promptInput = () => Promise.resolve('talk B2')

      let callCount = 0
      // Ask about their background first. Then their profession. Then a secret.
      mockUiController.promptMultiChoice = jest.fn(() => {
        if (callCount === 0) {
          callCount += 1
          return Promise.resolve('Your background')
        }
        if (callCount === 1) {
          callCount += 1
          return Promise.resolve('Your profession')
        }
        if (callCount === 2) {
          callCount += 1
          return Promise.resolve('A little secret')
        }
        if (callCount === 3) {
          callCount += 1
          return Promise.resolve('quit')
        }
        return Promise.resolve('')
      })

      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptMultiChoice.mock.calls[1][0]).toEqual(
        "I don't like you enough to tell."
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptMultiChoice.mock.calls[2][0]).toEqual(
        "I'm a programmer."
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptMultiChoice.mock.calls[3][0]).toEqual(
        'Seth is a bad programmer.'
      )
    })

    test('Trying to talk to inanimate objects', async () => {
      // This doesn't point to anything
      let callCount = 0
      mockUiController.promptInput = () => {
        if (callCount === 0) {
          callCount += 1
          return Promise.resolve('talk c9')
        }
        return Promise.resolve('w')
      }

      mockUiController.promptMultiChoice = jest.fn(() => {
        return Promise.resolve('quit')
      })

      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptMultiChoice.mock.calls[0][0]).toEqual(
        "You can't talk to that."
      )
    })
  })

  describe('Object interaction', () => {
    test('Interacting with a bed forwards the game time by the amount chosen', async () => {
      mockUiController.promptInput = () => Promise.resolve('interact B1')
      mockUiController.promptMultiChoice = () => Promise.resolve('4')

      const exampleBed: Bed = {
        collidable: true,
        coords: {
          x: 2,
          y: 2,
        },
        hitpoints: 0,
        interact: defaultBedInteract,
        symbol: 'B',
      }

      const updatedGameState = await doPlayerTurn(
        assocPath(['currentScene', 'beds'], [exampleBed], exampleGameState),
        mockUiController
      )

      expect(updatedGameState.world.worldTime).toEqual('13:00')
    })

    test('Interacting with an empty space alerts the player they can not interact with that', async () => {
      mockUiController.promptInput = () => Promise.resolve('interact B1')
      mockUiController.display = jest.fn()

      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.display.mock.calls.length).toEqual(1)
    })

    test('Interacting with something without an interact script alerts the player they can not interact with that.', async () => {
      mockUiController.promptInput = () => Promise.resolve('interact B1')
      mockUiController.display = jest.fn()

      const wall: Wall = {
        collidable: true,
        coords: { x: 2, y: 2 },
        hitpoints: 0,
        symbol: 'W',
      }

      await doPlayerTurn(
        assocPath(['currentScene', 'walls'], [wall], exampleGameState),
        mockUiController
      )

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.display.mock.calls.length).toEqual(1)
    })

    test('Interacting with an NPC engages them in dialogue', async () => {
      mockUiController.promptInput = () => Promise.resolve('interact A1')
      mockUiController.promptMultiChoice = jest.fn(() =>
        Promise.resolve('quit')
      )

      await doPlayerTurn(exampleGameStateWithNpc, mockUiController)

      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptMultiChoice.mock.calls[0][1]
      ).toEqual(['1', 'quit'])
    })
  })
})
