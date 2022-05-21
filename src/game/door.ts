import { Collidable } from './collidable'
import { Drawable } from './drawable'
import { Hitable } from './hitable'

export const DOOR_SYMBOL_VERTICAL = '\\'
export const DOOR_SYMBOL_HORIZONTAL = '~'
export const DEFAULT_DOOR_HITPOINTS = 100000000

export interface Door extends Collidable, Drawable, Hitable {
  locked?: boolean
  lockLevel?: number
}
