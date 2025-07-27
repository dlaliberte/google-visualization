# Google Closure Replacement Plan

Focus first on the files that have fewer dependencies. Then gradually move towards more complex areas.

## Priority Areas for Replacement

### 1. Core Utilities (High Priority)

These are used throughout the codebase and should be replaced first:

- **@closure/array/array**: Replace with native JavaScript array methods or lodash/fp-ts
  - `forEach`, `map`, `every`, `extend`, `binarySearch` → Native JS or fp-ts equivalents

- **@closure/asserts/asserts**: Replace with a lightweight assertion library
  - `assert`, `assertIsElement` → Consider using tiny-invariant or a custom implementation

- **@closure/object/object**: Replace with native JavaScript object methods or lodash/fp-ts
  - `clone`, `getKeys`, `isEmpty` → Object.keys, Object.assign, etc.

- **@closure/math/math**: Replace with native Math or create a custom math utility
  - `clamp`, `Box`, `Range` → Custom implementations or math.js

### 2. DOM Manipulation (Medium Priority)

These are used in rendering components:

- **@closure/dom/dom**: Replace with direct DOM APIs or a lightweight DOM utility
  - `getDomHelper`, `assertIsElement` → Direct DOM APIs or tiny-dom

- **@closure/style/style**: Replace with direct style manipulation or a CSS-in-JS library
  - `setStyle` → Direct style manipulation or a lightweight styling library

### 3. Event Handling (Medium Priority)

Event handling is critical for interactive charts:

- **@closure/events/events**: Replace with native event handling or a lightweight event library
  - `BrowserEvent`, `EventTarget`, `EventType` → Native event handling or tiny-emitter

- **@closure/events/eventhandler**: Replace with a custom event handler implementation
  - `EventHandler` → Custom implementation or tiny-emitter

### 4. UI Components (Lower Priority)

These are used in specific visualizations:

- **@closure/ui/tooltip**: Replace with a custom tooltip implementation
  - Consider using tippy.js or a custom implementation

- **@closure/ui/component**: Replace with custom component implementations
  - `Component`, `CustomButton` → Custom implementations

### 5. Testing (Separate Track)

Testing utilities can be replaced independently:

- **@closure/testing/asserts**: Replace with Vitest assertions
  - `assertEquals`, `assertRoughlyEquals` → Vitest's expect API

- **@closure/testing/testsuite**: Replace with Vitest test structure
  - `testSuite` → Vitest's describe/it pattern

## Implementation Strategy

1. **Create Adapter Layer**:
   - Create adapter modules that provide the same API as Closure but use modern implementations
   - This allows gradual migration without breaking existing code

2. **Replace Core Utilities First**:
   - Start with array, object, and math utilities as they're used throughout the codebase
   - Create drop-in replacements with identical APIs

3. **Update Module by Module**:
   - Focus on one visualization module at a time
   - Complete the migration for each module before moving to the next

4. **Leverage Existing Libraries**:
   - Use fp-ts for functional programming utilities (already a dependency)
   - Consider adding lightweight utilities like tiny-invariant for assertions

5. **Modernize Testing**:

   - Migrate tests to use Vitest's native assertions and test structure
   - This can be done in parallel with the main code migration

6. **Incremental Testing**:
   - As each module or utility is replaced, ensure that tests are updated and passing. This will help catch any issues early and ensure that the migration does not introduce regressions.

7. **Documentation Updates**:
   - Update documentation to reflect changes in the API or usage patterns due to the migration. This includes updating any internal documentation, README files, or comments within the code.

8. **Performance Benchmarks**:
   - Conduct performance benchmarks before and after the migration to ensure that the new implementations do not negatively impact performance. This is particularly important for core utilities that are used extensively.

9. **Community and External Libraries**:
   - Consider leveraging community-driven libraries or tools that are well-maintained and widely used. This can reduce the maintenance burden and provide additional features or optimizations.

10. **Fallback Mechanisms**:

   - Implement fallback mechanisms or feature flags to allow for a gradual rollout of changes. This can help mitigate risks and provide a way to revert changes if issues arise.

11. **Engage with Stakeholders**:

   - Regularly engage with stakeholders, including developers and users, to gather feedback on the migration process and address any concerns or suggestions.

12. **Training and Knowledge Sharing**:

   - Provide training sessions or documentation to help the development team understand the new utilities and patterns being introduced. This can facilitate a smoother transition and adoption.

## Recommended Libraries

- **fp-ts**: Already a dependency, use for functional programming patterns
- **tiny-invariant**: Lightweight assertions
- **tippy.js**: Modern tooltip library
- **math.js**: Comprehensive math library (if needed)
- **lodash-es**: Modern utility library with tree-shaking support

## Progress Update

### ✅ Completed Steps

1. **Created adapter modules for core Closure utilities:**

   - ✅ `common/array.ts` - Replaces @closure/array/array
   - ✅ `common/assert.ts` - Replaces @closure/asserts/asserts
   - ✅ `common/closure-object.ts` - Replaces @closure/object/object
   - ✅ `common/closure-math.ts` - Replaces @closure/math/math
   - ✅ `common/disposable.ts` - Replaces @closure/disposable/disposable
   - ✅ `common/events.ts` - Replaces @closure/events/events
   - ✅ `common/closure-dom.ts` - Replaces @closure/dom/dom
   - ✅ `common/style.ts` - Replaces @closure/style/style
   - ✅ `common/uri.ts` - Replaces @closure/uri/uri
   - ✅ `common/closure-replacements.ts` - Central export module

2. **Updated key files to use new utilities:**
   - ✅ `wrapper/wrapper.ts` - Core wrapper functionality
   - ✅ `wrapper/query_wrapper.ts` - Query wrapper
   - ✅ `wrapper/table_query_wrapper.ts` - Table query wrapper
   - ✅ `controls/setter.ts` - Control setter
   - ✅ `controls/control.ts` - Base control class
   - ✅ `controls/dashboard.ts` - Dashboard functionality
   - ✅ `common/json.ts` - JSON utilities (replaced goog.global and goog.typeOf)

3. **Test Results:**
   - ✅ 10/11 test files passing (408/410 tests passing)
   - ✅ No more Closure import errors
   - ✅ Core functionality working with new utilities

### 🔄 Next Steps

1. **Continue systematic replacement of remaining Closure imports:**
   - ✅ Math utilities in `math/vector_utils.ts` - COMPLETED
   - ✅ Key axis files (`axis_definer.ts`, `date_tick_definer.ts`, `horizontal_axis_definer.ts`) - COMPLETED
   - ✅ Common utilities (`layout_utils.ts`, `layered_object.ts`, `size_scale.ts`) - COMPLETED
   - ✅ Format utilities (`patterns.ts`, `formatting.ts`, `colorformat.ts`, `numberformat.ts`) - COMPLETED
   - 🔄 Continue with visualization/, colorbar/, and remaining files

2. **Address remaining Closure dependencies:**
   - 🔄 Animation utilities in `common/animation.ts`
   - 🔄 Color utilities in `colorbar/scale.ts`
   - 🔄 Event handling in various visualization files
   - 🔄 I18n utilities (DateTimeFormat, NumberFormat, etc.)

3. **Create additional utility modules as needed:**
   - 🔄 Timer utilities (for @closure/timer/timer)
   - 🔄 Color utilities (for @closure/color/color)
   - 🔄 Function utilities (for @closure/functions/functions)
   - 🔄 I18n utilities (for internationalization)

4. **Testing and validation:**
   - ✅ Core functionality validated - tests still passing
   - 🔄 Fix the 2 remaining test failures (unrelated to Closure replacement)
   - 🔄 Add tests for new utility modules
   - 🔄 Validate that all chart types still work correctly

### 📋 Replacement Pattern

The established pattern for replacing Closure imports:

```typescript
// Before
import {forEach} from '@npm//@closure/array/array';
import {assert} from '@npm//@closure/asserts/asserts';

// After
import {forEach} from '../common/array';
import {assert} from '../common/assert';
```

### 🎯 Success Metrics

- ✅ Core utilities successfully replaced
- ✅ Tests passing without Closure dependencies
- ✅ Wrapper and controls modules fully migrated
- 🔄 Systematic approach established for remaining files
