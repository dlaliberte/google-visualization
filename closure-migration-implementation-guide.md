# Closure Library Migration Implementation Guide

This guide provides detailed, practical steps for completing the migration from Google Closure Library to modern alternatives in the Google Visualization codebase.

## Table of Contents

1. [Migration Process Overview](#1-migration-process-overview)
2. [Step-by-Step Migration Instructions](#2-step-by-step-migration-instructions)
3. [Common Migration Patterns](#3-common-migration-patterns)
4. [Troubleshooting Common Issues](#4-troubleshooting-common-issues)
5. [Testing and Validation](#5-testing-and-validation)

## 1. Migration Process Overview

The migration process follows these high-level steps:

1. **Identify** Closure dependencies in a file
2. **Map** each dependency to its modern replacement
3. **Replace** the imports and update the code
4. **Test** to ensure functionality is preserved
5. **Document** any changes or issues

## 2. Step-by-Step Migration Instructions

### 2.1. Prioritized File List

Based on our analysis, here are the files to migrate in priority order:

1. `visualization/table/table_chart.ts` (19 dependencies)
2. `visualization/corechart/axis_chart_definer.ts` (12 dependencies)
3. `graphics/drawing_frame.ts` (11 dependencies)
4. `graphics/svg_renderer.ts` (11 dependencies)
5. `visualization/corechart/corechart.ts` (10 dependencies)
6. `visualization/corechart/chart_definer_test.ts` (8 dependencies)
7. `visualization/corechart/pie_chart_definer.ts` (8 dependencies)
8. `legend/labeled_legend_definer.ts` (7 dependencies)
9. `query/query.ts` (7 dependencies)
10. `tooltip/tooltip_definer.ts` (6 dependencies)
11. `tooltip/tooltip_definer_utils.ts` (6 dependencies)

### 2.2. Migration Steps for Each File

For each file, follow these detailed steps:

#### Step 1: Analyze the File

1. Open the file and identify all Closure imports
2. Determine which functionality from each import is being used
3. Check if there are any custom implementations or extensions of Closure classes

Example analysis for `visualization/table/table_chart.ts`:

```typescript
// Imports to analyze
import {Disposable} from '@npm//@closure/disposable/disposable';
import {EventHandler} from '@npm//@closure/events/eventhandler';
import {EventType} from '@npm//@closure/events/eventtype';
import * as style from '@npm//@closure/style/style';
// ... more imports
```

#### Step 2: Map Imports to Replacements

Use the mapping table from the CLOSURE_MIGRATION_GUIDE.md to identify replacements:

| Closure Import | Replacement |
|----------------|-------------|
| `@npm//@closure/disposable/disposable` | `../common/disposable` |
| `@npm//@closure/events/eventhandler` | `../common/events` |
| `@npm//@closure/events/eventtype` | `../common/events` |
| `@npm//@closure/style/style` | `../common/style` |

#### Step 3: Replace Imports

Update the imports in the file:

```typescript
// Before
import {Disposable} from '@npm//@closure/disposable/disposable';
import {EventHandler} from '@npm//@closure/events/eventhandler';
import {EventType} from '@npm//@closure/events/eventtype';
import * as style from '@npm//@closure/style/style';

// After
import {Disposable} from '../common/disposable';
import {EventHandler, EventType} from '../common/events';
import * as style from '../common/style';
```

#### Step 4: Update Code Usage

Check if the replacement APIs have any differences and update the code accordingly:

1. Look for method signature differences
2. Check for behavior differences
3. Update any type annotations

Example:
```typescript
// Before
const handler = new EventHandler();
handler.listen(element, EventType.CLICK, this.handleClick);

// After (if API is slightly different)
const handler = new EventHandler();
handler.listen(element, EventType.CLICK, this.handleClick.bind(this));
```

#### Step 5: Handle Missing Functionality

If you encounter functionality that doesn't have a direct replacement:

1. Check if there's an alternative approach using the new utilities
2. If not, implement the missing functionality in the appropriate common module
3. Update the code to use your new implementation

Example for implementing missing functionality:
```typescript
// In common/style.ts
export function getVisibleRectForElement(element: Element): Rect {
  // Implementation of missing functionality
  const clientRect = element.getBoundingClientRect();
  return new Rect(
    clientRect.left,
    clientRect.top,
    clientRect.width,
    clientRect.height
  );
}
```

### 2.3. Handling Test Files

Test files require special attention:

1. Update imports in the test file
2. Check if test mocks need to be updated
3. Verify that test assertions still work with the new implementations
4. Update expected values if behavior has changed slightly

Example for updating a test file:
```typescript
// Before
import {assertEquals} from '@npm//@closure/testing/asserts';
import {testSuite} from '@npm//@closure/testing/testsuite';

// After
import { describe, it, expect } from 'vitest';
```

## 3. Common Migration Patterns

### 3.1. Disposable Pattern

```typescript
// Before
import {Disposable} from '@npm//@closure/disposable/disposable';

class MyClass extends Disposable {
  constructor() {
    super();
  }

  disposeInternal() {
    // Cleanup code
    super.disposeInternal();
  }
}

// After
import {Disposable} from '../common/disposable';

class MyClass extends Disposable {
  constructor() {
    super();
  }

  disposeInternal() {
    // Cleanup code
    super.disposeInternal();
  }
}
```

### 3.2. Event Handling Pattern

```typescript
// Before
import {EventHandler} from '@npm//@closure/events/eventhandler';
import {EventType} from '@npm//@closure/events/eventtype';

const handler = new EventHandler();
handler.listen(element, EventType.CLICK, this.handleClick);

// After
import {EventHandler, EventType} from '../common/events';

const handler = new EventHandler();
handler.listen(element, EventType.CLICK, this.handleClick);
```

### 3.3. DOM Manipulation Pattern

```typescript
// Before
import * as dom from '@npm//@closure/dom/dom';

const element = dom.createElement('div');
dom.appendChild(container, element);

// After
import * as dom from '../common/closure-dom';

const element = dom.createElement('div');
dom.appendChild(container, element);
```

### 3.4. Style Manipulation Pattern

```typescript
// Before
import * as style from '@npm//@closure/style/style';

style.setStyle(element, 'width', '100px');
const width = style.getComputedStyle(element, 'width');

// After
import * as style from '../common/style';

style.setStyle(element, 'width', '100px');
const width = style.getComputedStyle(element, 'width');
```

### 3.5. Array Utilities Pattern

```typescript
// Before
import {forEach, map} from '@npm//@closure/array/array';

forEach(items, (item) => {
  // Do something
});

const transformed = map(items, (item) => {
  return item * 2;
});

// After
import {forEach, map} from '../common/array';

forEach(items, (item) => {
  // Do something
});

const transformed = map(items, (item) => {
  return item * 2;
});
```

## 4. Troubleshooting Common Issues

### 4.1. Type Errors

**Issue**: TypeScript compiler errors after migration.

**Solution**:
1. Check if the replacement API has different type definitions
2. Update type annotations in your code
3. Add type assertions if necessary (`as` keyword)
4. Check if you need to import additional types

Example:
```typescript
// Before
const element = dom.getElement('my-element');

// After (if getElement returns Element | null)
const element = dom.getElement('my-element') as HTMLElement;
```

### 4.2. Runtime Errors

**Issue**: Code runs but throws errors at runtime.

**Solution**:
1. Check if the replacement API has different behavior
2. Add console.log statements to debug the issue
3. Compare the behavior of the original and replacement APIs
4. Add conditional logic to handle differences

Example:
```typescript
// If the new API behaves differently
if (someCondition) {
  // Use workaround for new API
} else {
  // Original behavior
}
```

### 4.3. Missing Functionality

**Issue**: The replacement API doesn't provide all the functionality you need.

**Solution**:
1. Check if there's an alternative approach using other utilities
2. Implement the missing functionality yourself
3. Consider using a third-party library for complex functionality
4. Document the issue and your solution

### 4.4. Test Failures

**Issue**: Tests fail after migration.

**Solution**:
1. Check if the test is expecting specific behavior from the Closure API
2. Update test expectations to match the new behavior
3. Update test mocks to match the new API
4. Consider rewriting complex tests to use Vitest's native assertions

## 5. Testing and Validation

### 5.1. Running Tests

After migrating a file, run the tests to ensure functionality is preserved:

```bash
npm test
```

For specific tests:

```bash
npm test -- -t "name of test"
```

### 5.2. Manual Testing

For visual components, manual testing is essential:

1. Create a simple HTML page that uses the component
2. Test different configurations and interactions
3. Compare behavior before and after migration
4. Document any differences

### 5.3. Validation Checklist

For each migrated file, check:

- [ ] All Closure imports replaced
- [ ] Tests passing
- [ ] No TypeScript errors
- [ ] No runtime errors
- [ ] Functionality preserved
- [ ] Performance comparable or better
- [ ] Code is readable and maintainable

### 5.4. Documentation

Document any changes or issues:

1. Update comments in the code
2. Add notes about API differences
3. Update README files if necessary
4. Document any workarounds or special handling

## Conclusion

Following this implementation guide will help you systematically complete the migration from Google Closure Library to modern alternatives. The process requires careful attention to detail, but the result will be a more maintainable and modern codebase.

Remember to take an incremental approach, migrating one file at a time and thoroughly testing each change. This will minimize the risk of introducing bugs and make the migration process more manageable.

If you encounter issues not covered in this guide, document them and share your solutions with the team to help others facing similar challenges.
