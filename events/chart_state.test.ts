import { describe, it, expect, beforeEach } from 'vitest';
import { ChartState, Focus, Legend, ActionsMenu, Annotations, Cursor, OverlayBox } from './chart_state';
import { Selection } from '../common/selection';
import { Coordinate } from '../common/closure-math';

describe('ChartState', () => {
  let chartState: ChartState;

  beforeEach(() => {
    chartState = new ChartState();
  });

  describe('constructor', () => {
    it('should create ChartState with default values', () => {
      expect(chartState).toBeInstanceOf(ChartState);
      expect(chartState.selected).toBeInstanceOf(Selection);
      expect(chartState.focused).toEqual({ serie: null, datum: null, category: null });
      expect(chartState.annotations).toEqual({ focused: null, expanded: null });
      expect(chartState.legend).toEqual({
        focused: { entry: null },
        currentPageIndex: null,
        totalPages: null
      });
      expect(chartState.actionsMenu).toEqual({ focused: { entryID: null } });
      expect(chartState.cursor).toEqual({ position: null, positionAtLastClick: null });
      expect(chartState.nextFrameOptions).toBeNull();
      expect(chartState.overlayBox).toBeNull();
    });

    it('should create ChartState with initial state', () => {
      const initialState = {
        selected: [{ row: 0, column: 1 }],
        focused: { serie: 1, datum: 2, category: 3 },
        annotations: { focused: { row: 1, column: 2 }, expanded: null },
        legend: { focused: { entry: 1 }, currentPageIndex: 0, totalPages: 5 },
        actionsMenu: { focused: { entryID: 'action1' } },
        nextFrameOptions: { animation: true },
        overlayBox: { left: 10, top: 20, width: 100, height: 50, color: 'red', opacity: 0.5 }
      };

      const state = new ChartState(initialState);

      expect(state.selected.getSelection()).toEqual([{ row: 0, column: 1 }]);
      expect(state.focused).toEqual({ serie: 1, datum: 2, category: 3 });
      expect(state.annotations).toEqual({ focused: { row: 1, column: 2 }, expanded: null });
      expect(state.legend).toEqual({ focused: { entry: 1 }, currentPageIndex: 0, totalPages: 5 });
      expect(state.actionsMenu).toEqual({ focused: { entryID: 'action1' } });
      expect(state.nextFrameOptions).toEqual({ animation: true });
    });

    it('should handle partial initial state', () => {
      const partialState = {
        focused: { serie: 1, datum: null, category: null },
        legend: { focused: { entry: 2 } }
      };

      const state = new ChartState(partialState);

      expect(state.focused.serie).toBe(1);
      expect(state.focused.datum).toBeNull();
      expect(state.focused.category).toBeNull();
      expect(state.legend.focused.entry).toBe(2);
      expect(state.legend.currentPageIndex).toBeNull();
      expect(state.legend.totalPages).toBeNull();
    });

    it('should handle null initial state', () => {
      const state = new ChartState(null);
      expect(state.selected).toBeInstanceOf(Selection);
      expect(state.focused).toEqual({ serie: null, datum: null, category: null });
    });

    it('should handle undefined initial state', () => {
      const state = new ChartState(undefined);
      expect(state.selected).toBeInstanceOf(Selection);
      expect(state.focused).toEqual({ serie: null, datum: null, category: null });
    });
  });

  describe('clone', () => {
    it('should create a deep copy of the chart state', () => {
      chartState.selected.setSelection([{ row: 0, column: 1 }]);
      chartState.focused = { serie: 1, datum: 2, category: 3 };
      chartState.annotations = { focused: { row: 1, column: 2 }, expanded: null };
      chartState.legend = { focused: { entry: 1 }, currentPageIndex: 0, totalPages: 5 };
      chartState.actionsMenu = { focused: { entryID: 'action1' } };
      chartState.cursor = { position: new Coordinate(10, 20), positionAtLastClick: new Coordinate(5, 15) };
      chartState.nextFrameOptions = { animation: true };
      chartState.overlayBox = { left: 10, top: 20, width: 100, height: 50, color: 'red', opacity: 0.5 };

      const cloned = chartState.clone();

      expect(cloned).not.toBe(chartState);
      expect(cloned.selected).not.toBe(chartState.selected);
      expect(cloned.focused).not.toBe(chartState.focused);
      expect(cloned.annotations).not.toBe(chartState.annotations);
      expect(cloned.legend).not.toBe(chartState.legend);
      expect(cloned.actionsMenu).not.toBe(chartState.actionsMenu);
      expect(cloned.cursor).not.toBe(chartState.cursor);
      expect(cloned.nextFrameOptions).not.toBe(chartState.nextFrameOptions);
      expect(cloned.overlayBox).not.toBe(chartState.overlayBox);
    });

    it('should preserve all values in cloned state', () => {
      chartState.selected.setSelection([{ row: 0, column: 1 }]);
      chartState.focused = { serie: 1, datum: 2, category: 3 };
      chartState.annotations = { focused: { row: 1, column: 2 }, expanded: { serieIndex: 1, datumOrCategoryIndex: 2 } };
      chartState.legend = { focused: { entry: 1 }, currentPageIndex: 0, totalPages: 5 };
      chartState.actionsMenu = { focused: { entryID: 'action1', action: { type: 'test' } } };
      chartState.cursor = { position: new Coordinate(10, 20), positionAtLastClick: new Coordinate(5, 15) };
      chartState.nextFrameOptions = { animation: true, duration: 1000 };
      chartState.overlayBox = { left: 10, top: 20, width: 100, height: 50, color: 'red', opacity: 0.5 };

      const cloned = chartState.clone();

      expect(cloned.selected.getSelection()).toEqual([{ row: 0, column: 1 }]);
      expect(cloned.focused).toEqual({ serie: 1, datum: 2, category: 3 });
      expect(cloned.annotations).toEqual({
        focused: { row: 1, column: 2 },
        expanded: { serieIndex: 1, datumOrCategoryIndex: 2 }
      });
      expect(cloned.legend).toEqual({ focused: { entry: 1 }, currentPageIndex: 0, totalPages: 5 });
      expect(cloned.actionsMenu).toEqual({ focused: { entryID: 'action1', action: { type: 'test' } } });
      expect(cloned.cursor.position?.x).toBe(10);
      expect(cloned.cursor.position?.y).toBe(20);
      expect(cloned.cursor.positionAtLastClick?.x).toBe(5);
      expect(cloned.cursor.positionAtLastClick?.y).toBe(15);
      expect(cloned.nextFrameOptions).toEqual({ animation: true, duration: 1000 });
      expect(cloned.overlayBox).toEqual({ left: 10, top: 20, width: 100, height: 50, color: 'red', opacity: 0.5 });
    });

    it('should handle null values in cloned state', () => {
      const cloned = chartState.clone();

      expect(cloned.nextFrameOptions).toBeNull();
      expect(cloned.overlayBox).toBeNull();
      expect(cloned.cursor.position).toBeNull();
      expect(cloned.cursor.positionAtLastClick).toBeNull();
    });
  });

  describe('equals', () => {
    it('should return true for identical states', () => {
      const other = new ChartState();
      expect(chartState.equals(other)).toBe(true);
    });

    it('should return false for different selected values', () => {
      const other = new ChartState();
      chartState.selected.setSelection([{ row: 0, column: 1 }]);
      expect(chartState.equals(other)).toBe(false);
    });

    it('should return false for different focused values', () => {
      const other = new ChartState();
      chartState.focused = { serie: 1, datum: 2, category: 3 };
      expect(chartState.equals(other)).toBe(false);
    });

    it('should return false for different annotations', () => {
      const other = new ChartState();
      chartState.annotations = { focused: { row: 1, column: 2 }, expanded: null };
      expect(chartState.equals(other)).toBe(false);
    });

    it('should return false for different legend state', () => {
      const other = new ChartState();
      chartState.legend = { focused: { entry: 1 }, currentPageIndex: 0, totalPages: 5 };
      expect(chartState.equals(other)).toBe(false);
    });

    it('should return false for different actions menu state', () => {
      const other = new ChartState();
      chartState.actionsMenu = { focused: { entryID: 'action1' } };
      expect(chartState.equals(other)).toBe(false);
    });

    it('should return false for different cursor state', () => {
      const other = new ChartState();
      chartState.cursor = { position: new Coordinate(10, 20), positionAtLastClick: null };
      expect(chartState.equals(other)).toBe(false);
    });

    it('should return false for different nextFrameOptions', () => {
      const other = new ChartState();
      chartState.nextFrameOptions = { animation: true };
      expect(chartState.equals(other)).toBe(false);
    });

    it('should return false for different overlayBox', () => {
      const other = new ChartState();
      chartState.overlayBox = { left: 10, top: 20, width: 100, height: 50, color: 'red', opacity: 0.5 };
      expect(chartState.equals(other)).toBe(false);
    });

    it('should ignore cursor differences when ignoreCursor is true', () => {
      const other = new ChartState();
      chartState.cursor = { position: new Coordinate(10, 20), positionAtLastClick: null };

      expect(chartState.equals(other, false)).toBe(false);
      expect(chartState.equals(other, true)).toBe(true);
    });

    it('should return true for states with identical complex values', () => {
      const state1 = new ChartState();
      const state2 = new ChartState();

      const commonState = {
        selected: [{ row: 0, column: 1 }],
        focused: { serie: 1, datum: 2, category: 3 },
        annotations: { focused: { row: 1, column: 2 }, expanded: null },
        legend: { focused: { entry: 1 }, currentPageIndex: 0, totalPages: 5 },
        actionsMenu: { focused: { entryID: 'action1' } },
        nextFrameOptions: { animation: true }
      };

      state1.selected.setSelection(commonState.selected);
      state1.focused = commonState.focused;
      state1.annotations = commonState.annotations;
      state1.legend = commonState.legend;
      state1.actionsMenu = commonState.actionsMenu;
      state1.nextFrameOptions = commonState.nextFrameOptions;

      state2.selected.setSelection(commonState.selected);
      state2.focused = commonState.focused;
      state2.annotations = commonState.annotations;
      state2.legend = commonState.legend;
      state2.actionsMenu = commonState.actionsMenu;
      state2.nextFrameOptions = commonState.nextFrameOptions;

      expect(state1.equals(state2)).toBe(true);
    });
  });

  describe('Focus interface', () => {
    it('should support Focus interface properties', () => {
      const focus: Focus = {
        serie: 1,
        datum: 2,
        category: 3
      };

      chartState.focused = focus;
      expect(chartState.focused.serie).toBe(1);
      expect(chartState.focused.datum).toBe(2);
      expect(chartState.focused.category).toBe(3);
    });

    it('should support null values in Focus', () => {
      const focus: Focus = {
        serie: null,
        datum: null,
        category: null
      };

      chartState.focused = focus;
      expect(chartState.focused.serie).toBeNull();
      expect(chartState.focused.datum).toBeNull();
      expect(chartState.focused.category).toBeNull();
    });
  });

  describe('Legend interface', () => {
    it('should support Legend interface properties', () => {
      const legend: Legend = {
        focused: { entry: 2 },
        currentPageIndex: 1,
        totalPages: 10
      };

      chartState.legend = legend;
      expect(chartState.legend.focused.entry).toBe(2);
      expect(chartState.legend.currentPageIndex).toBe(1);
      expect(chartState.legend.totalPages).toBe(10);
    });

    it('should support null values in Legend', () => {
      const legend: Legend = {
        focused: { entry: null },
        currentPageIndex: null,
        totalPages: null
      };

      chartState.legend = legend;
      expect(chartState.legend.focused.entry).toBeNull();
      expect(chartState.legend.currentPageIndex).toBeNull();
      expect(chartState.legend.totalPages).toBeNull();
    });
  });

  describe('ActionsMenu interface', () => {
    it('should support ActionsMenu interface properties', () => {
      const actionsMenu: ActionsMenu = {
        focused: {
          entryID: 'menu-item-1',
          action: { type: 'custom', data: { value: 123 } }
        }
      };

      chartState.actionsMenu = actionsMenu;
      expect(chartState.actionsMenu.focused.entryID).toBe('menu-item-1');
      expect(chartState.actionsMenu.focused.action).toEqual({ type: 'custom', data: { value: 123 } });
    });

    it('should support null values in ActionsMenu', () => {
      const actionsMenu: ActionsMenu = {
        focused: { entryID: null }
      };

      chartState.actionsMenu = actionsMenu;
      expect(chartState.actionsMenu.focused.entryID).toBeNull();
      expect(chartState.actionsMenu.focused.action).toBeUndefined();
    });
  });

  describe('Annotations interface', () => {
    it('should support Annotations interface properties', () => {
      const annotations: Annotations = {
        focused: { row: 1, column: 2 },
        expanded: { serieIndex: 3, datumOrCategoryIndex: 4 }
      };

      chartState.annotations = annotations;
      expect(chartState.annotations.focused?.row).toBe(1);
      expect(chartState.annotations.focused?.column).toBe(2);
      expect(chartState.annotations.expanded?.serieIndex).toBe(3);
      expect(chartState.annotations.expanded?.datumOrCategoryIndex).toBe(4);
    });

    it('should support null values in Annotations', () => {
      const annotations: Annotations = {
        focused: null,
        expanded: null
      };

      chartState.annotations = annotations;
      expect(chartState.annotations.focused).toBeNull();
      expect(chartState.annotations.expanded).toBeNull();
    });

    it('should support expanded with null serieIndex', () => {
      const annotations: Annotations = {
        focused: null,
        expanded: { serieIndex: null, datumOrCategoryIndex: 5 }
      };

      chartState.annotations = annotations;
      expect(chartState.annotations.expanded?.serieIndex).toBeNull();
      expect(chartState.annotations.expanded?.datumOrCategoryIndex).toBe(5);
    });
  });

  describe('Cursor interface', () => {
    it('should support Cursor interface properties', () => {
      const cursor: Cursor = {
        position: new Coordinate(100, 200),
        positionAtLastClick: new Coordinate(50, 150)
      };

      chartState.cursor = cursor;
      expect(chartState.cursor.position?.x).toBe(100);
      expect(chartState.cursor.position?.y).toBe(200);
      expect(chartState.cursor.positionAtLastClick?.x).toBe(50);
      expect(chartState.cursor.positionAtLastClick?.y).toBe(150);
    });

    it('should support null values in Cursor', () => {
      const cursor: Cursor = {
        position: null,
        positionAtLastClick: null
      };

      chartState.cursor = cursor;
      expect(chartState.cursor.position).toBeNull();
      expect(chartState.cursor.positionAtLastClick).toBeNull();
    });
  });

  describe('OverlayBox interface', () => {
    it('should support OverlayBox interface properties', () => {
      const overlayBox: OverlayBox = {
        left: 10,
        top: 20,
        width: 100,
        height: 50,
        color: 'rgba(255, 0, 0, 0.5)',
        opacity: 0.7
      };

      chartState.overlayBox = overlayBox;
      expect(chartState.overlayBox?.left).toBe(10);
      expect(chartState.overlayBox?.top).toBe(20);
      expect(chartState.overlayBox?.width).toBe(100);
      expect(chartState.overlayBox?.height).toBe(50);
      expect(chartState.overlayBox?.color).toBe('rgba(255, 0, 0, 0.5)');
      expect(chartState.overlayBox?.opacity).toBe(0.7);
    });

    it('should support different color formats', () => {
      const overlayBox: OverlayBox = {
        left: 0,
        top: 0,
        width: 10,
        height: 10,
        color: '#FF0000',
        opacity: 1.0
      };

      chartState.overlayBox = overlayBox;
      expect(chartState.overlayBox?.color).toBe('#FF0000');
      expect(chartState.overlayBox?.opacity).toBe(1.0);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty selection', () => {
      chartState.selected.setSelection([]);
      const cloned = chartState.clone();
      expect(cloned.selected.getSelection()).toEqual([]);
    });

    it('should handle complex nested objects in nextFrameOptions', () => {
      chartState.nextFrameOptions = {
        animation: {
          duration: 1000,
          easing: 'ease-in-out',
          properties: ['opacity', 'transform']
        },
        layout: {
          width: 800,
          height: 600
        }
      };

      const cloned = chartState.clone();
      expect(cloned.nextFrameOptions).toEqual(chartState.nextFrameOptions);
      expect(cloned.nextFrameOptions).not.toBe(chartState.nextFrameOptions);
    });

    it('should handle state comparison with complex objects', () => {
      const state1 = new ChartState();
      const state2 = new ChartState();

      const complexOptions = {
        nested: {
          array: [1, 2, 3],
          object: { key: 'value' }
        }
      };

      state1.nextFrameOptions = complexOptions;
      state2.nextFrameOptions = { ...complexOptions };

      // Should be equal due to deep comparison
      expect(state1.equals(state2)).toBe(true);
    });

    it('should handle coordinate edge cases', () => {
      chartState.cursor = {
        position: new Coordinate(0, 0),
        positionAtLastClick: new Coordinate(-10, -20)
      };

      const cloned = chartState.clone();
      expect(cloned.cursor.position?.x).toBe(0);
      expect(cloned.cursor.position?.y).toBe(0);
      expect(cloned.cursor.positionAtLastClick?.x).toBe(-10);
      expect(cloned.cursor.positionAtLastClick?.y).toBe(-20);
    });
  });
});
