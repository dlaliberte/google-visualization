/**
 * @fileoverview Tooltip utilities to replace @closure/ui/tooltip
 * This module provides drop-in replacements for commonly used Closure tooltip functions.
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

import { Disposable } from './disposable';
import { EventHandler } from './events';

/**
 * Tooltip positioning options.
 */
export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  AUTO = 'auto'
}

/**
 * Tooltip state enumeration.
 */
export enum TooltipState {
  INACTIVE = 0,
  WAITING_TO_SHOW = 1,
  SHOWING = 2,
  WAITING_TO_HIDE = 3,
  UPDATING = 4
}

/**
 * A tooltip implementation that mimics Closure's Tooltip class.
 */
export class Tooltip extends Disposable {
  private element: HTMLElement | null = null;
  private targetElement: Element | null = null;
  private content: string = '';
  private position: TooltipPosition = TooltipPosition.AUTO;
  private showDelay: number = 500;
  private hideDelay: number = 0;
  private state: TooltipState = TooltipState.INACTIVE;
  private showTimer: number | null = null;
  private hideTimer: number | null = null;
  private eventHandler: EventHandler;
  private className: string = 'goog-tooltip';

  constructor(element?: Element, content?: string) {
    super();
    this.eventHandler = new EventHandler();

    if (element) {
      this.attach(element);
    }

    if (content) {
      this.setContent(content);
    }
  }

  /**
   * Attaches the tooltip to an element.
   * @param element The element to attach to.
   */
  attach(element: Element): void {
    if (this.targetElement) {
      this.detach();
    }

    this.targetElement = element;

    // Add event listeners
    this.eventHandler.listen(element, 'mouseenter', this.handleMouseEnter.bind(this));
    this.eventHandler.listen(element, 'mouseleave', this.handleMouseLeave.bind(this));
    this.eventHandler.listen(element, 'focus', this.handleFocus.bind(this));
    this.eventHandler.listen(element, 'blur', this.handleBlur.bind(this));
  }

  /**
   * Detaches the tooltip from its current element.
   */
  detach(): void {
    if (this.targetElement) {
      this.eventHandler.removeAll();
      this.targetElement = null;
    }
    this.hide();
  }

  /**
   * Sets the tooltip content.
   * @param content The content to display.
   */
  setContent(content: string): void {
    this.content = content;
    if (this.element) {
      this.element.innerHTML = content;
    }
  }

  /**
   * Gets the tooltip content.
   * @returns The current content.
   */
  getContent(): string {
    return this.content;
  }

  /**
   * Sets the tooltip position.
   * @param position The position relative to the target element.
   */
  setPosition(position: TooltipPosition): void {
    this.position = position;
  }

  /**
   * Sets the show delay.
   * @param delay The delay in milliseconds before showing.
   */
  setShowDelay(delay: number): void {
    this.showDelay = delay;
  }

  /**
   * Sets the hide delay.
   * @param delay The delay in milliseconds before hiding.
   */
  setHideDelay(delay: number): void {
    this.hideDelay = delay;
  }

  /**
   * Sets the CSS class name for the tooltip.
   * @param className The CSS class name.
   */
  setClassName(className: string): void {
    this.className = className;
    if (this.element) {
      this.element.className = className;
    }
  }

  /**
   * Shows the tooltip.
   */
  show(): void {
    if (this.state === TooltipState.SHOWING) {
      return;
    }

    this.clearTimers();
    this.state = TooltipState.SHOWING;

    if (!this.element) {
      this.createElement();
    }

    if (this.element && this.targetElement) {
      this.positionTooltip();
      this.element.style.display = 'block';
    }
  }

  /**
   * Hides the tooltip.
   */
  hide(): void {
    if (this.state === TooltipState.INACTIVE) {
      return;
    }

    this.clearTimers();
    this.state = TooltipState.INACTIVE;

    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  /**
   * Gets the current state of the tooltip.
   * @returns The current state.
   */
  getState(): TooltipState {
    return this.state;
  }

  /**
   * Checks if the tooltip is visible.
   * @returns true if the tooltip is showing.
   */
  isVisible(): boolean {
    return this.state === TooltipState.SHOWING;
  }

  /**
   * Creates the tooltip DOM element.
   */
  private createElement(): void {
    if (this.element) {
      return;
    }

    this.element = document.createElement('div');
    this.element.className = this.className;
    this.element.innerHTML = this.content;
    this.element.style.position = 'absolute';
    this.element.style.zIndex = '1000';
    this.element.style.display = 'none';
    this.element.style.backgroundColor = '#ffffcc';
    this.element.style.border = '1px solid #cccccc';
    this.element.style.padding = '4px';
    this.element.style.borderRadius = '3px';
    this.element.style.fontSize = '12px';
    this.element.style.maxWidth = '300px';
    this.element.style.wordWrap = 'break-word';

    document.body.appendChild(this.element);
  }

  /**
   * Positions the tooltip relative to the target element.
   */
  private positionTooltip(): void {
    if (!this.element || !this.targetElement) {
      return;
    }

    const targetRect = this.targetElement.getBoundingClientRect();
    const tooltipRect = this.element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = 0;
    let top = 0;

    switch (this.position) {
      case TooltipPosition.TOP:
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        top = targetRect.top - tooltipRect.height - 5;
        break;

      case TooltipPosition.BOTTOM:
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        top = targetRect.bottom + 5;
        break;

      case TooltipPosition.LEFT:
        left = targetRect.left - tooltipRect.width - 5;
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        break;

      case TooltipPosition.RIGHT:
        left = targetRect.right + 5;
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        break;

      case TooltipPosition.AUTO:
      default:
        // Auto-position based on available space
        if (targetRect.bottom + tooltipRect.height + 5 <= viewportHeight) {
          // Show below
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          top = targetRect.bottom + 5;
        } else if (targetRect.top - tooltipRect.height - 5 >= 0) {
          // Show above
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          top = targetRect.top - tooltipRect.height - 5;
        } else if (targetRect.right + tooltipRect.width + 5 <= viewportWidth) {
          // Show to the right
          left = targetRect.right + 5;
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        } else {
          // Show to the left
          left = targetRect.left - tooltipRect.width - 5;
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        }
        break;
    }

    // Ensure tooltip stays within viewport
    left = Math.max(5, Math.min(left, viewportWidth - tooltipRect.width - 5));
    top = Math.max(5, Math.min(top, viewportHeight - tooltipRect.height - 5));

    this.element.style.left = left + window.scrollX + 'px';
    this.element.style.top = top + window.scrollY + 'px';
  }

  /**
   * Handles mouse enter events.
   */
  private handleMouseEnter(): void {
    this.clearTimers();

    if (this.showDelay > 0) {
      this.state = TooltipState.WAITING_TO_SHOW;
      this.showTimer = window.setTimeout(() => {
        this.show();
      }, this.showDelay);
    } else {
      this.show();
    }
  }

  /**
   * Handles mouse leave events.
   */
  private handleMouseLeave(): void {
    this.clearTimers();

    if (this.hideDelay > 0) {
      this.state = TooltipState.WAITING_TO_HIDE;
      this.hideTimer = window.setTimeout(() => {
        this.hide();
      }, this.hideDelay);
    } else {
      this.hide();
    }
  }

  /**
   * Handles focus events.
   */
  private handleFocus(): void {
    this.handleMouseEnter();
  }

  /**
   * Handles blur events.
   */
  private handleBlur(): void {
    this.handleMouseLeave();
  }

  /**
   * Clears any pending timers.
   */
  private clearTimers(): void {
    if (this.showTimer !== null) {
      window.clearTimeout(this.showTimer);
      this.showTimer = null;
    }

    if (this.hideTimer !== null) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  /**
   * Disposes of the tooltip, cleaning up resources.
   */
  protected disposeInternal(): void {
    this.detach();
    this.clearTimers();

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }

    this.eventHandler.dispose();
    super.disposeInternal();
  }
}
