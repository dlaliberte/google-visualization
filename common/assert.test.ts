/**
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

import {
  assert,
  assertArray,
  assertBoolean,
  assertExists,
  assertInstanceof,
  assertIsElement,
  assertNumber,
  assertObject,
  assertString,
  fail,
} from './assert';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
const { document, Element } = window;
global.Element = Element;


describe('assert', () => {
  it('should not throw an error for a true condition', () => {
    expect(() => assert(true)).not.toThrow();
  });

  it('should throw an error for a false condition', () => {
    expect(() => assert(false)).toThrow('Assertion failed');
  });

  it('should throw an error with a custom message', () => {
    expect(() => assert(false, 'Custom error message')).toThrow(
      'Custom error message',
    );
  });
});

describe('assertIsElement', () => {
  it('should not throw an error for an Element', () => {
    const el = document.createElement('div');
    expect(assertIsElement(el)).toStrictEqual(el);
  });

  it('should throw an error for a non-Element', () => {
    expect(() => assertIsElement({})).toThrow('Expected value to be an Element');
  });
});

describe('assertExists', () => {
  it('should not throw an error for a non-null value', () => {
    const value = 'test';
    expect(assertExists(value)).toBe(value);
  });

  it('should throw an error for a null value', () => {
    expect(() => assertExists(null)).toThrow('Expected value to exist');
  });

  it('should throw an error for an undefined value', () => {
    expect(() => assertExists(undefined)).toThrow('Expected value to exist');
  });
});

describe('assertString', () => {
  it('should not throw an error for a string', () => {
    const value = 'test';
    expect(assertString(value)).toBe(value);
  });

  it('should throw an error for a non-string', () => {
    expect(() => assertString(123)).toThrow('Expected value to be a string');
  });
});

describe('assertNumber', () => {
  it('should not throw an error for a number', () => {
    const value = 123;
    expect(assertNumber(value)).toBe(value);
  });

  it('should throw an error for a non-number', () => {
    expect(() => assertNumber('test')).toThrow('Expected value to be a number');
  });
});

describe('assertBoolean', () => {
  it('should not throw an error for a boolean', () => {
    const value = true;
    expect(assertBoolean(value)).toBe(value);
  });

  it('should throw an error for a non-boolean', () => {
    expect(() => assertBoolean(123)).toThrow('Expected value to be a boolean');
  });
});

describe('assertObject', () => {
  it('should not throw an error for an object', () => {
    const value = {};
    expect(assertObject(value)).toBe(value);
  });

  it('should throw an error for a non-object', () => {
    expect(() => assertObject(null)).toThrow('Expected value to be an object');
  });
});

describe('assertArray', () => {
  it('should not throw an error for an array', () => {
    const value: number[] = [];
    expect(assertArray(value)).toBe(value);
  });

  it('should throw an error for a non-array', () => {
    expect(() => assertArray({})).toThrow('Expected value to be an array');
  });
});

describe('assertInstanceof', () => {
  class MyClass {}
  it('should not throw an error for an instance of a class', () => {
    const value = new MyClass();
    expect(assertInstanceof(value, MyClass)).toBe(value);
  });

  it('should throw an error for a non-instance of a class', () => {
    expect(() => assertInstanceof({}, MyClass)).toThrow(
      'Expected value to be an instance of MyClass',
    );
  });
});

describe('fail', () => {
  it('should throw an error', () => {
    expect(() => fail()).toThrow('Assertion failed');
  });

  it('should throw an error with a custom message', () => {
    expect(() => fail('Custom error message')).toThrow('Custom error message');
  });
});
