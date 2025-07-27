/**
 * @fileoverview DOM utilities to replace @closure/dom/dom
 * This module provides drop-in replacements for commonly used Closure DOM functions.
 */

import { assertIsElement } from './assert';

/**
 * DOM helper class that provides utility methods for DOM manipulation.
 */
export class DomHelper {
  private document: Document;

  constructor(document: Document = window.document) {
    this.document = document;
  }

  /**
   * Gets the document associated with this DOM helper.
   * @returns The document.
   */
  getDocument(): Document {
    return this.document;
  }

  /**
   * Gets the window associated with this DOM helper.
   * @returns The window.
   */
  getWindow(): Window {
    return this.document.defaultView || window;
  }

  /**
   * Creates a new element.
   * @param tagName The tag name.
   * @param attributes Optional attributes to set.
   * @param textContent Optional text content.
   * @returns The created element.
   */
  createElement(
    tagName: string,
    attributes?: Record<string, string>,
    textContent?: string
  ): Element {
    const element = this.document.createElement(tagName);

    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
      }
    }

    if (textContent !== undefined) {
      element.textContent = textContent;
    }

    return element;
  }

  /**
   * Gets an element by its ID.
   * @param id The element ID.
   * @returns The element or null if not found.
   */
  getElementById(id: string): Element | null {
    return this.document.getElementById(id);
  }

  /**
   * Gets elements by tag name.
   * @param tagName The tag name.
   * @param parent Optional parent element to search within.
   * @returns A collection of elements.
   */
  getElementsByTagName(tagName: string, parent?: Element): HTMLCollectionOf<Element> {
    const root = parent || this.document;
    return root.getElementsByTagName(tagName);
  }

  /**
   * Gets elements by class name.
   * @param className The class name.
   * @param parent Optional parent element to search within.
   * @returns A collection of elements.
   */
  getElementsByClassName(className: string, parent?: Element): HTMLCollectionOf<Element> {
    const root = parent || this.document;
    return root.getElementsByClassName(className);
  }

  /**
   * Queries for a single element using a CSS selector.
   * @param selector The CSS selector.
   * @param parent Optional parent element to search within.
   * @returns The first matching element or null.
   */
  querySelector(selector: string, parent?: Element): Element | null {
    const root = parent || this.document;
    return root.querySelector(selector);
  }

  /**
   * Queries for all elements using a CSS selector.
   * @param selector The CSS selector.
   * @param parent Optional parent element to search within.
   * @returns A list of matching elements.
   */
  querySelectorAll(selector: string, parent?: Element): NodeListOf<Element> {
    const root = parent || this.document;
    return root.querySelectorAll(selector);
  }

  /**
   * Appends a child element to a parent.
   * @param parent The parent element.
   * @param child The child element to append.
   */
  appendChild(parent: Element, child: Element): void {
    parent.appendChild(child);
  }

  /**
   * Removes an element from its parent.
   * @param element The element to remove.
   */
  removeNode(element: Element): void {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Inserts an element before another element.
   * @param newElement The element to insert.
   * @param referenceElement The reference element.
   */
  insertBefore(newElement: Element, referenceElement: Element): void {
    if (referenceElement.parentNode) {
      referenceElement.parentNode.insertBefore(newElement, referenceElement);
    }
  }

  /**
   * Replaces an element with another element.
   * @param newElement The new element.
   * @param oldElement The element to replace.
   */
  replaceNode(newElement: Element, oldElement: Element): void {
    if (oldElement.parentNode) {
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
  }

  /**
   * Sets the text content of an element.
   * @param element The element.
   * @param text The text content.
   */
  setTextContent(element: Element, text: string): void {
    element.textContent = text;
  }

  /**
   * Gets the text content of an element.
   * @param element The element.
   * @returns The text content.
   */
  getTextContent(element: Element): string {
    return element.textContent || '';
  }

  /**
   * Sets the inner HTML of an element.
   * @param element The element.
   * @param html The HTML content.
   */
  setInnerHtml(element: Element, html: string): void {
    element.innerHTML = html;
  }

  /**
   * Gets the inner HTML of an element.
   * @param element The element.
   * @returns The HTML content.
   */
  getInnerHtml(element: Element): string {
    return element.innerHTML;
  }
}

/**
 * Default DOM helper instance.
 */
let defaultDomHelper: DomHelper | null = null;

/**
 * Gets the default DOM helper instance.
 * @returns The default DOM helper.
 */
export function getDomHelper(): DomHelper {
  if (!defaultDomHelper) {
    defaultDomHelper = new DomHelper();
  }
  return defaultDomHelper;
}

/**
 * Sets the default DOM helper instance.
 * @param domHelper The DOM helper to set as default.
 */
export function setDomHelper(domHelper: DomHelper): void {
  defaultDomHelper = domHelper;
}

/**
 * Asserts that a value is an Element and returns it.
 * @param value The value to check.
 * @param message Optional error message.
 * @returns The value as an Element.
 */
export { assertIsElement };

/**
 * Utility functions for DOM manipulation.
 */
export const dom = {
  /**
   * Creates a new element.
   * @param tagName The tag name.
   * @param attributes Optional attributes.
   * @param textContent Optional text content.
   * @returns The created element.
   */
  createElement(
    tagName: string,
    attributes?: Record<string, string>,
    textContent?: string
  ): Element {
    return getDomHelper().createElement(tagName, attributes, textContent);
  },

  /**
   * Gets an element by ID.
   * @param id The element ID.
   * @returns The element or null.
   */
  getElementById(id: string): Element | null {
    return getDomHelper().getElementById(id);
  },

  /**
   * Removes an element from the DOM.
   * @param element The element to remove.
   */
  removeNode(element: Element): void {
    getDomHelper().removeNode(element);
  },

  /**
   * Appends a child to a parent element.
   * @param parent The parent element.
   * @param child The child element.
   */
  appendChild(parent: Element, child: Element): void {
    getDomHelper().appendChild(parent, child);
  },

  /**
   * Sets the text content of an element.
   * @param element The element.
   * @param text The text content.
   */
  setTextContent(element: Element, text: string): void {
    getDomHelper().setTextContent(element, text);
  },

  /**
   * Gets the text content of an element.
   * @param element The element.
   * @returns The text content.
   */
  getTextContent(element: Element): string {
    return getDomHelper().getTextContent(element);
  },

  /**
   * Checks if an element is in the document.
   * @param element The element to check.
   * @returns true if the element is in the document.
   */
  isInDocument(element: Element): boolean {
    return document.contains(element);
  },

  /**
   * Gets the owner document of an element.
   * @param element The element.
   * @returns The owner document.
   */
  getOwnerDocument(element: Element): Document {
    return element.ownerDocument || document;
  },

  /**
   * Gets the parent element of an element.
   * @param element The element.
   * @returns The parent element or null.
   */
  getParentElement(element: Element): Element | null {
    return element.parentElement;
  },

  /**
   * Gets the next sibling element.
   * @param element The element.
   * @returns The next sibling element or null.
   */
  getNextElementSibling(element: Element): Element | null {
    return element.nextElementSibling;
  },

  /**
   * Gets the previous sibling element.
   * @param element The element.
   * @returns The previous sibling element or null.
   */
  getPreviousElementSibling(element: Element): Element | null {
    return element.previousElementSibling;
  },

  /**
   * Gets the first child element.
   * @param element The element.
   * @returns The first child element or null.
   */
  getFirstElementChild(element: Element): Element | null {
    return element.firstElementChild;
  },

  /**
   * Gets the last child element.
   * @param element The element.
   * @returns The last child element or null.
   */
  getLastElementChild(element: Element): Element | null {
    return element.lastElementChild;
  },

  /**
   * Removes all child nodes from an element.
   * @param element The element to remove children from.
   */
  removeChildren(element: Element): void {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },
};

/**
 * Removes all child nodes from an element.
 * @param element The element to remove children from.
 */
export function removeChildren(element: Element): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
