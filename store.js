// store.js

class KeyValueStore {
  constructor() {
    this.store = {};
  }

  get(key) {
    return this.store[key];
  }

  set(key, value) {
    this.store[key] = value;
  }

  search(prefix, suffix) {
    const keys = Object.keys(this.store);
    const result = keys.filter((key) => {
      return (
        (!prefix || key.startsWith(prefix)) &&
        (!suffix || key.endsWith(suffix))
      );
    });
    return result;
  }
}

module.exports = KeyValueStore;
