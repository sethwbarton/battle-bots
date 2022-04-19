import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { PlayerLocation } from '../../src/entities/player_location'
import { Planet } from '../../src/entities/planet'
import { StarSystem } from '../../src/entities/star_system'

describe('Player Location', () => {
  it('should initialize with a passed state object', () => {
    const playerUnderTest = new PlayerLocation({
      planet: new Planet({ name: '' }),
      starSystem: new StarSystem({ name: '', planets: [] }),
    })
    expect(playerUnderTest.planet?.name === '')
  })
  it('should initialize a new plyer location when no state object is passed', () => {
    const playerUnderTest = new PlayerLocation()
    expect(playerUnderTest.planet?.name === 'Earth')
    expect(playerUnderTest.starSystem.name === 'Sol')
  })
})
