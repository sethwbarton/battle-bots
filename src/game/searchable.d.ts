import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'

export interface Searchable {
  search?: (
    gameState: GameState,
    uiController: UiController,
    objectCoords: Coords
  ) => GameState
}
