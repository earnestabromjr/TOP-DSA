class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  getLeft() {
    return this.left;
  }
  getRight() {
    return this.Right;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    const uniqueSortedArray = [...new Set(array)].sort();

    if (uniqueSortedArray.length === 0) return null;
    return this._buildBalanced(uniqueSortedArray);
  }

  _buildBalanced(array) {
    if (array.length === 0) return null;
    // Find middle element
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    // Build left and right subtrees recursively
    if (mid > 0) {
      root.left = this._buildBalanced(array.slice(0, mid));
    }
    if (mid < array.length - 1) {
      root.right = this._buildBalanced(array.slice(mid + 1));
    }

    return root;
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

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value == current.data) {
        return true;
      } else if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  insert(value) {
    if (this.includes(value)) {
      return;
    }

    const newNode = new Node(value);

    let current = this.root;

    while (current !== null) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          break;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = newNode;
          break;
        } else current = current.right;
      }
    }
  }

  delete(value) {
    let current = this.root;

    while (current !== null) {
      this._deleteNode;
    }
  }

  _deleteNode(node, value) {
    if (node.left === null && node.right === null) node = null;
    else if (node.left === null) {
      node = node.right;
    } else if (node.right === null) {
      node = node.left;
    }
  }
}
