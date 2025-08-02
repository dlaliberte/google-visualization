---
sidebar_position: 1
title: Getting Started
---

import PieChartExample from '@site/src/components/PieChartExample';
import GoogleChart from '@site/src/components/GoogleChart';
import GoogleChartCode from '@site/src/components/GoogleChartCode';
import LiveChartEditor from '@site/src/components/LiveChartEditor';

# Getting Started

This guide will walk you through the process of creating your first chart with the Google Visualization API. We'll create a simple pie chart and display it on a web page.

## Live Example

Here's what we'll be building - a live, interactive pie chart:

<PieChartExample />

## 1. Load the Library

First, you need to include the Google Charts loader script on your web page. This script is responsible for loading the necessary packages for the charts you want to use.

Place the following `<script>` tag in the `<head>` of your HTML file:

```html
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```

Next, you need to load the specific chart packages you intend to use. For a pie chart, you'll need the `corechart` package:

```javascript
google.charts.load('current', {'packages':['corechart']});
```

## 2. Create Your Data

Charts need data to display. The Google Visualization API uses a `DataTable` object to hold your data. Here's how to create a simple dataset for a pie chart:

```javascript
function drawChart() {
  // Create the data table
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task');
  data.addColumn('number', 'Hours per Day');

  data.addRows([
    ['Work',     8],
    ['Eat',      2],
    ['Commute',  1],
    ['Watch TV', 3],
    ['Sleep',    8]
  ]);
}
```

Alternatively, you can use the `arrayToDataTable` helper method:

```javascript
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work',     8],
    ['Eat',      2],
    ['Commute',  1],
    ['Watch TV', 3],
    ['Sleep',    8]
  ]);
}
```

## 3. Configure Chart Options

You can customize your chart's appearance by setting various options:

```javascript
function drawChart() {
  // ... data creation code ...

  // Set chart options
  var options = {
    title: 'My Daily Activities',
    width: 400,
    height: 300
  };
}
```

## 4. Draw the Chart

Finally, create the chart object and draw it:

```javascript
function drawChart() {
  // ... data and options code ...

  // Instantiate and draw the chart
  var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
  chart.draw(data, options);
}
```

## 5. Complete Example

Here's a complete HTML page that displays a pie chart:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My First Chart</title>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    // Load the Visualization API and the corechart package
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      // Create the data table
      var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     8],
        ['Eat',      2],
        ['Commute',  1],
        ['Watch TV', 3],
        ['Sleep',    8]
      ]);

      // Set chart options
      var options = {
        title: 'My Daily Activities',
        width: 400,
        height: 300
      };

      // Instantiate and draw the chart
      var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
      chart.draw(data, options);
    }
  </script>
</head>
<body>
  <h1>My First Google Chart</h1>
  <div id="myPieChart"></div>
</body>
</html>
```

## Interactive Examples

Here are some different chart types you can create with the same data:

### Column Chart
<GoogleChart
  chartType="ColumnChart"
  data={[
    ['Task', 'Hours per Day'],
    ['Work', 8],
    ['Eat', 2],
    ['Commute', 1],
    ['Watch TV', 3],
    ['Sleep', 8]
  ]}
  options={{
    title: 'My Daily Activities',
    hAxis: { title: 'Activities' },
    vAxis: { title: 'Hours' },
    width: 500,
    height: 300
  }}
/>

### Line Chart
<GoogleChart
  chartType="LineChart"
  data={[
    ['Day', 'Work Hours', 'Sleep Hours'],
    ['Mon', 8, 8],
    ['Tue', 9, 7],
    ['Wed', 8, 8],
    ['Thu', 7, 9],
    ['Fri', 6, 8],
    ['Sat', 2, 10],
    ['Sun', 1, 9]
  ]}
  options={{
    title: 'Weekly Schedule',
    curveType: 'function',
    legend: { position: 'bottom' },
    width: 500,
    height: 300
  }}
/>

## Using ChartWrapper (Recommended)

For more complex applications, we recommend using the `ChartWrapper` class, which provides a more flexible way to create and manage charts:

```javascript
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var wrapper = new google.visualization.ChartWrapper({
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     8],
      ['Eat',      2],
      ['Commute',  1],
      ['Watch TV', 3],
      ['Sleep',    8]
    ],
    options: {
      title: 'My Daily Activities',
      width: 400,
      height: 300
    },
    containerId: 'myPieChart'
  });

  wrapper.draw();
}
```

## Using Interactive Charts in Documentation

The interactive charts above are created using MDX components. Here's how you can add them to your own documentation pages:

### 1. Import the Component

At the top of your `.md` or `.mdx` file, import the GoogleChart component:

```jsx
import GoogleChart from '@site/src/components/GoogleChart';
```

### 2. Use the Component

Then use it anywhere in your content:

```jsx
<GoogleChart
  chartType="PieChart"
  data={[
    ['Task', 'Hours per Day'],
    ['Work', 8],
    ['Eat', 2],
    ['Sleep', 8]
  ]}
  options={{
    title: 'My Chart',
    width: 400,
    height: 300
  }}
/>
```

### 3. Supported Chart Types

The GoogleChart component supports these chart types:
- `PieChart`
- `ColumnChart`
- `LineChart`
- `BarChart`
- `AreaChart`

### 4. Component Props

- `chartType`: The type of chart to render
- `data`: 2D array with chart data (first row should be headers)
- `options`: Chart configuration options (optional)
- `width`: Chart width (optional, defaults to '100%')
- `height`: Chart height (optional, defaults to 400)

## Using Interactive Charts in Documentation

The interactive charts above are created using MDX components. Here's how you can add them to your own documentation pages:

### 1. Import the Component

At the top of your `.md` or `.mdx` file, import the GoogleChart component:

```jsx
import GoogleChart from '@site/src/components/GoogleChart';
```

### 2. Use the Component

Then use it anywhere in your content:

```jsx
<GoogleChart
  chartType="PieChart"
  data={[
    ['Task', 'Hours per Day'],
    ['Work', 8],
    ['Eat', 2],
    ['Sleep', 8]
  ]}
  options={{
    title: 'My Chart',
    width: 400,
    height: 300
  }}
/>
```

### 3. Supported Chart Types

The GoogleChart component supports these chart types:
- `PieChart`
- `ColumnChart`
- `LineChart`
- `BarChart`
- `AreaChart`

### 4. Component Props

- `chartType`: The type of chart to render
- `data`: 2D array with chart data (first row should be headers)
- `options`: Chart configuration options (optional)
- `width`: Chart width (optional, defaults to '100%')
- `height`: Chart height (optional, defaults to 400)

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable Overview](./datatable-overview.md) to understand how to work with data
- Explore [Creating DataTables](./datatable-creation.md) for different ways to create data
- Discover [Data Types and Formatting](./datatable-data-types.md) for working with different data types
- Try [DataView](./dataview.md) for advanced data filtering and transformation

Congratulations! You've successfully created your first Google Chart. 🎉
