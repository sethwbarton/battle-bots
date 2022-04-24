import { PlayerLocation } from './player_location'
import { Ship } from './ship'
import { Planet } from './planet'
import { StarSystem } from './star_system'

interface NewPlayerParams {
  location: PlayerLocation
  currentShip: Ship
  storedShips: Ship[]
}

export class Player {
  _location: PlayerLocation
  _currentShip: Ship
  _storedShips: Ship[]

  get location(): PlayerLocation {
    return this._location
  }

  set location(value: PlayerLocation) {
    this._location = value
  }

  get currentShip(): Ship {
    return this._currentShip
  }

  set currentShip(value: Ship) {
    this._currentShip = value
  }

  get storedShips(): Ship[] {
    return this._storedShips
  }

  set storedShips(value: Ship[]) {
    this._storedShips = value
  }

  public constructor(state?: NewPlayerParams) {
    if (state) {
      this._location = state.location
      this._currentShip = state.currentShip
      this._storedShips = state.storedShips
    } else {
      const startingSystem = new StarSystem()
      this._location = new PlayerLocation({
        starSystem: startingSystem,
        coords: { x: 100, y: 100, z: 100 },
      })
      this._currentShip = new Ship({
        coords: {
          x: this.location.coords.x,
          y: this.location.coords.y,
          z: this.location.coords.z,
        },
        hitPoints: 100,
      })
      this._storedShips = []
    }
  }
}
