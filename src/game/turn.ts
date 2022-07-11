import { GameState } from './game-state'
import { UiController } from '../ui/ui-controller'
import { Command } from './command'
import { movePlayer } from './player'
import { isValidNpc, matchLetterNumberToCoordinate, talkToNpc } from './npc'
import { find, propEq } from 'ramda'
import { defaultBedInteract } from './bed'
import { Coords } from './drawable'

export async function doPlayerTurn(
  gameState: GameState,
  uiController: UiController
): Promise<GameState> {
  const reprompt = true
  while (reprompt) {
    const commandWithArguments = await uiController.promptInput(
      'Command your character'
    )
    const command = commandWithArguments.split(' ')[0]
    const argument = commandWithArguments.split(' ')[1]

    switch (command) {
      case Command.Interact:
        return await interactWithObject(gameState, argument, uiController)
      case Command.Talk:
        if (!isValidNpc(argument, gameState)) {
          await uiController.promptMultiChoice("You can't talk to that.", [
            'quit',
          ])
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
        await uiController.display(
          'Use w, a, s, d, followed by enter to move. \n' +
            'You can use wa, wd, sd, sa to move diagonally. \n' +
            'Use talk [coordinates] to talk to people.'
        )
    }
  }

  return gameState
}

const interactWithObject = async (
  gameState: GameState,
  commandArgument: string,
  uiController: UiController
): Promise<GameState> => {
  const objectCoordinates = matchLetterNumberToCoordinate(commandArgument)

  const targetedObject = await findItemFromCoordinates(
    gameState,
    objectCoordinates || { x: 1, y: 1 }
  )
  if (!targetedObject) {
    await uiController.display("You can't interact with that.")
    return gameState
  }
  if (isNpc(targetedObject)) {
    await talkToNpc(uiController, gameState, commandArgument)
    return gameState
  }

  return await defaultBedInteract(gameState, uiController, { x: 1, y: 1 })
}

async function findItemFromCoordinates(
  gameState: GameState,
  objectCoordinates: Coords
): Promise<any | undefined> {
  return find(propEq('coords', objectCoordinates))([
    ...(gameState.currentScene.beds || []),
    ...(gameState.currentScene.npcs || []),
  ])
}

function isNpc(object: any) {
  return Boolean(object?.dialogueMap)
}
