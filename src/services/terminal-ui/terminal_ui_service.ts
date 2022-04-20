import { GameStartOptionType, UiService } from '../ui_service'
import { nuclear_explosion_intro_pic } from '../../assets/nuclear_explosion_intro_pic'
import { TerminalSelect } from './terminal_utils/terminal_select'
import { BattleBotsGameState } from '../../entities/battle_bots_game_state'

export class Terminal_UI_Service implements UiService {
  public async showStartScreen(): Promise<void> {
    console.log(nuclear_explosion_intro_pic)
  }

  public async renderGameState(gameState: BattleBotsGameState) {}

  public async getGameStartType(): Promise<GameStartOptionType> {
    const terminalSelect = new TerminalSelect({
      question: '',
      options: ['New', 'Load'],
    })
    const selectedStartType = await terminalSelect.waitForInput()
    if (selectedStartType === 'New') {
      return 'new'
    } else {
      return 'load'
    }
  }
}
