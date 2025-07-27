import { describe, it, expect } from 'vitest';
import { parseColor, grayOutColor, blendHexColors, getDesiredColors, createDom } from './util';

// Test parseColor function
describe('parseColor', () => {
  it('should return NO_COLOR for null, empty, or transparent', () => {
    expect(parseColor(null)).toBe('none');
    expect(parseColor('')).toBe('none');
    expect(parseColor('transparent')).toBe('none');
  });

  it('should parse valid color strings', () => {
    expect(parseColor('#ff00ff')).toBe('#ff00ff');
    expect(parseColor('rgba(255, 0, 255, 1)')).toBe('rgba(255, 0, 255, 1)');
  });

  it('should throw error for invalid color strings', () => {
    expect(() => parseColor('invalid')).toThrow('Invalid color: invalid');
  });
});

// Test grayOutColor function
describe('grayOutColor', () => {
  it('should return NO_COLOR for NO_COLOR input', () => {
    expect(grayOutColor('none')).toBe('none');
  });

  it('should return grayed-out color', () => {
    expect(grayOutColor('#ff00ff')).toBe('#aaaaaa');
  });
});

// Test blendHexColors function
describe('blendHexColors', () => {
  it('should blend two colors', () => {
    expect(blendHexColors('#ff0000', '#0000ff', 0.5)).toBe('#800080');
  });
});

// Test getDesiredColors function
describe('getDesiredColors', () => {
  it('should return colors from options', () => {
    expect(getDesiredColors({ colors: ['#ff0000'] }, ['#0000ff'])).toEqual(['#ff0000']);
  });

  it('should return default colors if no options', () => {
    expect(getDesiredColors(undefined, ['#0000ff'])).toEqual(['#0000ff']);
  });
});

// Test createDom function
describe('createDom', () => {
  it('should create a DOM element from a string', () => {
    const element = createDom('<div data-logicalname="test"></div>');
    expect(element.tagName).toBe('DIV');
    expect(element.getAttribute('data-logicalname')).toBe('test');
  });

  it('should throw an error for invalid HTML', () => {
    expect(() => createDom('<div></span>')).toThrow('Invalid element creation');
  });
});
