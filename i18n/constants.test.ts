import { describe, it, expect } from 'vitest';
import {
  SOFT_HYPHEN,
  ELLIPSES,
  HARD_LINE_BREAK,
  SOFT_LINE_BREAK,
  MIDWORD_BREAK,
  CHARACTER_BREAK
} from './constants';

describe('i18n constants', () => {
  describe('character constants', () => {
    it('should export correct soft hyphen character', () => {
      expect(SOFT_HYPHEN).toBe('\u00ad');
      expect(SOFT_HYPHEN.charCodeAt(0)).toBe(0x00ad);
      expect(SOFT_HYPHEN.length).toBe(1);
    });

    it('should export correct ellipses character', () => {
      expect(ELLIPSES).toBe('\u2026');
      expect(ELLIPSES.charCodeAt(0)).toBe(0x2026);
      expect(ELLIPSES.length).toBe(1);
    });

    it('should have different characters for soft hyphen and ellipses', () => {
      expect(SOFT_HYPHEN).not.toBe(ELLIPSES);
      expect(SOFT_HYPHEN.charCodeAt(0)).not.toBe(ELLIPSES.charCodeAt(0));
    });
  });

  describe('character properties', () => {
    it('should have soft hyphen as invisible character', () => {
      // Soft hyphen is an invisible formatting character
      expect(SOFT_HYPHEN).toBe('\u00ad');
      // In most browsers, soft hyphen has zero width unless at line break
      expect(typeof SOFT_HYPHEN).toBe('string');
    });

    it('should have ellipses as visible character', () => {
      expect(ELLIPSES).toBe('…'); // Should display as three dots
      expect(ELLIPSES).toBe('\u2026');
      expect(typeof ELLIPSES).toBe('string');
    });

    it('should be able to use characters in strings', () => {
      const textWithSoftHyphen = `word${SOFT_HYPHEN}wrap`;
      const textWithEllipses = `truncated${ELLIPSES}`;

      expect(textWithSoftHyphen).toContain(SOFT_HYPHEN);
      expect(textWithEllipses).toContain(ELLIPSES);
      expect(textWithEllipses.endsWith(ELLIPSES)).toBe(true);
    });

    it('should preserve character encoding', () => {
      // Verify that the Unicode characters are correctly preserved
      const softHyphenBytes = SOFT_HYPHEN.charCodeAt(0);
      const ellipsesBytes = ELLIPSES.charCodeAt(0);

      expect(softHyphenBytes).toBe(173); // 0x00AD in decimal
      expect(ellipsesBytes).toBe(8230); // 0x2026 in decimal
    });
  });

  describe('break priority constants', () => {
    it('should export correct break priority values', () => {
      expect(HARD_LINE_BREAK).toBe(0);
      expect(SOFT_LINE_BREAK).toBe(1);
      expect(MIDWORD_BREAK).toBe(2);
      expect(CHARACTER_BREAK).toBe(3);
    });

    it('should have priorities in ascending order', () => {
      expect(HARD_LINE_BREAK).toBeLessThan(SOFT_LINE_BREAK);
      expect(SOFT_LINE_BREAK).toBeLessThan(MIDWORD_BREAK);
      expect(MIDWORD_BREAK).toBeLessThan(CHARACTER_BREAK);
    });

    it('should have numeric values for all priorities', () => {
      expect(typeof HARD_LINE_BREAK).toBe('number');
      expect(typeof SOFT_LINE_BREAK).toBe('number');
      expect(typeof MIDWORD_BREAK).toBe('number');
      expect(typeof CHARACTER_BREAK).toBe('number');
    });

    it('should be integers', () => {
      expect(Number.isInteger(HARD_LINE_BREAK)).toBe(true);
      expect(Number.isInteger(SOFT_LINE_BREAK)).toBe(true);
      expect(Number.isInteger(MIDWORD_BREAK)).toBe(true);
      expect(Number.isInteger(CHARACTER_BREAK)).toBe(true);
    });

    it('should be non-negative', () => {
      expect(HARD_LINE_BREAK).toBeGreaterThanOrEqual(0);
      expect(SOFT_LINE_BREAK).toBeGreaterThanOrEqual(0);
      expect(MIDWORD_BREAK).toBeGreaterThanOrEqual(0);
      expect(CHARACTER_BREAK).toBeGreaterThanOrEqual(0);
    });
  });

  describe('priority ordering semantics', () => {
    it('should have hard line break as highest priority (lowest number)', () => {
      expect(HARD_LINE_BREAK).toBe(0);
    });

    it('should have character break as lowest priority (highest number)', () => {
      expect(CHARACTER_BREAK).toBe(3);
    });

    it('should allow priority comparison', () => {
      const priorities = [HARD_LINE_BREAK, SOFT_LINE_BREAK, MIDWORD_BREAK, CHARACTER_BREAK];
      const sorted = [...priorities].sort((a, b) => a - b);

      expect(sorted).toEqual(priorities);
    });

    it('should support priority-based decision making', () => {
      // Simulate line breaking logic
      const breakTypes = [
        { type: 'hard', priority: HARD_LINE_BREAK },
        { type: 'soft', priority: SOFT_LINE_BREAK },
        { type: 'midword', priority: MIDWORD_BREAK },
        { type: 'character', priority: CHARACTER_BREAK }
      ];

      // Find highest priority (lowest number)
      const bestBreak = breakTypes.reduce((best, current) =>
        current.priority < best.priority ? current : best
      );

      expect(bestBreak.type).toBe('hard');
      expect(bestBreak.priority).toBe(HARD_LINE_BREAK);
    });
  });

  describe('practical usage scenarios', () => {
    it('should support text truncation with ellipses', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const maxLength = 20;

      const truncated = longText.length > maxLength
        ? longText.substring(0, maxLength - 1) + ELLIPSES
        : longText;

      expect(truncated).toBe('This is a very long' + ELLIPSES);
      expect(truncated.endsWith(ELLIPSES)).toBe(true);
      expect(truncated.length).toBeLessThanOrEqual(maxLength);
    });

    it('should support soft hyphenation', () => {
      const word = 'internationalization';
      const hyphenatedWord = 'inter' + SOFT_HYPHEN + 'nation' + SOFT_HYPHEN + 'al' + SOFT_HYPHEN + 'ization';

      expect(hyphenatedWord).toContain(SOFT_HYPHEN);
      expect(hyphenatedWord.split(SOFT_HYPHEN)).toEqual(['inter', 'nation', 'al', 'ization']);
    });

    it('should support break priority evaluation', () => {
      const breakOpportunities = [
        { position: 10, priority: CHARACTER_BREAK },
        { position: 15, priority: SOFT_LINE_BREAK },
        { position: 8, priority: HARD_LINE_BREAK },
        { position: 12, priority: MIDWORD_BREAK }
      ];

      // Find best break point (highest priority = lowest number)
      const bestBreak = breakOpportunities.reduce((best, current) =>
        current.priority < best.priority ? current : best
      );

      expect(bestBreak.position).toBe(8);
      expect(bestBreak.priority).toBe(HARD_LINE_BREAK);
    });

    it('should handle mixed content with special characters', () => {
      const mixedText = `Word1${SOFT_HYPHEN}continues and truncated text${ELLIPSES}`;

      expect(mixedText).toContain(SOFT_HYPHEN);
      expect(mixedText).toContain(ELLIPSES);
      expect(mixedText.indexOf(SOFT_HYPHEN)).toBeLessThan(mixedText.indexOf(ELLIPSES));
    });
  });

  describe('immutability and consistency', () => {
    it('should maintain constant values', () => {
      // Constants should not change
      const originalSoftHyphen = SOFT_HYPHEN;
      const originalEllipses = ELLIPSES;
      const originalHardBreak = HARD_LINE_BREAK;

      // Try to modify (should not affect the constants)
      const modifiedSoftHyphen = SOFT_HYPHEN + 'test';
      const modifiedHardBreak = HARD_LINE_BREAK + 1;

      expect(SOFT_HYPHEN).toBe(originalSoftHyphen);
      expect(ELLIPSES).toBe(originalEllipses);
      expect(HARD_LINE_BREAK).toBe(originalHardBreak);
    });

    it('should be stable across multiple imports', () => {
      // Constants should maintain their values throughout the test
      const softHyphenValue1 = SOFT_HYPHEN;
      const ellipsesValue1 = ELLIPSES;
      const hardBreakValue1 = HARD_LINE_BREAK;

      // Values should remain the same when accessed again
      expect(SOFT_HYPHEN).toBe(softHyphenValue1);
      expect(ELLIPSES).toBe(ellipsesValue1);
      expect(HARD_LINE_BREAK).toBe(hardBreakValue1);
    });

    it('should maintain type consistency', () => {
      // Types should be consistent
      expect(typeof SOFT_HYPHEN).toBe('string');
      expect(typeof ELLIPSES).toBe('string');
      expect(typeof HARD_LINE_BREAK).toBe('number');
      expect(typeof SOFT_LINE_BREAK).toBe('number');
      expect(typeof MIDWORD_BREAK).toBe('number');
      expect(typeof CHARACTER_BREAK).toBe('number');
    });
  });

  describe('Unicode compliance', () => {
    it('should use standard Unicode code points', () => {
      // Verify standard Unicode assignments
      expect(SOFT_HYPHEN.codePointAt(0)).toBe(0x00AD); // Unicode: SOFT HYPHEN
      expect(ELLIPSES.codePointAt(0)).toBe(0x2026); // Unicode: HORIZONTAL ELLIPSIS
    });

    it('should be compatible with Unicode operations', () => {
      // Test Unicode normalization compatibility
      expect(SOFT_HYPHEN.normalize('NFC')).toBe(SOFT_HYPHEN);
      expect(ELLIPSES.normalize('NFC')).toBe(ELLIPSES);

      // Test Unicode property access
      expect(SOFT_HYPHEN.length).toBe(1);
      expect(ELLIPSES.length).toBe(1);
    });

    it('should work with regular expressions', () => {
      const textWithSpecialChars = `word${SOFT_HYPHEN}break${ELLIPSES}end`;

      // Should be able to match with regex
      const softHyphenRegex = new RegExp(SOFT_HYPHEN, 'g');
      const ellipsesRegex = new RegExp(`\\${ELLIPSES}`, 'g'); // Escape for regex

      expect(softHyphenRegex.test(textWithSpecialChars)).toBe(true);
      expect(textWithSpecialChars.match(softHyphenRegex)).toHaveLength(1);
    });
  });

  describe('integration with text processing', () => {
    it('should work with string manipulation methods', () => {
      const text = `start${SOFT_HYPHEN}middle${ELLIPSES}end`;

      expect(text.includes(SOFT_HYPHEN)).toBe(true);
      expect(text.includes(ELLIPSES)).toBe(true);
      expect(text.split(SOFT_HYPHEN)).toHaveLength(2);
      expect(text.indexOf(ELLIPSES)).toBeGreaterThan(text.indexOf(SOFT_HYPHEN));
    });

    it('should support text measurement and layout', () => {
      // Simulate text width calculation
      const measureText = (text: string) => {
        // Mock measurement - soft hyphens are invisible, ellipses have width
        return text
          .replace(new RegExp(SOFT_HYPHEN, 'g'), '') // Remove soft hyphens
          .length; // Simplified width calculation
      };

      const textWithSoftHyphen = `word${SOFT_HYPHEN}break`;
      const textWithEllipses = `text${ELLIPSES}`;

      expect(measureText(textWithSoftHyphen)).toBe(9); // 'wordbreak'.length
      expect(measureText(textWithEllipses)).toBe(5); // 'text…'.length
    });

    it('should support line breaking algorithms', () => {
      const text = 'This is a test text for line breaking';
      const breakOpportunities = [];

      // Find spaces (soft line breaks)
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          breakOpportunities.push({
            position: i,
            priority: SOFT_LINE_BREAK,
            type: 'space'
          });
        }
      }

      // All found breaks should have soft line break priority
      breakOpportunities.forEach(opportunity => {
        expect(opportunity.priority).toBe(SOFT_LINE_BREAK);
      });

      expect(breakOpportunities.length).toBeGreaterThan(0);
    });
  });
});
