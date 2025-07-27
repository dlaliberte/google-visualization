/**
 * @fileoverview Math utilities to replace @closure/math/math
 * This module provides drop-in replacements for commonly used Closure math functions.
 */

/**
 * Clamps a value between a minimum and maximum.
 * @param value The value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Converts degrees to radians.
 * @param degrees The angle in degrees.
 * @returns The angle in radians.
 */
export function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Converts radians to degrees.
 * @param radians The angle in radians.
 * @returns The angle in degrees.
 */
export function toDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

/**
 * Returns the sign of a number.
 * @param x The number.
 * @returns 1 if positive, -1 if negative, 0 if zero.
 */
export function sign(x: number): number {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

/**
 * Calculates the modulo of two numbers.
 * @param a The dividend.
 * @param b The divisor.
 * @returns The modulo result.
 */
export function modulo(a: number, b: number): number {
  return ((a % b) + b) % b;
}

/**
 * Checks if a number is approximately equal to another number within a tolerance.
 * @param a The first number.
 * @param b The second number.
 * @param tolerance The tolerance (default: 1e-6).
 * @returns true if the numbers are approximately equal.
 */
export function nearlyEquals(a: number, b: number, tolerance: number = 1e-6): boolean {
  return Math.abs(a - b) <= tolerance;
}

/**
 * Linear interpolation between two values.
 * @param a The start value.
 * @param b The end value.
 * @param t The interpolation factor (0-1).
 * @returns The interpolated value.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Represents a 2D box with left, top, width, and height.
 */
export class Box {
  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number
  ) {}

  /**
   * Gets the right edge of the box.
   */
  get right(): number {
    return this.left + this.width;
  }

  /**
   * Gets the bottom edge of the box.
   */
  get bottom(): number {
    return this.top + this.height;
  }

  /**
   * Checks if this box contains a point.
   * @param x The x coordinate.
   * @param y The y coordinate.
   * @returns true if the point is inside the box.
   */
  contains(x: number, y: number): boolean {
    return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
  }

  /**
   * Checks if this box intersects with another box.
   * @param other The other box.
   * @returns true if the boxes intersect.
   */
  intersects(other: Box): boolean {
    return !(
      this.right < other.left ||
      this.left > other.right ||
      this.bottom < other.top ||
      this.top > other.bottom
    );
  }

  /**
   * Creates a copy of this box.
   * @returns A new Box instance with the same dimensions.
   */
  clone(): Box {
    return new Box(this.left, this.top, this.width, this.height);
  }

  /**
   * Expands the box by the given amount in all directions.
   * @param amount The amount to expand by.
   * @returns A new expanded box.
   */
  expand(amount: number): Box {
    return new Box(
      this.left - amount,
      this.top - amount,
      this.width + 2 * amount,
      this.height + 2 * amount
    );
  }
}

/**
 * Represents a numeric range with start and end values.
 */
export class Range {
  constructor(public start: number, public end: number) {}

  /**
   * Gets the length of the range.
   */
  get length(): number {
    return this.end - this.start;
  }

  /**
   * Checks if a value is within this range.
   * @param value The value to check.
   * @returns true if the value is within the range.
   */
  contains(value: number): boolean {
    return value >= this.start && value <= this.end;
  }

  /**
   * Checks if this range intersects with another range.
   * @param other The other range.
   * @returns true if the ranges intersect.
   */
  intersects(other: Range): boolean {
    return this.start <= other.end && this.end >= other.start;
  }

  /**
   * Creates a copy of this range.
   * @returns A new Range instance with the same values.
   */
  clone(): Range {
    return new Range(this.start, this.end);
  }

  /**
   * Expands the range by the given amount in both directions.
   * @param amount The amount to expand by.
   * @returns A new expanded range.
   */
  expand(amount: number): Range {
    return new Range(this.start - amount, this.end + amount);
  }

  /**
   * Gets the intersection of this range with another range.
   * @param other The other range.
   * @returns The intersection range, or null if they don't intersect.
   */
  intersection(other: Range): Range | null {
    if (!this.intersects(other)) {
      return null;
    }
    return new Range(
      Math.max(this.start, other.start),
      Math.min(this.end, other.end)
    );
  }

  /**
   * Gets the union of this range with another range.
   * @param other The other range.
   * @returns The union range.
   */
  union(other: Range): Range {
    return new Range(
      Math.min(this.start, other.start),
      Math.max(this.end, other.end)
    );
  }
}

/**
 * Represents a 2D coordinate.
 */
export class Coordinate {
  constructor(public x: number, public y: number) {}

  /**
   * Creates a copy of this coordinate.
   * @returns A new Coordinate instance with the same values.
   */
  clone(): Coordinate {
    return new Coordinate(this.x, this.y);
  }

  /**
   * Calculates the distance to another coordinate.
   * @param other The other coordinate.
   * @returns The distance between the coordinates.
   */
  distance(other: Coordinate): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Adds another coordinate to this one.
   * @param other The other coordinate.
   * @returns A new coordinate with the sum.
   */
  add(other: Coordinate): Coordinate {
    return new Coordinate(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtracts another coordinate from this one.
   * @param other The other coordinate.
   * @returns A new coordinate with the difference.
   */
  subtract(other: Coordinate): Coordinate {
    return new Coordinate(this.x - other.x, this.y - other.y);
  }

  /**
   * Scales this coordinate by a factor.
   * @param factor The scaling factor.
   * @returns A new scaled coordinate.
   */
  scale(factor: number): Coordinate {
    return new Coordinate(this.x * factor, this.y * factor);
  }
}

/**
 * Represents a 2D vector.
 */
export class Vec2 {
  constructor(public x: number, public y: number) {}

  /**
   * Creates a copy of this vector.
   * @returns A new Vec2 instance with the same values.
   */
  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  /**
   * Gets the magnitude (length) of this vector.
   * @returns The magnitude of the vector.
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Gets the squared magnitude of this vector (faster than magnitude).
   * @returns The squared magnitude of the vector.
   */
  squaredMagnitude(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Normalizes this vector to unit length.
   * @returns A new normalized vector.
   */
  normalize(): Vec2 {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vec2(0, 0);
    }
    return new Vec2(this.x / mag, this.y / mag);
  }

  /**
   * Adds another vector to this one.
   * @param other The other vector.
   * @returns A new vector with the sum.
   */
  add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtracts another vector from this one.
   * @param other The other vector.
   * @returns A new vector with the difference.
   */
  subtract(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  /**
   * Scales this vector by a factor.
   * @param factor The scaling factor.
   * @returns A new scaled vector.
   */
  scale(factor: number): Vec2 {
    return new Vec2(this.x * factor, this.y * factor);
  }

  /**
   * Calculates the dot product with another vector.
   * @param other The other vector.
   * @returns The dot product.
   */
  dot(other: Vec2): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Calculates the cross product with another vector (2D cross product returns a scalar).
   * @param other The other vector.
   * @returns The cross product.
   */
  cross(other: Vec2): number {
    return this.x * other.y - this.y * other.x;
  }
}

/**
 * Size class representing width and height.
 */
export class Size {
  constructor(public width: number, public height: number) {}

  /**
   * Creates a copy of this size.
   * @returns A new Size instance.
   */
  clone(): Size {
    return new Size(this.width, this.height);
  }

  /**
   * Checks if this size is equal to another size.
   * @param other The other size.
   * @returns true if the sizes are equal.
   */
  equals(other: Size): boolean {
    return this.width === other.width && this.height === other.height;
  }

  /**
   * Gets the area of this size.
   * @returns The area (width * height).
   */
  area(): number {
    return this.width * this.height;
  }

  /**
   * Gets the aspect ratio of this size.
   * @returns The aspect ratio (width / height).
   */
  aspectRatio(): number {
    return this.height === 0 ? 0 : this.width / this.height;
  }

  /**
   * Checks if this size is empty (width or height is 0).
   * @returns true if the size is empty.
   */
  isEmpty(): boolean {
    return this.width === 0 || this.height === 0;
  }

  /**
   * Scales this size by a factor.
   * @param factor The scaling factor.
   * @returns A new scaled Size.
   */
  scale(factor: number): Size {
    return new Size(this.width * factor, this.height * factor);
  }

  /**
   * Scales this size by different factors for width and height.
   * @param widthFactor The width scaling factor.
   * @param heightFactor The height scaling factor.
   * @returns A new scaled Size.
   */
  scaleBy(widthFactor: number, heightFactor: number): Size {
    return new Size(this.width * widthFactor, this.height * heightFactor);
  }

  /**
   * Converts the size to a string representation.
   * @returns String representation.
   */
  toString(): string {
    return `Size(${this.width}, ${this.height})`;
  }

  /**
   * Creates a Size from a width and height.
   * @param width The width.
   * @param height The height.
   * @returns A new Size instance.
   */
  static create(width: number, height: number): Size {
    return new Size(width, height);
  }
}
