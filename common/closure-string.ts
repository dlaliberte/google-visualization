/**
 * @fileoverview String utilities to replace @closure/string/string
 * This module provides drop-in replacements for commonly used Closure string functions.
 */

/**
 * A type for string constants that mimics Closure's Const type.
 * This is used for trusted string constants.
 */
export type Const = string & { readonly __brand: 'Const' };

/**
 * Creates a Const from a string literal.
 * @param value The string literal value.
 * @returns A Const value.
 */
export function createConst(value: string): Const {
  return value as Const;
}

/**
 * Checks if a string is empty or contains only whitespace.
 * @param str The string to check.
 * @returns true if the string is empty or whitespace-only.
 */
export function isEmptyOrWhitespace(str: string): boolean {
  return !str || /^\s*$/.test(str);
}

/**
 * Makes a string safe by escaping HTML characters.
 * @param str The string to make safe.
 * @returns The escaped string.
 */
export function makeSafe(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Repeats a string a specified number of times.
 * @param str The string to repeat.
 * @param count The number of times to repeat.
 * @returns The repeated string.
 */
export function repeat(str: string, count: number): string {
  if (count < 0) {
    throw new Error('Count cannot be negative');
  }
  return str.repeat(count);
}

/**
 * Trims whitespace from both ends of a string.
 * @param str The string to trim.
 * @returns The trimmed string.
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Trims whitespace from the left end of a string.
 * @param str The string to trim.
 * @returns The trimmed string.
 */
export function trimLeft(str: string): string {
  return str.trimStart();
}

/**
 * Trims whitespace from the right end of a string.
 * @param str The string to trim.
 * @returns The trimmed string.
 */
export function trimRight(str: string): string {
  return str.trimEnd();
}

/**
 * Pads a string to a specified length with a pad string.
 * @param str The string to pad.
 * @param length The target length.
 * @param padString The string to pad with (default: space).
 * @returns The padded string.
 */
export function padStart(str: string, length: number, padString: string = ' '): string {
  return str.padStart(length, padString);
}

/**
 * Pads a string to a specified length with a pad string at the end.
 * @param str The string to pad.
 * @param length The target length.
 * @param padString The string to pad with (default: space).
 * @returns The padded string.
 */
export function padEnd(str: string, length: number, padString: string = ' '): string {
  return str.padEnd(length, padString);
}

/**
 * Checks if a string starts with a specified prefix.
 * @param str The string to check.
 * @param prefix The prefix to look for.
 * @returns true if the string starts with the prefix.
 */
export function startsWith(str: string, prefix: string): boolean {
  return str.startsWith(prefix);
}

/**
 * Checks if a string ends with a specified suffix.
 * @param str The string to check.
 * @param suffix The suffix to look for.
 * @returns true if the string ends with the suffix.
 */
export function endsWith(str: string, suffix: string): boolean {
  return str.endsWith(suffix);
}

/**
 * Checks if a string contains a specified substring.
 * @param str The string to check.
 * @param substring The substring to look for.
 * @returns true if the string contains the substring.
 */
export function contains(str: string, substring: string): boolean {
  return str.includes(substring);
}

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to camelCase.
 * @param str The string to convert.
 * @returns The camelCase string.
 */
export function toCamelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
}

/**
 * Converts a string to kebab-case.
 * @param str The string to convert.
 * @returns The kebab-case string.
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to snake_case.
 * @param str The string to convert.
 * @returns The snake_case string.
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Escapes special regex characters in a string.
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Removes HTML tags from a string.
 * @param str The string to strip tags from.
 * @returns The string without HTML tags.
 */
export function stripTags(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Truncates a string to a specified length.
 * @param str The string to truncate.
 * @param maxLength The maximum length.
 * @param suffix The suffix to add if truncated (default: '...').
 * @returns The truncated string.
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Splits a string into words.
 * @param str The string to split.
 * @returns An array of words.
 */
export function words(str: string): string[] {
  return str.match(/\b\w+\b/g) || [];
}

/**
 * Counts the number of occurrences of a substring in a string.
 * @param str The string to search in.
 * @param substring The substring to count.
 * @returns The number of occurrences.
 */
export function countOccurrences(str: string, substring: string): number {
  if (!substring) return 0;
  let count = 0;
  let index = 0;
  while ((index = str.indexOf(substring, index)) !== -1) {
    count++;
    index += substring.length;
  }
  return count;
}

/**
 * Reverses a string.
 * @param str The string to reverse.
 * @returns The reversed string.
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Checks if a string is a palindrome.
 * @param str The string to check.
 * @returns true if the string is a palindrome.
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverse(cleaned);
}

/**
 * Formats a string using template literals syntax.
 * @param template The template string.
 * @param values The values to substitute.
 * @returns The formatted string.
 */
export function format(template: string, values: Record<string, any>): string {
  return template.replace(/\${(\w+)}/g, (match, key) => {
    return values.hasOwnProperty(key) ? String(values[key]) : match;
  });
}
