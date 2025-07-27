/**
 * @fileoverview Closure replacement utilities
 * This module provides a centralized export of all Closure replacement utilities.
 */

// Array utilities
export * as arrayUtils from './array';

// Assertion utilities
export * as assertUtils from './assert';

// Object utilities
export * as objectUtils from './closure-object';

// Math utilities
export * as mathUtils from './closure-math';
export { Box, Range, Coordinate, Vec2 } from './closure-math';

// Disposable utilities
export * as disposableUtils from './disposable';
export { Disposable, IDisposable, DisposableGroup, DisposableScope } from './disposable';

// Event utilities
export * as eventUtils from './events';
export { EventTarget, BrowserEvent, EventHandler, EventType } from './events';

// DOM utilities
export * as domUtils from './closure-dom';
export { DomHelper, getDomHelper } from './closure-dom';

// Style utilities
export * as styleUtils from './style';

// Re-export commonly used functions with their original names for easier migration
export { forEach } from './array';
export { assert, assertIsElement, assertExists } from './assert';
export { clone, getKeys, isEmpty, extend } from './closure-object';
export { clamp, Box, Range, Coordinate } from './closure-math';
export { dispose, disposeAll } from './disposable';
export { setStyle, getComputedStyle, showElement, hideElement } from './style';
