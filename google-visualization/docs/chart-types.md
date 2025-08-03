---
sidebar_position: 8
title: Chart Types
---

import React, { useRef, useEffect } from 'react';
import GoogleChartsLoader from '@site/src/components/GoogleChartsLoader';
import CodeBlock from '@site/src/components/CodeBlock';

# Chart Types

Google Charts provides a wide variety of chart types to visualize your data. This guide covers the most commonly used chart types, their data requirements, and best use cases.

## Core Charts (corechart package)

### Pie Chart

Perfect for showing parts of a whole. Requires exactly 2 columns: labels and values.



**Best for:**

- Market share analysis
- Budget breakdowns
- Survey results
- Any part-to-whole relationships


<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Browser', 'Usage'],
          ['Chrome', 61.9],
          ['Firefox', 15.6],
          ['Safari', 11.2],
          ['Edge', 8.7],
          ['Other', 2.6]
        ]);

        const options = {
          title: 'Browser Usage',
          pieHole: 0.4,        // Creates donut chart
          sliceVisibilityThreshold: 0.02, // Hide slices smaller than 2%
          colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
        };

        const chart = new google.visualization.PieChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Line Chart

Ideal for showing trends over time or continuous data.

**Best for:**

- Time series data
- Trend analysis
- Performance tracking
- Continuous data visualization

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Month', 'Sales', 'Expenses', 'Profit'],
          ['Jan', 1000, 400, 600],
          ['Feb', 1170, 460, 710],
          ['Mar', 660, 1120, -460],
          ['Apr', 1030, 540, 490],
          ['May', 1200, 580, 620],
          ['Jun', 1100, 520, 580]
        ]);

        const options = {
          title: 'Company Performance',
          curveType: 'function',    // Smooth curves
          legend: { position: 'bottom' },
          hAxis: { title: 'Month' },
          vAxis: { title: 'Amount ($)' },
          series: {
            2: { color: '#e2431e', lineDashStyle: [4, 4] } // Dashed line for profit
          }
        };

        const chart = new google.visualization.LineChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Column Chart

Great for comparing values across categories.

**Best for:**

- Comparing quantities
- Ranking data
- Survey responses
- Performance comparisons

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['City', '2020 Population', '2021 Population'],
          ['New York', 8175000, 8230000],
          ['Los Angeles', 3792000, 3898000],
          ['Chicago', 2695000, 2746000],
          ['Houston', 2099000, 2304000],
          ['Phoenix', 1445000, 1608000]
        ]);

        const options = {
          title: 'Population by City',
          chartArea: { width: '50%' },
          colors: ['#1f77b4', '#ff7f0e'],
          hAxis: {
            title: 'Total Population',
            minValue: 0,
            format: '#,###'
          },
          vAxis: { title: 'City' }
        };

        const chart = new google.visualization.ColumnChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Bar Chart

Similar to column chart but horizontal orientation.

**Best for:**

- Long category names
- Ranking with many items
- When horizontal layout works better

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Country', 'GDP (Trillions)'],
          ['United States', 21.4],
          ['China', 14.3],
          ['Japan', 5.1],
          ['Germany', 3.8],
          ['India', 2.9]
        ]);

        const options = {
          title: 'GDP by Country',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'GDP (Trillions USD)',
            minValue: 0
          },
          vAxis: { title: 'Country' }
        };

        const chart = new google.visualization.BarChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Area Chart

Shows trends and cumulative values over time.

**Best for:**

- Cumulative data
- Part-to-whole over time
- Multiple series trends

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Year', 'Desktop', 'Mobile', 'Tablet'],
          ['2018', 1000, 400, 200],
          ['2019', 1170, 460, 250],
          ['2020', 660, 1120, 300],
          ['2021', 1030, 1540, 350],
          ['2022', 800, 1800, 400]
        ]);

        const options = {
          title: 'Device Usage Over Time',
          hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 0 },
          isStacked: true,  // Stack areas on top of each other
          colors: ['#1f77b4', '#ff7f0e', '#2ca02c']
        };

        const chart = new google.visualization.AreaChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Scatter Chart

Perfect for showing relationships between two numeric variables.

**Best for:**

- Correlation analysis
- Scientific data
- Performance vs. cost analysis
- Any two-variable relationships

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Age', 'Weight', 'Height'],
          [8, 12, 120],
          [4, 5.5, 95],
          [11, 14, 130],
          [4, 5, 92],
          [3, 3.5, 85],
          [6.5, 7, 110]
        ]);

        const options = {
          title: 'Age vs. Weight',
          hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
          vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
          legend: 'none',
          pointSize: 5,
          colors: ['#e0440e']
        };

        const chart = new google.visualization.ScatterChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Combo Chart

Combines different chart types in one visualization.

**Best for:**

- Comparing different metrics
- Showing targets vs. actuals
- Mixed data types

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
          ['2004/05', 165, 938, 522, 998, 450, 614.6],
          ['2005/06', 135, 1120, 599, 1268, 288, 682],
          ['2006/07', 157, 1167, 587, 807, 397, 623],
          ['2007/08', 139, 1110, 615, 968, 215, 609.4],
          ['2008/09', 136, 691, 629, 1026, 366, 569.6]
        ]);

        const options = {
          title: 'Monthly Coffee Production by Country',
          vAxis: { title: 'Cups' },
          hAxis: { title: 'Month' },
          seriesType: 'columns',
          series: { 5: { type: 'line' } }  // Make the last series a line
        };

        const chart = new google.visualization.ComboChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

## Specialized Charts

### Table Chart

Displays data in a sortable, interactive table format.

**Best for:**

- Detailed data display
- Sortable data
- Mixed data types
- Data exploration

<GoogleChartsLoader packages={['corechart', 'table']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time');
        data.addColumn('date', 'Start Date');

        data.addRows([
          ['Mike', { v: 10000, f: '$10,000' }, true, new Date(2020, 1, 15)],
          ['Jim', { v: 8000, f: '$8,000' }, false, new Date(2020, 3, 22)],
          ['Alice', { v: 12500, f: '$12,500' }, true, new Date(2019, 11, 5)],
          ['Bob', { v: 7000, f: '$7,000' }, true, new Date(2021, 0, 10)]
        ]);

        const options = {
          width: '100%',
          height: '100%',
          alternatingRowStyle: false,
          sortColumn: 1,
          sortAscending: false
        };

        const table = new google.visualization.Table(chartRef.current);
        table.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Histogram

Shows the distribution of a dataset.

**Best for:**

- Data distribution analysis
- Quality control
- Statistical analysis

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Student', 'Score'],
          ['Student 1', 85],
          ['Student 2', 92],
          ['Student 3', 78],
          ['Student 4', 95],
          ['Student 5', 88],
          ['Student 6', 73],
          ['Student 7', 91],
          ['Student 8', 82],
          ['Student 9', 87],
          ['Student 10', 94]
        ]);

        const options = {
          title: 'Test Score Distribution',
          legend: { position: 'none' },
          colors: ['#1f77b4'],
          histogram: {
            bucketSize: 5,
            minValue: 70,
            maxValue: 100
          }
        };

        const chart = new google.visualization.Histogram(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

### Candlestick Chart

Used for financial data showing open, high, low, and close values.

**Best for:**

- Stock price analysis
- Financial data
- OHLC data visualization

<GoogleChartsLoader packages={['corechart']}>
  {(isLoaded) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (isLoaded && chartRef.current) {
        const data = google.visualization.arrayToDataTable([
          ['Date', 'Low', 'Open', 'Close', 'High'],
          ['Mon', 20, 28, 38, 45],
          ['Tue', 31, 38, 55, 66],
          ['Wed', 50, 55, 77, 80],
          ['Thu', 77, 77, 66, 50],
          ['Fri', 68, 66, 22, 15]
        ], true);

        const options = {
          title: 'Stock Price Movement',
          legend: 'none',
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#a52714' },
            risingColor: { strokeWidth: 0, fill: '#0d652d' }
          }
        };

        const chart = new google.visualization.CandlestickChart(chartRef.current);
        chart.draw(data, options);
      }
    }, [isLoaded]);

    return (
      <div>
        {!isLoaded ? (
          <div>Loading Google Charts...</div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        )}
      </div>
    );
  }}
</GoogleChartsLoader>

## Chart Selection Guide

### By Data Type

| Data Type | Recommended Charts |
|-----------|-------------------|
| Time Series | Line, Area, Column |
| Categories | Column, Bar, Pie |
| Relationships | Scatter, Bubble |
| Distributions | Histogram |
| Financial | Candlestick |
| Detailed Data | Table |

### By Use Case

| Use Case | Best Chart Types |
|----------|------------------|
| Trends over time | Line, Area |
| Comparisons | Column, Bar |
| Parts of whole | Pie, Stacked Area |
| Correlations | Scatter |
| Rankings | Bar, Column |
| Distributions | Histogram |
| Multiple metrics | Combo, Multiple charts |

## Common Chart Options

### Universal Options

<CodeBlock
  title="Universal Chart Options"
  code={`const commonOptions = {
  // Title and text
  title: 'Chart Title',
  titleTextStyle: {
    color: '#333',
    fontSize: 18,
    bold: true
  },

  // Size
  width: 600,
  height: 400,

  // Background
  backgroundColor: '#f8f9fa',

  // Chart area
  chartArea: {
    left: 80,
    top: 60,
    width: '75%',
    height: '75%'
  },

  // Legend
  legend: {
    position: 'bottom',
    alignment: 'center',
    textStyle: { fontSize: 12 }
  },

  // Colors
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'],

  // Animation
  animation: {
    startup: true,
    duration: 1000,
    easing: 'out'
  }
};`}
  language="javascript"
/>

### Axis Options

<CodeBlock
  title="Axis Configuration Options"
  code={`const axisOptions = {
  hAxis: {
    title: 'X-Axis Title',
    titleTextStyle: { color: '#333' },
    textStyle: { fontSize: 11 },
    gridlines: { color: '#e0e0e0' },
    minValue: 0,
    maxValue: 100,
    format: '#,###'
  },

  vAxis: {
    title: 'Y-Axis Title',
    titleTextStyle: { color: '#333' },
    textStyle: { fontSize: 11 },
    gridlines: { color: '#e0e0e0' },
    minValue: 0,
    format: '$#,###'
  }
};`}
  language="javascript"
/>

## Responsive Charts

### Making Charts Responsive

<CodeBlock
  title="Responsive Chart Implementation"
  code={`function drawResponsiveChart() {
  const data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2019', 1000, 400],
    ['2020', 1170, 460],
    ['2021', 660, 1120],
    ['2022', 1030, 540]
  ]);

  const options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
    // Make responsive
    width: '100%',
    height: 400
  };

  const chart = new google.visualization.LineChart(document.getElementById('responsive_chart'));

  function drawChart() {
    chart.draw(data, options);
  }

  drawChart();

  // Redraw on window resize
  window.addEventListener('resize', drawChart);
}`}
  language="javascript"
  highlightLines={[14, 15, 25]}
/>

### Mobile-Friendly Options

<CodeBlock
  title="Mobile-Friendly Chart Options"
  code={`function isMobile() {
  return window.innerWidth < 768;
}

function getMobileOptions(baseOptions) {
  if (isMobile()) {
    return {
      ...baseOptions,
      legend: { position: 'none' },
      chartArea: { width: '90%', height: '70%' },
      hAxis: { textStyle: { fontSize: 10 } },
      vAxis: { textStyle: { fontSize: 10 } }
    };
  }
  return baseOptions;
}`}
  language="javascript"
  highlightLines={[2, 9, 10, 11, 12]}
/>

## Next Steps

- Learn about [Chart Customization](./chart-customization.md) for advanced styling
- Explore [Chart Events and Interactivity](./chart-events.md) for user interactions
- See [ChartWrapper](./chartwrapper.md) for unified chart management
- Check out [Performance Best Practices](./performance-best-practices.md) for optimization
