export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    do {
        const m = Math.floor(lo + (hi - lo) / 2); // midpoint
        const v = haystack[m]; // value

        if (v === needle) {
            return true;
        } else if (needle > v) {
            // console.log("right", { needle, v, lo, m, hi });
            lo = m + 1; // low is inclusive. we have already checked the midpoint
        } else {
            // console.log("left", { needle, v, lo, m, hi });
            hi = m; // high is exclusive
        }
    } while (lo < hi);

    return false;
}
