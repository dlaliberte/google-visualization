/**
 * Custom button component.
 *
 * This file provides a custom button component.
 * It replaces the Closure Library's ui/custombutton module.
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

import { Component, EventType as ComponentEventType } from './component';
import { ButtonSide } from './button_side';
import { ControlContent } from './control_content';

/**
 * CSS class names for the button.
 */
const CSS_CLASS = {
  /** Base class for all buttons. */
  BUTTON: 'goog-custom-button',

  /** Class for buttons that are active (pressed). */
  ACTIVE: 'goog-custom-button-active',

  /** Class for buttons that are disabled. */
  DISABLED: 'goog-custom-button-disabled',

  /** Class for buttons that are hovered. */
  HOVER: 'goog-custom-button-hover',

  /** Class for buttons that are focused. */
  FOCUSED: 'goog-custom-button-focused',

  /** Class for buttons that are collapsed on the start side. */
  COLLAPSE_START: 'goog-custom-button-collapse-start',

  /** Class for buttons that are collapsed on the end side. */
  COLLAPSE_END: 'goog-custom-button-collapse-end',

  /** Class for buttons that are collapsed on both sides. */
  COLLAPSE_BOTH: 'goog-custom-button-collapse-both'
};

/**
 * Custom button component.
 */
export class CustomButton extends Component {
  /** The content of the button. */
  private content_: ControlContent | null = null;

  /** The tooltip text for the button. */
  private tooltip_: string = '';

  /** The value associated with the button. */
  private value_: string = '';

  /** Whether the button is active (pressed). */
  private active_: boolean = false;

  /** Whether the button supports being active. */
  private supportsActiveState_: boolean = true;

  /** Which sides of the button are collapsed. */
  private collapsedSides_: ButtonSide = ButtonSide.NONE;

  /**
   * Creates a new CustomButton.
   * @param content The content of the button.
   * @param opt_renderer Optional renderer.
   * @param opt_domHelper Optional DOM helper.
   */
  constructor(content: ControlContent) {
    super();

    this.setContentInternal(content);
  }

  /**
   * Sets the content of the button.
   * @param content The content of the button.
   */
  setContent(content: ControlContent): void {
    this.setContentInternal(content);

    if (this.isInDocument()) {
      this.updateButtonContent();
    }
  }

  /**
   * Sets the content of the button internally.
   * @param content The content of the button.
   */
  private setContentInternal(content: ControlContent): void {
    this.content_ = content;
  }

  /**
   * Returns the content of the button.
   * @return The content of the button.
   */
  getContent(): ControlContent | null {
    return this.content_;
  }

  /**
   * Sets the tooltip text for the button.
   * @param tooltip The tooltip text.
   */
  setTooltip(tooltip: string): void {
    this.tooltip_ = tooltip;

    const element = this.getElement();
    if (element) {
      element.title = tooltip;
    }
  }

  /**
   * Returns the tooltip text for the button.
   * @return The tooltip text.
   */
  getTooltip(): string {
    return this.tooltip_;
  }

  /**
   * Sets the value associated with the button.
   * @param value The value.
   */
  setValue(value: string): void {
    this.value_ = value;
  }

  /**
   * Returns the value associated with the button.
   * @return The value.
   */
  getValue(): string {
    return this.value_;
  }

  /**
   * Sets whether the button supports being active.
   * @param supportsActiveState Whether the button supports being active.
   */
  setSupportsActiveState(supportsActiveState: boolean): void {
    this.supportsActiveState_ = supportsActiveState;
  }

  /**
   * Returns whether the button supports being active.
   * @return Whether the button supports being active.
   */
  supportsActiveState(): boolean {
    return this.supportsActiveState_;
  }

  /**
   * Sets whether the button is active.
   * @param active Whether the button is active.
   */
  setActive(active: boolean): void {
    if (this.supportsActiveState_ && this.active_ !== active) {
      this.active_ = active;

      const element = this.getElement();
      if (element) {
        if (active) {
          element.classList.add(CSS_CLASS.ACTIVE);
        } else {
          element.classList.remove(CSS_CLASS.ACTIVE);
        }
      }
    }
  }

  /**
   * Returns whether the button is active.
   * @return Whether the button is active.
   */
  isActive(): boolean {
    return this.active_;
  }

  /**
   * Sets which sides of the button are collapsed.
   * @param sides The sides to collapse.
   */
  setCollapsed(sides: ButtonSide): void {
    if (this.collapsedSides_ !== sides) {
      const element = this.getElement();
      if (element) {
        // Remove existing collapse classes.
        element.classList.remove(CSS_CLASS.COLLAPSE_START);
        element.classList.remove(CSS_CLASS.COLLAPSE_END);
        element.classList.remove(CSS_CLASS.COLLAPSE_BOTH);

        // Add new collapse class.
        switch (sides) {
          case ButtonSide.START:
            element.classList.add(CSS_CLASS.COLLAPSE_START);
            break;
          case ButtonSide.END:
            element.classList.add(CSS_CLASS.COLLAPSE_END);
            break;
          case ButtonSide.BOTH:
            element.classList.add(CSS_CLASS.COLLAPSE_BOTH);
            break;
        }
      }

      this.collapsedSides_ = sides;
    }
  }

  /**
   * Returns which sides of the button are collapsed.
   * @return The sides that are collapsed.
   */
  getCollapsed(): ButtonSide {
    return this.collapsedSides_;
  }

  /**
   * Creates the DOM for the button.
   * @return The button element.
   */
  override createDom(): Element {
    const button = document.createElement('div');
    button.className = CSS_CLASS.BUTTON;
    button.tabIndex = 0;

    if (this.tooltip_) {
      button.title = this.tooltip_;
    }

    this.setElementInternal(button);
    this.updateButtonContent();

    if (!this.isEnabled()) {
      button.classList.add(CSS_CLASS.DISABLED);
    }

    if (this.active_) {
      button.classList.add(CSS_CLASS.ACTIVE);
    }

    // Add collapse class.
    switch (this.collapsedSides_) {
      case ButtonSide.START:
        button.classList.add(CSS_CLASS.COLLAPSE_START);
        break;
      case ButtonSide.END:
        button.classList.add(CSS_CLASS.COLLAPSE_END);
        break;
      case ButtonSide.BOTH:
        button.classList.add(CSS_CLASS.COLLAPSE_BOTH);
        break;
    }

    return button;
  }

  /**
   * Updates the button's content.
   */
  private updateButtonContent(): void {
    const element = this.getElement();
    if (!element) {
      return;
    }

    // Clear existing content.
    element.innerHTML = '';

    // Add new content.
    if (this.content_) {
      if (typeof this.content_ === 'string') {
        element.textContent = this.content_;
      } else if (this.content_ instanceof Node) {
        element.appendChild(this.content_);
      } else if (Array.isArray(this.content_)) {
        for (const node of this.content_) {
          element.appendChild(node);
        }
      }
    }
  }

  /**
   * Sets the element for the button.
   * @param element The element.
   */
  private setElementInternal(element: Element): void {
    this.setElement(element);

    // Add event listeners.
    element.addEventListener('click', this.handleClick.bind(this));
    element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    element.addEventListener('mouseup', this.handleMouseUp.bind(this));
    element.addEventListener('mouseover', this.handleMouseOver.bind(this));
    element.addEventListener('mouseout', this.handleMouseOut.bind(this));
    element.addEventListener('focus', this.handleFocus.bind(this));
    element.addEventListener('blur', this.handleBlur.bind(this));
    element.addEventListener('keydown', this.handleKeyDown.bind(this));
    element.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  /**
   * Handles click events.
   * @param e The event.
   */
  private handleClick(e: MouseEvent): void {
    if (this.isEnabled()) {
      this.performActionInternal(e);
      this.dispatchEvent(ComponentEventType.ACTION);
    }
  }

  /**
   * Handles mousedown events.
   * @param e The event.
   */
  private handleMouseDown(e: MouseEvent): void {
    if (this.isEnabled() && e.button === 0) {
      this.setActive(true);
    }
  }

  /**
   * Handles mouseup events.
   * @param e The event.
   */
  private handleMouseUp(e: MouseEvent): void {
    if (this.isActive()) {
      this.setActive(false);
    }
  }

  /**
   * Handles mouseover events.
   * @param e The event.
   */
  private handleMouseOver(e: MouseEvent): void {
    if (this.isEnabled()) {
      const element = this.getElement();
      if (element) {
        element.classList.add(CSS_CLASS.HOVER);
      }
    }
  }

  /**
   * Handles mouseout events.
   * @param e The event.
   */
  private handleMouseOut(e: MouseEvent): void {
    const element = this.getElement();
    if (element) {
      element.classList.remove(CSS_CLASS.HOVER);
    }

    if (this.isActive()) {
      this.setActive(false);
    }
  }

  /**
   * Handles focus events.
   * @param e The event.
   */
  private handleFocus(e: FocusEvent): void {
    if (this.isEnabled()) {
      const element = this.getElement();
      if (element) {
        element.classList.add(CSS_CLASS.FOCUSED);
      }
    }
  }

  /**
   * Handles blur events.
   * @param e The event.
   */
  private handleBlur(e: FocusEvent): void {
    const element = this.getElement();
    if (element) {
      element.classList.remove(CSS_CLASS.FOCUSED);
    }

    if (this.isActive()) {
      this.setActive(false);
    }
  }

  /**
   * Handles keydown events.
   * @param e The event.
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (this.isEnabled() && (e.key === 'Enter' || e.key === ' ')) {
      this.setActive(true);
    }
  }

  /**
   * Handles keyup events.
   * @param e The event.
   */
  private handleKeyUp(e: KeyboardEvent): void {
    if (this.isEnabled() && (e.key === 'Enter' || e.key === ' ')) {
      if (this.isActive()) {
        this.performActionInternal(e);
        this.setActive(false);
        this.dispatchEvent(ComponentEventType.ACTION);
      }
    }
  }

  /**
   * Performs the button's action.
   * @param e The event that triggered the action.
   */
  private performActionInternal(e: Event): void {
    // Subclasses may override to perform custom actions.
  }

  /**
   * Sets whether the button is enabled.
   * @param enabled Whether the button is enabled.
   */
  override setEnabled(enabled: boolean): void {
    super.setEnabled(enabled);

    const element = this.getElement();
    if (element) {
      if (enabled) {
        element.classList.remove(CSS_CLASS.DISABLED);
        element.tabIndex = 0;
      } else {
        element.classList.add(CSS_CLASS.DISABLED);
        element.tabIndex = -1;

        if (this.isActive()) {
          this.setActive(false);
        }

        element.classList.remove(CSS_CLASS.HOVER);
        element.classList.remove(CSS_CLASS.FOCUSED);
      }
    }
  }
}
