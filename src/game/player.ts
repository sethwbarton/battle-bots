import { Drawable } from './drawable'
import { GameState } from './game-state'
import { assocPath, dec } from 'ramda'

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
  gameState.player.coords.y += 1
  return gameState
}

export function movePlayerRight(gameState: GameState): GameState {
  gameState.player.coords.x += 1
  return gameState
}

export function movePlayerLeft(gameState: GameState): GameState {
  gameState.player.coords.x -= 1
  return gameState
}

export function movePlayerUpRight(gameState: GameState): GameState {
  gameState.player.coords.y -= 1
  gameState.player.coords.x += 1
  return gameState
}

export function movePlayerUpLeft(gameState: GameState): GameState {
  gameState.player.coords.y -= 1
  gameState.player.coords.x -= 1
  return gameState
}

export function movePlayerDownRight(gameState: GameState): GameState {
  gameState.player.coords.y += 1
  gameState.player.coords.x += 1
  return gameState
}

export function movePlayerDownLeft(gameState: GameState): GameState {
  gameState.player.coords.y += 1
  gameState.player.coords.x -= 1
  return gameState
}
