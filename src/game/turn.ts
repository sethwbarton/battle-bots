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
      gameState.player = await movePlayerDown(gameState.player)
      break
    case Command.MoveUp:
      gameState.player = await movePlayerUp(gameState.player)
      break
    case Command.MoveLeft:
      gameState.player = await movePlayerLeft(gameState.player)
      break
    case Command.MoveRight:
      gameState.player = await movePlayerRight(gameState.player)
      break
    case Command.MoveDownRight:
      gameState.player = await movePlayerDownRight(gameState.player)
      break
    case Command.MoveDownLeft:
      gameState.player = await movePlayerDownLeft(gameState.player)
      break
    case Command.MoveUpRight:
      gameState.player = await movePlayerUpRight(gameState.player)
      break
    case Command.MoveUpLeft:
      gameState.player = await movePlayerUpLeft(gameState.player)
      break
  }
  return gameState
}
