import { GameStartOptionType, UiService } from './ui_service'
import { nuclear_explosion_intro_pic } from '../assets/nuclear_explosion_intro_pic'
import {
  TerminalColors,
  TerminalSelect,
} from './terminal_utils/terminal_select'

export class Terminal_UI_Service implements UiService {
  public async showStartScreen(): Promise<void> {
    console.log(nuclear_explosion_intro_pic)
  }

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
