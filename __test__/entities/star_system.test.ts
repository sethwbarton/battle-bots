import { it, describe, expect } from 'tiny-test-framework/dist/src'
import { StarSystem } from '../../src/entities/star_system'

describe('Star System', () => {
  it('Initialzes seed data without params', () => {
    const systemUnderTest = new StarSystem()
    expect(
      systemUnderTest.name === 'Sol' && systemUnderTest.galacticCoords.y === 100
    )
  })
  it('Initializes according to params given', () => {
    const systemUnderTest = new StarSystem({
      planets: [],
      name: 'B 167 A',
      galacticCoords: { x: 1, y: 1, z: 1 },
    })
    expect(
      systemUnderTest.name === 'B 167 A' &&
        systemUnderTest.galacticCoords.y === 1
    )
  })
})
