/**
 * Tests for dom_assert.ts
 */

import { describe, it, expect } from 'vitest';
import {
  assertIsElement,
  assertIsHtmlElement,
  assertIsTextNode,
  assertIsDocument,
  assertIsWindow
} from './dom_assert';

describe('dom_assert', () => {
  describe('assertIsElement', () => {
    it('should pass for an Element', () => {
      const element = document.createElement('div');
      expect(() => assertIsElement(element)).not.toThrow();
      expect(assertIsElement(element)).toBe(element);
    });

    it('should throw for non-Element values', () => {
      expect(() => assertIsElement(null)).toThrow();
      expect(() => assertIsElement(undefined)).toThrow();
      expect(() => assertIsElement({})).toThrow();
      expect(() => assertIsElement('string')).toThrow();
      expect(() => assertIsElement(123)).toThrow();
      expect(() => assertIsElement(document.createTextNode('text'))).toThrow();
    });

    it('should include custom message in error', () => {
      const customMessage = 'Custom error message';
      try {
        assertIsElement(null, customMessage);
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        expect((error as Error).message).toContain(customMessage);
      }
    });
  });

  describe('assertIsHtmlElement', () => {
    it('should pass for an HTMLElement', () => {
      const element = document.createElement('div');
      expect(() => assertIsHtmlElement(element)).not.toThrow();
      expect(assertIsHtmlElement(element)).toBe(element);
    });

    it('should throw for non-HTMLElement values', () => {
      expect(() => assertIsHtmlElement(null)).toThrow();
      expect(() => assertIsHtmlElement(undefined)).toThrow();
      expect(() => assertIsHtmlElement({})).toThrow();
      expect(() => assertIsHtmlElement('string')).toThrow();
      expect(() => assertIsHtmlElement(123)).toThrow();
      expect(() => assertIsHtmlElement(document.createTextNode('text'))).toThrow();
    });
  });

  describe('assertIsTextNode', () => {
    it('should pass for a Text node', () => {
      const textNode = document.createTextNode('text');
      expect(() => assertIsTextNode(textNode)).not.toThrow();
      expect(assertIsTextNode(textNode)).toBe(textNode);
    });

    it('should throw for non-Text node values', () => {
      expect(() => assertIsTextNode(null)).toThrow();
      expect(() => assertIsTextNode(undefined)).toThrow();
      expect(() => assertIsTextNode({})).toThrow();
      expect(() => assertIsTextNode('string')).toThrow();
      expect(() => assertIsTextNode(123)).toThrow();
      expect(() => assertIsTextNode(document.createElement('div'))).toThrow();
    });
  });

  describe('assertIsDocument', () => {
    it('should pass for a Document', () => {
      expect(() => assertIsDocument(document)).not.toThrow();
      expect(assertIsDocument(document)).toBe(document);
    });

    it('should throw for non-Document values', () => {
      expect(() => assertIsDocument(null)).toThrow();
      expect(() => assertIsDocument(undefined)).toThrow();
      expect(() => assertIsDocument({})).toThrow();
      expect(() => assertIsDocument('string')).toThrow();
      expect(() => assertIsDocument(123)).toThrow();
      expect(() => assertIsDocument(document.createElement('div'))).toThrow();
    });
  });

  describe('assertIsWindow', () => {
    it('should pass for a Window', () => {
      expect(() => assertIsWindow(window)).not.toThrow();
      expect(assertIsWindow(window)).toBe(window);
    });

    it('should throw for non-Window values', () => {
      expect(() => assertIsWindow(null)).toThrow();
      expect(() => assertIsWindow(undefined)).toThrow();
      expect(() => assertIsWindow({})).toThrow();
      expect(() => assertIsWindow('string')).toThrow();
      expect(() => assertIsWindow(123)).toThrow();
      expect(() => assertIsWindow(document.createElement('div'))).toThrow();
    });
  });
});
