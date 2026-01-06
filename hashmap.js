class HashMap {
	// TODO: refactor to use linked list
	constructor(capacity = 16, loadFactor = 0.75) {
		this.table = new Array(capacity);
		this.capacity = capacity;
		this.loadFactor = loadFactor;
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode += (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}
		return hashCode;
	}

	// TODO: implement using linked list and the load factor
	// Array size must double when load factor is exceeded
	set(key, value) {
		let index = this.hash(key);
		this.table[index] = value;
	}

	get(key) {
		let index = this.hash(key);
		return this.table[index];
	}

	has(key) {
		let index = this.hash(key);
		if (this.table[index]) return true;
		return false;
	}

	remove(key) {
		const index = this.hash(key);
		if (this.has(key)) {
			delete this.table[index];
			return true;
		} else {
			return false;
		}
	}

	length() {
		let count = 0;
		for (let i = 0; i < this.table.length; i++) {
			if (this.table[i] !== null) {
				count++;
			}
		}
		return count;
	}

	clear() {
		for (let i = 0; i < this.table.length; i++) {
			this.table[i] = null;
		}
	}

	keys() {}
}
