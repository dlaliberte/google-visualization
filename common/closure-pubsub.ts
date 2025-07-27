/**
 * @fileoverview PubSub utilities to replace @closure/pubsub/pubsub
 * This module provides drop-in replacements for commonly used Closure PubSub functions.
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

/**
 * A subscription token that can be used to unsubscribe from a topic.
 */
export interface SubscriptionToken {
  readonly topic: string;
  readonly id: number;
}

/**
 * A publish-subscribe system that allows decoupled communication between components.
 * This mimics the Closure PubSub class.
 */
export class PubSub extends Disposable {
  private subscriptions = new Map<string, Map<number, Function>>();
  private nextId = 1;

  /**
   * Subscribes to a topic with a callback function.
   * @param topic The topic to subscribe to.
   * @param callback The callback function to execute when the topic is published.
   * @returns A subscription token that can be used to unsubscribe.
   */
  subscribe(topic: string, callback: Function): SubscriptionToken {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Map());
    }

    const id = this.nextId++;
    const topicSubscriptions = this.subscriptions.get(topic)!;
    topicSubscriptions.set(id, callback);

    return { topic, id };
  }

  /**
   * Unsubscribes from a topic using a subscription token.
   * @param token The subscription token returned by subscribe().
   * @returns true if the subscription was found and removed, false otherwise.
   */
  unsubscribe(token: SubscriptionToken): boolean {
    const topicSubscriptions = this.subscriptions.get(token.topic);
    if (!topicSubscriptions) {
      return false;
    }

    const removed = topicSubscriptions.delete(token.id);

    // Clean up empty topic maps
    if (topicSubscriptions.size === 0) {
      this.subscriptions.delete(token.topic);
    }

    return removed;
  }

  /**
   * Unsubscribes from a topic by callback function.
   * @param topic The topic to unsubscribe from.
   * @param callback The callback function to remove.
   * @returns true if the subscription was found and removed, false otherwise.
   */
  unsubscribeByKey(topic: string, callback: Function): boolean {
    const topicSubscriptions = this.subscriptions.get(topic);
    if (!topicSubscriptions) {
      return false;
    }

    // Find the subscription with the matching callback
    for (const [id, subscribedCallback] of topicSubscriptions.entries()) {
      if (subscribedCallback === callback) {
        topicSubscriptions.delete(id);

        // Clean up empty topic maps
        if (topicSubscriptions.size === 0) {
          this.subscriptions.delete(topic);
        }

        return true;
      }
    }

    return false;
  }

  /**
   * Publishes a message to all subscribers of a topic.
   * @param topic The topic to publish to.
   * @param args The arguments to pass to the callback functions.
   * @returns The number of subscribers that were notified.
   */
  publish(topic: string, ...args: any[]): number {
    const topicSubscriptions = this.subscriptions.get(topic);
    if (!topicSubscriptions) {
      return 0;
    }

    let count = 0;
    for (const callback of topicSubscriptions.values()) {
      try {
        callback(...args);
        count++;
      } catch (error) {
        // Log the error but continue notifying other subscribers
        console.error(`Error in PubSub callback for topic "${topic}":`, error);
      }
    }

    return count;
  }

  /**
   * Gets the number of subscribers for a topic.
   * @param topic The topic to check.
   * @returns The number of subscribers.
   */
  getCount(topic: string): number {
    const topicSubscriptions = this.subscriptions.get(topic);
    return topicSubscriptions ? topicSubscriptions.size : 0;
  }

  /**
   * Gets all topics that have subscribers.
   * @returns An array of topic names.
   */
  getTopics(): string[] {
    return Array.from(this.subscriptions.keys());
  }

  /**
   * Clears all subscriptions for a topic.
   * @param topic The topic to clear.
   * @returns The number of subscriptions that were removed.
   */
  clear(topic?: string): number {
    if (topic) {
      const topicSubscriptions = this.subscriptions.get(topic);
      if (topicSubscriptions) {
        const count = topicSubscriptions.size;
        this.subscriptions.delete(topic);
        return count;
      }
      return 0;
    } else {
      // Clear all subscriptions
      let totalCount = 0;
      for (const topicSubscriptions of this.subscriptions.values()) {
        totalCount += topicSubscriptions.size;
      }
      this.subscriptions.clear();
      return totalCount;
    }
  }

  /**
   * Checks if there are any subscribers for a topic.
   * @param topic The topic to check.
   * @returns true if there are subscribers, false otherwise.
   */
  hasSubscribers(topic: string): boolean {
    return this.getCount(topic) > 0;
  }

  /**
   * Creates a one-time subscription that automatically unsubscribes after the first publication.
   * @param topic The topic to subscribe to.
   * @param callback The callback function to execute.
   * @returns A subscription token.
   */
  subscribeOnce(topic: string, callback: Function): SubscriptionToken {
    const token = this.subscribe(topic, (...args: any[]) => {
      this.unsubscribe(token);
      callback(...args);
    });
    return token;
  }

  /**
   * Disposes of the PubSub instance, clearing all subscriptions.
   */
  protected disposeInternal(): void {
    this.clear();
    super.disposeInternal();
  }
}

/**
 * Creates a new PubSub instance.
 * @returns A new PubSub instance.
 */
export function createPubSub(): PubSub {
  return new PubSub();
}

/**
 * Global PubSub instance for convenience.
 */
export const globalPubSub = new PubSub();

/**
 * Convenience function to subscribe to the global PubSub.
 * @param topic The topic to subscribe to.
 * @param callback The callback function.
 * @returns A subscription token.
 */
export function subscribe(topic: string, callback: Function): SubscriptionToken {
  return globalPubSub.subscribe(topic, callback);
}

/**
 * Convenience function to unsubscribe from the global PubSub.
 * @param token The subscription token.
 * @returns true if unsubscribed successfully.
 */
export function unsubscribe(token: SubscriptionToken): boolean {
  return globalPubSub.unsubscribe(token);
}

/**
 * Convenience function to publish to the global PubSub.
 * @param topic The topic to publish to.
 * @param args The arguments to pass to subscribers.
 * @returns The number of subscribers notified.
 */
export function publish(topic: string, ...args: any[]): number {
  return globalPubSub.publish(topic, ...args);
}
