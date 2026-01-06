class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.bucket = new Array(capacity);
		this.key = null;
		this.value = null;
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

	set(key, value) {
		hashedKey = this.hash(key);
	}

	get(key) {}

	has(key) {}

	remove(key) {}

	length() {}

	clear() {}

	keys() {}
}
