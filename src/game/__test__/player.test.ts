import { GameState } from '../game-state'
import { movePlayerUp } from '../player'
import { assocPath } from 'ramda'

const exampleGameState: GameState = {
  currentScene: { id: 1, drawables: [] },
  player: { coords: { x: 5, y: 5 }, symbol: 'P' },
  world: { scenes: [] },
}

describe('Player', () => {
  describe('Player Movement', () => {
    it('Move Up Does not allow vertical movement past the top of the board', () => {
      const updatedGameState = movePlayerUp(
        assocPath(['player', 'coords', 'y'], 0, exampleGameState)
      )
      expect(updatedGameState.player.coords.y).toEqual(0)
    })
    it('Move Up Does not mutate the player object sent in', () => {
      const updateGameState = movePlayerUp(
        assocPath(['player', 'coords', 'y'], 20, exampleGameState)
      )
      expect(updateGameState.player.coords.y).toEqual(19)
      expect(exampleGameState.player.coords.y).toEqual(5)
    })
    it('Move Up Decrements the player y coordinate', () => {
      const updatedGameState = movePlayerUp(
        assocPath(['player', 'coords', 'y'], 20, exampleGameState)
      )
      expect(updatedGameState.player.coords.y).toEqual(19)
    })
  })
})
