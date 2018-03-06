'use strict';

// -----------------------------------------
// Stacks

class Stack {
  constructor () {
    this.memory = [];
    this.head = 0;
  }

  add (item) {
    this.memory[this.head] = item;
    this.head++;
    return this;
  }

  remove () {
    this.head--;
    return this.memory[this.head];
  }
}

// -----------------------------------------
// Queues

class Queue {
  constructor () {
    this.memory = [];
    this.head = 0;
    this.tail = 0;
  }

  add (item) {
    this.memory[this.tail] = item;
    this.tail++;
    return this;
  }

  remove () {
    if (this.head === this.tail) return undefined;
    const dequeued = this.memory[this.head];
    this.head++;
    return dequeued;
  }
}

// -----------------------------------------
// Linked lists

class LinkedList {
  constructor () {
    this.head = this.tail = null;
  }

  addToTail (item) {
    const newTail = new ListNode(item);
    const oldTail = this.tail;
    if (!oldTail) {
      this.tail = this.head = newTail;
    } else {
      this.tail = newTail;
      newTail.prev = oldTail;
      oldTail.next = newTail;
    }
    return this;
  }

  removeFromTail () {
    const removedTail = this.tail;
    if (!removedTail) return undefined;
    if (!removedTail.prev) {
      this.head = this.tail = null;
    } else {
      this.tail = removedTail.prev;
      this.tail.next = null;
    }
    return removedTail.item;
  }

  forEach (callbackFunc) {
    let currentNode = this.head;
    while (currentNode) {
      callbackFunc(currentNode.item);
      currentNode = currentNode.next;
    }
  }
}

class ListNode {
  // ListNode constructor function
  constructor (item, prev, next) {
    this.item = item;
    this.next = next || null;
    this.prev = prev || null;
  }
}

//-----------------------------------------
// Association lists

class Alist {
  constructor () {
    this.head = null;
  }

  set (key, value) { // optimized for speed
    const oldHead = this.head;
    const newHead = new AlistNode(key, value, oldHead);
    this.head = newHead
    return this;
  }

  setOptimizedForMemory (key, value) {
    let currentNode = this.head;
    // search for a node in the list with the key
    while (currentNode) {
      // if we find one, replace the old value with the new value
      if (currentNode.key === key) {
        currentNode.value = value;
        return this;
      }
    }
    // otherwise, perform the speed-optimized set
    this.set(key, value)
  }

  get (key) {
    let currentNode = this.head
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value
      } else {
        currentNode = currentNode.next
      }
    }
  }
}

class AlistNode {
  constructor (key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

//-----------------------------------------
// Hash Tables

function hash (key) {
  let hashedKey = 0;
  for (let i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

class HashTable {
  constructor () {
    this.buckets = Array(20);
    for (let i = 0; i < 20; i++) {
      this.buckets[i] = new Alist();
    }
  }

  set (key, value) {
    const hashKey = hash(key);
    this.buckets[hashKey].set(key, value);
    return this;
  }

  get (key) {
    const hashKey = hash(key);
    return this.buckets[hashKey].get(key);
  }
}

//-----------------------------------------
// Binary search trees

class BinarySearchTree {
  constructor (val) {
    this.left = null;
    this.right = null;
    this.value = val;
  }

  insert (val) {
    const direction = val < this.value ? 'left' : 'right';
    if (!this[direction]) {
      this[direction] = new BinarySearchTree(val);
    } else {
      this[direction].insert(val);
    }
    return this;
  }

  min () {
    if (!this.left) return this.value;
    else return this.left.min();
  }

  max () {
    if (!this.right) return this.value;
    else return this.right.max();
  }

  contains (val) {
    if (val === this.value) return true;
    const direction = val < this.value ? 'left' : 'right';
    return this[direction] ? this[direction].contains(val) : false;
  }

  traverse (callbackFunc) {
    if (this.left) this.left.traverse(callbackFunc);
    callbackFunc(this.value);
    if (this.right) this.right.traverse(callbackFunc);
  }
}
