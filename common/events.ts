/**
 * @fileoverview Event utilities to replace @closure/events/events
 * This module provides drop-in replacements for commonly used Closure event functions.
 */

import { Disposable } from './disposable';

/**
 * Event listener function type.
 */
export type EventListener<T = any> = (event: T) => void;

/**
 * Event listener options.
 */
export interface EventListenerOptions {
  once?: boolean;
  passive?: boolean;
  capture?: boolean;
}

/**
 * A simple event target implementation.
 */
export class EventTarget extends Disposable {
  private listeners = new Map<string, Set<EventListener>>();

  /**
   * Adds an event listener.
   * @param type The event type.
   * @param listener The event listener function.
   * @param options Optional listener options.
   */
  addEventListener(
    type: string,
    listener: EventListener,
    options?: EventListenerOptions
  ): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }

    const listeners = this.listeners.get(type)!;

    if (options?.once) {
      const onceListener = (event: any) => {
        listener(event);
        this.removeEventListener(type, onceListener);
      };
      listeners.add(onceListener);
    } else {
      listeners.add(listener);
    }
  }

  /**
   * Removes an event listener.
   * @param type The event type.
   * @param listener The event listener function.
   */
  removeEventListener(type: string, listener: EventListener): void {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.listeners.delete(type);
      }
    }
  }

  /**
   * Dispatches an event to all listeners.
   * @param type The event type.
   * @param event The event data.
   * @returns true if the event was handled.
   */
  dispatchEvent(type: string, event?: any): boolean {
    const listeners = this.listeners.get(type);
    if (!listeners || listeners.size === 0) {
      return false;
    }

    const eventData = event || { type };
    for (const listener of listeners) {
      try {
        listener(eventData);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    }

    return true;
  }

  /**
   * Checks if there are any listeners for a given event type.
   * @param type The event type.
   * @returns true if there are listeners.
   */
  hasEventListener(type: string): boolean {
    const listeners = this.listeners.get(type);
    return listeners ? listeners.size > 0 : false;
  }

  /**
   * Gets the number of listeners for a given event type.
   * @param type The event type.
   * @returns The number of listeners.
   */
  getListenerCount(type: string): number {
    const listeners = this.listeners.get(type);
    return listeners ? listeners.size : 0;
  }

  /**
   * Removes all event listeners.
   */
  removeAllListeners(): void {
    this.listeners.clear();
  }

  /**
   * Disposes of the event target.
   */
  protected disposeInternal(): void {
    this.removeAllListeners();
  }
}

/**
 * Browser event wrapper.
 */
export class BrowserEvent {
  constructor(
    public originalEvent: Event,
    public type: string = originalEvent.type,
    public target: EventTarget | null = originalEvent.target as HTMLElement
  ) {}

  /**
   * Prevents the default action of the event.
   */
  preventDefault(): void {
    this.originalEvent.preventDefault();
  }

  /**
   * Stops the propagation of the event.
   */
  stopPropagation(): void {
    this.originalEvent.stopPropagation();
  }

  /**
   * Stops the immediate propagation of the event.
   */
  stopImmediatePropagation(): void {
    this.originalEvent.stopImmediatePropagation();
  }

  /**
   * Gets the client X coordinate of the event.
   */
  get clientX(): number {
    return (this.originalEvent as MouseEvent).clientX || 0;
  }

  /**
   * Gets the client Y coordinate of the event.
   */
  get clientY(): number {
    return (this.originalEvent as MouseEvent).clientY || 0;
  }

  /**
   * Gets the key code of the event.
   */
  get keyCode(): number {
    return (this.originalEvent as KeyboardEvent).keyCode || 0;
  }

  /**
   * Gets the key of the event.
   */
  get key(): string {
    return (this.originalEvent as KeyboardEvent).key || '';
  }

  /**
   * Checks if the shift key was pressed.
   */
  get shiftKey(): boolean {
    return (this.originalEvent as KeyboardEvent).shiftKey || false;
  }

  /**
   * Checks if the ctrl key was pressed.
   */
  get ctrlKey(): boolean {
    return (this.originalEvent as KeyboardEvent).ctrlKey || false;
  }

  /**
   * Checks if the alt key was pressed.
   */
  get altKey(): boolean {
    return (this.originalEvent as KeyboardEvent).altKey || false;
  }

  /**
   * Checks if the meta key was pressed.
   */
  get metaKey(): boolean {
    return (this.originalEvent as KeyboardEvent).metaKey || false;
  }
}

/**
 * Event handler utility class.
 */
export class EventHandler extends Disposable {
  private listeners: Array<{
    target: EventTarget | Element;
    type: string;
    listener: EventListener;
  }> = [];

  /**
   * Adds an event listener and tracks it for disposal.
   * @param target The event target.
   * @param type The event type.
   * @param listener The event listener.
   * @param options Optional listener options.
   */
  listen(
    target: EventTarget | Element,
    type: string,
    listener: EventListener,
    options?: EventListenerOptions
  ): void {
    if (target instanceof EventTarget) {
      target.addEventListener(type, listener, options);
    } else {
      target.addEventListener(type, listener as any, options);
    }

    this.listeners.push({ target, type, listener });
  }

  /**
   * Removes a specific event listener.
   * @param target The event target.
   * @param type The event type.
   * @param listener The event listener.
   */
  unlisten(target: EventTarget | Element, type: string, listener: EventListener): void {
    if (target instanceof EventTarget) {
      target.removeEventListener(type, listener);
    } else {
      target.removeEventListener(type, listener as any);
    }

    const index = this.listeners.findIndex(
      l => l.target === target && l.type === type && l.listener === listener
    );
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Removes all tracked event listeners.
   */
  removeAll(): void {
    for (const { target, type, listener } of this.listeners) {
      if (target instanceof EventTarget) {
        target.removeEventListener(type, listener);
      } else {
        target.removeEventListener(type, listener as any);
      }
    }
    this.listeners.length = 0;
  }

  /**
   * Disposes of the event handler.
   */
  protected disposeInternal(): void {
    this.removeAll();
  }
}

/**
 * Common event types.
 */
export const EventType = {
  CLICK: 'click',
  CONTEXTMENU: 'contextmenu',
  DBLCLICK: 'dblclick',
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  MOUSEMOVE: 'mousemove',
  MOUSEOVER: 'mouseover',
  MOUSEOUT: 'mouseout',
  MOUSEENTER: 'mouseenter',
  MOUSELEAVE: 'mouseleave',
  KEYDOWN: 'keydown',
  KEYUP: 'keyup',
  KEYPRESS: 'keypress',
  FOCUS: 'focus',
  BLUR: 'blur',
  CHANGE: 'change',
  INPUT: 'input',
  SUBMIT: 'submit',
  LOAD: 'load',
  UNLOAD: 'unload',
  RESIZE: 'resize',
  SCROLL: 'scroll',
  TOUCHSTART: 'touchstart',
  TOUCHMOVE: 'touchmove',
  TOUCHEND: 'touchend',
  TOUCHCANCEL: 'touchcancel',
} as const;

/**
 * Utility functions for working with events.
 */
export const events = {
  /**
   * Adds an event listener to a DOM element.
   * @param element The DOM element.
   * @param type The event type.
   * @param listener The event listener.
   * @param options Optional listener options.
   */
  listen(
    element: Element,
    type: string,
    listener: EventListener,
    options?: EventListenerOptions
  ): void {
    element.addEventListener(type, listener as any, options);
  },

  /**
   * Removes an event listener from a DOM element.
   * @param element The DOM element.
   * @param type The event type.
   * @param listener The event listener.
   */
  unlisten(element: Element, type: string, listener: EventListener): void {
    element.removeEventListener(type, listener as any);
  },

  /**
   * Creates a browser event wrapper.
   * @param event The original DOM event.
   * @returns A BrowserEvent wrapper.
   */
  wrapEvent(event: Event): BrowserEvent {
    return new BrowserEvent(event);
  },
};
