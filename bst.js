class Node {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(array = []) {
		this.array = array;
		this.root = this.buildTree(this.array);
	}

	buildTree(array) {
		array.sort((a, b) => a - b);
		array = [...new Set(array)];
	}
}
