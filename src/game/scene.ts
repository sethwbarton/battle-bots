import { Drawable } from './drawable'

export interface Scene {
  id: string
  children?: Scene[]
  north?: Scene
  south?: Scene
  east?: Scene
  west?: Scene
  drawables: Drawable[]
}
