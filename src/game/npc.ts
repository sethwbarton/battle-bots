import { Collidable } from './collidable'
import { Drawable } from './drawable'
import { Hitable } from './hitable'

export const DEFAULT_NPC_HITPOINTS = 100

export interface Npc extends Collidable, Drawable, Hitable {
  name?: string
}
