/**
 * Common test helpers for Google Visualization tests
 */

import { vi } from 'vitest';
import { DataTable } from '../data/datatable';

/**
 * Creates a mock DOM element with specified dimensions
 * @param width Element width in pixels
 * @param height Element height in pixels
 * @param id Optional element ID
 * @returns HTMLElement
 */
export function createMockContainer(
  width: number = 800,
  height: number = 600,
  id?: string
): HTMLElement {
  const container = document.createElement('div');

  if (id) {
    container.id = id;
  }

  container.style.width = `${width}px`;
  container.style.height = `${height}px`;

  // Add to document body for layout calculations
  document.body.appendChild(container);

  return container;
}

/**
 * Removes a container element from the DOM
 * @param container The container element to remove
 */
export function removeMockContainer(container: HTMLElement): void {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

/**
 * Creates a sample DataTable with test data
 * @param numRows Number of data rows to generate
 * @param numColumns Number of data columns to generate
 * @returns DataTable with test data
 */
export function createSampleDataTable(numRows: number = 5, numColumns: number = 2): DataTable {
  const dataTable = new DataTable();

  // Add columns
  dataTable.addColumn('string', 'Category');

  for (let i = 0; i < numColumns; i++) {
    dataTable.addColumn('number', `Value ${i + 1}`);
  }

  // Add rows
  for (let i = 0; i < numRows; i++) {
    const row: any[] = [`Category ${i + 1}`];

    for (let j = 0; j < numColumns; j++) {
      // Generate some predictable but varied test data
      row.push(10 * (i + 1) + j);
    }

    dataTable.addRow(row);
  }

  return dataTable;
}

/**
 * Creates a mock for the window.requestAnimationFrame function
 * @returns Object with mock function and helper methods
 */
export function createRAFMock() {
  const originalRAF = window.requestAnimationFrame;
  const mockRAF = vi.fn((callback: FrameRequestCallback) => {
    return setTimeout(() => callback(performance.now()), 0);
  });

  window.requestAnimationFrame = mockRAF;

  return {
    mock: mockRAF,
    restore: () => {
      window.requestAnimationFrame = originalRAF;
    },
    // Manually trigger all pending animation frames
    triggerAnimationFrames: () => {
      vi.runAllTimers();
    }
  };
}

/**
 * Creates a mock for DOM event listeners
 * @returns Object with mock functions and helper methods
 */
export function createEventListenerMock() {
  const originalAddEventListener = Element.prototype.addEventListener;
  const originalRemoveEventListener = Element.prototype.removeEventListener;

  const listeners: Record<string, Function[]> = {};

  const addEventListenerMock = vi.fn(
    function(this: Element, type: string, listener: EventListenerOrEventListenerObject) {
      if (!listeners[type]) {
        listeners[type] = [];
      }
      listeners[type].push(listener as Function);
    }
  );

  const removeEventListenerMock = vi.fn(
    function(this: Element, type: string, listener: EventListenerOrEventListenerObject) {
      if (listeners[type]) {
        const index = listeners[type].indexOf(listener as Function);
        if (index !== -1) {
          listeners[type].splice(index, 1);
        }
      }
    }
  );

  Element.prototype.addEventListener = addEventListenerMock;
  Element.prototype.removeEventListener = removeEventListenerMock;

  return {
    addMock: addEventListenerMock,
    removeMock: removeEventListenerMock,
    restore: () => {
      Element.prototype.addEventListener = originalAddEventListener;
      Element.prototype.removeEventListener = originalRemoveEventListener;
    },
    // Trigger an event of the specified type
    triggerEvent: (element: Element, eventType: string, eventInit?: EventInit) => {
      const event = new Event(eventType, eventInit);
      element.dispatchEvent(event);
    },
    // Get all listeners for a specific event type
    getListeners: (eventType: string) => {
      return listeners[eventType] || [];
    }
  };
}

/**
 * Creates a mock for ResizeObserver
 * @returns Object with mock class and helper methods
 */
export function createResizeObserverMock() {
  const originalResizeObserver = window.ResizeObserver;

  const observeCallbacks: Map<Element, ResizeObserverCallback> = new Map();

  class MockResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    callback: ResizeObserverCallback;

    observe(target: Element) {
      observeCallbacks.set(target, this.callback);
    }

    unobserve(target: Element) {
      observeCallbacks.delete(target);
    }

    disconnect() {
      observeCallbacks.clear();
    }
  }

  window.ResizeObserver = MockResizeObserver as any;

  return {
    MockResizeObserver,
    restore: () => {
      window.ResizeObserver = originalResizeObserver;
    },
    // Trigger resize for a specific element
    triggerResize: (element: Element, contentRect: Partial<DOMRectReadOnly> = {}) => {
      const callback = observeCallbacks.get(element);
      if (callback) {
        const entry = {
          target: element,
          contentRect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            top: 0,
            right: 100,
            bottom: 100,
            left: 0,
            ...contentRect
          }
        };
        callback([entry as ResizeObserverEntry], new MockResizeObserver(callback) as any);
      }
    }
  };
}

/**
 * Creates a mock for the canvas context
 * @returns Mock canvas context with common methods
 */
export function createCanvasContextMock() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    fillText: vi.fn(),
    strokeText: vi.fn(),
    measureText: vi.fn().mockReturnValue({ width: 50 }),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    createLinearGradient: vi.fn().mockReturnValue({
      addColorStop: vi.fn()
    }),
    createRadialGradient: vi.fn().mockReturnValue({
      addColorStop: vi.fn()
    }),
    getImageData: vi.fn().mockReturnValue({
      data: new Uint8ClampedArray(100),
      width: 10,
      height: 10
    }),
    putImageData: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    scale: vi.fn(),
    transform: vi.fn(),
    setTransform: vi.fn(),
    resetTransform: vi.fn(),
    clip: vi.fn(),
    isPointInPath: vi.fn().mockReturnValue(false),
    isPointInStroke: vi.fn().mockReturnValue(false),
    createPattern: vi.fn().mockReturnValue({}),
    createImageData: vi.fn().mockReturnValue({
      data: new Uint8ClampedArray(100),
      width: 10,
      height: 10
    })
  };
}

/**
 * Mocks the HTMLCanvasElement.prototype.getContext method
 * @returns Object with mock function and helper methods
 */
export function mockCanvasContext() {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  const contextMock = createCanvasContextMock();

  const getContextMock = vi.fn().mockImplementation(function(contextId: string) {
    if (contextId === '2d') {
      return contextMock;
    }
    return null;
  });

  HTMLCanvasElement.prototype.getContext = getContextMock;

  return {
    getContextMock,
    contextMock,
    restore: () => {
      HTMLCanvasElement.prototype.getContext = originalGetContext;
    }
  };
}

/**
 * Waits for all pending promises to resolve
 */
export async function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Simulates a mouse event on an element
 * @param element Target element
 * @param eventType Type of mouse event
 * @param x X coordinate
 * @param y Y coordinate
 * @param options Additional event options
 */
export function simulateMouseEvent(
  element: Element,
  eventType: 'mousedown' | 'mouseup' | 'mousemove' | 'click' | 'dblclick' | 'mouseover' | 'mouseout',
  x: number = 0,
  y: number = 0,
  options: Partial<MouseEventInit> = {}
) {
  const event = new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
    view: window,
    detail: 1,
    screenX: x,
    screenY: y,
    clientX: x,
    clientY: y,
    ...options
  });

  element.dispatchEvent(event);
  return event;
}

/**
 * Simulates a touch event on an element
 * @param element Target element
 * @param eventType Type of touch event
 * @param x X coordinate
 * @param y Y coordinate
 * @param options Additional event options
 */
export function simulateTouchEvent(
  element: Element,
  eventType: 'touchstart' | 'touchend' | 'touchmove' | 'touchcancel',
  x: number = 0,
  y: number = 0,
  options: Partial<TouchEventInit> = {}
) {
  const touchObj = new Touch({
    identifier: Date.now(),
    target: element,
    clientX: x,
    clientY: y,
    screenX: x,
    screenY: y,
    pageX: x,
    pageY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 0,
    force: 1
  });

  const event = new TouchEvent(eventType, {
    bubbles: true,
    cancelable: true,
    view: window,
    touches: [touchObj],
    targetTouches: [touchObj],
    changedTouches: [touchObj],
    ...options
  });

  element.dispatchEvent(event);
  return event;
}
