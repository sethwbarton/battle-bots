import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'
import { Command } from './command'
import { movePlayer } from './player'
import { talkToNpc } from './npc'

export async function doPlayerTurn(
  gameState: GameState,
  uiController: UiController
): Promise<GameState> {
  const commandWithArguments = await uiController.getCommand()
  const command = commandWithArguments.split(' ')[0]
  const argument = commandWithArguments.split(' ')[1]

  switch (command) {
    case Command.Talk:
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
  }
  return gameState
}
