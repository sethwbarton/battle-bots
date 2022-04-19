import { Terminal_UI_Service } from './services/terminal_ui_service'
import { StartGameUseCase } from './usecases/start_game'
import { MainGameLoopUseCase } from './usecases/main_game_loop'

// async function main(): Promise<void> {
//   const UiService = new Terminal_UI_Service()
//   const mainGameLoopUseCase = new MainGameLoopUseCase(UiService)
//   const startGameUseCase = new StartGameUseCase(
//     mainGameLoopUseCase.startGameLoop
//   )
//
//   await UiService.showStartScreen()
//   const gameStartType = await UiService.getGameStartType()
//   startGameUseCase.start(gameStartType)
// }
//
// main()

import { App } from './app'

new App()
