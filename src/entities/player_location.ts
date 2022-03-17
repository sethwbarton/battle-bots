import { IStarSystemState } from './star_system'
import { IPlanetState } from './planet'

export interface IPlayerLocationState {
  _starSystem: IStarSystemState
  _planet?: IPlanetState
}

export class PlayerLocation implements IPlayerLocationState {
  _starSystem: IStarSystemState
  _planet?: IPlanetState

  get starSystem(): IStarSystemState {
    return this._starSystem
  }

  set starSystem(value: IStarSystemState) {
    this._starSystem = value
  }

  get planet(): IPlanetState | undefined {
    return this._planet
  }

  set planet(value: IPlanetState | undefined) {
    this._planet = value
  }

  constructor(state: IPlayerLocationState) {
    this._planet = state._planet
    this._starSystem = state._starSystem
  }
}
