import { Drawable } from './drawable'
import { GameState } from './game-state'
import { assocPath, dec, inc } from 'ramda'
import {
  NUM_COLS_PER_SCENE,
  NUM_ROWS_PER_SCENE,
} from '../ui/terminal-ui-controller'

export type Player = Drawable

export function movePlayerUp(gameState: GameState): GameState {
  if (gameState.player.coords.y === 0) {
    return gameState
  }

  return assocPath(
    ['player', 'coords', 'y'],
    dec(gameState.player.coords.y),
    gameState
  )
}

export function movePlayerDown(gameState: GameState): GameState {
  if (gameState.player.coords.y === dec(NUM_ROWS_PER_SCENE)) {
    return gameState
  }

  return assocPath(
    ['player', 'coords', 'y'],
    inc(gameState.player.coords.y),
    gameState
  )
}

export function movePlayerRight(gameState: GameState): GameState {
  if (gameState.player.coords.x === dec(NUM_COLS_PER_SCENE)) {
    return gameState
  }
  return assocPath(
    ['player', 'coords', 'x'],
    inc(gameState.player.coords.x),
    gameState
  )
}

export function movePlayerLeft(gameState: GameState): GameState {
  if (gameState.player.coords.x === 1) {
    return gameState
  }
  return assocPath(
    ['player', 'coords', 'x'],
    dec(gameState.player.coords.x),
    gameState
  )
}

export function movePlayerUpRight(gameState: GameState): GameState {
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

export function movePlayerUpLeft(gameState: GameState): GameState {
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

export function movePlayerDownRight(gameState: GameState): GameState {
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

export function movePlayerDownLeft(gameState: GameState): GameState {
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
