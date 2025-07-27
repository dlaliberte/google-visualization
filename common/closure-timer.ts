/**
 * @fileoverview Timer utilities to replace @closure/timer/timer
 * This module provides drop-in replacements for commonly used Closure timer functions.
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

import { Disposable } from './disposable';

/**
 * A timer that can be started, stopped, and disposed.
 * This mimics the Closure Timer class.
 */
export class Timer extends Disposable {
  private intervalId: number | null = null;
  private timeoutId: number | null = null;
  private interval: number;
  private callback: () => void;
  private isRunning = false;

  /**
   * Creates a new Timer.
   * @param interval The interval in milliseconds.
   * @param callback The callback function to execute.
   */
  constructor(interval: number = 1000, callback?: () => void) {
    super();
    this.interval = interval;
    this.callback = callback || (() => {});
  }

  /**
   * Starts the timer.
   */
  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.intervalId = window.setInterval(() => {
      if (this.isRunning) {
        this.callback();
      }
    }, this.interval);
  }

  /**
   * Stops the timer.
   */
  stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Sets the interval for the timer.
   * @param interval The new interval in milliseconds.
   */
  setInterval(interval: number): void {
    this.interval = interval;
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  /**
   * Gets the current interval.
   * @returns The interval in milliseconds.
   */
  getInterval(): number {
    return this.interval;
  }

  /**
   * Checks if the timer is running.
   * @returns true if the timer is running.
   */
  isEnabled(): boolean {
    return this.isRunning;
  }

  /**
   * Starts the timer with a one-time delay.
   * @param delay The delay in milliseconds before starting.
   */
  startWithDelay(delay: number): void {
    if (this.isRunning) {
      return;
    }

    this.timeoutId = window.setTimeout(() => {
      this.timeoutId = null;
      this.start();
    }, delay);
  }

  /**
   * Executes the callback once after a delay.
   * @param delay The delay in milliseconds.
   */
  fireOnce(delay: number): void {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.timeoutId = null;
      this.callback();
    }, delay);
  }

  /**
   * Disposes of the timer, stopping it and cleaning up resources.
   */
  protected disposeInternal(): void {
    this.stop();
    super.disposeInternal();
  }
}

/**
 * Creates a timer that executes a function after a delay.
 * @param callback The function to execute.
 * @param delay The delay in milliseconds.
 * @returns The timeout ID.
 */
export function callOnce(callback: () => void, delay: number): number {
  return window.setTimeout(callback, delay);
}

/**
 * Clears a timeout created by callOnce.
 * @param timeoutId The timeout ID to clear.
 */
export function clear(timeoutId: number): void {
  window.clearTimeout(timeoutId);
}

/**
 * Creates a timer that executes a function repeatedly.
 * @param callback The function to execute.
 * @param interval The interval in milliseconds.
 * @returns The interval ID.
 */
export function callRepeated(callback: () => void, interval: number): number {
  return window.setInterval(callback, interval);
}

/**
 * Clears an interval created by callRepeated.
 * @param intervalId The interval ID to clear.
 */
export function clearRepeated(intervalId: number): void {
  window.clearInterval(intervalId);
}

/**
 * Delays the execution of a function.
 * @param callback The function to execute.
 * @param delay The delay in milliseconds.
 * @returns A promise that resolves after the delay.
 */
export function delay(callback: () => void, delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
}

/**
 * Creates a debounced version of a function.
 * @param callback The function to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
}

/**
 * Creates a throttled version of a function.
 * @param callback The function to throttle.
 * @param interval The throttle interval in milliseconds.
 * @returns The throttled function.
 */
export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: number | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastCall >= interval) {
      lastCall = now;
      callback(...args);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        lastCall = Date.now();
        callback(...args);
      }, interval - (now - lastCall));
    }
  };
}
