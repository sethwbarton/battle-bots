export type GameStartOptionType = 'new' | 'load'

export interface UiService {
  showStartScreen: () => Promise<void>
  getGameStartType: () => Promise<GameStartOptionType>
}
