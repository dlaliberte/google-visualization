/**
 * @fileoverview Promise utilities to replace @closure/promise/resolver
 * This module provides drop-in replacements for Closure promise utilities.
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
 * A resolver that can be used to resolve or reject a promise externally.
 * This mimics the Closure Resolver class.
 */
export class Resolver<T> {
  private _promise: Promise<T>;
  private _resolve!: (value: T | PromiseLike<T>) => void;
  private _reject!: (reason?: any) => void;
  private _settled = false;

  constructor() {
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  /**
   * Gets the promise associated with this resolver.
   * @returns The promise.
   */
  get promise(): Promise<T> {
    return this._promise;
  }

  /**
   * Resolves the promise with the given value.
   * @param value The value to resolve with.
   */
  resolve(value: T | PromiseLike<T>): void {
    if (this._settled) {
      return;
    }
    this._settled = true;
    this._resolve(value);
  }

  /**
   * Rejects the promise with the given reason.
   * @param reason The reason for rejection.
   */
  reject(reason?: any): void {
    if (this._settled) {
      return;
    }
    this._settled = true;
    this._reject(reason);
  }

  /**
   * Checks if the promise has been settled (resolved or rejected).
   * @returns true if the promise has been settled.
   */
  isSettled(): boolean {
    return this._settled;
  }
}

/**
 * Creates a new resolver.
 * @returns A new Resolver instance.
 */
export function createResolver<T>(): Resolver<T> {
  return new Resolver<T>();
}

/**
 * Creates a resolved promise.
 * @param value The value to resolve with.
 * @returns A resolved promise.
 */
export function resolve<T>(value: T | PromiseLike<T>): Promise<T> {
  return Promise.resolve(value);
}

/**
 * Creates a rejected promise.
 * @param reason The reason for rejection.
 * @returns A rejected promise.
 */
export function reject<T = never>(reason?: any): Promise<T> {
  return Promise.reject(reason);
}

/**
 * Creates a promise that resolves after a specified delay.
 * @param delay The delay in milliseconds.
 * @param value The value to resolve with (optional).
 * @returns A promise that resolves after the delay.
 */
export function delay<T>(delay: number, value?: T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

/**
 * Creates a promise that times out after a specified duration.
 * @param promise The promise to wrap.
 * @param timeout The timeout in milliseconds.
 * @param timeoutMessage The message for the timeout error.
 * @returns A promise that rejects if the timeout is reached.
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeout: number,
  timeoutMessage: string = 'Promise timed out'
): Promise<T> {
  return Promise.race([
    promise,
    delay(timeout).then(() => {
      throw new Error(timeoutMessage);
    })
  ]);
}

/**
 * Executes promises in sequence, one after another.
 * @param promises An array of promise factories.
 * @returns A promise that resolves with an array of results.
 */
export function sequence<T>(
  promises: Array<() => Promise<T>>
): Promise<T[]> {
  return promises.reduce(
    (chain, promiseFactory) =>
      chain.then((results) =>
        promiseFactory().then((result) => [...results, result])
      ),
    Promise.resolve([] as T[])
  );
}

/**
 * Retries a promise-returning function a specified number of times.
 * @param fn The function to retry.
 * @param maxRetries The maximum number of retries.
 * @param delay The delay between retries in milliseconds.
 * @returns A promise that resolves if any attempt succeeds.
 */
export function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  return fn().catch((error) => {
    if (maxRetries <= 0) {
      throw error;
    }
    return delay(delayMs).then(() => retry(fn, maxRetries - 1, delayMs));
  });
}
