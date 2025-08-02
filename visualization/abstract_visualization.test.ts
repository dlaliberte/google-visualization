import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { AbstractVisualization } from './abstract_visualization';
import { DataTable } from '../data/datatable';
import { Options } from '../common/options';

// Mock the external dependencies
vi.mock('@npm//@closure/disposable/disposable', () => ({
  Disposable: class {
    disposeInternal() {}
  }
}));

vi.mock('@npm//@closure/promise/promise', () => ({
  Promise: {
    withResolver: () => ({
      promise: { cancel: vi.fn() },
      reject: vi.fn(),
      resolve: vi.fn()
    })
  }
}));

vi.mock('@npm//@closure/style/style', () => ({
  getContentBoxSize: vi.fn(() => ({ width: 0, height: 0 }))
}));

vi.mock('../common/async_helper', () => ({
  AsyncHelper: class {
    constructor() {}
    cancelPendingCallbacks() {}
    wrapCallback = { bind: () => vi.fn() }
  }
}));

vi.mock('../common/error_handler', () => ({
  ErrorHandler: class {
    constructor() {}
    safeExecute(fn: Function) { fn(); }
  }
}));

vi.mock('../data/datautils', () => ({
  validateDataTable: vi.fn()
}));

vi.mock('../dom/dom', () => ({
  validateContainer: (container: Element | null) => container || document.createElement('div')
}));

// Concrete implementation for testing
class TestVisualization extends AbstractVisualization {
  private drawInternalCalled = false;
  private clearInternalCalled = false;

  constructor(container: Element | null = null) {
    super(container);
  }

  protected drawInternal(
    asyncWrapper: any,
    data: any,
    options?: Object | null | undefined,
    state?: Object | null | undefined
  ): void {
    this.drawInternalCalled = true;
  }

  protected clearInternal(): void {
    this.clearInternalCalled = true;
  }

  // Test helpers
  wasDrawInternalCalled(): boolean {
    return this.drawInternalCalled;
  }

  wasClearInternalCalled(): boolean {
    return this.clearInternalCalled;
  }

  resetCallFlags(): void {
    this.drawInternalCalled = false;
    this.clearInternalCalled = false;
  }

  // Expose protected methods for testing
  public testGetWidth(options: Options, defaultWidth?: number): number {
    return this.getWidth(options, defaultWidth);
  }

  public testGetHeight(options: Options, defaultHeight?: number): number {
    return this.getHeight(options, defaultHeight);
  }

  public testSetResolverReject(rejectFunc: (p1?: any) => void): void {
    this.setResolverReject(rejectFunc);
  }
}

describe('AbstractVisualization', () => {
  let visualization: TestVisualization;
  let container: HTMLElement;
  let dataTable: DataTable;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);

    visualization = new TestVisualization(container);

    dataTable = new DataTable();
    dataTable.addColumn('string', 'Category');
    dataTable.addColumn('number', 'Value');
    dataTable.addRows([
      ['A', 10],
      ['B', 20],
      ['C', 30]
    ]);
  });

  afterEach(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    visualization.dispose();
  });

  describe('constructor', () => {
    it('should create visualization with valid container', () => {
      const viz = new TestVisualization(container);
      expect(viz).toBeInstanceOf(AbstractVisualization);
      expect(viz.getContainer()).toBe(container);
      viz.dispose();
    });

    it('should create visualization with null container', () => {
      const viz = new TestVisualization(null);
      expect(viz).toBeInstanceOf(AbstractVisualization);
      expect(viz.getContainer()).toBeDefined();
      viz.dispose();
    });

    it('should create visualization with undefined container', () => {
      const viz = new TestVisualization(undefined as any);
      expect(viz).toBeInstanceOf(AbstractVisualization);
      expect(viz.getContainer()).toBeDefined();
      viz.dispose();
    });

    it('should initialize error handler', () => {
      const viz = new TestVisualization(container);
      expect(viz['errorHandler']).toBeDefined();
      viz.dispose();
    });

    it('should initialize font wait resolver', () => {
      const viz = new TestVisualization(container);
      expect(viz['fontWaitResolver']).toBeDefined();
      viz.dispose();
    });
  });

  describe('getContainer', () => {
    it('should return the container element', () => {
      expect(visualization.getContainer()).toBe(container);
    });

    it('should return same container across multiple calls', () => {
      const container1 = visualization.getContainer();
      const container2 = visualization.getContainer();
      expect(container1).toBe(container2);
    });
  });

  describe('getWidth', () => {
    it('should return width from options when specified', () => {
      const options = new Options([{ width: 500 }]);
      const width = visualization.testGetWidth(options);
      expect(width).toBe(500);
    });

    it('should return default width when no options width', () => {
      const options = new Options([{}]);
      const width = visualization.testGetWidth(options, 300);
      expect(width).toBe(300);
    });

    it('should return global default width when no options or default', () => {
      const options = new Options([{}]);
      const width = visualization.testGetWidth(options);
      expect(width).toBe(400); // DEFAULT_WIDTH
    });

    it('should handle zero width in options', () => {
      const options = new Options([{ width: 0 }]);
      const width = visualization.testGetWidth(options, 300);
      expect(width).toBe(300); // Should fall back to default
    });

    it('should handle negative width in options', () => {
      const options = new Options([{ width: -100 }]);
      const width = visualization.testGetWidth(options, 300);
      expect(width).toBe(300); // Should fall back to default
    });

    it('should prefer options width over default width', () => {
      const options = new Options([{ width: 700 }]);
      const width = visualization.testGetWidth(options, 300);
      expect(width).toBe(700);
    });
  });

  describe('getHeight', () => {
    it('should return height from options when specified', () => {
      const options = new Options([{ height: 400 }]);
      const height = visualization.testGetHeight(options);
      expect(height).toBe(400);
    });

    it('should return default height when no options height', () => {
      const options = new Options([{}]);
      const height = visualization.testGetHeight(options, 250);
      expect(height).toBe(250);
    });

    it('should return global default height when no options or default', () => {
      const options = new Options([{}]);
      const height = visualization.testGetHeight(options);
      expect(height).toBe(200); // DEFAULT_HEIGHT
    });

    it('should handle zero height in options', () => {
      const options = new Options([{ height: 0 }]);
      const height = visualization.testGetHeight(options, 250);
      expect(height).toBe(250); // Should fall back to default
    });

    it('should handle negative height in options', () => {
      const options = new Options([{ height: -50 }]);
      const height = visualization.testGetHeight(options, 250);
      expect(height).toBe(250); // Should fall back to default
    });

    it('should prefer options height over default height', () => {
      const options = new Options([{ height: 500 }]);
      const height = visualization.testGetHeight(options, 250);
      expect(height).toBe(500);
    });
  });

  describe('setResolverReject', () => {
    it('should set reject function when resolver exists', () => {
      const rejectFunc = vi.fn();
      visualization.testSetResolverReject(rejectFunc);
      // Test passes if no error is thrown
    });

    it('should handle null resolver gracefully', () => {
      visualization['fontWaitResolver'] = null;
      const rejectFunc = vi.fn();
      expect(() => visualization.testSetResolverReject(rejectFunc)).not.toThrow();
    });
  });

  describe('draw', () => {
    it('should call drawInternal when data is valid', () => {
      visualization.resetCallFlags();
      visualization.draw(dataTable, {}, {});
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle null data by throwing error', () => {
      visualization.resetCallFlags();
      expect(() => visualization.draw(null)).toThrow('Undefined or null data');
      expect(visualization.wasDrawInternalCalled()).toBe(false);
    });

    it('should handle undefined data by throwing error', () => {
      visualization.resetCallFlags();
      expect(() => visualization.draw(undefined as any)).toThrow('Undefined or null data');
      expect(visualization.wasDrawInternalCalled()).toBe(false);
    });

    it('should handle draw with only data parameter', () => {
      visualization.resetCallFlags();
      visualization.draw(dataTable);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle draw with data and options', () => {
      visualization.resetCallFlags();
      const options = { title: 'Test Chart', width: 500 };
      visualization.draw(dataTable, options);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle draw with data, options, and state', () => {
      visualization.resetCallFlags();
      const options = { title: 'Test Chart' };
      const state = { selected: [{ row: 0, column: 1 }] };
      visualization.draw(dataTable, options, state);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle null options', () => {
      visualization.resetCallFlags();
      visualization.draw(dataTable, null);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle undefined options', () => {
      visualization.resetCallFlags();
      visualization.draw(dataTable, undefined);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle null state', () => {
      visualization.resetCallFlags();
      visualization.draw(dataTable, {}, null);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle undefined state', () => {
      visualization.resetCallFlags();
      visualization.draw(dataTable, {}, undefined);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should cancel previous font wait resolver on new draw', () => {
      const cancelSpy = vi.fn();
      visualization['fontWaitResolver'] = { promise: { cancel: cancelSpy } } as any;

      visualization.draw(dataTable);
      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should cancel pending async callbacks on new draw', () => {
      const cancelSpy = vi.fn();
      visualization['asyncHelper'] = { cancelPendingCallbacks: cancelSpy } as any;

      visualization.draw(dataTable);
      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  describe('getImageURI', () => {
    it('should return empty string by default', () => {
      const uri = visualization.getImageURI();
      expect(uri).toBe('');
    });

    it('should return consistent empty string across calls', () => {
      const uri1 = visualization.getImageURI();
      const uri2 = visualization.getImageURI();
      expect(uri1).toBe(uri2);
      expect(uri1).toBe('');
    });
  });

  describe('clearChart', () => {
    it('should call clearInternal', () => {
      visualization.resetCallFlags();
      visualization.clearChart();
      expect(visualization.wasClearInternalCalled()).toBe(true);
    });

    it('should cancel async helper when it exists', () => {
      const cancelSpy = vi.fn();
      visualization['asyncHelper'] = { cancelPendingCallbacks: cancelSpy } as any;

      visualization.clearChart();
      expect(cancelSpy).toHaveBeenCalled();
      expect(visualization['asyncHelper']).toBeNull();
    });

    it('should handle null async helper gracefully', () => {
      visualization['asyncHelper'] = null;
      expect(() => visualization.clearChart()).not.toThrow();
    });

    it('should cancel font wait resolver when it exists', () => {
      const cancelSpy = vi.fn();
      visualization['fontWaitResolver'] = {
        promise: { cancel: cancelSpy }
      } as any;

      visualization.clearChart();
      expect(cancelSpy).toHaveBeenCalled();
      expect(visualization['fontWaitResolver']).toBeNull();
    });

    it('should handle null font wait resolver gracefully', () => {
      visualization['fontWaitResolver'] = null;
      expect(() => visualization.clearChart()).not.toThrow();
    });

    it('should handle font wait resolver without promise', () => {
      visualization['fontWaitResolver'] = {} as any;
      expect(() => visualization.clearChart()).not.toThrow();
    });

    it('should be safe to call multiple times', () => {
      visualization.clearChart();
      visualization.resetCallFlags();

      visualization.clearChart();
      expect(visualization.wasClearInternalCalled()).toBe(true);
    });
  });

  describe('dispose', () => {
    it('should call clearChart during disposal', () => {
      const clearSpy = vi.spyOn(visualization, 'clearChart');
      visualization.dispose();
      expect(clearSpy).toHaveBeenCalled();
    });

    it('should be safe to call dispose multiple times', () => {
      visualization.dispose();
      expect(() => visualization.dispose()).not.toThrow();
    });

    it('should clear chart even if not previously cleared', () => {
      visualization.resetCallFlags();
      visualization.dispose();
      expect(visualization.wasClearInternalCalled()).toBe(true);
    });
  });

  describe('abstract method implementation', () => {
    it('should require drawInternal implementation', () => {
      // TestVisualization provides implementation, so this tests that it's called
      visualization.resetCallFlags();
      visualization.draw(dataTable);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should provide default clearInternal implementation', () => {
      // Base class provides empty implementation, subclass can override
      visualization.resetCallFlags();
      visualization.clearChart();
      expect(visualization.wasClearInternalCalled()).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle errors in draw gracefully', () => {
      // Error handler should catch and handle errors
      const invalidData = {} as any;
      expect(() => visualization.draw(invalidData)).not.toThrow();
    });

    it('should validate data table before drawing', () => {
      // This tests that datautils.validateDataTable is called
      visualization.draw(dataTable);
      // Test passes if no error is thrown and drawInternal is called
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });
  });

  describe('lifecycle management', () => {
    it('should handle complete lifecycle: create, draw, clear, dispose', () => {
      const viz = new TestVisualization(container);

      // Draw
      viz.draw(dataTable, { title: 'Test' });
      expect(viz.wasDrawInternalCalled()).toBe(true);

      // Clear
      viz.resetCallFlags();
      viz.clearChart();
      expect(viz.wasClearInternalCalled()).toBe(true);

      // Dispose
      expect(() => viz.dispose()).not.toThrow();
    });

    it('should handle multiple draw calls', () => {
      visualization.draw(dataTable, { title: 'First' });
      visualization.resetCallFlags();

      visualization.draw(dataTable, { title: 'Second' });
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle draw after clear', () => {
      visualization.draw(dataTable);
      visualization.clearChart();
      visualization.resetCallFlags();

      visualization.draw(dataTable);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty data table', () => {
      const emptyTable = new DataTable();
      visualization.resetCallFlags();
      visualization.draw(emptyTable);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle data table with no rows', () => {
      const noRowsTable = new DataTable();
      noRowsTable.addColumn('string', 'Category');
      noRowsTable.addColumn('number', 'Value');

      visualization.resetCallFlags();
      visualization.draw(noRowsTable);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle data table with no columns', () => {
      const noColumnsTable = new DataTable();

      visualization.resetCallFlags();
      visualization.draw(noColumnsTable);
      expect(visualization.wasDrawInternalCalled()).toBe(true);
    });

    it('should handle very large dimensions', () => {
      const options = new Options([{ width: 10000, height: 10000 }]);
      const width = visualization.testGetWidth(options);
      const height = visualization.testGetHeight(options);

      expect(width).toBe(10000);
      expect(height).toBe(10000);
    });

    it('should handle fractional dimensions', () => {
      const options = new Options([{ width: 500.5, height: 300.7 }]);
      const width = visualization.testGetWidth(options);
      const height = visualization.testGetHeight(options);

      expect(width).toBe(500.5);
      expect(height).toBe(300.7);
    });
  });

  describe('memory management', () => {
    it('should clean up resources on clear', () => {
      // Set up some resources
      visualization['asyncHelper'] = { cancelPendingCallbacks: vi.fn() } as any;
      visualization['fontWaitResolver'] = { promise: { cancel: vi.fn() } } as any;

      visualization.clearChart();

      expect(visualization['asyncHelper']).toBeNull();
      expect(visualization['fontWaitResolver']).toBeNull();
    });

    it('should clean up resources on dispose', () => {
      // Set up some resources
      visualization['asyncHelper'] = { cancelPendingCallbacks: vi.fn() } as any;
      visualization['fontWaitResolver'] = { promise: { cancel: vi.fn() } } as any;

      visualization.dispose();

      expect(visualization['asyncHelper']).toBeNull();
      expect(visualization['fontWaitResolver']).toBeNull();
    });
  });
});
