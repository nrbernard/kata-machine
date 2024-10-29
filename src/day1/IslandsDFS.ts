function dfs(graph: number[][], row: number, col: number): boolean {
    // off the map
    if (row < 0 || col < 0 || row >= graph.length || col >= graph[0].length) {
        return false;
    }

    // already seen
    if (graph[row][col] === 0) {
        return false;
    }

    // make the node as "seen"
    graph[row][col] = 0;
    
    const directions = [[0,1], [1,0], [0, -1], [-1,0]];

    for (const [r, c] of directions) {
        dfs(graph, row + r, col + c)
    }

    return true;
}

export default function islandsDFS(graph: number[][]): number {
    let islands = 0;
    
    for (let r = 0; r < graph.length; ++r) {
        for (let c = 0; c < graph[r].length; ++c) {
            if (graph[r][c] === 1) {
                islands++;
                dfs(graph, r, c)
            }
        }
    }

    return islands;
}
