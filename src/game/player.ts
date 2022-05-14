import { Drawable } from './drawable'

export type Player = Drawable

export async function movePlayerUp(player: Player): Promise<Player> {
  player.coords.y -= 1
  return player
}

export async function movePlayerDown(player: Player): Promise<Player> {
  player.coords.y += 1
  return player
}

export async function movePlayerRight(player: Player): Promise<Player> {
  player.coords.x += 1
  return player
}

export async function movePlayerLeft(player: Player): Promise<Player> {
  player.coords.x -= 1
  return player
}

export async function movePlayerUpRight(player: Player): Promise<Player> {
  player.coords.y -= 1
  player.coords.x += 1
  return player
}

export async function movePlayerUpLeft(player: Player): Promise<Player> {
  player.coords.y -= 1
  player.coords.x -= 1
  return player
}

export async function movePlayerDownRight(player: Player): Promise<Player> {
  player.coords.y += 1
  player.coords.x += 1
  return player
}

export async function movePlayerDownLeft(player: Player): Promise<Player> {
  player.coords.y += 1
  player.coords.x -= 1
  return player
}
