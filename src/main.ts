import { GameState } from './game/game-state'
import { doPlayerTurn } from './game/turn'
import * as uiController from './ui/terminal-ui-controller'
import { uiArrayToSceneObject } from './scenes/scene-utils'
import { botnikJailCenterSceneUiArray } from './scenes/botnik-jail-center'

export const STARTING_PLAYER_SYMBOL = '☉'

async function gameLoop() {
  let gameState = await makeNewGameState()
  const startGameSelection = await uiController.getStartGameSelection()
  if (startGameSelection === 'Load') {
    console.log("Sorry, I don't do that yet. Goodbye.")
    process.exit(0)
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    await uiController.drawGameState(gameState)
    gameState = await doPlayerTurn(gameState, uiController)
  }
}

async function makeNewGameState(): Promise<GameState> {
  return {
    player: {
      coords: { x: 5, y: 5 },
      symbol: STARTING_PLAYER_SYMBOL,
    },
    world: {
      scenes: [],
    },
    currentScene: uiArrayToSceneObject(botnikJailCenterSceneUiArray),
  }
}

gameLoop().then(() => {
  console.log("I don't know how you got here. But I commend you. Goodbye.")
  process.exit(0)
})
