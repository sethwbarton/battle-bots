import { Coords } from './coords'

interface NewShipParams {
  hitPoints: number
  coords: Coords
}

export class Ship {
  private _hitPoints: number
  private _coords: Coords

  get coords(): Coords {
    return this._coords
  }

  set coords(value: Coords) {
    this._coords = value
  }

  get hitPoints(): number {
    return this._hitPoints
  }

  set hitPoints(value: number) {
    this._hitPoints = value
  }

  constructor(state?: NewShipParams) {
    if (state) {
      this._hitPoints = state.hitPoints
      this._coords = state.coords
    } else {
      this._hitPoints = 100
      this._coords = { x: 100, y: 100, z: 100 }
    }
  }
}
