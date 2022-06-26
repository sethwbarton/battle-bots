import { Collidable } from './collidable'
import { Coords, Drawable } from './drawable'
import { Hitable } from './hitable'
import { Interactable } from './interactable'
import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'
import { assoc, assocPath } from 'ramda'

export const DEFAULT_BED_HITPOINTS = 100
export interface Bed extends Collidable, Drawable, Hitable, Interactable {}

export async function defaultBedInteract(
  gameState: GameState,
  uiController: UiController,
  objectCoords: Coords
): Promise<GameState> {
  const restAmount = parseInt(
    await uiController.promptMultiChoice('How long would you like to rest?', [
      '3',
      '6',
      '9',
      '12',
    ])
  )
  const hour = getHourFromGameTime(gameState.world.worldTime)
  const minute = getMinuteFromGameTime(gameState.world.worldTime)
  return assocPath(
    ['world', 'worldTime'],
    String(hour + restAmount) + ':' + String(minute),
    gameState
  )
}

export function getHourFromGameTime(gameTime: string) {
  return parseInt(gameTime.split(':')[0])
}

export function getMinuteFromGameTime(gameTime: string) {
  return gameTime.split(':')[1]
}
