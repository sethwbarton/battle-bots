import { UiController } from '../../../ui/ui-controller'
import { GameState } from '../../game-state'

export const mockUiController: UiController = {
  display(text: string): Promise<void> {
    return Promise.resolve(undefined)
  },
  promptInput(prompt: string): Promise<string> {
    return Promise.resolve('')
  },
  promptMultiChoice(prompt: string, options: string[]): Promise<string> {
    return Promise.resolve('')
  },
  drawGameState(gameState: GameState): Promise<void> {
    return Promise.resolve(undefined)
  },
}
