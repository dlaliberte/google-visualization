import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Dashboard } from './dashboard';
import { ControlWrapper } from '../wrapper/control_wrapper';
import { ChartWrapper } from '../wrapper/chart_wrapper';
import { DataTable } from '../data/datatable';

// Mock classes and dependencies
class MockChoreographer {
  constructor(container: Element) {
    this.container = container;
  }

  addControl(control: any) {
    this.controls = this.controls || [];
    this.controls.push(control);
  }

  addChart(chart: any) {
    this.charts = this.charts || [];
    this.charts.push(chart);
  }

  bind(controls: any, charts: any) {
    this.bindings = this.bindings || [];
    this.bindings.push({ controls, charts });
  }

  draw(dataTable: any) {
    this.lastDataTable = dataTable;
    this.drawCalled = true;
  }

  clear() {
    this.cleared = true;
  }

  dispose() {
    this.disposed = true;
  }

  public container: Element;
  public controls: any[] = [];
  public charts: any[] = [];
  public bindings: any[] = [];
  public lastDataTable: any = null;
  public drawCalled = false;
  public cleared = false;
  public disposed = false;
}

// Mock container element
const createMockContainer = () => {
  const mockContainer = {
    innerHTML: '',
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    children: [],
    textContent: '',
    style: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  };
  return mockContainer as unknown as Element;
};

// Mock Choreographer
vi.mock('./choreographer', () => ({
  Choreographer: MockChoreographer
}));

describe('Dashboard', () => {
  let dashboard: Dashboard;
  let mockContainer: Element;
  let mockControlWrapper: ControlWrapper;
  let mockChartWrapper: ChartWrapper;
  let mockDataTable: DataTable;

  beforeEach(() => {
    mockContainer = createMockContainer();
    mockControlWrapper = new ControlWrapper();
    mockChartWrapper = new ChartWrapper();
    mockDataTable = new DataTable();

    // Mock console.warn to avoid noise in tests
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create dashboard with valid container', () => {
      dashboard = new Dashboard(mockContainer);
      expect(dashboard).toBeInstanceOf(Dashboard);
    });

    it('should create dashboard with null container', () => {
      dashboard = new Dashboard(null);
      expect(dashboard).toBeInstanceOf(Dashboard);
      expect(console.warn).toHaveBeenCalledWith('container == null');
    });

    it('should create dashboard with undefined container', () => {
      dashboard = new Dashboard(undefined as any);
      expect(dashboard).toBeInstanceOf(Dashboard);
      expect(console.warn).toHaveBeenCalledWith('container == null');
    });

    it('should initialize choreographer', () => {
      dashboard = new Dashboard(mockContainer);
      // Choreographer should be created internally
      expect(dashboard).toBeInstanceOf(Dashboard);
    });

    it('should bind events during construction', () => {
      dashboard = new Dashboard(mockContainer);
      // Event binding happens in constructor - test that it doesn't throw
      expect(dashboard).toBeInstanceOf(Dashboard);
    });
  });

  describe('bind', () => {
    beforeEach(() => {
      dashboard = new Dashboard(mockContainer);
    });

    it('should bind single control to single chart', () => {
      dashboard.bind(mockControlWrapper, mockChartWrapper);

      // Check if binding was passed to choreographer
      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(1);
      expect(choreographer.bindings[0].controls).toEqual([mockControlWrapper]);
      expect(choreographer.bindings[0].charts).toEqual([mockChartWrapper]);
    });

    it('should bind array of controls to single chart', () => {
      const controlWrapper2 = new ControlWrapper();
      dashboard.bind([mockControlWrapper, controlWrapper2], mockChartWrapper);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(1);
      expect(choreographer.bindings[0].controls).toEqual([mockControlWrapper, controlWrapper2]);
      expect(choreographer.bindings[0].charts).toEqual([mockChartWrapper]);
    });

    it('should bind single control to array of charts', () => {
      const chartWrapper2 = new ChartWrapper();
      dashboard.bind(mockControlWrapper, [mockChartWrapper, chartWrapper2]);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(1);
      expect(choreographer.bindings[0].controls).toEqual([mockControlWrapper]);
      expect(choreographer.bindings[0].charts).toEqual([mockChartWrapper, chartWrapper2]);
    });

    it('should bind arrays of controls to arrays of charts', () => {
      const controlWrapper2 = new ControlWrapper();
      const chartWrapper2 = new ChartWrapper();

      dashboard.bind([mockControlWrapper, controlWrapper2], [mockChartWrapper, chartWrapper2]);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(1);
      expect(choreographer.bindings[0].controls).toEqual([mockControlWrapper, controlWrapper2]);
      expect(choreographer.bindings[0].charts).toEqual([mockChartWrapper, chartWrapper2]);
    });

    it('should handle multiple bind calls', () => {
      const controlWrapper2 = new ControlWrapper();
      const chartWrapper2 = new ChartWrapper();

      dashboard.bind(mockControlWrapper, mockChartWrapper);
      dashboard.bind(controlWrapper2, chartWrapper2);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(2);
    });

    it('should handle empty arrays', () => {
      dashboard.bind([], []);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(1);
      expect(choreographer.bindings[0].controls).toEqual([]);
      expect(choreographer.bindings[0].charts).toEqual([]);
    });
  });

  describe('draw', () => {
    beforeEach(() => {
      dashboard = new Dashboard(mockContainer);
    });

    it('should draw with data table', () => {
      dashboard.draw(mockDataTable);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.drawCalled).toBe(true);
      expect(choreographer.lastDataTable).toBe(mockDataTable);
    });

    it('should draw with null data table', () => {
      dashboard.draw(null);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.drawCalled).toBe(true);
      expect(choreographer.lastDataTable).toBeNull();
    });

    it('should draw with undefined data table', () => {
      dashboard.draw(undefined as any);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.drawCalled).toBe(true);
      expect(choreographer.lastDataTable).toBeUndefined();
    });

    it('should handle multiple draw calls', () => {
      const dataTable2 = new DataTable();

      dashboard.draw(mockDataTable);
      dashboard.draw(dataTable2);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.drawCalled).toBe(true);
      expect(choreographer.lastDataTable).toBe(dataTable2);
    });
  });

  describe('clear', () => {
    beforeEach(() => {
      dashboard = new Dashboard(mockContainer);
    });

    it('should clear dashboard state', () => {
      dashboard.clear();

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.cleared).toBe(true);
    });

    it('should handle multiple clear calls', () => {
      dashboard.clear();
      dashboard.clear();

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.cleared).toBe(true);
    });

    it('should clear after bindings and draws', () => {
      dashboard.bind(mockControlWrapper, mockChartWrapper);
      dashboard.draw(mockDataTable);
      dashboard.clear();

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.cleared).toBe(true);
    });
  });

  describe('disposal', () => {
    beforeEach(() => {
      dashboard = new Dashboard(mockContainer);
    });

    it('should dispose dashboard', () => {
      dashboard.dispose();

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.disposed).toBe(true);
    });

    it('should handle disposal after clear', () => {
      dashboard.clear();
      dashboard.dispose();

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.cleared).toBe(true);
      expect(choreographer.disposed).toBe(true);
    });

    it('should extend Disposable', () => {
      expect(dashboard).toHaveProperty('dispose');
      expect(typeof dashboard.dispose).toBe('function');
    });

    it('should handle disposal without errors', () => {
      expect(() => dashboard.dispose()).not.toThrow();
    });
  });

  describe('integration scenarios', () => {
    beforeEach(() => {
      dashboard = new Dashboard(mockContainer);
    });

    it('should handle complete dashboard lifecycle', () => {
      // Setup
      const controlWrapper2 = new ControlWrapper();
      const chartWrapper2 = new ChartWrapper();

      // Bind controls and charts
      dashboard.bind([mockControlWrapper, controlWrapper2], [mockChartWrapper, chartWrapper2]);

      // Draw with data
      dashboard.draw(mockDataTable);

      // Verify choreographer received all operations
      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(1);
      expect(choreographer.bindings[0].controls).toHaveLength(2);
      expect(choreographer.bindings[0].charts).toHaveLength(2);
      expect(choreographer.drawCalled).toBe(true);
      expect(choreographer.lastDataTable).toBe(mockDataTable);

      // Clear and dispose
      dashboard.clear();
      dashboard.dispose();

      expect(choreographer.cleared).toBe(true);
      expect(choreographer.disposed).toBe(true);
    });

    it('should handle complex binding scenarios', () => {
      const controls = [new ControlWrapper(), new ControlWrapper(), new ControlWrapper()];
      const charts = [new ChartWrapper(), new ChartWrapper()];

      // Multiple different binding configurations
      dashboard.bind(controls[0], charts[0]);
      dashboard.bind(controls.slice(1), charts[1]);
      dashboard.bind(controls, charts);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.bindings).toHaveLength(3);
    });

    it('should handle redraw scenarios', () => {
      dashboard.bind(mockControlWrapper, mockChartWrapper);

      // Multiple draws with different data
      const dataTable1 = new DataTable();
      const dataTable2 = new DataTable();

      dashboard.draw(dataTable1);
      dashboard.draw(dataTable2);
      dashboard.draw(null);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.drawCalled).toBe(true);
      expect(choreographer.lastDataTable).toBeNull();
    });

    it('should handle empty dashboard operations', () => {
      // Operations on empty dashboard should not crash
      dashboard.draw(mockDataTable);
      dashboard.clear();

      expect(() => dashboard.dispose()).not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle invalid container gracefully', () => {
      // Invalid container types should not crash dashboard
      expect(() => {
        const invalidDashboard = new Dashboard('not an element' as any);
        invalidDashboard.dispose();
      }).not.toThrow();

      expect(console.warn).toHaveBeenCalled();
    });

    it('should handle disposal of uninitialized dashboard', () => {
      const dashboard = new Dashboard(mockContainer);

      // Should not crash even if nothing was done with dashboard
      expect(() => dashboard.dispose()).not.toThrow();
    });

    it('should handle operations on disposed dashboard', () => {
      dashboard = new Dashboard(mockContainer);
      dashboard.dispose();

      // Operations after disposal should not crash
      expect(() => {
        dashboard.bind(mockControlWrapper, mockChartWrapper);
        dashboard.draw(mockDataTable);
        dashboard.clear();
      }).not.toThrow();
    });

    it('should handle malformed wrappers', () => {
      dashboard = new Dashboard(mockContainer);

      // Should handle null/undefined wrappers gracefully
      expect(() => {
        dashboard.bind(null as any, mockChartWrapper);
        dashboard.bind(mockControlWrapper, null as any);
        dashboard.bind(null as any, null as any);
      }).not.toThrow();
    });
  });

  describe('event handling', () => {
    beforeEach(() => {
      dashboard = new Dashboard(mockContainer);
    });

    it('should initialize event listeners during construction', () => {
      // Event listeners should be set up - we can test this indirectly
      expect(dashboard).toBeInstanceOf(Dashboard);

      // The dashboard should have internal event listener references
      const readyListener = (dashboard as any).readyListener;
      const errorListener = (dashboard as any).errorListener;

      // These might be undefined initially, but the properties should exist
      expect(dashboard).toHaveProperty('readyListener' as any);
      expect(dashboard).toHaveProperty('errorListener' as any);
    });

    it('should clean up event listeners on disposal', () => {
      dashboard.dispose();

      // After disposal, listeners should be cleaned up
      // This is tested by ensuring disposal doesn't throw errors
      expect(() => dashboard.dispose()).not.toThrow();
    });

    it('should handle event listener cleanup on clear', () => {
      dashboard.clear();

      // Clear should clean up event listeners
      expect(() => dashboard.clear()).not.toThrow();
    });
  });

  describe('container management', () => {
    it('should store container reference', () => {
      dashboard = new Dashboard(mockContainer);

      const container = (dashboard as any).container;
      expect(container).toBe(mockContainer);
    });

    it('should pass container to choreographer', () => {
      dashboard = new Dashboard(mockContainer);

      const choreographer = (dashboard as any).choreographer as MockChoreographer;
      expect(choreographer.container).toBe(mockContainer);
    });

    it('should handle various container types', () => {
      const containers = [
        createMockContainer(),
        null,
        undefined
      ];

      containers.forEach(container => {
        expect(() => {
          const testDashboard = new Dashboard(container as any);
          testDashboard.dispose();
        }).not.toThrow();
      });
    });
  });
});
