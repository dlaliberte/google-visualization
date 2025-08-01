/**
 * Vitest setup file to mock Google Closure Library and other global dependencies
 */

// Mock Google Closure Library (goog)
(globalThis as any).goog = {
  typeOf: (value: any) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'object'; // Closure treats Date as object
    return typeof value;
  },

  isObject: (value: any) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },

  getObjectByName: (name: string, opt_obj?: any) => {
    // Mock implementation for getting objects by name
    const obj = opt_obj || globalThis;
    const parts = name.split('.');
    let current = obj;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return null;
      }
    }

    return current;
  },

  exportSymbol: (name: string, value: any, opt_obj?: any) => {
    // Mock implementation for exporting symbols
    const obj = opt_obj || globalThis;
    const parts = name.split('.');
    let current = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in current) || typeof current[part] !== 'object') {
        current[part] = {};
      }
      current = current[part];
    }

    current[parts[parts.length - 1]] = value;
  },

  global: globalThis,
};

// Mock google namespace for tests
(globalThis as any).google = {
  visualization: {
    ModulePath: null,
    Version: null,
    Locale: null,
  },
  loader: {
    GoogleApisBase: null,
  },
  accounts: {
    user: {
      login: () => false,
      logout: () => false,
      checkLogin: () => false,
    },
  },
  charts: {
    loader: {
      makeCssUrl: () => '',
    },
  },
};

// Mock WebFont global
(globalThis as any).WebFont = {
  load: () => {},
};

// Mock assert function
(globalThis as any).assert = (condition: any, message?: string) => {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
};
