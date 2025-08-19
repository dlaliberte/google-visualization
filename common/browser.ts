/**
 * Browser detection utilities.
 *
 * This file provides utilities for detecting browser information.
 * It replaces the Closure Library's useragent module.
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
 * Whether the user agent is Internet Explorer.
 */
export const IE = detectIE();

/**
 * The version of the user agent. For Internet Explorer, this is the IE version.
 * For other browsers, this is the browser version.
 */
export const VERSION = getVersion();

/**
 * Whether the user agent is Edge.
 */
export const EDGE = detectEdge();

/**
 * Whether the user agent is Chrome.
 */
export const CHROME = detectChrome();

/**
 * Whether the user agent is Firefox.
 */
export const FIREFOX = detectFirefox();

/**
 * Whether the user agent is Safari.
 */
export const SAFARI = detectSafari();

/**
 * Whether the user agent is Opera.
 */
export const OPERA = detectOpera();

/**
 * Whether the user agent is WebKit.
 */
export const WEBKIT = detectWebKit();

/**
 * Whether the user agent is running on a mobile device.
 */
export const MOBILE = detectMobile();

/**
 * Whether the user agent is running on an Android device.
 */
export const ANDROID = detectAndroid();

/**
 * Whether the user agent is running on an iPhone.
 */
export const IPHONE = detectIPhone();

/**
 * Whether the user agent is running on an iPad.
 */
export const IPAD = detectIPad();

/**
 * Detects if the user agent is Internet Explorer.
 * @return Whether the user agent is Internet Explorer.
 */
function detectIE(): boolean {
  const ua = navigator.userAgent;
  return (
    ua.indexOf('MSIE') !== -1 ||
    ua.indexOf('Trident/') !== -1
  );
}

/**
 * Gets the version of the user agent.
 * @return The version of the user agent.
 */
function getVersion(): string {
  const ua = navigator.userAgent;

  // IE
  const msie = ua.indexOf('MSIE ');
  if (msie !== -1) {
    return ua.substring(msie + 5, ua.indexOf('.', msie));
  }

  const trident = ua.indexOf('Trident/');
  if (trident !== -1) {
    const rv = ua.indexOf('rv:');
    return ua.substring(rv + 3, ua.indexOf('.', rv));
  }

  // Edge
  const edge = ua.indexOf('Edge/');
  if (edge !== -1) {
    return ua.substring(edge + 5, ua.indexOf('.', edge));
  }

  // Chrome
  const chrome = ua.indexOf('Chrome/');
  if (chrome !== -1) {
    return ua.substring(chrome + 7, ua.indexOf('.', chrome));
  }

  // Safari
  const safari = ua.indexOf('Safari/');
  if (safari !== -1) {
    const version = ua.indexOf('Version/');
    if (version !== -1) {
      return ua.substring(version + 8, ua.indexOf('.', version));
    }
  }

  // Firefox
  const firefox = ua.indexOf('Firefox/');
  if (firefox !== -1) {
    return ua.substring(firefox + 8, ua.indexOf('.', firefox));
  }

  // Opera
  const opera = ua.indexOf('Opera/');
  if (opera !== -1) {
    return ua.substring(opera + 6, ua.indexOf('.', opera));
  }

  return '';
}

/**
 * Detects if the user agent is Edge.
 * @return Whether the user agent is Edge.
 */
function detectEdge(): boolean {
  return navigator.userAgent.indexOf('Edge/') !== -1;
}

/**
 * Detects if the user agent is Chrome.
 * @return Whether the user agent is Chrome.
 */
function detectChrome(): boolean {
  return (
    navigator.userAgent.indexOf('Chrome/') !== -1 &&
    !detectEdge()
  );
}

/**
 * Detects if the user agent is Firefox.
 * @return Whether the user agent is Firefox.
 */
function detectFirefox(): boolean {
  return navigator.userAgent.indexOf('Firefox/') !== -1;
}

/**
 * Detects if the user agent is Safari.
 * @return Whether the user agent is Safari.
 */
function detectSafari(): boolean {
  return (
    navigator.userAgent.indexOf('Safari/') !== -1 &&
    !detectChrome() &&
    !detectEdge()
  );
}

/**
 * Detects if the user agent is Opera.
 * @return Whether the user agent is Opera.
 */
function detectOpera(): boolean {
  return navigator.userAgent.indexOf('Opera/') !== -1;
}

/**
 * Detects if the user agent is WebKit.
 * @return Whether the user agent is WebKit.
 */
function detectWebKit(): boolean {
  return navigator.userAgent.indexOf('WebKit/') !== -1;
}

/**
 * Detects if the user agent is running on a mobile device.
 * @return Whether the user agent is running on a mobile device.
 */
function detectMobile(): boolean {
  return (
    detectAndroid() ||
    detectIPhone() ||
    detectIPad() ||
    navigator.userAgent.indexOf('Mobile') !== -1
  );
}

/**
 * Detects if the user agent is running on an Android device.
 * @return Whether the user agent is running on an Android device.
 */
function detectAndroid(): boolean {
  return navigator.userAgent.indexOf('Android') !== -1;
}

/**
 * Detects if the user agent is running on an iPhone.
 * @return Whether the user agent is running on an iPhone.
 */
function detectIPhone(): boolean {
  return navigator.userAgent.indexOf('iPhone') !== -1;
}

/**
 * Detects if the user agent is running on an iPad.
 * @return Whether the user agent is running on an iPad.
 */
function detectIPad(): boolean {
  return navigator.userAgent.indexOf('iPad') !== -1;
}
