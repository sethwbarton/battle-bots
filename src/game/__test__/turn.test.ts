import { GameState } from '../game-state'
import { doPlayerTurn } from '../turn'
import { UiController } from '../../ui/ui-controller'
import { Command } from '../command'
import { dec, inc, update } from 'ramda'

const exampleGameState: GameState = {
  currentScene: { id: '' },
  player: { coords: { x: 5, y: 5 }, symbol: 'P' },
  world: { scenes: [] },
}

const mockUiController: UiController = {
  drawGameState(gameState: GameState): Promise<void> {
    return Promise.resolve(undefined)
  },
  getCommand(): Promise<Command> {
    return Promise.resolve(Command.MoveUp)
  },
  getStartGameSelection(): Promise<'New' | 'Load'> {
    return Promise.resolve('Load')
  },
}

describe('doPlayerTurn', () => {
  it('Moves the player up when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveUp)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.y).toEqual(
      dec(exampleGameState.player.coords.y)
    )
  })

  it('Moves the player down when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveDown)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.y).toEqual(
      inc(exampleGameState.player.coords.y)
    )
  })

  it('Moves the player right when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveRight)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.x).toEqual(
      inc(exampleGameState.player.coords.x)
    )
  })

  it('Moves the player left when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveLeft)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.x).toEqual(
      dec(exampleGameState.player.coords.x)
    )
  })

  it('Moves the player up left when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveUpLeft)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.x).toEqual(
      dec(exampleGameState.player.coords.x)
    )
    expect(updatedGameState.player.coords.y).toEqual(
      dec(exampleGameState.player.coords.y)
    )
  })

  it('Moves the player up right when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveUpRight)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.x).toEqual(
      inc(exampleGameState.player.coords.x)
    )
    expect(updatedGameState.player.coords.y).toEqual(
      dec(exampleGameState.player.coords.y)
    )
  })

  it('Moves the player down right when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveDownRight)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.x).toEqual(
      inc(exampleGameState.player.coords.x)
    )
    expect(updatedGameState.player.coords.y).toEqual(
      inc(exampleGameState.player.coords.y)
    )
  })

  it('Moves the player down left when the command is given', async () => {
    mockUiController.getCommand = () => Promise.resolve(Command.MoveDownLeft)
    const updatedGameState = await doPlayerTurn(
      exampleGameState,
      mockUiController
    )
    expect(updatedGameState.player.coords.x).toEqual(
      dec(exampleGameState.player.coords.x)
    )
    expect(updatedGameState.player.coords.y).toEqual(
      inc(exampleGameState.player.coords.y)
    )
  })
})
