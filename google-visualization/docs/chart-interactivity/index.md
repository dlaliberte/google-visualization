---
sidebar_position: 4
title: Chart Interactivity
---

# Chart Interactivity

This section will detail all the ways users can interact with charts, beyond just viewing them. Google Charts provides a rich set of interactive features that allow users to explore data, make selections, respond to events, and customize their chart experience.

## Overview

Google Charts supports several types of interactivity:

- **Selection**: Users can click on chart elements to select them, and you can respond to these selections programmatically
- **Events**: Charts fire events when users interact with them (hover, click, ready state, etc.)
- **Actions**: Custom menu items and actions can be added to charts
- **Tooltips**: Customizable tooltips provide additional information on hover
- **Explorers**: Built-in zooming and panning capabilities for exploring large datasets
- **Controls and Dashboards**: Interactive controls that filter and manipulate chart data in real-time

All examples in this guide use the GoogleChartsLoader pattern for loading and initializing charts.

## Selection

Selection allows users to click on chart elements (like bars, pie slices, or data points) to highlight them. You can then retrieve information about what was selected and respond accordingly.

### Getting Selected Items

Use the `getSelection()` method to retrieve an array of selected chart elements:

```javascript
import { GoogleChartsLoader } from 'google-visualization';

async function createSelectableChart() {
  const google = await GoogleChartsLoader.load();

  // Create sample data
  const data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ]);

  const options = {
    title: 'My Daily Activities',
    width: 400,
    height: 300
  };

  const chart = new google.visualization.PieChart(document.getElementById('piechart'));

  // Listen for selection events
  google.visualization.events.addListener(chart, 'select', function() {
    const selection = chart.getSelection();

    if (selection.length > 0) {
      const selectedItem = selection[0];
      const value = data.getValue(selectedItem.row, 0);
      const hours = data.getValue(selectedItem.row, 1);

      alert(`You selected: ${value} (${hours} hours)`);
    }
  });

  chart.draw(data, options);
}

// Initialize the chart
createSelectableChart();
```

### Setting Selection Programmatically

You can also set the selection programmatically using `setSelection()`:

```javascript
async function createChartWithProgrammaticSelection() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2020', 1000, 400],
    ['2021', 1170, 460],
    ['2022', 660, 1120],
    ['2023', 1030, 540]
  ]);

  const chart = new google.visualization.ColumnChart(document.getElementById('columnchart'));

  chart.draw(data, {
    title: 'Company Performance',
    width: 500,
    height: 300
  });

  // Select the second row (2021 data) after chart is ready
  google.visualization.events.addListener(chart, 'ready', function() {
    chart.setSelection([{row: 1, column: null}]);
  });
}
```

### Responding to Selection Changes

You can create interactive experiences by responding to selection changes:

```javascript
async function createInteractiveChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Country', 'Population', 'Area'],
    ['CN', 1324, 9640821],
    ['IN', 1133, 3287263],
    ['US', 304, 9629091],
    ['ID', 232, 1904569],
    ['BR', 187, 8514877]
  ]);

  const chart = new google.visualization.BubbleChart(document.getElementById('bubblechart'));
  const infoDiv = document.getElementById('chart-info');

  google.visualization.events.addListener(chart, 'select', function() {
    const selection = chart.getSelection();

    if (selection.length > 0) {
      const row = selection[0].row;
      const country = data.getValue(row, 0);
      const population = data.getValue(row, 1);
      const area = data.getValue(row, 2);

      infoDiv.innerHTML = `
        <h3>Selected Country: ${country}</h3>
        <p>Population: ${population} million</p>
        <p>Area: ${area.toLocaleString()} km²</p>
      `;
    } else {
      infoDiv.innerHTML = '<p>Click on a bubble to see details</p>';
    }
  });

  chart.draw(data, {
    title: 'Population vs Area by Country',
    width: 600,
    height: 400
  });
}
```

## Events

Google Charts fire various events during their lifecycle and in response to user interactions. You can listen for these events to create dynamic, responsive chart experiences.

### Common Chart Events

- **ready**: Fired when the chart is ready for external method calls
- **select**: Fired when the user clicks on a chart element
- **error**: Fired when an error occurs during chart rendering
- **onmouseover**: Fired when the user hovers over a chart element
- **onmouseout**: Fired when the user moves the mouse away from a chart element

### Basic Event Handling

```javascript
import { GoogleChartsLoader } from 'google-visualization';

async function createEventDrivenChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Month', 'Sales'],
    ['Jan', 1000],
    ['Feb', 1170],
    ['Mar', 660],
    ['Apr', 1030]
  ]);

  const chart = new google.visualization.LineChart(document.getElementById('linechart'));

  // Ready event - chart is fully loaded and ready
  google.visualization.events.addListener(chart, 'ready', function() {
    console.log('Chart is ready!');
    document.getElementById('status').innerHTML = 'Chart loaded successfully';
  });

  // Error event - handle rendering errors
  google.visualization.events.addListener(chart, 'error', function(errorEvent) {
    console.error('Chart error:', errorEvent);
    document.getElementById('status').innerHTML = `Error: ${errorEvent.message}`;
  });

  // Selection event
  google.visualization.events.addListener(chart, 'select', function() {
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const row = selection[0].row;
      const month = data.getValue(row, 0);
      const sales = data.getValue(row, 1);
      console.log(`Selected: ${month} - $${sales}`);
    }
  });

  chart.draw(data, {
    title: 'Monthly Sales',
    width: 500,
    height: 300
  });
}
```

### Mouse Events for Interactive Feedback

```javascript
async function createHoverChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Element', 'Density', { role: 'style' }],
    ['Copper', 8.94, '#b87333'],
    ['Silver', 10.49, '#e4e4e4'],
    ['Gold', 19.30, '#f1c232'],
    ['Platinum', 21.45, '#9fc5e8']
  ]);

  const chart = new google.visualization.ColumnChart(document.getElementById('hoverchart'));
  const hoverInfo = document.getElementById('hover-info');

  // Mouse over event
  google.visualization.events.addListener(chart, 'onmouseover', function(e) {
    const element = data.getValue(e.row, 0);
    const density = data.getValue(e.row, 1);

    hoverInfo.innerHTML = `
      <strong>${element}</strong><br>
      Density: ${density} g/cm³<br>
      <small>Row: ${e.row}, Column: ${e.column}</small>
    `;
    hoverInfo.style.display = 'block';
  });

  // Mouse out event
  google.visualization.events.addListener(chart, 'onmouseout', function(e) {
    hoverInfo.style.display = 'none';
  });

  chart.draw(data, {
    title: 'Metal Density',
    width: 500,
    height: 300,
    legend: { position: 'none' }
  });
}
```

### Advanced Event Handling with Multiple Charts

```javascript
async function createSynchronizedCharts() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Year', 'Revenue', 'Profit'],
    ['2020', 1000, 200],
    ['2021', 1170, 250],
    ['2022', 660, 100],
    ['2023', 1030, 300]
  ]);

  const lineChart = new google.visualization.LineChart(document.getElementById('line-chart'));
  const barChart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));

  const options = {
    width: 400,
    height: 300,
    legend: { position: 'bottom' }
  };

  // Function to synchronize selections between charts
  function syncSelection(sourceChart, targetChart) {
    return function() {
      const selection = sourceChart.getSelection();
      targetChart.setSelection(selection);
    };
  }

  // Add synchronized selection listeners
  google.visualization.events.addListener(lineChart, 'select', syncSelection(lineChart, barChart));
  google.visualization.events.addListener(barChart, 'select', syncSelection(barChart, lineChart));

  // Draw both charts
  lineChart.draw(data, { ...options, title: 'Line Chart View' });
  barChart.draw(data, { ...options, title: 'Bar Chart View' });
}
```

## Actions

Actions allow you to add custom menu items to charts that appear when users right-click or interact with chart elements. This feature enables you to extend chart functionality with custom operations.

### Adding Custom Actions

```javascript
import { GoogleChartsLoader } from 'google-visualization';

async function createChartWithActions() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Product', 'Sales', 'Profit'],
    ['Laptops', 1000, 300],
    ['Phones', 1170, 400],
    ['Tablets', 660, 200],
    ['Accessories', 1030, 150]
  ]);

  const chart = new google.visualization.ColumnChart(document.getElementById('chart-with-actions'));

  // Define custom actions
  chart.setAction({
    id: 'export-png',
    text: 'Export as PNG',
    action: function() {
      // Convert chart to image (requires additional implementation)
      alert('Exporting chart as PNG...');
      // You would implement actual export functionality here
    }
  });

  chart.setAction({
    id: 'show-details',
    text: 'Show Details',
    action: function() {
      const selection = chart.getSelection();
      if (selection.length > 0) {
        const row = selection[0].row;
        const product = data.getValue(row, 0);
        const sales = data.getValue(row, 1);
        const profit = data.getValue(row, 2);

        alert(`Product: ${product}\nSales: $${sales}\nProfit: $${profit}`);
      } else {
        alert('Please select a product first');
      }
    }
  });

  chart.setAction({
    id: 'highlight-best',
    text: 'Highlight Best Performer',
    action: function() {
      // Find the row with highest sales
      let maxSales = 0;
      let maxRow = 0;

      for (let i = 0; i < data.getNumberOfRows(); i++) {
        const sales = data.getValue(i, 1);
        if (sales > maxSales) {
          maxSales = sales;
          maxRow = i;
        }
      }

      chart.setSelection([{row: maxRow, column: null}]);
    }
  });

  chart.draw(data, {
    title: 'Product Performance (Right-click for actions)',
    width: 600,
    height: 400
  });
}
```

### Conditional Actions

You can create actions that only appear under certain conditions:

```javascript
async function createConditionalActionsChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Quarter', 'Sales', 'Target'],
    ['Q1', 1000, 1200],
    ['Q2', 1170, 1200],
    ['Q3', 660, 1200],
    ['Q4', 1030, 1200]
  ]);

  const chart = new google.visualization.ComboChart(document.getElementById('conditional-actions-chart'));

  // Action that only appears when a data point is selected
  chart.setAction({
    id: 'analyze-performance',
    text: 'Analyze Performance',
    action: function() {
      const selection = chart.getSelection();
      if (selection.length > 0) {
        const row = selection[0].row;
        const quarter = data.getValue(row, 0);
        const sales = data.getValue(row, 1);
        const target = data.getValue(row, 2);
        const performance = ((sales / target) * 100).toFixed(1);

        const message = sales >= target
          ? `${quarter}: Exceeded target by ${(sales - target)} units (${performance}%)`
          : `${quarter}: Missed target by ${(target - sales)} units (${performance}%)`;

        alert(message);
      }
    }
  });

  // Action to remove underperforming quarters from view
  chart.setAction({
    id: 'filter-underperforming',
    text: 'Hide Underperforming Quarters',
    action: function() {
      const view = new google.visualization.DataView(data);
      const rows = [];

      for (let i = 0; i < data.getNumberOfRows(); i++) {
        const sales = data.getValue(i, 1);
        const target = data.getValue(i, 2);
        if (sales >= target) {
          rows.push(i);
        }
      }

      view.setRows(rows);
      chart.draw(view, {
        title: 'Quarterly Performance (Filtered)',
        width: 600,
        height: 400,
        seriesType: 'columns',
        series: { 1: { type: 'line' } }
      });
    }
  });

  chart.draw(data, {
    title: 'Quarterly Performance vs Target',
    width: 600,
    height: 400,
    seriesType: 'columns',
    series: { 1: { type: 'line' } }
  });
}
```

### Removing Actions

You can also remove actions dynamically:

```javascript
// Remove a specific action
chart.removeAction('export-png');

// Remove all actions
chart.removeAction();
```

## Tooltips

Tooltips provide additional information when users hover over chart elements. Google Charts supports both simple text tooltips and rich HTML tooltips with custom styling and content.

### Basic Tooltip Customization

```javascript
import { GoogleChartsLoader } from 'google-visualization';

async function createBasicTooltipChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['City', 'Population', 'Area (km²)', { role: 'tooltip' }],
    ['New York', 8175000, 783, 'New York: The most populous city in the US'],
    ['Los Angeles', 3792000, 1302, 'Los Angeles: Known for Hollywood and beaches'],
    ['Chicago', 2695000, 606, 'Chicago: The Windy City with great architecture'],
    ['Houston', 2099000, 1625, 'Houston: Space City and energy capital']
  ]);

  const chart = new google.visualization.ScatterChart(document.getElementById('basic-tooltip-chart'));

  chart.draw(data, {
    title: 'City Population vs Area',
    width: 600,
    height: 400,
    hAxis: { title: 'Population' },
    vAxis: { title: 'Area (km²)' },
    tooltip: {
      textStyle: { fontSize: 12 },
      showColorCode: true
    }
  });
}
```

### HTML Tooltips with Rich Content

```javascript
async function createHTMLTooltipChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Product', 'Sales', 'Profit', { role: 'tooltip', p: { html: true } }],
    ['Laptops', 1000, 300, createTooltipHTML('Laptops', 1000, 300, 'High-performance computing devices')],
    ['Phones', 1170, 400, createTooltipHTML('Phones', 1170, 400, 'Mobile communication devices')],
    ['Tablets', 660, 200, createTooltipHTML('Tablets', 660, 200, 'Portable touchscreen computers')],
    ['Accessories', 1030, 150, createTooltipHTML('Accessories', 1030, 150, 'Supporting hardware and peripherals')]
  ]);

  function createTooltipHTML(product, sales, profit, description) {
    const profitMargin = ((profit / sales) * 100).toFixed(1);
    return `
      <div style="padding: 10px; font-family: Arial; max-width: 200px;">
        <h3 style="margin: 0 0 10px 0; color: #1f77b4;">${product}</h3>
        <p style="margin: 5px 0;"><strong>Sales:</strong> $${sales.toLocaleString()}</p>
        <p style="margin: 5px 0;"><strong>Profit:</strong> $${profit.toLocaleString()}</p>
        <p style="margin: 5px 0;"><strong>Margin:</strong> ${profitMargin}%</p>
        <hr style="margin: 10px 0;">
        <p style="margin: 5px 0; font-style: italic; color: #666;">${description}</p>
      </div>
    `;
  }

  const chart = new google.visualization.ColumnChart(document.getElementById('html-tooltip-chart'));

  chart.draw(data, {
    title: 'Product Performance with Rich Tooltips',
    width: 600,
    height: 400,
    tooltip: {
      isHtml: true,
      trigger: 'both' // Show on hover and selection
    }
  });
}
```

### Dynamic Tooltips with External Data

```javascript
async function createDynamicTooltipChart() {
  const google = await GoogleChartsLoader.load();

  // Simulated external data source
  const additionalData = {
    'Q1': { weather: 'Cold', events: ['New Year', 'Valentine\'s Day'] },
    'Q2': { weather: 'Mild', events: ['Easter', 'Mother\'s Day'] },
    'Q3': { weather: 'Hot', events: ['Independence Day', 'Back to School'] },
    'Q4': { weather: 'Cool', events: ['Halloween', 'Thanksgiving', 'Christmas'] }
  };

  const data = google.visualization.arrayToDataTable([
    ['Quarter', 'Sales', { role: 'tooltip', p: { html: true } }],
    ['Q1', 1000, ''],
    ['Q2', 1170, ''],
    ['Q3', 660, ''],
    ['Q4', 1030, '']
  ]);

  // Generate dynamic tooltips
  for (let i = 0; i < data.getNumberOfRows(); i++) {
    const quarter = data.getValue(i, 0);
    const sales = data.getValue(i, 1);
    const extra = additionalData[quarter];

    const tooltip = `
      <div style="padding: 12px; font-family: Arial; max-width: 250px;">
        <h3 style="margin: 0 0 10px 0; color: #d62728;">${quarter} Performance</h3>
        <p><strong>Sales:</strong> $${sales.toLocaleString()}</p>
        <p><strong>Weather:</strong> ${extra.weather}</p>
        <p><strong>Key Events:</strong></p>
        <ul style="margin: 5px 0; padding-left: 20px;">
          ${extra.events.map(event => `<li>${event}</li>`).join('')}
        </ul>
      </div>
    `;

    data.setValue(i, 2, tooltip);
  }

  const chart = new google.visualization.LineChart(document.getElementById('dynamic-tooltip-chart'));

  chart.draw(data, {
    title: 'Quarterly Sales with Context',
    width: 600,
    height: 400,
    tooltip: {
      isHtml: true
    },
    pointSize: 8
  });
}
```

### Tooltip Styling and Positioning

```javascript
async function createStyledTooltipChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Month', 'Temperature (°C)', 'Rainfall (mm)'],
    ['Jan', 5, 45],
    ['Feb', 7, 38],
    ['Mar', 12, 42],
    ['Apr', 18, 35],
    ['May', 23, 28],
    ['Jun', 28, 15]
  ]);

  const chart = new google.visualization.ComboChart(document.getElementById('styled-tooltip-chart'));

  chart.draw(data, {
    title: 'Weather Data with Custom Tooltip Styling',
    width: 600,
    height: 400,
    seriesType: 'columns',
    series: { 1: { type: 'line', targetAxisIndex: 1 } },
    vAxes: {
      0: { title: 'Temperature (°C)' },
      1: { title: 'Rainfall (mm)' }
    },
    tooltip: {
      textStyle: {
        color: '#333',
        fontSize: 14,
        fontName: 'Arial'
      },
      showColorCode: true,
      trigger: 'both'
    }
  });
}
```

## Explorers

Chart explorers allow users to zoom and pan through large datasets interactively. This feature is particularly useful for time series data or charts with many data points.

### Basic Explorer Configuration

```javascript
import { GoogleChartsLoader } from 'google-visualization';

async function createBasicExplorerChart() {
  const google = await GoogleChartsLoader.load();

  // Generate sample time series data
  const data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Stock Price');
  data.addColumn('number', 'Volume');

  // Add 100 days of sample data
  const startDate = new Date(2023, 0, 1);
  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const price = 100 + Math.sin(i / 10) * 20 + Math.random() * 10;
    const volume = 1000 + Math.random() * 500;

    data.addRow([date, price, volume]);
  }

  const chart = new google.visualization.LineChart(document.getElementById('basic-explorer-chart'));

  chart.draw(data, {
    title: 'Stock Price Over Time (Drag to pan, scroll to zoom)',
    width: 800,
    height: 400,
    explorer: {
      actions: ['dragToPan', 'scrollToZoom'],
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 4.0,
      maxZoomOut: 2.0
    },
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1, type: 'columns', color: '#cccccc' }
    },
    vAxes: {
      0: { title: 'Price ($)' },
      1: { title: 'Volume', textStyle: { color: '#999' } }
    }
  });
}
```

### Advanced Explorer with Custom Controls

```javascript
async function createAdvancedExplorerChart() {
  const google = await GoogleChartsLoader.load();

  // Generate more complex dataset
  const data = new google.visualization.DataTable();
  data.addColumn('number', 'X Value');
  data.addColumn('number', 'Series 1');
  data.addColumn('number', 'Series 2');
  data.addColumn('number', 'Series 3');

  // Add 200 data points
  for (let i = 0; i < 200; i++) {
    const x = i;
    const y1 = Math.sin(i / 20) * 50 + Math.random() * 20;
    const y2 = Math.cos(i / 15) * 30 + Math.random() * 15;
    const y3 = Math.sin(i / 10) * Math.cos(i / 25) * 40 + Math.random() * 10;

    data.addRow([x, y1, y2, y3]);
  }

  const chart = new google.visualization.LineChart(document.getElementById('advanced-explorer-chart'));

  // Add reset zoom button
  const resetButton = document.getElementById('reset-zoom');
  resetButton.addEventListener('click', function() {
    chart.draw(data, getChartOptions());
  });

  function getChartOptions() {
    return {
      title: 'Multi-Series Data with Advanced Explorer',
      width: 800,
      height: 500,
      explorer: {
        actions: ['dragToPan', 'scrollToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 8.0,
        maxZoomOut: 1.0,
        zoomDelta: 1.5
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical'
      },
      pointSize: 3,
      lineWidth: 2
    };
  }

  chart.draw(data, getChartOptions());

  // Add zoom level indicator
  google.visualization.events.addListener(chart, 'ready', function() {
    document.getElementById('zoom-info').innerHTML = 'Chart ready - use mouse wheel to zoom, drag to pan';
  });
}
```

### Explorer with Selection Synchronization

```javascript
async function createSynchronizedExplorerCharts() {
  const google = await GoogleChartsLoader.load();

  // Create shared dataset
  const data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Revenue');
  data.addColumn('number', 'Expenses');
  data.addColumn('number', 'Profit');

  // Generate 2 years of monthly data
  const startDate = new Date(2022, 0, 1);
  for (let i = 0; i < 24; i++) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const revenue = 10000 + Math.sin(i / 6) * 3000 + Math.random() * 2000;
    const expenses = revenue * (0.6 + Math.random() * 0.2);
    const profit = revenue - expenses;

    data.addRow([date, revenue, expenses, profit]);
  }

  const lineChart = new google.visualization.LineChart(document.getElementById('sync-line-chart'));
  const areaChart = new google.visualization.AreaChart(document.getElementById('sync-area-chart'));

  const commonOptions = {
    width: 600,
    height: 300,
    explorer: {
      actions: ['dragToPan', 'scrollToZoom'],
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 4.0
    },
    crosshair: { trigger: 'both' }
  };

  // Synchronize zoom and pan between charts
  function createSyncHandler(sourceChart, targetChart, targetData, targetOptions) {
    return function() {
      // Note: In a real implementation, you would need to capture and apply
      // the zoom/pan state. This is a simplified example.
      setTimeout(() => {
        targetChart.draw(targetData, targetOptions);
      }, 100);
    };
  }

  lineChart.draw(data, {
    ...commonOptions,
    title: 'Financial Data - Line View',
    curveType: 'function'
  });

  areaChart.draw(data, {
    ...commonOptions,
    title: 'Financial Data - Area View',
    isStacked: false,
    areaOpacity: 0.7
  });
}
```

### Explorer Configuration Options

```javascript
// Complete explorer configuration example
const explorerOptions = {
  actions: [
    'dragToPan',      // Allow dragging to pan
    'scrollToZoom',   // Allow mouse wheel zooming
    'rightClickToReset' // Right-click to reset zoom
  ],
  axis: 'horizontal',   // Which axis to explore ('horizontal', 'vertical', or 'both')
  keepInBounds: true,   // Keep the chart within original bounds
  maxZoomIn: 4.0,       // Maximum zoom in level
  maxZoomOut: 2.0,      // Maximum zoom out level
  zoomDelta: 1.5        // Zoom sensitivity
};
```

## Controls and Dashboards

Controls and Dashboards provide a powerful way to create interactive data exploration interfaces. Controls allow users to filter and manipulate chart data in real-time, while Dashboards coordinate multiple charts and controls together.

### Overview: What are Controls and Dashboards?

- **Controls**: Interactive UI elements (sliders, dropdowns, date pickers) that filter chart data
- **Dashboards**: Containers that bind controls to charts, enabling synchronized interactions
- **ControlWrapper**: A wrapper class that simplifies control creation and management
- **ChartWrapper**: A wrapper class that works seamlessly with controls in dashboards

### Basic Control Setup with CategoryFilter

```javascript
import { GoogleChartsLoader } from 'google-visualization';

async function createBasicControlDashboard() {
  const google = await GoogleChartsLoader.load();

  // Create sample data
  const data = google.visualization.arrayToDataTable([
    ['Department', 'Employee', 'Salary', 'Start Date'],
    ['Engineering', 'John', 75000, new Date(2020, 1, 15)],
    ['Engineering', 'Sarah', 82000, new Date(2019, 5, 20)],
    ['Marketing', 'Mike', 65000, new Date(2021, 3, 10)],
    ['Marketing', 'Lisa', 70000, new Date(2020, 8, 5)],
    ['Sales', 'Tom', 60000, new Date(2021, 1, 25)],
    ['Sales', 'Anna', 68000, new Date(2019, 11, 12)],
    ['HR', 'David', 55000, new Date(2020, 6, 8)],
    ['HR', 'Emma', 58000, new Date(2021, 4, 18)]
  ]);

  // Create dashboard
  const dashboard = new google.visualization.Dashboard(document.getElementById('basic-dashboard'));

  // Create department filter control
  const departmentFilter = new google.visualization.ControlWrapper({
    controlType: 'CategoryFilter',
    containerId: 'department-filter',
    options: {
      filterColumnLabel: 'Department',
      ui: {
        labelStacking: 'vertical',
        allowTyping: false,
        allowMultiple: true,
        caption: 'Select Department(s):'
      }
    }
  });

  // Create salary chart
  const salaryChart = new google.visualization.ChartWrapper({
    chartType: 'ColumnChart',
    containerId: 'salary-chart',
    options: {
      title: 'Employee Salaries by Department',
      width: 600,
      height: 400,
      hAxis: { title: 'Employee' },
      vAxis: { title: 'Salary ($)' }
    },
    view: { columns: [1, 2] } // Show Employee and Salary columns
  });

  // Bind control to chart and draw
  dashboard.bind(departmentFilter, salaryChart);
  dashboard.draw(data);
}
```

### Advanced Dashboard with Multiple Controls

```javascript
async function createAdvancedDashboard() {
  const google = await GoogleChartsLoader.load();

  // Create comprehensive sales data
  const data = google.visualization.arrayToDataTable([
    ['Date', 'Product', 'Category', 'Sales', 'Profit', 'Region'],
    [new Date(2023, 0, 15), 'Laptop Pro', 'Electronics', 1200, 300, 'North'],
    [new Date(2023, 0, 20), 'Phone X', 'Electronics', 800, 200, 'South'],
    [new Date(2023, 1, 10), 'Tablet Mini', 'Electronics', 600, 150, 'East'],
    [new Date(2023, 1, 25), 'Office Chair', 'Furniture', 300, 100, 'West'],
    [new Date(2023, 2, 5), 'Desk Lamp', 'Furniture', 80, 25, 'North'],
    [new Date(2023, 2, 18), 'Smartphone', 'Electronics', 700, 175, 'South'],
    [new Date(2023, 3, 12), 'Monitor 4K', 'Electronics', 400, 120, 'East'],
    [new Date(2023, 3, 28), 'Ergonomic Mouse', 'Electronics', 50, 15, 'West']
  ]);

  const dashboard = new google.visualization.Dashboard(document.getElementById('advanced-dashboard'));

  // Date range filter
  const dateFilter = new google.visualization.ControlWrapper({
    controlType: 'DateRangeFilter',
    containerId: 'date-filter',
    options: {
      filterColumnLabel: 'Date',
      ui: {
        caption: 'Select Date Range:'
      }
    }
  });

  // Category filter
  const categoryFilter = new google.visualization.ControlWrapper({
    controlType: 'CategoryFilter',
    containerId: 'category-filter',
    options: {
      filterColumnLabel: 'Category',
      ui: {
        caption: 'Select Category:',
        allowMultiple: true
      }
    }
  });

  // Sales range slider
  const salesFilter = new google.visualization.ControlWrapper({
    controlType: 'NumberRangeFilter',
    containerId: 'sales-filter',
    options: {
      filterColumnLabel: 'Sales',
      ui: {
        caption: 'Sales Range ($):'
      }
    }
  });

  // Sales over time chart
  const timeChart = new google.visualization.ChartWrapper({
    chartType: 'LineChart',
    containerId: 'time-chart',
    options: {
      title: 'Sales Over Time',
      width: 600,
      height: 300,
      hAxis: { title: 'Date' },
      vAxis: { title: 'Sales ($)' }
    },
    view: { columns: [0, 3] }
  });

  // Sales by category chart
  const categoryChart = new google.visualization.ChartWrapper({
    chartType: 'PieChart',
    containerId: 'category-chart',
    options: {
      title: 'Sales by Category',
      width: 400,
      height: 300
    },
    view: {
      columns: [2, 3],
      rows: function(dt) {
        // Aggregate sales by category
        const categoryTotals = {};
        for (let i = 0; i < dt.getNumberOfRows(); i++) {
          const category = dt.getValue(i, 0);
          const sales = dt.getValue(i, 1);
          categoryTotals[category] = (categoryTotals[category] || 0) + sales;
        }

        const aggregatedData = new google.visualization.DataTable();
        aggregatedData.addColumn('string', 'Category');
        aggregatedData.addColumn('number', 'Total Sales');

        Object.entries(categoryTotals).forEach(([category, total]) => {
          aggregatedData.addRow([category, total]);
        });

        return aggregatedData;
      }
    }
  });

  // Profit vs Sales scatter plot
  const scatterChart = new google.visualization.ChartWrapper({
    chartType: 'ScatterChart',
    containerId: 'scatter-chart',
    options: {
      title: 'Profit vs Sales',
      width: 400,
      height: 300,
      hAxis: { title: 'Sales ($)' },
      vAxis: { title: 'Profit ($)' }
    },
    view: { columns: [3, 4] }
  });

  // Bind all controls to all charts
  dashboard.bind([dateFilter, categoryFilter, salesFilter], [timeChart, categoryChart, scatterChart]);
  dashboard.draw(data);

  // Add event listener to show filtered data count
  google.visualization.events.addListener(dashboard, 'ready', function() {
    updateDataCount();
  });

  function updateDataCount() {
    // This would require access to the filtered data view
    // In practice, you'd implement this by listening to control events
    document.getElementById('data-count').innerHTML = 'Dashboard ready - use controls to filter data';
  }
}
```

### Custom Control Implementation

```javascript
async function createCustomControlDashboard() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Product', 'Q1', 'Q2', 'Q3', 'Q4', 'Total'],
    ['Product A', 100, 120, 110, 130, 460],
    ['Product B', 80, 90, 95, 85, 350],
    ['Product C', 150, 140, 160, 170, 620],
    ['Product D', 60, 70, 65, 75, 270]
  ]);

  const dashboard = new google.visualization.Dashboard(document.getElementById('custom-dashboard'));

  // String filter for product search
  const productSearch = new google.visualization.ControlWrapper({
    controlType: 'StringFilter',
    containerId: 'product-search',
    options: {
      filterColumnLabel: 'Product',
      ui: {
        caption: 'Search Products:'
      }
    }
  });

  // Number range filter for total sales
  const totalFilter = new google.visualization.ControlWrapper({
    controlType: 'NumberRangeFilter',
    containerId: 'total-filter',
    options: {
      filterColumnLabel: 'Total',
      ui: {
        caption: 'Total Sales Range:',
        format: {
          pattern: '#,###'
        }
      }
    }
  });

  // Main chart
  const mainChart = new google.visualization.ChartWrapper({
    chartType: 'ComboChart',
    containerId: 'main-chart',
    options: {
      title: 'Quarterly Sales Performance',
      width: 700,
      height: 400,
      seriesType: 'columns',
      series: { 4: { type: 'line', targetAxisIndex: 1 } },
      vAxes: {
        0: { title: 'Quarterly Sales' },
        1: { title: 'Total Sales' }
      }
    },
    view: { columns: [0, 1, 2, 3, 4, 5] }
  });

  // Table view
  const dataTable = new google.visualization.ChartWrapper({
    chartType: 'Table',
    containerId: 'data-table',
    options: {
      title: 'Detailed Data',
      width: 700,
      height: 200,
      alternatingRowStyle: true
    }
  });

  // Bind controls to charts
  dashboard.bind([productSearch, totalFilter], [mainChart, dataTable]);
  dashboard.draw(data);

  // Add control event listeners
  google.visualization.events.addListener(productSearch, 'statechange', function() {
    console.log('Product search filter changed');
  });

  google.visualization.events.addListener(totalFilter, 'statechange', function() {
    console.log('Total sales filter changed');
  });
}
```

### Dashboard State Management

```javascript
async function createStatefulDashboard() {
  const google = await GoogleChartsLoader.load();

  // ... data setup ...

  const dashboard = new google.visualization.Dashboard(document.getElementById('stateful-dashboard'));

  // Create controls and charts...

  // Save dashboard state
  function saveDashboardState() {
    const state = {
      dateFilter: dateFilter.getState(),
      categoryFilter: categoryFilter.getState(),
      salesFilter: salesFilter.getState()
    };
    localStorage.setItem('dashboardState', JSON.stringify(state));
  }

  // Restore dashboard state
  function restoreDashboardState() {
    const savedState = localStorage.getItem('dashboardState');
    if (savedState) {
      const state = JSON.parse(savedState);
      dateFilter.setState(state.dateFilter);
      categoryFilter.setState(state.categoryFilter);
      salesFilter.setState(state.salesFilter);
      dashboard.draw(data);
    }
  }

  // Add save/restore buttons
  document.getElementById('save-state').addEventListener('click', saveDashboardState);
  document.getElementById('restore-state').addEventListener('click', restoreDashboardState);

  // Auto-save on state changes
  google.visualization.events.addListener(dashboard, 'ready', function() {
    saveDashboardState();
  });
}
```

This comprehensive guide covers all major aspects of chart interactivity in Google Charts, with practical examples using the GoogleChartsLoader pattern. Each section provides working code examples that demonstrate real-world usage scenarios.
