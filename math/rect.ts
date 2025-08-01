/**
 * @fileoverview Rectangle class for geometric operations.
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

import {Box} from '../common/closure-math';

/**
 * Represents a rectangle with left, top, width, and height properties.
 * This is compatible with the Google Closure Library's goog.math.Rect.
 */
export class Rect {
  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number
  ) {}

  /**
   * Gets the right edge of the rectangle.
   */
  get right(): number {
    return this.left + this.width;
  }

  /**
   * Gets the bottom edge of the rectangle.
   */
  get bottom(): number {
    return this.top + this.height;
  }

  /**
   * Creates a Rect from a Box object.
   * @param box The box to convert.
   * @returns A new Rect instance.
   */
  static createFromBox(box: Box): Rect {
    return new Rect(box.left, box.top, box.width, box.height);
  }

  /**
   * Creates a Rect from coordinates.
   * @param x The x coordinate.
   * @param y The y coordinate.
   * @param w The width.
   * @param h The height.
   * @returns A new Rect instance.
   */
  static createFromCoordinates(x: number, y: number, w: number, h: number): Rect {
    return new Rect(x, y, w, h);
  }

  /**
   * Checks if this rectangle contains a point.
   * @param x The x coordinate.
   * @param y The y coordinate.
   * @returns true if the point is inside the rectangle.
   */
  contains(x: number, y: number): boolean {
    return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
  }

  /**
   * Checks if this rectangle intersects with another rectangle.
   * @param other The other rectangle.
   * @returns true if the rectangles intersect.
   */
  intersects(other: Rect): boolean {
    return !(
      this.right < other.left ||
      this.left > other.right ||
      this.bottom < other.top ||
      this.top > other.bottom
    );
  }

  /**
   * Creates a copy of this rectangle.
   * @returns A new Rect instance with the same dimensions.
   */
  clone(): Rect {
    return new Rect(this.left, this.top, this.width, this.height);
  }

  /**
   * Expands the rectangle by the given amount in all directions.
   * @param amount The amount to expand by.
   * @returns A new expanded rectangle.
   */
  expand(amount: number): Rect {
    return new Rect(
      this.left - amount,
      this.top - amount,
      this.width + 2 * amount,
      this.height + 2 * amount
    );
  }

  /**
   * Converts this rectangle to a Box.
   * @returns A new Box instance with the same dimensions.
   */
  toBox(): Box {
    return new Box(this.left, this.top, this.width, this.height);
  }
}
