// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPlanetState {
  _name: string
}

export class Planet implements IPlanetState {
  _name: string

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  constructor(state: IPlanetState) {
    this._name = state._name
  }
}
