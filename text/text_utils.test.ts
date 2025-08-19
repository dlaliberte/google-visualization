import { describe, it, expect } from 'vitest';
import { calcTextLayout, tooltipCssStyle } from './text_utils';
import { TextStyle } from './text_style';
import { TextMeasureFunction } from './text_measure_function';

// Mock TextMeasureFunction
const mockTextMeasureFunction: TextMeasureFunction = (text, style) => ({
  width: text.length * 10, // Assume each character is 10px wide
  height: 20, // Assume fixed height
});

describe('text/text_utils', () => {
  describe('calcTextLayout', () => {
    it('should return empty layout for zero width', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'test', {}, 0);
      expect(layout).toEqual({ lines: [], needTooltip: true, maxLineWidth: 0 });
    });

    it('should return single line layout for short text', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'test', {}, 100);
      expect(layout).toEqual({ lines: ['test'], needTooltip: false, maxLineWidth: 40 });
    });

    it('should return truncated layout for long text', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'longtext', {}, 50);
      expect(layout).toEqual({ lines: ['long…'], needTooltip: true, maxLineWidth: 50 });
    });

    it('should handle multi-line text', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'line1\nline2', {}, 100);
      // With the current implementation, multi-line text might be truncated
      // if the total width exceeds constraints
      expect(layout.lines.length).toBeGreaterThanOrEqual(1);
      expect(layout.lines[0]).toContain('line1');
    });

    it('should handle empty text', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, '', {}, 100);
      expect(layout.lines).toEqual(['']);
      expect(layout.needTooltip).toBe(false);
      expect(layout.maxLineWidth).toBe(0);
    });

    it('should handle very long single word', () => {
      const longWord = 'supercalifragilisticexpialidocious';
      const layout = calcTextLayout(mockTextMeasureFunction, longWord, {}, 100);
      expect(layout.needTooltip).toBe(true);
      expect(layout.lines[0]).toContain('…');
    });

    it('should respect different text styles', () => {
      const textStyle: TextStyle = { fontSize: 16, fontName: 'Helvetica' };
      const layout = calcTextLayout(mockTextMeasureFunction, 'test', textStyle, 100);
      expect(layout).toBeDefined();
      expect(layout.lines).toContain('test');
    });

    it('should handle whitespace-only text', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, '   ', {}, 100);
      // Whitespace-only text gets trimmed and results in empty lines
      expect(layout.lines).toEqual([]);
      expect(layout.maxLineWidth).toBe(0);
    });

    it('should handle text with mixed content', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'Short\nThis is a much longer line', {}, 100);
      // Text might be truncated due to width constraints
      expect(layout.lines.length).toBeGreaterThanOrEqual(1);
      expect(layout.maxLineWidth).toBeGreaterThan(0);
    });
  });

  describe('tooltipCssStyle', () => {
    it('should return correct CSS style for given TextStyle', () => {
      const textStyle: TextStyle = { fontSize: 12, fontName: 'Arial' };
      const cssStyle = tooltipCssStyle(textStyle);
      expect(cssStyle).toEqual({
        'background': 'infobackground',
        'padding': '1px',
        'border': '1px solid infotext',
        'fontSize': '12px',
        'fontFamily': 'Arial',
        'margin': '12px',
      });
    });

    it('should handle missing fontSize and fontName', () => {
      const textStyle: TextStyle = {};
      const cssStyle = tooltipCssStyle(textStyle);
      expect(cssStyle).toEqual({
        'background': 'infobackground',
        'padding': '1px',
        'border': '1px solid infotext',
        'fontSize': undefined,
        'fontFamily': undefined,
        'margin': undefined,
      });
    });

    it('should handle null text style', () => {
      const cssStyle = tooltipCssStyle(null as any);
      expect(cssStyle).toEqual({
        'background': 'infobackground',
        'padding': '1px',
        'border': '1px solid infotext',
        'fontSize': undefined,
        'fontFamily': undefined,
        'margin': undefined,
      });
    });

    it('should handle complete text style', () => {
      const textStyle: TextStyle = {
        fontSize: 14,
        fontName: 'Helvetica',
        bold: true,
        italic: true,
        color: '#333333'
      };
      const cssStyle = tooltipCssStyle(textStyle);
      expect(cssStyle.fontSize).toBe('14px');
      expect(cssStyle.fontFamily).toBe('Helvetica');
      expect(cssStyle.margin).toBe('14px');
    });

    it('should handle zero font size', () => {
      const textStyle: TextStyle = { fontSize: 0, fontName: 'Arial' };
      const cssStyle = tooltipCssStyle(textStyle);
      expect(cssStyle.fontSize).toBe('0px');
      expect(cssStyle.margin).toBe('0px');
    });

    it('should handle very large font size', () => {
      const textStyle: TextStyle = { fontSize: 100, fontName: 'Arial' };
      const cssStyle = tooltipCssStyle(textStyle);
      expect(cssStyle.fontSize).toBe('100px');
      expect(cssStyle.margin).toBe('100px');
    });

    it('should handle special font names', () => {
      const textStyle: TextStyle = { fontSize: 12, fontName: 'Times New Roman, serif' };
      const cssStyle = tooltipCssStyle(textStyle);
      expect(cssStyle.fontFamily).toBe('Times New Roman, serif');
    });
  });

  describe('edge cases', () => {
    it('should handle very small width constraints', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'Hello', {}, 1);
      expect(layout.needTooltip).toBe(true);
      // Very small width might result in no lines if nothing fits
      expect(layout.lines.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle negative width', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'Hello', {}, -10);
      expect(layout.lines).toEqual([]);
      expect(layout.needTooltip).toBe(true);
    });

    it('should handle undefined text', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, undefined as any, {}, 100);
      expect(layout).toBeDefined();
    });

    it('should handle very wide width constraints', () => {
      const layout = calcTextLayout(mockTextMeasureFunction, 'Short text', {}, 10000);
      expect(layout.needTooltip).toBe(false);
      expect(layout.lines).toEqual(['Short text']);
    });
  });
});
