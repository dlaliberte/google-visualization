import { describe, it, expect } from 'vitest';
import {
  removeFirstElement,
  removeLastElement,
  arraysAlmostEqual,
  arrayMultiSlice,
  binarySearch,
  peekArray,
  mergeArrays,
  rangeMap,
  nextNonNull,
  forEach,
  defaultCompare,
  contains,
  remove,
  removeAt,
  insertAt,
  findIndex,
  find,
  map,
  filter,
  every,
  some,
  reduce,
  sort,
  clone,
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

// Tests for binarySearch
describe('binarySearch', () => {
  it('should return the index of the target element', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
  });

  it('should return negative insertion point for non-existent element', () => {
    expect(binarySearch([1, 2, 4, 5], 3)).toBe(-3);
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
      { value: 2, ar1: 0, ar2: 0 },
      { value: 3, ar1: 1, ar2: 0 },
      { value: 4, ar1: 1, ar2: 1 },
      { value: 5, ar1: 2, ar2: 1 },
      { value: 6, ar1: 2, ar2: 2 },
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

// Tests for forEach
describe('forEach', () => {
  it('should iterate over an array', () => {
    const arr = [1, 2, 3];
    const result: number[] = [];

    forEach(arr, (item) => {
      result.push(item * 2);
    });

    expect(result).toEqual([2, 4, 6]);
  });
});

// Tests for defaultCompare
describe('defaultCompare', () => {
  it('should compare numbers', () => {
    expect(defaultCompare(1, 2)).toBeLessThan(0);
    expect(defaultCompare(2, 1)).toBeGreaterThan(0);
    expect(defaultCompare(1, 1)).toBe(0);
  });

  it('should compare strings', () => {
    expect(defaultCompare('a', 'b')).toBeLessThan(0);
    expect(defaultCompare('b', 'a')).toBeGreaterThan(0);
    expect(defaultCompare('a', 'a')).toBe(0);
  });
});

// Tests for contains
describe('contains', () => {
  it('should check if an array contains an element', () => {
    expect(contains([1, 2, 3], 2)).toBe(true);
    expect(contains([1, 2, 3], 4)).toBe(false);
  });
});

// Tests for remove
describe('remove', () => {
  it('should remove an element from an array', () => {
    const arr = [1, 2, 3];
    const result = remove(arr, 2);

    expect(result).toBe(true);
    expect(arr).toEqual([1, 3]);
  });

  it('should return false if the element is not in the array', () => {
    const arr = [1, 2, 3];
    const result = remove(arr, 4);

    expect(result).toBe(false);
    expect(arr).toEqual([1, 2, 3]);
  });
});

// Tests for removeAt
describe('removeAt', () => {
  it('should remove an element at the specified index', () => {
    const arr = [1, 2, 3];
    const result = removeAt(arr, 1);

    expect(result).toBe(2);
    expect(arr).toEqual([1, 3]);
  });

  it('should return undefined if the index is out of bounds', () => {
    const arr = [1, 2, 3];
    const result = removeAt(arr, 3);

    expect(result).toBeUndefined();
    expect(arr).toEqual([1, 2, 3]);
  });
});

// Tests for insertAt
describe('insertAt', () => {
  it('should insert an element at the specified index', () => {
    const arr = [1, 2, 3];
    insertAt(arr, 4, 1);

    expect(arr).toEqual([1, 4, 2, 3]);
  });
});

// Tests for findIndex
describe('findIndex', () => {
  it('should find the index of an element that satisfies a condition', () => {
    const arr = [1, 2, 3];
    const result = findIndex(arr, (item) => item > 1);

    expect(result).toBe(1);
  });

  it('should return -1 if no element satisfies the condition', () => {
    const arr = [1, 2, 3];
    const result = findIndex(arr, (item) => item > 3);

    expect(result).toBe(-1);
  });
});

// Tests for find
describe('find', () => {
  it('should find an element that satisfies a condition', () => {
    const arr = [1, 2, 3];
    const result = find(arr, (item) => item > 1);

    expect(result).toBe(2);
  });

  it('should return undefined if no element satisfies the condition', () => {
    const arr = [1, 2, 3];
    const result = find(arr, (item) => item > 3);

    expect(result).toBeUndefined();
  });
});

// Tests for map
describe('map', () => {
  it('should map an array to a new array', () => {
    const arr = [1, 2, 3];
    const result = map(arr, (item) => item * 2);

    expect(result).toEqual([2, 4, 6]);
  });
});

// Tests for filter
describe('filter', () => {
  it('should filter an array', () => {
    const arr = [1, 2, 3];
    const result = filter(arr, (item) => item > 1);

    expect(result).toEqual([2, 3]);
  });
});

// Tests for every
describe('every', () => {
  it('should check if every element satisfies a condition', () => {
    const arr = [1, 2, 3];

    expect(every(arr, (item) => item > 0)).toBe(true);
    expect(every(arr, (item) => item > 1)).toBe(false);
  });
});

// Tests for some
describe('some', () => {
  it('should check if some element satisfies a condition', () => {
    const arr = [1, 2, 3];

    expect(some(arr, (item) => item > 2)).toBe(true);
    expect(some(arr, (item) => item > 3)).toBe(false);
  });
});

// Tests for reduce
describe('reduce', () => {
  it('should reduce an array to a single value', () => {
    const arr = [1, 2, 3];
    const result = reduce(arr, (prev, curr) => prev + curr, 0);

    expect(result).toBe(6);
  });
});

// Tests for sort
describe('sort', () => {
  it('should sort an array', () => {
    const arr = [3, 1, 2];
    const result = sort([...arr]); // Create a copy to avoid modifying the original

    expect(result).toEqual([1, 2, 3]);
  });

  it('should sort an array with a custom comparison function', () => {
    const arr = [3, 1, 2];
    const result = sort([...arr], (a, b) => b - a); // Create a copy to avoid modifying the original

    expect(result).toEqual([3, 2, 1]);
  });
});

// Tests for clone
describe('clone', () => {
  it('should create a shallow clone of an array', () => {
    const arr = [1, 2, 3];
    const result = clone(arr);

    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(arr);
  });
});
