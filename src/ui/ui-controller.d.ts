import { GameState } from '../game/game-state'

export interface UiController {
  drawGameState(gameState: GameState): Promise<void>
  promptMultiChoice(prompt: string, options: string[]): Promise<string>
  promptInput(prompt: string): Promise<string>
  display(text: string): Promise<void>
}
