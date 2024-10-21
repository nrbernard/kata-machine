function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }

    const pivotIdx = partition(arr, lo, hi);

    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    // start it outside the array on the first run
    // because we increment before we swap
    let idx = lo - 1;

    for (let i = lo; i < hi; ++i) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    // now we need to swap the pivot as well
    // it's first used to compare, but then we need to actually move it back
    // so it is sorted up to that point
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    // return the pivot
    return idx;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
