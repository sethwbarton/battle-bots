import { Bed, defaultBedInteract } from '../bed'
import { UiController } from '../../ui/ui-controller'
import { GameState } from '../game-state'

const mockUiController: UiController = {
  drawGameState(gameState: GameState): Promise<void> {
    return Promise.resolve(undefined)
  },
  getCommand(): Promise<string> {
    return Promise.resolve('')
  },
  getStartGameSelection(): Promise<'New' | 'Load'> {
    return Promise.resolve('New')
  },
  promptForConversation(options: string[], npcOpener: string): Promise<string> {
    return Promise.resolve('')
  },
  showHelpDialog(): Promise<void> {
    return Promise.resolve(undefined)
  },
  prompt(title: string, options: string[]): Promise<string> {
    return Promise.resolve('')
  },
}

const exampleGameState: GameState = {
  currentScene: { id: '' },
  player: { coords: { x: 5, y: 5 }, symbol: 'P' },
  world: { scenes: [], worldTime: '9:00' },
}
describe('bed', () => {
  describe('default interaction', () => {
    it('Prompts the player for how long they would like to rest', async () => {
      let callCount = 0
      mockUiController.prompt = async (title: string, options: string[]) => {
        callCount += 1
        return ''
      }
      const testBed: Bed = {
        collidable: true,
        coords: { x: 1, y: 1 },
        hitpoints: 0,
        interact: defaultBedInteract,
        symbol: 'B',
      }
      if (!testBed.interact) {
        expect(false).toBe(true)
        return
      }
      testBed.interact(exampleGameState, mockUiController, { x: 1, y: 1 })
      expect(callCount).toEqual(1)
    })

    it('Forwards the game time by the amount the player rested', async () => {
      mockUiController.prompt = async (title: string, options: string[]) => {
        return '12'
      }
      const testBed: Bed = {
        collidable: true,
        coords: { x: 1, y: 1 },
        hitpoints: 0,
        interact: defaultBedInteract,
        symbol: 'B',
      }

      if (!testBed.interact) {
        expect(false).toBe(true)
        return
      }

      const updatedGameState = await testBed.interact(
        exampleGameState,
        mockUiController,
        { x: 1, y: 1 }
      )
      expect(updatedGameState.world.worldTime).toEqual('21:00')
    })
  })
})
