---
sidebar_position: 6
title: Chart Integration
---

# Chart Integration

This guide shows you how to integrate DataTables and DataViews with different chart types, handle events, and create interactive visualizations.

## Basic Chart Integration

### Using DataTable with Charts

```javascript
// Create data
const data = new google.visualization.DataTable();
data.addColumn('string', 'Month');
data.addColumn('number', 'Sales');
data.addColumn('number', 'Expenses');

data.addRows([
  ['Jan', 1000, 400],
  ['Feb', 1170, 460],
  ['Mar', 660, 1120],
  ['Apr', 1030, 540]
]);

// Create chart
const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
chart.draw(data, {
  title: 'Company Performance',
  curveType: 'function',
  legend: { position: 'bottom' }
});
```

### Using DataView with Charts

```javascript
// Original data with multiple metrics
const fullData = new google.visualization.DataTable();
fullData.addColumn('string', 'Product');
fullData.addColumn('number', 'Q1');
fullData.addColumn('number', 'Q2');
fullData.addColumn('number', 'Q3');
fullData.addColumn('number', 'Q4');

fullData.addRows([
  ['Product A', 100, 120, 130, 140],
  ['Product B', 200, 180, 190, 210],
  ['Product C', 150, 160, 140, 180]
]);

// Create view showing only Q1 and Q2
const q1q2View = new google.visualization.DataView(fullData);
q1q2View.setColumns([0, 1, 2]); // Product, Q1, Q2

// Use view with chart
const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
chart.draw(q1q2View, {
  title: 'Q1 vs Q2 Performance',
  hAxis: { title: 'Products' },
  vAxis: { title: 'Sales' }
});
```

## Chart Types and Data Requirements

### Pie Chart
Requires exactly 2 columns: labels (string) and values (number).

```javascript
const data = google.visualization.arrayToDataTable([
  ['Category', 'Percentage'],
  ['Desktop', 58.9],
  ['Mobile', 35.8],
  ['Tablet', 5.3]
]);

const chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
chart.draw(data, {
  title: 'Device Usage',
  pieHole: 0.4 // Creates a donut chart
});
```

### Line Chart
First column: x-axis values, subsequent columns: data series.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', 'Expenses'],
  ['2019', 1000, 400],
  ['2020', 1170, 460],
  ['2021', 660, 1120],
  ['2022', 1030, 540]
]);

const chart = new google.visualization.LineChart(document.getElementById('line_chart'));
chart.draw(data, {
  title: 'Company Performance',
  curveType: 'function',
  legend: { position: 'bottom' }
});
```

### Bar/Column Chart
Similar to line chart: categories and one or more data series.

```javascript
const data = google.visualization.arrayToDataTable([
  ['City', '2020 Population', '2021 Population'],
  ['New York', 8175000, 8230000],
  ['Los Angeles', 3792000, 3898000],
  ['Chicago', 2695000, 2746000],
  ['Houston', 2099000, 2304000]
]);

const chart = new google.visualization.ColumnChart(document.getElementById('column_chart'));
chart.draw(data, {
  title: 'Population by City',
  chartArea: { width: '50%' },
  hAxis: { title: 'Total Population', minValue: 0 },
  vAxis: { title: 'City' }
});
```

### Scatter Chart
Requires at least 2 numeric columns for x and y coordinates.

```javascript
const data = google.visualization.arrayToDataTable([
  ['Age', 'Weight'],
  [8, 12], [4, 5.5], [11, 14], [4, 5], [3, 3.5],
  [6.5, 7], [3, 4], [6, 6.5], [7, 8], [2, 2]
]);

const chart = new google.visualization.ScatterChart(document.getElementById('scatter_chart'));
chart.draw(data, {
  title: 'Age vs. Weight comparison',
  hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
  vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
  legend: 'none'
});
```

### Table Chart
Can display any DataTable structure.

```javascript
const data = new google.visualization.DataTable();
data.addColumn('string', 'Name');
data.addColumn('number', 'Salary');
data.addColumn('boolean', 'Full Time Employee');

data.addRows([
  ['Mike', 10000, true],
  ['Jim', 8000, false],
  ['Alice', 12500, true],
  ['Bob', 7000, true]
]);

const table = new google.visualization.Table(document.getElementById('table_div'));
table.draw(data, {
  width: '100%',
  height: '100%',
  alternatingRowStyle: false
});
```

## Dynamic Data Updates

### Updating Chart Data

```javascript
let data = new google.visualization.DataTable();
data.addColumn('string', 'Month');
data.addColumn('number', 'Sales');

// Initial data
data.addRows([
  ['Jan', 1000],
  ['Feb', 1170],
  ['Mar', 660]
]);

const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
chart.draw(data, options);

// Function to add new data
function addDataPoint(month, sales) {
  data.addRow([month, sales]);
  chart.draw(data, options); // Redraw chart
}

// Function to update existing data
function updateDataPoint(rowIndex, newValue) {
  data.setValue(rowIndex, 1, newValue);
  chart.draw(data, options);
}

// Usage
addDataPoint('Apr', 1030);
updateDataPoint(0, 1100); // Update January sales
```

### Real-time Data Updates

```javascript
function createRealtimeChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('datetime', 'Time');
  data.addColumn('number', 'Value');

  const chart = new google.visualization.LineChart(document.getElementById('realtime_chart'));

  const options = {
    title: 'Real-time Data',
    hAxis: { format: 'HH:mm:ss' },
    vAxis: { minValue: 0 },
    legend: { position: 'none' }
  };

  // Update every second
  setInterval(() => {
    const now = new Date();
    const value = Math.random() * 100;

    data.addRow([now, value]);

    // Keep only last 50 points
    if (data.getNumberOfRows() > 50) {
      data.removeRow(0);
    }

    chart.draw(data, options);
  }, 1000);
}
```

## Event Handling

### Chart Events

```javascript
const data = google.visualization.arrayToDataTable([
  ['Element', 'Density'],
  ['Copper', 8.94],
  ['Silver', 10.49],
  ['Gold', 19.30],
  ['Platinum', 21.45]
]);

const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

// Listen for select events
google.visualization.events.addListener(chart, 'select', function() {
  const selection = chart.getSelection();
  if (selection.length > 0) {
    const row = selection[0].row;
    const element = data.getValue(row, 0);
    const density = data.getValue(row, 1);
    alert(`Selected: ${element} (${density})`);
  }
});

// Listen for ready events
google.visualization.events.addListener(chart, 'ready', function() {
  console.log('Chart is ready');
});

// Listen for error events
google.visualization.events.addListener(chart, 'error', function(error) {
  console.error('Chart error:', error);
});

chart.draw(data, options);
```

### Mouse Events

```javascript
// Mouse over events
google.visualization.events.addListener(chart, 'onmouseover', function(e) {
  console.log('Mouse over row:', e.row, 'column:', e.column);
});

// Mouse out events
google.visualization.events.addListener(chart, 'onmouseout', function(e) {
  console.log('Mouse out');
});
```

## Multiple Charts from One DataTable

### Dashboard Example

```javascript
// Main data source
const salesData = new google.visualization.DataTable();
salesData.addColumn('string', 'Region');
salesData.addColumn('number', 'Q1');
salesData.addColumn('number', 'Q2');
salesData.addColumn('number', 'Q3');
salesData.addColumn('number', 'Q4');

salesData.addRows([
  ['North', 100, 120, 130, 140],
  ['South', 200, 180, 190, 210],
  ['East', 150, 160, 140, 180],
  ['West', 180, 170, 160, 190]
]);

// Chart 1: Q1 Performance by Region
const q1View = new google.visualization.DataView(salesData);
q1View.setColumns([0, 1]);

const chart1 = new google.visualization.PieChart(document.getElementById('chart1'));
chart1.draw(q1View, { title: 'Q1 Sales by Region' });

// Chart 2: Quarterly Trends
const trendView = new google.visualization.DataView(salesData);
// Keep all columns for trend analysis

const chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
chart2.draw(trendView, {
  title: 'Quarterly Sales Trends',
  hAxis: { title: 'Quarter' }
});

// Chart 3: Total Sales by Region
const totalView = new google.visualization.DataView(salesData);
totalView.setColumns([
  0, // Region
  {
    calc: function(dt, row) {
      return dt.getValue(row, 1) + dt.getValue(row, 2) +
             dt.getValue(row, 3) + dt.getValue(row, 4);
    },
    type: 'number',
    label: 'Total Sales'
  }
]);

const chart3 = new google.visualization.ColumnChart(document.getElementById('chart3'));
chart3.draw(totalView, { title: 'Total Sales by Region' });
```

## Advanced Integration Patterns

### Chart Synchronization

```javascript
function createSynchronizedCharts() {
  const data = new google.visualization.DataTable();
  // ... populate data

  const chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
  const chart2 = new google.visualization.ColumnChart(document.getElementById('chart2'));

  // Synchronize selections
  google.visualization.events.addListener(chart1, 'select', function() {
    const selection = chart1.getSelection();
    chart2.setSelection(selection);
  });

  google.visualization.events.addListener(chart2, 'select', function() {
    const selection = chart2.getSelection();
    chart1.setSelection(selection);
  });

  chart1.draw(data, options1);
  chart2.draw(data, options2);
}
```

### Conditional Chart Types

```javascript
function createAdaptiveChart(data, containerElement) {
  const numRows = data.getNumberOfRows();
  const numCols = data.getNumberOfColumns();

  let chart;
  let options = { title: 'Adaptive Chart' };

  if (numCols === 2 && numRows <= 10) {
    // Small dataset with 2 columns - use pie chart
    chart = new google.visualization.PieChart(containerElement);
  } else if (numCols === 2) {
    // Two columns - use column chart
    chart = new google.visualization.ColumnChart(containerElement);
  } else if (numCols > 2) {
    // Multiple series - use line chart
    chart = new google.visualization.LineChart(containerElement);
    options.curveType = 'function';
  } else {
    // Fallback to table
    chart = new google.visualization.Table(containerElement);
  }

  chart.draw(data, options);
  return chart;
}
```

### Error Handling

```javascript
function drawChartWithErrorHandling(data, options) {
  try {
    const chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    google.visualization.events.addListener(chart, 'error', function(error) {
      console.error('Chart error:', error);
      document.getElementById('error_div').innerHTML =
        `<p>Error: ${error.message}</p>`;
    });

    google.visualization.events.addListener(chart, 'ready', function() {
      document.getElementById('error_div').innerHTML = '';
    });

    chart.draw(data, options);
  } catch (error) {
    console.error('Failed to create chart:', error);
    document.getElementById('error_div').innerHTML =
      `<p>Failed to create chart: ${error.message}</p>`;
  }
}
```

## Performance Optimization

### Efficient Data Updates

```javascript
// Good - batch updates
function updateMultiplePoints(updates) {
  // Collect all updates
  updates.forEach(update => {
    data.setValue(update.row, update.col, update.value);
  });

  // Single redraw
  chart.draw(data, options);
}

// Avoid - multiple redraws
function inefficientUpdate(updates) {
  updates.forEach(update => {
    data.setValue(update.row, update.col, update.value);
    chart.draw(data, options); // Expensive!
  });
}
```

### Large Dataset Handling

```javascript
function handleLargeDataset(largeData) {
  // Use DataView to show only visible portion
  const view = new google.visualization.DataView(largeData);

  // Show only first 1000 rows
  const visibleRows = [];
  for (let i = 0; i < Math.min(1000, largeData.getNumberOfRows()); i++) {
    visibleRows.push(i);
  }
  view.setRows(visibleRows);

  const chart = new google.visualization.Table(document.getElementById('table_div'));
  chart.draw(view, {
    page: 'enable',
    pageSize: 50,
    pagingSymbols: { prev: 'prev', next: 'next' }
  });
}
```

## Next Steps

- Explore [Chart Events and Interactivity](./chart-events.md) for advanced event handling
- Learn about [Chart Customization](./chart-customization.md) for styling and theming
- See [Dashboard Creation](./dashboard-creation.md) for building complex dashboards
- Check out [Performance Best Practices](./performance-best-practices.md) for optimization tips
