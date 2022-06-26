import { Bed, defaultBedInteract } from '../bed'
import { exampleGameState } from './test-data/example-game-state'
import { mockUiController } from './test-data/mock-ui-controller'

describe('bed', () => {
  describe('default interaction', () => {
    it('Prompts the player for how long they would like to rest', async () => {
      let callCount = 0
      mockUiController.promptMultiChoice = async (
        title: string,
        options: string[]
      ) => {
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
      await testBed.interact(exampleGameState, mockUiController, { x: 1, y: 1 })
      expect(callCount).toEqual(1)
    })

    it('Forwards the game time by the amount the player rested', async () => {
      mockUiController.promptMultiChoice = async (
        title: string,
        options: string[]
      ) => {
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
