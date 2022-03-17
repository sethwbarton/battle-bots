import { IPlayerState, Player } from './player'
import { IStarSystemState, StarSystem } from './star_system'

export interface IBattleBotsGameState {
  _player: IPlayerState
  _knownSystems: IStarSystemState[]
}

export class BattleBotsGameState implements IBattleBotsGameState {
  private static instance: BattleBotsGameState

  /*
  GAME STATE DETAILS
   */
  _player: Player
  _knownSystems: StarSystem[]

  get player(): Player {
    return this._player
  }

  set player(value: Player) {
    this._player = value
  }

  get knownSystems(): StarSystem[] {
    return this._knownSystems
  }

  set knownSystems(value: StarSystem[]) {
    this._knownSystems = value
  }

  private constructor() {
    this.player = new Player({})
    this.knownSystems = []
  }

  /**
   * Singleton design pattern.
   */
  public static getInstance(): BattleBotsGameState {
    if (!BattleBotsGameState.instance) {
      BattleBotsGameState.instance = new BattleBotsGameState()
    }

    return BattleBotsGameState.instance
  }

  /**
   * Completely PWNS the game state.
   * Don't use this unless it's during a unit test.
   */
  public static clearState(): void {
    this.instance = new BattleBotsGameState()
  }

  /**
   * Loads in state based on an object.
   * @param stateObject
   */
  public loadState(stateObject: IBattleBotsGameState): void {
    this.player = new Player({ ...stateObject.player })
    this.knownSystems = stateObject.knownSystems.map((system) => {
      return new StarSystem({ ...system })
    })
  }
}
