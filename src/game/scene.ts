import { Bed } from './bed'
import { Door } from './door'
import { Wall } from './wall'
import { Npc } from './npc'

export interface Scene {
  id: string
  children?: Scene[]
  north?: Scene
  south?: Scene
  east?: Scene
  west?: Scene
  beds?: Bed[]
  doors?: Door[]
  walls?: Wall[]
  npcs?: Npc[]
}
