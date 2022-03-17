import { beforeEach, describe, expect, it } from 'tiny-test-framework/dist/src'
import { StartGameUseCase } from '../../src/usecases/start_game'
import { BattleBotsGameState } from '../../src/entities/battle_bots_game_state'

describe('Battle Bots Game State', () => {
  beforeEach(() => {
    BattleBotsGameState.clearState()
  })

  it('dunno yet', () => {
    const gameStateInstance = BattleBotsGameState.getInstance()
  })
})
