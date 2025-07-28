import { describe, it, expect } from 'vitest';
import { Coordinate } from './coordinate';

describe('math/coordinate', () => {
  describe('constructor', () => {
    it('should initialize with default values', () => {
      const coord = new Coordinate();
      expect(coord.x).toBe(0);
      expect(coord.y).toBe(0);
    });

    it('should initialize with provided values', () => {
      const coord = new Coordinate(5, 10);
      expect(coord.x).toBe(5);
      expect(coord.y).toBe(10);
    });

    it('should handle negative coordinates', () => {
      const coord = new Coordinate(-5, -15);
      expect(coord.x).toBe(-5);
      expect(coord.y).toBe(-15);
    });

    it('should handle floating point coordinates', () => {
      const coord = new Coordinate(3.14, 2.71);
      expect(coord.x).toBeCloseTo(3.14);
      expect(coord.y).toBeCloseTo(2.71);
    });

    it('should handle zero coordinates', () => {
      const coord = new Coordinate(0, 0);
      expect(coord.x).toBe(0);
      expect(coord.y).toBe(0);
    });
  });

  describe('clone', () => {
    it('should clone a coordinate instance', () => {
      const coord = new Coordinate(3, 7);
      const clonedCoord = coord.clone();
      expect(clonedCoord).toEqual(coord);
      expect(clonedCoord).not.toBe(coord); // Ensure it's a different instance
    });

    it('should clone a coordinate using static method', () => {
      const coord = new Coordinate(8, 12);
      const clonedCoord = Coordinate.clone(coord);
      expect(clonedCoord).toEqual(coord);
      expect(clonedCoord).not.toBe(coord); // Ensure it's a different instance
    });

    it('should create independent copies', () => {
      const original = new Coordinate(5, 10);
      const cloned = original.clone();

      cloned.x = 100;
      cloned.y = 200;

      expect(original.x).toBe(5);
      expect(original.y).toBe(10);
      expect(cloned.x).toBe(100);
      expect(cloned.y).toBe(200);
    });

    it('should clone with negative coordinates', () => {
      const coord = new Coordinate(-10, -20);
      const cloned = coord.clone();

      expect(cloned.x).toBe(-10);
      expect(cloned.y).toBe(-20);
      expect(cloned).not.toBe(coord);
    });

    it('should clone with floating point coordinates', () => {
      const coord = new Coordinate(3.14159, 2.71828);
      const cloned = coord.clone();

      expect(cloned.x).toBeCloseTo(3.14159);
      expect(cloned.y).toBeCloseTo(2.71828);
      expect(cloned).not.toBe(coord);
    });
  });

  describe('property access', () => {
    it('should allow direct property access', () => {
      const coord = new Coordinate(15, 25);
      expect(coord.x).toBe(15);
      expect(coord.y).toBe(25);
    });

    it('should allow property modification', () => {
      const coord = new Coordinate(10, 20);
      coord.x = 30;
      coord.y = 40;

      expect(coord.x).toBe(30);
      expect(coord.y).toBe(40);
    });

    it('should handle property modification with different types', () => {
      const coord = new Coordinate(10, 20);
      coord.x = 3.14;
      coord.y = -5.5;

      expect(coord.x).toBeCloseTo(3.14);
      expect(coord.y).toBeCloseTo(-5.5);
    });
  });

  describe('equality checks', () => {
    it('should be equal when coordinates match', () => {
      const coord1 = new Coordinate(10, 20);
      const coord2 = new Coordinate(10, 20);

      expect(coord1.x).toBe(coord2.x);
      expect(coord1.y).toBe(coord2.y);
    });

    it('should not be equal when coordinates differ', () => {
      const coord1 = new Coordinate(10, 20);
      const coord2 = new Coordinate(15, 25);

      expect(coord1.x).not.toBe(coord2.x);
      expect(coord1.y).not.toBe(coord2.y);
    });

    it('should handle floating point comparison', () => {
      const coord1 = new Coordinate(0.1 + 0.2, 0.3);
      const coord2 = new Coordinate(0.3, 0.3);

      expect(coord1.x).toBeCloseTo(coord2.x);
      expect(coord1.y).toBe(coord2.y);
    });
  });

  describe('edge cases', () => {
    it('should handle very large coordinates', () => {
      const large = new Coordinate(1e10, 1e10);
      expect(large.x).toBe(1e10);
      expect(large.y).toBe(1e10);

      const cloned = large.clone();
      expect(cloned.x).toBe(1e10);
      expect(cloned.y).toBe(1e10);
    });

    it('should handle infinite coordinates', () => {
      const coord = new Coordinate(Infinity, -Infinity);
      expect(coord.x).toBe(Infinity);
      expect(coord.y).toBe(-Infinity);

      const cloned = coord.clone();
      expect(cloned.x).toBe(Infinity);
      expect(cloned.y).toBe(-Infinity);
    });

    it('should handle NaN coordinates', () => {
      const coord = new Coordinate(NaN, NaN);
      expect(coord.x).toBeNaN();
      expect(coord.y).toBeNaN();

      const cloned = coord.clone();
      expect(cloned.x).toBeNaN();
      expect(cloned.y).toBeNaN();
    });

    it('should handle mixed special values', () => {
      const coord = new Coordinate(Infinity, NaN);
      expect(coord.x).toBe(Infinity);
      expect(coord.y).toBeNaN();

      const cloned = coord.clone();
      expect(cloned.x).toBe(Infinity);
      expect(cloned.y).toBeNaN();
    });
  });

  describe('immutability of static clone', () => {
    it('should not affect original when static cloning', () => {
      const original = new Coordinate(100, 200);
      const cloned = Coordinate.clone(original);

      cloned.x = 999;
      cloned.y = 888;

      expect(original.x).toBe(100);
      expect(original.y).toBe(200);
    });
  });

  describe('object structure', () => {
    it('should have correct object structure', () => {
      const coord = new Coordinate(10, 20);

      expect(coord).toHaveProperty('x');
      expect(coord).toHaveProperty('y');
      expect(typeof coord.x).toBe('number');
      expect(typeof coord.y).toBe('number');
    });

    it('should be instance of Coordinate', () => {
      const coord = new Coordinate(5, 10);
      expect(coord).toBeInstanceOf(Coordinate);

      const cloned = coord.clone();
      expect(cloned).toBeInstanceOf(Coordinate);
    });
  });
});
