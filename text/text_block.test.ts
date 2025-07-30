import { describe, it, expect, vi } from 'vitest';
import { TextBlock } from './text_block';
import { TextStyle } from './text_style';
import { TextAlign } from './text_align';
import { Line } from './line';
import { Brush } from '../graphics/brush';
import { Coordinate } from '../math/coordinate';

describe('text/text_block', () => {
  describe('constructor', () => {
    it('should create TextBlock with required properties', () => {
      const textStyle = new TextStyle();
      const line = new Line({ text: 'test', length: 100 });
      
      const textBlockObj = {
        text: 'Test text',
        textStyle,
        lines: [line],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: 'Test tooltip',
        angle: 0,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      
      expect(textBlock.text).toBe('Test text');
      expect(textBlock.textStyle).toBe(textStyle);
      expect(textBlock.lines).toEqual([line]);
      expect(textBlock.paralAlign).toBe(TextAlign.START);
      expect(textBlock.perpenAlign).toBe(TextAlign.START);
      expect(textBlock.tooltip).toBe('Test tooltip');
    });

    it('should handle optional properties', () => {
      const textStyle = new TextStyle();
      const boxStyle = new Brush({ fill: '#ff0000' });
      
      const textBlockObj = {
        text: 'Test text',
        textStyle,
        boxStyle,
        lines: [],
        paralAlign: TextAlign.CENTER,
        perpenAlign: TextAlign.CENTER,
        tooltip: 'Test tooltip',
        angle: 45,
        anchor: new Coordinate(10, 20),
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      
      expect(textBlock.boxStyle).toBe(boxStyle);
      expect(textBlock.tooltip).toBe('Test tooltip');
      expect(textBlock.angle).toBe(45);
      expect(textBlock.anchor).toEqual(new Coordinate(10, 20));
    });

    it('should default tooltip to empty string when undefined', () => {
      const textStyle = new TextStyle();
      
      const textBlockObj = {
        text: 'Test',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.tooltip).toBe('');
    });
  });

  describe('text alignment', () => {
    it('should handle different parallel alignments', () => {
      const textStyle = new TextStyle();
      
      const alignments = [TextAlign.START, TextAlign.CENTER, TextAlign.END];
      
      alignments.forEach(align => {
        const textBlockObj = {
          text: 'Test',
          textStyle,
          lines: [],
          boxStyle: undefined,
          paralAlign: align,
          perpenAlign: TextAlign.START,
          tooltip: undefined,
          angle: undefined,
          anchor: undefined,
          truncated: false,
        };
        
        const textBlock = new TextBlock(textBlockObj);
        expect(textBlock.paralAlign).toBe(align);
      });
    });

    it('should handle different perpendicular alignments', () => {
      const textStyle = new TextStyle();
      
      const alignments = [TextAlign.START, TextAlign.CENTER, TextAlign.END];
      
      alignments.forEach(align => {
        const textBlockObj = {
          text: 'Test',
          textStyle,
          lines: [],
          boxStyle: undefined,
          paralAlign: TextAlign.START,
          perpenAlign: align,
          tooltip: undefined,
          angle: undefined,
          anchor: undefined,
          truncated: false,
        };
        
        const textBlock = new TextBlock(textBlockObj);
        expect(textBlock.perpenAlign).toBe(align);
      });
    });
  });

  describe('lines property', () => {
    it('should handle empty lines array', () => {
      const textStyle = new TextStyle();
      
      const textBlockObj = {
        text: 'Test',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.lines).toEqual([]);
    });

    it('should handle multiple lines', () => {
      const textStyle = new TextStyle();
      const line1 = new Line({ text: 'First line', length: 100, x: 0, y: 0 });
      const line2 = new Line({ text: 'Second line', length: 120, x: 0, y: 20 });
      
      const textBlockObj = {
        text: 'Multi-line text',
        textStyle,
        lines: [line1, line2],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.lines).toHaveLength(2);
      expect(textBlock.lines[0]).toBe(line1);
      expect(textBlock.lines[1]).toBe(line2);
    });
  });

  describe('styling properties', () => {
    it('should handle different text styles', () => {
      const textStyle = new TextStyle({
        fontSize: 14,
        fontName: 'Arial',
        color: '#000000',
      });
      
      const textBlockObj = {
        text: 'Styled text',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.textStyle).toBe(textStyle);
    });

    it('should handle box style for background', () => {
      const textStyle = new TextStyle();
      const boxStyle = new Brush({
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 1,
      });
      
      const textBlockObj = {
        text: 'Boxed text',
        textStyle,
        boxStyle,
        lines: [],
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.boxStyle).toBe(boxStyle);
    });
  });

  describe('rotation and positioning', () => {
    it('should handle text rotation angle', () => {
      const textStyle = new TextStyle();
      
      const angles = [0, 45, 90, 180, 270, 360, -45];
      
      angles.forEach(angle => {
        const textBlockObj = {
          text: 'Rotated text',
          textStyle,
          lines: [],
          boxStyle: undefined,
          paralAlign: TextAlign.START,
          perpenAlign: TextAlign.START,
          tooltip: undefined,
          angle,
          anchor: undefined,
          truncated: false,
        };
        
        const textBlock = new TextBlock(textBlockObj);
        expect(textBlock.angle).toBe(angle);
      });
    });

    it('should handle anchor positioning', () => {
      const textStyle = new TextStyle();
      const anchor = new Coordinate(100, 200);
      
      const textBlockObj = {
        text: 'Anchored text',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.anchor).toBe(anchor);
    });

    it('should handle undefined anchor', () => {
      const textStyle = new TextStyle();
      
      const textBlockObj = {
        text: 'Text without anchor',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.anchor).toBeUndefined();
    });
  });

  describe('tooltip functionality', () => {
    it('should handle custom tooltip text', () => {
      const textStyle = new TextStyle();
      
      const tooltips = ['Simple tooltip', 'Multi-line\ntooltip', 'HTML <b>tooltip</b>'];
      
      tooltips.forEach(tooltip => {
        const textBlockObj = {
          text: 'Text with tooltip',
          textStyle,
          lines: [],
          boxStyle: undefined,
          paralAlign: TextAlign.START,
          perpenAlign: TextAlign.START,
          tooltip,
          angle: undefined,
          anchor: undefined,
          truncated: false,
        };
        
        const textBlock = new TextBlock(textBlockObj);
        expect(textBlock.tooltip).toBe(tooltip);
      });
    });

    it('should handle tooltipText object', () => {
      const textStyle = new TextStyle();
      const tooltipText = {
        hasHtmlContent: true,
        hasCustomContent: false,
        content: '<div>HTML content</div>',
      };
      
      const textBlockObj = {
        text: 'Text with rich tooltip',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
        tooltipText,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.tooltipText).toBe(tooltipText);
    });
  });

  describe('truncation handling', () => {
    it('should handle truncation flag', () => {
      const textStyle = new TextStyle();
      
      const textBlockObj = {
        text: 'Very long text that might be truncated',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: true,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.truncated).toBe(true);
    });

    it('should handle non-truncated text', () => {
      const textStyle = new TextStyle();
      
      const textBlockObj = {
        text: 'Short text',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.truncated).toBe(false);
    });
  });

  describe('complex configurations', () => {
    it('should handle full configuration with all properties', () => {
      const textStyle = new TextStyle({
        fontSize: 16,
        fontName: 'Helvetica',
        color: '#333333',
      });
      
      const boxStyle = new Brush({
        fill: '#f0f0f0',
        stroke: '#cccccc',
        strokeWidth: 2,
      });
      
      const line1 = new Line({ text: 'First line of text', length: 150, x: 0, y: 0 });
      const line2 = new Line({ text: 'Second line of text', length: 160, x: 0, y: 20 });
      
      const anchor = new Coordinate(50, 75);
      
      const tooltipText = {
        hasHtmlContent: false,
        hasCustomContent: true,
        content: 'Custom tooltip content',
      };
      
      const textBlockObj = {
        text: 'Complete text block example',
        textStyle,
        boxStyle,
        lines: [line1, line2],
        paralAlign: TextAlign.CENTER,
        perpenAlign: TextAlign.CENTER,
        tooltip: 'Main tooltip',
        tooltipText,
        angle: 30,
        anchor,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      
      expect(textBlock.text).toBe('Complete text block example');
      expect(textBlock.textStyle).toBe(textStyle);
      expect(textBlock.boxStyle).toBe(boxStyle);
      expect(textBlock.lines).toEqual([line1, line2]);
      expect(textBlock.paralAlign).toBe(TextAlign.CENTER);
      expect(textBlock.perpenAlign).toBe(TextAlign.CENTER);
      expect(textBlock.tooltip).toBe('Main tooltip');
      expect(textBlock.tooltipText).toBe(tooltipText);
      expect(textBlock.angle).toBe(30);
      expect(textBlock.anchor).toBe(anchor);
      expect(textBlock.truncated).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty text', () => {
      const textStyle = new TextStyle();
      
      const textBlockObj = {
        text: '',
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.text).toBe('');
    });

    it('should handle special characters in text', () => {
      const textStyle = new TextStyle();
      const specialText = 'Special chars: äöü ñ 中文 🚀 \n\t\r';
      
      const textBlockObj = {
        text: specialText,
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.text).toBe(specialText);
    });

    it('should handle very long text', () => {
      const textStyle = new TextStyle();
      const longText = 'A'.repeat(10000);
      
      const textBlockObj = {
        text: longText,
        textStyle,
        lines: [],
        boxStyle: undefined,
        paralAlign: TextAlign.START,
        perpenAlign: TextAlign.START,
        tooltip: undefined,
        angle: undefined,
        anchor: undefined,
        truncated: false,
      };
      
      const textBlock = new TextBlock(textBlockObj);
      expect(textBlock.text).toBe(longText);
      expect(textBlock.text).toHaveLength(10000);
    });

    it('should handle extreme rotation angles', () => {
      const textStyle = new TextStyle();
      const extremeAngles = [720, -720, 1080, -1080];
      
      extremeAngles.forEach(angle => {
        const textBlockObj = {
          text: 'Extreme rotation',
          textStyle,
          lines: [],
          boxStyle: undefined,
          paralAlign: TextAlign.START,
          perpenAlign: TextAlign.START,
          tooltip: undefined,
          angle,
          anchor: undefined,
          truncated: false,
        };
        
        const textBlock = new TextBlock(textBlockObj);
        expect(textBlock.angle).toBe(angle);
      });
    });

    it('should handle extreme coordinate positions', () => {
      const textStyle = new TextStyle();
      const extremeCoords = [
        new Coordinate(0, 0),
        new Coordinate(-1000, -1000),
        new Coordinate(1e6, 1e6),
        new Coordinate(Infinity, -Infinity),
      ];
      
      extremeCoords.forEach(coord => {
        const textBlockObj = {
          text: 'Extreme position',
          textStyle,
          lines: [],
          boxStyle: undefined,
          paralAlign: TextAlign.START,
          perpenAlign: TextAlign.START,
          tooltip: undefined,
          angle: undefined,
          anchor: coord,
          truncated: false,
        };
        
        const textBlock = new TextBlock(textBlockObj);
        expect(textBlock.anchor).toBe(coord);
      });
    });
  });
});
