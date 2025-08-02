import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Filter } from './filter';
import { DataTable } from '../data/datatable';
import { DataView } from '../data/dataview';
import { Options } from '../common/options';

// Mock the Control base class
vi.mock('./control', () => ({
  Control: class {
    private dataTable: any = null;
    private options: any = null;
    private state: any = null;

    constructor(container: Element | null) {}

    getDataTable() {
      return this.dataTable;
    }

    setDataTable(dataTable: any) {
      this.dataTable = dataTable;
    }

    getOptions() {
      return this.options || new Options([{}]);
    }

    setOptions(options: any) {
      this.options = options;
    }

    getState() {
      return this.state;
    }

    setState(state: any) {
      this.state = state;
    }

    dispose() {}
  }
}));

// Concrete implementation for testing
class TestFilter extends Filter {
  private filterCriteria: any = null;

  constructor(container: Element | null = null) {
    super(container);
  }

  // Override the protected method for testing
  protected applyFilterInternal(
    data: any,
    options: Options,
    state: {[key: string]: any} | null
  ): DataView {
    if (this.filterCriteria) {
      // Apply custom filtering logic for testing
      const filteredRows: number[] = [];
      for (let i = 0; i < data.getNumberOfRows(); i++) {
        if (this.filterCriteria(data, i)) {
          filteredRows.push(i);
        }
      }
      return new DataView(data, { rows: filteredRows });
    }
    return new DataView(data);
  }

  // Test helper methods
  setFilterCriteria(criteria: (data: any, rowIndex: number) => boolean) {
    this.filterCriteria = criteria;
  }

  clearFilterCriteria() {
    this.filterCriteria = null;
  }
}

describe('Filter', () => {
  let filter: TestFilter;
  let container: HTMLElement;
  let dataTable: DataTable;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    filter = new TestFilter(container);

    // Create test data
    dataTable = new DataTable();
    dataTable.addColumn('string', 'Category');
    dataTable.addColumn('number', 'Value');
    dataTable.addColumn('boolean', 'Active');
    dataTable.addRows([
      ['A', 10, true],
      ['B', 20, false],
      ['C', 30, true],
      ['D', 40, false],
      ['E', 50, true]
    ]);
  });

  afterEach(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    filter.dispose();
  });

  describe('constructor', () => {
    it('should create Filter with valid container', () => {
      const testFilter = new TestFilter(container);
      expect(testFilter).toBeInstanceOf(Filter);
      testFilter.dispose();
    });

    it('should create Filter with null container', () => {
      const testFilter = new TestFilter(null);
      expect(testFilter).toBeInstanceOf(Filter);
      testFilter.dispose();
    });

    it('should create Filter with undefined container', () => {
      const testFilter = new TestFilter(undefined as any);
      expect(testFilter).toBeInstanceOf(Filter);
      testFilter.dispose();
    });

    it('should extend Control class', () => {
      expect(filter).toBeInstanceOf(Filter);
    });
  });

  describe('applyFilter (deprecated method)', () => {
    it('should delegate to apply method', () => {
      filter.setDataTable(dataTable);
      const applySpy = vi.spyOn(filter, 'apply');

      filter.applyFilter();
      expect(applySpy).toHaveBeenCalled();

      applySpy.mockRestore();
    });

    it('should return same result as apply method', () => {
      filter.setDataTable(dataTable);

      const applyResult = filter.apply();
      const applyFilterResult = filter.applyFilter();

      expect(applyFilterResult.getNumberOfRows()).toBe(applyResult.getNumberOfRows());
      expect(applyFilterResult.getNumberOfColumns()).toBe(applyResult.getNumberOfColumns());
    });

    it('should throw error when no data table is set', () => {
      expect(() => filter.applyFilter()).toThrow('No valid DataTable received from draw()');
    });
  });

  describe('apply method', () => {
    it('should return DataView when data table is set', () => {
      filter.setDataTable(dataTable);
      const result = filter.apply();

      expect(result).toBeInstanceOf(DataView);
      expect(result.getNumberOfRows()).toBe(dataTable.getNumberOfRows());
      expect(result.getNumberOfColumns()).toBe(dataTable.getNumberOfColumns());
    });

    it('should throw error when no data table is set', () => {
      expect(() => filter.apply()).toThrow('No valid DataTable received from draw()');
    });

    it('should throw error when data table is null', () => {
      filter.setDataTable(null);
      expect(() => filter.apply()).toThrow('No valid DataTable received from draw()');
    });

    it('should throw error when data table is undefined', () => {
      filter.setDataTable(undefined);
      expect(() => filter.apply()).toThrow('No valid DataTable received from draw()');
    });

    it('should call applyFilterInternal with correct parameters', () => {
      filter.setDataTable(dataTable);
      const options = new Options([{ title: 'Test Filter' }]);
      const state = { selectedValue: 'A' };

      filter.setOptions(options);
      filter.setState(state);

      const applyFilterInternalSpy = vi.spyOn(filter as any, 'applyFilterInternal');

      filter.apply();

      expect(applyFilterInternalSpy).toHaveBeenCalledWith(
        dataTable,
        expect.any(Options),
        state
      );

      applyFilterInternalSpy.mockRestore();
    });
  });

  describe('applyFilterInternal (default implementation)', () => {
    it('should return unfiltered DataView by default', () => {
      filter.setDataTable(dataTable);
      const result = filter.apply();

      expect(result).toBeInstanceOf(DataView);
      expect(result.getNumberOfRows()).toBe(dataTable.getNumberOfRows());
      expect(result.getNumberOfColumns()).toBe(dataTable.getNumberOfColumns());
    });

    it('should preserve all data when no filtering is applied', () => {
      filter.setDataTable(dataTable);
      const result = filter.apply();

      for (let row = 0; row < dataTable.getNumberOfRows(); row++) {
        for (let col = 0; col < dataTable.getNumberOfColumns(); col++) {
          expect(result.getValue(row, col)).toBe(dataTable.getValue(row, col));
        }
      }
    });

    it('should work with empty data table', () => {
      const emptyTable = new DataTable();
      filter.setDataTable(emptyTable);

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(0);
      expect(result.getNumberOfColumns()).toBe(0);
    });

    it('should work with data table with no rows', () => {
      const noRowsTable = new DataTable();
      noRowsTable.addColumn('string', 'Category');
      noRowsTable.addColumn('number', 'Value');

      filter.setDataTable(noRowsTable);

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(0);
      expect(result.getNumberOfColumns()).toBe(2);
    });

    it('should work with data table with no columns', () => {
      const noColumnsTable = new DataTable();

      filter.setDataTable(noColumnsTable);

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(0);
      expect(result.getNumberOfColumns()).toBe(0);
    });
  });

  describe('custom filtering logic', () => {
    it('should apply custom filter criteria', () => {
      filter.setDataTable(dataTable);

      // Filter for rows where Value > 25
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(rowIndex, 1) > 25;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(3); // C, D, E have values > 25

      // Check that the filtered rows contain the correct data
      expect(result.getValue(0, 0)).toBe('C'); // First filtered row
      expect(result.getValue(1, 0)).toBe('D'); // Second filtered row
      expect(result.getValue(2, 0)).toBe('E'); // Third filtered row
    });

    it('should filter based on boolean column', () => {
      filter.setDataTable(dataTable);

      // Filter for rows where Active is true
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(rowIndex, 2) === true;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(3); // A, C, E are active

      expect(result.getValue(0, 0)).toBe('A');
      expect(result.getValue(1, 0)).toBe('C');
      expect(result.getValue(2, 0)).toBe('E');
    });

    it('should filter based on string column', () => {
      filter.setDataTable(dataTable);

      // Filter for rows where Category is 'A' or 'C'
      filter.setFilterCriteria((data, rowIndex) => {
        const category = data.getValue(rowIndex, 0);
        return category === 'A' || category === 'C';
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(2);

      expect(result.getValue(0, 0)).toBe('A');
      expect(result.getValue(1, 0)).toBe('C');
    });

    it('should return empty result when no rows match filter', () => {
      filter.setDataTable(dataTable);

      // Filter for rows where Value > 100 (none exist)
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(rowIndex, 1) > 100;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(0);
      expect(result.getNumberOfColumns()).toBe(dataTable.getNumberOfColumns());
    });

    it('should return all rows when filter criteria matches all', () => {
      filter.setDataTable(dataTable);

      // Filter that matches all rows
      filter.setFilterCriteria((data, rowIndex) => {
        return true;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(dataTable.getNumberOfRows());
    });

    it('should handle complex filter criteria', () => {
      filter.setDataTable(dataTable);

      // Complex filter: Value between 20 and 40, and Active is true
      filter.setFilterCriteria((data, rowIndex) => {
        const value = data.getValue(rowIndex, 1);
        const active = data.getValue(rowIndex, 2);
        return value >= 20 && value <= 40 && active === true;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(1); // Only C matches (30, true)
      expect(result.getValue(0, 0)).toBe('C');
    });
  });

  describe('state and options handling', () => {
    it('should pass options to applyFilterInternal', () => {
      filter.setDataTable(dataTable);
      const options = new Options([{
        filterColumn: 1,
        minValue: 25,
        maxValue: 45
      }]);
      filter.setOptions(options);

      const applyFilterInternalSpy = vi.spyOn(filter as any, 'applyFilterInternal');

      filter.apply();

      expect(applyFilterInternalSpy).toHaveBeenCalledWith(
        dataTable,
        expect.objectContaining({
          // Options object should be passed
        }),
        null
      );

      applyFilterInternalSpy.mockRestore();
    });

    it('should pass state to applyFilterInternal', () => {
      filter.setDataTable(dataTable);
      const state = {
        selectedCategories: ['A', 'C'],
        minValue: 10,
        maxValue: 30
      };
      filter.setState(state);

      const applyFilterInternalSpy = vi.spyOn(filter as any, 'applyFilterInternal');

      filter.apply();

      expect(applyFilterInternalSpy).toHaveBeenCalledWith(
        dataTable,
        expect.any(Options),
        state
      );

      applyFilterInternalSpy.mockRestore();
    });

    it('should handle null state', () => {
      filter.setDataTable(dataTable);
      filter.setState(null);

      expect(() => filter.apply()).not.toThrow();
    });

    it('should handle undefined state', () => {
      filter.setDataTable(dataTable);
      filter.setState(undefined);

      expect(() => filter.apply()).not.toThrow();
    });

    it('should handle empty state object', () => {
      filter.setDataTable(dataTable);
      filter.setState({});

      expect(() => filter.apply()).not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle errors in filter criteria gracefully', () => {
      filter.setDataTable(dataTable);

      // Filter that throws an error
      filter.setFilterCriteria((data, rowIndex) => {
        throw new Error('Filter error');
      });

      expect(() => filter.apply()).toThrow();
    });

    it('should handle invalid data access in filter criteria', () => {
      filter.setDataTable(dataTable);

      // Filter that tries to access invalid column
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(rowIndex, 999) > 0; // Invalid column
      });

      expect(() => filter.apply()).toThrow();
    });

    it('should handle invalid row access in filter criteria', () => {
      filter.setDataTable(dataTable);

      // Filter that tries to access invalid row
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(999, 0) !== null; // Invalid row
      });

      expect(() => filter.apply()).toThrow();
    });
  });

  describe('DataView integration', () => {
    it('should work with DataView as input', () => {
      // Create a DataView from the original DataTable
      const dataView = new DataView(dataTable);
      dataView.setRows([0, 2, 4]); // Only rows A, C, E

      filter.setDataTable(dataView);

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(3);
      expect(result.getValue(0, 0)).toBe('A');
      expect(result.getValue(1, 0)).toBe('C');
      expect(result.getValue(2, 0)).toBe('E');
    });

    it('should apply additional filtering on top of DataView', () => {
      // Create a DataView that excludes some rows
      const dataView = new DataView(dataTable);
      dataView.setRows([0, 2, 4]); // Only rows A, C, E

      filter.setDataTable(dataView);

      // Apply additional filtering for values > 25
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(rowIndex, 1) > 25;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(2); // Only C and E from the DataView
      expect(result.getValue(0, 0)).toBe('C');
      expect(result.getValue(1, 0)).toBe('E');
    });
  });

  describe('performance and edge cases', () => {
    it('should handle large datasets efficiently', () => {
      // Create a large dataset
      const largeTable = new DataTable();
      largeTable.addColumn('number', 'Index');
      largeTable.addColumn('number', 'Value');

      const rows = [];
      for (let i = 0; i < 1000; i++) {
        rows.push([i, Math.random() * 100]);
      }
      largeTable.addRows(rows);

      filter.setDataTable(largeTable);

      // Filter for even indices
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(rowIndex, 0) % 2 === 0;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(500); // Half should be even
    });

    it('should handle data with null values', () => {
      const tableWithNulls = new DataTable();
      tableWithNulls.addColumn('string', 'Category');
      tableWithNulls.addColumn('number', 'Value');
      tableWithNulls.addRows([
        ['A', 10],
        [null, 20],
        ['C', null],
        [null, null],
        ['E', 50]
      ]);

      filter.setDataTable(tableWithNulls);

      // Filter for non-null categories
      filter.setFilterCriteria((data, rowIndex) => {
        return data.getValue(rowIndex, 0) !== null;
      });

      const result = filter.apply();
      expect(result.getNumberOfRows()).toBe(3); // A, C, E
    });

    it('should maintain column metadata in filtered result', () => {
      filter.setDataTable(dataTable);

      const result = filter.apply();

      expect(result.getColumnLabel(0)).toBe('Category');
      expect(result.getColumnLabel(1)).toBe('Value');
      expect(result.getColumnLabel(2)).toBe('Active');

      expect(result.getColumnType(0)).toBe('string');
      expect(result.getColumnType(1)).toBe('number');
      expect(result.getColumnType(2)).toBe('boolean');
    });
  });
});
