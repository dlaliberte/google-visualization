# Google Visualization Migration Guide

This document provides guidance for migrating the Google Visualization library from Closure Library dependencies to internal utilities.

## Table of Contents

1. [Overview](#overview)
2. [Migration Process](#migration-process)
3. [Testing](#testing)
4. [Troubleshooting](#troubleshooting)
5. [Migration Status](#migration-status)

## Overview

The Google Visualization library is being modernized by replacing Closure Library dependencies with internal utilities. This migration is approximately 99% complete, but there are still files with Closure dependencies that need to be addressed.

The high-priority files for migration are:

1. `visualization/table/table_chart.ts` (19 dependencies)
2. `visualization/corechart/axis_chart_definer.ts` (12 dependencies)
3. `graphics/drawing_frame.ts` (11 dependencies)
4. `graphics/svg_renderer.ts` (11 dependencies)
5. `visualization/corechart/corechart.ts` (10 dependencies)

## Migration Process

### 1. Check for Missing Utilities

Before migrating imports, check if all the required utility files exist:

```bash
node scripts/migrate-closure-imports.js check
```

This will list any missing utility files that need to be created.

### 2. Create Missing Utilities

For each missing utility file:

1. Create the file in the appropriate directory
2. Implement the required functionality based on the Closure Library implementation
3. Add tests for the new utility

Example:

```typescript
// common/dom_assert.ts
export function assertIsElement(value: unknown, opt_message?: string): Element {
  if (!isElement(value)) {
    assert(false, opt_message || 'Argument is not an Element');
  }
  return value as Element;
}
```

### 3. Migrate Imports

Once all utility files are in place, you can migrate the imports:

```bash
# Migrate high-priority files
node scripts/migrate-closure-imports.js migrate

# Migrate all files
node scripts/migrate-closure-imports.js migrate-all
```

This will replace Closure imports with internal utilities according to the mapping in the script.

### 4. Fix Type Errors

After migrating imports, you may need to fix type errors or implementation issues. Common issues include:

- Different function signatures
- Missing functionality
- Type incompatibilities

## Testing

After migrating a file, run the tests to ensure functionality is preserved:

```bash
# Run all tests
npm test

# Run tests for a specific file
npm test -- common/dom_assert.test.ts
```

If tests fail, you may need to:

1. Fix the implementation of the utility
2. Update the tests to match the new behavior
3. Fix the code that uses the utility

## Troubleshooting

### Common Issues

1. **Missing Functionality**: If a utility doesn't provide all the functionality needed, you may need to add it.

2. **Type Errors**: If you get type errors, check if the types match between the Closure implementation and your utility.

3. **Runtime Errors**: If tests pass but you get runtime errors, check if the behavior of your utility matches the Closure implementation.

### Debugging Tips

1. Compare your implementation with the Closure Library implementation
2. Add console.log statements to debug runtime issues
3. Use the TypeScript compiler to check types before running tests

## Migration Status

Track the migration status here:

| File | Status | Notes |
|------|--------|-------|
| `visualization/table/table_chart.ts` | In Progress | Imports updated, UI components commented out |
| `visualization/corechart/axis_chart_definer.ts` | Pending | 12 dependencies |
| `graphics/drawing_frame.ts` | Pending | 11 dependencies |
| `graphics/svg_renderer.ts` | Pending | 11 dependencies |
| `visualization/corechart/corechart.ts` | Pending | 10 dependencies |

## Utility Files Status

| Utility | Status | Notes |
|---------|--------|-------|
| `common/array-utils.ts` | Updated | Added missing functions |
| `common/assert` | Exists | |
| `common/browser.ts` | Created | Replaces useragent module |
| `common/dom_assert.ts` | Created | |
| `common/disposable` | Exists | |
| `common/domUtils.ts` | Updated | Added missing functions |
| `common/i18n.ts` | Created | Replaces goog.getMsg |
| `common/object-utils.ts` | Exists | |
| `common/string-utils.ts` | Exists | |
| `common/style.ts` | Updated | Added support for object-based styles |
| `common/types.ts` | Created | Replaces goog.is* functions |
| `common/types-migration.ts` | Created | Provides AnyDuringMigration type |
| `dom/dom.ts` | Updated | Added missing functions |
| `dom/tagname.ts` | Created | |
| `dom/node_type.ts` | Created | |
| `events/browser_event.ts` | Created | |
| `events/event_type.ts` | Created | |
| `events/key_codes.ts` | Created | |
| `events/events.ts` | Exists | |
| `ui/button_side.ts` | Created | |
| `ui/component.ts` | Created | |
| `ui/control_content.ts` | Created | |
| `ui/custom_button.ts` | Created | |

Update this table as you create new utilities and migrate files.
