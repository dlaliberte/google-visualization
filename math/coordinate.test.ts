import { describe, it, expect } from 'vitest';
import { Coordinate } from './coordinate';

// Tests for Coordinate class
describe('Coordinate', () => {
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
});
