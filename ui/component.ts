/**
 * Base component class.
 *
 * This file provides a base class for UI components.
 * It replaces the Closure Library's ui/component module.
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

import { EventTarget } from '../common/events';

/**
 * Event types for Component.
 */
export enum EventType {
  /** Dispatched after the component is rendered. */
  RENDER = 'render',

  /** Dispatched after the component is shown. */
  SHOW = 'show',

  /** Dispatched after the component is hidden. */
  HIDE = 'hide',

  /** Dispatched after the component is enabled/disabled. */
  ENABLE = 'enable',

  /** Dispatched after the component is activated/deactivated. */
  ACTIVATE = 'activate',

  /** Dispatched after the component is selected/deselected. */
  SELECT = 'select',

  /** Dispatched after the component is checked/unchecked. */
  CHECK = 'check',

  /** Dispatched after the component is focused. */
  FOCUS = 'focus',

  /** Dispatched after the component is blurred. */
  BLUR = 'blur',

  /** Dispatched when an action is performed on the component. */
  ACTION = 'action',

  /** Dispatched when the component is about to be disposed. */
  BEFOREDISPOSE = 'beforedispose'
}

/**
 * Base class for UI components.
 */
export class Component extends EventTarget {
  /** The DOM element for the component. */
  private element_: Element | null = null;

  /** The ID of the component. */
  private id_: string = '';

  /** Whether the component is in the document. */
  private inDocument_: boolean = false;

  /** The parent component. */
  private parent_: Component | null = null;

  /** The child components. */
  private children_: Map<string, Component> = new Map();

  /** Whether the component is visible. */
  private visible_: boolean = true;

  /** Whether the component is enabled. */
  private enabled_: boolean = true;

  /** Static counter for generating unique IDs. */
  private static nextId_: number = 0;

  /**
   * Creates a new Component.
   * @param opt_domHelper Optional DOM helper.
   */
  constructor() {
    super();
    this.id_ = 'component-' + Component.nextId_++;
  }

  /**
   * Returns the ID of the component.
   * @return The ID of the component.
   */
  getId(): string {
    return this.id_;
  }

  /**
   * Sets the ID of the component.
   * @param id The ID of the component.
   */
  setId(id: string): void {
    this.id_ = id;
  }

  /**
   * Returns the element associated with the component.
   * @return The element associated with the component.
   */
  getElement(): Element | null {
    return this.element_;
  }

  /**
   * Sets the element associated with the component.
   * @param element The element to associate with the component.
   */
  setElement(element: Element): void {
    this.element_ = element;
  }

  /**
   * Returns whether the component is in the document.
   * @return Whether the component is in the document.
   */
  isInDocument(): boolean {
    return this.inDocument_;
  }

  /**
   * Creates the initial DOM representation for the component.
   * @return The element created.
   */
  createDom(): Element {
    throw new Error('Component.createDom not implemented');
  }

  /**
   * Renders the component. If a parent element is supplied, the component's
   * element will be added to it. If there is no element for the component,
   * createDom() will be called to create it.
   * @param opt_parentElement Optional parent element to render the component into.
   */
  render(opt_parentElement?: Element): void {
    if (!this.element_) {
      this.element_ = this.createDom();
    }

    if (opt_parentElement) {
      opt_parentElement.appendChild(this.element_);
    }

    if (!this.inDocument_ && this.element_.parentNode) {
      this.enterDocument();
    }
  }

  /**
   * Called when the component's element is added to the document.
   */
  enterDocument(): void {
    this.inDocument_ = true;

    // Enter document for all children.
    this.children_.forEach((child) => {
      if (!child.isInDocument() && child.getElement()) {
        child.enterDocument();
      }
    });

    this.dispatchEvent(EventType.RENDER);
  }

  /**
   * Called when the component's element is removed from the document.
   */
  exitDocument(): void {
    // Exit document for all children.
    this.children_.forEach((child) => {
      if (child.isInDocument()) {
        child.exitDocument();
      }
    });

    this.inDocument_ = false;
  }

  /**
   * Adds a child component.
   * @param child The child component to add.
   * @param opt_render Whether to render the child component.
   */
  addChild(child: Component, opt_render?: boolean): void {
    const id = child.getId();

    if (this.children_.has(id)) {
      throw new Error(`Duplicate child component ID: ${id}`);
    }

    this.children_.set(id, child);
    child.setParent(this);

    if (opt_render && this.element_) {
      child.render(this.element_);
    }
  }

  /**
   * Removes a child component.
   * @param child The child component to remove.
   * @param opt_unrender Whether to unrender the child component.
   */
  removeChild(child: Component, opt_unrender?: boolean): void {
    const id = child.getId();

    if (this.children_.has(id)) {
      this.children_.delete(id);
      child.setParent(null);

      if (opt_unrender) {
        const element = child.getElement();
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
        child.exitDocument();
      }
    }
  }

  /**
   * Returns a child component by ID.
   * @param id The ID of the child component.
   * @return The child component, or null if not found.
   */
  getChild(id: string): Component | null {
    return this.children_.get(id) || null;
  }

  /**
   * Returns all child components.
   * @return An array of child components.
   */
  getChildCount(): number {
    return this.children_.size;
  }

  /**
   * Returns the parent component.
   * @return The parent component, or null if none.
   */
  getParent(): Component | null {
    return this.parent_;
  }

  /**
   * Sets the parent component.
   * @param parent The parent component.
   */
  setParent(parent: Component | null): void {
    this.parent_ = parent;
  }

  /**
   * Returns whether the component is visible.
   * @return Whether the component is visible.
   */
  isVisible(): boolean {
    return this.visible_;
  }

  /**
   * Sets whether the component is visible.
   * @param visible Whether the component is visible.
   */
  setVisible(visible: boolean): void {
    if (this.visible_ !== visible) {
      this.visible_ = visible;

      if (this.element_) {
        this.element_.style.display = visible ? '' : 'none';
      }

      this.dispatchEvent(visible ? EventType.SHOW : EventType.HIDE);
    }
  }

  /**
   * Returns whether the component is enabled.
   * @return Whether the component is enabled.
   */
  isEnabled(): boolean {
    return this.enabled_;
  }

  /**
   * Sets whether the component is enabled.
   * @param enabled Whether the component is enabled.
   */
  setEnabled(enabled: boolean): void {
    if (this.enabled_ !== enabled) {
      this.enabled_ = enabled;

      this.dispatchEvent(EventType.ENABLE);
    }
  }

  /**
   * Disposes of the component.
   */
  override dispose(): void {
    if (this.isDisposed()) {
      return;
    }

    this.dispatchEvent(EventType.BEFOREDISPOSE);

    // Dispose of all children.
    const children = Array.from(this.children_.values());
    for (const child of children) {
      child.dispose();
    }
    this.children_.clear();

    // Remove from parent.
    if (this.parent_) {
      this.parent_.removeChild(this, true);
    }

    // Remove from document.
    if (this.inDocument_) {
      this.exitDocument();
    }

    // Remove element.
    if (this.element_ && this.element_.parentNode) {
      this.element_.parentNode.removeChild(this.element_);
    }
    this.element_ = null;

    super.dispose();
  }
}
