import { Scene } from '../../game/scene'
import { uiArrayToSceneObject } from '../scene-utils'
import { DEFAULT_WALL_HITPOINTS, Wall } from '../../game/wall'
import { Bed } from '../../game/bed'

describe('Scene Utils', () => {
  describe('UiArrayToSceneObject', () => {
    it('Translates vertical walls', () => {
      const exampleScene = [
        //prettier-ignore
        [' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
      ]
      const wall: Wall = {
        collidable: true,
        coords: { x: 1, y: 0 },
        symbol: '|',
        hitpoints: DEFAULT_WALL_HITPOINTS,
      }
      const expectedSceneObject: Scene = {
        drawables: [wall],
        id: '',
      }
      expect(uiArrayToSceneObject(exampleScene, '')).toEqual(
        expectedSceneObject
      )
    })

    it('Translates horizontal walls', () => {
      const exampleScene = [
        //prettier-ignore
        [' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
      ]
      const wall: Wall = {
        collidable: true,
        coords: { x: 1, y: 0 },
        symbol: '-',
        hitpoints: DEFAULT_WALL_HITPOINTS,
      }
      const expectedSceneObject: Scene = {
        drawables: [wall],
        id: '',
      }
      expect(uiArrayToSceneObject(exampleScene, '')).toEqual(
        expectedSceneObject
      )
    })

    it('Translates beds', () => {
      const exampleScene = [
        //prettier-ignore
        [' ', 'Ξ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
      ]
      const bed: Bed = {
        collidable: false,
        coords: { x: 1, y: 0 },
        hitpoints: 100,
        symbol: 'Ξ',
      }
      const expectedSceneObject: Scene = {
        drawables: [bed],
        id: '',
      }
      expect(uiArrayToSceneObject(exampleScene, '')).toEqual(
        expectedSceneObject
      )
    })
  })
})
