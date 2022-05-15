import { Collidable } from './collidable'
import { Drawable } from './drawable'
import { Hitable } from './hitable'

export interface Bed extends Collidable, Drawable, Hitable {}
