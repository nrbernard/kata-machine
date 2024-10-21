type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    debug() {
        for(let i = 0; i< this.length; ++i) {
            console.log(this.get(i))
        }
    }

    prepend(item: T): void {
        const newNode = { value: item } as Node<T>;
        this.length++;

        if (this.head === undefined) {
            this.head = newNode;
            return;
        }

        this.head.prev = newNode;
        newNode.next = this.head;
        
        this.head = newNode;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error('Nope')
        }

        if (idx === this.length) {
            return this.append(item);
        }

        if (idx === 0) {
            return this.prepend(item);
        }

        this.length++;
        const curr = this.getAt(idx) as Node<T>;
        const newNode = {value: item} as Node<T>;

        newNode.next = curr;
        newNode.prev = curr.prev;
        curr.prev = newNode;

        if (newNode.prev) {
            newNode.prev.next = curr;
        }
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

        for(let i = 0; curr && curr.value !== item; ++i) {
            curr = curr.next;
        }
        
        if (curr === undefined) {
            return undefined;
        }
        
        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (node === undefined) {
            return undefined;
        }
        
        return this.removeNode(node);
    }
    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;

        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }

        return curr;
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;

        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;
        return node.value;
    }
}
