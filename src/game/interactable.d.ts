import { GameState } from './game-state'

export interface Interactable {
  interact?: (gameState: GameState) => GameState
}
