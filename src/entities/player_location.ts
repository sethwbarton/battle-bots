import { StarSystem } from './star_system'
import { Planet } from './planet'

interface NewPlayerLocationParams {
  planet: Planet
  starSystem: StarSystem
}

export class PlayerLocation {
  _starSystem: StarSystem
  _planet?: Planet

  get starSystem(): StarSystem {
    return this._starSystem
  }

  set starSystem(value: StarSystem) {
    this._starSystem = value
  }

  get planet(): Planet | undefined {
    return this._planet
  }

  set planet(value: Planet | undefined) {
    this._planet = value
  }

  constructor(state?: NewPlayerLocationParams) {
    if (state) {
      this._planet = state.planet
      this._starSystem = state.starSystem
    } else {
      const earth = new Planet({ name: 'Earth' })
      this._planet = earth
      this._starSystem = new StarSystem({ name: 'Sol', planets: [earth] })
    }
  }
}
