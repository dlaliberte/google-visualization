# Google Visualization Modernization Plan

This document outlines a comprehensive plan for completing the Google Closure Library migration and modernizing other obsolete dependencies in the Google Visualization codebase.

## Table of Contents

1. [Completing Closure Library Migration](#1-completing-closure-library-migration)
2. [Modernizing Other Obsolete Libraries](#2-modernizing-other-obsolete-libraries)
3. [Implementing Modern Testing with Playwright](#3-implementing-modern-testing-with-playwright)
4. [Code Quality and Performance Improvements](#4-code-quality-and-performance-improvements)
5. [Implementation Timeline](#5-implementation-timeline)

## 1. Completing Closure Library Migration

The Closure Library migration is approximately 99% complete according to the documentation, but there are still files with Closure dependencies that need to be addressed.

### 1.1. Remaining Closure Dependencies

Our analysis shows that there are still numerous files with Closure imports. The most affected areas include:

- **Visualization Core Components**: Particularly in the corechart and table modules
- **Graphics Rendering**: Abstract renderer and SVG renderer components
- **Axis Utilities**: Various axis-related components and tests
- **Tooltip Components**: HTML builders and definers
- **Event Handling**: Explorer components for interaction

### 1.2. Migration Strategy for Remaining Files

#### Step 1: Prioritize High-Impact Files

Focus first on files with the most Closure dependencies:

1. `visualization/table/table_chart.ts` (19 dependencies)
2. `visualization/corechart/axis_chart_definer.ts` (12 dependencies)
3. `graphics/drawing_frame.ts` (11 dependencies)
4. `graphics/svg_renderer.ts` (11 dependencies)
5. `visualization/corechart/corechart.ts` (10 dependencies)

#### Step 2: Apply Established Migration Patterns

For each file:

1. Identify the specific Closure imports being used
2. Map each import to its corresponding replacement in the common utilities
3. Replace imports following the established pattern:

```typescript
// Before
import {forEach} from '@npm//@closure/array/array';
import {assert} from '@npm//@closure/asserts/asserts';

// After
import {forEach} from '../common/array';
import {assert} from '../common/assert';
```

#### Step 3: Address Missing Utilities

If a required utility doesn't exist in the common modules:

1. Identify the functionality needed
2. Implement the missing utility in the appropriate common module
3. Ensure the API matches the original Closure API for backward compatibility
4. Add tests for the new utility

#### Step 4: Fix Remaining Test Failures

Address the 8 remaining test failures:

1. **Text Layout Behavior (7 tests)**:
   - Review text wrapping and ellipsis handling implementations
   - Align behavior with expected test outcomes or update tests if the new behavior is preferred
   - Focus on text utilities in the `text` module

2. **DataTable Property Return (1 test)**:
   - Fix the inconsistency where properties return `null` instead of `undefined`
   - Ensure consistent behavior across the DataTable implementation

### 1.3. Validation and Testing

After each file migration:

1. Run the test suite to verify functionality: `npm test`
2. Fix any new test failures that arise
3. Manually verify the component works as expected in sample applications
4. Document any API changes or behavior differences

## 2. Modernizing Other Obsolete Libraries

Beyond Closure Library, there are other obsolete dependencies and patterns that should be modernized.

### 2.1. TypeScript Configuration Modernization

Create a modern TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@common/*": ["common/*"],
      "@data/*": ["data/*"],
      "@visualization/*": ["visualization/*"]
    },
    "lib": ["DOM", "ES2020"]
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "google-visualization"
  ]
}
```

### 2.2. Dependency Modernization

#### Replace Outdated Dependencies

1. **Identify outdated dependencies**:
   - Review package.json for outdated packages
   - Use `npm outdated` to identify packages that need updating

2. **Update core dependencies**:
   - Update TypeScript to the latest version
   - Update testing libraries to latest versions
   - Replace any deprecated packages with modern alternatives

3. **Adopt modern utility libraries**:
   - Replace custom utilities with established libraries where appropriate
   - Consider using:
     - `date-fns` for date manipulation (instead of custom date utilities)
     - `d3-scale` for scaling and axis utilities
     - `d3-format` for number formatting
     - `d3-interpolate` for interpolation functions

### 2.3. Module System Modernization

1. **Convert to ES Modules**:
   - Ensure all files use ES module syntax (import/export)
   - Remove any CommonJS patterns (require/module.exports)

2. **Implement proper tree-shaking**:
   - Structure exports to enable effective tree-shaking
   - Use named exports instead of default exports where appropriate
   - Create index.ts files for each module with explicit exports

3. **Implement path aliases**:
   - Use TypeScript path aliases for cleaner imports
   - Replace relative paths with aliased imports:

```typescript
// Before
import {DataTable} from '../../data/datatable';

// After
import {DataTable} from '@data/datatable';
```

### 2.4. API Modernization

1. **Implement modern JavaScript patterns**:
   - Replace callbacks with Promises and async/await where appropriate
   - Use optional chaining and nullish coalescing operators
   - Implement proper typing with generics

2. **Enhance type definitions**:
   - Add proper TypeScript interfaces for all public APIs
   - Use union types and discriminated unions where appropriate
   - Add generic type parameters for flexible APIs

3. **Implement builder patterns**:
   - Replace complex option objects with builder patterns
   - Create fluent interfaces for chart configuration

Example:
```typescript
// Before
const chart = new LineChart(container);
chart.draw(data, {
  width: 800,
  height: 400,
  title: 'My Chart',
  legend: { position: 'top' },
  // many more options...
});

// After
const chart = new LineChart(container)
  .withSize(800, 400)
  .withTitle('My Chart')
  .withLegend({ position: 'top' })
  // fluent interface...
  .draw(data);
```

## 3. Implementing Modern Testing with Playwright

Implement comprehensive testing with Playwright for end-to-end and visual regression testing.

### 3.1. Playwright Test Setup

1. **Install Playwright**:
   ```bash
   npm install --save-dev @playwright/test
   npx playwright install
   ```

2. **Configure Playwright**:
   Create a `playwright.config.ts` file:
   ```typescript
   import { PlaywrightTestConfig } from '@playwright/test';

   const config: PlaywrightTestConfig = {
     testDir: './e2e-tests',
     timeout: 30000,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     use: {
       trace: 'on-first-retry',
       screenshot: 'only-on-failure',
     },
     projects: [
       {
         name: 'chromium',
         use: { browserName: 'chromium' },
       },
       {
         name: 'firefox',
         use: { browserName: 'firefox' },
       },
       {
         name: 'webkit',
         use: { browserName: 'webkit' },
       },
     ],
   };

   export default config;
   ```

### 3.2. Test Categories

Implement the following test categories:

1. **Component Rendering Tests**:
   - Verify that each chart type renders correctly
   - Test with various data inputs and configurations
   - Ensure responsive behavior works as expected

2. **Interaction Tests**:
   - Test user interactions like clicking, hovering, and dragging
   - Verify tooltips, legends, and other interactive elements
   - Test zoom, pan, and other navigation features

3. **Visual Regression Tests**:
   - Capture screenshots of charts and compare with baselines
   - Test across different browsers and viewport sizes
   - Verify that styling and theming work correctly

4. **Accessibility Tests**:
   - Test keyboard navigation
   - Verify screen reader compatibility
   - Check color contrast and other accessibility requirements

### 3.3. Example Test Implementation

```typescript
// e2e-tests/line-chart.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Line Chart', () => {
  test('renders with basic data', async ({ page }) => {
    await page.goto('/examples/line-chart-basic.html');

    // Wait for chart to render
    await page.waitForSelector('.google-visualization-line-chart');

    // Verify chart elements exist
    expect(await page.locator('.google-visualization-line-chart svg').count()).toBe(1);
    expect(await page.locator('.google-visualization-line-chart .line-series').count()).toBeGreaterThan(0);

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('line-chart-basic.png');
  });

  test('shows tooltip on hover', async ({ page }) => {
    await page.goto('/examples/line-chart-tooltip.html');

    // Hover over a data point
    await page.hover('.google-visualization-line-chart .data-point:nth-child(3)');

    // Verify tooltip appears
    await expect(page.locator('.google-visualization-tooltip')).toBeVisible();
    await expect(page.locator('.google-visualization-tooltip')).toContainText('Value:');

    // Take screenshot of tooltip
    await expect(page).toHaveScreenshot('line-chart-tooltip.png');
  });

  test('supports zooming and panning', async ({ page }) => {
    await page.goto('/examples/line-chart-interactive.html');

    // Perform zoom operation
    await page.mouse.move(300, 200);
    await page.mouse.wheel(0, -100); // Zoom in

    // Verify zoom effect (chart content should change)
    await page.waitForTimeout(500); // Wait for animation
    await expect(page).toHaveScreenshot('line-chart-zoomed.png');

    // Perform pan operation
    await page.mouse.down();
    await page.mouse.move(200, 200);
    await page.mouse.up();

    // Verify pan effect
    await page.waitForTimeout(500); // Wait for animation
    await expect(page).toHaveScreenshot('line-chart-panned.png');
  });
});
```

### 3.4. Test Examples Directory

Create an examples directory with sample HTML files for testing:

```
/examples
  /line-chart-basic.html
  /line-chart-tooltip.html
  /line-chart-interactive.html
  /bar-chart-basic.html
  /pie-chart-basic.html
  ...
```

Each example should demonstrate a specific feature or configuration.

## 4. Code Quality and Performance Improvements

### 4.1. Code Quality Enhancements

1. **Implement ESLint with TypeScript support**:
   - Add ESLint configuration with TypeScript rules
   - Enforce consistent code style and best practices
   - Add pre-commit hooks to ensure code quality

2. **Add documentation generation**:
   - Use TypeDoc to generate API documentation
   - Ensure all public APIs have proper JSDoc comments
   - Create a documentation website with examples

3. **Implement code complexity metrics**:
   - Add tools to measure cyclomatic complexity
   - Set thresholds for acceptable complexity
   - Refactor complex methods and functions

### 4.2. Performance Optimizations

1. **Implement rendering optimizations**:
   - Use requestAnimationFrame for smooth animations
   - Implement canvas-based rendering for large datasets
   - Add support for WebGL rendering for complex visualizations

2. **Optimize data handling**:
   - Implement data virtualization for large datasets
   - Add efficient data transformation utilities
   - Optimize memory usage for large data structures

3. **Implement lazy loading**:
   - Load chart components only when needed
   - Implement code splitting for better initial load times
   - Add support for dynamic imports

### 4.3. Bundle Size Optimization

1. **Analyze bundle size**:
   - Use tools like webpack-bundle-analyzer
   - Identify large dependencies and optimize imports
   - Implement tree-shaking for unused code

2. **Create specialized bundles**:
   - Create separate bundles for different chart types
   - Allow users to import only what they need
   - Provide both full and minimal bundles

3. **Optimize third-party dependencies**:
   - Replace large dependencies with smaller alternatives
   - Use modern, tree-shakable libraries
   - Consider implementing critical utilities in-house

## 5. Implementation Timeline

### Phase 1: Complete Closure Migration (2-3 weeks)

- Week 1: Migrate high-priority files with most dependencies
- Week 2: Address remaining files with Closure dependencies
- Week 3: Fix remaining test failures and validate functionality

### Phase 2: Modernize Dependencies and Configuration (2 weeks)

- Week 1: Set up modern TypeScript configuration and update dependencies
- Week 2: Implement module system improvements and path aliases

### Phase 3: Implement Playwright Testing (3-4 weeks)

- Week 1: Set up Playwright and create basic test infrastructure
- Week 2-3: Implement component rendering and interaction tests
- Week 3-4: Add visual regression and accessibility tests

### Phase 4: Code Quality and Performance (2-3 weeks)

- Week 1: Implement ESLint and documentation generation
- Week 2: Add performance optimizations for rendering and data handling
- Week 3: Optimize bundle size and implement lazy loading

## Conclusion

This modernization plan provides a comprehensive approach to completing the Closure Library migration and modernizing the Google Visualization codebase. By following this plan, the library will become more maintainable, performant, and aligned with modern web development practices.

The focus on Playwright testing will ensure that the library remains stable and reliable through the modernization process, with comprehensive test coverage for all components and features.

---

**Note**: This plan is a living document and may be adjusted as the implementation progresses. Regular reviews and updates are recommended to ensure the plan remains aligned with project goals and requirements.
