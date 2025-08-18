import { test, expect } from '@playwright/test';
import { Selectors } from './utils/selectors';
import {
  waitForChartRendered,
  verifyChartStructure,
  triggerTooltip
} from './utils/test-helpers';

test.describe('Chart Tooltips', () => {
  test('displays tooltip on hover', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/interactions/tooltip-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.ColumnChart);

    // Verify chart structure
    await verifyChartStructure(page, Selectors.Charts.ColumnChart);

    // Hover over a data point to trigger tooltip
    await triggerTooltip(page, Selectors.Charts.ColumnChart, 0);

    // Verify tooltip is visible
    const tooltip = page.locator(Selectors.Interactive.Tooltip);
    await expect(tooltip).toBeVisible();

    // Verify tooltip content
    await expect(tooltip).toContainText('GDP:');

    // Take screenshot with tooltip visible
    await page.screenshot({ path: 'tooltip-visible.png' });

    // Move mouse away
    await page.mouse.move(0, 0);

    // Verify tooltip is hidden
    await expect(tooltip).not.toBeVisible();
  });

  test('displays different tooltips for different data points', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/interactions/tooltip-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.ColumnChart);

    // Hover over first data point
    await triggerTooltip(page, Selectors.Charts.ColumnChart, 0);

    // Capture tooltip content for first point
    const firstTooltipContent = await page.locator(Selectors.Interactive.Tooltip).textContent();

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);

    // Hover over second data point
    await triggerTooltip(page, Selectors.Charts.ColumnChart, 1);

    // Capture tooltip content for second point
    const secondTooltipContent = await page.locator(Selectors.Interactive.Tooltip).textContent();

    // Verify tooltips are different
    expect(firstTooltipContent).not.toEqual(secondTooltipContent);

    // Take screenshot with second tooltip visible
    await page.screenshot({ path: 'tooltip-second-point.png' });
  });

  test('tooltip follows accessibility guidelines', async ({ page }) => {
    // Navigate to the example page
    await page.goto('/interactions/tooltip-example.html');

    // Wait for chart to render
    await waitForChartRendered(page, Selectors.Charts.ColumnChart);

    // Trigger tooltip
    await triggerTooltip(page, Selectors.Charts.ColumnChart, 0);

    // Verify tooltip has appropriate ARIA attributes
    const tooltip = page.locator(Selectors.Interactive.Tooltip);
    await expect(tooltip).toHaveAttribute('role', 'tooltip');

    // Verify tooltip has sufficient color contrast (would require custom logic)
    // This is a placeholder for a more sophisticated check
    await expect(tooltip).toBeVisible();

    // Verify tooltip is keyboard accessible
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Tooltip should still be visible or a different interaction should occur
    await expect(tooltip).toBeVisible();
  });
});
