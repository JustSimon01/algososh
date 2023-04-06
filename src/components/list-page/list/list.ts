import { ElementStates } from "../../../types/element-states";

export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(element: T) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next
      }
      current.next = node;
    }
    this.size++;
  }

  deleteLastNode() {
    if (this.head === null) {
      return null;
    }
    if (this.head.next === null) {
      this.head = null;
      this.size--;
      return null;
    }

    let currentNode = this.head;
    while(currentNode.next?.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;
    this.size--;
  }

  deleteFirstNode() {
    if (this.head === null) {
      return null;
    }
    if (this.head.next === null) {
      this.head = null;
      this.size--;
      return null;
    }
    this.head = this.head.next;
    this.size--;
  }

  prepend(element: T) {
    const node = new Node(element);
    if (this.head === null || undefined) {
      this.head = node;
    } else {
      let current = this.head;
      this.head = node;
      node.next = current;
    }
    this.size++;
  }

  addByIndex(element: T, index: number) {
    index = Number(index);

    if (index >= this.size || index < 0) {
      throw new Error('Неправильное значение индекса');
    }

    if (this.head === null) {
      this.head = new Node(element);
    }

    if (index === 0 && this.size !== 0) {
      this.prepend(element)
    } else {

      const node = new Node(element);
      let current = this.head;
      let prev = null;

      while (current.next !== null && index-1 >= 0) {
        prev = current;
        current = current.next;
        index -= 1;
      }

      prev!.next = node;
      node.next = current;
    }

    this.size++;
  }

  deleteByIndex(index: number) {
    index = Number(index);

    if (!this.head) {
      throw new Error('Список пуст');
    }
    
    if (index >= this.size || index < 0) {
      throw new Error('Неправильное значение индекса');
    }

    if (index === 0) {
      this.head = this.head.next;
      this.size--;
      return this.head
    } 

    let current = this.head;

    while(current.next !== null && index-1 > 0){
      current = current.next;
      index -= 1;
    }

    if (current.next?.next === null) {
      current.next = null;
      this.size--;
      return this.head;
    } 

    current.next = current.next!.next
    this.size--;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res: Array<T> = [];
    while (curr) {
      res = [...res, curr.value];
      curr = curr.next;
    }
    console.log(res);
  }

  returnArray() {
    let curr = this.head;
    let res: Array<any> = [];
    while (curr) {
      res = [...res, {value: curr.value, state: ElementStates.Default, head: null, tail: null}];
      curr = curr.next;
    }
    return res;
  }
}

