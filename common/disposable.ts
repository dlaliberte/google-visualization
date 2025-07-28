/**
 * @fileoverview Disposable utilities to replace @closure/disposable/disposable
 * This module provides drop-in replacements for commonly used Closure disposable functions.
 */

/**
 * Interface for objects that can be disposed.
 */
export interface IDisposable {
  dispose(): void;
  isDisposed(): boolean;
}

/**
 * Base class for disposable objects.
 */
export class Disposable implements IDisposable {
  private disposed = false;
  private registeredDisposables: any[] = [];

  /**
   * Disposes of the object. Subclasses should override disposeInternal.
   */
  dispose(): void {
    if (!this.disposed) {
      this.disposed = true;
      this.disposeInternal();
      // Dispose of all registered disposables
      for (const disposable of this.registeredDisposables) {
        dispose(disposable);
      }
      this.registeredDisposables.length = 0;
    }
  }

  /**
   * Checks if the object has been disposed.
   * @returns true if the object has been disposed.
   */
  isDisposed(): boolean {
    return this.disposed;
  }

  /**
   * Registers a disposable object to be disposed when this object is disposed.
   * @param disposable The disposable object to register.
   * @returns The disposable object (for chaining).
   */
  protected registerDisposable<T>(disposable: T): T {
    if (this.disposed) {
      throw new Error('Cannot register disposable on disposed object');
    }
    this.registeredDisposables.push(disposable);
    return disposable;
  }

  /**
   * Internal disposal method. Subclasses should override this method
   * to perform their cleanup logic.
   */
  protected disposeInternal(): void {
    // Override in subclasses
  }
}

/**
 * Disposes of an object if it implements the IDisposable interface.
 * @param obj The object to dispose.
 */
export function dispose(obj: any): void {
  if (obj && typeof obj.dispose === 'function') {
    obj.dispose();
  }
}

/**
 * Disposes of multiple objects.
 * @param objects The objects to dispose.
 */
export function disposeAll(...objects: any[]): void {
  for (const obj of objects) {
    dispose(obj);
  }
}

/**
 * A utility class for managing multiple disposable objects.
 */
export class DisposableGroup extends Disposable {
  private disposables: IDisposable[] = [];

  /**
   * Adds a disposable object to the group.
   * @param disposable The disposable to add.
   */
  add(disposable: IDisposable): void {
    if (this.isDisposed()) {
      throw new Error('Cannot add to disposed group');
    }
    this.disposables.push(disposable);
  }

  /**
   * Removes a disposable object from the group.
   * @param disposable The disposable to remove.
   * @returns true if the disposable was found and removed.
   */
  remove(disposable: IDisposable): boolean {
    const index = this.disposables.indexOf(disposable);
    if (index >= 0) {
      this.disposables.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Gets the number of disposables in the group.
   * @returns The number of disposables.
   */
  size(): number {
    return this.disposables.length;
  }

  /**
   * Disposes of all objects in the group.
   */
  protected disposeInternal(): void {
    for (const disposable of this.disposables) {
      dispose(disposable);
    }
    this.disposables.length = 0;
  }
}

/**
 * A utility for automatically disposing of objects when a scope ends.
 */
export class DisposableScope extends Disposable {
  private disposables: any[] = [];

  /**
   * Adds an object to be disposed when the scope ends.
   * @param obj The object to dispose.
   * @returns The object (for chaining).
   */
  addDisposable<T>(obj: T): T {
    if (this.isDisposed()) {
      throw new Error('Cannot add to disposed scope');
    }
    this.disposables.push(obj);
    return obj;
  }

  /**
   * Disposes of all objects in the scope.
   */
  protected disposeInternal(): void {
    disposeAll(...this.disposables);
    this.disposables.length = 0;
  }
}

/**
 * Creates a function that will dispose of the given objects when called.
 * @param objects The objects to dispose.
 * @returns A disposal function.
 */
export function createDisposer(...objects: any[]): () => void {
  return () => disposeAll(...objects);
}

/**
 * Checks if an object is disposable (has a dispose method).
 * @param obj The object to check.
 * @returns true if the object is disposable.
 */
export function isDisposable(obj: any): obj is IDisposable {
  return obj && typeof obj.dispose === 'function';
}
