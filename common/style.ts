/**
 * @fileoverview Style utilities to replace @closure/style/style
 * This module provides drop-in replacements for commonly used Closure style functions.
 */

/**
 * Sets a style property on an element.
 * @param element The element to style.
 * @param property The CSS property name.
 * @param value The CSS property value.
 */
export function setStyle(element: Element, property: string, value: string): void {
  const htmlElement = element as HTMLElement;
  if (htmlElement.style) {
    htmlElement.style.setProperty(property, value);
  }
}

/**
 * Sets multiple style properties on an element.
 * @param element The element to style.
 * @param styles An object containing CSS property-value pairs.
 */
export function setStyles(element: Element, styles: Record<string, string>): void {
  for (const [property, value] of Object.entries(styles)) {
    setStyle(element, property, value);
  }
}

/**
 * Gets a computed style property value from an element.
 * @param element The element to get the style from.
 * @param property The CSS property name.
 * @returns The computed style value.
 */
export function getComputedStyle(element: Element, property: string): string {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.getPropertyValue(property);
}

/**
 * Gets multiple computed style properties from an element.
 * @param element The element to get styles from.
 * @param properties The CSS property names.
 * @returns An object containing the computed style values.
 */
export function getComputedStyles(
  element: Element,
  properties: string[]
): Record<string, string> {
  const computedStyle = window.getComputedStyle(element);
  const result: Record<string, string> = {};

  for (const property of properties) {
    result[property] = computedStyle.getPropertyValue(property);
  }

  return result;
}

/**
 * Gets the size (width and height) of an element.
 * @param element The element to measure.
 * @returns An object with width and height properties.
 */
export function getSize(element: Element): { width: number; height: number } {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Gets the position of an element relative to the viewport.
 * @param element The element to get the position of.
 * @returns An object with x and y coordinates.
 */
export function getPosition(element: Element): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
  };
}

/**
 * Gets the bounding rectangle of an element.
 * @param element The element to get the bounds of.
 * @returns The bounding rectangle.
 */
export function getBounds(element: Element): DOMRect {
  return element.getBoundingClientRect();
}

/**
 * Shows an element by setting its display style to the specified value.
 * @param element The element to show.
 * @param display The display value (default: 'block').
 */
export function showElement(element: Element, display: string = 'block'): void {
  setStyle(element, 'display', display);
}

/**
 * Hides an element by setting its display style to 'none'.
 * @param element The element to hide.
 */
export function hideElement(element: Element): void {
  setStyle(element, 'display', 'none');
}

/**
 * Checks if an element is visible (not hidden with display: none).
 * @param element The element to check.
 * @returns true if the element is visible.
 */
export function isElementShown(element: Element): boolean {
  const display = getComputedStyle(element, 'display');
  return display !== 'none';
}

/**
 * Sets the opacity of an element.
 * @param element The element to set opacity on.
 * @param opacity The opacity value (0-1).
 */
export function setOpacity(element: Element, opacity: number): void {
  setStyle(element, 'opacity', opacity.toString());
}

/**
 * Gets the opacity of an element.
 * @param element The element to get opacity from.
 * @returns The opacity value.
 */
export function getOpacity(element: Element): number {
  const opacity = getComputedStyle(element, 'opacity');
  return parseFloat(opacity) || 1;
}

/**
 * Sets the background color of an element.
 * @param element The element to set background color on.
 * @param color The color value.
 */
export function setBackgroundColor(element: Element, color: string): void {
  setStyle(element, 'background-color', color);
}

/**
 * Sets the text color of an element.
 * @param element The element to set text color on.
 * @param color The color value.
 */
export function setColor(element: Element, color: string): void {
  setStyle(element, 'color', color);
}

/**
 * Sets the font size of an element.
 * @param element The element to set font size on.
 * @param size The font size value.
 */
export function setFontSize(element: Element, size: string): void {
  setStyle(element, 'font-size', size);
}

/**
 * Sets the font family of an element.
 * @param element The element to set font family on.
 * @param fontFamily The font family value.
 */
export function setFontFamily(element: Element, fontFamily: string): void {
  setStyle(element, 'font-family', fontFamily);
}

/**
 * Sets the position of an element.
 * @param element The element to position.
 * @param x The x coordinate.
 * @param y The y coordinate.
 * @param position The position type (default: 'absolute').
 */
export function setPosition(
  element: Element,
  x: number,
  y: number,
  position: string = 'absolute'
): void {
  setStyles(element, {
    position,
    left: `${x}px`,
    top: `${y}px`,
  });
}

/**
 * Sets the size of an element.
 * @param element The element to resize.
 * @param width The width value.
 * @param height The height value.
 */
export function setElementSize(element: Element, width: string, height: string): void {
  setStyles(element, {
    width,
    height,
  });
}

/**
 * Adds a CSS class to an element.
 * @param element The element to add the class to.
 * @param className The class name to add.
 */
export function addClass(element: Element, className: string): void {
  element.classList.add(className);
}

/**
 * Removes a CSS class from an element.
 * @param element The element to remove the class from.
 * @param className The class name to remove.
 */
export function removeClass(element: Element, className: string): void {
  element.classList.remove(className);
}

/**
 * Toggles a CSS class on an element.
 * @param element The element to toggle the class on.
 * @param className The class name to toggle.
 * @returns true if the class was added, false if it was removed.
 */
export function toggleClass(element: Element, className: string): boolean {
  return element.classList.toggle(className);
}

/**
 * Checks if an element has a CSS class.
 * @param element The element to check.
 * @param className The class name to check for.
 * @returns true if the element has the class.
 */
export function hasClass(element: Element, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Gets all CSS classes from an element.
 * @param element The element to get classes from.
 * @returns An array of class names.
 */
export function getClasses(element: Element): string[] {
  return Array.from(element.classList);
}

/**
 * Sets the CSS classes on an element, replacing any existing classes.
 * @param element The element to set classes on.
 * @param classNames The class names to set.
 */
export function setClasses(element: Element, classNames: string[]): void {
  element.className = classNames.join(' ');
}

/**
 * Clears all CSS classes from an element.
 * @param element The element to clear classes from.
 */
export function clearClasses(element: Element): void {
  element.className = '';
}

/**
 * Gets the scroll position of an element.
 * @param element The element to get scroll position from.
 * @returns An object with scrollLeft and scrollTop properties.
 */
export function getScrollPosition(element: Element): { scrollLeft: number; scrollTop: number } {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop,
  };
}

/**
 * Sets the scroll position of an element.
 * @param element The element to set scroll position on.
 * @param scrollLeft The horizontal scroll position.
 * @param scrollTop The vertical scroll position.
 */
export function setScrollPosition(element: Element, scrollLeft: number, scrollTop: number): void {
  element.scrollLeft = scrollLeft;
  element.scrollTop = scrollTop;
}

/**
 * Converts a style object to a CSS style attribute string.
 * @param styleObj The style object.
 * @returns The CSS style attribute string.
 */
export function toStyleAttribute(styleObj: Record<string, string>): string {
  return Object.entries(styleObj)
    .map(([key, value]) => `${kebabCase(key)}: ${value}`)
    .join('; ');
}

/**
 * Parses a CSS style attribute string into a style object.
 * @param styleAttribute The CSS style attribute string.
 * @returns The style object.
 */
export function parseStyleAttribute(styleAttribute: string): Record<string, string> {
  const styleObj: Record<string, string> = {};
  styleAttribute.split(';').forEach(part => {
    const [key, value] = part.split(':').map(s => s.trim());
    if (key && value) {
      styleObj[camelCase(key)] = value;
    }
  });
  return styleObj;
}

function kebabCase(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
