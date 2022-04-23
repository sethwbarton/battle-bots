import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { PlayerLocation } from '../../src/entities/player_location'
import { StarSystem } from '../../src/entities/star_system'

describe('Player Location', () => {
  it('should initialize with a passed state object', () => {
    const playerUnderTest = new PlayerLocation({
      starSystem: new StarSystem({
        name: 'Beetleguise',
        planets: [],
        galacticCoords: { x: 1, z: 1, y: 1 },
      }),
      coords: { x: 50, y: 50, z: 50 },
    })
    expect(playerUnderTest.starSystem?.name === 'Beetleguise')
    expect(
      playerUnderTest.coords.x === 50 &&
        playerUnderTest.coords.y === 50 &&
        playerUnderTest.coords.z === 50
    )
  })
  it('should initialize with a default system when no state is passed', () => {
    const playerUnderTest = new PlayerLocation()
    expect(playerUnderTest.starSystem.name === 'Sol')
  })
  it('should initialize with default coordinates when no state is passed', () => {
    const playerUnderTest = new PlayerLocation()
    expect(
      playerUnderTest.coords.x === 100 &&
        playerUnderTest.coords.y === 100 &&
        playerUnderTest.coords.z === 100
    )
  })
})
