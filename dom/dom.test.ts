/**
 * @license
 * Copyright 2023 Google LLC
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

import {describe, it, expect, vi} from 'vitest';
import {getDomHelper, getDocument, getGlobal, getWindow, getLocation, validateContainer} from './dom';
import {DomHelper} from '../common/closure-dom';

describe('dom', () => {
  describe('getDomHelper', () => {
    it('should return a DomHelper instance', () => {
      expect(getDomHelper()).toBeInstanceOf(DomHelper);
    });

    it('should return the same DomHelper instance on subsequent calls', () => {
      const domHelper1 = getDomHelper();
      const domHelper2 = getDomHelper();
      expect(domHelper1).toBe(domHelper2);
    });
  });

  describe('getDocument', () => {
    it('should return the document object', () => {
      const mockDocument = {};
      vi.spyOn(DomHelper.prototype, 'getDocument').mockReturnValue(mockDocument as Document);
      expect(getDocument()).toBe(mockDocument);
    });
  });

  describe('getGlobal', () => {
    it('should return the global context (window)', () => {
      const mockWindow = {};
      vi.spyOn(DomHelper.prototype, 'getWindow').mockReturnValue(mockWindow as Window);
      expect(getGlobal()).toBe(mockWindow);
    });
  });

  describe('getWindow', () => {
    it('should return the window object', () => {
      const mockWindow = {};
      vi.spyOn(DomHelper.prototype, 'getWindow').mockReturnValue(mockWindow as Window);
      expect(getWindow()).toBe(mockWindow);
    });
  });

  describe('getLocation', () => {
    it('should return the current location href', () => {
      const mockLocationHref = 'http://localhost/test';
      vi.spyOn(DomHelper.prototype, 'getDocument').mockReturnValue({
        location: {href: mockLocationHref}
      } as Document);
      expect(getLocation()).toBe(mockLocationHref);
    });
  });

  describe('validateContainer', () => {
    it('should return the container if it is a valid element', () => {
      const mockElement = document.createElement('div');
      vi.spyOn(DomHelper.prototype, 'isNodeLike').mockReturnValue(true);
      expect(validateContainer(mockElement)).toBe(mockElement);
    });

    it('should throw an error if the container is null', () => {
      vi.spyOn(DomHelper.prototype, 'isNodeLike').mockReturnValue(false);
      expect(() => validateContainer(null)).toThrow('Container is not defined');
    });

    it('should throw an error if the container is not a node-like object', () => {
      const invalidContainer = {};
      vi.spyOn(DomHelper.prototype, 'isNodeLike').mockReturnValue(false);
      expect(() => validateContainer(invalidContainer as Element)).toThrow('Container is not defined');
    });
  });
});
