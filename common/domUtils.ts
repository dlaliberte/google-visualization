// Utility functions for DOM manipulation

/**
 * Checks if a given node is an Element.
 * @param node The node to check.
 * @returns True if the node is an Element, false otherwise.
 */
export function isElement(node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
}
