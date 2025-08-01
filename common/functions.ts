/**
 * @fileoverview Function utilities to replace @closure/functions/functions
 * This module provides drop-in replacements for commonly used Closure function utilities.
 */

/**
 * Returns a function that always returns the same value.
 * @param value The value to return.
 * @returns A function that returns the value.
 */
export function constant<T>(value: T): () => T {
  return () => value;
}

/**
 * Returns the identity function.
 * @param value The value to return.
 * @returns The same value.
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Returns a function that returns null.
 * @returns A function that returns null.
 */
export function nullFunction(): () => null {
  return () => null;
}

/**
 * Returns a function that returns true.
 * @returns A function that returns true.
 */
export function TRUE(): () => true {
  return () => true;
}

/**
 * Returns a function that returns false.
 * @returns A function that returns false.
 */
export function FALSE(): () => false {
  return () => false;
}

/**
 * Composes multiple functions into a single function.
 * @param functions The functions to compose.
 * @returns The composed function.
 */
export function compose<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => functions.reduceRight((result, fn) => fn(result), arg);
}

/**
 * Creates a function that calls the given function with a delay.
 * @param fn The function to call.
 * @param delay The delay in milliseconds.
 * @returns A function that calls the original function with a delay.
 */
export function delay<T extends any[]>(
  fn: (...args: T) => void,
  delay: number
): (...args: T) => void {
  return (...args: T) => {
    setTimeout(() => fn(...args), delay);
  };
}

/**
 * Creates a throttled version of a function.
 * @param fn The function to throttle.
 * @param wait The number of milliseconds to throttle invocations to.
 * @returns The throttled function.
 */
export function throttle<T extends any[]>(
  fn: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return (...args: T) => {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        fn(...args);
      }, remaining);
    }
  };
}

/**
 * Creates a debounced version of a function.
 * @param fn The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns The debounced function.
 */
export function debounce<T extends any[]>(
  fn: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Creates a function that can only be called once.
 * @param fn The function to call once.
 * @returns A function that can only be called once.
 */
export function once<T extends any[], R>(
  fn: (...args: T) => R
): (...args: T) => R | undefined {
  let called = false;
  let result: R;

  return (...args: T) => {
    if (!called) {
      called = true;
      result = fn(...args);
      return result;
    }
    return result;
  };
}
