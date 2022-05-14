import Table from 'cli-table'
import { GameState } from '../game/game-state'
import { prompt } from 'enquirer'
import { Command } from '../game/command'

export async function drawGameState(gameState: GameState) {
  const table = new Table({
    chars: {
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      middle: ' ',
    },
  })

  // Start with a scene of only spaces
  const rows = []
  for (let i = 0; i < 10; i += 1) {
    rows.push([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])
  }

  // Render each drawable with their character in their positions into the rows
  const playerX = gameState.player.coords.x
  const playerY = gameState.player.coords.y
  const playerSymbol = gameState.player.symbol

  rows[playerY][playerX] = playerSymbol

  // Put the rows into our table
  for (const row of rows) {
    table.push(row)
  }

  // Draw
  console.log(table.toString())
}

export async function getStartGameSelection(): Promise<'New' | 'Load'> {
  const result = await prompt({
    message: 'Welcome to The Dungeon',
    type: 'select',
    name: 'startOption',
    choices: ['New Game', 'Load'],
  })
  if ((result as any).startOption === 'New Game') {
    return 'New'
  } else {
    return 'Load'
  }
}

export async function getCommand(): Promise<Command> {
  const playerAnswer = await prompt({
    message: 'Command Your Character',
    type: 'input',
    name: 'command',
  })
  switch ((playerAnswer as any).command) {
    case 'w':
      return Command.MoveUp
    case 's':
      return Command.MoveDown
    case 'd':
      return Command.MoveRight
    case 'a':
      return Command.MoveLeft
    case 'wd':
      return Command.MoveUpRight
    case 'dw':
      return Command.MoveUpRight
    case 'wa':
      return Command.MoveUpLeft
    case 'aw':
      return Command.MoveUpLeft
    case 'sd':
      return Command.MoveDownRight
    case 'ds':
      return Command.MoveDownRight
    case 'sa':
      return Command.MoveDownLeft
    case 'as':
      return Command.MoveDownLeft
  }

  console.log("Type 'help' for a list of possible commands.")
  return Command.DoNothing
}