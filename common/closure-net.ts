/**
 * @fileoverview Network utilities to replace @closure/net modules
 * This module provides drop-in replacements for commonly used Closure network functions.
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
 * A deferred object that can be resolved or rejected later.
 * This mimics the MochiKit Deferred class used by Closure.
 */
export class Deferred<T> {
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
   * Adds a callback for when the deferred is resolved.
   * @param callback The callback function.
   * @returns This deferred for chaining.
   */
  addCallback(callback: (value: T) => any): Deferred<T> {
    this._promise.then(callback);
    return this;
  }

  /**
   * Adds an errback for when the deferred is rejected.
   * @param errback The error callback function.
   * @returns This deferred for chaining.
   */
  addErrback(errback: (error: any) => any): Deferred<T> {
    this._promise.catch(errback);
    return this;
  }

  /**
   * Adds both callback and errback.
   * @param callback The success callback.
   * @param errback The error callback.
   * @returns This deferred for chaining.
   */
  addBoth(callback: (value: T) => any, errback?: (error: any) => any): Deferred<T> {
    this._promise.then(callback, errback);
    return this;
  }

  /**
   * Resolves the deferred with a value.
   * @param value The value to resolve with.
   */
  callback(value: T): void {
    if (this._settled) return;
    this._settled = true;
    this._resolve(value);
  }

  /**
   * Rejects the deferred with an error.
   * @param error The error to reject with.
   */
  errback(error: any): void {
    if (this._settled) return;
    this._settled = true;
    this._reject(error);
  }

  /**
   * Gets the underlying promise.
   * @returns The promise.
   */
  getPromise(): Promise<T> {
    return this._promise;
  }
}

/**
 * JavaScript loader utilities.
 */
export namespace jsloader {
  /**
   * Loads a JavaScript file.
   * @param url The URL to load.
   * @returns A deferred that resolves when the script is loaded.
   */
  export function load(url: string): Deferred<void> {
    const deferred = new Deferred<void>();

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onload = () => {
      deferred.callback(undefined);
    };

    script.onerror = (error) => {
      deferred.errback(new Error(`Failed to load script: ${url}`));
    };

    document.head.appendChild(script);

    return deferred;
  }

  /**
   * Loads multiple JavaScript files in parallel.
   * @param urls The URLs to load.
   * @returns A deferred that resolves when all scripts are loaded.
   */
  export function loadMany(urls: string[]): Deferred<void[]> {
    const deferred = new Deferred<void[]>();

    const promises = urls.map(url => load(url).getPromise());

    Promise.all(promises)
      .then(results => deferred.callback(results))
      .catch(error => deferred.errback(error));

    return deferred;
  }
}

/**
 * Creates a new Deferred instance.
 * @returns A new Deferred.
 */
export function createDeferred<T>(): Deferred<T> {
  return new Deferred<T>();
}
