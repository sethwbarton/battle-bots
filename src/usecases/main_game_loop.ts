import { UiService } from '../services/ui_service'
import { BattleBotsGameState } from '../entities/battle_bots_game_state'

export class MainGameLoopUseCase {
  uiService: UiService
  gameState: BattleBotsGameState

  constructor(UiService: UiService) {
    this.gameState = BattleBotsGameState.getInstance()
    this.uiService = UiService
  }

  public startGameLoop(runOnce?: boolean) {
    let stillRunning = true
    while (stillRunning) {
      // Do game logic stuff with our state and then draw the state to the screen

      this.uiService.renderGameState(this.gameState)
      if (runOnce) {
        stillRunning = false
      }
    }
  }
}
