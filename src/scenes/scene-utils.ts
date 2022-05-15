import { Scene } from '../game/scene'
import { Drawable } from '../game/drawable'
import { DEFAULT_WALL_HITPOINTS, Wall } from '../game/wall'
import { Bed, DEFAULT_BED_HITPOINTS } from '../game/bed'
import * as fs from 'fs'
import { botnikJailCenter } from './scene-ui-drawings/botnik-jail-center-drawing'

export const symbolToObjectFactoryMapping: Record<
  string,
  (x: number, y: number) => Drawable
> = {
  '-': makeHorizontalWall,
  '|': makeVerticalWall,
  Ξ: makeBed,
}

export function uiArrayToSceneObject(uiArray: string[][], id: string): Scene {
  const drawables: Drawable[] = []
  uiArray.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell != ' ') {
        if (!symbolToObjectFactoryMapping[cell]) {
          console.log("I don't know how to make on of those! Symbol: " + cell)
        } else {
          drawables.push(symbolToObjectFactoryMapping[cell](colIndex, rowIndex))
        }
      }
    })
  })
  return { drawables, id }
}

// Here's how you use this.
writeSceneToJsonFile(uiArrayToSceneObject(botnikJailCenter, 'botnik-jail-1'))

/**
 * Writes the scene to a json file in the scene-json-files folder.
 * The name of the file is the id of the scene.
 * @param scene
 */
export function writeSceneToJsonFile(scene: Scene) {
  fs.writeFile(
    `src/scenes/scene-json-files/${scene.id}.json`,
    JSON.stringify(scene, null, 2),
    () => {
      console.log('finished created scene ' + scene.id)
    }
  )
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

function makeBed(x: number, y: number): Bed {
  return {
    coords: { x, y },
    symbol: 'Ξ',
    collidable: false,
    hitpoints: DEFAULT_BED_HITPOINTS,
  }
}

// To create a new scene I just have to make the drawing. Then this code creates all the members with their default values and writes them to JSON.
// We can load in the JSON at the start of a new game for each scene. If I want something to be special in a scene, I just need to edit the JSON files.
