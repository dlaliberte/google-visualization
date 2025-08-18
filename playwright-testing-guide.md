# Playwright Testing Guide for Google Visualization

This guide provides detailed instructions for implementing comprehensive testing with Playwright for the Google Visualization library.

## Table of Contents

1. [Setting Up Playwright](#1-setting-up-playwright)
2. [Test Structure and Organization](#2-test-structure-and-organization)
3. [Creating Test Examples](#3-creating-test-examples)
4. [Writing Effective Tests](#4-writing-effective-tests)
5. [Visual Regression Testing](#5-visual-regression-testing)
6. [Accessibility Testing](#6-accessibility-testing)
7. [Performance Testing](#7-performance-testing)
8. [CI/CD Integration](#8-cicd-integration)

## 1. Setting Up Playwright

### 1.1. Installation

Install Playwright and its dependencies:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### 1.2. Configuration

Create a `playwright.config.ts` file in the project root:

```typescript
import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e-tests',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  webServer: {
    command: 'npm run serve-examples',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
};

export default config;
```

### 1.3. Add Scripts to package.json

Add the following scripts to your package.json:

```json
"scripts": {
  "serve-examples": "http-server ./examples -p 3000",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:debug": "playwright test --debug",
  "test:e2e:report": "playwright show-report"
}
```

### 1.4. Install HTTP Server

Install a simple HTTP server for serving test examples:

```bash
npm install --save-dev http-server
```

## 2. Test Structure and Organization

### 2.1. Directory Structure

Create the following directory structure:

```
/e2e-tests
  /charts
    line-chart.spec.ts
    bar-chart.spec.ts
    pie-chart.spec.ts
    ...
  /controls
    filter-control.spec.ts
    range-slider.spec.ts
    ...
  /interactions
    tooltip.spec.ts
    zoom-pan.spec.ts
    selection.spec.ts
    ...
  /accessibility
    keyboard-navigation.spec.ts
    screen-reader.spec.ts
    ...
  /performance
    large-dataset.spec.ts
    animation.spec.ts
    ...
  /utils
    test-helpers.ts
    selectors.ts
    ...
/examples
  /charts
    line-chart-basic.html
    bar-chart-basic.html
    ...
  /controls
    filter-control-basic.html
    ...
  /interactions
    tooltip-example.html
    zoom-pan-example.html
    ...
  /accessibility
    keyboard-navigation-example.html
    ...
  /performance
    large-dataset-example.html
    ...
```

### 2.2. Test Helpers

Create test helper functions in `e2e-tests/utils/test-helpers.ts`:

```typescript
import { Page, expect } from '@playwright/test';

/**
 * Waits for a chart to be fully rendered
 */
export async function waitForChartRendered(page: Page, selector: string): Promise<void> {
  // Wait for the chart container
  await page.waitForSelector(selector);

  // Wait for SVG or Canvas element inside the chart
  await page.waitForSelector(`${selector} svg, ${selector} canvas`);

  // Wait for data elements to appear
  await page.waitForSelector(`${selector} .chart-series, ${selector} .chart-element`, {
    timeout: 10000,
  });

  // Wait a bit more for animations to complete
  await page.waitForTimeout(500);
}

/**
 * Verifies basic chart structure
 */
export async function verifyChartStructure(page: Page, selector: string): Promise<void> {
  // Verify chart container exists
  await expect(page.locator(selector)).toBeVisible();

  // Verify chart has rendering element
  await expect(page.locator(`${selector} svg, ${selector} canvas`)).toBeVisible();

  // Verify chart has data elements
  const dataElements = page.locator(`${selector} .chart-series, ${selector} .chart-element`);
  await expect(dataElements).toHaveCount({ min: 1 });
}

/**
 * Triggers a tooltip by hovering over a data point
 */
export async function triggerTooltip(page: Page, chartSelector: string, pointIndex = 1): Promise<void> {
  const dataPoint = page.locator(`${chartSelector} .data-point`).nth(pointIndex);
  await dataPoint.hover();
  await page.waitForSelector('.google-visualization-tooltip', { state: 'visible' });
}

/**
 * Performs a zoom operation on a chart
 */
export async function zoomChart(page: Page, chartSelector: string, zoomFactor = -100): Promise<void> {
  // Get chart dimensions
  const chartBounds = await page.locator(chartSelector).boundingBox();
  if (!chartBounds) throw new Error('Chart not found');

  // Move to center of chart
  const centerX = chartBounds.x + chartBounds.width / 2;
  const centerY = chartBounds.y + chartBounds.height / 2;

  // Perform zoom
  await page.mouse.move(centerX, centerY);
  await page.mouse.wheel(0, zoomFactor);

  // Wait for zoom animation
  await page.waitForTimeout(500);
}

/**
 * Performs a pan operation on a chart
 */
export async function panChart(page: Page, chartSelector: string, deltaX = 100, deltaY = 0): Promise<void> {
  // Get chart dimensions
  const chartBounds = await page.locator(chartSelector).boundingBox();
  if (!chartBounds) throw new Error('Chart not found');

  // Move to center of chart
  const centerX = chartBounds.x + chartBounds.width / 2;
  const centerY = chartBounds.y + chartBounds.height / 2;

  // Perform pan
  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  await page.mouse.move(centerX - deltaX, centerY - deltaY);
  await page.mouse.up();

  // Wait for pan animation
  await page.waitForTimeout(500);
}
```

### 2.3. Selectors

Create a selectors file in `e2e-tests/utils/selectors.ts`:

```typescript
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
```

## 3. Creating Test Examples

### 3.1. Basic Chart Example

Create `examples/charts/line-chart-basic.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Line Chart Basic Example</title>
  <script src="../../dist/google-visualization.js"></script>
  <style>
    #chart {
      width: 800px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="chart"></div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Create data table
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Month');
      data.addColumn('number', 'Sales');
      data.addColumn('number', 'Expenses');

      data.addRows([
        ['Jan', 1000, 800],
        ['Feb', 1170, 860],
        ['Mar', 660, 1120],
        ['Apr', 1030, 540],
        ['May', 1000, 700],
        ['Jun', 1170, 600],
        ['Jul', 660, 550],
        ['Aug', 1030, 740],
        ['Sep', 1000, 800],
        ['Oct', 1170, 850],
        ['Nov', 660, 650],
        ['Dec', 1030, 700]
      ]);

      // Set chart options
      const options = {
        title: 'Monthly Sales and Expenses',
        curveType: 'function',
        legend: { position: 'bottom' },
        width: 800,
        height: 400,
        animation: {
          startup: true,
          duration: 500,
          easing: 'out'
        }
      };

      // Create and draw the chart
      const chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(data, options);
    });
  </script>
</body>
</html>
```

### 3.2. Interactive Chart Example

Create `examples/interactions/zoom-pan-example.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Chart Example</title>
  <script src="../../dist/google-visualization.js"></script>
  <style>
    #chart {
      width: 800px;
      height: 400px;
      margin: 20px auto;
    }
    .controls {
      text-align: center;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="controls">
    <button id="reset">Reset Zoom</button>
  </div>
  <div id="chart"></div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Create data with many points
      const data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Y1');
      data.addColumn('number', 'Y2');

      // Generate 100 data points
      for (let i = 0; i < 100; i++) {
        const x = i;
        const y1 = Math.sin(i * 0.1) * 100 + Math.random() * 20;
        const y2 = Math.cos(i * 0.1) * 80 + Math.random() * 10;
        data.addRow([x, y1, y2]);
      }

      // Set chart options
      const options = {
        title: 'Interactive Chart (Scroll to Zoom, Drag to Pan)',
        curveType: 'function',
        legend: { position: 'bottom' },
        width: 800,
        height: 400,
        explorer: {
          actions: ['dragToZoom', 'rightClickToReset'],
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 0.01
        }
      };

      // Create and draw the chart
      const chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(data, options);

      // Add reset button functionality
      document.getElementById('reset').addEventListener('click', function() {
        chart.draw(data, options);
      });
    });
  </script>
</body>
</html>
```

### 3.3. Tooltip Example

Create `examples/interactions/tooltip-example.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tooltip Example</title>
  <script src="../../dist/google-visualization.js"></script>
  <style>
    #chart {
      width: 800px;
      height: 400px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div id="chart"></div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Create data table
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Country');
      data.addColumn('number', 'GDP');
      data.addColumn({type: 'string', role: 'tooltip'});
      data.addColumn('number', 'Population');
      data.addColumn({type: 'string', role: 'tooltip'});

      data.addRows([
        ['USA', 21400, 'GDP: $21.4 trillion', 331, 'Population: 331 million'],
        ['China', 14300, 'GDP: $14.3 trillion', 1398, 'Population: 1.398 billion'],
        ['Japan', 5080, 'GDP: $5.08 trillion', 126, 'Population: 126 million'],
        ['Germany', 3860, 'GDP: $3.86 trillion', 83, 'Population: 83 million'],
        ['UK', 2830, 'GDP: $2.83 trillion', 67, 'Population: 67 million'],
        ['India', 2710, 'GDP: $2.71 trillion', 1366, 'Population: 1.366 billion'],
        ['France', 2710, 'GDP: $2.71 trillion', 65, 'Population: 65 million'],
        ['Italy', 2030, 'GDP: $2.03 trillion', 60, 'Population: 60 million'],
        ['Brazil', 1870, 'GDP: $1.87 trillion', 211, 'Population: 211 million'],
        ['Canada', 1730, 'GDP: $1.73 trillion', 38, 'Population: 38 million']
      ]);

      // Set chart options
      const options = {
        title: 'GDP and Population by Country',
        width: 800,
        height: 400,
        legend: { position: 'top' },
        tooltip: {
          isHtml: true,
          trigger: 'selection'
        }
      };

      // Create and draw the chart
      const chart = new google.visualization.BarChart(document.getElementById('chart'));
      chart.draw(data, options);
    });
  </script>
</body>
</html>
```

## 4. Writing Effective Tests

### 4.1. Basic Chart Test

Create `e2e-tests/charts/line-chart.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { waitForChartRendered, verifyChartStructure } from '../utils/test-helpers';
import { Selectors } from '../utils/selectors';

test.describe('Line Chart', () => {
  test('renders basic line chart correctly', async ({ page }) => {
    // Navigate to the example
    await page.goto('/charts/line-chart-basic.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Verify chart structure
    await verifyChartStructure(page, Selectors.Charts.LineChart);

    // Verify specific line chart elements
    await expect(page.locator(`${Selectors.Charts.LineChart} path.line`)).toHaveCount({ min: 2 });
    await expect(page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.DataPoint}`)).toHaveCount({ min: 10 });

    // Verify chart title
    await expect(page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Title}`)).toContainText('Monthly Sales');

    // Verify axes
    await expect(page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Axis.X}`)).toBeVisible();
    await expect(page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Axis.Y}`)).toBeVisible();

    // Verify legend
    await expect(page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Legend}`)).toBeVisible();
    await expect(page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Legend}`)).toContainText('Sales');
    await expect(page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Legend}`)).toContainText('Expenses');

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('line-chart-basic.png');
  });

  test('resizes chart based on container size', async ({ page }) => {
    // Navigate to the example
    await page.goto('/charts/line-chart-basic.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Get initial size
    const initialBounds = await page.locator(Selectors.Charts.LineChart).boundingBox();

    // Resize the container
    await page.evaluate(() => {
      const container = document.getElementById('chart');
      if (container) {
        container.style.width = '600px';
        container.style.height = '300px';

        // Trigger resize event
        window.dispatchEvent(new Event('resize'));
      }
    });

    // Wait for resize to take effect
    await page.waitForTimeout(500);

    // Get new size
    const newBounds = await page.locator(Selectors.Charts.LineChart).boundingBox();

    // Verify chart resized
    expect(newBounds?.width).toBeLessThan(initialBounds?.width || 0);
    expect(newBounds?.height).toBeLessThan(initialBounds?.height || 0);

    // Take screenshot of resized chart
    await expect(page).toHaveScreenshot('line-chart-resized.png');
  });
});
```

### 4.2. Interactive Chart Test

Create `e2e-tests/interactions/zoom-pan.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { waitForChartRendered, zoomChart, panChart } from '../utils/test-helpers';
import { Selectors } from '../utils/selectors';

test.describe('Chart Zoom and Pan', () => {
  test('supports zooming with mouse wheel', async ({ page }) => {
    // Navigate to the example
    await page.goto('/interactions/zoom-pan-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Take screenshot before zoom
    await expect(page).toHaveScreenshot('chart-before-zoom.png');

    // Perform zoom operation
    await zoomChart(page, Selectors.Charts.LineChart);

    // Take screenshot after zoom
    await expect(page).toHaveScreenshot('chart-after-zoom.png');

    // Verify zoom effect (this is a visual comparison, but we can also check DOM changes)
    const xAxisLabels = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Axis.X} text`);
    const labelCount = await xAxisLabels.count();

    // After zooming, we should see fewer labels or different label values
    expect(labelCount).toBeGreaterThan(0);

    // Get text of first and last visible labels
    const firstLabel = await xAxisLabels.first().textContent();
    const lastLabel = await xAxisLabels.last().textContent();

    // Store these values to compare after reset
    await page.evaluate((first, last) => {
      window.__testData = { firstLabel: first, lastLabel: last };
    }, firstLabel, lastLabel);
  });

  test('supports panning with mouse drag', async ({ page }) => {
    // Navigate to the example
    await page.goto('/interactions/zoom-pan-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Zoom in first to make panning more noticeable
    await zoomChart(page, Selectors.Charts.LineChart);

    // Take screenshot before pan
    await expect(page).toHaveScreenshot('chart-before-pan.png');

    // Perform pan operation
    await panChart(page, Selectors.Charts.LineChart, 100, 0);

    // Take screenshot after pan
    await expect(page).toHaveScreenshot('chart-after-pan.png');

    // Verify pan effect by checking axis labels
    const xAxisLabels = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Axis.X} text`);

    // Get text of first and last visible labels after panning
    const firstLabel = await xAxisLabels.first().textContent();
    const lastLabel = await xAxisLabels.last().textContent();

    // These should be different from the initial state
    const initialState = await page.evaluate(() => window.__testData || { firstLabel: null, lastLabel: null });

    if (initialState.firstLabel && initialState.lastLabel) {
      // At least one of the labels should be different after panning
      expect(firstLabel !== initialState.firstLabel || lastLabel !== initialState.lastLabel).toBeTruthy();
    }
  });

  test('resets view when reset button is clicked', async ({ page }) => {
    // Navigate to the example
    await page.goto('/interactions/zoom-pan-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Take screenshot of initial state
    await expect(page).toHaveScreenshot('chart-initial-state.png');

    // Perform zoom and pan operations
    await zoomChart(page, Selectors.Charts.LineChart);
    await panChart(page, Selectors.Charts.LineChart, 100, 0);

    // Take screenshot of modified state
    await expect(page).toHaveScreenshot('chart-modified-state.png');

    // Click reset button
    await page.click('#reset');

    // Wait for reset animation
    await page.waitForTimeout(500);

    // Take screenshot after reset
    await expect(page).toHaveScreenshot('chart-reset-state.png');

    // Compare with initial state (should be visually similar)
    // This is handled by Playwright's screenshot comparison
  });
});
```

### 4.3. Tooltip Test

Create `e2e-tests/interactions/tooltip.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { waitForChartRendered, triggerTooltip } from '../utils/test-helpers';
import { Selectors } from '../utils/selectors';

test.describe('Chart Tooltips', () => {
  test('displays tooltip on hover', async ({ page }) => {
    // Navigate to the example
    await page.goto('/interactions/tooltip-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.BarChart);

    // Trigger tooltip by hovering over a data point
    await triggerTooltip(page, Selectors.Charts.BarChart, 2); // Hover over the 3rd bar

    // Verify tooltip is visible
    const tooltip = page.locator(Selectors.Interactive.Tooltip);
    await expect(tooltip).toBeVisible();

    // Verify tooltip content
    await expect(tooltip).toContainText('GDP:');
    await expect(tooltip).toContainText('trillion');

    // Take screenshot with tooltip visible
    await expect(page).toHaveScreenshot('bar-chart-tooltip.png');

    // Move mouse away
    await page.mouse.move(0, 0);

    // Verify tooltip disappears
    await expect(tooltip).not.toBeVisible({ timeout: 2000 });
  });

  test('tooltip contains correct data', async ({ page }) => {
    // Navigate to the example
    await page.goto('/interactions/tooltip-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.BarChart);

    // Get data for verification
    const countryData = await page.evaluate(() => {
      const data = [];
      const table = document.querySelector('table');
      if (table) {
        const rows = table.querySelectorAll('tr');
        for (let i = 1; i < rows.length; i++) { // Skip header row
          const cells = rows[i].querySelectorAll('td');
          if (cells.length >= 5) {
            data.push({
              country: cells[0].textContent,
              gdpTooltip: cells[2].textContent,
              populationTooltip: cells[4].textContent
            });
          }
        }
      }
      return data;
    });

    // Test tooltips for each country
    for (let i = 0; i < Math.min(countryData.length, 5); i++) { // Test first 5 countries
      // Hover over the bar
      await triggerTooltip(page, Selectors.Charts.BarChart, i);

      // Verify tooltip content matches data
      const tooltip = page.locator(Selectors.Interactive.Tooltip);
      await expect(tooltip).toBeVisible();

      // Check if tooltip contains the correct GDP information
      await expect(tooltip).toContainText(countryData[i].gdpTooltip || '');

      // Move mouse away
      await page.mouse.move(0, 0);

      // Wait for tooltip to disappear
      await expect(tooltip).not.toBeVisible({ timeout: 2000 });

      // Wait before next hover
      await page.waitForTimeout(500);
    }
  });

  test('tooltip styling is consistent', async ({ page }) => {
    // Navigate to the example
    await page.goto('/interactions/tooltip-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.BarChart);

    // Trigger tooltip
    await triggerTooltip(page, Selectors.Charts.BarChart, 0);

    // Verify tooltip is visible
    const tooltip = page.locator(Selectors.Interactive.Tooltip);
    await expect(tooltip).toBeVisible();

    // Check tooltip styling
    const tooltipStyles = await tooltip.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
        boxShadow: styles.boxShadow,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize
      };
    });

    // Verify tooltip has proper styling
    expect(tooltipStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(tooltipStyles.border).not.toBe('');
    expect(tooltipStyles.borderRadius).not.toBe('0px');
    expect(tooltipStyles.padding).not.toBe('0px');

    // Take screenshot for visual verification
    await expect(page).toHaveScreenshot('tooltip-styling.png');
  });
});
```

## 5. Visual Regression Testing

### 5.1. Setting Up Visual Comparisons

Playwright has built-in support for visual comparisons. The `toHaveScreenshot()` method automatically compares the current screenshot with a baseline.

To update baselines:

```bash
npx playwright test --update-snapshots
```

### 5.2. Visual Test Best Practices

1. **Consistent Environment**:
   - Use the same browser and viewport size for visual tests
   - Run tests in headless mode to avoid UI variations

2. **Isolate Visual Elements**:
   - Take screenshots of specific components rather than the entire page
   - Use selectors to target specific elements

3. **Handle Dynamic Content**:
   - Mask or remove dynamic content before taking screenshots
   - Use data attributes to identify elements that should be masked

4. **Threshold Settings**:
   - Set appropriate thresholds for pixel differences
   - Allow for minor variations in rendering

Example with threshold and masking:

```typescript
// In playwright.config.ts
const config: PlaywrightTestConfig = {
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
    }
  },
  // ...
};

// In test file
test('chart visual appearance', async ({ page }) => {
  await page.goto('/charts/line-chart-basic.html');
  await waitForChartRendered(page, Selectors.Charts.LineChart);

  // Mask dynamic elements
  await page.evaluate(() => {
    const dateElements = document.querySelectorAll('.chart-timestamp');
    dateElements.forEach(el => {
      el.setAttribute('data-testid', 'masked-date');
    });
  });

  // Take screenshot with masking
  await expect(page).toHaveScreenshot('line-chart.png', {
    mask: [page.locator('[data-testid="masked-date"]')],
    threshold: 0.2
  });
});
```

## 6. Accessibility Testing

### 6.1. Basic Accessibility Tests

Create `e2e-tests/accessibility/basic-a11y.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { waitForChartRendered } from '../utils/test-helpers';
import { Selectors } from '../utils/selectors';

test.describe('Chart Accessibility', () => {
  test('chart has proper ARIA attributes', async ({ page }) => {
    // Navigate to the example
    await page.goto('/charts/line-chart-basic.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Check chart container has role
    const chartContainer = page.locator(Selectors.Charts.LineChart);
    await expect(chartContainer).toHaveAttribute('role', 'img');

    // Check chart has aria-label
    await expect(chartContainer).toHaveAttribute('aria-label');
    const ariaLabel = await chartContainer.getAttribute('aria-label');
    expect(ariaLabel).toContain('Monthly Sales');

    // Check SVG has aria-hidden="false"
    const svg = page.locator(`${Selectors.Charts.LineChart} svg`);
    await expect(svg).toHaveAttribute('aria-hidden', 'false');

    // Check for title element in SVG
    const svgTitle = page.locator(`${Selectors.Charts.LineChart} svg title`);
    await expect(svgTitle).toBeVisible();
    await expect(svgTitle).toContainText('Monthly Sales');
  });

  test('legend items have proper focus indicators', async ({ page }) => {
    // Navigate to the example
    await page.goto('/charts/line-chart-basic.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Find legend items
    const legendItems = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Legend} g`);
    const count = await legendItems.count();

    // Ensure there are legend items
    expect(count).toBeGreaterThan(0);

    // Tab to first legend item
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if focus is visible
    const focusedElement = await page.evaluate(() => {
      const activeElement = document.activeElement;
      if (!activeElement) return null;

      const styles = window.getComputedStyle(activeElement);
      return {
        outlineStyle: styles.outlineStyle,
        outlineWidth: styles.outlineWidth,
        outlineColor: styles.outlineColor
      };
    });

    // Verify focus styles
    expect(focusedElement).not.toBeNull();
    expect(focusedElement?.outlineStyle).not.toBe('none');
    expect(focusedElement?.outlineWidth).not.toBe('0px');

    // Take screenshot with focus visible
    await expect(page).toHaveScreenshot('legend-focus.png');
  });
});
```

### 6.2. Keyboard Navigation Tests

Create `e2e-tests/accessibility/keyboard-navigation.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { waitForChartRendered } from '../utils/test-helpers';
import { Selectors } from '../utils/selectors';

test.describe('Keyboard Navigation', () => {
  test('can navigate chart elements with keyboard', async ({ page }) => {
    // Navigate to the example
    await page.goto('/accessibility/keyboard-navigation-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Tab to chart
    await page.keyboard.press('Tab');

    // Verify chart container is focused
    await expect(page.locator(Selectors.Charts.LineChart)).toBeFocused();

    // Press Enter to activate chart
    await page.keyboard.press('Enter');

    // Verify chart is in interactive mode
    await expect(page.locator(`${Selectors.Charts.LineChart}.interactive-mode`)).toBeVisible();

    // Navigate to first data point with arrow keys
    await page.keyboard.press('ArrowRight');

    // Verify data point is focused
    const focusedPoint = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.DataPoint}.focused`);
    await expect(focusedPoint).toBeVisible();

    // Verify tooltip appears for focused point
    await expect(page.locator(Selectors.Interactive.Tooltip)).toBeVisible();

    // Navigate to next data point
    await page.keyboard.press('ArrowRight');

    // Verify next data point is focused
    await expect(focusedPoint).toBeVisible();

    // Take screenshot with focus on data point
    await expect(page).toHaveScreenshot('keyboard-navigation-data-point.png');

    // Press Escape to exit interactive mode
    await page.keyboard.press('Escape');

    // Verify chart is no longer in interactive mode
    await expect(page.locator(`${Selectors.Charts.LineChart}.interactive-mode`)).not.toBeVisible();
  });

  test('can navigate legend items with keyboard', async ({ page }) => {
    // Navigate to the example
    await page.goto('/accessibility/keyboard-navigation-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Tab to legend
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Verify legend item is focused
    const legendItems = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Legend} g`);
    await expect(legendItems.first()).toBeFocused();

    // Press Space to toggle series visibility
    await page.keyboard.press('Space');

    // Verify series is toggled
    const firstSeries = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.DataSeries}`).first();
    await expect(firstSeries).toHaveCSS('opacity', '0.3');

    // Take screenshot with toggled series
    await expect(page).toHaveScreenshot('keyboard-navigation-legend-toggle.png');
  });
});
```

## 7. Performance Testing

### 7.1. Large Dataset Tests

Create `e2e-tests/performance/large-dataset.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { waitForChartRendered } from '../utils/test-helpers';
import { Selectors } from '../utils/selectors';

test.describe('Performance with Large Datasets', () => {
  test('renders large dataset efficiently', async ({ page }) => {
    // Set a longer timeout for this test
    test.setTimeout(60000);

    // Navigate to the example
    await page.goto('/performance/large-dataset-example.html');

    // Start performance measurement
    await page.evaluate(() => {
      window.performance.mark('start-render');
    });

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // End performance measurement
    const renderTime = await page.evaluate(() => {
      window.performance.mark('end-render');
      window.performance.measure('render-time', 'start-render', 'end-render');
      const measures = window.performance.getEntriesByName('render-time');
      return measures[0].duration;
    });

    // Log render time
    console.log(`Chart render time: ${renderTime}ms`);

    // Verify render time is within acceptable limits
    expect(renderTime).toBeLessThan(5000); // 5 seconds max

    // Verify all data points are rendered
    const dataPoints = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.DataPoint}`);
    const count = await dataPoints.count();

    // Verify we have at least 1000 data points (or expected number)
    expect(count).toBeGreaterThanOrEqual(1000);

    // Take screenshot of large dataset chart
    await expect(page).toHaveScreenshot('large-dataset-chart.png');
  });

  test('maintains interactivity with large dataset', async ({ page }) => {
    // Navigate to the example
    await page.goto('/performance/large-dataset-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Measure hover response time
    await page.evaluate(() => {
      window.performance.mark('start-hover');
    });

    // Hover over a data point
    const chartBounds = await page.locator(Selectors.Charts.LineChart).boundingBox();
    if (!chartBounds) throw new Error('Chart not found');

    await page.mouse.move(
      chartBounds.x + chartBounds.width * 0.75,
      chartBounds.y + chartBounds.height * 0.5
    );

    // Wait for tooltip to appear
    await page.waitForSelector(Selectors.Interactive.Tooltip, { state: 'visible' });

    // End hover measurement
    const hoverTime = await page.evaluate(() => {
      window.performance.mark('end-hover');
      window.performance.measure('hover-time', 'start-hover', 'end-hover');
      const measures = window.performance.getEntriesByName('hover-time');
      return measures[0].duration;
    });

    // Log hover response time
    console.log(`Tooltip hover response time: ${hoverTime}ms`);

    // Verify hover response time is within acceptable limits
    expect(hoverTime).toBeLessThan(500); // 500ms max

    // Take screenshot with tooltip visible
    await expect(page).toHaveScreenshot('large-dataset-tooltip.png');

    // Test zoom performance
    await page.evaluate(() => {
      window.performance.mark('start-zoom');
    });

    // Perform zoom operation
    await page.mouse.wheel(0, -100);

    // Wait for zoom animation to complete
    await page.waitForTimeout(500);

    // End zoom measurement
    const zoomTime = await page.evaluate(() => {
      window.performance.mark('end-zoom');
      window.performance.measure('zoom-time', 'start-zoom', 'end-zoom');
      const measures = window.performance.getEntriesByName('zoom-time');
      return measures[0].duration;
    });

    // Log zoom response time
    console.log(`Zoom response time: ${zoomTime}ms`);

    // Verify zoom response time is within acceptable limits
    expect(zoomTime).toBeLessThan(1000); // 1 second max

    // Take screenshot after zoom
    await expect(page).toHaveScreenshot('large-dataset-zoomed.png');
  });
});
```

### 7.2. Animation Performance Tests

Create `e2e-tests/performance/animation.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { Selectors } from '../utils/selectors';

test.describe('Animation Performance', () => {
  test('animation runs smoothly', async ({ page }) => {
    // Navigate to the example
    await page.goto('/performance/animation-example.html');

    // Start FPS measurement
    await page.evaluate(() => {
      window.__frames = [];
      window.__lastFrameTime = performance.now();

      window.__frameCallback = () => {
        const now = performance.now();
        const frameTime = now - window.__lastFrameTime;
        window.__frames.push(frameTime);
        window.__lastFrameTime = now;

        window.requestAnimationFrame(window.__frameCallback);
      };

      window.requestAnimationFrame(window.__frameCallback);
    });

    // Click the animate button
    await page.click('#animate-button');

    // Wait for animation to complete (5 seconds)
    await page.waitForTimeout(5000);

    // Stop FPS measurement
    const fpsStats = await page.evaluate(() => {
      // Cancel the animation frame callback
      if (window.__frameCallback) {
        window.cancelAnimationFrame(window.__frameCallback);
      }

      // Calculate FPS stats
      const frames = window.__frames || [];
      if (frames.length === 0) return { avgFps: 0, minFps: 0, droppedFrames: 0 };

      const frameTimes = frames.slice(1); // Skip first frame
      const fpsList = frameTimes.map(time => 1000 / time);

      const avgFps = fpsList.reduce((sum, fps) => sum + fps, 0) / fpsList.length;
      const minFps = Math.min(...fpsList);

      // Count dropped frames (below 30 FPS)
      const droppedFrames = fpsList.filter(fps => fps < 30).length;

      return {
        avgFps,
        minFps,
        droppedFrames,
        totalFrames: fpsList.length
      };
    });

    // Log FPS stats
    console.log('Animation Performance:', fpsStats);

    // Verify animation performance
    expect(fpsStats.avgFps).toBeGreaterThan(30); // Average above 30 FPS
    expect(fpsStats.droppedFrames / fpsStats.totalFrames).toBeLessThan(0.1); // Less than 10% dropped frames
  });

  test('multiple animations do not degrade performance', async ({ page }) => {
    // Navigate to the example
    await page.goto('/performance/multiple-animations-example.html');

    // Start FPS measurement
    await page.evaluate(() => {
      window.__frames = [];
      window.__lastFrameTime = performance.now();

      window.__frameCallback = () => {
        const now = performance.now();
        const frameTime = now - window.__lastFrameTime;
        window.__frames.push(frameTime);
        window.__lastFrameTime = now;

        window.requestAnimationFrame(window.__frameCallback);
      };

      window.requestAnimationFrame(window.__frameCallback);
    });

    // Click the animate button to start multiple animations
    await page.click('#animate-multiple-button');

    // Wait for animations to complete (5 seconds)
    await page.waitForTimeout(5000);

    // Stop FPS measurement
    const fpsStats = await page.evaluate(() => {
      // Cancel the animation frame callback
      if (window.__frameCallback) {
        window.cancelAnimationFrame(window.__frameCallback);
      }

      // Calculate FPS stats
      const frames = window.__frames || [];
      if (frames.length === 0) return { avgFps: 0, minFps: 0, droppedFrames: 0 };

      const frameTimes = frames.slice(1); // Skip first frame
      const fpsList = frameTimes.map(time => 1000 / time);

      const avgFps = fpsList.reduce((sum, fps) => sum + fps, 0) / fpsList.length;
      const minFps = Math.min(...fpsList);

      // Count dropped frames (below 30 FPS)
      const droppedFrames = fpsList.filter(fps => fps < 30).length;

      return {
        avgFps,
        minFps,
        droppedFrames,
        totalFrames: fpsList.length
      };
    });

    // Log FPS stats
    console.log('Multiple Animations Performance:', fpsStats);

    // Verify animation performance
    expect(fpsStats.avgFps).toBeGreaterThan(30); // Average above 30 FPS
    expect(fpsStats.droppedFrames / fpsStats.totalFrames).toBeLessThan(0.2); // Less than 20% dropped frames
  });
});
```

## 8. CI/CD Integration

### 8.1. GitHub Actions Configuration

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    name: 'Playwright Tests'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### 8.2. Automated Visual Regression Testing

For automated visual regression testing in CI:

1. **Generate baseline screenshots**:
   ```bash
   npx playwright test --update-snapshots
   ```

2. **Commit baseline screenshots to repository**:
   ```bash
   git add e2e-tests/**/*.png
   git commit -m "Update baseline screenshots"
   ```

3. **Configure CI to run visual tests**:
   ```yaml
   # Add to GitHub Actions workflow
   - name: Run visual regression tests
     run: npx playwright test --grep "visual"
   ```

4. **Handle visual test failures**:
   ```yaml
   # Add to GitHub Actions workflow
   - name: Upload visual diff artifacts
     if: failure()
     uses: actions/upload-artifact@v3
     with:
       name: visual-test-diffs
       path: test-results/
       retention-days: 30
   ```

## Conclusion

This guide provides a comprehensive approach to implementing Playwright tests for the Google Visualization library. By following these instructions, you can create a robust testing suite that covers functionality, visual appearance, accessibility, and performance.

The key benefits of this approach include:

1. **Comprehensive test coverage** across different browsers and devices
2. **Visual regression testing** to catch unexpected UI changes
3. **Accessibility validation** to ensure charts are usable by everyone
4. **Performance monitoring** to maintain high-quality user experience
5. **Automated CI/CD integration** for continuous quality assurance

Remember to regularly update your tests as new features are added or existing ones are modified. This will ensure that your testing suite remains effective and valuable throughout the development process.
