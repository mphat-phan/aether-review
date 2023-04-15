import { isEven } from "./isEven";
import { test, expect } from "vitest";
test('use jsdom in this test file', () => {
    const element = isEven(2);
    expect(element).toEqual(true) 
})