import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TextStyle, TextStyleProperties, PartialTextStyleProperties } from './text_style';

// Mock the JSON utility
vi.mock('../common/json', () => ({
  stringify: vi.fn()
}));

describe('TextStyle', () => {
  let mockStringify: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const gvizJson = await import('../common/json');
    mockStringify = vi.mocked(gvizJson.stringify);
    mockStringify.mockImplementation(JSON.stringify);
  });

  describe('constructor', () => {
    it('should create TextStyle with default values', () => {
      const textStyle = new TextStyle();

      expect(textStyle.fontName).toBe('sans-serif');
      expect(textStyle.fontSize).toBe(10);
      expect(textStyle.color).toBe('black');
      expect(textStyle.opacity).toBe(1);
      expect(textStyle.auraColor).toBe('');
      expect(textStyle.auraWidth).toBe(3);
      expect(textStyle.bold).toBe(false);
      expect(textStyle.italic).toBe(false);
      expect(textStyle.underline).toBe(false);
    });

    it('should create TextStyle with null parameter', () => {
      const textStyle = new TextStyle(null);

      expect(textStyle.fontName).toBe('sans-serif');
      expect(textStyle.fontSize).toBe(10);
    });

    it('should create TextStyle with undefined parameter', () => {
      const textStyle = new TextStyle(undefined);

      expect(textStyle.fontName).toBe('sans-serif');
      expect(textStyle.fontSize).toBe(10);
    });

    it('should create TextStyle with partial properties', () => {
      const props: PartialTextStyleProperties = {
        fontName: 'Arial',
        fontSize: 12,
        color: 'red'
      };

      const textStyle = new TextStyle(props);

      expect(textStyle.fontName).toBe('Arial');
      expect(textStyle.fontSize).toBe(12);
      expect(textStyle.color).toBe('red');
      // Default values for unspecified properties
      expect(textStyle.opacity).toBe(1);
      expect(textStyle.bold).toBe(false);
    });

    it('should create TextStyle with all properties', () => {
      const props: TextStyleProperties = {
        fontName: 'Times New Roman',
        fontSize: 14,
        color: 'blue',
        opacity: 0.8,
        auraColor: 'yellow',
        auraWidth: 2,
        bold: true,
        italic: true,
        underline: true
      };

      const textStyle = new TextStyle(props);

      expect(textStyle.fontName).toBe('Times New Roman');
      expect(textStyle.fontSize).toBe(14);
      expect(textStyle.color).toBe('blue');
      expect(textStyle.opacity).toBe(0.8);
      expect(textStyle.auraColor).toBe('yellow');
      expect(textStyle.auraWidth).toBe(2);
      expect(textStyle.bold).toBe(true);
      expect(textStyle.italic).toBe(true);
      expect(textStyle.underline).toBe(true);
    });

    it('should create TextStyle from another TextStyle', () => {
      const originalStyle = new TextStyle({
        fontName: 'Arial',
        fontSize: 16,
        bold: true
      });

      const newStyle = new TextStyle(originalStyle);

      expect(newStyle.fontName).toBe('Arial');
      expect(newStyle.fontSize).toBe(16);
      expect(newStyle.bold).toBe(true);
      expect(newStyle.color).toBe('black'); // default
    });

    it('should handle string fontSize in constructor', () => {
      const textStyle = new TextStyle({ fontSize: '15' });

      expect(textStyle.fontSize).toBe(15);
    });

    it('should ignore null properties in constructor', () => {
      const props = {
        fontName: null,
        fontSize: null,
        color: null,
        opacity: null
      };

      const textStyle = new TextStyle(props);

      expect(textStyle.fontName).toBe('sans-serif'); // default
      expect(textStyle.fontSize).toBe(10); // default
      expect(textStyle.color).toBe('black'); // default
      expect(textStyle.opacity).toBe(1); // default
    });
  });

  describe('setProperties', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set multiple properties', () => {
      const props: PartialTextStyleProperties = {
        fontName: 'Arial',
        fontSize: 14,
        bold: true
      };

      const result = textStyle.setProperties(props);

      expect(result).toBe(textStyle); // Should return this
      expect(textStyle.fontName).toBe('Arial');
      expect(textStyle.fontSize).toBe(14);
      expect(textStyle.bold).toBe(true);
    });

    it('should handle null properties', () => {
      textStyle.setProperties(null);

      expect(textStyle.fontName).toBe('sans-serif'); // unchanged
      expect(textStyle.fontSize).toBe(10); // unchanged
    });

    it('should handle empty object', () => {
      textStyle.setProperties({});

      expect(textStyle.fontName).toBe('sans-serif'); // unchanged
      expect(textStyle.fontSize).toBe(10); // unchanged
    });

    it('should update existing properties', () => {
      textStyle.fontName = 'Arial';
      textStyle.fontSize = 12;

      textStyle.setProperties({
        fontName: 'Times',
        color: 'red'
      });

      expect(textStyle.fontName).toBe('Times');
      expect(textStyle.fontSize).toBe(12); // unchanged
      expect(textStyle.color).toBe('red');
    });
  });

  describe('getProperties', () => {
    it('should return all properties', () => {
      const textStyle = new TextStyle({
        fontName: 'Arial',
        fontSize: 14,
        color: 'red',
        opacity: 0.5,
        auraColor: 'blue',
        auraWidth: 2,
        bold: true,
        italic: false,
        underline: true
      });

      const properties = textStyle.getProperties();

      expect(properties).toEqual({
        fontName: 'Arial',
        fontSize: 14,
        color: 'red',
        opacity: 0.5,
        auraColor: 'blue',
        auraWidth: 2,
        bold: true,
        italic: false,
        underline: true
      });
    });

    it('should return current state properties', () => {
      const textStyle = new TextStyle();

      // Modify some properties
      textStyle.setFontName('Verdana');
      textStyle.setBold(true);

      const properties = textStyle.getProperties();

      expect(properties.fontName).toBe('Verdana');
      expect(properties.bold).toBe(true);
      expect(properties.fontSize).toBe(10); // default
    });
  });

  describe('toJSON', () => {
    it('should return JSON string representation', () => {
      const textStyle = new TextStyle({
        fontName: 'Arial',
        fontSize: 12,
        bold: true
      });

      const jsonString = textStyle.toJSON();

      expect(mockStringify).toHaveBeenCalledWith({
        fontName: 'Arial',
        fontSize: 12,
        color: 'black',
        opacity: 1,
        auraColor: '',
        auraWidth: 3,
        bold: true,
        italic: false,
        underline: false
      });
      expect(jsonString).toBe(JSON.stringify(textStyle.getProperties()));
    });

    it('should handle default TextStyle JSON', () => {
      const textStyle = new TextStyle();

      textStyle.toJSON();

      expect(mockStringify).toHaveBeenCalledWith({
        fontName: 'sans-serif',
        fontSize: 10,
        color: 'black',
        opacity: 1,
        auraColor: '',
        auraWidth: 3,
        bold: false,
        italic: false,
        underline: false
      });
    });
  });

  describe('setFontName', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set valid font name', () => {
      const result = textStyle.setFontName('Arial');

      expect(result).toBe(textStyle); // Should return this
      expect(textStyle.fontName).toBe('Arial');
    });

    it('should ignore null font name', () => {
      textStyle.setFontName(null);

      expect(textStyle.fontName).toBe('sans-serif'); // unchanged
    });

    it('should ignore undefined font name', () => {
      textStyle.setFontName(undefined);

      expect(textStyle.fontName).toBe('sans-serif'); // unchanged
    });

    it('should ignore empty string font name', () => {
      textStyle.setFontName('');

      expect(textStyle.fontName).toBe('sans-serif'); // unchanged
    });

    it('should accept font names with spaces', () => {
      textStyle.setFontName('Times New Roman');

      expect(textStyle.fontName).toBe('Times New Roman');
    });

    it('should accept CSS font families', () => {
      textStyle.setFontName('Arial, sans-serif');

      expect(textStyle.fontName).toBe('Arial, sans-serif');
    });
  });

  describe('setFontSize', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set valid numeric font size', () => {
      const result = textStyle.setFontSize(14);

      expect(result).toBe(textStyle);
      expect(textStyle.fontSize).toBe(14);
    });

    it('should set font size from string', () => {
      textStyle.setFontSize('16');

      expect(textStyle.fontSize).toBe(16);
    });

    it('should set floating point font size', () => {
      textStyle.setFontSize(12.5);

      expect(textStyle.fontSize).toBe(12.5);
    });

    it('should set floating point font size from string', () => {
      textStyle.setFontSize('14.25');

      expect(textStyle.fontSize).toBe(14.25);
    });

    it('should ignore null font size', () => {
      textStyle.setFontSize(null);

      expect(textStyle.fontSize).toBe(10); // unchanged
    });

    it('should ignore undefined font size', () => {
      textStyle.setFontSize(undefined);

      expect(textStyle.fontSize).toBe(10); // unchanged
    });

    it('should ignore zero font size', () => {
      textStyle.setFontSize(0);

      expect(textStyle.fontSize).toBe(10); // unchanged
    });

    it('should throw error for negative font size', () => {
      expect(() => {
        textStyle.setFontSize(-5);
      }).toThrow('Negative fontSize not allowed.');
    });

    it('should throw error for negative font size from string', () => {
      expect(() => {
        textStyle.setFontSize('-10');
      }).toThrow('Negative fontSize not allowed.');
    });

    it('should handle very large font sizes', () => {
      textStyle.setFontSize(100);

      expect(textStyle.fontSize).toBe(100);
    });

    it('should handle very small positive font sizes', () => {
      textStyle.setFontSize(0.1);

      expect(textStyle.fontSize).toBe(0.1);
    });

    it('should ignore invalid string font sizes', () => {
      textStyle.setFontSize('not-a-number');

      expect(textStyle.fontSize).toBe(10); // unchanged (NaN is falsy)
    });
  });

  describe('setColor', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set valid color', () => {
      const result = textStyle.setColor('red');

      expect(result).toBe(textStyle);
      expect(textStyle.color).toBe('red');
    });

    it('should set hex color', () => {
      textStyle.setColor('#FF0000');

      expect(textStyle.color).toBe('#FF0000');
    });

    it('should set RGB color', () => {
      textStyle.setColor('rgb(255, 0, 0)');

      expect(textStyle.color).toBe('rgb(255, 0, 0)');
    });

    it('should set RGBA color', () => {
      textStyle.setColor('rgba(255, 0, 0, 0.5)');

      expect(textStyle.color).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('should ignore null color', () => {
      textStyle.setColor(null);

      expect(textStyle.color).toBe('black'); // unchanged
    });

    it('should ignore undefined color', () => {
      textStyle.setColor(undefined);

      expect(textStyle.color).toBe('black'); // unchanged
    });

    it('should accept empty string color', () => {
      textStyle.setColor('');

      expect(textStyle.color).toBe('');
    });
  });

  describe('setOpacity', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set valid opacity', () => {
      const result = textStyle.setOpacity(0.5);

      expect(result).toBe(textStyle);
      expect(textStyle.opacity).toBe(0.5);
    });

    it('should set opacity 0', () => {
      textStyle.setOpacity(0);

      expect(textStyle.opacity).toBe(0);
    });

    it('should set opacity 1', () => {
      textStyle.setOpacity(1);

      expect(textStyle.opacity).toBe(1);
    });

    it('should ignore null opacity', () => {
      textStyle.setOpacity(null);

      expect(textStyle.opacity).toBe(1); // unchanged
    });

    it('should ignore undefined opacity', () => {
      textStyle.setOpacity(undefined);

      expect(textStyle.opacity).toBe(1); // unchanged
    });

    it('should accept opacity greater than 1', () => {
      textStyle.setOpacity(1.5);

      expect(textStyle.opacity).toBe(1.5);
    });

    it('should accept negative opacity', () => {
      textStyle.setOpacity(-0.5);

      expect(textStyle.opacity).toBe(-0.5);
    });
  });

  describe('setAuraColor', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set valid aura color', () => {
      const result = textStyle.setAuraColor('blue');

      expect(result).toBe(textStyle);
      expect(textStyle.auraColor).toBe('blue');
    });

    it('should ignore null aura color', () => {
      textStyle.setAuraColor(null);

      expect(textStyle.auraColor).toBe(''); // unchanged
    });

    it('should ignore undefined aura color', () => {
      textStyle.setAuraColor(undefined);

      expect(textStyle.auraColor).toBe(''); // unchanged
    });

    it('should accept empty string aura color', () => {
      textStyle.auraColor = 'blue'; // set to non-default
      textStyle.setAuraColor('');

      expect(textStyle.auraColor).toBe('');
    });
  });

  describe('setAuraWidth', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set valid aura width', () => {
      const result = textStyle.setAuraWidth(5);

      expect(result).toBe(textStyle);
      expect(textStyle.auraWidth).toBe(5);
    });

    it('should set aura width to 0', () => {
      textStyle.setAuraWidth(0);

      expect(textStyle.auraWidth).toBe(0);
    });

    it('should ignore null aura width', () => {
      textStyle.setAuraWidth(null);

      expect(textStyle.auraWidth).toBe(3); // unchanged
    });

    it('should ignore undefined aura width', () => {
      textStyle.setAuraWidth(undefined);

      expect(textStyle.auraWidth).toBe(3); // unchanged
    });

    it('should accept negative aura width', () => {
      textStyle.setAuraWidth(-2);

      expect(textStyle.auraWidth).toBe(-2);
    });

    it('should accept floating point aura width', () => {
      textStyle.setAuraWidth(2.5);

      expect(textStyle.auraWidth).toBe(2.5);
    });
  });

  describe('setBold', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set bold to true', () => {
      const result = textStyle.setBold(true);

      expect(result).toBe(textStyle);
      expect(textStyle.bold).toBe(true);
    });

    it('should set bold to false', () => {
      textStyle.bold = true; // set to non-default
      textStyle.setBold(false);

      expect(textStyle.bold).toBe(false);
    });

    it('should ignore null bold', () => {
      textStyle.setBold(null);

      expect(textStyle.bold).toBe(false); // unchanged
    });

    it('should ignore undefined bold', () => {
      textStyle.setBold(undefined);

      expect(textStyle.bold).toBe(false); // unchanged
    });
  });

  describe('setItalic', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set italic to true', () => {
      const result = textStyle.setItalic(true);

      expect(result).toBe(textStyle);
      expect(textStyle.italic).toBe(true);
    });

    it('should set italic to false', () => {
      textStyle.italic = true; // set to non-default
      textStyle.setItalic(false);

      expect(textStyle.italic).toBe(false);
    });

    it('should ignore null italic', () => {
      textStyle.setItalic(null);

      expect(textStyle.italic).toBe(false); // unchanged
    });

    it('should ignore undefined italic', () => {
      textStyle.setItalic(undefined);

      expect(textStyle.italic).toBe(false); // unchanged
    });
  });

  describe('setUnderline', () => {
    let textStyle: TextStyle;

    beforeEach(() => {
      textStyle = new TextStyle();
    });

    it('should set underline to true', () => {
      const result = textStyle.setUnderline(true);

      expect(result).toBe(textStyle);
      expect(textStyle.underline).toBe(true);
    });

    it('should set underline to false', () => {
      textStyle.underline = true; // set to non-default
      textStyle.setUnderline(false);

      expect(textStyle.underline).toBe(false);
    });

    it('should ignore null underline', () => {
      textStyle.setUnderline(null);

      expect(textStyle.underline).toBe(false); // unchanged
    });

    it('should ignore undefined underline', () => {
      textStyle.setUnderline(undefined);

      expect(textStyle.underline).toBe(false); // unchanged
    });
  });

  describe('method chaining', () => {
    it('should support method chaining', () => {
      const textStyle = new TextStyle();

      const result = textStyle
        .setFontName('Arial')
        .setFontSize(14)
        .setColor('red')
        .setBold(true)
        .setItalic(true);

      expect(result).toBe(textStyle);
      expect(textStyle.fontName).toBe('Arial');
      expect(textStyle.fontSize).toBe(14);
      expect(textStyle.color).toBe('red');
      expect(textStyle.bold).toBe(true);
      expect(textStyle.italic).toBe(true);
    });

    it('should support complex method chaining', () => {
      const textStyle = new TextStyle()
        .setFontName('Times New Roman')
        .setFontSize('16.5')
        .setColor('#FF0000')
        .setOpacity(0.8)
        .setAuraColor('yellow')
        .setAuraWidth(2)
        .setBold(true)
        .setItalic(false)
        .setUnderline(true);

      expect(textStyle.fontName).toBe('Times New Roman');
      expect(textStyle.fontSize).toBe(16.5);
      expect(textStyle.color).toBe('#FF0000');
      expect(textStyle.opacity).toBe(0.8);
      expect(textStyle.auraColor).toBe('yellow');
      expect(textStyle.auraWidth).toBe(2);
      expect(textStyle.bold).toBe(true);
      expect(textStyle.italic).toBe(false);
      expect(textStyle.underline).toBe(true);
    });
  });

  describe('edge cases and integration', () => {
    it('should handle multiple setProperties calls', () => {
      const textStyle = new TextStyle();

      textStyle.setProperties({ fontName: 'Arial', bold: true });
      textStyle.setProperties({ fontSize: 16, color: 'red' });
      textStyle.setProperties({ italic: true });

      expect(textStyle.fontName).toBe('Arial');
      expect(textStyle.bold).toBe(true);
      expect(textStyle.fontSize).toBe(16);
      expect(textStyle.color).toBe('red');
      expect(textStyle.italic).toBe(true);
    });

    it('should preserve properties when setting null properties', () => {
      const textStyle = new TextStyle({
        fontName: 'Arial',
        fontSize: 14,
        bold: true
      });

      textStyle.setProperties({
        fontName: null,
        color: 'red'
      });

      expect(textStyle.fontName).toBe('Arial'); // preserved
      expect(textStyle.fontSize).toBe(14); // preserved
      expect(textStyle.bold).toBe(true); // preserved
      expect(textStyle.color).toBe('red'); // new
    });

    it('should handle extreme font sizes', () => {
      const textStyle = new TextStyle();

      textStyle.setFontSize(0.001);
      expect(textStyle.fontSize).toBe(0.001);

      textStyle.setFontSize(1000);
      expect(textStyle.fontSize).toBe(1000);
    });

    it('should handle special color values', () => {
      const textStyle = new TextStyle();

      const colors = [
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset',
        'hsl(120, 100%, 50%)',
        'hsla(120, 100%, 50%, 0.3)'
      ];

      colors.forEach(color => {
        textStyle.setColor(color);
        expect(textStyle.color).toBe(color);
      });
    });

    it('should maintain type consistency', () => {
      const textStyle = new TextStyle();

      expect(typeof textStyle.fontName).toBe('string');
      expect(typeof textStyle.fontSize).toBe('number');
      expect(typeof textStyle.color).toBe('string');
      expect(typeof textStyle.opacity).toBe('number');
      expect(typeof textStyle.auraColor).toBe('string');
      expect(typeof textStyle.auraWidth).toBe('number');
      expect(typeof textStyle.bold).toBe('boolean');
      expect(typeof textStyle.italic).toBe('boolean');
      expect(typeof textStyle.underline).toBe('boolean');
    });

    it('should create identical TextStyles from same parameters', () => {
      const params = {
        fontName: 'Arial',
        fontSize: 14,
        color: 'blue',
        bold: true
      };

      const textStyle1 = new TextStyle(params);
      const textStyle2 = new TextStyle(params);

      expect(textStyle1.getProperties()).toEqual(textStyle2.getProperties());
    });

    it('should handle copying TextStyle properties', () => {
      const source = new TextStyle({
        fontName: 'Arial',
        fontSize: 14,
        bold: true,
        color: 'red'
      });

      const target = new TextStyle();
      target.setProperties(source.getProperties());

      expect(target.getProperties()).toEqual(source.getProperties());
    });
  });
});
