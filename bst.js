class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array = []) {
    this.array = array.sort((a, b) => a - b);
    this.array = [...new Set(array)];
    this.root = this.buildTree(this.array);
  }

  buildTree(array = this.array, start = 0, end = this.array.length) {
    if (start >= end) return null;
    const mid = start + Math.floor((end - start) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  _searchHelper(root, data, findInsertionPoint = false) {
    if (root === null) return null;

    let current = root;
    let parent = null;
    while (current !== null) {
      if (data === current.data) {
        return findInsertionPoint
          ? { parent, direction: null, exists: true }
          : current;
      }

      parent = current;
      if (data < current.data) {
        current = current.left;
        if (findInsertionPoint && current === null) {
          return { parent, direction: "left", exists: false };
        }
      } else {
        current = current.right;
        if (findInsertionPoint && current === null) {
          return { parent, direction: "right", exists: false };
        }
      }
    }

    if (findInsertionPoint) {
      return { parent: null, direction: null, exists: false };
    }
    return null;
  }

  insert(value) {
    const newNode = new Node(value);
    const searchResult = this._searchHelper(this.root, value, true);

    if (searchResult.exists) return false;

    if (searchResult.parent === null) {
      this.root = newNode;
    } else if (searchResult.direction === "left") {
      searchResult.parent.left = newNode;
    } else if (searchResult.direction === "right") {
      searchResult.parent.right = newNode;
    }
    return true;
  }

  _deleteSearchHelper(root, value) {
    if (root === null) {
      throw new Error("Cannot delete from an empty tree");
    }
    
    let current = root;
    let parent = null;
    
    while (current !== null) {
      if (value === current.data) {
        return { node: current, parent };
      }
      
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    throw new Error(`Value ${value} not found in tree`);
  }

  deleteItem(value) {
    try {
      const { node, parent } = this._deleteSearchHelper(this.root, value);
      
      // Case 1: Leaf node (no children)
      if (node.left === null && node.right === null) {
        if (parent === null) {
          // Deleting the root
          this.root = null;
        } else if (parent.left === node) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
      // Case 2: Node with one child
      else if (node.left === null || node.right === null) {
        const child = node.left !== null ? node.left : node.right;
        
        if (parent === null) {
          // Deleting the root, replace with child
          this.root = child;
        } else if (parent.left === node) {
          parent.left = child;
        } else {
          parent.right = child;
        }
      }
      // Case 3: Node with two children
      else {
        const { successor, successorParent } = this._findInOrderSuccessor(node);
        const successorData = successor.data;
        
        // Remove the successor from its original position
        if (successorParent === null) {
          // Successor is the immediate right child of node
          node.right = successor.right;
        } else {
          successorParent.left = successor.right;
        }
        
        // Replace node's data with successor's data
        node.data = successorData;
      }
      
      return true;
    } catch (error) {
      console.error("Delete failed:", error.message);
      return false;
    }
  }

  _findInOrderSuccessor(node) {
    if (node === null) {
      throw new Error("Cannot find successor of null node");
    }
    
    if (node.right === null) {
      throw new Error("Node has no right child, cannot find in-order successor");
    }
    
    let current = node.right;
    let parent = null;
    
    // Traverse to the leftmost node in the right subtree
    while (current.left !== null) {
      parent = current;
      current = current.left;
    }
    
    return { successor: current, parent };
  }

  search(value) {
    return this._searchHelper(this.root, value);
  }
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testTree = new Tree(testArray);

console.log("Original tree:");
testTree.prettyPrint(testTree.root);

console.log("\nInserting 10:");
console.log("Insert successful:", testTree.insert(10));

console.log("\nInserting duplicate 10:");
console.log("Insert successful:", testTree.insert(10));

console.log("\nInserting 2:");
console.log("Insert successful:", testTree.insert(2));

console.log("\n=== DELETE TESTS ===");

console.log("\nDeleting leaf node 1:");
console.log("Delete successful:", testTree.deleteItem(1));
testTree.prettyPrint(testTree.root);

console.log("\nDeleting node with one child (324):");
console.log("Delete successful:", testTree.deleteItem(324));
testTree.prettyPrint(testTree.root);

console.log("\nDeleting node with two children (23):");
console.log("Delete successful:", testTree.deleteItem(23));
testTree.prettyPrint(testTree.root);

console.log("\n=== COMPREHENSIVE DELETE TESTING ===");

console.log("\n1. Deleting non-existent value (should fail):");
console.log("Delete successful:", testTree.deleteItem(999));

console.log("\n2. Deleting leaf node (2):");
console.log("Delete successful:", testTree.deleteItem(2));

console.log("\n3. Deleting node with one child (6345):");
console.log("Delete successful:", testTree.deleteItem(6345));

console.log("\n4. Checking current tree state:");
console.log("Root is now:", testTree.root.data);
console.log("Root's children:", 
  testTree.root.left ? testTree.root.left.data : "null",
  testTree.root.right ? testTree.root.right.data : "null"
);

console.log("\nDeleting node with two children (8):");
console.log("Delete successful:", testTree.deleteItem(8));

console.log("\n5. Final tree structure:");
testTree.prettyPrint(testTree.root);
