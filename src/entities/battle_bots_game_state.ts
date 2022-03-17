import { Player } from './player'
import { StarSystem } from './star_system'

export interface IBattleBotsGameState {
  player: Player
  knownSystems: StarSystem[]
}

export class BattleBotsGameState {
  private static instance: BattleBotsGameState

  /*
  GAME STATE DETAILS
   */
  private player: Player
  private knownSystems: StarSystem[]

  private constructor() {
    this.player = new Player()
    this.knownSystems = []
  }

  public getPlayer() {
    return this.player
  }

  public getKnownSystems() {
    return this.knownSystems
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
    this.player = stateObject.player
    this.knownSystems = stateObject.knownSystems
  }
}
