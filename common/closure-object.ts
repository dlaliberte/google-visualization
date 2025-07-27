/**
 * @fileoverview Object utilities to replace @closure/object/object
 * This module provides drop-in replacements for commonly used Closure object functions.
 */

/**
 * Creates a shallow clone of an object.
 * @param obj The object to clone.
 * @returns A shallow clone of the object.
 */
export function clone<T extends Record<string, any>>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return [...obj] as T;
  }

  return { ...obj };
}

/**
 * Gets the keys of an object.
 * @param obj The object to get keys from.
 * @returns An array of the object's keys.
 */
export function getKeys(obj: Record<string, any>): string[] {
  return Object.keys(obj);
}

/**
 * Gets the values of an object.
 * @param obj The object to get values from.
 * @returns An array of the object's values.
 */
export function getValues<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}

/**
 * Checks if an object is empty (has no enumerable properties).
 * @param obj The object to check.
 * @returns true if the object is empty, false otherwise.
 */
export function isEmpty(obj: Record<string, any>): boolean {
  if (obj === null || obj === undefined) {
    return true;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

/**
 * Extends an object with properties from other objects.
 * @param target The target object to extend.
 * @param sources The source objects to copy properties from.
 * @returns The extended target object.
 */
export function extend<T extends Record<string, any>>(
  target: T,
  ...sources: Array<Partial<T>>
): T {
  for (const source of sources) {
    if (source) {
      Object.assign(target, source);
    }
  }
  return target;
}

/**
 * Creates a new object with properties from multiple source objects.
 * @param sources The source objects to merge.
 * @returns A new object with merged properties.
 */
export function merge<T extends Record<string, any>>(...sources: Array<Partial<T>>): T {
  return Object.assign({} as T, ...sources);
}

/**
 * Checks if an object has a specific property.
 * @param obj The object to check.
 * @param key The property key to look for.
 * @returns true if the object has the property, false otherwise.
 */
export function hasKey(obj: Record<string, any>, key: string): boolean {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Gets a property value from an object, with an optional default value.
 * @param obj The object to get the property from.
 * @param key The property key.
 * @param defaultValue The default value if the property doesn't exist.
 * @returns The property value or the default value.
 */
export function get<T>(
  obj: Record<string, any>,
  key: string,
  defaultValue?: T
): T | undefined {
  return hasKey(obj, key) ? obj[key] : defaultValue;
}

/**
 * Sets a property value on an object.
 * @param obj The object to set the property on.
 * @param key The property key.
 * @param value The value to set.
 */
export function set<T>(obj: Record<string, any>, key: string, value: T): void {
  obj[key] = value;
}

/**
 * Removes a property from an object.
 * @param obj The object to remove the property from.
 * @param key The property key to remove.
 * @returns true if the property was removed, false if it didn't exist.
 */
export function remove(obj: Record<string, any>, key: string): boolean {
  if (hasKey(obj, key)) {
    delete obj[key];
    return true;
  }
  return false;
}

/**
 * Iterates over an object's properties.
 * @param obj The object to iterate over.
 * @param fn The function to call for each property.
 * @param thisObj The object to use as 'this' in the function.
 */
export function forEach<T>(
  obj: Record<string, T>,
  fn: (this: any, value: T, key: string, obj: Record<string, T>) => void,
  thisObj?: any
): void {
  for (const key in obj) {
    if (hasKey(obj, key)) {
      fn.call(thisObj, obj[key], key, obj);
    }
  }
}

/**
 * Creates a new object by transforming the values of an existing object.
 * @param obj The object to transform.
 * @param fn The transformation function.
 * @param thisObj The object to use as 'this' in the function.
 * @returns A new object with transformed values.
 */
export function map<T, R>(
  obj: Record<string, T>,
  fn: (this: any, value: T, key: string, obj: Record<string, T>) => R,
  thisObj?: any
): Record<string, R> {
  const result: Record<string, R> = {};
  for (const key in obj) {
    if (hasKey(obj, key)) {
      result[key] = fn.call(thisObj, obj[key], key, obj);
    }
  }
  return result;
}

/**
 * Filters an object's properties based on a predicate function.
 * @param obj The object to filter.
 * @param fn The predicate function.
 * @param thisObj The object to use as 'this' in the function.
 * @returns A new object with filtered properties.
 */
export function filter<T>(
  obj: Record<string, T>,
  fn: (this: any, value: T, key: string, obj: Record<string, T>) => boolean,
  thisObj?: any
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (hasKey(obj, key) && fn.call(thisObj, obj[key], key, obj)) {
      result[key] = obj[key];
    }
  }
  return result;
}
