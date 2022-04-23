import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { Player } from '../../src/entities/player'
import { Planet } from '../../src/entities/planet'
import { StarSystem } from '../../src/entities/star_system'
import { Ship } from '../../src/entities/ship'
import { PlayerLocation } from '../../src/entities/player_location'

describe('Player', () => {
  it('should initialize with a passed state object', () => {
    const planet = new Planet()
    const system = new StarSystem()
    const ship = new Ship()
    const playerUnderTest = new Player({
      storedShips: [],
      currentShip: ship,
      location: new PlayerLocation({
        starSystem: system,
        coords: { x: 0, y: 0, z: 0 },
      }),
    })
    expect(playerUnderTest.currentShip.hitPoints == 100)
    expect(playerUnderTest.storedShips.length === 0)
  })
  it('should initialize a new plyer when no state object is passed with defaults', () => {
    const playerUnderTest = new Player()
    expect(playerUnderTest.currentShip.hitPoints == 100)
    expect(playerUnderTest.storedShips.length === 0)
  })
})
