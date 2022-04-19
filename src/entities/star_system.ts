import { Planet } from './planet'

interface NewStarSystemParams {
  planets: Planet[]
  name: string
}

export class StarSystem {
  private _name: string

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }
  _planets: Planet[]

  get planets(): Planet[] {
    return this._planets
  }

  set planets(value: Planet[]) {
    this._planets = value
  }

  constructor(state: NewStarSystemParams) {
    this._planets = state.planets
    this._name = state.name
  }
}
