import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CsvToDataTable } from './csv_to_datatable';
import { DataTable } from './datatable';

// Mock the closure CSV parser
const mockGoogCsv = {
  parse: vi.fn()
};

vi.mock('@npm//@closure/labs/format/csv', () => ({
  default: mockGoogCsv,
  parse: mockGoogCsv.parse
}));

describe('CsvToDataTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create instance with basic parameters', () => {
      const csvImporter = new CsvToDataTable('data1,data2\n1,2', ['string', 'number']);

      expect(csvImporter).toBeInstanceOf(CsvToDataTable);
    });

    it('should handle header flag true', () => {
      const csvImporter = new CsvToDataTable('name,value\ntest,123', ['string', 'number'], true);

      expect(csvImporter).toBeInstanceOf(CsvToDataTable);
    });

    it('should handle header flag false', () => {
      const csvImporter = new CsvToDataTable('test,123', ['string', 'number'], false);

      expect(csvImporter).toBeInstanceOf(CsvToDataTable);
    });

    it('should default header flag to false when undefined', () => {
      const csvImporter = new CsvToDataTable('test,123', ['string', 'number']);

      expect(csvImporter).toBeInstanceOf(CsvToDataTable);
    });

    it('should validate column types', () => {
      expect(() => {
        new CsvToDataTable('test,123', ['invalid_type', 'number']);
      }).toThrow('Unsupported type: invalid_type');
    });

    it('should accept all supported types', () => {
      const supportedTypes = ['string', 'number', 'boolean', 'date', 'datetime', 'timeofday'];

      expect(() => {
        new CsvToDataTable('a,b,c,d,e,f', supportedTypes);
      }).not.toThrow();
    });

    it('should handle empty column types array', () => {
      expect(() => {
        new CsvToDataTable('', []);
      }).not.toThrow();
    });

    it('should handle multiple invalid types', () => {
      expect(() => {
        new CsvToDataTable('a,b', ['invalid1', 'invalid2']);
      }).toThrow('Unsupported type: invalid1');
    });
  });

  describe('createDataTable', () => {
    it('should create empty data table when CSV is empty', () => {
      mockGoogCsv.parse.mockReturnValue([]);

      const csvImporter = new CsvToDataTable('', ['string']);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable).toBeInstanceOf(DataTable);
      expect(dataTable.getNumberOfColumns()).toBe(0);
      expect(dataTable.getNumberOfRows()).toBe(0);
    });

    it('should create empty data table when parse returns null', () => {
      mockGoogCsv.parse.mockReturnValue(null);

      const csvImporter = new CsvToDataTable('', ['string']);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable).toBeInstanceOf(DataTable);
      expect(dataTable.getNumberOfColumns()).toBe(0);
      expect(dataTable.getNumberOfRows()).toBe(0);
    });

    it('should create data table with string columns', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Alice', 'Bob'],
        ['Charlie', 'David']
      ]);

      const csvImporter = new CsvToDataTable('Alice,Bob\nCharlie,David', ['string', 'string'], false);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfColumns()).toBe(2);
      expect(dataTable.getNumberOfRows()).toBe(2);
      expect(dataTable.getValue(0, 0)).toBe('Alice');
      expect(dataTable.getValue(0, 1)).toBe('Bob');
      expect(dataTable.getValue(1, 0)).toBe('Charlie');
      expect(dataTable.getValue(1, 1)).toBe('David');
    });

    it('should create data table with headers', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);

      const csvImporter = new CsvToDataTable('Name,Age\nAlice,25\nBob,30', ['string', 'number'], true);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfColumns()).toBe(2);
      expect(dataTable.getNumberOfRows()).toBe(2);
      expect(dataTable.getColumnLabel(0)).toBe('Name');
      expect(dataTable.getColumnLabel(1)).toBe('Age');
      expect(dataTable.getValue(0, 0)).toBe('Alice');
      expect(dataTable.getValue(0, 1)).toBe(25);
      expect(dataTable.getValue(1, 0)).toBe('Bob');
      expect(dataTable.getValue(1, 1)).toBe(30);
    });

    it('should create data table without headers', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Alice', '25'],
        ['Bob', '30']
      ]);

      const csvImporter = new CsvToDataTable('Alice,25\nBob,30', ['string', 'number'], false);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfColumns()).toBe(2);
      expect(dataTable.getNumberOfRows()).toBe(2);
      expect(dataTable.getColumnLabel(0)).toBe(''); // Default empty label
      expect(dataTable.getColumnLabel(1)).toBe('');
      expect(dataTable.getValue(0, 0)).toBe('Alice');
      expect(dataTable.getValue(0, 1)).toBe(25);
    });

    it('should handle mixed data types', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Name', 'Age', 'Active', 'Birthday', 'Created', 'Time'],
        ['Alice', '25', 'true', '1990-01-01', '2023-01-01T10:00:00Z', '10,30,45']
      ]);

      const csvImporter = new CsvToDataTable(
        'Name,Age,Active,Birthday,Created,Time\nAlice,25,true,1990-01-01,2023-01-01T10:00:00Z,10,30,45',
        ['string', 'number', 'boolean', 'date', 'datetime', 'timeofday'],
        true
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfColumns()).toBe(6);
      expect(dataTable.getNumberOfRows()).toBe(1);
      expect(dataTable.getValue(0, 0)).toBe('Alice'); // string
      expect(dataTable.getValue(0, 1)).toBe(25); // number
      expect(dataTable.getValue(0, 2)).toBe(true); // boolean
      expect(dataTable.getValue(0, 3)).toBeInstanceOf(Date); // date
      expect(dataTable.getValue(0, 4)).toBeInstanceOf(Date); // datetime
      expect(dataTable.getValue(0, 5)).toEqual(['10', '30', '45']); // timeofday
    });

    it('should handle boolean values correctly', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['true', 'false', 'TRUE', 'FALSE', 'True', 'False']
      ]);

      const csvImporter = new CsvToDataTable(
        'true,false,TRUE,FALSE,True,False',
        ['boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean'],
        false
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 0)).toBe(true);
      expect(dataTable.getValue(0, 1)).toBe(false);
      expect(dataTable.getValue(0, 2)).toBe(true);
      expect(dataTable.getValue(0, 3)).toBe(false);
      expect(dataTable.getValue(0, 4)).toBe(true);
      expect(dataTable.getValue(0, 5)).toBe(false);
    });

    it('should handle date values', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['2023-01-01', '2023-12-31T23:59:59Z']
      ]);

      const csvImporter = new CsvToDataTable(
        '2023-01-01,2023-12-31T23:59:59Z',
        ['date', 'datetime'],
        false
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 0)).toBeInstanceOf(Date);
      expect(dataTable.getValue(0, 1)).toBeInstanceOf(Date);
      expect((dataTable.getValue(0, 0) as Date).getFullYear()).toBe(2023);
    });

    it('should handle timeofday values', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['10,30,45', '23,59,59']
      ]);

      const csvImporter = new CsvToDataTable(
        '10,30,45,23,59,59',
        ['timeofday', 'timeofday'],
        false
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 0)).toEqual(['10', '30', '45']);
      expect(dataTable.getValue(0, 1)).toEqual(['23', '59', '59']);
    });

    it('should handle single row with headers', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Name', 'Age'],
        ['Alice', '25']
      ]);

      const csvImporter = new CsvToDataTable('Name,Age\nAlice,25', ['string', 'number'], true);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfRows()).toBe(1);
      expect(dataTable.getColumnLabel(0)).toBe('Name');
      expect(dataTable.getValue(0, 0)).toBe('Alice');
    });

    it('should handle single row without headers', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Alice', '25']
      ]);

      const csvImporter = new CsvToDataTable('Alice,25', ['string', 'number'], false);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfRows()).toBe(1);
      expect(dataTable.getValue(0, 0)).toBe('Alice');
      expect(dataTable.getValue(0, 1)).toBe(25);
    });

    it('should handle large datasets efficiently', () => {
      const largeData = [];
      largeData.push(['Name', 'Value']); // Header
      for (let i = 0; i < 1000; i++) {
        largeData.push([`Name${i}`, `${i}`]);
      }

      mockGoogCsv.parse.mockReturnValue(largeData);

      const csvImporter = new CsvToDataTable('large dataset', ['string', 'number'], true);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfRows()).toBe(1000);
      expect(dataTable.getValue(999, 0)).toBe('Name999');
      expect(dataTable.getValue(999, 1)).toBe(999);
    });

    it('should handle empty cells', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['', 'Bob'],
        ['Charlie', '']
      ]);

      const csvImporter = new CsvToDataTable(',Bob\nCharlie,', ['string', 'string'], false);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 0)).toBe('');
      expect(dataTable.getValue(0, 1)).toBe('Bob');
      expect(dataTable.getValue(1, 0)).toBe('Charlie');
      expect(dataTable.getValue(1, 1)).toBe('');
    });

    it('should handle header-only CSV', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Name', 'Age']
      ]);

      const csvImporter = new CsvToDataTable('Name,Age', ['string', 'number'], true);
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfColumns()).toBe(2);
      expect(dataTable.getNumberOfRows()).toBe(0);
      expect(dataTable.getColumnLabel(0)).toBe('Name');
      expect(dataTable.getColumnLabel(1)).toBe('Age');
    });
  });

  describe('convertToNumber static method', () => {
    it('should convert valid numbers', () => {
      expect(CsvToDataTable.convertToNumber('123')).toBe(123);
      expect(CsvToDataTable.convertToNumber('123.45')).toBe(123.45);
      expect(CsvToDataTable.convertToNumber('-123')).toBe(-123);
      expect(CsvToDataTable.convertToNumber('0')).toBe(0);
      expect(CsvToDataTable.convertToNumber('3.14159')).toBe(3.14159);
    });

    it('should convert scientific notation', () => {
      expect(CsvToDataTable.convertToNumber('1e3')).toBe(1000);
      expect(CsvToDataTable.convertToNumber('1.5e2')).toBe(150);
      expect(CsvToDataTable.convertToNumber('2E-3')).toBe(0.002);
    });

    it('should handle special numeric values', () => {
      expect(CsvToDataTable.convertToNumber('Infinity')).toBe(Infinity);
      expect(CsvToDataTable.convertToNumber('-Infinity')).toBe(-Infinity);
    });

    it('should throw error for non-numeric strings', () => {
      expect(() => CsvToDataTable.convertToNumber('abc')).toThrow('Not a number abc');
      expect(() => CsvToDataTable.convertToNumber('12abc')).toThrow('Not a number 12abc');
      expect(() => CsvToDataTable.convertToNumber('')).toThrow('Not a number ');
      expect(() => CsvToDataTable.convertToNumber(' ')).toThrow('Not a number  ');
    });

    it('should throw error for NaN', () => {
      expect(() => CsvToDataTable.convertToNumber('NaN')).toThrow('Not a number NaN');
    });

    it('should handle edge cases', () => {
      expect(CsvToDataTable.convertToNumber('0.0')).toBe(0);
      expect(CsvToDataTable.convertToNumber('-0')).toBe(-0);
      expect(CsvToDataTable.convertToNumber('+123')).toBe(123);
      expect(CsvToDataTable.convertToNumber('.5')).toBe(0.5);
      expect(CsvToDataTable.convertToNumber('5.')).toBe(5);
    });
  });

  describe('error handling', () => {
    it('should handle parse errors gracefully', () => {
      mockGoogCsv.parse.mockImplementation(() => {
        throw new Error('Parse error');
      });

      expect(() => {
        const csvImporter = new CsvToDataTable('invalid,csv', ['string']);
        csvImporter.createDataTable();
      }).toThrow('Parse error');
    });

    it('should handle invalid number conversion in data', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Alice', 'invalid_number']
      ]);

      expect(() => {
        const csvImporter = new CsvToDataTable('Alice,invalid_number', ['string', 'number'], false);
        csvImporter.createDataTable();
      }).toThrow('Not a number invalid_number');
    });

    it('should handle mismatched column count', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Alice', 'Bob', 'Charlie'] // 3 columns but only 2 types specified
      ]);

      const csvImporter = new CsvToDataTable('Alice,Bob,Charlie', ['string', 'number'], false);
      const dataTable = csvImporter.createDataTable();

      // Should only process the columns for which types are specified
      expect(dataTable.getNumberOfColumns()).toBe(2);
      expect(dataTable.getValue(0, 0)).toBe('Alice');
      expect(dataTable.getValue(0, 1)).toBe(NaN); // Bob converted to number
    });

    it('should handle undefined cell values', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Alice', undefined]
      ]);

      expect(() => {
        const csvImporter = new CsvToDataTable('Alice,', ['string', 'number'], false);
        csvImporter.createDataTable();
      }).toThrow(); // undefined converted to number should throw
    });
  });

  describe('type conversion edge cases', () => {
    it('should handle boolean edge cases', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['yes', 'no', '1', '0', 'TRUE', 'FALSE']
      ]);

      const csvImporter = new CsvToDataTable(
        'yes,no,1,0,TRUE,FALSE',
        ['boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean'],
        false
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 0)).toBe(false); // 'yes' -> false
      expect(dataTable.getValue(0, 1)).toBe(false); // 'no' -> false
      expect(dataTable.getValue(0, 2)).toBe(false); // '1' -> false
      expect(dataTable.getValue(0, 3)).toBe(false); // '0' -> false
      expect(dataTable.getValue(0, 4)).toBe(true);  // 'TRUE' -> true
      expect(dataTable.getValue(0, 5)).toBe(false); // 'FALSE' -> false
    });

    it('should handle invalid date values', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['invalid-date', '2023-13-45'] // Invalid dates
      ]);

      const csvImporter = new CsvToDataTable(
        'invalid-date,2023-13-45',
        ['date', 'datetime'],
        false
      );
      const dataTable = csvImporter.createDataTable();

      // Invalid dates should still create Date objects (potentially with NaN values)
      expect(dataTable.getValue(0, 0)).toBeInstanceOf(Date);
      expect(dataTable.getValue(0, 1)).toBeInstanceOf(Date);
    });

    it('should handle complex timeofday values', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['1', '1,2', '1,2,3', '1,2,3,4', '']
      ]);

      const csvImporter = new CsvToDataTable(
        '1,1,2,1,2,3,1,2,3,4,',
        ['timeofday', 'timeofday', 'timeofday', 'timeofday', 'timeofday'],
        false
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 0)).toEqual(['1']);
      expect(dataTable.getValue(0, 1)).toEqual(['1', '2']);
      expect(dataTable.getValue(0, 2)).toEqual(['1', '2', '3']);
      expect(dataTable.getValue(0, 3)).toEqual(['1', '2', '3', '4']);
      expect(dataTable.getValue(0, 4)).toEqual(['']);
    });
  });

  describe('integration scenarios', () => {
    it('should handle real-world CSV data', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Product', 'Price', 'InStock', 'LastUpdated'],
        ['Widget A', '19.99', 'true', '2023-01-01'],
        ['Widget B', '29.99', 'false', '2023-01-02'],
        ['Widget C', '9.99', 'true', '2023-01-03']
      ]);

      const csvImporter = new CsvToDataTable(
        'Product,Price,InStock,LastUpdated\nWidget A,19.99,true,2023-01-01\n...',
        ['string', 'number', 'boolean', 'date'],
        true
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfColumns()).toBe(4);
      expect(dataTable.getNumberOfRows()).toBe(3);

      // Verify first row
      expect(dataTable.getValue(0, 0)).toBe('Widget A');
      expect(dataTable.getValue(0, 1)).toBe(19.99);
      expect(dataTable.getValue(0, 2)).toBe(true);
      expect(dataTable.getValue(0, 3)).toBeInstanceOf(Date);

      // Verify column labels
      expect(dataTable.getColumnLabel(0)).toBe('Product');
      expect(dataTable.getColumnLabel(1)).toBe('Price');
      expect(dataTable.getColumnLabel(2)).toBe('InStock');
      expect(dataTable.getColumnLabel(3)).toBe('LastUpdated');
    });

    it('should handle financial data with precision', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Symbol', 'Price', 'Change'],
        ['AAPL', '150.25', '2.50'],
        ['GOOGL', '2750.00', '-12.25'],
        ['MSFT', '305.75', '0.00']
      ]);

      const csvImporter = new CsvToDataTable(
        'Symbol,Price,Change\nAAPL,150.25,2.50\n...',
        ['string', 'number', 'number'],
        true
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 1)).toBe(150.25);
      expect(dataTable.getValue(0, 2)).toBe(2.50);
      expect(dataTable.getValue(1, 2)).toBe(-12.25);
      expect(dataTable.getValue(2, 2)).toBe(0.00);
    });

    it('should handle survey data with mixed types', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Respondent', 'Age', 'Satisfied', 'Comments', 'ResponseDate'],
        ['User1', '25', 'true', 'Great service', '2023-01-01'],
        ['User2', '35', 'false', 'Could be better', '2023-01-02'],
        ['User3', '45', 'true', '', '2023-01-03']
      ]);

      const csvImporter = new CsvToDataTable(
        'survey data...',
        ['string', 'number', 'boolean', 'string', 'date'],
        true
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getNumberOfRows()).toBe(3);
      expect(dataTable.getValue(0, 0)).toBe('User1');
      expect(dataTable.getValue(0, 1)).toBe(25);
      expect(dataTable.getValue(0, 2)).toBe(true);
      expect(dataTable.getValue(0, 3)).toBe('Great service');
      expect(dataTable.getValue(2, 3)).toBe(''); // Empty comment
    });

    it('should handle time series data', () => {
      mockGoogCsv.parse.mockReturnValue([
        ['Timestamp', 'Value', 'Time'],
        ['2023-01-01T00:00:00Z', '100.5', '0,0,0'],
        ['2023-01-01T12:00:00Z', '105.2', '12,0,0'],
        ['2023-01-01T23:59:59Z', '98.7', '23,59,59']
      ]);

      const csvImporter = new CsvToDataTable(
        'time series data...',
        ['datetime', 'number', 'timeofday'],
        true
      );
      const dataTable = csvImporter.createDataTable();

      expect(dataTable.getValue(0, 0)).toBeInstanceOf(Date);
      expect(dataTable.getValue(0, 1)).toBe(100.5);
      expect(dataTable.getValue(0, 2)).toEqual(['0', '0', '0']);
      expect(dataTable.getValue(2, 2)).toEqual(['23', '59', '59']);
    });
  });
});
