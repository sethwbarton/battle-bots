import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { Player } from '../../src/entities/player'
import { Planet } from '../../src/entities/planet'
import { StarSystem } from '../../src/entities/star_system'
import { Ship } from '../../src/entities/ship'
import { PlayerLocation } from '../../src/entities/player_location'

describe('Player', () => {
  it('should initialize with a passed state object', () => {
    const planet = new Planet({ name: 'MyPlanet' })
    const system = new StarSystem({
      planets: [planet],
      name: 'Random System',
    })
    const ship = new Ship({ hitPoints: 100 })
    const playerUnderTest = new Player({
      storedShips: [],
      currentShip: ship,
      location: new PlayerLocation({ planet: planet, starSystem: system }),
    })
    expect(playerUnderTest.currentShip.hitPoints == 100)
    expect(playerUnderTest.storedShips.length === 0)
    expect(playerUnderTest.location.planet?.name === 'MyPlanet')
    expect(playerUnderTest.location.starSystem.planets.length === 1)
    expect(playerUnderTest.location.starSystem.planets[0].name === 'MyPlanet')
  })
  it('should initialize a new plyer when no state object is passed with defaults', () => {
    const playerUnderTest = new Player()
    expect(playerUnderTest.currentShip.hitPoints == 100)
    expect(playerUnderTest.storedShips.length === 0)
    expect(playerUnderTest.location.planet?.name === 'Earth')
    expect(playerUnderTest.location.starSystem.planets.length === 1)
  })
})
