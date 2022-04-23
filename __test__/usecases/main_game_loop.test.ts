import { beforeEach, describe, expect, it } from 'tiny-test-framework/dist/src'
import { MainGameLoopUseCase } from '../../src/usecases/main_game_loop'
import { GameStartOptionType, UiService } from '../../src/services/ui_service'
import { BattleBotsGameState } from '../../src/entities/battle_bots_game_state'

class DummyUiService implements UiService {
  renderGameStateCalls = 0
  constructor() {
    this.renderGameStateCalls = 0
  }

  async getGameStartType(): Promise<GameStartOptionType> {
    return 'new'
  }

  async renderGameState(gameState: BattleBotsGameState): Promise<void> {
    this.renderGameStateCalls += 1
  }

  async showStartScreen(): Promise<void> {}
}

describe('Main Game Loop', () => {
  let dummyUiService = new DummyUiService()

  beforeEach(() => {
    dummyUiService = new DummyUiService()
  })

  it('should exit if the run once flag is passed', () => {
    const mainGameLoopUseCase = new MainGameLoopUseCase(dummyUiService)
    mainGameLoopUseCase.startGameLoop(true)
    expect(true)
  })

  it('should render the game state as part of the loop', () => {
    const mainGameLoopUseCase = new MainGameLoopUseCase(dummyUiService)
    mainGameLoopUseCase.startGameLoop(true)
    expect(dummyUiService.renderGameStateCalls === 1)
  })
})
