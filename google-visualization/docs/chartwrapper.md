---
sidebar_position: 7
title: ChartWrapper
---

# ChartWrapper

The `google.visualization.ChartWrapper` is a powerful wrapper class that provides a unified interface for creating and managing charts. It's the recommended approach for most chart implementations as it simplifies chart creation and provides additional functionality.

## Why Use ChartWrapper?

### Benefits over Direct Chart Classes

1. **Unified Interface**: Same API for all chart types
2. **Simplified Creation**: Less boilerplate code
3. **Built-in Error Handling**: Better error management
4. **Event Management**: Easier event handling
5. **Dynamic Chart Types**: Can change chart type without recreating
6. **Serialization**: Easy to save/load chart configurations

## Basic Usage

### Simple Chart Creation

```javascript
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  const wrapper = new google.visualization.ChartWrapper({
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work', 8],
      ['Eat', 2],
      ['Sleep', 8],
      ['Exercise', 2],
      ['Leisure', 4]
    ],
    options: {
      title: 'My Daily Activities',
      width: 400,
      height: 300
    },
    containerId: 'chart_div'
  });

  wrapper.draw();
}
```

### Using with DataTable

```javascript
function drawChartWithDataTable() {
  // Create DataTable
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Month');
  data.addColumn('number', 'Sales');
  data.addRows([
    ['Jan', 1000],
    ['Feb', 1170],
    ['Mar', 660],
    ['Apr', 1030]
  ]);

  // Create ChartWrapper
  const wrapper = new google.visualization.ChartWrapper({
    chartType: 'LineChart',
    dataTable: data,
    options: {
      title: 'Monthly Sales',
      curveType: 'function',
      legend: { position: 'bottom' }
    },
    containerId: 'chart_div'
  });

  wrapper.draw();
}
```

## Configuration Options

### Complete Configuration Object

```javascript
const wrapper = new google.visualization.ChartWrapper({
  // Required: Chart type
  chartType: 'ColumnChart',

  // Required: Container element ID
  containerId: 'my_chart_div',

  // Data source (one of these)
  dataTable: myDataTable,           // DataTable object
  dataSourceUrl: 'data.csv',        // URL to data source
  query: 'SELECT A, B FROM ...',    // Query string
  refreshInterval: 5,               // Auto-refresh interval (seconds)

  // Chart options
  options: {
    title: 'My Chart',
    width: 600,
    height: 400,
    backgroundColor: '#f0f0f0',
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
  },

  // View specification (for DataView-like functionality)
  view: {
    columns: [0, 1, 2],
    rows: [0, 1, 2, 3, 4]
  }
});
```

## Dynamic Chart Management

### Changing Chart Type

```javascript
let wrapper = new google.visualization.ChartWrapper({
  chartType: 'ColumnChart',
  dataTable: data,
  options: { title: 'Sales Data' },
  containerId: 'chart_div'
});

wrapper.draw();

// Change to line chart
function switchToLineChart() {
  wrapper.setChartType('LineChart');
  wrapper.setOption('curveType', 'function');
  wrapper.draw();
}

// Change to pie chart
function switchToPieChart() {
  wrapper.setChartType('PieChart');
  wrapper.setOption('is3D', true);
  wrapper.draw();
}
```

### Updating Data

```javascript
// Update with new DataTable
function updateData(newData) {
  wrapper.setDataTable(newData);
  wrapper.draw();
}

// Update with array data
function updateWithArray(arrayData) {
  wrapper.setDataTable(arrayData);
  wrapper.draw();
}

// Update from URL
function updateFromUrl(url) {
  wrapper.setDataSourceUrl(url);
  wrapper.draw();
}
```

### Modifying Options

```javascript
// Set individual options
wrapper.setOption('title', 'New Title');
wrapper.setOption('width', 800);
wrapper.setOption('height', 600);

// Set multiple options
wrapper.setOptions({
  title: 'Updated Chart',
  backgroundColor: '#ffffff',
  colors: ['#ff0000', '#00ff00', '#0000ff']
});

// Get current options
const currentOptions = wrapper.getOptions();
console.log('Current title:', currentOptions.title);
```

## Event Handling

### Chart Events

```javascript
const wrapper = new google.visualization.ChartWrapper({
  chartType: 'ColumnChart',
  dataTable: data,
  options: { title: 'Interactive Chart' },
  containerId: 'chart_div'
});

// Listen for ready event
google.visualization.events.addListener(wrapper, 'ready', function() {
  console.log('Chart is ready');

  // Now you can add listeners to the actual chart
  const chart = wrapper.getChart();

  google.visualization.events.addListener(chart, 'select', function() {
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const row = selection[0].row;
      const col = selection[0].column;
      console.log('Selected:', row, col);
    }
  });
});

// Listen for error events
google.visualization.events.addListener(wrapper, 'error', function(error) {
  console.error('Chart error:', error);
  document.getElementById('error_div').innerHTML =
    `Error: ${error.message}`;
});

wrapper.draw();
```

### Wrapper-Specific Events

```javascript
// Listen for chart type changes
google.visualization.events.addListener(wrapper, 'chartTypeChanged', function() {
  console.log('Chart type changed to:', wrapper.getChartType());
});

// Listen for data changes
google.visualization.events.addListener(wrapper, 'dataTableChanged', function() {
  console.log('Data table updated');
});

// Listen for option changes
google.visualization.events.addListener(wrapper, 'optionsChanged', function() {
  console.log('Options updated');
});
```

## Advanced Features

### Using with DataView

```javascript
// Create base data
const baseData = new google.visualization.DataTable();
baseData.addColumn('string', 'Product');
baseData.addColumn('number', 'Q1');
baseData.addColumn('number', 'Q2');
baseData.addColumn('number', 'Q3');
baseData.addColumn('number', 'Q4');

baseData.addRows([
  ['Product A', 100, 120, 130, 140],
  ['Product B', 200, 180, 190, 210],
  ['Product C', 150, 160, 140, 180]
]);

// Use view specification in wrapper
const wrapper = new google.visualization.ChartWrapper({
  chartType: 'ColumnChart',
  dataTable: baseData,
  view: {
    columns: [0, 1, 2] // Show only Product, Q1, Q2
  },
  options: { title: 'Q1 vs Q2 Performance' },
  containerId: 'chart_div'
});

wrapper.draw();

// Change view dynamically
function showAllQuarters() {
  wrapper.setView({ columns: [0, 1, 2, 3, 4] });
  wrapper.draw();
}

function showOnlyQ4() {
  wrapper.setView({ columns: [0, 4] });
  wrapper.draw();
}
```

### Query Integration

```javascript
// Using Google Sheets as data source
const wrapper = new google.visualization.ChartWrapper({
  chartType: 'LineChart',
  dataSourceUrl: 'https://docs.google.com/spreadsheets/d/1234567890/edit#gid=0',
  query: 'SELECT A, B, C WHERE B > 100',
  refreshInterval: 30, // Refresh every 30 seconds
  options: {
    title: 'Live Data from Google Sheets'
  },
  containerId: 'chart_div'
});

wrapper.draw();
```

### Serialization and Storage

```javascript
// Save chart configuration
function saveChartConfig() {
  const config = {
    chartType: wrapper.getChartType(),
    options: wrapper.getOptions(),
    containerId: wrapper.getContainerId()
    // Note: DataTable needs special handling for serialization
  };

  localStorage.setItem('chartConfig', JSON.stringify(config));
}

// Load chart configuration
function loadChartConfig() {
  const configStr = localStorage.getItem('chartConfig');
  if (configStr) {
    const config = JSON.parse(configStr);

    const newWrapper = new google.visualization.ChartWrapper({
      chartType: config.chartType,
      dataTable: getCurrentData(), // Get current data
      options: config.options,
      containerId: config.containerId
    });

    newWrapper.draw();
    return newWrapper;
  }
}
```

## Multiple Charts Management

### Chart Dashboard

```javascript
class ChartDashboard {
  constructor() {
    this.charts = new Map();
  }

  addChart(id, config) {
    const wrapper = new google.visualization.ChartWrapper(config);

    // Add common event handlers
    google.visualization.events.addListener(wrapper, 'ready', () => {
      console.log(`Chart ${id} is ready`);
    });

    google.visualization.events.addListener(wrapper, 'error', (error) => {
      console.error(`Chart ${id} error:`, error);
    });

    this.charts.set(id, wrapper);
    wrapper.draw();

    return wrapper;
  }

  updateChart(id, newData) {
    const wrapper = this.charts.get(id);
    if (wrapper) {
      wrapper.setDataTable(newData);
      wrapper.draw();
    }
  }

  changeChartType(id, newType) {
    const wrapper = this.charts.get(id);
    if (wrapper) {
      wrapper.setChartType(newType);
      wrapper.draw();
    }
  }

  removeChart(id) {
    const wrapper = this.charts.get(id);
    if (wrapper) {
      // Clear the container
      const containerId = wrapper.getContainerId();
      document.getElementById(containerId).innerHTML = '';
      this.charts.delete(id);
    }
  }
}

// Usage
const dashboard = new ChartDashboard();

dashboard.addChart('sales', {
  chartType: 'LineChart',
  dataTable: salesData,
  options: { title: 'Sales Trend' },
  containerId: 'sales_chart'
});

dashboard.addChart('expenses', {
  chartType: 'PieChart',
  dataTable: expenseData,
  options: { title: 'Expense Breakdown' },
  containerId: 'expense_chart'
});
```

## Error Handling and Debugging

### Comprehensive Error Handling

```javascript
function createRobustChart(config) {
  try {
    const wrapper = new google.visualization.ChartWrapper(config);

    // Handle wrapper errors
    google.visualization.events.addListener(wrapper, 'error', function(error) {
      console.error('Wrapper error:', error);

      // Display user-friendly error message
      const container = document.getElementById(config.containerId);
      container.innerHTML = `
        <div class="chart-error">
          <h3>Chart Error</h3>
          <p>${error.message}</p>
          <button onclick="retryChart('${config.containerId}')">Retry</button>
        </div>
      `;
    });

    // Handle ready event
    google.visualization.events.addListener(wrapper, 'ready', function() {
      console.log('Chart loaded successfully');

      // Add chart-specific event handlers
      const chart = wrapper.getChart();
      if (chart) {
        google.visualization.events.addListener(chart, 'select', function() {
          handleChartSelection(chart);
        });
      }
    });

    wrapper.draw();
    return wrapper;

  } catch (error) {
    console.error('Failed to create chart:', error);

    const container = document.getElementById(config.containerId);
    container.innerHTML = `
      <div class="chart-error">
        <h3>Failed to Create Chart</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

function retryChart(containerId) {
  // Retry logic here
  console.log('Retrying chart for container:', containerId);
}
```

## Best Practices

### Performance Optimization

```javascript
// Good - reuse wrapper for updates
const wrapper = new google.visualization.ChartWrapper(config);

function updateChart(newData) {
  wrapper.setDataTable(newData);
  wrapper.draw(); // Efficient update
}

// Avoid - creating new wrapper each time
function inefficientUpdate(newData) {
  const newWrapper = new google.visualization.ChartWrapper({
    // ... full config
    dataTable: newData
  });
  newWrapper.draw(); // Wasteful
}
```

### Memory Management

```javascript
class ChartManager {
  constructor() {
    this.activeCharts = new Map();
  }

  createChart(id, config) {
    // Clean up existing chart if any
    this.destroyChart(id);

    const wrapper = new google.visualization.ChartWrapper(config);
    this.activeCharts.set(id, wrapper);
    wrapper.draw();

    return wrapper;
  }

  destroyChart(id) {
    const wrapper = this.activeCharts.get(id);
    if (wrapper) {
      // Clear container
      const containerId = wrapper.getContainerId();
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }

      // Remove from tracking
      this.activeCharts.delete(id);
    }
  }

  destroyAll() {
    for (const [id] of this.activeCharts) {
      this.destroyChart(id);
    }
  }
}
```

## Next Steps

- Learn about [Chart Events and Interactivity](./chart-events.md) for advanced event handling
- Explore [Dashboard Creation](./dashboard-creation.md) for building complex dashboards
- See [Chart Customization](./chart-customization.md) for styling and theming
- Check out [Performance Best Practices](./performance-best-practices.md) for optimization tips
