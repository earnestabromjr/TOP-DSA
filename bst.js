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

  _searchHelper(root, data, findInsertionPoint = false) {}

  insert(value) {}

  delete(value) {}

  _findInOrderSuccessor(node) {}

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

console.log("\nFinal tree:");
testTree.prettyPrint(testTree.root);
