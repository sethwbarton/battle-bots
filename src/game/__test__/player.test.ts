import { movePlayer } from '../player'
import { assocPath, dec, inc } from 'ramda'
import {
  NUM_COLS_PER_SCENE,
  NUM_ROWS_PER_SCENE,
} from '../../ui/terminal-ui-controller'
import { Door } from '../door'
import { Wall } from '../wall'
import { Bed } from '../bed'
import { Command } from '../command'
import { exampleGameState } from './test-data/example-game-state'

describe('Player', () => {
  describe('Move Player', () => {
    test('Does not allow the player to move up into a cell which holds a door', () => {
      const doorToRunInto: Door = {
        collidable: true,
        coords: { x: 5, y: 4 },
        hitpoints: 0,
        symbol: '-',
      }
      const gameStateWithDoorAbovePlayer = assocPath(
        ['currentScene', 'doors'],
        [doorToRunInto],
        exampleGameState
      )
      const updatedGameState = movePlayer(
        gameStateWithDoorAbovePlayer,
        Command.MoveUp
      )

      expect(updatedGameState).toEqual(gameStateWithDoorAbovePlayer)
    })

    test('Does not allow the player to move up into a cell which holds a wall', () => {
      const wallToRunInto: Wall = {
        collidable: true,
        coords: { x: 5, y: 4 },
        hitpoints: 0,
        symbol: '-',
      }
      const gameStateWithDoorAbovePlayer = assocPath(
        ['currentScene', 'walls'],
        [wallToRunInto],
        exampleGameState
      )
      const updatedGameState = movePlayer(
        gameStateWithDoorAbovePlayer,
        Command.MoveUp
      )

      expect(updatedGameState).toEqual(gameStateWithDoorAbovePlayer)
    })

    test('Does not allow the player to move up into a cell which holds a bed', () => {
      const wallToRunInto: Bed = {
        collidable: true,
        coords: { x: 5, y: 4 },
        hitpoints: 0,
        symbol: '-',
      }
      const gameStateWithDoorAbovePlayer = assocPath(
        ['currentScene', 'beds'],
        [wallToRunInto],
        exampleGameState
      )
      const updatedGameState = movePlayer(
        gameStateWithDoorAbovePlayer,
        Command.MoveUp
      )

      expect(updatedGameState).toEqual(gameStateWithDoorAbovePlayer)
    })

    test('Does not allow the player to move down into a cell which holds a bed', () => {
      const wallToRunInto: Bed = {
        collidable: true,
        coords: { x: 5, y: 6 },
        hitpoints: 0,
        symbol: '-',
      }
      const gameStateWithDoorAbovePlayer = assocPath(
        ['currentScene', 'beds'],
        [wallToRunInto],
        exampleGameState
      )
      const updatedGameState = movePlayer(
        gameStateWithDoorAbovePlayer,
        Command.MoveDown
      )

      expect(updatedGameState).toEqual(gameStateWithDoorAbovePlayer)
    })

    test('Allows free movement down if a bed is not in the way', () => {
      const wallToRunInto: Bed = {
        collidable: true,
        coords: { x: 5, y: 7 },
        hitpoints: 0,
        symbol: '-',
      }
      const gameStateWithDoorAbovePlayer = assocPath(
        ['currentScene', 'beds'],
        [wallToRunInto],
        exampleGameState
      )
      const updatedGameState = movePlayer(
        gameStateWithDoorAbovePlayer,
        Command.MoveDown
      )

      expect(updatedGameState.player.coords.y).toEqual(6)
    })

    test('Allows free movement up if a bed is not in the way', () => {
      const wallToRunInto: Bed = {
        collidable: true,
        coords: { x: 5, y: 7 },
        hitpoints: 0,
        symbol: '-',
      }
      const gameStateWithDoorAbovePlayer = assocPath(
        ['currentScene', 'beds'],
        [wallToRunInto],
        exampleGameState
      )
      const updatedGameState = movePlayer(
        gameStateWithDoorAbovePlayer,
        Command.MoveUp
      )

      expect(updatedGameState.player.coords.y).toEqual(4)
    })

    describe('movePlayerUp', () => {
      it('Does not allow vertical movement past the top of the board', () => {
        const updatedGameState = movePlayer(
          assocPath(['player', 'coords', 'y'], 0, exampleGameState),
          Command.MoveUp
        )
        expect(updatedGameState.player.coords.y).toEqual(0)
      })

      it('Does not mutate the player object sent in', () => {
        const updateGameState = movePlayer(
          assocPath(['player', 'coords', 'y'], 20, exampleGameState),
          Command.MoveUp
        )
        expect(updateGameState.player.coords.y).toEqual(19)
        expect(exampleGameState.player.coords.y).toEqual(5)
      })

      it('Decrements the player y coordinate', () => {
        const updatedGameState = movePlayer(
          assocPath(['player', 'coords', 'y'], 20, exampleGameState),
          Command.MoveUp
        )
        expect(updatedGameState.player.coords.y).toEqual(19)
      })
    })

    describe('movePlayerDown', () => {
      it('Does not allow vertical movement past the bottom of the board', () => {
        const updatedGameState = movePlayer(
          assocPath(
            ['player', 'coords', 'y'],
            dec(NUM_ROWS_PER_SCENE),
            exampleGameState
          ),
          Command.MoveDown
        )
        expect(updatedGameState.player.coords.y).toEqual(
          dec(NUM_ROWS_PER_SCENE)
        )
      })

      it('Increments the player y coordinate', () => {
        const updatedGameState = movePlayer(exampleGameState, Command.MoveDown)
        expect(updatedGameState.player.coords.y).toEqual(
          inc(exampleGameState.player.coords.y)
        )
      })
    })

    describe('movePlayerRight', () => {
      it('Does not allow horizontal movement past the right edge of the board', () => {
        const updatedGameState = movePlayer(
          assocPath(
            ['player', 'coords', 'x'],
            dec(NUM_COLS_PER_SCENE),
            exampleGameState
          ),
          Command.MoveRight
        )
        expect(updatedGameState.player.coords.x).toEqual(
          dec(NUM_COLS_PER_SCENE)
        )
      })

      it('Increments the player x coordinate', () => {
        const updatedGameState = movePlayer(exampleGameState, Command.MoveRight)
        expect(updatedGameState.player.coords.x).toEqual(
          inc(exampleGameState.player.coords.x)
        )
      })
    })

    describe('movePlayerLeft', () => {
      it('Does not allow horizontal movement past the left edge of the board', () => {
        const updatedGameState = movePlayer(
          assocPath(['player', 'coords', 'x'], 1, exampleGameState),
          Command.MoveLeft
        )

        // We stop at 1 because the 0 index has the row labels in it.
        expect(updatedGameState.player.coords.x).toEqual(1)
      })

      it('Decrements the player x coordinate', () => {
        const updatedGameState = movePlayer(exampleGameState, Command.MoveLeft)
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
        const updatedGameState = movePlayer(
          atTopRightCorner,
          Command.MoveUpRight
        )

        expect(updatedGameState.player.coords).toEqual({
          x: dec(NUM_COLS_PER_SCENE),
          y: 0,
        })
      })

      it('Increments the x value, and decrements the y value of the player coordinates', () => {
        const updatedGameState = movePlayer(
          exampleGameState,
          Command.MoveUpRight
        )

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
        const updatedGameState = movePlayer(atTopLeftCorner, Command.MoveUpLeft)

        expect(updatedGameState.player.coords).toEqual({
          x: 1,
          y: 0,
        })
      })

      it('Decrements the x value, and decrements the y value of the player coordinates', () => {
        const updatedGameState = movePlayer(
          exampleGameState,
          Command.MoveUpLeft
        )

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
        const updatedGameState = movePlayer(
          atBottomRightCorner,
          Command.MoveDownRight
        )
        expect(updatedGameState.player.coords).toEqual({
          x: dec(NUM_COLS_PER_SCENE),
          y: dec(NUM_ROWS_PER_SCENE),
        })
      })
      it('Increments the x and y values of the player character', () => {
        const updatedGameState = movePlayer(
          exampleGameState,
          Command.MoveDownRight
        )
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
        const updatedGameState = movePlayer(
          atBottomLeftCorner,
          Command.MoveDownLeft
        )
        expect(updatedGameState.player.coords).toEqual({
          x: 1,
          y: dec(NUM_ROWS_PER_SCENE),
        })
      })
      it('Decrements x and increments y of the player character location', () => {
        const updatedGameState = movePlayer(
          exampleGameState,
          Command.MoveDownLeft
        )
        expect(updatedGameState.player.coords).toEqual({
          x: dec(exampleGameState.player.coords.x),
          y: inc(exampleGameState.player.coords.y),
        })
      })
    })
  })
  describe('Add to player inventory', () => {
    it('Adds an inventory item to the player inventory', () => {
      const updatedGameState = addToPlayerInventory(exampleGameState, {
        name: "I'm an item!",
      })
    })
  })
})
