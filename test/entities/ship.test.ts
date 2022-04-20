import { describe, expect, it } from 'tiny-test-framework/dist/src'
import { Ship } from '../../src/entities/ship'

describe('Ship', () => {
  it('should initialize with a passed state object', () => {
    const shipUnderTest = new Ship({ hitPoints: 100 })
    expect(shipUnderTest.hitPoints === 100)
  })
})
