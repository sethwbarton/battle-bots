interface NewShipParams {
  hitPoints: number
}

export class Ship {
  _hitPoints: number

  get hitPoints(): number {
    return this._hitPoints
  }

  set hitPoints(value: number) {
    this._hitPoints = value
  }

  constructor(state: NewShipParams) {
    this._hitPoints = state.hitPoints
  }
}
