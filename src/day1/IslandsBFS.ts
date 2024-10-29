type Coord = [number, number]
type Visited = Map<number, Set<number>> 

function addToVisited(visited: Visited, row: number, column: number): Visited {
    const visitedRow = visited.get(row);

    if (visitedRow === undefined) {
        visited.set(row, new Set())
    } else {
        visitedRow.add(column)
    }

    return visited;
}

function bfs(graph: number[][], visited: Visited, row: number, column: number): void {
    const directions = [[0,1], [1,0], [0, -1], [-1,0]];
    const queue: Coord[] = [[row, column]];

    visited = addToVisited(visited, row, column);
    
    while (queue.length) {
        const curr = queue.shift() as Coord;

        for (const [r, c] of directions) {
            const adjRow = curr[0] + r;
            const adjCol = curr[1] + c;
            const adjVisited = visited.get(adjRow)

            const rowInRange = adjRow >= 0 && adjRow < graph.length;
            const colInRange = adjCol >= 0 && adjCol < graph[0].length;
            if (rowInRange && colInRange && graph[adjRow][adjCol] === 1 && !adjVisited?.has(adjCol)) {
                queue.push([adjRow, adjCol])

                addToVisited(visited, adjRow, adjCol)
            }
        }
    }
}

export default function islandsBFS(graph: number[][]): number {
    let islands = 0;
    const rows = graph.length;
    const cols = graph[0].length;
    const visited: Visited = new Map();
        
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            const visitedRow = visited.get(r)
            if (graph[r][c] === 1 && !(visitedRow !== undefined && visitedRow.has(c))) {
                bfs(graph, visited, r, c)
                islands +=1
            }
        }
    }

    return islands;
}
