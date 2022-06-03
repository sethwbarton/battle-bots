import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'
import { Command } from './command'
import { movePlayer } from './player'

export async function doPlayerTurn(
  gameState: GameState,
  uiController: UiController
): Promise<GameState> {
  const command = await uiController.getCommand()
  switch (command) {
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
