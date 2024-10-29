function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList
): number[] {
    const seen = new Array(arr.length).fill(false)
    const prev = new Array(arr.length).fill(-1)
    const dists = new Array(arr.length).fill(Infinity)

    // we start at the source, so the distance is 0
    dists[source] = 0;

    while(hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists)
        seen[curr] = true;

        // list of edges
        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; ++i) {
            const edge = adjs[i];

            if (seen[edge.to]) {
                continue;
            }

            // the distance to this new node from the node we're at
            const dist = dists[curr] + edge.weight;
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    const out: number[] = [];
    let curr = sink; // aka "needle"

    while(prev[curr] !== -1) {
        out.push(curr)
        curr = prev[curr]
    }

    return [source, ...out.reverse()];
}