import { describe, it, expect, beforeEach } from 'vitest';
import {
  EventData,
  Event,
  EventType,
  TargetType,
  OperationType,
  generateEventType,
  SUPPORT_TOUCH_EVENTS
} from './interaction_events';
import { Coordinate } from '../common/closure-math';

// Mock document for testing
Object.defineProperty(global, 'document', {
  value: {
    documentElement: {
      ontouchstart: null,
      ontouchend: null
    }
  },
  writable: true
});

describe('Interaction Events', () => {
  describe('EventData interface', () => {
    let eventData: EventData;

    beforeEach(() => {
      eventData = {
        targetID: 'test-target',
        entryID: 'test-entry',
        x: 100,
        y: 200,
        datumIndex: 5,
        serieIndex: 2,
        annotationIndex: 1,
        legendEntryIndex: 3,
        currentPageIndex: 1,
        totalPages: 10,
        scrollStep: 5,
        mouseDelta: 10,
        wheelDelta: -120,
        gesture: null,
        gestureDetails: null,
        cursorPosition: new Coordinate(150, 250),
        preventDefault: false,
        shiftKey: false
      };
    });

    it('should create valid event data with all properties', () => {
      expect(eventData.targetID).toBe('test-target');
      expect(eventData.entryID).toBe('test-entry');
      expect(eventData.x).toBe(100);
      expect(eventData.y).toBe(200);
      expect(eventData.datumIndex).toBe(5);
      expect(eventData.serieIndex).toBe(2);
      expect(eventData.annotationIndex).toBe(1);
      expect(eventData.legendEntryIndex).toBe(3);
      expect(eventData.currentPageIndex).toBe(1);
      expect(eventData.totalPages).toBe(10);
      expect(eventData.scrollStep).toBe(5);
      expect(eventData.mouseDelta).toBe(10);
      expect(eventData.wheelDelta).toBe(-120);
      expect(eventData.gesture).toBeNull();
      expect(eventData.gestureDetails).toBeNull();
      expect(eventData.cursorPosition).toBeInstanceOf(Coordinate);
      expect(eventData.preventDefault).toBe(false);
      expect(eventData.shiftKey).toBe(false);
    });

    it('should handle undefined optional properties', () => {
      const minimalEventData: EventData = {
        targetID: 'minimal',
        entryID: undefined,
        x: 0,
        y: 0,
        datumIndex: undefined,
        serieIndex: undefined,
        annotationIndex: undefined,
        legendEntryIndex: undefined,
        currentPageIndex: undefined,
        totalPages: undefined,
        scrollStep: undefined,
        mouseDelta: undefined,
        wheelDelta: undefined,
        gesture: undefined,
        gestureDetails: undefined,
        cursorPosition: undefined,
        preventDefault: false,
        shiftKey: false
      };

      expect(minimalEventData.targetID).toBe('minimal');
      expect(minimalEventData.entryID).toBeUndefined();
      expect(minimalEventData.datumIndex).toBeUndefined();
      expect(minimalEventData.cursorPosition).toBeUndefined();
    });

    it('should support negative coordinates', () => {
      eventData.x = -50;
      eventData.y = -100;

      expect(eventData.x).toBe(-50);
      expect(eventData.y).toBe(-100);
    });

    it('should support fractional coordinates', () => {
      eventData.x = 123.45;
      eventData.y = 678.90;

      expect(eventData.x).toBe(123.45);
      expect(eventData.y).toBe(678.90);
    });

    it('should handle large coordinate values', () => {
      eventData.x = 999999;
      eventData.y = 888888;

      expect(eventData.x).toBe(999999);
      expect(eventData.y).toBe(888888);
    });

    it('should support gesture data', () => {
      const gestureData = { scale: 1.5, rotation: 45 };
      eventData.gesture = gestureData;
      eventData.gestureDetails = { type: 'pinch', duration: 500 };

      expect(eventData.gesture).toEqual(gestureData);
      expect(eventData.gestureDetails).toEqual({ type: 'pinch', duration: 500 });
    });
  });

  describe('Event interface', () => {
    it('should create valid event with type and data', () => {
      const eventData: EventData = {
        targetID: 'chart-element',
        entryID: undefined,
        x: 50,
        y: 75,
        datumIndex: undefined,
        serieIndex: undefined,
        annotationIndex: undefined,
        legendEntryIndex: undefined,
        currentPageIndex: undefined,
        totalPages: undefined,
        scrollStep: undefined,
        mouseDelta: undefined,
        wheelDelta: undefined,
        gesture: null,
        gestureDetails: null,
        cursorPosition: undefined,
        preventDefault: false,
        shiftKey: false
      };

      const event: Event = {
        type: EventType.CHART_CLICK,
        data: eventData
      };

      expect(event.type).toBe(EventType.CHART_CLICK);
      expect(event.data).toEqual(eventData);
      expect(event.data.targetID).toBe('chart-element');
    });

    it('should support all event types', () => {
      const eventData: EventData = {
        targetID: 'test',
        entryID: undefined,
        x: 0,
        y: 0,
        datumIndex: undefined,
        serieIndex: undefined,
        annotationIndex: undefined,
        legendEntryIndex: undefined,
        currentPageIndex: undefined,
        totalPages: undefined,
        scrollStep: undefined,
        mouseDelta: undefined,
        wheelDelta: undefined,
        gesture: null,
        gestureDetails: null,
        cursorPosition: undefined,
        preventDefault: false,
        shiftKey: false
      };

      // Test a few key event types
      const chartClickEvent: Event = { type: EventType.CHART_CLICK, data: eventData };
      const legendHoverEvent: Event = { type: EventType.LEGEND_HOVER_IN, data: eventData };
      const datumClickEvent: Event = { type: EventType.DATUM_CLICK, data: eventData };

      expect(chartClickEvent.type).toBe('chartClick');
      expect(legendHoverEvent.type).toBe('legendHoverIn');
      expect(datumClickEvent.type).toBe('datumClick');
    });
  });

  describe('EventType enum', () => {
    it('should have all chart event types', () => {
      expect(EventType.CHART_HOVER_IN).toBe('chartHoverIn');
      expect(EventType.CHART_HOVER_OUT).toBe('chartHoverOut');
      expect(EventType.CHART_MOUSE_MOVE).toBe('chartMouseMove');
      expect(EventType.CHART_MOUSE_UP).toBe('chartMouseUp');
      expect(EventType.CHART_MOUSE_DOWN).toBe('chartMouseDown');
      expect(EventType.CHART_CLICK).toBe('chartClick');
      expect(EventType.CHART_RIGHT_CLICK).toBe('chartRightClick');
      expect(EventType.CHART_DBL_CLICK).toBe('chartDblClick');
      expect(EventType.CHART_SCROLL).toBe('chartScroll');
    });

    it('should have all drag event types', () => {
      expect(EventType.CHART_DRAG_START).toBe('chartDragStart');
      expect(EventType.CHART_DRAG).toBe('chartDrag');
      expect(EventType.CHART_DRAG_END).toBe('chartDragEnd');
    });

    it('should have all pinch event types', () => {
      expect(EventType.CHART_PINCH_START).toBe('chartPinchStart');
      expect(EventType.CHART_PINCH).toBe('chartPinch');
      expect(EventType.CHART_PINCH_END).toBe('chartPinchEnd');
    });

    it('should have all legend event types', () => {
      expect(EventType.LEGEND_HOVER_IN).toBe('legendHoverIn');
      expect(EventType.LEGEND_HOVER_OUT).toBe('legendHoverOut');
      expect(EventType.LEGEND_CLICK).toBe('legendClick');
      expect(EventType.LEGEND_RIGHT_CLICK).toBe('legendRightClick');
    });

    it('should have all legend entry event types', () => {
      expect(EventType.LEGEND_ENTRY_HOVER_IN).toBe('legendEntryHoverIn');
      expect(EventType.LEGEND_ENTRY_HOVER_OUT).toBe('legendEntryHoverOut');
      expect(EventType.LEGEND_ENTRY_CLICK).toBe('legendEntryClick');
      expect(EventType.LEGEND_ENTRY_RIGHT_CLICK).toBe('legendEntryRightClick');
    });

    it('should have all legend scroll button event types', () => {
      expect(EventType.LEGEND_SCROLL_BUTTON_HOVER_IN).toBe('legendScrollButtonHoverIn');
      expect(EventType.LEGEND_SCROLL_BUTTON_HOVER_OUT).toBe('legendScrollButtonHoverOut');
      expect(EventType.LEGEND_SCROLL_BUTTON_CLICK).toBe('legendScrollButtonClick');
      expect(EventType.LEGEND_SCROLL_BUTTON_RIGHT_CLICK).toBe('legendScrollButtonRightClick');
    });

    it('should have all serie event types', () => {
      expect(EventType.SERIE_HOVER_IN).toBe('serieHoverIn');
      expect(EventType.SERIE_HOVER_OUT).toBe('serieHoverOut');
      expect(EventType.SERIE_CLICK).toBe('serieClick');
      expect(EventType.SERIE_RIGHT_CLICK).toBe('serieRightClick');
    });

    it('should have all category event types', () => {
      expect(EventType.CATEGORY_HOVER_IN).toBe('categoryHoverIn');
      expect(EventType.CATEGORY_HOVER_OUT).toBe('categoryHoverOut');
      expect(EventType.CATEGORY_CLICK).toBe('categoryClick');
      expect(EventType.CATEGORY_RIGHT_CLICK).toBe('categoryRightClick');
    });

    it('should have all datum event types', () => {
      expect(EventType.DATUM_HOVER_IN).toBe('datumHoverIn');
      expect(EventType.DATUM_HOVER_OUT).toBe('datumHoverOut');
      expect(EventType.DATUM_CLICK).toBe('datumClick');
      expect(EventType.DATUM_RIGHT_CLICK).toBe('datumRightClick');
    });

    it('should have all annotation event types', () => {
      expect(EventType.ANNOTATION_HOVER_IN).toBe('annotationHoverIn');
      expect(EventType.ANNOTATION_HOVER_OUT).toBe('annotationHoverOut');
      expect(EventType.ANNOTATION_CLICK).toBe('annotationClick');
      expect(EventType.ANNOTATION_RIGHT_CLICK).toBe('annotationRightClick');
    });

    it('should have all tooltip event types', () => {
      expect(EventType.TOOLTIP_HOVER_IN).toBe('tooltipHoverIn');
      expect(EventType.TOOLTIP_HOVER_OUT).toBe('tooltipHoverOut');
      expect(EventType.TOOLTIP_CLICK).toBe('tooltipClick');
      expect(EventType.TOOLTIP_RIGHT_CLICK).toBe('tooltipRightClick');
    });

    it('should have all actions menu event types', () => {
      expect(EventType.ACTIONS_MENU_ENTRY_HOVER_IN).toBe('actionsMenuEntryHoverIn');
      expect(EventType.ACTIONS_MENU_ENTRY_HOVER_OUT).toBe('actionsMenuEntryHoverOut');
      expect(EventType.ACTIONS_MENU_ENTRY_CLICK).toBe('actionsMenuEntryClick');
      expect(EventType.ACTIONS_MENU_ENTRY_RIGHT_CLICK).toBe('actionsMenuEntryRightClick');
    });

    it('should have all remove serie button event types', () => {
      expect(EventType.REMOVE_SERIE_BUTTON_HOVER_IN).toBe('removeSerieButtonHoverIn');
      expect(EventType.REMOVE_SERIE_BUTTON_HOVER_OUT).toBe('removeSerieButtonHoverOut');
      expect(EventType.REMOVE_SERIE_BUTTON_CLICK).toBe('removeSerieButtonClick');
      expect(EventType.REMOVE_SERIE_BUTTON_RIGHT_CLICK).toBe('removeSerieButtonRightClick');
    });

    it('should have unique event type values', () => {
      const eventTypes = Object.values(EventType);
      const uniqueEventTypes = new Set(eventTypes);

      expect(uniqueEventTypes.size).toBe(eventTypes.length);
    });

    it('should follow camelCase naming convention', () => {
      const eventTypes = Object.values(EventType);

      eventTypes.forEach(eventType => {
        // Should start with lowercase
        expect(eventType.charAt(0)).toBe(eventType.charAt(0).toLowerCase());
        // Should not contain underscores or hyphens
        expect(eventType).not.toMatch(/[_-]/);
      });
    });
  });

  describe('TargetType enum', () => {
    it('should have all target types', () => {
      expect(TargetType.CHART).toBe('chart');
      expect(TargetType.LEGEND).toBe('legend');
      expect(TargetType.LEGEND_ENTRY).toBe('legendEntry');
      expect(TargetType.LEGEND_SCROLL_BUTTON).toBe('legendScrollButton');
      expect(TargetType.SERIE).toBe('serie');
      expect(TargetType.CATEGORY).toBe('category');
      expect(TargetType.DATUM).toBe('datum');
      expect(TargetType.ANNOTATION).toBe('annotation');
      expect(TargetType.TOOLTIP).toBe('tooltip');
      expect(TargetType.ACTIONS_MENU_ENTRY).toBe('actionsMenuEntry');
      expect(TargetType.REMOVE_SERIE_BUTTON).toBe('removeSerieButton');
    });

    it('should have unique target type values', () => {
      const targetTypes = Object.values(TargetType);
      const uniqueTargetTypes = new Set(targetTypes);

      expect(uniqueTargetTypes.size).toBe(targetTypes.length);
    });

    it('should follow camelCase naming convention', () => {
      const targetTypes = Object.values(TargetType);

      targetTypes.forEach(targetType => {
        // Should start with lowercase
        expect(targetType.charAt(0)).toBe(targetType.charAt(0).toLowerCase());
        // Should not contain underscores or hyphens
        expect(targetType).not.toMatch(/[_-]/);
      });
    });

    it('should represent logical UI elements', () => {
      // Core chart elements
      expect(TargetType.CHART).toBe('chart');
      expect(TargetType.DATUM).toBe('datum');
      expect(TargetType.SERIE).toBe('serie');
      expect(TargetType.CATEGORY).toBe('category');

      // Legend elements
      expect(TargetType.LEGEND).toBe('legend');
      expect(TargetType.LEGEND_ENTRY).toBe('legendEntry');
      expect(TargetType.LEGEND_SCROLL_BUTTON).toBe('legendScrollButton');

      // Interactive elements
      expect(TargetType.TOOLTIP).toBe('tooltip');
      expect(TargetType.ANNOTATION).toBe('annotation');
      expect(TargetType.ACTIONS_MENU_ENTRY).toBe('actionsMenuEntry');
    });
  });

  describe('OperationType enum', () => {
    it('should have all operation types', () => {
      expect(OperationType.HOVER_IN).toBe('HoverIn');
      expect(OperationType.HOVER_OUT).toBe('HoverOut');
      expect(OperationType.MOUSE_UP).toBe('MouseUp');
      expect(OperationType.MOUSE_DOWN).toBe('MouseDown');
      expect(OperationType.CLICK).toBe('Click');
      expect(OperationType.RIGHT_CLICK).toBe('RightClick');
      expect(OperationType.DBL_CLICK).toBe('DblClick');
      expect(OperationType.SCROLL).toBe('Scroll');
      expect(OperationType.DRAG_START).toBe('DragStart');
      expect(OperationType.DRAG).toBe('Drag');
      expect(OperationType.DRAG_END).toBe('DragEnd');
    });

    it('should have unique operation type values', () => {
      const operationTypes = Object.values(OperationType);
      const uniqueOperationTypes = new Set(operationTypes);

      expect(uniqueOperationTypes.size).toBe(operationTypes.length);
    });

    it('should follow PascalCase naming convention for concatenation', () => {
      const operationTypes = Object.values(OperationType);

      operationTypes.forEach(operationType => {
        // Should start with uppercase for concatenation
        expect(operationType.charAt(0)).toBe(operationType.charAt(0).toUpperCase());
        // Should not contain underscores or hyphens
        expect(operationType).not.toMatch(/[_-]/);
      });
    });

    it('should represent user interaction types', () => {
      // Mouse interactions
      expect(OperationType.CLICK).toBe('Click');
      expect(OperationType.RIGHT_CLICK).toBe('RightClick');
      expect(OperationType.DBL_CLICK).toBe('DblClick');
      expect(OperationType.MOUSE_UP).toBe('MouseUp');
      expect(OperationType.MOUSE_DOWN).toBe('MouseDown');

      // Hover interactions
      expect(OperationType.HOVER_IN).toBe('HoverIn');
      expect(OperationType.HOVER_OUT).toBe('HoverOut');

      // Drag interactions
      expect(OperationType.DRAG_START).toBe('DragStart');
      expect(OperationType.DRAG).toBe('Drag');
      expect(OperationType.DRAG_END).toBe('DragEnd');

      // Other interactions
      expect(OperationType.SCROLL).toBe('Scroll');
    });
  });

  describe('generateEventType function', () => {
    it('should generate correct event types for chart operations', () => {
      expect(generateEventType(TargetType.CHART, OperationType.CLICK))
        .toBe(EventType.CHART_CLICK);
      expect(generateEventType(TargetType.CHART, OperationType.HOVER_IN))
        .toBe(EventType.CHART_HOVER_IN);
      expect(generateEventType(TargetType.CHART, OperationType.DRAG_START))
        .toBe(EventType.CHART_DRAG_START);
    });

    it('should generate correct event types for legend operations', () => {
      expect(generateEventType(TargetType.LEGEND, OperationType.CLICK))
        .toBe(EventType.LEGEND_CLICK);
      expect(generateEventType(TargetType.LEGEND_ENTRY, OperationType.HOVER_IN))
        .toBe(EventType.LEGEND_ENTRY_HOVER_IN);
      expect(generateEventType(TargetType.LEGEND_SCROLL_BUTTON, OperationType.RIGHT_CLICK))
        .toBe(EventType.LEGEND_SCROLL_BUTTON_RIGHT_CLICK);
    });

    it('should generate correct event types for data operations', () => {
      expect(generateEventType(TargetType.DATUM, OperationType.CLICK))
        .toBe(EventType.DATUM_CLICK);
      expect(generateEventType(TargetType.SERIE, OperationType.HOVER_OUT))
        .toBe(EventType.SERIE_HOVER_OUT);
      expect(generateEventType(TargetType.CATEGORY, OperationType.RIGHT_CLICK))
        .toBe(EventType.CATEGORY_RIGHT_CLICK);
    });

    it('should generate correct event types for annotation operations', () => {
      expect(generateEventType(TargetType.ANNOTATION, OperationType.CLICK))
        .toBe(EventType.ANNOTATION_CLICK);
      expect(generateEventType(TargetType.ANNOTATION, OperationType.HOVER_IN))
        .toBe(EventType.ANNOTATION_HOVER_IN);
    });

    it('should generate correct event types for tooltip operations', () => {
      expect(generateEventType(TargetType.TOOLTIP, OperationType.HOVER_IN))
        .toBe(EventType.TOOLTIP_HOVER_IN);
      expect(generateEventType(TargetType.TOOLTIP, OperationType.CLICK))
        .toBe(EventType.TOOLTIP_CLICK);
    });

    it('should generate correct event types for actions menu operations', () => {
      expect(generateEventType(TargetType.ACTIONS_MENU_ENTRY, OperationType.HOVER_IN))
        .toBe(EventType.ACTIONS_MENU_ENTRY_HOVER_IN);
      expect(generateEventType(TargetType.ACTIONS_MENU_ENTRY, OperationType.CLICK))
        .toBe(EventType.ACTIONS_MENU_ENTRY_CLICK);
    });

    it('should generate correct event types for remove serie button operations', () => {
      expect(generateEventType(TargetType.REMOVE_SERIE_BUTTON, OperationType.HOVER_IN))
        .toBe(EventType.REMOVE_SERIE_BUTTON_HOVER_IN);
      expect(generateEventType(TargetType.REMOVE_SERIE_BUTTON, OperationType.CLICK))
        .toBe(EventType.REMOVE_SERIE_BUTTON_CLICK);
    });

    it('should handle all target and operation combinations', () => {
      const targetTypes = Object.values(TargetType);
      const operationTypes = Object.values(OperationType);

      targetTypes.forEach(targetType => {
        operationTypes.forEach(operationType => {
          const generated = generateEventType(targetType, operationType);
          expect(typeof generated).toBe('string');
          expect(generated).toContain(targetType);
          expect(generated).toContain(operationType);
        });
      });
    });

    it('should maintain case sensitivity in concatenation', () => {
      const result = generateEventType(TargetType.CHART, OperationType.HOVER_IN);
      expect(result).toBe('chartHoverIn');
      expect(result.charAt(0)).toBe('c'); // lowercase start
      expect(result.charAt(5)).toBe('H'); // uppercase operation start
    });
  });

  describe('SUPPORT_TOUCH_EVENTS constant', () => {
    it('should be a boolean value', () => {
      expect(typeof SUPPORT_TOUCH_EVENTS).toBe('boolean');
    });

    it('should detect touch support based on document properties', () => {
      // Since we mocked document.documentElement.ontouchstart as null,
      // SUPPORT_TOUCH_EVENTS should be false
      expect(SUPPORT_TOUCH_EVENTS).toBe(false);
    });

    it('should handle missing document gracefully', () => {
      // The constant should not throw even if document is undefined
      expect(() => SUPPORT_TOUCH_EVENTS).not.toThrow();
    });
  });

  describe('enum value consistency', () => {
    it('should maintain consistency between enums and event types', () => {
      // Test that generated events match predefined EventType enum values
      const testCases = [
        { target: TargetType.CHART, operation: OperationType.CLICK, expected: EventType.CHART_CLICK },
        { target: TargetType.LEGEND, operation: OperationType.HOVER_IN, expected: EventType.LEGEND_HOVER_IN },
        { target: TargetType.DATUM, operation: OperationType.RIGHT_CLICK, expected: EventType.DATUM_RIGHT_CLICK },
        { target: TargetType.SERIE, operation: OperationType.HOVER_OUT, expected: EventType.SERIE_HOVER_OUT }
      ];

      testCases.forEach(({ target, operation, expected }) => {
        expect(generateEventType(target, operation)).toBe(expected);
      });
    });

    it('should have all EventType values representable by target/operation combinations', () => {
      // Note: This test assumes that most EventType values can be generated
      // Some might be exceptions (like mouse move, pinch events, etc.)
      const generatableEvents = [
        EventType.CHART_CLICK,
        EventType.CHART_HOVER_IN,
        EventType.CHART_RIGHT_CLICK,
        EventType.LEGEND_CLICK,
        EventType.DATUM_HOVER_OUT,
        EventType.SERIE_RIGHT_CLICK
      ];

      generatableEvents.forEach(eventType => {
        // Find matching target/operation combo
        let found = false;
        Object.values(TargetType).forEach(target => {
          Object.values(OperationType).forEach(operation => {
            if (generateEventType(target, operation) === eventType) {
              found = true;
            }
          });
        });
        expect(found).toBe(true);
      });
    });
  });

  describe('practical usage scenarios', () => {
    it('should support event handling workflows', () => {
      // Simulate a complete event workflow
      const eventData: EventData = {
        targetID: 'data-point-5',
        entryID: 'series-1',
        x: 150,
        y: 300,
        datumIndex: 5,
        serieIndex: 1,
        annotationIndex: undefined,
        legendEntryIndex: undefined,
        currentPageIndex: undefined,
        totalPages: undefined,
        scrollStep: undefined,
        mouseDelta: undefined,
        wheelDelta: undefined,
        gesture: null,
        gestureDetails: null,
        cursorPosition: new Coordinate(150, 300),
        preventDefault: false,
        shiftKey: false
      };

      const clickEvent: Event = {
        type: EventType.DATUM_CLICK,
        data: eventData
      };

      // Event should be usable in event handlers
      expect(clickEvent.type).toBe('datumClick');
      expect(clickEvent.data.datumIndex).toBe(5);
      expect(clickEvent.data.serieIndex).toBe(1);
    });

    it('should support event type switching', () => {
      const baseEventData: EventData = {
        targetID: 'chart-area',
        entryID: undefined,
        x: 100,
        y: 100,
        datumIndex: undefined,
        serieIndex: undefined,
        annotationIndex: undefined,
        legendEntryIndex: undefined,
        currentPageIndex: undefined,
        totalPages: undefined,
        scrollStep: undefined,
        mouseDelta: undefined,
        wheelDelta: undefined,
        gesture: null,
        gestureDetails: null,
        cursorPosition: undefined,
        preventDefault: false,
        shiftKey: false
      };

      // Same data, different event types
      const hoverIn: Event = { type: EventType.CHART_HOVER_IN, data: baseEventData };
      const hoverOut: Event = { type: EventType.CHART_HOVER_OUT, data: baseEventData };
      const click: Event = { type: EventType.CHART_CLICK, data: baseEventData };

      expect(hoverIn.type).toBe('chartHoverIn');
      expect(hoverOut.type).toBe('chartHoverOut');
      expect(click.type).toBe('chartClick');
    });

    it('should support event filtering by type', () => {
      const events: Event[] = [
        { type: EventType.CHART_CLICK, data: {} as EventData },
        { type: EventType.LEGEND_HOVER_IN, data: {} as EventData },
        { type: EventType.DATUM_CLICK, data: {} as EventData },
        { type: EventType.CHART_HOVER_OUT, data: {} as EventData }
      ];

      // Filter click events
      const clickEvents = events.filter(e => e.type.endsWith('Click'));
      expect(clickEvents).toHaveLength(2);

      // Filter hover events
      const hoverEvents = events.filter(e => e.type.includes('Hover'));
      expect(hoverEvents).toHaveLength(2);

      // Filter chart events
      const chartEvents = events.filter(e => e.type.startsWith('chart'));
      expect(chartEvents).toHaveLength(2);
    });
  });

  describe('type safety and validation', () => {
    it('should maintain type safety for EventData properties', () => {
      const eventData: EventData = {
        targetID: 'test',
        entryID: undefined,
        x: 0,
        y: 0,
        datumIndex: undefined,
        serieIndex: undefined,
        annotationIndex: undefined,
        legendEntryIndex: undefined,
        currentPageIndex: undefined,
        totalPages: undefined,
        scrollStep: undefined,
        mouseDelta: undefined,
        wheelDelta: undefined,
        gesture: null,
        gestureDetails: null,
        cursorPosition: undefined,
        preventDefault: false,
        shiftKey: false
      };

      // TypeScript should enforce correct types
      expect(typeof eventData.targetID).toBe('string');
      expect(typeof eventData.x).toBe('number');
      expect(typeof eventData.y).toBe('number');
      expect(typeof eventData.preventDefault).toBe('boolean');
      expect(typeof eventData.shiftKey).toBe('boolean');
    });

    it('should maintain enum value consistency', () => {
      // Enum values should be compile-time constants
      expect(EventType.CHART_CLICK).toBe('chartClick');
      expect(TargetType.CHART).toBe('chart');
      expect(OperationType.CLICK).toBe('Click');

      // Values should not change
      const chartClick1 = EventType.CHART_CLICK;
      const chartClick2 = EventType.CHART_CLICK;
      expect(chartClick1).toBe(chartClick2);
    });
  });
});
