import { describe, it, expect, vi } from 'vitest';
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
    const linearFn = getEasingFunction(EasingType.LINEAR);
    const inFn = getEasingFunction(EasingType.IN);
    const outFn = getEasingFunction(EasingType.OUT);
    const inAndOutFn = getEasingFunction(EasingType.IN_AND_OUT);

    // Test that functions are returned and work correctly
    expect(typeof linearFn).toBe('function');
    expect(typeof inFn).toBe('function');
    expect(typeof outFn).toBe('function');
    expect(typeof inAndOutFn).toBe('function');

    // Test linear function (identity)
    expect(linearFn(0.5)).toBe(0.5);

    // Test that easing functions return expected values at boundaries
    expect(inFn(0)).toBe(0);
    expect(inFn(1)).toBe(1);
    expect(outFn(0)).toBe(0);
    expect(outFn(1)).toBe(1);
    expect(inAndOutFn(0)).toBe(0);
    expect(inAndOutFn(1)).toBe(1);
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
    vi.spyOn(options, 'inferNonNegativeNumberValue').mockReturnValue(0);
    expect(getProperties(options, defaultDuration, defaultMaxFramesPerSecond, defaultEasingType)).toBeNull();
  });

  it('should return correct properties for valid options', () => {
    const mockInferNonNegativeNumberValue = vi.spyOn(options, 'inferNonNegativeNumberValue');
    mockInferNonNegativeNumberValue.mockImplementation((key: string, defaultValue: number) => {
      if (key === 'animation.duration') return defaultDuration;
      if (key === 'animation.maxFramesPerSecond') return defaultMaxFramesPerSecond;
      return defaultValue;
    });

    const properties = getProperties(options, defaultDuration, defaultMaxFramesPerSecond, defaultEasingType);
    expect(properties).toBeDefined();
    expect(properties!.startup).toBe(false);
    expect(properties!.duration).toBe(defaultDuration);
    expect(properties!.maxFramesPerSecond).toBe(defaultMaxFramesPerSecond);
    expect(typeof properties!.easing).toBe('function');
    // Test that the easing function works like identity for LINEAR
    expect(properties!.easing(0)).toBe(0);
    expect(properties!.easing(0.5)).toBe(0.5);
    expect(properties!.easing(1)).toBe(1);
  });
});
