import { Drawable } from './drawable'
import { GameState } from './game-state'
import { assocPath, dec, filter, inc } from 'ramda'
import {
  NUM_COLS_PER_SCENE,
  NUM_ROWS_PER_SCENE,
} from '../ui/terminal-ui-controller'
import { Collidable, getCurrentSceneCollidables } from './collidable'
import { Command } from './command'

export const STARTING_PLAYER_SYMBOL = '☉'

export type Player = Drawable

export function movePlayer(gameState: GameState, command: Command): GameState {
  let newGameStateToReturn = gameState
  switch (command) {
    case Command.MoveDown:
      newGameStateToReturn = movePlayerDown(gameState)
      break
    case Command.MoveUp:
      newGameStateToReturn = movePlayerUp(gameState)
      break
    case Command.MoveLeft:
      newGameStateToReturn = movePlayerLeft(gameState)
      break
    case Command.MoveRight:
      newGameStateToReturn = movePlayerRight(gameState)
      break
    case Command.MoveUpRight:
      newGameStateToReturn = movePlayerUpRight(gameState)
      break
    case Command.MoveUpLeft:
      newGameStateToReturn = movePlayerUpLeft(gameState)
      break
    case Command.MoveDownRight:
      newGameStateToReturn = movePlayerDownRight(gameState)
      break
    case Command.MoveDownLeft:
      newGameStateToReturn = movePlayerDownLeft(gameState)
      break
  }

  if (playerWillCollideWithSomething(newGameStateToReturn)) {
    return gameState
  }

  return newGameStateToReturn
}

function playerWillCollideWithSomething(gameState: GameState): boolean {
  const collidablesInTheWay = filter((collidable: Collidable) => {
    return (
      collidable.coords.y === gameState.player.coords.y &&
      collidable.coords.x === gameState.player.coords.x
    )
  }, getCurrentSceneCollidables(gameState))
  return Boolean(collidablesInTheWay.length)
}

function movePlayerUp(gameState: GameState): GameState {
  if (gameState.player.coords.y === 0) {
    return gameState
  }

  return assocPath(
    ['player', 'coords', 'y'],
    dec(gameState.player.coords.y),
    gameState
  )
}

function movePlayerDown(gameState: GameState): GameState {
  if (gameState.player.coords.y === dec(NUM_ROWS_PER_SCENE)) {
    return gameState
  }

  return assocPath(
    ['player', 'coords', 'y'],
    inc(gameState.player.coords.y),
    gameState
  )
}

function movePlayerRight(gameState: GameState): GameState {
  if (gameState.player.coords.x === dec(NUM_COLS_PER_SCENE)) {
    return gameState
  }
  return assocPath(
    ['player', 'coords', 'x'],
    inc(gameState.player.coords.x),
    gameState
  )
}

function movePlayerLeft(gameState: GameState): GameState {
  if (gameState.player.coords.x === 1) {
    return gameState
  }
  return assocPath(
    ['player', 'coords', 'x'],
    dec(gameState.player.coords.x),
    gameState
  )
}

function movePlayerUpRight(gameState: GameState): GameState {
  if (
    gameState.player.coords.x === dec(NUM_COLS_PER_SCENE) ||
    gameState.player.coords.y === 0
  ) {
    return gameState
  }
  const up = assocPath(
    ['player', 'coords', 'y'],
    dec(gameState.player.coords.y),
    gameState
  )
  const upAndRight = assocPath(
    ['player', 'coords', 'x'],
    inc(gameState.player.coords.x),
    up
  )
  return upAndRight
}

function movePlayerUpLeft(gameState: GameState): GameState {
  if (gameState.player.coords.y === 0 || gameState.player.coords.x === 1) {
    return gameState
  }
  const up = assocPath(
    ['player', 'coords', 'y'],
    dec(gameState.player.coords.y),
    gameState
  )
  const upAndLeft = assocPath(
    ['player', 'coords', 'x'],
    dec(gameState.player.coords.x),
    up
  )
  return upAndLeft
}

function movePlayerDownRight(gameState: GameState): GameState {
  if (
    gameState.player.coords.y === dec(NUM_ROWS_PER_SCENE) ||
    gameState.player.coords.x === dec(NUM_COLS_PER_SCENE)
  ) {
    return gameState
  }
  const down = assocPath(
    ['player', 'coords', 'y'],
    inc(gameState.player.coords.y),
    gameState
  )
  const downAndRight = assocPath(
    ['player', 'coords', 'x'],
    inc(gameState.player.coords.x),
    down
  )
  return downAndRight
}

function movePlayerDownLeft(gameState: GameState): GameState {
  if (
    gameState.player.coords.y === dec(NUM_COLS_PER_SCENE) ||
    gameState.player.coords.x === 1
  ) {
    return gameState
  }
  const down = assocPath(
    ['player', 'coords', 'y'],
    inc(gameState.player.coords.y),
    gameState
  )
  const downAndLeft = assocPath(
    ['player', 'coords', 'x'],
    dec(gameState.player.coords.x),
    down
  )
  return downAndLeft
}
