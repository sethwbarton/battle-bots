import { it, describe, expect } from 'tiny-test-framework/dist/src'
import { Planet } from '../../src/entities/planet'

describe('Planet', () => {
  it('Initialzes seed data without params', () => {
    const planetUnderTest = new Planet()
    expect(planetUnderTest.name === 'Earth' && planetUnderTest.coords.y === 100)
  })
  it('Initializes according to params given', () => {
    const planetUnderTest = new Planet({
      name: 'B 12',
      coords: { x: 1, y: 1, z: 1 },
    })
    expect(planetUnderTest.name === 'B 12' && planetUnderTest.coords.y === 1)
  })
})
