import { GameState } from './game-state'

export interface Searchable {
  search?: (gameState: GameState) => GameState
}
