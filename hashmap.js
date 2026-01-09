import LinkedList from "./linkedList.js";

class HashMap {
	// TODO: refactor to use linked list
	constructor(capacity = 16, loadFactor = 0.75) {
		this.table = new Array(capacity).fill(null).map(() => new LinkedList());
		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.size = 0;
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode += (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}
		return hashCode;
	}

	_checkLoadFactor() {
		const currentLoad = this.size() / this.capacity;
		if (currentLoad > this.loadFactor) {
			this._resize();
		}
	}

	_resize() {
		const oldTable = this.table;
		const oldSize = this.size;
		this.capacity *= 2;
		this.table = new Array(this.capacity)
			.fill(null)
			.map(() => new LinkedList());

		for (let bucket of oldTable) {
			let current = bucket.head;
			while (current) {
				this._rehashEntry(current.key, current.value);
				current = current.next;
			}
		}
		this.size = oldSize;
	}

	_rehashEntry(key, value) {
		let index = this.hash(key);
		this.table[index].append(value, key);
	}

	// Array size must double when load factor is exceeded
	set(key, value) {
		let index = this.hash(key);
		let bucket = this.table[index];
		let isNewEntry = true;

		if (bucket.head) {
			let current = bucket.head;
			while (current) {
				if (current.key === key) {
					current.value = value;
					isNewEntry = false;
					return;
				}
				current = current.next;
			}
		}
		bucket.append(value, key);
		this.size++;
		this._checkLoadFactor();
	}

	get(key) {
		let index = this.hash(key);
		let bucket = this.table[index];
		if (!bucket.head) return undefined;

		let current = bucket.head;
		while (current) {
			if (current.key === key) {
				return current.value;
			}
			current = current.next;
		}
		return null;
	}

	has(key) {
		let index = this.hash(key);
		let bucket = this.table[index];
		if (bucket.head.key === key) return true;

		let current = bucket.head;
		while (current) {
			if (current.key === key) return true;
			current = current.next;
		}
		return false;
	}

	remove(key) {
		let index = this.hash(key);
		let bucket = this.table[index];
		if (!bucket.head) return false;

		if (bucket.head.key === key) {
			bucket.pop();
			this.size--;
			return true;
		}
		let current = bucket.head;
		while (current) {
			if (current.next.key === key) {
				current.next = current.next.next;
				this.size--;
				return true;
			}
			current = current.next;
		}
		return false;
	}

	size() {
		return this.size;
	}

	clear() {
		for (let i = 0; i < this.table.length; i++) {
			this.table[i] = new LinkedList();
		}
		this.size = 0;
	}

	keys() {
		let keys = [];
		for (let bucket of this.table) {
			let current = bucket.head;
			while (current) {
				keys.push(current.key);
				current = current.next;
			}
		}
		return keys;
	}

	values() {
		let values = [];
		for (let bucket of this.table) {
			let current = bucket.head;
			while (current) {
				values.push(current.value);
				current = current.next;
			}
		}
		return values;
	}

	entries() {
		let entries = [];
		let buckets = this.table;
		buckets.reduce((node) => {});
		return entries;
	}
}
