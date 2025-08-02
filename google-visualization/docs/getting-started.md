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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉---
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

## Next Steps

Now that you've created your first chart, you can:

- Learn more about [DataTable and DataView](./datatable) to understand how to work with data
- Explore different chart types in our Chart Gallery
- Add interactivity with events and controls
- Customize your charts with advanced styling options

Congratulations! You've successfully created your first Google Chart. 🎉
