# Testing Google Visualization

This document provides instructions for testing the Google Visualization library.

## Table of Contents

1. [Testing Overview](#testing-overview)
2. [Unit Testing](#unit-testing)
3. [End-to-End Testing](#end-to-end-testing)
4. [Test Coverage](#test-coverage)
5. [Writing New Tests](#writing-new-tests)
6. [Continuous Integration](#continuous-integration)

## Testing Overview

The Google Visualization library uses a comprehensive testing approach:

- **Unit Tests**: Using Vitest to test individual components
- **End-to-End Tests**: Using Playwright to test complete user workflows
- **Visual Regression Tests**: Using Playwright to ensure visual consistency
- **Accessibility Tests**: Using Playwright to verify accessibility compliance

For a detailed explanation of our testing approach, see [testing-approach.md](./testing-approach.md).

## Unit Testing

### Running Unit Tests

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

### Unit Test Structure

Unit tests are located alongside the source files they test, with a `.test.ts` or `.spec.ts` suffix.

Example:
```
visualization/
  ├── line_chart.ts
  └── line_chart.test.ts
```

## End-to-End Testing

### Running End-to-End Tests

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

### End-to-End Test Structure

E2E tests are located in the `e2e-tests` directory, organized by feature or component.

Example:
```
e2e-tests/
  ├── line-chart.spec.ts
  ├── tooltip.spec.ts
  └── utils/
      ├── test-helpers.ts
      └── selectors.ts
```

### Example Files

Example HTML files for E2E testing are located in the `examples` directory, organized by feature or component.

Example:
```
examples/
  ├── charts/
  │   └── line-chart-basic.html
  └── interactions/
      └── tooltip-example.html
```

To serve the example files locally:

```bash
npm run serve-examples
```

This will start a local server at http://localhost:3000.

## Test Coverage

### Generating Coverage Reports

```bash
# Run tests with coverage
npm run test:coverage

# Analyze coverage and generate report
npm run test:analyze-coverage
```

The coverage report will be available at `test-coverage-report.md`.

### Running All Tests and Generating Reports

```bash
npm run test:all
```

This will:
1. Run all unit tests with coverage
2. Run all E2E tests
3. Generate coverage reports
4. Copy reports to the `test-reports` directory

## Writing New Tests

### Writing Unit Tests

Use the test template as a starting point:

```bash
cp test_template.ts path/to/your/component.test.ts
```

Then modify the template to test your component.

### Writing End-to-End Tests

1. Create an example HTML file in the `examples` directory
2. Create a test file in the `e2e-tests` directory
3. Use the test helpers and selectors from `e2e-tests/utils`

## Continuous Integration

Tests are automatically run in the CI pipeline:

- Unit tests run on every pull request and push to main
- E2E tests run on pull requests to main
- Coverage reports are generated and published

For more information, see the CI configuration files.
