/**
 * DOM assertion utilities.
 *
 * This file provides assertion functions for DOM elements.
 * It replaces the Closure Library's dom assertions.
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

import {assert} from './assert';

/**
 * Asserts that the given value is an Element.
 * @param value The value to check.
 * @param opt_message Optional message to display if the assertion fails.
 * @return The value, cast as an Element.
 * @throws {Error} If the value is not an Element.
 */
export function assertIsElement(
  value: unknown,
  opt_message?: string
): Element {
  if (!isElement(value)) {
    assert(
      false,
      opt_message || 'Argument is not an Element'
    );
  }
  return value as Element;
}

/**
 * Checks if the given value is an Element.
 * @param value The value to check.
 * @return Whether the value is an Element.
 */
function isElement(value: unknown): boolean {
  return !!(value && (value as Element).nodeType === Node.ELEMENT_NODE);
}

/**
 * Asserts that the given value is an HTML Element.
 * @param value The value to check.
 * @param opt_message Optional message to display if the assertion fails.
 * @return The value, cast as an HTMLElement.
 * @throws {Error} If the value is not an HTMLElement.
 */
export function assertIsHtmlElement(
  value: unknown,
  opt_message?: string
): HTMLElement {
  if (!isHtmlElement(value)) {
    assert(
      false,
      opt_message || 'Argument is not an HTML Element'
    );
  }
  return value as HTMLElement;
}

/**
 * Checks if the given value is an HTML Element.
 * @param value The value to check.
 * @return Whether the value is an HTML Element.
 */
function isHtmlElement(value: unknown): boolean {
  return !!(value && (value as HTMLElement).nodeType === Node.ELEMENT_NODE);
}

/**
 * Asserts that the given value is a Text node.
 * @param value The value to check.
 * @param opt_message Optional message to display if the assertion fails.
 * @return The value, cast as a Text node.
 * @throws {Error} If the value is not a Text node.
 */
export function assertIsTextNode(
  value: unknown,
  opt_message?: string
): Text {
  if (!isTextNode(value)) {
    assert(
      false,
      opt_message || 'Argument is not a Text node'
    );
  }
  return value as Text;
}

/**
 * Checks if the given value is a Text node.
 * @param value The value to check.
 * @return Whether the value is a Text node.
 */
function isTextNode(value: unknown): boolean {
  return !!(value && (value as Text).nodeType === Node.TEXT_NODE);
}

/**
 * Asserts that the given value is a Document.
 * @param value The value to check.
 * @param opt_message Optional message to display if the assertion fails.
 * @return The value, cast as a Document.
 * @throws {Error} If the value is not a Document.
 */
export function assertIsDocument(
  value: unknown,
  opt_message?: string
): Document {
  if (!isDocument(value)) {
    assert(
      false,
      opt_message || 'Argument is not a Document'
    );
  }
  return value as Document;
}

/**
 * Checks if the given value is a Document.
 * @param value The value to check.
 * @return Whether the value is a Document.
 */
function isDocument(value: unknown): boolean {
  return !!(value && (value as Document).nodeType === Node.DOCUMENT_NODE);
}

/**
 * Asserts that the given value is a Window.
 * @param value The value to check.
 * @param opt_message Optional message to display if the assertion fails.
 * @return The value, cast as a Window.
 * @throws {Error} If the value is not a Window.
 */
export function assertIsWindow(
  value: unknown,
  opt_message?: string
): Window {
  if (!isWindow(value)) {
    assert(
      false,
      opt_message || 'Argument is not a Window'
    );
  }
  return value as Window;
}

/**
 * Checks if the given value is a Window.
 * @param value The value to check.
 * @return Whether the value is a Window.
 */
function isWindow(value: unknown): boolean {
  return !!(
    value &&
    (value as Window).window === value &&
    (value as Window).document
  );
}
