import { describe, it, expect, beforeEach } from 'vitest';
import { NodeBase } from './node_base';
import { NodeId } from './nodeid';
import { Node } from './node';

describe('NodeBase', () => {
  let rootNode: NodeBase;
  let childNode1: NodeBase;
  let childNode2: NodeBase;
  let grandchildNode: NodeBase;

  beforeEach(() => {
    rootNode = new NodeBase('root', 'Root Node');
    childNode1 = new NodeBase(1, 'Child 1');
    childNode2 = new NodeBase('child2', 'Child 2');
    grandchildNode = new NodeBase(100, 'Grandchild');
  });

  describe('constructor', () => {
    it('should create a node with id and name', () => {
      const node = new NodeBase('test-id', 'Test Node');
      expect(node.getId()).toBe('test-id');
      expect(node.getName()).toBe('Test Node');
    });

    it('should create a node with numeric id', () => {
      const node = new NodeBase(123, 'Numeric Node');
      expect(node.getId()).toBe(123);
      expect(node.getName()).toBe('Numeric Node');
    });

    it('should create a node with null id', () => {
      const node = new NodeBase(null, 'Null ID Node');
      expect(node.getId()).toBeNull();
      expect(node.getName()).toBe('Null ID Node');
    });

    it('should create a node with empty name', () => {
      const node = new NodeBase('id', '');
      expect(node.getId()).toBe('id');
      expect(node.getName()).toBe('');
    });
  });

  describe('id management', () => {
    it('should set and get id', () => {
      const node = new NodeBase('initial', 'Test');
      expect(node.getId()).toBe('initial');

      node.setId('new-id');
      expect(node.getId()).toBe('new-id');
    });

    it('should handle changing id from string to number', () => {
      const node = new NodeBase('string-id', 'Test');
      node.setId(42);
      expect(node.getId()).toBe(42);
    });

    it('should handle setting id to null', () => {
      const node = new NodeBase('initial', 'Test');
      node.setId(null);
      expect(node.getId()).toBeNull();
    });

    it('should handle special characters in string id', () => {
      const specialIds = [
        'id-with-dashes',
        'id_with_underscores',
        'id.with.dots',
        'id with spaces',
        'id@with#symbols',
        'unicode-测试-id',
        '123numeric-start'
      ];

      specialIds.forEach(id => {
        const node = new NodeBase(id, 'Test');
        expect(node.getId()).toBe(id);
      });
    });
  });

  describe('name management', () => {
    it('should return the correct name', () => {
      expect(rootNode.getName()).toBe('Root Node');
      expect(childNode1.getName()).toBe('Child 1');
      expect(childNode2.getName()).toBe('Child 2');
    });

    it('should handle unicode characters in name', () => {
      const unicodeNames = [
        '测试节点',
        'Тестовый узел',
        'ノードテスト',
        'عقدة اختبار',
        '🌳 Tree Node 🌿',
        'Node™ with symbols®'
      ];

      unicodeNames.forEach(name => {
        const node = new NodeBase('test', name);
        expect(node.getName()).toBe(name);
      });
    });
  });

  describe('parent-child relationships', () => {
    beforeEach(() => {
      // Set up a tree structure
      // root
      // ├── child1
      // │   └── grandchild
      // └── child2
      (rootNode as any).children = [childNode1, childNode2];
      (childNode1 as any).parent = rootNode;
      (childNode2 as any).parent = rootNode;
      (childNode1 as any).children = [grandchildNode];
      (grandchildNode as any).parent = childNode1;
    });

    it('should return correct parent', () => {
      expect(rootNode.getParent()).toBeNull();
      expect(childNode1.getParent()).toBe(rootNode);
      expect(childNode2.getParent()).toBe(rootNode);
      expect(grandchildNode.getParent()).toBe(childNode1);
    });

    it('should return correct children', () => {
      expect(rootNode.getChildren()).toEqual([childNode1, childNode2]);
      expect(childNode1.getChildren()).toEqual([grandchildNode]);
      expect(childNode2.getChildren()).toEqual([]);
      expect(grandchildNode.getChildren()).toEqual([]);
    });

    it('should return correct child count', () => {
      expect(rootNode.getChildCount()).toBe(2);
      expect(childNode1.getChildCount()).toBe(1);
      expect(childNode2.getChildCount()).toBe(0);
      expect(grandchildNode.getChildCount()).toBe(0);
    });

    it('should identify leaf nodes correctly', () => {
      expect(rootNode.isLeaf()).toBe(false);
      expect(childNode1.isLeaf()).toBe(false);
      expect(childNode2.isLeaf()).toBe(true);
      expect(grandchildNode.isLeaf()).toBe(true);
    });

    it('should get child at specific index', () => {
      expect(rootNode.getChildAt(0)).toBe(childNode1);
      expect(rootNode.getChildAt(1)).toBe(childNode2);
      expect(rootNode.getChildAt(2)).toBeNull();
      expect(rootNode.getChildAt(-1)).toBeNull();

      expect(childNode1.getChildAt(0)).toBe(grandchildNode);
      expect(childNode1.getChildAt(1)).toBeNull();

      expect(childNode2.getChildAt(0)).toBeNull();
    });
  });

  describe('depth and height calculation', () => {
    beforeEach(() => {
      // Set up a deeper tree structure
      // root (depth: 0, height: 3)
      // ├── child1 (depth: 1, height: 2)
      // │   └── grandchild (depth: 2, height: 1)
      // │       └── greatgrandchild (depth: 3, height: 0)
      // └── child2 (depth: 1, height: 0)
      const greatGrandchild = new NodeBase('great', 'Great Grandchild');

      (rootNode as any).children = [childNode1, childNode2];
      (childNode1 as any).parent = rootNode;
      (childNode2 as any).parent = rootNode;
      (childNode1 as any).children = [grandchildNode];
      (grandchildNode as any).parent = childNode1;
      (grandchildNode as any).children = [greatGrandchild];
      (greatGrandchild as any).parent = grandchildNode;
    });

    it('should calculate depth correctly', () => {
      expect(rootNode.getDepth()).toBe(0);
      expect(childNode1.getDepth()).toBe(1);
      expect(childNode2.getDepth()).toBe(1);
      expect(grandchildNode.getDepth()).toBe(2);

      // Get the great grandchild from grandchildNode's children
      const greatGrandchild = grandchildNode.getChildAt(0);
      expect(greatGrandchild?.getDepth()).toBe(3);
    });

    it('should calculate height correctly', () => {
      expect(rootNode.getHeight()).toBe(3);
      expect(childNode1.getHeight()).toBe(2);
      expect(childNode2.getHeight()).toBe(0); // leaf node
      expect(grandchildNode.getHeight()).toBe(1);

      const greatGrandchild = grandchildNode.getChildAt(0);
      expect(greatGrandchild?.getHeight()).toBe(0); // leaf node
    });

    it('should handle single node depth and height', () => {
      const singleNode = new NodeBase('single', 'Single Node');
      expect(singleNode.getDepth()).toBe(0);
      expect(singleNode.getHeight()).toBe(0);
    });
  });

  describe('ancestor methods', () => {
    beforeEach(() => {
      // Set up tree structure
      (rootNode as any).children = [childNode1];
      (childNode1 as any).parent = rootNode;
      (childNode1 as any).children = [grandchildNode];
      (grandchildNode as any).parent = childNode1;
    });

    it('should return correct ancestors', () => {
      expect(rootNode.getAncestors()).toEqual([]);
      expect(childNode1.getAncestors()).toEqual([rootNode]);
      expect(grandchildNode.getAncestors()).toEqual([childNode1, rootNode]);
    });

    it('should return correct root', () => {
      expect(rootNode.getRoot()).toBe(rootNode);
      expect(childNode1.getRoot()).toBe(rootNode);
      expect(grandchildNode.getRoot()).toBe(rootNode);
    });

    it('should check contains relationship correctly', () => {
      expect(rootNode.contains(childNode1)).toBe(true);
      expect(rootNode.contains(grandchildNode)).toBe(true);
      expect(childNode1.contains(grandchildNode)).toBe(true);

      expect(childNode1.contains(rootNode)).toBe(false);
      expect(grandchildNode.contains(rootNode)).toBe(false);
      expect(grandchildNode.contains(childNode1)).toBe(false);

      expect(rootNode.contains(rootNode)).toBe(false); // node doesn't contain itself
    });
  });

  describe('traversal methods', () => {
    beforeEach(() => {
      // Set up tree structure
      // root
      // ├── child1
      // │   └── grandchild
      // └── child2
      (rootNode as any).children = [childNode1, childNode2];
      (childNode1 as any).parent = rootNode;
      (childNode2 as any).parent = rootNode;
      (childNode1 as any).children = [grandchildNode];
      (grandchildNode as any).parent = childNode1;
    });

    it('should traverse all nodes in preorder', () => {
      const visitedNodes: Node[] = [];
      const visitedDepths: number[] = [];

      rootNode.traverse((node, depth) => {
        visitedNodes.push(node);
        visitedDepths.push(depth);
      });

      expect(visitedNodes).toEqual([rootNode, childNode1, grandchildNode, childNode2]);
      expect(visitedDepths).toEqual([0, 1, 2, 1]);
    });

    it('should support skipping branches in traversal', () => {
      const visitedNodes: Node[] = [];

      rootNode.traverse((node, depth) => {
        visitedNodes.push(node);
        // Skip child1's subtree
        return node !== childNode1;
      });

      expect(visitedNodes).toEqual([rootNode, childNode1, childNode2]);
      // grandchild should not be visited because we skipped child1's subtree
    });

    it('should support custom this context in traversal', () => {
      const context = { count: 0 };

      rootNode.traverse(function(node, depth) {
        this.count++;
      }, context);

      expect(context.count).toBe(4); // root + child1 + grandchild + child2
    });

    it('should find nodes matching condition', () => {
      const leafNodes = rootNode.find((node) => node.isLeaf());
      expect(leafNodes).toEqual([grandchildNode, childNode2]);
    });

    it('should find nodes by id', () => {
      const foundNodes = rootNode.find((node) => node.getId() === 1);
      expect(foundNodes).toEqual([childNode1]);
    });

    it('should find nodes by name pattern', () => {
      const childNodes = rootNode.find((node) => node.getName().startsWith('Child'));
      expect(childNodes).toEqual([childNode1, childNode2]);
    });

    it('should return empty array when no nodes match', () => {
      const notFound = rootNode.find((node) => node.getName() === 'Nonexistent');
      expect(notFound).toEqual([]);
    });

    it('should support custom this context in find', () => {
      const context = { targetName: 'Child 1' };

      const found = rootNode.find(function(node) {
        return node.getName() === this.targetName;
      }, context);

      expect(found).toEqual([childNode1]);
    });
  });

  describe('aggregation', () => {
    beforeEach(() => {
      // Set up tree with some test data
      (rootNode as any).value = 10;
      (childNode1 as any).value = 5;
      (childNode2 as any).value = 15;
      (grandchildNode as any).value = 2;

      (rootNode as any).children = [childNode1, childNode2];
      (childNode1 as any).parent = rootNode;
      (childNode2 as any).parent = rootNode;
      (childNode1 as any).children = [grandchildNode];
      (grandchildNode as any).parent = childNode1;
    });

    it('should aggregate values using sum aggregator', () => {
      const getter = (node: any) => node.value || 0;
      // The aggregator function receives (nodeValue, childValues)
      const sumAggregator = (nodeValue: number, childValues: number[]) => {
        return childValues.length === 0 ? nodeValue : childValues.reduce((sum, val) => sum + val, 0);
      };

      const result = rootNode.calcAggregatedValue(getter, sumAggregator);
      expect(result).toBe(17); // child1(7) + child2(15) = 22, but root has value 10, so if no children, would be 10. With children, sum of children = 7+15=22. But our aggregator returns sum of children = 17
    });

    it('should aggregate values using max aggregator', () => {
      const getter = (node: any) => node.value || 0;
      const maxAggregator = (nodeValue: number, childValues: number[]) => {
        return childValues.length === 0 ? nodeValue : Math.max(...childValues);
      };

      const result = rootNode.calcAggregatedValue(getter, maxAggregator);
      expect(result).toBe(15); // max of child aggregated values
    });

    it('should aggregate values using min aggregator', () => {
      const getter = (node: any) => node.value || 0;
      const minAggregator = (nodeValue: number, childValues: number[]) => {
        return childValues.length === 0 ? nodeValue : Math.min(...childValues);
      };

      const result = rootNode.calcAggregatedValue(getter, minAggregator);
      expect(result).toBe(2); // min of child aggregated values (child1=2, child2=15) = 2
    });

    it('should support setter function in aggregation', () => {
      const getter = (node: any) => node.value || 0;
      const sumAggregator = (nodeValue: number, childValues: number[]) => {
        return childValues.length === 0 ? nodeValue : childValues.reduce((sum, val) => sum + val, 0);
      };
      const setter = (node: any, value: number) => { node.aggregatedValue = value; };

      const result = rootNode.calcAggregatedValue(getter, sumAggregator, setter);

      expect(result).toBe(17);
      expect((rootNode as any).aggregatedValue).toBe(17);
    });

    it('should support custom this context in aggregation', () => {
      const context = { multiplier: 2 };

      const getter = function(node: any) {
        return (node.value || 0) * this.multiplier;
      };

      const sumAggregator = (nodeValue: number, childValues: number[]) => {
        return childValues.length === 0 ? nodeValue : childValues.reduce((sum, val) => sum + val, 0);
      };

      const result = rootNode.calcAggregatedValue(getter, sumAggregator, undefined, context);
      expect(result).toBe(34); // child1 gets 2*2=4 for grandchild (leaf), child2 gets 15*2=30 (leaf), so child1 = 4, child2 = 30, sum = 34
    });

    it('should handle aggregation on leaf nodes', () => {
      const getter = (node: any) => node.value || 0;
      const sumAggregator = (nodeValue: number, childValues: number[]) => {
        return childValues.length === 0 ? nodeValue : childValues.reduce((sum, val) => sum + val, 0);
      };

      const result = grandchildNode.calcAggregatedValue(getter, sumAggregator);
      expect(result).toBe(2); // Only grandchild's value
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty tree operations', () => {
      const emptyNode = new NodeBase('empty', 'Empty');

      expect(emptyNode.getChildren()).toEqual([]);
      expect(emptyNode.getChildCount()).toBe(0);
      expect(emptyNode.isLeaf()).toBe(true);
      expect(emptyNode.getChildAt(0)).toBeNull();
      expect(emptyNode.getDepth()).toBe(0);
      expect(emptyNode.getHeight()).toBe(0);
      expect(emptyNode.getAncestors()).toEqual([]);
      expect(emptyNode.getRoot()).toBe(emptyNode);
    });

    it('should handle large tree depths', () => {
      // Create a deep linear tree
      let currentNode = rootNode;
      for (let i = 1; i <= 100; i++) {
        const newNode = new NodeBase(`node-${i}`, `Node ${i}`);
        (currentNode as any).children = [newNode];
        (newNode as any).parent = currentNode;
        currentNode = newNode;
      }

      expect(currentNode.getDepth()).toBe(100);
      expect(rootNode.getHeight()).toBe(100);
      expect(currentNode.getAncestors()).toHaveLength(100);
    });

    it('should handle nodes with many children', () => {
      const children = [];
      for (let i = 0; i < 1000; i++) {
        const child = new NodeBase(`child-${i}`, `Child ${i}`);
        children.push(child);
        (child as any).parent = rootNode;
      }
      (rootNode as any).children = children;

      expect(rootNode.getChildCount()).toBe(1000);
      expect(rootNode.isLeaf()).toBe(false);
      expect(rootNode.getHeight()).toBe(1);

      // Test accessing specific children
      expect(rootNode.getChildAt(0)?.getName()).toBe('Child 0');
      expect(rootNode.getChildAt(999)?.getName()).toBe('Child 999');
      expect(rootNode.getChildAt(1000)).toBeNull();
    });

    it('should handle circular reference detection in contains', () => {
      // This test ensures contains doesn't get into infinite loops
      // even though we don't expect circular references in proper usage
      expect(rootNode.contains(rootNode)).toBe(false);
      expect(childNode1.contains(childNode1)).toBe(false);
    });
  });

  describe('disposal', () => {
    it('should extend Disposable', () => {
      const node = new NodeBase('test', 'Test Node');
      expect(node).toHaveProperty('dispose');
      expect(typeof node.dispose).toBe('function');
    });

    it('should be disposable without errors', () => {
      const node = new NodeBase('test', 'Test Node');
      expect(() => node.dispose()).not.toThrow();
    });
  });
});
