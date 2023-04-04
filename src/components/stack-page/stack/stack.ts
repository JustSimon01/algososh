interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  tail = 0;

  push = (item: T): void => {
    this.tail++;
    this.container.push(item);

  };

  pop = (): void => {
   this.container.pop();
   this.tail--;
  };

  peak = (): T | null => {
    if (this.container) {
      return this.container[this.container.length-1]
    }
    return null;
  };

  clear = (): void => {
    this.container = [];
    this.tail = 0;
  };
}
