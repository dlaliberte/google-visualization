/**
 * @fileoverview HTML utilities to replace @closure/html modules
 * This module provides drop-in replacements for commonly used Closure HTML functions.
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

import { Const } from './closure-string';

/**
 * A type for trusted resource URLs.
 * This is a simplified version that doesn't provide the same security guarantees as Closure's version.
 */
export type TrustedResourceUrl = string & { readonly __brand: 'TrustedResourceUrl' };

/**
 * Creates a TrustedResourceUrl from a string.
 * In a real implementation, this would validate the URL for security.
 * @param url The URL string.
 * @returns A TrustedResourceUrl.
 */
export function createTrustedResourceUrl(url: string): TrustedResourceUrl {
  // In a production environment, you would want to validate the URL
  // against a whitelist of trusted domains/patterns
  return url as TrustedResourceUrl;
}

/**
 * Formats a TrustedResourceUrl with parameters.
 * @param format The format string with placeholders.
 * @param args The arguments to substitute.
 * @param params Additional query parameters.
 * @returns A formatted TrustedResourceUrl.
 */
export function formatWithParams(
  format: Const,
  args: { [key: string]: string | number | Const },
  params?: { [key: string]: string }
): TrustedResourceUrl {
  let url = format as string;

  // Replace placeholders in the format string
  for (const [key, value] of Object.entries(args)) {
    const placeholder = `%{${key}}`;
    url = url.replace(new RegExp(placeholder, 'g'), String(value));
  }

  // Add query parameters
  if (params && Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      queryParams.append(key, value);
    }
    const separator = url.includes('?') ? '&' : '?';
    url += separator + queryParams.toString();
  }

  return createTrustedResourceUrl(url);
}

/**
 * Converts a TrustedResourceUrl to a string.
 * @param url The TrustedResourceUrl.
 * @returns The URL as a string.
 */
export function unwrapTrustedResourceUrl(url: TrustedResourceUrl): string {
  return url as string;
}

/**
 * Checks if a URL is safe to use as a resource URL.
 * This is a simplified check - in production you'd want more comprehensive validation.
 * @param url The URL to check.
 * @returns true if the URL appears safe.
 */
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.href);

    // Allow same-origin URLs
    if (parsed.origin === window.location.origin) {
      return true;
    }

    // Allow HTTPS URLs from trusted domains (this is a simplified check)
    if (parsed.protocol === 'https:') {
      const trustedDomains = [
        'googleapis.com',
        'gstatic.com',
        'google.com',
        'googleusercontent.com'
      ];

      return trustedDomains.some(domain =>
        parsed.hostname === domain || parsed.hostname.endsWith('.' + domain)
      );
    }

    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Creates a TrustedResourceUrl from a trusted source.
 * @param url The URL from a trusted source.
 * @returns A TrustedResourceUrl if the URL is safe.
 */
export function fromConstant(url: Const): TrustedResourceUrl {
  return createTrustedResourceUrl(url as string);
}

/**
 * Creates a TrustedResourceUrl for a data URL.
 * @param data The data URL string.
 * @returns A TrustedResourceUrl.
 */
export function fromDataUrl(data: string): TrustedResourceUrl {
  if (!data.startsWith('data:')) {
    throw new Error('Invalid data URL');
  }
  return createTrustedResourceUrl(data);
}

/**
 * HTML sanitization utilities.
 */
export namespace SafeHtml {
  /**
   * A type for safe HTML content.
   */
  export type SafeHtml = string & { readonly __brand: 'SafeHtml' };

  /**
   * Creates SafeHtml from a trusted string.
   * @param html The HTML string.
   * @returns SafeHtml.
   */
  export function create(html: string): SafeHtml {
    // In a real implementation, this would sanitize the HTML
    return html as SafeHtml;
  }

  /**
   * Creates SafeHtml from a constant.
   * @param html The HTML constant.
   * @returns SafeHtml.
   */
  export function fromConstant(html: Const): SafeHtml {
    return create(html as string);
  }

  /**
   * Converts SafeHtml to a string.
   * @param html The SafeHtml.
   * @returns The HTML as a string.
   */
  export function unwrap(html: SafeHtml): string {
    return html as string;
  }

  /**
   * Empty SafeHtml.
   */
  export const EMPTY: SafeHtml = create('');
}
