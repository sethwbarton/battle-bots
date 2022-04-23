import { StarSystem } from './star_system'
import { Planet } from './planet'

interface NewPlayerLocationParams {
  starSystem: StarSystem
  coords: { x: number; y: number; z: number }
}

export class PlayerLocation {
  private _starSystem: StarSystem
  private _coords: { x: number; y: number; z: number }

  get coords(): { x: number; y: number; z: number } {
    return this._coords
  }

  set coords(value: { x: number; y: number; z: number }) {
    this._coords = value
  }

  get starSystem(): StarSystem {
    return this._starSystem
  }

  set starSystem(value: StarSystem) {
    this._starSystem = value
  }

  constructor(state?: NewPlayerLocationParams) {
    if (state) {
      this._starSystem = state.starSystem
      this._coords = state.coords
    } else {
      const earth = new Planet()
      this._starSystem = new StarSystem()
      this._coords = { x: 100, y: 100, z: 100 }
    }
  }
}
