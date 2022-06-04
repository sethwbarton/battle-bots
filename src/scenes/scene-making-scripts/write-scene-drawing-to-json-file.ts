import { Scene } from '../../game/scene'
import fs from 'fs'
import { botnikJailCenter } from '../scene-ui-drawings/botnik-jail-center-drawing'
import { uiArrayToSceneObject } from '../scene-utils'

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

writeSceneToJsonFile(uiArrayToSceneObject(botnikJailCenter, 'botnik-jail-1'))
