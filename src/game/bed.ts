import { Collidable } from './collidable'
import { Drawable } from './drawable'
import { Hitable } from './hitable'

export const DEFAULT_BED_HITPOINTS = 100
export interface Bed extends Collidable, Drawable, Hitable {}
