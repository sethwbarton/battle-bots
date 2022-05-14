import { Scene } from './scene'
import { World } from './world'
import { Player } from './player'

export interface GameState {
  player: Player
  world: World
  currentScene: Scene
}
