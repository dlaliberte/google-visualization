---
sidebar_position: 5
title: DataView
---

# DataView

A `google.visualization.DataView` is a read-only view of a DataTable that allows you to select, reorder, and transform data without modifying the original DataTable. It's perfect for creating multiple charts from the same dataset or applying filters and calculations.

## What is a DataView?

Think of a DataView as a "lens" through which you can view your data differently:

- **Non-destructive**: The original DataTable remains unchanged
- **Efficient**: No data duplication - views reference the original data
- **Flexible**: Multiple views can show different perspectives of the same data
- **Dynamic**: Views can be updated to show different subsets

## Creating a DataView

### Basic Creation

```javascript
// Start with a DataTable
const data = new google.visualization.DataTable();
data.addColumn('string', 'Country');
data.addColumn('number', 'Population');
data.addColumn('number', 'Area');
data.addColumn('number', 'GDP');

data.addRows([
  ['China', 1439323776, 9596961, 14342903],
  ['India', 1380004385, 3287263, 3173398],
  ['United States', 331002651, 9833517, 21427700],
  ['Indonesia', 273523615, 1904569, 1289429],
  ['Pakistan', 220892340, 881913, 346343]
]);

// Create a view of the data
const view = new google.visualization.DataView(data);
```

## Column Operations

### Selecting Columns

```javascript
// Show only specific columns (by index)
view.setColumns([0, 1]); // Country and Population only

// Show columns by ID (if columns have IDs)
view.setColumns(['country', 'population']);

// Reorder columns
view.setColumns([1, 0, 2]); // Population, Country, Area
```

### Column Specifications

For more control, use column specification objects:

```javascript
view.setColumns([
  0, // Country (unchanged)
  {
    calc: function(dt, row) {
      return dt.getValue(row, 1) / 1000000; // Population in millions
    },
    type: 'number',
    label: 'Population (Millions)'
  },
  2 // Area (unchanged)
]);
```

### Calculated Columns

Create new columns based on existing data:

```javascript
view.setColumns([
  0, // Country
  1, // Population
  2, // Area
  {
    calc: function(dt, row) {
      const population = dt.getValue(row, 1);
      const area = dt.getValue(row, 2);
      return population / area; // Population density
    },
    type: 'number',
    label: 'Population Density'
  }
]);
```

### Predefined Calculations

Use built-in calculation functions:

```javascript
view.setColumns([
  0, // Country
  1, // Population
  {
    calc: 'stringify',
    sourceColumn: 1,
    type: 'string',
    label: 'Population (Text)'
  }
]);
```

## Row Operations

### Filtering Rows

```javascript
// Show only rows where population > 500 million
view.setRows(view.getFilteredRows([{
  column: 1,
  minValue: 500000000
}]));

// Multiple filters
view.setRows(view.getFilteredRows([
  {column: 1, minValue: 100000000}, // Population > 100M
  {column: 2, maxValue: 5000000}    // Area < 5M km²
]));
```

### Custom Row Filtering

```javascript
// Filter with custom function
const filteredRows = [];
for (let i = 0; i < data.getNumberOfRows(); i++) {
  const country = data.getValue(i, 0);
  const population = data.getValue(i, 1);

  // Include only countries starting with 'I' and population > 200M
  if (country.startsWith('I') && population > 200000000) {
    filteredRows.push(i);
  }
}
view.setRows(filteredRows);
```

### Sorting Rows

```javascript
// Sort by population (descending)
const sortedRows = data.getSortedRows([{column: 1, desc: true}]);
view.setRows(sortedRows);

// Multiple sort criteria
const sortedRows = data.getSortedRows([
  {column: 0, desc: false}, // Country A-Z
  {column: 1, desc: true}   // Then by population (high to low)
]);
view.setRows(sortedRows);
```

## Practical Examples

### Example 1: Top 5 Countries by Population

```javascript
// Create view showing top 5 countries by population
const topCountriesView = new google.visualization.DataView(data);

// Sort by population and take top 5
const sortedRows = data.getSortedRows([{column: 1, desc: true}]);
topCountriesView.setRows(sortedRows.slice(0, 5));

// Show only country and population
topCountriesView.setColumns([0, 1]);
```

### Example 2: Population Density Analysis

```javascript
const densityView = new google.visualization.DataView(data);

densityView.setColumns([
  0, // Country
  {
    calc: function(dt, row) {
      return dt.getValue(row, 1) / dt.getValue(row, 2);
    },
    type: 'number',
    label: 'Population Density (per km²)'
  },
  {
    calc: function(dt, row) {
      const density = dt.getValue(row, 1) / dt.getValue(row, 2);
      if (density > 100) return 'High';
      if (density > 50) return 'Medium';
      return 'Low';
    },
    type: 'string',
    label: 'Density Category'
  }
]);
```

### Example 3: Regional Filtering

```javascript
// Create views for different regions
const asianCountries = ['China', 'India', 'Indonesia', 'Pakistan'];

const asiaView = new google.visualization.DataView(data);
const asianRows = [];

for (let i = 0; i < data.getNumberOfRows(); i++) {
  if (asianCountries.includes(data.getValue(i, 0))) {
    asianRows.push(i);
  }
}

asiaView.setRows(asianRows);
```

## Advanced Features

### Conditional Formatting with Views

```javascript
view.setColumns([
  0, // Country
  1, // Population
  {
    calc: function(dt, row) {
      const population = dt.getValue(row, 1);
      return {
        v: population,
        f: population.toLocaleString(),
        p: {
          style: population > 1000000000 ? 'color: red; font-weight: bold;' : ''
        }
      };
    },
    type: 'number',
    label: 'Population (Formatted)'
  }
]);
```

### Aggregation Views

```javascript
// Create summary statistics
const summaryView = new google.visualization.DataView(data);

summaryView.setColumns([
  {
    calc: function() { return 'Total'; },
    type: 'string',
    label: 'Statistic'
  },
  {
    calc: function(dt) {
      let total = 0;
      for (let i = 0; i < dt.getNumberOfRows(); i++) {
        total += dt.getValue(i, 1);
      }
      return total;
    },
    type: 'number',
    label: 'World Population'
  }
]);

// Show only one row with the summary
summaryView.setRows([0]);
```

## Performance Considerations

### Efficient Filtering

```javascript
// Good - use built-in filtering
const filtered = view.getFilteredRows([{column: 1, minValue: 1000000}]);
view.setRows(filtered);

// Less efficient - manual filtering
const manualFiltered = [];
for (let i = 0; i < data.getNumberOfRows(); i++) {
  if (data.getValue(i, 1) > 1000000) {
    manualFiltered.push(i);
  }
}
view.setRows(manualFiltered);
```

### Caching Calculations

```javascript
// Cache expensive calculations
const calculationCache = new Map();

view.setColumns([
  0,
  {
    calc: function(dt, row) {
      const key = `${row}`;
      if (!calculationCache.has(key)) {
        // Expensive calculation
        const result = complexCalculation(dt.getValue(row, 1));
        calculationCache.set(key, result);
      }
      return calculationCache.get(key);
    },
    type: 'number',
    label: 'Calculated Value'
  }
]);
```

## Using Views with Charts

### Multiple Charts from One DataTable

```javascript
// Original data
const salesData = new google.visualization.DataTable();
salesData.addColumn('string', 'Product');
salesData.addColumn('number', 'Q1');
salesData.addColumn('number', 'Q2');
salesData.addColumn('number', 'Q3');
salesData.addColumn('number', 'Q4');

// Chart 1: Q1 vs Q2
const q1q2View = new google.visualization.DataView(salesData);
q1q2View.setColumns([0, 1, 2]);

const chart1 = new google.visualization.ScatterChart(document.getElementById('chart1'));
chart1.draw(q1q2View, {title: 'Q1 vs Q2 Sales'});

// Chart 2: Total sales by product
const totalView = new google.visualization.DataView(salesData);
totalView.setColumns([
  0,
  {
    calc: function(dt, row) {
      return dt.getValue(row, 1) + dt.getValue(row, 2) +
             dt.getValue(row, 3) + dt.getValue(row, 4);
    },
    type: 'number',
    label: 'Total Sales'
  }
]);

const chart2 = new google.visualization.ColumnChart(document.getElementById('chart2'));
chart2.draw(totalView, {title: 'Total Sales by Product'});
```

## Best Practices

### 1. Use Views for Data Transformation

```javascript
// Good - use views for different perspectives
const originalData = new google.visualization.DataTable();
// ... populate data

const monthlyView = new google.visualization.DataView(originalData);
const quarterlyView = new google.visualization.DataView(originalData);
const yearlyView = new google.visualization.DataView(originalData);
```

### 2. Minimize Recalculation

```javascript
// Good - calculate once, reuse
const processedView = new google.visualization.DataView(data);
processedView.setColumns([/* calculated columns */]);

// Use the same view for multiple charts
chart1.draw(processedView, options1);
chart2.draw(processedView, options2);
```

### 3. Clear Views When Done

```javascript
// Clean up when no longer needed
view = null; // Allow garbage collection
```

## Common Use Cases

### Dashboard Creation

```javascript
// Main data
const dashboardData = loadData();

// KPI view
const kpiView = new google.visualization.DataView(dashboardData);
kpiView.setColumns([/* summary calculations */]);

// Trend view
const trendView = new google.visualization.DataView(dashboardData);
trendView.setRows(trendView.getFilteredRows([{column: 0, minValue: lastMonth}]));

// Comparison view
const comparisonView = new google.visualization.DataView(dashboardData);
comparisonView.setColumns([0, 1, 3]); // Skip column 2
```

### Data Exploration

```javascript
// Interactive filtering
function updateView(minValue, maxValue) {
  const filtered = data.getFilteredRows([
    {column: 1, minValue: minValue},
    {column: 1, maxValue: maxValue}
  ]);

  view.setRows(filtered);
  chart.draw(view, options);
}
```

## Next Steps

- Learn about [Chart Integration](./chart-integration.md) for using DataViews with charts
- Explore [Advanced Data Manipulation](./advanced-data-manipulation.md) for complex transformations
- See [Dashboard Creation](./dashboard-creation.md) for building interactive dashboards
