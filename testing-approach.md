# Google Visualization Testing Approach

This document outlines the comprehensive testing approach for the Google Visualization library.

## Testing Layers

Our testing strategy involves multiple layers to ensure comprehensive coverage:

1. **Unit Tests**: Test individual components and functions in isolation
2. **Integration Tests**: Test interactions between components
3. **End-to-End Tests**: Test complete user workflows and visual rendering
4. **Visual Regression Tests**: Ensure visual consistency across changes
5. **Accessibility Tests**: Verify accessibility compliance
6. **Performance Tests**: Measure and ensure performance standards

## Testing Tools

We use the following tools for testing:

1. **Vitest**: For unit and integration testing
2. **Playwright**: For end-to-end, visual regression, and accessibility testing
3. **Custom Test Helpers**: For specialized testing needs

## Unit Testing Guidelines

### Test File Organization

- Test files should be located alongside the source files they test
- Test files should be named with a `.test.ts` or `.spec.ts` suffix
- Use descriptive test names that clearly indicate what is being tested

### Test Structure

- Use `describe` blocks to group related tests
- Use nested `describe` blocks for logical grouping
- Use `it` or `test` for individual test cases
- Use `beforeEach` and `afterEach` for setup and teardown

### Test Coverage Goals

- Aim for at least 80% statement coverage
- Aim for at least 70% branch coverage
- Prioritize testing complex logic and edge cases
- Test both success and failure paths

### Example Unit Test

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  let component;

  beforeEach(() => {
    component = new MyComponent();
  });

  afterEach(() => {
    component.dispose();
  });

  describe('initialization', () => {
    it('should initialize with default values', () => {
      expect(component.getValue()).toBe(0);
    });

    it('should accept custom initial values', () => {
      component = new MyComponent(10);
      expect(component.getValue()).toBe(10);
    });
  });

  describe('operations', () => {
    it('should increment value', () => {
      component.increment();
      expect(component.getValue()).toBe(1);
    });

    it('should handle multiple increments', () => {
      component.increment();
      component.increment();
      component.increment();
      expect(component.getValue()).toBe(3);
    });
  });
});
```

## End-to-End Testing Guidelines

### Test File Organization

- E2E test files should be located in the `e2e-tests` directory
- Group tests by feature or component
- Use descriptive file names that indicate what is being tested

### Test Structure

- Use `test.describe` blocks to group related tests
- Use `test` for individual test cases
- Use page objects or helper functions for common operations

### Test Coverage Goals

- Test all major user workflows
- Test all chart types and visualizations
- Test interactive features like tooltips, zooming, and selection
- Test responsive behavior across different viewport sizes
- Test accessibility features

### Example E2E Test

```typescript
import { test, expect } from '@playwright/test';
import { waitForChartRendered, verifyChartStructure } from './utils/test-helpers';

test.describe('Line Chart', () => {
  test('renders with basic data', async ({ page }) => {
    await page.goto('/examples/line-chart-basic.html');

    await waitForChartRendered(page, '.google-visualization-line-chart');

    await verifyChartStructure(page, '.google-visualization-line-chart');

    await expect(page.locator('.chart-title')).toContainText('Monthly Sales');

    await page.screenshot({ path: 'line-chart-basic.png' });
  });
});
```

## Visual Regression Testing

We use Playwright's screenshot comparison capabilities for visual regression testing:

1. Capture baseline screenshots during initial test runs
2. Compare screenshots in subsequent runs to detect visual changes
3. Review and approve or reject visual changes

## Accessibility Testing

We test accessibility using:

1. Playwright's built-in accessibility testing capabilities
2. Manual testing with screen readers and keyboard navigation
3. Automated checks for WCAG compliance

## Performance Testing

We measure performance using:

1. Rendering time for different chart types and data sizes
2. Memory usage during chart rendering and interactions
3. CPU usage during animations and interactions

## Continuous Integration

Our testing is integrated into the CI pipeline:

1. Unit tests run on every pull request and push to main
2. E2E tests run on pull requests to main
3. Visual regression tests run on pull requests to main
4. Test coverage reports are generated and published

## Test Maintenance

To keep tests maintainable:

1. Use helper functions for common operations
2. Avoid duplicating test code
3. Keep tests focused and specific
4. Update tests when the API changes
5. Regularly review and refactor tests

## Running Tests Locally

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### End-to-End Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug

# View E2E test report
npm run test:e2e:report
```
