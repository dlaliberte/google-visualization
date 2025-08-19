/**
 * DOM utility functions.
 *
 * This file provides utility functions for working with DOM elements.
 * It replaces the Closure Library's dom/classlist module.
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
 * Checks if a given node is an Element.
 * @param node The node to check.
 * @returns True if the node is an Element, false otherwise.
 */
export function isElement(node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
}

/**
 * Adds a class to an element.
 * @param element The element to add the class to.
 * @param className The class to add.
 */
export function add(element: Element, className: string): void {
  if (element.classList) {
    element.classList.add(className);
  } else if (!contains(element, className)) {
    element.className += element.className ? ' ' + className : className;
  }
}

/**
 * Adds multiple classes to an element.
 * @param element The element to add the classes to.
 * @param classNames The classes to add.
 */
export function addAll(element: Element, classNames: string[]): void {
  if (element.classList) {
    classNames.forEach(className => element.classList.add(className));
  } else {
    const currentClasses = element.className.split(/\s+/);
    const newClasses = classNames.filter(className => !currentClasses.includes(className));
    if (newClasses.length > 0) {
      element.className += (element.className ? ' ' : '') + newClasses.join(' ');
    }
  }
}

/**
 * Checks if an element has a class.
 * @param element The element to check.
 * @param className The class to check for.
 * @return True if the element has the class.
 */
export function contains(element: Element, className: string): boolean {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    const classes = element.className.split(/\s+/);
    return classes.includes(className);
  }
}

/**
 * Removes a class from an element.
 * @param element The element to remove the class from.
 * @param className The class to remove.
 */
export function remove(element: Element, className: string): void {
  if (element.classList) {
    element.classList.remove(className);
  } else if (contains(element, className)) {
    const classes = element.className.split(/\s+/);
    const filteredClasses = classes.filter(c => c !== className);
    element.className = filteredClasses.join(' ');
  }
}

/**
 * Removes multiple classes from an element.
 * @param element The element to remove the classes from.
 * @param classNames The classes to remove.
 */
export function removeAll(element: Element, classNames: string[]): void {
  if (element.classList) {
    classNames.forEach(className => element.classList.remove(className));
  } else {
    const classes = element.className.split(/\s+/);
    const filteredClasses = classes.filter(c => !classNames.includes(c));
    element.className = filteredClasses.join(' ');
  }
}

/**
 * Sets the class name of an element.
 * @param element The element to set the class name of.
 * @param className The class name to set.
 */
export function set(element: Element, className: string): void {
  element.className = className;
}

/**
 * Toggles a class on an element.
 * @param element The element to toggle the class on.
 * @param className The class to toggle.
 * @param opt_enable If provided, adds the class if true, removes it if false.
 * @return True if the class is now present, false if it is not.
 */
export function toggle(
  element: Element,
  className: string,
  opt_enable?: boolean
): boolean {
  const enable = opt_enable !== undefined ? opt_enable : !contains(element, className);

  if (enable) {
    add(element, className);
  } else {
    remove(element, className);
  }

  return enable;
}
