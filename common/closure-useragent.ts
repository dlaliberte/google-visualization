/**
 * @fileoverview User agent utilities to replace @closure/useragent modules
 * This module provides drop-in replacements for commonly used Closure user agent functions.
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

// Cache the user agent string
const USER_AGENT = typeof navigator !== 'undefined' ? navigator.userAgent : '';

/**
 * Checks if the browser is Internet Explorer.
 * @returns true if the browser is IE.
 */
export function isIE(): boolean {
  return USER_AGENT.includes('MSIE') || USER_AGENT.includes('Trident/');
}

/**
 * Checks if the browser is Microsoft Edge.
 * @returns true if the browser is Edge.
 */
export function isEdge(): boolean {
  return USER_AGENT.includes('Edge/') || USER_AGENT.includes('Edg/');
}

/**
 * Checks if the browser is Chrome.
 * @returns true if the browser is Chrome.
 */
export function isChrome(): boolean {
  return USER_AGENT.includes('Chrome/') && !isEdge();
}

/**
 * Checks if the browser is Firefox.
 * @returns true if the browser is Firefox.
 */
export function isFirefox(): boolean {
  return USER_AGENT.includes('Firefox/');
}

/**
 * Checks if the browser is Safari.
 * @returns true if the browser is Safari.
 */
export function isSafari(): boolean {
  return USER_AGENT.includes('Safari/') && !isChrome() && !isEdge();
}

/**
 * Checks if the browser is Opera.
 * @returns true if the browser is Opera.
 */
export function isOpera(): boolean {
  return USER_AGENT.includes('Opera/') || USER_AGENT.includes('OPR/');
}

/**
 * Checks if the platform is Windows.
 * @returns true if the platform is Windows.
 */
export function isWindows(): boolean {
  return USER_AGENT.includes('Windows');
}

/**
 * Checks if the platform is Mac.
 * @returns true if the platform is Mac.
 */
export function isMac(): boolean {
  return USER_AGENT.includes('Macintosh') || USER_AGENT.includes('Mac OS X');
}

/**
 * Checks if the platform is Linux.
 * @returns true if the platform is Linux.
 */
export function isLinux(): boolean {
  return USER_AGENT.includes('Linux') && !USER_AGENT.includes('Android');
}

/**
 * Checks if the platform is Android.
 * @returns true if the platform is Android.
 */
export function isAndroid(): boolean {
  return USER_AGENT.includes('Android');
}

/**
 * Checks if the platform is iOS.
 * @returns true if the platform is iOS.
 */
export function isIOS(): boolean {
  return USER_AGENT.includes('iPhone') ||
         USER_AGENT.includes('iPad') ||
         USER_AGENT.includes('iPod');
}

/**
 * Checks if the device is mobile.
 * @returns true if the device is mobile.
 */
export function isMobile(): boolean {
  return isAndroid() || isIOS() ||
         USER_AGENT.includes('Mobile') ||
         USER_AGENT.includes('Tablet');
}

/**
 * Gets the browser version.
 * @returns The browser version as a string, or empty string if not detected.
 */
export function getVersion(): string {
  let match: RegExpMatchArray | null = null;

  if (isChrome()) {
    match = USER_AGENT.match(/Chrome\/(\d+(?:\.\d+)*)/);
  } else if (isFirefox()) {
    match = USER_AGENT.match(/Firefox\/(\d+(?:\.\d+)*)/);
  } else if (isSafari()) {
    match = USER_AGENT.match(/Version\/(\d+(?:\.\d+)*)/);
  } else if (isEdge()) {
    match = USER_AGENT.match(/(?:Edge|Edg)\/(\d+(?:\.\d+)*)/);
  } else if (isIE()) {
    match = USER_AGENT.match(/(?:MSIE |rv:)(\d+(?:\.\d+)*)/);
  } else if (isOpera()) {
    match = USER_AGENT.match(/(?:Opera|OPR)\/(\d+(?:\.\d+)*)/);
  }

  return match ? match[1] : '';
}

/**
 * Compares the browser version with a given version.
 * @param version The version to compare against.
 * @returns 0 if equal, positive if current version is higher, negative if lower.
 */
export function compareVersions(version: string): number {
  const currentVersion = getVersion();
  if (!currentVersion) return 0;

  const current = currentVersion.split('.').map(Number);
  const target = version.split('.').map(Number);

  const maxLength = Math.max(current.length, target.length);

  for (let i = 0; i < maxLength; i++) {
    const currentPart = current[i] || 0;
    const targetPart = target[i] || 0;

    if (currentPart > targetPart) return 1;
    if (currentPart < targetPart) return -1;
  }

  return 0;
}

/**
 * Checks if the browser version is at least the specified version.
 * @param version The minimum version required.
 * @returns true if the current version is at least the specified version.
 */
export function isVersionOrHigher(version: string): boolean {
  return compareVersions(version) >= 0;
}

/**
 * Gets the user agent string.
 * @returns The user agent string.
 */
export function getUserAgentString(): string {
  return USER_AGENT;
}
