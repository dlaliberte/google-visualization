/**
 * @fileoverview Singleton utilities to replace @closure/singleton/singleton
 * This module provides drop-in replacements for commonly used Closure singleton utilities.
 */

/**
 * A map to store singleton instances.
 */
const singletonInstances = new Map<Function, any>();

/**
 * Gets or creates a singleton instance of the given constructor.
 * @param ctor The constructor function.
 * @param args Arguments to pass to the constructor.
 * @returns The singleton instance.
 */
export function getInstance<T>(ctor: new (...args: any[]) => T, ...args: any[]): T {
  if (!singletonInstances.has(ctor)) {
    singletonInstances.set(ctor, new ctor(...args));
  }
  return singletonInstances.get(ctor);
}

/**
 * Clears all singleton instances. Useful for testing.
 */
export function clearInstances(): void {
  singletonInstances.clear();
}

/**
 * Checks if a singleton instance exists for the given constructor.
 * @param ctor The constructor function.
 * @returns True if an instance exists.
 */
export function hasInstance(ctor: Function): boolean {
  return singletonInstances.has(ctor);
}

/**
 * Removes a singleton instance for the given constructor.
 * @param ctor The constructor function.
 * @returns True if an instance was removed.
 */
export function removeInstance(ctor: Function): boolean {
  return singletonInstances.delete(ctor);
}

/**
 * Gets the number of singleton instances.
 * @returns The number of instances.
 */
export function getInstanceCount(): number {
  return singletonInstances.size;
}
