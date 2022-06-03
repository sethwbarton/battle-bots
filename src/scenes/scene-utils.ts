import { Scene } from '../game/scene'
import { DEFAULT_WALL_HITPOINTS, Wall } from '../game/wall'
import { Bed, DEFAULT_BED_HITPOINTS } from '../game/bed'
import * as fs from 'fs'
import { append, assoc, filter, isEmpty } from 'ramda'
import { DEFAULT_DOOR_HITPOINTS, Door } from '../game/door'

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

type SceneObjectsTracker = { walls: Wall[]; beds: Bed[]; doors: Door[] }

export function uiArrayToSceneObject(uiArray: string[][], id: string): Scene {
  let sceneObjects: SceneObjectsTracker = { walls: [], beds: [], doors: [] }
  uiArray.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell != ' ') {
        sceneObjects = createSceneObjectFromCharacter(
          cell,
          sceneObjects,
          colIndex,
          rowIndex
        )
      }
    })
  })

  return { ...filterEmptyArrays(sceneObjects), id }
}

function createSceneObjectFromCharacter(
  objectCharacter: string,
  currentSceneObjects: SceneObjectsTracker,
  column: number,
  row: number
): SceneObjectsTracker {
  switch (objectCharacter) {
    case '-':
      return assoc(
        'walls',
        append(makeHorizontalWall(column, row), currentSceneObjects.walls),
        currentSceneObjects
      )
    case '~':
      return assoc(
        'doors',
        append(makeHorizontalDoor(column, row), currentSceneObjects.doors),
        currentSceneObjects
      )
    case '\\':
      return assoc(
        'doors',
        append(makeVerticalDoor(column, row), currentSceneObjects.doors),
        currentSceneObjects
      )
    case '|':
      return assoc(
        'walls',
        append(makeVerticalWall(column, row), currentSceneObjects.walls),
        currentSceneObjects
      )
    case 'Ξ':
      return assoc(
        'beds',
        append(makeBed(column, row), currentSceneObjects.beds),
        currentSceneObjects
      )
    default:
      console.log(
        "I don't know how to make one of those! Symbol: " + objectCharacter
      )
      return currentSceneObjects
  }
}

function filterEmptyArrays(objectWithDrawables: {
  beds: Bed[]
  walls: Wall[]
}) {
  return filter(
    (listOfDrawables) => !isEmpty(listOfDrawables),
    objectWithDrawables
  )
}

function makeHorizontalDoor(x: number, y: number): Door {
  return {
    collidable: true,
    coords: { x, y },
    hitpoints: DEFAULT_DOOR_HITPOINTS,
    symbol: '~',
  }
}

function makeVerticalDoor(x: number, y: number): Door {
  return {
    collidable: true,
    coords: { x, y },
    hitpoints: DEFAULT_DOOR_HITPOINTS,
    symbol: '\\',
  }
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
