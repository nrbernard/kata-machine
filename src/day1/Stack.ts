type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const newNode = { value: item } as Node<T>;

        if (!this.head) {
            this.head = newNode;
        } else {
            newNode.prev = this.head;
            this.head = newNode;
        }

        this.length++;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);

        if (this.head === undefined) {
            return undefined;
        }

        const head = this.head;
        this.head = head.prev;

        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
