import { GameState } from '../game-state'
import {
  movePlayerDown,
  movePlayerDownLeft,
  movePlayerDownRight,
  movePlayerLeft,
  movePlayerRight,
  movePlayerUp,
  movePlayerUpLeft,
  movePlayerUpRight,
} from '../player'
import { assocPath, dec, inc } from 'ramda'
import {
  NUM_COLS_PER_SCENE,
  NUM_ROWS_PER_SCENE,
} from '../../ui/terminal-ui-controller'

const exampleGameState: GameState = {
  currentScene: { id: 1, drawables: [] },
  player: { coords: { x: 5, y: 5 }, symbol: 'P' },
  world: { scenes: [] },
}

describe('Player', () => {
  describe('Player Movement', () => {
    describe('movePlayerUp', () => {
      it('Does not allow vertical movement past the top of the board', () => {
        const updatedGameState = movePlayerUp(
          assocPath(['player', 'coords', 'y'], 0, exampleGameState)
        )
        expect(updatedGameState.player.coords.y).toEqual(0)
      })

      it('Does not mutate the player object sent in', () => {
        const updateGameState = movePlayerUp(
          assocPath(['player', 'coords', 'y'], 20, exampleGameState)
        )
        expect(updateGameState.player.coords.y).toEqual(19)
        expect(exampleGameState.player.coords.y).toEqual(5)
      })

      it('Decrements the player y coordinate', () => {
        const updatedGameState = movePlayerUp(
          assocPath(['player', 'coords', 'y'], 20, exampleGameState)
        )
        expect(updatedGameState.player.coords.y).toEqual(19)
      })
    })

    describe('movePlayerDown', () => {
      it('Does not allow vertical movement past the bottom of the board', () => {
        const updatedGameState = movePlayerDown(
          assocPath(
            ['player', 'coords', 'y'],
            dec(NUM_ROWS_PER_SCENE),
            exampleGameState
          )
        )
        expect(updatedGameState.player.coords.y).toEqual(
          dec(NUM_ROWS_PER_SCENE)
        )
      })

      it('Increments the player y coordinate', () => {
        const updatedGameState = movePlayerDown(exampleGameState)
        expect(updatedGameState.player.coords.y).toEqual(
          inc(exampleGameState.player.coords.y)
        )
      })
    })

    describe('movePlayerRight', () => {
      it('Does not allow horizontal movement past the right edge of the board', () => {
        const updatedGameState = movePlayerRight(
          assocPath(
            ['player', 'coords', 'x'],
            dec(NUM_COLS_PER_SCENE),
            exampleGameState
          )
        )
        expect(updatedGameState.player.coords.x).toEqual(
          dec(NUM_COLS_PER_SCENE)
        )
      })

      it('Increments the player x coordinate', () => {
        const updatedGameState = movePlayerRight(exampleGameState)
        expect(updatedGameState.player.coords.x).toEqual(
          inc(exampleGameState.player.coords.x)
        )
      })
    })

    describe('movePlayerLeft', () => {
      it('Does not allow horizontal movement past the left edge of the board', () => {
        const updatedGameState = movePlayerLeft(
          assocPath(['player', 'coords', 'x'], 1, exampleGameState)
        )

        // We stop at 1 because the 0 index has the row labels in it.
        expect(updatedGameState.player.coords.x).toEqual(1)
      })

      it('Decrements the player x coordinate', () => {
        const updatedGameState = movePlayerLeft(exampleGameState)
        expect(updatedGameState.player.coords.x).toEqual(
          dec(exampleGameState.player.coords.x)
        )
      })
    })

    describe('movePlayerUpRight', () => {
      it('Does not allow horizontal movement past the right edge or top of the board', () => {
        const atTopRightCorner = assocPath(
          ['player', 'coords', 'y'],
          0,
          assocPath(
            ['player', 'coords', 'x'],
            dec(NUM_COLS_PER_SCENE),
            exampleGameState
          )
        )
        const updatedGameState = movePlayerUpRight(atTopRightCorner)

        expect(updatedGameState.player.coords).toEqual({
          x: dec(NUM_COLS_PER_SCENE),
          y: 0,
        })
      })

      it('Increments the x value, and decrements the y value of the player coordinates', () => {
        const updatedGameState = movePlayerUpRight(exampleGameState)

        expect(updatedGameState.player.coords).toEqual({
          x: inc(exampleGameState.player.coords.x),
          y: dec(exampleGameState.player.coords.y),
        })
      })
    })

    describe('movePlayerUpLeft', () => {
      it('Does not allow horizontal movement past the left edge or top of the board', () => {
        const atTopLeftCorner = assocPath(
          ['player', 'coords', 'y'],
          0,
          assocPath(['player', 'coords', 'x'], 1, exampleGameState)
        )
        const updatedGameState = movePlayerUpLeft(atTopLeftCorner)

        expect(updatedGameState.player.coords).toEqual({
          x: 1,
          y: 0,
        })
      })

      it('Decrements the x value, and decrements the y value of the player coordinates', () => {
        const updatedGameState = movePlayerUpLeft(exampleGameState)

        expect(updatedGameState.player.coords).toEqual({
          x: dec(exampleGameState.player.coords.x),
          y: dec(exampleGameState.player.coords.y),
        })
      })
    })

    describe('movePlayerDownRight', () => {
      it('Does not allow movement past the right or bottom edges of the board', () => {
        const atBottomRightCorner = assocPath(
          ['player', 'coords', 'y'],
          dec(NUM_ROWS_PER_SCENE),
          assocPath(
            ['player', 'coords', 'x'],
            dec(NUM_COLS_PER_SCENE),
            exampleGameState
          )
        )
        const updatedGameState = movePlayerDownRight(atBottomRightCorner)
        expect(updatedGameState.player.coords).toEqual({
          x: dec(NUM_COLS_PER_SCENE),
          y: dec(NUM_ROWS_PER_SCENE),
        })
      })
      it('Increments the x and y values of the player character', () => {
        const updatedGameState = movePlayerDownRight(exampleGameState)
        expect(updatedGameState.player.coords).toEqual({
          x: inc(exampleGameState.player.coords.x),
          y: inc(exampleGameState.player.coords.y),
        })
      })
    })

    describe('movePlayerDownLeft', () => {
      it('Does not allow movement past the left or bottom edges of the board', () => {
        const atBottomLeftCorner = assocPath(
          ['player', 'coords', 'y'],
          dec(NUM_ROWS_PER_SCENE),
          assocPath(['player', 'coords', 'x'], 1, exampleGameState)
        )
        const updatedGameState = movePlayerDownLeft(atBottomLeftCorner)
        expect(updatedGameState.player.coords).toEqual({
          x: 1,
          y: dec(NUM_ROWS_PER_SCENE),
        })
      })
      it('Decrements x and increments y of the player character location', () => {
        const updatedGameState = movePlayerDownLeft(exampleGameState)
        expect(updatedGameState.player.coords).toEqual({
          x: dec(exampleGameState.player.coords.x),
          y: inc(exampleGameState.player.coords.y),
        })
      })
    })
  })
})
