/**
 * @fileoverview I18n utilities to replace @closure/i18n modules
 * This module provides drop-in replacements for commonly used Closure i18n functions.
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
 * Simple grapheme break detection.
 * This is a simplified version that handles basic cases.
 * For full Unicode grapheme cluster support, consider using a proper library like grapheme-splitter.
 *
 * @param prevCode The character code of the previous character.
 * @param nextCode The character code of the next character.
 * @param extended Whether to use extended grapheme cluster rules (ignored in this simple implementation).
 * @returns true if there should be a grapheme break between the characters.
 */
export function hasGraphemeBreak(prevCode: number, nextCode: number, extended?: boolean): boolean {
  // Simplified grapheme break rules
  // This handles basic cases but doesn't implement the full Unicode Grapheme Cluster Boundary rules

  // Don't break between CR and LF
  if (prevCode === 0x0D && nextCode === 0x0A) {
    return false;
  }

  // Break after control characters (except CR before LF)
  if (isControl(prevCode)) {
    return true;
  }

  // Break before control characters
  if (isControl(nextCode)) {
    return true;
  }

  // Don't break between regional indicator symbols (flags)
  if (isRegionalIndicator(prevCode) && isRegionalIndicator(nextCode)) {
    return false;
  }

  // Don't break before extending characters (combining marks, etc.)
  if (isExtend(nextCode)) {
    return false;
  }

  // Don't break before spacing marks
  if (isSpacingMark(nextCode)) {
    return false;
  }

  // Default: allow break
  return true;
}

/**
 * Checks if a character code represents a control character.
 */
function isControl(code: number): boolean {
  return (code >= 0x00 && code <= 0x1F) ||
         (code >= 0x7F && code <= 0x9F) ||
         code === 0x200C || // ZWNJ
         code === 0x200D;   // ZWJ
}

/**
 * Checks if a character code represents a regional indicator symbol.
 */
function isRegionalIndicator(code: number): boolean {
  return code >= 0x1F1E6 && code <= 0x1F1FF;
}

/**
 * Checks if a character code represents an extending character (combining mark).
 */
function isExtend(code: number): boolean {
  // Simplified check for common combining marks
  return (code >= 0x0300 && code <= 0x036F) || // Combining Diacritical Marks
         (code >= 0x1AB0 && code <= 0x1AFF) || // Combining Diacritical Marks Extended
         (code >= 0x1DC0 && code <= 0x1DFF) || // Combining Diacritical Marks Supplement
         (code >= 0x20D0 && code <= 0x20FF) || // Combining Diacritical Marks for Symbols
         (code >= 0xFE20 && code <= 0xFE2F);   // Combining Half Marks
}

/**
 * Checks if a character code represents a spacing mark.
 */
function isSpacingMark(code: number): boolean {
  // Simplified check for spacing combining marks
  return (code >= 0x0903 && code <= 0x0903) || // Devanagari
         (code >= 0x093B && code <= 0x093B) ||
         (code >= 0x093E && code <= 0x0940) ||
         (code >= 0x0949 && code <= 0x094C);
}

/**
 * Simple date/time formatting utilities.
 */
export class DateTimeFormat {
  private locale: string;
  private pattern: string;

  /**
   * Standard date/time format patterns.
   */
  static readonly Format = {
    FULL_DATE: 'EEEE, MMMM d, y',
    LONG_DATE: 'MMMM d, y',
    MEDIUM_DATE: 'MMM d, y',
    SHORT_DATE: 'M/d/yy',
    FULL_TIME: 'h:mm:ss a zzzz',
    LONG_TIME: 'h:mm:ss a z',
    MEDIUM_TIME: 'h:mm:ss a',
    SHORT_TIME: 'h:mm a',
    FULL_DATETIME: 'EEEE, MMMM d, y \'at\' h:mm:ss a zzzz',
    LONG_DATETIME: 'MMMM d, y \'at\' h:mm:ss a z',
    MEDIUM_DATETIME: 'MMM d, y, h:mm:ss a',
    SHORT_DATETIME: 'M/d/yy, h:mm a',
  } as const;

  constructor(pattern: string, locale: string = 'en-US') {
    this.pattern = pattern;
    this.locale = locale;
  }

  /**
   * Formats a date according to the pattern.
   * This is a simplified implementation.
   */
  format(date: Date): string {
    // For now, just use the browser's built-in formatting
    // A full implementation would parse the pattern and format accordingly
    try {
      return new Intl.DateTimeFormat(this.locale).format(date);
    } catch (e) {
      return date.toString();
    }
  }
}

/**
 * Simple timezone handling.
 */
export class TimeZone {
  private timeZoneId: string;

  constructor(timeZoneId: string) {
    this.timeZoneId = timeZoneId;
  }

  /**
   * Gets the timezone ID.
   */
  getTimeZoneId(): string {
    return this.timeZoneId;
  }

  /**
   * Gets the offset from UTC in minutes.
   */
  getOffset(date: Date): number {
    // Simplified implementation
    return -date.getTimezoneOffset();
  }
}

/**
 * Creates a DateTimeFormat instance.
 */
export function createDateTimeFormat(pattern: string, locale?: string): DateTimeFormat {
  return new DateTimeFormat(pattern, locale);
}

/**
 * Creates a TimeZone instance.
 */
export function createTimeZone(timeZoneId: string): TimeZone {
  return new TimeZone(timeZoneId);
}
