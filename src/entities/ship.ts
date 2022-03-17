export interface IShipState {
  _hitPoints: number
}

export class Ship implements IShipState {
  _hitpoints: number

  get hitpoints(): number {
    return this._hitpoints
  }

  set hitpoints(value: number) {
    this._hitpoints = value
  }

  constructor(state: IShipState) {
    this._hitpoints = state._hitPoints
  }
}
