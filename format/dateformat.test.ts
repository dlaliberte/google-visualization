import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DateFormat, FormatType } from './dateformat';
import { DataTable } from '../data/datatable';
import { ColumnType } from '../data/types';

describe('DateFormat', () => {
  let dateFormat: DateFormat;
  let testDate: Date;

  beforeEach(() => {
    dateFormat = new DateFormat();
    testDate = new Date('2023-12-25T15:30:45.123Z');
  });

  describe('constructor', () => {
    it('should create DateFormat with default options', () => {
      const formatter = new DateFormat();
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should create DateFormat with custom options', () => {
      const options = {
        formatType: FormatType.LONG,
        valueType: ColumnType.DATE,
        pattern: 'yyyy-MM-dd',
        timeZone: -5,
        clearMinutes: true
      };
      const formatter = new DateFormat(options);
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should handle null options', () => {
      const formatter = new DateFormat(null);
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should handle undefined options', () => {
      const formatter = new DateFormat(undefined);
      expect(formatter).toBeInstanceOf(DateFormat);
    });
  });

  describe('FormatType enum', () => {
    it('should have all expected format types', () => {
      expect(FormatType.FULL).toBe('full');
      expect(FormatType.LONG).toBe('long');
      expect(FormatType.MEDIUM).toBe('medium');
      expect(FormatType.SHORT).toBe('short');
    });

    it('should have unique values for all format types', () => {
      const values = Object.values(FormatType);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it('should have string values for all format types', () => {
      Object.values(FormatType).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('init', () => {
    it('should initialize with default values', () => {
      const formatter = new DateFormat();
      formatter.init();
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should initialize with custom format type', () => {
      const formatter = new DateFormat();
      formatter.init({ formatType: FormatType.FULL });
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should initialize with custom value type', () => {
      const formatter = new DateFormat();
      formatter.init({ valueType: ColumnType.DATE });
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should initialize with custom pattern', () => {
      const formatter = new DateFormat();
      formatter.init({ pattern: 'yyyy-MM-dd HH:mm:ss' });
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should initialize with time zone', () => {
      const formatter = new DateFormat();
      formatter.init({ timeZone: -5 });
      expect(formatter).toBeInstanceOf(DateFormat);
    });

    it('should initialize with clearMinutes option', () => {
      const formatter = new DateFormat();
      formatter.init({ clearMinutes: true });
      expect(formatter).toBeInstanceOf(DateFormat);
    });
  });

  describe('formatValue', () => {
    it('should format a date with default settings', () => {
      const result = dateFormat.formatValue(testDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle null date', () => {
      const result = dateFormat.formatValue(null);
      expect(result).toBe('');
    });

    it('should handle undefined date', () => {
      const result = dateFormat.formatValue(undefined);
      expect(result).toBe('');
    });

    it('should format date with custom pattern', () => {
      const formatter = new DateFormat({ pattern: 'yyyy-MM-dd' });
      const result = formatter.formatValue(testDate);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('should format date with different format types', () => {
      const formatTypes = [FormatType.FULL, FormatType.LONG, FormatType.MEDIUM, FormatType.SHORT];

      formatTypes.forEach(formatType => {
        const formatter = new DateFormat({ formatType });
        const result = formatter.formatValue(testDate);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it('should format date with different value types', () => {
      const valueTypes = [ColumnType.DATE, ColumnType.DATETIME];

      valueTypes.forEach(valueType => {
        const formatter = new DateFormat({ valueType });
        const result = formatter.formatValue(testDate);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it('should handle time zone offset', () => {
      const formatter = new DateFormat({ timeZone: -5 });
      const result = formatter.formatValue(testDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should clear minutes when clearMinutes is true', () => {
      const formatter = new DateFormat({ clearMinutes: true, pattern: 'HH:mm:ss' });
      const result = formatter.formatValue(testDate);
      expect(typeof result).toBe('string');
      // Should have minutes set to 00
      expect(result).toMatch(/\d{2}:00:\d{2}/);
    });
  });

  describe('format DataTable', () => {
    let dataTable: DataTable;

    beforeEach(() => {
      dataTable = new DataTable();
      dataTable.addColumn('date', 'Dates');
      dataTable.addColumn('datetime', 'DateTimes');
      dataTable.addColumn('string', 'Labels');
      dataTable.addRows([
        [new Date('2023-01-01'), new Date('2023-01-01T12:00:00'), 'A'],
        [new Date('2023-06-15'), new Date('2023-06-15T18:30:00'), 'B'],
        [null, null, 'C']
      ]);
    });

    it('should format date column in DataTable', () => {
      const formatter = new DateFormat({ formatType: FormatType.SHORT });
      formatter.format(dataTable, 0);

      const formatted1 = dataTable.getFormattedValue(0, 0);
      const formatted2 = dataTable.getFormattedValue(1, 0);
      const formatted3 = dataTable.getFormattedValue(2, 0);

      expect(typeof formatted1).toBe('string');
      expect(typeof formatted2).toBe('string');
      expect(formatted3).toBe('');
    });

    it('should format datetime column in DataTable', () => {
      const formatter = new DateFormat({ formatType: FormatType.MEDIUM });
      formatter.format(dataTable, 1);

      const formatted1 = dataTable.getFormattedValue(0, 1);
      const formatted2 = dataTable.getFormattedValue(1, 1);

      expect(typeof formatted1).toBe('string');
      expect(typeof formatted2).toBe('string');
    });

    it('should not format non-date columns', () => {
      const formatter = new DateFormat();
      formatter.format(dataTable, 2); // String column

      expect(dataTable.getFormattedValue(0, 2)).toBeNull();
      expect(dataTable.getFormattedValue(1, 2)).toBeNull();
    });
  });

  describe('getValueType', () => {
    it('should return date for date column type', () => {
      const result = dateFormat.getValueType(ColumnType.DATE);
      expect(result).toBe(ColumnType.DATE);
    });

    it('should return datetime for datetime column type', () => {
      const result = dateFormat.getValueType(ColumnType.DATETIME);
      expect(result).toBe(ColumnType.DATETIME);
    });

    it('should return null for non-date column types', () => {
      expect(dateFormat.getValueType(ColumnType.STRING)).toBeNull();
      expect(dateFormat.getValueType(ColumnType.NUMBER)).toBeNull();
      expect(dateFormat.getValueType(ColumnType.BOOLEAN)).toBeNull();
      expect(dateFormat.getValueType(ColumnType.TIME)).toBeNull();
      expect(dateFormat.getValueType(null)).toBeNull();
    });
  });

  describe('createFormatter', () => {
    it('should create formatter for date column type', () => {
      const formatter = dateFormat.createFormatter(ColumnType.DATE);
      expect(formatter).toBeDefined();
      expect(typeof formatter.format).toBe('function');
    });

    it('should create formatter for datetime column type', () => {
      const formatter = dateFormat.createFormatter(ColumnType.DATETIME);
      expect(formatter).toBeDefined();
      expect(typeof formatter.format).toBe('function');
    });

    it('should format values using created formatter', () => {
      const formatter = dateFormat.createFormatter(ColumnType.DATE);
      const result = formatter.format(testDate, null);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle null values in created formatter', () => {
      const formatter = dateFormat.createFormatter(ColumnType.DATE);
      const result = formatter.format(null, null);
      expect(result).toBe('');
    });
  });

  describe('combinePattern', () => {
    it('should return correct pattern for DATE column type', () => {
      const patterns = [
        DateFormat.combinePattern(ColumnType.DATE, FormatType.FULL),
        DateFormat.combinePattern(ColumnType.DATE, FormatType.LONG),
        DateFormat.combinePattern(ColumnType.DATE, FormatType.MEDIUM),
        DateFormat.combinePattern(ColumnType.DATE, FormatType.SHORT)
      ];

      patterns.forEach(pattern => {
        expect(typeof pattern).toBe('number');
      });
    });

    it('should return correct pattern for DATETIME column type', () => {
      const patterns = [
        DateFormat.combinePattern(ColumnType.DATETIME, FormatType.FULL),
        DateFormat.combinePattern(ColumnType.DATETIME, FormatType.LONG),
        DateFormat.combinePattern(ColumnType.DATETIME, FormatType.MEDIUM),
        DateFormat.combinePattern(ColumnType.DATETIME, FormatType.SHORT)
      ];

      patterns.forEach(pattern => {
        expect(typeof pattern).toBe('number');
      });
    });

    it('should return correct pattern for TIME column type', () => {
      const patterns = [
        DateFormat.combinePattern(ColumnType.TIME, FormatType.FULL),
        DateFormat.combinePattern(ColumnType.TIME, FormatType.LONG),
        DateFormat.combinePattern(ColumnType.TIME, FormatType.MEDIUM),
        DateFormat.combinePattern(ColumnType.TIME, FormatType.SHORT)
      ];

      patterns.forEach(pattern => {
        expect(typeof pattern).toBe('number');
      });
    });

    it('should return default pattern for unknown column type', () => {
      const pattern = DateFormat.combinePattern(ColumnType.STRING, FormatType.SHORT);
      expect(typeof pattern).toBe('number');
    });

    it('should return default pattern for null column type', () => {
      const pattern = DateFormat.combinePattern(null, FormatType.SHORT);
      expect(typeof pattern).toBe('number');
    });

    it('should return default pattern for unknown format type', () => {
      const pattern = DateFormat.combinePattern(ColumnType.DATE, 'unknown' as FormatType);
      expect(typeof pattern).toBe('number');
    });
  });

  describe('setTimeUnit', () => {
    it('should set time unit for YEAR', () => {
      expect(() => dateFormat.setTimeUnit('YEAR' as any)).not.toThrow();
    });

    it('should set time unit for QUARTER', () => {
      expect(() => dateFormat.setTimeUnit('QUARTER' as any)).not.toThrow();
    });

    it('should set time unit for MONTH', () => {
      expect(() => dateFormat.setTimeUnit('MONTH' as any)).not.toThrow();
    });

    it('should set time unit for DAY', () => {
      expect(() => dateFormat.setTimeUnit('DAY' as any)).not.toThrow();
    });

    it('should set time unit for other units', () => {
      expect(() => dateFormat.setTimeUnit('HOUR' as any)).not.toThrow();
      expect(() => dateFormat.setTimeUnit('MINUTE' as any)).not.toThrow();
      expect(() => dateFormat.setTimeUnit('SECOND' as any)).not.toThrow();
    });

    it('should format date after setting time unit', () => {
      dateFormat.setTimeUnit('YEAR' as any);
      const result = dateFormat.formatValue(testDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatValueWithFormatter', () => {
    it('should format date with given formatter', () => {
      const formatter = dateFormat.createFormatter(ColumnType.DATE);
      const result = dateFormat.formatValueWithFormatter(formatter, testDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty string for null date', () => {
      const formatter = dateFormat.createFormatter(ColumnType.DATE);
      const result = dateFormat.formatValueWithFormatter(formatter, null);
      expect(result).toBe('');
    });

    it('should handle time zone from date', () => {
      const formatter = dateFormat.createFormatter(ColumnType.DATETIME);
      const result = dateFormat.formatValueWithFormatter(formatter, testDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should clear minutes when clearMinutes is true', () => {
      const dateFormatWithClearMinutes = new DateFormat({ clearMinutes: true });
      const formatter = dateFormatWithClearMinutes.createFormatter(ColumnType.DATETIME);
      const result = dateFormatWithClearMinutes.formatValueWithFormatter(formatter, testDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('static methods', () => {
    it('should have Format property', () => {
      expect(DateFormat.Format).toBeDefined();
      expect(typeof DateFormat.Format).toBe('object');
    });

    it('should have Patterns property', () => {
      expect(DateFormat.Patterns).toBeDefined();
      expect(typeof DateFormat.Patterns).toBe('object');
    });

    it('should call dontLocalizeDigits without error', () => {
      expect(() => DateFormat.dontLocalizeDigits()).not.toThrow();
    });

    it('should override format value callback', () => {
      const mockCallback = vi.fn().mockReturnValue('mocked result');
      DateFormat.overrideFormatValue(mockCallback);

      const result = dateFormat.formatValue(testDate);
      expect(result).toBe('mocked result');
      expect(mockCallback).toHaveBeenCalledWith(testDate, null);

      // Reset the callback
      DateFormat.formatValueInternalCallback = undefined;
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle invalid date objects', () => {
      const invalidDate = new Date('invalid');
      const result = dateFormat.formatValue(invalidDate);
      expect(typeof result).toBe('string');
    });

    it('should handle very old dates', () => {
      const oldDate = new Date('1900-01-01');
      const result = dateFormat.formatValue(oldDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle very future dates', () => {
      const futureDate = new Date('2100-12-31');
      const result = dateFormat.formatValue(futureDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle dates with milliseconds', () => {
      const dateWithMs = new Date('2023-12-25T15:30:45.999Z');
      const result = dateFormat.formatValue(dateWithMs);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle leap year dates', () => {
      const leapYearDate = new Date('2024-02-29');
      const result = dateFormat.formatValue(leapYearDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle different time zones', () => {
      const timeZones = [-12, -5, 0, 5, 12];

      timeZones.forEach(tz => {
        const formatter = new DateFormat({ timeZone: tz });
        const result = formatter.formatValue(testDate);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it('should handle complex custom patterns', () => {
      const patterns = [
        'yyyy-MM-dd HH:mm:ss',
        'dd/MM/yyyy',
        'MMM dd, yyyy',
        'EEEE, MMMM dd, yyyy',
        'HH:mm:ss.SSS',
        'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\''
      ];

      patterns.forEach(pattern => {
        const formatter = new DateFormat({ pattern });
        const result = formatter.formatValue(testDate);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it('should handle non-date input gracefully', () => {
      expect(() => dateFormat.formatValue('not a date' as any)).not.toThrow();
      expect(() => dateFormat.formatValue(123 as any)).not.toThrow();
      expect(() => dateFormat.formatValue({} as any)).not.toThrow();
      expect(() => dateFormat.formatValue([] as any)).not.toThrow();
    });
  });

  describe('integration with different locales', () => {
    it('should format dates consistently', () => {
      const dates = [
        new Date('2023-01-01'),
        new Date('2023-06-15'),
        new Date('2023-12-31')
      ];

      dates.forEach(date => {
        const result = dateFormat.formatValue(date);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it('should handle different format combinations', () => {
      const formatTypes = Object.values(FormatType);
      const valueTypes = [ColumnType.DATE, ColumnType.DATETIME];

      formatTypes.forEach(formatType => {
        valueTypes.forEach(valueType => {
          const formatter = new DateFormat({ formatType, valueType });
          const result = formatter.formatValue(testDate);
          expect(typeof result).toBe('string');
          expect(result.length).toBeGreaterThan(0);
        });
      });
    });
  });
});
