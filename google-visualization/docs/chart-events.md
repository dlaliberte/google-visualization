---
sidebar_position: 11
title: Chart Events and Interactivity
---

# Chart Events and Interactivity

Learn how to make your charts interactive by handling user events and creating responsive visualizations. Google Charts provides a comprehensive event system that allows you to respond to user interactions, chart state changes, and data updates in real-time.

## Overview

Chart events are the foundation of interactive data visualization. They allow you to:

- **Respond to user interactions** like clicks, hovers, and selections
- **Handle chart lifecycle events** such as ready, error, and animation complete
- **Create dynamic experiences** with real-time updates and cross-chart communication
- **Build sophisticated dashboards** with coordinated visualizations
- **Implement custom behaviors** tailored to your application's needs

All examples in this guide use the GoogleChartsLoader pattern for consistent chart initialization and event handling.

## Event Handling

Google Charts fire events at various points during their lifecycle and in response to user interactions. Understanding these events is crucial for creating interactive visualizations.

### Core Chart Events

#### Ready Event
The `ready` event fires when the chart is fully rendered and ready for interaction:

```javascript
import { GoogleChartsLoader } from 'google-visualization';

async function createChartWithReadyEvent() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]);

  const chart = new google.visualization.PieChart(document.getElementById('ready-chart'));

  // Listen for ready event
  google.visualization.events.addListener(chart, 'ready', function() {
    console.log('Chart is ready for interaction');

    // Enable UI elements that depend on the chart
    document.getElementById('export-button').disabled = false;
    document.getElementById('chart-status').textContent = 'Chart loaded successfully';

    // You can now safely call chart methods
    const selection = chart.getSelection();
    console.log('Current selection:', selection);
  });

  chart.draw(data, {
    title: 'My Daily Activities',
    width: 400,
    height: 300
  });
}
```

#### Error Event
Handle chart rendering errors gracefully:

```javascript
async function createChartWithErrorHandling() {
  const google = await GoogleChartsLoader.load();

  // Intentionally create problematic data to demonstrate error handling
  const data = google.visualization.arrayToDataTable([
    ['Category', 'Value'],
    ['A', 'invalid_number'], // This will cause an error
    ['B', 20],
    ['C', 30]
  ]);

  const chart = new google.visualization.ColumnChart(document.getElementById('error-chart'));

  // Handle errors
  google.visualization.events.addListener(chart, 'error', function(errorEvent) {
    console.error('Chart error occurred:', errorEvent);

    // Display user-friendly error message
    const errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = `
      <div class="error-alert">
        <strong>Chart Error:</strong> ${errorEvent.message}
        <br><small>ID: ${errorEvent.id}</small>
      </div>
    `;
    errorDiv.style.display = 'block';

    // Hide the chart container
    document.getElementById('error-chart').style.display = 'none';
  });

  try {
    chart.draw(data, {
      title: 'Chart with Error Handling',
      width: 500,
      height: 300
    });
  } catch (error) {
    console.error('Draw error:', error);
  }
}
```

#### Selection Events
Handle user selections on chart elements:

```javascript
async function createSelectableChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Country', 'Population', 'GDP'],
    ['USA', 331, 21.43],
    ['China', 1439, 14.34],
    ['Japan', 126, 4.94],
    ['Germany', 83, 3.85],
    ['India', 1380, 2.87]
  ]);

  const chart = new google.visualization.BubbleChart(document.getElementById('selectable-chart'));

  // Handle selection events
  google.visualization.events.addListener(chart, 'select', function() {
    const selection = chart.getSelection();

    if (selection.length === 0) {
      document.getElementById('selection-info').innerHTML = 'No selection';
      return;
    }

    const selectedItem = selection[0];
    if (selectedItem.row !== null) {
      const country = data.getValue(selectedItem.row, 0);
      const population = data.getValue(selectedItem.row, 1);
      const gdp = data.getValue(selectedItem.row, 2);

      document.getElementById('selection-info').innerHTML = `
        <h4>Selected: ${country}</h4>
        <p>Population: ${population} million</p>
        <p>GDP: $${gdp} trillion</p>
      `;

      // Trigger custom actions based on selection
      onCountrySelected(country, population, gdp);
    }
  });

  function onCountrySelected(country, population, gdp) {
    // Custom logic when a country is selected
    console.log(`Country selected: ${country}`);

    // Could trigger other charts to update, show detailed data, etc.
    updateRelatedCharts(country);
  }

  function updateRelatedCharts(country) {
    // Placeholder for updating other charts based on selection
    console.log(`Updating related charts for ${country}`);
  }

  chart.draw(data, {
    title: 'Population vs GDP by Country',
    width: 600,
    height: 400,
    hAxis: { title: 'Population (millions)' },
    vAxis: { title: 'GDP (trillions USD)' }
  });
}
```

### Mouse Events

#### Hover Events
Create interactive hover effects:

```javascript
async function createHoverInteractiveChart() {
  const google = await GoogleChartsLoader.load();

  const data = google.visualization.arrayToDataTable([
    ['Month', 'Sales', 'Expenses', 'Profit'],
    ['Jan', 1000, 400, 600],
    ['Feb', 1170, 460, 710],
    ['Mar', 660, 1120, -460],
    ['Apr', 1030, 540, 490],
    ['May', 1200, 580, 620],
    ['Jun', 950, 420, 530]
  ]);

  const chart = new google.visualization.ComboChart(document.getElementById('hover-chart'));
  const hoverInfo = document.getElementById('hover-info');

  // Mouse over event
  google.visualization.events.addListener(chart, 'onmouseover', function(e) {
    const month = data.getValue(e.row, 0);
    const value = data.getValue(e.row, e.column);
    const columnLabel = data.getColumnLabel(e.column);

    hoverInfo.innerHTML = `
      <div class="hover-tooltip">
        <strong>${month}</strong><br>
        ${columnLabel}: $${value.toLocaleString()}<br>
        <small>Row: ${e.row}, Column: ${e.column}</small>
      </div>
    `;
    hoverInfo.style.display = 'block';

    // Highlight related data
    highlightDataPoint(e.row, e.column);
  });

  // Mouse out event
  google.visualization.events.addListener(chart, 'onmouseout', function(e) {
    hoverInfo.style.display = 'none';
    clearHighlights();
  });

  function highlightDataPoint(row, column) {
    // Custom highlighting logic
    console.log(`Highlighting data point at row ${row}, column ${column}`);
  }

  function clearHighlights() {
    // Clear any custom highlighting
    console.log('Clearing highlights');
  }

  chart.draw(data, {
    title: 'Monthly Financial Performance',
    width: 700,
    height: 400,
    seriesType: 'columns',
    series: { 2: { type: 'line' } }
  });
}
```

#### Click Events
Handle click events for drill-down functionality:

```javascript
async function createDrillDownChart() {
  const google = await GoogleChartsLoader.load();

  // Main category data
  const categoryData = google.visualization.arrayToDataTable([
    ['Category', 'Sales'],
    ['Electronics', 15000],
    ['Clothing', 8000],
    ['Books', 3000],
    ['Home & Garden', 5500]
  ]);

  // Detailed data for each category
  const detailData = {
    'Electronics': [
      ['Product', 'Sales'],
      ['Laptops', 8000],
      ['Phones', 4000],
      ['Tablets', 2000],
      ['Accessories', 1000]
    ],
    'Clothing': [
      ['Product', 'Sales'],
      ['Shirts', 3000],
      ['Pants', 2500],
      ['Shoes', 1500],
      ['Accessories', 1000]
    ],
    'Books': [
      ['Product', 'Sales'],
      ['Fiction', 1500],
      ['Non-Fiction', 800],
      ['Educational', 700]
    ],
    'Home & Garden': [
      ['Product', 'Sales'],
      ['Furniture', 3000],
      ['Tools', 1500],
      ['Plants', 1000]
    ]
  };

  const chart = new google.visualization.PieChart(document.getElementById('drilldown-chart'));
  let currentLevel = 'category';
  let currentCategory = null;

  // Handle click events for drill-down
  google.visualization.events.addListener(chart, 'select', function() {
    const selection = chart.getSelection();

    if (selection.length > 0 && currentLevel === 'category') {
      const selectedRow = selection[0].row;
      const category = categoryData.getValue(selectedRow, 0);

      // Drill down to category details
      drillDown(category);
    }
  });

  function drillDown(category) {
    currentLevel = 'detail';
    currentCategory = category;

    const detailDataTable = google.visualization.arrayToDataTable(detailData[category]);

    chart.draw(detailDataTable, {
      title: `${category} - Product Breakdown`,
      width: 500,
      height: 400
    });

    // Show back button
    document.getElementById('back-button').style.display = 'block';

    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
      <a href="#" onclick="drillUp()">All Categories</a> > ${category}
    `;
  }

  function drillUp() {
    currentLevel = 'category';
    currentCategory = null;

    chart.draw(categoryData, {
      title: 'Sales by Category',
      width: 500,
      height: 400
    });

    // Hide back button
    document.getElementById('back-button').style.display = 'none';

    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = 'All Categories';
  }

  // Make drillUp function globally accessible
  window.drillUp = drillUp;

  // Initial draw
  chart.draw(categoryData, {
    title: 'Sales by Category (Click to drill down)',
    width: 500,
    height: 400
  });
}
```

## Code Examples

This section will include comprehensive examples of:
- Basic event handling patterns
- Interactive dashboard implementations
- Real-time chart updates
- User-driven data exploration

## Best Practices

Guidelines for:
- Performance optimization with events
- Memory management
- Error handling
- Accessibility considerations

---

*This documentation is currently being developed. Check back soon for complete coverage of chart events and interactivity patterns.*
