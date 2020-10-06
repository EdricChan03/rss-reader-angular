export class MockStorage {
  private keys = [];
  private store = {};

  constructor(initialStore?: { [key: string]: string }) {
    for (const key in initialStore) {
      if (key in initialStore) {
        this.setItem(key, initialStore[key]);
      }
    }
  }

  get length(): number {
    return this.keys.length;
  }

  key(i: number): string {
    return this.keys[i];
  }

  getItem(key: string): string | null {
    return key in this.store ? this.store[key] : null;
  }

  setItem(key: string, value: string) {
    if (!(key in this.store)) {
      this.keys.push(key);
    }

    this.store[key] = value;
  }

  removeItem(key: string) {
    if (key in this.store) {
      delete this.store[key];
      this.keys.splice(this.keys.indexOf(key), 1);
    }
  }

  clear() {
    this.keys = [];
    this.store = {};
  }
}
