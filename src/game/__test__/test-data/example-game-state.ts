import { GameState } from '../../game-state'

export const exampleGameState: GameState = {
  currentScene: { id: '' },
  player: { coords: { x: 5, y: 5 }, symbol: 'P' },
  world: { scenes: [], worldTime: '9:00' },
}
