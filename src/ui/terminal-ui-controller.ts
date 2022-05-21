import Table from 'cli-table'
import { GameState } from '../game/game-state'
import { prompt } from 'enquirer'
import { Command } from '../game/command'
import { Drawable } from '../game/drawable'
import { Scene } from '../game/scene'
import { pipe } from 'ramda'

const COLOR_RESET_CODE = '\x1b[0m'
const RED_COLOR_CODE = '\x1b[31m'
const GREEN_COLOR_CODE = '\x1b[32m'

export const NUM_ROWS_PER_SCENE = 10
export const NUM_COLS_PER_SCENE = 17

export async function drawGameState(gameState: GameState) {
  const table = new Table({
    head: [
      ' ',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
    ],
    chars: {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      mid: '─',
      'mid-mid': '┼',
      right: '║',
      'right-mid': '╢',
      middle: '│',
    },
  })

  // Start with a scene of only spaces
  const gameBoard: string[][] = []
  for (let i = 0; i < 10; i += 1) {
    gameBoard.push([
      `${i}`,
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
    ])
  }

  // Render each drawable with their character in their positions into the rows
  const playerX = gameState.player.coords.x
  const playerY = gameState.player.coords.y
  const playerSymbol = gameState.player.symbol

  gameBoard[playerY][playerX] = playerSymbol

  addDoorsToUiBoard(gameState.currentScene, gameBoard)
  addBedsToUiBoard(gameState.currentScene, gameBoard)
  addWallsToUiBoard(gameState.currentScene, gameBoard)

  // Put the rows into our table
  for (const row of gameBoard) {
    table.push(row)
  }

  // Draw
  console.log(table.toString())
}

function addDoorsToUiBoard(currentScene: Scene, board: string[][]) {
  currentScene?.doors?.forEach((door) => {
    board[door.coords.y][door.coords.x] = door.symbol
  })
}

function addBedsToUiBoard(currentScene: Scene, board: string[][]) {
  currentScene?.beds?.forEach((bed) => {
    board[bed.coords.y][bed.coords.x] = bed.symbol
  })
}

function addWallsToUiBoard(currentScene: Scene, board: string[][]) {
  currentScene?.walls?.forEach((wall) => {
    board[wall.coords.y][wall.coords.x] = wall.symbol
  })
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
