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

    if (this.root === null) {
      this.root = newNode;
      return true;
    }

    const searchResult = this._searchHelper(this.root, value, true);

    if (searchResult.exists) {
      return false;
    }

    if (searchResult.parent === null) {
      this.root = newNode;
    } else if (searchResult.direction === "left") {
      searchResult.parent.left = newNode;
    } else if (searchResult.direction === "right") {
      searchResult.parent.right = newNode;
    }

    return true;
  }

  delete(value) {
    const searchResult = this._searchHelper(this.root, value);

    if (searchResult === null) {
      return false;
    }

    const nodeToDelete = searchResult.parent;
    console.log(searchResult.parent);

    if (nodeToDelete.left === null && nodeToDelete.right === null) {
      if (searchResult.parent === null) {
        this.root = null;
      } else if (searchResult.parent.left === nodeToDelete) {
        searchResult.parent.left = null;
      } else {
        searchResult.parent.right = null;
      }
    } else if (nodeToDelete.left === null || nodeToDelete.right === null) {
      const child = nodeToDelete.left || nodeToDelete.right;
      if (searchResult.parent === null) {
        this.root = child;
      } else if (searchResult.parent.left === nodeToDelete) {
        searchResult.parent.left = child;
      } else {
        searchResult.parent.right = child;
      }
    } else {
      const inOrderSuccessor = this._findInOrderSuccessor(nodeToDelete.right);
      const inOrderSuccessorParent = this._searchHelper(
        this.root,
        inOrderSuccessor.data,
      );

      nodeToDelete.data = inOrderSuccessor.data;

      if (inOrderSuccessorParent.left === inOrderSuccessor) {
        inOrderSuccessorParent.left = inOrderSuccessor.right;
      } else {
        inOrderSuccessorParent.right = inOrderSuccessor.right;
      }
    }

    return true;
  }

  _findInOrderSuccessor(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
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
testTree.prettyPrint(testTree.root);

console.log("\nInserting duplicate 10:");
console.log("Insert successful:", testTree.insert(10));

console.log("\nInserting 2:");
console.log("Insert successful:", testTree.insert(2));

console.log("\nTesting searchHelper for existing value 8:");
const searchResult = testTree._searchHelper(testTree.root, 8);
console.log("Found:", searchResult ? searchResult.data : "not found");

console.log("\nTesting searchHelper for non-existent value 100:");
const searchResult2 = testTree._searchHelper(testTree.root, 100);
console.log("Found:", searchResult2 ? searchResult2.data : "not found");

console.log("\nDeleting 7:");
console.log("Delete successful:", testTree.delete(7));
testTree.prettyPrint(testTree.root);

console.log("\nFinal tree:");
testTree.prettyPrint(testTree.root);
