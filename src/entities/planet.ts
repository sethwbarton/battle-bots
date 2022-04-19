interface NewPlanetParams {
  name: string
}

export class Planet {
  _name: string

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  constructor(state: NewPlanetParams) {
    this._name = state.name
  }
}
