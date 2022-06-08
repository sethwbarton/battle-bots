import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'
import { Coords } from './drawable'

export interface Interactable {
  interact?: (
    gameState: GameState,
    uiController: UiController,
    objectCoords: Coords
  ) => Promise<GameState>
}
