import { Terminal_ui_service } from './services/terminal_ui_service'
import { TerminalSelect } from './services/terminal_utils/terminal_select'

async function main(): Promise<void> {
  // Show intro screen, prompt for new or saved game
  // Load game, start game loop
  // This thing initializes all our useCases, services, etc.

  // I can redraw whatever is on the screen every second (or even faster)
  // using escape codes.
  // This should allow me to allow the user to "type" while they are getting RT
  // feedback on what is happening in the terminal above their input by remembering
  // what they had typed before we refresh the screen and keeping that part in
  // Or just not deleting that part at all.
  // const UiService = new Terminal_ui_service()
  // await UiService.showStartScreen()
  // const gameStartType = await UiService.getGameStartType()
  const multiSelect = new TerminalSelect({
    question: 'pick one',
    options: ['one', 'two'],
  })
  const input = await multiSelect.waitForInput()
  console.log(input)
}

main()
