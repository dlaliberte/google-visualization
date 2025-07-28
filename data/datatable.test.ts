import { describe, it, expect, beforeEach } from 'vitest';
import { DataTable } from './datatable';
import { ColumnType } from './types';

describe('DataTable', () => {
  let dataTable: DataTable;

  beforeEach(() => {
    dataTable = new DataTable();
  });

  describe('constructor', () => {
    it('should create an empty DataTable', () => {
      expect(dataTable.getNumberOfRows()).toBe(0);
      expect(dataTable.getNumberOfColumns()).toBe(0);
    });

    it('should create DataTable from spec', () => {
      const spec = {
        cols: [
          { id: 'name', type: 'string', label: 'Name' },
          { id: 'age', type: 'number', label: 'Age' }
        ],
        rows: [
          { c: [{ v: 'John' }, { v: 25 }] },
          { c: [{ v: 'Jane' }, { v: 30 }] }
        ]
      };
      const dt = new DataTable(spec);
      expect(dt.getNumberOfRows()).toBe(2);
      expect(dt.getNumberOfColumns()).toBe(2);
    });
  });

  describe('column operations', () => {
    beforeEach(() => {
      dataTable.addColumn('string', 'Name');
      dataTable.addColumn('number', 'Age');
      dataTable.addColumn('boolean', 'Active');
    });

    it('should add columns correctly', () => {
      expect(dataTable.getNumberOfColumns()).toBe(3);
      expect(dataTable.getColumnLabel(0)).toBe('Name');
      expect(dataTable.getColumnType(0)).toBe('string');
      expect(dataTable.getColumnLabel(1)).toBe('Age');
      expect(dataTable.getColumnType(1)).toBe('number');
    });

    it('should get column properties', () => {
      expect(dataTable.getColumnId(0)).toBe('');
      expect(dataTable.getColumnType(1)).toBe('number');
      expect(dataTable.getColumnLabel(2)).toBe('Active');
    });

    it('should set column properties', () => {
      dataTable.setColumnLabel(0, 'Full Name');
      expect(dataTable.getColumnLabel(0)).toBe('Full Name');
    });

    it('should throw error for invalid column index', () => {
      expect(() => dataTable.getColumnType(5)).toThrow();
      expect(() => dataTable.setColumnLabel(5, 'Invalid')).toThrow();
    });

    it('should insert column at specific index', () => {
      dataTable.insertColumn(1, 'date', 'Birth Date');
      expect(dataTable.getNumberOfColumns()).toBe(4);
      expect(dataTable.getColumnType(1)).toBe('date');
      expect(dataTable.getColumnLabel(1)).toBe('Birth Date');
      expect(dataTable.getColumnType(2)).toBe('number'); // Age shifted
    });

    it('should remove column', () => {
      dataTable.removeColumn(1);
      expect(dataTable.getNumberOfColumns()).toBe(2);
      expect(dataTable.getColumnLabel(1)).toBe('Active'); // Boolean column shifted
    });
  });

  describe('row operations', () => {
    beforeEach(() => {
      dataTable.addColumn('string', 'Name');
      dataTable.addColumn('number', 'Age');
    });

    it('should add empty rows', () => {
      dataTable.addRows(3);
      expect(dataTable.getNumberOfRows()).toBe(3);
      expect(dataTable.getValue(0, 0)).toBeNull();
      expect(dataTable.getValue(1, 1)).toBeNull();
    });

    it('should add rows with data', () => {
      dataTable.addRows([
        ['John', 25],
        ['Jane', 30]
      ]);
      expect(dataTable.getNumberOfRows()).toBe(2);
      expect(dataTable.getValue(0, 0)).toBe('John');
      expect(dataTable.getValue(0, 1)).toBe(25);
      expect(dataTable.getValue(1, 0)).toBe('Jane');
      expect(dataTable.getValue(1, 1)).toBe(30);
    });

    it('should insert row at specific index', () => {
      dataTable.addRows([['Alice', 35], ['Bob', 40]]);
      dataTable.insertRows(1, [['Charlie', 28]]);
      expect(dataTable.getNumberOfRows()).toBe(3);
      expect(dataTable.getValue(1, 0)).toBe('Charlie');
      expect(dataTable.getValue(2, 0)).toBe('Bob'); // Bob shifted down
    });

    it('should remove rows', () => {
      dataTable.addRows([['Alice', 35], ['Bob', 40], ['Charlie', 28]]);
      dataTable.removeRows(1, 1);
      expect(dataTable.getNumberOfRows()).toBe(2);
      expect(dataTable.getValue(1, 0)).toBe('Charlie');
    });

    it('should throw error for invalid row index', () => {
      dataTable.addRows(2);
      expect(() => dataTable.getValue(5, 0)).toThrow();
      expect(() => dataTable.setValue(5, 0, 'test')).toThrow();
    });
  });

  describe('cell operations', () => {
    beforeEach(() => {
      dataTable.addColumn('string', 'Name');
      dataTable.addColumn('number', 'Score');
      dataTable.addRows([['Alice', 95], ['Bob', 87]]);
    });

    it('should get and set cell values', () => {
      expect(dataTable.getValue(0, 0)).toBe('Alice');
      expect(dataTable.getValue(1, 1)).toBe(87);

      dataTable.setValue(0, 1, 100);
      expect(dataTable.getValue(0, 1)).toBe(100);
    });

    it('should get and set formatted values', () => {
      dataTable.setFormattedValue(0, 1, '95%');
      expect(dataTable.getFormattedValue(0, 1)).toBe('95%');
    });

    it('should handle cell properties', () => {
      dataTable.setProperty(0, 0, 'style', 'color: red');
      expect(dataTable.getProperty(0, 0, 'style')).toBe('color: red');
    });

    it('should replace row data by removing and adding', () => {
      // Since setRowData doesn't exist, we can test row replacement differently
      dataTable.removeRow(0);
      dataTable.insertRows(0, [['Charlie', 92]]);
      expect(dataTable.getValue(0, 0)).toBe('Charlie');
      expect(dataTable.getValue(0, 1)).toBe(92);
    });
  });

  describe('data manipulation', () => {
    beforeEach(() => {
      dataTable.addColumn('string', 'Name');
      dataTable.addColumn('number', 'Score');
      dataTable.addColumn('string', 'Grade');
      dataTable.addRows([
        ['Alice', 95, 'A'],
        ['Bob', 87, 'B'],
        ['Charlie', 92, 'A'],
        ['Diana', 78, 'C']
      ]);
    });

    it('should sort data', () => {
      const sortedRows = dataTable.getSortedRows([{ column: 1, desc: true }]);
      expect(dataTable.getValue(sortedRows[0], 0)).toBe('Alice');
      expect(dataTable.getValue(sortedRows[1], 0)).toBe('Charlie');
      expect(dataTable.getValue(sortedRows[2], 0)).toBe('Bob');
      expect(dataTable.getValue(sortedRows[3], 0)).toBe('Diana');
    });

    it('should get distinct values', () => {
      const distinctGrades = dataTable.getDistinctValues(2);
      expect(distinctGrades.sort()).toEqual(['A', 'B', 'C']);
    });

    it('should filter rows', () => {
      const filteredRows = dataTable.getFilteredRows([
        { column: 1, minValue: 90 }
      ]);
      expect(filteredRows).toHaveLength(2); // Alice and Charlie
    });
  });

  describe('data types', () => {
    it('should handle string data', () => {
      dataTable.addColumn('string', 'Text');
      dataTable.addRow(['Hello World']);
      expect(dataTable.getValue(0, 0)).toBe('Hello World');
      expect(dataTable.getColumnType(0)).toBe('string');
    });

    it('should handle number data', () => {
      dataTable.addColumn('number', 'Count');
      dataTable.addRow([42.5]);
      expect(dataTable.getValue(0, 0)).toBe(42.5);
      expect(dataTable.getColumnType(0)).toBe('number');
    });

    it('should handle boolean data', () => {
      dataTable.addColumn('boolean', 'Active');
      dataTable.addRow([true]);
      expect(dataTable.getValue(0, 0)).toBe(true);
      expect(dataTable.getColumnType(0)).toBe('boolean');
    });

    it('should handle date data', () => {
      dataTable.addColumn('date', 'Created');
      const date = new Date('2024-01-01');
      dataTable.addRow([date]);
      expect(dataTable.getValue(0, 0)).toEqual(date);
      expect(dataTable.getColumnType(0)).toBe('date');
    });

    it('should handle null values', () => {
      dataTable.addColumn('string', 'Optional');
      dataTable.addRow([null]);
      expect(dataTable.getValue(0, 0)).toBeNull();
    });
  });

  describe('clone and copy', () => {
    beforeEach(() => {
      dataTable.addColumn('string', 'Name');
      dataTable.addColumn('number', 'Value');
      dataTable.addRows([['Test', 123]]);
    });

    it('should clone the data table', () => {
      const cloned = dataTable.clone();
      expect(cloned.getNumberOfRows()).toBe(dataTable.getNumberOfRows());
      expect(cloned.getNumberOfColumns()).toBe(dataTable.getNumberOfColumns());
      expect(cloned.getValue(0, 0)).toBe(dataTable.getValue(0, 0));

      // Verify independence
      cloned.setValue(0, 0, 'Modified');
      expect(dataTable.getValue(0, 0)).toBe('Test');
    });
  });

  describe('table properties', () => {
    it('should set and get table properties', () => {
      dataTable.setTableProperty('title', 'My Data');
      expect(dataTable.getTableProperty('title')).toBe('My Data');
    });

    it('should return undefined for non-existent properties', () => {
      expect(dataTable.getTableProperty('nonexistent')).toBeUndefined();
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty table operations', () => {
      expect(dataTable.getNumberOfRows()).toBe(0);
      expect(dataTable.getNumberOfColumns()).toBe(0);
      expect(() => dataTable.getValue(0, 0)).toThrow();
    });

    it('should validate column types', () => {
      expect(() => dataTable.addColumn('invalid' as ColumnType, 'Test')).toThrow();
    });

    it('should handle out-of-bounds access gracefully', () => {
      dataTable.addColumn('string', 'Test');
      dataTable.addRow(['value']);
      expect(() => dataTable.getValue(0, 5)).toThrow();
      expect(() => dataTable.getValue(5, 0)).toThrow();
    });
  });
});
