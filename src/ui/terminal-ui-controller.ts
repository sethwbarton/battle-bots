import Table from 'cli-table'
import { GameState } from '../game/game-state'
import { prompt } from 'enquirer'
import { Command } from '../game/command'
import { Scene } from '../game/scene'

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
  addNpcsToUiBoard(gameState.currentScene, gameBoard)

  // Put the rows into our table
  for (const row of gameBoard) {
    table.push(row)
  }

  // Draw
  console.log(table.toString())
}

function addNpcsToUiBoard(currentScene: Scene, board: string[][]) {
  currentScene?.npcs?.forEach((door) => {
    board[door.coords.y][door.coords.x] = door.symbol
  })
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

export async function promptForConversation(
  topicOptions: string[],
  npcOpener: string
): Promise<string> {
  const result = await prompt({
    message: npcOpener,
    type: 'select',
    name: 'conversationOption',
    choices: topicOptions,
  })
  return (result as any).conversationOption
}

export async function getCommand(): Promise<string> {
  const playerAnswer = await prompt({
    message: 'Command Your Character',
    type: 'input',
    name: 'command',
  })
  return (playerAnswer as any).command
}

export async function showHelpDialog(): Promise<void> {
  console.log('Use w, a, s, d, followed by enter to move.')
  console.log('You can use wa, wd, sd, sa to move diagonally.')
  console.log('Use talk [coordinates] to talk to people.')
}
