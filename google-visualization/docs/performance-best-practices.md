---
sidebar_position: 10
title: Performance Best Practices
---

# Performance Best Practices

This guide covers techniques to optimize the performance of your Google Charts applications, from data handling to rendering optimization.

## Data Optimization

### Efficient Data Creation

```javascript
// Good - Use arrayToDataTable for simple data
const data = google.visualization.arrayToDataTable([
  ['Month', 'Sales'],
  ['Jan', 1000],
  ['Feb', 1170],
  ['Mar', 660]
]);

// Avoid - Manual row-by-row addition for large datasets
const data = new google.visualization.DataTable();
data.addColumn('string', 'Month');
data.addColumn('number', 'Sales');
data.addRow(['Jan', 1000]);  // Slow for many rows
data.addRow(['Feb', 1170]);
data.addRow(['Mar', 660]);

// Better - Batch row addition
const data = new google.visualization.DataTable();
data.addColumn('string', 'Month');
data.addColumn('number', 'Sales');
data.addRows([
  ['Jan', 1000],
  ['Feb', 1170],
  ['Mar', 660]
]); // Much faster
```

### Large Dataset Handling

```javascript
class LargeDatasetManager {
  constructor(data, pageSize = 1000) {
    this.fullData = data;
    this.pageSize = pageSize;
    this.currentPage = 0;
    this.view = new google.visualization.DataView(data);
  }

  getPage(pageNumber) {
    const startRow = pageNumber * this.pageSize;
    const endRow = Math.min(startRow + this.pageSize, this.fullData.getNumberOfRows());

    const pageRows = [];
    for (let i = startRow; i < endRow; i++) {
      pageRows.push(i);
    }

    this.view.setRows(pageRows);
    this.currentPage = pageNumber;

    return this.view;
  }

  getTotalPages() {
    return Math.ceil(this.fullData.getNumberOfRows() / this.pageSize);
  }

  // Virtual scrolling implementation
  createVirtualScrollView(containerHeight, rowHeight) {
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const buffer = Math.floor(visibleRows / 2);

    return {
      updateView: (scrollTop) => {
        const firstVisibleRow = Math.floor(scrollTop / rowHeight);
        const startRow = Math.max(0, firstVisibleRow - buffer);
        const endRow = Math.min(
          this.fullData.getNumberOfRows(),
          firstVisibleRow + visibleRows + buffer
        );

        const viewRows = [];
        for (let i = startRow; i < endRow; i++) {
          viewRows.push(i);
        }

        this.view.setRows(viewRows);
        return this.view;
      }
    };
  }
}

// Usage
const manager = new LargeDatasetManager(myLargeData, 500);
const firstPage = manager.getPage(0);
chart.draw(firstPage, options);
```

### Data Preprocessing

```javascript
class DataPreprocessor {
  static optimizeDataTypes(data) {
    // Convert string numbers to actual numbers
    const optimizedData = data.clone();

    for (let col = 0; col < data.getNumberOfColumns(); col++) {
      const columnType = data.getColumnType(col);

      if (columnType === 'string') {
        // Check if all values are numeric
        let allNumeric = true;
        for (let row = 0; row < data.getNumberOfRows(); row++) {
          const value = data.getValue(row, col);
          if (value !== null && isNaN(Number(value))) {
            allNumeric = false;
            break;
          }
        }

        if (allNumeric) {
          // Convert to number column
          for (let row = 0; row < data.getNumberOfRows(); row++) {
            const value = data.getValue(row, col);
            if (value !== null) {
              optimizedData.setValue(row, col, Number(value));
            }
          }
        }
      }
    }

    return optimizedData;
  }

  static removeEmptyRows(data) {
    const view = new google.visualization.DataView(data);
    const nonEmptyRows = [];

    for (let row = 0; row < data.getNumberOfRows(); row++) {
      let hasData = false;

      for (let col = 0; col < data.getNumberOfColumns(); col++) {
        if (data.getValue(row, col) !== null) {
          hasData = true;
          break;
        }
      }

      if (hasData) {
        nonEmptyRows.push(row);
      }
    }

    view.setRows(nonEmptyRows);
    return view;
  }

  static aggregateData(data, groupColumn, valueColumns, aggregationType = 'sum') {
    const groups = new Map();

    // Group data
    for (let row = 0; row < data.getNumberOfRows(); row++) {
      const groupKey = data.getValue(row, groupColumn);

      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          values: valueColumns.map(() => []),
          count: 0
        });
      }

      const group = groups.get(groupKey);
      valueColumns.forEach((col, index) => {
        const value = data.getValue(row, col);
        if (value !== null) {
          group.values[index].push(value);
        }
      });
      group.count++;
    }

    // Create aggregated data
    const aggregatedData = new google.visualization.DataTable();
    aggregatedData.addColumn(data.getColumnType(groupColumn), data.getColumnLabel(groupColumn));

    valueColumns.forEach(col => {
      aggregatedData.addColumn('number', `${aggregationType}(${data.getColumnLabel(col)})`);
    });

    for (const [groupKey, group] of groups) {
      const row = [groupKey];

      group.values.forEach(values => {
        let aggregatedValue;

        switch (aggregationType) {
          case 'sum':
            aggregatedValue = values.reduce((a, b) => a + b, 0);
            break;
          case 'avg':
            aggregatedValue = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
            break;
          case 'max':
            aggregatedValue = values.length > 0 ? Math.max(...values) : 0;
            break;
          case 'min':
            aggregatedValue = values.length > 0 ? Math.min(...values) : 0;
            break;
          case 'count':
            aggregatedValue = values.length;
            break;
          default:
            aggregatedValue = values.reduce((a, b) => a + b, 0);
        }

        row.push(aggregatedValue);
      });

      aggregatedData.addRow(row);
    }

    return aggregatedData;
  }
}
```

## Chart Rendering Optimization

### Efficient Chart Updates

```javascript
class OptimizedChartManager {
  constructor(chartType, containerId) {
    this.chart = new google.visualization[chartType](document.getElementById(containerId));
    this.lastData = null;
    this.lastOptions = null;
    this.updateQueue = [];
    this.isUpdating = false;
  }

  // Debounced updates to prevent excessive redraws
  updateChart(data, options, delay = 100) {
    clearTimeout(this.updateTimeout);

    this.updateTimeout = setTimeout(() => {
      this.performUpdate(data, options);
    }, delay);
  }

  performUpdate(data, options) {
    // Only redraw if data or options actually changed
    if (this.hasDataChanged(data) || this.hasOptionsChanged(options)) {
      this.chart.draw(data, options);
      this.lastData = data;
      this.lastOptions = { ...options };
    }
  }

  hasDataChanged(newData) {
    if (!this.lastData) return true;

    // Quick checks first
    if (this.lastData.getNumberOfRows() !== newData.getNumberOfRows() ||
        this.lastData.getNumberOfColumns() !== newData.getNumberOfColumns()) {
      return true;
    }

    // Sample-based comparison for large datasets
    const sampleSize = Math.min(100, newData.getNumberOfRows());
    const step = Math.floor(newData.getNumberOfRows() / sampleSize);

    for (let i = 0; i < newData.getNumberOfRows(); i += step) {
      for (let j = 0; j < newData.getNumberOfColumns(); j++) {
        if (this.lastData.getValue(i, j) !== newData.getValue(i, j)) {
          return true;
        }
      }
    }

    return false;
  }

  hasOptionsChanged(newOptions) {
    return JSON.stringify(this.lastOptions) !== JSON.stringify(newOptions);
  }

  // Batch multiple updates
  batchUpdate(updates) {
    if (this.isUpdating) {
      this.updateQueue.push(...updates);
      return;
    }

    this.isUpdating = true;

    // Process all updates
    const finalData = updates.reduce((data, update) => {
      return update.transform(data);
    }, this.lastData);

    this.chart.draw(finalData, this.lastOptions);

    // Process queued updates
    if (this.updateQueue.length > 0) {
      const queuedUpdates = this.updateQueue.splice(0);
      setTimeout(() => {
        this.isUpdating = false;
        this.batchUpdate(queuedUpdates);
      }, 0);
    } else {
      this.isUpdating = false;
    }
  }
}
```

### Animation Optimization

```javascript
// Optimize animations for better performance
const performantAnimationOptions = {
  animation: {
    startup: true,
    duration: 500,        // Shorter duration
    easing: 'out'         // Simpler easing
  }
};

// Disable animations for large datasets
function getOptimalAnimationOptions(dataSize) {
  if (dataSize > 1000) {
    return { animation: { startup: false } };
  } else if (dataSize > 500) {
    return {
      animation: {
        startup: true,
        duration: 300,
        easing: 'linear'
      }
    };
  } else {
    return {
      animation: {
        startup: true,
        duration: 1000,
        easing: 'out'
      }
    };
  }
}
```

### Memory Management

```javascript
class ChartMemoryManager {
  constructor() {
    this.charts = new Map();
    this.dataCache = new Map();
    this.maxCacheSize = 50;
  }

  createChart(id, chartType, containerId, data, options) {
    // Clean up existing chart
    this.destroyChart(id);

    const chart = new google.visualization[chartType](document.getElementById(containerId));

    // Add memory monitoring
    const memoryInfo = {
      dataSize: this.calculateDataSize(data),
      createdAt: Date.now(),
      lastUsed: Date.now()
    };

    this.charts.set(id, { chart, memoryInfo });

    // Cache data if reasonable size
    if (memoryInfo.dataSize < 1000000) { // 1MB limit
      this.cacheData(id, data);
    }

    chart.draw(data, options);

    // Clean up old charts if memory usage is high
    this.cleanupIfNeeded();

    return chart;
  }

  destroyChart(id) {
    const chartInfo = this.charts.get(id);
    if (chartInfo) {
      // Clear the container
      const container = chartInfo.chart.getContainer();
      if (container) {
        container.innerHTML = '';
      }

      this.charts.delete(id);
      this.dataCache.delete(id);
    }
  }

  calculateDataSize(data) {
    let size = 0;

    for (let row = 0; row < data.getNumberOfRows(); row++) {
      for (let col = 0; col < data.getNumberOfColumns(); col++) {
        const value = data.getValue(row, col);
        if (value !== null) {
          size += typeof value === 'string' ? value.length * 2 : 8;
        }
      }
    }

    return size;
  }

  cacheData(id, data) {
    if (this.dataCache.size >= this.maxCacheSize) {
      // Remove oldest cached data
      const oldestId = Array.from(this.dataCache.keys())[0];
      this.dataCache.delete(oldestId);
    }

    this.dataCache.set(id, data.clone());
  }

  cleanupIfNeeded() {
    const totalCharts = this.charts.size;

    if (totalCharts > 20) {
      // Remove least recently used charts
      const sortedCharts = Array.from(this.charts.entries())
        .sort((a, b) => a[1].memoryInfo.lastUsed - b[1].memoryInfo.lastUsed);

      const toRemove = sortedCharts.slice(0, totalCharts - 15);
      toRemove.forEach(([id]) => this.destroyChart(id));
    }
  }

  getMemoryUsage() {
    let totalSize = 0;
    let chartCount = 0;

    for (const [id, chartInfo] of this.charts) {
      totalSize += chartInfo.memoryInfo.dataSize;
      chartCount++;
    }

    return {
      totalSize,
      chartCount,
      averageSize: chartCount > 0 ? totalSize / chartCount : 0,
      cacheSize: this.dataCache.size
    };
  }
}

// Global memory manager instance
const memoryManager = new ChartMemoryManager();
```

## DOM and Rendering Optimization

### Container Optimization

```javascript
// Optimize chart containers
function optimizeChartContainer(containerId) {
  const container = document.getElementById(containerId);

  // Set explicit dimensions to avoid reflow
  if (!container.style.width) {
    container.style.width = '100%';
  }
  if (!container.style.height) {
    container.style.height = '400px';
  }

  // Use CSS containment for better performance
  container.style.contain = 'layout style paint';

  // Optimize for animations
  container.style.willChange = 'transform';

  return container;
}

// Intersection Observer for lazy loading
class LazyChartLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold: 0.1 }
    );
    this.pendingCharts = new Map();
  }

  addChart(containerId, chartConfig) {
    const container = document.getElementById(containerId);
    this.pendingCharts.set(containerId, chartConfig);
    this.observer.observe(container);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const containerId = entry.target.id;
        const config = this.pendingCharts.get(containerId);

        if (config) {
          this.loadChart(containerId, config);
          this.observer.unobserve(entry.target);
          this.pendingCharts.delete(containerId);
        }
      }
    });
  }

  loadChart(containerId, config) {
    const chart = new google.visualization[config.chartType](
      document.getElementById(containerId)
    );
    chart.draw(config.data, config.options);
  }
}

const lazyLoader = new LazyChartLoader();
```

### Responsive Performance

```javascript
class ResponsiveChartManager {
  constructor() {
    this.charts = new Map();
    this.resizeTimeout = null;
    this.isResizing = false;

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  addChart(id, chart, data, options) {
    this.charts.set(id, { chart, data, options });
  }

  handleResize() {
    if (this.isResizing) return;

    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.isResizing = true;

      // Batch all resize operations
      const resizePromises = [];

      for (const [id, chartInfo] of this.charts) {
        resizePromises.push(this.resizeChart(chartInfo));
      }

      Promise.all(resizePromises).then(() => {
        this.isResizing = false;
      });
    }, 150); // Debounce resize events
  }

  async resizeChart(chartInfo) {
    return new Promise(resolve => {
      // Use requestAnimationFrame for smooth resizing
      requestAnimationFrame(() => {
        chartInfo.chart.draw(chartInfo.data, chartInfo.options);
        resolve();
      });
    });
  }
}
```

## Network and Loading Optimization

### Data Loading Strategies

```javascript
class DataLoadingOptimizer {
  static async loadDataInChunks(dataUrl, chunkSize = 1000) {
    const response = await fetch(dataUrl);
    const fullData = await response.json();

    const chunks = [];
    for (let i = 0; i < fullData.length; i += chunkSize) {
      chunks.push(fullData.slice(i, i + chunkSize));
    }

    return chunks;
  }

  static createProgressiveLoader(dataUrl, onChunkLoaded) {
    return new Promise(async (resolve) => {
      const chunks = await this.loadDataInChunks(dataUrl);
      let loadedData = new google.visualization.DataTable();

      // Initialize with first chunk
      if (chunks.length > 0) {
        loadedData = google.visualization.arrayToDataTable(chunks[0]);
        onChunkLoaded(loadedData, 1, chunks.length);
      }

      // Load remaining chunks progressively
      for (let i = 1; i < chunks.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 10)); // Small delay

        chunks[i].forEach(row => {
          loadedData.addRow(row);
        });

        onChunkLoaded(loadedData, i + 1, chunks.length);
      }

      resolve(loadedData);
    });
  }

  static cacheData(key, data, ttl = 300000) { // 5 minutes default TTL
    const cacheItem = {
      data: data,
      timestamp: Date.now(),
      ttl: ttl
    };

    try {
      localStorage.setItem(`chart_cache_${key}`, JSON.stringify(cacheItem));
    } catch (e) {
      console.warn('Failed to cache data:', e);
    }
  }

  static getCachedData(key) {
    try {
      const cached = localStorage.getItem(`chart_cache_${key}`);
      if (cached) {
        const cacheItem = JSON.parse(cached);

        if (Date.now() - cacheItem.timestamp < cacheItem.ttl) {
          return cacheItem.data;
        } else {
          localStorage.removeItem(`chart_cache_${key}`);
        }
      }
    } catch (e) {
      console.warn('Failed to retrieve cached data:', e);
    }

    return null;
  }
}
```

## Performance Monitoring

### Performance Metrics

```javascript
class ChartPerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }

  startTiming(chartId, operation) {
    const key = `${chartId}_${operation}`;
    this.metrics.set(key, {
      startTime: performance.now(),
      operation: operation,
      chartId: chartId
    });
  }

  endTiming(chartId, operation) {
    const key = `${chartId}_${operation}`;
    const metric = this.metrics.get(key);

    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;

      // Log slow operations
      if (metric.duration > 1000) {
        console.warn(`Slow chart operation: ${operation} took ${metric.duration}ms for chart ${chartId}`);
      }

      return metric.duration;
    }

    return null;
  }

  getMetrics(chartId) {
    const chartMetrics = [];

    for (const [key, metric] of this.metrics) {
      if (metric.chartId === chartId && metric.duration) {
        chartMetrics.push(metric);
      }
    }

    return chartMetrics;
  }

  getAverageRenderTime() {
    const renderTimes = [];

    for (const [key, metric] of this.metrics) {
      if (metric.operation === 'render' && metric.duration) {
        renderTimes.push(metric.duration);
      }
    }

    return renderTimes.length > 0
      ? renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length
      : 0;
  }
}

// Usage
const monitor = new ChartPerformanceMonitor();

function drawOptimizedChart(chartId, data, options) {
  monitor.startTiming(chartId, 'render');

  const chart = new google.visualization.LineChart(document.getElementById(chartId));

  google.visualization.events.addListener(chart, 'ready', () => {
    monitor.endTiming(chartId, 'render');
  });

  chart.draw(data, options);
}
```

## Best Practices Summary

### Do's

1. **Use batch operations** for adding multiple rows/columns
2. **Implement data pagination** for large datasets
3. **Cache processed data** when possible
4. **Use DataView** for filtering instead of creating new DataTables
5. **Debounce chart updates** to prevent excessive redraws
6. **Monitor memory usage** and clean up unused charts
7. **Use lazy loading** for charts not immediately visible
8. **Optimize container dimensions** to avoid reflow

### Don'ts

1. **Don't create new DataTables** for every update
2. **Don't use complex animations** with large datasets
3. **Don't ignore memory leaks** from event listeners
4. **Don't update charts** on every data change without debouncing
5. **Don't load all data** at once for very large datasets
6. **Don't forget to clean up** chart instances when done

### Performance Checklist

- [ ] Data is loaded efficiently (batched, cached, paginated)
- [ ] Chart updates are debounced
- [ ] Memory usage is monitored and managed
- [ ] Containers are properly sized
- [ ] Animations are optimized for dataset size
- [ ] Event listeners are cleaned up
- [ ] Large datasets use virtual scrolling or pagination
- [ ] Charts are lazy-loaded when not immediately visible

## Next Steps

- Learn about [Dashboard Creation](./dashboard-creation.md) for building performant dashboards
- Explore [Data Import and Export](./data-import-export.md) for efficient data handling
- See [Chart Events and Interactivity](./chart-events.md) for optimized event handling
- Check out [Advanced Data Manipulation](./advanced-data-manipulation.md) for efficient data processing
