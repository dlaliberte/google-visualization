import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NumberFormat, PRESET_FORMAT } from './numberformat';
import { DataTable } from '../data/datatable';

describe('NumberFormat', () => {
  let numberFormat: NumberFormat;

  beforeEach(() => {
    numberFormat = new NumberFormat();
  });

  describe('constructor', () => {
    it('should create NumberFormat with default options', () => {
      const formatter = new NumberFormat();
      expect(formatter).toBeInstanceOf(NumberFormat);
    });

    it('should create NumberFormat with custom options', () => {
      const options = {
        fractionDigits: 3,
        prefix: '$',
        suffix: '%',
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeParens: true,
        negativeColor: 'red',
        scaleFactor: 100
      };
      const formatter = new NumberFormat(options);
      expect(formatter).toBeInstanceOf(NumberFormat);
    });

    it('should handle null options', () => {
      const formatter = new NumberFormat(null);
      expect(formatter).toBeInstanceOf(NumberFormat);
    });

    it('should handle undefined options', () => {
      const formatter = new NumberFormat(undefined);
      expect(formatter).toBeInstanceOf(NumberFormat);
    });

    it('should throw error for invalid scale factor', () => {
      expect(() => new NumberFormat({ scaleFactor: 0 })).toThrow('Scale factor must be a positive number.');
      expect(() => new NumberFormat({ scaleFactor: -1 })).toThrow('Scale factor must be a positive number.');
    });

    it('should handle NaN fractionDigits', () => {
      const formatter = new NumberFormat({ fractionDigits: NaN });
      expect(formatter).toBeInstanceOf(NumberFormat);
    });

    it('should handle preset patterns', () => {
      const formatter = new NumberFormat({ pattern: 'decimal' });
      expect(formatter).toBeInstanceOf(NumberFormat);
    });
  });

  describe('formatValue', () => {
    it('should format positive numbers with default settings', () => {
      const result = numberFormat.formatValue(1234.56);
      expect(result).toBe('1,234.56');
    });

    it('should format negative numbers with default settings', () => {
      const result = numberFormat.formatValue(-1234.56);
      expect(result).toBe('-1,234.56');
    });

    it('should format zero', () => {
      const result = numberFormat.formatValue(0);
      expect(result).toBe('0.00');
    });

    it('should format very small numbers', () => {
      const result = numberFormat.formatValue(0.001);
      expect(result).toBe('0.00');
    });

    it('should format very large numbers', () => {
      const result = numberFormat.formatValue(1234567890.123);
      expect(result).toBe('1,234,567,890.12');
    });

    it('should handle Infinity', () => {
      const result = numberFormat.formatValue(Infinity);
      expect(typeof result).toBe('string');
    });

    it('should handle -Infinity', () => {
      const result = numberFormat.formatValue(-Infinity);
      expect(typeof result).toBe('string');
    });

    it('should handle NaN', () => {
      const result = numberFormat.formatValue(NaN);
      expect(typeof result).toBe('string');
    });
  });

  describe('formatValue with custom options', () => {
    it('should format with custom fraction digits', () => {
      const formatter = new NumberFormat({ fractionDigits: 4 });
      const result = formatter.formatValue(123.456);
      expect(result).toBe('123.4560');
    });

    it('should format with zero fraction digits', () => {
      const formatter = new NumberFormat({ fractionDigits: 0 });
      const result = formatter.formatValue(123.456);
      expect(result).toBe('123');
    });

    it('should format with custom prefix', () => {
      const formatter = new NumberFormat({ prefix: '$' });
      const result = formatter.formatValue(123.45);
      expect(result).toBe('$123.45');
    });

    it('should format with custom suffix', () => {
      const formatter = new NumberFormat({ suffix: '%' });
      const result = formatter.formatValue(123.45);
      expect(result).toBe('123.45%');
    });

    it('should format with both prefix and suffix', () => {
      const formatter = new NumberFormat({ prefix: '$', suffix: ' USD' });
      const result = formatter.formatValue(123.45);
      expect(result).toBe('$123.45 USD');
    });

    it('should format with custom decimal symbol', () => {
      const formatter = new NumberFormat({ decimalSymbol: ',' });
      const result = formatter.formatValue(123.45);
      expect(result).toBe('123,45');
    });

    it('should format with custom grouping symbol', () => {
      const formatter = new NumberFormat({ groupingSymbol: '.' });
      const result = formatter.formatValue(1234.56);
      expect(result).toBe('1.234.56');
    });

    it('should format with no grouping symbol', () => {
      const formatter = new NumberFormat({ groupingSymbol: '' });
      const result = formatter.formatValue(1234.56);
      expect(result).toBe('1234.56');
    });

    it('should format with negative parentheses', () => {
      const formatter = new NumberFormat({ negativeParens: true });
      const result = formatter.formatValue(-123.45);
      expect(result).toBe('(123.45)');
    });

    it('should format with scale factor', () => {
      const formatter = new NumberFormat({ scaleFactor: 100 });
      const result = formatter.formatValue(123.45);
      expect(result).toBe('1.23');
    });

    it('should format with scale factor and suffix for percentage', () => {
      const formatter = new NumberFormat({ scaleFactor: 0.01, suffix: '%' });
      const result = formatter.formatValue(0.1234);
      expect(result).toBe('12.34%');
    });
  });

  describe('formatValue with NaN fractionDigits', () => {
    it('should return string representation when fractionDigits is NaN', () => {
      const formatter = new NumberFormat({ fractionDigits: NaN });
      const result = formatter.formatValue(123.456);
      expect(result).toBe('123.456');
    });
  });

  describe('format DataTable', () => {
    let dataTable: DataTable;

    beforeEach(() => {
      dataTable = new DataTable();
      dataTable.addColumn('number', 'Values');
      dataTable.addColumn('string', 'Labels');
      dataTable.addRows([
        [123.456, 'A'],
        [-789.012, 'B'],
        [0, 'C'],
        [null, 'D']
      ]);
    });

    it('should format number column in DataTable', () => {
      const formatter = new NumberFormat({ fractionDigits: 1 });
      formatter.format(dataTable, 0);

      expect(dataTable.getFormattedValue(0, 0)).toBe('123.5');
      expect(dataTable.getFormattedValue(1, 0)).toBe('-789.0');
      expect(dataTable.getFormattedValue(2, 0)).toBe('0.0');
      expect(dataTable.getFormattedValue(3, 0)).toBeNull();
    });

    it('should not format non-number columns', () => {
      const formatter = new NumberFormat();
      formatter.format(dataTable, 1); // String column

      expect(dataTable.getFormattedValue(0, 1)).toBeNull();
      expect(dataTable.getFormattedValue(1, 1)).toBeNull();
    });

    it('should apply negative color styling', () => {
      const formatter = new NumberFormat({ negativeColor: 'red' });
      formatter.format(dataTable, 0);

      const negativeRowStyle = dataTable.getProperty(1, 0, 'style');
      expect(negativeRowStyle).toBe('color:red;');

      const positiveRowStyle = dataTable.getProperty(0, 0, 'style');
      expect(positiveRowStyle).toBeNull();
    });

    it('should not apply styling when negativeColor is not set', () => {
      const formatter = new NumberFormat();
      formatter.format(dataTable, 0);

      const negativeRowStyle = dataTable.getProperty(1, 0, 'style');
      expect(negativeRowStyle).toBeNull();
    });
  });

  describe('getNumDecimalsPattern', () => {
    it('should create pattern with minimum and maximum decimals', () => {
      const pattern = NumberFormat.getNumDecimalsPattern(2, 4);
      expect(pattern).toContain('00##');
    });

    it('should create pattern with same min and max decimals', () => {
      const pattern = NumberFormat.getNumDecimalsPattern(3, 3);
      expect(pattern).toContain('000');
    });

    it('should handle zero minimum decimals', () => {
      const pattern = NumberFormat.getNumDecimalsPattern(0, 2);
      expect(pattern).toContain('##');
    });

    it('should handle negative minimum decimals', () => {
      const pattern = NumberFormat.getNumDecimalsPattern(-1, 2);
      expect(pattern).not.toContain('.');
    });

    it('should handle zero maximum decimals', () => {
      const pattern = NumberFormat.getNumDecimalsPattern(0, 0);
      expect(pattern).not.toContain('.');
    });

    it('should swap min and max when min > max', () => {
      const pattern1 = NumberFormat.getNumDecimalsPattern(4, 2);
      const pattern2 = NumberFormat.getNumDecimalsPattern(2, 4);
      expect(pattern1).toBe(pattern2);
    });
  });

  describe('applyPrefixAndSuffix', () => {
    it('should apply prefix and suffix to value', () => {
      const formatter = new NumberFormat({ prefix: '$', suffix: ' USD' });
      const result = formatter.applyPrefixAndSuffix('123.45');
      expect(result).toBe('$123.45 USD');
    });

    it('should handle empty prefix and suffix', () => {
      const formatter = new NumberFormat();
      const result = formatter.applyPrefixAndSuffix('123.45');
      expect(result).toBe('123.45');
    });

    it('should handle only prefix', () => {
      const formatter = new NumberFormat({ prefix: '$' });
      const result = formatter.applyPrefixAndSuffix('123.45');
      expect(result).toBe('$123.45');
    });

    it('should handle only suffix', () => {
      const formatter = new NumberFormat({ suffix: '%' });
      const result = formatter.applyPrefixAndSuffix('123.45');
      expect(result).toBe('123.45%');
    });
  });

  describe('createFormatter', () => {
    it('should create formatter for number column type', () => {
      const formatter = numberFormat.createFormatter('number' as any);
      expect(formatter).toBeDefined();
      expect(typeof formatter.format).toBe('function');
    });

    it('should format values using created formatter', () => {
      const formatter = numberFormat.createFormatter('number' as any);
      const result = formatter.format(123.456, null);
      expect(result).toBe('123.46');
    });

    it('should handle null values in created formatter', () => {
      const formatter = numberFormat.createFormatter('number' as any);
      const result = formatter.format(null, null);
      expect(result).toBeNull();
    });

    it('should handle undefined values in created formatter', () => {
      const formatter = numberFormat.createFormatter('number' as any);
      const result = formatter.format(undefined, null);
      expect(result).toBeNull();
    });
  });

  describe('getValueType', () => {
    it('should return number for number column type', () => {
      const result = numberFormat.getValueType('number' as any);
      expect(result).toBe('number');
    });

    it('should return null for non-number column types', () => {
      expect(numberFormat.getValueType('string' as any)).toBeNull();
      expect(numberFormat.getValueType('date' as any)).toBeNull();
      expect(numberFormat.getValueType('boolean' as any)).toBeNull();
      expect(numberFormat.getValueType(null)).toBeNull();
    });
  });

  describe('static methods', () => {
    it('should have correct decimal separator', () => {
      expect(typeof NumberFormat.DECIMAL_SEP).toBe('string');
    });

    it('should have correct group separator', () => {
      expect(typeof NumberFormat.GROUP_SEP).toBe('string');
    });

    it('should have correct decimal pattern', () => {
      expect(typeof NumberFormat.DECIMAL_PATTERN).toBe('string');
    });

    it('should set native characters flag', () => {
      NumberFormat.useNativeCharactersIfAvailable(true);
      NumberFormat.useNativeCharactersIfAvailable(false);
      // Just testing that the method doesn't throw
    });
  });

  describe('PRESET_FORMAT', () => {
    it('should contain expected preset formats', () => {
      expect(PRESET_FORMAT).toHaveProperty('decimal');
      expect(PRESET_FORMAT).toHaveProperty('scientific');
      expect(PRESET_FORMAT).toHaveProperty('percent');
      expect(PRESET_FORMAT).toHaveProperty('currency');
      expect(PRESET_FORMAT).toHaveProperty('short');
      expect(PRESET_FORMAT).toHaveProperty('long');
    });

    it('should have valid preset format values', () => {
      Object.values(PRESET_FORMAT).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle very large numbers without grouping', () => {
      const formatter = new NumberFormat({ groupingSymbol: '' });
      const result = formatter.formatValue(1234567890123456);
      expect(result).toContain('1234567890123456');
    });

    it('should handle very small decimal numbers', () => {
      const formatter = new NumberFormat({ fractionDigits: 10 });
      const result = formatter.formatValue(0.0000000001);
      expect(result).toBe('0.0000000001');
    });

    it('should handle numbers with many decimal places', () => {
      const formatter = new NumberFormat({ fractionDigits: 8 });
      const result = formatter.formatValue(123.123456789);
      expect(result).toBe('123.12345679'); // Rounded
    });

    it('should handle negative zero', () => {
      const result = numberFormat.formatValue(-0);
      expect(result).toBe('0.00');
    });

    it('should handle numbers close to zero', () => {
      const result = numberFormat.formatValue(0.000001);
      expect(result).toBe('0.00');
    });

    it('should handle maximum safe integer', () => {
      const result = numberFormat.formatValue(Number.MAX_SAFE_INTEGER);
      expect(typeof result).toBe('string');
      expect(result).toContain(',');
    });

    it('should handle minimum safe integer', () => {
      const result = numberFormat.formatValue(Number.MIN_SAFE_INTEGER);
      expect(typeof result).toBe('string');
      expect(result).toContain('-');
    });
  });

  describe('complex formatting scenarios', () => {
    it('should format currency-like values', () => {
      const formatter = new NumberFormat({
        prefix: '$',
        fractionDigits: 2,
        groupingSymbol: ',',
        negativeParens: true,
        negativeColor: 'red'
      });

      expect(formatter.formatValue(1234.56)).toBe('$1,234.56');
      expect(formatter.formatValue(-1234.56)).toBe('$(1,234.56)');
    });

    it('should format percentage-like values', () => {
      const formatter = new NumberFormat({
        suffix: '%',
        scaleFactor: 0.01,
        fractionDigits: 1
      });

      expect(formatter.formatValue(0.1234)).toBe('12.3%');
      expect(formatter.formatValue(1.0)).toBe('100.0%');
    });

    it('should format scientific notation style', () => {
      const formatter = new NumberFormat({
        fractionDigits: 2,
        groupingSymbol: ''
      });

      expect(formatter.formatValue(1234567)).toBe('1234567.00');
    });

    it('should format with European-style separators', () => {
      const formatter = new NumberFormat({
        decimalSymbol: ',',
        groupingSymbol: '.',
        fractionDigits: 2
      });

      expect(formatter.formatValue(1234.56)).toBe('1.234,56');
    });
  });

  describe('error handling', () => {
    it('should handle invalid input gracefully', () => {
      expect(() => numberFormat.formatValue('invalid' as any)).not.toThrow();
    });

    it('should handle object input', () => {
      expect(() => numberFormat.formatValue({} as any)).not.toThrow();
    });

    it('should handle array input', () => {
      expect(() => numberFormat.formatValue([] as any)).not.toThrow();
    });

    it('should handle boolean input', () => {
      expect(() => numberFormat.formatValue(true as any)).not.toThrow();
      expect(() => numberFormat.formatValue(false as any)).not.toThrow();
    });
  });
});
