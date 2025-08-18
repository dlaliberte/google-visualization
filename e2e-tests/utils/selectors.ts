/**
 * Common selectors for Google Visualization components
 */
export const Selectors = {
  // Chart containers
  Charts: {
    LineChart: '.google-visualization-line-chart',
    BarChart: '.google-visualization-bar-chart',
    PieChart: '.google-visualization-pie-chart',
    ColumnChart: '.google-visualization-column-chart',
    AreaChart: '.google-visualization-area-chart',
    ScatterChart: '.google-visualization-scatter-chart',
    TableChart: '.google-visualization-table',
    TreeMap: '.google-visualization-treemap',
  },

  // Chart elements
  Elements: {
    DataPoint: '.data-point',
    DataSeries: '.chart-series',
    Axis: {
      X: '.x-axis',
      Y: '.y-axis',
    },
    Legend: '.chart-legend',
    Title: '.chart-title',
  },

  // Interactive elements
  Interactive: {
    Tooltip: '.google-visualization-tooltip',
    LegendItem: '.legend-item',
    ZoomControls: '.zoom-controls',
  },

  // Controls
  Controls: {
    FilterControl: '.google-visualization-filter',
    RangeSlider: '.google-visualization-range-slider',
    CategoryFilter: '.google-visualization-category-filter',
    Dashboard: '.google-visualization-dashboard',
  },
};
