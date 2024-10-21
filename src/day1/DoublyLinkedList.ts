type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        throw new Error("Not implemented");
    }
    insertAt(item: T, idx: number): void {
        throw new Error("Not implemented");
    }
    append(item: T): void {
        const newNode = { value: item } as Node<T>;
        this.length++;

        if (this.head === undefined) {
            this.head = newNode;
            return;
        }

        let curr = this.head;
        while (curr.next !== undefined) {
            curr = curr.next;
        }

        newNode.prev = curr;
        curr.next = newNode;
    }
    remove(item: T): T | undefined {
        let curr = this.head;

        do {
            curr = curr?.next;
        } while (curr?.value !== item || curr?.next !== undefined);

        if (curr === this.head) {
            this.head === undefined;
        }
    }
    get(idx: number): T | undefined {
        let curr = this.head;
        for (let i = 0; i < idx; ++i) {
            curr = curr?.next;
        }

        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        let curr = this.head;

        for (let i = 0; i < idx; ++i) {
            curr = curr?.next;
        }

        if (curr === this.head) {
            this.length = 0;
            this.head = undefined;
        }

        if (curr) {
            const prev = curr.prev;
            const next = curr.next;

            if (prev) {
                prev.next = next;
            }

            if (next) {
                next.prev = prev;
            }

            // cleanup
            curr.next = undefined;
            curr.prev = undefined;

            this.length--;
            return curr?.value;
        }

        return undefined;
    }
}
