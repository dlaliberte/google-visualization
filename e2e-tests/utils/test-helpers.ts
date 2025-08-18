/**
 * Test helpers for end-to-end testing with Playwright
 */
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
  await page.waitForSelector(`${selector} .chart-series, ${selector} .chart-element, ${selector} path`, {
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
  const dataElements = page.locator(`${selector} .chart-series, ${selector} .chart-element, ${selector} path`);
  await expect(dataElements).toHaveCount({ min: 1 });
}

/**
 * Triggers a tooltip by hovering over a data point
 */
export async function triggerTooltip(page: Page, chartSelector: string, pointIndex = 1): Promise<void> {
  const dataPoint = page.locator(`${chartSelector} .data-point, ${chartSelector} path`).nth(pointIndex);
  await dataPoint.hover();
  await page.waitForSelector('.google-visualization-tooltip', { state: 'visible', timeout: 5000 });
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

/**
 * Checks if a chart has the expected number of data points
 */
export async function checkDataPointCount(page: Page, chartSelector: string, expectedCount: number): Promise<void> {
  const dataPoints = page.locator(`${chartSelector} .data-point, ${chartSelector} path.point, ${chartSelector} rect.bar`);
  await expect(dataPoints).toHaveCount(expectedCount);
}

/**
 * Checks if a chart has the expected legend items
 */
export async function checkLegendItems(page: Page, chartSelector: string, expectedItems: string[]): Promise<void> {
  const legendItems = page.locator(`${chartSelector} .legend-item, ${chartSelector} .google-visualization-legend-item`);

  // Check count
  await expect(legendItems).toHaveCount(expectedItems.length);

  // Check text content
  for (let i = 0; i < expectedItems.length; i++) {
    await expect(legendItems.nth(i)).toContainText(expectedItems[i]);
  }
}

/**
 * Toggles a legend item by clicking on it
 */
export async function toggleLegendItem(page: Page, chartSelector: string, itemIndex: number): Promise<void> {
  const legendItem = page.locator(`${chartSelector} .legend-item, ${chartSelector} .google-visualization-legend-item`).nth(itemIndex);
  await legendItem.click();

  // Wait for chart to update
  await page.waitForTimeout(500);
}

/**
 * Takes a screenshot of a chart for visual comparison
 */
export async function takeChartScreenshot(page: Page, chartSelector: string, screenshotName: string): Promise<void> {
  const chartElement = page.locator(chartSelector);
  await chartElement.screenshot({ path: `./screenshots/${screenshotName}.png` });
}

/**
 * Checks accessibility of a chart
 */
export async function checkChartAccessibility(page: Page, chartSelector: string): Promise<void> {
  // Check that chart container has appropriate ARIA attributes
  await expect(page.locator(chartSelector)).toHaveAttribute('role', 'img');
  await expect(page.locator(chartSelector)).toHaveAttribute('aria-label');

  // Check keyboard navigability
  await page.keyboard.press('Tab');
  const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
  expect(focusedElement).not.toBe('BODY'); // Something should be focused
}

/**
 * Resizes the browser viewport to test responsive behavior
 */
export async function resizeViewport(page: Page, width: number, height: number): Promise<void> {
  await page.setViewportSize({ width, height });

  // Wait for any resize handlers to complete
  await page.waitForTimeout(500);
}
