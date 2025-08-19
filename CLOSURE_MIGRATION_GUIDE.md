# Closure Migration Guide

This guide provides instructions for continuing the migration from Google Closure dependencies to modern alternatives.

## Quick Reference

### Import Replacements

| Closure Import | New Import | Notes |
|----------------|------------|-------|
| `@npm//@closure/array/array` | Built-in JavaScript Array methods | Use native forEach, map, every, etc. |
| `@npm//@closure/asserts/asserts` | `../common/assert` | assert, assertExists, etc. |
| `@npm//@closure/asserts/dom` | `../common/assert` | assertIsElement |
| `@npm//@closure/object/object` | `../common/closure-object` | clone, getKeys, isEmpty, etc. |
| `@npm//@closure/math/math` | `../common/closure-math` | clamp, Box, Range, Coordinate |
| `@npm//@closure/math/coordinate` | `../common/closure-math` | Coordinate class |
| `@npm//@closure/math/range` | `../common/closure-math` | Range class |
| `@npm//@closure/math/vec2` | `../common/closure-math` | Vec2 class |
| `@npm//@closure/disposable/disposable` | `../common/disposable` | Disposable class |
| `@npm//@closure/disposable/dispose` | `../common/disposable` | dispose function |
| `@npm//@closure/dom/dom` | Built-in DOM APIs | Use native document and element methods. |
| `@npm//@closure/style/style` | `../common/style` | setStyle, getComputedStyle |
| `@npm//@closure/events/events` | Built-in Event APIs | Use native event handling mechanisms. |
| `@npm//@closure/uri/uri` | Use URL and URLSearchParams | Built-in APIs for URI handling. |
| `@npm//@closure/string/string` | Built-in String methods | Utilize native JavaScript string capabilities. |
| `@npm//@closure/i18n` | Intl API | Use for internationalization and localization. |
| `@npm//@closure/a11y` | ARIA and Semantic HTML | Ensure accessibility with ARIA and HTML. |
| `@npm//@closure/html` | Safe HTML processing | Use libraries like React or Vue. |
| `@npm//@closure/crypt/crypt` | Web Crypto API | Use crypto.subtle for cryptographic operations. |
| `@npm//@closure/proto` | Libraries like protobufjs or ts-proto | Use for Protocol Buffers in JS. |
| `@npm//@closure/ui` | Modern frameworks | Use React, Angular, or Vue for UI development. |
| `@npm//@closure/editor` | Quill, Slate, TinyMCE | Use robust libraries for rich text editing. |
| `@npm//@closure/test` | Mocha, Jest, Jasmine, Chai | Use modern testing frameworks. |

### Migration Steps

1. **Identify Closure imports** in the file you're working on
2. **Replace imports** using the table above
3. **Test the changes** to ensure functionality is preserved
4. **Update any usage** if the API has changed slightly

### Example Migration

**Before:**
```typescript
import {forEach} from '@npm//@closure/array/array';
import {assert} from '@npm//@closure/asserts/asserts';
import {Disposable} from '@npm//@closure/disposable/disposable';
import {Coordinate} from '@npm//@closure/math/coordinate';

export class MyClass extends Disposable {
  constructor() {
    super();
    assert(true, 'This should work');
    const coord = new Coordinate(10, 20);
    forEach([1, 2, 3], (item) => console.log(item));
  }
}
```

**After:**
```typescript
import {forEach} from '../common/array';
import {assert} from '../common/assert';
import {Disposable} from '../common/disposable';
import {Coordinate} from '../common/closure-math';

export class MyClass extends Disposable {
  constructor() {
    super();
    assert(true, 'This should work');
    const coord = new Coordinate(10, 20);
    forEach([1, 2, 3], (item) => console.log(item));
  }
}
```

## Available Utilities

### Array Utilities (`common/array.ts`)
- `forEach(arr, fn, thisObj?)` - Iterate over array elements
- `forEachRight(arr, fn, thisObj?)` - Iterate over array elements in reverse
- `map(arr, fn, thisObj?)` - Transform array elements
- `every(arr, fn, thisObj?)` - Test if all elements pass condition
- `some(arr, fn, thisObj?)` - Test if any element passes condition
- `filter(arr, fn, thisObj?)` - Filter array elements
- `extend(arr1, arr2)` - Extend array with another array
- `binarySearch(arr, target, compareFn?)` - Binary search in sorted array
- `findIndex(arr, fn, thisObj?)` - Find index of first matching element
- `peek(arr)` - Get last element without removing it
- `reduce(arr, fn, initialValue, thisObj?)` - Reduce array to single value
- `remove(arr, element)` - Remove first occurrence of element
- `slice(arr, start?, end?)` - Create shallow copy of array portion
- `sort(arr, compareFn?)` - Sort array in place
- `stableSort(arr, compareFn)` - Perform stable sort
- `equals(arr1, arr2, compareFn?)` - Check if arrays are equal
- `removeDuplicates(arr, compareFn?)` - Remove duplicate elements

### Assertion Utilities (`common/assert.ts`)
- `assert(condition, message?)` - Basic assertion
- `assertIsElement(value, message?)` - Assert value is DOM Element
- `assertExists(value, message?)` - Assert value is not null/undefined
- `assertString(value, message?)` - Assert value is string
- `assertNumber(value, message?)` - Assert value is number
- `assertBoolean(value, message?)` - Assert value is boolean
- `assertObject(value, message?)` - Assert value is object
- `assertArray(value, message?)` - Assert value is array
- `assertInstanceof(value, constructor, message?)` - Assert instanceof

### Object Utilities (`common/closure-object.ts`)
- `clone(obj)` - Shallow clone object
- `getKeys(obj)` - Get object keys
- `getValues(obj)` - Get object values
- `isEmpty(obj)` - Check if object is empty
- `extend(target, ...sources)` - Extend object with sources
- `merge(...sources)` - Merge objects into new object
- `hasKey(obj, key)` - Check if object has property
- `get(obj, key, defaultValue?)` - Get property with default
- `set(obj, key, value)` - Set property value
- `remove(obj, key)` - Remove property
- `forEach(obj, fn, thisObj?)` - Iterate over object properties
- `map(obj, fn, thisObj?)` - Transform object values
- `filter(obj, fn, thisObj?)` - Filter object properties

### Math Utilities (`common/closure-math.ts`)
- `clamp(value, min, max)` - Clamp value between bounds
- `toRadians(degrees)` - Convert degrees to radians
- `toDegrees(radians)` - Convert radians to degrees
- `modulo(a, b)` - Calculate modulo of two numbers
- `sign(x)` - Get sign of number
- `nearlyEquals(a, b, tolerance?)` - Approximate equality
- `lerp(a, b, t)` - Linear interpolation
- `Box` class - 2D bounding box
- `Range` class - Numeric range
- `Coordinate` class - 2D coordinate
- `Vec2` class - 2D vector
- `Size` class - Width and height representation

### Disposable Utilities (`common/disposable.ts`)
- `Disposable` class - Base disposable class
- `dispose(obj)` - Dispose object if disposable
- `disposeAll(...objects)` - Dispose multiple objects
- `DisposableGroup` class - Manage multiple disposables
- `DisposableScope` class - Auto-dispose scope

### DOM Utilities (`common/closure-dom.ts`)
- `DomHelper` class - DOM manipulation helper
- `getDomHelper()` - Get default DOM helper
- `assertIsElement(value)` - Assert value is Element
- `removeChildren(element)` - Remove all child nodes
- Various DOM manipulation functions

### Style Utilities (`common/style.ts`)
- `setStyle(element, property, value)` - Set CSS property
- `setStyles(element, styles)` - Set multiple CSS properties
- `getComputedStyle(element, property)` - Get computed style
- `showElement(element, display?)` - Show element
- `hideElement(element)` - Hide element
- `addClass(element, className)` - Add CSS class
- `removeClass(element, className)` - Remove CSS class
- And many more style manipulation functions

### Event Utilities (`common/events.ts`)
- `EventTarget` class - Custom event target
- `BrowserEvent` class - Browser event wrapper
- `EventHandler` class - Event handler manager
- `EventType` constants - Common event types

### URI Utilities (`common/uri.ts`)
- `Uri` class - URI manipulation
- Methods for scheme, domain, port, path, query, fragment
- Parameter manipulation methods

### String Utilities (`common/closure-string.ts`)
- `isEmptyOrWhitespace(str)` - Check if string is empty or whitespace
- `makeSafe(str)` - Escape HTML characters
- `repeat(str, count)` - Repeat string multiple times
- `trim(str)` - Trim whitespace from both ends
- `trimLeft(str)` - Trim whitespace from left
- `trimRight(str)` - Trim whitespace from right
- `padStart(str, length, padString?)` - Pad string at start
- `padEnd(str, length, padString?)` - Pad string at end
- `startsWith(str, prefix)` - Check if string starts with prefix
- `endsWith(str, suffix)` - Check if string ends with suffix
- `contains(str, substring)` - Check if string contains substring
- `capitalize(str)` - Capitalize first letter
- `toCamelCase(str)` - Convert to camelCase
- `toKebabCase(str)` - Convert to kebab-case
- `toSnakeCase(str)` - Convert to snake_case
- `escapeRegex(str)` - Escape regex special characters
- `stripTags(str)` - Remove HTML tags
- `truncate(str, maxLength, suffix?)` - Truncate string
- `words(str)` - Split string into words
- `countOccurrences(str, substring)` - Count substring occurrences
- `reverse(str)` - Reverse string
- `isPalindrome(str)` - Check if string is palindrome
- `format(template, values)` - Format template string

## Testing

After making changes, run the tests to ensure everything works:

```bash
npm test
```

## Need Help?

If you encounter issues during migration:

1. Check if the utility you need exists in the replacement modules
2. Look at existing migrated files for examples
3. If a utility is missing, add it to the appropriate module
4. Follow the established patterns for API compatibility

## Status

- ✅ Core utilities implemented and tested
- ✅ Wrapper and controls modules migrated
- 🔄 Visualization modules in progress
- 🔄 Additional utilities being added as needed