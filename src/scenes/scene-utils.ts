import { Scene } from '../game/scene'
import { Drawable } from '../game/drawable'
import { DEFAULT_WALL_HITPOINTS, Wall } from '../game/wall'

export const symbolToObjectFactoryMapping: Record<
  string,
  (x: number, y: number) => Drawable
> = {
  '-': makeHorizontalWall,
  '|': makeVerticalWall,
}

export function uiArrayToSceneObject(uiArray: string[][], id: string): Scene {
  const drawables: Drawable[] = []
  uiArray.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell != ' ') {
        drawables.push(symbolToObjectFactoryMapping[cell](colIndex, rowIndex))
      }
    })
  })
  return { drawables, id }
}

function makeHorizontalWall(x: number, y: number): Wall {
  return {
    coords: { x, y },
    symbol: '-',
    collidable: true,
    hitpoints: DEFAULT_WALL_HITPOINTS,
  }
}

function makeVerticalWall(x: number, y: number): Wall {
  return {
    coords: { x, y },
    symbol: '|',
    collidable: true,
    hitpoints: DEFAULT_WALL_HITPOINTS,
  }
}

// To create a new scene I just have to make the drawing. Then this code creates all the members with their default values and writes them to JSON.
// We can load in the JSON at the start of a new game for each scene. If I want something to be special in a scene, I just need to edit the JSON files.
