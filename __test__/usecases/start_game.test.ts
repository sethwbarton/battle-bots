import { beforeEach, describe, expect, it } from 'tiny-test-framework/dist/src'
import { StartGameUseCase } from '../../src/usecases/start_game'

describe('Start Game Use Case', () => {
  let startGameLoopCalls = 0
  beforeEach(() => {
    startGameLoopCalls = 0
  })

  it('should begin the main game loop', () => {
    const fakeStartGameLoopFunc = () => {
      startGameLoopCalls += 1
    }
    const startGameUseCase = new StartGameUseCase(fakeStartGameLoopFunc)
    startGameUseCase.start('new')
    expect(startGameLoopCalls == 1)
  })
})
