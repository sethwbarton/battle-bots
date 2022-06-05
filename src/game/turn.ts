import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'
import { Command } from './command'
import { movePlayer } from './player'
import { isValidNpc, talkToNpc } from './npc'

/*
Hey Seth,

Here's the next thing you need to add to your game.
There needs to be some way to inspect things (the bed) and have a script run.
Because under the bed there's going to be a sack and in the sack there's going to be a key
and a mysterious note. Polonius is going to be ticked when he sees it because he was only
being sassy when he said to check the bed.

So we need a scripting engine... and an inventory for the player....
and a way to open a door given that you have the right key.

Happy hacking!
 */
export async function doPlayerTurn(
  gameState: GameState,
  uiController: UiController
): Promise<GameState> {
  const reprompt = true
  while (reprompt) {
    const commandWithArguments = await uiController.getCommand()
    const command = commandWithArguments.split(' ')[0]
    const argument = commandWithArguments.split(' ')[1]

    switch (command) {
      case Command.Talk:
        if (!isValidNpc(argument, gameState)) {
          await uiController.promptForConversation(
            ['quit'],
            "You can't talk to that."
          )
          break
        }
        await talkToNpc(uiController, gameState, argument)
        return gameState
      case Command.MoveDown:
        return movePlayer(gameState, command)
      case Command.MoveUp:
        return movePlayer(gameState, command)
      case Command.MoveLeft:
        return movePlayer(gameState, command)
      case Command.MoveRight:
        return movePlayer(gameState, command)
      case Command.MoveUpRight:
        return movePlayer(gameState, command)
      case Command.MoveUpLeft:
        return movePlayer(gameState, command)
      case Command.MoveDownRight:
        return movePlayer(gameState, command)
      case Command.MoveDownLeft:
        return movePlayer(gameState, command)
      default:
        await uiController.showHelpDialog()
    }
  }

  return gameState
}
