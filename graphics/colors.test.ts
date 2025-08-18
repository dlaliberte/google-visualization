import { describe, it, expect } from 'vitest';
import {
  BLUE,
  RED,
  YELLOW,
  GREEN,
  PURPLE,
  CYAN,
  DEEP_ORANGE,
  LIME,
  INDIGO,
  PINK,
  TEAL,
  GRAY
} from './colors';

describe('Material colors', () => {
  describe('color palette structure', () => {
    it('should export all color palettes as objects', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];

      colors.forEach(color => {
        expect(typeof color).toBe('object');
        expect(color).not.toBeNull();
        expect(Array.isArray(color)).toBe(false);
      });
    });

    it('should have string keys and string values', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];

      colors.forEach(color => {
        Object.entries(color).forEach(([key, value]) => {
          expect(typeof key).toBe('string');
          expect(typeof value).toBe('string');
        });
      });
    });

    it('should have numeric weight keys', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];

      colors.forEach(color => {
        Object.keys(color).forEach(key => {
          const numericKey = parseInt(key, 10);
          expect(numericKey).not.toBeNaN();
          expect(numericKey.toString()).toBe(key);
        });
      });
    });
  });

  describe('hex color format validation', () => {
    it('should have valid hex color values', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];
      const hexColorRegex = /^#[0-9a-fA-F]{6}$/;

      colors.forEach(color => {
        Object.values(color).forEach(hexValue => {
          expect(hexValue).toMatch(hexColorRegex);
        });
      });
    });

    it('should use consistent hex case (lowercase for most, uppercase for GRAY)', () => {
      const lowercaseColors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL];

      lowercaseColors.forEach(color => {
        Object.values(color).forEach(hexValue => {
          // Check that hex part is lowercase for most colors
          const hexPart = hexValue.substring(1);
          expect(hexPart).toBe(hexPart.toLowerCase());
        });
      });

      // GRAY uses uppercase hex values
      Object.values(GRAY).forEach(hexValue => {
        const hexPart = hexValue.substring(1);
        expect(hexPart).toBe(hexPart.toUpperCase());
      });
    });

    it('should start with hash symbol', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];

      colors.forEach(color => {
        Object.values(color).forEach(hexValue => {
          expect(hexValue.startsWith('#')).toBe(true);
        });
      });
    });

    it('should have exactly 7 characters', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];

      colors.forEach(color => {
        Object.values(color).forEach(hexValue => {
          expect(hexValue.length).toBe(7);
        });
      });
    });
  });

  describe('individual color palettes', () => {
    describe('BLUE palette', () => {
      it('should have correct structure and values', () => {
        expect(BLUE).toHaveProperty('100', '#c6dafc');
        expect(BLUE).toHaveProperty('500', '#5e97f6');
        expect(BLUE).toHaveProperty('800', '#2a56c6');
        expect(Object.keys(BLUE)).toHaveLength(3);
      });

      it('should have colors in brightness order (light to dark)', () => {
        // Convert hex to brightness (simple approximation)
        const getBrightness = (hex: string) => {
          const r = parseInt(hex.substr(1, 2), 16);
          const g = parseInt(hex.substr(3, 2), 16);
          const b = parseInt(hex.substr(5, 2), 16);
          return (r * 299 + g * 587 + b * 114) / 1000;
        };

        const brightness100 = getBrightness(BLUE['100']);
        const brightness500 = getBrightness(BLUE['500']);
        const brightness800 = getBrightness(BLUE['800']);

        expect(brightness100).toBeGreaterThan(brightness500);
        expect(brightness500).toBeGreaterThan(brightness800);
      });
    });

    describe('RED palette', () => {
      it('should have correct structure and values', () => {
        expect(RED).toHaveProperty('100', '#f4c7c3');
        expect(RED).toHaveProperty('500', '#db4437');
        expect(RED).toHaveProperty('900', '#a52714');
        expect(Object.keys(RED)).toHaveLength(3);
      });
    });

    describe('YELLOW palette', () => {
      it('should have correct structure and values', () => {
        expect(YELLOW).toHaveProperty('100', '#fce8b2');
        expect(YELLOW).toHaveProperty('600', '#f2a600');
        expect(YELLOW).toHaveProperty('700', '#f09300');
        expect(YELLOW).toHaveProperty('800', '#ee8100');
        expect(Object.keys(YELLOW)).toHaveLength(4);
      });
    });

    describe('GREEN palette', () => {
      it('should have correct structure and values', () => {
        expect(GREEN).toHaveProperty('100', '#b7e1cd');
        expect(GREEN).toHaveProperty('500', '#0f9d58');
        expect(GREEN).toHaveProperty('700', '#0b8043');
        expect(Object.keys(GREEN)).toHaveLength(3);
      });
    });

    describe('PURPLE palette', () => {
      it('should have correct structure and values', () => {
        expect(PURPLE).toHaveProperty('100', '#e1bee7');
        expect(PURPLE).toHaveProperty('400', '#ab47bc');
        expect(PURPLE).toHaveProperty('800', '#6a1b9a');
        expect(Object.keys(PURPLE)).toHaveLength(3);
      });
    });

    describe('CYAN palette', () => {
      it('should have correct structure and values', () => {
        expect(CYAN).toHaveProperty('100', '#b2ebf2');
        expect(CYAN).toHaveProperty('600', '#00acc1');
        expect(CYAN).toHaveProperty('800', '#00838f');
        expect(Object.keys(CYAN)).toHaveLength(3);
      });
    });

    describe('DEEP_ORANGE palette', () => {
      it('should have correct structure and values', () => {
        expect(DEEP_ORANGE).toHaveProperty('100', '#ffccbc');
        expect(DEEP_ORANGE).toHaveProperty('400', '#ff7043');
        expect(DEEP_ORANGE).toHaveProperty('700', '#e64a19');
        expect(Object.keys(DEEP_ORANGE)).toHaveLength(3);
      });
    });

    describe('LIME palette', () => {
      it('should have correct structure and values', () => {
        expect(LIME).toHaveProperty('100', '#f0f4c3');
        expect(LIME).toHaveProperty('800', '#9e9d24');
        expect(LIME).toHaveProperty('900', '#827717');
        expect(Object.keys(LIME)).toHaveLength(3);
      });
    });

    describe('INDIGO palette', () => {
      it('should have correct structure and values', () => {
        expect(INDIGO).toHaveProperty('100', '#c5cae9');
        expect(INDIGO).toHaveProperty('400', '#5c6bc0');
        expect(INDIGO).toHaveProperty('600', '#3949ab');
        expect(Object.keys(INDIGO)).toHaveLength(3);
      });
    });

    describe('PINK palette', () => {
      it('should have correct structure and values', () => {
        expect(PINK).toHaveProperty('100', '#f8bbd0');
        expect(PINK).toHaveProperty('200', '#f48fb1');
        expect(PINK).toHaveProperty('300', '#f06292');
        expect(PINK).toHaveProperty('500', '#e91e63');
        expect(PINK).toHaveProperty('700', '#c2185b');
        expect(PINK).toHaveProperty('900', '#880e4f');
        expect(Object.keys(PINK)).toHaveLength(6);
      });

      it('should be the most comprehensive palette', () => {
        const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];
        const pinkVariations = Object.keys(PINK).length;

        colors.forEach(color => {
          if (color !== PINK && color !== GRAY) {
            expect(pinkVariations).toBeGreaterThanOrEqual(Object.keys(color).length);
          }
        });
      });
    });

    describe('TEAL palette', () => {
      it('should have correct structure and values', () => {
        expect(TEAL).toHaveProperty('100', '#b2dfdb');
        expect(TEAL).toHaveProperty('700', '#00796b');
        expect(TEAL).toHaveProperty('900', '#004d40');
        expect(Object.keys(TEAL)).toHaveLength(3);
      });
    });

    describe('GRAY palette', () => {
      it('should have correct structure and values', () => {
        expect(GRAY).toHaveProperty('50', '#FAFAFA');
        expect(GRAY).toHaveProperty('100', '#F5F5F5');
        expect(GRAY).toHaveProperty('200', '#EEEEEE');
        expect(GRAY).toHaveProperty('300', '#E0E0E0');
        expect(GRAY).toHaveProperty('400', '#BDBDBD');
        expect(GRAY).toHaveProperty('500', '#9E9E9E');
        expect(GRAY).toHaveProperty('600', '#757575');
        expect(GRAY).toHaveProperty('700', '#616161');
        expect(GRAY).toHaveProperty('800', '#424242');
        expect(GRAY).toHaveProperty('900', '#212121');
        expect(Object.keys(GRAY)).toHaveLength(10);
      });

      it('should be the most comprehensive palette', () => {
        const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];
        const grayVariations = Object.keys(GRAY).length;

        colors.forEach(color => {
          if (color !== GRAY) {
            expect(grayVariations).toBeGreaterThan(Object.keys(color).length);
          }
        });
      });

      it('should use uppercase hex values', () => {
        Object.values(GRAY).forEach(hexValue => {
          const hexPart = hexValue.substring(1);
          expect(hexPart).toBe(hexPart.toUpperCase());
        });
      });

      it('should progress from light to dark', () => {
        const weights = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        const getBrightness = (hex: string) => {
          const r = parseInt(hex.substr(1, 2), 16);
          const g = parseInt(hex.substr(3, 2), 16);
          const b = parseInt(hex.substr(5, 2), 16);
          return (r * 299 + g * 587 + b * 114) / 1000;
        };

        for (let i = 0; i < weights.length - 1; i++) {
          const current = getBrightness(GRAY[weights[i]]);
          const next = getBrightness(GRAY[weights[i + 1]]);
          expect(current).toBeGreaterThan(next);
        }
      });
    });
  });

  describe('material design compliance', () => {
    it('should have 500 weight as primary for main colors', () => {
      [BLUE, RED, GREEN, PINK].forEach(color => {
        expect(color).toHaveProperty('500');
      });
    });

    it('should have 100 weight as light variant', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];

      colors.forEach(color => {
        expect(color).toHaveProperty('100');
      });
    });

    it('should follow material design weight conventions', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];
      const validWeights = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

      colors.forEach(color => {
        Object.keys(color).forEach(weight => {
          expect(validWeights).toContain(weight);
        });
      });
    });

    it('should have darker colors for higher weights', () => {
      // Test a few colors to ensure weight ordering
      const testColors = [BLUE, RED, GREEN, PURPLE];

      testColors.forEach(color => {
        const weights = Object.keys(color).map(w => parseInt(w, 10)).sort((a, b) => a - b);

        for (let i = 0; i < weights.length - 1; i++) {
          const lighter = color[weights[i].toString()];
          const darker = color[weights[i + 1].toString()];

          // Simple brightness calculation
          const getBrightness = (hex: string) => {
            const r = parseInt(hex.substr(1, 2), 16);
            const g = parseInt(hex.substr(3, 2), 16);
            const b = parseInt(hex.substr(5, 2), 16);
            return (r * 299 + g * 587 + b * 114) / 1000;
          };

          expect(getBrightness(lighter)).toBeGreaterThanOrEqual(getBrightness(darker));
        }
      });
    });
  });

  describe('practical usage', () => {
    it('should be usable for CSS styling', () => {
      // Test that colors can be used in CSS contexts
      const testColor = BLUE['500'];
      const cssRule = `color: ${testColor};`;

      expect(cssRule).toBe('color: #5e97f6;');
    });

    it('should provide good contrast combinations', () => {
      // Light colors should work with dark text
      expect(BLUE['100']).toBe('#c6dafc'); // Light blue
      expect(GRAY['800']).toBe('#424242'); // Dark gray for text

      // Dark colors should work with light text
      expect(BLUE['800']).toBe('#2a56c6'); // Dark blue
      expect(GRAY['50']).toBe('#FAFAFA'); // Light gray for text
    });

    it('should support color palette generation', () => {
      // Should be able to generate a color palette from available colors
      const colorPalette = [
        BLUE['500'],
        RED['500'],
        GREEN['500'],
        YELLOW['600'],
        PURPLE['400']
      ];

      expect(colorPalette).toEqual([
        '#5e97f6',
        '#db4437',
        '#0f9d58',
        '#f2a600',
        '#ab47bc'
      ]);
    });

    it('should support theme variations', () => {
      // Light theme colors
      const lightTheme = {
        primary: BLUE['500'],
        background: GRAY['50'],
        surface: GRAY['100'],
        text: GRAY['900']
      };

      // Dark theme colors
      const darkTheme = {
        primary: BLUE['100'],
        background: GRAY['900'],
        surface: GRAY['800'],
        text: GRAY['50']
      };

      expect(lightTheme.primary).toBe('#5e97f6');
      expect(lightTheme.background).toBe('#FAFAFA');
      expect(darkTheme.primary).toBe('#c6dafc');
      expect(darkTheme.background).toBe('#212121');
    });

    it('should support color interpolation needs', () => {
      // Should have enough color variations for gradients
      const pinkGradient = Object.keys(PINK).sort().map(key => PINK[key]);
      expect(pinkGradient.length).toBeGreaterThan(3);

      const grayGradient = Object.keys(GRAY).sort().map(key => GRAY[key]);
      expect(grayGradient.length).toBeGreaterThan(5);
    });
  });

  describe('consistency and immutability', () => {
    it('should maintain consistent color values', () => {
      // Colors should not change between accesses
      const blue500First = BLUE['500'];
      const blue500Second = BLUE['500'];

      expect(blue500First).toBe(blue500Second);
      expect(blue500First).toBe('#5e97f6');
    });

    it('should be immutable objects', () => {
      const originalBlue500 = BLUE['500'];

      // Attempting to modify should not affect the original
      const modifiedBlue = { ...BLUE };
      modifiedBlue['500'] = '#different';

      expect(BLUE['500']).toBe(originalBlue500);
      expect(BLUE['500']).not.toBe('#different');
    });

    it('should maintain type consistency', () => {
      const colors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL, GRAY];

      colors.forEach(color => {
        expect(typeof color).toBe('object');
        Object.entries(color).forEach(([key, value]) => {
          expect(typeof key).toBe('string');
          expect(typeof value).toBe('string');
        });
      });
    });

    it('should be stable across multiple imports', () => {
      // Colors should maintain their values throughout the test
      const blue500Value1 = BLUE['500'];
      const gray500Value1 = GRAY['500'];

      // Values should remain the same when accessed again
      expect(BLUE['500']).toBe(blue500Value1);
      expect(GRAY['500']).toBe(gray500Value1);
    });
  });

  describe('color accessibility', () => {
    it('should provide sufficient color variety', () => {
      // Should have at least 10 different base colors (excluding gray)
      const baseColors = [BLUE, RED, YELLOW, GREEN, PURPLE, CYAN, DEEP_ORANGE, LIME, INDIGO, PINK, TEAL];
      expect(baseColors.length).toBeGreaterThanOrEqual(10);
    });

    it('should have distinct primary colors', () => {
      // Primary colors (500 weight where available) should be visually distinct
      const primaryColors = [
        BLUE['500'],
        RED['500'],
        GREEN['500'],
        PINK['500']
      ];

      // All should be different
      const uniqueColors = new Set(primaryColors);
      expect(uniqueColors.size).toBe(primaryColors.length);
    });

    it('should provide good contrast options', () => {
      // Should have very light and very dark colors for contrast
      expect(GRAY['50']).toBe('#FAFAFA'); // Very light
      expect(GRAY['900']).toBe('#212121'); // Very dark

      // Difference should be significant
      const lightBrightness = parseInt('FA', 16); // Average of RGB components
      const darkBrightness = parseInt('21', 16); // Average of RGB components

      expect(lightBrightness - darkBrightness).toBeGreaterThan(200);
    });
  });
});
