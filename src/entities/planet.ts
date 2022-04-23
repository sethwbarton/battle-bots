import { Coords } from './coords'

interface NewPlanetParams {
  name: string
  coords: Coords
}

export class Planet {
  private _name: string
  private _coords: Coords

  get coords(): Coords {
    return this._coords
  }

  set coords(value: Coords) {
    this._coords = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  constructor(state?: NewPlanetParams) {
    if (!state) {
      this._name = 'Earth'
      this._coords = { x: 100, y: 100, z: 100 }
    } else {
      this._coords = state.coords
      this._name = state.name
    }
  }
}
