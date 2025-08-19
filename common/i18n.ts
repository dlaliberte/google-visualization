/**
 * Internationalization utilities.
 *
 * This file provides utilities for internationalization.
 * It replaces the Closure Library's i18n module.
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
 * A simple map of messages.
 */
const messages: Record<string, string> = {};

/**
 * Gets a message from the message bundle.
 * @param message The message to get.
 * @param opt_placeholders Optional map of placeholder values.
 * @return The message with placeholders filled in.
 */
export function getMsg(
  message: string,
  opt_placeholders?: Record<string, string>
): string {
  // If the message is in the bundle, use that.
  const translatedMessage = messages[message] || message;

  // If there are placeholders, fill them in.
  if (opt_placeholders) {
    return translatedMessage.replace(/\{([^}]+)\}/g, (match, key) => {
      return opt_placeholders[key] !== undefined ? opt_placeholders[key] : match;
    });
  }

  return translatedMessage;
}

/**
 * Sets a message in the message bundle.
 * @param message The message to set.
 * @param translation The translation of the message.
 */
export function setMsg(message: string, translation: string): void {
  messages[message] = translation;
}

/**
 * Sets multiple messages in the message bundle.
 * @param messageMap A map of messages to their translations.
 */
export function setMsgs(messageMap: Record<string, string>): void {
  Object.assign(messages, messageMap);
}

/**
 * Clears all messages from the message bundle.
 */
export function clearMsgs(): void {
  Object.keys(messages).forEach(key => {
    delete messages[key];
  });
}

/**
 * Gets all messages from the message bundle.
 * @return A map of all messages.
 */
export function getAllMsgs(): Record<string, string> {
  return { ...messages };
}
