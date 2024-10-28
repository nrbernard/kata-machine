export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    // add the new value to the end and then heapify up
    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    // sometimes called poll or pop
    // delete the head value, move the last value to the head, and heapify down
    delete(): number {
        if (this.length === 0) {
            return -1;
        }
        
        const out = this.data[0]

        // reduce the length before heapifying
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return out;
    }

    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (idx >= this.length || leftIdx >= this.length) {
            return;
        }

        const leftValue = this.data[leftIdx]
        const rightValue = this.data[rightIdx]
        const currentValue = this.data[idx]

        if (leftValue > rightValue && currentValue > rightValue) {
           this.data[idx] = rightValue
           this.data[rightIdx] = currentValue

           this.heapifyDown(rightIdx);
        } else if (rightValue > leftValue && currentValue > leftValue) {
           this.data[idx] = leftValue
           this.data[leftIdx] = currentValue

           this.heapifyDown(leftIdx);
        }
    }

    private heapifyUp(idx: number): void {
        // already at the top
        if (idx === 0) {
            return;
        }

        const parentIndex = this.parent(idx);
        const parentValue = this.data[parentIndex];
        const currentValue = this.data[idx];

        if (parentValue > currentValue) {
            // swap the values
            this.data[idx] = parentValue;
            this.data[parentIndex] = currentValue;

            // move the value up
            this.heapifyUp(parentIndex)     
        }
    }

    private parent(idx: number): number {
       return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}