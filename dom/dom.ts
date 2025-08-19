/**
 * DOM utility functions.
 *
 * This file provides utility functions for working with the DOM.
 * It replaces the Closure Library's dom/dom module.
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

import {DomHelper} from '../common/closure-dom';

// tslint:disable:ban-types Migration

// For use by external code.
type AnyDuringMigration = any;

/**
 * Cached DomHelper.
 */
let domHelper: DomHelper | null = null;

/**
 * Returns cached DomHelper.  Create if not yet defined.
 * @param opt_element Optional element to get the helper for.
 * @return The DomHelper.
 */
export function getDomHelper(opt_element?: Node): DomHelper {
  if (domHelper == null) {
    domHelper = new DomHelper();
  }
  return domHelper;
}

/**
 * Returns current document
 * @return The current document.
 */
export function getDocument(): Document {
  const dom = getDomHelper();
  return dom.getDocument();
}

/**
 * Returns the global context, typically the current window.
 * @return The global context.
 */
export function getGlobal(): {[key: string]: AnyDuringMigration} {
  const dom = getDomHelper();
  return dom.getWindow() as {[key: string]: AnyDuringMigration};
}

/**
 * Returns the current window, typically the global context.
 * @return The current window.
 */
export function getWindow(): Window {
  return getGlobal() as Window;
}

/**
 * Returns the location of the current page.
 * @return The location of the current page.
 */
export function getLocation(): string {
  return getDocument().location.href;
}

/**
 * Validates a given object is a dom element. Throws an exception if container
 * is not validated.
 * @param container A candidate dom object.
 * @return The container, with a stricter type.
 */
export function validateContainer(container: Element | null): Element {
  const dom = getDomHelper();
  if (!container || !dom.isNodeLike(container)) {
    throw new Error('Container is not defined');
  }
  return container;
}

/**
 * Removes all children from a node.
 * @param node The node to remove children from.
 */
export function removeChildren(node: Node): void {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

/**
 * Creates an element with the specified tag name.
 * @param tagName The tag name.
 * @return The created element.
 */
export function createElement(tagName: string): Element {
  return document.createElement(tagName);
}

/**
 * Creates a text node with the specified text.
 * @param text The text.
 * @return The created text node.
 */
export function createTextNode(text: string): Text {
  return document.createTextNode(text);
}

/**
 * Appends a child to a node.
 * @param parent The parent node.
 * @param child The child node.
 * @return The child node.
 */
export function appendChild<T extends Node>(parent: Node, child: T): T {
  parent.appendChild(child);
  return child;
}

/**
 * Inserts a node before a reference node.
 * @param parent The parent node.
 * @param newNode The node to insert.
 * @param refNode The reference node.
 * @return The inserted node.
 */
export function insertBefore<T extends Node>(parent: Node, newNode: T, refNode: Node | null): T {
  parent.insertBefore(newNode, refNode);
  return newNode;
}

/**
 * Inserts a node after a reference node.
 * @param parent The parent node.
 * @param newNode The node to insert.
 * @param refNode The reference node.
 * @return The inserted node.
 */
export function insertAfter<T extends Node>(parent: Node, newNode: T, refNode: Node | null): T {
  if (refNode) {
    if (refNode.nextSibling) {
      return insertBefore(parent, newNode, refNode.nextSibling);
    } else {
      return appendChild(parent, newNode);
    }
  } else {
    return insertBefore(parent, newNode, parent.firstChild);
  }
}

/**
 * Removes a node from its parent.
 * @param node The node to remove.
 * @return The removed node.
 */
export function removeNode<T extends Node>(node: T): T {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
  return node;
}

/**
 * Replaces a node with another node.
 * @param newNode The new node.
 * @param oldNode The node to replace.
 * @return The new node.
 */
export function replaceNode<T extends Node>(newNode: T, oldNode: Node): T {
  if (oldNode.parentNode) {
    oldNode.parentNode.replaceChild(newNode, oldNode);
  }
  return newNode;
}

/**
 * Gets the first child element of a node.
 * @param node The node.
 * @return The first child element, or null if none.
 */
export function getFirstElementChild(node: Node): Element | null {
  if (node.firstElementChild !== undefined) {
    return node.firstElementChild;
  }
  return getNextElementNode(node.firstChild, true);
}

/**
 * Gets the next element node.
 * @param node The node.
 * @param opt_includeNode Whether to include the node itself.
 * @return The next element node, or null if none.
 */
export function getNextElementNode(node: Node | null, opt_includeNode?: boolean): Element | null {
  if (!node) {
    return null;
  }
  if (opt_includeNode && node.nodeType === Node.ELEMENT_NODE) {
    return node as Element;
  }
  if (node.nextElementSibling !== undefined) {
    return node.nextElementSibling;
  }
  return getNextElementNode(node.nextSibling, false);
}

/**
 * Gets the last child element of a node.
 * @param node The node.
 * @return The last child element, or null if none.
 */
export function getLastElementChild(node: Node): Element | null {
  if (node.lastElementChild !== undefined) {
    return node.lastElementChild;
  }
  return getPreviousElementNode(node.lastChild, true);
}

/**
 * Gets the previous element node.
 * @param node The node.
 * @param opt_includeNode Whether to include the node itself.
 * @return The previous element node, or null if none.
 */
export function getPreviousElementNode(node: Node | null, opt_includeNode?: boolean): Element | null {
  if (!node) {
    return null;
  }
  if (opt_includeNode && node.nodeType === Node.ELEMENT_NODE) {
    return node as Element;
  }
  if (node.previousElementSibling !== undefined) {
    return node.previousElementSibling;
  }
  return getPreviousElementNode(node.previousSibling, false);
}

/**
 * Gets the next node in document order.
 * @param node The node.
 * @param opt_skipChildren Whether to skip the children of the node.
 * @return The next node in document order, or null if none.
 */
export function getNextNode(node: Node, opt_skipChildren?: boolean): Node | null {
  if (!opt_skipChildren && node.firstChild) {
    return node.firstChild;
  }
  if (!node.parentNode) {
    return null;
  }
  if (node.nextSibling) {
    return node.nextSibling;
  }
  return getNextNode(node.parentNode, true);
}

/**
 * Gets the previous node in document order.
 * @param node The node.
 * @return The previous node in document order, or null if none.
 */
export function getPreviousNode(node: Node): Node | null {
  if (!node) {
    return null;
  }
  if (node.previousSibling) {
    let n = node.previousSibling;
    while (n.lastChild) {
      n = n.lastChild;
    }
    return n;
  }
  return node.parentNode;
}

/**
 * Checks if a node contains another node.
 * @param parent The parent node.
 * @param descendant The descendant node.
 * @return True if the parent contains the descendant.
 */
export function contains(parent: Node, descendant: Node): boolean {
  if (parent.contains) {
    return parent.contains(descendant);
  }
  if (parent === descendant) {
    return true;
  }
  if (parent.compareDocumentPosition) {
    return !!(parent.compareDocumentPosition(descendant) & Node.DOCUMENT_POSITION_CONTAINED_BY);
  }
  while (descendant && parent !== descendant) {
    descendant = descendant.parentNode as Node;
  }
  return descendant === parent;
}
