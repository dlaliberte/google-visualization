/**
 * @fileoverview Easing functions to replace @closure/fx/easing
 * This module provides drop-in replacements for commonly used Closure easing functions.
 */

/**
 * Ease in - starts slow and accelerates.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeIn(t: number): number {
  return t * t * t;
}

/**
 * Ease out - starts fast and decelerates.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Ease in-out - starts slow, accelerates, then decelerates.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInAndOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Linear easing - no acceleration or deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The same value (linear).
 */
export function linear(t: number): number {
  return t;
}

/**
 * Ease in quad - quadratic acceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInQuad(t: number): number {
  return t * t;
}

/**
 * Ease out quad - quadratic deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Ease in-out quad - quadratic acceleration and deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Ease in cubic - cubic acceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInCubic(t: number): number {
  return t * t * t;
}

/**
 * Ease out cubic - cubic deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Ease in-out cubic - cubic acceleration and deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Ease in sine - sinusoidal acceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInSine(t: number): number {
  return 1 - Math.cos((t * Math.PI) / 2);
}

/**
 * Ease out sine - sinusoidal deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeOutSine(t: number): number {
  return Math.sin((t * Math.PI) / 2);
}

/**
 * Ease in-out sine - sinusoidal acceleration and deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Ease in exponential - exponential acceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInExpo(t: number): number {
  return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}

/**
 * Ease out exponential - exponential deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Ease in-out exponential - exponential acceleration and deceleration.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInOutExpo(t: number): number {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

/**
 * Ease in back - back easing with overshoot on entry.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * t * t * t - c1 * t * t;
}

/**
 * Ease out back - back easing with overshoot on exit.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/**
 * Ease in-out back - back easing with overshoot on both ends.
 * @param t The time parameter (0 to 1).
 * @returns The eased value.
 */
export function easeInOutBack(t: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
}

// Aliases for common easing functions to match Closure API
export const ease = easeInAndOut;
export const easeInCurve = easeIn;
export const easeOutCurve = easeOut;
