import { beforeEach, describe, expect, it } from 'tiny-test-framework/dist/src'
import { BattleBotsGameState } from '../../src/entities/battle_bots_game_state'
import { Player } from '../../src/entities/player'
import { StarSystem } from '../../src/entities/star_system'

describe('Battle Bots Game State', () => {
  beforeEach(() => {
    BattleBotsGameState.clearState()
  })

  it('should properly load the game state given a state object', () => {
    const gameStateInstance = BattleBotsGameState.getInstance()
    const player = new Player()
    const knownSystems: StarSystem[] = []
    gameStateInstance.loadState({ player, knownSystems })
    expect(gameStateInstance.getPlayer() === player)
    expect(gameStateInstance.getKnownSystems() === knownSystems)
  })
})
