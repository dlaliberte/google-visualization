# Closure Library Migration Plan

This document outlines the specific steps needed to complete the migration of Closure Library dependencies in the high-priority files identified in the modernization plan.

## High-Priority Files

1. `visualization/table/table_chart.ts` (19 dependencies)
2. `visualization/corechart/axis_chart_definer.ts` (12 dependencies)
3. `graphics/drawing_frame.ts` (11 dependencies)
4. `graphics/svg_renderer.ts` (11 dependencies)
5. `visualization/corechart/corechart.ts` (10 dependencies)

## Migration Approach

For each file, we will:

1. Identify all Closure dependencies
2. Map each dependency to its corresponding replacement in the common utilities
3. Replace imports following the established pattern
4. Test the changes to ensure functionality is preserved

## 1. visualization/table/table_chart.ts

### Closure Dependencies (19)

```typescript
import * as googArray from '@npm//@closure/array/array';
import {assert} from '@npm//@closure/asserts/asserts';
import {assertIsElement} from '@npm//@closure/asserts/dom';
import {dispose} from '@npm//@closure/disposable/dispose';
import {add, addAll, contains, remove, removeAll, set} from '@npm//@closure/dom/classlist';
import {DomHelper, removeChildren} from '@npm//@closure/dom/dom';
import {TagName} from '@npm//@closure/dom/tagname';
import {BrowserEvent} from '@npm//@closure/events/browserevent';
import {EventHandler} from '@npm//@closure/events/eventhandler';
import {EventType} from '@npm//@closure/events/eventtype';
import {KeyCodes} from '@npm//@closure/events/keycodes';
import {clone, forEach} from '@npm//@closure/object/object';
import {isEmptyOrWhitespace, isNumeric, makeSafe, trim} from '@npm//@closure/string/string';
import * as style from '@npm//@closure/style/style';
import {ButtonSide} from '@npm//@closure/ui/buttonside';
import {Component} from '@npm//@closure/ui/component';
import {ControlContent} from '@npm//@closure/ui/controlcontent';
import {CustomButton} from '@npm//@closure/ui/custombutton';
import {GECKO, IE, MAC, VERSION} from '@npm//@closure/useragent/useragent';
```

### Replacement Mapping

| Closure Import | Replacement |
|----------------|-------------|
| `@npm//@closure/array/array` | `../common/array` |
| `@npm//@closure/asserts/asserts` | `../common/assert` |
| `@npm//@closure/asserts/dom` | `../common/dom_assert` |
| `@npm//@closure/disposable/dispose` | `../common/disposable` |
| `@npm//@closure/dom/classlist` | `../dom/classlist` |
| `@npm//@closure/dom/dom` | `../dom/dom` |
| `@npm//@closure/dom/tagname` | `../dom/tagname` |
| `@npm//@closure/events/browserevent` | `../events/browser_event` |
| `@npm//@closure/events/eventhandler` | `../events/event_handler` |
| `@npm//@closure/events/eventtype` | `../events/event_type` |
| `@npm//@closure/events/keycodes` | `../events/key_codes` |
| `@npm//@closure/object/object` | `../common/object` |
| `@npm//@closure/string/string` | `../common/string` |
| `@npm//@closure/style/style` | `../dom/style` |
| `@npm//@closure/ui/buttonside` | `../ui/button_side` |
| `@npm//@closure/ui/component` | `../ui/component` |
| `@npm//@closure/ui/controlcontent` | `../ui/control_content` |
| `@npm//@closure/ui/custombutton` | `../ui/custom_button` |
| `@npm//@closure/useragent/useragent` | `../common/user_agent` |

## 2. visualization/corechart/axis_chart_definer.ts

### Closure Dependencies (12)

```typescript
import * as googArray from '@npm//@closure/array/array';
import {assert, assertNumber} from '@npm//@closure/asserts/asserts';
import {isValidColor} from '@npm//@closure/color/color';
import {identity} from '@npm//@closure/functions/functions';
import {Box} from '@npm//@closure/math/box';
import {Coordinate} from '@npm//@closure/math/coordinate';
import {average} from '@npm//@closure/math/math';
import {Rect} from '@npm//@closure/math/rect';
import {Vec2} from '@npm//@closure/math/vec2';
import * as googObject from '@npm//@closure/object/object';
import {contains, isEmptyOrWhitespace, trim} from '@npm//@closure/string/string';
import {parseStyleAttribute} from '@npm//@closure/style/style';
```

### Replacement Mapping

| Closure Import | Replacement |
|----------------|-------------|
| `@npm//@closure/array/array` | `../common/array` |
| `@npm//@closure/asserts/asserts` | `../common/assert` |
| `@npm//@closure/color/color` | `../common/color` |
| `@npm//@closure/functions/functions` | `../common/functions` |
| `@npm//@closure/math/box` | `../math/box` |
| `@npm//@closure/math/coordinate` | `../math/coordinate` |
| `@npm//@closure/math/math` | `../math/math` |
| `@npm//@closure/math/rect` | `../math/rect` |
| `@npm//@closure/math/vec2` | `../math/vec2` |
| `@npm//@closure/object/object` | `../common/object` |
| `@npm//@closure/string/string` | `../common/string` |
| `@npm//@closure/style/style` | `../dom/style` |

## 3. graphics/drawing_frame.ts

### Closure Dependencies (11)

```typescript
import {setState} from '@npm//@closure/a11y/aria/aria';
import {forEach} from '@npm//@closure/array/array';
import {assert} from '@npm//@closure/asserts/asserts';
import {Disposable} from '@npm//@closure/disposable/disposable';
import {dispose} from '@npm//@closure/disposable/dispose';
import {DomHelper, getDomHelper, removeChildren} from '@npm//@closure/dom/dom';
import {randomInt} from '@npm//@closure/math/math';
import {Size} from '@npm//@closure/math/size';
import {compareVersions} from '@npm//@closure/string/string';
import {setPosition, setSize, setStyle} from '@npm//@closure/style/style';
import {EDGE, GECKO, IE, OPERA, VERSION, WEBKIT} from '@npm//@closure/useragent/useragent';
```

### Replacement Mapping

| Closure Import | Replacement |
|----------------|-------------|
| `@npm//@closure/a11y/aria/aria` | `../a11y/aria` |
| `@npm//@closure/array/array` | `../common/array` |
| `@npm//@closure/asserts/asserts` | `../common/assert` |
| `@npm//@closure/disposable/disposable` | `../common/disposable` |
| `@npm//@closure/disposable/dispose` | `../common/disposable` |
| `@npm//@closure/dom/dom` | `../dom/dom` |
| `@npm//@closure/math/math` | `../math/math` |
| `@npm//@closure/math/size` | `../math/size` |
| `@npm//@closure/string/string` | `../common/string` |
| `@npm//@closure/style/style` | `../dom/style` |
| `@npm//@closure/useragent/useragent` | `../common/user_agent` |

## 4. graphics/svg_renderer.ts

### Closure Dependencies (11)

```typescript
import * as asserts from '@npm//@closure/asserts/asserts';
import {NodeType} from '@npm//@closure/dom/nodetype';
import {getLogger, info, Logger, warning} from '@npm//@closure/log/log';
import {Box} from '@npm//@closure/math/box';
import {Line} from '@npm//@closure/math/line';
import * as googMath from '@npm//@closure/math/math';
import {Size} from '@npm//@closure/math/size';
import {Vec2} from '@npm//@closure/math/vec2';
import {format} from '@npm//@closure/string/stringformat';
import * as googStyle from '@npm//@closure/style/style';
import * as userAgent from '@npm//@closure/useragent/useragent';
```

### Replacement Mapping

| Closure Import | Replacement |
|----------------|-------------|
| `@npm//@closure/asserts/asserts` | `../common/assert` |
| `@npm//@closure/dom/nodetype` | `../dom/node_type` |
| `@npm//@closure/log/log` | `../common/log` |
| `@npm//@closure/math/box` | `../math/box` |
| `@npm//@closure/math/line` | `../math/line` |
| `@npm//@closure/math/math` | `../math/math` |
| `@npm//@closure/math/size` | `../math/size` |
| `@npm//@closure/math/vec2` | `../math/vec2` |
| `@npm//@closure/string/stringformat` | `../common/string_format` |
| `@npm//@closure/style/style` | `../dom/style` |
| `@npm//@closure/useragent/useragent` | `../common/user_agent` |

## 5. visualization/corechart/corechart.ts

### Closure Dependencies (10)

```typescript
import {clone, forEach, map, range, some} from '@npm//@closure/array/array';
import * as asserts from '@npm//@closure/asserts/asserts';
import {dispose} from '@npm//@closure/disposable/dispose';
import {getDomHelper} from '@npm//@closure/dom/dom';
import * as events from '@npm//@closure/events/events';
import {EventTarget} from '@npm//@closure/events/eventtarget';
import {Logger, getLogger, warning} from '@npm//@closure/log/log';
import {Size} from '@npm//@closure/math/size';
import * as googObject from '@npm//@closure/object/object';
import {Timer} from '@npm//@closure/timer/timer';
```

### Replacement Mapping

| Closure Import | Replacement |
|----------------|-------------|
| `@npm//@closure/array/array` | `../common/array` |
| `@npm//@closure/asserts/asserts` | `../common/assert` |
| `@npm//@closure/disposable/dispose` | `../common/disposable` |
| `@npm//@closure/dom/dom` | `../dom/dom` |
| `@npm//@closure/events/events` | `../events/events` |
| `@npm//@closure/events/eventtarget` | `../events/event_target` |
| `@npm//@closure/log/log` | `../common/log` |
| `@npm//@closure/math/size` | `../math/size` |
| `@npm//@closure/object/object` | `../common/object` |
| `@npm//@closure/timer/timer` | `../common/timer` |

## Implementation Plan

### Phase 1: Create Missing Utility Files (1 week)

Before replacing imports, we need to ensure all the replacement utilities exist. For each missing utility:

1. Create the file in the appropriate directory
2. Implement the required functionality
3. Add tests for the new utility

### Phase 2: Migrate High-Priority Files (1-2 weeks)

For each high-priority file:

1. Replace imports according to the mapping
2. Fix any type errors or implementation issues
3. Run tests to ensure functionality is preserved
4. Fix any test failures

### Phase 3: Test and Validate (1 week)

1. Run the full test suite
2. Fix any remaining issues
3. Manually verify the components work as expected
4. Document any API changes or behavior differences

## Timeline

- Week 1: Create missing utility files
- Week 2-3: Migrate high-priority files
- Week 4: Test and validate

## Success Criteria

1. All Closure Library imports are replaced with internal utilities
2. All tests pass
3. No regressions in functionality
4. Documentation is updated to reflect any changes
