import { Scene } from './scene'
import { World } from './world'

export interface GameSate {
  world: World
  currentScene: Scene
}
