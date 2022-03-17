import { IPlanetState } from './planet'

export interface IStarSystemState {
  _planets: IPlanetState[]
}

export class StarSystem {
  _planets: IPlanetState[]

  get planets(): IPlanetState[] {
    return this._planets
  }

  set planets(value: IPlanetState[]) {
    this._planets = value
  }

  constructor(state: IStarSystemState) {
    this._planets = state._planets
  }
}
