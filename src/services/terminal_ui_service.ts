import { GameStartOptionType, UiService } from './ui_service'
import { nuclear_explosion_intro_pic } from '../assets/nuclear_explosion_intro_pic'
import {
  TerminalColors,
  TerminalSelect,
} from './terminal_utils/terminal_select'

export class Terminal_ui_service implements UiService {
  public async showStartScreen(): Promise<void> {
    console.log(nuclear_explosion_intro_pic)
  }

  public async getGameStartType(): Promise<GameStartOptionType> {
    const multiSelectResponse = new TerminalSelect({
      question: '',
      options: ['New', 'Load'],
    })
    // TODO: Need to return the multiSelectResponse but to lower case
    return 'new'
  }
}
