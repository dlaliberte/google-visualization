import { describe, it, expect, beforeEach } from 'vitest';
import { Scale } from './scale';

describe('Scale', () => {
  describe('constructor', () => {
    it('should create a scale with valid values and colors', () => {
      const values = [0, 50, 100];
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      const scale = new Scale(values, colors);
      expect(scale).toBeDefined();
    });

    it('should create a scale with null values and single color', () => {
      const scale = new Scale(null, ['#ff0000']);
      expect(scale).toBeDefined();
    });

    it('should throw error when values and colors length mismatch', () => {
      const values = [0, 50, 100];
      const colors = ['#ff0000', '#00ff00']; // one less color
      expect(() => new Scale(values, colors)).toThrow();
    });

    it('should throw error when null values but multiple colors', () => {
      expect(() => new Scale(null, ['#ff0000', '#00ff00'])).toThrow();
    });

    it('should throw error when values are not sorted', () => {
      const values = [100, 0, 50]; // not sorted
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      expect(() => new Scale(values, colors)).toThrow();
    });
  });

  describe('getColorFor', () => {
    let scale: Scale;

    beforeEach(() => {
      const values = [0, 50, 100];
      const colors = ['#ff0000', '#ffff00', '#00ff00'];
      scale = new Scale(values, colors);
    });

    it('should return first color for value below range', () => {
      const color = scale.getColorFor(-10);
      expect(color).toBe('#ff0000');
    });

    it('should return last color for value above range', () => {
      const color = scale.getColorFor(150);
      expect(color).toBe('#00ff00');
    });

    it('should return exact color for exact value match', () => {
      const color = scale.getColorFor(0);
      expect(color).toBe('#ff0000');

      const color2 = scale.getColorFor(50);
      expect(color2).toBe('#ffff00');

      const color3 = scale.getColorFor(100);
      expect(color3).toBe('#00ff00');
    });

    it('should interpolate color for value between scale points', () => {
      const color = scale.getColorFor(25); // halfway between 0 and 50
      expect(color).toBeDefined();
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should handle scale with no values', () => {
      const singleColorScale = new Scale(null, ['#ff0000']);
      const color = singleColorScale.getColorFor(42);
      expect(color).toBe('#ff0000');
    });
  });

  describe('getValuesScale', () => {
    it('should return copy of values array', () => {
      const values = [0, 50, 100];
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      const scale = new Scale(values, colors);

      const returnedValues = scale.getValuesScale();
      expect(returnedValues).toEqual(values);
      expect(returnedValues).not.toBe(values); // should be a copy
    });

    it('should return null when no values', () => {
      const scale = new Scale(null, ['#ff0000']);
      expect(scale.getValuesScale()).toBeNull();
    });
  });

  describe('getColorsScale', () => {
    it('should return copy of colors array', () => {
      const values = [0, 50, 100];
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      const scale = new Scale(values, colors);

      const returnedColors = scale.getColorsScale();
      // Colors should be normalized to hex format
      expect(returnedColors).toHaveLength(3);
      expect(returnedColors.every(color => color.startsWith('#'))).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle very small differences in values', () => {
      const values = [0, 0.0001, 0.0002];
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      const scale = new Scale(values, colors);

      const color = scale.getColorFor(0.00005);
      expect(color).toBeDefined();
    });

    it('should handle negative values', () => {
      const values = [-100, -50, 0];
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      const scale = new Scale(values, colors);

      const color = scale.getColorFor(-75);
      expect(color).toBeDefined();
    });

    it('should handle large values', () => {
      const values = [1000000, 2000000, 3000000];
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      const scale = new Scale(values, colors);

      const color = scale.getColorFor(1500000);
      expect(color).toBeDefined();
    });
  });

  describe('Scale.create', () => {
    it('should create scale with no options', () => {
      const scale = Scale.create(null, null);
      expect(scale).toBeDefined();
    });

    it('should use default colors when none provided', () => {
      const scale = Scale.create(null, null);
      const colors = scale.getColorsScale();
      expect(colors).toHaveLength(1);
    });
  });
});
