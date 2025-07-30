import { describe, it, expect, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import { parseColor, grayOutColor, blendHexColors, getDesiredColors, createDom, NO_COLOR } from './util';

beforeAll(() => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.window = dom.window as any;
  global.document = dom.window.document;
});

describe('graphics/util', () => {
  describe('NO_COLOR constant', () => {
    it('should have correct value', () => {
      expect(NO_COLOR).toBe('none');
    });
  });

  describe('parseColor', () => {
    it('should return NO_COLOR for null, empty, or transparent', () => {
      expect(parseColor(null)).toBe('none');
      expect(parseColor('')).toBe('none');
      expect(parseColor('transparent')).toBe('none');
      expect(parseColor('none')).toBe('none');
    });

    it('should parse valid hex colors', () => {
      expect(parseColor('#ff00ff')).toBe('#ff00ff');
      expect(parseColor('#fff')).toBe('#ffffff');
      expect(parseColor('#000000')).toBe('#000000');
    });

    it('should parse RGB colors', () => {
      expect(parseColor('rgb(255, 0, 255)')).toBe('#ff00ff');
      expect(parseColor('rgba(255, 0, 255, 0.5)')).toBe('rgba(255, 0, 255, 0.5)');
    });

    it('should handle named colors when ignoreError is true', () => {
      expect(parseColor('red', true)).toBe('red');
      expect(parseColor('series-color', true)).toBe('series-color');
    });

    it('should throw error for invalid color strings when ignoreError is false', () => {
      expect(() => parseColor('invalid')).toThrow('Invalid color: invalid');
      expect(() => parseColor('not-a-color')).toThrow();
    });

    it('should not throw for special colors when ignoreError is true', () => {
      expect(() => parseColor('series-color-1', true)).not.toThrow();
      expect(() => parseColor('custom-value', true)).not.toThrow();
    });
  });

  describe('grayOutColor', () => {
    it('should return NO_COLOR for NO_COLOR input', () => {
      expect(grayOutColor('none')).toBe('none');
      expect(grayOutColor(NO_COLOR)).toBe(NO_COLOR);
    });

    it('should return grayed-out color for valid hex colors', () => {
      expect(grayOutColor('#ff00ff')).toBe('#aaaaaa'); // (255+0+255)/3 = 170
      expect(grayOutColor('#ffffff')).toBe('#ffffff'); // (255+255+255)/3 = 255
      expect(grayOutColor('#000000')).toBe('#000000'); // (0+0+0)/3 = 0
    });

    it('should handle different color formats', () => {
      const result = grayOutColor('rgb(255, 0, 0)');
      expect(result).toBeDefined();
    });
  });

  describe('blendHexColors', () => {
    it('should blend two hex colors at 50%', () => {
      expect(blendHexColors('#ff0000', '#0000ff', 0.5)).toBe('#800080');
    });

    it('should return first color when blend ratio is 0', () => {
      expect(blendHexColors('#ff0000', '#0000ff', 0)).toBe('#ff0000');
    });

    it('should return second color when blend ratio is 1', () => {
      expect(blendHexColors('#ff0000', '#0000ff', 1)).toBe('#0000ff');
    });

    it('should handle different blend ratios', () => {
      const result1 = blendHexColors('#ffffff', '#000000', 0.25);
      const result2 = blendHexColors('#ffffff', '#000000', 0.75);
      expect(result1).not.toBe(result2);
      expect(result1).toMatch(/^#[0-9a-f]{6}$/);
      expect(result2).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should handle edge cases for blend ratio', () => {
      expect(() => blendHexColors('#ff0000', '#0000ff', -0.1)).not.toThrow();
      expect(() => blendHexColors('#ff0000', '#0000ff', 1.1)).not.toThrow();
    });
  });

  describe('getDesiredColors', () => {
    it('should return colors from options when provided', () => {
      const options = { colors: ['#ff0000', '#00ff00'] };
      const defaults = ['#0000ff'];
      expect(getDesiredColors(options, defaults)).toEqual(['#ff0000', '#00ff00']);
    });

    it('should return default colors if no options provided', () => {
      const defaults = ['#0000ff', '#ff0000'];
      expect(getDesiredColors(undefined, defaults)).toEqual(defaults);
      expect(getDesiredColors(null, defaults)).toEqual(defaults);
    });

    it('should return default colors if options has no colors', () => {
      const options = {};
      const defaults = ['#0000ff'];
      expect(getDesiredColors(options, defaults)).toEqual(defaults);
    });

    it('should handle empty color arrays', () => {
      const options = { colors: [] };
      const defaults = ['#0000ff'];
      expect(getDesiredColors(options, defaults)).toEqual(defaults);
    });
  });

  describe('createDom', () => {
    it('should create a DOM element from valid HTML string', () => {
      const element = createDom('<div data-logicalname="test"></div>');
      expect(element.tagName).toBe('DIV');
      expect(element.getAttribute('data-logicalname')).toBe('test');
    });

    it('should create elements with attributes', () => {
      const element = createDom('<span class="test" id="myspan">Hello</span>');
      expect(element.tagName).toBe('SPAN');
      expect(element.getAttribute('class')).toBe('test');
      expect(element.getAttribute('id')).toBe('myspan');
      expect(element.textContent).toBe('Hello');
    });

    it('should handle self-closing elements', () => {
      const element = createDom('<br/>');
      expect(element.tagName).toBe('BR');
    });

    it('should throw error for invalid HTML', () => {
      // Browser HTML parser is forgiving, so this test might not be meaningful
      // Let's test with truly invalid input that would result in no element
      expect(() => createDom('<!-- comment only -->')).toThrow();
    });

    it('should throw error for empty or malformed input', () => {
      expect(() => createDom('')).toThrow();
      expect(() => createDom('invalid')).toThrow();
    });
  });
});
