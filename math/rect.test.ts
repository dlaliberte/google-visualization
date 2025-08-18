import { describe, it, expect } from 'vitest';
import { Rect } from './rect';
import { Box } from '../common/closure-math';

describe('Rect', () => {
  describe('constructor', () => {
    it('should create rectangle with correct dimensions', () => {
      const rect = new Rect(10, 20, 100, 200);

      expect(rect.left).toBe(10);
      expect(rect.top).toBe(20);
      expect(rect.width).toBe(100);
      expect(rect.height).toBe(200);
    });

    it('should create rectangle with zero dimensions', () => {
      const rect = new Rect(0, 0, 0, 0);

      expect(rect.left).toBe(0);
      expect(rect.top).toBe(0);
      expect(rect.width).toBe(0);
      expect(rect.height).toBe(0);
    });

    it('should create rectangle with negative coordinates', () => {
      const rect = new Rect(-50, -100, 200, 300);

      expect(rect.left).toBe(-50);
      expect(rect.top).toBe(-100);
      expect(rect.width).toBe(200);
      expect(rect.height).toBe(300);
    });

    it('should create rectangle with fractional values', () => {
      const rect = new Rect(10.5, 20.25, 100.75, 200.125);

      expect(rect.left).toBe(10.5);
      expect(rect.top).toBe(20.25);
      expect(rect.width).toBe(100.75);
      expect(rect.height).toBe(200.125);
    });

    it('should handle large values', () => {
      const rect = new Rect(1e6, 2e6, 3e6, 4e6);

      expect(rect.left).toBe(1000000);
      expect(rect.top).toBe(2000000);
      expect(rect.width).toBe(3000000);
      expect(rect.height).toBe(4000000);
    });
  });

  describe('right property', () => {
    it('should calculate right edge correctly', () => {
      const rect = new Rect(10, 20, 100, 200);

      expect(rect.right).toBe(110); // 10 + 100
    });

    it('should handle zero width', () => {
      const rect = new Rect(50, 50, 0, 100);

      expect(rect.right).toBe(50); // 50 + 0
    });

    it('should handle negative left', () => {
      const rect = new Rect(-30, 0, 60, 100);

      expect(rect.right).toBe(30); // -30 + 60
    });

    it('should handle fractional values', () => {
      const rect = new Rect(10.25, 0, 50.75, 100);

      expect(rect.right).toBe(61); // 10.25 + 50.75
    });

    it('should be readonly property', () => {
      const rect = new Rect(10, 20, 100, 200);
      const initialRight = rect.right;

      // Verify it's calculated from left + width
      rect.left = 20;
      expect(rect.right).toBe(120); // 20 + 100

      rect.width = 80;
      expect(rect.right).toBe(100); // 20 + 80
    });
  });

  describe('bottom property', () => {
    it('should calculate bottom edge correctly', () => {
      const rect = new Rect(10, 20, 100, 200);

      expect(rect.bottom).toBe(220); // 20 + 200
    });

    it('should handle zero height', () => {
      const rect = new Rect(50, 50, 100, 0);

      expect(rect.bottom).toBe(50); // 50 + 0
    });

    it('should handle negative top', () => {
      const rect = new Rect(0, -40, 100, 80);

      expect(rect.bottom).toBe(40); // -40 + 80
    });

    it('should handle fractional values', () => {
      const rect = new Rect(0, 15.5, 100, 75.25);

      expect(rect.bottom).toBe(90.75); // 15.5 + 75.25
    });

    it('should be readonly property', () => {
      const rect = new Rect(10, 20, 100, 200);

      // Verify it's calculated from top + height
      rect.top = 30;
      expect(rect.bottom).toBe(230); // 30 + 200

      rect.height = 150;
      expect(rect.bottom).toBe(180); // 30 + 150
    });
  });

  describe('createFromBox static method', () => {
    it('should create Rect from Box with positive values', () => {
      const box = new Box(5, 10, 50, 100);
      const rect = Rect.createFromBox(box);

      expect(rect.left).toBe(5);
      expect(rect.top).toBe(10);
      expect(rect.width).toBe(50);
      expect(rect.height).toBe(100);
    });

    it('should create Rect from Box with zero dimensions', () => {
      const box = new Box(0, 0, 0, 0);
      const rect = Rect.createFromBox(box);

      expect(rect.left).toBe(0);
      expect(rect.top).toBe(0);
      expect(rect.width).toBe(0);
      expect(rect.height).toBe(0);
    });

    it('should create Rect from Box with negative values', () => {
      const box = new Box(-10, -20, 30, 40);
      const rect = Rect.createFromBox(box);

      expect(rect.left).toBe(-10);
      expect(rect.top).toBe(-20);
      expect(rect.width).toBe(30);
      expect(rect.height).toBe(40);
    });

    it('should create Rect from Box with fractional values', () => {
      const box = new Box(1.5, 2.25, 10.75, 20.125);
      const rect = Rect.createFromBox(box);

      expect(rect.left).toBe(1.5);
      expect(rect.top).toBe(2.25);
      expect(rect.width).toBe(10.75);
      expect(rect.height).toBe(20.125);
    });

    it('should create independent instance', () => {
      const box = new Box(5, 10, 50, 100);
      const rect = Rect.createFromBox(box);

      rect.left = 15;
      expect(box.left).toBe(5); // Box unchanged
      expect(rect.left).toBe(15);
    });
  });

  describe('createFromCoordinates static method', () => {
    it('should create Rect from coordinates', () => {
      const rect = Rect.createFromCoordinates(5, 10, 50, 100);

      expect(rect.left).toBe(5);
      expect(rect.top).toBe(10);
      expect(rect.width).toBe(50);
      expect(rect.height).toBe(100);
    });

    it('should create Rect with zero dimensions', () => {
      const rect = Rect.createFromCoordinates(0, 0, 0, 0);

      expect(rect.left).toBe(0);
      expect(rect.top).toBe(0);
      expect(rect.width).toBe(0);
      expect(rect.height).toBe(0);
    });

    it('should create Rect with negative values', () => {
      const rect = Rect.createFromCoordinates(-5, -10, 20, 30);

      expect(rect.left).toBe(-5);
      expect(rect.top).toBe(-10);
      expect(rect.width).toBe(20);
      expect(rect.height).toBe(30);
    });

    it('should be equivalent to constructor', () => {
      const rect1 = new Rect(10, 20, 100, 200);
      const rect2 = Rect.createFromCoordinates(10, 20, 100, 200);

      expect(rect1.left).toBe(rect2.left);
      expect(rect1.top).toBe(rect2.top);
      expect(rect1.width).toBe(rect2.width);
      expect(rect1.height).toBe(rect2.height);
    });
  });

  describe('contains method', () => {
    let rect: Rect;

    beforeEach(() => {
      rect = new Rect(10, 20, 100, 200); // left:10, top:20, right:110, bottom:220
    });

    it('should return true for point inside rectangle', () => {
      expect(rect.contains(50, 100)).toBe(true);
      expect(rect.contains(60, 120)).toBe(true);
      expect(rect.contains(11, 21)).toBe(true);
    });

    it('should return true for point on edges', () => {
      expect(rect.contains(10, 50)).toBe(true); // left edge
      expect(rect.contains(110, 50)).toBe(true); // right edge
      expect(rect.contains(50, 20)).toBe(true); // top edge
      expect(rect.contains(50, 220)).toBe(true); // bottom edge
    });

    it('should return true for corner points', () => {
      expect(rect.contains(10, 20)).toBe(true); // top-left
      expect(rect.contains(110, 20)).toBe(true); // top-right
      expect(rect.contains(10, 220)).toBe(true); // bottom-left
      expect(rect.contains(110, 220)).toBe(true); // bottom-right
    });

    it('should return false for points outside rectangle', () => {
      expect(rect.contains(5, 50)).toBe(false); // left of rectangle
      expect(rect.contains(115, 50)).toBe(false); // right of rectangle
      expect(rect.contains(50, 15)).toBe(false); // above rectangle
      expect(rect.contains(50, 225)).toBe(false); // below rectangle
    });

    it('should return false for points in diagonal corners outside', () => {
      expect(rect.contains(5, 15)).toBe(false); // top-left outside
      expect(rect.contains(115, 15)).toBe(false); // top-right outside
      expect(rect.contains(5, 225)).toBe(false); // bottom-left outside
      expect(rect.contains(115, 225)).toBe(false); // bottom-right outside
    });

    it('should handle zero-width rectangle', () => {
      const zeroWidthRect = new Rect(50, 50, 0, 100);

      expect(zeroWidthRect.contains(50, 75)).toBe(true);
      expect(zeroWidthRect.contains(49, 75)).toBe(false);
      expect(zeroWidthRect.contains(51, 75)).toBe(false);
    });

    it('should handle zero-height rectangle', () => {
      const zeroHeightRect = new Rect(50, 50, 100, 0);

      expect(zeroHeightRect.contains(75, 50)).toBe(true);
      expect(zeroHeightRect.contains(75, 49)).toBe(false);
      expect(zeroHeightRect.contains(75, 51)).toBe(false);
    });

    it('should handle fractional coordinates', () => {
      const fractionalRect = new Rect(10.5, 20.25, 100.5, 200.25);

      expect(fractionalRect.contains(60.75, 120.5)).toBe(true);
      expect(fractionalRect.contains(10.5, 20.25)).toBe(true); // exact corner
      expect(fractionalRect.contains(111, 220.5)).toBe(true); // exact right-bottom
    });
  });

  describe('intersects method', () => {
    let rect: Rect;

    beforeEach(() => {
      rect = new Rect(10, 20, 100, 200); // left:10, top:20, right:110, bottom:220
    });

    it('should return true for overlapping rectangles', () => {
      const overlapping = new Rect(50, 50, 100, 200);

      expect(rect.intersects(overlapping)).toBe(true);
      expect(overlapping.intersects(rect)).toBe(true); // symmetric
    });

    it('should return true for rectangles touching edges', () => {
      const rightTouching = new Rect(110, 20, 50, 200); // touches right edge
      const bottomTouching = new Rect(10, 220, 100, 50); // touches bottom edge

      expect(rect.intersects(rightTouching)).toBe(true); // touching counts as intersection
      expect(rect.intersects(bottomTouching)).toBe(true); // touching counts as intersection
    });

    it('should return false for rectangles just outside edges', () => {
      const rightAdjacent = new Rect(111, 20, 50, 200); // just right of rectangle
      const bottomAdjacent = new Rect(10, 221, 100, 50); // just below rectangle

      expect(rect.intersects(rightAdjacent)).toBe(false); // not overlapping
      expect(rect.intersects(bottomAdjacent)).toBe(false); // not overlapping
    });

    it('should return true for contained rectangle', () => {
      const contained = new Rect(30, 40, 50, 100);

      expect(rect.intersects(contained)).toBe(true);
      expect(contained.intersects(rect)).toBe(true);
    });

    it('should return true for containing rectangle', () => {
      const containing = new Rect(0, 0, 200, 300);

      expect(rect.intersects(containing)).toBe(true);
      expect(containing.intersects(rect)).toBe(true);
    });

    it('should return false for non-overlapping rectangles', () => {
      const farLeft = new Rect(-100, 50, 50, 100);
      const farRight = new Rect(200, 50, 50, 100);
      const farUp = new Rect(50, -100, 50, 50);
      const farDown = new Rect(50, 300, 50, 50);

      expect(rect.intersects(farLeft)).toBe(false);
      expect(rect.intersects(farRight)).toBe(false);
      expect(rect.intersects(farUp)).toBe(false);
      expect(rect.intersects(farDown)).toBe(false);
    });

    it('should return true for partial overlaps', () => {
      const partialTopLeft = new Rect(5, 15, 20, 30);
      const partialTopRight = new Rect(100, 15, 20, 30);
      const partialBottomLeft = new Rect(5, 210, 20, 30);
      const partialBottomRight = new Rect(100, 210, 20, 30);

      expect(rect.intersects(partialTopLeft)).toBe(true);
      expect(rect.intersects(partialTopRight)).toBe(true);
      expect(rect.intersects(partialBottomLeft)).toBe(true);
      expect(rect.intersects(partialBottomRight)).toBe(true);
    });

    it('should handle zero-dimension rectangles', () => {
      const point = new Rect(50, 100, 0, 0);
      const zeroWidth = new Rect(50, 50, 0, 100);
      const zeroHeight = new Rect(50, 50, 100, 0);

      expect(rect.intersects(point)).toBe(true); // point inside
      expect(rect.intersects(zeroWidth)).toBe(true);
      expect(rect.intersects(zeroHeight)).toBe(true);
    });

    it('should handle identical rectangles', () => {
      const identical = new Rect(10, 20, 100, 200);

      expect(rect.intersects(identical)).toBe(true);
    });

    it('should handle fractional rectangles', () => {
      const fractional = new Rect(109.5, 219.5, 10, 10);

      expect(rect.intersects(fractional)).toBe(true); // slight overlap
    });
  });

  describe('clone method', () => {
    it('should create exact copy of rectangle', () => {
      const rect = new Rect(10, 20, 100, 200);
      const cloned = rect.clone();

      expect(cloned.left).toBe(rect.left);
      expect(cloned.top).toBe(rect.top);
      expect(cloned.width).toBe(rect.width);
      expect(cloned.height).toBe(rect.height);
    });

    it('should create independent instance', () => {
      const rect = new Rect(10, 20, 100, 200);
      const cloned = rect.clone();

      cloned.left = 50;
      cloned.top = 60;

      expect(rect.left).toBe(10); // original unchanged
      expect(rect.top).toBe(20); // original unchanged
      expect(cloned.left).toBe(50);
      expect(cloned.top).toBe(60);
    });

    it('should handle zero-dimension rectangles', () => {
      const rect = new Rect(0, 0, 0, 0);
      const cloned = rect.clone();

      expect(cloned.left).toBe(0);
      expect(cloned.top).toBe(0);
      expect(cloned.width).toBe(0);
      expect(cloned.height).toBe(0);
    });

    it('should handle negative values', () => {
      const rect = new Rect(-10, -20, 30, 40);
      const cloned = rect.clone();

      expect(cloned.left).toBe(-10);
      expect(cloned.top).toBe(-20);
      expect(cloned.width).toBe(30);
      expect(cloned.height).toBe(40);
    });

    it('should handle fractional values', () => {
      const rect = new Rect(1.5, 2.25, 10.75, 20.125);
      const cloned = rect.clone();

      expect(cloned.left).toBe(1.5);
      expect(cloned.top).toBe(2.25);
      expect(cloned.width).toBe(10.75);
      expect(cloned.height).toBe(20.125);
    });
  });

  describe('expand method', () => {
    let rect: Rect;

    beforeEach(() => {
      rect = new Rect(10, 20, 100, 200);
    });

    it('should expand rectangle by positive amount', () => {
      const expanded = rect.expand(5);

      expect(expanded.left).toBe(5); // 10 - 5
      expect(expanded.top).toBe(15); // 20 - 5
      expect(expanded.width).toBe(110); // 100 + 2*5
      expect(expanded.height).toBe(210); // 200 + 2*5
    });

    it('should contract rectangle by negative amount', () => {
      const contracted = rect.expand(-10);

      expect(contracted.left).toBe(20); // 10 - (-10)
      expect(contracted.top).toBe(30); // 20 - (-10)
      expect(contracted.width).toBe(80); // 100 + 2*(-10)
      expect(contracted.height).toBe(180); // 200 + 2*(-10)
    });

    it('should not change rectangle when expanding by zero', () => {
      const unchanged = rect.expand(0);

      expect(unchanged.left).toBe(10);
      expect(unchanged.top).toBe(20);
      expect(unchanged.width).toBe(100);
      expect(unchanged.height).toBe(200);
    });

    it('should create new instance without modifying original', () => {
      const expanded = rect.expand(5);

      expect(rect.left).toBe(10); // original unchanged
      expect(rect.top).toBe(20);
      expect(rect.width).toBe(100);
      expect(rect.height).toBe(200);

      expect(expanded.left).toBe(5);
      expect(expanded.top).toBe(15);
    });

    it('should handle fractional expansion', () => {
      const expanded = rect.expand(2.5);

      expect(expanded.left).toBe(7.5); // 10 - 2.5
      expect(expanded.top).toBe(17.5); // 20 - 2.5
      expect(expanded.width).toBe(105); // 100 + 2*2.5
      expect(expanded.height).toBe(205); // 200 + 2*2.5
    });

    it('should handle large expansion', () => {
      const expanded = rect.expand(100);

      expect(expanded.left).toBe(-90); // 10 - 100
      expect(expanded.top).toBe(-80); // 20 - 100
      expect(expanded.width).toBe(300); // 100 + 2*100
      expect(expanded.height).toBe(400); // 200 + 2*100
    });

    it('should allow negative width/height when contracting too much', () => {
      const overContracted = rect.expand(-60); // more than half width

      expect(overContracted.left).toBe(70); // 10 - (-60)
      expect(overContracted.top).toBe(80); // 20 - (-60)
      expect(overContracted.width).toBe(-20); // 100 + 2*(-60)
      expect(overContracted.height).toBe(80); // 200 + 2*(-60)
    });
  });

  describe('toBox method', () => {
    it('should convert rectangle to Box with same dimensions', () => {
      const rect = new Rect(10, 20, 100, 200);
      const box = rect.toBox();

      expect(box.left).toBe(10);
      expect(box.top).toBe(20);
      expect(box.width).toBe(100);
      expect(box.height).toBe(200);
    });

    it('should handle zero dimensions', () => {
      const rect = new Rect(0, 0, 0, 0);
      const box = rect.toBox();

      expect(box.left).toBe(0);
      expect(box.top).toBe(0);
      expect(box.width).toBe(0);
      expect(box.height).toBe(0);
    });

    it('should handle negative values', () => {
      const rect = new Rect(-10, -20, 30, 40);
      const box = rect.toBox();

      expect(box.left).toBe(-10);
      expect(box.top).toBe(-20);
      expect(box.width).toBe(30);
      expect(box.height).toBe(40);
    });

    it('should create independent Box instance', () => {
      const rect = new Rect(10, 20, 100, 200);
      const box = rect.toBox();

      box.left = 50;
      expect(rect.left).toBe(10); // rect unchanged
      expect(box.left).toBe(50);
    });

    it('should handle fractional values', () => {
      const rect = new Rect(1.5, 2.25, 10.75, 20.125);
      const box = rect.toBox();

      expect(box.left).toBe(1.5);
      expect(box.top).toBe(2.25);
      expect(box.width).toBe(10.75);
      expect(box.height).toBe(20.125);
    });

    it('should be reversible with createFromBox', () => {
      const originalRect = new Rect(15, 25, 75, 125);
      const box = originalRect.toBox();
      const newRect = Rect.createFromBox(box);

      expect(newRect.left).toBe(originalRect.left);
      expect(newRect.top).toBe(originalRect.top);
      expect(newRect.width).toBe(originalRect.width);
      expect(newRect.height).toBe(originalRect.height);
    });
  });

  describe('integration scenarios', () => {
    it('should handle complex geometric operations', () => {
      const rect1 = new Rect(0, 0, 100, 100);
      const rect2 = new Rect(50, 50, 100, 100);

      // Test intersection
      expect(rect1.intersects(rect2)).toBe(true);

      // Test points in intersection area
      expect(rect1.contains(75, 75)).toBe(true);
      expect(rect2.contains(75, 75)).toBe(true);

      // Test points outside intersection
      expect(rect1.contains(25, 25)).toBe(true);
      expect(rect2.contains(25, 25)).toBe(false);
    });

    it('should handle chain of transformations', () => {
      const original = new Rect(10, 10, 50, 50);
      const expanded = original.expand(10);
      const cloned = expanded.clone();

      expect(cloned.left).toBe(0); // 10 - 10
      expect(cloned.top).toBe(0); // 10 - 10
      expect(cloned.width).toBe(70); // 50 + 2*10
      expect(cloned.height).toBe(70); // 50 + 2*10

      // Original should be unchanged
      expect(original.width).toBe(50);
      expect(original.height).toBe(50);
    });

    it('should handle conversion roundtrip', () => {
      const rect = new Rect(12.5, 25.75, 100.25, 200.5);
      const box = rect.toBox();
      const newRect = Rect.createFromBox(box);

      expect(newRect.left).toBe(rect.left);
      expect(newRect.top).toBe(rect.top);
      expect(newRect.width).toBe(rect.width);
      expect(newRect.height).toBe(rect.height);
      expect(newRect.right).toBe(rect.right);
      expect(newRect.bottom).toBe(rect.bottom);
    });

    it('should handle bounding box calculation', () => {
      const rects = [
        new Rect(10, 10, 50, 50),
        new Rect(30, 30, 40, 40),
        new Rect(5, 15, 20, 30)
      ];

      // Calculate bounding box manually
      let minLeft = Infinity;
      let minTop = Infinity;
      let maxRight = -Infinity;
      let maxBottom = -Infinity;

      rects.forEach(rect => {
        minLeft = Math.min(minLeft, rect.left);
        minTop = Math.min(minTop, rect.top);
        maxRight = Math.max(maxRight, rect.right);
        maxBottom = Math.max(maxBottom, rect.bottom);
      });

      const boundingRect = new Rect(
        minLeft,
        minTop,
        maxRight - minLeft,
        maxBottom - minTop
      );

      expect(boundingRect.left).toBe(5);
      expect(boundingRect.top).toBe(10);
      expect(boundingRect.right).toBe(70); // max of 60, 70, 25
      expect(boundingRect.bottom).toBe(70); // max of 60, 70, 45
    });
  });

  describe('edge cases', () => {
    it('should handle very large numbers', () => {
      const rect = new Rect(1e10, 2e10, 3e10, 4e10);

      expect(rect.right).toBe(4e10);
      expect(rect.bottom).toBe(6e10);
      expect(rect.contains(2e10, 3e10)).toBe(true);
    });

    it('should handle very small numbers', () => {
      const rect = new Rect(1e-10, 2e-10, 3e-10, 4e-10);

      expect(rect.right).toBe(4e-10);
      expect(rect.bottom).toBe(6e-10);
      expect(rect.contains(2e-10, 3e-10)).toBe(true);
    });

    it('should handle Infinity values', () => {
      const rect = new Rect(0, 0, Infinity, Infinity);

      expect(rect.right).toBe(Infinity);
      expect(rect.bottom).toBe(Infinity);
      expect(rect.contains(1e10, 1e10)).toBe(true);
    });

    it('should handle NaN values', () => {
      const rect = new Rect(NaN, NaN, NaN, NaN);

      expect(isNaN(rect.right)).toBe(true);
      expect(isNaN(rect.bottom)).toBe(true);
      expect(rect.contains(50, 50)).toBe(false); // NaN comparisons are always false
    });
  });
});
