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

	insert(value) {
		const newNode = new Node(value);
		let currentRoot = this.root;
		if (currentRoot === null) return newNode;
		let current = currentRoot;
		while (current !== null) {
			if (current.data > value && current.left !== null) {
				current = current.left;
			} else if (current.data < value && current.right !== null) {
				current = current.right;
			} else break;
		}
		if (current.data > value) {
			current.left = newNode;
		} else {
			current.right = newNode;
		}
	}
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testTree = new Tree(testArray);

testTree.prettyPrint(testTree.root);

testTree.insert(10);

testTree.prettyPrint(testTree.root);
