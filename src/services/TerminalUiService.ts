import { GameStartOptionType, UiService } from './UiService'
import { nuclearExplosionIntroPic } from '../assets/nuclearExplosionIntroPic'

export class TerminalUiService implements UiService {
  public async showStartScreen(): Promise<void> {
    console.log(nuclearExplosionIntroPic)
  }

  public async getGameStartType(): Promise<GameStartOptionType> {
    return 'new'
  }
}
