import { prompt } from 'enquirer'
import { drawGameState } from './ui/draw-game-state'
import { GameSate } from './game/game-state'

/*
A big global map with lots of smaller scenes.
A scene is a 10mx10m area. The player and NPC's can travel between scenes.
The player and NPC's can also travel within a scene.

It's turn based, so every time the player finishes a turn, the NPC's all take one huge turn.
The player's turn consists of 2 actions which includes a movement limit depending on the player character's speed.
Before the player commits to their actions, they may also view the map, their inventory, their journal, or their character sheet.
 */

async function gameLoop(gameState: GameSate) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await drawGameState(gameState)
    await promptForInput(gameState)
  }
}

async function promptForInput(gameState: GameSate) {
  const playerAnswer = await prompt({
    message: 'What do you want to do?',
    type: 'input',
    name: 'choice',
  })
  console.log(playerAnswer)
}

async function makeNewGameState(): Promise<GameSate> {
  return {
    world: {
      scenes: [],
    },
    currentScene: {
      drawables: [],
      id: 1,
    },
  }
}

interface gameStartSelection {
  startOption: 'New Game' | 'Load'
}

prompt({
  message: 'Welcome to The Dungeon',
  type: 'select',
  name: 'startOption',
  choices: ['New Game', 'Load'],
}).then(async (answer) => {
  if ((answer as unknown as gameStartSelection).startOption === 'New Game') {
    await gameLoop(await makeNewGameState())
  } else {
    console.log("I can't do that yet. Goodbye.")
    process.exit(1)
  }
})
