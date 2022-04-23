import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { Ship } from '../../src/entities/ship'

describe('Ship', () => {
  it('should initialize with a passed state object', () => {
    const shipUnderTest = new Ship({
      hitPoints: 100,
      coords: { x: 1, y: 1, z: 1 },
    })
    expect(shipUnderTest.hitPoints === 100)
    expect(
      shipUnderTest.coords.x === 1 &&
        shipUnderTest.coords.y === 1 &&
        shipUnderTest.coords.z === 1
    )
  })
  it('should initialize without a passed state object', () => {
    const shipUnderTest = new Ship()
    expect(shipUnderTest.hitPoints === 100)
  })
})
