import { isOdd } from './isOdd'
import { test, expect } from 'vitest'
test('use jsdom in this test file', () => {
    const element = isOdd(2)
    expect(element).toEqual(false)
})
