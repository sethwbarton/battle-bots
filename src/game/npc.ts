import { Collidable } from './collidable'
import { Coords, Drawable } from './drawable'
import { Hitable } from './hitable'
import { UiController } from '../ui/ui-controller'
import { GameState } from './game-state'
import { NUM_ROWS_PER_SCENE } from '../ui/terminal-ui-controller'
import { equals, find } from 'ramda'

export const DEFAULT_NPC_HITPOINTS = 100

export interface DialogueOption {
  subject: string
  response: string
}

export interface Npc extends Collidable, Drawable, Hitable {
  name: string
  dialogueMap: {
    openingPhrase: string
    options: DialogueOption[]
  }
}

export async function talkToNpc(
  uiController: UiController,
  gameState: GameState,
  userInputCoordinates: string
) {
  const coordinates = matchLetterNumberToCoordinate(userInputCoordinates)

  if (!coordinates) {
    return
  }

  const npcToTalkTo = getNpcFromCoordinates(gameState, coordinates)
  if (npcToTalkTo) {
    await uiController.display(npcToTalkTo.name)
  }
  const topicOptions = npcToTalkTo?.dialogueMap?.options.map(
    (dialogueOption: DialogueOption) => {
      return dialogueOption.subject
    }
  )

  let conversationOption = await uiController.promptMultiChoice(
    npcToTalkTo?.dialogueMap?.openingPhrase ||
      'This person has nothing to say to you.',
    [...(topicOptions || []), 'quit']
  )

  while (conversationOption !== 'quit') {
    conversationOption = await uiController.promptMultiChoice(
      find(
        (dialogueOption: DialogueOption) =>
          dialogueOption.subject === conversationOption
      )(npcToTalkTo?.dialogueMap?.options || [])?.response || '',
      [...(topicOptions || []), 'quit']
    )
  }
}

function getNpcFromCoordinates(
  gameState: GameState,
  coords: Coords
): Npc | undefined {
  return find((npc: Npc) => {
    return equals(npc.coords, coords)
  })(gameState.currentScene?.npcs || [])
}

export function matchLetterNumberToCoordinate(
  letterNumberCombo: string
): Coords | undefined {
  const lettersToXCoord: Map<string, number> = new Map(
    Object.entries({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
    })
  )
  const letter = letterNumberCombo.split('')[0]
  const number = Number.parseInt(letterNumberCombo.split('')[1])
  if (
    lettersToXCoord.get(letter.toLowerCase()) === undefined ||
    number > NUM_ROWS_PER_SCENE - 1
  ) {
    return undefined
  }
  return { x: lettersToXCoord.get(letter.toLowerCase()) || 1, y: number }
}

export function isValidNpc(
  playerInputCoordinates: string,
  gameState: GameState
): boolean {
  if (matchLetterNumberToCoordinate(playerInputCoordinates)) {
    return Boolean(
      getNpcFromCoordinates(
        gameState,
        matchLetterNumberToCoordinate(playerInputCoordinates) || { x: 1, y: 1 }
      )
    )
  } else {
    return false
  }
}
