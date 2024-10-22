export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    // structural check
    if (a === null && b === null) {
        return true;
    }
    // structural check
    if (a === null || b === null) {
        return false;
    }
    // value check
    if (a.value !== b.value) {
        return false;
    }

    // when we compare any two sub-trees, as long as both return true
    // then they are equal
    return compare(a.left, b.left) && compare(a.right, b.right);
}