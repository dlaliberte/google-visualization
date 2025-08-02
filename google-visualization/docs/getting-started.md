---
sidebar_position: 1
title: Getting Started
---

# Getting Started

This guide will walk you through the process of creating your first chart with the Google Visualization API. We'll create a simple pie chart and display it on a web page.

## 1. Load the Library

First, you need to include the Google Charts loader script on your web page. This script is responsible for loading the necessary packages for the charts you want to use.

Place the following `<script>` tag in the `<head>` of your HTML file:

```html
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```

Next, you need to load the specific chart packages you intend to use. For a pie chart, you'll need the `corechart` package. You also need to define a callback function that will be executed once the packages are loaded.

```html
<script type="text/javascript">
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {
    // ... chart drawing code will go here ...
  }
</script>
```

## 2. Prepare Your Data

All charts require data, which is provided using a `DataTable` object. A `DataTable` is a two-dimensional table with rows and columns, where each column has a data type and an optional label.

Here's how you can create a `DataTable` for our pie chart:

```javascript
// Create the data table.
const data = new google.visualization.DataTable();
data.addColumn('string', 'Topping');
data.addColumn('number', 'Slices');
data.addRows([
  ['Mushrooms', 3],
  ['Onions', 1],
  ['Olives', 1],
  ['Zucchini', 1],
  ['Pepperoni', 2]
]);
```

## 3. Configure and Draw the Chart

Once your data is ready, you can instantiate and draw your chart. You can also provide an `options` object to customize its appearance, such as adding a title or setting dimensions. There are two primary ways to create and draw a chart.

### Method 1: Direct Instantiation (Classic Method)

This is the most straightforward way to create a chart. You create an instance of the chart class (e.g., `google.visualization.PieChart`) and then call its `draw()` method. This is simple and effective for standalone charts.

```javascript
// Set chart options
const options = {
  'title': 'How Much Pizza I Ate Last Night',
  'width': 400,
  'height': 300
};

// Instantiate and draw our chart, passing in some options.
const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
```

### Method 2: Using `ChartWrapper` (Flexible Method)

The `ChartWrapper` class is a powerful tool that encapsulates all the logic for creating and drawing a chart. It's particularly useful for building interactive dashboards and reusing chart configurations. While it adds a bit of overhead for a single chart, it provides significant flexibility for more complex applications.

```javascript
const wrapper = new google.visualization.ChartWrapper({
  chartType: 'PieChart',
  dataTable: data,
  options: {'title': 'How Much Pizza I Ate Last Night', 'width': 400, 'height': 300},
  containerId: 'chart_div'
});
wrapper.draw();
```

## Full Example

Here is a complete HTML file that puts everything together. You can save this and open it in your browser to see your first chart.

```html
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3], ['Onions', 1], ['Olives', 1],
          ['Zucchini', 1], ['Pepperoni', 2]
        ]);
        const options = {'title':'How Much Pizza I Ate Last Night', 'width':400, 'height':300};
        const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="chart_div" style="width: 400px; height: 300px;"></div>
  </body>
</html>
```

## Next Steps

Congratulations! You've created your first Google Chart. Now you can explore more:

-   Learn about the fundamental data structure in the **DataTable and DataView** guide.
-   Browse the **Chart Gallery** to see all the available chart types.
-   Dive deeper into **Configuration Options** to customize your charts.---
sidebar_position: 1
title: Getting Started
---

# Getting Started

This guide will walk you through the process of creating your first chart with the Google Visualization API. We'll create a simple pie chart and display it on a web page.

## 1. Load the Library

First, you need to include the Google Charts loader script on your web page. This script is responsible for loading the necessary packages for the charts you want to use.

Place the following `<script>` tag in the `<head>` of your HTML file:

```html
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```

Next, you need to load the specific chart packages you intend to use. For a pie chart, you'll need the `corechart` package. You also need to define a callback function that will be executed once the packages are loaded.

```html
<script type="text/javascript">
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {
    // ... chart drawing code will go here ...
  }
</script>
```

## 2. Prepare Your Data

All charts require data, which is provided using a `DataTable` object. A `DataTable` is a two-dimensional table with rows and columns, where each column has a data type and an optional label.

Here's how you can create a `DataTable` for our pie chart:

```javascript
// Create the data table.
const data = new google.visualization.DataTable();
data.addColumn('string', 'Topping');
data.addColumn('number', 'Slices');
data.addRows([
  ['Mushrooms', 3],
  ['Onions', 1],
  ['Olives', 1],
  ['Zucchini', 1],
  ['Pepperoni', 2]
]);
```

## 3. Configure and Draw the Chart

Once your data is ready, you can instantiate and draw your chart. You can also provide an `options` object to customize its appearance, such as adding a title or setting dimensions. There are two primary ways to create and draw a chart.

### Method 1: Direct Instantiation (Classic Method)

This is the most straightforward way to create a chart. You create an instance of the chart class (e.g., `google.visualization.PieChart`) and then call its `draw()` method. This is simple and effective for standalone charts.

```javascript
// Set chart options
const options = {
  'title': 'How Much Pizza I Ate Last Night',
  'width': 400,
  'height': 300
};

// Instantiate and draw our chart, passing in some options.
const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
```

### Method 2: Using `ChartWrapper` (Flexible Method)

The `ChartWrapper` class is a powerful tool that encapsulates all the logic for creating and drawing a chart. It's particularly useful for building interactive dashboards and reusing chart configurations. While it adds a bit of overhead for a single chart, it provides significant flexibility for more complex applications.

```javascript
const wrapper = new google.visualization.ChartWrapper({
  chartType: 'PieChart',
  dataTable: data,
  options: {'title': 'How Much Pizza I Ate Last Night', 'width': 400, 'height': 300},
  containerId: 'chart_div'
});
wrapper.draw();
```

## Full Example

Here is a complete HTML file that puts everything together. You can save this and open it in your browser to see your first chart.

```html
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3], ['Onions', 1], ['Olives', 1],
          ['Zucchini', 1], ['Pepperoni', 2]
        ]);
        const options = {'title':'How Much Pizza I Ate Last Night', 'width':400, 'height':300};
        const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="chart_div" style="width: 400px; height: 300px;"></div>
  </body>
</html>
```

## Next Steps

Congratulations! You've created your first Google Chart. Now you can explore more:

-   Learn about the fundamental data structure in the **DataTable and DataView** guide.
-   Browse the **Chart Gallery** to see all the available chart types.
-   Dive deeper into **Configuration Options** to customize your charts.
