import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'
import { Command } from './command'
import {
  movePlayerDown,
  movePlayerDownLeft,
  movePlayerDownRight,
  movePlayerLeft,
  movePlayerRight,
  movePlayerUp,
  movePlayerUpLeft,
  movePlayerUpRight,
} from './player'

export async function doPlayerTurn(
  gameState: GameState,
  uiController: UiController
): Promise<GameState> {
  const command = await uiController.getCommand()
  switch (command) {
    case Command.MoveDown:
      gameState = await movePlayerDown(gameState)
      break
    case Command.MoveUp:
      gameState = await movePlayerUp(gameState)
      break
    case Command.MoveLeft:
      gameState = await movePlayerLeft(gameState)
      break
    case Command.MoveRight:
      gameState = await movePlayerRight(gameState)
      break
    case Command.MoveDownRight:
      gameState = await movePlayerDownRight(gameState)
      break
    case Command.MoveDownLeft:
      gameState = await movePlayerDownLeft(gameState)
      break
    case Command.MoveUpRight:
      gameState = await movePlayerUpRight(gameState)
      break
    case Command.MoveUpLeft:
      gameState = await movePlayerUpLeft(gameState)
      break
  }
  return gameState
}
