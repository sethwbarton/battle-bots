import { Command } from '../game/command'
import { GameState } from '../game/game-state'

export interface UiController {
  getStartGameSelection(): Promise<'New' | 'Load'>
  getCommand(): Promise<Command>
  drawGameState(gameState: GameState): Promise<void>
}
