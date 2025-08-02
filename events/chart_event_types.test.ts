import { describe, it, expect } from 'vitest';
import { ChartEventType, ControlEventType } from './chart_event_types';

describe('ChartEventType', () => {
  it('should have all expected chart event types', () => {
    expect(ChartEventType.READY).toBe('ready');
    expect(ChartEventType.ANIMATION_FRAME_FINISH).toBe('animationframefinish');
    expect(ChartEventType.ANIMATION_FINISH).toBe('animationfinish');
    expect(ChartEventType.SELECT).toBe('select');
    expect(ChartEventType.CLICK).toBe('click');
    expect(ChartEventType.RIGHT_CLICK).toBe('rightclick');
    expect(ChartEventType.DBL_CLICK).toBe('dblclick');
    expect(ChartEventType.SCROLL).toBe('scroll');
    expect(ChartEventType.DRAG_START).toBe('dragstart');
    expect(ChartEventType.DRAG).toBe('drag');
    expect(ChartEventType.DRAG_END).toBe('dragend');
    expect(ChartEventType.MOUSE_UP).toBe('onmouseup');
    expect(ChartEventType.MOUSE_DOWN).toBe('onmousedown');
    expect(ChartEventType.MOUSE_OVER).toBe('onmouseover');
    expect(ChartEventType.MOUSE_OUT).toBe('onmouseout');
    expect(ChartEventType.MOUSE_MOVE).toBe('onmousemove');
    expect(ChartEventType.PINCH_START).toBe('pinchstart');
    expect(ChartEventType.PINCH).toBe('pinch');
    expect(ChartEventType.PINCH_END).toBe('pinchend');
    expect(ChartEventType.REMOVE_SERIE).toBe('removeserie');
    expect(ChartEventType.RANGE_CHANGE).toBe('rangechange');
    expect(ChartEventType.ROLL_UP).toBe('rollup');
    expect(ChartEventType.LEGEND_PAGINATION).toBe('legendpagination');
    expect(ChartEventType.DRILL_DOWN).toBe('drilldown');
    expect(ChartEventType.HIGHLIGHT).toBe('highlight');
    expect(ChartEventType.UNHIGHLIGHT).toBe('unhighlight');
  });

  it('should have unique values for all chart event types', () => {
    const values = Object.values(ChartEventType);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });

  it('should have string values for all chart event types', () => {
    Object.values(ChartEventType).forEach(value => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it('should contain mouse event types', () => {
    const mouseEvents = [
      ChartEventType.MOUSE_UP,
      ChartEventType.MOUSE_DOWN,
      ChartEventType.MOUSE_OVER,
      ChartEventType.MOUSE_OUT,
      ChartEventType.MOUSE_MOVE,
      ChartEventType.CLICK,
      ChartEventType.RIGHT_CLICK,
      ChartEventType.DBL_CLICK
    ];

    mouseEvents.forEach(event => {
      expect(Object.values(ChartEventType)).toContain(event);
    });
  });

  it('should contain touch/gesture event types', () => {
    const touchEvents = [
      ChartEventType.PINCH_START,
      ChartEventType.PINCH,
      ChartEventType.PINCH_END,
      ChartEventType.DRAG_START,
      ChartEventType.DRAG,
      ChartEventType.DRAG_END
    ];

    touchEvents.forEach(event => {
      expect(Object.values(ChartEventType)).toContain(event);
    });
  });

  it('should contain chart lifecycle event types', () => {
    const lifecycleEvents = [
      ChartEventType.READY,
      ChartEventType.ANIMATION_FRAME_FINISH,
      ChartEventType.ANIMATION_FINISH
    ];

    lifecycleEvents.forEach(event => {
      expect(Object.values(ChartEventType)).toContain(event);
    });
  });

  it('should contain interaction event types', () => {
    const interactionEvents = [
      ChartEventType.SELECT,
      ChartEventType.HIGHLIGHT,
      ChartEventType.UNHIGHLIGHT,
      ChartEventType.DRILL_DOWN,
      ChartEventType.ROLL_UP
    ];

    interactionEvents.forEach(event => {
      expect(Object.values(ChartEventType)).toContain(event);
    });
  });

  it('should contain navigation event types', () => {
    const navigationEvents = [
      ChartEventType.SCROLL,
      ChartEventType.RANGE_CHANGE,
      ChartEventType.LEGEND_PAGINATION
    ];

    navigationEvents.forEach(event => {
      expect(Object.values(ChartEventType)).toContain(event);
    });
  });
});

describe('ControlEventType', () => {
  it('should have all expected control event types', () => {
    expect(ControlEventType.READY).toBe('ready');
    expect(ControlEventType.ERROR).toBe('error');
    expect(ControlEventType.UI_CHANGE).toBe('uichange');
    expect(ControlEventType.STATE_CHANGE).toBe('statechange');
  });

  it('should have unique values for all control event types', () => {
    const values = Object.values(ControlEventType);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });

  it('should have string values for all control event types', () => {
    Object.values(ControlEventType).forEach(value => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it('should contain lifecycle event types', () => {
    expect(Object.values(ControlEventType)).toContain(ControlEventType.READY);
    expect(Object.values(ControlEventType)).toContain(ControlEventType.ERROR);
  });

  it('should contain state management event types', () => {
    expect(Object.values(ControlEventType)).toContain(ControlEventType.UI_CHANGE);
    expect(Object.values(ControlEventType)).toContain(ControlEventType.STATE_CHANGE);
  });

  it('should have different event types than chart events (except READY)', () => {
    const chartEventValues = Object.values(ChartEventType);
    const controlEventValues = Object.values(ControlEventType);

    // READY is shared between both
    expect(chartEventValues).toContain('ready');
    expect(controlEventValues).toContain('ready');

    // Other control events should be unique
    expect(chartEventValues).not.toContain('error');
    expect(chartEventValues).not.toContain('uichange');
    expect(chartEventValues).not.toContain('statechange');
  });
});

describe('Event Type Enums', () => {
  it('should be properly typed as enums', () => {
    expect(typeof ChartEventType).toBe('object');
    expect(typeof ControlEventType).toBe('object');
  });

  it('should have immutable enum values', () => {
    const originalValue = ChartEventType.READY;

    // Attempt to modify (should not work in strict mode)
    try {
      (ChartEventType as any).READY = 'modified';
    } catch (e) {
      // Expected in strict mode
    }

    // Value should remain unchanged
    expect(ChartEventType.READY).toBe(originalValue);
  });

  it('should support enum iteration', () => {
    const chartEventKeys = Object.keys(ChartEventType);
    const chartEventValues = Object.values(ChartEventType);

    expect(chartEventKeys.length).toBeGreaterThan(0);
    expect(chartEventValues.length).toBeGreaterThan(0);
    expect(chartEventKeys.length).toBe(chartEventValues.length);
  });

  it('should support enum membership testing', () => {
    expect(Object.values(ChartEventType)).toContain('ready');
    expect(Object.values(ChartEventType)).toContain('click');
    expect(Object.values(ChartEventType)).not.toContain('invalid-event');

    expect(Object.values(ControlEventType)).toContain('ready');
    expect(Object.values(ControlEventType)).toContain('error');
    expect(Object.values(ControlEventType)).not.toContain('invalid-event');
  });

  it('should have consistent naming conventions', () => {
    // Chart event type keys should be UPPER_CASE
    Object.keys(ChartEventType).forEach(key => {
      expect(key).toMatch(/^[A-Z_]+$/);
    });

    // Control event type keys should be UPPER_CASE
    Object.keys(ControlEventType).forEach(key => {
      expect(key).toMatch(/^[A-Z_]+$/);
    });
  });

  it('should have consistent value naming conventions', () => {
    // Chart event values should be lowercase
    Object.values(ChartEventType).forEach(value => {
      expect(value).toMatch(/^[a-z]+$/);
    });

    // Control event values should be lowercase
    Object.values(ControlEventType).forEach(value => {
      expect(value).toMatch(/^[a-z]+$/);
    });
  });
});
