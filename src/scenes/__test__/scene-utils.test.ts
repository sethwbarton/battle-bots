import { Scene } from '../../game/scene'
import { uiArrayToSceneObject } from '../scene-utils'
import { DEFAULT_WALL_HITPOINTS, Wall } from '../../game/wall'
import { Bed } from '../../game/bed'
import { DEFAULT_DOOR_HITPOINTS, Door } from '../../game/door'

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
        walls: [wall],
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
        walls: [wall],
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
        beds: [bed],
        id: '',
      }
      expect(uiArrayToSceneObject(exampleScene, '')).toEqual(
        expectedSceneObject
      )
    })

    it('Translates horizontal doors', () => {
      const exampleScene = [
        //prettier-ignore
        [' ', '~', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
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
      const door: Door = {
        collidable: true,
        coords: { x: 1, y: 0 },
        hitpoints: DEFAULT_DOOR_HITPOINTS,
        symbol: '~',
      }
      const expectedSceneObject: Scene = {
        doors: [door],
        id: '',
      }
      expect(uiArrayToSceneObject(exampleScene, '')).toEqual(
        expectedSceneObject
      )
    })

    it('Translates vertical doors', () => {
      const exampleScene = [
        //prettier-ignore
        [' ', '\\', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
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
      const door: Door = {
        collidable: true,
        coords: { x: 1, y: 0 },
        hitpoints: DEFAULT_DOOR_HITPOINTS,
        symbol: '\\',
      }
      const expectedSceneObject: Scene = {
        doors: [door],
        id: '',
      }
      expect(uiArrayToSceneObject(exampleScene, '')).toEqual(
        expectedSceneObject
      )
    })

    it('Translates a whole bunch of doors', () => {
      const exampleScene = [
        //prettier-ignore
        [' ', '\\', '~', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
        //prettier-ignore
        [' ', '\\', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' '],
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
      const doorOne: Door = {
        collidable: true,
        coords: { x: 1, y: 0 },
        hitpoints: DEFAULT_DOOR_HITPOINTS,
        symbol: '\\',
      }
      const doorTwo: Door = {
        collidable: true,
        coords: { x: 2, y: 0 },
        hitpoints: DEFAULT_DOOR_HITPOINTS,
        symbol: '~',
      }
      const doorThree: Door = {
        collidable: true,
        coords: { x: 1, y: 1 },
        hitpoints: DEFAULT_DOOR_HITPOINTS,
        symbol: '\\',
      }
      const expectedSceneObject: Scene = {
        doors: [doorOne, doorTwo, doorThree],
        id: '',
      }
      expect(uiArrayToSceneObject(exampleScene, '')).toEqual(
        expectedSceneObject
      )
    })
  })
})
