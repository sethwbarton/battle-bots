import { Terminal_UI_Service } from './services/terminal_ui_service'

async function main(): Promise<void> {
  const UiService = new Terminal_UI_Service()
  await UiService.showStartScreen()
  const gameStartType = await UiService.getGameStartType()
}

main()
