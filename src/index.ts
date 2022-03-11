import { TerminalUiService } from './services/TerminalUiService'

async function main(): Promise<void> {
  // Show intro screen, prompt for new or saved game
  // Load game, start game loop
  // This thing initializes all our useCases, services, etc.

  const UiService = new TerminalUiService()
  console.log(
    'Terminal size: ' + process.stdout.columns + 'x' + process.stdout.rows
  )
  await UiService.showStartScreen()
  await UiService.getGameStartType()
}

main()
