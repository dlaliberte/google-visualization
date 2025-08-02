---
sidebar_position: 9
title: Advanced Data Manipulation
---

# Advanced Data Manipulation

This guide covers advanced techniques for manipulating data in Google Charts, including complex transformations, aggregations, and data processing patterns.

## Complex DataView Transformations

### Multi-Level Grouping

```javascript
function createGroupedView(data) {
  // Group data by category and calculate aggregates
  const groupedData = new google.visualization.DataTable();
  groupedData.addColumn('string', 'Category');
  groupedData.addColumn('number', 'Total Sales');
  groupedData.addColumn('number', 'Average Price');
  groupedData.addColumn('number', 'Item Count');

  // Create a map to group data
  const groups = new Map();

  for (let i = 0; i < data.getNumberOfRows(); i++) {
    const category = data.getValue(i, 0);
    const sales = data.getValue(i, 1);
    const price = data.getValue(i, 2);

    if (!groups.has(category)) {
      groups.set(category, { totalSales: 0, totalPrice: 0, count: 0 });
    }

    const group = groups.get(category);
    group.totalSales += sales;
    group.totalPrice += price;
    group.count += 1;
  }

  // Add grouped data to new DataTable
  for (const [category, group] of groups) {
    groupedData.addRow([
      category,
      group.totalSales,
      group.totalPrice / group.count, // Average price
      group.count
    ]);
  }

  return groupedData;
}
```

### Pivot Table Creation

```javascript
function createPivotTable(data, rowColumn, colColumn, valueColumn) {
  // Get unique values for rows and columns
  const rowValues = new Set();
  const colValues = new Set();

  for (let i = 0; i < data.getNumberOfRows(); i++) {
    rowValues.add(data.getValue(i, rowColumn));
    colValues.add(data.getValue(i, colColumn));
  }

  // Create pivot table structure
  const pivotData = new google.visualization.DataTable();
  pivotData.addColumn('string', data.getColumnLabel(rowColumn));

  for (const colValue of colValues) {
    pivotData.addColumn('number', String(colValue));
  }

  // Fill pivot table
  for (const rowValue of rowValues) {
    const row = [rowValue];

    for (const colValue of colValues) {
      let sum = 0;

      // Find matching rows and sum values
      for (let i = 0; i < data.getNumberOfRows(); i++) {
        if (data.getValue(i, rowColumn) === rowValue &&
            data.getValue(i, colColumn) === colValue) {
          sum += data.getValue(i, valueColumn) || 0;
        }
      }

      row.push(sum);
    }

    pivotData.addRow(row);
  }

  return pivotData;
}

// Usage
const salesData = new google.visualization.DataTable();
salesData.addColumn('string', 'Region');
salesData.addColumn('string', 'Product');
salesData.addColumn('number', 'Sales');

salesData.addRows([
  ['North', 'A', 100],
  ['North', 'B', 150],
  ['South', 'A', 200],
  ['South', 'B', 120]
]);

const pivotTable = createPivotTable(salesData, 0, 1, 2); // Region x Product
```

### Time Series Aggregation

```javascript
function aggregateTimeSeries(data, timeColumn, valueColumn, interval) {
  const aggregated = new google.visualization.DataTable();
  aggregated.addColumn('date', 'Period');
  aggregated.addColumn('number', 'Value');

  const groups = new Map();

  for (let i = 0; i < data.getNumberOfRows(); i++) {
    const date = data.getValue(i, timeColumn);
    const value = data.getValue(i, valueColumn);

    // Round date to interval
    let periodKey;
    switch (interval) {
      case 'day':
        periodKey = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        periodKey = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());
        break;
      case 'month':
        periodKey = new Date(date.getFullYear(), date.getMonth(), 1);
        break;
      case 'year':
        periodKey = new Date(date.getFullYear(), 0, 1);
        break;
    }

    const key = periodKey.getTime();
    if (!groups.has(key)) {
      groups.set(key, { date: periodKey, sum: 0, count: 0 });
    }

    groups.get(key).sum += value;
    groups.get(key).count += 1;
  }

  // Sort by date and add to result
  const sortedGroups = Array.from(groups.values()).sort((a, b) => a.date - b.date);

  for (const group of sortedGroups) {
    aggregated.addRow([group.date, group.sum]);
  }

  return aggregated;
}
```

## Advanced Calculated Columns

### Statistical Calculations

```javascript
function addStatisticalColumns(data, valueColumn) {
  const view = new google.visualization.DataView(data);

  // Calculate statistics
  const values = [];
  for (let i = 0; i < data.getNumberOfRows(); i++) {
    const value = data.getValue(i, valueColumn);
    if (value !== null) values.push(value);
  }

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const sortedValues = values.sort((a, b) => a - b);
  const median = sortedValues[Math.floor(sortedValues.length / 2)];
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  view.setColumns([
    ...Array.from({ length: data.getNumberOfColumns() }, (_, i) => i),
    {
      calc: function(dt, row) {
        const value = dt.getValue(row, valueColumn);
        return value !== null ? (value - mean) / stdDev : null; // Z-score
      },
      type: 'number',
      label: 'Z-Score'
    },
    {
      calc: function(dt, row) {
        const value = dt.getValue(row, valueColumn);
        if (value === null) return null;

        // Percentile rank
        const rank = values.filter(v => v <= value).length;
        return (rank / values.length) * 100;
      },
      type: 'number',
      label: 'Percentile'
    },
    {
      calc: function(dt, row) {
        const value = dt.getValue(row, valueColumn);
        return value !== null ? value - mean : null; // Deviation from mean
      },
      type: 'number',
      label: 'Deviation'
    }
  ]);

  return view;
}
```

### Moving Averages

```javascript
function addMovingAverage(data, valueColumn, windowSize) {
  const view = new google.visualization.DataView(data);

  view.setColumns([
    ...Array.from({ length: data.getNumberOfColumns() }, (_, i) => i),
    {
      calc: function(dt, row) {
        if (row < windowSize - 1) return null;

        let sum = 0;
        let count = 0;

        for (let i = row - windowSize + 1; i <= row; i++) {
          const value = dt.getValue(i, valueColumn);
          if (value !== null) {
            sum += value;
            count++;
          }
        }

        return count > 0 ? sum / count : null;
      },
      type: 'number',
      label: `${windowSize}-Period Moving Average`
    },
    {
      calc: function(dt, row) {
        if (row < windowSize - 1) return null;

        // Exponential moving average
        const alpha = 2 / (windowSize + 1);
        let ema = dt.getValue(row - windowSize + 1, valueColumn);

        for (let i = row - windowSize + 2; i <= row; i++) {
          const value = dt.getValue(i, valueColumn);
          if (value !== null) {
            ema = alpha * value + (1 - alpha) * ema;
          }
        }

        return ema;
      },
      type: 'number',
      label: `${windowSize}-Period EMA`
    }
  ]);

  return view;
}
```

### Growth Rate Calculations

```javascript
function addGrowthRates(data, valueColumn) {
  const view = new google.visualization.DataView(data);

  view.setColumns([
    ...Array.from({ length: data.getNumberOfColumns() }, (_, i) => i),
    {
      calc: function(dt, row) {
        if (row === 0) return null;

        const current = dt.getValue(row, valueColumn);
        const previous = dt.getValue(row - 1, valueColumn);

        if (current === null || previous === null || previous === 0) return null;

        return ((current - previous) / previous) * 100; // Percentage change
      },
      type: 'number',
      label: 'Growth Rate (%)'
    },
    {
      calc: function(dt, row) {
        if (row === 0) return null;

        const current = dt.getValue(row, valueColumn);
        const previous = dt.getValue(row - 1, valueColumn);

        if (current === null || previous === null) return null;

        return current - previous; // Absolute change
      },
      type: 'number',
      label: 'Absolute Change'
    },
    {
      calc: function(dt, row) {
        if (row === 0) return null;

        const current = dt.getValue(row, valueColumn);
        const first = dt.getValue(0, valueColumn);

        if (current === null || first === null || first === 0) return null;

        return ((current - first) / first) * 100; // Cumulative growth
      },
      type: 'number',
      label: 'Cumulative Growth (%)'
    }
  ]);

  return view;
}
```

## Data Filtering and Search

### Advanced Filtering

```javascript
class DataFilter {
  constructor(data) {
    this.originalData = data;
    this.filteredView = new google.visualization.DataView(data);
    this.filters = [];
  }

  addFilter(column, operator, value) {
    this.filters.push({ column, operator, value });
    this.applyFilters();
    return this;
  }

  removeFilter(index) {
    this.filters.splice(index, 1);
    this.applyFilters();
    return this;
  }

  clearFilters() {
    this.filters = [];
    this.applyFilters();
    return this;
  }

  applyFilters() {
    const filteredRows = [];

    for (let row = 0; row < this.originalData.getNumberOfRows(); row++) {
      let includeRow = true;

      for (const filter of this.filters) {
        const cellValue = this.originalData.getValue(row, filter.column);

        if (!this.evaluateFilter(cellValue, filter.operator, filter.value)) {
          includeRow = false;
          break;
        }
      }

      if (includeRow) {
        filteredRows.push(row);
      }
    }

    this.filteredView.setRows(filteredRows);
  }

  evaluateFilter(cellValue, operator, filterValue) {
    if (cellValue === null) return operator === 'is_null';

    switch (operator) {
      case 'equals': return cellValue === filterValue;
      case 'not_equals': return cellValue !== filterValue;
      case 'greater_than': return cellValue > filterValue;
      case 'greater_equal': return cellValue >= filterValue;
      case 'less_than': return cellValue < filterValue;
      case 'less_equal': return cellValue <= filterValue;
      case 'contains': return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
      case 'starts_with': return String(cellValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
      case 'ends_with': return String(cellValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
      case 'regex': return new RegExp(filterValue, 'i').test(String(cellValue));
      case 'is_null': return cellValue === null;
      case 'is_not_null': return cellValue !== null;
      case 'in': return Array.isArray(filterValue) && filterValue.includes(cellValue);
      case 'between': return Array.isArray(filterValue) && cellValue >= filterValue[0] && cellValue <= filterValue[1];
      default: return true;
    }
  }

  getFilteredData() {
    return this.filteredView;
  }

  getFilterSummary() {
    return {
      totalRows: this.originalData.getNumberOfRows(),
      filteredRows: this.filteredView.getViewRows().length,
      activeFilters: this.filters.length
    };
  }
}

// Usage
const filter = new DataFilter(myData);
filter
  .addFilter(1, 'greater_than', 1000)
  .addFilter(0, 'contains', 'Product')
  .addFilter(2, 'between', [10, 100]);

const filteredData = filter.getFilteredData();
```

### Text Search

```javascript
function createSearchableView(data, searchColumns) {
  class SearchableDataView {
    constructor(data, searchColumns) {
      this.originalData = data;
      this.searchColumns = searchColumns || Array.from({ length: data.getNumberOfColumns() }, (_, i) => i);
      this.view = new google.visualization.DataView(data);
      this.currentQuery = '';
    }

    search(query) {
      this.currentQuery = query.toLowerCase();

      if (!query.trim()) {
        // Show all rows if query is empty
        this.view.setRows(null);
        return this;
      }

      const matchingRows = [];

      for (let row = 0; row < this.originalData.getNumberOfRows(); row++) {
        let rowMatches = false;

        for (const col of this.searchColumns) {
          const cellValue = this.originalData.getValue(row, col);
          if (cellValue !== null && String(cellValue).toLowerCase().includes(this.currentQuery)) {
            rowMatches = true;
            break;
          }
        }

        if (rowMatches) {
          matchingRows.push(row);
        }
      }

      this.view.setRows(matchingRows);
      return this;
    }

    highlightMatches() {
      // Add a calculated column that highlights search matches
      const columns = Array.from({ length: this.originalData.getNumberOfColumns() }, (_, i) => {
        if (this.searchColumns.includes(i)) {
          return {
            calc: (dt, row) => {
              const value = dt.getValue(row, i);
              if (value === null || !this.currentQuery) return value;

              const stringValue = String(value);
              const regex = new RegExp(`(${this.currentQuery})`, 'gi');
              const highlighted = stringValue.replace(regex, '<mark>$1</mark>');

              return {
                v: value,
                f: highlighted
              };
            },
            type: this.originalData.getColumnType(i),
            label: this.originalData.getColumnLabel(i)
          };
        }
        return i;
      });

      this.view.setColumns(columns);
      return this;
    }

    getView() {
      return this.view;
    }

    getMatchCount() {
      return this.view.getViewRows().length;
    }
  }

  return new SearchableDataView(data, searchColumns);
}

// Usage
const searchView = createSearchableView(myData, [0, 1, 2]); // Search in first 3 columns
searchView.search('product').highlightMatches();
const searchResults = searchView.getView();
```

## Data Validation and Cleaning

### Data Quality Checker

```javascript
class DataQualityChecker {
  constructor(data) {
    this.data = data;
    this.issues = [];
  }

  checkForNulls() {
    for (let col = 0; col < this.data.getNumberOfColumns(); col++) {
      let nullCount = 0;

      for (let row = 0; row < this.data.getNumberOfRows(); row++) {
        if (this.data.getValue(row, col) === null) {
          nullCount++;
        }
      }

      if (nullCount > 0) {
        this.issues.push({
          type: 'null_values',
          column: col,
          columnLabel: this.data.getColumnLabel(col),
          count: nullCount,
          percentage: (nullCount / this.data.getNumberOfRows()) * 100
        });
      }
    }

    return this;
  }

  checkForDuplicates(keyColumns) {
    const seen = new Set();
    const duplicates = [];

    for (let row = 0; row < this.data.getNumberOfRows(); row++) {
      const key = keyColumns.map(col => this.data.getValue(row, col)).join('|');

      if (seen.has(key)) {
        duplicates.push(row);
      } else {
        seen.add(key);
      }
    }

    if (duplicates.length > 0) {
      this.issues.push({
        type: 'duplicates',
        rows: duplicates,
        count: duplicates.length
      });
    }

    return this;
  }

  checkDataTypes() {
    for (let col = 0; col < this.data.getNumberOfColumns(); col++) {
      const expectedType = this.data.getColumnType(col);
      const invalidRows = [];

      for (let row = 0; row < this.data.getNumberOfRows(); row++) {
        const value = this.data.getValue(row, col);
        if (value !== null && !this.isValidType(value, expectedType)) {
          invalidRows.push(row);
        }
      }

      if (invalidRows.length > 0) {
        this.issues.push({
          type: 'invalid_type',
          column: col,
          columnLabel: this.data.getColumnLabel(col),
          expectedType: expectedType,
          invalidRows: invalidRows,
          count: invalidRows.length
        });
      }
    }

    return this;
  }

  checkRanges(columnRanges) {
    for (const [col, range] of Object.entries(columnRanges)) {
      const colIndex = parseInt(col);
      const outOfRangeRows = [];

      for (let row = 0; row < this.data.getNumberOfRows(); row++) {
        const value = this.data.getValue(row, colIndex);

        if (value !== null) {
          if ((range.min !== undefined && value < range.min) ||
              (range.max !== undefined && value > range.max)) {
            outOfRangeRows.push(row);
          }
        }
      }

      if (outOfRangeRows.length > 0) {
        this.issues.push({
          type: 'out_of_range',
          column: colIndex,
          columnLabel: this.data.getColumnLabel(colIndex),
          range: range,
          invalidRows: outOfRangeRows,
          count: outOfRangeRows.length
        });
      }
    }

    return this;
  }

  isValidType(value, expectedType) {
    switch (expectedType) {
      case 'string': return typeof value === 'string';
      case 'number': return typeof value === 'number' && !isNaN(value);
      case 'boolean': return typeof value === 'boolean';
      case 'date':
      case 'datetime': return value instanceof Date;
      case 'timeofday': return Array.isArray(value) && value.length >= 3;
      default: return true;
    }
  }

  getReport() {
    return {
      totalRows: this.data.getNumberOfRows(),
      totalColumns: this.data.getNumberOfColumns(),
      issues: this.issues,
      issueCount: this.issues.length,
      isClean: this.issues.length === 0
    };
  }

  generateCleanedData() {
    // Create a cleaned version of the data
    const cleanedData = this.data.clone();

    // Handle null values by removing rows or filling with defaults
    // Handle duplicates by removing duplicate rows
    // Handle invalid types by converting or removing

    return cleanedData;
  }
}

// Usage
const qualityChecker = new DataQualityChecker(myData);
const report = qualityChecker
  .checkForNulls()
  .checkForDuplicates([0, 1]) // Check for duplicates based on first two columns
  .checkDataTypes()
  .checkRanges({
    1: { min: 0, max: 1000 }, // Column 1 should be between 0 and 1000
    2: { min: 0 }             // Column 2 should be positive
  })
  .getReport();

console.log('Data Quality Report:', report);
```

## Performance Optimization

### Efficient Data Processing

```javascript
class DataProcessor {
  static batchProcess(data, operations, batchSize = 1000) {
    return new Promise((resolve) => {
      const results = [];
      let currentIndex = 0;

      function processBatch() {
        const endIndex = Math.min(currentIndex + batchSize, data.getNumberOfRows());

        for (let i = currentIndex; i < endIndex; i++) {
          const row = [];
          for (let j = 0; j < data.getNumberOfColumns(); j++) {
            row.push(data.getValue(i, j));
          }

          // Apply operations
          const processedRow = operations.reduce((acc, op) => op(acc, i), row);
          results.push(processedRow);
        }

        currentIndex = endIndex;

        if (currentIndex < data.getNumberOfRows()) {
          // Process next batch asynchronously
          setTimeout(processBatch, 0);
        } else {
          resolve(results);
        }
      }

      processBatch();
    });
  }

  static memoizeCalculation(calculationFunc) {
    const cache = new Map();

    return function(dt, row) {
      const key = `${row}`;

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = calculationFunc(dt, row);
      cache.set(key, result);

      return result;
    };
  }

  static createIndexedView(data, indexColumn) {
    const index = new Map();

    for (let i = 0; i < data.getNumberOfRows(); i++) {
      const key = data.getValue(i, indexColumn);
      if (!index.has(key)) {
        index.set(key, []);
      }
      index.get(key).push(i);
    }

    return {
      findRows: (value) => index.get(value) || [],
      getIndex: () => index
    };
  }
}
```

## Next Steps

- Explore [Performance Best Practices](./performance-best-practices.md) for optimization techniques
- Learn about [Dashboard Creation](./dashboard-creation.md) for building complex interfaces
- See [Chart Events and Interactivity](./chart-events.md) for user interaction patterns
- Check out [Data Import and Export](./data-import-export.md) for working with external data sources
