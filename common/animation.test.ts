import { describe, it, expect } from 'vitest';
import { getEasingFunction, getProperties, EasingType } from './animation';
import { Options } from './options';

// Mock functions for easing
const mockEasingFunctions = {
  identity: (x: number) => x,
  easeIn: (x: number) => x * x,
  easeOut: (x: number) => x * (2 - x),
  inAndOut: (x: number) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
};

// Mock Options class
class MockOptions implements Options {
  inferBooleanValue(key: string, defaultValue: boolean): boolean {
    return defaultValue;
  }
  inferNonNegativeNumberValue(key: string, defaultValue: number): number {
    return defaultValue;
  }
  inferStringValue(key: string, defaultValue: string, enumType: any): string {
    return defaultValue;
  }
}

// Tests for getEasingFunction
describe('getEasingFunction', () => {
  it('should return the correct easing function for each EasingType', () => {
    expect(getEasingFunction(EasingType.LINEAR)).toBe(mockEasingFunctions.identity);
    expect(getEasingFunction(EasingType.IN)).toBe(mockEasingFunctions.easeIn);
    expect(getEasingFunction(EasingType.OUT)).toBe(mockEasingFunctions.easeOut);
    expect(getEasingFunction(EasingType.IN_AND_OUT)).toBe(mockEasingFunctions.inAndOut);
  });

  it('should throw an error for an invalid EasingType', () => {
    expect(() => getEasingFunction('invalid' as EasingType)).toThrowError('Invalid easing type "invalid"');
  });
});

// Tests for getProperties
describe('getProperties', () => {
  const defaultDuration = 1000;
  const defaultMaxFramesPerSecond = 60;
  const defaultEasingType = EasingType.LINEAR;
  const options = new MockOptions();

  it('should return null if duration is zero', () => {
    jest.spyOn(options, 'inferNonNegativeNumberValue').mockReturnValue(0);
    expect(getProperties(options, defaultDuration, defaultMaxFramesPerSecond, defaultEasingType)).toBeNull();
  });

  it('should return correct properties for valid options', () => {
    jest.spyOn(options, 'inferNonNegativeNumberValue').mockReturnValue(defaultDuration);
    const properties = getProperties(options, defaultDuration, defaultMaxFramesPerSecond, defaultEasingType);
    expect(properties).toEqual({
      startup: false,
      duration: defaultDuration,
      easing: mockEasingFunctions.identity,
      maxFramesPerSecond: defaultMaxFramesPerSecond,
    });
  });
});
