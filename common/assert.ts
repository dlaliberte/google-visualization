/**
 * @fileoverview Assertion utilities to replace @closure/asserts/asserts
 * This module provides drop-in replacements for commonly used Closure assertion functions.
 */

/**
 * Asserts that a condition is true. Throws an error if the condition is false.
 * @param condition The condition to assert.
 * @param message Optional error message.
 * @throws Error if the condition is false.
 */
export function assert(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

/**
 * Asserts that a value is an Element. Throws an error if it's not.
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value cast as Element.
 * @throws Error if the value is not an Element.
 */
export function assertIsElement(value: any, message?: string): Element {
  if (!(value instanceof Element)) {
    throw new Error(message || 'Expected value to be an Element');
  }
  return value;
}

/**
 * Asserts that a value is not null or undefined.
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value with null/undefined removed from its type.
 * @throws Error if the value is null or undefined.
 */
export function assertExists<T>(value: T | null | undefined, message?: string): T {
  if (value == null) {
    throw new Error(message || 'Expected value to exist');
  }
  return value;
}

/**
 * Asserts that a value is a string.
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value cast as string.
 * @throws Error if the value is not a string.
 */
export function assertString(value: any, message?: string): string {
  if (typeof value !== 'string') {
    throw new Error(message || 'Expected value to be a string');
  }
  return value;
}

/**
 * Asserts that a value is a number.
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value cast as number.
 * @throws Error if the value is not a number.
 */
export function assertNumber(value: any, message?: string): number {
  if (typeof value !== 'number') {
    throw new Error(message || 'Expected value to be a number');
  }
  return value;
}

/**
 * Asserts that a value is a boolean.
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value cast as boolean.
 * @throws Error if the value is not a boolean.
 */
export function assertBoolean(value: any, message?: string): boolean {
  if (typeof value !== 'boolean') {
    throw new Error(message || 'Expected value to be a boolean');
  }
  return value;
}

/**
 * Asserts that a value is an object (and not null).
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value cast as object.
 * @throws Error if the value is not an object.
 */
export function assertObject(value: any, message?: string): object {
  if (typeof value !== 'object' || value === null) {
    throw new Error(message || 'Expected value to be an object');
  }
  return value;
}

/**
 * Asserts that a value is an array.
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value cast as array.
 * @throws Error if the value is not an array.
 */
export function assertArray<T>(value: any, message?: string): T[] {
  if (!Array.isArray(value)) {
    throw new Error(message || 'Expected value to be an array');
  }
  return value;
}

/**
 * Asserts that a value is an instance of a specific constructor.
 * @param value The value to check.
 * @param constructor The constructor function.
 * @param message Optional error message.
 * @returns The value cast as an instance of the constructor.
 * @throws Error if the value is not an instance of the constructor.
 */
export function assertInstanceof<T>(
  value: any,
  constructor: new (...args: any[]) => T,
  message?: string
): T {
  if (!(value instanceof constructor)) {
    throw new Error(message || `Expected value to be an instance of ${constructor.name}`);
  }
  return value;
}

/**
 * Throws an error with the given message. This is used to indicate that
 * a code path should never be reached.
 * @param message The error message.
 * @throws Error always.
 */
export function fail(message?: string): never {
  throw new Error(message || 'Assertion failed');
}
