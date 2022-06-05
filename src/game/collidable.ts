import { GameState } from './game-state'
import { Coords } from './drawable'

/**
 * A collidable is an object which the player character can not walk / shoot through.
 */
export interface Collidable {
  collidable: boolean
  coords: Coords
}

export function getCurrentSceneCollidables(gameState: GameState): Collidable[] {
  return [
    ...(gameState.currentScene.walls || []),
    ...(gameState.currentScene.doors || []),
    ...(gameState.currentScene.beds || []),
  ]
}
