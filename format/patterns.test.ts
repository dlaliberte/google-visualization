import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  applyPatternOptions,
  canApplyPatterns,
  setAxisFormat,
  normalizePattern
} from './patterns';
import { AbstractDataTable } from '../data/abstract_datatable';
import { ColumnType } from '../data/types';
import { UserOptions } from '../common/options';

// Mock data table for testing
class MockDataTable {
  constructor(
    private columns: Array<{ type: ColumnType; pattern?: string | null }> = [],
  ) {}

  getNumberOfColumns(): number {
    return this.columns.length;
  }

  getColumnType(index: number): ColumnType {
    return this.columns[index]?.type || ColumnType.STRING;
  }

  getColumnPattern(index: number): string | null {
    return this.columns[index]?.pattern || null;
  }
}

describe('patterns', () => {
  let mockDataTable: MockDataTable;

  beforeEach(() => {
    mockDataTable = new MockDataTable([
      { type: ColumnType.STRING },
      { type: ColumnType.NUMBER, pattern: '#,###' },
      { type: ColumnType.NUMBER, pattern: '0.00%' }
    ]);
  });

  describe('normalizePattern', () => {
    it('should return null for null input', () => {
      expect(normalizePattern(null)).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(normalizePattern('')).toBeNull();
    });

    it('should return null for whitespace-only string', () => {
      expect(normalizePattern('   ')).toBeNull();
    });

    it('should replace digits with zeros', () => {
      expect(normalizePattern('1,234.56')).toBe('0,000.00');
      expect(normalizePattern('9999')).toBe('0000');
      expect(normalizePattern('#,###.##')).toBe('#,###.##');
    });

    it('should limit hash patterns to 10 digits', () => {
      const longHashPattern = '#############'; // 13 hashes
      expect(normalizePattern(longHashPattern)).toBe('##########'); // 10 hashes
    });

    it('should handle mixed patterns with digits and hashes', () => {
      expect(normalizePattern('#,##1.23#')).toBe('#,##0.00#');
      expect(normalizePattern('999.##')).toBe('000.##');
    });

    it('should handle percentage patterns', () => {
      expect(normalizePattern('0.12%')).toBe('0.00%');
      expect(normalizePattern('#.##%')).toBe('#.##%');
    });

    it('should handle currency patterns', () => {
      expect(normalizePattern('$1,234.56')).toBe('$0,000.00');
      expect(normalizePattern('€#,###.##')).toBe('€#,###.##');
    });

    it('should handle scientific notation patterns', () => {
      expect(normalizePattern('1.23E4')).toBe('0.00E0');
      expect(normalizePattern('#.##E0')).toBe('#.##E0');
    });
  });

  describe('canApplyPatterns', () => {
    it('should return true for empty options', () => {
      expect(canApplyPatterns({})).toBe(true);
    });

    it('should return false when useFormatFromData is explicitly false', () => {
      expect(canApplyPatterns({ useFormatFromData: false })).toBe(false);
    });

    it('should return true when useFormatFromData is true', () => {
      expect(canApplyPatterns({ useFormatFromData: true })).toBe(true);
    });

    it('should return true when useFormatFromData is undefined', () => {
      expect(canApplyPatterns({ useFormatFromData: undefined })).toBe(true);
    });

    it('should return false when vAxis.format is set', () => {
      // Mock goog.getObjectByName to simulate existing format
      const originalGoog = (globalThis as any).goog;
      (globalThis as any).goog = {
        getObjectByName: (path: string, obj: any) => {
          if (path === 'vAxis.format') return 'existing-format';
          return null;
        }
      };

      expect(canApplyPatterns({})).toBe(false);

      (globalThis as any).goog = originalGoog;
    });

    it('should return false when targetAxis.format is set', () => {
      const originalGoog = (globalThis as any).goog;
      (globalThis as any).goog = {
        getObjectByName: (path: string, obj: any) => {
          if (path === 'targetAxis.format') return 'existing-format';
          return null;
        }
      };

      expect(canApplyPatterns({})).toBe(false);

      (globalThis as any).goog = originalGoog;
    });

    it('should return false when targetAxes.0.format is set', () => {
      const originalGoog = (globalThis as any).goog;
      (globalThis as any).goog = {
        getObjectByName: (path: string, obj: any) => {
          if (path === 'targetAxes.0.format') return 'existing-format';
          return null;
        }
      };

      expect(canApplyPatterns({})).toBe(false);

      (globalThis as any).goog = originalGoog;
    });

    it('should return false when domainAxis.format is set', () => {
      const originalGoog = (globalThis as any).goog;
      (globalThis as any).goog = {
        getObjectByName: (path: string, obj: any) => {
          if (path === 'domainAxis.format') return 'existing-format';
          return null;
        }
      };

      expect(canApplyPatterns({})).toBe(false);

      (globalThis as any).goog = originalGoog;
    });

    it('should return true when no axis formats are set', () => {
      const originalGoog = (globalThis as any).goog;
      (globalThis as any).goog = {
        getObjectByName: () => null
      };

      expect(canApplyPatterns({})).toBe(true);

      (globalThis as any).goog = originalGoog;
    });
  });

  describe('setAxisFormat', () => {
    let axis: UserOptions;

    beforeEach(() => {
      axis = {};
    });

    it('should not set format when useFormatFromData is false', () => {
      axis.useFormatFromData = false;
      setAxisFormat(axis, ['#,###']);

      expect(axis.format).toBeUndefined();
    });

    it('should not set format when axis already has a format', () => {
      axis.format = 'existing-format';
      setAxisFormat(axis, ['#,###']);

      expect(axis.format).toBe('existing-format');
    });

    it('should not set format when axis has whitespace format', () => {
      axis.format = '   ';
      setAxisFormat(axis, ['#,###']);

      expect(axis.format).toBe('   ');
    });

    it('should set format when conditions are met', () => {
      setAxisFormat(axis, ['#,###']);

      expect(axis.format).toBe('#,###');
    });

    it('should not set format for multiple different patterns', () => {
      setAxisFormat(axis, ['#,###', '0.00%']);

      expect(axis.format).toBeUndefined();
    });

    it('should set format for multiple identical patterns', () => {
      setAxisFormat(axis, ['#,###', '#,###', '#,###']);

      expect(axis.format).toBe('#,###');
    });

    it('should ignore empty patterns', () => {
      setAxisFormat(axis, ['#,###', '', null, '   ']);

      expect(axis.format).toBe('#,###');
    });

    it('should not set format when all patterns are empty', () => {
      setAxisFormat(axis, ['', null, '   ']);

      expect(axis.format).toBeUndefined();
    });

    it('should normalize pattern when setting', () => {
      setAxisFormat(axis, ['1,234.56']);

      expect(axis.format).toBe('0,000.00');
    });

    it('should handle null patterns array', () => {
      setAxisFormat(axis, [null]);

      expect(axis.format).toBeUndefined();
    });

    it('should handle empty patterns array', () => {
      setAxisFormat(axis, []);

      expect(axis.format).toBeUndefined();
    });
  });

  describe('applyPatternOptions', () => {
    let options: UserOptions;
    const originalGoog = (globalThis as any).goog;

    beforeEach(() => {
      options = {};
      // Mock goog.getObjectByName to return null (no existing formats)
      (globalThis as any).goog = {
        getObjectByName: () => null
      };
    });

    afterEach(() => {
      (globalThis as any).goog = originalGoog;
    });

    it('should not apply patterns when canApplyPatterns returns false', () => {
      options.useFormatFromData = false;
      applyPatternOptions('LineChart', mockDataTable as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeUndefined();
      expect(options.hAxis).toBeUndefined();
    });

    it('should handle LineChart patterns', () => {
      applyPatternOptions('LineChart', mockDataTable as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      expect(options.hAxis).toBeDefined();
      expect((options.vAxes as any)[0].format).toBe('#,###');
    });

    it('should handle BarChart patterns (flipped axes)', () => {
      applyPatternOptions('BarChart', mockDataTable as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      expect(options.hAxis).toBeDefined();
      expect((options.hAxis as any).format).toBe('#,###');
    });

    it('should handle BubbleChart patterns', () => {
      const bubbleData = new MockDataTable([
        { type: ColumnType.STRING },
        { type: ColumnType.NUMBER, pattern: '#,###' },  // X axis
        { type: ColumnType.NUMBER, pattern: '0.00%' },  // Y axis
        { type: ColumnType.NUMBER, pattern: '#,##0' }   // Size
      ]);

      applyPatternOptions('BubbleChart', bubbleData as unknown as AbstractDataTable, options);

      expect(options.hAxis).toBeDefined();
      expect(options.vAxes).toBeDefined();
      expect((options.hAxis as any).format).toBe('#,###');
      expect((options.vAxes as any)[0].format).toBe('0.00%');
    });

    it('should handle BubbleChart with insufficient columns', () => {
      const insufficientData = new MockDataTable([
        { type: ColumnType.STRING },
        { type: ColumnType.NUMBER, pattern: '#,###' }
      ]);

      applyPatternOptions('BubbleChart', insufficientData as unknown as AbstractDataTable, options);

      // Should not crash or set any formats
      expect(options.hAxis).toBeUndefined();
      expect(options.vAxes).toBeUndefined();
    });

    it('should skip Histogram patterns', () => {
      applyPatternOptions('Histogram', mockDataTable as unknown as AbstractDataTable, options);

      // Histogram should return early without setting any formats
      expect(options.vAxes).toBeUndefined();
      expect(options.hAxis).toBeUndefined();
    });

    it('should handle continuous domain (non-string first column)', () => {
      const continuousData = new MockDataTable([
        { type: ColumnType.NUMBER, pattern: '0.00' },  // Continuous domain
        { type: ColumnType.NUMBER, pattern: '#,###' }
      ]);

      applyPatternOptions('LineChart', continuousData as unknown as AbstractDataTable, options);

      expect(options.hAxis).toBeDefined();
      expect((options.hAxis as any).format).toBe('0.00');
    });

    it('should handle continuous domain for BarChart', () => {
      const continuousData = new MockDataTable([
        { type: ColumnType.NUMBER, pattern: '0.00' },  // Continuous domain
        { type: ColumnType.NUMBER, pattern: '#,###' }
      ]);

      applyPatternOptions('BarChart', continuousData as unknown as AbstractDataTable, options);

      // For BarChart, continuous domain affects vAxis
      expect(options.vAxes).toBeDefined();
      expect((options.vAxes as any)[0].format).toBe('#,###'); // From data column
    });

    it('should preserve existing axis objects', () => {
      options.vAxes = [{ title: 'Existing VAxis' }, { title: 'Existing RAxis' }];
      options.hAxis = { title: 'Existing HAxis' };

      applyPatternOptions('LineChart', mockDataTable as unknown as AbstractDataTable, options);

      expect((options.vAxes as any)[0].title).toBe('Existing VAxis');
      expect((options.vAxes as any)[1].title).toBe('Existing RAxis');
      expect((options.hAxis as any).title).toBe('Existing HAxis');
    });

    it('should handle series with targetAxisIndex', () => {
      options.series = {
        1: { targetAxisIndex: 1 } // Second data column targets right axis
      };

      applyPatternOptions('LineChart', mockDataTable as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      expect((options.vAxes as any)[1].format).toBe('0.00%'); // Second column pattern
    });

    it('should handle empty data table', () => {
      const emptyData = new MockDataTable([]);

      applyPatternOptions('LineChart', emptyData as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      expect(options.hAxis).toBeDefined();
      // Should not crash with empty data
    });

    it('should handle data table with only string columns', () => {
      const stringOnlyData = new MockDataTable([
        { type: ColumnType.STRING },
        { type: ColumnType.STRING },
        { type: ColumnType.STRING }
      ]);

      applyPatternOptions('LineChart', stringOnlyData as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      expect(options.hAxis).toBeDefined();
      // No numeric columns means no patterns to apply
      expect((options.vAxes as any)[0].format).toBeUndefined();
    });

    it('should handle mixed column types', () => {
      const mixedData = new MockDataTable([
        { type: ColumnType.STRING },
        { type: ColumnType.NUMBER, pattern: '#,###' },
        { type: ColumnType.DATE, pattern: 'yyyy-MM-dd' },
        { type: ColumnType.NUMBER, pattern: '0.00%' },
        { type: ColumnType.BOOLEAN }
      ]);

      applyPatternOptions('LineChart', mixedData as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      // Should only apply patterns from number columns
      expect((options.vAxes as any)[0].format).toBe('#,###');
    });

    it('should handle null data table', () => {
      expect(() => {
        applyPatternOptions('LineChart', null as any, options);
      }).not.toThrow();

      // Should handle gracefully
    });
  });

  describe('integration scenarios', () => {
    const originalGoog = (globalThis as any).goog;

    beforeEach(() => {
      (globalThis as any).goog = {
        getObjectByName: () => null
      };
    });

    afterEach(() => {
      (globalThis as any).goog = originalGoog;
    });

    it('should handle complete chart configuration with patterns', () => {
      const chartData = new MockDataTable([
        { type: ColumnType.STRING },                    // Categories
        { type: ColumnType.NUMBER, pattern: '$#,##0' }, // Sales
        { type: ColumnType.NUMBER, pattern: '#,##0' },  // Units
        { type: ColumnType.NUMBER, pattern: '0.0%' }    // Growth rate
      ]);

      const options: UserOptions = {
        title: 'Sales Dashboard',
        series: {
          2: { targetAxisIndex: 1 } // Growth rate on right axis
        }
      };

      applyPatternOptions('LineChart', chartData as unknown as AbstractDataTable, options);

      expect(options.title).toBe('Sales Dashboard');
      expect(options.vAxes).toBeDefined();
      expect((options.vAxes as any)[0].format).toBe('$#,##0'); // Sales pattern
      expect((options.vAxes as any)[1].format).toBe('0.0%');   // Growth rate pattern
    });

    it('should respect user preference to disable pattern application', () => {
      const chartData = new MockDataTable([
        { type: ColumnType.STRING },
        { type: ColumnType.NUMBER, pattern: '$#,##0' }
      ]);

      const options: UserOptions = {
        useFormatFromData: false,
        title: 'User Controlled Chart'
      };

      applyPatternOptions('LineChart', chartData as unknown as AbstractDataTable, options);

      expect(options.title).toBe('User Controlled Chart');
      expect(options.vAxes).toBeUndefined();
      expect(options.hAxis).toBeUndefined();
    });

    it('should handle conflicting patterns gracefully', () => {
      const conflictingData = new MockDataTable([
        { type: ColumnType.STRING },
        { type: ColumnType.NUMBER, pattern: '$#,##0' },
        { type: ColumnType.NUMBER, pattern: '€#,##0' }  // Different currency
      ]);

      const options: UserOptions = {};

      applyPatternOptions('LineChart', conflictingData as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      // Should not set format due to conflicting patterns
      expect((options.vAxes as any)[0].format).toBeUndefined();
    });

    it('should normalize complex patterns consistently', () => {
      const complexData = new MockDataTable([
        { type: ColumnType.STRING },
        { type: ColumnType.NUMBER, pattern: '$1,234,567.89' }
      ]);

      const options: UserOptions = {};

      applyPatternOptions('LineChart', complexData as unknown as AbstractDataTable, options);

      expect(options.vAxes).toBeDefined();
      expect((options.vAxes as any)[0].format).toBe('$0,000,000.00');
    });
  });
});
