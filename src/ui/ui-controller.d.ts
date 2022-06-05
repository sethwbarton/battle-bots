import { GameState } from '../game/game-state'

export interface UiController {
  getStartGameSelection(): Promise<'New' | 'Load'>
  getCommand(): Promise<string>
  drawGameState(gameState: GameState): Promise<void>
  promptForConversation(options: string[], npcOpener: string): Promise<string>
}
