class SingleLinkedListNode<T> implements ListNode<T> {
    public value: T;
    public next: SingleLinkedListNode<T> | undefined;

    constructor(value: T) {
        this.value = value;
    }
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head: SingleLinkedListNode<T> | undefined;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const curr = new SingleLinkedListNode(item);
        curr.next = this.head;
        this.head = curr;
        this.length += 1;

        console.log("prepend", this);
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Index out of bounds");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        const newNode = new SingleLinkedListNode(item);
        let curr = this.head;
        for (let i = 0; i < idx - 1; ++i) {
            if (curr !== undefined) {
                curr = curr.next;
            }
        }
        if (curr !== undefined) {
            newNode.next = curr.next;
            curr.next = newNode;
        }
        this.length += 1;
    }
    append(item: T): void {
        const newNode = new SingleLinkedListNode(item);
        if (this.head === undefined) {
            this.head = newNode;
        } else {
            let curr = this.head;
            while (curr.next !== undefined) {
                curr = curr.next;
            }
            curr.next = newNode;
        }
        this.length += 1;

        console.log("append", this);
    }
    remove(item: T): T | undefined {
        const itemIdx = this.indexOf(item);

        if (itemIdx !== -1) {
            const curr = this.findByIndex(itemIdx);

            if (curr) {
                if (curr === this.head) {
                    this.head = curr.next;
                    this.length -= 1;
                    return curr.value;
                } else {
                    const prev = this.findByIndex(itemIdx - 1);

                    if (prev) {
                        prev.next = curr.next;
                        this.length -= 1;
                        console.log("remove done", item, this);
                        return curr.value;
                    }
                }
            }
        }

        return undefined;
    }
    get(idx: number): T | undefined {
        const curr = this.findByIndex(idx);

        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        const curr = this.findByIndex(idx);
        if (curr) {
            if (curr === this.head) {
                this.head = curr.next;
                this.length -= 1;
                return curr.value;
            } else {
                console.log("removeAt", { idx, curr });
                const prev = this.findByIndex(idx - 1);

                if (prev) {
                    console.log("removeAt", { idx, prev });
                    prev.next = curr.next;
                    this.length -= 1;
                    console.log("removeAt done", idx, this);
                    return curr.value;
                }
            }
        }

        return undefined;
    }
    private findByIndex(idx: number): SingleLinkedListNode<T> | undefined {
        let curr = this.head;

        if (idx === 0) {
            return curr;
        }

        for (let i = 0; i < idx; ++i) {
            curr = curr?.next;
        }

        return curr;
    }
    private indexOf(val: T): number {
        let idx = 0;
        let curr = this.head;

        for (; idx <= this.length; ++idx) {
            if (curr?.value === val) {
                return idx;
            }
        }

        return -1;
    }
}
