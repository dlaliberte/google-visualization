/**
 * Browser event class.
 *
 * This file provides a wrapper for browser events.
 * It replaces the Closure Library's events/browserevent module.
 *
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Event } from './event_type';

/**
 * A wrapper for browser events.
 */
export class BrowserEvent {
  /** The native browser event. */
  private nativeEvent: Event;

  /** The target of the event. */
  target: EventTarget | null;

  /** The current target of the event. */
  currentTarget: EventTarget | null;

  /** The type of the event. */
  type: string;

  /** Whether the default action has been prevented. */
  private defaultPrevented: boolean = false;

  /** Whether propagation has been stopped. */
  private propagationStopped: boolean = false;

  /** Whether immediate propagation has been stopped. */
  private immediatePropagationStopped: boolean = false;

  /** Whether the event is a trusted event. */
  isTrusted: boolean = false;

  /** The time when the event occurred. */
  timeStamp: number;

  /** The mouse button pressed during the event. */
  button: number = 0;

  /** The x-coordinate of the mouse pointer relative to the target. */
  clientX: number = 0;

  /** The y-coordinate of the mouse pointer relative to the target. */
  clientY: number = 0;

  /** The x-coordinate of the mouse pointer relative to the screen. */
  screenX: number = 0;

  /** The y-coordinate of the mouse pointer relative to the screen. */
  screenY: number = 0;

  /** The key code of the key pressed during the event. */
  keyCode: number = 0;

  /** The key of the key pressed during the event. */
  key: string = '';

  /** Whether the Alt key was pressed during the event. */
  altKey: boolean = false;

  /** Whether the Control key was pressed during the event. */
  ctrlKey: boolean = false;

  /** Whether the Meta key was pressed during the event. */
  metaKey: boolean = false;

  /** Whether the Shift key was pressed during the event. */
  shiftKey: boolean = false;

  /** The state of the event. */
  state: any = null;

  /**
   * Creates a new BrowserEvent.
   * @param event The native browser event.
   */
  constructor(event: Event) {
    this.nativeEvent = event;
    this.type = event.type;
    this.target = event.target || event.srcElement;
    this.currentTarget = event.currentTarget;
    this.timeStamp = event.timeStamp || Date.now();
    this.isTrusted = event.isTrusted || false;

    // Mouse event properties
    if ('clientX' in event) {
      this.clientX = event.clientX;
      this.clientY = event.clientY;
    }

    if ('screenX' in event) {
      this.screenX = event.screenX;
      this.screenY = event.screenY;
    }

    if ('button' in event) {
      this.button = event.button;
    }

    // Keyboard event properties
    if ('keyCode' in event) {
      this.keyCode = event.keyCode || 0;
    }

    if ('key' in event) {
      this.key = event.key || '';
    }

    // Modifier keys
    if ('altKey' in event) {
      this.altKey = !!event.altKey;
      this.ctrlKey = !!event.ctrlKey;
      this.metaKey = !!event.metaKey;
      this.shiftKey = !!event.shiftKey;
    }

    // State
    if ('state' in event) {
      this.state = event.state;
    }

    // Default prevented
    if ('defaultPrevented' in event) {
      this.defaultPrevented = event.defaultPrevented;
    } else if ('returnValue' in event) {
      this.defaultPrevented = (event.returnValue === false);
    }
  }

  /**
   * Prevents the default action of the event.
   */
  preventDefault(): void {
    this.defaultPrevented = true;
    if (this.nativeEvent.preventDefault) {
      this.nativeEvent.preventDefault();
    } else {
      this.nativeEvent.returnValue = false;
    }
  }

  /**
   * Stops the propagation of the event.
   */
  stopPropagation(): void {
    this.propagationStopped = true;
    if (this.nativeEvent.stopPropagation) {
      this.nativeEvent.stopPropagation();
    } else {
      this.nativeEvent.cancelBubble = true;
    }
  }

  /**
   * Stops the immediate propagation of the event.
   */
  stopImmediatePropagation(): void {
    this.immediatePropagationStopped = true;
    if (this.nativeEvent.stopImmediatePropagation) {
      this.nativeEvent.stopImmediatePropagation();
    }
    this.stopPropagation();
  }

  /**
   * Returns whether the default action has been prevented.
   * @return True if the default action has been prevented.
   */
  isDefaultPrevented(): boolean {
    return this.defaultPrevented;
  }

  /**
   * Returns whether propagation has been stopped.
   * @return True if propagation has been stopped.
   */
  isPropagationStopped(): boolean {
    return this.propagationStopped;
  }

  /**
   * Returns whether immediate propagation has been stopped.
   * @return True if immediate propagation has been stopped.
   */
  isImmediatePropagationStopped(): boolean {
    return this.immediatePropagationStopped;
  }

  /**
   * Returns the native browser event.
   * @return The native browser event.
   */
  getNativeEvent(): Event {
    return this.nativeEvent;
  }
}
