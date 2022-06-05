import { GameState } from '../game/game-state'

export interface UiController {
  getStartGameSelection(): Promise<'New' | 'Load'>
  getCommand(): Promise<string>
  drawGameState(gameState: GameState): Promise<void>
  showNpcDialogue(text: string): Promise<void>
  promptForConversationOptions(options: string[]): Promise<string>
}
