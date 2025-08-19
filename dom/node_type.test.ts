/**
 * Tests for node_type.ts
 */

import { describe, it, expect } from 'vitest';
import { NodeType } from './node_type';

describe('NodeType', () => {
  it('should match DOM Node.nodeType constants', () => {
    expect(NodeType.ELEMENT).toBe(Node.ELEMENT_NODE);
    expect(NodeType.ATTRIBUTE).toBe(Node.ATTRIBUTE_NODE);
    expect(NodeType.TEXT).toBe(Node.TEXT_NODE);
    expect(NodeType.CDATA_SECTION).toBe(Node.CDATA_SECTION_NODE);
    expect(NodeType.ENTITY_REFERENCE).toBe(Node.ENTITY_REFERENCE_NODE);
    expect(NodeType.ENTITY).toBe(Node.ENTITY_NODE);
    expect(NodeType.PROCESSING_INSTRUCTION).toBe(Node.PROCESSING_INSTRUCTION_NODE);
    expect(NodeType.COMMENT).toBe(Node.COMMENT_NODE);
    expect(NodeType.DOCUMENT).toBe(Node.DOCUMENT_NODE);
    expect(NodeType.DOCUMENT_TYPE).toBe(Node.DOCUMENT_TYPE_NODE);
    expect(NodeType.DOCUMENT_FRAGMENT).toBe(Node.DOCUMENT_FRAGMENT_NODE);
    expect(NodeType.NOTATION).toBe(Node.NOTATION_NODE);
  });

  it('should have the correct values', () => {
    expect(NodeType.ELEMENT).toBe(1);
    expect(NodeType.ATTRIBUTE).toBe(2);
    expect(NodeType.TEXT).toBe(3);
    expect(NodeType.CDATA_SECTION).toBe(4);
    expect(NodeType.ENTITY_REFERENCE).toBe(5);
    expect(NodeType.ENTITY).toBe(6);
    expect(NodeType.PROCESSING_INSTRUCTION).toBe(7);
    expect(NodeType.COMMENT).toBe(8);
    expect(NodeType.DOCUMENT).toBe(9);
    expect(NodeType.DOCUMENT_TYPE).toBe(10);
    expect(NodeType.DOCUMENT_FRAGMENT).toBe(11);
    expect(NodeType.NOTATION).toBe(12);
  });

  it('should be usable for type checking', () => {
    const element = document.createElement('div');
    const textNode = document.createTextNode('text');
    const commentNode = document.createComment('comment');

    expect(element.nodeType).toBe(NodeType.ELEMENT);
    expect(textNode.nodeType).toBe(NodeType.TEXT);
    expect(commentNode.nodeType).toBe(NodeType.COMMENT);
    expect(document.nodeType).toBe(NodeType.DOCUMENT);
  });
});
