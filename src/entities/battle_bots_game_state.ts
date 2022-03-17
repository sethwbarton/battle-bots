export class BattleBotsGameState {
  private static instance: BattleBotsGameState

  private constructor() {}

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
}
