/**
 * Event type constants.
 *
 * This file provides constants for event types.
 * It replaces the Closure Library's events/eventtype module.
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

/**
 * Native browser event interface.
 */
export interface Event {
  type: string;
  target?: EventTarget | null;
  srcElement?: EventTarget | null;
  currentTarget?: EventTarget | null;
  timeStamp?: number;
  isTrusted?: boolean;
  clientX?: number;
  clientY?: number;
  screenX?: number;
  screenY?: number;
  button?: number;
  keyCode?: number;
  key?: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  state?: any;
  defaultPrevented?: boolean;
  returnValue?: boolean;
  preventDefault?: () => void;
  stopPropagation?: () => void;
  stopImmediatePropagation?: () => void;
  cancelBubble?: boolean;
}

/**
 * Event types.
 */
export enum EventType {
  // Mouse events
  CLICK = 'click',
  DBLCLICK = 'dblclick',
  MOUSEDOWN = 'mousedown',
  MOUSEUP = 'mouseup',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout',
  MOUSEMOVE = 'mousemove',
  MOUSEENTER = 'mouseenter',
  MOUSELEAVE = 'mouseleave',

  // Keyboard events
  KEYPRESS = 'keypress',
  KEYDOWN = 'keydown',
  KEYUP = 'keyup',

  // Focus events
  FOCUS = 'focus',
  BLUR = 'blur',

  // Form events
  CHANGE = 'change',
  SELECT = 'select',
  SUBMIT = 'submit',
  INPUT = 'input',

  // Drag events
  DRAGSTART = 'dragstart',
  DRAG = 'drag',
  DRAGENTER = 'dragenter',
  DRAGLEAVE = 'dragleave',
  DRAGOVER = 'dragover',
  DROP = 'drop',
  DRAGEND = 'dragend',

  // Touch events
  TOUCHSTART = 'touchstart',
  TOUCHMOVE = 'touchmove',
  TOUCHEND = 'touchend',
  TOUCHCANCEL = 'touchcancel',

  // Scroll events
  SCROLL = 'scroll',

  // Window events
  LOAD = 'load',
  UNLOAD = 'unload',
  BEFOREUNLOAD = 'beforeunload',
  RESIZE = 'resize',

  // Animation events
  ANIMATIONSTART = 'animationstart',
  ANIMATIONEND = 'animationend',
  ANIMATIONITERATION = 'animationiteration',

  // Transition events
  TRANSITIONEND = 'transitionend',

  // Pointer events
  POINTERDOWN = 'pointerdown',
  POINTERMOVE = 'pointermove',
  POINTERUP = 'pointerup',
  POINTERCANCEL = 'pointercancel',
  POINTEROVER = 'pointerover',
  POINTEROUT = 'pointerout',
  POINTERENTER = 'pointerenter',
  POINTERLEAVE = 'pointerleave',

  // Clipboard events
  COPY = 'copy',
  CUT = 'cut',
  PASTE = 'paste',

  // Media events
  PLAY = 'play',
  PAUSE = 'pause',
  ENDED = 'ended',

  // Custom events
  CUSTOM = 'custom'
}
