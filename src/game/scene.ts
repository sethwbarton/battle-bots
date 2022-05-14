import { Drawable } from './drawable'

export interface Scene {
  id: number
  children?: Scene[]
  north?: Scene
  south?: Scene
  east?: Scene
  west?: Scene
  drawables: Drawable[]
}
