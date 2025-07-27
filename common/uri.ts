/**
 * @fileoverview URI utilities to replace @closure/uri/uri
 * This module provides drop-in replacements for commonly used Closure URI functions.
 */

/**
 * A simple URI class that provides basic URI manipulation functionality.
 */
export class Uri {
  private url: URL;

  constructor(uri?: string | Uri) {
    if (uri instanceof Uri) {
      this.url = new URL(uri.toString());
    } else if (uri) {
      this.url = new URL(uri);
    } else {
      this.url = new URL('about:blank');
    }
  }

  /**
   * Gets the scheme (protocol) of the URI.
   * @returns The scheme without the colon.
   */
  getScheme(): string {
    return this.url.protocol.slice(0, -1); // Remove the trailing colon
  }

  /**
   * Sets the scheme (protocol) of the URI.
   * @param scheme The scheme to set.
   * @returns This URI instance for chaining.
   */
  setScheme(scheme: string): Uri {
    this.url.protocol = scheme + ':';
    return this;
  }

  /**
   * Gets the domain (hostname) of the URI.
   * @returns The domain.
   */
  getDomain(): string {
    return this.url.hostname;
  }

  /**
   * Sets the domain (hostname) of the URI.
   * @param domain The domain to set.
   * @returns This URI instance for chaining.
   */
  setDomain(domain: string): Uri {
    this.url.hostname = domain;
    return this;
  }

  /**
   * Gets the port of the URI.
   * @returns The port number or null if not specified.
   */
  getPort(): number | null {
    return this.url.port ? parseInt(this.url.port, 10) : null;
  }

  /**
   * Sets the port of the URI.
   * @param port The port to set.
   * @returns This URI instance for chaining.
   */
  setPort(port: number | null): Uri {
    this.url.port = port ? port.toString() : '';
    return this;
  }

  /**
   * Gets the path of the URI.
   * @returns The path.
   */
  getPath(): string {
    return this.url.pathname;
  }

  /**
   * Sets the path of the URI.
   * @param path The path to set.
   * @returns This URI instance for chaining.
   */
  setPath(path: string): Uri {
    this.url.pathname = path;
    return this;
  }

  /**
   * Gets the query string of the URI.
   * @returns The query string without the leading question mark.
   */
  getQuery(): string {
    return this.url.search.slice(1); // Remove the leading question mark
  }

  /**
   * Sets the query string of the URI.
   * @param query The query string to set.
   * @returns This URI instance for chaining.
   */
  setQuery(query: string): Uri {
    this.url.search = query ? '?' + query : '';
    return this;
  }

  /**
   * Gets the fragment (hash) of the URI.
   * @returns The fragment without the leading hash.
   */
  getFragment(): string {
    return this.url.hash.slice(1); // Remove the leading hash
  }

  /**
   * Sets the fragment (hash) of the URI.
   * @param fragment The fragment to set.
   * @returns This URI instance for chaining.
   */
  setFragment(fragment: string): Uri {
    this.url.hash = fragment ? '#' + fragment : '';
    return this;
  }

  /**
   * Gets a query parameter value.
   * @param key The parameter key.
   * @returns The parameter value or null if not found.
   */
  getParameterValue(key: string): string | null {
    return this.url.searchParams.get(key);
  }

  /**
   * Gets all values for a query parameter.
   * @param key The parameter key.
   * @returns An array of parameter values.
   */
  getParameterValues(key: string): string[] {
    return this.url.searchParams.getAll(key);
  }

  /**
   * Sets a query parameter value.
   * @param key The parameter key.
   * @param value The parameter value.
   * @returns This URI instance for chaining.
   */
  setParameterValue(key: string, value: string): Uri {
    this.url.searchParams.set(key, value);
    return this;
  }

  /**
   * Adds a query parameter value.
   * @param key The parameter key.
   * @param value The parameter value.
   * @returns This URI instance for chaining.
   */
  setParameterValues(key: string, values: string[]): Uri {
    this.url.searchParams.delete(key);
    for (const value of values) {
      this.url.searchParams.append(key, value);
    }
    return this;
  }

  /**
   * Removes a query parameter.
   * @param key The parameter key to remove.
   * @returns This URI instance for chaining.
   */
  removeParameter(key: string): Uri {
    this.url.searchParams.delete(key);
    return this;
  }

  /**
   * Gets all query parameter keys.
   * @returns An array of parameter keys.
   */
  getParameterKeys(): string[] {
    return Array.from(this.url.searchParams.keys());
  }

  /**
   * Checks if a query parameter exists.
   * @param key The parameter key.
   * @returns true if the parameter exists.
   */
  hasParameter(key: string): boolean {
    return this.url.searchParams.has(key);
  }

  /**
   * Clones this URI.
   * @returns A new URI instance with the same values.
   */
  clone(): Uri {
    return new Uri(this.toString());
  }

  /**
   * Resolves a relative URI against this URI.
   * @param relativeUri The relative URI to resolve.
   * @returns A new URI instance with the resolved URI.
   */
  resolve(relativeUri: string): Uri {
    const resolved = new URL(relativeUri, this.url);
    return new Uri(resolved.toString());
  }

  /**
   * Converts the URI to a string.
   * @returns The URI as a string.
   */
  toString(): string {
    return this.url.toString();
  }

  /**
   * Creates a URI from a string.
   * @param uri The URI string.
   * @returns A new URI instance.
   */
  static parse(uri: string): Uri {
    return new Uri(uri);
  }

  /**
   * Creates a URI from components.
   * @param scheme The scheme.
   * @param domain The domain.
   * @param port The port.
   * @param path The path.
   * @param query The query string.
   * @param fragment The fragment.
   * @returns A new URI instance.
   */
  static create(
    scheme?: string,
    domain?: string,
    port?: number,
    path?: string,
    query?: string,
    fragment?: string
  ): Uri {
    const uri = new Uri();
    if (scheme) uri.setScheme(scheme);
    if (domain) uri.setDomain(domain);
    if (port) uri.setPort(port);
    if (path) uri.setPath(path);
    if (query) uri.setQuery(query);
    if (fragment) uri.setFragment(fragment);
    return uri;
  }
}
