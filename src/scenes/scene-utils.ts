import { Scene } from '../game/scene'
import { Drawable } from '../game/drawable'

export function uiArrayToSceneObject(uiArray: string[][]): Scene {
  const drawables: Drawable[] = []
  uiArray.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell != ' ') {
        drawables.push({coords: {x: colIndex, y: rowIndex}, symbol: cell})
      }
    })
  })
  return { drawables, id: 0}
}