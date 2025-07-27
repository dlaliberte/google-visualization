/**
 * @fileoverview Array utilities to replace @closure/array/array
 * This module provides drop-in replacements for commonly used Closure array functions.
 */

/**
 * Calls a function for each element in an array.
 * @param arr The array to iterate over.
 * @param f The function to call for each element.
 * @param thisObj The object to be used as the value of 'this' within f.
 */
export function forEach<T>(
  arr: ArrayLike<T>,
  f: (this: any, value: T, index: number, array: ArrayLike<T>) => void,
  thisObj?: any
): void {
  for (let i = 0; i < arr.length; i++) {
    f.call(thisObj, arr[i], i, arr);
  }
}

/**
 * Calls a function for each element in an array and returns the results in a new array.
 * @param arr The array to iterate over.
 * @param f The function to call for each element.
 * @param thisObj The object to be used as the value of 'this' within f.
 * @returns A new array with the results.
 */
export function map<T, R>(
  arr: ArrayLike<T>,
  f: (this: any, value: T, index: number, array: ArrayLike<T>) => R,
  thisObj?: any
): R[] {
  const result: R[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(f.call(thisObj, arr[i], i, arr));
  }
  return result;
}

/**
 * Tests whether all elements in the array pass the test implemented by the provided function.
 * @param arr The array to test.
 * @param f The function to test each element.
 * @param thisObj The object to be used as the value of 'this' within f.
 * @returns true if all elements pass the test, false otherwise.
 */
export function every<T>(
  arr: ArrayLike<T>,
  f: (this: any, value: T, index: number, array: ArrayLike<T>) => boolean,
  thisObj?: any
): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (!f.call(thisObj, arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}

/**
 * Extends an array with another array or array-like object.
 * @param arr1 The array to extend.
 * @param arr2 The array to extend with.
 */
export function extend<T>(arr1: T[], arr2: ArrayLike<T>): void {
  for (let i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i]);
  }
}

/**
 * Performs a binary search on a sorted array.
 * @param arr The sorted array to search.
 * @param target The target value to search for.
 * @param compareFn Optional comparison function.
 * @returns The index where the target should be inserted to maintain sort order.
 */
export function binarySearch<T>(
  arr: ArrayLike<T>,
  target: T,
  compareFn?: (a: T, b: T) => number
): number {
  const compare = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const cmp = compare(arr[mid], target);

    if (cmp < 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

/**
 * Finds the index of the first element that satisfies the provided testing function.
 * @param arr The array to search.
 * @param f The function to test each element.
 * @param thisObj The object to be used as the value of 'this' within f.
 * @returns The index of the first matching element, or -1 if not found.
 */
export function findIndex<T>(
  arr: ArrayLike<T>,
  f: (this: any, value: T, index: number, array: ArrayLike<T>) => boolean,
  thisObj?: any
): number {
  for (let i = 0; i < arr.length; i++) {
    if (f.call(thisObj, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

/**
 * Tests whether at least one element in the array passes the test implemented by the provided function.
 * @param arr The array to test.
 * @param f The function to test each element.
 * @param thisObj The object to be used as the value of 'this' within f.
 * @returns true if at least one element passes the test, false otherwise.
 */
export function some<T>(
  arr: ArrayLike<T>,
  f: (this: any, value: T, index: number, array: ArrayLike<T>) => boolean,
  thisObj?: any
): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (f.call(thisObj, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
}

/**
 * Filters an array based on a predicate function.
 * @param arr The array to filter.
 * @param fn The predicate function.
 * @param thisObj Optional this object for the predicate.
 * @returns A new array with elements that pass the predicate.
 */
export function filter<T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => boolean,
  thisObj?: any
): T[] {
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(thisObj, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * Removes duplicate elements from an array.
 * @param arr The array to remove duplicates from.
 * @param compareFn Optional comparison function.
 * @returns A new array with duplicates removed.
 */
export function removeDuplicates<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => boolean
): T[] {
  const result: T[] = [];

  for (const item of arr) {
    let isDuplicate = false;

    if (compareFn) {
      for (const existing of result) {
        if (compareFn(item, existing)) {
          isDuplicate = true;
          break;
        }
      }
    } else {
      isDuplicate = result.includes(item);
    }

    if (!isDuplicate) {
      result.push(item);
    }
  }

  return result;
}

/**
 * Iterates over an array in reverse order.
 * @param arr The array to iterate over.
 * @param fn The function to call for each element.
 * @param thisObj Optional this object for the function.
 */
export function forEachRight<T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => void,
  thisObj?: any
): void {
  for (let i = arr.length - 1; i >= 0; i--) {
    fn.call(thisObj, arr[i], i, arr);
  }
}

/**
 * Gets the last element of an array without removing it.
 * @param arr The array to peek at.
 * @returns The last element or undefined if empty.
 */
export function peek<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * Reduces an array to a single value.
 * @param arr The array to reduce.
 * @param fn The reducer function.
 * @param initialValue The initial value.
 * @param thisObj Optional this object for the function.
 * @returns The reduced value.
 */
export function reduce<T, R>(
  arr: T[],
  fn: (accumulator: R, item: T, index: number, array: T[]) => R,
  initialValue: R,
  thisObj?: any
): R {
  let accumulator = initialValue;
  for (let i = 0; i < arr.length; i++) {
    accumulator = fn.call(thisObj, accumulator, arr[i], i, arr);
  }
  return accumulator;
}

/**
 * Removes the first occurrence of an element from an array.
 * @param arr The array to remove from.
 * @param element The element to remove.
 * @returns true if the element was removed.
 */
export function remove<T>(arr: T[], element: T): boolean {
  const index = arr.indexOf(element);
  if (index !== -1) {
    arr.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Creates a shallow copy of a portion of an array.
 * @param arr The array to slice.
 * @param start The start index.
 * @param end The end index (exclusive).
 * @returns A new array with the sliced elements.
 */
export function slice<T>(arr: T[], start?: number, end?: number): T[] {
  return arr.slice(start, end);
}

/**
 * Sorts an array in place.
 * @param arr The array to sort.
 * @param compareFn Optional comparison function.
 * @returns The sorted array.
 */
export function sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  return arr.sort(compareFn);
}

/**
 * Performs a stable sort on an array.
 * @param arr The array to sort.
 * @param compareFn The comparison function.
 * @returns A new sorted array.
 */
export function stableSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  // Create array of [element, originalIndex] pairs
  const indexed = arr.map((item, index) => ({ item, index }));

  // Sort with stable comparison
  indexed.sort((a, b) => {
    const result = compareFn(a.item, b.item);
    return result !== 0 ? result : a.index - b.index;
  });

  // Extract the sorted items
  return indexed.map(pair => pair.item);
}

/**
 * Checks if two arrays are equal by comparing their elements.
 * @param arr1 The first array.
 * @param arr2 The second array.
 * @param compareFn Optional comparison function.
 * @returns true if the arrays are equal.
 */
export function equals<T>(
  arr1: T[],
  arr2: T[],
  compareFn?: (a: T, b: T) => boolean
): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (compareFn) {
      if (!compareFn(arr1[i], arr2[i])) {
        return false;
      }
    } else {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  }

  return true;
}
