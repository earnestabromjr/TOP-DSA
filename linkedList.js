class Node {
	constructor(key = null, value = null, next = null) {
		this.value = value;
		this.key = key;
		this.next = next;
	}
}
export default class LinkedList {
	constructor() {
		this.head = null;
	}

	append(value, key) {
		const newNode = new Node(key, value);
		if (!this.head) {
			this.head = newNode;
			return;
		}
		let current = this.head;
		while (current.next) {
			current = current.next;
		}
		current.next = newNode;
	}

	prepend(key, value) {
		let newHead = new Node(key, value);
		newHead.next = this.head;
		this.head = newHead;
	}

	size() {
		let count = 0;
		let node = this.head;
		while (node !== null) {
			count++;
			node = node.next;
		}
		return count;
	}
	printHead() {
		if (!this.head) return undefined;
		return this.head.key + " " + this.head.value;
	}

	printTail() {
		if (!this.head) return undefined;
		let node = this.head;
		while (node !== null) {
			if (node.next === null) return node.key + " " + node.value;
			node = node.next;
		}
	}

	at(index) {
		if (index >= this.size()) return undefined;
		let current = this.head;
		for (let i = 0; i < index; i++) {
			if (current === null) return undefined;
			current = current.next;
		}
		return current ? current.key + " " + current.value : null;
	}

	pop() {
		if (!this.head) return undefined;
		const returnValue = this.head.value;
		this.head = this.head.next;
		return returnValue;
	}

	toString() {
		if (!this.head) return "null";

		let result = "";
		let linknode = this.head;
		while (linknode !== null) {
			result += `( key: ${linknode.key} value: ${linknode.value} ) -> `;
			linknode = linknode.next;
		}
		result += "null";
		return result;
	}

	contains(value) {
		if (!this.head) return false;
		let node = this.head;
		while (node !== null) {
			if (node.value === value) return true;
			node = node.next;
		}
		return false;
	}

	findKey(key) {
		let node = this.head;
		for (let i = 0; i < this.size(); i++) {
			if (node.key === key) return node.key + " " + node.value;
			node = node.next;
		}
		return null;
	}

	findIndex(value) {
		let node = this.head;
		for (let i = 0; i < this.size(); i++) {
			if (value === node.value) return i;
			node = node.next;
		}
		return -1;
	}
}
