import { test, expect } from '@playwright/test';
import { Selectors } from './utils/selectors';
import {
  waitForChartRendered,
  verifyChartStructure,
  checkLegendItems,
  toggleLegendItem,
  resizeViewport
} from './utils/test-helpers';

test.describe('Line Chart', () => {
  test('renders with basic data', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/charts/line-chart-basic.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Verify chart structure
    await verifyChartStructure(page, Selectors.Charts.LineChart);

    // Verify chart title
    const title = page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.Title}`);
    await expect(title).toContainText('Monthly Sales and Expenses');

    // Verify legend items
    await checkLegendItems(page, Selectors.Charts.LineChart, ['Sales', 'Expenses']);

    // Take screenshot for visual comparison
    await page.screenshot({ path: 'line-chart-basic.png' });
  });

  test('toggles series visibility when legend item is clicked', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/charts/line-chart-basic.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Count initial number of visible series
    const initialSeriesCount = await page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.DataSeries}`).count();

    // Toggle first legend item
    await toggleLegendItem(page, Selectors.Charts.LineChart, 0);

    // Verify series count has changed
    const updatedSeriesCount = await page.locator(`${Selectors.Charts.LineChart} ${Selectors.Elements.DataSeries}`).count();
    expect(updatedSeriesCount).toBeLessThan(initialSeriesCount);

    // Take screenshot after toggle
    await page.screenshot({ path: 'line-chart-toggle.png' });
  });

  test('responds to viewport size changes', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/charts/line-chart-basic.html');

    // Wait for chart to render with default size
    await waitForChartRendered(page, Selectors.Charts.LineChart);

    // Take screenshot at default size
    await page.screenshot({ path: 'line-chart-default-size.png' });

    // Resize viewport to mobile size
    await resizeViewport(page, 375, 667);

    // Wait for chart to adjust
    await page.waitForTimeout(1000);

    // Take screenshot at mobile size
    await page.screenshot({ path: 'line-chart-mobile-size.png' });

    // Verify chart is still visible
    await expect(page.locator(Selectors.Charts.LineChart)).toBeVisible();
  });
});
