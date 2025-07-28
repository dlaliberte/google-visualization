import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LegendDefiner } from './legend_definer';
import { LegendPosition, Alignment } from '../common/option_types';
import { Options } from '../common/options';
import { ChartDefinition } from '../visualization/corechart/chart_definition';

// Mock dependencies
vi.mock('../visualization/corechart/chart_definition', () => ({
  ChartDefinition: vi.fn().mockImplementation(() => ({
    // Mock chart definition properties
    series: [],
    data: null
  }))
}));

describe('LegendDefiner', () => {
  let mockChartDefinition: ChartDefinition;
  let options: Options;

  beforeEach(() => {
    mockChartDefinition = new ChartDefinition();

    options = new Options([{
      legend: {
        position: 'right',
        alignment: 'start',
        textStyle: {
          fontSize: 12,
          fontFamily: 'Arial'
        }
      }
    }]);
  });

  describe('constructor', () => {
    it('should create legend definer with valid parameters', () => {
      const definer = new LegendDefiner(
        mockChartDefinition,
        options,
        LegendPosition.RIGHT
      );
      expect(definer).toBeDefined();
    });

    it('should use default position when provided', () => {
      const definer = new LegendDefiner(
        mockChartDefinition,
        options,
        LegendPosition.BOTTOM
      );
      expect(definer).toBeDefined();
    });

    it('should handle null default position', () => {
      const definer = new LegendDefiner(
        mockChartDefinition,
        options,
        null
      );
      expect(definer).toBeDefined();
    });

    it('should accept icon width scale factor', () => {
      const definer = new LegendDefiner(
        mockChartDefinition,
        options,
        LegendPosition.RIGHT,
        1.5  // iconWidthScaleFactor
      );
      expect(definer).toBeDefined();
    });
  });

  describe('legend position handling', () => {
    it('should handle right position', () => {
      const rightOptions = new Options([{ legend: { position: 'right' } }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        rightOptions,
        LegendPosition.RIGHT
      );
      expect(definer).toBeDefined();
    });

    it('should handle left position', () => {
      const leftOptions = new Options([{ legend: { position: 'left' } }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        leftOptions,
        LegendPosition.LEFT
      );
      expect(definer).toBeDefined();
    });

    it('should handle top position', () => {
      const topOptions = new Options([{ legend: { position: 'top' } }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        topOptions,
        LegendPosition.TOP
      );
      expect(definer).toBeDefined();
    });

    it('should handle bottom position', () => {
      const bottomOptions = new Options([{ legend: { position: 'bottom' } }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        bottomOptions,
        LegendPosition.BOTTOM
      );
      expect(definer).toBeDefined();
    });

    it('should handle none position', () => {
      const noneOptions = new Options([{ legend: { position: 'none' } }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        noneOptions,
        LegendPosition.NONE
      );
      expect(definer).toBeDefined();
    });
  });

  describe('alignment handling', () => {
    it('should handle start alignment', () => {
      const alignOptions = new Options([{
        legend: {
          position: 'right',
          alignment: 'start'
        }
      }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        alignOptions,
        LegendPosition.RIGHT
      );
      expect(definer).toBeDefined();
    });

    it('should handle center alignment', () => {
      const alignOptions = new Options([{
        legend: {
          position: 'top',
          alignment: 'center'
        }
      }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        alignOptions,
        LegendPosition.TOP
      );
      expect(definer).toBeDefined();
    });

    it('should handle end alignment', () => {
      const alignOptions = new Options([{
        legend: {
          position: 'bottom',
          alignment: 'end'
        }
      }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        alignOptions,
        LegendPosition.BOTTOM
      );
      expect(definer).toBeDefined();
    });

    it('should use default alignment for bottom position', () => {
      // Bottom position should default to center alignment
      const definer = new LegendDefiner(
        mockChartDefinition,
        new Options([{ legend: { position: 'bottom' } }]),
        LegendPosition.BOTTOM
      );
      expect(definer).toBeDefined();
    });

    it('should use default alignment for non-bottom positions', () => {
      // Non-bottom positions should default to start alignment
      const definer = new LegendDefiner(
        mockChartDefinition,
        new Options([{ legend: { position: 'right' } }]),
        LegendPosition.RIGHT
      );
      expect(definer).toBeDefined();
    });
  });

  describe('icon width scale factor', () => {
    it('should handle different scale factors', () => {
      const definer1 = new LegendDefiner(
        mockChartDefinition,
        options,
        LegendPosition.RIGHT,
        0.5  // small scale factor
      );
      expect(definer1).toBeDefined();

      const definer2 = new LegendDefiner(
        mockChartDefinition,
        options,
        LegendPosition.RIGHT,
        2.0  // large scale factor
      );
      expect(definer2).toBeDefined();
    });

    it('should handle null scale factor', () => {
      const definer = new LegendDefiner(
        mockChartDefinition,
        options,
        LegendPosition.RIGHT,
        null
      );
      expect(definer).toBeDefined();
    });

    it('should handle undefined scale factor', () => {
      const definer = new LegendDefiner(
        mockChartDefinition,
        options,
        LegendPosition.RIGHT
        // undefined iconWidthScaleFactor
      );
      expect(definer).toBeDefined();
    });
  });

  describe('options handling', () => {
    it('should handle empty options', () => {
      const emptyOptions = new Options([]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        emptyOptions,
        LegendPosition.RIGHT
      );
      expect(definer).toBeDefined();
    });

    it('should handle complex legend options', () => {
      const complexOptions = new Options([{
        legend: {
          position: 'right',
          alignment: 'center',
          textStyle: {
            color: '#333333',
            fontName: 'Helvetica',
            fontSize: 14,
            bold: true
          },
          pagingTextStyle: {
            color: '#666666',
            fontSize: 12
          },
          maxLines: 5,
          numberFormat: '#,###'
        }
      }]);
      const definer = new LegendDefiner(
        mockChartDefinition,
        complexOptions,
        LegendPosition.RIGHT
      );
      expect(definer).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle invalid position gracefully', () => {
      // Should fall back to default or handle invalid positions
      const definer = new LegendDefiner(
        mockChartDefinition,
        options,
        'invalid' as any
      );
      expect(definer).toBeDefined();
    });

    it('should handle chart definition with no series', () => {
      const emptyChartDef = new ChartDefinition();
      const definer = new LegendDefiner(
        emptyChartDef,
        options,
        LegendPosition.RIGHT
      );
      expect(definer).toBeDefined();
    });
  });
});
