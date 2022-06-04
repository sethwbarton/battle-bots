import { Collidable } from './collidable'
import { Drawable } from './drawable'
import { Hitable } from './hitable'

export const DEFAULT_NPC_HITPOINTS = 100

export interface DialogueOption {
  subject: string
  response: string
}

export interface Npc extends Collidable, Drawable, Hitable {
  name?: string
  dialogueMap?: {
    openingPhrase: string
    options: DialogueOption[]
  }
}
