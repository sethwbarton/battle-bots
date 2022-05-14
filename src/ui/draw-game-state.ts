import Table from 'cli-table'
import { GameSate } from '../game/game-state'

export async function drawGameState(gameState: GameSate) {
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
  for (let i = 0; i < 10; i += 1) {
    table.push(['x', 'x', '➤', '🚪', 'x', 'x', 'x', 'x', 'x', 'x'])
  }

  console.log(table.toString())
}
