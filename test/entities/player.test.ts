import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { Player } from '../../src/entities/player'

describe('Player', () => {
  it('should initialize with a passed state object', () => {
    const playerUnderTest = new Player({
      _location: {
        _planet: { name: 'myPlanet' },
        _starSystem: { _planets: [] },
      },
      _currentShip: { _hitPoints: 200 },
      _storedShips: [],
    })
    expect(playerUnderTest.currentShip.hitpoints == 200)
    expect(playerUnderTest.storedShips === [])
    expect(playerUnderTest.location.planet.name === 'myPlanet')
    expect(playerUnderTest.location.starSystem._planets === [])
  })
  it('should initialize a new plyer when no state object is passed with defaults', () => {
    const playerUnderTest = new Player()
    expect(playerUnderTest.currentShip.hitpoints == 100)
    expect(playerUnderTest.storedShips === [])
    expect(playerUnderTest.location.planet.name === 'Sol')
    expect(playerUnderTest.location.starSystem._planets.length === 8)
  })
})
