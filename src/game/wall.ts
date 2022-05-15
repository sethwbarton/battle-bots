import { Collidable } from './collidable'
import { Drawable } from './drawable'
import { Hitable } from './hitable'

export const WALL_SYMBOL_VERTICAL = '|'
export const WALL_SYMBOL_HORIZONTAL = '-'
export const DEFAULT_WALL_HITPOINTS = 100000000
export interface Wall extends Collidable, Drawable, Hitable {}
