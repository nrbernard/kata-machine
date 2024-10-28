export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number, // starting index
    needle: number  // ending index
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    seen[source] = true;
    const queue: number[] = [source];

    do {
        const curr = queue.shift() as number;

        if (curr === needle) {
            break;
        }

        // look at the adjacencies for the node
        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; ++i) {
            // if there is no edge to follow or it's already been seen, go to the next index
            if (adjs[i] === 0 || seen[i]) {
                continue;
            }

            seen[i] = true
            // the parent of this connect is the current node. we are keeping track
            // of how the node got added or "from whence it came" to be able to walk backwards later
            prev[i] = curr; 
            queue.push(i)
        }
    } while (queue.length)

    if (prev[needle] === -1) {
        // needle was never found, so return an empty array
        return null;
    }

    // now build it backwards
    // start from where we searched to
    let curr = needle;
    const out: number[] = []

    while (prev[curr] !== -1) {
        out.push(curr)
        curr = prev[curr]
    }

    return [source, ...out.reverse()];
}