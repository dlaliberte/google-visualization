import { describe, it, expect } from 'vitest';
import { calcTextLayout, tooltipCssStyle } from './text_utils';
import { TextStyle } from './text_style';
import { TextMeasureFunction } from './text_measure_function';

// Mock TextMeasureFunction
const mockTextMeasureFunction: TextMeasureFunction = (text, style) => ({
  width: text.length * 10, // Assume each character is 10px wide
  height: 20, // Assume fixed height
});

// Tests for calcTextLayout
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
    expect(layout).toEqual({ lines: ['longt...'], needTooltip: true, maxLineWidth: 50 });
  });
});

// Tests for tooltipCssStyle
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
});
