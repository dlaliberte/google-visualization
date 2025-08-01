/**
 * Replace closure tests with vitest equivalents.
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from 'vitest';

// tslint:disable:ban-types Migration
// tslint:disable-next-line:no-any For use by external code.
type AnyDuringMigration = any;

/**
 * Uses vitest's expect to display msg if test fails.
 * Vitest doesn't have withContext, so we'll use a custom error message approach.
 */
export function withContext(
  test: Function,
  msg: string,
  ...args: AnyDuringMigration[]
) {
  try {
    test(...args);
  } catch (error) {
    throw new Error(`${msg}: ${error}`);
  }
}

/** Replace closure tests with vitest equivalents. */
export function assertEquals(
  expected: AnyDuringMigration,
  actual: AnyDuringMigration,
) {
  expect(actual).toBe(expected);
}

/** Replace closure tests with vitest equivalents. */
export function assertNotEquals(
  expected: AnyDuringMigration,
  actual: AnyDuringMigration,
) {
  expect(actual).not.toBe(expected);
}

/** assertEquals with injected context. */
export function assertEqualsWithContext(
  msg: string,
  expected: AnyDuringMigration,
  actual: AnyDuringMigration,
) {
  try {
    expect(actual).toBe(expected);
  } catch (error) {
    throw new Error(`${msg}: ${error}`);
  }
}

/** Replace closure tests with vitest equivalents. */
export function assertTrue(actual: boolean) {
  expect(actual).toBe(true);
}

/** Replace closure tests with vitest equivalents. */
export function assertFalse(actual: boolean) {
  expect(actual).toBe(false);
}

/** Replace closure tests with vitest equivalents. */
export function assertNull(actual: AnyDuringMigration) {
  expect(actual === null).toBe(true);
}

/** Replace closure tests with vitest equivalents. */
export function assertNotNull(actual: AnyDuringMigration) {
  expect(actual === null).not.toBe(true);
}

/** Replace closure tests with vitest equivalents. */
export function assertUndefined(actual: AnyDuringMigration) {
  expect(typeof actual).toBe('undefined');
}

/** Replace closure tests with vitest equivalents. */
export function assertNotUndefined(actual: AnyDuringMigration) {
  expect(typeof actual).not.toBe('undefined');
}

/** Replace closure tests with vitest equivalents. */
export function assertNotNullNorUndefined(actual: AnyDuringMigration) {
  expect(actual != null).toBe(true);
}

/** Is this correct? */
export const assert = assertNotNull;

/** Replace closure tests with vitest equivalents. */
export function assertThrows(func: Function) {
  expect(func).toThrow();
}

/**
 * @param func The function to test.
 * @param expectedErrorMessage The expected error message in that
 *     Error raised by the func.
 */
export function assertThrowsWithMessage(
  func: Function,
  expectedErrorMessage: string,
) {
  expect(func).toThrowError(expectedErrorMessage);
}

/** Replace closure tests with vitest equivalents. */
export function assertNotThrows(func: Function) {
  expect(func).not.toThrow();
}

/**
 * Asserts that the two given dates are equal.
 * @param expected The expected date.
 * @param actual The actual date.
 */
export function assertDateEquals(expected: Date, actual: AnyDuringMigration) {
  if (!(actual instanceof Date)) {
    throw new Error('Actual value must be of type Date, not ' + typeof actual);
  }
  expect(actual.getFullYear()).toBe(expected.getFullYear());
  expect(actual.getMonth()).toBe(expected.getMonth());
  expect(actual.getDate()).toBe(expected.getDate());
  expect(actual.getHours()).toBe(expected.getHours());
  expect(actual.getMinutes()).toBe(expected.getMinutes());
  expect(actual.getSeconds()).toBe(expected.getSeconds());
}

/**
 * Utility for testing if array elements are equal.
 * This is a shallow comparison.  Use assertObjectEquals instead for deep
 * comparison.
 */
export function isArrayEquals(
  a1: AnyDuringMigration,
  a2: AnyDuringMigration,
): boolean {
  if (!Array.isArray(a1) || !Array.isArray(a2)) {
    return false;
  }
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

/** Replace closure tests with vitest equivalents. */
export function assertArrayEquals(
  expected: AnyDuringMigration[],
  actual: AnyDuringMigration,
) {
  assertObjectEquals(expected, actual);
}

/** Replace closure tests with vitest equivalents. */
export function assertObjectEquals(
  expected: Object | AnyDuringMigration[],
  actual: AnyDuringMigration,
) {
  expect(actual).toEqual(expected);
}

/**
 * Custom equality tester for numbers.
 */
export function floatEquality(a: AnyDuringMigration, b: AnyDuringMigration) {
  if (a === +a && b === +b && (a !== (a | 0) || b !== (b | 0))) {
    // Must be a number.
    // Note: Infinity - Infinity is NaN.
    return a === b || Math.abs(a - b) < 5e-8;
  }
  // return undefined to let other testers try.
  return undefined;
}

/** Use custom equality tester. */
export function assertObjectRoughlyEquals(
  expected: Object | AnyDuringMigration[],
  actual: AnyDuringMigration,
) {
  // Vitest doesn't have custom equality testers like Jasmine,
  // so we'll implement a custom comparison for floating point numbers
  const customEqual = (a: any, b: any): boolean => {
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((item, index) => customEqual(item, b[index]));
      }
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      return keysA.every(key => customEqual(a[key], b[key]));
    }
    const floatResult = floatEquality(a, b);
    return floatResult !== undefined ? floatResult : a === b;
  };

  expect(customEqual(actual, expected)).toBe(true);
}
