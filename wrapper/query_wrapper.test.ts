import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryWrapper } from './query_wrapper';
import { Query } from '../query/query';
import { QueryResponse } from '../query/queryresponse';
import { DataTable } from '../data/datatable';
import { AbstractVisualization } from '../visualization/abstract_visualization';

// Mock classes
class MockVisualization extends AbstractVisualization {
  constructor() {
    super();
  }

  draw(dataTable: DataTable | null, options: any) {
    // Mock implementation
    this.drawCalled = true;
    this.lastDataTable = dataTable;
    this.lastOptions = options;
  }

  getOptions() {
    return {};
  }

  setOptions() {
    // Mock implementation
  }

  public drawCalled = false;
  public lastDataTable: DataTable | null = null;
  public lastOptions: any = null;
}

class MockQuery {
  constructor(public url: string) {}

  send(callback: Function) {
    this.sendCallback = callback;
  }

  abort() {
    this.aborted = true;
  }

  public sendCallback: Function | null = null;
  public aborted = false;
}

class MockQueryResponse {
  constructor(
    private error: boolean = false,
    private dataTable: DataTable | null = null
  ) {}

  isError(): boolean {
    return this.error;
  }

  getDataTable(): DataTable | null {
    return this.dataTable;
  }
}

// Mock container element
const createMockContainer = () => {
  const mockContainer = {
    innerHTML: '',
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    children: [],
    textContent: ''
  };
  return mockContainer as unknown as Element;
};

describe('QueryWrapper', () => {
  let queryWrapper: QueryWrapper;
  let mockQuery: MockQuery;
  let mockVisualization: MockVisualization;
  let mockContainer: Element;
  let mockDataTable: DataTable;

  beforeEach(() => {
    mockQuery = new MockQuery('https://example.com/data');
    mockVisualization = new MockVisualization();
    mockContainer = createMockContainer();
    mockDataTable = new DataTable();

    queryWrapper = new QueryWrapper(
      mockQuery as unknown as Query,
      mockVisualization,
      { title: 'Test Chart' },
      mockContainer
    );
  });

  describe('constructor', () => {
    it('should create QueryWrapper with required parameters', () => {
      const wrapper = new QueryWrapper(
        mockQuery as unknown as Query,
        mockVisualization,
        {},
        mockContainer
      );
      expect(wrapper).toBeInstanceOf(QueryWrapper);
    });

    it('should create QueryWrapper with null options', () => {
      const wrapper = new QueryWrapper(
        mockQuery as unknown as Query,
        mockVisualization,
        null,
        mockContainer
      );
      expect(wrapper).toBeInstanceOf(QueryWrapper);
    });

    it('should create QueryWrapper with null container', () => {
      const wrapper = new QueryWrapper(
        mockQuery as unknown as Query,
        mockVisualization,
        {},
        null
      );
      expect(wrapper).toBeInstanceOf(QueryWrapper);
    });

    it('should throw error when visualization lacks draw method', () => {
      const invalidVisualization = {} as AbstractVisualization;

      expect(() => {
        new QueryWrapper(
          mockQuery as unknown as Query,
          invalidVisualization,
          {},
          mockContainer
        );
      }).toThrow('Visualization must have a draw method.');
    });

    it('should throw error when visualization draw is not a function', () => {
      const invalidVisualization = { draw: 'not a function' } as unknown as AbstractVisualization;

      expect(() => {
        new QueryWrapper(
          mockQuery as unknown as Query,
          invalidVisualization,
          {},
          mockContainer
        );
      }).toThrow('Visualization must have a draw method.');
    });

    it('should set default options when null is provided', () => {
      const wrapper = new QueryWrapper(
        mockQuery as unknown as Query,
        mockVisualization,
        null,
        mockContainer
      );

      // We can't directly test options, but we can test that it doesn't throw
      expect(wrapper).toBeInstanceOf(QueryWrapper);
    });
  });

  describe('options management', () => {
    it('should set options', () => {
      const newOptions = { width: 800, height: 400 };
      queryWrapper.setOptions(newOptions);

      // Options are private, so we test behavior indirectly through draw
      queryWrapper.draw();
      expect(mockVisualization.lastOptions).toEqual(newOptions);
    });

    it('should handle null options in setOptions', () => {
      queryWrapper.setOptions(null);

      queryWrapper.draw();
      expect(mockVisualization.lastOptions).toEqual({});
    });

    it('should handle undefined options in setOptions', () => {
      queryWrapper.setOptions(undefined as any);

      queryWrapper.draw();
      expect(mockVisualization.lastOptions).toEqual({});
    });
  });

  describe('error handling', () => {
    it('should get default response validator', () => {
      const validator = QueryWrapper.getDefaultResponseValidator(mockContainer);
      expect(typeof validator).toBe('function');
    });

    it('should validate successful response', () => {
      const validator = QueryWrapper.getDefaultResponseValidator(mockContainer);
      const successResponse = new MockQueryResponse(false, mockDataTable);

      const result = validator(successResponse);
      expect(result).toBe(true);
    });

    it('should validate error response', () => {
      const validator = QueryWrapper.getDefaultResponseValidator(mockContainer);
      const errorResponse = new MockQueryResponse(true, null);

      // Mock QueryResponse.addError to avoid actual DOM manipulation
      const addErrorSpy = vi.spyOn(QueryResponse, 'addError');
      addErrorSpy.mockImplementation(() => {});

      const result = validator(errorResponse);
      expect(result).toBe(false);

      addErrorSpy.mockRestore();
    });

    it('should set custom error handler', () => {
      const customHandler = vi.fn(() => true);
      queryWrapper.setCustomErrorHandler(customHandler);

      // We can't directly access the error handler, but we can test that it doesn't throw
      expect(() => queryWrapper.setCustomErrorHandler(customHandler)).not.toThrow();
    });

    it('should reset to default error handler when passing null', () => {
      queryWrapper.setCustomErrorHandler(null as any);

      // This should reset to the default handler
      expect(() => queryWrapper.setCustomErrorHandler(null as any)).not.toThrow();
    });

    it('should handle custom error handler without container', () => {
      const wrapperNoContainer = new QueryWrapper(
        mockQuery as unknown as Query,
        mockVisualization,
        {},
        null
      );

      const customHandler = vi.fn(() => true);
      wrapperNoContainer.setCustomErrorHandler(customHandler);

      // Reset to null should not throw error even without container
      wrapperNoContainer.setCustomErrorHandler(null as any);
    });
  });

  describe('response handlers', () => {
    it('should set custom response handler', () => {
      const customHandler = vi.fn();
      queryWrapper.setCustomResponseHandler(customHandler);

      expect(() => queryWrapper.setCustomResponseHandler(customHandler)).not.toThrow();
    });

    it('should clear custom response handler with null', () => {
      const customHandler = vi.fn();
      queryWrapper.setCustomResponseHandler(customHandler);
      queryWrapper.setCustomResponseHandler(null);

      expect(() => queryWrapper.setCustomResponseHandler(null)).not.toThrow();
    });

    it('should throw error when response handler is not a function', () => {
      expect(() => {
        queryWrapper.setCustomResponseHandler('not a function' as any);
      }).toThrow('Custom response handler must be a function.');
    });

    it('should set custom post response handler', () => {
      const customHandler = vi.fn();
      queryWrapper.setCustomPostResponseHandler(customHandler);

      expect(() => queryWrapper.setCustomPostResponseHandler(customHandler)).not.toThrow();
    });

    it('should handle null post response handler', () => {
      const customHandler = vi.fn();
      queryWrapper.setCustomPostResponseHandler(customHandler);
      queryWrapper.setCustomPostResponseHandler(null);

      // Should not throw when setting to null
      expect(() => queryWrapper.setCustomPostResponseHandler(null)).not.toThrow();
    });

    it('should throw error when post response handler is not a function', () => {
      expect(() => {
        queryWrapper.setCustomPostResponseHandler('not a function' as any);
      }).toThrow('Custom post response handler must be a function.');
    });
  });

  describe('drawing', () => {
    beforeEach(() => {
      // Set up the internal dataTable by simulating a successful query response
      (queryWrapper as any).dataTable = mockDataTable;
    });

    it('should draw with existing data table', () => {
      queryWrapper.draw();

      expect(mockVisualization.drawCalled).toBe(true);
      expect(mockVisualization.lastDataTable).toBe(mockDataTable);
    });

    it('should draw with options', () => {
      const options = { title: 'Test Chart', width: 600 };
      queryWrapper.setOptions(options);
      queryWrapper.draw();

      expect(mockVisualization.drawCalled).toBe(true);
      expect(mockVisualization.lastOptions).toEqual(options);
    });

    it('should not draw without visualization', () => {
      const wrapperNoViz = new QueryWrapper(
        mockQuery as unknown as Query,
        null as any,
        {},
        mockContainer
      );

      // This should be caught by the constructor validation
      // But if it somehow gets through, draw should handle it gracefully
    });

    it('should assert data table exists before drawing', () => {
      // Clear the data table
      (queryWrapper as any).dataTable = null;

      // Mock the assert function to throw an error
      const originalAssert = (globalThis as any).assert;
      (globalThis as any).assert = vi.fn((condition: any) => {
        if (!condition) throw new Error('Assertion failed');
      });

      expect(() => queryWrapper.draw()).toThrow('Assertion failed');

      // Restore original assert
      (globalThis as any).assert = originalAssert;
    });
  });

  describe('sending queries', () => {
    it('should send and draw query', () => {
      queryWrapper.sendAndDraw();

      expect(mockQuery.sendCallback).toBeDefined();
      expect(typeof mockQuery.sendCallback).toBe('function');
    });

    it('should throw error when sending without error handler', () => {
      const wrapperNoContainer = new QueryWrapper(
        mockQuery as unknown as Query,
        mockVisualization,
        {},
        null
      );

      expect(() => wrapperNoContainer.sendAndDraw()).toThrow(
        'If no container was supplied, a custom error handler must be supplied instead.'
      );
    });

    it('should handle successful response', () => {
      queryWrapper.sendAndDraw();

      // Simulate successful response
      const successResponse = new MockQueryResponse(false, mockDataTable);

      // Mock QueryResponse.addError to avoid DOM manipulation
      const addErrorSpy = vi.spyOn(QueryResponse, 'addError');
      addErrorSpy.mockImplementation(() => {});

      mockQuery.sendCallback!(successResponse);

      expect(mockVisualization.drawCalled).toBe(true);
      expect(mockVisualization.lastDataTable).toBe(mockDataTable);

      addErrorSpy.mockRestore();
    });

    it('should handle error response', () => {
      queryWrapper.sendAndDraw();

      // Simulate error response
      const errorResponse = new MockQueryResponse(true, null);

      // Mock QueryResponse.addError to avoid DOM manipulation
      const addErrorSpy = vi.spyOn(QueryResponse, 'addError');
      addErrorSpy.mockImplementation(() => {});

      mockQuery.sendCallback!(errorResponse);

      expect(mockVisualization.drawCalled).toBe(false);

      addErrorSpy.mockRestore();
    });

    it('should call custom response handler when set', () => {
      const customHandler = vi.fn();
      queryWrapper.setCustomResponseHandler(customHandler);
      queryWrapper.sendAndDraw();

      const response = new MockQueryResponse(false, mockDataTable);
      mockQuery.sendCallback!(response);

      expect(customHandler).toHaveBeenCalledWith(response);
    });

    it('should call custom post response handler when set', () => {
      const customPostHandler = vi.fn();
      queryWrapper.setCustomPostResponseHandler(customPostHandler);
      queryWrapper.sendAndDraw();

      // Mock QueryResponse.addError to avoid DOM manipulation
      const addErrorSpy = vi.spyOn(QueryResponse, 'addError');
      addErrorSpy.mockImplementation(() => {});

      const response = new MockQueryResponse(false, mockDataTable);
      mockQuery.sendCallback!(response);

      expect(customPostHandler).toHaveBeenCalledWith(response);

      addErrorSpy.mockRestore();
    });

    it('should abort query', () => {
      queryWrapper.abort();

      expect(mockQuery.aborted).toBe(true);
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete query lifecycle', () => {
      const customResponseHandler = vi.fn();
      const customPostResponseHandler = vi.fn();

      queryWrapper.setCustomResponseHandler(customResponseHandler);
      queryWrapper.setCustomPostResponseHandler(customPostResponseHandler);
      queryWrapper.setOptions({ title: 'Integration Test' });

      queryWrapper.sendAndDraw();

      // Mock QueryResponse.addError to avoid DOM manipulation
      const addErrorSpy = vi.spyOn(QueryResponse, 'addError');
      addErrorSpy.mockImplementation(() => {});

      const response = new MockQueryResponse(false, mockDataTable);
      mockQuery.sendCallback!(response);

      expect(customResponseHandler).toHaveBeenCalledWith(response);
      expect(mockVisualization.drawCalled).toBe(true);
      expect(mockVisualization.lastDataTable).toBe(mockDataTable);
      expect(mockVisualization.lastOptions.title).toBe('Integration Test');
      expect(customPostResponseHandler).toHaveBeenCalledWith(response);

      addErrorSpy.mockRestore();
    });

    it('should handle error scenario with custom error handler', () => {
      const customErrorHandler = vi.fn(() => false); // Return false to prevent drawing
      queryWrapper.setCustomErrorHandler(customErrorHandler);
      queryWrapper.sendAndDraw();

      const errorResponse = new MockQueryResponse(true, null);
      mockQuery.sendCallback!(errorResponse);

      expect(customErrorHandler).toHaveBeenCalledWith(errorResponse);
      expect(mockVisualization.drawCalled).toBe(false);
    });

    it('should redraw with same data after options change', () => {
      // First draw
      (queryWrapper as any).dataTable = mockDataTable;
      queryWrapper.draw();

      expect(mockVisualization.drawCalled).toBe(true);

      // Reset and change options
      mockVisualization.drawCalled = false;
      queryWrapper.setOptions({ title: 'Updated Title' });
      queryWrapper.draw();

      expect(mockVisualization.drawCalled).toBe(true);
      expect(mockVisualization.lastOptions.title).toBe('Updated Title');
    });
  });

  describe('edge cases', () => {
    it('should handle empty options object', () => {
      queryWrapper.setOptions({});
      queryWrapper.draw();

      expect(mockVisualization.lastOptions).toEqual({});
    });

    it('should handle complex options object', () => {
      const complexOptions = {
        title: 'Complex Chart',
        width: 800,
        height: 600,
        legend: {
          position: 'right',
          alignment: 'center'
        },
        colors: ['#red', '#blue', '#green'],
        animation: {
          duration: 1000,
          easing: 'out'
        }
      };

      queryWrapper.setOptions(complexOptions);
      queryWrapper.draw();

      expect(mockVisualization.lastOptions).toEqual(complexOptions);
    });

    it('should handle null data table in response', () => {
      queryWrapper.sendAndDraw();

      // Mock QueryResponse.addError to avoid DOM manipulation
      const addErrorSpy = vi.spyOn(QueryResponse, 'addError');
      addErrorSpy.mockImplementation(() => {});

      const responseWithNullData = new MockQueryResponse(false, null);

      // Mock the original assert to not throw for this test
      const originalAssert = (globalThis as any).assert;
      (globalThis as any).assert = vi.fn();

      mockQuery.sendCallback!(responseWithNullData);

      // Should not crash, but also shouldn't draw
      expect(mockVisualization.drawCalled).toBe(false);

      // Restore
      (globalThis as any).assert = originalAssert;
      addErrorSpy.mockRestore();
    });

    it('should handle multiple sendAndDraw calls', () => {
      queryWrapper.sendAndDraw();
      const firstCallback = mockQuery.sendCallback;

      queryWrapper.sendAndDraw();
      const secondCallback = mockQuery.sendCallback;

      // Should have different callback instances
      expect(firstCallback).not.toBe(secondCallback);
    });

    it('should handle abort during pending query', () => {
      queryWrapper.sendAndDraw();
      queryWrapper.abort();

      expect(mockQuery.aborted).toBe(true);
    });
  });
});
