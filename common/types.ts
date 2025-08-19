/**
 * Type checking utilities.
 *
 * This file provides utilities for checking types.
 * It replaces the Closure Library's goog.is* functions.
 *
 * @license
 * Copyright 2024 Google LLC
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

/**
 * Checks if the value is an array.
 * @param val The value to check.
 * @return Whether the value is an array.
 */
export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val);
}

/**
 * Checks if the value is array-like (has a length property and can be indexed).
 * @param val The value to check.
 * @return Whether the value is array-like.
 */
export function isArrayLike(val: unknown): val is { length: number, [key: number]: unknown } {
  if (val == null) {
    return false;
  }

  const type = typeof val;
  if (type === 'string') {
    return true;
  }

  if (type !== 'object') {
    return false;
  }

  const obj = val as { length?: number };

  if (Array.isArray(val)) {
    return true;
  }

  if (obj.length === undefined) {
    return false;
  }

  if (obj.length < 0) {
    return false;
  }

  if (obj.length > 0) {
    return Object.prototype.hasOwnProperty.call(obj, 0) &&
           Object.prototype.hasOwnProperty.call(obj, obj.length - 1);
  }

  return true;
}

/**
 * Checks if the value is a boolean.
 * @param val The value to check.
 * @return Whether the value is a boolean.
 */
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean';
}

/**
 * Checks if the value is a function.
 * @param val The value to check.
 * @return Whether the value is a function.
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

/**
 * Checks if the value is a number.
 * @param val The value to check.
 * @return Whether the value is a number.
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

/**
 * Checks if the value is a string.
 * @param val The value to check.
 * @return Whether the value is a string.
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

/**
 * Checks if the value is an object.
 * @param val The value to check.
 * @return Whether the value is an object.
 */
export function isObject(val: unknown): val is object {
  const type = typeof val;
  return type === 'object' && val !== null || type === 'function';
}

/**
 * Checks if the value is a plain object (not a class instance).
 * @param val The value to check.
 * @return Whether the value is a plain object.
 */
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  if (val === null || typeof val !== 'object') {
    return false;
  }

  const proto = Object.getPrototypeOf(val);
  return proto === Object.prototype || proto === null;
}

/**
 * Checks if the value is null.
 * @param val The value to check.
 * @return Whether the value is null.
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * Checks if the value is undefined.
 * @param val The value to check.
 * @return Whether the value is undefined.
 */
export function isUndefined(val: unknown): val is undefined {
  return val === undefined;
}

/**
 * Checks if the value is null or undefined.
 * @param val The value to check.
 * @return Whether the value is null or undefined.
 */
export function isNullOrUndefined(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}

/**
 * Checks if the value is a date.
 * @param val The value to check.
 * @return Whether the value is a date.
 */
export function isDate(val: unknown): val is Date {
  return val instanceof Date;
}

/**
 * Checks if the value is a regular expression.
 * @param val The value to check.
 * @return Whether the value is a regular expression.
 */
export function isRegExp(val: unknown): val is RegExp {
  return val instanceof RegExp;
}

/**
 * Checks if the value is a DOM element.
 * @param val The value to check.
 * @return Whether the value is a DOM element.
 */
export function isElement(val: unknown): val is Element {
  return val instanceof Element;
}

/**
 * Checks if the value is a DOM node.
 * @param val The value to check.
 * @return Whether the value is a DOM node.
 */
export function isNode(val: unknown): val is Node {
  return val instanceof Node;
}

/**
 * Checks if the value is a window.
 * @param val The value to check.
 * @return Whether the value is a window.
 */
export function isWindow(val: unknown): val is Window {
  return val === window;
}

/**
 * Checks if the value is a document.
 * @param val The value to check.
 * @return Whether the value is a document.
 */
export function isDocument(val: unknown): val is Document {
  return val === document;
}

/**
 * Checks if the value is a promise.
 * @param val The value to check.
 * @return Whether the value is a promise.
 */
export function isPromise(val: unknown): val is Promise<unknown> {
  return val instanceof Promise;
}

/**
 * Checks if the value is a map.
 * @param val The value to check.
 * @return Whether the value is a map.
 */
export function isMap(val: unknown): val is Map<unknown, unknown> {
  return val instanceof Map;
}

/**
 * Checks if the value is a set.
 * @param val The value to check.
 * @return Whether the value is a set.
 */
export function isSet(val: unknown): val is Set<unknown> {
  return val instanceof Set;
}

/**
 * Checks if the value is a symbol.
 * @param val The value to check.
 * @return Whether the value is a symbol.
 */
export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol';
}

/**
 * Checks if the value is a primitive (string, number, boolean, null, undefined, symbol).
 * @param val The value to check.
 * @return Whether the value is a primitive.
 */
export function isPrimitive(val: unknown): boolean {
  const type = typeof val;
  return val === null || type !== 'object' && type !== 'function';
}

/**
 * Checks if the value is empty (null, undefined, empty string, empty array, empty object).
 * @param val The value to check.
 * @return Whether the value is empty.
 */
export function isEmpty(val: unknown): boolean {
  if (val == null) {
    return true;
  }

  if (isString(val) || isArrayLike(val)) {
    return val.length === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

/**
 * Gets the type of a value.
 * @param val The value to get the type of.
 * @return The type of the value.
 */
export function typeOf(val: unknown): string {
  if (val === null) {
    return 'null';
  }

  const type = typeof val;
  if (type === 'object') {
    if (Array.isArray(val)) {
      return 'array';
    }
    if (val instanceof Date) {
      return 'date';
    }
    if (val instanceof RegExp) {
      return 'regexp';
    }
    if (val instanceof Error) {
      return 'error';
    }
    if (val instanceof Map) {
      return 'map';
    }
    if (val instanceof Set) {
      return 'set';
    }
    if (val instanceof Promise) {
      return 'promise';
    }
    if (val instanceof Element) {
      return 'element';
    }
    if (val instanceof Node) {
      return 'node';
    }
  }

  return type;
}
