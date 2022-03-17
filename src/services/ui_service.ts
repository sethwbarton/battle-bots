import { BattleBotsGameState } from '../entities/battle_bots_game_state'

export type GameStartOptionType = 'new' | 'load'

export interface UiService {
  showStartScreen: () => Promise<void>
  getGameStartType: () => Promise<GameStartOptionType>
  renderGameState: (gameState: BattleBotsGameState) => Promise<void>
}
