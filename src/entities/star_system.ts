import { Planet } from './planet'
import { Coords } from './coords'

interface NewStarSystemParams {
  planets: Planet[]
  name: string
  galacticCoords: Coords
}

export class StarSystem {
  private _name: string
  private _planets: Planet[]
  private _galacticCoords: Coords

  get galacticCoords(): Coords {
    return this._galacticCoords
  }

  set galacticCoords(value: Coords) {
    this._galacticCoords = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get planets(): Planet[] {
    return this._planets
  }

  set planets(value: Planet[]) {
    this._planets = value
  }

  constructor(state?: NewStarSystemParams) {
    if (state) {
      this._name = state.name
      this._planets = state.planets
      this._galacticCoords = state.galacticCoords
    } else {
      this._name = 'Sol'
      this._planets = []
      this._galacticCoords = { x: 100, y: 100, z: 100 }
    }
  }
}
