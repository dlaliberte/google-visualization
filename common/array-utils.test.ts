import { describe, it, expect } from 'vitest';
import {
  removeFirstElement,
  removeLastElement,
  arraysAlmostEqual,
  arrayMultiSlice,
  binarySearchArray,
  peekArray,
  mergeArrays,
  rangeMap,
  nextNonNull,
} from './array-utils';

// Tests for removeFirstElement
describe('removeFirstElement', () => {
  it('should remove the first element from the array', () => {
    expect(removeFirstElement([1, 2, 3])).toEqual([2, 3]);
  });

  it('should throw an error if the array is empty', () => {
    expect(() => removeFirstElement([])).toThrow('Array cannot be empty');
  });
});

// Tests for removeLastElement
describe('removeLastElement', () => {
  it('should remove the last element from the array', () => {
    expect(removeLastElement([1, 2, 3])).toEqual([1, 2]);
  });

  it('should throw an error if the array is empty', () => {
    expect(() => removeLastElement([])).toThrow('Array cannot be empty');
  });
});

// Tests for arraysAlmostEqual
describe('arraysAlmostEqual', () => {
  it('should return true for arrays that are almost equal', () => {
    expect(arraysAlmostEqual([1, 2, 3], [1.1, 2.1, 3.1], 0.2)).toBe(true);
  });

  it('should return false for arrays that are not almost equal', () => {
    expect(arraysAlmostEqual([1, 2, 3], [1.5, 2.5, 3.5], 0.2)).toBe(false);
  });
});

// Tests for arrayMultiSlice
describe('arrayMultiSlice', () => {
  it('should return concatenated slices of the array', () => {
    expect(arrayMultiSlice([1, 2, 3, 4, 5], 0, 2, 3, 5)).toEqual([1, 2, 4, 5]);
  });

  it('should throw an error if sliceArgs length is odd', () => {
    expect(() => arrayMultiSlice([1, 2, 3], 0, 1, 2)).toThrow('sliceArgs must have even number of arguments');
  });
});

// Tests for binarySearchArray
describe('binarySearchArray', () => {
  it('should return the index of the target element', () => {
    expect(binarySearchArray([1, 2, 3, 4, 5], 3)).toBe(2);
  });

  it('should return negative insertion point for non-existent element', () => {
    expect(binarySearchArray([1, 2, 4, 5], 3)).toBe(-3);
  });
});

// Tests for peekArray
describe('peekArray', () => {
  it('should return the last element of the array', () => {
    expect(peekArray([1, 2, 3])).toBe(3);
  });

  it('should throw an error if the array is empty', () => {
    expect(() => peekArray([])).toThrow('Array cannot be empty');
  });
});

// Tests for mergeArrays
describe('mergeArrays', () => {
  it('should merge two arrays correctly', () => {
    const ar1 = [1, 3, 5];
    const ar2 = [2, 4, 6];
    const merged = mergeArrays(ar1, ar2);
    expect(merged).toEqual([
      { value: 1, ar1: 0, ar2: 0 },
      { value: 2, ar1: 0, ar2: 1 },
      { value: 3, ar1: 1, ar2: 1 },
      { value: 4, ar1: 1, ar2: 2 },
      { value: 5, ar1: 2, ar2: 2 },
      { value: 6, ar1: 2, ar2: 3 },
    ]);
  });

  it('should return null if either array is empty', () => {
    expect(mergeArrays([], [1, 2, 3])).toBeNull();
  });
});

// Tests for rangeMap
describe('rangeMap', () => {
  it('should map a function over a range of numbers', () => {
    const result = rangeMap(3, (i) => i * 2);
    expect(result).toEqual([0, 2, 4]);
  });
});

// Tests for nextNonNull
describe('nextNonNull', () => {
  it('should find the next non-null value in the array', () => {
    const array = [null, 1, null, 2, 3];
    expect(nextNonNull(array, 0, 1, false)).toBe(1);
  });

  it('should return null if no non-null value is found', () => {
    const array = [null, null, null];
    expect(nextNonNull(array, 0, 1, false)).toBeNull();
  });
});
