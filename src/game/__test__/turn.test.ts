import { GameState } from '../game-state'
import { doPlayerTurn } from '../turn'
import { UiController } from '../../ui/ui-controller'
import { Command } from '../command'
import { dec, inc, update } from 'ramda'

const exampleGameState: GameState = {
  currentScene: {
    id: '',
    npcs: [
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
    ],
  },
  player: { coords: { x: 5, y: 5 }, symbol: 'P' },
  world: { scenes: [] },
}

const mockUiController: UiController = {
  drawGameState(gameState: GameState): Promise<void> {
    return Promise.resolve(undefined)
  },
  getCommand(): Promise<Command> {
    return Promise.resolve(Command.MoveUp)
  },
  getStartGameSelection(): Promise<'New' | 'Load'> {
    return Promise.resolve('Load')
  },
  promptForConversation(options: string[], npcOpener: string): Promise<string> {
    return Promise.resolve('')
  },
}

describe('doPlayerTurn', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    exampleGameState.currentScene.npcs = [
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

  describe('Player Movement', () => {
    it('Moves the player up when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveUp)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.y).toEqual(
        dec(exampleGameState.player.coords.y)
      )
    })

    it('Moves the player down when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveDown)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.y).toEqual(
        inc(exampleGameState.player.coords.y)
      )
    })

    it('Moves the player right when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveRight)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        inc(exampleGameState.player.coords.x)
      )
    })

    it('Moves the player left when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveLeft)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        dec(exampleGameState.player.coords.x)
      )
    })

    it('Moves the player up left when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveUpLeft)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        dec(exampleGameState.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        dec(exampleGameState.player.coords.y)
      )
    })

    it('Moves the player up right when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveUpRight)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        inc(exampleGameState.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        dec(exampleGameState.player.coords.y)
      )
    })

    it('Moves the player down right when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveDownRight)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        inc(exampleGameState.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        inc(exampleGameState.player.coords.y)
      )
    })

    it('Moves the player down left when the command is given', async () => {
      mockUiController.getCommand = () => Promise.resolve(Command.MoveDownLeft)
      const updatedGameState = await doPlayerTurn(
        exampleGameState,
        mockUiController
      )
      expect(updatedGameState.player.coords.x).toEqual(
        dec(exampleGameState.player.coords.x)
      )
      expect(updatedGameState.player.coords.y).toEqual(
        inc(exampleGameState.player.coords.y)
      )
    })
  })
  describe('Npc Interaction', () => {
    test("Talking to an NPC when there isn't one in that spot does nothing", async () => {
      mockUiController.getCommand = () => Promise.resolve('talk Z9')
      mockUiController.promptForConversation = jest.fn()
      await doPlayerTurn(exampleGameState, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptForConversation.mock.calls.length).toEqual(
        0
      )
      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptForConversation.mock.calls.length
      ).toEqual(0)
    })

    test('Talking to an NPC that has nothing to say', async () => {
      const anotherNPC = {
        name: 'A different NPC',
        coords: { x: 2, y: 2 },
        symbol: '2',
        hitpoints: 100,
        collidable: true,
      }

      exampleGameState.currentScene.npcs?.push(anotherNPC)

      mockUiController.getCommand = () => Promise.resolve('talk C2')
      mockUiController.promptForConversation = jest.fn(() =>
        Promise.resolve('quit')
      )

      await doPlayerTurn(exampleGameState, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptForConversation.mock.calls[0][1]).toEqual(
        'This person has nothing to say to you.'
      )
    })

    test("Talking to an NPC shows the NPC's opening dialogue", async () => {
      mockUiController.getCommand = () => Promise.resolve('talk A1')
      mockUiController.promptForConversation = jest.fn(() =>
        Promise.resolve('quit')
      )
      await doPlayerTurn(exampleGameState, mockUiController)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptForConversation.mock.calls[0][1]).toEqual(
        exampleGameState.currentScene.npcs?.[0].dialogueMap?.openingPhrase
      )
    })

    test("Talking to an NPC shows the NPC's dialogue options after the opening phrase", async () => {
      mockUiController.getCommand = () => Promise.resolve('talk A1')
      mockUiController.promptForConversation = jest.fn(() =>
        Promise.resolve('quit')
      )
      await doPlayerTurn(exampleGameState, mockUiController)

      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptForConversation.mock.calls.length
      ).toEqual(1)
    })

    test('Talking to an NPC shows the proper dialogue options for that NPC', async () => {
      mockUiController.getCommand = () => Promise.resolve('talk A1')
      mockUiController.promptForConversation = jest.fn(() =>
        Promise.resolve('quit')
      )
      await doPlayerTurn(exampleGameState, mockUiController)

      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptForConversation.mock.calls[0][0]
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

      exampleGameState.currentScene.npcs?.push(anotherNPC)
      mockUiController.getCommand = () => Promise.resolve('talk B2')
      mockUiController.promptForConversation = jest.fn(() =>
        Promise.resolve('quit')
      )

      await doPlayerTurn(exampleGameState, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptForConversation.mock.calls[0][1]).toEqual(
        anotherNPC.dialogueMap.openingPhrase
      )
      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mockUiController.promptForConversation.mock.calls[0][0]
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

      exampleGameState.currentScene.npcs?.push(anotherNPC)
      mockUiController.getCommand = () => Promise.resolve('talk B2')

      let callCount = 0
      // Ask about their background first. Then their profession. Then a secret.
      mockUiController.promptForConversation = jest.fn(() => {
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

      await doPlayerTurn(exampleGameState, mockUiController)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptForConversation.mock.calls[1][1]).toEqual(
        "I don't like you enough to tell."
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptForConversation.mock.calls[2][1]).toEqual(
        "I'm a programmer."
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(mockUiController.promptForConversation.mock.calls[3][1]).toEqual(
        'Seth is a bad programmer.'
      )
    })
  })
})
