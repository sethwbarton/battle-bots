import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { Ship } from '../../src/entities/ship'

describe('Ship', () => {
  it('should initialize with a passed state object', () => {
    const shipUnderTest = new Ship({ hitPoints: 100 })
    expect(shipUnderTest.getHitPoints() === 100)
  })
  it('should initialize a new ship when no state object is passed', () => {
    const shipUnderTest = new Ship()
  })
})
