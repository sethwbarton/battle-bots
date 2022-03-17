import { GameStartOptionType } from '../services/ui_service'

export class StartGameUseCase {
  startGameLoop: () => void = () => {}

  constructor(startGameLoop: () => void) {
    this.startGameLoop = startGameLoop
  }

  public start(gameType: GameStartOptionType): void {
    this.startGameLoop()
  }
}
