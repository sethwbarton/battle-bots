import { IPlayerLocationState, PlayerLocation } from './player_location'
import { IShipState, Ship } from './ship'

export interface IPlayerState {
  _location: IPlayerLocationState
  _currentShip: IShipState
  _storedShips: IShipState[]
}

export class Player implements IPlayerState {
  _location: PlayerLocation
  _currentShip: Ship
  _storedShips: Ship[]

  get location(): PlayerLocation {
    return this._location
  }

  set location(value: PlayerLocation) {
    this._location = value
  }

  get currentShip(): Ship {
    return this._currentShip
  }

  set currentShip(value: Ship) {
    this._currentShip = value
  }

  get storedShips(): Ship[] {
    return this._storedShips
  }

  set storedShips(value: Ship[]) {
    this._storedShips = value
  }

  public constructor(state?: IPlayerState) {
    if (state) {
      this._location = state._location
      this._currentShip = state._currentShip
      this._storedShips = state._storedShips
    } else {
      this._location = new PlayerLocation()
      this._currentShip = new Ship()
      this._storedShips = []
    }
  }
}
