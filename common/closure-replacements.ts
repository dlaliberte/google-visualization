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
export { Box, Range, Coordinate, Vec2, Rect, Size } from './closure-math';

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

// Color utilities
export * as colorUtils from './closure-color';
export { parse as parseColor, hexToRgb, rgbToHex, blend as blendColors } from './closure-color';

// String utilities
export * as stringUtils from './closure-string';
export { Const, createConst } from './closure-string';

// Promise utilities
export * as promiseUtils from './closure-promise';
export { Resolver, createResolver } from './closure-promise';

// I18n utilities
export * as i18nUtils from './closure-i18n';
export { hasGraphemeBreak, DateTimeFormat, TimeZone } from './closure-i18n';

// Network utilities
export * as netUtils from './closure-net';
export { Deferred, jsloader } from './closure-net';

// User agent utilities
export * as userAgentUtils from './closure-useragent';

// HTML utilities
export * as htmlUtils from './closure-html';
export { TrustedResourceUrl, createTrustedResourceUrl, formatWithParams } from './closure-html';

// Timer utilities
export * as timerUtils from './closure-timer';
export { Timer, callOnce, clear, debounce, throttle } from './closure-timer';

// PubSub utilities
export * as pubsubUtils from './closure-pubsub';
export { PubSub, createPubSub, subscribe, unsubscribe, publish } from './closure-pubsub';

// Tooltip utilities
export * as tooltipUtils from './closure-tooltip';
export { Tooltip, TooltipPosition, TooltipState } from './closure-tooltip';

// Re-export commonly used functions with their original names for easier migration
export { forEach } from './array';
export { assert, assertIsElement, assertExists } from './assert';
export { clone, getKeys, isEmpty, extend } from './closure-object';
export { clamp, Box, Range, Coordinate, Rect, Size } from './closure-math';
export { dispose, disposeAll } from './disposable';
export { setStyle, getComputedStyle, showElement, hideElement } from './style';
